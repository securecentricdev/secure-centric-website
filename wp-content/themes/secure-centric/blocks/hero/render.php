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

// Video paths
$theme_uri  = get_template_directory_uri();
$video_mp4  = $theme_uri . '/assets/video/cmmc-concept.mp4';
$poster_jpg = $theme_uri . '/assets/video/cmmc-concept-poster.jpg';

$topics = array(
    array(
        'title' => 'CMMC',
        'desc'  => 'Maturity levels & framework',
        'url'   => home_url( '/cmmc/' ),
    ),
    array(
        'title' => 'NIST SP 800-171',
        'desc'  => '110 controls & DFARS 7012',
        'url'   => home_url( '/services/nist-800-171-compliance/' ),
    ),
    array(
        'title' => 'CUI',
        'desc'  => 'Controlled Unclassified Info',
        'url'   => home_url( '/cui/' ),
    ),
);
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
  <!-- Home Layout matching Demo 1:1 -->
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
            if ( false !== strpos( $title, $highlight_text ) ) {
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
            <?php foreach ( $topics as $topic ) : ?>
              <a href="<?php echo esc_url( $topic['url'] ); ?>" class="hero-topic-card">
                <b><?php echo esc_html( $topic['title'] ); ?> &rarr;</b>
                <span><?php echo esc_html( $topic['desc'] ); ?></span>
              </a>
            <?php endforeach; ?>
          </div>
        </div>

        <div class="hero-readiness-card">
          <div class="eyebrow">
            <span>CMMC READINESS CHECK · 3 MINUTES</span>
            <span class="badge-chip accent" style="font-size: 0.65rem;">Free Tool</span>
          </div>
          <h3>Find out where you stand</h3>
          <p style="font-size: 0.875rem; color: var(--color-body-text); margin-bottom: 16px;">
            Assess your FCI/CUI boundaries and readiness score before a C3PAO audit.
          </p>
          <form class="readiness-inline-form" onsubmit="event.preventDefault(); if (typeof window.triggerToolModal === 'function') { window.triggerToolModal(); } else { window.location.href='#contact'; }">
            <div style="margin-bottom: 12px;">
              <input type="email" class="form-input" placeholder="Enter corporate work email" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Start 3-Minute Readiness Check &rarr;
            </button>
          </form>
          <p style="font-size: 0.6875rem; color: var(--color-slate); margin-top: 10px; text-align: center;">
            🔒 Work email required. Never submit classified or CUI information.
          </p>
        </div>
      </div>
    </div>
  </section>
<?php endif; ?>
