<?php
/**
 * Secure-Centric Theme Functions & Block Registrations
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Setup Theme Supports
 */
function secure_centric_setup() {
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'editor-styles' );
    add_editor_style( 'assets/css/variables.css' );
    add_editor_style( 'assets/css/components.css' );
    add_editor_style( 'assets/css/pages.css' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'secure_centric_setup' );

/**
 * Safe JSON block attribute decoder with unicode unescaping
 */
function sc_decode_block_json( $val ) {
    if ( empty( $val ) ) {
        return array();
    }
    if ( is_array( $val ) ) {
        return $val;
    }
    if ( is_string( $val ) ) {
        // Resolve double-escaped Gutenberg unicode strings
        $val = preg_replace_callback( '/u005c(u[0-9a-fA-F]{4})/', function( $m ) {
            return json_decode( '"\\' . $m[1] . '"' );
        }, $val );
        $val = preg_replace_callback( '/(?<![a-zA-Z0-9])u([0-9a-fA-F]{4})/', function( $m ) {
            return json_decode( '"\u' . $m[1] . '"' );
        }, $val );
        $val = str_replace( array( '\u0022', 'u0022', '&quot;' ), '"', $val );
        $decoded = json_decode( $val, true );
        if ( is_array( $decoded ) ) {
            return $decoded;
        }
    }
    return array();
}

/**
 * Register Custom Gutenberg Blocks via block.json
 */
function secure_centric_register_custom_blocks() {
    if ( function_exists( 'wp_enqueue_media' ) && is_admin() ) {
        wp_enqueue_media();
    }

    $editor_js_file = get_template_directory() . '/assets/js/editor.js';
    $editor_js_ver  = file_exists( $editor_js_file ) ? (string) filemtime( $editor_js_file ) : '4.0.0';

    wp_register_script(
        'secure-centric-editor-blocks',
        get_template_directory_uri() . '/assets/js/editor.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-server-side-render', 'wp-block-editor', 'wp-data', 'wp-dom-ready' ),
        $editor_js_ver,
        false
    );

    $blocks = array(
        'hero',
        'section-explainer',
        'roadmap-stepper',
        'testimonials',
        'why-proof',
        'comparison-grid',
        'accordion-faq',
        'cta-banner',
        'logo-marquee',
        'resource-cards',
        'form-embed',
        'team-grid',
        'numbers-results',
        'bullets-grid',
    );

    foreach ( $blocks as $block ) {
        $block_dir = __DIR__ . '/blocks/' . $block;
        if ( file_exists( $block_dir . '/block.json' ) ) {
            register_block_type( $block_dir );
        }
    }
}
add_action( 'init', 'secure_centric_register_custom_blocks' );

/**
 * Register Custom Block Pattern Categories
 */
function secure_centric_register_pattern_categories() {
    register_block_pattern_category(
        'secure-centric-heroes',
        array( 'label' => __( 'Secure-Centric: Heroes', 'secure-centric' ) )
    );
    register_block_pattern_category(
        'secure-centric-process',
        array( 'label' => __( 'Secure-Centric: Process & Roadmaps', 'secure-centric' ) )
    );
    register_block_pattern_category(
        'secure-centric-proof',
        array( 'label' => __( 'Secure-Centric: Proof & Testimonials', 'secure-centric' ) )
    );
    register_block_pattern_category(
        'secure-centric-cta',
        array( 'label' => __( 'Secure-Centric: Calls to Action', 'secure-centric' ) )
    );
}
add_action( 'init', 'secure_centric_register_pattern_categories' );

/**
 * Enqueue Theme Scripts & Styles
 */
function secure_centric_enqueue_assets() {
    // Google Fonts
    wp_enqueue_style(
        'secure-centric-fonts',
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        array(),
        null
    );

    // CSS Theme Assets with dynamic cache busting
    $var_file  = get_template_directory() . '/assets/css/variables.css';
    $comp_file = get_template_directory() . '/assets/css/components.css';
    $page_file = get_template_directory() . '/assets/css/pages.css';

    $var_ver  = file_exists( $var_file ) ? (string) filemtime( $var_file ) : time();
    $comp_ver = file_exists( $comp_file ) ? (string) filemtime( $comp_file ) : time();
    $page_ver = file_exists( $page_file ) ? (string) filemtime( $page_file ) : time();

    wp_enqueue_style(
        'secure-centric-variables',
        get_template_directory_uri() . '/assets/css/variables.css',
        array(),
        $var_ver
    );
    wp_enqueue_style(
        'secure-centric-components',
        get_template_directory_uri() . '/assets/css/components.css',
        array( 'secure-centric-variables' ),
        $comp_ver
    );
    wp_enqueue_style(
        'secure-centric-pages',
        get_template_directory_uri() . '/assets/css/pages.css',
        array( 'secure-centric-components' ),
        $page_ver
    );

    // Frontend Interactive Scripts with dynamic cache busting
    $data_file = get_template_directory() . '/assets/js/data.js';
    $app_file  = get_template_directory() . '/assets/js/app.js';

    $data_ver = file_exists( $data_file ) ? (string) filemtime( $data_file ) : time();
    $app_ver  = file_exists( $app_file ) ? (string) filemtime( $app_file ) : time();

    wp_enqueue_script(
        'secure-centric-data',
        get_template_directory_uri() . '/assets/js/data.js',
        array(),
        $data_ver,
        true
    );
    wp_enqueue_script(
        'secure-centric-app',
        get_template_directory_uri() . '/assets/js/app.js',
        array( 'secure-centric-data' ),
        $app_ver,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'secure_centric_enqueue_assets' );

/**
 * Enqueue Editor Assets for Gutenberg
 */
function secure_centric_editor_assets() {
    wp_enqueue_style(
        'secure-centric-editor-fonts',
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        array(),
        null
    );
    wp_enqueue_style(
        'secure-centric-editor-styles',
        get_template_directory_uri() . '/assets/css/variables.css',
        array(),
        '3.9.4'
    );
    wp_enqueue_style(
        'secure-centric-editor-components',
        get_template_directory_uri() . '/assets/css/components.css',
        array( 'secure-centric-editor-styles' ),
        '3.9.4'
    );
    wp_enqueue_style(
        'secure-centric-editor-pages',
        get_template_directory_uri() . '/assets/css/pages.css',
        array( 'secure-centric-editor-components' ),
        '3.9.5'
    );

    wp_enqueue_media();

    $editor_js_file = get_template_directory() . '/assets/js/editor.js';
    $editor_js_ver  = file_exists( $editor_js_file ) ? (string) filemtime( $editor_js_file ) : '4.0.0';

    wp_enqueue_script(
        'secure-centric-editor-blocks',
        get_template_directory_uri() . '/assets/js/editor.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-server-side-render', 'wp-block-editor', 'wp-data', 'wp-dom-ready' ),
        $editor_js_ver,
        false
    );
}
add_action( 'enqueue_block_editor_assets', 'secure_centric_editor_assets' );
