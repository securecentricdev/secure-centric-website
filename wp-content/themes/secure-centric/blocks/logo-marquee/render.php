<?php
/**
 * Render Template for Logo Marquee Block
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Organizations that have worked with Secure-Centric';

$logos = array(
    'Tower Semiconductor',
    'Safran Federal Systems',
    'Goodwin & Associates',
    'HRD Aero Systems',
    'Precision Aerospace',
    'Defense Dynamics',
);
?>

<section class="logos-band-wrap wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'white'}" data-wp-pattern="secure-centric/client-logos-marquee">
  <div class="site-container">
    <div class="logos-band-title"><?php echo esc_html( $title ); ?></div>
  </div>
  <div class="logos-carousel-container">
    <div class="logos-carousel-track">
      <?php for ( $repeat = 0; $repeat < 3; $repeat++ ) : ?>
        <?php foreach ( $logos as $logo ) : ?>
          <div class="logo-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="color: var(--color-electric-blue);">
              <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"></path>
            </svg>
            <span><?php echo esc_html( $logo ); ?></span>
          </div>
        <?php endforeach; ?>
      <?php endfor; ?>
    </div>
  </div>
</section>
