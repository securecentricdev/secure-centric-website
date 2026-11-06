<?php
/**
 * Render Template for Defense Supply Chain Tiers (DIB) Block
 * Strictly matches demo/assets/js/app.js renderDIB
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// DEFENSE INDUSTRIAL BASE (DIB)';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'By Position in the Defense Supply Chain';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Where defense contractors sit in the DoD supply chain and what triggers compliance.';

$items = array();
if ( ! empty( $attributes['dibData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['dibData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['dibData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $items = $decoded;
    }
}

if ( empty( $items ) ) {
    $items = array(
        array(
            'role'      => 'Prime Contractors (Tier 1)',
            'trigger'   => 'Direct contract award from NAVAIR, NAVSEA, USAF, Army with DFARS 252.204-7021.',
            'level'     => 'Level 2 / Level 3 Certification',
            'firstStep' => 'Enterprise CUI boundary segmentation & formal mock DIBCAC defense.',
        ),
        array(
            'role'      => 'Subcontractors & Component Makers (Tier 2-3)',
            'trigger'   => 'Flowdown clauses in purchase orders from Boeing, Lockheed Martin, Northrop Grumman, General Dynamics.',
            'level'     => 'Level 2 (3-Year C3PAO Audit)',
            'firstStep' => 'On-site facility inspection, SPRS score calculation, and enclave scoping.',
        ),
        array(
            'role'      => 'Build-to-Print Precision Machine Shops',
            'trigger'   => 'DoD technical engineering drawings, CAD models, and specs marked as CUI.',
            'level'     => 'Level 2 (Scoping Boundary Crucial)',
            'firstStep' => 'Isolate shop floor CNC controllers and build a secure enclave for CAD files.',
        ),
        array(
            'role'      => 'Defense Software, MSPs & Cloud SaaS',
            'trigger'   => 'Hosting, processing, or transmitting DoD data under DFARS 252.204-7012.',
            'level'     => 'Level 2 + FedRAMP Moderate Equivalency',
            'firstStep' => 'Verify FedRAMP High/Moderate baseline and configure cloud identity boundary.',
        ),
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/dib-supply-chain">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 36px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="dib-grid">
      <?php foreach ( $items as $it ) : ?>
        <div class="dib-card">
          <div class="dib-badge"><?php echo esc_html( $it['role'] ); ?></div>
          <div class="dib-field">
            <span class="dib-label">Typical Trigger:</span>
            <p><?php echo esc_html( $it['trigger'] ); ?></p>
          </div>
          <div class="dib-field">
            <span class="dib-label">Target Level:</span>
            <p><strong><?php echo esc_html( $it['level'] ); ?></strong></p>
          </div>
          <div class="dib-field">
            <span class="dib-label">First Action:</span>
            <p><?php echo esc_html( $it['firstStep'] ); ?></p>
          </div>
          <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="text-link" style="margin-top: 12px; display: inline-block;">Explore Your Path &rarr;</a>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
