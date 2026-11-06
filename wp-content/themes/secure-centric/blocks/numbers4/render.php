<?php
/**
 * Render Template for Numbers 4 Grid Block
 * Strictly matches demo/assets/js/app.js renderNumbers4
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// VERIFIED DEFENSE METRICS';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'CMMC By the Numbers';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'CMMC compliance numbers grounded in Department of War regulatory criteria.';

$stats = array();
if ( ! empty( $attributes['statsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['statsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['statsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $stats = $decoded;
    }
}

if ( empty( $stats ) ) {
    $stats = array(
        array( 'num' => '110', 'label' => 'Total Security Controls', 'desc' => 'Individual requirements required under NIST SP 800-171 Rev 2.' ),
        array( 'num' => '14', 'label' => 'Control Families', 'desc' => 'Encompassing access control, incident response, and system integrity.' ),
        array( 'num' => '320', 'label' => 'Assessment Objectives', 'desc' => 'Explicit verification checks evaluated during official C3PAO audits.' ),
        array( 'num' => '3 Years', 'label' => 'Audit Validity Period', 'desc' => 'Triennial recertification interval mandated by DoD rulemaking.' ),
    );
}
?>

<section class="numbers4-band-wrap wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/numbers4-stats">
  <div class="site-container">
    <div class="section-header-center" style="margin-bottom: 36px; text-align: center;">
      <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); max-width: 600px; margin: 0 auto;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="numbers4-grid">
      <?php foreach ( $stats as $st ) : ?>
        <div class="num4-card">
          <div class="num4-big"><?php echo esc_html( $st['num'] ); ?></div>
          <div class="num4-label"><?php echo esc_html( $st['label'] ); ?></div>
          <p class="num4-desc"><?php echo esc_html( $st['desc'] ); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
