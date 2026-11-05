/**
 * Gutenberg Custom Blocks Registration & Granular Inspector Controls
 * Secure-Centric WordPress Custom Block Theme
 */
(function (wp) {
  'use strict';

  function initBlocks() {
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
        edit: function (props) {
          const { attributes, setAttributes, isSelected, clientId } = props;

          const blockProps = useBlockProps ? useBlockProps({
            className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
            style: { position: 'relative', cursor: 'pointer' },
            onClick: function () {
              if (clientId && wp.data && wp.data.dispatch) {
                wp.data.dispatch('core/block-editor').selectBlock(clientId);
              }
            }
          }) : {
            className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
            style: { position: 'relative', cursor: 'pointer' },
            onClick: function () {
              if (clientId && wp.data && wp.data.dispatch) {
                wp.data.dispatch('core/block-editor').selectBlock(clientId);
              }
            }
          };

          const inspectorControls = config.panels ? el(
            InspectorControls,
            {},
            config.panels.map(function (panel, pIdx) {
              return el(
                PanelBody,
                {
                  key: 'panel-' + pIdx,
                  title: panel.title,
                  initialOpen: panel.initialOpen !== undefined ? panel.initialOpen : (pIdx === 0)
                },
                panel.fields.map(function (field, fIdx) {
                  const val = attributes[field.name] !== undefined ? attributes[field.name] : (field.default || '');
                  if (field.type === 'select') {
                    return el(SelectControl, {
                      key: 'field-' + field.name + '-' + fIdx,
                      label: field.label,
                      value: val,
                      options: field.options,
                      onChange: function (newVal) {
                        const upd = {};
                        upd[field.name] = newVal;
                        setAttributes(upd);
                      }
                    });
                  } else if (field.type === 'textarea') {
                    return el(TextareaControl, {
                      key: 'field-' + field.name + '-' + fIdx,
                      label: field.label,
                      value: val,
                      rows: field.rows || 3,
                      onChange: function (newVal) {
                        const upd = {};
                        upd[field.name] = newVal;
                        setAttributes(upd);
                      }
                    });
                  } else {
                    return el(TextControl, {
                      key: 'field-' + field.name + '-' + fIdx,
                      label: field.label,
                      value: val,
                      onChange: function (newVal) {
                        const upd = {};
                        upd[field.name] = newVal;
                        setAttributes(upd);
                      }
                    });
                  }
                })
              );
            })
          ) : null;

          const previewElement = ServerSideRender ? el(ServerSideRender, {
            block: blockName,
            attributes: attributes
          }) : el('div', {
            style: { padding: '24px', border: '1px dashed #2F5BFF', background: '#F8FAFC', borderRadius: '8px' }
          }, el('strong', {}, config.title + ' (Select block to edit in right sidebar)'));

          return el(
            Fragment,
            {},
            inspectorControls,
            el(
              'div',
              blockProps,
              previewElement
            )
          );
        },
        save: function () {
          return null; // Dynamic block rendered via render.php
        }
      });
    }

    // =========================================================================
    // 1. HERO BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/hero', {
      title: 'Hero Section (CMMC Interactive)',
      icon: 'shield',
      category: 'secure-centric-heroes',
      panels: [
        {
          title: 'Header & Main Headline',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow Tag', default: '// ACCREDITED CYBER AB RPO · LEVEL 2 READINESS' },
            { name: 'title', label: 'Main Headline', default: 'DEFENSE-GRADE CMMC & NIST SP 800-171 COMPLIANCE' },
            { name: 'highlightText', label: 'Highlighted Suffix', default: 'BUILT TO WITHSTAND DIBCAC AUDITS.' },
            { name: 'description', label: 'Hero Subtext Description', type: 'textarea', rows: 3, default: 'We guide defense subcontractors through scoping, on-site walkthroughs, SSP authoring, and C3PAO assessment.' }
          ]
        },
        {
          title: 'Primary CTA Button',
          initialOpen: false,
          fields: [
            { name: 'primaryBtnText', label: 'Button Text', default: 'Get Scoped for CMMC Level 2 →' },
            { name: 'primaryBtnUrl', label: 'Button Link URL', default: '#contact' },
            { name: 'subText', label: 'Button Microcopy', default: 'Accredited Cyber AB RPO · 100% First-Pass Record · NDA Standard' }
          ]
        },
        {
          title: 'Interactive Topic 1',
          initialOpen: false,
          fields: [
            { name: 'topic1Title', label: 'Title', default: '110 NIST Controls' },
            { name: 'topic1Desc', label: 'Description', type: 'textarea', default: 'Comprehensive mapping across all 14 security domains.' },
            { name: 'topic1Url', label: 'Link URL', default: '#page-5' }
          ]
        },
        {
          title: 'Interactive Topic 2',
          initialOpen: false,
          fields: [
            { name: 'topic2Title', label: 'Title', default: 'On-Site Walkthroughs' },
            { name: 'topic2Desc', label: 'Description', type: 'textarea', default: 'Physical inspection of shop floors and server enclaves.' },
            { name: 'topic2Url', label: 'Link URL', default: '#page-2' }
          ]
        },
        {
          title: 'Interactive Topic 3',
          initialOpen: false,
          fields: [
            { name: 'topic3Title', label: 'Title', default: 'Assessor-Ready SSP' },
            { name: 'topic3Desc', label: 'Description', type: 'textarea', default: 'Defensible documentation tailored to your exact prime contract.' },
            { name: 'topic3Url', label: 'Link URL', default: '#page-8' }
          ]
        },
        {
          title: 'Quick Quiz Widget',
          initialOpen: false,
          fields: [
            { name: 'quizBadge', label: 'Badge', default: 'INTERACTIVE CHECK' },
            { name: 'quizChip', label: 'Pill Tag', default: '2-Minute Self-Check' },
            { name: 'quizTitle', label: 'Card Title', default: 'Are you subject to DFARS 252.204-7012?' },
            { name: 'quizDesc', label: 'Card Description', type: 'textarea', default: 'Enter your prime contract clause or contractor CAGE code for instant scoping guidance.' },
            { name: 'quizPlaceholder', label: 'Input Placeholder', default: 'e.g. 252.204-7012 or CAGE code' },
            { name: 'quizBtnText', label: 'Button Text', default: 'Check Scope →' },
            { name: 'quizNote', label: 'Privacy Note', default: 'Strictly confidential under Bilateral NDA' }
          ]
        }
      ]
    });

    // =========================================================================
    // 2. LOGO MARQUEE BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/logo-marquee', {
      title: 'Defense Marquee (Infinite Logos)',
      icon: 'format-image',
      category: 'secure-centric-heroes',
      panels: [
        {
          title: 'Marquee Settings',
          initialOpen: true,
          fields: [
            { name: 'title', label: 'Header Text', default: 'TRUSTED BY DEFENSE CONTRACTORS & AEROSPACE SUPPLIERS NATIONWIDE' },
            { name: 'logosList', label: 'Logos (comma separated)', type: 'textarea', rows: 4, default: 'General Dynamics, Northrop Grumman, Raytheon Technologies, Lockheed Martin, L3Harris, BAE Systems, Boeing Defense, Honeywell Aerospace, Leidos, CACI' }
          ]
        }
      ]
    });

    // =========================================================================
    // 3. ROADMAP STEPPER BLOCK
    // =========================================================================
    const roadmapPanels = [
      {
        title: 'Roadmap Header & Navigation',
        initialOpen: true,
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', default: '// THE CMMC PROCESS' },
          { name: 'title', label: 'Main Title', default: 'Your CMMC journey, step by step' },
          { name: 'detailedProcessLinkText', label: 'Link Text', default: 'View Detailed 8-Step Process →' },
          { name: 'detailedProcessLinkUrl', label: 'Link URL', default: '#page-19' },
          { name: 'flagText', label: 'Milestone 07 Flag Tooltip', default: 'Target C3PAO Certification Milestone' }
        ]
      }
    ];

    const defRoadmap = [
      { no: '01', name: 'Site visit', phase: 'Phase 1: Facility Walkthrough & Scope Discovery', help: 'In-person physical & technical walkthrough of facilities, server rooms, and shop-floor enclaves.', who: 'You + Secure-Centric', output: 'Asset discovery baseline & boundary notes', link: '#page-2' },
      { no: '02', name: 'Scoping', phase: 'Phase 2: CUI Boundary & Enclave Architecture', help: 'Map CUI/FCI flows, identify people, systems, and network storage touching DoD contracts.', who: 'Secure-Centric + IT Leads', output: 'Formal Scope Document & Data-Flow Architecture', link: '#page-16' },
      { no: '03', name: 'Gap assessment', phase: 'Phase 3: 110-Control Baseline Scoring', help: 'Audit all 110 NIST SP 800-171 controls against actual day-to-day operations.', who: 'Secure-Centric', output: 'Defensible SPRS Score estimate & findings register', link: '#page-5' },
      { no: '04', name: 'Remediation', phase: 'Phase 4: Engineering & Policy Remediation', help: 'Prioritize fixes by risk weight; guide MFA, encryption, logging, and enclave deployments.', who: 'Your IT/MSP (guided by us)', output: 'Remediation Roadmap with owners and completion targets', link: '#page-7' },
      { no: '05', name: 'Documentation', phase: 'Phase 5: System Security Plan (SSP) & POA&M', help: 'Co-write your System Security Plan (SSP), POA&M, and all required operational policies.', who: 'Secure-Centric + You', output: 'Assessor-ready SSP and comprehensive policy suite', link: '#page-8' },
      { no: '06', name: 'Readiness review', phase: 'Phase 6: C3PAO Mock Audit & Interview Prep', help: 'Full rehearsal mock audit simulating C3PAO interview techniques and evidence requests.', who: 'Secure-Centric RPs', output: 'Readiness sign-off report & Evidence Binder index', link: '#page-4' },
      { no: '07', name: 'Assessment', phase: 'Phase 7: Official C3PAO Level 2 Assessment', help: 'We stand alongside your team during official DIBCAC or Authorized C3PAO evaluation.', who: 'Independent C3PAO', output: 'Level 2 CMMC Certification recommendation', link: '#page-19' },
      { no: '08', name: 'Maintain', phase: 'Phase 8: Continuous Monitoring & Affirmation', help: 'Continuous compliance, annual SPRS reaffirmation, change management, and evidence refreshes.', who: 'Virtual CISO / You', output: 'Annual Affirmation pack & ongoing compliance posture', link: '#page-11' }
    ];

    defRoadmap.forEach(function (st, idx) {
      const n = idx + 1;
      roadmapPanels.push({
        title: 'Milestone ' + st.no + ': ' + st.name,
        initialOpen: false,
        fields: [
          { name: 'step' + n + 'Name', label: 'Step Name', default: st.name },
          { name: 'step' + n + 'Phase', label: 'Phase Title', default: st.phase },
          { name: 'step' + n + 'Help', label: 'Detailed Description', type: 'textarea', default: st.help },
          { name: 'step' + n + 'Who', label: 'Who Does This Work', default: st.who },
          { name: 'step' + n + 'Output', label: 'Primary Deliverable', default: st.output },
          { name: 'step' + n + 'Link', label: 'Scope Link URL', default: st.link }
        ]
      });
    });

    createBlockRegistration('secure-centric/roadmap-stepper', {
      title: '8-Step CMMC Journey Roadmap',
      icon: 'randomize',
      category: 'secure-centric-process',
      panels: roadmapPanels
    });

    // =========================================================================
    // 4. TESTIMONIALS BLOCK
    // =========================================================================
    const testPanels = [
      {
        title: 'Testimonials Header & Layout',
        initialOpen: true,
        fields: [
          {
            name: 'displayMode',
            label: 'Display Mode',
            type: 'select',
            options: [
              { label: 'Infinite Carousel Marquee', value: 'carousel' },
              { label: 'Static 3+2 Grid', value: 'grid' }
            ],
            default: 'carousel'
          },
          { name: 'eyebrow', label: 'Eyebrow', default: '// CLIENT TESTIMONIALS' },
          { name: 'title', label: 'Headline', default: 'What Defense Contractors Say About Working With Us' }
        ]
      }
    ];

    const defReviews = [
      { num: '01', author: 'Alex Liu', role: 'IT Manager, Tower Semiconductor', avatar: 'AL', quote: 'Secure-Centric gave us absolute clarity on what was inside our CUI boundary and what was not. We passed our official C3PAO Level 2 assessment on the first attempt with zero open items.', linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' },
      { num: '02', author: 'Patrick Shaw', role: 'Cyber Security Analyst, Safran Federal Systems', avatar: 'PS', quote: "Their team was on site at our facility within two weeks. They didn't hand us generic compliance templates—they helped configure our actual firewalls, SIEM, and author an ironclad SSP.", linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' },
      { num: '03', author: 'Elena Rostova', role: 'VP Operations, Precision Aero Machining', avatar: 'ER', quote: 'We cut our assessment scope by almost 40% based on their enclave advisory alone. That decision alone saved us at least $80,000 in unnecessary software upgrades and audit fees.', linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' },
      { num: '04', author: 'Marcus Vance', role: 'Chief Information Officer, Vanguard Defense Tech', avatar: 'MV', quote: "The mock C3PAO interview sessions were intense and realistic. When DIBCAC conducted our actual review, there wasn't a single question or evidence request that we hadn't already prepared for.", linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' },
      { num: '05', author: 'David Chen', role: 'Director of Compliance, Apex Dynamics', avatar: 'DC', quote: 'Finding an RPO that actually understands precision CNC shop floor networks is rare. Secure-Centric bridged the gap between our machinists, IT, and Department of War compliance seamlessly.', linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' }
    ];

    defReviews.forEach(function (rev, idx) {
      const n = idx + 1;
      testPanels.push({
        title: 'Review ' + rev.num + ': ' + rev.author,
        initialOpen: false,
        fields: [
          { name: 'rev' + n + 'Author', label: 'Author Name', default: rev.author },
          { name: 'rev' + n + 'Role', label: 'Author Role / Company', default: rev.role },
          { name: 'rev' + n + 'Avatar', label: 'Avatar Initials', default: rev.avatar },
          { name: 'rev' + n + 'Quote', label: 'Quote Text', type: 'textarea', rows: 3, default: rev.quote },
          { name: 'rev' + n + 'LinkedinText', label: 'Verification Badge Text', default: rev.linkedinText },
          { name: 'rev' + n + 'LinkedinUrl', label: 'LinkedIn Post URL', default: rev.linkedinUrl }
        ]
      });
    });

    createBlockRegistration('secure-centric/testimonials', {
      title: 'Defense Client Testimonials',
      icon: 'format-quote',
      category: 'secure-centric-proof',
      panels: testPanels
    });

    // =========================================================================
    // 5. SECTION EXPLAINER BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/section-explainer', {
      title: 'Section Explainer & Overview',
      icon: 'text',
      category: 'secure-centric-heroes',
      panels: [
        {
          title: 'Explainer Content',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// SECTION EXPLAINER' },
            { name: 'title', label: 'Title', default: 'What is CMMC compliance?' },
            { name: 'p1', label: 'Paragraph 1', type: 'textarea', rows: 3, default: 'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense subcontractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).' },
            { name: 'p2', label: 'Paragraph 2', type: 'textarea', rows: 3, default: 'Under 32 CFR Part 170 and DFARS 252.204-7021, all contractors handling CUI must achieve Level 2 compliance against the 110 requirements of NIST SP 800-171 Rev 2 before contract award.' },
            { name: 'p3', label: 'Paragraph 3', type: 'textarea', rows: 3, default: 'Our Cyber AB Registered Practitioners conduct on-site facility walkthroughs, map exact CUI boundaries, guide technical remediation, and co-author your assessor-ready System Security Plan (SSP).' }
          ]
        }
      ]
    });

    // =========================================================================
    // 6. WHY PROOF & STATS BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/why-proof', {
      title: 'Why Secure-Centric & Proof Grid',
      icon: 'awards',
      category: 'secure-centric-proof',
      panels: [
        {
          title: 'Header & Links',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// PROOF & CREDENTIALS' },
            { name: 'title', label: 'Title', default: 'Why Secure-Centric' },
            { name: 'description', label: 'Description', type: 'textarea', default: 'Secure-Centric is an accredited Cyber AB Registered Provider Organization (RPO). We help defense subcontractors navigate DFARS 252.204-7012, NIST SP 800-171, and CMMC Level 2 audits with defensible, assessor-tested evidence.' },
            { name: 'linkText', label: 'Link Text', default: 'Full Company Credentials →' },
            { name: 'linkUrl', label: 'Link URL', default: '#contact' }
          ]
        },
        {
          title: 'Stat Numbers (Left Column)',
          initialOpen: false,
          fields: [
            { name: 'stat1Number', label: 'Stat 1 Number', default: '120+' },
            { name: 'stat1Label', label: 'Stat 1 Label', default: 'Defense contractors prepared for CMMC & NIST SP 800-171 audits' },
            { name: 'stat1Date', label: 'Stat 1 Note', default: 'As of Q4 2026' },
            { name: 'stat2Number', label: 'Stat 2 Number', default: '100%' },
            { name: 'stat2Label', label: 'Stat 2 Label', default: 'First-time pass record with Authorized C3PAO and DIBCAC assessors' },
            { name: 'stat2Date', label: 'Stat 2 Note', default: 'Level 2 CMMC audits' }
          ]
        },
        {
          title: 'Reason Card 1',
          initialOpen: false,
          fields: [
            { name: 'card1Icon', label: 'Icon', default: '🛡️' },
            { name: 'card1Title', label: 'Title', default: 'Cyber AB Authorized RPO' },
            { name: 'card1Text', label: 'Description', type: 'textarea', default: 'Formally credentialed by the Cyber AB (RPO #3942) with certified Registered Practitioners (RPs) leading every client engagement on site.' }
          ]
        },
        {
          title: 'Reason Card 2',
          initialOpen: false,
          fields: [
            { name: 'card2Icon', label: 'Icon', default: '🎯' },
            { name: 'card2Title', label: 'Title', default: 'Exclusive CMMC & NIST Focus' },
            { name: 'card2Text', label: 'Description', type: 'textarea', default: 'We do not sell generic IT services or managed antivirus. Our sole specialization is defense cybersecurity compliance and C3PAO audit readiness.' }
          ]
        },
        {
          title: 'Reason Card 3',
          initialOpen: false,
          fields: [
            { name: 'card3Icon', label: 'Icon', default: '🏭' },
            { name: 'card3Title', label: 'Title', default: 'On-Site Physical & Technical Walkthrough' },
            { name: 'card3Text', label: 'Description', type: 'textarea', default: 'We walk your facilities, shop floors, and secure server rooms to physically map CUI flows and isolate enclave boundaries.' }
          ]
        },
        {
          title: 'Reason Card 4',
          initialOpen: false,
          fields: [
            { name: 'card4Icon', label: 'Icon', default: '📐' },
            { name: 'card4Title', label: 'Title', default: 'Independent & Scope-Shrinking Advisory' },
            { name: 'card4Text', label: 'Description', type: 'textarea', default: 'We provide vendor-neutral advisory to shrink your assessment scope, saving tens of thousands in hardware, software, and audit fees.' }
          ]
        },
        {
          title: 'Verified Badges Strip',
          initialOpen: false,
          fields: [
            { name: 'badge1Text', label: 'Badge 1', default: '🛡️ Cyber AB RPO #3942' },
            { name: 'badge2Text', label: 'Badge 2', default: '⭐ Inc. 5000 #452 Fastest Growing' },
            { name: 'badge3Text', label: 'Badge 3', default: '🔒 Bilateral NDA Standard' },
            { name: 'badgeNote', label: 'Footer Note', default: 'Los Angeles, California · Nationwide On-Site Deployments' }
          ]
        }
      ]
    });

    // =========================================================================
    // 7. RESOURCE CARDS BLOCK
    // =========================================================================
    const resPanels = [
      {
        title: 'Section Header',
        initialOpen: true,
        fields: [
          { name: 'title', label: 'Headline', default: 'CMMC guides, checklists and tools' }
        ]
      }
    ];

    const defCards = [
      { num: 1, title: 'CMMC Complete Guide', desc: 'The definitive executive and technical overview of CMMC levels, rulemaking, and audits.', link: '#contact', icon: '📁' },
      { num: 2, title: 'CMMC Level 2 Guide', desc: '110 requirements across 14 security families: technical breakdown and scoping rules.', link: '#contact', icon: '📘' },
      { num: 3, title: 'NIST SP 800-171 Standard', desc: 'The foundational standard behind DFARS 7012 and Level 2 C3PAO certifications.', link: '#contact', icon: '🛡️' },
      { num: 4, title: 'CUI Scoping & Handling Guide', desc: 'Controlled Unclassified Information: identification, markings, and boundary isolation.', link: '#contact', icon: '🔒' },
      { num: 5, title: 'CMMC Enclave Advisory', desc: 'How segregating your CUI network saves months of implementation and audit costs.', link: '#contact', icon: '🏗️' },
      { num: 6, title: 'Level 2 Compliance Checklist', desc: 'Downloadable 110-control Excel checklist with ownership and objective columns.', link: '#contact', icon: '📊' }
    ];

    defCards.forEach(function (c) {
      resPanels.push({
        title: 'Resource ' + c.num + ': ' + c.title,
        initialOpen: false,
        fields: [
          { name: 'card' + c.num + 'Icon', label: 'Icon Emoji', default: c.icon },
          { name: 'card' + c.num + 'Title', label: 'Card Title', default: c.title },
          { name: 'card' + c.num + 'Desc', label: 'Short Description', type: 'textarea', default: c.desc },
          { name: 'card' + c.num + 'Link', label: 'Link URL', default: c.link }
        ]
      });
    });

    createBlockRegistration('secure-centric/resource-cards', {
      title: 'Resource Guides & Checklists Grid',
      icon: 'portfolio',
      category: 'secure-centric-process',
      panels: resPanels
    });

    // =========================================================================
    // 8. ACCORDION FAQ BLOCK
    // =========================================================================
    const faqPanels = [
      {
        title: 'Header & CTA Button',
        initialOpen: true,
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', default: '// FREQUENTLY ASKED QUESTIONS' },
          { name: 'title', label: 'Headline', default: 'Common questions' },
          { name: 'description', label: 'Description', type: 'textarea', default: 'Still have questions regarding your specific CMMC clauses or audit dates? Speak directly with our lead Registered Practitioner.' },
          { name: 'btnText', label: 'Button Text', default: 'Book a Discovery Call →' },
          { name: 'btnUrl', label: 'Button URL', default: '#contact' }
        ]
      }
    ];

    const defFaqs = [
      { num: 1, q: 'What is CMMC compliance?', a: 'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense contractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).' },
      { num: 2, q: 'Do you come to our site?', a: 'Yes, absolutely. An on-site facility walkthrough is step 1 of every engagement. We inspect physical boundaries, server rooms, and shop-floor terminals in person.' },
      { num: 3, q: 'Do you only work on CMMC and NIST SP 800-171?', a: 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.' },
      { num: 4, q: 'What happens after I book a discovery call?', a: 'Having your prime contract Section I DFARS clauses (e.g. 252.204-7012, 7019, 7020), your high-level network topology, and whether you handle CUI or FCI will make the call most productive.' },
      { num: 5, q: 'Who will we work with day to day?', a: 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.' }
    ];

    defFaqs.forEach(function (f) {
      faqPanels.push({
        title: 'FAQ ' + f.num + ': ' + f.q,
        initialOpen: false,
        fields: [
          { name: 'faq' + f.num + 'Q', label: 'Question', default: f.q },
          { name: 'faq' + f.num + 'A', label: 'Answer', type: 'textarea', rows: 3, default: f.a }
        ]
      });
    });

    createBlockRegistration('secure-centric/accordion-faq', {
      title: 'FAQ Accordion (Interactive)',
      icon: 'editor-help',
      category: 'secure-centric-process',
      panels: faqPanels
    });

    // =========================================================================
    // 9. THREE APPROACHES COMPARISON GRID
    // =========================================================================
    createBlockRegistration('secure-centric/comparison-grid', {
      title: 'Three Approaches Comparison Grid',
      icon: 'columns',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Section Heading',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// APPROACH COMPARISON' },
            { name: 'title', label: 'Title', default: 'Three Ways Defense Subcontractors Approach CMMC' },
            { name: 'description', label: 'Description', type: 'textarea', default: 'Why internal teams struggle with DIBCAC audits and where independent advisory creates true defensibility.' }
          ]
        },
        {
          title: 'Option 1: DIY / In-House IT',
          initialOpen: false,
          fields: [
            { name: 'opt1Badge', label: 'Badge', default: 'Option 1' },
            { name: 'opt1Title', label: 'Title', default: 'DIY / In-House IT' },
            { name: 'opt1Desc', label: 'Description', type: 'textarea', default: 'Internal IT teams download templates and attempt to interpret all 110 NIST controls alone.' },
            { name: 'opt1RiskTitle', label: 'Risk Heading', default: '❌ High Audit Failure Risk' },
            { name: 'opt1RiskDesc', label: 'Risk Details', type: 'textarea', default: 'Massive scope sprawl. Incomplete evidence packages fail official C3PAO audits on Day 1.' }
          ]
        },
        {
          title: 'Option 2: Generic Managed MSP',
          initialOpen: false,
          fields: [
            { name: 'opt2Badge', label: 'Badge', default: 'Option 2' },
            { name: 'opt2Title', label: 'Title', default: 'Generic Managed MSP' },
            { name: 'opt2Desc', label: 'Description', type: 'textarea', default: 'IT vendors sell bundled cloud licenses and automated compliance portal subscriptions.' },
            { name: 'opt2RiskTitle', label: 'Risk Heading', default: '⚠️ Conflict of Interest' },
            { name: 'opt2RiskDesc', label: 'Risk Details', type: 'textarea', default: 'MSPs grade their own homework. Portal checkmarks crumble during rigorous in-person DIBCAC interviews.' }
          ]
        },
        {
          title: 'Option 3: Secure-Centric Independent Advisory',
          initialOpen: false,
          fields: [
            { name: 'opt3Badge', label: 'Badge', default: 'Option 3: Secure-Centric' },
            { name: 'opt3Title', label: 'Title', default: 'Independent RPO Advisory' },
            { name: 'opt3Desc', label: 'Description', type: 'textarea', default: 'Accredited RPO walks your facilities, reduces CUI scope, engineers controls, and stands beside you through the audit.' },
            { name: 'opt3RiskTitle', label: 'Risk Heading', default: '✅ 100% First-Pass Defensibility' },
            { name: 'opt3RiskDesc', label: 'Risk Details', type: 'textarea', default: 'Rigorous mock assessments, verified SSP documentation, and scope reduction saving $50k+.' }
          ]
        }
      ]
    });

    // =========================================================================
    // 10. CTA BANNER BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/cta-banner', {
      title: 'Call to Action Band',
      icon: 'megaphone',
      category: 'secure-centric-cta',
      panels: [
        {
          title: 'Banner Content & Actions',
          initialOpen: true,
          fields: [
            { name: 'title', label: 'Headline', default: 'Planning to get started on CMMC?' },
            { name: 'description', label: 'Description', type: 'textarea', default: 'Talk with an accredited Cyber AB Registered Provider Organization. Get an actionable first step in writing within 30 minutes.' },
            { name: 'primaryBtnText', label: 'Primary Button Text', default: 'Book a Discovery Call →' },
            { name: 'primaryBtnUrl', label: 'Primary Button URL', default: '#contact' },
            { name: 'phoneText', label: 'Phone Call Text', default: 'Call (323) 410-5941' },
            { name: 'phoneUrl', label: 'Phone Call URL', default: 'tel:323-410-5941' }
          ]
        }
      ]
    });

    // =========================================================================
    // 11. FORM EMBED BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/form-embed', {
      title: 'Forminator Lead Capture Embed',
      icon: 'feedback',
      category: 'secure-centric-cta',
      panels: [
        {
          title: 'Form Settings & Copy',
          initialOpen: true,
          fields: [
            { name: 'badgeText', label: 'Security Badge', default: 'BILATERAL NDA GUARANTEE' },
            { name: 'title', label: 'Form Title', default: 'Book a 30-Minute Scoping Call' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Strictly confidential under Bilateral NDA. We review your CUI boundary and timeline.' },
            { name: 'formId', label: 'Forminator Form ID (leave blank for native defense form)', default: '' }
          ]
        }
      ]
    });

    console.log('Secure-Centric All 11 Gutenberg Blocks Registered with Granular InspectorControls!');
  }

  if (wp.domReady) {
    wp.domReady(initBlocks);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlocks);
  } else {
    initBlocks();
  }
})(window.wp || {});
