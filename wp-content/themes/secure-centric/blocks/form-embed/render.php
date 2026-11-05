<?php
/**
 * Render Template for Form Embed Block
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$form_id    = ! empty( $attributes['formId'] ) ? $attributes['formId'] : '';
$badge_text = ! empty( $attributes['badgeText'] ) ? $attributes['badgeText'] : 'BILATERAL NDA GUARANTEE';
$title      = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Book a 30-Minute Scoping Call';
$subtitle   = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Strictly confidential under Bilateral NDA. We review your CUI boundary and timeline.';
?>

<div class="sc-form-container card card-white" style="padding: clamp(24px, 4vw, 40px); box-shadow: var(--shadow-lg); border-radius: var(--radius-lg); max-width: 680px; margin: 0 auto;">
  <div style="text-align: center; margin-bottom: 28px;">
    <span class="badge-pill-cyan" style="background: rgba(47, 91, 255, 0.1); color: var(--color-electric-blue); font-size: 0.75rem;">
      <?php echo esc_html( $badge_text ); ?>
    </span>
    <h3 style="margin-top: 10px; margin-bottom: 8px; color: var(--color-navy);"><?php echo esc_html( $title ); ?></h3>
    <p style="color: var(--color-slate); font-size: 0.9375rem; margin: 0; line-height: 1.5;"><?php echo esc_html( $subtitle ); ?></p>
  </div>

  <?php if ( ! empty( $form_id ) && shortcode_exists( 'forminator_form' ) ) : ?>
    <?php echo do_shortcode( '[forminator_form id="' . esc_attr( $form_id ) . '"]' ); ?>
  <?php else : ?>
    <!-- Native Interactive Defense Contractor Scoping Form -->
    <form class="sc-scoping-form" onsubmit="event.preventDefault(); alert('Thank you! Your discovery request has been submitted under bilateral NDA. Our certified Registered Practitioner will respond within 4 business hours.');">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div>
          <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">Your Name *</label>
          <input type="text" required placeholder="John Doe" style="width: 100%; padding: 12px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.9375rem;" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">Work Email *</label>
          <input type="email" required placeholder="john@defensecontractor.com" style="width: 100%; padding: 12px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.9375rem;" />
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div>
          <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">Company / Prime Supplier *</label>
          <input type="text" required placeholder="Aerospace Manufacturing LLC" style="width: 100%; padding: 12px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.9375rem;" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">CMMC Level Target *</label>
          <select style="width: 100%; padding: 12px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.9375rem;">
            <option>CMMC Level 2 (NIST SP 800-171 / 110 Controls)</option>
            <option>CMMC Level 1 (FCI / 15 Basic Controls)</option>
            <option>CMMC Level 3 (DIBCAC High / NIST SP 800-172)</option>
            <option>Not Sure / Needs Scoping Review</option>
          </select>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">Primary Contract Timeline / Notes</label>
        <textarea rows="3" placeholder="Tell us about your upcoming DoD RFP date or prime contractor flowdown deadline..." style="width: 100%; padding: 12px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.9375rem; font-family: inherit; resize: vertical;"></textarea>
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 14px; font-size: 1rem;">
        Request Confidential Consultation →
      </button>

      <p style="font-size: 0.75rem; color: var(--color-slate); text-align: center; margin-top: 12px; margin-bottom: 0;">
        Protected under Mutual NDA · No spam · Lead Registered Practitioner reply within 4 hours
      </p>
    </form>
  <?php endif; ?>
</div>
