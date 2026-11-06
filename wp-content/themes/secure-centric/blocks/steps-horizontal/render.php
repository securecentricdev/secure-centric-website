<?php
/**
 * Render Template for Horizontal Steps Workflow Block
 * Strictly matches demo/assets/js/app.js renderStepsH
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// ENGAGEMENT WORKFLOW';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'How an engagement starts';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'A structured, predictable path to verifiable defense compliance with zero surprises.';

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
            'no'    => '01',
            'title' => 'Discovery Call',
            'desc'  => '30-minute scoping discussion under bilateral NDA to review your contracts, timeline, and current SPRS status.',
        ),
        array(
            'no'    => '02',
            'title' => 'NDA Signed',
            'desc'  => 'Bilateral non-disclosure executed within 2 hours. We review your statements of work and DFARS 7012 flowdowns.',
        ),
        array(
            'no'    => '03',
            'title' => 'In-Person Walkthrough',
            'desc'  => 'Our Registered Practitioners visit your facility, inspect network infrastructure, and interview key personnel on site.',
        ),
        array(
            'no'    => '04',
            'title' => 'Scope & Action Plan',
            'desc'  => 'You receive a formal CUI boundary map, estimated SPRS baseline score, and a prioritized remediation roadmap.',
        ),
    );
}
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/steps-horizontal">
  <div class="site-container">
    <div class="section-header-center" style="text-align: center; margin-bottom: 36px;">
      <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 16px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); max-width: 680px; margin: 0 auto;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="steps-horizontal-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
      <?php foreach ( $steps as $i => $st ) : ?>
        <?php
        $num   = ! empty( $st['no'] ) ? $st['no'] : sprintf( '%02d', $i + 1 );
        $st_t  = ! empty( $st['title'] ) ? $st['title'] : ( ! empty( $st['name'] ) ? $st['name'] : 'Step ' . $num );
        $st_d  = ! empty( $st['desc'] ) ? $st['desc'] : ( ! empty( $st['text'] ) ? $st['text'] : '' );
        ?>
        <div class="step-h-card">
          <div class="step-h-num"><?php echo esc_html( $num ); ?></div>
          <h4 class="step-h-title"><?php echo esc_html( $st_t ); ?></h4>
          <p class="step-h-desc"><?php echo esc_html( $st_d ); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
