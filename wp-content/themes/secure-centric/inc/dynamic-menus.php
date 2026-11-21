<?php
/**
 * Dynamic Menus Management for Secure-Centric
 *
 * Enables standard WordPress Menu administration (Appearance -> Menus)
 * and connects it dynamically to the Header and Footer.
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register theme navigation menu locations & re-enable Appearance -> Menus in Block Theme
 */
function sc_register_theme_menus() {
    add_theme_support( 'menus' );

    register_nav_menus( array(
        'primary'          => __( 'Header Navigation', 'secure-centric' ),
        'footer_services'  => __( 'Footer Services Menu', 'secure-centric' ),
        'footer_guides'    => __( 'Footer Guides Menu', 'secure-centric' ),
        'footer_resources' => __( 'Footer Resources Menu', 'secure-centric' ),
        'footer_legal'     => __( 'Footer Legal / Privacy Menu', 'secure-centric' ),
    ) );
}
add_action( 'after_setup_theme', 'sc_register_theme_menus' );

/**
 * Ensure Appearance -> Menus is explicitly visible in WordPress admin for block themes
 */
function sc_add_menus_to_admin() {
    add_theme_page(
        __( 'Menus', 'secure-centric' ),
        __( 'Menus', 'secure-centric' ),
        'edit_theme_options',
        'nav-menus.php'
    );
}
add_action( 'admin_menu', 'sc_add_menus_to_admin' );

/**
 * Helper to fetch menu items hierarchically
 */
function sc_get_menu_hierarchy( $location ) {
    $locations = get_nav_menu_locations();
    if ( empty( $locations[ $location ] ) ) {
        // Fallback: check by slug/name
        $menu = wp_get_nav_menu_object( $location );
    } else {
        $menu = wp_get_nav_menu_object( $locations[ $location ] );
    }

    if ( ! $menu ) {
        return false;
    }

    $items = wp_get_nav_menu_items( $menu->term_id );
    if ( empty( $items ) ) {
        return false;
    }

    $menu_tree = array();
    $items_by_id = array();

    foreach ( $items as $item ) {
        $item->children = array();
        $items_by_id[ $item->ID ] = $item;
    }

    foreach ( $items as $item ) {
        if ( ! empty( $item->menu_item_parent ) && isset( $items_by_id[ $item->menu_item_parent ] ) ) {
            $items_by_id[ $item->menu_item_parent ]->children[] = $item;
        } else {
            $menu_tree[] = $item;
        }
    }

    return $menu_tree;
}

/**
 * Render Header Navigation (Desktop)
 */
function sc_render_header_desktop_nav() {
    $menu_tree = sc_get_menu_hierarchy( 'primary' );

    if ( empty( $menu_tree ) ) {
        // Default Hardcoded Fallback
        return '<nav class="site-nav" aria-label="Main Navigation">
          <ul class="nav-links">
            <li class="nav-item">
              <a href="/services/cmmc-consulting/" class="nav-link">
                Services <span style="font-size: 0.7rem;">▾</span>
              </a>
              <div class="dropdown-menu">
                <a href="/services/cmmc-consulting/" class="dropdown-item"><b>CMMC Consulting</b></a>
                <a href="/services/nist-800-171-compliance/" class="dropdown-item"><b>NIST SP 800-171 Compliance</b></a>
              </div>
            </li>
            <li class="nav-item"><a href="/cmmc/cmmc-process/" class="nav-link">CMMC Process</a></li>
            <li class="nav-item nav-item-dropdown">
              <a href="/resources/" class="nav-link">
                Resources <span style="font-size: 0.7rem;">▾</span>
              </a>
              <div class="dropdown-menu">
                <a href="https://www.youtube.com/@Secure-CentricCMMC" target="_blank" rel="noopener noreferrer" class="dropdown-item"><b>Videos</b></a>
                <a href="/resources/checklist/level-2/" class="dropdown-item"><b>Level 2 Compliance Checklist</b></a>
                <a href="/resources/checklist/level-1/" class="dropdown-item"><b>Level 1 Readiness Checklist</b></a>
                <a href="/resources/checklist/unmarked-cui/" class="dropdown-item"><b>How to Detect Unmarked CUI</b></a>
              </div>
            </li>
            <li class="nav-item"><a href="/about/" class="nav-link">About Us</a></li>
          </ul>
        </nav>';
    }

    $html = '<nav class="site-nav" aria-label="Main Navigation"><ul class="nav-links">';
    foreach ( $menu_tree as $item ) {
        $has_children = ! empty( $item->children );
        $url          = esc_url( $item->url );
        $title        = esc_html( $item->title );
        $target       = ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) . '" rel="noopener noreferrer"' : '';
        $li_class     = 'nav-item' . ( $has_children ? ' nav-item-dropdown' : '' );

        $html .= '<li class="' . esc_attr( $li_class ) . '">';
        $html .= '<a href="' . $url . '" class="nav-link"' . $target . '>' . $title . ( $has_children ? ' <span style="font-size: 0.7rem;">▾</span>' : '' ) . '</a>';

        if ( $has_children ) {
            $html .= '<div class="dropdown-menu">';
            foreach ( $item->children as $child ) {
                $child_url    = esc_url( $child->url );
                $child_title  = esc_html( $child->title );
                $child_target = ! empty( $child->target ) ? ' target="' . esc_attr( $child->target ) . '" rel="noopener noreferrer"' : '';
                $html .= '<a href="' . $child_url . '" class="dropdown-item"' . $child_target . '><b>' . $child_title . '</b></a>';
            }
            $html .= '</div>';
        }

        $html .= '</li>';
    }
    $html .= '</ul></nav>';

    return $html;
}

/**
 * Render Header Navigation (Mobile Drawer)
 */
function sc_render_header_mobile_nav() {
    $menu_tree = sc_get_menu_hierarchy( 'primary' );

    if ( empty( $menu_tree ) ) {
        // Default Hardcoded Fallback
        return '<ul class="mobile-drawer-links">
          <li>
            <a href="/services/cmmc-consulting/" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">Services ▾</a>
            <ul class="mobile-sublinks">
              <li><a href="/services/cmmc-consulting/" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">CMMC Consulting</a></li>
              <li><a href="/services/nist-800-171-compliance/" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">NIST SP 800-171 Compliance</a></li>
            </ul>
          </li>
          <li><a href="/cmmc/cmmc-process/" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">CMMC Process</a></li>
          <li>
            <a href="/resources/" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">Resources ▾</a>
            <ul class="mobile-sublinks">
              <li><a href="https://www.youtube.com/@Secure-CentricCMMC" target="_blank" rel="noopener noreferrer" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">Videos</a></li>
              <li><a href="/resources/checklist/level-2/" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">Level 2 Compliance Checklist</a></li>
              <li><a href="/resources/checklist/level-1/" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">Level 1 Readiness Checklist</a></li>
              <li><a href="/resources/checklist/unmarked-cui/" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">How to Detect Unmarked CUI</a></li>
            </ul>
          </li>
          <li><a href="/about/" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">About Us</a></li>
          <li><a href="https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll" target="_blank" rel="noopener noreferrer" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">Talk to an Expert</a></li>
        </ul>';
    }

    $html = '<ul class="mobile-drawer-links">';
    foreach ( $menu_tree as $item ) {
        $has_children = ! empty( $item->children );
        $url          = esc_url( $item->url );
        $title        = esc_html( $item->title );
        $target       = ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) . '" rel="noopener noreferrer"' : '';

        $html .= '<li>';
        $html .= '<a href="' . $url . '"' . $target . ' onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">' . $title . ( $has_children ? ' ▾' : '' ) . '</a>';

        if ( $has_children ) {
            $html .= '<ul class="mobile-sublinks">';
            foreach ( $item->children as $child ) {
                $child_url    = esc_url( $child->url );
                $child_title  = esc_html( $child->title );
                $child_target = ! empty( $child->target ) ? ' target="' . esc_attr( $child->target ) . '" rel="noopener noreferrer"' : '';
                $html .= '<li><a href="' . $child_url . '"' . $child_target . ' onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">' . $child_title . '</a></li>';
            }
            $html .= '</ul>';
        }

        $html .= '</li>';
    }
    // Always append CTA in mobile drawer
    $html .= '<li><a href="https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll" target="_blank" rel="noopener noreferrer" onclick="window.closeMobileDrawer ? window.closeMobileDrawer() : null">Talk to an Expert</a></li>';
    $html .= '</ul>';

    return $html;
}

/**
 * Render Footer Column Menu
 */
function sc_render_footer_column( $location, $title, $fallback_items = array() ) {
    $menu_tree = sc_get_menu_hierarchy( $location );

    $html = '<div class="footer-col">';
    if ( ! empty( $title ) ) {
        $html .= '<h5>' . esc_html( $title ) . '</h5>';
    }
    $html .= '<ul class="footer-links">';

    if ( ! empty( $menu_tree ) ) {
        foreach ( $menu_tree as $item ) {
            $url    = esc_url( $item->url );
            $label  = esc_html( $item->title );
            $target = ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) . '" rel="noopener noreferrer"' : '';
            $html  .= '<li><a href="' . $url . '"' . $target . '>' . $label . '</a></li>';
        }
    } else {
        // Fallback items
        foreach ( $fallback_items as $item ) {
            $url    = esc_url( $item['url'] );
            $label  = esc_html( $item['title'] );
            $target = ! empty( $item['target'] ) ? ' target="' . esc_attr( $item['target'] ) . '" rel="noopener noreferrer"' : '';
            $html  .= '<li><a href="' . $url . '"' . $target . '>' . $label . '</a></li>';
        }
    }

    $html .= '</ul></div>';
    return $html;
}

/**
 * Render Footer Legal Links
 */
function sc_render_footer_legal() {
    $menu_tree = sc_get_menu_hierarchy( 'footer_legal' );

    $html = '<div style="display: flex; gap: 16px;">';
    if ( ! empty( $menu_tree ) ) {
        foreach ( $menu_tree as $item ) {
            $url    = esc_url( $item->url );
            $label  = esc_html( $item->title );
            $target = ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) . '" rel="noopener noreferrer"' : '';
            $html  .= '<a href="' . $url . '"' . $target . ' style="color: var(--color-slate); text-decoration: none;">' . $label . '</a>';
        }
    } else {
        $html .= '<a href="/privacy-policy/" style="color: var(--color-slate); text-decoration: none;">Privacy Policy</a>';
        $html .= '<a href="/contact/" style="color: var(--color-slate); text-decoration: none;">Contact</a>';
    }
    $html .= '</div>';
    return $html;
}

/**
 * Register Shortcodes for use in Template Parts
 */
add_shortcode( 'sc_header_desktop_nav', 'sc_render_header_desktop_nav' );
add_shortcode( 'sc_header_mobile_nav', 'sc_render_header_mobile_nav' );
add_shortcode( 'sc_footer_services', function() {
    return sc_render_footer_column( 'footer_services', 'Services', array(
        array( 'url' => '/services/cmmc-consulting/', 'title' => 'CMMC Consulting' ),
        array( 'url' => '/services/nist-800-171-compliance/', 'title' => 'NIST SP 800-171 Compliance' ),
        array( 'url' => '/services/cmmc-readiness-assessment/', 'title' => 'Readiness Assessments' ),
        array( 'url' => '/services/cmmc-readiness-assessment/gap-assessment/', 'title' => 'Gap & Mock Assessments' ),
        array( 'url' => '/services/virtual-ciso/', 'title' => 'Virtual CISO (vCISO)' ),
    ) );
} );
add_shortcode( 'sc_footer_guides', function() {
    return sc_render_footer_column( 'footer_guides', 'Guides', array(
        array( 'url' => '/cmmc/', 'title' => 'CMMC Complete Guide' ),
        array( 'url' => '/cmmc/level-2/', 'title' => 'CMMC Level 2 Guide' ),
        array( 'url' => '/nist-800-171/', 'title' => 'NIST SP 800-171 Explained' ),
        array( 'url' => '/cui/', 'title' => 'Controlled Unclassified Info' ),
        array( 'url' => '/cmmc/cmmc-process/', 'title' => 'Secure-Centric CMMC Process' ),
        array( 'url' => '/cmmc/rpo/', 'title' => 'What is a CMMC RPO?' ),
    ) );
} );
add_shortcode( 'sc_footer_resources', function() {
    return sc_render_footer_column( 'footer_resources', 'Resources', array(
        array( 'url' => '/resources/checklist/level-2/', 'title' => 'Level 2 (110 Controls) Checklist' ),
        array( 'url' => '/resources/checklist/unmarked-cui/', 'title' => 'Unmarked CUI Checklist' ),
        array( 'url' => '/resources/checklist/level-1/', 'title' => 'Level 1 Readiness Checklist' ),
    ) );
} );
add_shortcode( 'sc_footer_legal', 'sc_render_footer_legal' );

/**
 * Register Dynamic Gutenberg Blocks for seamless FSE integration
 */
function sc_register_dynamic_nav_blocks() {
    register_block_type( 'secure-centric/header-desktop-nav', array(
        'title'           => 'Header Desktop Nav',
        'category'        => 'theme',
        'render_callback' => 'sc_render_header_desktop_nav',
    ) );

    register_block_type( 'secure-centric/header-mobile-nav', array(
        'title'           => 'Header Mobile Nav',
        'category'        => 'theme',
        'render_callback' => 'sc_render_header_mobile_nav',
    ) );

    register_block_type( 'secure-centric/footer-services-menu', array(
        'title'           => 'Footer Services Menu',
        'category'        => 'theme',
        'render_callback' => function() {
            return do_shortcode( '[sc_footer_services]' );
        },
    ) );

    register_block_type( 'secure-centric/footer-guides-menu', array(
        'title'           => 'Footer Guides Menu',
        'category'        => 'theme',
        'render_callback' => function() {
            return do_shortcode( '[sc_footer_guides]' );
        },
    ) );

    register_block_type( 'secure-centric/footer-resources-menu', array(
        'title'           => 'Footer Resources Menu',
        'category'        => 'theme',
        'render_callback' => function() {
            return do_shortcode( '[sc_footer_resources]' );
        },
    ) );

    register_block_type( 'secure-centric/footer-legal-menu', array(
        'title'           => 'Footer Legal Menu',
        'category'        => 'theme',
        'render_callback' => 'sc_render_footer_legal',
    ) );
}
add_action( 'init', 'sc_register_dynamic_nav_blocks' );
