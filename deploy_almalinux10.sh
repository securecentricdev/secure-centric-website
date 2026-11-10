#!/usr/bin/env bash
# ==============================================================================
# Secure-Centric — Production Deployment Script for AlmaLinux 10 / 9
# Target Stack: Nginx + PHP-FPM 8.2/8.3 + MariaDB + Let's Encrypt SSL + WP-CLI
# Repository: https://github.com/securecentricdev/secure-centric-website.git
# ==============================================================================

set -eo pipefail

# ------------------------------------------------------------------------------
# Configuration Variables (override via CLI flags or environment variables)
# ------------------------------------------------------------------------------
TARGET_INPUT="${1:-secure-centric.com}"
ADMIN_EMAIL="${2:-admin@secure-centric.com}"

# Check if target is an IP address or domain
if [[ "${TARGET_INPUT}" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    IS_IP=true
    SERVER_IP="${TARGET_INPUT}"
    DOMAIN="${SERVER_IP}.nip.io"
    NGINX_SERVER_NAMES="${SERVER_IP} ${DOMAIN} localhost"
    HTTP_PROTO="http"
else
    IS_IP=false
    DOMAIN="${TARGET_INPUT}"
    NGINX_SERVER_NAMES="${DOMAIN} www.${DOMAIN}"
    HTTP_PROTO="https"
fi

DB_NAME="${DB_NAME:-secure_centric_db}"
DB_USER="${DB_USER:-secure_centric_user}"
DB_PASS="${DB_PASS:-$(openssl rand -base64 18 | tr -dc 'a-zA-Z0-9' | head -c 18)}"
WEB_ROOT="/var/www/secure-centric"
REPO_URL="https://github.com/securecentricdev/secure-centric-website.git"

echo "========================================================================"
echo " Starting Secure-Centric Automated Deployment for AlmaLinux 10 / 9"
if [ "${IS_IP}" = true ]; then
    echo " Mode:           STAGING (IP / Wildcard DNS)"
    echo " Target IP:      ${SERVER_IP}"
    echo " Staging URL:    http://${SERVER_IP} or http://${DOMAIN}"
else
    echo " Mode:           PRODUCTION DOMAIN"
    echo " Target Domain:  https://${DOMAIN}"
fi
echo " Admin Email:    ${ADMIN_EMAIL}"
echo " Web Directory:  ${WEB_ROOT}"
echo " Database Name:  ${DB_NAME}"
echo " Database User:  ${DB_USER}"
echo "========================================================================"

# Check root privileges
if [ "$(id -u)" -ne 0 ]; then
    echo "ERROR: This script must be run as root." >&2
    exit 1
fi

# ------------------------------------------------------------------------------
# 1. Update OS & Install Prerequisites
# ------------------------------------------------------------------------------
echo "[1/9] Updating system packages and installing prerequisites..."
dnf upgrade -y --refresh

# Install EPEL repository
if ! rpm -q epel-release >/dev/null 2>&1; then
    dnf install -y epel-release
fi

# Install essential utility tools
dnf install -y curl wget git unzip tar gzip policycoreutils-python-utils firewalld openssl

# ------------------------------------------------------------------------------
# 2. Install Web Stack (Nginx, MariaDB, PHP 8.2/8.3, Certbot)
# ------------------------------------------------------------------------------
echo "[2/9] Installing Nginx, MariaDB server, and PHP with extensions..."
dnf install -y nginx mariadb-server mariadb certbot python3-certbot-nginx

# Install PHP and essential WordPress extensions
# AlmaLinux 10 ships with modern PHP 8.2/8.3 in official streams
dnf install -y \
    php-fpm \
    php-mysqlnd \
    php-gd \
    php-curl \
    php-mbstring \
    php-xml \
    php-zip \
    php-intl \
    php-bcmath \
    php-opcache \
    php-json

# ------------------------------------------------------------------------------
# 3. Configure and Start Core Services
# ------------------------------------------------------------------------------
echo "[3/9] Enabling and starting MariaDB, PHP-FPM, and Nginx..."
systemctl daemon-reload
systemctl enable --now mariadb
systemctl enable --now php-fpm
systemctl enable --now nginx

# ------------------------------------------------------------------------------
# 4. Configure Firewall (firewalld)
# ------------------------------------------------------------------------------
echo "[4/9] Configuring firewall rules (HTTP 80 / HTTPS 443)..."
if systemctl is-active --quiet firewalld; then
    firewall-cmd --permanent --add-service=http || true
    firewall-cmd --permanent --add-service=https || true
    firewall-cmd --reload || true
else
    echo "Starting firewalld service..."
    systemctl enable --now firewalld
    firewall-cmd --permanent --add-service=http || true
    firewall-cmd --permanent --add-service=https || true
    firewall-cmd --permanent --add-service=ssh || true
    firewall-cmd --reload || true
fi

# ------------------------------------------------------------------------------
# 5. Setup MariaDB Database and User
# ------------------------------------------------------------------------------
echo "[5/9] Setting up MariaDB database and user permissions..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
mysql -u root -e "GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';"
mysql -u root -e "FLUSH PRIVILEGES;"

echo "Database '${DB_NAME}' initialized successfully."

# ------------------------------------------------------------------------------
# 6. Deploy Website Files & Repository
# ------------------------------------------------------------------------------
echo "[6/9] Deploying codebase to ${WEB_ROOT}..."
mkdir -p "${WEB_ROOT}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -d "${SCRIPT_DIR}/wp-content" ] && [ "${SCRIPT_DIR}" != "${WEB_ROOT}" ]; then
    echo "Deploying directly from local directory: ${SCRIPT_DIR}..."
    rsync -av --exclude='.git' --exclude='deploy_almalinux10.sh' "${SCRIPT_DIR}/" "${WEB_ROOT}/"
elif [ ! -d "${WEB_ROOT}/wp-content" ]; then
    echo "Cloning repository from ${REPO_URL} into ${WEB_ROOT}..."
    git clone "${REPO_URL}" "${WEB_ROOT}"
else
    echo "Directory ${WEB_ROOT} already exists. Pulling latest commits..."
    git -C "${WEB_ROOT}" pull origin main || true
fi

# Import Initial Database Dump
SQL_DUMP=""
if [ -f "${WEB_ROOT}/secure_centric_db.sql" ]; then
    SQL_DUMP="${WEB_ROOT}/secure_centric_db.sql"
elif [ -f "${SCRIPT_DIR}/secure_centric_db.sql" ]; then
    SQL_DUMP="${SCRIPT_DIR}/secure_centric_db.sql"
fi

if [ -n "${SQL_DUMP}" ]; then
    echo "Importing initial WordPress database dump (${SQL_DUMP})..."
    mysql -u root "${DB_NAME}" < "${SQL_DUMP}"
    echo "Database import complete."
fi

# Generate Production wp-config-local.php
echo "Generating production wp-config-local.php with secure random salts..."
SALT_AUTH="$(openssl rand -base64 32)"
SALT_SEC="$(openssl rand -base64 32)"
SALT_LOG="$(openssl rand -base64 32)"
SALT_NONCE="$(openssl rand -base64 32)"

cat << EOF_CONFIG > "${WEB_ROOT}/wp-config-local.php"
<?php
/**
 * Production / Staging Database and Environment Overrides for Secure-Centric
 * Auto-generated on $(date -u +"%Y-%m-%d %H:%M:%S UTC")
 */
define( 'DB_NAME',     '${DB_NAME}' );
define( 'DB_USER',     '${DB_USER}' );
define( 'DB_PASSWORD', '${DB_PASS}' );
define( 'DB_HOST',     'localhost' );

define( 'WP_HOME',     '${HTTP_PROTO}://${DOMAIN}' );
define( 'WP_SITEURL',  '${HTTP_PROTO}://${DOMAIN}' );

define( 'AUTH_KEY',         '${SALT_AUTH}' );
define( 'SECURE_AUTH_KEY',  '${SALT_SEC}' );
define( 'LOGGED_IN_KEY',    '${SALT_LOG}' );
define( 'NONCE_KEY',        '${SALT_NONCE}' );
define( 'AUTH_SALT',        '${SALT_AUTH}' );
define( 'SECURE_AUTH_SALT', '${SALT_SEC}' );
define( 'LOGGED_IN_SALT',   '${SALT_LOG}' );
define( 'NONCE_SALT',       '${SALT_NONCE}' );

define( 'WP_DEBUG',         false );
define( 'WP_DEBUG_LOG',     false );
define( 'WP_DEBUG_DISPLAY', false );
define( 'AUTOMATIC_UPDATER_DISABLED', true );
EOF_CONFIG

chmod 600 "${WEB_ROOT}/wp-config-local.php"

# ------------------------------------------------------------------------------
# 7. Install WP-CLI & Search-Replace Local URLs with Target Domain/IP
# ------------------------------------------------------------------------------
echo "[7/9] Installing WP-CLI and running search-replace..."
if ! command -v wp >/dev/null 2>&1; then
    wget -qO /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x /usr/local/bin/wp
fi

# Run WP search-replace safely preserving PHP serialization
cd "${WEB_ROOT}"
wp search-replace "http://localhost/secure-centric" "${HTTP_PROTO}://${DOMAIN}" --all-tables --allow-root || true
wp search-replace "https://localhost/secure-centric" "${HTTP_PROTO}://${DOMAIN}" --all-tables --allow-root || true
wp cache flush --allow-root || true

# ------------------------------------------------------------------------------
# 8. Configure Nginx Virtual Host & SELinux Policies
# ------------------------------------------------------------------------------
echo "[8/9] Configuring Nginx virtual host, permissions, and SELinux..."

# Determine PHP-FPM socket path (AlmaLinux standard: /run/php-fpm/www.sock)
PHP_SOCKET="/run/php-fpm/www.sock"
if [ ! -S "${PHP_SOCKET}" ]; then
    PHP_UPSTREAM="127.0.0.1:9000"
else
    PHP_UPSTREAM="unix:${PHP_SOCKET}"
fi

LISTEN_DIRECTIVE="listen 80;"
LISTEN_V6_DIRECTIVE="listen [::]:80;"
if [ "${IS_IP}" = true ]; then
    LISTEN_DIRECTIVE="listen 80 default_server;"
    LISTEN_V6_DIRECTIVE="listen [::]:80 default_server;"
fi

cat << EOF_NGINX > "/etc/nginx/conf.d/${DOMAIN}.conf"
# Secure-Centric Nginx Configuration
# Optimized for AlmaLinux 10 / PHP-FPM 8.2+

server {
    ${LISTEN_DIRECTIVE}
    ${LISTEN_V6_DIRECTIVE}
    server_name ${NGINX_SERVER_NAMES};

    root ${WEB_ROOT};
    index index.php index.html index.htm;

    client_max_body_size 64M;

    # Security Headers
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml font/woff2 image/svg+xml;

    location / {
        try_files \$uri \$uri/ /index.php?\$args;
    }

    location ~ \.php\$ {
        try_files \$uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)\$;
        fastcgi_pass ${PHP_UPSTREAM};
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_buffer_size 128k;
        fastcgi_buffers 4 256k;
        fastcgi_busy_buffers_size 256k;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|svg|woff|woff2|ttf|mp4|webm)\$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # Block access to hidden files and sensitive WordPress configs
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    location ~* /(?:uploads|files)/.*\.php\$ {
        deny all;
    }

    location = /xmlrpc.php {
        deny all;
    }
}
EOF_NGINX

# Set ownership and file permissions
# Detect web server user in php-fpm (typically 'nginx' or 'apache')
WEB_USER="nginx"
if id -u apache >/dev/null 2>&1 && ! id -u nginx >/dev/null 2>&1; then
    WEB_USER="apache"
fi

mkdir -p "${WEB_ROOT}/wp-content/uploads"
chown -R ${WEB_USER}:${WEB_USER} "${WEB_ROOT}"
find "${WEB_ROOT}" -type d -exec chmod 755 {} \;
find "${WEB_ROOT}" -type f -exec chmod 644 {} \;
chmod 600 "${WEB_ROOT}/wp-config-local.php"

# SELinux Configuration for Web Server
if sestatus 2>/dev/null | grep -q "enabled"; then
    echo "Configuring SELinux booleans and file contexts..."
    setsebool -P httpd_can_network_connect 1 || true
    setsebool -P httpd_can_network_connect_db 1 || true
    setsebool -P httpd_unified 1 || true

    semanage fcontext -a -t httpd_sys_content_t "${WEB_ROOT}(/.*)?" || true
    semanage fcontext -a -t httpd_sys_rw_content_t "${WEB_ROOT}/wp-content/uploads(/.*)?" || true
    restorecon -Rv "${WEB_ROOT}" || true
fi

# Test and reload Nginx
nginx -t
systemctl reload nginx

# ------------------------------------------------------------------------------
# 9. Obtain SSL Certificate (Certbot Let's Encrypt)
# ------------------------------------------------------------------------------
echo "[9/9] Requesting Let's Encrypt SSL Certificate..."

# Only attempt certbot if domain resolves to public IP
PUBLIC_IP="$(curl -s https://api.ipify.org || hostname -I | awk '{print $1}')"
RESOLVED_IP="$(dig +short "${DOMAIN}" | tail -n1 || true)"

if [ -n "${RESOLVED_IP}" ] && [ "${RESOLVED_IP}" = "${PUBLIC_IP}" ]; then
    echo "Domain ${DOMAIN} resolves correctly to this server IP (${PUBLIC_IP}). Requesting certificate..."
    certbot --nginx \
        -d "${DOMAIN}" \
        -d "www.${DOMAIN}" \
        --non-interactive \
        --agree-tos \
        -m "${ADMIN_EMAIL}" \
        --redirect || true
    systemctl enable --now certbot-renew.timer 2>/dev/null || true
else
    echo "========================================================================"
    echo "NOTICE: DNS for '${DOMAIN}' is not yet pointing to this server IP (${PUBLIC_IP})."
    echo "HTTP deployment succeeded. Once DNS propagation is complete, run:"
    echo "  certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --agree-tos -m ${ADMIN_EMAIL} --redirect"
    echo "========================================================================"
fi

# ------------------------------------------------------------------------------
# Deployment Summary & Credentials
# ------------------------------------------------------------------------------
echo ""
echo "========================================================================"
echo " 🎉 SECURE-CENTRIC DEPLOYMENT COMPLETED SUCCESSFULLY! "
echo "========================================================================"
echo " Site URL:          https://${DOMAIN}"
echo " Web Directory:     ${WEB_ROOT}"
echo " Database Name:     ${DB_NAME}"
echo " Database User:     ${DB_USER}"
echo " Database Password: ${DB_PASS}"
echo " Config File:       ${WEB_ROOT}/wp-config-local.php"
echo " Nginx Conf:        /etc/nginx/conf.d/${DOMAIN}.conf"
echo " Repository:        ${REPO_URL}"
echo "========================================================================"
echo " Next Steps:"
echo " 1. Ensure your DNS A Records point to this server IP (${PUBLIC_IP}):"
echo "    - @ (root) -> ${PUBLIC_IP}"
echo "    - www      -> ${PUBLIC_IP}"
echo " 2. If SSL was not installed automatically, run certbot once DNS resolves:"
echo "    certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo " 3. Verify the site in your browser at https://${DOMAIN}"
echo "========================================================================"
