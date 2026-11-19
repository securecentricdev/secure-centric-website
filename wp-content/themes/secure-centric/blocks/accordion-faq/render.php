<?php
/**
 * Render Template for FAQ Accordion
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = isset( $attributes['eyebrow'] ) ? trim( str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) ) : '// FREQUENTLY ASKED QUESTIONS';
$title       = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Common questions';
$has_explicit_desc = array_key_exists( 'description', $attributes ) || array_key_exists( 'subtitle', $attributes );
$description = $has_explicit_desc ? ( array_key_exists( 'description', $attributes ) ? trim( (string) $attributes['description'] ) : trim( (string) $attributes['subtitle'] ) ) : 'Still have questions regarding your specific CMMC clauses or audit dates? Speak directly with our lead Registered Practitioner.';
$btn_text    = ! empty( $attributes['btnText'] ) ? $attributes['btnText'] : 'Book a Discovery Call →';
$default_booking = function_exists( 'sc_get_booking_url' ) ? sc_get_booking_url() : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';
$btn_url     = ! empty( $attributes['btnUrl'] ) ? $attributes['btnUrl'] : $default_booking;

$faqs = array();

if ( ! empty( $attributes['faqsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['faqsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['faqsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $faqs = $decoded;
    }
}

if ( empty( $faqs ) ) {
    $faqs = array(
        array(
            'q' => 'Where is Secure-Centric based?',
            'a' => 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.',
        ),
        array(
            'q' => 'Do you sell tools or managed IT?',
            'a' => 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.',
        ),
        array(
            'q' => 'How long have you worked on CMMC?',
            'a' => 'Most defense contractors complete their readiness, remediation, and documentation within 4 to 8 months, depending on boundary size and facility count.',
        ),
    );
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow     = sc_clean_text( $eyebrow );
    $title       = sc_clean_text( $title );
    $description = sc_clean_text( $description );
    $btn_text    = sc_clean_text( $btn_text );
    $faqs        = sc_clean_text( $faqs );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<section class="section-ice py-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:details-group" data-wp-pattern="secure-centric/faq-accordion"<?php echo $anchor_attr; ?>>
  <div class="site-container">
    <div class="faq-grid-layout">
      <div class="faq-intro-col">
        <?php if ( ! empty( $eyebrow ) ) : ?>
        <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
        <?php endif; ?>
        <h2<?php echo empty( $description ) ? ' style="margin-bottom: 24px;"' : ' style="margin-bottom: 16px;"'; ?>><?php echo esc_html( $title ); ?></h2>
        <?php if ( ! empty( $description ) ) : ?>
        <p style="color: var(--color-body-text); font-size: 0.9375rem; margin-bottom: 24px;">
          <?php echo esc_html( $description ); ?>
        </p>
        <?php endif; ?>
        <a href="<?php echo esc_url( $btn_url ); ?>" class="btn btn-secondary-outline"><?php echo esc_html( $btn_text ); ?></a>
      </div>

      <div class="accordion-group">
        <?php foreach ( $faqs as $idx => $faq ) : ?>
          <div class="accordion-item <?php echo ( 0 === $idx ) ? 'active' : ''; ?>">
            <div class="accordion-header" onclick="window.toggleAccordion ? window.toggleAccordion(this) : this.closest('.accordion-item').classList.toggle('active')">
              <span class="accordion-title"><?php echo esc_html( $faq['q'] ); ?></span>
              <span class="accordion-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
            </div>
            <div class="accordion-content">
              <?php echo esc_html( $faq['a'] ); ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
