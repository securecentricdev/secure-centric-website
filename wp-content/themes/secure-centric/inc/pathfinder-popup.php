<?php
/**
 * CMMC Newsletter Floating Lead Popup
 * Appears after 30% page scroll across all pages.
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Render Newsletter Popup HTML & JavaScript in wp_footer
 */
function sc_render_pathfinder_popup() {
    // Avoid rendering in admin, feeds, or XMLRPC
    if ( is_admin() || is_feed() ) {
        return;
    }
    ?>
    <!-- Bottom-Right Floating Lead Popup (Secure-Centric Newsletter) -->
    <div class="floating-lead-popup" id="floating-lead-popup" aria-hidden="true" role="dialog" aria-labelledby="sc-popup-heading">
        <div class="popup-banner">
            <div class="popup-banner-header">
                <span class="popup-logo-tag">SECURE-CENTRIC NEWSLETTER</span>
                <button type="button" class="popup-close-btn" id="sc-popup-close-btn" aria-label="Close popup">&times;</button>
            </div>
            <h4 id="sc-popup-heading">Stay ahead of CMMC changes</h4>
        </div>
        <div class="popup-body">
            <p class="popup-desc">Get every update on CMMC and NIST SP 800-171, straight to your inbox.</p>
            <form id="sc-pathfinder-popup-form">
                <input type="text" class="form-input" name="full_name" id="sc-pathfinder-name" placeholder="Full name" required style="margin-bottom: 10px; height: 40px; width: 100%; box-sizing: border-box; padding: 0 12px; border: 1.5px solid #E2E8F0; border-radius: 6px; font-size: 0.875rem;" />
                <input type="email" class="form-input" name="email" id="sc-pathfinder-email" placeholder="Company email" required style="margin-bottom: 10px; height: 40px; width: 100%; box-sizing: border-box; padding: 0 12px; border: 1.5px solid #E2E8F0; border-radius: 6px; font-size: 0.875rem;" />
                <button type="submit" class="popup-btn" id="sc-pathfinder-submit-btn">Subscribe &rarr;</button>
                <p style="font-size: 0.75rem; color: #64748B; margin-top: 10px; margin-bottom: 0; text-align: center;">
                    No spam. Unsubscribe anytime.
                </p>
            </form>
            <div id="sc-pathfinder-success" style="display: none; padding: 14px 10px; text-align: center; background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 6px; color: #166534; font-size: 0.85rem; line-height: 1.4; margin-top: 6px;">
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 4px;">✓ Subscribed!</div>
                Thank you for subscribing to CMMC updates.
            </div>
        </div>
    </div>

    <!-- Minimized Floating Trigger Pill -->
    <div class="floating-min-trigger" id="floating-min-trigger" role="button" tabindex="0" aria-label="Open CMMC Newsletter">
        <span class="pulse-dot"></span>
        <span>📬 CMMC Newsletter</span>
    </div>

    <!-- Scroll & Interactive Controller -->
    <script>
    (function () {
        'use strict';

        var popup = document.getElementById('floating-lead-popup');
        var minTrigger = document.getElementById('floating-min-trigger');
        var closeBtn = document.getElementById('sc-popup-close-btn');
        var form = document.getElementById('sc-pathfinder-popup-form');
        var successMsg = document.getElementById('sc-pathfinder-success');
        var nameInput = document.getElementById('sc-pathfinder-name');
        var emailInput = document.getElementById('sc-pathfinder-email');
        var submitBtn = document.getElementById('sc-pathfinder-submit-btn');

        if (!popup || !minTrigger) return;

        var isDismissed = sessionStorage.getItem('sc_pathfinder_dismissed') === '1';
        var hasTriggered = false;

        function getScrollPercentage() {
            var doc = document.documentElement;
            var body = document.body;
            var scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
            var scrollHeight = Math.max(
                body.scrollHeight, doc.scrollHeight,
                body.offsetHeight, doc.offsetHeight,
                body.clientHeight, doc.clientHeight
            ) - window.innerHeight;

            if (scrollHeight <= 0) return 0;
            return (scrollTop / scrollHeight) * 100;
        }

        function showPopup() {
            if (isDismissed || hasTriggered) return;
            hasTriggered = true;
            popup.classList.add('visible');
            popup.setAttribute('aria-hidden', 'false');
            if (minTrigger) minTrigger.classList.remove('visible');
        }

        function dismissPopup() {
            isDismissed = true;
            sessionStorage.setItem('sc_pathfinder_dismissed', '1');
            popup.classList.remove('visible');
            popup.setAttribute('aria-hidden', 'true');
            if (minTrigger) minTrigger.classList.add('visible');
        }

        function restorePopup() {
            isDismissed = false;
            sessionStorage.removeItem('sc_pathfinder_dismissed');
            if (minTrigger) minTrigger.classList.remove('visible');
            popup.classList.add('visible');
            popup.setAttribute('aria-hidden', 'false');
            if (nameInput) nameInput.focus();
        }

        // Scroll listener: Trigger after 30% page scroll
        function handleScroll() {
            if (hasTriggered || isDismissed) return;
            if (getScrollPercentage() >= 30) {
                showPopup();
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check in case user lands or refreshes mid-page
        setTimeout(function () {
            if (getScrollPercentage() >= 30) {
                showPopup();
            } else if (isDismissed) {
                minTrigger.classList.add('visible');
            }
        }, 500);

        // Click handlers
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.preventDefault();
                dismissPopup();
            });
        }

        if (minTrigger) {
            minTrigger.addEventListener('click', function (e) {
                e.preventDefault();
                restorePopup();
            });
            minTrigger.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    restorePopup();
                }
            });
        }

        // Popup Form submission & GHL automation
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var fullName = nameInput ? nameInput.value.trim() : '';
                var email = emailInput ? emailInput.value.trim() : '';
                if (!email) return;

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Subscribing...';
                }

                // Send lead data to GoHighLevel Flow 1 Newsletter Webhook
                var webhookUrl = 'https://services.leadconnectorhq.com/hooks/WMj6saOcBwOMZmggMv4l/webhook-trigger/d25QEncpiHDximq4fREr';
                var payload = {
                    full_name: fullName,
                    name: fullName,
                    email: email,
                    activity_type: 'newsletter_subscription',
                    form_name: 'Secure-Centric Newsletter Popup',
                    lead_magnet_name: 'Secure-Centric Newsletter Popup',
                    source_page_url: window.location.href,
                    tags: ['source - website', 'website - lead - newsletter'],
                    submitted_at: new Date().toISOString()
                };

                try {
                    fetch(webhookUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    }).catch(function () {});
                } catch (err) {}

                // Display success message
                form.style.display = 'none';
                if (successMsg) successMsg.style.display = 'block';

                // Automatically minimize after 3 seconds
                setTimeout(function () {
                    dismissPopup();
                }, 3000);
            });
        }

        // Footer Newsletter Form submission handler
        var footerForm = document.getElementById('sc-footer-newsletter-form');
        var footerSuccess = document.getElementById('sc-footer-newsletter-success');
        if (footerForm) {
            footerForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var footerEmailInput = document.getElementById('sc-footer-email');
                var footerSubmitBtn = document.getElementById('sc-footer-submit-btn');
                var email = footerEmailInput ? footerEmailInput.value.trim() : '';
                if (!email) return;

                if (footerSubmitBtn) {
                    footerSubmitBtn.disabled = true;
                    footerSubmitBtn.textContent = 'Subscribing...';
                }

                var webhookUrl = 'https://services.leadconnectorhq.com/hooks/WMj6saOcBwOMZmggMv4l/webhook-trigger/d25QEncpiHDximq4fREr';
                var payload = {
                    email: email,
                    activity_type: 'newsletter_subscription',
                    form_name: 'Footer Newsletter',
                    lead_magnet_name: 'Footer Newsletter',
                    source_page_url: window.location.href,
                    tags: ['source - website', 'website - lead - newsletter'],
                    submitted_at: new Date().toISOString()
                };

                try {
                    fetch(webhookUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    }).catch(function () {});
                } catch (err) {}

                footerForm.style.display = 'none';
                if (footerSuccess) footerSuccess.style.display = 'block';
            });
        }

        // CUI Session Hero Form Redirect Controller (/cui-session/)
        var cuiForm = document.getElementById('cui-session-booking-form');
        if (cuiForm) {
            cuiForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var nameInput = document.getElementById('cui-name');
                var emailInput = document.getElementById('cui-email');
                var companyInput = document.getElementById('cui-company');
                var submitBtn = cuiForm.querySelector('button[type="submit"]');

                var name = nameInput ? nameInput.value.trim() : '';
                var email = emailInput ? emailInput.value.trim() : '';
                var company = companyInput ? companyInput.value.trim() : '';

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Redirecting to booking...';
                }

                var targetBookingUrl = 'https://api.leadconnectorhq.com/widget/booking/eVwMlhdbXuKhKkkYMGa1';
                var params = [];
                if (name) params.push('name=' + encodeURIComponent(name));
                if (email) params.push('email=' + encodeURIComponent(email));
                if (company) params.push('company=' + encodeURIComponent(company));
                if (params.length) {
                    targetBookingUrl += (targetBookingUrl.indexOf('?') === -1 ? '?' : '&') + params.join('&');
                }

                // Send lead data to GoHighLevel Flow 3 Webhook
                var cuiWebhook = 'https://services.leadconnectorhq.com/hooks/WMj6saOcBwOMZmggMv4l/webhook-trigger/JaplJZpdWAub1oAZHgh6';
                var cuiPayload = {
                    name: name,
                    email: email,
                    company_name: company,
                    activity_type: 'cui_session_request',
                    lead_magnet_name: 'Free CUI Identification Session',
                    source_page_url: window.location.href,
                    tags: ['source - website', 'website - lead - cui-session'],
                    submitted_at: new Date().toISOString()
                };

                try {
                    fetch(cuiWebhook, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(cuiPayload)
                    }).finally(function () {
                        window.location.href = targetBookingUrl;
                    });
                } catch (err) {
                    window.location.href = targetBookingUrl;
                }

                setTimeout(function () {
                    window.location.href = targetBookingUrl;
                }, 600);
            });
        }

        // Expose globally for backward compatibility with demo controls
        window.dismissPopup = dismissPopup;
        window.restorePopup = restorePopup;
    })();
    </script>
    <?php
}
add_action( 'wp_footer', 'sc_render_pathfinder_popup', 30 );
