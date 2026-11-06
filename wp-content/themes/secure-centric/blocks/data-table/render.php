<?php
/**
 * Render Template for Data Table Block
 * Strictly matches demo/assets/js/app.js renderTable
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Findings Matrix & Gap Breakdown';

$cols = array();
if ( ! empty( $attributes['colsData'] ) ) {
    $decoded_c = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['colsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['colsData'] ), true );
    if ( is_array( $decoded_c ) && ! empty( $decoded_c ) ) {
        $cols = $decoded_c;
    }
}
if ( empty( $cols ) ) {
    $cols = array( 'Category / Control', 'Status', 'Impact', 'Required Remediation', 'Owner' );
}

$rows = array();
if ( ! empty( $attributes['rowsData'] ) ) {
    $decoded_r = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['rowsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['rowsData'] ), true );
    if ( is_array( $decoded_r ) && ! empty( $decoded_r ) ) {
        $rows = $decoded_r;
    }
}

if ( empty( $rows ) ) {
    $rows = array(
        array( 'AC.L2-3.1.1 (Access Control & Boundary Protection)', 'Non-Compliant', 'High (-5 SPRS)', 'Enforce centralized MFA & remove shared admin credentials', 'Lead SecOps Engineer' ),
        array( 'IA.L2-3.5.3 (Multifactor Authentication)', 'Partially Met', 'High (-5 SPRS)', 'Deploy FIPS 140-2 validated hardware tokens across all privileged sessions', 'IT Director' ),
        array( 'SC.L2-3.13.11 (FIPS-Validated Cryptography)', 'Non-Compliant', 'Medium (-3 SPRS)', 'Enable BitLocker with certified FIPS 140-2 cryptographic modules', 'Systems Administrator' ),
        array( 'AU.L2-3.3.1 (Audit Logging & SIEM Review)', 'Compliant', 'Low (0 SPRS)', 'Weekly automated audit log analysis and tamper-proof log forwarding verified', 'Security Analyst' )
    );
}
?>

<section class="section-white py-section wp-block-inspect wp-pattern-inspect" 
         data-wp-block="wp:table" 
         data-wp-pattern="secure-centric/data-table">
  <div class="site-container">
    <h3 style="margin-bottom: 20px;"><?php echo esc_html( $title ); ?></h3>
    <div class="custom-table-wrap">
      <table class="custom-table">
        <thead>
          <tr>
            <?php foreach ( $cols as $c ) : ?>
              <th><?php echo esc_html( $c ); ?></th>
            <?php endforeach; ?>
          </tr>
        </thead>
        <tbody>
          <?php foreach ( $rows as $row ) : ?>
            <tr>
              <?php foreach ( (array) $row as $cell ) : ?>
                <td><?php echo esc_html( $cell ); ?></td>
              <?php endforeach; ?>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</section>
