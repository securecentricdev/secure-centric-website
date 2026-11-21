<?php
/**
 * Render Template for Resources Archive & Video Hub
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow            = isset( $attributes['eyebrow'] ) ? trim( (string) $attributes['eyebrow'] ) : '';
$breadcrumb_current = ! empty( $attributes['breadcrumbCurrent'] ) ? $attributes['breadcrumbCurrent'] : 'RESOURCES';
$title              = ! empty( $attributes['title'] ) ? $attributes['title'] : 'CMMC Resources';
$description        = ! empty( $attributes['description'] ) ? $attributes['description'] : 'Free checklists and videos to help defense contractors prepare for CMMC and NIST SP 800-171.';

$tab_all_label        = ! empty( $attributes['tabAllLabel'] ) ? $attributes['tabAllLabel'] : 'All';
$tab_checklists_label = ! empty( $attributes['tabChecklistsLabel'] ) ? $attributes['tabChecklistsLabel'] : 'Checklists';
$tab_videos_label     = ! empty( $attributes['tabVideosLabel'] ) ? $attributes['tabVideosLabel'] : 'Videos';

$checklists_title    = ! empty( $attributes['checklistsTitle'] ) ? $attributes['checklistsTitle'] : 'Checklists';
$checklists_subtitle = ! empty( $attributes['checklistsSubtitle'] ) ? $attributes['checklistsSubtitle'] : 'Free downloads in Excel and PDF.';

$videos_title        = ! empty( $attributes['videosTitle'] ) ? $attributes['videosTitle'] : 'Videos';
$videos_subtitle     = ! empty( $attributes['videosSubtitle'] ) ? $attributes['videosSubtitle'] : 'Episodes from CMMC Uncovered and CMMC With Clarity on our YouTube channel.';
$videos_channel_text = ! empty( $attributes['videosChannelText'] ) ? $attributes['videosChannelText'] : 'All videos on YouTube →';
$videos_channel_url  = ! empty( $attributes['videosChannelUrl'] ) ? $attributes['videosChannelUrl'] : 'https://www.youtube.com/@Secure-CentricCMMC/videos';

// Decode checklists
$checklists = array();
if ( ! empty( $attributes['checklistsData'] ) ) {
    $decoded_c = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['checklistsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['checklistsData'] ), true );
    if ( is_array( $decoded_c ) && ! empty( $decoded_c ) ) {
        $checklists = $decoded_c;
    }
}
if ( empty( $checklists ) ) {
    $checklists = array(
        array(
            'type'    => 'Checklist',
            'title'   => 'CMMC 2.0 Level 2 Compliance Checklist',
            'desc'    => 'Track all 110 requirements, assign owners and line up your evidence before assessment day.',
            'tags'    => '110 requirements · Excel + PDF',
            'link'    => '/resources/checklist/level-2/',
            'ctaText' => 'Download free →',
            'icon'    => 'checklist',
        ),
        array(
            'type'    => 'Checklist',
            'title'   => 'CMMC Level 1 Readiness Checklist',
            'desc'    => 'Check your Federal Contract Information safeguards against all 15 requirements before your annual self-assessment.',
            'tags'    => '15 requirements · Excel + PDF',
            'link'    => '/resources/checklist/level-1/',
            'ctaText' => 'Download free →',
            'icon'    => 'document',
        ),
        array(
            'type'    => 'Checklist',
            'title'   => 'How to Detect Unmarked CUI',
            'desc'    => 'Find CUI that arrives without markings, across distribution statements, legacy labels and contracts.',
            'tags'    => 'CUI identification · Excel + PDF',
            'link'    => '/resources/checklist/unmarked-cui/',
            'ctaText' => 'Download free →',
            'icon'    => 'search',
        ),
    );
}

// Decode videos
$videos = array();
if ( ! empty( $attributes['videosData'] ) ) {
    $decoded_v = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['videosData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['videosData'] ), true );
    if ( is_array( $decoded_v ) && ! empty( $decoded_v ) ) {
        $videos = $decoded_v;
    }
}
if ( empty( $videos ) ) {
    $videos = array(
        array(
            'id'       => 'SfBeeZirElw',
            'title'    => 'What Is Actually CUI? A CUI Expert Explains',
            'duration' => '48:19',
            'series'   => 'Podcast',
            'url'      => 'https://www.youtube.com/watch?v=SfBeeZirElw',
        ),
        array(
            'id'       => '5ylVKEE-YSA',
            'title'    => 'We Reviewed 4 CMMC Contracts Line by Line: Do You Actually Have CUI?',
            'duration' => '57:39',
            'series'   => 'Podcast',
            'url'      => 'https://www.youtube.com/watch?v=5ylVKEE-YSA',
        ),
        array(
            'id'       => 'fqFrr5dj9Qg',
            'title'    => 'What CMMC Level Do I Need? Level 1 vs Level 2 Explained',
            'duration' => '8:44',
            'series'   => 'Explainer',
            'url'      => 'https://www.youtube.com/watch?v=fqFrr5dj9Qg',
        ),
        array(
            'id'       => 'wX0CORfScFQ',
            'title'    => 'The 2 Documents That Decide Your CMMC Assessment: SSP & POA&M',
            'duration' => '14:14',
            'series'   => 'Explainer',
            'url'      => 'https://www.youtube.com/watch?v=wX0CORfScFQ',
        ),
        array(
            'id'       => 'y9tcJSWFsfA',
            'title'    => 'Does CMMC Level 2 Require GCC High?',
            'duration' => '12:17',
            'series'   => 'Explainer',
            'url'      => 'https://www.youtube.com/watch?v=y9tcJSWFsfA',
        ),
        array(
            'id'       => 'XKwheDyaroo',
            'title'    => 'CMMC Enclave Explained for Defense Contractors',
            'duration' => '9:07',
            'series'   => 'Explainer',
            'url'      => 'https://www.youtube.com/watch?v=XKwheDyaroo',
        ),
    );
}

$checklists_count = count( $checklists );
$videos_count     = count( $videos );
$unique_hub_id    = 'sc-res-hub-' . wp_unique_id();
?>

<style>
/* Scoped Resources Archive Hub Styles */
#<?php echo esc_attr( $unique_hub_id ); ?> .res-hero {
  background-color: #060B24;
  background-image: 
    radial-gradient(circle at 80% 20%, rgba(47, 91, 255, 0.22) 0%, transparent 55%),
    radial-gradient(circle at 10% 80%, rgba(0, 212, 255, 0.12) 0%, transparent 50%);
  border-bottom: 1px solid #1E2A5A;
  padding: clamp(48px, 6vw, 76px) 0 clamp(36px, 4vw, 52px);
  position: relative;
  overflow: hidden;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(47, 91, 255, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-crumb {
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: #8A93B2;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-crumb a {
  color: #8A93B2;
  text-decoration: none;
  transition: color 0.2s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-crumb a:hover {
  color: #00D4FF;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-crumb .sep {
  color: #3A4A85;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-crumb .curr {
  color: #00D4FF;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-eyebrow {
  display: inline-block;
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #00D4FF;
  margin: 0 0 12px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-title {
  font-size: clamp(2.25rem, 4.4vw, 3.25rem);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #FFFFFF;
  margin: 0 0 14px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-lede {
  font-size: clamp(1rem, 1.8vw, 1.125rem);
  line-height: 1.65;
  color: #B8C1E0;
  max-width: 680px;
  margin: 0 0 32px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-tab-btn {
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #B8C1E0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  padding: 8px 18px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-tab-btn:hover {
  border-color: #00D4FF;
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.1);
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-tab-btn b {
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 0.75rem;
  font-weight: 700;
  color: #00D4FF;
  background: rgba(0, 212, 255, 0.14);
  border-radius: 999px;
  padding: 2px 8px;
  transition: all 0.2s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-tab-btn[aria-pressed="true"] {
  background: #2F5BFF;
  border-color: #2F5BFF;
  color: #FFFFFF;
  box-shadow: 0 4px 14px rgba(47, 91, 255, 0.45);
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-tab-btn[aria-pressed="true"] b {
  background: rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
}

/* Sections & Grids */
#<?php echo esc_attr( $unique_hub_id ); ?> .res-body-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-sec {
  padding: clamp(48px, 5vw, 68px) 0 16px;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-sec-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-sec-head h2 {
  font-size: clamp(1.6rem, 2.5vw, 2.1rem);
  font-weight: 800;
  color: #0B1437;
  letter-spacing: -0.015em;
  margin: 0 0 6px;
  line-height: 1.25;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-sec-head p {
  font-size: 0.95rem;
  color: #4A5578;
  margin: 0;
  line-height: 1.5;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-more-link {
  font-weight: 700;
  font-size: 0.9375rem;
  color: #2F5BFF;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.2s ease, color 0.2s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-more-link:hover {
  color: #1E44E6;
  gap: 10px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

/* Checklist Card */
#<?php echo esc_attr( $unique_hub_id ); ?> .res-check-card {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border: 1px solid #E2E8F5;
  border-radius: 14px;
  padding: 28px 24px 24px;
  text-decoration: none;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  position: relative;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-check-card:hover {
  transform: translateY(-4px);
  border-color: #B4C6FF;
  box-shadow: 0 16px 36px -12px rgba(11, 20, 55, 0.16);
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-card-ico {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #EEF2FF;
  color: #2F5BFF;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-card-type {
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2F5BFF;
  margin: 0 0 8px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-check-card h3 {
  font-size: 1.2rem;
  line-height: 1.35;
  font-weight: 700;
  color: #0B1437;
  margin: 0 0 10px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-card-desc {
  font-size: 0.9375rem;
  color: #4A5578;
  line-height: 1.6;
  margin: 0 0 20px;
  flex: 1;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-card-meta span {
  font-size: 0.775rem;
  font-weight: 600;
  color: #0B1437;
  background: #F6F8FD;
  border: 1px solid #E2E8F5;
  border-radius: 6px;
  padding: 4px 9px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-card-cta {
  font-weight: 700;
  font-size: 0.9375rem;
  color: #2F5BFF;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-top: 1px solid #E2E8F5;
  padding-top: 16px;
  margin-top: auto;
  transition: gap 0.2s ease, color 0.2s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-check-card:hover .res-card-cta {
  color: #1E44E6;
  gap: 10px;
}

/* Video Card */
#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-card {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border: 1px solid #E2E8F5;
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-card:hover {
  transform: translateY(-4px);
  border-color: #B4C6FF;
  box-shadow: 0 16px 36px -12px rgba(11, 20, 55, 0.16);
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-thumb {
  position: relative;
  aspect-ratio: 16/9;
  background: #0B1437;
  display: grid;
  place-items: center;
  overflow: hidden;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-card:hover .res-vid-thumb img {
  transform: scale(1.04);
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-play {
  position: relative;
  z-index: 2;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  display: grid;
  place-items: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, background 0.2s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-play svg {
  color: #2F5BFF;
  margin-left: 3px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-card:hover .res-vid-play {
  transform: scale(1.1);
  background: #FFFFFF;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-dur {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 2;
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 0.72rem;
  font-weight: 700;
  color: #FFFFFF;
  background: rgba(11, 20, 55, 0.88);
  border-radius: 4px;
  padding: 2px 7px;
  font-variant-numeric: tabular-nums;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-series {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 2;
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #00D4FF;
  background: rgba(11, 20, 55, 0.82);
  border: 1px solid rgba(0, 212, 255, 0.4);
  border-radius: 999px;
  padding: 3px 9px;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-body {
  padding: 18px 20px 22px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-body h3 {
  font-size: 1.05rem;
  line-height: 1.4;
  font-weight: 700;
  color: #0B1437;
  margin: 0;
  transition: color 0.2s ease;
}

#<?php echo esc_attr( $unique_hub_id ); ?> .res-vid-card:hover .res-vid-body h3 {
  color: #2F5BFF;
}

/* Responsiveness */
@media (max-width: 992px) {
  #<?php echo esc_attr( $unique_hub_id ); ?> .res-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  #<?php echo esc_attr( $unique_hub_id ); ?> .res-hero-inner,
  #<?php echo esc_attr( $unique_hub_id ); ?> .res-body-wrap {
    padding: 0 16px;
  }
  #<?php echo esc_attr( $unique_hub_id ); ?> .res-grid {
    grid-template-columns: 1fr;
  }
  #<?php echo esc_attr( $unique_hub_id ); ?> .res-sec {
    padding: 36px 0 12px;
  }
  #<?php echo esc_attr( $unique_hub_id ); ?> .res-tabs {
    gap: 8px;
  }
  #<?php echo esc_attr( $unique_hub_id ); ?> .res-tab-btn {
    padding: 7px 14px;
    font-size: 0.875rem;
  }
}
</style>

<div id="<?php echo esc_attr( $unique_hub_id ); ?>" class="sc-resources-hub-block wp-block-inspect" data-wp-block="secure-centric/resources-archive">
  <!-- DARK HERO SECTION -->
  <section class="res-hero">
    <div class="res-hero-inner">
      <div class="res-crumb">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">HOME</a>
        <span class="sep">/</span>
        <span class="curr"><?php echo esc_html( strtoupper( $breadcrumb_current ) ); ?></span>
      </div>

      <?php if ( ! empty( $eyebrow ) ) : ?>
        <span class="res-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <?php endif; ?>

      <h1 class="res-title"><?php echo esc_html( $title ); ?></h1>

      <?php if ( ! empty( $description ) ) : ?>
        <p class="res-lede"><?php echo esc_html( $description ); ?></p>
      <?php endif; ?>

      <div class="res-tabs" role="group" aria-label="Filter resources">
        <button class="res-tab-btn" type="button" data-filter="all" aria-pressed="true">
          <?php echo esc_html( $tab_all_label ); ?>
        </button>
        <button class="res-tab-btn" type="button" data-filter="checklists" aria-pressed="false">
          <?php echo esc_html( $tab_checklists_label ); ?> <b><?php echo esc_html( $checklists_count ); ?></b>
        </button>
        <button class="res-tab-btn" type="button" data-filter="videos" aria-pressed="false">
          <?php echo esc_html( $tab_videos_label ); ?> <b><?php echo esc_html( $videos_count ); ?></b>
        </button>
      </div>
    </div>
  </section>

  <!-- CONTENT SECTIONS -->
  <div class="res-body-wrap">
    <!-- CHECKLISTS SECTION -->
    <section class="res-sec" id="checklists-sec" data-res-sec="checklists" aria-labelledby="h-checklists">
      <div class="res-sec-head">
        <div>
          <h2 id="h-checklists"><?php echo esc_html( $checklists_title ); ?></h2>
          <?php if ( ! empty( $checklists_subtitle ) ) : ?>
            <p><?php echo esc_html( $checklists_subtitle ); ?></p>
          <?php endif; ?>
        </div>
      </div>

      <div class="res-grid">
        <?php foreach ( $checklists as $idx => $item ) : ?>
          <?php
          $c_type    = ! empty( $item['type'] ) ? $item['type'] : 'Checklist';
          $c_title   = ! empty( $item['title'] ) ? $item['title'] : '';
          $c_desc    = ! empty( $item['desc'] ) ? $item['desc'] : '';
          $c_link    = ! empty( $item['link'] ) ? ( function_exists( 'sc_resolve_page_url' ) ? sc_resolve_page_url( $item['link'] ) : $item['link'] ) : '#';
          $c_cta     = ! empty( $item['ctaText'] ) ? $item['ctaText'] : 'Download free →';
          $c_icon    = ! empty( $item['icon'] ) ? $item['icon'] : 'checklist';
          $c_tags    = ! empty( $item['tags'] ) ? array_map( 'trim', explode( '·', str_replace( array( ',', '|' ), '·', $item['tags'] ) ) ) : array();
          ?>
          <a class="res-check-card" href="<?php echo esc_url( $c_link ); ?>">
            <span class="res-card-ico" aria-hidden="true">
              <?php if ( 'document' === $c_icon || false !== strpos( strtolower( $c_title ), 'level 1' ) ) : ?>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="5" y="3" width="14" height="18" rx="2"></rect>
                  <path d="M9 8h6M9 12h6M9 16h4"></path>
                </svg>
              <?php elseif ( 'search' === $c_icon || false !== strpos( strtolower( $c_title ), 'unmarked' ) ) : ?>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="M20 20l-3.5-3.5"></path>
                </svg>
              <?php else : ?>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 11l3 3 8-8"></path>
                  <path d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h9"></path>
                </svg>
              <?php endif; ?>
            </span>
            <p class="res-card-type"><?php echo esc_html( $c_type ); ?></p>
            <h3><?php echo esc_html( $c_title ); ?></h3>
            <p class="res-card-desc"><?php echo esc_html( $c_desc ); ?></p>
            <?php if ( ! empty( $c_tags ) ) : ?>
              <div class="res-card-meta">
                <?php foreach ( $c_tags as $tag_text ) : ?>
                  <?php if ( ! empty( $tag_text ) ) : ?>
                    <span><?php echo esc_html( $tag_text ); ?></span>
                  <?php endif; ?>
                <?php endforeach; ?>
              </div>
            <?php endif; ?>
            <span class="res-card-cta">
              <?php echo esc_html( $c_cta ); ?>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </a>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- VIDEOS SECTION -->
    <section class="res-sec" id="videos-sec" data-res-sec="videos" aria-labelledby="h-videos">
      <div class="res-sec-head">
        <div>
          <h2 id="h-videos"><?php echo esc_html( $videos_title ); ?></h2>
          <?php if ( ! empty( $videos_subtitle ) ) : ?>
            <p><?php echo esc_html( $videos_subtitle ); ?></p>
          <?php endif; ?>
        </div>
        <?php if ( ! empty( $videos_channel_url ) ) : ?>
          <a class="res-more-link" href="<?php echo esc_url( $videos_channel_url ); ?>" target="_blank" rel="noopener noreferrer">
            <?php echo esc_html( $videos_channel_text ); ?>
          </a>
        <?php endif; ?>
      </div>

      <div class="res-grid">
        <?php foreach ( $videos as $v ) : ?>
          <?php
          $v_id       = ! empty( $v['id'] ) ? $v['id'] : '';
          $v_title    = ! empty( $v['title'] ) ? $v['title'] : '';
          $v_dur      = ! empty( $v['duration'] ) ? $v['duration'] : '';
          $v_series   = ! empty( $v['series'] ) ? $v['series'] : 'Video';
          $v_url      = ! empty( $v['url'] ) ? $v['url'] : ( ! empty( $v_id ) ? 'https://www.youtube.com/watch?v=' . $v_id : '#' );
          $v_thumb    = ! empty( $v_id ) ? 'https://i.ytimg.com/vi/' . $v_id . '/hqdefault.jpg' : '';
          ?>
          <a class="res-vid-card" href="<?php echo esc_url( $v_url ); ?>" target="_blank" rel="noopener noreferrer">
            <div class="res-vid-thumb">
              <?php if ( ! empty( $v_thumb ) ) : ?>
                <img src="<?php echo esc_url( $v_thumb ); ?>" alt="<?php echo esc_attr( $v_title ); ?>" loading="lazy" onerror="this.style.display='none';">
              <?php endif; ?>
              <?php if ( ! empty( $v_series ) ) : ?>
                <span class="res-vid-series"><?php echo esc_html( $v_series ); ?></span>
              <?php endif; ?>
              <span class="res-vid-play" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </span>
              <?php if ( ! empty( $v_dur ) ) : ?>
                <span class="res-vid-dur"><?php echo esc_html( $v_dur ); ?></span>
              <?php endif; ?>
            </div>
            <div class="res-vid-body">
              <h3><?php echo esc_html( $v_title ); ?></h3>
            </div>
          </a>
        <?php endforeach; ?>
      </div>
    </section>
  </div>
</div>

<script>
(function() {
  const hub = document.getElementById('<?php echo esc_js( $unique_hub_id ); ?>');
  if (!hub) return;

  const tabs = hub.querySelectorAll('.res-tab-btn');
  const sections = hub.querySelectorAll('[data-res-sec]');

  function applyFilter(filter) {
    tabs.forEach(btn => {
      const match = (btn.getAttribute('data-filter') === filter);
      btn.setAttribute('aria-pressed', match ? 'true' : 'false');
    });

    sections.forEach(sec => {
      const secType = sec.getAttribute('data-res-sec');
      if (filter === 'all' || secType === filter) {
        sec.style.display = '';
        sec.style.opacity = '1';
        sec.style.transform = 'translateY(0)';
      } else {
        sec.style.display = 'none';
      }
    });
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', function() {
      const f = this.getAttribute('data-filter');
      applyFilter(f);
      if (history.replaceState) {
        history.replaceState(null, null, f === 'all' ? window.location.pathname : '#' + f);
      }
    });
  });

  // Handle URL hash on load (e.g. #checklists or #videos)
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '').replace('-sec', '');
    if (hash === 'checklists' || hash === 'videos') {
      applyFilter(hash);
    }
  }
})();
</script>
