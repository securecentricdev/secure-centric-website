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

// Route "Credentials and badges" sections directly to the badges block template
if ( stripos( $title, 'credentials' ) !== false && stripos( $title, 'badges' ) !== false ) {
    include __DIR__ . '/../credentials-badges/render.php';
    return;
}

$cards = array();

if ( ! empty( $attributes['resourcesData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['resourcesData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['resourcesData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $cards = $decoded;
    }
}

if ( empty( $cards ) ) {
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
}

if ( function_exists( 'sc_clean_text' ) ) {
    $title = sc_clean_text( $title );
    $cards = sc_clean_text( $cards );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:columns">
  <div class="site-container">
    <h3 style="margin-bottom: 24px;"><?php echo esc_html( $title ); ?></h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
      <?php foreach ( $cards as $res ) : ?>
        <?php
        $card_title = is_array( $res ) ? ( ! empty( $res['title'] ) ? $res['title'] : '' ) : (string) $res;
        $card_desc  = is_array( $res ) ? ( ! empty( $res['desc'] ) ? $res['desc'] : ( ! empty( $res['text'] ) ? $res['text'] : 'Accredited advisory guidance and deliverable frameworks.' ) ) : 'Accredited advisory guidance and deliverable frameworks.';
        $card_link  = is_array( $res ) ? ( ! empty( $res['link'] ) ? $res['link'] : ( ! empty( $res['url'] ) ? $res['url'] : home_url( '/contact/' ) ) ) : home_url( '/contact/' );
        $card_icon  = ( is_array( $res ) && ! empty( $res['icon'] ) && false === strpos( $res['icon'], 'u00' ) ) ? $res['icon'] : '📁';
        ?>
        <div class="card-white" style="display: flex; flex-direction: column;">
          <div class="card-icon-box" style="margin-bottom: 12px; font-size: 1.25rem;"><?php echo esc_html( $card_icon ); ?></div>
          <h4 style="font-size: 1.125rem; margin-bottom: 8px; color: var(--color-navy);"><?php echo esc_html( $card_title ); ?></h4>
          <p style="font-size: 0.875rem; color: var(--color-body-text); margin: 0 0 16px; flex-grow: 1; line-height: 1.55;">
            <?php echo esc_html( $card_desc ); ?>
          </p>
          <a href="<?php echo esc_url( $card_link ); ?>" class="text-link" style="font-weight: 700; margin-top: auto;">Explore Resource &rarr;</a>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
