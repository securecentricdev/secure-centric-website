<?php
/**
 * Secure-Centric Theme Functions & Block Registrations
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Setup Theme Supports
 */
function secure_centric_setup() {
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'editor-styles' );
    add_editor_style( 'assets/css/variables.css' );
    add_editor_style( 'assets/css/components.css' );
    add_editor_style( 'assets/css/pages.css' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'secure_centric_setup' );

/**
 * Clean unescaped Gutenberg unicode entities from strings and arrays
 */
function sc_clean_text( $val ) {
    if ( is_array( $val ) ) {
        return array_map( 'sc_clean_text', $val );
    }
    if ( is_string( $val ) ) {
        return str_replace(
            array(
                '\u0022', 'u0022',
                'u0026amp;', '\u0026amp;',
                'u0026#038;', '\u0026#038;',
                '\u0026', 'u0026', 'U0026',
                '&amp;',
                'IT\u005c/MSP', 'IT\/MSP', '\/', 'u005c/'
            ),
            array(
                '"', '"',
                '&', '&',
                '&', '&',
                '&', '&', '&',
                '&',
                'IT/MSP', 'IT/MSP', '/', '/'
            ),
            $val
        );
    }
    return $val;
}

/**
 * Safe JSON block attribute decoder with unicode unescaping
 */
function sc_decode_block_json( $val ) {
    if ( empty( $val ) ) {
        return array();
    }
    if ( is_array( $val ) ) {
        return sc_clean_text( $val );
    }
    if ( is_string( $val ) ) {
        // Try clean JSON decode first
        $decoded = json_decode( $val, true );
        if ( is_array( $decoded ) ) {
            return sc_clean_text( $decoded );
        }

        // Resolve double-escaped Gutenberg unicode strings
        $val = preg_replace_callback( '/u005c(u[0-9a-fA-F]{4})/', function( $m ) {
            return json_decode( '"\\' . $m[1] . '"' );
        }, $val );
        $val = preg_replace_callback( '/(?<![a-zA-Z0-9\\\\])u([0-9a-fA-F]{4})/', function( $m ) {
            return json_decode( '"\u' . $m[1] . '"' );
        }, $val );
        $val = str_replace( array( '\u0022', 'u0022', '&quot;' ), '"', $val );
        $val = str_replace( array( '\u0026', 'u0026' ), '&', $val );
        $decoded = json_decode( $val, true );
        if ( is_array( $decoded ) ) {
            return sc_clean_text( $decoded );
        }
    }
    return array();
}

/**
 * Resolves demo hash page links (#page-X) to proper WordPress URLs
 */
function sc_resolve_page_url( $url ) {
    if ( empty( $url ) ) {
        return home_url( '/' );
    }

    $url = stripslashes( $url );
    $trimmed = trim( $url );

    // Normalize any legacy localhost or staging host prefixes
    if ( preg_match( '#https?://[^/]+(?:/secure-centric)?(/.*)$#i', $trimmed, $m ) ) {
        $trimmed = $m[1];
    }

    static $page_map = array(
        '#page-1'       => '/',
        '#page-n1'      => '/about/',
        '#page-2'       => '/services/cmmc-compliance/',
        '#page-3'       => '/services/cmmc-consulting/',
        '#page-4'       => '/services/cmmc-readiness-assessment/',
        '#page-5'       => '/services/cmmc-readiness-assessment/gap-assessment/',
        '#page-6'       => '/services/nist-800-171-compliance/',
        '#page-7'       => '/services/cmmc-implementation-remediation/',
        '#page-8'       => '/services/cmmc-implementation-remediation/ssp-poam-development/',
        '#page-11'      => '/services/virtual-ciso/',
        '#page-12'      => '/cmmc/',
        '#page-13'      => '/cmmc/level-2/',
        '#page-14'      => '/nist-800-171/',
        '#page-15'      => '/cui/',
        '#page-16'      => '/services/cmmc-enclave/',
        '#page-19'      => '/cmmc/cmmc-process/',
        '#page-20'      => '/cmmc/rpo/',
        '#page-21'      => '/resources/templates/checklist/level-2/',
        '#page-22'      => '/resources/templates/checklist/unmarked-cui/',
        '#page-23'      => '/resources/templates/checklist/level-1/',
        '#page-contact' => '/contact/',
        '#contact'      => '/contact/',
    );

    if ( isset( $page_map[ $trimmed ] ) ) {
        return home_url( $page_map[ $trimmed ] );
    }

    if ( strpos( $trimmed, '/' ) === 0 ) {
        return home_url( $trimmed );
    }

    return $url;
}

/**
 * Register Custom Gutenberg Blocks via block.json
 */
function secure_centric_register_custom_blocks() {
    if ( function_exists( 'wp_enqueue_media' ) && is_admin() ) {
        wp_enqueue_media();
    }

    $editor_js_file = get_template_directory() . '/assets/js/editor.js';
    $editor_js_ver  = file_exists( $editor_js_file ) ? (string) filemtime( $editor_js_file ) : '4.0.0';

    wp_register_script(
        'secure-centric-editor-blocks',
        get_template_directory_uri() . '/assets/js/editor.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-server-side-render', 'wp-block-editor', 'wp-data', 'wp-dom-ready' ),
        $editor_js_ver,
        false
    );

    // Prepare Forminator form options for block inspector controls
    $forminator_options = array(
        array( 'value' => '', 'label' => __( '-- Select Forminator Form --', 'secure-centric' ) ),
    );
    if ( class_exists( 'Forminator_API' ) ) {
        $forms = Forminator_API::get_forms( null, 1, 100 );
        if ( ! empty( $forms ) ) {
            foreach ( $forms as $f ) {
                $form_title = get_the_title( $f->id );
                if ( empty( $form_title ) ) {
                    $form_title = ! empty( $f->name ) ? $f->name : 'Form #' . $f->id;
                }
                $forminator_options[] = array(
                    'value' => (string) $f->id,
                    'label' => sprintf( '%s (ID: %d)', $form_title, $f->id ),
                );
            }
        }
    }
    if ( count( $forminator_options ) <= 1 ) {
        $form_posts = get_posts( array(
            'post_type'      => 'forminator_forms',
            'posts_per_page' => 100,
            'post_status'    => array( 'publish', 'draft' ),
        ) );
        if ( ! empty( $form_posts ) ) {
            foreach ( $form_posts as $fp ) {
                $forminator_options[] = array(
                    'value' => (string) $fp->ID,
                    'label' => sprintf( '%s (ID: %d)', $fp->post_title, $fp->ID ),
                );
            }
        }
    }
    wp_localize_script( 'secure-centric-editor-blocks', 'scForminatorForms', $forminator_options );

    // Automatically register all custom blocks inside the blocks directory
    $block_json_files = glob( __DIR__ . '/blocks/*/block.json' );
    if ( ! empty( $block_json_files ) ) {
        foreach ( $block_json_files as $json_file ) {
            register_block_type( dirname( $json_file ) );
        }
    }
}
add_action( 'init', 'secure_centric_register_custom_blocks' );

/**
 * Register Custom Block Pattern Categories
 */
function secure_centric_register_pattern_categories() {
    register_block_pattern_category(
        'secure-centric-heroes',
        array( 'label' => __( 'Secure-Centric: Heroes', 'secure-centric' ) )
    );
    register_block_pattern_category(
        'secure-centric-process',
        array( 'label' => __( 'Secure-Centric: Process & Roadmaps', 'secure-centric' ) )
    );
    register_block_pattern_category(
        'secure-centric-proof',
        array( 'label' => __( 'Secure-Centric: Proof & Testimonials', 'secure-centric' ) )
    );
    register_block_pattern_category(
        'secure-centric-cta',
        array( 'label' => __( 'Secure-Centric: Calls to Action', 'secure-centric' ) )
    );
}
add_action( 'init', 'secure_centric_register_pattern_categories' );

/**
 * Enqueue Theme Scripts & Styles
 */
function secure_centric_enqueue_assets() {
    // Google Fonts
    wp_enqueue_style(
        'secure-centric-fonts',
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        array(),
        null
    );

    // CSS Theme Assets with dynamic cache busting
    $var_file  = get_template_directory() . '/assets/css/variables.css';
    $comp_file = get_template_directory() . '/assets/css/components.css';
    $page_file = get_template_directory() . '/assets/css/pages.css';

    $var_ver  = file_exists( $var_file ) ? (string) filemtime( $var_file ) : time();
    $comp_ver = file_exists( $comp_file ) ? (string) filemtime( $comp_file ) : time();
    $page_ver = file_exists( $page_file ) ? (string) filemtime( $page_file ) : time();

    wp_enqueue_style(
        'secure-centric-variables',
        get_template_directory_uri() . '/assets/css/variables.css',
        array(),
        $var_ver
    );
    wp_enqueue_style(
        'secure-centric-components',
        get_template_directory_uri() . '/assets/css/components.css',
        array( 'secure-centric-variables' ),
        $comp_ver
    );
    wp_enqueue_style(
        'secure-centric-pages',
        get_template_directory_uri() . '/assets/css/pages.css',
        array( 'secure-centric-components' ),
        $page_ver
    );

    // Frontend Interactive Scripts with dynamic cache busting
    $data_file = get_template_directory() . '/assets/js/data.js';
    $app_file  = get_template_directory() . '/assets/js/app.js';

    $data_ver = file_exists( $data_file ) ? (string) filemtime( $data_file ) : time();
    $app_ver  = file_exists( $app_file ) ? (string) filemtime( $app_file ) : time();

    wp_enqueue_script(
        'secure-centric-data',
        get_template_directory_uri() . '/assets/js/data.js',
        array(),
        $data_ver,
        true
    );
    wp_enqueue_script(
        'secure-centric-app',
        get_template_directory_uri() . '/assets/js/app.js',
        array( 'secure-centric-data' ),
        $app_ver,
        true
    );
    wp_localize_script(
        'secure-centric-app',
        'scConfig',
        array(
            'bookingUrl' => sc_get_booking_url(),
        )
    );
}
add_action( 'wp_enqueue_scripts', 'secure_centric_enqueue_assets' );

/**
 * Enqueue Editor Assets for Gutenberg
 */
function secure_centric_editor_assets() {
    wp_enqueue_style(
        'secure-centric-editor-fonts',
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        array(),
        null
    );
    wp_enqueue_style(
        'secure-centric-editor-styles',
        get_template_directory_uri() . '/assets/css/variables.css',
        array(),
        '3.9.4'
    );
    wp_enqueue_style(
        'secure-centric-editor-components',
        get_template_directory_uri() . '/assets/css/components.css',
        array( 'secure-centric-editor-styles' ),
        '3.9.4'
    );
    wp_enqueue_style(
        'secure-centric-editor-pages',
        get_template_directory_uri() . '/assets/css/pages.css',
        array( 'secure-centric-editor-components' ),
        '3.9.5'
    );

    wp_enqueue_media();

    $editor_js_file = get_template_directory() . '/assets/js/editor.js';
    $editor_js_ver  = file_exists( $editor_js_file ) ? (string) filemtime( $editor_js_file ) : '4.0.0';

    wp_enqueue_script(
        'secure-centric-editor-blocks',
        get_template_directory_uri() . '/assets/js/editor.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-server-side-render', 'wp-block-editor', 'wp-data', 'wp-dom-ready' ),
        $editor_js_ver,
        false
    );
}
add_action( 'enqueue_block_editor_assets', 'secure_centric_editor_assets' );

/**
 * Global Booking / Discovery Call URL Helper
 *
 * Configurable via WordPress Admin (Settings -> General) or via 'sc_booking_url' filter.
 * Defaults to the LeadConnector widget URL.
 */
function sc_get_booking_url() {
    $default = 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';
    $url     = get_option( 'sc_booking_url', $default );
    if ( empty( $url ) ) {
        $url = $default;
    }
    return apply_filters( 'sc_booking_url', $url );
}

/**
 * Register Booking URL field in Settings -> General for client flexibility
 */
function sc_register_booking_url_setting() {
    register_setting( 'general', 'sc_booking_url', array(
        'type'              => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default'           => 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll',
    ) );

    add_settings_field(
        'sc_booking_url_field',
        __( 'Discovery Call / Booking Widget URL', 'secure-centric' ),
        'sc_render_booking_url_field',
        'general',
        'default',
        array( 'label_for' => 'sc_booking_url' )
    );
}
add_action( 'admin_init', 'sc_register_booking_url_setting' );

function sc_render_booking_url_field() {
    $val = sc_get_booking_url();
    echo '<input type="url" id="sc_booking_url" name="sc_booking_url" value="' . esc_attr( $val ) . '" class="regular-text code" style="width: 100%; max-width: 600px;" />';
    echo '<p class="description">' . esc_html__( 'Used for all "Book a Discovery Call" and "Book a Call" buttons across the website. Easily editable anytime.', 'secure-centric' ) . '</p>';
}

/**
 * Dynamic URL & Asset Path Normalizer
 *
 * Ensures navigation links, logo image, and template assets resolve cleanly
 * regardless of whether WordPress is hosted in a subdirectory (e.g. localhost/secure-centric)
 * or at the root domain in staging/production (e.g. 82.180.163.13.nip.io or secure-centric.com).
 */
function secure_centric_normalize_buffer_output( $html ) {
    $home_path = trim( wp_parse_url( home_url(), PHP_URL_PATH ) ?: '', '/' );
    if ( empty( $home_path ) ) {
        // Site is at the root domain: strip '/secure-centric/' prefix from internal paths
        $html = preg_replace( '/(href|src|action)=(["\'])\/secure-centric\/(.*?)\2/i', '$1=$2/$3$2', $html );
        $html = preg_replace( '/(href|src|action)=(["\'])\/secure-centric\/?\2/i', '$1=$2/$2', $html );
    }

    return $html;
}

function secure_centric_start_buffer() {
    if ( ! is_admin() ) {
        ob_start( 'secure_centric_normalize_buffer_output' );
    }
}
add_action( 'template_redirect', 'secure_centric_start_buffer', 1 );

/**
 * =========================================================================
 * WordPress Theme Customizer Integration (Appearance -> Customize)
 * Supports Global Colors, Typography, Header Options, Footer Options & CSS
 * =========================================================================
 */

/**
 * Ensure Appearance -> Customize menu item appears in Admin for Block Theme
 */
function secure_centric_add_customizer_menu() {
    add_theme_page(
        __( 'Customize', 'secure-centric' ),
        __( 'Customize', 'secure-centric' ),
        'edit_theme_options',
        'customize.php'
    );
}
add_action( 'admin_menu', 'secure_centric_add_customizer_menu' );

/**
 * Register Customizer Panels, Sections, and Controls
 */
function secure_centric_customize_register( $wp_customize ) {
    // -------------------------------------------------------------------------
    // 1. Global Brand Colors & Typography
    // -------------------------------------------------------------------------
    $wp_customize->add_section( 'sc_global_section', array(
        'title'       => __( 'Global Colors & Typography', 'secure-centric' ),
        'priority'    => 20,
        'description' => __( 'Configure site-wide brand colors and typography. Changes apply instantly across all pages and blocks.', 'secure-centric' ),
    ) );

    // Primary Brand Color (Navy)
    $wp_customize->add_setting( 'sc_primary_color', array(
        'default'           => '#0B1437',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'sc_primary_color', array(
        'label'       => __( 'Primary Brand Color (Navy)', 'secure-centric' ),
        'description' => __( 'Used for headlines, dark backgrounds, navigation, and badges.', 'secure-centric' ),
        'section'     => 'sc_global_section',
        'settings'    => 'sc_primary_color',
    ) ) );

    // Electric Blue Accent
    $wp_customize->add_setting( 'sc_accent_blue', array(
        'default'           => '#2F5BFF',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'sc_accent_blue', array(
        'label'       => __( 'Accent Electric Blue Color', 'secure-centric' ),
        'description' => __( 'Used for primary CTA buttons, active state indicators, and links.', 'secure-centric' ),
        'section'     => 'sc_global_section',
        'settings'    => 'sc_accent_blue',
    ) ) );

    // Cyber Cyan Highlight
    $wp_customize->add_setting( 'sc_cyan_color', array(
        'default'           => '#00D4FF',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'sc_cyan_color', array(
        'label'       => __( 'Cyber Cyan Highlight Color', 'secure-centric' ),
        'description' => __( 'Used for glowing badges, borders, gradients, and accents.', 'secure-centric' ),
        'section'     => 'sc_global_section',
        'settings'    => 'sc_cyan_color',
    ) ) );

    // Light Background (Ice)
    $wp_customize->add_setting( 'sc_ice_bg', array(
        'default'           => '#F4F7FE',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'sc_ice_bg', array(
        'label'       => __( 'Light Section Background (Ice)', 'secure-centric' ),
        'description' => __( 'Used for alternating section backgrounds and light cards.', 'secure-centric' ),
        'section'     => 'sc_global_section',
        'settings'    => 'sc_ice_bg',
    ) ) );

    // Heading Font Family
    $wp_customize->add_setting( 'sc_heading_font', array(
        'default'           => "'Plus Jakarta Sans', sans-serif",
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( 'sc_heading_font', array(
        'label'       => __( 'Global Heading Font Family', 'secure-centric' ),
        'description' => __( 'Select font applied to all headings (H1, H2, H3, H4, H5).', 'secure-centric' ),
        'section'     => 'sc_global_section',
        'type'        => 'select',
        'choices'     => array(
            "'Plus Jakarta Sans', sans-serif" => 'Plus Jakarta Sans (Theme Default)',
            "'Inter', sans-serif"              => 'Inter (Clean & Modern)',
            "'Roboto', sans-serif"             => 'Roboto (Technical Standard)',
            "'JetBrains Mono', monospace"      => 'JetBrains Mono (Defense/Cyber)',
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" => 'System UI Sans-Serif',
        ),
    ) );

    // Body Font Family
    $wp_customize->add_setting( 'sc_body_font', array(
        'default'           => "'Plus Jakarta Sans', sans-serif",
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( 'sc_body_font', array(
        'label'       => __( 'Global Body Font Family', 'secure-centric' ),
        'description' => __( 'Select font applied to body copy, paragraphs, lists, and inputs.', 'secure-centric' ),
        'section'     => 'sc_global_section',
        'type'        => 'select',
        'choices'     => array(
            "'Plus Jakarta Sans', sans-serif" => 'Plus Jakarta Sans (Theme Default)',
            "'Inter', sans-serif"              => 'Inter (Clean & Modern)',
            "'Roboto', sans-serif"             => 'Roboto (Technical Standard)',
            "'Open Sans', sans-serif"          => 'Open Sans (Accessible Body)',
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" => 'System UI Sans-Serif',
        ),
    ) );

    // -------------------------------------------------------------------------
    // 2. Header Options
    // -------------------------------------------------------------------------
    $wp_customize->add_section( 'sc_header_section', array(
        'title'       => __( 'Header Options', 'secure-centric' ),
        'priority'    => 25,
        'description' => __( 'Manage header call-to-action button, direct phone number, and links.', 'secure-centric' ),
    ) );

    $wp_customize->add_setting( 'sc_header_cta_text', array(
        'default'           => 'Talk to an Expert →',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( 'sc_header_cta_text', array(
        'label'   => __( 'Header CTA Button Text', 'secure-centric' ),
        'section' => 'sc_header_section',
        'type'    => 'text',
    ) );

    $wp_customize->add_setting( 'sc_header_cta_url', array(
        'default'           => 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll',
        'sanitize_callback' => 'esc_url_raw',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( 'sc_header_cta_url', array(
        'label'   => __( 'Header CTA Button URL', 'secure-centric' ),
        'section' => 'sc_header_section',
        'type'    => 'url',
    ) );

    $wp_customize->add_setting( 'sc_header_phone', array(
        'default'           => '(323) 410-5941',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( 'sc_header_phone', array(
        'label'   => __( 'Header Phone Number', 'secure-centric' ),
        'section' => 'sc_header_section',
        'type'    => 'text',
    ) );

    // -------------------------------------------------------------------------
    // 3. Footer Options
    // -------------------------------------------------------------------------
    $wp_customize->add_section( 'sc_footer_section', array(
        'title'       => __( 'Footer Options', 'secure-centric' ),
        'priority'    => 30,
        'description' => __( 'Configure footer contact details, legal disclaimers, and copyright.', 'secure-centric' ),
    ) );

    $wp_customize->add_setting( 'sc_footer_copyright', array(
        'default'           => '© 2026 Secure-Centric LLC. All rights reserved.',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( 'sc_footer_copyright', array(
        'label'   => __( 'Copyright Notice Text', 'secure-centric' ),
        'section' => 'sc_footer_section',
        'type'    => 'text',
    ) );

    $wp_customize->add_setting( 'sc_footer_legal_notice', array(
        'default'           => 'Secure-Centric is an accredited Cyber AB Registered Provider Organization (RPO). We provide cybersecurity readiness preparation, documentation, and advisory services. We are not a Certified Third-Party Assessment Organization (C3PAO) and do not issue official CMMC certifications.',
        'sanitize_callback' => 'sanitize_textarea_field',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( 'sc_footer_legal_notice', array(
        'label'   => __( 'Footer Legal Disclaimer Notice', 'secure-centric' ),
        'section' => 'sc_footer_section',
        'type'    => 'textarea',
    ) );
}
add_action( 'customize_register', 'secure_centric_customize_register' );

/**
 * Output Dynamic CSS Variables from Customizer Settings
 */
function secure_centric_customizer_css() {
    $primary_color = get_theme_mod( 'sc_primary_color', '#0B1437' );
    $accent_blue   = get_theme_mod( 'sc_accent_blue', '#2F5BFF' );
    $cyan_color    = get_theme_mod( 'sc_cyan_color', '#00D4FF' );
    $ice_bg        = get_theme_mod( 'sc_ice_bg', '#F4F7FE' );
    $heading_font  = get_theme_mod( 'sc_heading_font', "'Plus Jakarta Sans', sans-serif" );
    $body_font     = get_theme_mod( 'sc_body_font', "'Plus Jakarta Sans', sans-serif" );

    echo '<style id="secure-centric-customizer-css">' . "\n";
    echo ':root {' . "\n";
    if ( ! empty( $primary_color ) ) {
        echo '  --color-navy: ' . esc_attr( $primary_color ) . ' !important;' . "\n";
    }
    if ( ! empty( $accent_blue ) ) {
        echo '  --color-electric-blue: ' . esc_attr( $accent_blue ) . ' !important;' . "\n";
    }
    if ( ! empty( $cyan_color ) ) {
        echo '  --color-cyber-cyan: ' . esc_attr( $cyan_color ) . ' !important;' . "\n";
    }
    if ( ! empty( $ice_bg ) ) {
        echo '  --color-ice: ' . esc_attr( $ice_bg ) . ' !important;' . "\n";
    }
    if ( ! empty( $heading_font ) ) {
        echo '  --font-heading: ' . esc_attr( $heading_font ) . ' !important;' . "\n";
    }
    if ( ! empty( $body_font ) ) {
        echo '  --font-primary: ' . esc_attr( $body_font ) . ' !important;' . "\n";
        echo '  --font-body: ' . esc_attr( $body_font ) . ' !important;' . "\n";
    }
    echo '}' . "\n";
    echo '</style>' . "\n";
}
add_action( 'wp_head', 'secure_centric_customizer_css', 100 );

/**
 * Filter Header & Footer Template Parts to Reflect Customizer Settings
 */
function secure_centric_filter_template_parts( $block_content, $block ) {
    if ( ! empty( $block['blockName'] ) && 'core/template-part' === $block['blockName'] ) {
        // Header template part
        if ( isset( $block['attrs']['slug'] ) && 'header' === $block['attrs']['slug'] ) {
            $cta_text = get_theme_mod( 'sc_header_cta_text', 'Talk to an Expert →' );
            $cta_url  = get_theme_mod( 'sc_header_cta_url', 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll' );
            if ( ! empty( $cta_text ) ) {
                $block_content = preg_replace( '/Talk to an Expert &rarr;/i', esc_html( $cta_text ), $block_content );
            }
            if ( ! empty( $cta_url ) ) {
                $block_content = preg_replace( '/href="https:\/\/api\.leadconnectorhq\.com\/widget\/booking\/[^"]+"/i', 'href="' . esc_url( $cta_url ) . '"', $block_content );
            }
        }
        // Footer template part
        if ( isset( $block['attrs']['slug'] ) && 'footer' === $block['attrs']['slug'] ) {
            $footer_legal = get_theme_mod( 'sc_footer_legal_notice', '' );
            if ( ! empty( $footer_legal ) ) {
                $block_content = preg_replace( '/<p class="legal-notice">.*?<\/p>/s', '<p class="legal-notice">' . esc_html( $footer_legal ) . '</p>', $block_content );
            }
            $footer_copy = get_theme_mod( 'sc_footer_copyright', '' );
            if ( ! empty( $footer_copy ) ) {
                $block_content = preg_replace( '/&copy;\s*2026\s*Secure-Centric\s*LLC\.\s*All\s*rights\s*reserved\./i', esc_html( $footer_copy ), $block_content );
            }
        }
    }
    return $block_content;
}
add_filter( 'render_block', 'secure_centric_filter_template_parts', 10, 2 );
