<?php
/**
 * Render Template for Regulatory Citations Freshness Card Block
 * Strictly matches demo/assets/js/app.js renderFresh
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title   = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Official Rulemaking & Regulatory References';
$updated = ! empty( $attributes['updated'] ) ? $attributes['updated'] : 'November 2026';

$sources = array();
if ( ! empty( $attributes['sourcesData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['sourcesData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['sourcesData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $sources = $decoded;
    }
}

if ( empty( $sources ) ) {
    $sources = array(
        array( 'name' => '32 CFR Part 170 — Department of Defense CMMC Program Final Rule', 'url' => 'https://www.federalregister.gov/' ),
        array( 'name' => 'NIST SP 800-171 Rev 2 — Protecting Controlled Unclassified Information', 'url' => 'https://csrc.nist.gov/' ),
        array( 'name' => 'DFARS 252.204-7012 — Safeguarding Covered Defense Information', 'url' => 'https://www.acquisition.gov/dfars/' ),
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/freshness-sources">
  <div class="site-container">
    <div class="freshness-card">
      <div class="freshness-header">
        <div>
          <span class="section-eyebrow">// REGULATORY CITATIONS</span>
          <h3 style="margin-bottom: 8px; color: var(--color-navy);"><?php echo esc_html( $title ); ?></h3>
          <p style="color: var(--color-body-text); font-size: 0.9375rem;">
            Last formally reviewed and verified against DoD acquisition rulemaking: <strong><?php echo esc_html( $updated ); ?></strong>.
          </p>
        </div>
        <div class="verified-seal">
          <span class="pulse-dot"></span>
          <span>Active 32 CFR 170 Rule</span>
        </div>
      </div>
      <div class="sources-list">
        <?php foreach ( $sources as $s ) : ?>
          <a href="<?php echo esc_url( $s['url'] ); ?>" target="_blank" rel="noopener" class="source-item-row">
            <span class="source-icon">🏛️</span>
            <span class="source-name"><?php echo esc_html( $s['name'] ); ?></span>
            <span class="source-link-out">View Official Government Source &nearr;</span>
          </a>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
