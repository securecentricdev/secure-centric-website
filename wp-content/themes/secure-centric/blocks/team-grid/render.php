<?php
/**
 * Render Template for Leadership & Specialists Team Grid
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow     = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// DEFENSE SPECIALISTS';
$title       = ! empty( $attributes['title'] ) ? $attributes['title'] : 'The Team Behind Your CMMC Readiness';
$description = ! empty( $attributes['description'] ) ? $attributes['description'] : 'Accredited Cyber AB Registered Practitioners with decades of technical engineering and audit defense experience.';

$members = array();
if ( ! empty( $attributes['membersData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['membersData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['membersData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $members = $decoded;
    }
}

if ( empty( $members ) ) {
    $members = array(
        array(
            'name'     => 'Jake "EJ" Celler',
            'role'     => 'Founder & Lead Registered Practitioner (RP)',
            'initials' => 'JC',
            'badge'    => '✓ Cyber AB RP',
            'bio'      => '15+ years guiding defense industrial base contractors through NIST SP 800-171, DFARS 7012, and CMMC. Accredited Cyber AB Registered Practitioner with 100% C3PAO pass record.'
        ),
        array(
            'name'     => 'Son Phan',
            'role'     => 'VP Operations & Compliance Director',
            'initials' => 'SP',
            'badge'    => '✓ Cyber AB RP',
            'bio'      => 'Specialist in CUI scoping boundaries, IT/OT enclave segmentation, and federal acquisition compliance architectures for aerospace and defense manufacturers.'
        ),
        array(
            'name'     => 'Senior Registered Practitioners',
            'role'     => 'Audit Defense & Technical Implementation Leads',
            'initials' => 'RP',
            'badge'    => '✓ Cyber AB RP',
            'bio'      => 'Former DoD assessment leads, CISSPs, and CMMC Certified Professionals conducting in-person facility walkthroughs, technical mock audits, and assessor interviews.'
        )
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/leadership-team">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 40px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem; margin: 0;">
        <?php echo esc_html( $description ); ?>
      </p>
    </div>
    <div class="team-grid">
      <?php foreach ( $members as $m ) : ?>
        <div class="team-card">
          <div class="team-avatar-box">
            <div class="team-initials"><?php echo esc_html( ! empty( $m['initials'] ) ? $m['initials'] : 'RP' ); ?></div>
            <span class="team-rpo-badge"><?php echo esc_html( ! empty( $m['badge'] ) ? $m['badge'] : '✓ Cyber AB RP' ); ?></span>
          </div>
          <h3 class="team-name"><?php echo esc_html( $m['name'] ); ?></h3>
          <div class="team-role"><?php echo esc_html( $m['role'] ); ?></div>
          <p class="team-bio"><?php echo esc_html( $m['bio'] ); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
