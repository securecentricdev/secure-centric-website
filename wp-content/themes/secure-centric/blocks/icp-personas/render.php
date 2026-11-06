<?php
/**
 * Render Template for Executive Personas Block
 * Strictly matches demo/assets/js/app.js renderPersonas
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// EXECUTIVE PERSONAS';
$title   = ! empty( $attributes['title'] ) ? $attributes['title'] : 'By Role: What Each Executive Needs From Us';

$items = array();
if ( ! empty( $attributes['personasData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['personasData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['personasData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $items = $decoded;
    }
}

if ( empty( $items ) ) {
    $items = array(
        array( 'CEO / Managing Director', 'Contract retention certainty, fixed flat-fee pricing, zero business disruption, and protection against False Claims Act liabilities.' ),
        array( 'IT Director / VP Engineering', 'Technical architecture guidance, avoiding scope creep, vendor-neutral hardware/software specs, and defensible mock audit preparation.' ),
        array( 'Quality / Compliance Lead', 'Formal System Security Plan (SSP) authoring, policy matrices, dual-source evidence mapping, and seamless audit defense.' ),
        array( 'Shop Floor / Facilities Manager', 'Physical security controls, badge access verification, visitor logs, and separating OT manufacturing machines from corporate networks.' ),
    );
}
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:columns {columns:4}">
  <div class="site-container">
    <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
    <h2 style="margin-bottom: 32px;"><?php echo esc_html( $title ); ?></h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
      <?php foreach ( $items as $p ) : ?>
        <?php
        $role_name = isset( $p[0] ) ? $p[0] : ( isset( $p['name'] ) ? $p['name'] : '' );
        $role_desc = isset( $p[1] ) ? $p[1] : ( isset( $p['desc'] ) ? $p['desc'] : '' );
        ?>
        <div class="card-white">
          <div class="card-icon-box" style="margin-bottom: 12px; font-size: 1.25rem;">👤</div>
          <h4 style="font-size: 1.05rem; margin-bottom: 8px; color: var(--color-navy);"><?php echo esc_html( $role_name ); ?></h4>
          <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;"><?php echo esc_html( $role_desc ); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
