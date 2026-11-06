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

$headers = array();
if ( ! empty( $attributes['headersData'] ) ) {
    $decoded_h = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['headersData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['headersData'] ), true );
    if ( is_array( $decoded_h ) && ! empty( $decoded_h ) ) {
        $headers = $decoded_h;
    }
}

$rows = array();
if ( ! empty( $attributes['rowsData'] ) ) {
    $decoded_r = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['rowsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['rowsData'] ), true );
    if ( is_array( $decoded_r ) && ! empty( $decoded_r ) ) {
        $rows = $decoded_r;
    }
}

if ( empty( $rows ) || ! is_array( $rows ) || ( isset( $rows[0] ) && ! is_array( $rows[0] ) ) ) {
    $title_lower = strtolower( $title );
    if ( false !== strpos( $title_lower, 'levels' ) || false !== strpos( $title_lower, 'comparison' ) ) {
        $rows = array(
            array( 'Target Information Safeguarded', 'Federal Contract Information (FCI)', 'Controlled Unclassified Information (CUI)', 'High-Value Assets & Critical CUI' ),
            array( 'Security Controls Baseline', '15 FAR 52.204-21 Basic Safeguards', '110 NIST SP 800-171 Requirements', '110 NIST SP 800-171 + Select 800-172 Controls' ),
            array( 'Assessment & Audit Mechanism', 'Annual Self-Assessment in SPRS', 'Triennial Independent C3PAO Audit', 'Triennial Government-Led (DIBCAC) Audit' ),
            array( 'Executive Affirmation', 'Annual Affirmation by Corporate Official', 'Annual Executive Affirmation in SPRS', 'Annual Executive Affirmation in SPRS' ),
            array( 'Defense Supply Chain Tier', 'Subcontractors handling FCI only', 'Prime & Subcontractors handling DoD CUI', 'Defense Prime Contractors on critical programs' ),
            array( 'Typical Implementation Timeline', '1 – 2 months', '6 – 9 months', '9 – 14 months' )
        );
    } else {
        $rows = array(
            array( 'AC.L2-3.1.1 (Access Control & Boundary Protection)', 'Non-Compliant', 'High (-5 SPRS)', 'Enforce centralized MFA & remove shared admin credentials' ),
            array( 'IA.L2-3.5.3 (Multifactor Authentication)', 'Partially Met', 'High (-5 SPRS)', 'Deploy FIPS 140-2 validated hardware tokens across all privileged sessions' ),
            array( 'SC.L2-3.13.11 (FIPS-Validated Cryptography)', 'Non-Compliant', 'Medium (-3 SPRS)', 'Enable BitLocker with certified FIPS 140-2 cryptographic modules' ),
            array( 'AU.L2-3.3.1 (Audit Logging & SIEM Review)', 'Compliant', 'Low (0 SPRS)', 'Weekly automated audit log analysis and tamper-proof log forwarding verified' )
        );
    }
}

// Align column headers with body cells
$row_col_count = ( ! empty( $rows[0] ) && is_array( $rows[0] ) ) ? count( $rows[0] ) : 0;
if ( $row_col_count > 0 ) {
    if ( ! empty( $headers ) && count( $headers ) === $row_col_count ) {
        $cols = $headers;
    } elseif ( ! empty( $cols ) && count( $cols ) !== $row_col_count ) {
        if ( ! empty( $headers ) && count( $headers ) === $row_col_count ) {
            $cols = $headers;
        } elseif ( count( $cols ) === $row_col_count + 1 && empty( $cols[0] ) ) {
            $cols = array_slice( $cols, 1 );
        }
    }
}

if ( empty( $cols ) ) {
    $cols = array( 'Category / Control', 'Status', 'Impact', 'Required Remediation', 'Owner' );
}

if ( function_exists( 'sc_clean_text' ) ) {
    $title = sc_clean_text( $title );
    $cols  = sc_clean_text( $cols );
    $rows  = sc_clean_text( $rows );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<section class="section-white py-section wp-block-inspect wp-pattern-inspect" 
         data-wp-block="wp:table" 
         data-wp-pattern="secure-centric/data-table"<?php echo $anchor_attr; ?>>
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
          <?php foreach ( $rows as $row ) : 
            $row_cells = array_values( (array) $row );
            if ( ! empty( $cols ) && count( $row_cells ) > count( $cols ) ) {
                $row_cells = array_slice( $row_cells, 0, count( $cols ) );
            }
          ?>
            <tr>
              <?php foreach ( $row_cells as $cell ) : ?>
                <td><?php echo esc_html( $cell ); ?></td>
              <?php endforeach; ?>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</section>
