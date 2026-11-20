<?php
/**
 * GoHighLevel Flow 3: Lead Magnet Download Automation & Resource Provisioning
 * Aligned with GoHighLevel Integration Requirements (Phase 1)
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Get the registry of official downloadable lead magnet resources
 */
function sc_get_lead_magnet_resources() {
    $base_url = set_url_scheme( content_url( '/uploads/resources/' ), 'https' );

    return array(
        'level-1' => array(
            'id'        => 'level-1',
            'name'      => 'The CMMC Level 1 Readiness Checklist',
            'tag_slug'  => 'cmmc-level-1-readiness-checklist',
            'file_name' => 'cmmc-level-1-readiness-checklist.pdf',
            'url'       => $base_url . 'cmmc-level-1-readiness-checklist.pdf',
        ),
        'level-2' => array(
            'id'        => 'level-2',
            'name'      => 'The CMMC 2.0 Level 2 Compliance Checklist',
            'tag_slug'  => 'cmmc-level-2-compliance-checklist',
            'file_name' => 'cmmc-level-2-compliance-checklist.pdf',
            'url'       => $base_url . 'cmmc-level-2-compliance-checklist.pdf',
        ),
        'unmarked-cui' => array(
            'id'        => 'unmarked-cui',
            'name'      => 'How to Detect Unmarked CUI Guide',
            'tag_slug'  => 'how-to-detect-unmarked-cui-guide',
            'file_name' => 'how-to-detect-unmarked-cui-guide.pdf',
            'url'       => $base_url . 'how-to-detect-unmarked-cui-guide.pdf',
        ),
    );
}

/**
 * Detect which lead magnet document matches the current page or request
 *
 * @param string $page_url
 * @param int    $form_id
 * @return array Resource definition
 */
function sc_detect_matched_resource( $page_url = '', $form_id = 0 ) {
    $resources = sc_get_lead_magnet_resources();
    $url_lower = strtolower( (string) $page_url );

    // 1. Check for Unmarked CUI & CUI guides
    if ( false !== strpos( $url_lower, 'unmarked-cui' ) ||
         false !== strpos( $url_lower, '/cui/' ) ||
         false !== strpos( $url_lower, 'enclave' ) ||
         false !== strpos( $url_lower, 'ssp-poam' ) ) {
        return $resources['unmarked-cui'];
    }

    // 2. Check for Level 1 Checklist
    if ( false !== strpos( $url_lower, 'level-1' ) ) {
        return $resources['level-1'];
    }

    // 3. Default to Level 2 Compliance Checklist (Flagship 110-control checklist)
    return $resources['level-2'];
}

/**
 * Dispatch lead data to GoHighLevel Flow 3 Inbound Webhook
 *
 * @param array $entry_data
 * @param array $resource
 * @param string $source_url
 * @return array|WP_Error
 */
function sc_dispatch_ghl_flow3_webhook( $entry_data, $resource, $source_url ) {
    $webhook_url = 'https://services.leadconnectorhq.com/hooks/WMj6saOcBwOMZmggMv4l/webhook-trigger/JaplJZpdWAub1oAZHgh6';

    $full_name  = ! empty( $entry_data['name'] ) ? trim( sanitize_text_field( $entry_data['name'] ) ) : '';
    $name_parts = explode( ' ', $full_name, 2 );
    $first_name = ! empty( $name_parts[0] ) ? $name_parts[0] : '';
    $last_name  = ! empty( $name_parts[1] ) ? $name_parts[1] : '';

    $email   = ! empty( $entry_data['email'] ) ? sanitize_email( $entry_data['email'] ) : '';
    $company = ! empty( $entry_data['company'] ) ? sanitize_text_field( $entry_data['company'] ) : '';
    $phone   = ! empty( $entry_data['phone'] ) ? sanitize_text_field( $entry_data['phone'] ) : '';

    // Parse any UTM parameters
    $utm = array();
    $parsed_url = wp_parse_url( $source_url );
    if ( ! empty( $parsed_url['query'] ) ) {
        parse_str( $parsed_url['query'], $query_params );
        foreach ( array( 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term' ) as $key ) {
            $utm[ $key ] = ! empty( $query_params[ $key ] ) ? sanitize_text_field( $query_params[ $key ] ) : '';
        }
    }

    $payload = array(
        'first_name'          => $first_name,
        'last_name'           => $last_name,
        'name'                => $full_name,
        'email'               => $email,
        'company_name'        => $company,
        'phone'               => $phone,
        'lead_magnet_name'    => $resource['name'],
        'resource_name'       => $resource['name'],
        'resource_url'        => $resource['url'],
        'file_url'            => $resource['url'],
        'activity_type'       => 'resource_download',
        'last_website_action' => 'Resource Download',
        'source_page_url'     => $source_url,
        'utm_source'          => ! empty( $utm['utm_source'] ) ? $utm['utm_source'] : '',
        'utm_medium'          => ! empty( $utm['utm_medium'] ) ? $utm['utm_medium'] : '',
        'utm_campaign'        => ! empty( $utm['utm_campaign'] ) ? $utm['utm_campaign'] : '',
        'utm_content'         => ! empty( $utm['utm_content'] ) ? $utm['utm_content'] : '',
        'utm_term'            => ! empty( $utm['utm_term'] ) ? $utm['utm_term'] : '',
        'tags'                => array(
            'source - website',
            'website - lead magnet - ' . $resource['tag_slug'],
        ),
        'submitted_at'        => current_time( 'mysql' ),
    );

    $response = wp_remote_post( $webhook_url, array(
        'method'      => 'POST',
        'timeout'     => 15,
        'redirection' => 5,
        'httpversion' => '1.0',
        'blocking'    => true,
        'headers'     => array(
            'Content-Type' => 'application/json; charset=utf-8',
        ),
        'body'        => wp_json_encode( $payload ),
    ) );

    if ( is_wp_error( $response ) ) {
        error_log( '[GHL Flow 3 Error] ' . $response->get_error_message() );
    } else {
        error_log( '[GHL Flow 3 Success] Response code: ' . wp_remote_retrieve_response_code( $response ) );
    }

    return $response;
}

/**
 * Handle Forminator Lead Magnet submission & trigger GoHighLevel webhook
 */
add_action( 'forminator_custom_form_submit_before_set_fields', 'sc_handle_forminator_lead_magnet_submission', 10, 3 );
function sc_handle_forminator_lead_magnet_submission( $entry, $form_id, $field_data_array ) {
    // Only target lead magnet download forms (Form 102 or similar checklist forms)
    // Exclude Newsletter (106) and Contact (101) and CUI session (367)
    if ( in_array( (int) $form_id, array( 101, 106, 367 ), true ) ) {
        return;
    }

    $entry_data = array();
    if ( is_array( $field_data_array ) ) {
        foreach ( $field_data_array as $f ) {
            $name = ! empty( $f['name'] ) ? $f['name'] : '';
            $val  = ! empty( $f['value'] ) ? $f['value'] : '';
            if ( 0 === strpos( $name, 'name' ) ) {
                $entry_data['name'] = $val;
            } elseif ( 0 === strpos( $name, 'email' ) ) {
                $entry_data['email'] = $val;
            } elseif ( 0 === strpos( $name, 'text' ) ) {
                $entry_data['company'] = $val;
            } elseif ( 0 === strpos( $name, 'phone' ) ) {
                $entry_data['phone'] = $val;
            }
        }
    }

    // Determine source page URL
    $source_url = ! empty( $_POST['current_url'] ) ? esc_url_raw( wp_unslash( $_POST['current_url'] ) ) : ( ! empty( $_SERVER['HTTP_REFERER'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) : home_url() );

    // Identify matched resource
    $resource = sc_detect_matched_resource( $source_url, $form_id );

    // Send to GoHighLevel Flow 3 webhook
    sc_dispatch_ghl_flow3_webhook( $entry_data, $resource, $source_url );
}

/**
 * Customize Forminator Thank-You message to provide instant download & trigger browser download
 */
add_filter( 'forminator_custom_form_thankyou_message', 'sc_custom_lead_magnet_thankyou_message', 10, 2 );
function sc_custom_lead_magnet_thankyou_message( $thankyou_message, $custom_form ) {
    $form_id = is_object( $custom_form ) && isset( $custom_form->id ) ? (int) $custom_form->id : 0;

    // Only customize for lead magnet download forms
    if ( in_array( $form_id, array( 101, 106, 367 ), true ) ) {
        return $thankyou_message;
    }

    $source_url = ! empty( $_POST['current_url'] ) ? esc_url_raw( wp_unslash( $_POST['current_url'] ) ) : ( ! empty( $_SERVER['HTTP_REFERER'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) : home_url() );
    $resource   = sc_detect_matched_resource( $source_url, $form_id );

    $download_url = esc_url( $resource['url'] );
    $file_name    = esc_attr( $resource['file_name'] );
    $res_name     = esc_html( $resource['name'] );

    $custom_box = '
    <div class="sc-download-complete-box" style="margin-top: 14px; padding: 22px 20px; background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 12px; text-align: center; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.08);">
      <div style="font-weight: 800; color: #166534; font-size: 1.15rem; margin-bottom: 6px; display: flex; align-items: center; justify-content: center; gap: 8px;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #22C55E; color: #fff; font-size: 14px; line-height: 1;">✓</span>
        Your Download is Ready!
      </div>
      <p style="font-size: 0.9rem; color: #15803D; margin-bottom: 16px; line-height: 1.45;">
        We have prepared <strong>' . $res_name . '</strong> (PDF) for you. If your download did not start automatically, click below:
      </p>
      <div style="display: flex; justify-content: center;">
        <a href="' . $download_url . '" class="btn btn-primary btn-lg" download="' . $file_name . '" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: #0066FF; color: #ffffff; padding: 12px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 1rem; box-shadow: 0 4px 14px rgba(0, 102, 255, 0.28); transition: transform 0.2s ease;">
          📥 Download ' . $res_name . ' (PDF)
        </a>
      </div>
      <div style="margin-top: 12px; font-size: 0.75rem; color: #166534; opacity: 0.85;">
        🔒 Direct official download · Stored securely
      </div>
    </div>
    <script>
      (function(){
        setTimeout(function(){
          var link = document.createElement("a");
          link.href = "' . $download_url . '";
          link.download = "' . $file_name . '";
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 400);
      })();
    </script>
    ';

    return $custom_box;
}
