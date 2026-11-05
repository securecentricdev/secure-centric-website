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

$cards = array();
$default_resources = array(
    1 => array(
        'title' => 'CMMC Complete Guide',
        'desc'  => 'The definitive executive and technical overview of CMMC levels, rulemaking, and audits.',
        'link'  => '#contact',
        'icon'  => '📁',
    ),
    2 => array(
        'title' => 'CMMC Level 2 Guide',
        'desc'  => '110 requirements across 14 security families: technical breakdown and scoping rules.',
        'link'  => '#contact',
        'icon'  => '📘',
    ),
    3 => array(
        'title' => 'NIST SP 800-171 Standard',
        'desc'  => 'The foundational standard behind DFARS 7012 and Level 2 C3PAO certifications.',
        'link'  => '#contact',
        'icon'  => '🛡️',
    ),
    4 => array(
        'title' => 'CUI Scoping & Handling Guide',
        'desc'  => 'Controlled Unclassified Information: identification, markings, and boundary isolation.',
        'link'  => '#contact',
        'icon'  => '🔒',
    ),
    5 => array(
        'title' => 'CMMC Enclave Advisory',
        'desc'  => 'How segregating your CUI network saves months of implementation and audit costs.',
        'link'  => '#contact',
        'icon'  => '🏗️',
    ),
    6 => array(
        'title' => 'Level 2 Compliance Checklist',
        'desc'  => 'Downloadable 110-control Excel checklist with ownership and objective columns.',
        'link'  => '#contact',
        'icon'  => '📊',
    ),
);

for ( $i = 1; $i <= 6; $i++ ) {
    $def = $default_resources[ $i ];
    $cards[] = array(
        'title' => ! empty( $attributes[ 'card' . $i . 'Title' ] ) ? $attributes[ 'card' . $i . 'Title' ] : $def['title'],
        'desc'  => ! empty( $attributes[ 'card' . $i . 'Desc' ] ) ? $attributes[ 'card' . $i . 'Desc' ] : $def['desc'],
        'link'  => ! empty( $attributes[ 'card' . $i . 'Link' ] ) ? $attributes[ 'card' . $i . 'Link' ] : $def['link'],
        'icon'  => ! empty( $attributes[ 'card' . $i . 'Icon' ] ) ? $attributes[ 'card' . $i . 'Icon' ] : $def['icon'],
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:columns">
  <div class="site-container">
    <h3 style="margin-bottom: 24px;"><?php echo esc_html( $title ); ?></h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
      <?php foreach ( $cards as $res ) : ?>
        <div class="card-white" style="display: flex; flex-direction: column;">
          <div class="card-icon-box" style="margin-bottom: 12px; font-size: 1.25rem;"><?php echo esc_html( $res['icon'] ); ?></div>
          <h4 style="font-size: 1.125rem; margin-bottom: 8px; color: var(--color-navy);"><?php echo esc_html( $res['title'] ); ?></h4>
          <p style="font-size: 0.875rem; color: var(--color-body-text); margin: 0 0 16px; flex-grow: 1; line-height: 1.55;">
            <?php echo esc_html( $res['desc'] ); ?>
          </p>
          <a href="<?php echo esc_url( $res['link'] ); ?>" class="text-link" style="font-weight: 700; margin-top: auto;">Explore Resource &rarr;</a>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
