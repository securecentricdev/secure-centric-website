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
    return;
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:table" data-wp-pattern="secure-centric/checklist-preview">
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 32px;">
      <?php if ( ! empty( $eyebrow ) ) : ?>
      <span class="section-eyebrow">// SAMPLE SPREADSHEET ARTIFACT</span>
      <?php endif; ?>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="table-responsive-wrapper">
      <table class="site-data-table" style="width: 100%; table-layout: fixed; border-collapse: collapse;">
        <thead>
          <tr style="background: #FFFFFF;">
            <th style="width: 16%; word-wrap: break-word; overflow-wrap: break-word;">Req ID</th>
            <th style="width: 17%; word-wrap: break-word; overflow-wrap: break-word;">Domain Family</th>
            <th style="width: 25%; word-wrap: break-word; overflow-wrap: break-word;">Assessment Objective</th>
            <th style="width: 14%; word-wrap: break-word; overflow-wrap: break-word;">Status</th>
            <th style="width: 14%; word-wrap: break-word; overflow-wrap: break-word;">Assigned Owner</th>
            <th style="width: 14%; word-wrap: break-word; overflow-wrap: break-word;">Evidence Artifact</th>
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
              <td style="word-wrap: break-word; overflow-wrap: break-word;"><strong><?php echo esc_html( $r_req ); ?></strong></td>
              <td style="word-wrap: break-word; overflow-wrap: break-word;"><?php echo esc_html( $r_family ); ?></td>
              <td style="word-wrap: break-word; overflow-wrap: break-word;"><?php echo esc_html( $r_obj ); ?></td>
              <td style="word-wrap: break-word; overflow-wrap: break-word;"><span class="status-chip <?php echo $is_green ? 'green' : 'amber'; ?>"><?php echo esc_html( $r_status ); ?></span></td>
              <td style="word-wrap: break-word; overflow-wrap: break-word;"><?php echo esc_html( $r_owner ); ?></td>
              <td style="word-wrap: break-word; overflow-wrap: break-word;"><span class="evidence-link"><?php echo esc_html( $r_ev ); ?></span></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</section>
