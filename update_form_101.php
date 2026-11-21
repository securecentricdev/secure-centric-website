<?php
/**
 * Script to update Forminator Form ID 101 to match exact requirements:
 * 1. Full name (Text, required, placeholder: none)
 * 2. Company name (Text, required)
 * 3. Company email (Email, required, valid format)
 * 4. Phone (Phone, optional)
 * 5. How can we help? (Dropdown, required, 8 options)
 * 6. Message (Long text, optional, placeholder: "Anything we should know (optional)")
 * Submit button: "Contact our team"
 * Notifications: info@secure-centric.com
 */

require_once __DIR__ . '/wp-load.php';

$form_id = 101;
$meta = get_post_meta( $form_id, 'forminator_form_meta', true );

if ( empty( $meta ) || ! is_array( $meta ) ) {
    die( "Form 101 meta not found!\n" );
}

$fields = array(
    // Row 1: Full name (col 6) + Company name (col 6)
    array(
        'id'           => 'name-1',
        'element_id'   => 'name-1',
        'form_id'      => 'wrapper-name-company',
        'parent_group' => '',
        'type'         => 'name',
        'cols'         => '6',
        'required'     => true,
        'field_label'  => 'Full name',
        'placeholder'  => '',
        'prefix_label' => 'Prefix',
        'fname_label'  => 'First Name',
        'lname_label'  => 'Last Name',
        'wrapper_id'   => 'wrapper-name-company',
    ),
    array(
        'id'           => 'text-1',
        'element_id'   => 'text-1',
        'form_id'      => 'wrapper-name-company',
        'parent_group' => '',
        'type'         => 'text',
        'cols'         => '6',
        'required'     => true,
        'field_label'  => 'Company name',
        'placeholder'  => '',
        'wrapper_id'   => 'wrapper-name-company',
    ),
    // Row 2: Company email (col 6) + Phone (col 6)
    array(
        'id'           => 'email-1',
        'element_id'   => 'email-1',
        'form_id'      => 'wrapper-email-phone',
        'parent_group' => '',
        'type'         => 'email',
        'cols'         => '6',
        'required'     => true,
        'field_label'  => 'Company email',
        'placeholder'  => '',
        'validation'   => true,
        'wrapper_id'   => 'wrapper-email-phone',
    ),
    array(
        'id'                    => 'phone-1',
        'element_id'            => 'phone-1',
        'form_id'               => 'wrapper-email-phone',
        'parent_group'          => '',
        'type'                  => 'phone',
        'cols'                  => '6',
        'required'              => false,
        'field_label'           => 'Phone',
        'placeholder'           => '',
        'phone_validation_type' => 'standard',
        'wrapper_id'            => 'wrapper-email-phone',
    ),
    // Row 3: How can we help? (col 12)
    array(
        'id'                => 'select-1',
        'element_id'        => 'select-1',
        'form_id'           => 'wrapper-help-select',
        'parent_group'      => '',
        'type'              => 'select',
        'cols'              => '12',
        'required'          => true,
        'field_label'       => 'How can we help?',
        'placeholder'       => 'Select',
        'value_type'        => 'single',
        'multiselect_style' => 'standard',
        'wrapper_id'        => 'wrapper-help-select',
        'options'           => array(
            array(
                'label' => 'CMMC Level 1',
                'value' => 'CMMC Level 1',
                'limit' => '',
                'key'   => 'opt-1',
            ),
            array(
                'label' => 'CMMC Level 2',
                'value' => 'CMMC Level 2',
                'limit' => '',
                'key'   => 'opt-2',
            ),
            array(
                'label' => 'NIST SP 800-171 compliance',
                'value' => 'NIST SP 800-171 compliance',
                'limit' => '',
                'key'   => 'opt-3',
            ),
            array(
                'label' => 'Gap or mock assessment',
                'value' => 'Gap or mock assessment',
                'limit' => '',
                'key'   => 'opt-4',
            ),
            array(
                'label' => 'Enclave support or GCC High migration',
                'value' => 'Enclave support or GCC High migration',
                'limit' => '',
                'key'   => 'opt-5',
            ),
            array(
                'label' => 'Support after my CMMC assessment',
                'value' => 'Support after my CMMC assessment',
                'limit' => '',
                'key'   => 'opt-6',
            ),
            array(
                'label' => 'Not sure if we handle CUI',
                'value' => 'Not sure if we handle CUI',
                'limit' => '',
                'key'   => 'opt-7',
            ),
            array(
                'label' => 'Something else',
                'value' => 'Something else',
                'limit' => '',
                'key'   => 'opt-8',
            ),
        ),
    ),
    // Row 4: Message (col 12)
    array(
        'id'           => 'textarea-1',
        'element_id'   => 'textarea-1',
        'form_id'      => 'wrapper-message',
        'parent_group' => '',
        'type'         => 'textarea',
        'cols'         => '12',
        'required'     => false,
        'field_label'  => 'Message',
        'placeholder'  => 'Anything we should know (optional)',
        'wrapper_id'   => 'wrapper-message',
    ),
);

$meta['fields'] = $fields;

// Settings
if ( ! isset( $meta['settings'] ) || ! is_array( $meta['settings'] ) ) {
    $meta['settings'] = array();
}
$meta['settings']['formName'] = 'Contact Us Form';
$meta['settings']['submitData'] = array(
    'custom-submit-text' => 'Contact our team',
);
$meta['settings']['thankyou-message'] = 'Thank you! Your inquiry has been received. Our team will reach out shortly.';

// Notifications: Every submission must be emailed to info@secure-centric.com
$meta['notifications'] = array(
    array(
        'slug'             => 'notification-1234-4567',
        'label'            => 'Admin Email',
        'email-recipients' => 'default',
        'recipients'       => 'info@secure-centric.com',
        'email-subject'    => 'New Contact Inquiry #{submission_id} - {name-1} from {text-1}',
        'email-editor'     => "You have a new contact form submission:<br/><br/><strong>Full name:</strong> {name-1}<br/><strong>Company name:</strong> {text-1}<br/><strong>Company email:</strong> {email-1}<br/><strong>Phone:</strong> {phone-1}<br/><strong>How can we help?:</strong> {select-1}<br/><strong>Message:</strong> {textarea-1}<br/><br/>---<br/>This message was sent from {site_url}.",
        'email-attachment' => 'true',
        'fill-empty-fields'=> 'true',
        'type'             => 'default',
    ),
);

// Behaviors
$meta['behaviors'] = array(
    array(
        'slug'                   => 'behavior-1234-4567',
        'label'                  => '',
        'autoclose-time'         => 5,
        'autoclose'              => 'true',
        'newtab'                 => 'sametab',
        'thankyou-message'       => 'Thank you! Your inquiry has been received. Our team will reach out shortly.',
        'email-thankyou-message' => '',
        'manual-thankyou-message'=> '',
        'submission-behaviour'   => 'behaviour-thankyou',
        'redirect-url'           => '',
    ),
);

update_post_meta( $form_id, 'forminator_form_meta', $meta );

// Also update post title of Form 101
wp_update_post( array(
    'ID'         => $form_id,
    'post_title' => 'Contact Us Form',
) );

echo "Successfully updated Forminator Form ID 101.\n";
