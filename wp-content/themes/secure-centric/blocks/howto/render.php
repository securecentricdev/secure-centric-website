<?php
/**
 * Render Template for Verification Procedure How-To Steps Block
 * Strictly matches demo/assets/js/app.js renderHowTo
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// VERIFICATION PROCEDURE';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'How to Verify Any CMMC RPO or Registered Practitioner';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Protect your company from unqualified consultants by verifying accreditation directly on the official Cyber AB registry.';

$steps = array();
if ( ! empty( $attributes['stepsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['stepsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['stepsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $steps = $decoded;
    }
}

if ( empty( $steps ) ) {
    $steps = array(
        array( 'no' => '01', 'title' => 'Visit CyberAB.org Marketplace', 'desc' => 'Navigate to the official The Cyber AB Marketplace directory — the only authorized registry.' ),
        array( 'no' => '02', 'title' => 'Search Registered Provider Organizations', 'desc' => 'Enter the company legal name and verify active badge status and CPN registration number.' ),
        array( 'no' => '03', 'title' => 'Confirm Staff Registered Practitioners', 'desc' => 'Verify individual consultants hold active RP, RPA, or CCP credentials under the organization.' ),
        array( 'no' => '04', 'title' => 'Verify C3PAO Impartiality Separation', 'desc' => 'Ensure the advisory firm is not the same entity scheduled to perform your official third-party audit.' ),
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/howto-guide">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 36px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="howto-grid">
      <?php foreach ( $steps as $st ) : ?>
        <div class="howto-card">
          <div class="howto-num"><?php echo esc_html( $st['no'] ); ?></div>
          <h4 style="margin-bottom: 10px; color: var(--color-navy);"><?php echo esc_html( $st['title'] ); ?></h4>
          <p style="color: var(--color-body-text); font-size: 0.9375rem; line-height: 1.6;"><?php echo esc_html( $st['desc'] ); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
