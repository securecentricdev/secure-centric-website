<?php
/**
 * Render Template for NIST Control Families Grid Cards Block
 * Strictly matches demo/assets/js/app.js renderTiles
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// 110 CONTROLS IN 14 FAMILIES';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'The 14 Control Families of NIST SP 800-171';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'The complete NIST SP 800-171 Rev 2 security control architecture required for CMMC Level 2.';

$families = array();
if ( ! empty( $attributes['tilesData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['tilesData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['tilesData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $families = $decoded;
    }
}

if ( empty( $families ) ) {
    $families = array(
        array( 'code' => 'AC', 'name' => 'Access Control', 'count' => '22 Controls' ),
        array( 'code' => 'AT', 'name' => 'Awareness & Training', 'count' => '3 Controls' ),
        array( 'code' => 'AU', 'name' => 'Audit & Accountability', 'count' => '9 Controls' ),
        array( 'code' => 'CM', 'name' => 'Configuration Mgmt', 'count' => '9 Controls' ),
        array( 'code' => 'IA', 'name' => 'Identification & Auth', 'count' => '11 Controls' ),
        array( 'code' => 'IR', 'name' => 'Incident Response', 'count' => '3 Controls' ),
        array( 'code' => 'MA', 'name' => 'Maintenance', 'count' => '6 Controls' ),
        array( 'code' => 'MP', 'name' => 'Media Protection', 'count' => '8 Controls' ),
        array( 'code' => 'PS', 'name' => 'Personnel Security', 'count' => '2 Controls' ),
        array( 'code' => 'PE', 'name' => 'Physical Protection', 'count' => '6 Controls' ),
        array( 'code' => 'RA', 'name' => 'Risk Assessment', 'count' => '3 Controls' ),
        array( 'code' => 'CA', 'name' => 'Security Assessment', 'count' => '4 Controls' ),
        array( 'code' => 'SC', 'name' => 'System & Comms', 'count' => '16 Controls' ),
        array( 'code' => 'SI', 'name' => 'System & Info Integrity', 'count' => '7 Controls' ),
    );
}
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/14-control-families">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 36px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="families-grid">
      <?php foreach ( $families as $f ) : ?>
        <div class="family-card">
          <div class="family-code"><?php echo esc_html( $f['code'] ); ?></div>
          <div class="family-name"><?php echo esc_html( $f['name'] ); ?></div>
          <div class="family-count"><?php echo esc_html( $f['count'] ); ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
