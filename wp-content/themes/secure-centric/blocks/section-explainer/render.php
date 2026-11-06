<?php
/**
 * Render Template for Section Explainer Block
 * Strictly matches demo/assets/js/app.js case 'text'
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// SECTION EXPLAINER';
$title   = ! empty( $attributes['title'] ) ? $attributes['title'] : 'What is CMMC compliance?';

$paras = array();
if ( ! empty( $attributes['parasData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['parasData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['parasData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $paras = $decoded;
    }
}

if ( empty( $paras ) ) {
    if ( ! empty( $attributes['p1'] ) ) {
        $paras[] = $attributes['p1'];
    }
    if ( ! empty( $attributes['p2'] ) ) {
        $paras[] = $attributes['p2'];
    }
    if ( ! empty( $attributes['p3'] ) ) {
        $paras[] = $attributes['p3'];
    }
    if ( empty( $paras ) && ! empty( $attributes['desc'] ) ) {
        $paras[] = $attributes['desc'];
    }
    if ( empty( $paras ) && ! empty( $attributes['n'] ) ) {
        $paras[] = $attributes['n'];
    }
}

if ( empty( $paras ) ) {
    $paras = array(
        'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense subcontractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).',
        'Under 32 CFR Part 170 and DFARS 252.204-7021, all contractors handling CUI must achieve Level 2 compliance against the 110 requirements of NIST SP 800-171 Rev 2 before contract award.',
        'Our Cyber AB Registered Practitioners conduct on-site facility walkthroughs, map exact CUI boundaries, guide technical remediation, and co-author your assessor-ready System Security Plan (SSP).'
    );
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow = sc_clean_text( $eyebrow );
    $title   = sc_clean_text( $title );
    $paras   = sc_clean_text( $paras );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group"<?php echo $anchor_attr; ?>>
  <div class="site-container" style="max-width: 900px;">
    <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
    <h2 style="margin-bottom: 20px;"><?php echo esc_html( $title ); ?></h2>
    <?php foreach ( $paras as $para ) : ?>
      <p style="font-size: 1.0625rem; line-height: 1.7; color: var(--color-body-text); margin-bottom: 16px;">
        <?php echo esc_html( $para ); ?>
      </p>
    <?php endforeach; ?>
  </div>
</section>
