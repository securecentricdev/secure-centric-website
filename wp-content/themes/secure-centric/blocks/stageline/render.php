<?php
/**
 * Render Template for Stage Line Bar Block
 * Strictly matches demo/assets/js/app.js renderStageLine
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$stage        = ! empty( $attributes['stage'] ) ? $attributes['stage'] : 'Compliance Phase';
$service_link = ! empty( $attributes['serviceLink'] ) ? $attributes['serviceLink'] : home_url( '/services/cmmc-compliance/' );
$title        = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Where you fit';
$line         = ! empty( $attributes['line'] ) ? $attributes['line'] : 'You know CMMC applies but need clarity on scoping, timeline, and audit boundaries.';
$process_link = ! empty( $attributes['processLink'] ) ? $attributes['processLink'] : home_url( '/cmmc/cmmc-process/' );
?>

<section class="stage-line-bar wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/stage-line">
  <div class="site-container">
    <div class="stage-line-inner">
      <div class="stage-line-left">
        <span class="stage-pill">STAGE</span>
        <span class="stage-name"><?php echo esc_html( $stage ); ?></span>
        <a href="<?php echo esc_url( $service_link ); ?>" class="stage-link">Part of CMMC compliance services &rarr;</a>
      </div>
      <div class="stage-line-right">
        <span class="stage-eyebrow"><?php echo esc_html( $title ); ?></span>
        <p class="stage-sentence"><?php echo esc_html( $line ); ?></p>
        <a href="<?php echo esc_url( $process_link ); ?>" class="stage-link-subtle">See the full CMMC 8-step process &rarr;</a>
      </div>
    </div>
  </div>
</section>
