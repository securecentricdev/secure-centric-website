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

$logos = array();

// 1. Try to load structured JSON logosData
if ( ! empty( $attributes['logosData'] ) ) {
    $decoded = json_decode( $attributes['logosData'], true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $logos = $decoded;
    }
}

// 2. Try to load structured array logos
if ( empty( $logos ) && ! empty( $attributes['logos'] ) && is_array( $attributes['logos'] ) ) {
    $logos = $attributes['logos'];
}

// 3. Fallback to comma-separated logosList
if ( empty( $logos ) && ! empty( $attributes['logosList'] ) ) {
    $names = array_map( 'trim', explode( ',', $attributes['logosList'] ) );
    foreach ( $names as $nm ) {
        if ( ! empty( $nm ) ) {
            $logos[] = array(
                'name'     => $nm,
                'imageUrl' => '',
            );
        }
    }
}

// 4. Default fallback
if ( empty( $logos ) ) {
    $logos = array(
        array( 'name' => 'Tower Semiconductor', 'imageUrl' => '' ),
        array( 'name' => 'Safran Federal Systems', 'imageUrl' => '' ),
        array( 'name' => 'Goodwin & Associates', 'imageUrl' => '' ),
        array( 'name' => 'HRD Aero Systems', 'imageUrl' => '' ),
        array( 'name' => 'Precision Aerospace', 'imageUrl' => '' ),
        array( 'name' => 'Defense Dynamics', 'imageUrl' => '' ),
    );
}
?>

<section class="logos-band-wrap wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'white'}" data-wp-pattern="secure-centric/client-logos-marquee">
  <div class="site-container">
    <div class="logos-band-title"><?php echo esc_html( $title ); ?></div>
  </div>
  <div class="logos-carousel-container">
    <div class="logos-carousel-track">
      <?php for ( $repeat = 0; $repeat < 3; $repeat++ ) : ?>
        <?php foreach ( $logos as $logo ) : ?>
          <?php
          $name      = ! empty( $logo['name'] ) ? $logo['name'] : '';
          $image_url = ! empty( $logo['imageUrl'] ) ? $logo['imageUrl'] : '';
          ?>
          <div class="logo-item">
            <?php if ( ! empty( $image_url ) ) : ?>
              <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $name ); ?>" class="logo-item-img" style="height: 28px; width: auto; max-width: 140px; object-fit: contain; display: inline-block; vertical-align: middle;" />
            <?php else : ?>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="color: var(--color-electric-blue); flex-shrink: 0;">
                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"></path>
              </svg>
            <?php endif; ?>
            <?php if ( ! empty( $name ) ) : ?>
              <span><?php echo esc_html( $name ); ?></span>
            <?php endif; ?>
          </div>
        <?php endforeach; ?>
      <?php endfor; ?>
    </div>
  </div>
</section>
