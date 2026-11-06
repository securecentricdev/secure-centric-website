<?php
/**
 * Render Template for Compliance Tiers Block
 * Strictly matches demo/assets/js/app.js renderTiers
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = ! empty( $attributes['eyebrow'] ) ? str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) : '// COMPLIANCE TIERS';
$title   = ! empty( $attributes['title'] ) ? $attributes['title'] : 'By CMMC Level: Where Your Contract Puts You';

$items = array();
if ( ! empty( $attributes['tiersData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['tiersData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['tiersData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $items = $decoded;
    }
}

if ( empty( $items ) ) {
    $items = array(
        array( 'Level 1 (FCI)', '15 basic safeguarding controls from FAR 52.204-21. Annual self-assessment required in SPRS with executive affirmation.' ),
        array( 'Level 2 (CUI Prioritized)', '110 controls from NIST SP 800-171 Rev 2. Mandatory triennial C3PAO third-party audit before contract award.' ),
        array( 'Level 2 (CUI Non-Prioritized)', '110 controls from NIST SP 800-171 Rev 2. Annual self-assessment with affirmation submitted directly to SPRS.' ),
        array( 'Level 3 (High-Value CUI)', 'Level 2 requirements plus subsets of NIST SP 800-172. Official DIBCAC assessment led directly by the Department of War.' ),
    );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:columns {columns:4}">
  <div class="site-container">
    <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
    <h2 style="margin-bottom: 32px;"><?php echo esc_html( $title ); ?></h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
      <?php foreach ( $items as $t ) : ?>
        <?php
        $level_name = isset( $t[0] ) ? $t[0] : ( isset( $t['name'] ) ? $t['name'] : '' );
        $level_desc = isset( $t[1] ) ? $t[1] : ( isset( $t['desc'] ) ? $t['desc'] : '' );
        ?>
        <div class="card-white" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="badge-chip accent" style="margin-bottom: 12px;"><?php echo esc_html( $level_name ); ?></span>
            <h4 style="margin-bottom: 10px;"><?php echo esc_html( $level_name ); ?> Requirement</h4>
            <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;"><?php echo esc_html( $level_desc ); ?></p>
          </div>
          <div style="margin-top: 20px; border-top: 1px solid var(--color-border); padding-top: 12px;">
            <a href="<?php echo esc_url( home_url( '/services/cmmc-compliance/' ) ); ?>" class="text-link">Explore Level Roadmap &rarr;</a>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
