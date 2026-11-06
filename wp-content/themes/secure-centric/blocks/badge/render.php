<?php
/**
 * Render Template for Accreditation Badge Strip Block
 * Strictly matches demo/assets/js/app.js renderBadge
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$shield = ! empty( $attributes['shieldText'] ) ? $attributes['shieldText'] : '🛡️ Cyber AB Registered Provider Organization · CPN #3942';
$meta   = ! empty( $attributes['metaText'] ) ? $attributes['metaText'] : 'Formally Reviewed: November 2026 · 32 CFR 170 Compliant';
?>

<div class="badge-line-strip wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/accreditation-badge">
  <div class="site-container">
    <div class="badge-line-inner">
      <span class="badge-shield"><?php echo esc_html( $shield ); ?></span>
      <span class="badge-meta"><?php echo esc_html( $meta ); ?></span>
    </div>
  </div>
</div>
