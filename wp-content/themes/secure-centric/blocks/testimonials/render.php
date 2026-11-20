<?php
/**
 * Render Template for Testimonials Block
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$display_mode = ! empty( $attributes['displayMode'] ) ? $attributes['displayMode'] : 'carousel';
$eyebrow = isset( $attributes['eyebrow'] ) ? trim( str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) ) : '// CLIENT TESTIMONIALS';
$title        = ! empty( $attributes['title'] ) ? $attributes['title'] : 'What Defense Contractors Say About Working With Us';

$default_reviews = array(
    array(
        'num'          => '01',
        'quote'        => 'Secure-Centric gave us absolute clarity on what was inside our CUI boundary and what was not. We passed our official C3PAO Level 2 assessment on the first attempt with zero open items.',
        'author'       => 'Alex Liu',
        'role'         => 'IT Manager, Tower Semiconductor',
        'avatar'       => 'AL',
        'linkedin_url' => '',
        'linkedin_text'=> '',
    ),
    array(
        'num'          => '02',
        'quote'        => "Their team was on site at our facility within two weeks. They didn't hand us generic compliance templates—they helped configure our actual firewalls, SIEM, and author an ironclad SSP.",
        'author'       => 'Patrick Shaw',
        'role'         => 'Cyber Security Analyst, Safran Federal Systems',
        'avatar'       => 'PS',
        'linkedin_url' => '',
        'linkedin_text'=> '',
    ),
    array(
        'num'          => '03',
        'quote'        => 'We cut our assessment scope by almost 40% based on their enclave advisory alone. That decision alone saved us at least $80,000 in unnecessary software upgrades and audit fees.',
        'author'       => 'Elena Rostova',
        'role'         => 'VP Operations, Precision Aero Machining',
        'avatar'       => 'ER',
        'linkedin_url' => '',
        'linkedin_text'=> '',
    ),
    array(
        'num'          => '04',
        'quote'        => "The mock C3PAO interview sessions were intense and realistic. When DIBCAC conducted our actual review, there wasn't a single question or evidence request that we hadn't already prepared for.",
        'author'       => 'Marcus Vance',
        'role'         => 'Chief Information Officer, Vanguard Defense Tech',
        'avatar'       => 'MV',
        'linkedin_url' => 'https://www.linkedin.com/company/secure-centric/',
        'linkedin_text'=> 'Shared publicly on LinkedIn',
    ),
    array(
        'num'          => '05',
        'quote'        => 'Finding an RPO that actually understands precision CNC shop floor networks is rare. Secure-Centric bridged the gap between our machinists, IT, and Department of War compliance seamlessly.',
        'author'       => 'David Chen',
        'role'         => 'Director of Compliance, Apex Dynamics',
        'avatar'       => 'DC',
        'linkedin_url' => 'https://www.linkedin.com/company/secure-centric/',
        'linkedin_text'=> 'Shared publicly on LinkedIn',
    ),
);

$reviews = array();
if ( ! empty( $attributes['testimonialsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['testimonialsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['testimonialsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        foreach ( $decoded as $idx => $item ) {
            $url = ! empty( $item['linkedinUrl'] ) ? trim( $item['linkedinUrl'] ) : ( ! empty( $item['linkedin_url'] ) ? trim( $item['linkedin_url'] ) : '' );
            if ( '#' === $url ) {
                $url = '';
            }
            $reviews[] = array(
                'num'          => ! empty( $item['num'] ) ? $item['num'] : sprintf( '%02d', $idx + 1 ),
                'quote'        => ! empty( $item['quote'] ) ? $item['quote'] : '',
                'author'       => ! empty( $item['author'] ) ? $item['author'] : ( ! empty( $item['name'] ) ? $item['name'] : '' ),
                'role'         => ! empty( $item['role'] ) ? $item['role'] : '',
                'avatar'       => ! empty( $item['avatar'] ) ? $item['avatar'] : ( ! empty( $item['author'] ) ? strtoupper( substr( $item['author'], 0, 2 ) ) : 'SC' ),
                'linkedin_url' => $url,
                'linkedin_text'=> ! empty( $item['linkedinText'] ) ? $item['linkedinText'] : ( ! empty( $item['linkedin_text'] ) ? $item['linkedin_text'] : 'Shared publicly on LinkedIn' ),
            );
        }
    }
}

if ( empty( $reviews ) ) {
    $reviews = $default_reviews;
}

if ( ! function_exists( 'sc_render_testimonial_card' ) ) {
    function sc_render_testimonial_card( $rev, $index ) {
        ob_start();
        ?>
        <div class="testimonial-card" data-index="<?php echo esc_attr( $index ); ?>">
          <div class="testimonial-card-header">
            <span class="testimonial-num"><?php echo esc_html( $rev['num'] ); ?></span>
            <span class="testimonial-quote-icon" aria-hidden="true">“</span>
          </div>
          <div class="testimonial-body">
            <p class="testimonial-quote-text"><?php echo esc_html( $rev['quote'] ); ?></p>
          </div>
          <div class="testimonial-card-divider"></div>
          <div class="testimonial-footer-row">
            <div class="testimonial-avatar" aria-hidden="true"><?php echo esc_html( $rev['avatar'] ); ?></div>
            <div class="testimonial-author-meta">
              <div class="testimonial-author-name"><?php echo esc_html( $rev['author'] ); ?></div>
              <div class="testimonial-author-role"><?php echo esc_html( $rev['role'] ); ?></div>
              <?php if ( ! empty( $rev['linkedin_text'] ) || ! empty( $rev['linkedin_url'] ) ) : ?>
                <?php $l_text = ! empty( $rev['linkedin_text'] ) ? $rev['linkedin_text'] : 'Shared publicly on LinkedIn'; ?>
                <span class="testimonial-linkedin-link" style="color: #0A66C2; cursor: default; user-select: text;">
                  <?php echo esc_html( $l_text ); ?>
                </span>
              <?php endif; ?>
            </div>
          </div>
        </div>
        <?php
        return ob_get_clean();
    }
}
?>

<?php if ( 'quote-banner' === $display_mode || 'banner' === $display_mode ) : ?>
  <section class="section-ice py-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'ice'}" data-wp-pattern="secure-centric/testimonial-quote-banner" id="testimonial-quote-banner" style="border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
    <div class="site-container">
      <div style="max-width: 860px; margin: 0 auto; text-align: center; padding: 16px 0;">
        <div style="font-size: 3.5rem; color: var(--color-electric-blue); line-height: 1; font-family: Georgia, serif; margin-bottom: 8px;">“</div>
        <blockquote style="font-size: clamp(1.2rem, 2.2vw, 1.55rem); font-weight: 600; color: var(--color-navy); line-height: 1.55; margin: 0 0 24px; font-style: normal;">
          <?php echo esc_html( ! empty( $reviews[0]['quote'] ) ? $reviews[0]['quote'] : 'Secure-Centric gave us complete clarity on our CUI boundaries in one conversation. We avoided months of unnecessary expense and knew exactly what needed protection.' ); ?>
        </blockquote>
        <div style="font-family: var(--font-primary); font-size: 1rem; color: var(--color-body-text);">
          <strong style="color: var(--color-navy);"><?php echo esc_html( ! empty( $reviews[0]['author'] ) ? $reviews[0]['author'] : 'Marcus Vance' ); ?></strong><?php if ( ! empty( $reviews[0]['role'] ) ) : ?><span style="color: var(--color-slate);">, <?php echo esc_html( $reviews[0]['role'] ); ?></span><?php endif; ?>
        </div>
      </div>
    </div>
  </section>
<?php elseif ( 'grid' === $display_mode ) : ?>
  <section class="section-ice py-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'ice'}" data-wp-pattern="secure-centric/testimonials-grid" id="testimonials-section">
    <div class="site-container">
      <div class="section-heading-center" style="margin-bottom: 40px; text-align: center;">
        <?php if ( ! empty( $eyebrow ) ) : ?>
        <span class="section-eyebrow" style="justify-content: center;"><?php echo esc_html( $eyebrow ); ?></span>
        <?php endif; ?>
        <h2><?php echo esc_html( $title ); ?></h2>
        <p style="color: var(--color-slate); max-width: 600px; margin: 8px auto 0; font-size: 1.05rem;">
          <?php echo esc_html( ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Real feedback from C-level executives and IT leadership across the defense industrial base.' ); ?>
        </p>
      </div>
      <div class="testimonials-static-grid">
        <?php foreach ( $reviews as $idx => $rev ) : ?>
          <?php echo sc_render_testimonial_card( $rev, $idx ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
<?php else : ?>
  <section class="section-ice py-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'ice'}" data-wp-pattern="secure-centric/testimonials-carousel" id="testimonials-section">
    <div class="site-container">
      <div class="testimonials-header-row">
        <div>
          <?php if ( ! empty( $eyebrow ) ) : ?>
          <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
          <?php endif; ?>
          <h2><?php echo esc_html( $title ); ?></h2>
          <?php if ( ! empty( $attributes['subtitle'] ) ) : ?>
            <p style="color: var(--color-body-text); font-size: 1.05rem; margin-top: 8px;"><?php echo esc_html( $attributes['subtitle'] ); ?></p>
          <?php endif; ?>
        </div>
      </div>
    </div>
    <?php $hold_delay = ! empty( $attributes['holdDelay'] ) ? intval( $attributes['holdDelay'] ) : 8000; ?>
    <div class="testimonials-carousel-container" data-hold-delay="<?php echo esc_attr( $hold_delay ); ?>" onmouseenter="this.querySelector('.testimonials-carousel-track')?.classList.add('is-paused')" onmouseleave="this.querySelector('.testimonials-carousel-track')?.classList.remove('is-paused')" onclick="this.querySelector('.testimonials-carousel-track')?.classList.toggle('is-paused')">
      <div class="testimonials-carousel-track" role="region" aria-label="Client Testimonials Carousel">
        <?php
        $count = count( $reviews );
        // Repeat at least twice (or enough to fill track) for smooth infinite loop marquee
        $repeats = ( $count < 4 ) ? 3 : 2;
        for ( $cycle = 0; $cycle < $repeats; $cycle++ ) {
            foreach ( $reviews as $idx => $rev ) {
                echo sc_render_testimonial_card( $rev, $idx + ( $cycle * $count ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            }
        }
        ?>
      </div>
    </div>
  </section>
<?php endif; ?>
