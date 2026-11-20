<?php
/**
 * Render Template for Credentials & Badges Block
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = isset( $attributes['eyebrow'] ) ? trim( str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) ) : '';
$title   = ! empty( $attributes['title'] ) ? $attributes['title'] : '';

// Remove default 'Credentials and badges' title if exact match
if ( strtolower( trim( $title ) ) === 'credentials and badges' || strtolower( trim( $title ) ) === 'credentials & badges' ) {
    $title = '';
}

$theme_uri = get_template_directory_uri();
$default_badges = array(
    array(
        'title'    => 'The Cyber AB Registered Provider Organization',
        'alt'      => 'The Cyber AB Registered Practitioner Organization (RPO)',
        'imageUrl' => $theme_uri . '/assets/img/badges/cyber-ab-rpo.webp',
        'link'     => '',
    ),
    array(
        'title'    => 'Inc. 5000 America\'s Fastest-Growing Private Companies',
        'alt'      => 'Inc. 5000 No. 452 (2025) America\'s Fastest-Growing Private Companies',
        'imageUrl' => $theme_uri . '/assets/img/badges/inc-5000-banner.webp',
        'link'     => '',
    ),
    array(
        'title'    => 'Inc. 5000 2026 Honor Roll',
        'alt'      => 'Inc. 5000 2026 America\'s Fastest-Growing Private Companies',
        'imageUrl' => $theme_uri . '/assets/img/badges/inc-5000-badge.webp',
        'link'     => '',
    ),
    array(
        'title'    => 'CRN MSP 500 2024',
        'alt'      => 'The Channel Co. CRN MSP 500 2024',
        'imageUrl' => $theme_uri . '/assets/img/badges/crn-msp-500.webp',
        'link'     => '',
    ),
);

$badges = array();

if ( ! empty( $attributes['badgesData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' )
        ? sc_decode_block_json( $attributes['badgesData'] )
        : json_decode( $attributes['badgesData'], true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $has_image = false;
        foreach ( $decoded as $b ) {
            if ( ! empty( $b['imageUrl'] ) ) {
                $has_image = true;
                break;
            }
        }
        if ( $has_image ) {
            $badges = $decoded;
        }
    }
}

if ( empty( $badges ) ) {
    $badges = $default_badges;
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow = sc_clean_text( $eyebrow );
    $title   = sc_clean_text( $title );
}
?>

<section class="section-white credentials-badges-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'white'}" data-wp-pattern="secure-centric/credentials-badges" style="padding-top: 10px; padding-bottom: 56px;">
  <div class="site-container">
    <?php if ( ! empty( $title ) ) : ?>
    <div class="credentials-badges-header" style="text-align: center; max-width: 720px; margin: 0 auto 28px;">
      <h3 style="font-size: 1.75rem; color: var(--color-navy); margin: 0;"><?php echo esc_html( $title ); ?></h3>
    </div>
    <?php endif; ?>

    <div class="credentials-badges-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; width: 100%; max-width: 100%; margin: 0 auto; align-items: center; justify-items: center;">
      <?php foreach ( $badges as $badge ) : ?>
        <?php
        $badge_img     = ! empty( $badge['imageUrl'] ) ? $badge['imageUrl'] : '';
        $badge_title   = ! empty( $badge['title'] ) ? $badge['title'] : '';
        $badge_alt     = ! empty( $badge['alt'] ) ? $badge['alt'] : ( ! empty( $badge_title ) ? $badge_title : 'Accredited Credential Badge' );
        $badge_link    = ! empty( $badge['link'] ) ? $badge['link'] : '';
        $badge_caption = ! empty( $badge['caption'] ) ? $badge['caption'] : ( ! empty( $badge['desc'] ) ? $badge['desc'] : '' );
        if ( empty( $badge_img ) ) {
            continue;
        }
        ?>
        <div class="badge-card" style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px 8px; transition: transform 0.25s ease;">
          <div style="display: flex; align-items: center; justify-content: center; width: 100%; min-height: 120px;">
            <?php if ( ! empty( $badge_link ) ) : ?>
              <a href="<?php echo esc_url( $badge_link ); ?>" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; width: 100%;">
                <img src="<?php echo esc_url( $badge_img ); ?>" alt="<?php echo esc_attr( $badge_alt ); ?>" class="badge-card-img" style="max-height: 120px; max-width: 100%; width: auto; object-fit: contain; display: block;" loading="lazy" />
              </a>
            <?php else : ?>
              <img src="<?php echo esc_url( $badge_img ); ?>" alt="<?php echo esc_attr( $badge_alt ); ?>" class="badge-card-img" style="max-height: 120px; max-width: 100%; width: auto; object-fit: contain; display: block;" loading="lazy" />
            <?php endif; ?>
          </div>
          <?php if ( ! empty( $badge_caption ) ) : ?>
            <p class="badge-card-caption" style="font-size: 0.8125rem; color: var(--color-body-text); margin-top: 10px; margin-bottom: 0; text-align: center; line-height: 1.4; font-weight: 500;"><?php echo esc_html( $badge_caption ); ?></p>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
  <style>
    @media (max-width: 768px) {
      .credentials-badges-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px !important;
      }
    }
  </style>
</section>
