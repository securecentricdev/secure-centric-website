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

$title = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Three Ways Defense Subcontractors Approach CMMC';
if ( function_exists( 'sc_clean_text' ) ) {
    $title = sc_clean_text( $title );
}

$layout = ! empty( $attributes['layout'] ) ? $attributes['layout'] : '3-col';

// Auto-detect 2-column layout ONLY if explicitly set or if title is specific to RPO vs MSP division
if (
    '2-col' === $layout ||
    false !== stripos( $title, 'cannot do' ) ||
    false !== stripos( $title, 'versus your msp' ) ||
    false !== stripos( $title, 'versus msp' ) ||
    false !== stripos( $title, 'division of responsibilities' )
) {
    $layout = '2-col';
} else {
    $layout = '3-col';
}

$eyebrow = isset( $attributes['eyebrow'] ) ? trim( str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) ) : ( '2-col' === $layout ? '// CLEAR DIVISION OF RESPONSIBILITIES' : '// APPROACH COMPARISON' );
$description = ! empty( $attributes['description'] ) ? $attributes['description'] : ( ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : '' );

if ( empty( $description ) ) {
    $description = ( '2-col' === $layout )
        ? 'Defense contractors frequently ask: "Can our MSP do this alone?" Here is how an accredited Cyber AB RPO works alongside your existing technical team without overlap.'
        : 'Why internal teams struggle with DIBCAC audits and where independent advisory creates true defensibility.';
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow     = sc_clean_text( $eyebrow );
    $description = sc_clean_text( $description );
}

if ( '2-col' === $layout ) :
    $is_cannot_do = ( false !== stripos( $title, 'cannot do' ) );

    $default_left_title  = $is_cannot_do ? 'An RPO can' : 'What Secure-Centric Does';
    $default_right_title = $is_cannot_do ? 'An RPO cannot' : 'What Your MSP / Internal IT Does';

    $left_title  = ! empty( $attributes['leftTitle'] ) ? $attributes['leftTitle'] : ( ! empty( $attributes['col1Title'] ) ? ( $is_cannot_do ? 'An RPO can' : $attributes['col1Title'] ) : $default_left_title );
    $left_desc   = ! empty( $attributes['leftDesc'] ) ? $attributes['leftDesc'] : ( ! empty( $attributes['col1Desc'] ) ? $attributes['col1Desc'] : 'We lead compliance governance, boundary scoping, document authorship, and assessor defense.' );
    $right_title = ! empty( $attributes['rightTitle'] ) ? $attributes['rightTitle'] : ( ! empty( $attributes['col2Title'] ) ? ( $is_cannot_do ? 'An RPO cannot' : $attributes['col2Title'] ) : $default_right_title );
    $right_desc  = ! empty( $attributes['rightDesc'] ) ? $attributes['rightDesc'] : ( ! empty( $attributes['col2Desc'] ) ? $attributes['col2Desc'] : 'Your IT team implements physical and digital configurations to satisfy our technical requirements.' );
    $btn_text    = ! empty( $attributes['btnText'] ) ? $attributes['btnText'] : 'Engage Secure-Centric →';
    $btn_url     = ! empty( $attributes['btnUrl'] ) ? $attributes['btnUrl'] : home_url( '/services/cmmc-consulting/' );

    $left_badge  = ! empty( $attributes['leftBadge'] ) ? $attributes['leftBadge'] : ( false !== stripos( $left_title, 'fit' ) ? 'IDEAL CANDIDATE' : 'ACCREDITED RPO ADVISOR' );
    $right_badge = ! empty( $attributes['rightBadge'] ) ? $attributes['rightBadge'] : ( false !== stripos( $right_title, 'not' ) ? 'NOT RECOMMENDED' : 'OPERATIONAL EXECUTION' );
    $is_fit_card = ( false !== stripos( $right_title, 'not' ) || false !== stripos( $right_badge, 'not' ) );

    if ( function_exists( 'sc_clean_text' ) ) {
        $left_title  = sc_clean_text( $left_title );
        $left_desc   = sc_clean_text( $left_desc );
        $right_title = sc_clean_text( $right_title );
        $right_desc  = sc_clean_text( $right_desc );
    }

    $rpo_points = array();
    $raw_left = ! empty( $attributes['leftPoints'] ) ? $attributes['leftPoints'] : ( ! empty( $attributes['col1Items'] ) ? $attributes['col1Items'] : '' );
    if ( ! empty( $raw_left ) ) {
        $dec_l = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $raw_left ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $raw_left ), true );
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
    $raw_right = ! empty( $attributes['rightPoints'] ) ? $attributes['rightPoints'] : ( ! empty( $attributes['col2Items'] ) ? $attributes['col2Items'] : '' );
    if ( ! empty( $raw_right ) ) {
        $dec_r = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $raw_right ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $raw_right ), true );
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

    if ( function_exists( 'sc_clean_text' ) ) {
        $rpo_points = sc_clean_text( $rpo_points );
        $msp_points = sc_clean_text( $msp_points );
    }

    $anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
    $anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
    ?>
    <section class="section-white py-section wp-block-inspect wp-pattern-inspect" 
             data-wp-block="wp:columns {columns:2}" 
             data-wp-pattern="secure-centric/rpo-vs-msp-cards"<?php echo $anchor_attr; ?>>
      <div class="site-container">
        <div style="text-align: center; max-width: 720px; margin: 0 auto 36px;">
          <?php if ( ! empty( $eyebrow ) ) : ?>
          <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
          <?php endif; ?>
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
                <span class="badge-chip accent" style="font-size: 0.6875rem;"><?php echo esc_html( $left_badge ); ?></span>
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
              <a href="<?php echo esc_url( $btn_url ); ?>" class="btn btn-primary" style="width: 100%; justify-content: center;"><?php echo esc_html( $btn_text ); ?></a>
            </div>
          </div>

          <!-- Right Card: Your MSP / Not Fit -->
          <div class="compare-card-msp">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
              <div>
                <span class="badge-chip" style="font-size: 0.6875rem; <?php echo $is_fit_card ? 'background: #F1F4F9; color: var(--color-slate);' : ''; ?>"><?php echo esc_html( $right_badge ); ?></span>
                <h3 style="font-size: 1.35rem; color: var(--color-navy); margin-top: 6px;"><?php echo esc_html( $right_title ); ?></h3>
              </div>
              <div class="card-icon-box" style="margin: 0; width: 36px; height: 36px; font-size: 1rem;"><?php echo $is_fit_card ? 'ℹ️' : '⚙️'; ?></div>
            </div>
            <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">
              <?php echo esc_html( $right_desc ); ?>
            </p>
            <ul class="compare-list">
              <?php foreach ( $msp_points as $pt ) : ?>
                <li>
                  <i class="check msp-check" style="<?php echo $is_fit_card ? 'background-color: #ECEEF2; color: #7A808A;' : ''; ?>"><?php echo $is_fit_card ? '✕' : '✓'; ?></i>
                  <span><?php echo esc_html( $pt ); ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
            <div style="margin-top: 28px;">
              <?php if ( $is_fit_card ) : ?>
                <div class="card-soft-blue" style="padding: 12px; font-size: 0.8125rem; text-align: center; color: var(--color-navy); font-weight: 600; background: #F8FAFC; border: 1px dashed var(--color-border);">
                  Have questions about your situation? We are happy to clarify.
                </div>
              <?php else : ?>
                <div class="card-soft-blue" style="padding: 12px; font-size: 0.8125rem; text-align: center; color: var(--color-navy); font-weight: 600;">
                  🤝 We collaborate directly with your MSP or internal IT
                </div>
              <?php endif; ?>
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
    $highlight = ! empty( $attributes['highlightBox'] ) ? $attributes['highlightBox'] : ( ! empty( $attributes['highlight'] ) ? $attributes['highlight'] : 'none' );
    // Auto-highlight Box 3 ONLY if title explicitly mentions "Three Ways" and highlight is not set to 'none'
    $is_box3_highlight = ( 'box3' === $highlight || ( 'none' !== $highlight && false !== stripos( $title, 'three ways' ) ) );
    $is_box1_highlight = ( 'box1' === $highlight );

    $opt1_badge      = isset( $attributes['opt1Badge'] ) ? $attributes['opt1Badge'] : 'Option 1';
    $opt1_title      = ! empty( $attributes['opt1Title'] ) ? $attributes['opt1Title'] : 'DIY / In-House IT';
    $opt1_desc       = ! empty( $attributes['opt1Desc'] ) ? $attributes['opt1Desc'] : '';
    $opt1_risk_title = isset( $attributes['opt1RiskTitle'] ) ? $attributes['opt1RiskTitle'] : '';
    $opt1_risk_desc  = isset( $attributes['opt1RiskDesc'] ) ? $attributes['opt1RiskDesc'] : '';

    $opt2_badge      = isset( $attributes['opt2Badge'] ) ? $attributes['opt2Badge'] : 'Option 2';
    $opt2_title      = ! empty( $attributes['opt2Title'] ) ? $attributes['opt2Title'] : 'Generic Managed MSP';
    $opt2_desc       = ! empty( $attributes['opt2Desc'] ) ? $attributes['opt2Desc'] : '';
    $opt2_risk_title = isset( $attributes['opt2RiskTitle'] ) ? $attributes['opt2RiskTitle'] : '';
    $opt2_risk_desc  = isset( $attributes['opt2RiskDesc'] ) ? $attributes['opt2RiskDesc'] : '';

    $opt3_badge      = isset( $attributes['opt3Badge'] ) ? $attributes['opt3Badge'] : 'Option 3: Secure-Centric';
    $opt3_title      = ! empty( $attributes['opt3Title'] ) ? $attributes['opt3Title'] : 'Independent RPO Advisory';
    $opt3_desc       = ! empty( $attributes['opt3Desc'] ) ? $attributes['opt3Desc'] : '';
    $opt3_risk_title = isset( $attributes['opt3RiskTitle'] ) ? $attributes['opt3RiskTitle'] : '';
    $opt3_risk_desc  = isset( $attributes['opt3RiskDesc'] ) ? $attributes['opt3RiskDesc'] : '';

    if ( function_exists( 'sc_clean_text' ) ) {
        $opt1_badge      = sc_clean_text( $opt1_badge );
        $opt1_title      = sc_clean_text( $opt1_title );
        $opt1_desc       = sc_clean_text( $opt1_desc );
        $opt1_risk_title = sc_clean_text( $opt1_risk_title );
        $opt1_risk_desc  = sc_clean_text( $opt1_risk_desc );
        $opt2_badge      = sc_clean_text( $opt2_badge );
        $opt2_title      = sc_clean_text( $opt2_title );
        $opt2_desc       = sc_clean_text( $opt2_desc );
        $opt2_risk_title = sc_clean_text( $opt2_risk_title );
        $opt2_risk_desc  = sc_clean_text( $opt2_risk_desc );
        $opt3_badge      = sc_clean_text( $opt3_badge );
        $opt3_title      = sc_clean_text( $opt3_title );
        $opt3_desc       = sc_clean_text( $opt3_desc );
        $opt3_risk_title = sc_clean_text( $opt3_risk_title );
        $opt3_risk_desc  = sc_clean_text( $opt3_risk_desc );
    }

    $anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
    $anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
    ?>
    <section class="section-ice py-section wp-block-inspect" data-wp-pattern="secure-centric/comparison-table"<?php echo $anchor_attr; ?>>
      <div class="site-container">
        <div class="section-heading-center" style="margin-bottom: 40px; text-align: center;">
          <?php if ( ! empty( $eyebrow ) ) : ?>
          <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
          <?php endif; ?>
          <h2><?php echo esc_html( $title ); ?></h2>
          <p style="color: var(--color-slate); max-width: 640px; margin: 8px auto 0;">
            <?php echo esc_html( $description ); ?>
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; align-items: stretch;">
          <!-- Option 1 -->
          <div class="card card-white" style="padding: 32px; display: flex; flex-direction: column; <?php echo $is_box1_highlight ? 'border: 2px solid var(--color-electric-blue); position: relative; box-shadow: var(--shadow-md);' : ''; ?>">
            <?php if ( ! empty( $opt1_badge ) ) : ?>
            <span class="badge-pill" style="<?php echo $is_box1_highlight ? 'background: var(--color-electric-blue); color: #fff;' : ''; ?> align-self: flex-start; margin-bottom: 16px;"><?php echo esc_html( $opt1_badge ); ?></span>
            <?php endif; ?>
            <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--color-navy);"><?php echo esc_html( $opt1_title ); ?></h3>
            <div style="font-size: 0.9375rem; color: var(--color-body-text); margin-bottom: 20px; line-height: 1.6; white-space: pre-line;">
              <?php echo nl2br( esc_html( $opt1_desc ) ); ?>
            </div>
            <?php if ( ! empty( $opt1_risk_title ) || ! empty( $opt1_risk_desc ) ) : ?>
            <div style="border-top: 1px solid var(--color-border); padding-top: 16px; margin-top: auto;">
              <?php if ( ! empty( $opt1_risk_title ) ) : ?>
              <div style="color: #F0445A; font-weight: 700; font-size: 0.875rem; margin-bottom: 6px;"><?php echo esc_html( $opt1_risk_title ); ?></div>
              <?php endif; ?>
              <?php if ( ! empty( $opt1_risk_desc ) ) : ?>
              <p style="font-size: 0.8125rem; color: var(--color-slate); line-height: 1.4; margin: 0;">
                <?php echo esc_html( $opt1_risk_desc ); ?>
              </p>
              <?php endif; ?>
            </div>
            <?php endif; ?>
          </div>

          <!-- Option 2 -->
          <div class="card card-white" style="padding: 32px; display: flex; flex-direction: column;">
            <?php if ( ! empty( $opt2_badge ) ) : ?>
            <span class="badge-pill" style="align-self: flex-start; margin-bottom: 16px;"><?php echo esc_html( $opt2_badge ); ?></span>
            <?php endif; ?>
            <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--color-navy);"><?php echo esc_html( $opt2_title ); ?></h3>
            <div style="font-size: 0.9375rem; color: var(--color-body-text); margin-bottom: 20px; line-height: 1.6; white-space: pre-line;">
              <?php echo nl2br( esc_html( $opt2_desc ) ); ?>
            </div>
            <?php if ( ! empty( $opt2_risk_title ) || ! empty( $opt2_risk_desc ) ) : ?>
            <div style="border-top: 1px solid var(--color-border); padding-top: 16px; margin-top: auto;">
              <?php if ( ! empty( $opt2_risk_title ) ) : ?>
              <div style="color: #FFB020; font-weight: 700; font-size: 0.875rem; margin-bottom: 6px;"><?php echo esc_html( $opt2_risk_title ); ?></div>
              <?php endif; ?>
              <?php if ( ! empty( $opt2_risk_desc ) ) : ?>
              <p style="font-size: 0.8125rem; color: var(--color-slate); line-height: 1.4; margin: 0;">
                <?php echo esc_html( $opt2_risk_desc ); ?>
              </p>
              <?php endif; ?>
            </div>
            <?php endif; ?>
          </div>

          <!-- Option 3 -->
          <div class="card card-white" style="padding: 32px; display: flex; flex-direction: column; <?php echo $is_box3_highlight ? 'border: 2px solid var(--color-electric-blue); position: relative; box-shadow: var(--shadow-md);' : ''; ?>">
            <?php if ( ! empty( $opt3_badge ) ) : ?>
            <span class="badge-pill" style="<?php echo $is_box3_highlight ? 'background: var(--color-electric-blue); color: #fff;' : ''; ?> align-self: flex-start; margin-bottom: 16px;"><?php echo esc_html( $opt3_badge ); ?></span>
            <?php endif; ?>
            <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--color-navy);"><?php echo esc_html( $opt3_title ); ?></h3>
            <div style="font-size: 0.9375rem; color: var(--color-body-text); margin-bottom: 20px; line-height: 1.6; white-space: pre-line;">
              <?php echo nl2br( esc_html( $opt3_desc ) ); ?>
            </div>
            <?php if ( ! empty( $opt3_risk_title ) || ! empty( $opt3_risk_desc ) ) : ?>
            <div style="border-top: 1px solid var(--color-border); padding-top: 16px; margin-top: auto;">
              <?php if ( ! empty( $opt3_risk_title ) ) : ?>
              <div style="color: #00875A; font-weight: 700; font-size: 0.875rem; margin-bottom: 6px;"><?php echo esc_html( $opt3_risk_title ); ?></div>
              <?php endif; ?>
              <?php if ( ! empty( $opt3_risk_desc ) ) : ?>
              <p style="font-size: 0.8125rem; color: var(--color-slate); line-height: 1.4; margin: 0;">
                <?php echo esc_html( $opt3_risk_desc ); ?>
              </p>
              <?php endif; ?>
            </div>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </section>
<?php endif; ?>
