<?php
/**
 * Render Template for Call to Action Band
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title            = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Planning to get started on CMMC?';
$description      = isset( $attributes['description'] ) ? $attributes['description'] : 'Talk with an accredited Cyber AB Registered Provider Organization. Get an actionable first step in writing within 30 minutes.';
$primary_btn_text = ! empty( $attributes['primaryBtnText'] ) ? $attributes['primaryBtnText'] : 'Schedule a 30-Minute Consultation';
$default_booking  = function_exists( 'sc_get_booking_url' ) ? sc_get_booking_url() : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';
$primary_btn_url  = ! empty( $attributes['primaryBtnUrl'] ) ? $attributes['primaryBtnUrl'] : $default_booking;
$secondary_btn_text = ! empty( $attributes['secondaryBtnText'] ) ? trim( (string) $attributes['secondaryBtnText'] ) : '';
$secondary_btn_url  = ! empty( $attributes['secondaryBtnUrl'] ) ? ( function_exists( 'sc_resolve_page_url' ) ? sc_resolve_page_url( $attributes['secondaryBtnUrl'] ) : $attributes['secondaryBtnUrl'] ) : home_url( '/contact/' );

$theme = ! empty( $attributes['theme'] ) ? sanitize_html_class( $attributes['theme'] ) : 'electric-blue';
$theme_class = 'theme-' . $theme;

// Parse description for potential checklist items (✓, ✔, -, *, •, +, 1.)
$desc_lines = preg_split( '/\r\n|\r|\n/', trim( (string) $description ) );
$intro_paras = array();
$checklist_items = array();

foreach ( $desc_lines as $line ) {
    $trimmed = trim( $line );
    if ( '' === $trimmed ) {
        continue;
    }
    if ( preg_match( '/^([✓✔\-*•–+]|\x{2022}|\d+[\.)])\s*(.*)$/u', $trimmed, $m ) ) {
        $item = preg_replace( '/\*\*(.*?)\*\*/', '<strong>$1</strong>', $m[2] );
        $checklist_items[] = wp_kses_post( $item );
    } else {
        if ( empty( $checklist_items ) ) {
            $intro_paras[] = wp_kses_post( $trimmed );
        } else {
            // If text comes after checklist
            $checklist_items[] = wp_kses_post( $trimmed );
        }
    }
}

$primary_btn_class = 'btn btn-primary-dark btn-lg';
$secondary_btn_class = 'btn btn-ghost-dark btn-lg';
if ( 'white' === $theme ) {
    $primary_btn_class = 'btn btn-primary btn-lg';
    $secondary_btn_class = 'btn btn-outline btn-lg';
}
?>

<section class="final-cta-section <?php echo esc_attr( $theme_class ); ?> wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'<?php echo esc_attr( $theme ); ?>'}" data-wp-pattern="secure-centric/final-cta-band">
  <div class="site-container">
    <h2><?php echo esc_html( $title ); ?></h2>
    
    <?php foreach ( $intro_paras as $p ) : ?>
      <p><?php echo $p; ?></p>
    <?php endforeach; ?>

    <?php if ( ! empty( $checklist_items ) ) : ?>
      <ul class="cta-checklist">
        <?php foreach ( $checklist_items as $item ) : ?>
          <li>
            <span class="cta-check-icon">✓</span>
            <span class="cta-check-text"><?php echo $item; ?></span>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php elseif ( empty( $intro_paras ) && ! empty( $description ) ) : ?>
      <p><?php echo esc_html( $description ); ?></p>
    <?php endif; ?>

    <div class="final-cta-buttons">
      <?php if ( ! empty( $primary_btn_text ) ) : ?>
        <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="<?php echo esc_attr( $primary_btn_class ); ?>"><?php echo esc_html( $primary_btn_text ); ?></a>
      <?php endif; ?>
      <?php if ( ! empty( $secondary_btn_text ) ) : ?>
        <a href="<?php echo esc_url( $secondary_btn_url ); ?>" class="<?php echo esc_attr( $secondary_btn_class ); ?>"><?php echo esc_html( $secondary_btn_text ); ?></a>
      <?php endif; ?>
    </div>
  </div>
</section>
