<?php
/**
 * Render Template for Section Explainer Block
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// SECTION EXPLAINER';
$title   = ! empty( $attributes['title'] ) ? $attributes['title'] : 'What is CMMC compliance?';
$p1      = ! empty( $attributes['p1'] ) ? $attributes['p1'] : 'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense subcontractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).';
$p2      = ! empty( $attributes['p2'] ) ? $attributes['p2'] : 'Under 32 CFR Part 170 and DFARS 252.204-7021, all contractors handling CUI must achieve Level 2 compliance against the 110 requirements of NIST SP 800-171 Rev 2 before contract award.';
$p3      = ! empty( $attributes['p3'] ) ? $attributes['p3'] : 'Our Cyber AB Registered Practitioners conduct on-site facility walkthroughs, map exact CUI boundaries, guide technical remediation, and co-author your assessor-ready System Security Plan (SSP).';
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group">
  <div class="site-container" style="max-width: 900px;">
    <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
    <h2 style="margin-bottom: 20px;"><?php echo esc_html( $title ); ?></h2>
    <?php if ( ! empty( $p1 ) ) : ?>
      <p style="font-size: 1.0625rem; line-height: 1.7; color: var(--color-body-text); margin-bottom: 16px;">
        <?php echo esc_html( $p1 ); ?>
      </p>
    <?php endif; ?>
    <?php if ( ! empty( $p2 ) ) : ?>
      <p style="font-size: 1.0625rem; line-height: 1.7; color: var(--color-body-text); margin-bottom: 16px;">
        <?php echo esc_html( $p2 ); ?>
      </p>
    <?php endif; ?>
    <?php if ( ! empty( $p3 ) ) : ?>
      <p style="font-size: 1.0625rem; line-height: 1.7; color: var(--color-body-text); margin-bottom: 16px;">
        <?php echo esc_html( $p3 ); ?>
      </p>
    <?php endif; ?>
  </div>
</section>
