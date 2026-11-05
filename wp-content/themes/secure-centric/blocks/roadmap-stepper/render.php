<?php
/**
 * Render Template for Interactive Roadmap Stepper Block
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow     = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// THE CMMC PROCESS';
$title       = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Your CMMC journey, step by step';
$link_text   = ! empty( $attributes['detailedProcessLinkText'] ) ? $attributes['detailedProcessLinkText'] : 'View Detailed 8-Step Process →';
$link_url    = ! empty( $attributes['detailedProcessLinkUrl'] ) ? $attributes['detailedProcessLinkUrl'] : '#page-19';
$flag_text   = ! empty( $attributes['flagText'] ) ? $attributes['flagText'] : 'Target C3PAO Certification Milestone';

$default_steps = array(
    1 => array(
        'no'     => '01',
        'name'   => 'Site visit',
        'phase'  => 'Phase 1: Facility Walkthrough & Scope Discovery',
        'help'   => 'In-person physical & technical walkthrough of facilities, server rooms, and shop-floor enclaves.',
        'who'    => 'You + Secure-Centric',
        'output' => 'Asset discovery baseline & boundary notes',
        'link'   => '#page-2',
    ),
    2 => array(
        'no'     => '02',
        'name'   => 'Scoping',
        'phase'  => 'Phase 2: CUI Boundary & Enclave Architecture',
        'help'   => 'Map CUI/FCI flows, identify people, systems, and network storage touching DoD contracts.',
        'who'    => 'Secure-Centric + IT Leads',
        'output' => 'Formal Scope Document & Data-Flow Architecture',
        'link'   => '#page-16',
    ),
    3 => array(
        'no'     => '03',
        'name'   => 'Gap assessment',
        'phase'  => 'Phase 3: 110-Control Baseline Scoring',
        'help'   => 'Audit all 110 NIST SP 800-171 controls against actual day-to-day operations.',
        'who'    => 'Secure-Centric',
        'output' => 'Defensible SPRS Score estimate & findings register',
        'link'   => '#page-5',
    ),
    4 => array(
        'no'     => '04',
        'name'   => 'Remediation',
        'phase'  => 'Phase 4: Engineering & Policy Remediation',
        'help'   => 'Prioritize fixes by risk weight; guide MFA, encryption, logging, and enclave deployments.',
        'who'    => 'Your IT/MSP (guided by us)',
        'output' => 'Remediation Roadmap with owners and completion targets',
        'link'   => '#page-7',
    ),
    5 => array(
        'no'     => '05',
        'name'   => 'Documentation',
        'phase'  => 'Phase 5: System Security Plan (SSP) & POA&M',
        'help'   => 'Co-write your System Security Plan (SSP), POA&M, and all required operational policies.',
        'who'    => 'Secure-Centric + You',
        'output' => 'Assessor-ready SSP and comprehensive policy suite',
        'link'   => '#page-8',
    ),
    6 => array(
        'no'     => '06',
        'name'   => 'Readiness review',
        'phase'  => 'Phase 6: C3PAO Mock Audit & Interview Prep',
        'help'   => 'Full rehearsal mock audit simulating C3PAO interview techniques and evidence requests.',
        'who'    => 'Secure-Centric RPs',
        'output' => 'Readiness sign-off report & Evidence Binder index',
        'link'   => '#page-4',
    ),
    7 => array(
        'no'     => '07',
        'name'   => 'Assessment',
        'phase'  => 'Phase 7: Official C3PAO Level 2 Assessment',
        'help'   => 'We stand alongside your team during official DIBCAC or Authorized C3PAO evaluation.',
        'who'    => 'Independent C3PAO',
        'output' => 'Level 2 CMMC Certification recommendation',
        'link'   => '#page-19',
    ),
    8 => array(
        'no'     => '08',
        'name'   => 'Maintain',
        'phase'  => 'Phase 8: Continuous Monitoring & Affirmation',
        'help'   => 'Continuous compliance, annual SPRS reaffirmation, change management, and evidence refreshes.',
        'who'    => 'Virtual CISO / You',
        'output' => 'Annual Affirmation pack & ongoing compliance posture',
        'link'   => '#page-11',
    ),
);

$steps = array();
for ( $i = 1; $i <= 8; $i++ ) {
    $def = $default_steps[ $i ];
    $steps[ $i ] = array(
        'no'     => $def['no'],
        'name'   => ! empty( $attributes[ 'step' . $i . 'Name' ] ) ? $attributes[ 'step' . $i . 'Name' ] : $def['name'],
        'phase'  => ! empty( $attributes[ 'step' . $i . 'Phase' ] ) ? $attributes[ 'step' . $i . 'Phase' ] : $def['phase'],
        'help'   => ! empty( $attributes[ 'step' . $i . 'Help' ] ) ? $attributes[ 'step' . $i . 'Help' ] : $def['help'],
        'who'    => ! empty( $attributes[ 'step' . $i . 'Who' ] ) ? $attributes[ 'step' . $i . 'Who' ] : $def['who'],
        'output' => ! empty( $attributes[ 'step' . $i . 'Output' ] ) ? $attributes[ 'step' . $i . 'Output' ] : $def['output'],
        'link'   => ! empty( $attributes[ 'step' . $i . 'Link' ] ) ? $attributes[ 'step' . $i . 'Link' ] : $def['link'],
    );
}

$active_step = $steps[1];
?>

<section class="py-section roadmap-wrap wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {backgroundColor:'ice'}" data-wp-pattern="secure-centric/cmmc-8-step-journey" id="roadmap-section">
  <div class="site-container">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
        <h2><?php echo esc_html( $title ); ?></h2>
      </div>
      <a href="<?php echo esc_url( $link_url ); ?>" class="text-link"><?php echo esc_html( $link_text ); ?></a>
    </div>

    <!-- Interactive Milestone Flow Stepper -->
    <div class="roadmap-timeline-nav" role="tablist" aria-label="CMMC Milestone Process" id="roadmap-timeline-nav">
      <div class="roadmap-timeline-rail">
        <div class="roadmap-timeline-fill" id="roadmap-timeline-fill" style="width: 0%;"></div>
      </div>

      <!-- Standalone Walking Character -->
      <div class="roadmap-walker is-idle" id="roadmap-walker" aria-hidden="true" style="transition: none; left: 57px;">
        <svg class="walker-figure-svg" viewBox="0 0 140 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g class="sc-walker-root">
            <ellipse cx="72" cy="206" rx="36" ry="4.5" fill="#14204B" opacity=".12"></ellipse>
            <g class="sc-ref-arm-left">
              <path d="M65 58 L57 85 L52 104" fill="none" stroke="#0F1A3E" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"></path>
              <circle cx="51.5" cy="107" r="5" fill="#C98B63"></circle>
            </g>
            <g class="sc-ref-leg-left">
              <path d="M69 111 L59 151 L48 186" fill="none" stroke="#111A40" stroke-width="14" stroke-linejoin="round"></path>
              <path d="M41 184 h13 q8 0 9 6.5 v2.5 h-22 z" fill="#0A0F24" transform="rotate(22 52 189)"></path>
            </g>
            <g class="sc-ref-leg-right">
              <path d="M78 110 L90 152 L97 192" fill="none" stroke="#1A2552" stroke-width="15" stroke-linejoin="round"></path>
              <path d="M89 191 h15 q8 0 8 6 v2.5 h-23 z" fill="#0A0F24"></path>
            </g>
            <g class="sc-ref-torso-group">
              <path d="M58 58 Q60 47 72 47 Q85 47 87 55 L91 112 Q74 119 57 113 Z" fill="#14204B" class="sc-suit-jacket"></path>
              <path d="M78 47 L86 52 L84 70 Z" fill="#FFFFFF"></path>
              <path d="M78 50 L85 60 L80 84 L76 62 Z" fill="#0C1533"></path>
              <rect x="69" y="40" width="9" height="10" rx="2" fill="#C98B63"></rect>
              <path d="M76.5 47.5 L83 66.5" stroke="#19C3F0" stroke-width="1.8" stroke-linecap="round" class="sc-lanyard"></path>
              <rect x="79.5" y="66" width="8" height="11" rx="1.4" fill="#FFFFFF"></rect>
              <rect x="79.5" y="66" width="8" height="3.4" rx="1.4" fill="#2F5BFF" class="sc-badge-header"></rect>
              <rect x="81.3" y="71.6" width="4.4" height="1.4" rx=".7" fill="#14204B" opacity=".5"></rect>
              <rect x="81.3" y="74" width="3" height="1.4" rx=".7" fill="#14204B" opacity=".35"></rect>
              <circle cx="75" cy="29" r="14" fill="#E3A880"></circle>
              <path d="M88.5 27 q3.5 2.5 0.5 6" fill="#E3A880"></path>
              <path d="M61 30 Q60 13 76 13 Q90 14 89 25 Q82 20 76 23 Q70 25 70 33 Q66 37 62 36 Q61 33 61 30 Z" fill="#1D1A2B"></path>
              <ellipse cx="70.5" cy="31" rx="2.4" ry="3.4" fill="#C98B63"></ellipse>
            </g>
            <g class="sc-ref-arm-right">
              <path d="M75 58 L73 89 L89 95" fill="none" stroke="#1E2C63" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" class="sc-suit-arm"></path>
              <g class="sc-ref-tablet" transform="rotate(8 99 79)">
                <rect x="85.5" y="61.5" width="27" height="35" rx="4" fill="#2F5BFF" class="sc-tablet-border"></rect>
                <rect x="88.5" y="65" width="21" height="28" rx="2" fill="#FFFFFF"></rect>
                <path d="M99 89 q-7.5 -8 -7.5 -12.5 a7.5 7.5 0 0 1 15 0 q0 4.5 -7.5 12.5 z" fill="#2F5BFF" class="sc-tablet-icon"></path><circle cx="99" cy="76.5" r="2.8" fill="#FFFFFF"></circle>
              </g>
              <circle cx="91" cy="95.5" r="5" fill="#E3A880"></circle>
            </g>
          </g>
        </svg>
      </div>

      <?php foreach ( $steps as $idx => $st ) : ?>
        <button type="button" class="step-node <?php echo ( 7 === $idx ) ? 'step-7' : ''; ?> <?php echo ( 1 === $idx ) ? 'active' : ''; ?>" onclick="window.selectRoadmapStep(<?php echo ( $idx - 1 ); ?>, event)" role="tab" aria-selected="<?php echo ( 1 === $idx ) ? 'true' : 'false'; ?>" title="Milestone <?php echo esc_attr( $st['no'] . ': ' . $st['name'] ); ?>">
          <?php if ( 7 === $idx ) : ?>
            <div class="milestone-flag-wrap" id="step-7-flag" aria-label="<?php echo esc_attr( $flag_text ); ?>">
              <svg class="milestone-flag-svg" viewBox="0 0 28 36" fill="none">
                <line x1="5" y1="2" x2="5" y2="34" stroke="#0B1437" stroke-width="2" stroke-linecap="round"></line>
                <circle cx="5" cy="2.5" r="2" fill="#7B5CFF"></circle>
                <path d="M5 4 C 12 1.5, 17 7.5, 26 5 C 23.5 11, 26 16, 26 16 C 17 18.5, 12 12.5, 5 15 Z" fill="#7B5CFF"></path>
                <path d="M8 8 L13 8 M8 11.5 L16 11.5" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round"></path>
              </svg>
            </div>
          <?php endif; ?>
          <span class="node-circle"><?php echo esc_html( $st['no'] ); ?></span>
          <span class="node-label"><?php echo esc_html( $st['name'] ); ?></span>
        </button>
      <?php endforeach; ?>
    </div>

    <!-- Active Milestone Flow Detail Card -->
    <div class="step-detail-card" id="roadmap-detail-card" style="margin-top: 32px;">
      <div class="milestone-flow-header">
        <div class="milestone-stepper-pills">
          <span class="milestone-flow-badge">
            <span class="pulse-dot" style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: currentColor; margin-right: 5px;"></span>
            MILESTONE <?php echo esc_html( $active_step['no'] ); ?> OF 08 • <?php echo esc_html( $active_step['phase'] ); ?>
          </span>
        </div>

        <div class="milestone-stepper-nav">
          <button type="button" class="milestone-nav-btn" disabled="" onclick="window.selectRoadmapStep(-1, event)">
            ← Prev Milestone
          </button>
          <button type="button" class="milestone-nav-btn" onclick="window.selectRoadmapStep(1, event)">
            Next Milestone →
          </button>
        </div>
      </div>

      <div class="step-detail-left">
        <span class="section-eyebrow">MILESTONE <?php echo esc_html( $active_step['no'] . ' • ' . strtoupper( $active_step['name'] ) ); ?></span>
        <h3><?php echo esc_html( $active_step['name'] ); ?></h3>
        <p style="font-size: 1.0625rem; color: var(--color-body-text); line-height: 1.6; margin-bottom: 24px;">
          <?php echo esc_html( $active_step['help'] ); ?>
        </p>
        <div class="step-cta-group" style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" onclick="window.selectRoadmapStep(1, event)">
            Advance to Milestone 02: <?php echo esc_html( $steps[2]['name'] ); ?> →
          </button>
          <a href="<?php echo esc_url( $active_step['link'] ); ?>" class="btn btn-secondary-outline">Explore Milestone Scope</a>
        </div>
      </div>

      <div class="step-detail-right">
        <div class="step-subcard">
          <h5>WHO DOES THIS WORK</h5>
          <b style="color: var(--color-navy); font-size: 0.9375rem;"><?php echo esc_html( $active_step['who'] ); ?></b>
        </div>
        <div class="step-subcard" style="border-left: 3px solid var(--color-electric-blue);">
          <h5>PRIMARY DELIVERABLE YOU KEEP</h5>
          <b style="color: var(--color-electric-blue); font-size: 0.9375rem;"><?php echo esc_html( $active_step['output'] ); ?></b>
        </div>
      </div>
    </div>
  </div>
  <script>
    window.scRoadmapData = <?php echo wp_json_encode( array_values( $steps ) ); ?>;
  </script>
</section>
