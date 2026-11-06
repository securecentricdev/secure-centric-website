<?php
/**
 * Render Template for Bullets Grid Block
 * Strictly matches demo/assets/js/app.js renderBullets
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// CORE PRINCIPLES & INDICATORS';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Key Indicators & Symptoms';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Observable symptoms and indicators that require immediate remediation.';

$bullets = array();
if ( ! empty( $attributes['bulletsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['bulletsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['bulletsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $bullets = $decoded;
    }
}

if ( empty( $bullets ) ) {
    $t_lower = strtolower( $title );
    if ( false !== strpos( $t_lower, 'signs' ) || false !== strpos( $t_lower, 'need a cmmc consultant' ) ) {
        $bullets = array(
            array( 'title' => 'Unknown or Negative SPRS Score', 'desc' => 'Your DoD score is blank, stale, or below 0 in the Supplier Performance Risk System, disqualifying your company from upcoming awards.' ),
            array( 'title' => 'Generic Template SSP in Place', 'desc' => 'System Security Plan was downloaded from the internet without site-specific scoping, network topology maps, or evidence links.' ),
            array( 'title' => 'Unassigned POA&M Open Items', 'desc' => 'Corrective actions lack dedicated internal owners, realistic resource budgets, or committed 180-day milestone close dates.' ),
            array( 'title' => 'Urgent Prime Contractor Inquiries', 'desc' => 'Defense prime contractors (Lockheed, Boeing, Northrop, etc.) are issuing 30-day compliance verification questionnaires.' ),
            array( 'title' => 'DFARS 7021 Solicitation Clauses', 'desc' => 'Department of War bids explicitly mandate CMMC Level 2 certification prior to contract award, and no roadmap exists.' ),
            array( 'title' => 'No Internal Full-Time Security Lead', 'desc' => 'IT staff is overwhelmed managing day-to-day operations and needs expert external RPs to handle DoD documentation.' )
        );
    } elseif ( false !== strpos( $t_lower, 'level 2 requires' ) || false !== strpos( $t_lower, 'requires' ) ) {
        $bullets = array(
            array( 'title' => '110 NIST SP 800-171 Requirements', 'desc' => 'Rigorous operational implementation across all 14 security families, fulfilling all 320 assessment objectives in NIST SP 800-171A.' ),
            array( 'title' => 'Triennial Independent C3PAO Audit', 'desc' => 'Formal on-site and remote evaluation conducted by an Authorized Third-Party Assessment Organization accredited by the Cyber AB.' ),
            array( 'title' => 'Assessor-Ready System Security Plan', 'desc' => 'Detailed, defensible documentation detailing how every technical and physical safeguard operates inside your CUI boundary.' ),
            array( 'title' => 'Strict Time-Bound POA&M Rules', 'desc' => 'Plan of Action allowed only for eligible 1-point controls; high-weight (-5 and -3) controls must be 100% remediated prior to audit.' ),
            array( 'title' => 'Annual Executive SPRS Affirmation', 'desc' => 'Corporate executive must formally sign and submit an annual affirmation of continuing cybersecurity compliance.' )
        );
    } elseif ( false !== strpos( $t_lower, 'what we do for nist' ) || false !== strpos( $t_lower, 'nist sp 800-171' ) ) {
        $bullets = array(
            array( 'title' => 'Defensible SPRS Score Calculation', 'desc' => 'Accurate point calculations adhering strictly to DoD Assessment Methodology, eliminating False Claims Act liability.' ),
            array( 'title' => 'On-Site Facility & Network Scoping', 'desc' => 'Physical walkthroughs of server closets, manufacturing floors, and endpoints to draw enforceable CUI boundaries.' ),
            array( 'title' => 'Complete SSP & Policy Generation', 'desc' => 'Custom, assessor-grade System Security Plan and 14 operational security policies tailored directly to your team.' ),
            array( 'title' => 'Annual SPRS Maintenance & Reaffirmation', 'desc' => 'Ongoing compliance tracking to ensure annual corporate affirmations remain accurate as systems evolve.' )
        );
    } elseif ( false !== strpos( $t_lower, 'receive from' ) || false !== strpos( $t_lower, 'receive during' ) || false !== strpos( $t_lower, 'receive' ) ) {
        $bullets = array(
            array( 'title' => 'Defensible SPRS Scorecard & Findings Matrix', 'desc' => 'Line-by-line evaluation of all 110 requirements with weighted point deductions and risk priorities.' ),
            array( 'title' => 'CUI Flow Diagrams & Scoping Boundary Maps', 'desc' => 'Architectural schematics defining where CUI is received, stored, processed, and transmitted.' ),
            array( 'title' => 'Prioritized Remediation Roadmap & Budget', 'desc' => 'Sequenced action plan highlighting fast-turn fixes, required hardware/software tokens, and budget estimates.' ),
            array( 'title' => 'Assessor Evidence Collection Binder Index', 'desc' => 'Structured repository templates organizing screenshots, log exports, and policies for C3PAO evaluation.' )
        );
    } elseif ( false !== strpos( $t_lower, 'how we work' ) ) {
        $bullets = array(
            array( 'title' => 'Independent Advisory Only', 'desc' => 'We are Registered Provider Organizations (RPOs), not C3PAO assessors. We never audit the defense clients we advise.' ),
            array( 'title' => 'On Site by Default', 'desc' => 'Real cybersecurity scoping requires physical inspection of buildings, employee workstations, and air-gapped enclaves.' ),
            array( 'title' => 'Plain English, Zero FUD', 'desc' => 'We explain DoD requirements without cybersecurity jargon, fearmongering, or aggressive sales tactics.' ),
            array( 'title' => 'Practical Scope Minimization', 'desc' => 'Our primary objective is isolating your CUI so you only need to audit a fraction of your corporate network.' )
        );
    } else {
        $bullets = array(
            array( 'title' => 'Targeted Gap Identification', 'desc' => 'Audit Day verification ensuring every safeguard is operational and backed by dual evidence artifacts.' ),
            array( 'title' => 'Scope Isolation & Segmentation', 'desc' => 'Segregating CUI networks and servers to drastically minimize assessment boundary costs.' ),
            array( 'title' => 'Full Regulatory Defensibility', 'desc' => 'Policies, procedures, and implementation notes mapped directly to NIST SP 800-171A objectives.' ),
            array( 'title' => 'Continuous Compliance Management', 'desc' => 'Ongoing support to maintain audit readiness between triennial C3PAO evaluation cycles.' )
        );
    }
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow  = sc_clean_text( $eyebrow );
    $title    = sc_clean_text( $title );
    $subtitle = sc_clean_text( $subtitle );
    $bullets  = sc_clean_text( $bullets );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/bullets-grid"<?php echo $anchor_attr; ?>>
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 36px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="bullets-grid">
      <?php foreach ( $bullets as $b ) : ?>
        <?php
        $b_title = '';
        $b_desc  = '';
        if ( is_array( $b ) ) {
            $b_title = ! empty( $b['title'] ) ? $b['title'] : ( ! empty( $b['name'] ) ? $b['name'] : '' );
            $b_desc  = ! empty( $b['desc'] ) ? $b['desc'] : '';
        } elseif ( is_string( $b ) ) {
            $b_title = $b;
        }
        ?>
        <div class="bullet-card">
          <div class="bullet-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <h4 style="margin-bottom: 8px; color: var(--color-navy); font-size: 1.1rem;"><?php echo esc_html( $b_title ); ?></h4>
            <?php if ( ! empty( $b_desc ) ) : ?>
              <p style="color: var(--color-body-text); font-size: 0.9375rem; line-height: 1.6; margin: 0;"><?php echo esc_html( $b_desc ); ?></p>
            <?php endif; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
