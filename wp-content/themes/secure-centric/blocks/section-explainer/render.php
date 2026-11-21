<?php
/**
 * Render Template for Section Explainer Block
 * Strictly matches demo/assets/js/app.js case 'text'
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = isset( $attributes['eyebrow'] ) ? trim( str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) ) : '';
$title   = ! empty( $attributes['title'] ) ? $attributes['title'] : 'What is CMMC compliance?';
$heading_level = ! empty( $attributes['headingLevel'] ) && in_array( strtolower( $attributes['headingLevel'] ), array( 'h2', 'h3', 'h4' ), true ) ? strtolower( $attributes['headingLevel'] ) : ( ! empty( $attributes['level'] ) && in_array( strtolower( $attributes['level'] ), array( 'h2', 'h3', 'h4' ), true ) ? strtolower( $attributes['level'] ) : 'h2' );

$paras = array();
if ( ! empty( $attributes['parasData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['parasData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['parasData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $paras = $decoded;
    }
}

if ( empty( $paras ) ) {
    if ( ! empty( $attributes['p1'] ) ) {
        $paras[] = $attributes['p1'];
    }
    if ( ! empty( $attributes['p2'] ) ) {
        $paras[] = $attributes['p2'];
    }
    if ( ! empty( $attributes['p3'] ) ) {
        $paras[] = $attributes['p3'];
    }
    if ( ! empty( $attributes['p4'] ) ) {
        $paras[] = $attributes['p4'];
    }
    if ( ! empty( $attributes['p5'] ) ) {
        $paras[] = $attributes['p5'];
    }
    if ( empty( $paras ) && ! empty( $attributes['desc'] ) ) {
        $paras[] = $attributes['desc'];
    }
    if ( empty( $paras ) && ! empty( $attributes['n'] ) ) {
        $paras[] = $attributes['n'];
    }
}

if ( empty( $paras ) ) {
    $paras = array(
        'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense subcontractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).',
        'Under 32 CFR Part 170 and DFARS 252.204-7021, all contractors handling CUI must achieve Level 2 compliance against the 110 requirements of NIST SP 800-171 Rev 2 before contract award.',
        'Our Cyber AB Registered Practitioners conduct on-site facility walkthroughs, map exact CUI boundaries, guide technical remediation, and co-author your assessor-ready System Security Plan (SSP).'
    );
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow = sc_clean_text( $eyebrow );
    $title   = sc_clean_text( $title );
    $paras   = sc_clean_text( $paras );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';

$cta_text = ! empty( $attributes['ctaText'] ) ? trim( (string) $attributes['ctaText'] ) : '';
$default_booking = function_exists( 'sc_get_booking_url' ) ? sc_get_booking_url() : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';
$cta_url  = ! empty( $attributes['ctaUrl'] ) ? ( function_exists( 'sc_resolve_page_url' ) ? sc_resolve_page_url( $attributes['ctaUrl'] ) : $attributes['ctaUrl'] ) : $default_booking;

if ( ! function_exists( 'sc_render_explainer_paragraphs' ) ) {
    function sc_render_explainer_paragraphs( $text ) {
        if ( empty( trim( (string) $text ) ) ) {
            return '';
        }

        // If HTML list tags are already present, trust wp_kses_post with wpautop
        if ( preg_match( '/<\s*(ul|ol|li)\b[^>]*>/i', $text ) ) {
            return wp_kses_post( wpautop( $text ) );
        }

        $lines = preg_split( '/\r\n|\r|\n/', trim( (string) $text ) );
        $output = '';
        $in_list = false;
        $list_type = 'ul';
        $p_buffer = array();

        $flush_p = function() use ( &$output, &$p_buffer ) {
            if ( ! empty( $p_buffer ) ) {
                $output .= '<p style="font-size: 1.0625rem; line-height: 1.75; color: var(--color-body-text); margin-bottom: 20px;">' . implode( '<br>', $p_buffer ) . "</p>\n";
                $p_buffer = array();
            }
        };

        $close_list = function() use ( &$output, &$in_list, &$list_type ) {
            if ( $in_list ) {
                $output .= "</" . $list_type . ">\n";
                $in_list = false;
            }
        };

        foreach ( $lines as $line ) {
            $trimmed = trim( $line );
            if ( '' === $trimmed ) {
                $flush_p();
                $close_list();
                continue;
            }

            // Check for bullet: -, *, •, –, +
            if ( preg_match( '/^([-*•–+]\s*|\x{2022}\s*)(.*)$/u', $trimmed, $m ) ) {
                $flush_p();
                if ( ! $in_list || 'ul' !== $list_type ) {
                    $close_list();
                    $output .= "<ul class=\"explainer-list\" style=\"list-style: disc; margin: 0 0 24px 28px; padding: 0;\">\n";
                    $in_list = true;
                    $list_type = 'ul';
                }
                $item_content = preg_replace( '/\*\*(.*?)\*\*/', '<strong>$1</strong>', $m[2] );
                $output .= '  <li style="font-size: 1.0625rem; line-height: 1.7; color: var(--color-body-text); margin-bottom: 10px; padding-left: 6px;">' . wp_kses_post( $item_content ) . "</li>\n";
            }
            // Check for numbered list: 1. or 1)
            elseif ( preg_match( '/^(\d+[\.)]\s+)(.*)$/', $trimmed, $m ) ) {
                $flush_p();
                if ( ! $in_list || 'ol' !== $list_type ) {
                    $close_list();
                    $output .= "<ol class=\"explainer-list\" style=\"list-style: decimal; margin: 0 0 24px 28px; padding: 0;\">\n";
                    $in_list = true;
                    $list_type = 'ol';
                }
                $item_content = preg_replace( '/\*\*(.*?)\*\*/', '<strong>$1</strong>', $m[2] );
                $output .= '  <li style="font-size: 1.0625rem; line-height: 1.7; color: var(--color-body-text); margin-bottom: 10px; padding-left: 6px;">' . wp_kses_post( $item_content ) . "</li>\n";
            } else {
                $close_list();
                $p_content = preg_replace( '/\*\*(.*?)\*\*/', '<strong>$1</strong>', $trimmed );
                $p_buffer[] = wp_kses_post( $p_content );
            }
        }

        $flush_p();
        $close_list();

        return $output;
    }
}
?>

<section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/section-explainer"<?php echo $anchor_attr; ?>>
  <div class="site-container">
    <?php if ( ! empty( $eyebrow ) ) : ?>
    <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
    <?php endif; ?>
    <<?php echo esc_attr( $heading_level ); ?> class="section-explainer-title" style="margin-bottom: 24px; color: var(--color-navy); <?php echo 'h3' === $heading_level ? 'font-size: clamp(1.4rem, 2.2vw, 1.85rem); font-weight: 700; line-height: 1.35;' : 'font-size: clamp(1.75rem, 2.8vw, 2.25rem); font-weight: 800; line-height: 1.25;'; ?>"><?php echo esc_html( $title ); ?></<?php echo esc_attr( $heading_level ); ?>>
    <div class="section-explainer-content">
      <?php foreach ( $paras as $para ) : ?>
        <?php echo sc_render_explainer_paragraphs( $para ); ?>
      <?php endforeach; ?>
    </div>
    <?php if ( ! empty( $cta_text ) ) : ?>
    <div class="section-explainer-cta" style="margin-top: 32px;">
      <a href="<?php echo esc_url( $cta_url ); ?>" class="btn btn-primary btn-lg"><?php echo esc_html( $cta_text ); ?></a>
    </div>
    <?php endif; ?>
  </div>
</section>
