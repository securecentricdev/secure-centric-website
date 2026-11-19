<?php
/**
 * Render Template for Data Table Block
 * Dynamically renders custom headers and rows from Gutenberg block attributes
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title = ! empty( $attributes['title'] ) ? $attributes['title'] : '';

// 1. Resolve Columns / Headers from all possible attribute keys
$cols = array();
if ( ! empty( $attributes['colsData'] ) ) {
    $decoded_c = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['colsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['colsData'] ), true );
    if ( is_array( $decoded_c ) && ! empty( $decoded_c ) ) {
        $cols = $decoded_c;
    }
} elseif ( ! empty( $attributes['headersData'] ) ) {
    $decoded_h = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['headersData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['headersData'] ), true );
    if ( is_array( $decoded_h ) && ! empty( $decoded_h ) ) {
        $cols = $decoded_h;
    }
} elseif ( ! empty( $attributes['headers'] ) ) {
    $cols = is_array( $attributes['headers'] ) ? $attributes['headers'] : json_decode( $attributes['headers'], true );
} elseif ( ! empty( $attributes['cols'] ) ) {
    $cols = is_array( $attributes['cols'] ) ? $attributes['cols'] : json_decode( $attributes['cols'], true );
}

// 2. Resolve Rows from all possible attribute keys
$rows = array();
if ( ! empty( $attributes['rowsData'] ) ) {
    $decoded_r = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['rowsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['rowsData'] ), true );
    if ( is_array( $decoded_r ) && ! empty( $decoded_r ) ) {
        $rows = $decoded_r;
    }
} elseif ( ! empty( $attributes['rows'] ) ) {
    $rows = is_array( $attributes['rows'] ) ? $attributes['rows'] : json_decode( $attributes['rows'], true );
}

if ( function_exists( 'sc_clean_text' ) ) {
    $title = sc_clean_text( $title );
    if ( is_array( $cols ) ) {
        $cols = sc_clean_text( $cols );
    }
    if ( is_array( $rows ) ) {
        $rows = sc_clean_text( $rows );
    }
}

// Fallback only if both cols and rows are completely empty
if ( empty( $cols ) && empty( $rows ) ) {
    $cols = array( 'Category / Control', 'Status', 'Impact', 'Required Remediation' );
    $rows = array(
        array( '3.5.3 Multifactor Authentication', 'Non-Compliant', 'High (-5 SPRS)', 'Enforce centralized MFA & remove shared admin credentials' ),
        array( '3.13.11 FIPS-Validated Cryptography', 'Non-Compliant', 'Medium (-3 SPRS)', 'Enable BitLocker with certified FIPS 140-2 cryptographic modules' )
    );
}

// If cols is empty but rows exist, and first row looks like a header, promote it
if ( empty( $cols ) && ! empty( $rows ) && count( $rows ) > 1 ) {
    $cols = array_shift( $rows );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<section class="section-white py-section wp-block-inspect wp-pattern-inspect" 
         data-wp-block="wp:table" 
         data-wp-pattern="secure-centric/data-table"<?php echo $anchor_attr; ?>>
  <div class="site-container">
    <?php if ( ! empty( $title ) ) : ?>
      <h3 style="margin-bottom: 24px; font-size: 24px; font-weight: 700; color: #0F172A;"><?php echo esc_html( $title ); ?></h3>
    <?php endif; ?>
    <div class="custom-table-wrap" style="overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 8px; border: 1.5px solid #1E293B; box-shadow: 0 4px 20px rgba(0,0,0,0.12); background-color: #0B1437;">
      <table class="custom-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 15px;">
        <?php if ( ! empty( $cols ) ) : ?>
          <thead>
            <tr style="background: #FFFFFF; border-bottom: 2px solid #CBD5E1;">
              <?php foreach ( $cols as $c ) : ?>
                <th style="padding: 16px 20px; font-weight: 800; font-size: 0.8125rem; letter-spacing: 0.06em; text-transform: uppercase; color: #0B1437; font-family: var(--font-mono, monospace); background-color: #FFFFFF;"><?php echo esc_html( $c ); ?></th>
              <?php endforeach; ?>
            </tr>
          </thead>
        <?php endif; ?>
        <tbody>
          <?php if ( ! empty( $rows ) ) : ?>
            <?php foreach ( $rows as $idx => $row ) : 
              $row_cells = array_values( (array) $row );
              $bg = ( $idx % 2 === 1 ) ? '#0B1437' : '#101E56';
            ?>
              <tr style="background: <?php echo $bg; ?>; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                <?php foreach ( $row_cells as $c_idx => $cell ) : 
                  // If cell is an array, join it
                  if ( is_array( $cell ) ) {
                      $cell = implode( ', ', $cell );
                  }
                  $is_first = ( $c_idx === 0 );
                  $weight = $is_first ? '500' : '600';
                  $text_color = $is_first ? '#FFFFFF' : '#38BDF8';
                ?>
                  <td style="padding: 16px 20px; color: <?php echo $text_color; ?>; background-color: <?php echo $bg; ?>; font-weight: <?php echo $weight; ?>; vertical-align: middle; line-height: 1.6; font-size: 0.9375rem;"><?php echo esc_html( $cell ); ?></td>
                <?php endforeach; ?>
              </tr>
            <?php endforeach; ?>
          <?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</section>
