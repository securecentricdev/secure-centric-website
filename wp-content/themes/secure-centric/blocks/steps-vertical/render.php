<?php
/**
 * Render Template for Vertical Steps Table Block
 * Strictly matches demo/assets/js/app.js renderStepsV
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// DETAILED REVIEW STAGES';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Detailed review stages';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Every activity, team participant, and tangible deliverable produced during this review.';

$steps = array();
if ( ! empty( $attributes['stepsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['stepsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['stepsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $steps = $decoded;
    }
}

if ( empty( $steps ) ) {
    $steps = array(
        array(
            'step'   => '01',
            'name'   => 'Scoping Discovery & Facility Inspection',
            'who'    => 'RP Lead + IT Director',
            'output' => 'CUI Boundary Diagram + Asset Inventory Baseline'
        ),
        array(
            'step'   => '02',
            'name'   => 'Control Objective Verification',
            'who'    => 'Registered Practitioner + System Admins',
            'output' => '110-Control Findings Matrix + Weighted SPRS Gap Score'
        ),
        array(
            'step'   => '03',
            'name'   => 'Remediation Roadmap & Budget Prioritization',
            'who'    => 'RP Lead + Executive Sponsor',
            'output' => 'Action Item Tracker + Assessor Evidence Collection Plan'
        )
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/steps-vertical">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 32px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="steps-v-container">
      <div class="steps-v-header-row">
        <span style="width: 48px;">#</span>
        <span style="flex: 1.2;">Review Activity</span>
        <span style="flex: 1.5;">Who Is Involved</span>
        <span style="flex: 1.5;">What You Leave With</span>
      </div>
      <?php foreach ( $steps as $st ) : ?>
        <?php
        $st_num    = ! empty( $st['step'] ) ? $st['step'] : ( ! empty( $st['no'] ) ? $st['no'] : '01' );
        $st_name   = ! empty( $st['name'] ) ? $st['name'] : ( ! empty( $st['title'] ) ? $st['title'] : '' );
        $st_who    = ! empty( $st['who'] ) ? $st['who'] : '';
        $st_output = ! empty( $st['output'] ) ? $st['output'] : '';
        ?>
        <div class="steps-v-row">
          <div class="steps-v-num"><?php echo esc_html( $st_num ); ?></div>
          <div class="steps-v-name"><b><?php echo esc_html( $st_name ); ?></b></div>
          <div class="steps-v-who"><span class="chip-sm"><?php echo esc_html( $st_who ); ?></span></div>
          <div class="steps-v-output"><strong><?php echo esc_html( $st_output ); ?></strong></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
