<?php
/**
 * Render Template for Bullets Grid Block
 * Strictly matches demo/assets/js/app.js renderBullets
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// CORE PRINCIPLES & INDICATORS';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Key Indicators & Symptoms';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Observable symptoms and indicators that require immediate remediation.';

$bullets = array();
if ( ! empty( $attributes['bulletsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['bulletsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['bulletsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $bullets = $decoded;
    }
}

if ( empty( $bullets ) ) {
    $bullets = array(
        array(
            'title' => 'Unknown or Negative SPRS Score',
            'desc'  => 'Your DoD score is blank, stale, or below 0 in the Supplier Performance Risk System, disqualifying your company from upcoming awards.',
        ),
        array(
            'title' => 'Generic Template SSP in Place',
            'desc'  => 'System Security Plan was downloaded from the internet without site-specific scoping, network topology maps, or evidence links.',
        ),
        array(
            'title' => 'Unassigned POA&M Open Items',
            'desc'  => 'Corrective actions lack dedicated internal owners, realistic resource budgets, or committed 180-day milestone close dates.',
        ),
        array(
            'title' => 'Urgent Prime Contractor Inquiries',
            'desc'  => 'Defense prime contractors (Lockheed, Boeing, Northrop, etc.) are issuing 30-day compliance verification questionnaires.',
        ),
    );
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow  = sc_clean_text( $eyebrow );
    $title    = sc_clean_text( $title );
    $subtitle = sc_clean_text( $subtitle );
    $bullets  = sc_clean_text( $bullets );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/bullets-grid"<?php echo $anchor_attr; ?>>
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 36px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="bullets-grid">
      <?php foreach ( $bullets as $b ) : ?>
        <?php
        $b_title = '';
        $b_desc  = '';
        if ( is_array( $b ) ) {
            $b_title = ! empty( $b['title'] ) ? $b['title'] : ( ! empty( $b['name'] ) ? $b['name'] : '' );
            $b_desc  = ! empty( $b['desc'] ) ? $b['desc'] : '';
        } elseif ( is_string( $b ) ) {
            $b_title = $b;
        }
        ?>
        <div class="bullet-card">
          <div class="bullet-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <h4 style="margin-bottom: 8px; color: var(--color-navy); font-size: 1.1rem;"><?php echo esc_html( $b_title ); ?></h4>
            <?php if ( ! empty( $b_desc ) ) : ?>
              <p style="color: var(--color-body-text); font-size: 0.9375rem; line-height: 1.6; margin: 0;"><?php echo esc_html( $b_desc ); ?></p>
            <?php endif; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
