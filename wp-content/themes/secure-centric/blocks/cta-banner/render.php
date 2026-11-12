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
$default_booking  = function_exists( 'sc_get_booking_url' ) ? sc_get_booking_url() : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';
$primary_btn_url  = ! empty( $attributes['primaryBtnUrl'] ) ? $attributes['primaryBtnUrl'] : $default_booking;
if ( stripos( $primary_btn_text, 'book' ) !== false && ( empty( $primary_btn_url ) || '#contact' === $primary_btn_url || strpos( $primary_btn_url, '/contact/' ) !== false ) ) {
    $primary_btn_url = $default_booking;
}
$phone_text       = ! empty( $attributes['phoneText'] ) ? $attributes['phoneText'] : 'Call (323) 410-5941';
$phone_url        = ! empty( $attributes['phoneUrl'] ) ? $attributes['phoneUrl'] : 'tel:323-410-5941';
?>

<section class="final-cta-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'electric-blue'}" data-wp-pattern="secure-centric/final-cta-band">
  <div class="site-container">
    <h2><?php echo esc_html( $title ); ?></h2>
    <p><?php echo esc_html( $description ); ?></p>
    <div class="final-cta-buttons">
      <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary-dark btn-lg"><?php echo esc_html( $primary_btn_text ); ?></a>
      <a href="<?php echo esc_url( $phone_url ); ?>" class="btn btn-ghost-dark btn-lg"><?php echo esc_html( $phone_text ); ?></a>
    </div>
  </div>
</section>
