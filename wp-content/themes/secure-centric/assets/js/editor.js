/**
 * Gutenberg Custom Blocks Registration & Inspector Controls
 * Secure-Centric WordPress Custom Block Theme
 */
(function (wp) {
  'use strict';

  if (!wp || !wp.blocks || !wp.element) return;

  const { registerBlockType } = wp.blocks;
  const { createElement: el, Fragment } = wp.element;
  const blockEditor = wp.blockEditor || wp.editor;
  const { InspectorControls, useBlockProps } = blockEditor;
  const { PanelBody, TextControl, TextareaControl, SelectControl } = wp.components;
  const ServerSideRender = wp.serverSideRender;

  /**
   * Helper to create standard block preview with ServerSideRender & Sidebar Controls
   */
  function createBlockRegistration(blockName, config) {
    registerBlockType(blockName, {
      title: config.title,
      icon: config.icon || 'shield',
      category: config.category || 'secure-centric-process',
      attributes: config.attributes || {},
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        // Gutenberg Block Props for selection, focus, toolbar, and click handling
        const blockProps = useBlockProps ? useBlockProps({
          className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
          style: { position: 'relative', cursor: 'pointer' },
          onClick: function (event) {
            if (clientId && wp.data && wp.data.dispatch) {
              wp.data.dispatch('core/block-editor').selectBlock(clientId);
            }
          }
        }) : {
          className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
          style: { position: 'relative', cursor: 'pointer' },
          onClick: function (event) {
            if (clientId && wp.data && wp.data.dispatch) {
              wp.data.dispatch('core/block-editor').selectBlock(clientId);
            }
          }
        };

        // Build Sidebar Controls
        const inspectorControls = config.controls ? el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: `${config.title} Settings`, initialOpen: true },
            config.controls.map((ctrl, i) => {
              if (ctrl.type === 'textarea') {
                return el(TextareaControl, {
                  key: i,
                  label: ctrl.label,
                  value: attributes[ctrl.attr] || '',
                  onChange: function (val) {
                    const update = {};
                    update[ctrl.attr] = val;
                    setAttributes(update);
                  }
                });
              } else if (ctrl.type === 'select') {
                return el(SelectControl, {
                  key: i,
                  label: ctrl.label,
                  value: attributes[ctrl.attr] || (ctrl.options[0] ? ctrl.options[0].value : ''),
                  options: ctrl.options,
                  onChange: function (val) {
                    const update = {};
                    update[ctrl.attr] = val;
                    setAttributes(update);
                  }
                });
              } else {
                return el(TextControl, {
                  key: i,
                  label: ctrl.label,
                  value: attributes[ctrl.attr] || '',
                  onChange: function (val) {
                    const update = {};
                    update[ctrl.attr] = val;
                    setAttributes(update);
                  }
                });
              }
            })
          )
        ) : null;

        // Visual Click-to-Edit Badge at top of each block in editor
        const editBadge = el('div', {
          className: 'sc-editor-block-badge',
          style: {
            position: 'absolute',
            top: '8px',
            right: '12px',
            zIndex: 100,
            background: isSelected ? '#2F5BFF' : '#0B1437',
            color: '#FFFFFF',
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-mono, monospace)',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            letterSpacing: '0.04em'
          }
        }, isSelected ? `Editing: ${config.title}` : `Click to Edit: ${config.title}`);

        // Live ServerSideRender Preview
        const preview = ServerSideRender ? el(ServerSideRender, {
          block: blockName,
          attributes: attributes,
          EmptyResponsePlaceholder: () => el('div', {
            style: { padding: '36px 20px', background: '#F5F7FF', border: '1px solid #DCE4FF', borderRadius: '8px', textAlign: 'center' }
          }, `Loading ${config.title} preview...`),
          ErrorResponsePlaceholder: () => el('div', {
            style: { padding: '36px 20px', background: '#F5F7FF', border: '1px solid #DCE4FF', borderRadius: '8px', textAlign: 'center', color: '#0B1437' }
          }, el('h4', { style: { margin: '0 0 8px 0' } }, config.title), el('p', { style: { margin: 0, fontSize: '0.875rem', color: '#8A93B2' } }, 'Configure attributes in the right sidebar.'))
        }) : el('div', {
          style: { padding: '36px 20px', background: '#F5F7FF', border: '1px solid #DCE4FF', borderRadius: '8px' }
        }, el('b', {}, config.title));

        return el(
          Fragment,
          {},
          inspectorControls,
          el('div', blockProps, editBadge, preview)
        );
      },
      save: function () {
        // Dynamic PHP render template handled via render.php
        return null;
      }
    });
  }

  // 1. Hero Block
  createBlockRegistration('secure-centric/hero', {
    title: 'Secure-Centric Hero',
    icon: 'cover-image',
    category: 'secure-centric-heroes',
    attributes: {
      layout: { type: 'string', default: 'home' },
      eyebrow: { type: 'string', default: '// NIST SP 800-171 / CMMC Compliance Consultants' },
      title: { type: 'string', default: 'CMMC compliance for defense subcontractors, guided by a Cyber AB RPO' },
      highlightText: { type: 'string', default: 'Cyber AB RPO' },
      description: { type: 'string', default: 'We help defense contractors and suppliers get ready for CMMC and NIST SP 800-171, from the first site visit to the annual affirmation.' },
      primaryBtnText: { type: 'string', default: 'Book a Discovery Call →' },
      primaryBtnUrl: { type: 'string', default: '#contact' },
      subText: { type: 'string', default: '30 min · No sales pitch · Signed NDA' }
    },
    controls: [
      { attr: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { attr: 'title', label: 'Main Headline', type: 'text' },
      { attr: 'highlightText', label: 'Highlighted Cyan Text', type: 'text' },
      { attr: 'description', label: 'Subtitle Description', type: 'textarea' },
      { attr: 'primaryBtnText', label: 'Primary CTA Text', type: 'text' },
      { attr: 'primaryBtnUrl', label: 'Primary CTA Link', type: 'text' },
      { attr: 'subText', label: 'Under-Button Text', type: 'text' },
      {
        attr: 'layout',
        label: 'Layout Variant',
        type: 'select',
        options: [
          { label: 'Home Layout (with 3-Minute Readiness Tool)', value: 'home' },
          { label: 'Service Layout (with Deliverables Checklist)', value: 'service' }
        ]
      }
    ]
  });

  // 2. Logo Marquee Block
  createBlockRegistration('secure-centric/logo-marquee', {
    title: 'Client Logos Marquee',
    icon: 'images-alt2',
    category: 'secure-centric-proof',
    attributes: {
      title: { type: 'string', default: 'Organizations that have worked with Secure-Centric' }
    },
    controls: [
      { attr: 'title', label: 'Marquee Title', type: 'text' }
    ]
  });

  // 3. Roadmap Stepper Block
  createBlockRegistration('secure-centric/roadmap-stepper', {
    title: 'CMMC 8-Step Interactive Journey',
    icon: 'flag',
    category: 'secure-centric-process',
    attributes: {
      eyebrow: { type: 'string', default: '// THE CMMC PROCESS' },
      title: { type: 'string', default: 'Your CMMC journey, step by step' },
      linkText: { type: 'string', default: 'View Detailed 8-Step Process →' },
      linkUrl: { type: 'string', default: '#page-19' },
      autoplayDelay: { type: 'number', default: 3800 }
    },
    controls: [
      { attr: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { attr: 'title', label: 'Section Heading', type: 'text' },
      { attr: 'linkText', label: 'Header Link Text', type: 'text' },
      { attr: 'linkUrl', label: 'Header Link URL', type: 'text' }
    ]
  });

  // 4. Testimonials Block
  createBlockRegistration('secure-centric/testimonials', {
    title: 'Client Testimonials Carousel',
    icon: 'format-quote',
    category: 'secure-centric-proof',
    attributes: {
      displayMode: { type: 'string', default: 'carousel' }
    },
    controls: [
      {
        attr: 'displayMode',
        label: 'Display Mode',
        type: 'select',
        options: [
          { label: 'Delayed Carousel (Full Viewport Auto-Play)', value: 'carousel' },
          { label: 'Static Grid (All Reviews Visible)', value: 'grid' }
        ]
      }
    ]
  });

  // 5. Section Explainer Block
  createBlockRegistration('secure-centric/section-explainer', {
    title: 'Section Explainer',
    icon: 'info-outline',
    category: 'secure-centric-process',
    attributes: {
      eyebrow: { type: 'string', default: '// SECTION EXPLAINER' },
      title: { type: 'string', default: 'What is CMMC compliance?' },
      p1: { type: 'string', default: 'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense subcontractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).' },
      p2: { type: 'string', default: 'Under 32 CFR Part 170 and DFARS 252.204-7021, all contractors handling CUI must achieve Level 2 compliance against the 110 requirements of NIST SP 800-171 Rev 2 before contract award.' },
      p3: { type: 'string', default: 'Our Cyber AB Registered Practitioners conduct on-site facility walkthroughs, map exact CUI boundaries, guide technical remediation, and co-author your assessor-ready System Security Plan (SSP).' }
    },
    controls: [
      { attr: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { attr: 'title', label: 'Heading', type: 'text' },
      { attr: 'p1', label: 'Paragraph 1', type: 'textarea' },
      { attr: 'p2', label: 'Paragraph 2', type: 'textarea' },
      { attr: 'p3', label: 'Paragraph 3', type: 'textarea' }
    ]
  });

  // 6. Why Proof Block
  createBlockRegistration('secure-centric/why-proof', {
    title: 'Why Secure-Centric & Proof',
    icon: 'shield-alt',
    category: 'secure-centric-proof',
    attributes: {
      eyebrow: { type: 'string', default: '// PROOF & CREDENTIALS' },
      title: { type: 'string', default: 'Why Secure-Centric' },
      description: { type: 'string', default: 'Secure-Centric is an accredited Cyber AB Registered Provider Organization (RPO). We help defense subcontractors navigate DFARS 252.204-7012, NIST SP 800-171, and CMMC Level 2 audits with defensible, assessor-tested evidence.' },
      linkText: { type: 'string', default: 'Full Company Credentials →' },
      linkUrl: { type: 'string', default: '/secure-centric/about/' }
    },
    controls: [
      { attr: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { attr: 'title', label: 'Heading', type: 'text' },
      { attr: 'description', label: 'Description', type: 'textarea' },
      { attr: 'linkText', label: 'Link Text', type: 'text' },
      { attr: 'linkUrl', label: 'Link URL', type: 'text' }
    ]
  });

  // 7. Resource Cards Block
  createBlockRegistration('secure-centric/resource-cards', {
    title: 'CMMC Guides, Checklists & Tools',
    icon: 'portfolio',
    category: 'secure-centric-process',
    attributes: {
      title: { type: 'string', default: 'CMMC guides, checklists and tools' }
    },
    controls: [
      { attr: 'title', label: 'Section Title', type: 'text' }
    ]
  });

  // 8. FAQ Accordion Block
  createBlockRegistration('secure-centric/accordion-faq', {
    title: 'Common Questions Accordion',
    icon: 'editor-help',
    category: 'secure-centric-process',
    attributes: {
      eyebrow: { type: 'string', default: '// FREQUENTLY ASKED QUESTIONS' },
      title: { type: 'string', default: 'Common questions' },
      description: { type: 'string', default: 'Still have questions regarding your specific CMMC clauses or audit dates? Speak directly with our lead Registered Practitioner.' },
      btnText: { type: 'string', default: 'Book a Discovery Call →' },
      btnUrl: { type: 'string', default: '#contact' }
    },
    controls: [
      { attr: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { attr: 'title', label: 'Heading', type: 'text' },
      { attr: 'description', label: 'Description', type: 'textarea' },
      { attr: 'btnText', label: 'Button Text', type: 'text' },
      { attr: 'btnUrl', label: 'Button URL', type: 'text' }
    ]
  });

  // 9. CTA Banner Block
  createBlockRegistration('secure-centric/cta-banner', {
    title: 'Final Call to Action Band',
    icon: 'megaphone',
    category: 'secure-centric-cta',
    attributes: {
      title: { type: 'string', default: 'Planning to get started on CMMC?' },
      description: { type: 'string', default: 'Talk with an accredited Cyber AB Registered Provider Organization. Get an actionable first step in writing within 30 minutes.' },
      primaryBtnText: { type: 'string', default: 'Book a Discovery Call →' },
      primaryBtnUrl: { type: 'string', default: '#contact' },
      phoneText: { type: 'string', default: 'Call (323) 410-5941' },
      phoneUrl: { type: 'string', default: 'tel:323-410-5941' }
    },
    controls: [
      { attr: 'title', label: 'Banner Heading', type: 'text' },
      { attr: 'description', label: 'Banner Subtitle', type: 'textarea' },
      { attr: 'primaryBtnText', label: 'Primary CTA Text', type: 'text' },
      { attr: 'primaryBtnUrl', label: 'Primary CTA URL', type: 'text' },
      { attr: 'phoneText', label: 'Phone Label', type: 'text' },
      { attr: 'phoneUrl', label: 'Phone URL / tel:', type: 'text' }
    ]
  });

  // 10. Form Embed Block
  createBlockRegistration('secure-centric/form-embed', {
    title: 'Forminator / NDA Form Embed',
    icon: 'feedback',
    category: 'secure-centric-cta',
    attributes: {
      title: { type: 'string', default: 'Schedule a Confidential Discovery Call' },
      description: { type: 'string', default: 'Submit your contact details and contract requirements. We review under bilateral NDA within 1 business day.' }
    },
    controls: [
      { attr: 'title', label: 'Form Heading', type: 'text' },
      { attr: 'description', label: 'Form Subtitle', type: 'textarea' }
    ]
  });

  // 11. Comparison Grid Block
  createBlockRegistration('secure-centric/comparison-grid', {
    title: 'CMMC Audit Readiness Matrix',
    icon: 'grid-view',
    category: 'secure-centric-proof',
    attributes: {
      title: { type: 'string', default: 'Why Defense Subcontractors Choose Secure-Centric' }
    },
    controls: [
      { attr: 'title', label: 'Heading', type: 'text' }
    ]
  });

  console.log('Secure-Centric Gutenberg Blocks Registered with direct selectBlock on click!');
})(window.wp);
