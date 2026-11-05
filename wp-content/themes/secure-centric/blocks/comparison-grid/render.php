<?php
/**
 * Render Template for Comparison Grid
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow     = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// APPROACH COMPARISON';
$title       = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Three Ways Defense Subcontractors Approach CMMC';
$description = ! empty( $attributes['description'] ) ? $attributes['description'] : 'Why internal teams struggle with DIBCAC audits and where independent advisory creates true defensibility.';

$opt1_badge      = ! empty( $attributes['opt1Badge'] ) ? $attributes['opt1Badge'] : 'Option 1';
$opt1_title      = ! empty( $attributes['opt1Title'] ) ? $attributes['opt1Title'] : 'DIY / In-House IT';
$opt1_desc       = ! empty( $attributes['opt1Desc'] ) ? $attributes['opt1Desc'] : 'Internal IT teams download templates and attempt to interpret all 110 NIST controls alone.';
$opt1_risk_title = ! empty( $attributes['opt1RiskTitle'] ) ? $attributes['opt1RiskTitle'] : '❌ High Audit Failure Risk';
$opt1_risk_desc  = ! empty( $attributes['opt1RiskDesc'] ) ? $attributes['opt1RiskDesc'] : 'Massive scope sprawl. Incomplete evidence packages fail official C3PAO audits on Day 1.';

$opt2_badge      = ! empty( $attributes['opt2Badge'] ) ? $attributes['opt2Badge'] : 'Option 2';
$opt2_title      = ! empty( $attributes['opt2Title'] ) ? $attributes['opt2Title'] : 'Generic Managed MSP';
$opt2_desc       = ! empty( $attributes['opt2Desc'] ) ? $attributes['opt2Desc'] : 'IT vendors sell bundled cloud licenses and automated compliance portal subscriptions.';
$opt2_risk_title = ! empty( $attributes['opt2RiskTitle'] ) ? $attributes['opt2RiskTitle'] : '⚠️ Conflict of Interest';
$opt2_risk_desc  = ! empty( $attributes['opt2RiskDesc'] ) ? $attributes['opt2RiskDesc'] : 'MSPs grade their own homework. Portal checkmarks crumble during rigorous in-person DIBCAC interviews.';

$opt3_badge      = ! empty( $attributes['opt3Badge'] ) ? $attributes['opt3Badge'] : 'Option 3: Secure-Centric';
$opt3_title      = ! empty( $attributes['opt3Title'] ) ? $attributes['opt3Title'] : 'Independent RPO Advisory';
$opt3_desc       = ! empty( $attributes['opt3Desc'] ) ? $attributes['opt3Desc'] : 'Accredited RPO walks your facilities, reduces CUI scope, engineers controls, and stands beside you through the audit.';
$opt3_risk_title = ! empty( $attributes['opt3RiskTitle'] ) ? $attributes['opt3RiskTitle'] : '✅ 100% First-Pass Defensibility';
$opt3_risk_desc  = ! empty( $attributes['opt3RiskDesc'] ) ? $attributes['opt3RiskDesc'] : 'Rigorous mock assessments, verified SSP documentation, and scope reduction saving $50k+.';
?>

<section class="section-ice py-section wp-block-inspect" data-wp-pattern="secure-centric/comparison-table">
  <div class="site-container">
    <div class="section-heading-center" style="margin-bottom: 40px; text-align: center;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-slate); max-width: 640px; margin: 8px auto 0;">
        <?php echo esc_html( $description ); ?>
      </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; align-items: stretch;">
      <!-- Option 1: DIY -->
      <div class="card card-white" style="padding: 32px; display: flex; flex-direction: column;">
        <span class="badge-pill" style="align-self: flex-start; margin-bottom: 16px;"><?php echo esc_html( $opt1_badge ); ?></span>
        <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--color-navy);"><?php echo esc_html( $opt1_title ); ?></h3>
        <p style="font-size: 0.9375rem; color: var(--color-body-text); margin-bottom: 20px;">
          <?php echo esc_html( $opt1_desc ); ?>
        </p>
        <div style="border-top: 1px solid var(--color-border); padding-top: 16px; margin-top: auto;">
          <div style="color: #F0445A; font-weight: 700; font-size: 0.875rem; margin-bottom: 6px;"><?php echo esc_html( $opt1_risk_title ); ?></div>
          <p style="font-size: 0.8125rem; color: var(--color-slate); line-height: 1.4; margin: 0;">
            <?php echo esc_html( $opt1_risk_desc ); ?>
          </p>
        </div>
      </div>

      <!-- Option 2: Generic MSP -->
      <div class="card card-white" style="padding: 32px; display: flex; flex-direction: column;">
        <span class="badge-pill" style="align-self: flex-start; margin-bottom: 16px;"><?php echo esc_html( $opt2_badge ); ?></span>
        <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--color-navy);"><?php echo esc_html( $opt2_title ); ?></h3>
        <p style="font-size: 0.9375rem; color: var(--color-body-text); margin-bottom: 20px;">
          <?php echo esc_html( $opt2_desc ); ?>
        </p>
        <div style="border-top: 1px solid var(--color-border); padding-top: 16px; margin-top: auto;">
          <div style="color: #FFB020; font-weight: 700; font-size: 0.875rem; margin-bottom: 6px;"><?php echo esc_html( $opt2_risk_title ); ?></div>
          <p style="font-size: 0.8125rem; color: var(--color-slate); line-height: 1.4; margin: 0;">
            <?php echo esc_html( $opt2_risk_desc ); ?>
          </p>
        </div>
      </div>

      <!-- Option 3: Secure-Centric -->
      <div class="card card-white" style="padding: 32px; display: flex; flex-direction: column; border: 2px solid var(--color-electric-blue); position: relative; box-shadow: var(--shadow-md);">
        <span class="badge-pill" style="background: var(--color-electric-blue); color: #fff; align-self: flex-start; margin-bottom: 16px;"><?php echo esc_html( $opt3_badge ); ?></span>
        <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--color-navy);"><?php echo esc_html( $opt3_title ); ?></h3>
        <p style="font-size: 0.9375rem; color: var(--color-body-text); margin-bottom: 20px;">
          <?php echo esc_html( $opt3_desc ); ?>
        </p>
        <div style="border-top: 1px solid var(--color-border); padding-top: 16px; margin-top: auto;">
          <div style="color: #00875A; font-weight: 700; font-size: 0.875rem; margin-bottom: 6px;"><?php echo esc_html( $opt3_risk_title ); ?></div>
          <p style="font-size: 0.8125rem; color: var(--color-slate); line-height: 1.4; margin: 0;">
            <?php echo esc_html( $opt3_risk_desc ); ?>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
