<?php
/**
 * Render Template for Hero Block (Multi-Layout)
 * Strictly matches demo/assets/js/app.js renderHeroHome, renderHeroService, renderHeroICP, renderHeroSplit, renderHeroCenter, renderContactHero, renderHeroGuide
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$layout             = ! empty( $attributes['layout'] ) ? $attributes['layout'] : 'home';
$eyebrow            = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// NIST SP 800-171 / CMMC Compliance Consultants';
$title              = ! empty( $attributes['title'] ) ? $attributes['title'] : 'CMMC compliance for defense subcontractors, guided by a Cyber AB RPO';
$highlight_text     = ! empty( $attributes['highlightText'] ) ? $attributes['highlightText'] : 'Cyber AB RPO';
$description        = ! empty( $attributes['description'] ) ? $attributes['description'] : 'We help defense contractors and suppliers get ready for CMMC and NIST SP 800-171, from the first site visit to the annual affirmation.';
$primary_btn_text   = ! empty( $attributes['primaryBtnText'] ) ? $attributes['primaryBtnText'] : 'Book a Discovery Call →';
$primary_btn_url    = ! empty( $attributes['primaryBtnUrl'] ) ? $attributes['primaryBtnUrl'] : home_url( '/contact/' );
$secondary_btn_text = ! empty( $attributes['secondaryBtnText'] ) ? $attributes['secondaryBtnText'] : 'Explore Every Phase ↓';
$secondary_btn_url  = ! empty( $attributes['secondaryBtnUrl'] ) ? $attributes['secondaryBtnUrl'] : '#phases-detail';
$sub_text           = ! empty( $attributes['subText'] ) ? $attributes['subText'] : '30 min · No sales pitch · Signed NDA';
$breadcrumb_current = ! empty( $attributes['breadcrumbCurrent'] ) ? $attributes['breadcrumbCurrent'] : 'CMMC COMPLIANCE SERVICES';

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow            = sc_clean_text( $eyebrow );
    $title              = sc_clean_text( $title );
    $highlight_text     = sc_clean_text( $highlight_text );
    $description        = sc_clean_text( $description );
    $breadcrumb_current = sc_clean_text( $breadcrumb_current );
    $primary_btn_text   = sc_clean_text( $primary_btn_text );
    $secondary_btn_text = sc_clean_text( $secondary_btn_text );
    $sub_text           = sc_clean_text( $sub_text );
}

// Topic Pills
$topic1_title = ! empty( $attributes['topic1Title'] ) ? $attributes['topic1Title'] : 'CMMC';
$topic1_desc  = ! empty( $attributes['topic1Desc'] ) ? $attributes['topic1Desc'] : 'Maturity levels & framework';
$topic1_url   = ! empty( $attributes['topic1Url'] ) ? $attributes['topic1Url'] : home_url( '/cmmc/' );

$topic2_title = ! empty( $attributes['topic2Title'] ) ? $attributes['topic2Title'] : 'NIST SP 800-171';
$topic2_desc  = ! empty( $attributes['topic2Desc'] ) ? $attributes['topic2Desc'] : '110 controls & DFARS 7012';
$topic2_url   = ! empty( $attributes['topic2Url'] ) ? $attributes['topic2Url'] : home_url( '/services/nist-800-171-compliance/' );

$topic3_title = ! empty( $attributes['topic3Title'] ) ? $attributes['topic3Title'] : 'CUI';
$topic3_desc  = ! empty( $attributes['topic3Desc'] ) ? $attributes['topic3Desc'] : 'Controlled Unclassified Info';
$topic3_url   = ! empty( $attributes['topic3Url'] ) ? $attributes['topic3Url'] : home_url( '/cui/' );

// Quiz Card
$quiz_badge       = ! empty( $attributes['quizBadge'] ) ? $attributes['quizBadge'] : 'CMMC READINESS CHECK · 3 MINUTES';
$quiz_chip        = ! empty( $attributes['quizChip'] ) ? $attributes['quizChip'] : 'Free Tool';
$quiz_title       = ! empty( $attributes['quizTitle'] ) ? $attributes['quizTitle'] : 'Find out where you stand';
$quiz_desc        = ! empty( $attributes['quizDesc'] ) ? $attributes['quizDesc'] : 'Assess your FCI/CUI boundaries and readiness score before a C3PAO audit.';
$quiz_placeholder = ! empty( $attributes['quizPlaceholder'] ) ? $attributes['quizPlaceholder'] : 'Enter corporate work email';
$quiz_btn_text    = ! empty( $attributes['quizBtnText'] ) ? $attributes['quizBtnText'] : 'Start 3-Minute Readiness Check →';
$quiz_note        = ! empty( $attributes['quizNote'] ) ? $attributes['quizNote'] : '🔒 Work email required. Never submit classified or CUI information.';

// Multi-entry arrays for specialized layouts
$phases_list = array(
    'Scope and site visit',
    'Assess',
    'Guide the fixes',
    'Document',
    'Prepare for assessment',
    'Maintain and affirm',
);
if ( ! empty( $attributes['phasesData'] ) ) {
    $dec_p = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['phasesData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['phasesData'] ), true );
    if ( is_array( $dec_p ) && ! empty( $dec_p ) ) {
        $phases_list = $dec_p;
    }
}

$deliverables_list = array(
    'Scope + data-flow diagram',
    'Ranked findings + SPRS estimate',
    'Remediation plan',
    'SSP, policies, POA&M',
    'Evidence index',
    'Annual affirmation pack',
);
if ( ! empty( $attributes['deliverablesData'] ) ) {
    $dec_d = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['deliverablesData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['deliverablesData'] ), true );
    if ( is_array( $dec_d ) && ! empty( $dec_d ) ) {
        $deliverables_list = $dec_d;
    }
}

$audiences_list = array(
    'Machine Shops & Precision CNC',
    'Defense Aerospace & Avionics',
    'Defense Software & IT Contractors',
    'Electronics & Specialized Hardware',
);
if ( ! empty( $attributes['audiencesData'] ) ) {
    $dec_a = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['audiencesData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['audiencesData'] ), true );
    if ( is_array( $dec_a ) && ! empty( $dec_a ) ) {
        $audiences_list = $dec_a;
    }
}

// Guide Attributes (Pillar Pages)
$side_type  = ! empty( $attributes['sideType'] ) ? $attributes['sideType'] : '';
$side_title = ! empty( $attributes['sideTitle'] ) ? $attributes['sideTitle'] : 'Which Level Do You Need?';
if ( function_exists( 'sc_clean_text' ) ) {
    $side_title = sc_clean_text( $side_title );
}
$is_tool    = ! empty( $attributes['isTool'] ) || ( false !== strpos( $side_type, 'tool' ) );
$side_facts = array();
if ( ! empty( $attributes['sideFactsData'] ) ) {
    $decoded_facts = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['sideFactsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['sideFactsData'] ), true );
    if ( is_array( $decoded_facts ) && ! empty( $decoded_facts ) ) {
        $side_facts = $decoded_facts;
    }
}
if ( empty( $side_facts ) && ! empty( $attributes['sideContent'] ) ) {
    $side_facts = array_map( 'trim', explode( '·', $attributes['sideContent'] ) );
}
if ( empty( $side_facts ) ) {
    $side_facts = array( '110 Requirements', '14 Control Families', 'Rev 2 Baseline' );
}

// Resource Bullets (Downloadable Checklists)
$resource_bullets = array(
    array( 'title' => 'Assessor-Defensible Format:', 'desc' => 'Fully aligned with NIST SP 800-171 Rev 2 & 32 CFR Part 170 CMMC Level 2 objectives.' ),
    array( 'title' => 'Pre-Built Evidence Mapping:', 'desc' => 'Detailed assessment methods, evidence artifact references, and responsible owner assignments.' ),
    array( 'title' => 'Cyber AB RPO Reviewed:', 'desc' => 'Maintained by certified Registered Practitioners who guide defense subcontractors through live C3PAO audits.' ),
);
if ( ! empty( $attributes['bulletsData'] ) ) {
    $dec_b = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['bulletsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['bulletsData'] ), true );
    if ( is_array( $dec_b ) && ! empty( $dec_b ) ) {
        $resource_bullets = $dec_b;
    }
}

// Background Media Paths & Overrides
$bg_media_type   = ! empty( $attributes['bgMediaType'] ) ? $attributes['bgMediaType'] : 'video';
$theme_uri       = get_template_directory_uri();
$default_video   = $theme_uri . '/assets/video/cmmc-concept.mp4';
$default_poster  = $theme_uri . '/assets/video/cmmc-concept-poster.jpg';

$video_url       = ! empty( $attributes['bgVideoUrl'] ) ? $attributes['bgVideoUrl'] : $default_video;
$poster_url      = ! empty( $attributes['bgPosterUrl'] ) ? $attributes['bgPosterUrl'] : $default_poster;
$image_url       = ! empty( $attributes['bgImageUrl'] ) ? $attributes['bgImageUrl'] : '';
$overlay_opacity = isset( $attributes['bgOverlayOpacity'] ) ? ( (float) $attributes['bgOverlayOpacity'] / 100 ) : 0.70;
?>

<?php if ( 'guide' === $layout ) : ?>
  <!-- Guide Layout (Knowledge Pillars: Pages 12, 13, 14, 15, 19, 20) -->
  <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
           data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
           data-wp-pattern="secure-centric/hero-pillar-guide"
           style="border-bottom: 1px solid var(--color-dark-line);">
    <div class="site-container">
      <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); margin-bottom: 16px;">
        HOME / LEARN / <span style="color: var(--color-cyber-cyan);"><?php echo esc_html( strtoupper( $breadcrumb_current ) ); ?></span>
      </div>
      <div class="hero-home-grid">
        <div>
          <span class="section-eyebrow dark">// <?php echo esc_html( $eyebrow ); ?></span>
          <h1 style="color: var(--color-white); margin-bottom: 16px;"><?php echo esc_html( $title ); ?></h1>
          
          <div class="card-dark" style="background-color: rgba(11, 20, 55, 0.85); border-left: 3px solid var(--color-cyber-cyan); margin-bottom: 20px; padding: 18px 22px;">
            <span style="font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-cyber-cyan); display: block; margin-bottom: 6px;">DIRECT ANSWER (EXECUTIVE SUMMARY)</span>
            <p style="color: var(--color-white); font-size: 1rem; margin: 0; line-height: 1.5;"><?php echo esc_html( $description ); ?></p>
          </div>

          <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <span>Reviewed by: <b>Son Phan, Principal Architect</b></span>
            <span>•</span>
            <span>Last Updated: <b>Q4 2026</b></span>
            <span>•</span>
            <span class="badge-chip dark" style="font-size: 0.65rem;">Cyber AB RPO Verified</span>
          </div>
        </div>

        <div>
          <?php if ( $is_tool ) : ?>
            <div class="card-white" style="padding: 28px;">
              <span class="section-eyebrow">// INTERACTIVE TOOL</span>
              <h3 style="color: var(--color-navy); margin-bottom: 12px;"><?php echo esc_html( $side_title ); ?></h3>
              <div style="display: flex; flex-direction: column; gap: 12px; margin: 16px 0;">
                <label style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem;">
                  <span>Does your contract contain DFARS 7012?</span>
                  <input type="checkbox" checked style="accent-color: var(--color-electric-blue); width: 18px; height: 18px;" />
                </label>
                <label style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem;">
                  <span>Do you store or process technical drawings / CAD?</span>
                  <input type="checkbox" checked style="accent-color: var(--color-electric-blue); width: 18px; height: 18px;" />
                </label>
                <label style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem;">
                  <span>Are you a designated critical weapon system supplier?</span>
                  <input type="checkbox" style="accent-color: var(--color-electric-blue); width: 18px; height: 18px;" />
                </label>
              </div>
              <div class="card-soft-blue" style="padding: 14px; margin-bottom: 16px;">
                <b style="color: var(--color-navy); font-size: 0.875rem; display: block;">Calculated Level Requirement:</b>
                <span style="color: var(--color-electric-blue); font-weight: 800; font-size: 1.15rem;">CMMC Level 2 (110 Controls)</span>
              </div>
              <a href="<?php echo esc_url( home_url( '/cmmc/level-2/' ) ); ?>" class="btn btn-primary" style="width: 100%;">View Level 2 Action Plan &rarr;</a>
            </div>
          <?php else : ?>
            <div class="card-dark" style="padding: 28px;">
              <span class="section-eyebrow dark">// KEY SPECIFICATIONS</span>
              <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 14px;">
                <?php foreach ( $side_facts as $fact ) : ?>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="width: 28px; height: 28px; border-radius: 6px; background: rgba(0, 212, 255, 0.15); color: var(--color-cyber-cyan); display: flex; align-items: center; justify-content: center; font-size: 0.875rem;">✓</span>
                    <b style="color: var(--color-white); font-size: 0.9375rem;"><?php echo esc_html( trim( $fact ) ); ?></b>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>

<?php elseif ( 'resource' === $layout ) : ?>
  <!-- Resource Split Hero Layout (Pages 21, 22, 23 Checklists) -->
  <section class="resource-hero-wrap wp-block-inspect wp-pattern-inspect" 
           data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
           data-wp-pattern="secure-centric/resource-split-hero">
    <div class="site-container">
      <div class="resource-hero-grid">
        <div class="resource-hero-left">
          <span class="section-eyebrow dark" style="margin-bottom: 14px;">// COMPLIANCE RESOURCE &bull; INSTANT ACCESS</span>
          <h1><?php echo esc_html( $title ); ?></h1>
          <p class="hero-lead"><?php echo esc_html( $description ); ?></p>

          <div class="resource-hero-bullets">
            <?php foreach ( $resource_bullets as $rb ) : ?>
              <?php
              $rb_title = is_array( $rb ) && ! empty( $rb['title'] ) ? $rb['title'] : '';
              $rb_desc  = is_array( $rb ) && ! empty( $rb['desc'] ) ? $rb['desc'] : ( is_string( $rb ) ? $rb : '' );
              ?>
              <div class="resource-bullet-item">
                <span class="bullet-check">✓</span>
                <div><?php if ( $rb_title ) : ?><b><?php echo esc_html( $rb_title ); ?></b> <?php endif; ?><?php echo esc_html( $rb_desc ); ?></div>
              </div>
            <?php endforeach; ?>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.12); font-size: 0.8125rem; color: var(--color-cyber-cyan); font-family: var(--font-mono);">
            <span>🔒 100% Confidential</span>
            <span>&bull;</span>
            <span>Never Shared</span>
            <span>&bull;</span>
            <span>Direct Download</span>
          </div>
        </div>

        <div class="resource-hero-right">
          <div class="resource-hero-card-form" id="contact-form-container">
            <h3 style="margin-bottom: 6px; font-size: 1.35rem; color: var(--color-navy);">Request Your Compliance Pack</h3>
            <p style="font-size: 0.8125rem; color: var(--color-slate); margin-bottom: 18px;">
              Complete the form below to receive the official compliance checklist and speak with a Cyber AB Registered Practitioner.
            </p>

            <form id="resource-contact-form" onsubmit="event.preventDefault(); alert('Request submitted! Our Registered Practitioners will review your scope within 2 business hours.');">
              <div class="form-row-2">
                <div class="form-group">
                  <label class="form-label" for="contact-name">NAME*</label>
                  <input type="text" id="contact-name" name="name" class="form-input" placeholder="e.g. John Miller" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-company">Company Name*</label>
                  <input type="text" id="contact-company" name="company" class="form-input" placeholder="e.g. Precision Aerospace LLC" required />
                </div>
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label class="form-label" for="contact-email">Company Email*</label>
                  <input type="email" id="contact-email" name="email" class="form-input" placeholder="john@company.com" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-phone">Phone Number*</label>
                  <input type="tel" id="contact-phone" name="phone" class="form-input" placeholder="(555) 000-0000" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-message">how can we help you*</label>
                <textarea id="contact-message" name="message" class="form-textarea" rows="3" placeholder="Tell us about your upcoming contract renewals, DoD deadlines, or primary challenges with NIST SP 800-171." required></textarea>
              </div>

              <div style="margin-top: 16px;">
                <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">
                  Download Checklist &amp; Book Call &rarr;
                </button>
              </div>

              <div style="margin-top: 10px; font-size: 0.72rem; color: var(--color-slate); text-align: center; line-height: 1.4;">
                🔒 Communications held under strict confidentiality. We do not sell or share contractor data.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

<?php elseif ( 'center' === $layout ) : ?>
  <!-- Center Layout (About Us) -->
  <section class="section-midnight py-section text-center wp-block-inspect wp-pattern-inspect" 
           data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
           data-wp-pattern="secure-centric/hero-center"
           style="text-align: center; border-bottom: 1px solid var(--color-dark-line); position: relative; overflow: hidden;">
    <div class="site-container" style="position: relative; z-index: 2; max-width: 860px; margin: 0 auto;">
      <span class="section-eyebrow dark" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
      <h1 style="color: var(--color-white); margin-bottom: 18px; font-size: clamp(2rem, 3.8vw, 3rem); line-height: 1.2;">
        <?php echo esc_html( $title ); ?>
      </h1>
      <p class="hero-lead" style="color: var(--color-text-on-dark); font-size: 1.125rem; line-height: 1.7; margin-bottom: 28px;">
        <?php echo esc_html( $description ); ?>
      </p>
      <div style="display: flex; gap: 14px; justify-content: center; align-items: center; flex-wrap: wrap;">
        <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary btn-lg"><?php echo esc_html( $primary_btn_text ); ?></a>
        <a href="<?php echo esc_url( $secondary_btn_url ); ?>" class="btn btn-ghost-dark btn-lg"><?php echo esc_html( $secondary_btn_text ); ?></a>
      </div>
    </div>
  </section>

<?php elseif ( 'service' === $layout ) : ?>
  <!-- Service Layout with 6-Phase Strip & Deliverable Chips (Page 2) -->
  <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
           data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
           data-wp-pattern="secure-centric/hero-service-phases" 
           style="border-bottom: 1px solid var(--color-dark-line); position: relative;">
    <div class="site-container">
      <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); margin-bottom: 16px;">
        HOME / SERVICES / <span style="color: var(--color-cyber-cyan);"><?php echo esc_html( strtoupper( $breadcrumb_current ) ); ?></span>
      </div>
      <div class="hero-home-grid">
        <div>
          <span class="section-eyebrow dark">// <?php echo esc_html( $eyebrow ); ?></span>
          <h1 style="color: var(--color-white); margin-bottom: 16px;"><?php echo esc_html( $title ); ?></h1>
          <p class="hero-lead" style="color: var(--color-text-on-dark);"><?php echo esc_html( $description ); ?></p>
          <div style="display: flex; gap: 16px; align-items: center; margin-top: 24px; flex-wrap: wrap;">
            <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary btn-lg"><?php echo esc_html( $primary_btn_text ); ?></a>
            <a href="<?php echo esc_url( $secondary_btn_url ); ?>" class="text-link on-dark"><?php echo esc_html( $secondary_btn_text ); ?></a>
          </div>
          <div style="display: flex; gap: 10px; margin-top: 28px; flex-wrap: wrap;">
            <span class="badge-chip dark"><i class="dot"></i> Cyber AB RPO · CPN #3942</span>
            <span class="badge-chip dark"><i class="dot"></i> Inc. 5000 Honoree</span>
            <span class="badge-chip dark"><i class="dot"></i> 100% C3PAO Pass Record</span>
          </div>
        </div>

        <div class="card-dark" style="background-color: #0B1437; border: 1.5px solid var(--color-dark-outline); padding: 28px;">
          <span class="section-eyebrow dark" style="font-size: 0.6875rem;">ENGAGEMENT AT A GLANCE</span>
          <h4 style="color: var(--color-white); margin-bottom: 14px;">The 6 Delivery Phases</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
            <?php foreach ( $phases_list as $i => $p_item ) : ?>
              <a href="#phases-detail" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(30, 42, 90, 0.6); text-decoration: none;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="width: 22px; height: 22px; border-radius: 50%; background: var(--color-electric-blue); color: #fff; font-size: 0.6875rem; font-family: var(--font-mono); font-weight: 700; display: flex; align-items: center; justify-content: center;"><?php echo esc_html( $i + 1 ); ?></span>
                  <span style="font-size: 0.875rem; color: var(--color-white); font-weight: 600;"><?php echo esc_html( $p_item ); ?></span>
                </div>
                <span style="color: var(--color-slate); font-size: 0.75rem;">&darr;</span>
              </a>
            <?php endforeach; ?>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-slate); display: block; margin-bottom: 8px;">Key Deliverables You Keep:</span>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            <?php foreach ( $deliverables_list as $d_item ) : ?>
              <span class="badge-chip dark" style="font-size: 0.6875rem; border-color: rgba(0, 212, 255, 0.3);"><?php echo esc_html( $d_item ); ?></span>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
  </section>

<?php elseif ( 'icp' === $layout ) : ?>
  <!-- ICP Layout with Situation Selector Tiles (Page 3) -->
  <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
           data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
           data-wp-pattern="secure-centric/hero-icp-tiles"
           style="border-bottom: 1px solid var(--color-dark-line);">
    <div class="site-container">
      <div class="hero-home-grid">
        <div>
          <span class="section-eyebrow dark">// <?php echo esc_html( $eyebrow ); ?></span>
          <h1 style="color: var(--color-white); margin-bottom: 16px;"><?php echo esc_html( $title ); ?></h1>
          <p class="hero-lead" style="color: var(--color-text-on-dark);"><?php echo esc_html( $description ); ?></p>
          <div style="margin-top: 24px;">
            <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary btn-lg"><?php echo esc_html( $primary_btn_text ); ?></a>
          </div>
        </div>

        <div>
          <span class="section-eyebrow dark" style="font-size: 0.75rem;">SELECT YOUR SITUATION</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
            <?php foreach ( $audiences_list as $aud ) : ?>
              <div class="card-dark" style="cursor: pointer; padding: 20px;">
                <h4 style="font-size: 0.9375rem; color: var(--color-white); margin-bottom: 8px;"><?php echo esc_html( $aud ); ?></h4>
                <a href="#tiers" class="text-link on-dark" style="font-size: 0.75rem;">See Your Path &rarr;</a>
              </div>
            <?php endforeach; ?>
          </div>
          <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); text-align: center; margin-top: 12px;">
            Not sure? Start with your contract tier below &darr;
          </div>
        </div>
      </div>
    </div>
  </section>

<?php elseif ( 'split' === $layout ) : ?>
  <!-- Split Layout with Advisor Scoping Card (Pages 4, 5, 6, 7, 8, 11, 16) -->
  <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
           data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
           data-wp-pattern="secure-centric/hero-split-stage"
           style="border-bottom: 1px solid var(--color-dark-line);">
    <div class="site-container">
      <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); margin-bottom: 16px;">
        HOME / SERVICES / <span style="color: var(--color-cyber-cyan);"><?php echo esc_html( strtoupper( $breadcrumb_current ) ); ?></span>
      </div>
      <div class="hero-home-grid">
        <div>
          <span class="section-eyebrow dark">// <?php echo esc_html( $eyebrow ); ?></span>
          <h1 style="color: var(--color-white); margin-bottom: 16px;"><?php echo esc_html( $title ); ?></h1>
          <p class="hero-lead" style="color: var(--color-text-on-dark);"><?php echo esc_html( $description ); ?></p>
          <div style="display: flex; gap: 16px; align-items: center; margin-top: 24px; flex-wrap: wrap;">
            <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary btn-lg"><?php echo esc_html( $primary_btn_text ); ?></a>
            <a href="<?php echo esc_url( $secondary_btn_url ); ?>" class="text-link on-dark"><?php echo esc_html( $secondary_btn_text ); ?> &darr;</a>
          </div>
        </div>

        <div class="card-white" style="padding: 28px; border-radius: 14px;">
          <span class="section-eyebrow">// DIRECT ADVISORY</span>
          <h3 style="color: var(--color-navy); margin-bottom: 8px;">Talk to a CMMC Advisor</h3>
          <p style="font-size: 0.875rem; color: var(--color-body-text); margin: 8px 0 16px;">
            Here is exactly what you receive on your confidential 30-minute scoping review:
          </p>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            <div class="tick-item" style="display: flex; gap: 10px; font-size: 0.875rem;">
              <span style="color: var(--color-electric-blue); font-weight: 800;">✓</span>
              <span>Where you stand today against NIST 800-171</span>
            </div>
            <div class="tick-item" style="display: flex; gap: 10px; font-size: 0.875rem;">
              <span style="color: var(--color-electric-blue); font-weight: 800;">✓</span>
              <span>Which level and scoping boundary fits your contracts</span>
            </div>
            <div class="tick-item" style="display: flex; gap: 10px; font-size: 0.875rem;">
              <span style="color: var(--color-electric-blue); font-weight: 800;">✓</span>
              <span>A concrete, written first step before committing budget</span>
            </div>
          </div>
          <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary" style="width: 100%; justify-content: center;">Book Discovery Call &rarr;</a>
        </div>
      </div>
    </div>
  </section>

<?php elseif ( 'contact' === $layout ) : ?>
  <!-- Contact Hero Layout -->
  <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
           data-wp-block="wp:cover {align:'full', backgroundColor:'midnight'}" 
           data-wp-pattern="secure-centric/contact-hero"
           style="border-bottom: 1px solid var(--color-dark-line); position: relative; text-align: center;">
    <div class="site-container">
      <div style="max-width: 860px; margin: 0 auto; text-align: center;">
        <span class="badge-chip dark" style="margin-bottom: 16px;">
          <i class="dot"></i> <?php echo esc_html( $eyebrow ); ?>
        </span>
        <h1 style="color: var(--color-white); font-size: clamp(2rem, 4vw, 2.75rem); margin-bottom: 20px; line-height: 1.2;">
          <?php echo esc_html( $title ); ?>
        </h1>
        <p style="font-size: 1.125rem; color: var(--color-text-on-dark); line-height: 1.7; margin-bottom: 28px;">
          <?php echo esc_html( $description ); ?>
        </p>
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <span class="badge-chip dark">⏱ 30-Min Scoping Assessment</span>
          <span class="badge-chip dark">🔒 Mutual NDA Signed First</span>
          <span class="badge-chip dark">🏛 Cyber AB RPO #3942</span>
          <span class="badge-chip dark">🚫 Zero Sales Pressure</span>
        </div>
      </div>
    </div>
  </section>

<?php else : ?>
  <!-- Home Layout -->
  <section class="hero-home-wrap wp-block-inspect wp-pattern-inspect" data-wp-block="wp:cover {align:'full', backgroundColor:'midnight'}" data-wp-pattern="secure-centric/hero-home">
    <div class="hero-video-bg-container" aria-hidden="true">
      <?php if ( 'image' === $bg_media_type && ! empty( $image_url ) ) : ?>
        <img class="hero-video-bg hero-image-bg" src="<?php echo esc_url( $image_url ); ?>" alt="" style="object-fit: cover; width: 100%; height: 100%; position: absolute; top: 0; left: 0;" />
      <?php else : ?>
        <video class="hero-video-bg" autoplay muted loop playsinline webkit-playsinline preload="auto" poster="<?php echo esc_url( $poster_url ); ?>" src="<?php echo esc_url( $video_url ); ?>">
          <source src="<?php echo esc_url( $video_url ); ?>" type="video/mp4">
        </video>
      <?php endif; ?>
      <div class="hero-video-overlay" style="background: rgba(6, 11, 36, <?php echo esc_attr( $overlay_opacity ); ?>);"></div>
    </div>
    <div class="site-container" style="position: relative; z-index: 2;">
      <div class="hero-home-grid">
        <div class="hero-home-content">
          <span class="section-eyebrow dark"><?php echo esc_html( $eyebrow ); ?></span>
          <h1>
            <?php
            if ( ! empty( $highlight_text ) && false !== strpos( $title, $highlight_text ) ) {
                $parts = explode( $highlight_text, $title );
                echo esc_html( $parts[0] ) . '<span class="cyan-highlight">' . esc_html( $highlight_text ) . '</span>' . esc_html( $parts[1] );
            } else {
                echo esc_html( $title );
            }
            ?>
          </h1>
          <p class="hero-lead"><?php echo esc_html( $description ); ?></p>
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary btn-lg"><?php echo esc_html( $primary_btn_text ); ?></a>
            <span style="font-size: 0.8125rem; color: var(--color-slate); font-family: var(--font-mono);"><?php echo esc_html( $sub_text ); ?></span>
          </div>
          <div class="hero-topic-cards">
            <a href="<?php echo esc_url( $topic1_url ); ?>" class="hero-topic-card">
              <b><?php echo esc_html( $topic1_title ); ?> &rarr;</b>
              <span><?php echo esc_html( $topic1_desc ); ?></span>
            </a>
            <a href="<?php echo esc_url( $topic2_url ); ?>" class="hero-topic-card">
              <b><?php echo esc_html( $topic2_title ); ?> &rarr;</b>
              <span><?php echo esc_html( $topic2_desc ); ?></span>
            </a>
            <a href="<?php echo esc_url( $topic3_url ); ?>" class="hero-topic-card">
              <b><?php echo esc_html( $topic3_title ); ?> &rarr;</b>
              <span><?php echo esc_html( $topic3_desc ); ?></span>
            </a>
          </div>
        </div>
        <div class="hero-readiness-card">
          <div class="eyebrow">
            <span><?php echo esc_html( $quiz_badge ); ?></span>
            <span class="badge-chip accent" style="font-size: 0.65rem;"><?php echo esc_html( $quiz_chip ); ?></span>
          </div>
          <h3><?php echo esc_html( $quiz_title ); ?></h3>
          <p style="font-size: 0.875rem; color: var(--color-body-text); margin-bottom: 16px; line-height: 1.55;">
            <?php echo esc_html( $quiz_desc ); ?>
          </p>
          <form class="readiness-inline-form" onsubmit="event.preventDefault(); if (typeof window.triggerToolModal === 'function') { window.triggerToolModal(); }">
            <div style="margin-bottom: 12px;">
              <input type="email" class="form-input" placeholder="<?php echo esc_attr( $quiz_placeholder ); ?>" required />
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; height: 48px;">
              <?php echo esc_html( $quiz_btn_text ); ?>
            </button>
          </form>
          <p style="font-size: 0.6875rem; color: var(--color-slate); margin-top: 12px; margin-bottom: 0; text-align: center;">
            <?php echo esc_html( $quiz_note ); ?>
          </p>
        </div>
      </div>
    </div>
  </section>
<?php endif; ?>
