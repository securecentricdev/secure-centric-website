<?php
/**
 * CMMC Pathfinder Floating Lead Popup
 * Appears after 30% page scroll across all pages.
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Render Pathfinder Popup HTML & JavaScript in wp_footer
 */
function sc_render_pathfinder_popup() {
    // Avoid rendering in admin, feeds, or XMLRPC
    if ( is_admin() || is_feed() ) {
        return;
    }
    ?>
    <!-- Bottom-Right Floating Lead Popup (CMMC Pathfinder) -->
    <div class="floating-lead-popup" id="floating-lead-popup" aria-hidden="true" role="dialog" aria-labelledby="sc-popup-heading">
        <div class="popup-banner">
            <div class="popup-banner-header">
                <span class="popup-logo-tag">SECURE-CENTRIC // PATHFINDER</span>
                <button type="button" class="popup-close-btn" id="sc-popup-close-btn" aria-label="Close popup">&times;</button>
            </div>
            <h4 id="sc-popup-heading">Find your path to CMMC in under 5 minutes</h4>
        </div>
        <div class="popup-body">
            <p class="popup-desc">Get your custom Level 1 or Level 2 readiness roadmap and 2026 contractor checklist.</p>
            <form id="sc-pathfinder-popup-form">
                <input type="email" class="form-input" name="email" id="sc-pathfinder-email" placeholder="EMAIL*" required style="margin-bottom: 10px; height: 40px; width: 100%; box-sizing: border-box; padding: 0 12px; border: 1.5px solid #E2E8F0; border-radius: 6px; font-size: 0.875rem;" />
                <button type="submit" class="popup-btn" id="sc-pathfinder-submit-btn">Start the Quiz &rarr;</button>
            </form>
            <div id="sc-pathfinder-success" style="display: none; padding: 14px 10px; text-align: center; background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 6px; color: #166534; font-size: 0.85rem; line-height: 1.4; margin-top: 6px;">
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 4px;">✓ Assessment Started!</div>
                Check your inbox for your custom CMMC readiness roadmap.
            </div>
        </div>
    </div>

    <!-- Minimized Floating Trigger Pill -->
    <div class="floating-min-trigger" id="floating-min-trigger" role="button" tabindex="0" aria-label="Open CMMC Pathfinder Assessment">
        <span class="pulse-dot"></span>
        <span>🎯 CMMC Pathfinder (5 Min)</span>
    </div>

    <!-- Pathfinder Scroll & Interactive Controller -->
    <script>
    (function () {
        'use strict';

        var popup = document.getElementById('floating-lead-popup');
        var minTrigger = document.getElementById('floating-min-trigger');
        var closeBtn = document.getElementById('sc-popup-close-btn');
        var form = document.getElementById('sc-pathfinder-popup-form');
        var successMsg = document.getElementById('sc-pathfinder-success');
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
            if (emailInput) emailInput.focus();
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

        // Form submission & GHL automation
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var email = emailInput ? emailInput.value.trim() : '';
                if (!email) return;

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Preparing Quiz...';
                }

                // Send lead data to GoHighLevel Flow 3 Webhook
                var webhookUrl = 'https://services.leadconnectorhq.com/hooks/WMj6saOcBwOMZmggMv4l/webhook-trigger/JaplJZpdWAub1oAZHgh6';
                var payload = {
                    email: email,
                    activity_type: 'pathfinder_quiz',
                    lead_magnet_name: 'CMMC Pathfinder Assessment Quiz',
                    source_page_url: window.location.href,
                    tags: ['source - website', 'website - lead - pathfinder-quiz'],
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

        // Expose globally for backward compatibility with demo controls
        window.dismissPopup = dismissPopup;
        window.restorePopup = restorePopup;
    })();
    </script>
    <?php
}
add_action( 'wp_footer', 'sc_render_pathfinder_popup', 30 );
