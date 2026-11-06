<?php
/**
 * Render Template for Two Column Comparison Cards Block
 * Strictly matches demo/assets/js/app.js renderTwoCol
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// OBJECTIVE COMPARISON';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Who needs an RPO, and who may not';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Understanding the fundamental regulatory distinctions to make informed compliance decisions.';

$col1_title = ! empty( $attributes['col1Title'] ) ? $attributes['col1Title'] : 'When You Need an Accredited RPO';
$col1_desc  = ! empty( $attributes['col1Desc'] ) ? $attributes['col1Desc'] : 'Contractors facing immediate DFARS requirements or C3PAO audits.';
$col1_items = array();
if ( ! empty( $attributes['col1Items'] ) ) {
    $dec1 = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['col1Items'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['col1Items'] ), true );
    if ( is_array( $dec1 ) && ! empty( $dec1 ) ) {
        $col1_items = $dec1;
    }
}
if ( empty( $col1_items ) ) {
    $col1_items = array(
        'Your contract contains DFARS 252.204-7021 requiring Level 2 certification',
        'Your prime contractor demands a defensible, audited SPRS score above +70',
        'You handle Controlled Unclassified Information (CUI) on internal servers',
        'You need an assessor-defensible System Security Plan (SSP) without fluff',
        'Your internal team or MSP lacks certified Cyber AB Registered Practitioners',
    );
}

$col2_title = ! empty( $attributes['col2Title'] ) ? $attributes['col2Title'] : 'When an RPO May Not Be Required';
$col2_desc  = ! empty( $attributes['col2Desc'] ) ? $attributes['col2Desc'] : 'Organizations without CUI or with pure commercial off-the-shelf contracts.';
$col2_items = array();
if ( ! empty( $attributes['col2Items'] ) ) {
    $dec2 = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['col2Items'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['col2Items'] ), true );
    if ( is_array( $dec2 ) && ! empty( $dec2 ) ) {
        $col2_items = $dec2;
    }
}
if ( empty( $col2_items ) ) {
    $col2_items = array(
        'Your contracts are strictly Commercial-Off-The-Shelf (COTS) items',
        'You only handle Federal Contract Information (FCI) subject to Level 1',
        'You already have a full-time, certified in-house CMMC compliance staff',
        'Your current SPRS score is +110 with verified, auditor-tested evidence binders',
    );
}
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:columns" data-wp-pattern="secure-centric/two-col-compare">
  <div class="site-container">
    <div class="section-header-center" style="margin-bottom: 40px; text-align: center;">
      <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
      <h2><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); max-width: 700px; margin: 12px auto 0;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="two-col-grid">
      <div class="two-col-card left-card">
        <div class="two-col-header">
          <h3><?php echo esc_html( $col1_title ); ?></h3>
          <p><?php echo esc_html( $col1_desc ); ?></p>
        </div>
        <ul class="two-col-list">
          <?php foreach ( $col1_items as $it ) : ?>
            <li>
              <svg class="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span><?php echo esc_html( $it ); ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div class="two-col-card right-card">
        <div class="two-col-header">
          <h3><?php echo esc_html( $col2_title ); ?></h3>
          <p><?php echo esc_html( $col2_desc ); ?></p>
        </div>
        <ul class="two-col-list">
          <?php foreach ( $col2_items as $it ) : ?>
            <li>
              <svg class="check-icon-blue" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span><?php echo esc_html( $it ); ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </div>
</section>
