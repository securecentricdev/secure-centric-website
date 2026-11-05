<?php
/**
 * Render Template for Hero Block (Multi-Layout)
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$layout             = ! empty( $attributes['layout'] ) ? $attributes['layout'] : 'home';
$eyebrow            = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// NIST SP 800-171 / CMMC Compliance Consultants';
$title              = ! empty( $attributes['title'] ) ? $attributes['title'] : 'CMMC compliance for defense subcontractors, guided by a Cyber AB RPO';
$highlight_text     = ! empty( $attributes['highlightText'] ) ? $attributes['highlightText'] : 'Cyber AB RPO';
$description        = ! empty( $attributes['description'] ) ? $attributes['description'] : 'We help defense contractors and suppliers get ready for CMMC and NIST SP 800-171, from the first site visit to the annual affirmation.';
$primary_btn_text   = ! empty( $attributes['primaryBtnText'] ) ? $attributes['primaryBtnText'] : 'Book a Discovery Call →';
$primary_btn_url    = ! empty( $attributes['primaryBtnUrl'] ) ? $attributes['primaryBtnUrl'] : '#contact';
$sub_text           = ! empty( $attributes['subText'] ) ? $attributes['subText'] : '30 min · No sales pitch · Signed NDA';

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

// Video paths
$theme_uri  = get_template_directory_uri();
$video_mp4  = $theme_uri . '/assets/video/cmmc-concept.mp4';
$poster_jpg = $theme_uri . '/assets/video/cmmc-concept-poster.jpg';
?>

<?php if ( 'service' === $layout ) : ?>
  <section class="section-dark hero-home py-section wp-block-inspect">
    <div class="site-container">
      <div class="hero-home-grid">
        <div class="hero-content">
          <span class="section-eyebrow text-cyan"><?php echo esc_html( $eyebrow ); ?></span>
          <h1 class="hero-title"><?php echo esc_html( $title ); ?></h1>
          <p class="hero-subtitle"><?php echo esc_html( $description ); ?></p>
          <div class="hero-cta-group">
            <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary"><?php echo esc_html( $primary_btn_text ); ?></a>
            <a href="#roadmap-section" class="btn btn-dark-outline">Explore Process &rarr;</a>
          </div>
        </div>
        <div class="hero-media">
          <div class="hero-lead-card">
            <div class="lead-card-header">
              <span class="badge-pill-cyan">AUDIT READY</span>
              <h4 style="color: #fff; margin-top: 10px;">Core Deliverables Included</h4>
            </div>
            <ul style="color: var(--color-text-on-dark); font-size: 0.9375rem; line-height: 1.8; margin: 16px 0; padding-left: 20px;">
              <li>Formal Boundary &amp; Data Flow Diagram</li>
              <li>NIST SP 800-171 110-Control Evidence Matrix</li>
              <li>Auditor-Tested System Security Plan (SSP)</li>
              <li>Full DIBCAC / C3PAO Audit Defense On Site</li>
            </ul>
            <a href="<?php echo esc_url( $primary_btn_url ); ?>" class="btn btn-primary" style="width: 100%; justify-content: center;">
              Schedule Scoping Assessment &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
<?php else : ?>
  <!-- Home Layout -->
  <section class="hero-home-wrap wp-block-inspect wp-pattern-inspect" data-wp-block="wp:cover {align:'full', backgroundColor:'midnight'}" data-wp-pattern="secure-centric/hero-home">
    <div class="hero-video-bg-container" aria-hidden="true">
      <video class="hero-video-bg" autoplay muted loop playsinline webkit-playsinline preload="auto" poster="<?php echo esc_url( $poster_jpg ); ?>" src="<?php echo esc_url( $video_mp4 ); ?>">
        <source src="<?php echo esc_url( $video_mp4 ); ?>" type="video/mp4">
      </video>
      <div class="hero-video-overlay"></div>
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
            <?php if ( ! empty( $quiz_chip ) ) : ?>
              <span class="badge-chip accent" style="font-size: 0.65rem;"><?php echo esc_html( $quiz_chip ); ?></span>
            <?php endif; ?>
          </div>
          <h3><?php echo esc_html( $quiz_title ); ?></h3>
          <p style="font-size: 0.875rem; color: var(--color-body-text); margin-bottom: 16px;">
            <?php echo esc_html( $quiz_desc ); ?>
          </p>
          <form class="readiness-inline-form" onsubmit="event.preventDefault(); if (typeof window.triggerToolModal === 'function') { window.triggerToolModal(); } else { window.location.href='#contact'; }">
            <div style="margin-bottom: 12px;">
              <input type="email" class="form-input" placeholder="<?php echo esc_attr( $quiz_placeholder ); ?>" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              <?php echo esc_html( $quiz_btn_text ); ?>
            </button>
          </form>
          <p style="font-size: 0.6875rem; color: var(--color-slate); margin-top: 10px; text-align: center;">
            <?php echo esc_html( $quiz_note ); ?>
          </p>
        </div>
      </div>
    </div>
  </section>
<?php endif; ?>
