<?php
/**
 * Render Template for Checklist Spreadsheet Table Preview Block
 * Strictly matches demo/assets/js/app.js renderChecklistPreview
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Sample Spreadsheet Matrix Preview';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'A preview of the columns, assessment objectives, and evidence fields included in the downloadable resource.';

$rows = array();
if ( ! empty( $attributes['rowsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['rowsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['rowsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $rows = $decoded;
    }
}

if ( empty( $rows ) ) {
    $rows = array(
        array( 'req' => '3.1.1', 'family' => 'Access Control', 'objective' => 'Limit system access to authorized users', 'status' => 'Implemented', 'owner' => 'IT Director', 'evidence' => 'AD_User_Audit_2026.pdf' ),
        array( 'req' => '3.1.2', 'family' => 'Access Control', 'objective' => 'Limit system access to authorized devices', 'status' => 'Implemented', 'owner' => 'Network Admin', 'evidence' => 'NAC_Policy_Config.xml' ),
        array( 'req' => '3.5.3', 'family' => 'Identification & Auth', 'objective' => 'Use multifactor authentication for local and network access', 'status' => 'In Progress', 'owner' => 'Security Lead', 'evidence' => 'Duo_MFA_Rollout_Plan.xlsx' ),
        array( 'req' => '3.13.1', 'family' => 'System & Comms', 'objective' => 'Monitor, control, and protect organizational communications', 'status' => 'Implemented', 'owner' => 'Firewall Engineer', 'evidence' => 'PaloAlto_Edge_Rules.pdf' ),
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:table" data-wp-pattern="secure-centric/checklist-preview">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 32px;">
      <span class="section-eyebrow">// SAMPLE SPREADSHEET ARTIFACT</span>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="table-responsive-wrapper">
      <table class="site-data-table">
        <thead>
          <tr>
            <th>Req ID</th>
            <th>Domain Family</th>
            <th>Assessment Objective</th>
            <th>Status</th>
            <th>Assigned Owner</th>
            <th>Evidence Artifact</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ( $rows as $r ) : ?>
            <?php
            $r_req    = ! empty( $r['req'] ) ? $r['req'] : '';
            $r_family = ! empty( $r['family'] ) ? $r['family'] : '';
            $r_obj    = ! empty( $r['objective'] ) ? $r['objective'] : '';
            $r_status = ! empty( $r['status'] ) ? $r['status'] : 'Implemented';
            $r_owner  = ! empty( $r['owner'] ) ? $r['owner'] : '';
            $r_ev     = ! empty( $r['evidence'] ) ? $r['evidence'] : '';
            $is_green = ( 'Implemented' === $r_status );
            ?>
            <tr>
              <td><strong><?php echo esc_html( $r_req ); ?></strong></td>
              <td><?php echo esc_html( $r_family ); ?></td>
              <td><?php echo esc_html( $r_obj ); ?></td>
              <td><span class="status-chip <?php echo $is_green ? 'green' : 'amber'; ?>"><?php echo esc_html( $r_status ); ?></span></td>
              <td><?php echo esc_html( $r_owner ); ?></td>
              <td><span class="evidence-link"><?php echo esc_html( $r_ev ); ?></span></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</section>
