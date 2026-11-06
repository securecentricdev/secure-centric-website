<?php
/**
 * Render Template for Results & Numbers Grid
 * Strictly matches demo/assets/js/app.js renderNumbers
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// VERIFIED TRACK RECORD';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Our results';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : '100% C3PAO first-time pass record across defense primes and subcontractors nationwide.';

$results = array();
if ( ! empty( $attributes['resultsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['resultsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['resultsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $results = $decoded;
    }
}

if ( empty( $results ) ) {
    $results = array(
        array(
            'number' => '120+',
            'title'  => 'Defense Contractors Prepared',
            'desc'   => 'Guided across 45 states protecting $2.4B in active DoD solicitations.',
        ),
        array(
            'number' => '100%',
            'title'  => 'C3PAO First-Time Pass Rate',
            'desc'   => 'Zero clients failed an official external third-party audit after readiness sign-off.',
        ),
        array(
            'number' => '3 Weeks',
            'title'  => 'On-Site Walkthrough Guarantee',
            'desc'   => 'In-person facility inspection of server rooms and shop-floor enclaves.',
        ),
        array(
            'number' => 'Flat-Fee',
            'title'  => 'Fixed Transparent Scope',
            'desc'   => 'Zero hourly billing surprises, travel markups, or tool licensing kickbacks.',
        ),
    );
}
?>

<section class="section-midnight py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/results-numbers" style="background-color: var(--color-midnight); color: var(--color-white);">
  <div class="site-container">
    <div class="section-header-center" style="margin-bottom: 40px; text-align: center;">
      <span class="section-eyebrow dark" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="color: var(--color-white); margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-slate); max-width: 640px; margin: 0 auto;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="numbers-results-grid">
      <?php foreach ( $results as $r ) : ?>
        <div class="result-box">
          <div class="result-number cyan-highlight"><?php echo esc_html( $r['number'] ); ?></div>
          <div class="result-title"><?php echo esc_html( $r['title'] ); ?></div>
          <p class="result-sub"><?php echo esc_html( $r['desc'] ); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
