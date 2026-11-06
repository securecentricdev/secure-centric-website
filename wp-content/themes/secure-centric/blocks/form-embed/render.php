<?php
/**
 * Render Template for Form Embed Block (Card or Split Layout)
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! function_exists( 'sc_render_form_inner' ) ) {
    function sc_render_form_inner( $attributes ) {
        $form_id    = ! empty( $attributes['formId'] ) ? $attributes['formId'] : '';
        $badge_text = ! empty( $attributes['badgeText'] ) ? $attributes['badgeText'] : 'BILATERAL NDA GUARANTEE';
        $title      = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Book a 30-Minute Scoping Call';
        $subtitle   = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Strictly confidential under Bilateral NDA. We review your CUI boundary and timeline.';
        ?>
        <div class="sc-form-container card card-white" style="padding: clamp(24px, 4vw, 36px); box-shadow: var(--shadow-lg); border-radius: var(--radius-lg); width: 100%; box-sizing: border-box;">
          <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge-pill-cyan" style="background: rgba(47, 91, 255, 0.1); color: var(--color-electric-blue); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 999px;">
              <?php echo esc_html( $badge_text ); ?>
            </span>
            <h3 style="margin-top: 12px; margin-bottom: 8px; color: var(--color-navy); font-size: 1.4rem;"><?php echo esc_html( $title ); ?></h3>
            <p style="color: var(--color-slate); font-size: 0.9375rem; margin: 0; line-height: 1.5;"><?php echo esc_html( $subtitle ); ?></p>
          </div>

          <?php if ( ! empty( $form_id ) && shortcode_exists( 'forminator_form' ) ) : ?>
            <?php echo do_shortcode( '[forminator_form id="' . esc_attr( $form_id ) . '"]' ); ?>
          <?php else : ?>
            <!-- Native Interactive Defense Contractor Scoping Form -->
            <form class="sc-scoping-form" onsubmit="event.preventDefault(); alert('Thank you! Your discovery request has been submitted under bilateral NDA. Our certified Registered Practitioner will respond within 4 business hours.');">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                <div>
                  <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">Your Name *</label>
                  <input type="text" required placeholder="John Miller" class="form-input" />
                </div>
                <div>
                  <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">Work Email *</label>
                  <input type="email" required placeholder="john@defensecontractor.com" class="form-input" />
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                <div>
                  <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">Company / Supplier *</label>
                  <input type="text" required placeholder="Aerospace Machining LLC" class="form-input" />
                </div>
                <div>
                  <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">CMMC Target Level *</label>
                  <select class="form-input" style="height: 46px; background-color: #fff;">
                    <option>CMMC Level 2 (NIST SP 800-171 · 110 Controls)</option>
                    <option>CMMC Level 1 (FCI · 15 Basic Controls)</option>
                    <option>CMMC Level 3 (DIBCAC High · NIST SP 800-172)</option>
                    <option>Not Sure — Boundary Scoping Needed</option>
                  </select>
                </div>
              </div>

              <div style="margin-bottom: 18px;">
                <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">Primary Contract Timeline / Notes</label>
                <textarea rows="3" placeholder="Upcoming DoD contract award dates, current SPRS score status, or CUI handling scope..." class="form-input" style="height: auto; padding: 10px 14px; resize: vertical;"></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; height: 48px; font-size: 1rem;">
                Request Confidential Consultation →
              </button>

              <p style="font-size: 0.75rem; color: var(--color-slate); text-align: center; margin-top: 12px; margin-bottom: 0;">
                🔒 Protected under Mutual NDA · Direct reply from Lead Registered Practitioner within 4 hours
              </p>
            </form>
          <?php endif; ?>
        </div>
        <?php
    }
}

$layout = ! empty( $attributes['layout'] ) ? $attributes['layout'] : 'card';

if ( 'split' === $layout ) :
    $info_eyebrow = ! empty( $attributes['infoEyebrow'] ) ? $attributes['infoEyebrow'] : '// DIRECT ENGAGEMENT';
    $info_title   = ! empty( $attributes['infoTitle'] ) ? $attributes['infoTitle'] : 'Direct Access to Registered Practitioners';
    $info_desc    = ! empty( $attributes['infoDesc'] ) ? $attributes['infoDesc'] : "Every discovery call is led directly by an accredited Cyber AB Registered Practitioner (RP), not a generalist salesperson. We review your contract's DFARS 252.204-7012 clauses and help determine your exact scoping boundaries.";
    $phone        = ! empty( $attributes['phone'] ) ? $attributes['phone'] : '(323) 410-5941';
    $email        = ! empty( $attributes['email'] ) ? $attributes['email'] : 'info@secure-centric.com';
    $location     = ! empty( $attributes['location'] ) ? $attributes['location'] : 'Los Angeles, California · Nationwide On-Site Deployments';
?>
  <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:columns" data-wp-pattern="secure-centric/contact-form-split">
    <div class="site-container">
      <div class="contact-grid-split">
        <!-- Left Info Column -->
        <div class="contact-info-panel">
          <span class="section-eyebrow"><?php echo esc_html( $info_eyebrow ); ?></span>
          <h2 style="margin-bottom: 16px; font-size: 2rem; color: var(--color-navy);"><?php echo esc_html( $info_title ); ?></h2>
          <p style="color: var(--color-body-text); margin-bottom: 24px; line-height: 1.6; font-size: 1.05rem;">
            <?php echo esc_html( $info_desc ); ?>
          </p>

          <div class="contact-card-box card-white" style="border: 1px solid var(--color-border); border-radius: 12px; padding: 24px; margin-bottom: 24px; background: #fff;">
            <h4 style="margin-bottom: 16px; font-size: 1.1rem; color: var(--color-navy);">Direct Contractor Inquiries</h4>
            <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.9375rem;">
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <span style="font-size: 1.3rem;">📞</span>
                <div>
                  <b style="color: var(--color-navy);">Direct Line:</b>
                  <div><a href="tel:<?php echo esc_attr( preg_replace( '/[^0-9]/', '', $phone ) ); ?>" style="color: var(--color-electric-blue); font-weight: 700; font-size: 1.05rem;"><?php echo esc_html( $phone ); ?></a></div>
                  <small style="color: var(--color-slate);">Mon – Fri: 8:00 AM – 6:00 PM PT</small>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <span style="font-size: 1.3rem;">✉️</span>
                <div>
                  <b style="color: var(--color-navy);">Confidential Email:</b>
                  <div><a href="mailto:<?php echo esc_attr( $email ); ?>" style="color: var(--color-electric-blue); font-weight: 700;"><?php echo esc_html( $email ); ?></a></div>
                  <small style="color: var(--color-slate);">PGP encryption available upon request</small>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <span style="font-size: 1.3rem;">📍</span>
                <div>
                  <b style="color: var(--color-navy);">Headquarters:</b>
                  <div style="color: var(--color-body-text);"><?php echo esc_html( $location ); ?></div>
                </div>
              </div>
            </div>
          </div>

          <div style="background: rgba(47, 91, 255, 0.05); border: 1px solid rgba(47, 91, 255, 0.2); border-radius: 8px; padding: 16px;">
            <b style="color: var(--color-navy); font-size: 0.875rem;">🔒 Bilateral NDA Standard</b>
            <p style="font-size: 0.8125rem; color: var(--color-body-text); margin: 6px 0 0; line-height: 1.5;">
              We sign your company's mutual NDA or provide ours prior to reviewing contract clauses, network architecture diagrams, or CUI boundary data.
            </p>
          </div>
        </div>

        <!-- Right Form Column -->
        <div class="contact-form-panel">
          <?php sc_render_form_inner( $attributes ); ?>
        </div>
      </div>
    </div>
  </section>
<?php else : ?>
  <div style="max-width: 680px; margin: 0 auto;">
    <?php sc_render_form_inner( $attributes ); ?>
  </div>
<?php endif; ?>
