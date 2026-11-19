<?php
/**
 * Render Template for Custom Heading Block
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$level          = ! empty( $attributes['level'] ) && in_array( strtolower( $attributes['level'] ), array( 'h1', 'h2', 'h3', 'h4' ), true ) ? strtolower( $attributes['level'] ) : 'h2';
$heading        = ! empty( $attributes['heading'] ) ? $attributes['heading'] : ( ! empty( $attributes['title'] ) ? $attributes['title'] : '' );
$subtitle       = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : '';
$text_align     = ! empty( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
$theme          = ! empty( $attributes['theme'] ) ? $attributes['theme'] : 'navy';
$wrap_container = isset( $attributes['wrapContainer'] ) ? (bool) $attributes['wrapContainer'] : true;
$margin_bottom  = ! empty( $attributes['marginBottom'] ) ? $attributes['marginBottom'] : '32px';

if ( empty( $heading ) ) {
    $heading = 'Section Heading';
}

if ( function_exists( 'sc_clean_text' ) ) {
    $heading  = sc_clean_text( $heading );
    $subtitle = sc_clean_text( $subtitle );
}

$color_style = 'color: var(--color-navy);';
if ( 'white' === $theme ) {
    $color_style = 'color: var(--color-white);';
} elseif ( 'cyan' === $theme ) {
    $color_style = 'color: var(--color-cyber-cyan);';
}

$sub_color_style = 'color: var(--color-body-text);';
if ( 'white' === $theme || 'cyan' === $theme ) {
    $sub_color_style = 'color: var(--color-text-on-dark);';
}

$wrap_style = 'text-align: ' . esc_attr( $text_align ) . '; margin-bottom: ' . esc_attr( $margin_bottom ) . '; width: 100%;';
if ( 'center' === $text_align ) {
    $sub_max_w = 'max-width: 720px; margin-left: auto; margin-right: auto;';
} elseif ( 'right' === $text_align ) {
    $sub_max_w = 'max-width: 820px; margin-left: auto; margin-right: 0;';
} else {
    $sub_max_w = 'max-width: 820px; margin-left: 0; margin-right: auto;';
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<?php if ( $wrap_container ) : ?>
<div class="site-container wp-block-inspect" data-wp-block="wp:heading"<?php echo $anchor_attr; ?>>
<?php endif; ?>

  <div class="sc-heading-block sc-heading-align-<?php echo esc_attr( $text_align ); ?>" style="<?php echo esc_attr( $wrap_style ); ?>">
    <<?php echo esc_attr( $level ); ?> class="sc-heading-title" style="<?php echo esc_attr( $color_style ); ?> margin-top: 0; margin-bottom: <?php echo ! empty( $subtitle ) ? '12px' : '0'; ?>;">
      <?php echo esc_html( $heading ); ?>
    </<?php echo esc_attr( $level ); ?>>
    <?php if ( ! empty( $subtitle ) ) : ?>
      <p class="sc-heading-subtitle" style="<?php echo esc_attr( $sub_color_style . ' ' . $sub_max_w ); ?> font-size: 1.05rem; line-height: 1.6; margin-top: 0; margin-bottom: 0;">
        <?php echo esc_html( $subtitle ); ?>
      </p>
    <?php endif; ?>
  </div>

<?php if ( $wrap_container ) : ?>
</div>
<?php endif; ?>
