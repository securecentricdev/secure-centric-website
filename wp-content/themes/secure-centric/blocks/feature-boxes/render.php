<?php
/**
 * Render Template for Three Feature Boxes (Equal Weight) Block
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = isset( $attributes['eyebrow'] ) ? trim( str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) ) : '// CAPABILITIES';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'More ways Secure-Centric can help';
$has_explicit_desc = array_key_exists( 'description', $attributes ) || array_key_exists( 'subtitle', $attributes );
$subtitle = $has_explicit_desc ? ( array_key_exists( 'description', $attributes ) ? trim( (string) $attributes['description'] ) : trim( (string) $attributes['subtitle'] ) ) : '';
$theme    = ! empty( $attributes['theme'] ) ? $attributes['theme'] : 'ice';
$is_ice   = ( 'ice' === $theme );

$box1_badge = ! empty( $attributes['box1Badge'] ) ? $attributes['box1Badge'] : '';
$box1_title = ! empty( $attributes['box1Title'] ) ? $attributes['box1Title'] : 'Assess and prepare';
$box1_desc  = ! empty( $attributes['box1Desc'] ) ? $attributes['box1Desc'] : '';

$box2_badge = ! empty( $attributes['box2Badge'] ) ? $attributes['box2Badge'] : '';
$box2_title = ! empty( $attributes['box2Title'] ) ? $attributes['box2Title'] : 'Document and scope';
$box2_desc  = ! empty( $attributes['box2Desc'] ) ? $attributes['box2Desc'] : '';

$box3_badge = ! empty( $attributes['box3Badge'] ) ? $attributes['box3Badge'] : '';
$box3_title = ! empty( $attributes['box3Title'] ) ? $attributes['box3Title'] : 'Lead and oversee';
$box3_desc  = ! empty( $attributes['box3Desc'] ) ? $attributes['box3Desc'] : '';

$show_footer       = ! empty( $attributes['showFooter'] );
$footer_eyebrow    = ! empty( $attributes['footerEyebrow'] ) ? $attributes['footerEyebrow'] : '';
$footer_col1_title = ! empty( $attributes['footerCol1Title'] ) ? $attributes['footerCol1Title'] : '';
$footer_col1_desc  = ! empty( $attributes['footerCol1Desc'] ) ? $attributes['footerCol1Desc'] : '';
$footer_col2_title = ! empty( $attributes['footerCol2Title'] ) ? $attributes['footerCol2Title'] : '';
$footer_col2_desc  = ! empty( $attributes['footerCol2Desc'] ) ? $attributes['footerCol2Desc'] : '';
$footer_cta_text   = ! empty( $attributes['footerCtaText'] ) ? $attributes['footerCtaText'] : '';
$footer_cta_url    = ! empty( $attributes['footerCtaUrl'] ) ? $attributes['footerCtaUrl'] : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow           = sc_clean_text( $eyebrow );
    $title             = sc_clean_text( $title );
    $subtitle          = sc_clean_text( $subtitle );
    $box1_badge        = sc_clean_text( $box1_badge );
    $box1_title        = sc_clean_text( $box1_title );
    $box1_desc         = sc_clean_text( $box1_desc );
    $box2_badge        = sc_clean_text( $box2_badge );
    $box2_title        = sc_clean_text( $box2_title );
    $box2_desc         = sc_clean_text( $box2_desc );
    $box3_badge        = sc_clean_text( $box3_badge );
    $box3_title        = sc_clean_text( $box3_title );
    $box3_desc         = sc_clean_text( $box3_desc );
    $footer_eyebrow    = sc_clean_text( $footer_eyebrow );
    $footer_col1_title = sc_clean_text( $footer_col1_title );
    $footer_col1_desc  = sc_clean_text( $footer_col1_desc );
    $footer_col2_title = sc_clean_text( $footer_col2_title );
    $footer_col2_desc  = sc_clean_text( $footer_col2_desc );
    $footer_cta_text   = sc_clean_text( $footer_cta_text );
}

if ( ! function_exists( 'sc_format_feature_box_content' ) ) {
    function sc_format_feature_box_content( $text ) {
        if ( empty( $text ) ) {
            return '';
        }
        $lines = explode( "\n", str_replace( "\r", '', $text ) );
        $out = '';
        foreach ( $lines as $line ) {
            $line = trim( $line );
            if ( empty( $line ) ) {
                $out .= '<div style="height: 10px;"></div>';
                continue;
            }
            $is_bullet = ( 0 === strpos( $line, '•' ) || 0 === strpos( $line, '-' ) || 0 === strpos( $line, '*' ) );
            if ( $is_bullet ) {
                $line = trim( preg_replace( '/^[•\-*]\s*/u', '', $line ) );
            }
            
            // Format "Label: Text" to bold label
            if ( false !== strpos( $line, ':' ) && ! preg_match( '/^https?:\/\//i', $line ) ) {
                $parts = explode( ':', $line, 2 );
                $line = '<strong>' . esc_html( trim( $parts[0] ) ) . ':</strong> ' . esc_html( trim( $parts[1] ) );
            } else {
                $line = esc_html( $line );
            }

            if ( $is_bullet ) {
                $out .= '<div style="display: flex; gap: 8px; margin-bottom: 10px; font-size: 0.9375rem; color: var(--color-body-text); line-height: 1.55;">';
                $out .= '<span style="color: var(--color-electric-blue); font-weight: bold; flex-shrink: 0; line-height: 1.55;">•</span>';
                $out .= '<div>' . $line . '</div>';
                $out .= '</div>';
            } else {
                $out .= '<p style="margin-bottom: 12px; font-size: 0.9375rem; color: var(--color-body-text); line-height: 1.55;">' . $line . '</p>';
            }
        }
        return $out;
    }
}

$boxes = array(
    array( 'badge' => $box1_badge, 'title' => $box1_title, 'desc' => $box1_desc ),
    array( 'badge' => $box2_badge, 'title' => $box2_title, 'desc' => $box2_desc ),
    array( 'badge' => $box3_badge, 'title' => $box3_title, 'desc' => $box3_desc ),
);

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<section class="<?php echo $is_ice ? 'section-ice' : 'section-white'; ?> py-section wp-block-inspect" data-wp-pattern="secure-centric/feature-boxes"<?php echo $anchor_attr; ?> style="width: 100%;">
  <div class="site-container" style="width: 100%; max-width: 1240px; margin: 0 auto; padding-left: 24px; padding-right: 24px; box-sizing: border-box;">
    <div class="section-heading-center" style="margin-bottom: <?php echo ! empty( $subtitle ) ? '40px' : '28px'; ?>; text-align: center;">
      <?php if ( ! empty( $eyebrow ) ) : ?>
      <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
      <?php endif; ?>
      <h2<?php echo empty( $subtitle ) ? ' style="margin-bottom: 0;"' : ''; ?>><?php echo esc_html( $title ); ?></h2>
      <?php if ( ! empty( $subtitle ) ) : ?>
      <p style="color: var(--color-slate); max-width: 680px; margin: 8px auto 0; font-size: 1.05rem; line-height: 1.6;">
        <?php echo esc_html( $subtitle ); ?>
      </p>
      <?php endif; ?>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; align-items: stretch; width: 100%;">
      <?php foreach ( $boxes as $b ) : ?>
        <div class="card card-white" style="padding: 32px; display: flex; flex-direction: column; border-radius: 8px; border: 1px solid var(--color-border); box-shadow: 0 2px 8px rgba(0,0,0,0.03); background: #ffffff;">
          <?php if ( ! empty( $b['badge'] ) ) : ?>
          <span class="badge-pill" style="align-self: flex-start; margin-bottom: 16px;"><?php echo esc_html( $b['badge'] ); ?></span>
          <?php endif; ?>
          <h3 style="font-size: 1.25rem; margin-bottom: 16px; color: var(--color-navy); font-weight: 700; line-height: 1.35;">
            <?php echo esc_html( $b['title'] ); ?>
          </h3>
          <div style="flex-grow: 1;">
            <?php echo sc_format_feature_box_content( $b['desc'] ); ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <?php if ( $show_footer || ! empty( $footer_col1_title ) || ! empty( $footer_col1_desc ) || ! empty( $footer_col2_title ) || ! empty( $footer_col2_desc ) || ! empty( $footer_cta_text ) ) : ?>
    <div class="card card-white" style="width: 100%; box-sizing: border-box; margin-top: 36px; border-radius: 12px; border: 1.5px solid var(--color-border); box-shadow: 0 4px 16px rgba(0,0,0,0.04); padding: clamp(32px, 5vw, 48px); background: #ffffff;">
      <?php if ( ! empty( $footer_eyebrow ) ) : ?>
      <span class="section-eyebrow" style="margin-bottom: 20px; display: inline-flex;"><?php echo esc_html( $footer_eyebrow ); ?></span>
      <?php endif; ?>

      <!-- 2 Full-Width Content Columns -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 36px; width: 100%; margin-bottom: <?php echo ! empty( $footer_cta_text ) ? '32px' : '0'; ?>;">
        <?php if ( ! empty( $footer_col1_title ) || ! empty( $footer_col1_desc ) ) : ?>
        <div style="display: flex; flex-direction: column;">
          <?php if ( ! empty( $footer_col1_title ) ) : ?>
          <h4 style="font-size: 1.25rem; color: var(--color-navy); font-weight: 700; margin-bottom: 10px; line-height: 1.35;"><?php echo esc_html( $footer_col1_title ); ?></h4>
          <?php endif; ?>
          <?php if ( ! empty( $footer_col1_desc ) ) : ?>
          <p style="font-size: 1rem; color: var(--color-body-text); line-height: 1.65; margin: 0;"><?php echo nl2br( esc_html( $footer_col1_desc ) ); ?></p>
          <?php endif; ?>
        </div>
        <?php endif; ?>

        <?php if ( ! empty( $footer_col2_title ) || ! empty( $footer_col2_desc ) ) : ?>
        <div style="display: flex; flex-direction: column;">
          <?php if ( ! empty( $footer_col2_title ) ) : ?>
          <h4 style="font-size: 1.25rem; color: var(--color-navy); font-weight: 700; margin-bottom: 10px; line-height: 1.35;"><?php echo esc_html( $footer_col2_title ); ?></h4>
          <?php endif; ?>
          <?php if ( ! empty( $footer_col2_desc ) ) : ?>
          <p style="font-size: 1rem; color: var(--color-body-text); line-height: 1.65; margin: 0;"><?php echo nl2br( esc_html( $footer_col2_desc ) ); ?></p>
          <?php endif; ?>
        </div>
        <?php endif; ?>
      </div>

      <!-- Dedicated Full-Width Action Banner & CTA -->
      <?php if ( ! empty( $footer_cta_text ) ) : ?>
      <div style="width: 100%; border-top: 1px solid var(--color-border); padding-top: 28px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px;">
        <span style="font-size: 0.95rem; color: var(--color-slate); font-family: var(--font-mono); display: inline-flex; align-items: center; gap: 8px;">
          <span>⚡</span> Actionable scoping &amp; fixed-fee delivery timeline in writing
        </span>
        <a href="<?php echo esc_url( $footer_cta_url ); ?>" class="btn btn-primary" style="padding: 16px 36px; font-size: 1.05rem; font-weight: 700; border-radius: 6px; white-space: nowrap; box-shadow: 0 4px 14px rgba(47, 91, 255, 0.35); text-align: center; justify-content: center;" target="_blank" rel="noopener noreferrer">
          <?php echo esc_html( $footer_cta_text ); ?>
        </a>
      </div>
      <?php endif; ?>
    </div>
    <?php endif; ?>
  </div>
</section>
