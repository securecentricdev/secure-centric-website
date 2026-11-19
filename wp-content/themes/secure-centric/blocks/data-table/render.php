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

$title       = ! empty( $attributes['title'] ) ? $attributes['title'] : '';
$eyebrow     = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '';
$subtitle    = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : ( ! empty( $attributes['description'] ) ? $attributes['description'] : '' );
$after_text  = ! empty( $attributes['afterText'] ) ? $attributes['afterText'] : ( ! empty( $attributes['normalText'] ) ? $attributes['normalText'] : '' );
$footer_note = ! empty( $attributes['footerNote'] ) ? $attributes['footerNote'] : ( ! empty( $attributes['footnote'] ) ? $attributes['footnote'] : '' );
$cta_text    = ! empty( $attributes['ctaText'] ) ? $attributes['ctaText'] : ( ! empty( $attributes['btnText'] ) ? $attributes['btnText'] : '' );
$cta_url     = ! empty( $attributes['ctaUrl'] ) ? $attributes['ctaUrl'] : ( ! empty( $attributes['btnUrl'] ) ? $attributes['btnUrl'] : ( function_exists( 'sc_get_booking_url' ) ? sc_get_booking_url() : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll' ) );
$cta_subtext = ! empty( $attributes['ctaSubtext'] ) ? $attributes['ctaSubtext'] : '';

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
    $title       = sc_clean_text( $title );
    $eyebrow     = sc_clean_text( $eyebrow );
    $subtitle    = sc_clean_text( $subtitle );
    $after_text  = sc_clean_text( $after_text );
    $footer_note = sc_clean_text( $footer_note );
    $cta_text    = sc_clean_text( $cta_text );
    $cta_subtext = sc_clean_text( $cta_subtext );
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

$col_count = count( $cols );
$col_width = ( $col_count > 0 ) ? round( 100 / $col_count, 3 ) . '%' : 'auto';
?>

<section class="section-white py-section wp-block-inspect wp-pattern-inspect" 
         data-wp-block="wp:table" 
         data-wp-pattern="secure-centric/data-table"<?php echo $anchor_attr; ?>>
  <div class="site-container">
    <?php if ( ! empty( $eyebrow ) ) : ?>
      <span class="section-eyebrow" style="margin-bottom: 12px; display: inline-block;"><?php echo esc_html( $eyebrow ); ?></span>
    <?php endif; ?>
    <?php if ( ! empty( $title ) ) : ?>
      <h3 style="margin-bottom: <?php echo ! empty( $subtitle ) ? '12px' : '24px'; ?>; font-size: 24px; font-weight: 700; color: #0F172A;"><?php echo esc_html( $title ); ?></h3>
    <?php endif; ?>
    <?php if ( ! empty( $subtitle ) ) : ?>
      <p style="color: var(--color-body-text, #475569); font-size: 1.05rem; line-height: 1.6; margin-bottom: 24px; max-width: 840px;"><?php echo nl2br( esc_html( $subtitle ) ); ?></p>
    <?php endif; ?>
    <div class="custom-table-wrap" style="overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 8px; border: 1.5px solid #1E293B; box-shadow: 0 4px 20px rgba(0,0,0,0.12); background-color: #0B1437;">
      <table class="custom-table" style="width: 100%; table-layout: fixed; border-collapse: collapse; text-align: left; font-size: 15px;">
        <?php if ( ! empty( $cols ) ) : ?>
          <thead>
            <tr style="background: #FFFFFF; border-bottom: 2px solid #CBD5E1;">
              <?php foreach ( $cols as $c ) : ?>
                <th style="width: <?php echo esc_attr( $col_width ); ?>; padding: 16px 20px; font-weight: 800; font-size: 0.8125rem; letter-spacing: 0.06em; text-transform: uppercase; color: #0B1437; font-family: var(--font-mono, monospace); background-color: #FFFFFF; word-wrap: break-word; overflow-wrap: break-word; word-break: normal;"><?php echo esc_html( $c ); ?></th>
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
                  <td style="width: <?php echo esc_attr( $col_width ); ?>; padding: 16px 20px; color: <?php echo $text_color; ?>; background-color: <?php echo $bg; ?>; font-weight: <?php echo $weight; ?>; vertical-align: middle; line-height: 1.6; font-size: 0.9375rem; word-wrap: break-word; overflow-wrap: break-word; word-break: normal;"><?php echo esc_html( $cell ); ?></td>
                <?php endforeach; ?>
              </tr>
            <?php endforeach; ?>
          <?php endif; ?>
        </tbody>
      </table>
    </div>
    <?php if ( ! empty( $after_text ) ) : ?>
      <div class="custom-table-after-text" style="margin-top: 24px; font-size: 1.05rem; color: var(--color-body-text, #334155); line-height: 1.65; max-width: 860px;">
        <?php echo wp_kses_post( wpautop( $after_text ) ); ?>
      </div>
    <?php endif; ?>
    <?php if ( ! empty( $footer_note ) ) : ?>
      <div class="custom-table-footnote" style="margin-top: <?php echo ! empty( $after_text ) ? '12px' : '18px'; ?>; font-size: 0.875rem; color: var(--color-slate, #64748B); line-height: 1.6; max-width: 840px;">
        <?php echo nl2br( esc_html( $footer_note ) ); ?>
      </div>
    <?php endif; ?>
    <?php if ( ! empty( $cta_text ) ) : ?>
      <div class="custom-table-cta-wrap" style="margin-top: 28px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
        <a href="<?php echo esc_url( $cta_url ); ?>" class="btn btn-primary btn-lg">
          <?php echo esc_html( $cta_text ); ?>
        </a>
        <?php if ( ! empty( $cta_subtext ) ) : ?>
          <span style="font-size: 0.8125rem; color: var(--color-slate, #64748B); font-family: var(--font-mono, monospace);">
            <?php echo esc_html( $cta_subtext ); ?>
          </span>
        <?php endif; ?>
      </div>
    <?php endif; ?>
  </div>
</section>
