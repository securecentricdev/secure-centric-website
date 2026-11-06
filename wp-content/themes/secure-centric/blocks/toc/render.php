<?php
/**
 * Render Template for On-This-Page Table of Contents Block
 * Strictly matches demo/assets/js/app.js case 'toc'
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title = ! empty( $attributes['title'] ) ? $attributes['title'] : 'On This Page';

$links = array();
if ( ! empty( $attributes['linksData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['linksData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['linksData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $links = $decoded;
    }
}

if ( empty( $links ) ) {
    $links = array(
        array( 'label' => 'Scoping & Boundaries', 'anchor' => '#scoping' ),
        array( 'label' => 'The 14 Control Families', 'anchor' => '#families' ),
        array( 'label' => 'SPRS Scoring Methodology', 'anchor' => '#sprs' ),
        array( 'label' => 'Technical Remediation & Enclaves', 'anchor' => '#enclaves' ),
        array( 'label' => 'SSP & Policy Documentation', 'anchor' => '#ssp' ),
        array( 'label' => 'C3PAO Audit Day Readiness', 'anchor' => '#audit' ),
    );
}
?>

<section class="section-ice py-section-sm wp-block-inspect" data-wp-block="wp:group {className:'on-this-page-toc'}" style="background-color: var(--color-ice); border-bottom: 1px solid var(--color-border); padding: 18px 0;">
  <div class="site-container">
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--color-electric-blue); background: var(--color-soft-blue); padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(47,91,255,0.2);">📑 <?php echo esc_html( $title ); ?></span>
        <span style="font-size: 0.875rem; color: var(--color-body-text); font-weight: 600;">Jump to section:</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <?php foreach ( $links as $l ) : ?>
          <a href="<?php echo esc_attr( $l['anchor'] ); ?>" class="hud-btn" style="background: var(--color-white); border: 1px solid var(--color-border); color: var(--color-navy); padding: 5px 12px; font-size: 0.8125rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s ease;">
            <?php echo esc_html( $l['label'] ); ?> &darr;
          </a>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
