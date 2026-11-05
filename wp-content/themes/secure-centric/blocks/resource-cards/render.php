<?php
/**
 * Render Template for Resource Cards Grid
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title = ! empty( $attributes['title'] ) ? $attributes['title'] : 'CMMC guides, checklists and tools';

$resources = array(
    array(
        'title' => 'CMMC Complete Guide',
        'desc'  => 'The definitive executive and technical overview of CMMC levels, rulemaking, and audits.',
        'link'  => home_url( '/cmmc/' ),
    ),
    array(
        'title' => 'CMMC Level 2 Guide',
        'desc'  => '110 requirements across 14 security families: technical breakdown and scoping rules.',
        'link'  => home_url( '/cmmc/level-2/' ),
    ),
    array(
        'title' => 'NIST SP 800-171 Standard',
        'desc'  => 'The foundational standard behind DFARS 7012 and Level 2 C3PAO certifications.',
        'link'  => home_url( '/services/nist-800-171-compliance/' ),
    ),
    array(
        'title' => 'CUI Scoping & Handling Guide',
        'desc'  => 'Controlled Unclassified Information: identification, markings, and boundary isolation.',
        'link'  => home_url( '/cui/' ),
    ),
    array(
        'title' => 'CMMC Enclave Advisory',
        'desc'  => 'How segregating your CUI network saves months of implementation and audit costs.',
        'link'  => home_url( '/services/cmmc-consulting/' ),
    ),
    array(
        'title' => 'Level 2 Compliance Checklist',
        'desc'  => 'Downloadable 110-control Excel checklist with ownership and objective columns.',
        'link'  => home_url( '/resources/cmmc-level-2-checklist/' ),
    ),
);
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:columns">
  <div class="site-container">
    <h3 style="margin-bottom: 24px;"><?php echo esc_html( $title ); ?></h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
      <?php foreach ( $resources as $res ) : ?>
        <div class="card-white">
          <div class="card-icon-box">📁</div>
          <h4><?php echo esc_html( $res['title'] ); ?></h4>
          <p style="font-size: 0.875rem; color: var(--color-body-text); margin: 8px 0 16px;">
            <?php echo esc_html( $res['desc'] ); ?>
          </p>
          <a href="<?php echo esc_url( $res['link'] ); ?>" class="text-link">Explore Resource &rarr;</a>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
