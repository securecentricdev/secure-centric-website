<?php
/**
 * One-time Database Migration Script:
 * Populates explicit block field data in wp_posts.post_content across all pages,
 * removing all hardcoding, legacy paths, and ensuring Gutenberg editor and view page
 * are 100% in sync.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$booking_url = 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll';

// Map of legacy #page-X IDs to clean permalinks
$page_slug_map = array(
    '#page-1'  => '/',
    '#page-2'  => '/about/',
    '#page-3'  => '/contact/',
    '#page-4'  => '/services/cmmc-compliance/',
    '#page-5'  => '/services/cmmc-consulting/',
    '#page-6'  => '/services/nist-800-171-compliance/',
    '#page-7'  => '/services/cmmc-readiness-assessment/',
    '#page-8'  => '/services/cmmc-readiness-assessment/gap-assessment/',
    '#page-9'  => '/services/cmmc-implementation-remediation/',
    '#page-10' => '/services/cmmc-implementation-remediation/ssp-poam-development/',
    '#page-11' => '/services/virtual-ciso/',
    '#page-12' => '/cmmc/',
    '#page-13' => '/cmmc/level-2/',
    '#page-14' => '/nist-800-171/',
    '#page-15' => '/cui/',
    '#page-16' => '/services/cmmc-enclave/',
    '#page-17' => '/cmmc/rpo/',
    '#page-18' => '/services/',
    '#page-19' => '/cmmc/cmmc-process/',
    '#page-20' => '/resources/templates/checklist/level-2/',
    '#page-21' => '/resources/templates/checklist/unmarked-cui/',
    '#page-22' => '/resources/templates/checklist/level-1/',
    '#page-23' => '/resources/',
);

// 1. Process Page 6 (Homepage) specifically
$home_id = 6;
$home_post = get_post( $home_id );

if ( $home_post ) {
    $content = $home_post->post_content;

    // Replace empty hero block with explicit attributes
    $home_hero_attrs = json_encode( array(
        'layout'           => 'home',
        'eyebrow'          => '// NIST SP 800-171 / CMMC Compliance Consultants',
        'title'            => 'CMMC compliance for defense subcontractors, guided by a Cyber AB RPO',
        'highlightText'    => 'Cyber AB RPO',
        'description'      => 'We help defense contractors and suppliers get ready for CMMC and NIST SP 800-171, from the first site visit to the annual affirmation.',
        'primaryBtnText'   => 'Book a Discovery Call →',
        'primaryBtnUrl'    => $booking_url,
        'subText'          => '30 min · No sales pitch · Signed NDA',
        'topic1Title'      => 'CMMC',
        'topic1Desc'       => 'Maturity levels & framework',
        'topic1Url'        => '/cmmc/',
        'topic2Title'      => 'NIST SP 800-171',
        'topic2Desc'       => '110 controls & DFARS 7012',
        'topic2Url'        => '/services/nist-800-171-compliance/',
        'topic3Title'      => 'CUI',
        'topic3Desc'       => 'Controlled Unclassified Info',
        'topic3Url'        => '/cui/',
        'quizBadge'        => 'CMMC READINESS CHECK · 3 MINUTES',
        'quizChip'         => 'Free Tool',
        'quizTitle'        => 'Find out where you stand',
        'quizDesc'         => 'Assess your FCI/CUI boundaries and readiness score before a C3PAO audit.',
        'quizPlaceholder'  => 'Enter corporate work email',
        'quizBtnText'      => 'Start 3-Minute Readiness Check →',
        'quizNote'         => '🔒 Work email required. Never submit classified or CUI information.',
    ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

    $content = preg_replace( '/<!-- wp:secure-centric\/hero\s*(?:\{.*?\})?\s*\/-->/s', '<!-- wp:secure-centric/hero ' . $home_hero_attrs . ' /-->', $content );

    // Roadmap stepper
    $home_roadmap_attrs = json_encode( array(
        'eyebrow'                 => '// THE CMMC PROCESS',
        'title'                   => 'Your CMMC journey, step by step',
        'detailedProcessLinkText' => 'View Detailed 8-Step Process →',
        'detailedProcessLinkUrl'  => '/cmmc/cmmc-process/',
        'flagText'                => 'Target C3PAO Certification Milestone',
    ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    $content = preg_replace( '/<!-- wp:secure-centric\/roadmap-stepper\s*(?:\{.*?\})?\s*\/-->/s', '<!-- wp:secure-centric/roadmap-stepper ' . $home_roadmap_attrs . ' /-->', $content );

    // Why Proof
    $home_why_attrs = json_encode( array(
        'eyebrow'      => '// PROOF & CREDENTIALS',
        'title'        => 'Why Secure-Centric',
        'description'  => 'Secure-Centric is an accredited Cyber AB Registered Provider Organization (RPO). We help defense subcontractors navigate DFARS 252.204-7012, NIST SP 800-171, and CMMC Level 2 audits with defensible, assessor-tested evidence.',
        'linkText'     => 'Full Company Credentials →',
        'linkUrl'      => '/about/',
        'stat1Number'  => '120+',
        'stat1Label'   => 'Defense contractors prepared for CMMC & NIST SP 800-171 audits',
        'stat1Date'    => 'As of Q4 2026',
        'stat2Number'  => '100%',
        'stat2Label'   => 'First-time pass record with Authorized C3PAO and DIBCAC assessors',
        'stat2Date'    => 'Level 2 CMMC audits',
    ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    $content = preg_replace( '/<!-- wp:secure-centric\/why-proof\s*(?:\{.*?\})?\s*\/-->/s', '<!-- wp:secure-centric/why-proof ' . $home_why_attrs . ' /-->', $content );

    // Resource Cards
    $home_resources = array(
        array( 'title' => 'CMMC Complete Guide', 'desc' => 'The definitive executive and technical overview of CMMC levels, rulemaking, and audits.', 'link' => '/cmmc/', 'icon' => '📁' ),
        array( 'title' => 'CMMC Level 2 Guide', 'desc' => '110 requirements across 14 security families: technical breakdown and scoping rules.', 'link' => '/cmmc/level-2/', 'icon' => '📘' ),
        array( 'title' => 'NIST SP 800-171 Standard', 'desc' => 'The foundational standard behind DFARS 7012 and Level 2 C3PAO certifications.', 'link' => '/nist-800-171/', 'icon' => '🛡️' ),
        array( 'title' => 'CUI Scoping & Handling Guide', 'desc' => 'Controlled Unclassified Information: identification, markings, and boundary isolation.', 'link' => '/cui/', 'icon' => '🔒' ),
        array( 'title' => 'CMMC Enclave Advisory', 'desc' => 'How segregating your CUI network saves months of implementation and audit costs.', 'link' => '/services/cmmc-enclave/', 'icon' => '🏗️' ),
        array( 'title' => 'Level 2 Compliance Checklist', 'desc' => 'Downloadable 110-control Excel checklist with ownership and objective columns.', 'link' => '/resources/templates/checklist/level-2/', 'icon' => '📊' ),
    );
    $home_resources_attrs = json_encode( array(
        'title'         => 'CMMC guides, checklists and tools',
        'resourcesData' => json_encode( $home_resources, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ),
    ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    $content = preg_replace( '/<!-- wp:secure-centric\/resource-cards\s*(?:\{.*?\})?\s*\/-->/s', '<!-- wp:secure-centric/resource-cards ' . $home_resources_attrs . ' /-->', $content );

    // Accordion FAQ
    $home_faq_attrs = json_encode( array(
        'eyebrow'     => '// FREQUENTLY ASKED QUESTIONS',
        'title'       => 'Common questions',
        'description' => 'Still have questions regarding your specific CMMC clauses or audit dates? Speak directly with our lead Registered Practitioner.',
        'btnText'     => 'Book a Discovery Call →',
        'btnUrl'      => $booking_url,
    ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    $content = preg_replace( '/<!-- wp:secure-centric\/accordion-faq\s*(?:\{.*?\})?\s*\/-->/s', '<!-- wp:secure-centric/accordion-faq ' . $home_faq_attrs . ' /-->', $content );

    // CTA Banner
    $home_cta_attrs = json_encode( array(
        'title'          => 'Planning to get started on CMMC?',
        'description'    => 'Talk with an accredited Cyber AB Registered Provider Organization. Get an actionable first step in writing within 30 minutes.',
        'primaryBtnText' => 'Book a Discovery Call →',
        'primaryBtnUrl'  => $booking_url,
        'phoneText'      => 'Call (323) 410-5941',
        'phoneUrl'       => 'tel:323-410-5941',
    ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    $content = preg_replace( '/<!-- wp:secure-centric\/cta-banner\s*(?:\{.*?\})?\s*\/-->/s', '<!-- wp:secure-centric/cta-banner ' . $home_cta_attrs . ' /-->', $content );

    wp_update_post( array(
        'ID'           => $home_id,
        'post_content' => $content,
    ) );
    echo "Updated Homepage (ID $home_id)\n";
}

// 2. Scan and update all published pages
$all_pages = get_posts( array(
    'post_type'   => 'page',
    'post_status' => 'publish',
    'numberposts' => -1,
) );

foreach ( $all_pages as $page ) {
    $original = $page->post_content;
    $updated  = $original;

    // Parse blocks
    $blocks = parse_blocks( $original );
    $has_changes = false;

    // Direct string replacements for common legacy patterns in JSON strings
    // 1. Remove /secure-centric/ path prefixes
    $updated = str_replace(
        array(
            '\\/secure-centric\\/contact\\/',
            '/secure-centric/contact/',
            '\\/secure-centric\\/services\\/',
            '/secure-centric/services/',
            '\\/secure-centric\\/about\\/',
            '/secure-centric/about/',
            '\\/secure-centric\\/cmmc\\/',
            '/secure-centric/cmmc/',
            '\\/secure-centric\\/resources\\/',
            '/secure-centric/resources/',
            '\\/secure-centric\\/cui\\/',
            '/secure-centric/cui/',
            '\\/secure-centric\\/nist-800-171\\/',
            '/secure-centric/nist-800-171/',
        ),
        array(
            '\\/contact\\/',
            '/contact/',
            '\\/services\\/',
            '/services/',
            '\\/about\\/',
            '/about/',
            '\\/cmmc\\/',
            '/cmmc/',
            '\\/resources\\/',
            '/resources/',
            '\\/cui\\/',
            '/cui/',
            '\\/nist-800-171\\/',
            '/nist-800-171/',
        ),
        $updated
    );

    // 2. Replace legacy #page-X references
    foreach ( $page_slug_map as $hash => $clean_url ) {
        $escaped_clean = str_replace( '/', '\\/', $clean_url );
        $updated = str_replace( $hash, $clean_url, $updated );
    }

    // 3. For any block having "primaryBtnText" or "btnText" matching Discovery Call, route primaryBtnUrl to booking widget
    $blocks = parse_blocks( $updated );
    $reconstructed = '';

    foreach ( $blocks as $b ) {
        if ( ! empty( $b['blockName'] ) ) {
            $attrs = $b['attrs'];
            $bname = $b['blockName'];

            // Check if hero or cta-banner or accordion-faq has a discovery/scoping call button
            if ( 'secure-centric/hero' === $bname || 'secure-centric/cta-banner' === $bname ) {
                if ( ! empty( $attrs['primaryBtnText'] ) && preg_match( '/book/i', $attrs['primaryBtnText'] ) ) {
                    $attrs['primaryBtnUrl'] = $booking_url;
                }
            } elseif ( 'secure-centric/accordion-faq' === $bname ) {
                if ( ! empty( $attrs['btnText'] ) && preg_match( '/book/i', $attrs['btnText'] ) ) {
                    $attrs['btnUrl'] = $booking_url;
                }
            } elseif ( 'secure-centric/why-proof' === $bname ) {
                if ( empty( $attrs['linkUrl'] ) || '#contact' === $attrs['linkUrl'] ) {
                    $attrs['linkUrl'] = '/about/';
                }
            } elseif ( 'secure-centric/roadmap-stepper' === $bname ) {
                if ( empty( $attrs['detailedProcessLinkUrl'] ) || '#page-19' === $attrs['detailedProcessLinkUrl'] ) {
                    $attrs['detailedProcessLinkUrl'] = '/cmmc/cmmc-process/';
                }
            }

            // Encode attributes cleanly
            $json_attrs = ! empty( $attrs ) ? ' ' . json_encode( $attrs, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) : '';
            if ( empty( $b['innerBlocks'] ) ) {
                $reconstructed .= '<!-- wp:' . $bname . $json_attrs . " /-->\n\n";
            } else {
                $reconstructed .= '<!-- wp:' . $bname . $json_attrs . " -->\n" . $b['innerHTML'] . '<!-- /wp:' . $bname . " -->\n\n";
            }
        } elseif ( ! empty( trim( $b['innerHTML'] ) ) ) {
            $reconstructed .= $b['innerHTML'] . "\n\n";
        }
    }

    $reconstructed = trim( $reconstructed );

    if ( $reconstructed !== $original ) {
        wp_update_post( array(
            'ID'           => $page->ID,
            'post_content' => $reconstructed,
        ) );
        echo "Updated Page ID " . $page->ID . " (" . $page->post_name . ")\n";
    }
}

wp_cache_flush();
echo "Migration complete and cache flushed.\n";
