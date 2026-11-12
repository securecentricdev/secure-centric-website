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

$theme_uri = get_template_directory_uri();
$default_logos = array(
    array(
        'name'     => '',
        'alt'      => 'Caltrol',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/caltrol.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Firefighters First Credit Union',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/firefighters-first.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Acadian Contractors, Inc',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/acadian-contractors.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Goodwin & Associates',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/goodwin-associates.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'CMI Promex',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/cmi-promex.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'HRD Aero Systems',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/hrd-aero-systems.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Yes Energy / PowerCore',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/yes-energy.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Lonestar Electric Supply',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/lonestar-electric.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Los Angeles Regional Food Bank',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/la-food-bank.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Rose Acre Farms',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/rose-acre-farms.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Safran Federal Systems',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/safran.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Tower Semiconductor',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/tower-semiconductor.webp',
    ),
    array(
        'name'     => '',
        'alt'      => 'Weber Metals',
        'imageUrl' => $theme_uri . '/assets/img/client-logos/weber-metals.webp',
    ),
);

$logos = array();

// 1. Try to load structured JSON logosData
if ( ! empty( $attributes['logosData'] ) ) {
    $decoded = json_decode( $attributes['logosData'], true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        // Verify if decoded items contain actual image URLs
        $has_image = false;
        foreach ( $decoded as $item ) {
            if ( ! empty( $item['imageUrl'] ) ) {
                $has_image = true;
                break;
            }
        }
        if ( $has_image ) {
            $logos = $decoded;
        }
    }
}

// 2. Try to load structured array logos
if ( empty( $logos ) && ! empty( $attributes['logos'] ) && is_array( $attributes['logos'] ) ) {
    $has_image = false;
    foreach ( $attributes['logos'] as $item ) {
        if ( ! empty( $item['imageUrl'] ) ) {
            $has_image = true;
            break;
        }
    }
    if ( $has_image ) {
        $logos = $attributes['logos'];
    }
}

// 3. Fallback to comma-separated logosList only if real logosData not provided
if ( empty( $logos ) && ! empty( $attributes['logosList'] ) && empty( $attributes['logosData'] ) ) {
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

// 4. Default fallback to the 13 client logos
if ( empty( $logos ) ) {
    $logos = $default_logos;
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
          $name      = ! empty( $logo['name'] ) ? trim( $logo['name'] ) : '';
          $alt_text  = ! empty( $logo['alt'] ) ? $logo['alt'] : ( ! empty( $name ) ? $name : 'Client Logo' );
          $image_url = ! empty( $logo['imageUrl'] ) ? $logo['imageUrl'] : '';
          ?>
          <div class="logo-item<?php echo empty( $name ) ? ' logo-item--image-only' : ''; ?>">
            <?php if ( ! empty( $image_url ) ) : ?>
              <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $alt_text ); ?>" class="logo-item-img" loading="lazy" />
            <?php else : ?>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="color: var(--color-electric-blue); flex-shrink: 0;">
                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"></path>
              </svg>
            <?php endif; ?>
            <?php if ( ! empty( $name ) ) : ?>
              <span class="logo-item-name"><?php echo esc_html( $name ); ?></span>
            <?php endif; ?>
          </div>
        <?php endforeach; ?>
      <?php endfor; ?>
    </div>
  </div>
</section>
