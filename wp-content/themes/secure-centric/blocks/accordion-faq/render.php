<?php
/**
 * Render Template for FAQ Accordion
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow     = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// FREQUENTLY ASKED QUESTIONS';
$title       = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Common questions';
$description = ! empty( $attributes['description'] ) ? $attributes['description'] : 'Still have questions regarding your specific CMMC clauses or audit dates? Speak directly with our lead Registered Practitioner.';
$btn_text    = ! empty( $attributes['btnText'] ) ? $attributes['btnText'] : 'Book a Discovery Call →';
$btn_url     = ! empty( $attributes['btnUrl'] ) ? $attributes['btnUrl'] : '#contact';

$faqs = array();

if ( ! empty( $attributes['faqsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['faqsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['faqsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $faqs = $decoded;
    }
}

if ( empty( $faqs ) ) {
    $default_faqs = array(
        1 => array(
            'q' => 'What is CMMC compliance?',
            'a' => 'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense contractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).',
        ),
        2 => array(
            'q' => 'Do you come to our site?',
            'a' => 'Yes, absolutely. An on-site facility walkthrough is step 1 of every engagement. We inspect physical boundaries, server rooms, and shop-floor terminals in person.',
        ),
        3 => array(
            'q' => 'Do you only work on CMMC and NIST SP 800-171?',
            'a' => 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.',
        ),
        4 => array(
            'q' => 'What happens after I book a discovery call?',
            'a' => 'Having your prime contract Section I DFARS clauses (e.g. 252.204-7012, 7019, 7020), your high-level network topology, and whether you handle CUI or FCI will make the call most productive.',
        ),
        5 => array(
            'q' => 'Who will we work with day to day?',
            'a' => 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.',
        ),
    );

    for ( $i = 1; $i <= 5; $i++ ) {
        $def = $default_faqs[ $i ];
        $faqs[] = array(
            'q' => ! empty( $attributes[ 'faq' . $i . 'Q' ] ) ? $attributes[ 'faq' . $i . 'Q' ] : $def['q'],
            'a' => ! empty( $attributes[ 'faq' . $i . 'A' ] ) ? $attributes[ 'faq' . $i . 'A' ] : $def['a'],
        );
    }
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow     = sc_clean_text( $eyebrow );
    $title       = sc_clean_text( $title );
    $description = sc_clean_text( $description );
    $btn_text    = sc_clean_text( $btn_text );
    $faqs        = sc_clean_text( $faqs );
}
?>

<section class="section-ice py-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:details-group" data-wp-pattern="secure-centric/faq-accordion">
  <div class="site-container">
    <div class="faq-grid-layout">
      <div class="faq-intro-col">
        <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
        <h2 style="margin-bottom: 16px;"><?php echo esc_html( $title ); ?></h2>
        <p style="color: var(--color-body-text); font-size: 0.9375rem; margin-bottom: 24px;">
          <?php echo esc_html( $description ); ?>
        </p>
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
