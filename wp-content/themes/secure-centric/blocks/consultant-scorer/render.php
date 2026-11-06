<?php
/**
 * Render Template for Consultant Selection Scorer (7 Checks)
 * Strictly matches demo/assets/js/app.js renderTool
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// DECISION FRAMEWORK';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'How to choose a CMMC consultant: 7 checks';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Check every qualification before engaging any CMMC advisory firm.';

$checks = array();
if ( ! empty( $attributes['checksData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['checksData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['checksData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $checks = $decoded;
    }
}

if ( empty( $checks ) ) {
    $checks = array(
        array( 'label' => 'Cyber AB Accredited Registered Provider Organization (RPO)' ),
        array( 'label' => 'Employs certified Registered Practitioners (RP) on staff' ),
        array( 'label' => 'Conducts in-person physical site walkthroughs of facility' ),
        array( 'label' => '100% independent advice (zero hardware/resale conflicts)' ),
        array( 'label' => 'Transparent fixed flat-fee pricing with deliverable milestones' ),
        array( 'label' => 'Proven C3PAO first-pass defense and mock assessment prep' ),
        array( 'label' => 'Comprehensive System Security Plan (SSP) and POA&M authoring' ),
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/consultant-scorer">
  <div class="site-container">
    <div class="section-header-center" style="margin-bottom: 36px; text-align: center;">
      <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); max-width: 650px; margin: 0 auto;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="tool-scorer-card">
      <div class="scorer-list">
        <?php foreach ( $checks as $i => $c ) : ?>
          <?php $lbl = is_array( $c ) && ! empty( $c['label'] ) ? $c['label'] : ( is_string( $c ) ? $c : '' ); ?>
          <label class="scorer-item">
            <input type="checkbox" checked disabled class="scorer-check" />
            <span class="scorer-label"><strong>0<?php echo esc_html( $i + 1 ); ?>.</strong> <?php echo esc_html( $lbl ); ?></span>
            <span class="scorer-status-pass">&check; Secure-Centric Verified</span>
          </label>
        <?php endforeach; ?>
      </div>
      <div class="scorer-result-box">
        <div class="scorer-score-circle">
          <span class="score-val">7 / 7</span>
          <span class="score-sub">Full Compliance</span>
        </div>
        <h4 style="color: var(--color-navy); font-size: 1.15rem; margin-bottom: 10px;">100% Verified CMMC Advisory Standard</h4>
        <p style="color: var(--color-body-text); font-size: 0.9375rem; line-height: 1.6; margin-bottom: 18px;">
          Secure-Centric satisfies all 7 rigorous criteria: Cyber AB RPO accreditation, active Registered Practitioners, on-site audits, 100% independent conflict-free advice, flat-fee pricing, and guaranteed readiness.
        </p>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-primary" style="width: 100%; text-align: center; justify-content: center;">Book a Discovery Call &rarr;</a>
      </div>
    </div>
  </div>
</section>
