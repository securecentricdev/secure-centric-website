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
        'quote'        => 'Preparing for CMMC Level 2 certification is a monumental task, but Secure-Centric made all the difference for our organization.',
        'author'       => 'Alex Liu',
        'role'         => 'IT Manager, Tower Semiconductor',
        'avatar'       => 'AL',
        'linkedin_url' => '',
        'linkedin_text'=> '',
    ),
    array(
        'num'          => '02',
        'quote'        => 'Working with Secure-Centric felt like a true partnership rather than another vendor relationship. They challenged us when needed, helped us work through areas where we were unsure, and kept us focused on meeting the requirements rather than simply checking boxes.',
        'author'       => 'Patrick Shaw',
        'role'         => 'Cyber Security Analyst, Safran Federal Systems',
        'avatar'       => 'PS',
        'linkedin_url' => '',
        'linkedin_text'=> '',
    ),
    array(
        'num'          => '03',
        'quote'        => 'Secure-Centric takes the time to understand your business, your existing technology, and your unique requirements before helping you develop a program tailored to your needs. Rather than selling you products or solutions you may not need, Secure-Centric focuses on providing the guidance, knowledge, and practical expertise necessary to help you make informed decisions.',
        'author'       => 'Rafael Omar Lemus',
        'role'         => 'IT Director, Goodwin & Associates',
        'avatar'       => 'RL',
        'linkedin_url' => '',
        'linkedin_text'=> '',
    ),
    array(
        'num'          => '04',
        'quote'        => 'I would like to thank Secure-Centric and Desmond Thompson, who guided us through the preparation stages for the certification, even before the external assessment.',
        'author'       => 'Regina Amosi',
        'role'         => 'CISO, Tower Semiconductor',
        'avatar'       => 'RA',
        'linkedin_url' => '',
        'linkedin_text'=> 'Shared publicly on LinkedIn',
    ),
    array(
        'num'          => '05',
        'quote'        => "Secure-Centric has made our CMMC journey less painful than I would've expected.",
        'author'       => 'Albert Leon',
        'role'         => 'Chief Information Officer, HRD Aero Systems, Inc.',
        'avatar'       => 'AL',
        'linkedin_url' => '',
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
            <span class="testimonial-quote-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.533-4.2 3.659-4.382 5.068.558-.293 1.258-.387 1.954-.263 1.637.29 2.766 1.678 2.628 3.322-.14 1.666-1.558 2.946-3.238 2.871a3.468 3.468 0 0 1-2.302-.878zM15.583 17.321C14.553 16.227 14 15 14 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.324 1.533-4.2 3.659-4.382 5.068.558-.293 1.258-.387 1.954-.263 1.637.29 2.766 1.678 2.628 3.322-.14 1.666-1.558 2.946-3.238 2.871a3.468 3.468 0 0 1-2.302-.878z"/>
              </svg>
            </span>
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
                <span class="testimonial-linkedin-link" style="color: #00D4FF; cursor: default; user-select: text;">
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
  <section class="section-ice py-section wp-block-inspect wp-pattern-inspect testimonials-section-compact" data-wp-block="wp:group {align:'full', backgroundColor:'ice'}" data-wp-pattern="secure-centric/testimonials-carousel" id="testimonials-section">
    <div class="site-container">
      <div class="testimonials-header-row">
        <div>
          <?php if ( ! empty( $eyebrow ) ) : ?>
          <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
          <?php endif; ?>
          <h2><?php echo esc_html( $title ); ?></h2>
          <?php if ( ! empty( $attributes['subtitle'] ) ) : ?>
            <p style="color: var(--color-body-text); font-size: 1.05rem; margin-top: 6px;"><?php echo esc_html( $attributes['subtitle'] ); ?></p>
          <?php endif; ?>
        </div>
        <div class="testimonials-nav-controls" aria-label="Testimonial navigation">
          <button type="button" class="testimonial-nav-btn prev" aria-label="Previous testimonial">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button type="button" class="testimonial-nav-btn next" aria-label="Next testimonial">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <?php $hold_delay = ! empty( $attributes['holdDelay'] ) ? intval( $attributes['holdDelay'] ) : 4500; ?>
      <div class="testimonials-carousel-container" data-hold-delay="<?php echo esc_attr( $hold_delay ); ?>">
        <div class="testimonials-carousel-track" role="region" aria-label="Client Testimonials Carousel">
          <?php
          $count = count( $reviews );
          // Repeat 3 times to allow smooth continuous infinite stepping
          for ( $cycle = 0; $cycle < 3; $cycle++ ) {
              foreach ( $reviews as $idx => $rev ) {
                  echo sc_render_testimonial_card( $rev, $idx + ( $cycle * $count ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
              }
          }
          ?>
        </div>
      </div>

      <div class="testimonials-dots" aria-label="Testimonial pagination">
        <?php for ( $d = 0; $d < $count; $d++ ) : ?>
          <button type="button" class="testimonial-dot<?php echo ( 1 === $d ? ' is-active' : '' ); ?>" data-index="<?php echo esc_attr( $d ); ?>" aria-label="Go to testimonial <?php echo esc_attr( $d + 1 ); ?>"></button>
        <?php endfor; ?>
      </div>
    </div>
  </section>
<?php endif; ?>
