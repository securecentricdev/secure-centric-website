<?php
/**
 * Render Template for Lead Magnet Band
 * Strictly matches demo/assets/js/app.js renderLeadMagnet
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow     = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// FREE DOWNLOADABLE RESOURCE';
$name        = ! empty( $attributes['name'] ) ? $attributes['name'] : 'First-Call Prep Checklist (what to have ready)';
$doc_type    = ! empty( $attributes['docType'] ) ? $attributes['docType'] : 'PDF / EXCEL WORKBOOK';
$placeholder = ! empty( $attributes['placeholder'] ) ? $attributes['placeholder'] : 'Enter corporate email address';
$btn_text    = ! empty( $attributes['btnText'] ) ? $attributes['btnText'] : 'Instant Free Download →';
$disclaimer  = ! empty( $attributes['disclaimer'] ) ? $attributes['disclaimer'] : 'Strictly confidential. No spam guarantee.';

$ticks = array();
if ( ! empty( $attributes['ticksData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['ticksData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['ticksData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $ticks = $decoded;
    }
}

if ( empty( $ticks ) ) {
    $ticks = array(
        'Line-by-line audit objective breakdown with defense-industry scoring weights',
        'Assessor evidence artifact templates and dual-source verification matrix',
        'Automated SPRS deduction formulas and deficiency priority flags',
        'Executive ownership tracker with target closeout dates for internal teams',
    );
}
?>

<section class="py-section-sm wp-block-inspect wp-pattern-inspect" 
         data-wp-block="wp:group {className:'lead-magnet-block'}" 
         data-wp-pattern="secure-centric/lead-magnet-inline">
  <div class="site-container">
    <div class="lead-magnet-band">
      <div class="lead-magnet-grid">
        <div>
          <span class="section-eyebrow" style="font-size: 0.6875rem;"><?php echo esc_html( $eyebrow ); ?></span>
          <h3 style="font-size: 1.25rem; margin-bottom: 8px;"><?php echo esc_html( $name ); ?></h3>
          <ul class="checklist-bullet-list">
            <?php foreach ( $ticks as $t ) : ?>
              <li><?php echo esc_html( $t ); ?></li>
            <?php endforeach; ?>
          </ul>
        </div>

        <div>
          <div class="doc-preview-mock">
            <div class="doc-badge"><?php echo esc_html( $doc_type ); ?></div>
            <div class="doc-title"><?php echo esc_html( $name ); ?></div>
            <div class="doc-skeleton-line"></div>
            <div class="doc-skeleton-line short"></div>
            <div class="doc-skeleton-line medium"></div>
          </div>
        </div>

        <div>
          <form onsubmit="event.preventDefault(); alert('Checklist sent! Check your inbox for the download link.');">
            <div style="margin-bottom: 10px;">
              <input type="email" class="form-input" placeholder="<?php echo esc_attr( $placeholder ); ?>" required />
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;"><?php echo esc_html( $btn_text ); ?></button>
            <span style="font-size: 0.6875rem; color: var(--color-slate); display: block; margin-top: 6px; text-align: center;">
              <?php echo esc_html( $disclaimer ); ?>
            </span>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
