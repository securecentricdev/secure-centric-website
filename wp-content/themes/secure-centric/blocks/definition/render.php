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

$title = ! empty( $attributes['title'] ) ? $attributes['title'] : 'What is this compliance artifact?';
$desc  = ! empty( $attributes['desc'] ) ? $attributes['desc'] : 'A structured, assessor-tested Excel and PDF template designed to evaluate internal technical controls.';

$points = array();
if ( ! empty( $attributes['pointsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['pointsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['pointsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $points = $decoded;
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
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/definition-callout">
  <div class="site-container">
    <div class="definition-card">
      <span class="section-eyebrow">// COMPLIANCE ARTIFACT DEFINITION</span>
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
    </div>
  </div>
</section>
