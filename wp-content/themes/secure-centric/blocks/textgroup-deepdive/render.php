<?php
/**
 * Render Template for Long-Form Deep Dive Analysis Block
 * Strictly matches demo/assets/js/app.js renderTextGroup
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$eyebrow = isset( $attributes['eyebrow'] ) ? trim( str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) ) : '// COMPREHENSIVE COMPLIANCE ANALYSIS';
$title    = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Long-Form Regulatory Analysis';
$subtitle = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : 'Explanations of requirements, timelines, and assessor expectations.';

$sections = array();
if ( ! empty( $attributes['sectionsData'] ) ) {
    $decoded = function_exists( 'sc_decode_block_json' ) ? sc_decode_block_json( $attributes['sectionsData'] ) : json_decode( str_replace( array( '\u0022', 'u0022' ), '"', $attributes['sectionsData'] ), true );
    if ( is_array( $decoded ) && ! empty( $decoded ) ) {
        $sections = $decoded;
    }
}

if ( empty( $sections ) ) {
    $sections = array(
        array(
            'title'      => 'Scoping Boundaries & CUI Network Isolation',
            'paragraphs' => array(
                'Under DoD 32 CFR 170.19, scoping is the single most critical factor determining compliance costs and timeline. An uncontrolled network boundary brings every corporate computer, server, and IoT device into audit scope.',
                'Our Registered Practitioners conduct physical on-site inspections of facility cabling, server racks, and workcenters to establish isolated enclaves—dramatically reducing the systems that an Authorized C3PAO must examine.',
            ),
        ),
        array(
            'title'      => 'Technical Safeguards & FIPS-Validated Cryptography',
            'paragraphs' => array(
                'NIST SP 800-171 requires multifactor authentication (IA.L2-3.5.3) for all local and network access to privileged and non-privileged accounts, alongside FIPS 140-2 validated encryption (SC.L2-3.13.11).',
                'We guide your IT team and MSP through configuring cryptographic modules, centralizing SIEM audit log collection, and deploying hardware tokens that assessors accept without objection.',
            ),
        ),
        array(
            'title'      => 'Assessor Evidence Binder & Mock Audit Simulation',
            'paragraphs' => array(
                'A System Security Plan (SSP) is only as defensible as the operational evidence behind it. For all 320 assessment objectives, C3PAO assessors require examination, interview, and test evidence.',
                'Secure-Centric builds your comprehensive Assessor Evidence Binder and conducts a rigorous dress-rehearsal mock audit, ensuring your engineers and leadership speak with confidence on assessment day.',
            ),
        ),
    );
}

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow  = sc_clean_text( $eyebrow );
    $title    = sc_clean_text( $title );
    $subtitle = sc_clean_text( $subtitle );
    $sections = sc_clean_text( $sections );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';

if ( ! function_exists( 'sc_render_deepdive_section_content' ) ) {
    function sc_render_deepdive_section_content( $content ) {
        if ( empty( $content ) ) {
            return '';
        }

        $items = is_array( $content ) ? $content : array( $content );
        $final_output = '';

        foreach ( $items as $raw_chunk ) {
            $text = trim( (string) $raw_chunk );
            if ( '' === $text ) {
                continue;
            }

            // If it already has HTML block tags (<p>, <ul>, <ol>, <div>, <blockquote>), pass through wp_kses_post
            if ( preg_match( '/<\s*(p|ul|ol|li|div|blockquote|table)\b[^>]*>/i', $text ) ) {
                $processed = preg_replace( '/<ul>/i', '<ul class="textgroup-bullets">', $text );
                $final_output .= wp_kses_post( wpautop( $processed ) ) . "\n";
                continue;
            }

            // Parse lines for markdown paragraphs, checklists (✓), bullets (-, *, •), and numbered lists (1.)
            $lines = preg_split( '/\r\n|\r|\n/', $text );
            $in_list = false;
            $list_type = ''; // 'checklist', 'bullets', 'ol'
            $p_buffer = array();

            $flush_p = function() use ( &$final_output, &$p_buffer ) {
                if ( ! empty( $p_buffer ) ) {
                    $final_output .= '<p class="textgroup-para">' . implode( '<br>', $p_buffer ) . "</p>\n";
                    $p_buffer = array();
                }
            };

            $close_list = function() use ( &$final_output, &$in_list, &$list_type ) {
                if ( $in_list ) {
                    if ( 'checklist' === $list_type || 'bullets' === $list_type ) {
                        $final_output .= "</ul>\n";
                    } elseif ( 'ol' === $list_type ) {
                        $final_output .= "</ol>\n";
                    }
                    $in_list = false;
                    $list_type = '';
                }
            };

            foreach ( $lines as $line ) {
                $trimmed = trim( $line );
                if ( '' === $trimmed ) {
                    $flush_p();
                    continue;
                }

                // Check for checkmark: ✓ or ✔ or [x] or [ ]
                if ( preg_match( '/^([✓✔]|\x{2713}|\x{2714}|\[[xX]\])\s*(.*)$/u', $trimmed, $m ) ) {
                    $flush_p();
                    if ( ! $in_list || 'checklist' !== $list_type ) {
                        $close_list();
                        $final_output .= "<ul class=\"textgroup-checklist\">\n";
                        $in_list = true;
                        $list_type = 'checklist';
                    }
                    $item_content = preg_replace( '/\*\*(.*?)\*\*/', '<strong>$1</strong>', $m[2] );
                    $final_output .= '  <li><span class="check-icon">✓</span><span>' . wp_kses_post( $item_content ) . "</span></li>\n";
                }
                // Check for bullet: -, *, •, –, +
                elseif ( preg_match( '/^([-*•–+]|\x{2022})\s+(.*)$/u', $trimmed, $m ) ) {
                    $flush_p();
                    if ( ! $in_list || 'bullets' !== $list_type ) {
                        $close_list();
                        $final_output .= "<ul class=\"textgroup-bullets\">\n";
                        $in_list = true;
                        $list_type = 'bullets';
                    }
                    $item_content = preg_replace( '/\*\*(.*?)\*\*/', '<strong>$1</strong>', $m[2] );
                    $final_output .= '  <li>' . wp_kses_post( $item_content ) . "</li>\n";
                }
                // Check for numbered list: 1. or 1)
                elseif ( preg_match( '/^(\d+[\.)]\s+)(.*)$/', $trimmed, $m ) ) {
                    $flush_p();
                    if ( ! $in_list || 'ol' !== $list_type ) {
                        $close_list();
                        $final_output .= "<ol class=\"textgroup-numbered\">\n";
                        $in_list = true;
                        $list_type = 'ol';
                    }
                    $item_content = preg_replace( '/\*\*(.*?)\*\*/', '<strong>$1</strong>', $m[2] );
                    $final_output .= '  <li>' . wp_kses_post( $item_content ) . "</li>\n";
                } else {
                    $close_list();
                    $p_content = preg_replace( '/\*\*(.*?)\*\*/', '<strong>$1</strong>', $trimmed );
                    $p_buffer[] = wp_kses_post( $p_content );
                }
            }

            $flush_p();
            $close_list();
        }

        return $final_output;
    }
}
?>

<section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/textgroup-deepdive"<?php echo $anchor_attr; ?>>
  <div class="site-container">
    <div class="section-header-left" style="margin-bottom: 40px;">
      <?php if ( ! empty( $eyebrow ) ) : ?>
      <span class="section-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
      <?php endif; ?>
      <h2 style="margin-bottom: 16px;"><?php echo esc_html( $title ); ?></h2>
      <p style="color: var(--color-body-text); font-size: 1.05rem; line-height: 1.7;"><?php echo esc_html( $subtitle ); ?></p>
    </div>
    <div class="textgroup-list">
      <?php foreach ( $sections as $i => $sec ) : ?>
        <?php
        $sec_title = ! empty( $sec['title'] ) ? $sec['title'] : 'Section ' . ( $i + 1 );
        $sec_tag   = ! empty( $sec['tag'] ) ? $sec['tag'] : '';
        $sec_sub   = ! empty( $sec['sub'] ) ? $sec['sub'] : ( ! empty( $sec['subtitle'] ) ? $sec['subtitle'] : '' );

        $raw_content = '';
        if ( isset( $sec['body'] ) && '' !== $sec['body'] ) {
            $raw_content = $sec['body'];
        } elseif ( isset( $sec['content'] ) && '' !== $sec['content'] ) {
            $raw_content = $sec['content'];
        } elseif ( isset( $sec['paragraphs'] ) && ! empty( $sec['paragraphs'] ) ) {
            $raw_content = $sec['paragraphs'];
        } elseif ( isset( $sec['desc'] ) && '' !== $sec['desc'] ) {
            $raw_content = $sec['desc'];
        } elseif ( isset( $sec['text'] ) && '' !== $sec['text'] ) {
            $raw_content = $sec['text'];
        }
        ?>
        <div class="textgroup-item">
          <?php if ( ! empty( $sec_tag ) ) : ?>
            <span class="textgroup-item-tag" style="display: inline-block; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--color-electric-blue); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">// <?php echo esc_html( $sec_tag ); ?></span>
          <?php endif; ?>
          <h3 class="textgroup-title"><?php echo esc_html( $sec_title ); ?></h3>
          <?php if ( ! empty( $sec_sub ) ) : ?>
            <p class="textgroup-sub" style="font-size: 1.05rem; font-weight: 600; color: var(--color-navy); margin-bottom: 16px; line-height: 1.5;"><?php echo esc_html( $sec_sub ); ?></p>
          <?php endif; ?>
          <div class="textgroup-content">
            <?php echo sc_render_deepdive_section_content( $raw_content ); ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
