<?php
/**
 * Render Template for Compliance Artifact Definition Block
 * Strictly matches demo/assets/js/app.js renderDefinition
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// COMPLIANCE ARTIFACT DEFINITION';
$title   = ! empty( $attributes['title'] ) ? $attributes['title'] : 'What is this compliance artifact?';
$desc    = ! empty( $attributes['desc'] ) ? $attributes['desc'] : 'A structured, assessor-tested Excel and PDF template designed to evaluate internal technical controls.';

$points = array();
if ( ! empty( $attributes['pointsData'] ) ) {
    $raw = trim( (string) $attributes['pointsData'] );
    // Try JSON decode first
    if ( strpos( $raw, '[' ) === 0 ) {
        $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $raw ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $raw ), true );
        if ( is_array( $decoded ) && ! empty( $decoded ) ) {
            $points = $decoded;
        }
    }
    // If not JSON or empty decode, split by lines
    if ( empty( $points ) ) {
        $lines = preg_split( '/\r\n|\r|\n/', $raw );
        foreach ( $lines as $line ) {
            $cleaned = trim( preg_replace( '/^([✓✔\-*•–+]|\x{2022}|\d+[\.)])\s*/u', '', trim( $line ) ) );
            if ( ! empty( $cleaned ) ) {
                $points[] = $cleaned;
            }
        }
    }
}

if ( empty( $points ) ) {
    $points = array(
        '110 exact NIST SP 800-171 Rev 2 controls mapped to 320 C3PAO assessment objectives',
        'Built-in SPRS scoring calculator formulas with automatic score rollup',
        'Responsible team member assignment fields and remediation target dates',
        'Evidence artifact documentation index for audit binder assembly',
    );
}

$cta_text       = ! empty( $attributes['ctaText'] ) ? trim( (string) $attributes['ctaText'] ) : '';
$default_booking = function_exists( 'sc_get_booking_url' ) ? sc_get_booking_url() : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';
$cta_url        = ! empty( $attributes['ctaUrl'] ) ? ( function_exists( 'sc_resolve_page_url' ) ? sc_resolve_page_url( $attributes['ctaUrl'] ) : $attributes['ctaUrl'] ) : $default_booking;
$cta_subtext    = ! empty( $attributes['ctaSubtext'] ) ? trim( (string) $attributes['ctaSubtext'] ) : '';

$secondary_cta_text = ! empty( $attributes['secondaryCtaText'] ) ? trim( (string) $attributes['secondaryCtaText'] ) : '';
$secondary_cta_url  = ! empty( $attributes['secondaryCtaUrl'] ) ? ( function_exists( 'sc_resolve_page_url' ) ? sc_resolve_page_url( $attributes['secondaryCtaUrl'] ) : $attributes['secondaryCtaUrl'] ) : home_url( '/contact/' );
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/definition-callout">
  <div class="site-container">
    <div class="definition-card">
      <?php if ( ! empty( $eyebrow ) ) : ?>
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <?php endif; ?>
      <h2 style="margin-bottom: 16px; color: var(--color-navy);"><?php echo esc_html( $title ); ?></h2>
      <p class="definition-desc"><?php echo esc_html( $desc ); ?></p>
      <div class="definition-points">
        <?php foreach ( $points as $pt ) : ?>
          <div class="def-point-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><?php echo esc_html( $pt ); ?></span>
          </div>
        <?php endforeach; ?>
      </div>

      <?php if ( ! empty( $cta_text ) ) : ?>
      <div class="definition-cta" style="margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--color-border); display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
        <a href="<?php echo esc_url( $cta_url ); ?>" class="btn btn-primary btn-lg"><?php echo esc_html( $cta_text ); ?></a>
        <?php if ( ! empty( $secondary_cta_text ) ) : ?>
          <a href="<?php echo esc_url( $secondary_cta_url ); ?>" class="btn btn-outline btn-lg"><?php echo esc_html( $secondary_cta_text ); ?></a>
        <?php endif; ?>
        <?php if ( ! empty( $cta_subtext ) ) : ?>
          <span class="definition-cta-subtext" style="font-size: 0.875rem; color: var(--color-muted);"><?php echo esc_html( $cta_subtext ); ?></span>
        <?php endif; ?>
      </div>
      <?php endif; ?>
    </div>
  </div>
</section>
