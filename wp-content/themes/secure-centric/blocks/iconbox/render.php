<?php
/**
 * Render Template for IconBox Highlight Block
 * Strictly matches demo/assets/js/app.js renderIconBox
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// IN-PERSON VERIFICATION';
$title   = ! empty( $attributes['title'] ) ? $attributes['title'] : 'On-Site Physical & Technical Walkthrough';
$lead    = ! empty( $attributes['lead'] ) ? $attributes['lead'] : 'We inspect real hardware, server rooms, and shop floors.';

$points = array();
if ( ! empty( $attributes['pointsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['pointsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['pointsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $points = $decoded;
    }
}

if ( empty( $points ) ) {
    $points = array(
        'Physical inspection of server closets, network patch panels, and building ingress points',
        'Direct interviews with shop-floor technicians, CNC machinists, and engineers',
        'Verification of air-gapped test networks, CAD workstations, and OT equipment enclaves',
        'Validation of visitor escort logs, badged entry access readers, and video surveillance'
    );
}
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/iconbox-highlight">
  <div class="site-container">
    <div class="iconbox-card">
      <div class="iconbox-header">
        <div class="iconbox-symbol">🏢</div>
        <div>
          <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
          <h3 style="margin-bottom: 10px; color: var(--color-navy);"><?php echo esc_html( $title ); ?></h3>
          <p style="font-size: 1.0625rem; color: var(--color-navy); font-weight: 600;"><?php echo esc_html( $lead ); ?></p>
        </div>
      </div>
      <div class="iconbox-points-grid">
        <?php foreach ( $points as $pt ) : ?>
          <div class="iconbox-point">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><?php echo esc_html( $pt ); ?></span>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
