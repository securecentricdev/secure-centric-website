<?php
/**
 * Render Template for Boundary Diagram Block
 * Strictly matches demo/assets/js/app.js renderDiagram
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// BOUNDARY SEGREGATION';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'CUI Data Flow & Boundary Isolation Architecture';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Data flow path defining CUI entry, processing, storage, and physical facility boundaries.';

$steps = array();
if ( ! empty( $attributes['stepsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['stepsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['stepsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $steps = $decoded;
    }
}

if ( empty( $steps ) ) {
    $steps = array(
        array( 'label' => 'CUI Ingestion', 'desc' => 'DoD portal download via encrypted FIPS-validated TLS session' ),
        array( 'label' => 'Enclave Isolation', 'desc' => 'Air-gapped or VLAN-segmented tenant with hardware MFA gating' ),
        array( 'label' => 'Workcenter Processing', 'desc' => 'Dedicated engineering CAD workstations with disabled USB ports' ),
        array( 'label' => 'Encrypted Storage', 'desc' => 'AES-256 BitLocker encrypted repos with centralized SIEM logging' )
    );
}

$total_steps = count( $steps );
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/boundary-diagram">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 32px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="diagram-flow-box">
      <div class="diagram-flow-grid">
        <?php foreach ( $steps as $i => $st ) : ?>
          <?php
          $lbl  = ! empty( $st['label'] ) ? $st['label'] : ( ! empty( $st['title'] ) ? $st['title'] : 'Node ' . ( $i + 1 ) );
          $desc = ! empty( $st['desc'] ) ? $st['desc'] : '';
          $num  = sprintf( '%02d', $i + 1 );
          ?>
          <div class="diagram-node">
            <div class="diagram-node-num"><?php echo esc_html( $num ); ?></div>
            <h4><?php echo esc_html( $lbl ); ?></h4>
            <p><?php echo esc_html( $desc ); ?></p>
          </div>
          <?php if ( $i < $total_steps - 1 ) : ?>
            <div class="diagram-connector">&rarr;</div>
          <?php endif; ?>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
