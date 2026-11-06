<?php
/**
 * Render Template for Related Compliance Resources
 * Strictly matches demo/assets/js/app.js renderRelated
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// KNOWLEDGE ECOSYSTEM';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Related Compliance Resources';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Explore related compliance frameworks, staging guides, and scoping resources.';

$pages = array();
if ( ! empty( $attributes['pagesData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['pagesData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['pagesData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $pages = $decoded;
    }
}

if ( empty( $pages ) ) {
    $pages = array(
        array(
            'title' => 'CMMC Complete Guide',
            'desc'  => 'Everything defense contractors need to know about levels, rulemaking, and audits.',
            'url'   => home_url( '/cmmc/' ),
        ),
        array(
            'title' => 'CMMC Level 2 Guide',
            'desc'  => '110 requirements across 14 families: technical details and self vs C3PAO rules.',
            'url'   => home_url( '/cmmc/level-2/' ),
        ),
        array(
            'title' => 'NIST SP 800-171 Explained',
            'desc'  => 'The technical foundation of CMMC Level 2 and DFARS 7012 requirements.',
            'url'   => home_url( '/nist-800-171/' ),
        ),
        array(
            'title' => 'CMMC Enclave Advisory',
            'desc'  => 'How shrinking your CUI scope saves months of time and tens of thousands in audit costs.',
            'url'   => home_url( '/services/cmmc-enclave/' ),
        ),
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:columns" data-wp-pattern="secure-centric/related-pages">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 32px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="related-pages-grid">
      <?php foreach ( $pages as $p ) : ?>
        <?php
        $p_title = ! empty( $p['title'] ) ? $p['title'] : '';
        $p_desc  = ! empty( $p['desc'] ) ? $p['desc'] : '';
        $p_url   = ! empty( $p['url'] ) ? $p['url'] : '#contact';
        if ( 0 === strpos( $p_url, '#page-' ) ) {
            $p_url = home_url( '/' . str_replace( '#', '', $p_url ) );
        }
        ?>
        <a href="<?php echo esc_url( $p_url ); ?>" class="related-page-card">
          <div class="related-card-top">
            <span class="related-badge">Guide</span>
            <span class="related-arrow">&rarr;</span>
          </div>
          <h4 class="related-title"><?php echo esc_html( $p_title ); ?></h4>
          <p class="related-desc"><?php echo esc_html( $p_desc ); ?></p>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
