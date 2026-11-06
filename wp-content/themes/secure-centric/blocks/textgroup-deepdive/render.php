<?php
/**
 * Render Template for Long-Form Deep Dive Analysis Block
 * Strictly matches demo/assets/js/app.js renderTextGroup
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// COMPREHENSIVE COMPLIANCE ANALYSIS';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Long-Form Regulatory Analysis';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Explanations of requirements, timelines, and assessor expectations.';

$sections = array();
if ( ! empty( $attributes['sectionsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['sectionsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['sectionsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $sections = $decoded;
    }
}

if ( empty( $sections ) ) {
    $sections = array(
        array(
            'title'      => 'Scoping Boundaries & CUI Network Isolation',
            'paragraphs' => array(
                'Under DoD 32 CFR 170.19, scoping is the single most critical factor determining compliance costs and timeline. An uncontrolled network boundary brings every corporate computer, server, and IoT device into audit scope.',
                'Our Registered Practitioners conduct physical on-site inspections of facility cabling, server racks, and workcenters to establish isolated enclaves—dramatically reducing the systems that an Authorized C3PAO must examine.',
            ),
        ),
        array(
            'title'      => 'Technical Safeguards & FIPS-Validated Cryptography',
            'paragraphs' => array(
                'NIST SP 800-171 requires multifactor authentication (IA.L2-3.5.3) for all local and network access to privileged and non-privileged accounts, alongside FIPS 140-2 validated encryption (SC.L2-3.13.11).',
                'We guide your IT team and MSP through configuring cryptographic modules, centralizing SIEM audit log collection, and deploying hardware tokens that assessors accept without objection.',
            ),
        ),
        array(
            'title'      => 'Assessor Evidence Binder & Mock Audit Simulation',
            'paragraphs' => array(
                'A System Security Plan (SSP) is only as defensible as the operational evidence behind it. For all 320 assessment objectives, C3PAO assessors require examination, interview, and test evidence.',
                'Secure-Centric builds your comprehensive Assessor Evidence Binder and conducts a rigorous dress-rehearsal mock audit, ensuring your engineers and leadership speak with confidence on assessment day.',
            ),
        ),
    );
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow  = sc_clean_text( $eyebrow );
    $title    = sc_clean_text( $title );
    $subtitle = sc_clean_text( $subtitle );
    $sections = sc_clean_text( $sections );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/textgroup-deepdive"<?php echo $anchor_attr; ?>>
  <div class="site-container" style="max-width: 960px;">
    <div class="section-header-left" style="margin-bottom: 40px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 16px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem; line-height: 1.7;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="textgroup-list">
      <?php foreach ( $sections as $i => $sec ) : ?>
        <?php
        $sec_title = ! empty( $sec['title'] ) ? $sec['title'] : 'Section ' . ( $i + 1 );
        $paras     = ! empty( $sec['paragraphs'] ) ? (array) $sec['paragraphs'] : array();
        ?>
        <div class="textgroup-item">
          <h3 class="textgroup-title"><span class="textgroup-num">§ <?php echo esc_html( $i + 1 ); ?></span> <?php echo esc_html( $sec_title ); ?></h3>
          <?php foreach ( $paras as $p ) : ?>
            <p class="textgroup-para"><?php echo esc_html( $p ); ?></p>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
