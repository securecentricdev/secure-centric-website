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
    $decoded = json_decode( $attributes['membersData'], true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $members = $decoded;
    }
}

if ( empty( $members ) ) {
    $members = array(
        array(
            'name'     => 'Jake "EJ" Celler',
            'role'     => 'Co-Founder & Lead Registered Practitioner',
            'initials' => 'JC',
            'badge'    => '✓ Cyber AB RP',
            'bio'      => 'Former DoD cybersecurity engineer and lead assessor advisor. Guides precision manufacturers and aerospace suppliers through scoping, boundary isolation, and DIBCAC defense.'
        ),
        array(
            'name'     => 'Son Phan',
            'role'     => 'Co-Founder & Technical Architect',
            'initials' => 'SP',
            'badge'    => '✓ Cyber AB RP',
            'bio'      => 'Enterprise systems architect specializing in enclave segregation, AWS GovCloud, GCC High migrations, and technical 110-control NIST SP 800-171 enforcement.'
        ),
        array(
            'name'     => 'Desmond Thompson',
            'role'     => 'Registered Practitioner & Pre-Audit Lead',
            'initials' => 'DT',
            'badge'    => '✓ Cyber AB RP',
            'bio'      => 'Leads simulated mock C3PAO audits, evidence portfolio reviews, and assessor interview preparation. 100% first-attempt pass rate across all client evaluations.'
        ),
        array(
            'name'     => 'Elena Vasquez',
            'role'     => 'Compliance Author & Policy Lead',
            'initials' => 'EV',
            'badge'    => '✓ Compliance Author',
            'bio'      => 'Specialist in custom System Security Plan (SSP) authoring, POA&M remediation tracking, and defensible operational policy formulation tailored to machine shops.'
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
