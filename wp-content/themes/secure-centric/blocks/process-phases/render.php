<?php
/**
 * Render Template for Phase-by-Phase Process Block
 * Strictly matches demo/assets/js/app.js renderPhases
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// PHASE-BY-PHASE EXECUTION';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'What we do, phase by phase';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Our structured 6-phase advisory engagement ensures every control is scoped, addressed, and documented with precision before your official C3PAO assessment date.';

$phases_raw = array();
if ( ! empty( $attributes['phasesData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['phasesData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['phasesData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $phases_raw = $decoded;
    }
}

if ( empty( $phases_raw ) ) {
    $phases_raw = array(
        array( 'Scope and site visit', 'Find where FCI and CUI live; draw the boundary', 'Scope document, asset list, data-flow diagram' ),
        array( 'Assess', 'Check all 110 requirements against how you really work; optional mock day', 'Ranked findings, estimated SPRS score' ),
        array( 'Guide the fixes', 'Prioritise fixes by risk and score; advise your IT/MSP', 'Remediation plan with owners and dates' ),
        array( 'Document', 'Write the SSP, policies, procedures and POA&M with you', 'Assessor-ready SSP, policies, POA&M' ),
        array( 'Prepare for assessment', 'Full mock audit with interview practice for your team', 'Confidence on assessment day; no surprises' ),
        array( 'Maintain and affirm', 'Annual affirmation, incident response and change control', 'Annual affirmation pack and defensible record' ),
    );
}

$involved_roles = array(
    'Executive Sponsor + IT Lead',
    'System Admins + Operations Lead',
    'Internal IT / MSP Partner',
    'Technical Authors + Security Lead',
    'All Systems Custodians',
    'Affirming Official + vCISO',
);
?>

<section class="section-ice py-section wp-block-inspect wp-pattern-inspect" 
         id="phases-detail"
         data-wp-block="wp:group {backgroundColor:'ice'}" 
         data-wp-pattern="secure-centric/phase-by-phase-work">
  <div class="site-container">
    <div style="max-width: 780px; margin-bottom: 40px;">
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <h2><?php echo esc_html( $title ); ?></h2>
      <p style="font-size: 1.0625rem; color: var(--color-body-text); margin-top: 8px;">
        <?php echo esc_html( $subtitle ); ?>
      </p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 20px;">
      <?php foreach ( $phases_raw as $idx => $phase ) : ?>
        <?php
        $phase_name   = isset( $phase[0] ) ? $phase[0] : ( isset( $phase['name'] ) ? $phase['name'] : 'Phase ' . ( $idx + 1 ) );
        $what_we_do   = isset( $phase[1] ) ? $phase[1] : ( isset( $phase['desc'] ) ? $phase['desc'] : '' );
        $what_you_get = isset( $phase[2] ) ? $phase[2] : ( isset( $phase['deliverable'] ) ? $phase['deliverable'] : '' );
        $role         = isset( $involved_roles[ $idx ] ) ? $involved_roles[ $idx ] : 'Client Team';
        $num_str      = sprintf( '%02d', $idx + 1 );
        ?>
        <div class="phase-step-card">
          <div class="phase-badge-number">
            <?php echo esc_html( $num_str ); ?>
          </div>

          <div>
            <span style="font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-electric-blue); font-weight: 700; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">
              PHASE <?php echo esc_html( $num_str ); ?> // ADVISORY MILESTONE
            </span>
            <h3 style="font-size: 1.25rem; color: var(--color-navy); margin-bottom: 8px;"><?php echo esc_html( $phase_name ); ?></h3>
            <p style="font-size: 0.9375rem; color: var(--color-body-text); line-height: 1.5; margin: 0;">
              <?php echo esc_html( $what_we_do ); ?>
            </p>
          </div>

          <div class="phase-deliverables-tile">
            <h5>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
              DELIVERABLES YOU KEEP
            </h5>
            <b><?php echo esc_html( $what_you_get ); ?></b>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <span style="font-size: 0.6875rem; font-family: var(--font-mono); color: var(--color-slate); text-transform: uppercase;">Who is involved:</span>
            <span class="badge-chip" style="font-size: 0.75rem; background-color: #fff;"><?php echo esc_html( $role ); ?></span>
            <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="text-link" style="font-size: 0.8125rem; margin-top: 4px;">Phase Details &rarr;</a>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
