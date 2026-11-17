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
$description      = ! empty( $attributes['description'] ) ? $attributes['description'] : 'Talk with an accredited Cyber AB Registered Provider Organization. Get an actionable first step in writing within 30 minutes.';
$primary_btn_text = ! empty( $attributes['primaryBtnText'] ) ? $attributes['primaryBtnText'] : 'Book a Discovery Call →';
$default_booking    = function_exists( 'sc_get_booking_url' ) ? sc_get_booking_url() : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';
$primary_btn_url    = ! empty( $attributes['primaryBtnUrl'] ) ? $attributes['primaryBtnUrl'] : $default_booking;
$secondary_btn_text = ! empty( $attributes['secondaryBtnText'] ) ? $attributes['secondaryBtnText'] : ( ! empty( $attributes['phoneText'] ) ? $attributes['phoneText'] : 'Submit Your Query' );
$secondary_btn_url  = ! empty( $attributes['secondaryBtnUrl'] ) ? ( function_exists( 'sc_resolve_page_url' ) ? sc_resolve_page_url( $attributes['secondaryBtnUrl'] ) : $attributes['secondaryBtnUrl'] ) : ( ! empty( $attributes['phoneUrl'] ) ? $attributes['phoneUrl'] : home_url( '/contact/' ) );
?>

<section class="final-cta-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'electric-blue'}" data-wp-pattern="secure-centric/final-cta-band">
  <div class="site-container">
    <h2><?php echo esc_html( $title ); ?></h2>
    <p><?php echo esc_html( $description ); ?></p>
    <div class="final-cta-buttons">
      <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary-dark btn-lg"><?php echo esc_html( $primary_btn_text ); ?></a>
      <a href="<?php echo esc_url( $secondary_btn_url ); ?>" class="btn btn-ghost-dark btn-lg"><?php echo esc_html( $secondary_btn_text ); ?></a>
    </div>
  </div>
</section>
