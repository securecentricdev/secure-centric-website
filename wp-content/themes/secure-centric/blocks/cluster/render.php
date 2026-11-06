<?php
/**
 * Render Template for Topic Cluster Links Grid Block
 * Strictly matches demo/assets/js/app.js renderCluster
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Explore Related Compliance Topics';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Cross-linked compliance pillars, assessment staging, and implementation guides.';

$links = array();
if ( ! empty( $attributes['linksData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['linksData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['linksData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $links = $decoded;
    }
}

if ( empty( $links ) ) {
    $links = array(
        array( 'label' => 'CMMC Compliance Overview', 'url' => home_url( '/services/cmmc-compliance/' ) ),
        array( 'label' => 'Level 2 Requirements Guide', 'url' => home_url( '/cmmc/level-2/' ) ),
        array( 'label' => 'NIST SP 800-171 Explained', 'url' => home_url( '/nist-800-171/' ) ),
        array( 'label' => 'What is Controlled Unclassified Info?', 'url' => home_url( '/cui/' ) ),
        array( 'label' => '8-Step CMMC Audit Process', 'url' => home_url( '/cmmc/cmmc-process/' ) ),
        array( 'label' => 'What is a Cyber AB RPO?', 'url' => home_url( '/cmmc/rpo/' ) ),
    );
}
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/topic-cluster">
  <div class="site-container">
    <div class="section-header-center" style="margin-bottom: 36px; text-align: center;">
      <span class="section-eyebrow" style="justify-content: center;">// TOPIC CLUSTER</span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); max-width: 600px; margin: 0 auto;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="topic-cluster-grid">
      <?php foreach ( $links as $l ) : ?>
        <a href="<?php echo esc_url( $l['url'] ); ?>" class="cluster-link-pill">
          <span><?php echo esc_html( $l['label'] ); ?></span>
          <span class="cluster-arrow">&rarr;</span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
