<?php
/**
 * Render Template for NIST Control Families Interactive Tiles Block
 * Strictly matches demo/assets/js/app.js renderAccordionTiles
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// 110 NIST CONTROLS';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'The 110 Requirements Across 14 Families';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Click on any control family below to see requirement counts and scope objectives tested by C3PAO assessors.';

$families = array();
if ( ! empty( $attributes['familiesData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['familiesData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['familiesData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $families = $decoded;
    }
}

if ( empty( $families ) ) {
    $families = array(
        array( 'code' => 'AC', 'name' => 'Access Control', 'count' => 22, 'desc' => 'Limit information system access to authorized users and devices.' ),
        array( 'code' => 'AT', 'name' => 'Awareness & Training', 'count' => 3, 'desc' => 'Ensure personnel understand cybersecurity risks and CUI safeguarding duties.' ),
        array( 'code' => 'AU', 'name' => 'Audit & Accountability', 'count' => 9, 'desc' => 'Track, record, review, and correlate security actions and logs.' ),
        array( 'code' => 'CM', 'name' => 'Configuration Management', 'count' => 9, 'desc' => 'Establish and maintain baseline configurations and hardware inventories.' ),
        array( 'code' => 'IA', 'name' => 'Identification & Authentication', 'count' => 11, 'desc' => 'Enforce MFA, user identity proofs, and cryptographic credentials.' ),
        array( 'code' => 'IR', 'name' => 'Incident Response', 'count' => 3, 'desc' => 'Detect, analyze, contain, and report cyber incidents to DoD within 72 hours.' ),
        array( 'code' => 'MA', 'name' => 'Maintenance', 'count' => 6, 'desc' => 'Perform scheduled system maintenance with authenticated tools.' ),
        array( 'code' => 'MP', 'name' => 'Media Protection', 'count' => 8, 'desc' => 'Sanitize, mark, and securely transport physical and digital CUI media.' ),
        array( 'code' => 'PE', 'name' => 'Physical Protection', 'count' => 6, 'desc' => 'Escort visitors, protect server rooms, and enforce physical locks.' ),
        array( 'code' => 'PS', 'name' => 'Personnel Security', 'count' => 2, 'desc' => 'Screen individuals before authorizing access to CUI systems.' ),
        array( 'code' => 'RA', 'name' => 'Risk Assessment', 'count' => 3, 'desc' => 'Identify vulnerabilities and perform vulnerability scanning.' ),
        array( 'code' => 'CA', 'name' => 'Security Assessment', 'count' => 4, 'desc' => 'Regularly test controls, maintain SSP, and manage the POA&M.' ),
        array( 'code' => 'SC', 'name' => 'System & Communications', 'count' => 16, 'desc' => 'Enforce network boundary firewalls, FIPS 140-2 encryption, and VPNs.' ),
        array( 'code' => 'SI', 'name' => 'System & Information Integrity', 'count' => 7, 'desc' => 'Deploy antivirus, spam protection, and continuous system monitoring.' ),
    );
}
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group">
  <div class="site-container">
    <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
    <h2><?php echo esc_html( $title ); ?></h2>
    <p style="font-size: 1rem; color: var(--color-body-text); margin-top: 8px;">
      <?php echo esc_html( $subtitle ); ?>
    </p>

    <div class="families-grid">
      <?php foreach ( $families as $f ) : ?>
        <div class="family-tile" style="cursor: pointer;">
          <div class="family-tile-header">
            <span class="family-code"><?php echo esc_html( $f['code'] ); ?></span>
            <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--color-slate);"><?php echo esc_html( $f['count'] ); ?> Controls</span>
          </div>
          <h4 style="font-size: 1.05rem; margin-bottom: 6px;"><?php echo esc_html( $f['name'] ); ?></h4>
          <p style="font-size: 0.8125rem; color: var(--color-body-text); line-height: 1.45; margin: 0;"><?php echo esc_html( $f['desc'] ); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
