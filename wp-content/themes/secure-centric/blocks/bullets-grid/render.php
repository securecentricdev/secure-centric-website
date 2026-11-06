<?php
/**
 * Render Template for Bullets & Principles Grid
 * Strictly matches demo/assets/js/app.js renderBullets
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// CORE PRINCIPLES & INDICATORS';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'How we work';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Principles, not process: independent advice, on site by default, plain English, we never assess clients we advise.';

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
            'title' => 'Independent Advice',
            'desc'  => 'We do not sell firewalls, MSP services, or software licenses. Our recommendations are 100% objective and tailored to your existing IT footprint.',
        ),
        array(
            'title' => 'On Site by Default',
            'desc'  => 'We conduct physical facility walkthroughs in person. You cannot verify CMMC compliance over a Zoom screen—we inspect server rooms, wiring closets, and shop floors.',
        ),
        array(
            'title' => 'Plain English',
            'desc'  => 'No impenetrable jargon. We translate 320 assessment objectives into clear operational steps your executives, engineers, and shop foremen understand.',
        ),
        array(
            'title' => 'Strict Conflict Separation',
            'desc'  => 'We never assess clients we advise. Under Cyber AB rules, we are strictly an RPO advisor so our loyalty is 100% with defending your organization.',
        ),
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/bullets-grid">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 36px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="bullets-grid">
      <?php foreach ( $bullets as $b ) : ?>
        <div class="bullet-card">
          <div class="bullet-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <h4 style="margin-bottom: 8px; color: var(--color-navy); font-size: 1.1rem;"><?php echo esc_html( $b['title'] ); ?></h4>
            <p style="color: var(--color-body-text); font-size: 0.9375rem; line-height: 1.6; margin: 0;"><?php echo esc_html( $b['desc'] ); ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
