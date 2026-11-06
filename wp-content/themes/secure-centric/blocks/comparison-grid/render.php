<?php
/**
 * Render Template for Comparison Grid (2-Col RPO vs MSP or 3-Col Approach Comparison)
 * Strictly matches demo/assets/js/app.js renderCompareCards
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$layout      = ! empty( $attributes['layout'] ) ? $attributes['layout'] : '3-col';
$eyebrow     = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// APPROACH COMPARISON';
$title       = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Three Ways Defense Subcontractors Approach CMMC';
$description = ! empty( $attributes['description'] ) ? sc_clean_text( $attributes['description'] ) : 'Why internal teams struggle with DIBCAC audits and where independent advisory creates true defensibility.';

if ( '2-col' === $layout ) :
    $left_title  = ! empty( $attributes['leftTitle'] ) ? $attributes['leftTitle'] : 'What Secure-Centric Does';
    $left_desc   = ! empty( $attributes['leftDesc'] ) ? $attributes['leftDesc'] : 'We lead compliance governance, boundary scoping, document authorship, and assessor defense.';
    $right_title = ! empty( $attributes['rightTitle'] ) ? $attributes['rightTitle'] : 'What Your MSP / Internal IT Does';
    $right_desc  = ! empty( $attributes['rightDesc'] ) ? $attributes['rightDesc'] : 'Your IT team implements physical and digital configurations to satisfy our technical requirements.';

    $rpo_points = array();
    if ( ! empty( $attributes['leftPoints'] ) ) {
        $dec_l = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['leftPoints'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['leftPoints'] ), true );
        if ( is_array( $dec_l ) && ! empty( $dec_l ) ) {
            $rpo_points = $dec_l;
        }
    }
    if ( empty( $rpo_points ) ) {
        $rpo_points = array(
            'Scopes the FCI & CUI boundary to minimize audit cost and timeline',
            'Performs formal gap analysis against all 110 NIST SP 800-171 controls',
            'Authors your System Security Plan (SSP) and Plan of Action & Milestones (POA&M)',
            'Conducts pre-assessment mock audits simulating C3PAO interview methods',
            'Provides 100% vendor-neutral advice (we never resell hardware or antivirus)',
        );
    }

    $msp_points = array();
    if ( ! empty( $attributes['rightPoints'] ) ) {
        $dec_r = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['rightPoints'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['rightPoints'] ), true );
        if ( is_array( $dec_r ) && ! empty( $dec_r ) ) {
            $msp_points = $dec_r;
        }
    }
    if ( empty( $msp_points ) ) {
        $msp_points = array(
            'Implements technical IT changes (MFA, firewalls, server patching, endpoint agents)',
            'Deploys hardware tokens, encrypted laptops, and network access switches',
            'Manages daily user ticketing, desktop support, and password resets',
            'Maintains daily backup retention and system uptime monitoring',
            'Executes configuration instructions derived from our RPO advisory plan',
        );
    }
    ?>
    <section class="section-white py-section wp-block-inspect wp-pattern-inspect" 
             data-wp-block="wp:columns {columns:2}" 
             data-wp-pattern="secure-centric/rpo-vs-msp-cards">
      <div class="site-container">
        <div style="text-align: center; max-width: 720px; margin: 0 auto 36px;">
          <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
          <h2><?php echo esc_html( $title ); ?></h2>
          <p style="font-size: 1rem; color: var(--color-body-text); margin-top: 10px;">
            <?php echo esc_html( $description ); ?>
          </p>
        </div>

        <div class="comparison-grid">
          <!-- Left Card: Secure-Centric (RPO) -->
          <div class="compare-card-rpo">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
              <div>
                <span class="badge-chip accent" style="font-size: 0.6875rem;">ACCREDITED RPO ADVISOR</span>
                <h3 style="font-size: 1.35rem; color: var(--color-navy); margin-top: 6px;"><?php echo esc_html( $left_title ); ?></h3>
              </div>
              <span class="logo-icon" style="width: 32px; height: 32px; font-size: 0.9rem;">SC</span>
            </div>
            <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">
              <?php echo esc_html( $left_desc ); ?>
            </p>
            <ul class="compare-list">
              <?php foreach ( $rpo_points as $pt ) : ?>
                <li>
                  <i class="check">✓</i>
                  <span><?php echo esc_html( $pt ); ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
            <div style="margin-top: 28px;">
              <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-primary" style="width: 100%; justify-content: center;">Engage Secure-Centric &rarr;</a>
            </div>
          </div>

          <!-- Right Card: Your MSP -->
          <div class="compare-card-msp">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
              <div>
                <span class="badge-chip" style="font-size: 0.6875rem;">OPERATIONAL EXECUTION</span>
                <h3 style="font-size: 1.35rem; color: var(--color-navy); margin-top: 6px;"><?php echo esc_html( $right_title ); ?></h3>
              </div>
              <div class="card-icon-box" style="margin: 0; width: 36px; height: 36px; font-size: 1rem;">⚙️</div>
            </div>
            <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">
              <?php echo esc_html( $right_desc ); ?>
            </p>
            <ul class="compare-list">
              <?php foreach ( $msp_points as $pt ) : ?>
                <li>
                  <i class="check msp-check">✓</i>
                  <span><?php echo esc_html( $pt ); ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
            <div style="margin-top: 28px;">
              <div class="card-soft-blue" style="padding: 12px; font-size: 0.8125rem; text-align: center; color: var(--color-navy); font-weight: 600;">
                🤝 We collaborate directly with your MSP engineers
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Notice -->
        <div class="card-soft-blue" style="margin-top: 32px; padding: 18px 24px; border-left: 4px solid var(--color-electric-blue);">
          <p style="font-size: 0.875rem; color: var(--color-navy); line-height: 1.5; margin: 0;">
            <b>⚖️ Crucial Cyber AB Role Separation:</b> By Department of War regulation, an RPO advises, your MSP configures, and an independent C3PAO assesses. We never assess companies we advise, guaranteeing 100% conflict-free compliance and audit objectivity.
          </p>
        </div>
      </div>
    </section>

<?php else : ?>
    <!-- 3-Col Option Layout -->
    <?php
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
          <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
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
<?php endif; ?>
