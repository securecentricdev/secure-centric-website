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

$stats = array(
    array(
        'number' => '120+',
        'label'  => 'Defense contractors prepared for CMMC & NIST SP 800-171 audits',
        'date'   => 'As of Q4 2026',
        'color'  => '',
    ),
    array(
        'number' => '100%',
        'label'  => 'First-time pass record with Authorized C3PAO and DIBCAC assessors',
        'date'   => 'Level 2 CMMC audits',
        'color'  => 'violet',
    ),
);

$reasons = array(
    array(
        'title' => 'Cyber AB Authorized RPO',
        'text'  => 'Formally credentialed by the Cyber AB (RPO #3942) with certified Registered Practitioners (RPs) leading every client engagement on site.',
    ),
    array(
        'title' => 'Exclusive CMMC & NIST Focus',
        'text'  => 'We do not sell generic IT services or managed antivirus. Our sole specialization is defense cybersecurity compliance and C3PAO audit readiness.',
    ),
    array(
        'title' => 'On-Site Physical & Technical Walkthrough',
        'text'  => 'We walk your facilities, shop floors, and secure server rooms to physically map CUI flows and isolate enclave boundaries.',
    ),
    array(
        'title' => 'Independent & Scope-Shrinking Advisory',
        'text'  => 'We provide vendor-neutral advisory to shrink your assessment scope, saving tens of thousands in hardware, software, and audit fees.',
    ),
);
?>

<section class="section-white py-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/why-proof-badges">
  <div class="site-container">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; flex-wrap: wrap; gap: 20px;">
      <div style="max-width: 780px;">
        <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
        <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
        <p style="font-size: 1.0625rem; color: var(--color-body-text); line-height: 1.6; margin: 0;">
          <?php echo esc_html( $description ); ?>
        </p>
      </div>
      <a href="<?php echo esc_url( $link_url ); ?>" class="text-link" style="white-space: nowrap; font-weight: 700;"><?php echo esc_html( $link_text ); ?></a>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 32px; align-items: start;">
      <!-- Left Stats Numbers -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <?php foreach ( $stats as $s ) : ?>
          <div class="stats-number-block">
            <div class="number <?php echo esc_attr( $s['color'] ); ?>"><?php echo esc_html( $s['number'] ); ?></div>
            <div class="label"><?php echo esc_html( $s['label'] ); ?></div>
            <div class="date"><?php echo esc_html( $s['date'] ); ?></div>
          </div>
        <?php endforeach; ?>
      </div>

      <!-- Right 4 Reasons Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">
        <?php foreach ( $reasons as $r ) : ?>
          <div class="card-white" style="padding: 24px; display: flex; flex-direction: column; gap: 8px;">
            <div class="card-icon-box" style="width: 36px; height: 36px; font-size: 1.1rem; border-radius: 8px; background: var(--color-soft-blue); color: var(--color-electric-blue); display: flex; align-items: center; justify-content: center;">🛡️</div>
            <h4 style="font-size: 1.0625rem; margin-top: 4px; color: var(--color-navy);"><?php echo esc_html( $r['title'] ); ?></h4>
            <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.55; margin: 0;"><?php echo esc_html( $r['text'] ); ?></p>
          </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Verified Credentials Bottom Strip -->
    <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--color-slate); font-weight: 700;">Official Badges:</span>
        <span class="badge-chip" style="background: var(--color-soft-blue); color: var(--color-navy); border: 1px solid var(--color-border); font-size: 0.75rem;">🛡️ Cyber AB RPO #3942</span>
        <span class="badge-chip" style="background: var(--color-soft-blue); color: var(--color-navy); border: 1px solid var(--color-border); font-size: 0.75rem;">⭐ Inc. 5000 #452 Fastest Growing</span>
        <span class="badge-chip" style="background: var(--color-soft-blue); color: var(--color-navy); border: 1px solid var(--color-border); font-size: 0.75rem;">🔒 Bilateral NDA Standard</span>
      </div>
      <span style="font-size: 0.8125rem; color: var(--color-slate); font-family: var(--font-mono);">Los Angeles, California · Nationwide On-Site Deployments</span>
    </div>
  </div>
</section>
