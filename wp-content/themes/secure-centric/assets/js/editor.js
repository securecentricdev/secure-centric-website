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
    const { PanelBody, TextControl, TextareaControl, SelectControl, Button, RangeControl } = wp.components;
    const ServerSideRender = wp.serverSideRender;

    /**
     * Helper to safely decode JSON array attributes across Gutenberg comment serialization
     */
    function safeParseJsonArray(raw, fallback) {
      if (!raw) return (fallback || []).slice();
      if (Array.isArray(raw)) return raw;
      if (typeof raw === 'object' && raw !== null) return [raw];
      if (typeof raw === 'string') {
        try {
          var clean = raw
            .replace(/u005c(u[0-9a-fA-F]{4})/g, function (_, m) {
              return String.fromCharCode(parseInt(m.substring(1), 16));
            })
            .replace(/(?<![a-zA-Z0-9])u([0-9a-fA-F]{4})/g, function (_, m) {
              return String.fromCharCode(parseInt(m, 16));
            })
            .replace(/\\?u0022/g, '"')
            .replace(/&quot;/g, '"');
          var parsed = JSON.parse(clean);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e1) {
          try {
            var parsed2 = JSON.parse(raw);
            if (Array.isArray(parsed2) && parsed2.length > 0) return parsed2;
          } catch (e2) {}
        }
      }
      return (fallback || []).slice();
    }

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
    // 1. HERO BLOCK (CUSTOM BACKGROUND MEDIA & FULL GRANULAR CONTROLS)
    // =========================================================================
    registerBlockType('secure-centric/hero', {
      title: 'Hero Section (CMMC Interactive)',
      icon: 'shield',
      category: 'secure-centric-heroes',
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

        const MediaUploadComponent = (wp.blockEditor && wp.blockEditor.MediaUpload) || (wp.editor && wp.editor.MediaUpload);
        const bgType = attributes.bgMediaType || 'video';

        const inspectorControls = el(
          InspectorControls,
          {},
          // Panel 1: Hero Background Media
          el(
            PanelBody,
            { title: 'Hero Background Media & Video', initialOpen: true },
            el(SelectControl, {
              label: 'Background Media Format',
              value: bgType,
              options: [
                { label: 'Video Background (MP4 / WebM)', value: 'video' },
                { label: 'Static Image Background', value: 'image' }
              ],
              onChange: function (val) { setAttributes({ bgMediaType: val }); }
            }),
            bgType === 'video' ? el(Fragment, {},
              el('p', { style: { fontSize: '12px', color: '#64748B', margin: '8px 0 12px', lineHeight: 1.5 } },
                'By default, the defense concept MP4 video loops smoothly in the background. You can upload your own custom video file or poster image below.'
              ),
              el('div', {
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '14px'
                }
              },
                el('strong', { style: { display: 'block', fontSize: '12px', color: '#0F172A', marginBottom: '8px' } },
                  'Video File (MP4 / WebM)'
                ),
                attributes.bgVideoUrl ? el('div', { style: { fontSize: '11px', color: '#059669', marginBottom: '8px', wordBreak: 'break-all' } },
                  '✓ Custom Video: ' + attributes.bgVideoUrl
                ) : el('div', { style: { fontSize: '11px', color: '#64748B', marginBottom: '8px' } },
                  '• Using Default: /assets/video/cmmc-concept.mp4'
                ),
                el('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                  MediaUploadComponent ? el(MediaUploadComponent, {
                    onSelect: function (media) {
                      setAttributes({ bgVideoUrl: media.url, bgVideoId: media.id });
                    },
                    allowedTypes: ['video'],
                    value: attributes.bgVideoId,
                    render: function (obj) {
                      return el(Button, {
                        isSecondary: true,
                        isSmall: true,
                        onClick: obj.open
                      }, attributes.bgVideoUrl ? 'Change Custom Video' : 'Upload Custom Video');
                    }
                  }) : null,
                  attributes.bgVideoUrl ? el(Button, {
                    isTertiary: true,
                    isSmall: true,
                    onClick: function () {
                      setAttributes({ bgVideoUrl: '', bgVideoId: 0 });
                    }
                  }, 'Reset to Default') : null
                )
              ),
              el('div', {
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '14px'
                }
              },
                el('strong', { style: { display: 'block', fontSize: '12px', color: '#0F172A', marginBottom: '8px' } },
                  'Video Poster Image (First Frame)'
                ),
                attributes.bgPosterUrl ? el('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' } },
                  el('img', {
                    src: attributes.bgPosterUrl,
                    style: { width: '64px', height: '36px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #CBD5E1' },
                    alt: 'Poster'
                  }),
                  el('span', { style: { fontSize: '11px', color: '#059669' } }, '✓ Custom poster set')
                ) : el('div', { style: { fontSize: '11px', color: '#64748B', marginBottom: '8px' } },
                  '• Using Default: /assets/video/cmmc-concept-poster.jpg'
                ),
                el('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                  MediaUploadComponent ? el(MediaUploadComponent, {
                    onSelect: function (media) {
                      setAttributes({ bgPosterUrl: media.url, bgPosterId: media.id });
                    },
                    allowedTypes: ['image'],
                    value: attributes.bgPosterId,
                    render: function (obj) {
                      return el(Button, {
                        isSecondary: true,
                        isSmall: true,
                        onClick: obj.open
                      }, attributes.bgPosterUrl ? 'Change Poster' : 'Upload Poster');
                    }
                  }) : null,
                  attributes.bgPosterUrl ? el(Button, {
                    isTertiary: true,
                    isSmall: true,
                    onClick: function () {
                      setAttributes({ bgPosterUrl: '', bgPosterId: 0 });
                    }
                  }, 'Reset to Default') : null
                )
              )
            ) : el(Fragment, {},
              el('p', { style: { fontSize: '12px', color: '#64748B', margin: '8px 0 12px', lineHeight: 1.5 } },
                'Upload a high-resolution defense photo, facility walkthrough image, or pattern texture to replace the video.'
              ),
              el('div', {
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '14px'
                }
              },
                attributes.bgImageUrl ? el('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' } },
                  el('img', {
                    src: attributes.bgImageUrl,
                    style: { width: '80px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #CBD5E1' },
                    alt: 'Background'
                  }),
                  el('span', { style: { fontSize: '11px', color: '#059669' } }, '✓ Custom background photo active')
                ) : el('div', { style: { fontSize: '11px', color: '#64748B', marginBottom: '8px' } },
                  'No background photo uploaded yet. Click below to select one from your media library.'
                ),
                el('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                  MediaUploadComponent ? el(MediaUploadComponent, {
                    onSelect: function (media) {
                      setAttributes({ bgImageUrl: media.url, bgImageId: media.id });
                    },
                    allowedTypes: ['image'],
                    value: attributes.bgImageId,
                    render: function (obj) {
                      return el(Button, {
                        isSecondary: true,
                        isSmall: true,
                        onClick: obj.open
                      }, attributes.bgImageUrl ? 'Change Background Image' : 'Upload Background Image');
                    }
                  }) : null,
                  attributes.bgImageUrl ? el(Button, {
                    isTertiary: true,
                    isSmall: true,
                    onClick: function () {
                      setAttributes({ bgImageUrl: '', bgImageId: 0 });
                    }
                  }, 'Clear Image') : null
                )
              )
            ),
            el(RangeControl, {
              label: 'Dark Overlay Darkness (%)',
              value: attributes.bgOverlayOpacity !== undefined ? attributes.bgOverlayOpacity : 70,
              min: 0,
              max: 95,
              step: 5,
              help: 'Controls darkness of dark tint over the background media to guarantee maximum text legibility.',
              onChange: function (val) { setAttributes({ bgOverlayOpacity: val }); }
            })
          ),
          // Panel 2: Header & Main Headline
          el(
            PanelBody,
            { title: 'Header & Main Headline', initialOpen: false },
            el(TextControl, {
              label: 'Eyebrow Tag',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// NIST SP 800-171 / CMMC Compliance Consultants',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Main Headline',
              value: attributes.title !== undefined ? attributes.title : 'CMMC compliance for defense subcontractors, guided by a Cyber AB RPO',
              onChange: function (val) { setAttributes({ title: val }); }
            }),
            el(TextControl, {
              label: 'Highlighted Suffix (Cyan text)',
              value: attributes.highlightText !== undefined ? attributes.highlightText : 'Cyber AB RPO',
              onChange: function (val) { setAttributes({ highlightText: val }); }
            }),
            el(TextareaControl, {
              label: 'Hero Subtext Description',
              rows: 3,
              value: attributes.description !== undefined ? attributes.description : 'We help defense contractors and suppliers get ready for CMMC and NIST SP 800-171, from the first site visit to the annual affirmation.',
              onChange: function (val) { setAttributes({ description: val }); }
            })
          ),
          // Panel 3: Primary CTA Button
          el(
            PanelBody,
            { title: 'Primary CTA Button', initialOpen: false },
            el(TextControl, {
              label: 'Button Text',
              value: attributes.primaryBtnText !== undefined ? attributes.primaryBtnText : 'Book a Discovery Call →',
              onChange: function (val) { setAttributes({ primaryBtnText: val }); }
            }),
            el(TextControl, {
              label: 'Button Link URL',
              value: attributes.primaryBtnUrl !== undefined ? attributes.primaryBtnUrl : '#contact',
              onChange: function (val) { setAttributes({ primaryBtnUrl: val }); }
            }),
            el(TextControl, {
              label: 'Button Microcopy (under button)',
              value: attributes.subText !== undefined ? attributes.subText : '30 min · No sales pitch · Signed NDA',
              onChange: function (val) { setAttributes({ subText: val }); }
            })
          ),
          // Panel 4: Interactive Topics
          el(
            PanelBody,
            { title: 'Interactive Topic Pills (3 Cards)', initialOpen: false },
            el('strong', { style: { display: 'block', marginBottom: '6px', fontSize: '12px' } }, 'Topic Card 1'),
            el(TextControl, {
              label: 'Topic 1 Title',
              value: attributes.topic1Title !== undefined ? attributes.topic1Title : 'CMMC',
              onChange: function (val) { setAttributes({ topic1Title: val }); }
            }),
            el(TextControl, {
              label: 'Topic 1 Description',
              value: attributes.topic1Desc !== undefined ? attributes.topic1Desc : 'Maturity levels & framework',
              onChange: function (val) { setAttributes({ topic1Desc: val }); }
            }),
            el(TextControl, {
              label: 'Topic 1 Link URL',
              value: attributes.topic1Url !== undefined ? attributes.topic1Url : '/secure-centric/cmmc/',
              onChange: function (val) { setAttributes({ topic1Url: val }); }
            }),
            el('hr', { style: { margin: '14px 0' } }),
            el('strong', { style: { display: 'block', marginBottom: '6px', fontSize: '12px' } }, 'Topic Card 2'),
            el(TextControl, {
              label: 'Topic 2 Title',
              value: attributes.topic2Title !== undefined ? attributes.topic2Title : 'NIST SP 800-171',
              onChange: function (val) { setAttributes({ topic2Title: val }); }
            }),
            el(TextControl, {
              label: 'Topic 2 Description',
              value: attributes.topic2Desc !== undefined ? attributes.topic2Desc : '110 controls & DFARS 7012',
              onChange: function (val) { setAttributes({ topic2Desc: val }); }
            }),
            el(TextControl, {
              label: 'Topic 2 Link URL',
              value: attributes.topic2Url !== undefined ? attributes.topic2Url : '/secure-centric/services/nist-800-171-compliance/',
              onChange: function (val) { setAttributes({ topic2Url: val }); }
            }),
            el('hr', { style: { margin: '14px 0' } }),
            el('strong', { style: { display: 'block', marginBottom: '6px', fontSize: '12px' } }, 'Topic Card 3'),
            el(TextControl, {
              label: 'Topic 3 Title',
              value: attributes.topic3Title !== undefined ? attributes.topic3Title : 'CUI',
              onChange: function (val) { setAttributes({ topic3Title: val }); }
            }),
            el(TextControl, {
              label: 'Topic 3 Description',
              value: attributes.topic3Desc !== undefined ? attributes.topic3Desc : 'Controlled Unclassified Info',
              onChange: function (val) { setAttributes({ topic3Desc: val }); }
            }),
            el(TextControl, {
              label: 'Topic 3 Link URL',
              value: attributes.topic3Url !== undefined ? attributes.topic3Url : '/secure-centric/cui/',
              onChange: function (val) { setAttributes({ topic3Url: val }); }
            })
          ),
          // Panel 5: Quick Quiz Widget
          el(
            PanelBody,
            { title: 'Quick Quiz Widget Card', initialOpen: false },
            el(TextControl, {
              label: 'Quiz Badge',
              value: attributes.quizBadge !== undefined ? attributes.quizBadge : 'CMMC READINESS CHECK · 3 MINUTES',
              onChange: function (val) { setAttributes({ quizBadge: val }); }
            }),
            el(TextControl, {
              label: 'Pill Tag',
              value: attributes.quizChip !== undefined ? attributes.quizChip : 'Free Tool',
              onChange: function (val) { setAttributes({ quizChip: val }); }
            }),
            el(TextControl, {
              label: 'Card Title',
              value: attributes.quizTitle !== undefined ? attributes.quizTitle : 'Find out where you stand',
              onChange: function (val) { setAttributes({ quizTitle: val }); }
            }),
            el(TextareaControl, {
              label: 'Card Description',
              rows: 3,
              value: attributes.quizDesc !== undefined ? attributes.quizDesc : 'Assess your FCI/CUI boundaries and readiness score before a C3PAO audit.',
              onChange: function (val) { setAttributes({ quizDesc: val }); }
            }),
            el(TextControl, {
              label: 'Input Placeholder',
              value: attributes.quizPlaceholder !== undefined ? attributes.quizPlaceholder : 'Enter corporate work email',
              onChange: function (val) { setAttributes({ quizPlaceholder: val }); }
            }),
            el(TextControl, {
              label: 'Button Text',
              value: attributes.quizBtnText !== undefined ? attributes.quizBtnText : 'Start 3-Minute Readiness Check →',
              onChange: function (val) { setAttributes({ quizBtnText: val }); }
            }),
            el(TextControl, {
              label: 'Privacy Note',
              value: attributes.quizNote !== undefined ? attributes.quizNote : '🔒 Work email required. Never submit classified or CUI information.',
              onChange: function (val) { setAttributes({ quizNote: val }); }
            })
          )
        );

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/hero',
          attributes: attributes
        }) : null;

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
        return null;
      }
    });

    // =========================================================================
    // 2. LOGO MARQUEE BLOCK (CUSTOM MEDIA UPLOADS & LOGOS LIST MANAGER)
    // =========================================================================
    registerBlockType('secure-centric/logo-marquee', {
      title: 'Client Logos Marquee',
      icon: 'images-alt2',
      category: 'secure-centric-proof',
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        // Parse structured logos safely
        let defaultLogos = [
          { name: '', alt: 'Caltrol', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/caltrol.webp', imageId: 0 },
          { name: '', alt: 'Firefighters First Credit Union', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/firefighters-first.webp', imageId: 0 },
          { name: '', alt: 'Acadian Contractors', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/acadian-contractors.webp', imageId: 0 },
          { name: '', alt: 'Goodwin & Associates', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/goodwin-associates.webp', imageId: 0 },
          { name: '', alt: 'CMI Promex', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/cmi-promex.webp', imageId: 0 },
          { name: '', alt: 'HRD Aero Systems', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/hrd-aero-systems.webp', imageId: 0 },
          { name: '', alt: 'Yes Energy / PowerCore', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/yes-energy.webp', imageId: 0 },
          { name: '', alt: 'Lonestar Electric Supply', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/lonestar-electric.webp', imageId: 0 },
          { name: '', alt: 'Los Angeles Regional Food Bank', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/la-food-bank.webp', imageId: 0 },
          { name: '', alt: 'Rose Acre Farms', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/rose-acre-farms.webp', imageId: 0 },
          { name: '', alt: 'Safran Federal Systems', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/safran.webp', imageId: 0 },
          { name: '', alt: 'Tower Semiconductor', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/tower-semiconductor.webp', imageId: 0 },
          { name: '', alt: 'Weber Metals', imageUrl: '/wp-content/themes/secure-centric/assets/img/client-logos/weber-metals.webp', imageId: 0 }
        ];
        let currentLogos = safeParseJsonArray(attributes.logosData, defaultLogos);

        function updateLogos(newLogos) {
          setAttributes({
            logosData: JSON.stringify(newLogos),
            logosList: newLogos.map(function (l) { return l.name; }).filter(Boolean).join(', ')
          });
        }

        function addLogo() {
          const next = currentLogos.concat([{
            name: 'New Client Partner',
            imageUrl: '',
            imageId: 0
          }]);
          updateLogos(next);
        }

        function removeLogo(idx) {
          const next = currentLogos.filter(function (_, i) { return i !== idx; });
          updateLogos(next);
        }

        function updateLogoItem(idx, fields) {
          const next = currentLogos.map(function (item, i) {
            if (i === idx) {
              return Object.assign({}, item, fields);
            }
            return item;
          });
          updateLogos(next);
        }

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

        const MediaUploadComponent = (wp.blockEditor && wp.blockEditor.MediaUpload) || (wp.editor && wp.editor.MediaUpload);

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Marquee Title & Headline', initialOpen: true },
            el(TextControl, {
              label: 'Section Header Title',
              value: attributes.title !== undefined ? attributes.title : 'Organizations that have worked with Secure-Centric',
              onChange: function (val) { setAttributes({ title: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Client Logos (' + currentLogos.length + ')', initialOpen: true },
            el('p', { style: { fontSize: '12px', color: '#64748B', marginBottom: '14px', lineHeight: 1.5 } },
              'Upload custom logo images from your WordPress media library and edit the company name displayed beside each logo. Add as many client logos as you need.'
            ),
            currentLogos.map(function (item, idx) {
              return el('div', {
                key: 'logo-item-' + idx,
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '12px'
                }
              },
                el('div', {
                  style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }
                },
                  el('strong', { style: { fontSize: '12px', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.03em' } },
                    'Logo #' + (idx + 1) + (item.name ? ' · ' + item.name : '')
                  ),
                  el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeLogo(idx); }
                  }, 'Remove')
                ),
                el('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' } },
                  item.imageUrl ? el('div', {
                    style: {
                      width: '64px',
                      height: '40px',
                      background: '#fff',
                      border: '1px solid #CBD5E1',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2px',
                      overflow: 'hidden'
                    }
                  },
                    el('img', {
                      src: item.imageUrl,
                      style: { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' },
                      alt: item.name || 'Logo'
                    })
                  ) : el('div', {
                    style: {
                      width: '64px',
                      height: '40px',
                      background: '#EEF2FF',
                      border: '1px dashed #2F5BFF',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: '#2F5BFF',
                      fontWeight: 600
                    }
                  }, 'No Logo'),
                  MediaUploadComponent ? el(MediaUploadComponent, {
                    onSelect: function (media) {
                      updateLogoItem(idx, { imageUrl: media.url, imageId: media.id });
                    },
                    allowedTypes: ['image'],
                    value: item.imageId,
                    render: function (mediaObj) {
                      return el(Button, {
                        isSecondary: true,
                        isSmall: true,
                        onClick: mediaObj.open
                      }, item.imageUrl ? 'Change Logo' : 'Upload Logo');
                    }
                  }) : null,
                  item.imageUrl ? el(Button, {
                    isTertiary: true,
                    isSmall: true,
                    onClick: function () {
                      updateLogoItem(idx, { imageUrl: '', imageId: 0 });
                    }
                  }, 'Clear Image') : null
                ),
                el(TextControl, {
                  label: 'Company Name (optional · leave empty for logo only)',
                  value: item.name || '',
                  placeholder: 'Optional text beside logo',
                  onChange: function (val) {
                    updateLogoItem(idx, { name: val });
                  }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '10px', padding: '10px', fontWeight: 600 },
              onClick: addLogo
            }, '+ Add New Logo')
          )
        );

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/logo-marquee',
          attributes: attributes
        }) : null;

        const inlineActionBar = isSelected ? el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 18px',
            background: '#F0F4FF',
            border: '1px dashed #2F5BFF',
            borderRadius: '6px',
            marginTop: '12px'
          }
        },
          el('span', { style: { fontSize: '13px', color: '#1E293B', fontWeight: 600 } },
            '⭐ Client Logos Marquee (' + currentLogos.length + ' logos) · Upload logos and set company names in the right sidebar.'
          ),
          el(Button, {
            isPrimary: true,
            isSmall: true,
            onClick: addLogo
          }, '+ Add New Logo')
        ) : null;

        return el(
          Fragment,
          {},
          inspectorControls,
          el(
            'div',
            blockProps,
            previewElement,
            inlineActionBar
          )
        );
      },
      save: function () {
        return null;
      }
    });

    // =========================================================================
    // 3. ROADMAP STEPPER BLOCK (DYNAMIC MILESTONE STEPS ADD / REMOVE)
    // =========================================================================
    registerBlockType('secure-centric/roadmap-stepper', {
      title: 'Interactive Journey Roadmap (Dynamic Steps)',
      icon: 'randomize',
      category: 'secure-centric-process',
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultSteps = [
          { no: '01', name: 'Site visit', phase: 'Phase 1: Facility Walkthrough & Scope Discovery', help: 'In-person physical & technical walkthrough of facilities, server rooms, and shop-floor enclaves.', who: 'You + Secure-Centric', output: 'Asset discovery baseline & boundary notes', link: '#page-2' },
          { no: '02', name: 'Scoping', phase: 'Phase 2: CUI Boundary & Enclave Architecture', help: 'Map CUI/FCI flows, identify people, systems, and network storage touching DoD contracts.', who: 'Secure-Centric + IT Leads', output: 'Formal Scope Document & Data-Flow Architecture', link: '#page-16' },
          { no: '03', name: 'Gap assessment', phase: 'Phase 3: 110-Control Baseline Scoring', help: 'Audit all 110 NIST SP 800-171 controls against actual day-to-day operations.', who: 'Secure-Centric', output: 'Defensible SPRS Score estimate & findings register', link: '#page-5' },
          { no: '04', name: 'Remediation', phase: 'Phase 4: Engineering & Policy Remediation', help: 'Prioritize fixes by risk weight; guide MFA, encryption, logging, and enclave deployments.', who: 'Your IT/MSP (guided by us)', output: 'Remediation Roadmap with owners and completion targets', link: '#page-7' },
          { no: '05', name: 'Documentation', phase: 'Phase 5: System Security Plan (SSP) & POA&M', help: 'Co-write your System Security Plan (SSP), POA&M, and all required operational policies.', who: 'Secure-Centric + You', output: 'Assessor-ready SSP and comprehensive policy suite', link: '#page-8' },
          { no: '06', name: 'Readiness review', phase: 'Phase 6: C3PAO Mock Audit & Interview Prep', help: 'Full rehearsal mock audit simulating C3PAO interview techniques and evidence requests.', who: 'Secure-Centric RPs', output: 'Readiness sign-off report & Evidence Binder index', link: '#page-4' },
          { no: '07', name: 'Assessment', phase: 'Phase 7: Official C3PAO Level 2 Assessment', help: 'We stand alongside your team during official DIBCAC or Authorized C3PAO evaluation.', who: 'Independent C3PAO', output: 'Level 2 CMMC Certification recommendation', link: '#page-19' },
          { no: '08', name: 'Maintain', phase: 'Phase 8: Continuous Monitoring & Affirmation', help: 'Continuous compliance, annual SPRS reaffirmation, change management, and evidence refreshes.', who: 'Virtual CISO / You', output: 'Annual Affirmation pack & ongoing compliance posture', link: '#page-11' }
        ];

        let currentSteps = safeParseJsonArray(attributes.stepsData, defaultSteps);

        function updateSteps(newSteps) {
          const renumbered = newSteps.map(function (st, idx) {
            return Object.assign({}, st, {
              no: String(idx + 1).padStart(2, '0')
            });
          });
          setAttributes({ stepsData: JSON.stringify(renumbered) });
        }

        function addStep() {
          const nextNo = String(currentSteps.length + 1).padStart(2, '0');
          const next = currentSteps.concat([{
            no: nextNo,
            name: 'New Milestone',
            phase: 'Phase ' + (currentSteps.length + 1) + ': Description & Objectives',
            help: 'Describe the key actions, technical checks, and milestones achieved during this stage.',
            who: 'Secure-Centric + Client Leads',
            output: 'Deliverable sign-off & audit package',
            link: '#contact'
          }]);
          updateSteps(next);
        }

        function removeStep(idx) {
          if (currentSteps.length <= 1) return;
          const next = currentSteps.filter(function (_, i) { return i !== idx; });
          updateSteps(next);
        }

        function updateStepItem(idx, fields) {
          const next = currentSteps.map(function (item, i) {
            if (i === idx) {
              return Object.assign({}, item, fields);
            }
            return item;
          });
          updateSteps(next);
        }

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

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/roadmap-stepper',
          attributes: Object.assign({}, attributes, {
            stepsData: JSON.stringify(currentSteps)
          })
        }) : el('div', {
          style: { padding: '24px', border: '1px dashed #2F5BFF', background: '#F8FAFC', borderRadius: '8px' }
        }, el('strong', {}, 'Roadmap Stepper (' + currentSteps.length + ' Milestones)'));

        const inlineActionBar = isSelected ? el('div', {
          style: {
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }
        },
          el('span', { style: { fontSize: '13px', color: '#1E293B', fontWeight: 600 } },
            '🧭 Roadmap Milestones (' + currentSteps.length + ' Steps)'
          ),
          el(Button, {
            isPrimary: true,
            isSmall: true,
            onClick: addStep
          }, '+ Add New Milestone Step')
        ) : null;

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Roadmap Header & Navigation', initialOpen: true },
            el(TextControl, {
              label: 'Section Eyebrow',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// THE CMMC PROCESS',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Main Title',
              value: attributes.title !== undefined ? attributes.title : 'Your CMMC journey, step by step',
              onChange: function (val) { setAttributes({ title: val }); }
            }),
            el(TextControl, {
              label: 'Detailed Process Link Text',
              value: attributes.detailedProcessLinkText !== undefined ? attributes.detailedProcessLinkText : 'View Detailed 8-Step Process →',
              onChange: function (val) { setAttributes({ detailedProcessLinkText: val }); }
            }),
            el(TextControl, {
              label: 'Detailed Process Link URL',
              value: attributes.detailedProcessLinkUrl !== undefined ? attributes.detailedProcessLinkUrl : '#page-19',
              onChange: function (val) { setAttributes({ detailedProcessLinkUrl: val }); }
            }),
            el(RangeControl, {
              label: 'Autoplay Step Delay (ms)',
              value: attributes.autoplayDelay !== undefined ? attributes.autoplayDelay : 3800,
              min: 2000,
              max: 10000,
              step: 200,
              onChange: function (val) { setAttributes({ autoplayDelay: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Milestones Manager (' + currentSteps.length + ' Steps)', initialOpen: false },
            el('div', { style: { marginBottom: '16px' } },
              el(Button, {
                isPrimary: true,
                style: { width: '100%', justifyContent: 'center' },
                onClick: addStep
              }, '+ Add New Milestone Step')
            ),
            currentSteps.map(function (st, idx) {
              return el('div', {
                key: 'step-card-' + idx,
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '16px'
                }
              },
                el('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #E2E8F0'
                  }
                },
                  el('strong', { style: { fontSize: '13px', color: '#1E293B' } },
                    'Step ' + st.no + ': ' + (st.name || 'Untitled')
                  ),
                  currentSteps.length > 1 ? el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeStep(idx); }
                  }, 'Remove') : null
                ),
                el(TextControl, {
                  label: 'Step Short Name',
                  value: st.name || '',
                  onChange: function (v) { updateStepItem(idx, { name: v }); }
                }),
                el(TextControl, {
                  label: 'Phase Subtitle',
                  value: st.phase || '',
                  onChange: function (v) { updateStepItem(idx, { phase: v }); }
                }),
                el(TextareaControl, {
                  label: 'Detailed Description',
                  value: st.help || '',
                  rows: 3,
                  onChange: function (v) { updateStepItem(idx, { help: v }); }
                }),
                el(TextControl, {
                  label: 'Who Does This Work',
                  value: st.who || '',
                  onChange: function (v) { updateStepItem(idx, { who: v }); }
                }),
                el(TextControl, {
                  label: 'Primary Deliverable Output',
                  value: st.output || '',
                  onChange: function (v) { updateStepItem(idx, { output: v }); }
                }),
                el(TextControl, {
                  label: 'Scope Link URL',
                  value: st.link || '',
                  onChange: function (v) { updateStepItem(idx, { link: v }); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addStep
            }, '+ Add New Milestone Step')
          )
        );

        return el(
          Fragment,
          {},
          inspectorControls,
          el(
            'div',
            blockProps,
            previewElement,
            inlineActionBar
          )
        );
      },
      save: function () {
        return null;
      }
    });

    // =========================================================================
    // 4. TESTIMONIALS BLOCK (DYNAMIC TESTIMONIALS ADD / REMOVE)
    // =========================================================================
    registerBlockType('secure-centric/testimonials', {
      title: 'Defense Client Testimonials (Dynamic)',
      icon: 'format-quote',
      category: 'secure-centric-proof',
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultReviews = [
          { num: '01', author: 'Alex Liu', role: 'IT Manager, Tower Semiconductor', avatar: 'AL', quote: 'Secure-Centric gave us absolute clarity on what was inside our CUI boundary and what was not. We passed our official C3PAO Level 2 assessment on the first attempt with zero open items.', linkedinUrl: '', linkedinText: '' },
          { num: '02', author: 'Patrick Shaw', role: 'Cyber Security Analyst, Safran Federal Systems', avatar: 'PS', quote: "Their team was on site at our facility within two weeks. They didn't hand us generic compliance templates—they helped configure our actual firewalls, SIEM, and author an ironclad SSP.", linkedinUrl: '', linkedinText: '' },
          { num: '03', author: 'Elena Rostova', role: 'VP Operations, Precision Aero Machining', avatar: 'ER', quote: 'We cut our assessment scope by almost 40% based on their enclave advisory alone. That decision alone saved us at least $80,000 in unnecessary software upgrades and audit fees.', linkedinUrl: '', linkedinText: '' },
          { num: '04', author: 'Marcus Vance', role: 'Chief Information Officer, Vanguard Defense Tech', avatar: 'MV', quote: "The mock C3PAO interview sessions were intense and realistic. When DIBCAC conducted our actual review, there wasn't a single question or evidence request that we hadn't already prepared for.", linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' },
          { num: '05', author: 'David Chen', role: 'Director of Compliance, Apex Dynamics', avatar: 'DC', quote: 'Finding an RPO that actually understands precision CNC shop floor networks is rare. Secure-Centric bridged the gap between our machinists, IT, and Department of War compliance seamlessly.', linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' }
        ];

        let currentReviews = safeParseJsonArray(attributes.testimonialsData, defaultReviews);

        function updateReviews(newReviews) {
          const renumbered = newReviews.map(function (rev, idx) {
            return Object.assign({}, rev, {
              num: String(idx + 1).padStart(2, '0')
            });
          });
          setAttributes({ testimonialsData: JSON.stringify(renumbered) });
        }

        function addReview() {
          const nextNum = String(currentReviews.length + 1).padStart(2, '0');
          const next = currentReviews.concat([{
            num: nextNum,
            author: 'New Client Executive',
            role: 'VP Technology, Defense Systems',
            avatar: 'CE',
            quote: 'Secure-Centric led our organization through CMMC Level 2 readiness with total precision, deep technical insight, and outstanding support.',
            linkedinText: 'Shared publicly on LinkedIn',
            linkedinUrl: 'https://www.linkedin.com/company/secure-centric/'
          }]);
          updateReviews(next);
        }

        function removeReview(idx) {
          if (currentReviews.length <= 1) return;
          const next = currentReviews.filter(function (_, i) { return i !== idx; });
          updateReviews(next);
        }

        function updateReviewItem(idx, fields) {
          const next = currentReviews.map(function (item, i) {
            if (i === idx) {
              return Object.assign({}, item, fields);
            }
            return item;
          });
          updateReviews(next);
        }

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

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/testimonials',
          attributes: Object.assign({}, attributes, {
            testimonialsData: JSON.stringify(currentReviews)
          })
        }) : el('div', {
          style: { padding: '24px', border: '1px dashed #2F5BFF', background: '#F8FAFC', borderRadius: '8px' }
        }, el('strong', {}, 'Testimonials (' + currentReviews.length + ' Reviews)'));

        const inlineActionBar = isSelected ? el('div', {
          style: {
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }
        },
          el('span', { style: { fontSize: '13px', color: '#1E293B', fontWeight: 600 } },
            '💬 Client Testimonials (' + currentReviews.length + ' Reviews)'
          ),
          el(Button, {
            isPrimary: true,
            isSmall: true,
            onClick: addReview
          }, '+ Add New Testimonial')
        ) : null;

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Header & Layout Mode', initialOpen: true },
            el(SelectControl, {
              label: 'Display Mode',
              value: attributes.displayMode || 'carousel',
              options: [
                { label: 'Infinite Carousel Marquee', value: 'carousel' },
                { label: 'Static Grid Layout', value: 'grid' }
              ],
              onChange: function (val) { setAttributes({ displayMode: val }); }
            }),
            el(TextControl, {
              label: 'Eyebrow',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// CLIENT TESTIMONIALS',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Headline',
              value: attributes.title !== undefined ? attributes.title : 'What Defense Contractors Say About Working With Us',
              onChange: function (val) { setAttributes({ title: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Testimonials Manager (' + currentReviews.length + ' Reviews)', initialOpen: false },
            el('div', { style: { marginBottom: '16px' } },
              el(Button, {
                isPrimary: true,
                style: { width: '100%', justifyContent: 'center' },
                onClick: addReview
              }, '+ Add New Testimonial')
            ),
            currentReviews.map(function (rev, idx) {
              return el('div', {
                key: 'rev-card-' + idx,
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '16px'
                }
              },
                el('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #E2E8F0'
                  }
                },
                  el('strong', { style: { fontSize: '13px', color: '#1E293B' } },
                    '#' + rev.num + ' · ' + (rev.author || 'Anonymous')
                  ),
                  currentReviews.length > 1 ? el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeReview(idx); }
                  }, 'Remove') : null
                ),
                el(TextControl, {
                  label: 'Author Name',
                  value: rev.author || '',
                  onChange: function (v) { updateReviewItem(idx, { author: v }); }
                }),
                el(TextControl, {
                  label: 'Role & Organization',
                  value: rev.role || '',
                  onChange: function (v) { updateReviewItem(idx, { role: v }); }
                }),
                el(TextControl, {
                  label: 'Avatar Initials (e.g. AL)',
                  value: rev.avatar || '',
                  onChange: function (v) { updateReviewItem(idx, { avatar: v }); }
                }),
                el(TextareaControl, {
                  label: 'Quote Text',
                  value: rev.quote || '',
                  rows: 3,
                  onChange: function (v) { updateReviewItem(idx, { quote: v }); }
                }),
                el(TextControl, {
                  label: 'Badge Text',
                  value: rev.linkedinText || '',
                  onChange: function (v) { updateReviewItem(idx, { linkedinText: v }); }
                }),
                el(TextControl, {
                  label: 'Badge / Verification URL',
                  value: rev.linkedinUrl || '',
                  onChange: function (v) { updateReviewItem(idx, { linkedinUrl: v }); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addReview
            }, '+ Add New Testimonial')
          )
        );

        return el(
          Fragment,
          {},
          inspectorControls,
          el(
            'div',
            blockProps,
            previewElement,
            inlineActionBar
          )
        );
      },
      save: function () {
        return null;
      }
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
    // 7. RESOURCE CARDS BLOCK (DYNAMIC CARDS ADD / REMOVE)
    // =========================================================================
    registerBlockType('secure-centric/resource-cards', {
      title: 'Resource Guides & Checklists Grid (Dynamic)',
      icon: 'portfolio',
      category: 'secure-centric-process',
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultCards = [
          { title: 'CMMC Complete Guide', desc: 'The definitive executive and technical overview of CMMC levels, rulemaking, and audits.', link: '#contact', icon: '📁' },
          { title: 'CMMC Level 2 Guide', desc: '110 requirements across 14 security families: technical breakdown and scoping rules.', link: '#contact', icon: '📘' },
          { title: 'NIST SP 800-171 Standard', desc: 'The foundational standard behind DFARS 7012 and Level 2 C3PAO certifications.', link: '#contact', icon: '🛡️' },
          { title: 'CUI Scoping & Handling Guide', desc: 'Controlled Unclassified Information: identification, markings, and boundary isolation.', link: '#contact', icon: '🔒' },
          { title: 'CMMC Enclave Advisory', desc: 'How segregating your CUI network saves months of implementation and audit costs.', link: '#contact', icon: '🏗️' },
          { title: 'Level 2 Compliance Checklist', desc: 'Downloadable 110-control Excel checklist with ownership and objective columns.', link: '#contact', icon: '📊' }
        ];

        let currentCards = safeParseJsonArray(attributes.resourcesData, defaultCards);

        function updateCards(newCards) {
          setAttributes({ resourcesData: JSON.stringify(newCards) });
        }

        function addCard() {
          const next = currentCards.concat([{
            title: 'New Compliance Resource Guide',
            desc: 'Practical, audit-tested guidance designed specifically for defense subcontractors.',
            link: '#contact',
            icon: '📄'
          }]);
          updateCards(next);
        }

        function removeCard(idx) {
          if (currentCards.length <= 1) return;
          const next = currentCards.filter(function (_, i) { return i !== idx; });
          updateCards(next);
        }

        function updateCardItem(idx, fields) {
          const next = currentCards.map(function (item, i) {
            if (i === idx) {
              return Object.assign({}, item, fields);
            }
            return item;
          });
          updateCards(next);
        }

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

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/resource-cards',
          attributes: Object.assign({}, attributes, {
            resourcesData: JSON.stringify(currentCards)
          })
        }) : el('div', {
          style: { padding: '24px', border: '1px dashed #2F5BFF', background: '#F8FAFC', borderRadius: '8px' }
        }, el('strong', {}, 'Resource Cards (' + currentCards.length + ' Cards)'));

        const inlineActionBar = isSelected ? el('div', {
          style: {
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }
        },
          el('span', { style: { fontSize: '13px', color: '#1E293B', fontWeight: 600 } },
            '📚 Resource Guides (' + currentCards.length + ' Cards)'
          ),
          el(Button, {
            isPrimary: true,
            isSmall: true,
            onClick: addCard
          }, '+ Add New Resource Card')
        ) : null;

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Section Header', initialOpen: true },
            el(TextControl, {
              label: 'Headline',
              value: attributes.title !== undefined ? attributes.title : 'CMMC guides, checklists and tools',
              onChange: function (val) { setAttributes({ title: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Resource Cards Manager (' + currentCards.length + ' Cards)', initialOpen: false },
            el('div', { style: { marginBottom: '16px' } },
              el(Button, {
                isPrimary: true,
                style: { width: '100%', justifyContent: 'center' },
                onClick: addCard
              }, '+ Add New Resource Card')
            ),
            currentCards.map(function (c, idx) {
              return el('div', {
                key: 'card-' + idx,
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '16px'
                }
              },
                el('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #E2E8F0'
                  }
                },
                  el('strong', { style: { fontSize: '13px', color: '#1E293B' } },
                    (c.icon || '📄') + ' ' + (c.title || 'Untitled Card')
                  ),
                  currentCards.length > 1 ? el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeCard(idx); }
                  }, 'Remove') : null
                ),
                el(TextControl, {
                  label: 'Card Icon / Emoji',
                  value: c.icon || '',
                  onChange: function (v) { updateCardItem(idx, { icon: v }); }
                }),
                el(TextControl, {
                  label: 'Card Title',
                  value: c.title || '',
                  onChange: function (v) { updateCardItem(idx, { title: v }); }
                }),
                el(TextareaControl, {
                  label: 'Short Description',
                  value: c.desc || '',
                  rows: 3,
                  onChange: function (v) { updateCardItem(idx, { desc: v }); }
                }),
                el(TextControl, {
                  label: 'Link URL',
                  value: c.link || '',
                  onChange: function (v) { updateCardItem(idx, { link: v }); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addCard
            }, '+ Add New Resource Card')
          )
        );

        return el(
          Fragment,
          {},
          inspectorControls,
          el(
            'div',
            blockProps,
            previewElement,
            inlineActionBar
          )
        );
      },
      save: function () {
        return null;
      }
    });

    // =========================================================================
    // 7B. CREDENTIALS & BADGES BLOCK (CUSTOM IMAGE UPLOADER & GRID)
    // =========================================================================
    registerBlockType('secure-centric/credentials-badges', {
      title: 'Credentials & Badges',
      icon: 'awards',
      category: 'secure-centric-proof',
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultBadges = [
          {
            title: 'The Cyber AB Registered Provider Organization',
            alt: 'The Cyber AB Registered Practitioner Organization (RPO)',
            imageUrl: '/wp-content/themes/secure-centric/assets/img/badges/cyber-ab-rpo.webp',
            link: '',
            imageId: 0
          },
          {
            title: 'Inc. 5000 America\'s Fastest-Growing Private Companies',
            alt: 'Inc. 5000 No. 452 (2025) America\'s Fastest-Growing Private Companies',
            imageUrl: '/wp-content/themes/secure-centric/assets/img/badges/inc-5000-banner.webp',
            link: '',
            imageId: 0
          },
          {
            title: 'Inc. 5000 2026 Honor Roll',
            alt: 'Inc. 5000 2026 America\'s Fastest-Growing Private Companies',
            imageUrl: '/wp-content/themes/secure-centric/assets/img/badges/inc-5000-badge.webp',
            link: '',
            imageId: 0
          },
          {
            title: 'CRN MSP 500 2024',
            alt: 'The Channel Co. CRN MSP 500 2024',
            imageUrl: '/wp-content/themes/secure-centric/assets/img/badges/crn-msp-500.webp',
            link: '',
            imageId: 0
          }
        ];

        let currentBadges = safeParseJsonArray(attributes.badgesData, defaultBadges);

        function updateBadges(newBadges) {
          setAttributes({ badgesData: JSON.stringify(newBadges) });
        }

        function addBadge() {
          const next = currentBadges.concat([{
            title: 'New Accreditation Badge',
            alt: 'Accreditation Badge',
            imageUrl: '',
            link: '',
            imageId: 0
          }]);
          updateBadges(next);
        }

        function removeBadge(idx) {
          if (currentBadges.length <= 1) return;
          const next = currentBadges.filter(function (_, i) { return i !== idx; });
          updateBadges(next);
        }

        function updateBadgeItem(idx, fields) {
          const next = currentBadges.map(function (item, i) {
            if (i === idx) {
              return Object.assign({}, item, fields);
            }
            return item;
          });
          updateBadges(next);
        }

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

        const MediaUploadComponent = (wp.blockEditor && wp.blockEditor.MediaUpload) || (wp.editor && wp.editor.MediaUpload);

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Section Header', initialOpen: true },
            el(TextControl, {
              label: 'Eyebrow',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// ACCREDITATIONS & HONORS',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Title',
              value: attributes.title !== undefined ? attributes.title : 'Credentials and badges',
              onChange: function (val) { setAttributes({ title: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Badges & Certificates (' + currentBadges.length + ')', initialOpen: true },
            el('p', { style: { fontSize: '12px', color: '#64748B', marginBottom: '14px', lineHeight: 1.5 } },
              'Upload custom certificate or badge images from your WordPress media library.'
            ),
            currentBadges.map(function (badge, idx) {
              return el('div', {
                key: 'badge-item-' + idx,
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '12px'
                }
              },
                el('div', {
                  style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }
                },
                  el('strong', { style: { fontSize: '12px', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.03em' } },
                    'Badge #' + (idx + 1) + (badge.title ? ' · ' + badge.title : '')
                  ),
                  el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeBadge(idx); }
                  }, 'Remove')
                ),
                el('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' } },
                  badge.imageUrl ? el('div', {
                    style: {
                      width: '64px',
                      height: '50px',
                      background: '#fff',
                      border: '1px solid #CBD5E1',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2px',
                      overflow: 'hidden'
                    }
                  },
                    el('img', {
                      src: badge.imageUrl,
                      style: { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' },
                      alt: badge.title || 'Badge'
                    })
                  ) : el('div', {
                    style: {
                      width: '64px',
                      height: '50px',
                      background: '#EEF2FF',
                      border: '1px dashed #2F5BFF',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: '#2F5BFF',
                      fontWeight: 600
                    }
                  }, 'No Image'),
                  MediaUploadComponent ? el(MediaUploadComponent, {
                    onSelect: function (media) {
                      updateBadgeItem(idx, { imageUrl: media.url, imageId: media.id });
                    },
                    allowedTypes: ['image'],
                    value: badge.imageId,
                    render: function (mediaObj) {
                      return el(Button, {
                        isSecondary: true,
                        isSmall: true,
                        onClick: mediaObj.open
                      }, badge.imageUrl ? 'Change Image' : 'Upload Badge');
                    }
                  }) : null,
                  badge.imageUrl ? el(Button, {
                    isTertiary: true,
                    isSmall: true,
                    onClick: function () {
                      updateBadgeItem(idx, { imageUrl: '', imageId: 0 });
                    }
                  }, 'Clear') : null
                ),
                el(TextControl, {
                  label: 'Badge Title',
                  value: badge.title || '',
                  placeholder: 'e.g. Cyber AB RPO #3942',
                  onChange: function (val) {
                    updateBadgeItem(idx, { title: val, alt: val });
                  }
                }),
                el(TextControl, {
                  label: 'Link URL (optional)',
                  value: badge.link || '',
                  placeholder: 'https://...',
                  onChange: function (val) {
                    updateBadgeItem(idx, { link: val });
                  }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '10px', padding: '10px', fontWeight: 600 },
              onClick: addBadge
            }, '+ Add New Badge')
          )
        );

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/credentials-badges',
          attributes: attributes
        }) : null;

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
        return null;
      }
    });

    // =========================================================================
    // 8. ACCORDION FAQ BLOCK (DYNAMIC QUESTIONS ADD / REMOVE)
    // =========================================================================
    registerBlockType('secure-centric/accordion-faq', {
      title: 'FAQ Accordion (Dynamic Questions)',
      icon: 'editor-help',
      category: 'secure-centric-process',
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultFaqs = [
          { q: 'Where is Secure-Centric based?', a: 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.' },
          { q: 'Do you sell tools or managed IT?', a: 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.' },
          { q: 'How long have you worked on CMMC?', a: 'Most defense contractors complete their readiness, remediation, and documentation within 4 to 8 months, depending on boundary size and facility count.' }
        ];

        let currentFaqs = safeParseJsonArray(attributes.faqsData, defaultFaqs);

        function updateFaqs(newFaqs) {
          setAttributes({ faqsData: JSON.stringify(newFaqs) });
        }

        function addFaq() {
          const next = currentFaqs.concat([{
            q: 'New Frequently Asked Question?',
            a: 'Provide a comprehensive, authoritative answer for defense contractors seeking CMMC compliance.'
          }]);
          updateFaqs(next);
        }

        function removeFaq(idx) {
          if (currentFaqs.length <= 1) return;
          const next = currentFaqs.filter(function (_, i) { return i !== idx; });
          updateFaqs(next);
        }

        function updateFaqItem(idx, fields) {
          const next = currentFaqs.map(function (item, i) {
            if (i === idx) {
              return Object.assign({}, item, fields);
            }
            return item;
          });
          updateFaqs(next);
        }

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

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/accordion-faq',
          attributes: Object.assign({}, attributes, {
            faqsData: JSON.stringify(currentFaqs)
          })
        }) : el('div', {
          style: { padding: '24px', border: '1px dashed #2F5BFF', background: '#F8FAFC', borderRadius: '8px' }
        }, el('strong', {}, 'FAQ Accordion (' + currentFaqs.length + ' Questions)'));

        const inlineActionBar = isSelected ? el('div', {
          style: {
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }
        },
          el('span', { style: { fontSize: '13px', color: '#1E293B', fontWeight: 600 } },
            '❓ FAQ Questions (' + currentFaqs.length + ' Questions)'
          ),
          el(Button, {
            isPrimary: true,
            isSmall: true,
            onClick: addFaq
          }, '+ Add New FAQ Question')
        ) : null;

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Header & CTA Button', initialOpen: true },
            el(TextControl, {
              label: 'Eyebrow',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// FREQUENTLY ASKED QUESTIONS',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Headline',
              value: attributes.title !== undefined ? attributes.title : 'Common questions',
              onChange: function (val) { setAttributes({ title: val }); }
            }),
            el(TextareaControl, {
              label: 'Description',
              value: attributes.description !== undefined ? attributes.description : 'Still have questions regarding your specific CMMC clauses or audit dates? Speak directly with our lead Registered Practitioner.',
              rows: 3,
              onChange: function (val) { setAttributes({ description: val }); }
            }),
            el(TextControl, {
              label: 'Button Text',
              value: attributes.btnText !== undefined ? attributes.btnText : 'Book a Discovery Call →',
              onChange: function (val) { setAttributes({ btnText: val }); }
            }),
            el(TextControl, {
              label: 'Button URL',
              value: attributes.btnUrl !== undefined ? attributes.btnUrl : '#contact',
              onChange: function (val) { setAttributes({ btnUrl: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'FAQ Questions Manager (' + currentFaqs.length + ' Questions)', initialOpen: false },
            el('div', { style: { marginBottom: '16px' } },
              el(Button, {
                isPrimary: true,
                style: { width: '100%', justifyContent: 'center' },
                onClick: addFaq
              }, '+ Add New FAQ Question')
            ),
            currentFaqs.map(function (f, idx) {
              return el('div', {
                key: 'faq-' + idx,
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '16px'
                }
              },
                el('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #E2E8F0'
                  }
                },
                  el('strong', { style: { fontSize: '13px', color: '#1E293B' } },
                    'Q' + (idx + 1) + ': ' + (f.q ? (f.q.length > 35 ? f.q.substring(0, 35) + '...' : f.q) : 'Untitled')
                  ),
                  currentFaqs.length > 1 ? el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeFaq(idx); }
                  }, 'Remove') : null
                ),
                el(TextControl, {
                  label: 'Question',
                  value: f.q || '',
                  onChange: function (v) { updateFaqItem(idx, { q: v }); }
                }),
                el(TextareaControl, {
                  label: 'Answer',
                  value: f.a || '',
                  rows: 3,
                  onChange: function (v) { updateFaqItem(idx, { a: v }); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addFaq
            }, '+ Add New FAQ Question')
          )
        );

        return el(
          Fragment,
          {},
          inspectorControls,
          el(
            'div',
            blockProps,
            previewElement,
            inlineActionBar
          )
        );
      },
      save: function () {
        return null;
      }
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
    // 11. FORM EMBED BLOCK (SPLIT & CARD LAYOUT WITH FULL SIDEBAR CONTROLS)
    // =========================================================================
    registerBlockType('secure-centric/form-embed', {
      title: 'Interactive Defense Lead & Scoping Form',
      icon: 'feedback',
      category: 'secure-centric-cta',
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultSteps = [
          { title: 'Mutual NDA Execution:', desc: 'We sign a standard bilateral NDA within 2 business hours before discussing any contract details.' },
          { title: '30-Min Scoping Assessment:', desc: 'We review CUI boundary requirements, your target level (Level 1 vs 2), and existing SPRS scores.' },
          { title: 'Clear Fixed-Scope Roadmap:', desc: 'You receive a written action plan detailing exact deliverables, milestones, and timeline.' }
        ];

        let currentSteps = safeParseJsonArray(attributes.stepsData, defaultSteps);

        function updateSteps(newSteps) {
          setAttributes({ stepsData: JSON.stringify(newSteps) });
        }

        function addStep() {
          const next = currentSteps.concat([{
            title: 'Next Step:',
            desc: 'Milestone action description for defense contractor engagement.'
          }]);
          updateSteps(next);
        }

        function removeStep(idx) {
          if (currentSteps.length <= 1) return;
          const next = currentSteps.filter(function (_, i) { return i !== idx; });
          updateSteps(next);
        }

        function updateStepItem(idx, fields) {
          const next = currentSteps.map(function (st, i) {
            if (i === idx) return Object.assign({}, st, fields);
            return st;
          });
          updateSteps(next);
        }

        const blockProps = useBlockProps ? useBlockProps({
          className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
          style: { position: 'relative', cursor: 'pointer' },
          onClick: function () {
            if (clientId && wp.data && wp.data.dispatch) {
              wp.data.dispatch('core/block-editor').selectBlock(clientId);
            }
          }
        }) : {};

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/form-embed',
          attributes: attributes
        }) : el('div', { style: { padding: '24px', background: '#F8FAFC' } }, 'Form Embed (' + (attributes.layout || 'split') + ')');

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Layout Style', initialOpen: true },
            el(SelectControl, {
              label: 'Form Layout',
              value: attributes.layout || 'split',
              options: [
                { label: 'Split 2-Column (Left Info Panel + Form)', value: 'split' },
                { label: 'Single Centered Card', value: 'card' }
              ],
              onChange: function (val) { setAttributes({ layout: val }); }
            })
          ),
          (attributes.layout !== 'card') && el(
            PanelBody,
            { title: 'Text Beside Form (Left Info Column)', initialOpen: true },
            el(TextControl, {
              label: 'Eyebrow',
              value: attributes.infoEyebrow !== undefined ? attributes.infoEyebrow : '// DIRECT ENGAGEMENT',
              onChange: function (val) { setAttributes({ infoEyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Headline',
              value: attributes.infoTitle !== undefined ? attributes.infoTitle : 'Direct Access to Registered Practitioners',
              onChange: function (val) { setAttributes({ infoTitle: val }); }
            }),
            el(TextareaControl, {
              label: 'Description',
              value: attributes.infoDesc !== undefined ? attributes.infoDesc : "Every discovery call is led directly by an accredited Cyber AB Registered Practitioner (RP), not a generalist salesperson. We review your contract's DFARS 252.204-7012 clauses and help determine your exact scoping boundaries.",
              rows: 3,
              onChange: function (val) { setAttributes({ infoDesc: val }); }
            }),
            el('h4', { style: { marginTop: '16px', marginBottom: '8px', fontSize: '13px', fontWeight: 700 } }, 'Contact Inquiries Box'),
            el(TextControl, {
              label: 'Phone Number',
              value: attributes.phone !== undefined ? attributes.phone : '(323) 410-5941',
              onChange: function (val) { setAttributes({ phone: val }); }
            }),
            el(TextControl, {
              label: 'Working Hours Note',
              value: attributes.phoneHours !== undefined ? attributes.phoneHours : 'Mon – Fri: 8:00 AM – 6:00 PM PT',
              onChange: function (val) { setAttributes({ phoneHours: val }); }
            }),
            el(TextControl, {
              label: 'Email Address',
              value: attributes.email !== undefined ? attributes.email : 'info@secure-centric.com',
              onChange: function (val) { setAttributes({ email: val }); }
            }),
            el(TextControl, {
              label: 'Email Note',
              value: attributes.emailNote !== undefined ? attributes.emailNote : 'PGP encryption available upon request',
              onChange: function (val) { setAttributes({ emailNote: val }); }
            }),
            el(TextControl, {
              label: 'Location / Office',
              value: attributes.location !== undefined ? attributes.location : 'Los Angeles, California',
              onChange: function (val) { setAttributes({ location: val }); }
            }),
            el(TextControl, {
              label: 'Location Note',
              value: attributes.locationNote !== undefined ? attributes.locationNote : 'On-site facility assessments delivered nationwide',
              onChange: function (val) { setAttributes({ locationNote: val }); }
            })
          ),
          (attributes.layout !== 'card') && el(
            PanelBody,
            { title: 'Process Steps (' + currentSteps.length + ')', initialOpen: false },
            el(TextControl, {
              label: 'Steps Section Title',
              value: attributes.stepsTitle !== undefined ? attributes.stepsTitle : 'What Happens After You Request a Call:',
              onChange: function (val) { setAttributes({ stepsTitle: val }); }
            }),
            currentSteps.map(function (st, idx) {
              return el('div', {
                key: 'form-step-' + idx,
                style: { background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '12px', marginBottom: '12px' }
              },
                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                  el('strong', { style: { color: '#0F172A' } }, 'Step ' + (idx + 1)),
                  currentSteps.length > 1 && el(Button, { isDestructive: true, isSmall: true, onClick: function () { removeStep(idx); } }, 'Remove')
                ),
                el(TextControl, {
                  label: 'Step Title',
                  value: st.title || '',
                  onChange: function (val) { updateStepItem(idx, { title: val }); }
                }),
                el(TextareaControl, {
                  label: 'Step Description',
                  value: st.desc || '',
                  rows: 2,
                  onChange: function (val) { updateStepItem(idx, { desc: val }); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addStep
            }, '+ Add Process Step')
          ),
          el(
            PanelBody,
            { title: 'Form Card & Actions (Right Column)', initialOpen: true },
            el(TextControl, {
              label: 'Form Headline',
              value: attributes.formTitle !== undefined ? attributes.formTitle : (attributes.title || 'Request a Discovery Call'),
              onChange: function (val) { setAttributes({ formTitle: val, title: val }); }
            }),
            el(TextareaControl, {
              label: 'Form Subtitle',
              value: attributes.formSubtitle !== undefined ? attributes.formSubtitle : (attributes.subtitle || 'Fields marked with * are required. We strictly respect your privacy.'),
              rows: 2,
              onChange: function (val) { setAttributes({ formSubtitle: val, subtitle: val }); }
            }),
            el(TextControl, {
              label: 'Submit Button Text',
              value: attributes.submitBtnText !== undefined ? attributes.submitBtnText : 'Submit Discovery Call Request →',
              onChange: function (val) { setAttributes({ submitBtnText: val }); }
            }),
            el(TextareaControl, {
              label: 'Privacy & Confidentiality Note',
              value: attributes.privacyNote !== undefined ? attributes.privacyNote : '🔒 All communications are held under strict confidentiality. We do not sell or share contractor data.',
              rows: 2,
              onChange: function (val) { setAttributes({ privacyNote: val }); }
            }),
            el(TextControl, {
              label: 'Forminator Shortcode ID (Optional)',
              value: attributes.formId || '',
              help: 'Leave blank to use the native interactive defense scoping form.',
              onChange: function (val) { setAttributes({ formId: val }); }
            })
          )
        );

        return el(
          Fragment,
          {},
          inspectorControls,
          el('div', blockProps, previewElement)
        );
      },
      save: function () {
        return null;
      }
    });

    // =========================================================================
    // 12. TEAM GRID BLOCK (LEADERSHIP & ADVISORS DYNAMIC)
    // =========================================================================
    registerBlockType('secure-centric/team-grid', {
      title: 'Leadership & Specialists Team Grid',
      icon: 'groups',
      category: 'secure-centric-proof',
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultMembers = [
          {
            name: 'Jake "EJ" Celler',
            role: 'Founder & Lead Registered Practitioner (RP)',
            initials: 'JC',
            badge: '✓ Cyber AB RP',
            bio: '15+ years guiding defense industrial base contractors through NIST SP 800-171, DFARS 7012, and CMMC. Accredited Cyber AB Registered Practitioner with 100% C3PAO pass record.'
          },
          {
            name: 'Son Phan',
            role: 'VP Operations & Compliance Director',
            initials: 'SP',
            badge: '✓ Cyber AB RP',
            bio: 'Specialist in CUI scoping boundaries, IT/OT enclave segmentation, and federal acquisition compliance architectures for aerospace and defense manufacturers.'
          },
          {
            name: 'Senior Registered Practitioners',
            role: 'Audit Defense & Technical Implementation Leads',
            initials: 'RP',
            badge: '✓ Cyber AB RP',
            bio: 'Former DoD assessment leads, CISSPs, and CMMC Certified Professionals conducting in-person facility walkthroughs, technical mock audits, and assessor interviews.'
          }
        ];

        let currentMembers = safeParseJsonArray(attributes.membersData, defaultMembers);

        function updateMembers(newMembers) {
          setAttributes({ membersData: JSON.stringify(newMembers) });
        }

        function addMember() {
          const next = currentMembers.concat([{
            name: 'New Registered Practitioner',
            role: 'Cybersecurity Advisor / Engineer',
            initials: 'RP',
            badge: '✓ Cyber AB RP',
            bio: 'Experienced defense cybersecurity engineer providing hands-on CMMC and NIST SP 800-171 audit support.'
          }]);
          updateMembers(next);
        }

        function removeMember(idx) {
          if (currentMembers.length <= 1) return;
          const next = currentMembers.filter(function (_, i) { return i !== idx; });
          updateMembers(next);
        }

        function updateMemberItem(idx, fields) {
          const next = currentMembers.map(function (item, i) {
            if (i === idx) {
              return Object.assign({}, item, fields);
            }
            return item;
          });
          updateMembers(next);
        }

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

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/team-grid',
          attributes: Object.assign({}, attributes, {
            membersData: JSON.stringify(currentMembers)
          })
        }) : el('div', {
          style: { padding: '24px', border: '1px dashed #2F5BFF', background: '#F8FAFC', borderRadius: '8px' }
        }, el('strong', {}, 'Team Grid (' + currentMembers.length + ' Members)'));

        const inlineActionBar = isSelected ? el('div', {
          style: {
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }
        },
          el('span', { style: { fontSize: '13px', color: '#1E293B', fontWeight: 600 } },
            '👥 Leadership & Specialists (' + currentMembers.length + ' Members)'
          ),
          el(Button, {
            isPrimary: true,
            isSmall: true,
            onClick: addMember
          }, '+ Add Team Member')
        ) : null;

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Header Copy', initialOpen: true },
            el(TextControl, {
              label: 'Eyebrow',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// DEFENSE SPECIALISTS',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Title',
              value: attributes.title !== undefined ? attributes.title : 'The Team Behind Your CMMC Readiness',
              onChange: function (val) { setAttributes({ title: val }); }
            }),
            el(TextareaControl, {
              label: 'Description',
              value: attributes.description !== undefined ? attributes.description : 'Accredited Cyber AB Registered Practitioners with decades of technical engineering and audit defense experience.',
              rows: 3,
              onChange: function (val) { setAttributes({ description: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Team Members (' + currentMembers.length + ')', initialOpen: false },
            el('div', { style: { marginBottom: '16px' } },
              el(Button, {
                isPrimary: true,
                style: { width: '100%', justifyContent: 'center' },
                onClick: addMember
              }, '+ Add Team Member')
            ),
            currentMembers.map(function (m, idx) {
              return el('div', {
                key: 'member-' + idx,
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '16px'
                }
              },
                el('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #E2E8F0'
                  }
                },
                  el('strong', { style: { fontSize: '13px', color: '#1E293B' } },
                    (m.initials || 'RP') + ' · ' + (m.name || 'Member')
                  ),
                  currentMembers.length > 1 ? el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeMember(idx); }
                  }, 'Remove') : null
                ),
                el(TextControl, {
                  label: 'Full Name',
                  value: m.name || '',
                  onChange: function (v) { updateMemberItem(idx, { name: v }); }
                }),
                el(TextControl, {
                  label: 'Role / Title',
                  value: m.role || '',
                  onChange: function (v) { updateMemberItem(idx, { role: v }); }
                }),
                el(TextControl, {
                  label: 'Initials (2 letters)',
                  value: m.initials || '',
                  onChange: function (v) { updateMemberItem(idx, { initials: v }); }
                }),
                el(TextControl, {
                  label: 'Certification Badge',
                  value: m.badge || '',
                  onChange: function (v) { updateMemberItem(idx, { badge: v }); }
                }),
                el(TextareaControl, {
                  label: 'Bio / Background',
                  value: m.bio || '',
                  rows: 3,
                  onChange: function (v) { updateMemberItem(idx, { bio: v }); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addMember
            }, '+ Add Team Member')
          )
        );

        return el(
          Fragment,
          {},
          inspectorControls,
          el(
            'div',
            blockProps,
            previewElement,
            inlineActionBar
          )
        );
      },
      save: function () {
        return null;
      }
    });

    /* ==========================================================================
       13. NUMBERS & RESULTS GRID BLOCK
       ========================================================================== */
    registerBlockType('secure-centric/numbers-results', {
      edit: function (props) {
        const attributes = props.attributes;
        const setAttributes = props.setAttributes;
        const isSelected = props.isSelected;
        const clientId = props.clientId;

        const defaultResults = [
          { number: '120+', title: 'Defense Contractors Prepared', desc: 'Guided across 45 states protecting $2.4B in active DoD solicitations.' },
          { number: '100%', title: 'C3PAO First-Time Pass Rate', desc: 'Zero clients failed an official external third-party audit after readiness sign-off.' },
          { number: '3 Weeks', title: 'On-Site Walkthrough Guarantee', desc: 'In-person facility inspection of server rooms and shop-floor enclaves.' },
          { number: 'Flat-Fee', title: 'Fixed Transparent Scope', desc: 'Zero hourly billing surprises, travel markups, or tool licensing kickbacks.' }
        ];

        let results = safeParseJsonArray(attributes.resultsData, defaultResults);

        function updateResults(newList) {
          setAttributes({ resultsData: JSON.stringify(newList) });
        }

        function updateResultItem(index, key, val) {
          const next = results.slice();
          next[index] = Object.assign({}, next[index], { [key]: val });
          updateResults(next);
        }

        function addResultItem() {
          const next = results.concat([{ number: '99%', title: 'Metric Title', desc: 'Operational description.' }]);
          updateResults(next);
        }

        function removeResultItem(index) {
          const next = results.filter(function (_, i) { return i !== index; });
          updateResults(next);
        }

        const blockProps = useBlockProps ? useBlockProps({
          className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
          style: { position: 'relative', cursor: 'pointer' },
          onClick: function () {
            if (clientId && wp.data && wp.data.dispatch) {
              wp.data.dispatch('core/block-editor').selectBlock(clientId);
            }
          }
        }) : {};

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/numbers-results',
          attributes: attributes
        }) : el('div', { style: { padding: '20px', background: '#0a0f1d', color: '#fff', textAlign: 'center' } }, 'Results Grid: ' + (attributes.title || 'Our results'));

        const inlineActionBar = el(
          'div',
          { className: 'sc-inline-block-actions' },
          el(Button, {
            isPrimary: true,
            isSmall: true,
            onClick: addResultItem
          }, '+ Add Result Card')
        );

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Results Header', initialOpen: true },
            el(TextControl, {
              label: 'Eyebrow',
              value: attributes.eyebrow || '// VERIFIED TRACK RECORD',
              onChange: function (v) { setAttributes({ eyebrow: v }); }
            }),
            el(TextControl, {
              label: 'Section Title',
              value: attributes.title || 'Our results',
              onChange: function (v) { setAttributes({ title: v }); }
            }),
            el(TextControl, {
              label: 'Subtitle / Description',
              value: attributes.subtitle || '',
              onChange: function (v) { setAttributes({ subtitle: v }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Result Metric Cards (' + results.length + ')', initialOpen: true },
            results.map(function (r, idx) {
              return el('div', {
                key: 'num-card-' + idx,
                style: { background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '12px', marginBottom: '12px' }
              },
                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                  el('strong', { style: { color: '#0F172A' } }, '#' + (idx + 1) + ' ' + (r.number || 'Number')),
                  el(Button, { isDestructive: true, isSmall: true, onClick: function () { removeResultItem(idx); } }, 'Remove')
                ),
                el(TextControl, {
                  label: 'Number / Stat',
                  value: r.number || '',
                  onChange: function (v) { updateResultItem(idx, 'number', v); }
                }),
                el(TextControl, {
                  label: 'Metric Title',
                  value: r.title || '',
                  onChange: function (v) { updateResultItem(idx, 'title', v); }
                }),
                el(TextareaControl, {
                  label: 'Description',
                  value: r.desc || '',
                  rows: 2,
                  onChange: function (v) { updateResultItem(idx, 'desc', v); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addResultItem
            }, '+ Add Result Card')
          )
        );

        return el(
          Fragment,
          {},
          inspectorControls,
          el('div', blockProps, previewElement, inlineActionBar)
        );
      },
      save: function () {
        return null;
      }
    });

    /* ==========================================================================
       14. BULLETS & PRINCIPLES GRID BLOCK
       ========================================================================== */
    registerBlockType('secure-centric/bullets-grid', {
      edit: function (props) {
        const attributes = props.attributes;
        const setAttributes = props.setAttributes;
        const isSelected = props.isSelected;
        const clientId = props.clientId;

        const defaultBullets = [
          { title: 'Independent Advice', desc: 'We do not sell firewalls, MSP services, or software licenses. Our recommendations are 100% objective and tailored to your existing IT footprint.' },
          { title: 'On Site by Default', desc: 'We conduct physical facility walkthroughs in person. You cannot verify CMMC compliance over a Zoom screen—we inspect server rooms, wiring closets, and shop floors.' },
          { title: 'Plain English', desc: 'No impenetrable jargon. We translate 320 assessment objectives into clear operational steps your executives, engineers, and shop foremen understand.' },
          { title: 'Strict Conflict Separation', desc: 'We never assess clients we advise. Under Cyber AB rules, we are strictly an RPO advisor so our loyalty is 100% with defending your organization.' }
        ];

        let bullets = safeParseJsonArray(attributes.bulletsData, defaultBullets);

        function updateBullets(newList) {
          setAttributes({ bulletsData: JSON.stringify(newList) });
        }

        function updateBulletItem(index, key, val) {
          const next = bullets.slice();
          next[index] = Object.assign({}, next[index], { [key]: val });
          updateBullets(next);
        }

        function addBulletItem() {
          const next = bullets.concat([{ title: 'Core Principle', desc: 'Defensible execution specification.' }]);
          updateBullets(next);
        }

        function removeBulletItem(index) {
          const next = bullets.filter(function (_, i) { return i !== index; });
          updateBullets(next);
        }

        const blockProps = useBlockProps ? useBlockProps({
          className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
          style: { position: 'relative', cursor: 'pointer' },
          onClick: function () {
            if (clientId && wp.data && wp.data.dispatch) {
              wp.data.dispatch('core/block-editor').selectBlock(clientId);
            }
          }
        }) : {};

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/bullets-grid',
          attributes: attributes
        }) : el('div', { style: { padding: '20px', background: '#fff' } }, 'Bullets Grid: ' + (attributes.title || 'How we work'));

        const inlineActionBar = el(
          'div',
          { className: 'sc-inline-block-actions' },
          el(Button, {
            isPrimary: true,
            isSmall: true,
            onClick: addBulletItem
          }, '+ Add Principle Card')
        );

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Principles Header', initialOpen: true },
            el(TextControl, {
              label: 'Eyebrow',
              value: attributes.eyebrow || '// CORE PRINCIPLES & INDICATORS',
              onChange: function (v) { setAttributes({ eyebrow: v }); }
            }),
            el(TextControl, {
              label: 'Section Title',
              value: attributes.title || 'How we work',
              onChange: function (v) { setAttributes({ title: v }); }
            }),
            el(TextControl, {
              label: 'Subtitle / Description',
              value: attributes.subtitle || '',
              onChange: function (v) { setAttributes({ subtitle: v }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Principle Cards (' + bullets.length + ')', initialOpen: true },
            bullets.map(function (b, idx) {
              return el('div', {
                key: 'bullet-card-' + idx,
                style: { background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '12px', marginBottom: '12px' }
              },
                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                  el('strong', { style: { color: '#0F172A' } }, '#' + (idx + 1) + ' ' + (b.title || 'Principle')),
                  el(Button, { isDestructive: true, isSmall: true, onClick: function () { removeBulletItem(idx); } }, 'Remove')
                ),
                el(TextControl, {
                  label: 'Card Title',
                  value: b.title || '',
                  onChange: function (v) { updateBulletItem(idx, 'title', v); }
                }),
                el(TextareaControl, {
                  label: 'Description',
                  value: b.desc || '',
                  rows: 2,
                  onChange: function (v) { updateBulletItem(idx, 'desc', v); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addBulletItem
            }, '+ Add Principle Card')
          )
        );

        return el(
          Fragment,
          {},
          inspectorControls,
          el('div', blockProps, previewElement, inlineActionBar)
        );
      },
      save: function () {
        return null;
      }
    });

    // =========================================================================
    // 15. PROCESS PHASES BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/process-phases', {
      title: 'Phase-by-Phase Advisory Process',
      icon: 'clipboard',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// PHASE-BY-PHASE EXECUTION' },
            { name: 'title', label: 'Heading', default: 'What we do, phase by phase' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Our structured 6-phase advisory engagement ensures every control is scoped, addressed, and documented with precision.' }
          ]
        },
        {
          title: 'Phases Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'phasesData', label: 'Phases Array JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 16. STEPS HORIZONTAL BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/steps-horizontal', {
      title: 'Horizontal Steps Workflow',
      icon: 'ellipsis',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// ENGAGEMENT WORKFLOW' },
            { name: 'title', label: 'Heading', default: 'How an engagement starts' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'A structured, predictable path to verifiable defense compliance with zero surprises.' }
          ]
        },
        {
          title: 'Steps Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'stepsData', label: 'Steps Array JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 17. LEAD MAGNET BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/lead-magnet', {
      title: 'Lead Magnet Download Band',
      icon: 'download',
      category: 'secure-centric-cta',
      panels: [
        {
          title: 'Lead Magnet Copy & Options',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// FREE DOWNLOADABLE RESOURCE' },
            { name: 'name', label: 'Resource Title', default: 'First-Call Prep Checklist (what to have ready)' },
            { name: 'docType', label: 'Document Badge', default: 'PDF / EXCEL WORKBOOK' },
            { name: 'placeholder', label: 'Input Placeholder', default: 'Enter corporate email address' },
            { name: 'btnText', label: 'Button Text', default: 'Instant Free Download →' },
            { name: 'disclaimer', label: 'Disclaimer Note', default: 'Strictly confidential. No spam guarantee.' }
          ]
        },
        {
          title: 'Bullet Points (JSON)',
          initialOpen: false,
          fields: [
            { name: 'ticksData', label: 'Checklist Bullets JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 18. TEXTGROUP DEEPDIVE BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/textgroup-deepdive', {
      title: 'Long-Form Deep Dive Analysis',
      icon: 'text',
      category: 'secure-centric-proof',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// COMPREHENSIVE COMPLIANCE ANALYSIS' },
            { name: 'title', label: 'Heading', default: 'Long-form sections' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Explanations of requirements, timelines, and assessor expectations.' }
          ]
        },
        {
          title: 'Sections Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'sectionsData', label: 'Deep Dive Sections JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 19. RELATED RESOURCES BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/related-resources', {
      title: 'Related Compliance Resources',
      icon: 'grid-view',
      category: 'secure-centric-proof',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// KNOWLEDGE ECOSYSTEM' },
            { name: 'title', label: 'Heading', default: 'Related Compliance Resources' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Explore related compliance frameworks, staging guides, and scoping resources.' }
          ]
        },
        {
          title: 'Pages Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'pagesData', label: 'Related Pages JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 20. ICP TIERS BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/icp-tiers', {
      title: 'Compliance Contract Tiers',
      icon: 'shield',
      category: 'secure-centric-proof',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// COMPLIANCE TIERS' },
            { name: 'title', label: 'Heading', default: 'By CMMC Level: Where Your Contract Puts You' }
          ]
        },
        {
          title: 'Tiers Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'tiersData', label: 'Tiers Array JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 21. ICP PERSONAS BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/icp-personas', {
      title: 'Executive Buyer Personas',
      icon: 'admin-users',
      category: 'secure-centric-proof',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// EXECUTIVE PERSONAS' },
            { name: 'title', label: 'Heading', default: 'By Role: What Each Executive Needs From Us' }
          ]
        },
        {
          title: 'Personas Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'personasData', label: 'Personas Array JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 22. DIB SUPPLY CHAIN BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/dib-supply-chain', {
      title: 'Defense Industrial Base (DIB) Supply Chain',
      icon: 'networking',
      category: 'secure-centric-proof',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// DEFENSE INDUSTRIAL BASE (DIB)' },
            { name: 'title', label: 'Heading', default: 'By Position in the Defense Supply Chain' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Where defense contractors sit in the DoD supply chain and what triggers compliance.' }
          ]
        },
        {
          title: 'DIB Tiers Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'dibData', label: 'DIB Grid JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 23. AUDIENCE PATHS BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/audience-paths', {
      title: 'Supply Chain Sequential Pathways',
      icon: 'randomize',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// DEFENSE SUPPLY CHAIN PATHS' },
            { name: 'title', label: 'Heading', default: 'Your Path, Step by Step' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Sequential milestones tailored to your exact role in the Defense Industrial Base.' }
          ]
        },
        {
          title: 'Pathways Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'pathsData', label: 'Pathways JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 24. TWO COLUMN COMPARISON BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/two-col', {
      title: 'Two Column Comparison Cards',
      icon: 'columns',
      category: 'secure-centric-proof',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// OBJECTIVE COMPARISON' },
            { name: 'title', label: 'Heading', default: 'Who needs an RPO, and who may not' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Understanding the fundamental regulatory distinctions to make informed compliance decisions.' }
          ]
        },
        {
          title: 'Column 1 (Left Card)',
          initialOpen: false,
          fields: [
            { name: 'col1Title', label: 'Col 1 Title', default: 'When You Need an Accredited RPO' },
            { name: 'col1Desc', label: 'Col 1 Subtitle', type: 'textarea', default: 'Contractors facing immediate DFARS requirements or C3PAO audits.' },
            { name: 'col1Items', label: 'Col 1 Checklist (JSON)', type: 'textarea' }
          ]
        },
        {
          title: 'Column 2 (Right Card)',
          initialOpen: false,
          fields: [
            { name: 'col2Title', label: 'Col 2 Title', default: 'When an RPO May Not Be Required' },
            { name: 'col2Desc', label: 'Col 2 Subtitle', type: 'textarea', default: 'Organizations without CUI or with pure commercial off-the-shelf contracts.' },
            { name: 'col2Items', label: 'Col 2 Checklist (JSON)', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 25. CONSULTANT SCORER BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/consultant-scorer', {
      title: 'Consultant Selection Scorer (7 Checks)',
      icon: 'yes',
      category: 'secure-centric-proof',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// DECISION FRAMEWORK' },
            { name: 'title', label: 'Heading', default: 'How to choose a CMMC consultant: 7 checks' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Check every qualification before engaging any CMMC advisory firm.' }
          ]
        },
        {
          title: 'Scorer Checks Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'checksData', label: '7 Checks Array JSON', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 26. STAGE LINE BAR BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/stageline', {
      title: 'Stage Line Bar',
      icon: 'flag',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Stage Settings',
          initialOpen: true,
          fields: [
            { name: 'stage', label: 'Stage Name', default: 'Compliance Phase' },
            { name: 'title', label: 'Right Eyebrow', default: 'Where you fit' },
            { name: 'line', label: 'Stage Explanation', type: 'textarea', default: 'You know CMMC applies but need clarity on scoping, timeline, and audit boundaries.' },
            { name: 'serviceLink', label: 'Service Link URL', default: '/secure-centric/services/cmmc-compliance/' },
            { name: 'processLink', label: 'Full Process Link URL', default: '/secure-centric/cmmc/cmmc-process/' }
          ]
        }
      ]
    });

    // =========================================================================
    // 27. STEPS VERTICAL BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/steps-vertical', {
      title: 'Steps Vertical (Review Stages)',
      icon: 'editor-ul',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// DETAILED REVIEW STAGES' },
            { name: 'title', label: 'Heading', default: 'Detailed review stages' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Every activity, team participant, and tangible deliverable produced during this review.' }
          ]
        },
        {
          title: 'Vertical Steps Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'stepsData', label: 'Steps JSON Array', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 28. ICONBOX HIGHLIGHT BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/iconbox', {
      title: 'IconBox Highlight Card',
      icon: 'building',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Card Content',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// IN-PERSON VERIFICATION' },
            { name: 'title', label: 'Heading', default: 'On-Site Physical & Technical Walkthrough' },
            { name: 'lead', label: 'Lead Sentence', type: 'textarea', default: 'We inspect real hardware, server rooms, and shop floors.' }
          ]
        },
        {
          title: 'Points List (JSON)',
          initialOpen: false,
          fields: [
            { name: 'pointsData', label: 'Points JSON Array', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 29. DATA TABLE BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/data-table', {
      title: 'Data Table (Gap & Compliance Matrix)',
      icon: 'table-col-after',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Table Header',
          initialOpen: true,
          fields: [
            { name: 'title', label: 'Table Heading', default: 'Findings Matrix & Gap Breakdown' }
          ]
        },
        {
          title: 'Table Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'colsData', label: 'Columns Header JSON Array', type: 'textarea' },
            { name: 'rowsData', label: 'Rows Data JSON Array', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 30. BOUNDARY DIAGRAM BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/diagram', {
      title: 'Boundary Segregation Diagram',
      icon: 'networking',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Diagram Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// BOUNDARY SEGREGATION' },
            { name: 'title', label: 'Heading', default: 'CUI Data Flow & Boundary Isolation Architecture' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Data flow path defining CUI entry, processing, storage, and physical facility boundaries.' }
          ]
        },
        {
          title: 'Flow Nodes (JSON)',
          initialOpen: false,
          fields: [
            { name: 'stepsData', label: 'Nodes JSON Array', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 31. ACCREDITATION BADGE STRIP BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/badge', {
      title: 'Accreditation Badge Strip',
      icon: 'shield',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Badge Content',
          initialOpen: true,
          fields: [
            { name: 'shieldText', label: 'Shield Text', default: '🛡️ Cyber AB Registered Provider Organization · CPN #3942' },
            { name: 'metaText', label: 'Metadata Text', default: 'Formally Reviewed: November 2026 · 32 CFR 170 Compliant' }
          ]
        }
      ]
    });

    // =========================================================================
    // 32. ON-THIS-PAGE TOC BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/toc', {
      title: 'On-This-Page Table of Contents',
      icon: 'list-view',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Header & Title',
          initialOpen: true,
          fields: [
            { name: 'title', label: 'TOC Heading', default: 'On This Page' }
          ]
        },
        {
          title: 'TOC Links (JSON)',
          initialOpen: false,
          fields: [
            { name: 'linksData', label: 'Links JSON Array [{label, anchor}]', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 33. NIST 14 CONTROL FAMILIES (ACCORDION TILES)
    // =========================================================================
    createBlockRegistration('secure-centric/accordion-tiles', {
      title: 'NIST 14 Control Families (Accordion / Interactive Tiles)',
      icon: 'grid-view',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Section Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// 110 NIST CONTROLS' },
            { name: 'title', label: 'Heading', default: 'The 110 Requirements Across 14 Families' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Click on any control family below to see requirement counts and scope objectives tested by C3PAO assessors.' }
          ]
        },
        {
          title: 'Families Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'familiesData', label: 'Families JSON Array', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 34. NIST 14 CONTROL FAMILIES (GRID TILES)
    // =========================================================================
    createBlockRegistration('secure-centric/tiles', {
      title: 'NIST 14 Control Families (Grid Cards)',
      icon: 'screenoptions',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Section Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// 110 CONTROLS IN 14 FAMILIES' },
            { name: 'title', label: 'Heading', default: 'The 14 Control Families of NIST SP 800-171' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'The complete NIST SP 800-171 Rev 2 security control architecture required for CMMC Level 2.' }
          ]
        },
        {
          title: 'Tiles Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'tilesData', label: 'Tiles JSON Array', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 35. TOPIC CLUSTER LINKS BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/cluster', {
      title: 'Topic Cluster Links Grid',
      icon: 'networking',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Section Header',
          initialOpen: true,
          fields: [
            { name: 'title', label: 'Heading', default: 'Explore Related Compliance Topics' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Cross-linked compliance pillars, assessment staging, and implementation guides.' }
          ]
        },
        {
          title: 'Cluster Links (JSON)',
          initialOpen: false,
          fields: [
            { name: 'linksData', label: 'Links JSON Array [{label, url}]', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 36. REGULATORY CITATIONS FRESHNESS BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/fresh', {
      title: 'Regulatory Citations Freshness Card',
      icon: 'calendar-alt',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Card Header',
          initialOpen: true,
          fields: [
            { name: 'title', label: 'Heading', default: 'Official Rulemaking & Regulatory References' },
            { name: 'updated', label: 'Updated Date', default: 'November 2026' }
          ]
        },
        {
          title: 'Sources Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'sourcesData', label: 'Sources JSON Array [{name, url}]', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 37. HOW-TO VERIFICATION PROCEDURE BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/howto', {
      title: 'Verification Procedure How-To Steps',
      icon: 'clipboard',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Section Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// VERIFICATION PROCEDURE' },
            { name: 'title', label: 'Heading', default: 'How to Verify Any CMMC RPO or Registered Practitioner' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Protect your company from unqualified consultants by verifying accreditation directly on the official Cyber AB registry.' }
          ]
        },
        {
          title: 'Procedure Steps (JSON)',
          initialOpen: false,
          fields: [
            { name: 'stepsData', label: 'Steps JSON Array [{no, title, desc}]', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 38. NUMBERS 4 GRID (VERIFIED METRICS)
    // =========================================================================
    createBlockRegistration('secure-centric/numbers4', {
      title: 'Verified Defense Metrics (Numbers 4 Band)',
      icon: 'chart-bar',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Section Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', default: '// VERIFIED DEFENSE METRICS' },
            { name: 'title', label: 'Heading', default: 'CMMC By the Numbers' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'CMMC compliance numbers grounded in Department of War regulatory criteria.' }
          ]
        },
        {
          title: 'Metrics Data (JSON)',
          initialOpen: false,
          fields: [
            { name: 'statsData', label: 'Stats JSON Array [{num, label, desc}]', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 39. COMPLIANCE ARTIFACT DEFINITION BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/definition', {
      title: 'Compliance Artifact Definition Card',
      icon: 'media-document',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Card Header',
          initialOpen: true,
          fields: [
            { name: 'title', label: 'Heading', default: 'What is this compliance artifact?' },
            { name: 'desc', label: 'Description', type: 'textarea', default: 'A structured, assessor-tested Excel and PDF template designed to evaluate internal technical controls.' }
          ]
        },
        {
          title: 'Points List (JSON)',
          initialOpen: false,
          fields: [
            { name: 'pointsData', label: 'Points JSON Array', type: 'textarea' }
          ]
        }
      ]
    });

    // =========================================================================
    // 40. CHECKLIST SPREADSHEET PREVIEW TABLE BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/preview', {
      title: 'Checklist Spreadsheet Table Preview',
      icon: 'analytics',
      category: 'secure-centric-process',
      panels: [
        {
          title: 'Table Header',
          initialOpen: true,
          fields: [
            { name: 'title', label: 'Table Heading', default: 'Sample Spreadsheet Matrix Preview' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'A preview of the columns, assessment objectives, and evidence fields included in the downloadable resource.' }
          ]
        },
        {
          title: 'Table Rows (JSON)',
          initialOpen: false,
          fields: [
            { name: 'rowsData', label: 'Rows JSON Array [{req, family, objective, status, owner, evidence}]', type: 'textarea' }
          ]
        }
      ]
    });

    console.log('Secure-Centric Gutenberg Blocks Suite Registered Successfully!');
  }

  if (wp.domReady) {
    wp.domReady(initBlocks);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlocks);
  } else {
    initBlocks();
  }
})(window.wp || {});
