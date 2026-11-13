<?php
/**
 * Render Template for Why Secure-Centric & Proof Grid
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow     = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// PROOF & CREDENTIALS';
$title       = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Why Secure-Centric';
$description = ! empty( $attributes['description'] ) ? $attributes['description'] : 'Secure-Centric is an accredited Cyber AB Registered Provider Organization (RPO). We help defense subcontractors navigate DFARS 252.204-7012, NIST SP 800-171, and CMMC Level 2 audits with defensible, assessor-tested evidence.';
$link_text   = ! empty( $attributes['linkText'] ) ? $attributes['linkText'] : 'Full Company Credentials →';
$link_url    = ! empty( $attributes['linkUrl'] ) ? $attributes['linkUrl'] : home_url( '/about/' );
if ( '#contact' === $link_url || empty( $link_url ) ) {
    $link_url = home_url( '/about/' );
}

$stat1_number = ! empty( $attributes['stat1Number'] ) ? $attributes['stat1Number'] : '120+';
$stat1_label  = ! empty( $attributes['stat1Label'] ) ? $attributes['stat1Label'] : 'Defense contractors prepared for CMMC & NIST SP 800-171 audits';
$stat1_date   = ! empty( $attributes['stat1Date'] ) ? $attributes['stat1Date'] : 'As of Q4 2026';

$stat2_number = ! empty( $attributes['stat2Number'] ) ? $attributes['stat2Number'] : '100%';
$stat2_label  = ! empty( $attributes['stat2Label'] ) ? $attributes['stat2Label'] : 'First-time pass record with Authorized C3PAO and DIBCAC assessors';
$stat2_date   = ! empty( $attributes['stat2Date'] ) ? $attributes['stat2Date'] : 'Level 2 CMMC audits';

// Parse numeric values and affixes for counter animation
preg_match( '/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/', trim( $stat1_number ), $m1 );
$stat1_val    = ! empty( $m1[2] ) ? $m1[2] : '120';
$stat1_prefix = ! empty( $m1[1] ) ? $m1[1] : '';
$stat1_suffix = ! empty( $m1[3] ) ? $m1[3] : '+';

preg_match( '/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/', trim( $stat2_number ), $m2 );
$stat2_val    = ! empty( $m2[2] ) ? $m2[2] : '100';
$stat2_prefix = ! empty( $m2[1] ) ? $m2[1] : '';
$stat2_suffix = ! empty( $m2[3] ) ? $m2[3] : '%';

// Keep only Cyber AB Authorized RPO and On-Site Walkthrough cards (2 cards matching 2 black cards in height and width)
$cards = array(
    1 => array(
        'title' => ! empty( $attributes['card1Title'] ) ? $attributes['card1Title'] : 'Cyber AB Authorized RPO',
        'text'  => ! empty( $attributes['card1Text'] ) ? $attributes['card1Text'] : 'Formally credentialed by the Cyber AB (RPO #3942) with certified Registered Practitioners (RPs) leading every client engagement on site.',
        'icon'  => ! empty( $attributes['card1Icon'] ) ? $attributes['card1Icon'] : '🛡️',
    ),
    2 => array(
        'title' => ! empty( $attributes['card3Title'] ) ? $attributes['card3Title'] : ( ! empty( $attributes['card2Title'] ) && false !== stripos( $attributes['card2Title'], 'site' ) ? $attributes['card2Title'] : 'On-Site Physical & Technical Walkthrough' ),
        'text'  => ! empty( $attributes['card3Text'] ) ? $attributes['card3Text'] : ( ! empty( $attributes['card2Text'] ) && false !== stripos( $attributes['card2Text'], 'facilities' ) ? $attributes['card2Text'] : 'We walk your facilities, shop floors, and secure server rooms to physically map CUI flows and isolate enclave boundaries.' ),
        'icon'  => ! empty( $attributes['card3Icon'] ) ? $attributes['card3Icon'] : '🏭',
    ),
);

$badge1 = ! empty( $attributes['badge1Text'] ) ? $attributes['badge1Text'] : '🛡️ Cyber AB RPO #3942';
$badge2 = ! empty( $attributes['badge2Text'] ) ? $attributes['badge2Text'] : '⭐ Inc. 5000 #452 Fastest Growing';
$badge3 = ! empty( $attributes['badge3Text'] ) ? $attributes['badge3Text'] : '🔒 Bilateral NDA Standard';
$badge_note = ! empty( $attributes['badgeNote'] ) ? $attributes['badgeNote'] : 'Los Angeles, California · Nationwide On-Site Deployments';
?>

<section class="section-white py-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/why-proof-badges">
  <div class="site-container">
    <div class="why-header-row" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; flex-wrap: wrap; gap: 20px;">
      <div style="max-width: 780px;">
        <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
        <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
        <p style="font-size: 1.0625rem; color: var(--color-body-text); line-height: 1.6; margin: 0;">
          <?php echo esc_html( $description ); ?>
        </p>
      </div>
      <a href="<?php echo esc_url( $link_url ); ?>" class="text-link" style="white-space: nowrap; font-weight: 700;"><?php echo esc_html( $link_text ); ?></a>
    </div>

    <div class="why-proof-grid">
      <!-- Left Stats Numbers -->
      <div class="why-stats-col">
        <div class="stats-number-block">
          <div class="number sc-counter" data-target="<?php echo esc_attr( $stat1_val ); ?>" data-prefix="<?php echo esc_attr( $stat1_prefix ); ?>" data-suffix="<?php echo esc_attr( $stat1_suffix ); ?>"><?php echo esc_html( $stat1_number ); ?></div>
          <div class="label"><?php echo esc_html( $stat1_label ); ?></div>
          <div class="date"><?php echo esc_html( $stat1_date ); ?></div>
        </div>
        <div class="stats-number-block">
          <div class="number violet sc-counter" data-target="<?php echo esc_attr( $stat2_val ); ?>" data-prefix="<?php echo esc_attr( $stat2_prefix ); ?>" data-suffix="<?php echo esc_attr( $stat2_suffix ); ?>"><?php echo esc_html( $stat2_number ); ?></div>
          <div class="label"><?php echo esc_html( $stat2_label ); ?></div>
          <div class="date"><?php echo esc_html( $stat2_date ); ?></div>
        </div>
      </div>

      <!-- Right 2 Cards: Cyber AB & On-Site (Exact same dimensions as left black cards) -->
      <div class="why-cards-grid">
        <?php foreach ( $cards as $c ) : ?>
          <div class="card-white" style="display: flex; flex-direction: column; justify-content: center; gap: 8px;">
            <div class="card-icon-box" style="width: 38px; height: 38px; font-size: 1.15rem; border-radius: 8px; background: var(--color-soft-blue); color: var(--color-electric-blue); display: flex; align-items: center; justify-content: center;"><?php echo esc_html( $c['icon'] ); ?></div>
            <h4 style="font-size: 1.125rem; font-weight: 700; margin: 4px 0 0; color: var(--color-navy);"><?php echo esc_html( $c['title'] ); ?></h4>
            <p style="font-size: 0.9375rem; color: var(--color-body-text); line-height: 1.55; margin: 0;"><?php echo esc_html( $c['text'] ); ?></p>
          </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Verified Credentials Bottom Strip -->
    <div class="why-badges-row">
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--color-slate); font-weight: 700;">Official Badges:</span>
        <span class="badge-chip" style="background: var(--color-soft-blue); color: var(--color-navy); border: 1px solid var(--color-border); font-size: 0.75rem;"><?php echo esc_html( $badge1 ); ?></span>
        <span class="badge-chip" style="background: var(--color-soft-blue); color: var(--color-navy); border: 1px solid var(--color-border); font-size: 0.75rem;"><?php echo esc_html( $badge2 ); ?></span>
        <span class="badge-chip" style="background: var(--color-soft-blue); color: var(--color-navy); border: 1px solid var(--color-border); font-size: 0.75rem;"><?php echo esc_html( $badge3 ); ?></span>
      </div>
      <span style="font-size: 0.8125rem; color: var(--color-slate); font-family: var(--font-mono);"><?php echo esc_html( $badge_note ); ?></span>
    </div>
  </div>
</section>
