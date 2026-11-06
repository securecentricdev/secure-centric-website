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

        // Parse structured logos
        let currentLogos = [];
        if (attributes.logosData) {
          try {
            const parsed = JSON.parse(attributes.logosData);
            if (Array.isArray(parsed)) currentLogos = parsed;
          } catch (e) {}
        }
        if (!currentLogos || !currentLogos.length) {
          if (attributes.logos && Array.isArray(attributes.logos) && attributes.logos.length) {
            currentLogos = attributes.logos;
          } else if (attributes.logosList) {
            currentLogos = attributes.logosList.split(',').map(function (s) {
              return { name: s.trim(), imageUrl: '', imageId: 0 };
            }).filter(function (x) { return x.name; });
          } else {
            currentLogos = [
              { name: 'Tower Semiconductor', imageUrl: '', imageId: 0 },
              { name: 'Safran Federal Systems', imageUrl: '', imageId: 0 },
              { name: 'Goodwin & Associates', imageUrl: '', imageId: 0 },
              { name: 'HRD Aero Systems', imageUrl: '', imageId: 0 },
              { name: 'Precision Aerospace', imageUrl: '', imageId: 0 },
              { name: 'Defense Dynamics', imageUrl: '', imageId: 0 }
            ];
          }
        }

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
                  label: 'Company Name (beside logo)',
                  value: item.name || '',
                  placeholder: 'e.g. Tower Semiconductor, Safran...',
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

        let currentSteps = [];
        if (attributes.stepsData) {
          try {
            const parsed = JSON.parse(attributes.stepsData);
            if (Array.isArray(parsed) && parsed.length > 0) currentSteps = parsed;
          } catch (e) {}
        }

        if (!currentSteps || !currentSteps.length) {
          currentSteps = [
            { no: '01', name: 'Site visit', phase: 'Phase 1: Facility Walkthrough & Scope Discovery', help: 'In-person physical & technical walkthrough of facilities, server rooms, and shop-floor enclaves.', who: 'You + Secure-Centric', output: 'Asset discovery baseline & boundary notes', link: '#page-2' },
            { no: '02', name: 'Scoping', phase: 'Phase 2: CUI Boundary & Enclave Architecture', help: 'Map CUI/FCI flows, identify people, systems, and network storage touching DoD contracts.', who: 'Secure-Centric + IT Leads', output: 'Formal Scope Document & Data-Flow Architecture', link: '#page-16' },
            { no: '03', name: 'Gap assessment', phase: 'Phase 3: 110-Control Baseline Scoring', help: 'Audit all 110 NIST SP 800-171 controls against actual day-to-day operations.', who: 'Secure-Centric', output: 'Defensible SPRS Score estimate & findings register', link: '#page-5' },
            { no: '04', name: 'Remediation', phase: 'Phase 4: Engineering & Policy Remediation', help: 'Prioritize fixes by risk weight; guide MFA, encryption, logging, and enclave deployments.', who: 'Your IT/MSP (guided by us)', output: 'Remediation Roadmap with owners and completion targets', link: '#page-7' },
            { no: '05', name: 'Documentation', phase: 'Phase 5: System Security Plan (SSP) & POA&M', help: 'Co-write your System Security Plan (SSP), POA&M, and all required operational policies.', who: 'Secure-Centric + You', output: 'Assessor-ready SSP and comprehensive policy suite', link: '#page-8' },
            { no: '06', name: 'Readiness review', phase: 'Phase 6: C3PAO Mock Audit & Interview Prep', help: 'Full rehearsal mock audit simulating C3PAO interview techniques and evidence requests.', who: 'Secure-Centric RPs', output: 'Readiness sign-off report & Evidence Binder index', link: '#page-4' },
            { no: '07', name: 'Assessment', phase: 'Phase 7: Official C3PAO Level 2 Assessment', help: 'We stand alongside your team during official DIBCAC or Authorized C3PAO evaluation.', who: 'Independent C3PAO', output: 'Level 2 CMMC Certification recommendation', link: '#page-19' },
            { no: '08', name: 'Maintain', phase: 'Phase 8: Continuous Monitoring & Affirmation', help: 'Continuous compliance, annual SPRS reaffirmation, change management, and evidence refreshes.', who: 'Virtual CISO / You', output: 'Annual Affirmation pack & ongoing compliance posture', link: '#page-11' }
          ];
        }

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

        let currentReviews = [];
        if (attributes.testimonialsData) {
          try {
            const parsed = JSON.parse(attributes.testimonialsData);
            if (Array.isArray(parsed) && parsed.length > 0) currentReviews = parsed;
          } catch (e) {}
        }

        if (!currentReviews || !currentReviews.length) {
          currentReviews = [
            { num: '01', author: 'Alex Liu', role: 'IT Manager, Tower Semiconductor', avatar: 'AL', quote: 'Secure-Centric gave us absolute clarity on what was inside our CUI boundary and what was not. We passed our official C3PAO Level 2 assessment on the first attempt with zero open items.', linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' },
            { num: '02', author: 'Patrick Shaw', role: 'Cyber Security Analyst, Safran Federal Systems', avatar: 'PS', quote: "Their team was on site at our facility within two weeks. They didn't hand us generic compliance templates—they helped configure our actual firewalls, SIEM, and author an ironclad SSP.", linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' },
            { num: '03', author: 'Elena Rostova', role: 'VP Operations, Precision Aero Machining', avatar: 'ER', quote: 'We cut our assessment scope by almost 40% based on their enclave advisory alone. That decision alone saved us at least $80,000 in unnecessary software upgrades and audit fees.', linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' },
            { num: '04', author: 'Marcus Vance', role: 'Chief Information Officer, Vanguard Defense Tech', avatar: 'MV', quote: "The mock C3PAO interview sessions were intense and realistic. When DIBCAC conducted our actual review, there wasn't a single question or evidence request that we hadn't already prepared for.", linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' },
            { num: '05', author: 'David Chen', role: 'Director of Compliance, Apex Dynamics', avatar: 'DC', quote: 'Finding an RPO that actually understands precision CNC shop floor networks is rare. Secure-Centric bridged the gap between our machinists, IT, and Department of War compliance seamlessly.', linkedinUrl: 'https://www.linkedin.com/company/secure-centric/', linkedinText: 'Shared publicly on LinkedIn' }
          ];
        }

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

        let currentCards = [];
        if (attributes.resourcesData) {
          try {
            const parsed = JSON.parse(attributes.resourcesData);
            if (Array.isArray(parsed) && parsed.length > 0) currentCards = parsed;
          } catch (e) {}
        }

        if (!currentCards || !currentCards.length) {
          currentCards = [
            { title: 'CMMC Complete Guide', desc: 'The definitive executive and technical overview of CMMC levels, rulemaking, and audits.', link: '#contact', icon: '📁' },
            { title: 'CMMC Level 2 Guide', desc: '110 requirements across 14 security families: technical breakdown and scoping rules.', link: '#contact', icon: '📘' },
            { title: 'NIST SP 800-171 Standard', desc: 'The foundational standard behind DFARS 7012 and Level 2 C3PAO certifications.', link: '#contact', icon: '🛡️' },
            { title: 'CUI Scoping & Handling Guide', desc: 'Controlled Unclassified Information: identification, markings, and boundary isolation.', link: '#contact', icon: '🔒' },
            { title: 'CMMC Enclave Advisory', desc: 'How segregating your CUI network saves months of implementation and audit costs.', link: '#contact', icon: '🏗️' },
            { title: 'Level 2 Compliance Checklist', desc: 'Downloadable 110-control Excel checklist with ownership and objective columns.', link: '#contact', icon: '📊' }
          ];
        }

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
    // 8. ACCORDION FAQ BLOCK (DYNAMIC QUESTIONS ADD / REMOVE)
    // =========================================================================
    registerBlockType('secure-centric/accordion-faq', {
      title: 'FAQ Accordion (Dynamic Questions)',
      icon: 'editor-help',
      category: 'secure-centric-process',
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        let currentFaqs = [];
        if (attributes.faqsData) {
          try {
            const parsed = JSON.parse(attributes.faqsData);
            if (Array.isArray(parsed) && parsed.length > 0) currentFaqs = parsed;
          } catch (e) {}
        }

        if (!currentFaqs || !currentFaqs.length) {
          currentFaqs = [
            { q: 'What is CMMC compliance?', a: 'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense contractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).' },
            { q: 'Do you come to our site?', a: 'Yes, absolutely. An on-site facility walkthrough is step 1 of every engagement. We inspect physical boundaries, server rooms, and shop-floor terminals in person.' },
            { q: 'Do you only work on CMMC and NIST SP 800-171?', a: 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.' },
            { q: 'What happens after I book a discovery call?', a: 'Having your prime contract Section I DFARS clauses (e.g. 252.204-7012, 7019, 7020), your high-level network topology, and whether you handle CUI or FCI will make the call most productive.' },
            { q: 'Who will we work with day to day?', a: 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.' }
          ];
        }

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
