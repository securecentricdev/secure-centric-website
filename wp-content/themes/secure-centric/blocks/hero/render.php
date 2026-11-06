<?php
/**
 * Render Template for Hero Block (Multi-Layout)
 * Strictly matches demo/assets/js/app.js renderHeroHome, renderHeroService, renderHeroICP, renderHeroSplit, renderHeroCenter, renderContactHero
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

<?php if ( 'center' === $layout ) : ?>
  <!-- Center Layout (About, Checklists) -->
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
