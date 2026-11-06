<?php
/**
 * Render Template for Defense Supply Chain Pathways Block
 * Strictly matches demo/assets/js/app.js renderPaths
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// DEFENSE SUPPLY CHAIN PATHS';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Your Path, Step by Step';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Sequential milestones tailored to your exact role in the Defense Industrial Base.';

$items = array();
if ( ! empty( $attributes['pathsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['pathsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['pathsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $items = $decoded;
    }
}

if ( empty( $items ) ) {
    $items = array(
        array(
            'name'  => 'Prime Contractors',
            'desc'  => 'Must achieve Level 2 certification and enforce supplier flowdowns.',
            'steps' => array( 'Readiness Check', 'Enclave Scoping', 'SSP & POA&M', 'C3PAO Audit' ),
        ),
        array(
            'name'  => 'Tier 1 & Tier 2 Subcontractors',
            'desc'  => 'Facing urgent prime contractor questionnaires and DFARS 7012 clauses.',
            'steps' => array( 'Gap Assessment', 'Remediation Advisory', 'Documentation', 'Audit Defense' ),
        ),
        array(
            'name'  => 'Small Machine Shops & Suppliers',
            'desc'  => 'Receiving CUI engineering drawings with limited internal IT staff.',
            'steps' => array( 'CUI Enclave Setup', 'Policy Suite', 'Readiness Review', 'SPRS Defense' ),
        ),
        array(
            'name'  => 'Software & Cloud Service Providers',
            'desc'  => 'Providing software touching DoD systems requiring FedRAMP Moderate equivalence.',
            'steps' => array( 'Cloud Scoping', 'FedRAMP Verification', 'SSP Authoring', 'Certification' ),
        ),
    );
}
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/audience-paths">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 36px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="pathways-list">
      <?php foreach ( $items as $it ) : ?>
        <?php
        $it_name  = ! empty( $it['name'] ) ? $it['name'] : '';
        $it_desc  = ! empty( $it['desc'] ) ? $it['desc'] : '';
        $it_steps = ! empty( $it['steps'] ) ? (array) $it['steps'] : array();
        $total    = count( $it_steps );
        ?>
        <div class="pathway-card">
          <div class="pathway-info">
            <h4><?php echo esc_html( $it_name ); ?></h4>
            <p><?php echo esc_html( $it_desc ); ?></p>
          </div>
          <div class="pathway-chips">
            <?php foreach ( $it_steps as $idx => $step ) : ?>
              <?php $is_final = ( $idx === $total - 1 ); ?>
              <span class="path-chip <?php echo $is_final ? 'final' : ''; ?>">
                <span class="path-num"><?php echo esc_html( $idx + 1 ); ?>.</span> <?php echo esc_html( $step ); ?>
              </span>
              <?php if ( ! $is_final ) : ?>
                <span class="path-sep">&rarr;</span>
              <?php endif; ?>
            <?php endforeach; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
