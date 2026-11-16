<?php
/**
 * Render Template for Resource Cards Grid
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'CMMC guides, checklists and tools';
$eyebrow  = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : '';
$theme    = ! empty( $attributes['theme'] ) ? $attributes['theme'] : ( ! empty( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : 'white' );
$is_dark  = ( 'midnight' === $theme || 'dark' === $theme );

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
            'link'  => home_url( '/cmmc/' ),
            'icon'  => '📁',
        ),
        2 => array(
            'title' => 'CMMC Level 2 Guide',
            'desc'  => '110 requirements across 14 security families: technical breakdown and scoping rules.',
            'link'  => home_url( '/cmmc/level-2/' ),
            'icon'  => '📘',
        ),
        3 => array(
            'title' => 'NIST SP 800-171 Standard',
            'desc'  => 'The foundational standard behind DFARS 7012 and Level 2 C3PAO certifications.',
            'link'  => home_url( '/nist-800-171/' ),
            'icon'  => '🛡️',
        ),
        4 => array(
            'title' => 'CUI Scoping & Handling Guide',
            'desc'  => 'Controlled Unclassified Information: identification, markings, and boundary isolation.',
            'link'  => home_url( '/cui/' ),
            'icon'  => '🔒',
        ),
        5 => array(
            'title' => 'CMMC Enclave Advisory',
            'desc'  => 'How segregating your CUI network saves months of implementation and audit costs.',
            'link'  => home_url( '/services/cmmc-enclave/' ),
            'icon'  => '🏗️',
        ),
        6 => array(
            'title' => 'Level 2 Compliance Checklist',
            'desc'  => 'Downloadable 110-control Excel checklist with ownership and objective columns.',
            'link'  => home_url( '/resources/templates/checklist/level-2/' ),
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
    $title    = sc_clean_text( $title );
    $eyebrow  = sc_clean_text( $eyebrow );
    $subtitle = sc_clean_text( $subtitle );
    $cards    = sc_clean_text( $cards );
}
?>

<section class="<?php echo $is_dark ? 'section-midnight' : 'section-white'; ?> py-section wp-block-inspect" data-wp-block="wp:columns" style="<?php echo $is_dark ? 'border-top: 1px solid var(--color-dark-line); border-bottom: 1px solid var(--color-dark-line);' : ''; ?>">
  <div class="site-container">
    <div style="margin-bottom: 32px;">
      <?php if ( ! empty( $eyebrow ) ) : ?>
        <span class="section-eyebrow <?php echo $is_dark ? 'dark' : ''; ?>" style="margin-bottom: 8px;"><?php echo esc_html( $eyebrow ); ?></span>
      <?php endif; ?>
      <h2 style="<?php echo $is_dark ? 'color: var(--color-white);' : 'color: var(--color-navy);'; ?> margin-bottom: 10px; font-size: clamp(1.6rem, 2.8vw, 2.25rem);"><?php echo esc_html( $title ); ?></h2>
      <?php if ( ! empty( $subtitle ) ) : ?>
        <p style="<?php echo $is_dark ? 'color: var(--color-text-on-dark);' : 'color: var(--color-body-text);'; ?> font-size: 1.05rem; margin: 0; max-width: 720px; line-height: 1.6;"><?php echo esc_html( $subtitle ); ?></p>
      <?php endif; ?>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
      <?php foreach ( $cards as $res ) : ?>
        <?php
        $card_title = is_array( $res ) ? ( ! empty( $res['title'] ) ? $res['title'] : '' ) : (string) $res;
        $card_desc  = is_array( $res ) ? ( ! empty( $res['desc'] ) ? $res['desc'] : ( ! empty( $res['text'] ) ? $res['text'] : '' ) ) : '';
        $card_link  = is_array( $res ) ? ( ! empty( $res['link'] ) ? $res['link'] : ( ! empty( $res['url'] ) ? $res['url'] : '' ) ) : '';
        $card_icon  = ( is_array( $res ) && ! empty( $res['icon'] ) && false === strpos( $res['icon'], 'u00' ) ) ? $res['icon'] : '📁';
        ?>
        <div class="<?php echo $is_dark ? 'card-dark' : 'card-white'; ?>" style="display: flex; flex-direction: column; <?php echo $is_dark ? 'background-color: #0B1437; border: 1.5px solid var(--color-dark-outline); padding: 24px;' : 'padding: 24px;'; ?>">
          <div class="card-icon-box" style="margin-bottom: 12px; font-size: 1.25rem; <?php echo $is_dark ? 'background: rgba(0, 212, 255, 0.12); color: var(--color-cyber-cyan);' : ''; ?>"><?php echo esc_html( $card_icon ); ?></div>
          <h4 style="font-size: 1.15rem; margin-bottom: 8px; <?php echo $is_dark ? 'color: var(--color-white);' : 'color: var(--color-navy);'; ?>"><?php echo esc_html( $card_title ); ?></h4>
          <p style="font-size: 0.9375rem; <?php echo $is_dark ? 'color: var(--color-text-on-dark);' : 'color: var(--color-body-text);'; ?> margin: 0 0 16px; flex-grow: 1; line-height: 1.55;">
            <?php echo esc_html( $card_desc ); ?>
          </p>
          <?php if ( ! empty( $card_link ) && '#' !== $card_link ) : ?>
            <a href="<?php echo esc_url( $card_link ); ?>" class="text-link <?php echo $is_dark ? 'on-dark' : ''; ?>" style="font-weight: 700; margin-top: auto;">Explore Resource &rarr;</a>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
