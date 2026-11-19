<?php
/**
 * Render Template for Consultant Selection Scorer (7 Checks)
 * Strictly matches demo/assets/js/app.js renderTool
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow  = isset( $attributes['eyebrow'] ) ? trim( str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) ) : '// DECISION FRAMEWORK';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'How to choose a CMMC consultant: 7 key points';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Choosing a consultant for a sales presentation alone makes it difficult to compare firms. Apply the same checks to every provider.';
$btn_text = ! empty( $attributes['btnText'] ) ? $attributes['btnText'] : 'Book a Discovery Call →';
$btn_url  = ! empty( $attributes['btnUrl'] ) ? $attributes['btnUrl'] : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';

$show_badge   = isset( $attributes['showBadge'] ) ? (bool) $attributes['showBadge'] : true;
$badge_text   = isset( $attributes['badgeText'] ) ? $attributes['badgeText'] : 'Secure-Centric Verified';
$score_val    = isset( $attributes['scoreVal'] ) ? $attributes['scoreVal'] : '7 / 7';
$score_sub    = isset( $attributes['scoreSub'] ) ? $attributes['scoreSub'] : 'Full Compliance';
$result_title = isset( $attributes['resultTitle'] ) ? $attributes['resultTitle'] : '100% Verified CMMC Advisory Standard';
$result_desc  = isset( $attributes['resultDesc'] ) ? $attributes['resultDesc'] : 'The perfect choice is the firm that can explain how your engagement will run, show useful work samples, name the people responsible, and state what it will not do.';

$checks = array();
if ( ! empty( $attributes['checksData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['checksData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['checksData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $checks = $decoded;
    }
}

if ( empty( $checks ) ) {
    $checks = array(
        array( 'label' => 'Verify Cyber AB status', 'desc' => 'Confirm the organization\'s current listing and ask which credentialed people will work on your account.' ),
        array( 'label' => 'Ask who owns the engagement', 'desc' => 'You should know the name and role of your day-to-day CMMC advisor before signing.' ),
        array( 'label' => 'Request a written scope method', 'desc' => 'The provider should explain how it traces contracts, CUI, systems, users, facilities, and outside services.' ),
        array( 'label' => 'Inspect sample deliverables', 'desc' => 'Review redacted examples of an SSP section, gap register, evidence request, or remediation tracker.' ),
        array( 'label' => 'Separate preparation from assessment', 'desc' => 'A consultant prepares you. An independent C3PAO performs the official Level 2 certification assessment.' ),
        array( 'label' => 'Define the implementation boundary', 'desc' => 'Ask which tasks the consultant performs, which belong to your IT team or MSP, and how work is validated.' ),
        array( 'label' => 'Check how evidence is managed', 'desc' => 'Ask where evidence is stored, how it is linked to requirements, and how environment changes are recorded.' ),
    );
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow      = sc_clean_text( $eyebrow );
    $title        = sc_clean_text( $title );
    $subtitle     = sc_clean_text( $subtitle );
    $btn_text     = sc_clean_text( $btn_text );
    $badge_text   = sc_clean_text( $badge_text );
    $score_val    = sc_clean_text( $score_val );
    $score_sub    = sc_clean_text( $score_sub );
    $result_title = sc_clean_text( $result_title );
    $result_desc  = sc_clean_text( $result_desc );
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/consultant-scorer">
  <div class="site-container">
    <div class="section-header-center" style="margin-bottom: 36px; text-align: center;">
      <?php if ( ! empty( $eyebrow ) ) : ?>
      <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
      <?php endif; ?>
      <h2 style="margin-bottom: 12px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); max-width: 650px; margin: 0 auto;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="tool-scorer-card">
      <div class="scorer-list">
        <?php foreach ( $checks as $i => $c ) : ?>
          <?php 
          $lbl  = is_array( $c ) && ! empty( $c['label'] ) ? $c['label'] : ( is_string( $c ) ? $c : '' ); 
          $desc = is_array( $c ) && ! empty( $c['desc'] ) ? $c['desc'] : '';
          $num  = ( $i + 1 < 10 ) ? '0' . ( $i + 1 ) : ( $i + 1 );
          ?>
          <label class="scorer-item" style="align-items: flex-start;">
            <input type="checkbox" checked disabled class="scorer-check" style="margin-top: 3px; flex-shrink: 0;" />
            <div class="scorer-label" style="flex: 1;">
              <strong style="color: var(--color-navy);"><?php echo esc_html( $num ); ?>.</strong> <span style="font-weight: 600; color: var(--color-navy);"><?php echo esc_html( $lbl ); ?></span>
              <?php if ( ! empty( $desc ) ) : ?>
                <div style="font-size: 0.84rem; color: var(--color-body-text); margin-top: 4px; line-height: 1.5; font-weight: normal;"><?php echo esc_html( $desc ); ?></div>
              <?php endif; ?>
            </div>
            <?php if ( $show_badge && ! empty( $badge_text ) ) : ?>
              <span class="scorer-status-pass" style="white-space: nowrap; flex-shrink: 0; align-self: flex-start; margin-top: 2px;">&check; <?php echo esc_html( $badge_text ); ?></span>
            <?php endif; ?>
          </label>
        <?php endforeach; ?>
      </div>
      <div class="scorer-result-box">
        <?php if ( ! empty( $score_val ) || ! empty( $score_sub ) ) : ?>
        <div class="scorer-score-circle">
          <?php if ( ! empty( $score_val ) ) : ?>
          <span class="score-val"><?php echo esc_html( $score_val ); ?></span>
          <?php endif; ?>
          <?php if ( ! empty( $score_sub ) ) : ?>
          <span class="score-sub"><?php echo esc_html( $score_sub ); ?></span>
          <?php endif; ?>
        </div>
        <?php endif; ?>
        <?php if ( ! empty( $result_title ) ) : ?>
        <h4 style="color: var(--color-navy); font-size: 1.15rem; margin-bottom: 10px; font-weight: 700;"><?php echo esc_html( $result_title ); ?></h4>
        <?php endif; ?>
        <?php if ( ! empty( $result_desc ) ) : ?>
        <p style="color: var(--color-body-text); font-size: 0.9375rem; line-height: 1.6; margin-bottom: 18px;">
          <?php echo nl2br( esc_html( $result_desc ) ); ?>
        </p>
        <?php endif; ?>
        <?php if ( ! empty( $btn_text ) ) : ?>
        <a href="<?php echo esc_url( $btn_url ); ?>" class="btn btn-primary" style="width: 100%; text-align: center; justify-content: center;" target="_blank" rel="noopener noreferrer"><?php echo esc_html( $btn_text ); ?></a>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>
