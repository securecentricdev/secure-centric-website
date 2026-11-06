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
$eyebrow      = ! empty( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '// CLIENT TESTIMONIALS';
$title        = ! empty( $attributes['title'] ) ? $attributes['title'] : 'What Defense Contractors Say About Working With Us';

$default_reviews = array(
    array(
        'num'          => '01',
        'quote'        => 'Secure-Centric gave us absolute clarity on what was inside our CUI boundary and what was not. We passed our official C3PAO Level 2 assessment on the first attempt with zero open items.',
        'author'       => 'Alex Liu',
        'role'         => 'IT Manager, Tower Semiconductor',
        'avatar'       => 'AL',
        'linkedin_url' => 'https://www.linkedin.com/company/secure-centric/',
        'linkedin_text'=> 'Shared publicly on LinkedIn',
    ),
    array(
        'num'          => '02',
        'quote'        => "Their team was on site at our facility within two weeks. They didn't hand us generic compliance templates—they helped configure our actual firewalls, SIEM, and author an ironclad SSP.",
        'author'       => 'Patrick Shaw',
        'role'         => 'Cyber Security Analyst, Safran Federal Systems',
        'avatar'       => 'PS',
        'linkedin_url' => 'https://www.linkedin.com/company/secure-centric/',
        'linkedin_text'=> 'Shared publicly on LinkedIn',
    ),
    array(
        'num'          => '03',
        'quote'        => 'We cut our assessment scope by almost 40% based on their enclave advisory alone. That decision alone saved us at least $80,000 in unnecessary software upgrades and audit fees.',
        'author'       => 'Elena Rostova',
        'role'         => 'VP Operations, Precision Aero Machining',
        'avatar'       => 'ER',
        'linkedin_url' => 'https://www.linkedin.com/company/secure-centric/',
        'linkedin_text'=> 'Shared publicly on LinkedIn',
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
    $decoded = json_decode( $attributes['testimonialsData'], true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        foreach ( $decoded as $idx => $item ) {
            $reviews[] = array(
                'num'          => sprintf( '%02d', $idx + 1 ),
                'quote'        => ! empty( $item['quote'] ) ? $item['quote'] : '',
                'author'       => ! empty( $item['author'] ) ? $item['author'] : '',
                'role'         => ! empty( $item['role'] ) ? $item['role'] : '',
                'avatar'       => ! empty( $item['avatar'] ) ? $item['avatar'] : ( ! empty( $item['author'] ) ? strtoupper( substr( $item['author'], 0, 2 ) ) : 'SC' ),
                'linkedin_url' => ! empty( $item['linkedinUrl'] ) ? $item['linkedinUrl'] : '',
                'linkedin_text'=> ! empty( $item['linkedinText'] ) ? $item['linkedinText'] : 'Shared publicly on LinkedIn',
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
              <?php if ( ! empty( $rev['linkedin_url'] ) ) : ?>
                <a href="<?php echo esc_url( $rev['linkedin_url'] ); ?>" target="_blank" rel="noopener noreferrer" class="testimonial-linkedin-link" title="<?php echo esc_attr( $rev['linkedin_text'] ); ?>" onclick="event.stopPropagation();">
                  <svg class="linkedin-badge-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect width="16" height="16" rx="3" fill="#0A66C2"></rect>
                    <path d="M4.6 6.3H2.5V13H4.6V6.3Z" fill="white"></path>
                    <path d="M3.55 5.4C4.24 5.4 4.8 4.84 4.8 4.15C4.8 3.46 4.24 2.9 3.55 2.9C2.86 2.9 2.3 3.46 2.3 4.15C2.3 4.84 2.86 5.4 3.55 5.4Z" fill="white"></path>
                    <path d="M8.1 6.3H6.1V13H8.1V9.5C8.1 7.6 10.5 7.4 10.5 9.5V13H12.6V8.6C12.6 5.2 8.7 5.3 8.1 6.9V6.3Z" fill="white"></path>
                  </svg>
                  <span><?php echo esc_html( $rev['linkedin_text'] ); ?></span>
                </a>
              <?php endif; ?>
            </div>
          </div>
        </div>
        <?php
        return ob_get_clean();
    }
}
?>

<section class="section-ice py-section wp-block-inspect wp-pattern-inspect" data-wp-block="wp:group {align:'full', backgroundColor:'ice'}" data-wp-pattern="secure-centric/testimonials-carousel" id="testimonials-section">
  <div class="site-container">
    <div class="testimonials-header-row">
      <div>
        <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
        <h2><?php echo esc_html( $title ); ?></h2>
      </div>
    </div>
  </div>

  <?php if ( 'grid' === $display_mode ) : ?>
    <div class="site-container" style="margin-top: 32px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
        <?php foreach ( $reviews as $idx => $rev ) : ?>
          <?php echo sc_render_testimonial_card( $rev, $idx ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        <?php endforeach; ?>
      </div>
    </div>
  <?php else : ?>
    <div class="testimonials-carousel-container" onmouseenter="this.querySelector('.testimonials-carousel-track')?.classList.add('is-paused')" onmouseleave="this.querySelector('.testimonials-carousel-track')?.classList.remove('is-paused')" onclick="this.querySelector('.testimonials-carousel-track')?.classList.toggle('is-paused')">
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
  <?php endif; ?>
</section>
