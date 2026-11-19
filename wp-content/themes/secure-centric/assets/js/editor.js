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
    const { InspectorControls, BlockControls, useBlockProps } = blockEditor;
    const { PanelBody, TextControl, TextareaControl, SelectControl, Button, RangeControl, CheckboxControl, ToggleControl } = wp.components;
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
     * Helper to retrieve available Forminator Forms dynamically
     */
    const defaultForminatorOptions = [
      { label: '-- Default / Theme Form --', value: '' },
      { label: 'Contact & Discovery Call Form (ID: 101)', value: '101' },
      { label: 'Checklist & Resource Download Form (ID: 102)', value: '102' },
      { label: 'Hero 3-Minute Readiness Check (Quick Email) (ID: 103)', value: '103' },
      { label: 'Quick Consultation / Inquiry (Single Email) (ID: 104)', value: '104' },
      { label: 'Newsletter & DIB Intelligence (ID: 106)', value: '106' }
    ];

    function getForminatorOptions() {
      if (window.scForminatorForms && Array.isArray(window.scForminatorForms) && window.scForminatorForms.length > 0) {
        return window.scForminatorForms;
      }
      return defaultForminatorOptions;
    }

    /**
     * Helper to create standard block preview with ServerSideRender & Sidebar Controls
     */
    function isRepeaterField(field) {
      if (field.type === 'repeater') return true;
      var nm = field.name || '';
      if (nm.endsWith('Data') || nm.endsWith('Items') || nm === 'colsData' || nm === 'rowsData' || nm === 'pointsData' || nm === 'bulletsData' || nm === 'ticksData') {
        return true;
      }
      return false;
    }

    function renderSmartRepeater(field, rawVal, onChange) {
      var items = safeParseJsonArray(rawVal, []);
      if (!Array.isArray(items)) items = [];
      if (items.length === 0 && field.default) {
        items = safeParseJsonArray(field.default, []);
      }

      function updateItems(newItems) {
        onChange(JSON.stringify(newItems));
      }

      function addItem() {
        if (items.length > 0 && typeof items[0] === 'object' && items[0] !== null) {
          var template = {};
          Object.keys(items[0]).forEach(function (k) {
            template[k] = '';
          });
          updateItems(items.concat([template]));
        } else {
          updateItems(items.concat(['']));
        }
      }

      function removeItem(idx) {
        if (items.length <= 1) return;
        updateItems(items.filter(function (_, i) { return i !== idx; }));
      }

      function updateItemProp(idx, key, newVal) {
        var next = items.map(function (it, i) {
          if (i === idx) {
            if (typeof it === 'object' && it !== null) {
              var upd = Object.assign({}, it);
              upd[key] = newVal;
              return upd;
            } else {
              return newVal;
            }
          }
          return it;
        });
        updateItems(next);
      }

      var isObjectList = items.length > 0 && typeof items[0] === 'object' && items[0] !== null;
      var cleanFieldLabel = (field.label || 'List Items').replace(/\s*\(JSON\)/gi, '').replace(/\s*JSON\s*Array/gi, '');

      return el('div', {
        key: 'smart-repeater-' + field.name,
        style: {
          marginBottom: '16px',
          padding: '12px',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px'
        }
      },
        el('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            paddingBottom: '6px',
            borderBottom: '1px solid #E2E8F0'
          }
        },
          el('strong', { style: { fontSize: '13px', color: '#1E293B' } }, cleanFieldLabel + ' (' + items.length + ')'),
          el(Button, {
            isSecondary: true,
            isSmall: true,
            onClick: addItem
          }, '+ Add Item')
        ),
        items.map(function (item, idx) {
          if (isObjectList) {
            var keys = Object.keys(item);
            return el('div', {
              key: 'rep-item-' + idx,
              style: {
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '10px 12px',
                marginBottom: '10px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }
            },
              el('div', {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  borderBottom: '1px solid #F1F5F9',
                  paddingBottom: '4px'
                }
              },
                el('span', { style: { fontSize: '12px', fontWeight: 600, color: '#334155' } }, 'Item #' + (idx + 1) + (item.title || item.name || item.label ? ' • ' + (item.title || item.name || item.label) : '')),
                items.length > 1 ? el(Button, {
                  isDestructive: true,
                  isSmall: true,
                  onClick: function () { removeItem(idx); }
                }, 'Remove') : null
              ),
              keys.map(function (k) {
                var prettyLabel = k.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
                var isContentField = (
                  k.toLowerCase() === 'body' ||
                  k.toLowerCase().indexOf('body') !== -1 ||
                  k.toLowerCase().indexOf('para') !== -1 ||
                  k.toLowerCase().indexOf('content') !== -1
                );
                var isSubField = (k.toLowerCase() === 'sub' || k.toLowerCase().indexOf('sub') !== -1);
                var isLong = isContentField || isSubField || (
                  k.toLowerCase().indexOf('desc') !== -1 ||
                  k.toLowerCase().indexOf('text') !== -1 ||
                  k.toLowerCase().indexOf('pain') !== -1 ||
                  k.toLowerCase().indexOf('gain') !== -1 ||
                  k.toLowerCase().indexOf('objective') !== -1 ||
                  k.toLowerCase().indexOf('evidence') !== -1 ||
                  k.toLowerCase().indexOf('controls') !== -1
                );
                
                var displayVal = item[k];
                if (Array.isArray(displayVal)) {
                  displayVal = displayVal.join('\n\n');
                } else if (displayVal === null || displayVal === undefined) {
                  displayVal = '';
                }

                return isLong ? el(TextareaControl, {
                  key: 'f-' + k + '-' + idx,
                  label: prettyLabel + (isContentField ? ' (Supports multiple paragraphs, HTML & checklists ✓, -)' : ''),
                  value: displayVal,
                  rows: isContentField ? 6 : 3,
                  onChange: function (v) { updateItemProp(idx, k, v); }
                }) : el(TextControl, {
                  key: 'f-' + k + '-' + idx,
                  label: prettyLabel,
                  value: displayVal,
                  onChange: function (v) { updateItemProp(idx, k, v); }
                });
              })
            );
          } else {
            return el('div', {
              key: 'rep-item-' + idx,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }
            },
              el('div', { style: { flex: 1 } },
                el(TextControl, {
                  value: item || '',
                  placeholder: 'Enter item text...',
                  onChange: function (v) { updateItemProp(idx, null, v); }
                })
              ),
              items.length > 1 ? el(Button, {
                isDestructive: true,
                isSmall: true,
                onClick: function () { removeItem(idx); }
              }, '×') : null
            );
          }
        }),
        el(Button, {
          isPrimary: true,
          isSmall: true,
          style: { width: '100%', justifyContent: 'center', marginTop: '6px' },
          onClick: addItem
        }, '+ Add New Item')
      );
    }

    function createBlockRegistration(blockName, config) {
      registerBlockType(blockName, {
        title: config.title,
        icon: config.icon || 'shield',
        category: 'custom-blocks',
        example: {},
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
                  title: (panel.title || '').replace(/\s*\(JSON\)/gi, ''),
                  initialOpen: panel.initialOpen !== undefined ? panel.initialOpen : (pIdx === 0)
                },
                panel.fields.map(function (field, fIdx) {
                  const val = attributes[field.name] !== undefined ? attributes[field.name] : (field.default || '');
                  const cleanLabel = (field.label || '').replace(/\s*\(JSON\)/gi, '').replace(/\s*JSON\s*Array/gi, '');
                  const fieldLabel = (field.name === 'eyebrow' || field.name.toLowerCase().indexOf('eyebrow') !== -1) ? 'Tag' : cleanLabel;

                  if (isRepeaterField(field)) {
                    return renderSmartRepeater(field, val, function (newVal) {
                      const upd = {};
                      upd[field.name] = newVal;
                      setAttributes(upd);
                    });
                  } else if (field.type === 'select') {
                    const selectOptions = typeof field.options === 'function' ? field.options() : (field.options || (field.name === 'formId' ? getForminatorOptions() : []));
                    return el(SelectControl, {
                      key: 'field-' + field.name + '-' + fIdx,
                      label: fieldLabel,
                      value: val,
                      options: selectOptions,
                      help: field.help || '',
                      onChange: function (newVal) {
                        const upd = {};
                        upd[field.name] = newVal;
                        setAttributes(upd);
                      }
                    });
                  } else if (field.type === 'textarea') {
                    return el(TextareaControl, {
                      key: 'field-' + field.name + '-' + fIdx,
                      label: fieldLabel,
                      value: val,
                      rows: field.rows || 3,
                      onChange: function (newVal) {
                        const upd = {};
                        upd[field.name] = newVal;
                        setAttributes(upd);
                      }
                    });
                  } else if (field.type === 'checkbox') {
                    return CheckboxControl ? el(CheckboxControl, {
                      key: 'field-' + field.name + '-' + fIdx,
                      label: fieldLabel,
                      checked: !!val,
                      help: field.help || '',
                      onChange: function (newVal) {
                        const upd = {};
                        upd[field.name] = newVal;
                        setAttributes(upd);
                      }
                    }) : null;
                  } else {
                    return el(TextControl, {
                      key: 'field-' + field.name + '-' + fIdx,
                      label: fieldLabel,
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
      category: 'custom-blocks',
      example: {},
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
        const layout = attributes.layout || 'home';
        const isHomeLayout = (layout === 'home' || !layout);
        const isSplitLayout = (layout === 'split');
        const isResourceLayout = (layout === 'resource' || layout === 'cui-session' || layout === 'landing');
        const isGuideLayout = (layout === 'guide');
        const isIcpLayout = (layout === 'icp');

        const panels = [];

        // Panel 0: Layout Variant Selector
        panels.push(
          el(
            PanelBody,
            { title: 'Hero Layout & Mode', initialOpen: true },
            el(SelectControl, {
              label: 'Layout Variant',
              value: layout,
              options: [
                { label: 'Homepage Video Hero (Quiz & Topic Pills)', value: 'home' },
                { label: 'Service Split Hero (Contact Form / Advisor Card)', value: 'split' },
                { label: 'Center Layout (About Us & Centered Hero)', value: 'center' },
                { label: 'Guide Layout (Pillar Knowledge Base)', value: 'guide' },
                { label: 'Resource / Checklist Download Layout', value: 'resource' },
                { label: 'ICP Situation Selector Layout', value: 'icp' }
              ],
              help: 'Select the hero layout style for this page.',
              onChange: function (val) { setAttributes({ layout: val }); }
            })
          )
        );

        // Panel 1: Hero Background Media (for Home layout)
        if (isHomeLayout) {
          panels.push(
            el(
              PanelBody,
              { title: 'Hero Background Media & Video', initialOpen: false },
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
            )
          );
        }

        // Panel 2: Header & Main Headline
        panels.push(
          el(
            PanelBody,
            { title: isSplitLayout ? 'Breadcrumb & Headline' : 'Header & Main Headline', initialOpen: isSplitLayout },
            (isSplitLayout || isGuideLayout || isResourceLayout || isIcpLayout) ? el(TextControl, {
              label: 'Breadcrumb Current Text',
              value: attributes.breadcrumbCurrent !== undefined ? attributes.breadcrumbCurrent : 'CMMC COMPLIANCE SERVICES',
              onChange: function (val) { setAttributes({ breadcrumbCurrent: val }); }
            }) : null,
            el(TextControl, {
              label: 'Tag / Eyebrow',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// NIST SP 800-171 / CMMC Compliance Consultants',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Main Headline',
              value: attributes.title !== undefined ? attributes.title : 'CMMC compliance for defense subcontractors, guided by a Cyber AB RPO',
              onChange: function (val) { setAttributes({ title: val }); }
            }),
            isHomeLayout ? el(TextControl, {
              label: 'Highlighted Suffix (Cyan text)',
              value: attributes.highlightText !== undefined ? attributes.highlightText : 'Cyber AB RPO',
              onChange: function (val) { setAttributes({ highlightText: val }); }
            }) : null,
            el(TextareaControl, {
              label: 'Hero Subtext Description',
              rows: 3,
              value: attributes.description !== undefined ? attributes.description : 'We help defense contractors and suppliers get ready for CMMC and NIST SP 800-171, from the first site visit to the annual affirmation.',
              onChange: function (val) { setAttributes({ description: val }); }
            })
          )
        );

        // Panel 3: CTA Buttons
        panels.push(
          el(
            PanelBody,
            { title: 'Call-to-Action Buttons', initialOpen: false },
            el(TextControl, {
              label: 'Primary Button Text',
              value: attributes.primaryBtnText !== undefined ? attributes.primaryBtnText : (isSplitLayout ? 'Find the Right CMMC Support Today →' : 'Book a Discovery Call →'),
              onChange: function (val) { setAttributes({ primaryBtnText: val }); }
            }),
            el(TextControl, {
              label: 'Primary Button Link URL',
              value: attributes.primaryBtnUrl !== undefined ? attributes.primaryBtnUrl : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll',
              onChange: function (val) { setAttributes({ primaryBtnUrl: val }); }
            }),
            el(TextControl, {
              label: 'Secondary Button Text',
              value: attributes.secondaryBtnText !== undefined ? attributes.secondaryBtnText : (isSplitLayout ? 'Compare Services ↓' : 'Explore Services →'),
              onChange: function (val) { setAttributes({ secondaryBtnText: val }); }
            }),
            el(TextControl, {
              label: 'Secondary Button Link URL',
              value: attributes.secondaryBtnUrl !== undefined ? attributes.secondaryBtnUrl : (isSplitLayout ? '#service-comparison' : '#services'),
              onChange: function (val) { setAttributes({ secondaryBtnUrl: val }); }
            }),
            el(TextControl, {
              label: 'Button Microcopy / Note (under button)',
              value: attributes.subText !== undefined ? attributes.subText : '30 min · No sales pitch · Signed NDA',
              onChange: function (val) { setAttributes({ subText: val }); }
            })
          )
        );

        // Panel 4: Right-Hand Side Contact Form & Advisory Card (ONLY on Split Layout for Service Pages)
        if (isSplitLayout) {
          panels.push(
            el(
              PanelBody,
              { title: 'Right-Hand Side: Contact Form & Advisory Card', initialOpen: true },
              el(SelectControl, {
                label: 'Right-Hand Side Content Type',
                value: attributes.rightSideMode || 'form',
                options: [
                  { label: 'Contact Form (Forminator Form)', value: 'form' },
                  { label: 'Direct Advisory Card (Call Button & 3 Bullets)', value: 'advisor_card' }
                ],
                help: 'Choose whether to display an interactive contact form or a consultation booking card on the right side of this hero.',
                onChange: function (val) { setAttributes({ rightSideMode: val }); }
              }),
              el(TextControl, {
                label: 'Card / Form Title',
                value: attributes.cardTitle !== undefined ? attributes.cardTitle : 'Talk to a CMMC Advisor',
                onChange: function (val) { setAttributes({ cardTitle: val }); }
              }),
              el(TextareaControl, {
                label: 'Card Subtitle / Description',
                rows: 2,
                value: attributes.cardDesc !== undefined ? attributes.cardDesc : 'Submit your details below to schedule your confidential 30-minute scoping review:',
                onChange: function (val) { setAttributes({ cardDesc: val }); }
              }),
              (attributes.rightSideMode !== 'advisor_card') ? el(SelectControl, {
                label: 'Select Forminator Form',
                value: attributes.formId !== undefined && attributes.formId !== '' ? String(attributes.formId) : '101',
                options: getForminatorOptions(),
                help: 'Select the Forminator form to render on the right (Default: ID 101 Contact & Discovery Call Form, or Form 104 Quick Consultation).',
                onChange: function (val) { setAttributes({ formId: val }); }
              }) : null
            )
          );
        }

        // Panel 4b: Right-Hand Side Situation Selector / Cards / Form (for ICP Layout)
        if (isIcpLayout) {
          let situationCards = [];
          try {
            if (attributes.audiencesData) {
              const parsed = typeof attributes.audiencesData === 'string' ? JSON.parse(attributes.audiencesData) : attributes.audiencesData;
              if (Array.isArray(parsed)) {
                situationCards = parsed.map(function (item) {
                  if (typeof item === 'string') {
                    return { title: item, link: '#tiers', linkText: 'See Your Path →' };
                  }
                  return {
                    title: item.title || item.name || '',
                    link: item.link || item.url || '#tiers',
                    linkText: item.linkText || item.cta || 'See Your Path →'
                  };
                });
              }
            }
          } catch (e) {
            situationCards = [];
          }

          if (situationCards.length === 0) {
            situationCards = [
              { title: 'Subcontractor or supplier', link: '#tiers', linkText: 'See Your Path →' },
              { title: 'Small or mid-size manufacturer', link: '#tiers', linkText: 'See Your Path →' },
              { title: 'Stuck or starting over', link: '#tiers', linkText: 'See Your Path →' },
              { title: 'Need an RPO before a C3PAO assessment', link: '#tiers', linkText: 'See Your Path →' }
            ];
          }

          const updateSituationCard = function (index, field, value) {
            const next = situationCards.map(function (card, idx) {
              if (idx !== index) return card;
              const updated = Object.assign({}, card);
              updated[field] = value;
              return updated;
            });
            setAttributes({ audiencesData: JSON.stringify(next) });
          };

          const addSituationCard = function () {
            const next = situationCards.concat([{
              title: 'New Situation',
              link: '#tiers',
              linkText: 'See Your Path →'
            }]);
            setAttributes({ audiencesData: JSON.stringify(next) });
          };

          const removeSituationCard = function (index) {
            const next = situationCards.filter(function (_, idx) {
              return idx !== index;
            });
            setAttributes({ audiencesData: JSON.stringify(next) });
          };

          const rightMode = attributes.rightSideMode || 'tiles';

          panels.push(
            el(
              PanelBody,
              { title: 'Right-Hand Side: Situation Selector & Content', initialOpen: true },
              el(SelectControl, {
                label: 'Right-Hand Side Mode',
                value: rightMode,
                options: [
                  { label: 'Situation Selector Cards (ICP Tiles)', value: 'tiles' },
                  { label: 'Contact Form (Forminator Form)', value: 'form' },
                  { label: 'Direct Advisory Card (Call Button & Bullets)', value: 'advisor_card' }
                ],
                onChange: function (val) { setAttributes({ rightSideMode: val }); }
              }),
              (rightMode === 'tiles') ? el(Fragment, {},
                el(TextControl, {
                  label: 'Section Eyebrow / Heading',
                  value: attributes.icpHeading !== undefined ? attributes.icpHeading : 'SELECT YOUR SITUATION',
                  onChange: function (val) { setAttributes({ icpHeading: val }); }
                }),
                el(TextControl, {
                  label: 'Bottom Subtext Note',
                  value: attributes.icpNote !== undefined ? attributes.icpNote : 'Not sure? Start with your contract tier below ↓',
                  onChange: function (val) { setAttributes({ icpNote: val }); }
                }),
                el('hr', { style: { margin: '14px 0' } }),
                el('p', { style: { fontSize: '12px', fontWeight: 'bold', margin: '0 0 10px', color: '#1E293B' } },
                  'Situation Cards (' + situationCards.length + '):'
                ),
                situationCards.map(function (card, idx) {
                  return el('div', {
                    key: 'situation-card-' + idx,
                    style: {
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '12px'
                    }
                  },
                    el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                      el('strong', { style: { fontSize: '12px', color: '#0F172A' } }, 'Card ' + (idx + 1)),
                      el(Button, {
                        isDestructive: true,
                        isSmall: true,
                        onClick: function () { removeSituationCard(idx); }
                      }, 'Remove')
                    ),
                    el(TextControl, {
                      label: 'Card Title / Situation',
                      value: card.title,
                      onChange: function (val) { updateSituationCard(idx, 'title', val); }
                    }),
                    el(TextControl, {
                      label: 'Button / Link Text',
                      value: card.linkText,
                      onChange: function (val) { updateSituationCard(idx, 'linkText', val); }
                    }),
                    el(TextControl, {
                      label: 'Target URL / Anchor',
                      value: card.link,
                      placeholder: '#tiers',
                      onChange: function (val) { updateSituationCard(idx, 'link', val); }
                    })
                  );
                }),
                el(Button, {
                  isPrimary: true,
                  style: { width: '100%', justifyContent: 'center', marginTop: '6px' },
                  onClick: addSituationCard
                }, '+ Add Situation Card')
              ) : el(Fragment, {},
                el(TextControl, {
                  label: 'Card / Form Title',
                  value: attributes.cardTitle !== undefined ? attributes.cardTitle : 'Talk to a CMMC Advisor',
                  onChange: function (val) { setAttributes({ cardTitle: val }); }
                }),
                el(TextareaControl, {
                  label: 'Card Subtitle / Description',
                  rows: 2,
                  value: attributes.cardDesc !== undefined ? attributes.cardDesc : 'Submit your details below to schedule your confidential 30-minute scoping review:',
                  onChange: function (val) { setAttributes({ cardDesc: val }); }
                }),
                (rightMode === 'form') ? el(SelectControl, {
                  label: 'Select Forminator Form',
                  value: attributes.formId !== undefined && attributes.formId !== '' ? String(attributes.formId) : '101',
                  options: getForminatorOptions(),
                  help: 'Select the Forminator form to render on the right (Default: ID 101 Contact & Discovery Call Form).',
                  onChange: function (val) { setAttributes({ formId: val }); }
                }) : null
              )
            )
          );
        }

        // Panel 5: Interactive Topic Pills (ONLY on Home Layout)
        if (isHomeLayout) {
          panels.push(
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
                value: attributes.topic1Url !== undefined ? attributes.topic1Url : '/cmmc/',
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
                value: attributes.topic2Url !== undefined ? attributes.topic2Url : '/services/nist-800-171-compliance/',
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
                value: attributes.topic3Url !== undefined ? attributes.topic3Url : '/cui/',
                onChange: function (val) { setAttributes({ topic3Url: val }); }
              })
            )
          );

          // Panel 6: Quick Quiz Widget Card (ONLY on Home Layout)
          panels.push(
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
              }),
              el(SelectControl, {
                label: 'Select Forminator Form',
                value: attributes.formId !== undefined && attributes.formId !== '' ? String(attributes.formId) : '103',
                options: getForminatorOptions(),
                help: 'Select the Forminator form to render in this Hero widget (Default: ID 103 for Hero 3-Minute Readiness Check, or Form 101/104).',
                onChange: function (val) { setAttributes({ formId: val }); }
              })
            )
          );
        }

        // Panel 7: Resource Checklist Download Controls (for Resource Layout)
        if (isResourceLayout) {
          panels.push(
            el(
              PanelBody,
              { title: 'Checklist Download Form Settings', initialOpen: true },
              el(SelectControl, {
                label: 'Select Forminator Download Form',
                value: attributes.formId !== undefined && attributes.formId !== '' ? String(attributes.formId) : '102',
                options: getForminatorOptions(),
                help: 'Select the Forminator form used for downloading the checklist resource (Default: ID 102).',
                onChange: function (val) { setAttributes({ formId: val }); }
              })
            )
          );
        }

        const inspectorControls = el(
          InspectorControls,
          {},
          panels
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
      category: 'custom-blocks',
      example: {},
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
        if (Array.isArray(currentLogos) && currentLogos.length === 5) {
          const hasRealLogos = currentLogos.some(function (l) { return l.imageUrl && l.imageUrl.length > 0; });
          if (!hasRealLogos) {
            currentLogos = defaultLogos;
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
      category: 'custom-blocks',
      example: {},
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultSteps = [
          {
            no: '01',
            name: 'Site visit and CMMC awareness',
            phase: 'Phase 1: Facility Walkthrough & Scope Discovery',
            help: 'We visit your facility to understand your operations, review how you handle FCI and CUI, and determine which CMMC requirements apply. We examine your environment, review contract requirements, and identify your applicable CMMC level.',
            what_happens: 'We visit your facility to understand your operations, review how you handle FCI and CUI, and determine which CMMC requirements apply.',
            how_we_help: 'We examine your environment, review contract requirements, and identify your applicable CMMC level.',
            who: 'You + Secure-Centric',
            output: 'Clear CMMC requirements and define the next steps.',
            link: '/services/cmmc-compliance/'
          },
          {
            no: '02',
            name: 'CUI identification and assessment boundaries',
            phase: 'Phase 2: CUI Boundary & Enclave Architecture',
            help: 'Identify where CUI resides and which personnel, systems, devices, and facilities access or process it. We trace FCI and CUI across your environment and establish accurate assessment boundaries.',
            what_happens: 'Identify where CUI resides and which personnel, systems, devices, and facilities access or process it.',
            how_we_help: 'We trace FCI and CUI across your environment and establish accurate assessment boundaries.',
            who: 'Secure-Centric + IT Leads',
            output: 'Verified CUI locations, asset inventory, and data-flow documentation.',
            link: '/services/cmmc-enclave/'
          },
          {
            no: '03',
            name: 'CMMC gap assessment',
            phase: 'Phase 3: 110-Control Baseline Scoring',
            help: 'Compare your existing security practices against the applicable NIST SP 800-171 requirements. We review each requirement, verify existing controls, identify gaps, and calculate your estimated SPRS score.',
            what_happens: 'Compare your existing security practices against the applicable NIST SP 800-171 requirements.',
            how_we_help: 'We review each requirement, verify existing controls, identify gaps, and calculate your estimated SPRS score.',
            who: 'Secure-Centric',
            output: 'An estimated SPRS score and prioritized list of gaps.',
            link: '/services/cmmc-readiness-assessment/gap-assessment/'
          },
          {
            no: '04',
            name: 'Gap remediation',
            phase: 'Phase 4: Engineering & Policy Remediation',
            help: 'Address security gaps through system configurations, security tools, processes, and training. We prioritize corrective actions, provide implementation guidance, and verify supporting evidence. Your IT team or MSP implements technical changes.',
            what_happens: 'Address security gaps through system configurations, security tools, processes, and training.',
            how_we_help: 'We prioritize corrective actions, provide implementation guidance, and verify supporting evidence. Your IT team or MSP implements technical changes.',
            who: 'Your IT/MSP (guided by us)',
            output: 'Implemented controls and verified supporting evidence.',
            link: '/services/cmmc-implementation-remediation/'
          },
          {
            no: '05',
            name: 'Documentation and policies',
            phase: 'Phase 5: System Security Plan (SSP) & POA&M',
            help: 'Document how your organization implements and maintains the required security controls. We develop and review your System Security Plan (SSP), security policies, procedures, and Plan of Action and Milestones (POA&M).',
            what_happens: 'Document how your organization implements and maintains the required security controls.',
            how_we_help: 'We develop and review your System Security Plan (SSP), security policies, procedures, and Plan of Action and Milestones (POA&M).',
            who: 'Secure-Centric + You',
            output: 'An accurate SSP, documented policies, and a maintained POA&M.',
            link: '/services/cmmc-implementation-remediation/ssp-poam-development/'
          },
          {
            no: '06',
            name: 'CMMC readiness review',
            phase: 'Phase 6: C3PAO Mock Audit & Interview Prep',
            help: 'Verify your security controls, documentation, and evidence before the formal assessment. We examine controls, conduct interviews, and test implementation using an assessor\'s approach. We identify remaining gaps and outline the corrective actions.',
            what_happens: 'Verify your security controls, documentation, and evidence before the formal assessment.',
            how_we_help: 'We examine controls, conduct interviews, and test implementation using an assessor\'s approach. We identify remaining gaps and outline the corrective actions.',
            who: 'Secure-Centric RPs',
            output: 'A verified readiness position and final list of corrective actions.',
            link: '/services/cmmc-readiness-assessment/'
          },
          {
            no: '07',
            name: 'CMMC assessment',
            phase: 'Phase 7: Formal Certification Assessment',
            help: 'Complete the applicable CMMC self-assessment or formal C3PAO assessment, based on your contract requirements. We organize assessment evidence, guide your team through assessment requirements, and support assessment-related questions. An authorized C3PAO makes the formal certification determination.',
            what_happens: 'Complete the applicable CMMC self-assessment or formal C3PAO assessment, based on your contract requirements.',
            how_we_help: 'We organize assessment evidence, guide your team through assessment requirements, and support assessment-related questions. An authorized C3PAO makes the formal certification determination.',
            who: 'Independent C3PAO',
            output: 'Documented assessment results and applicable CMMC status.',
            link: '/cmmc/cmmc-process/'
          },
          {
            no: '08',
            name: 'Ongoing compliance support',
            phase: 'Phase 8: Continuous Monitoring & Affirmation',
            help: 'Maintain CMMC compliance as your systems, personnel, and security requirements change. Our vCISO services provide ongoing oversight of security controls, documentation, evidence reviews, SPRS updates, and annual affirmations.',
            what_happens: 'Maintain CMMC compliance as your systems, personnel, and security requirements change.',
            how_we_help: 'Our vCISO services provide ongoing oversight of security controls, documentation, evidence reviews, SPRS updates, and annual affirmations.',
            who: 'Virtual CISO / You',
            output: 'Current documentation, reviewed evidence, and ongoing compliance oversight.',
            link: '/services/virtual-ciso/'
          }
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

        const ssrAttributes = {
          eyebrow: attributes.eyebrow,
          title: attributes.title,
          detailedProcessLinkText: attributes.detailedProcessLinkText,
          detailedProcessLinkUrl: attributes.detailedProcessLinkUrl,
          flagText: attributes.flagText,
          autoplayDelay: attributes.autoplayDelay
        };

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/roadmap-stepper',
          attributes: ssrAttributes
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
              label: 'Tag',
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
                  label: 'What Happens',
                  value: st.what_happens || '',
                  rows: 2,
                  help: 'Explanation of what occurs during this milestone.',
                  onChange: function (v) { updateStepItem(idx, { what_happens: v }); }
                }),
                el(TextareaControl, {
                  label: 'How We Help',
                  value: st.how_we_help || '',
                  rows: 2,
                  help: 'Explanation of Secure-Centric guidance and advisory actions.',
                  onChange: function (v) { updateStepItem(idx, { how_we_help: v }); }
                }),
                el(TextareaControl, {
                  label: 'General/Combined Description (Fallback)',
                  value: st.help || '',
                  rows: 2,
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
      category: 'custom-blocks',
      example: {},
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
              label: 'Tag',
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Explainer Content',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// SECTION EXPLAINER' },
            { name: 'title', label: 'Title', default: 'What is CMMC compliance?' },
            { name: 'p1', label: 'Paragraph 1', type: 'textarea', rows: 3, default: 'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense subcontractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).' },
            { name: 'p2', label: 'Paragraph 2', type: 'textarea', rows: 3, default: 'Under 32 CFR Part 170 and DFARS 252.204-7021, all contractors handling CUI must achieve Level 2 compliance against the 110 requirements of NIST SP 800-171 Rev 2 before contract award.' },
            { name: 'p3', label: 'Paragraph 3', type: 'textarea', rows: 3, default: 'Our Cyber AB Registered Practitioners conduct on-site facility walkthroughs, map exact CUI boundaries, guide technical remediation, and co-author your assessor-ready System Security Plan (SSP).' },
            { name: 'p4', label: 'Paragraph 4', type: 'textarea', rows: 3, default: '' },
            { name: 'p5', label: 'Paragraph 5', type: 'textarea', rows: 3, default: '' },
            { name: 'ctaText', label: 'CTA Button Text (Optional)', default: '' },
            { name: 'ctaUrl', label: 'CTA Button URL', default: 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll' }
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Links',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// PROOF & CREDENTIALS' },
            { name: 'title', label: 'Title', default: 'Why Secure-Centric' },
            { name: 'description', label: 'Description', type: 'textarea', default: 'Secure-Centric is an accredited Cyber AB Registered Provider Organization (RPO). We help defense subcontractors navigate DFARS 252.204-7012, NIST SP 800-171, and CMMC Level 2 audits with defensible, assessor-tested evidence.' },
            { name: 'linkText', label: 'Link Text', default: 'Full Company Credentials →' },
            { name: 'linkUrl', label: 'Link URL', default: '/about/' }
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
      category: 'custom-blocks',
      example: {},
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultCards = [
          { title: 'CMMC Complete Guide', desc: 'The definitive executive and technical overview of CMMC levels, rulemaking, and audits.', link: '/cmmc/', icon: '📁' },
          { title: 'CMMC Level 2 Guide', desc: '110 requirements across 14 security families: technical breakdown and scoping rules.', link: '/cmmc/level-2/', icon: '📘' },
          { title: 'NIST SP 800-171 Standard', desc: 'The foundational standard behind DFARS 7012 and Level 2 C3PAO certifications.', link: '/nist-800-171/', icon: '🛡️' },
          { title: 'CUI Scoping & Handling Guide', desc: 'Controlled Unclassified Information: identification, markings, and boundary isolation.', link: '/cui/', icon: '🔒' },
          { title: 'CMMC Enclave Advisory', desc: 'How segregating your CUI network saves months of implementation and audit costs.', link: '/services/cmmc-enclave/', icon: '🏗️' },
          { title: 'Level 2 Compliance Checklist', desc: 'Downloadable 110-control Excel checklist with ownership and objective columns.', link: '/resources/checklist/level-2/', icon: '📊' }
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
            icon: ''
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
            { title: 'Section Header & Grid Layout', initialOpen: true },
            el(TextControl, {
              label: 'Headline',
              value: attributes.title !== undefined ? attributes.title : 'CMMC guides, checklists and tools',
              onChange: function (val) { setAttributes({ title: val }); }
            }),
            el(TextareaControl, {
              label: 'Intro / Subtitle',
              value: attributes.subtitle !== undefined ? attributes.subtitle : '',
              rows: 2,
              onChange: function (val) { setAttributes({ subtitle: val }); }
            }),
            el(SelectControl, {
              label: 'Cards Per Row (Desktop)',
              value: attributes.columns || 'auto',
              options: [
                { label: 'Auto Responsive (Default ~3-4 per row)', value: 'auto' },
                { label: '2 in a Row (Responsive: 1 on mobile)', value: '2' },
                { label: '3 in a Row (Responsive: 1 on mobile, 2 on tablet)', value: '3' },
                { label: '4 in a Row (Responsive: 1 on mobile, 2 on tablet)', value: '4' },
                { label: '5 in a Row (Responsive: 1 on mobile, 2 on tablet, 3 on laptop)', value: '5' }
              ],
              help: 'Controls maximum cards per row on larger displays. Automatically fluid and reduces on tablets and mobile screens.',
              onChange: function (val) { setAttributes({ columns: val }); }
            }),
            el(SelectControl, {
              label: 'Background Theme',
              value: attributes.theme || 'white',
              options: [
                { label: 'Clean White Background', value: 'white' },
                { label: 'Dark Midnight Background', value: 'midnight' }
              ],
              onChange: function (val) { setAttributes({ theme: val }); }
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
                    (c.icon ? c.icon + ' ' : '') + (c.title || 'Untitled Card')
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
                }),
                el(TextControl, {
                  label: 'Button / CTA Text (Optional)',
                  placeholder: 'e.g. See your readiness report now',
                  value: c.cta || c.ctaText || '',
                  onChange: function (v) { updateCardItem(idx, { cta: v, ctaText: v }); }
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
      category: 'custom-blocks',
      example: {},
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
              label: 'Tag',
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
      category: 'custom-blocks',
      example: {},
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultFaqs = [
          { q: 'Where is Secure-Centric based?', a: 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.' },
          { q: 'Do you sell tools or managed IT?', a: 'Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards.' },
          { q: 'How long have you worked on CMMC?', a: 'Most defense contractors complete their readiness, remediation, and documentation within 4 to 8 months, depending on boundary size and facility count.' }
        ];

        let currentFaqs = safeParseJsonArray(attributes.faqsData, defaultFaqs);

        if (!attributes.faqsData) {
          setAttributes({ faqsData: JSON.stringify(defaultFaqs) });
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
              label: 'Tag',
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
              value: attributes.btnUrl !== undefined ? attributes.btnUrl : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll',
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Section Heading',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// APPROACH COMPARISON' },
            { name: 'title', label: 'Title', default: 'Three Ways Defense Subcontractors Approach CMMC' },
            { name: 'description', label: 'Description', type: 'textarea', default: 'Why internal teams struggle with DIBCAC audits and where independent advisory creates true defensibility.' },
            {
              name: 'layout',
              label: 'Layout Mode',
              type: 'select',
              options: [
                { label: '3-Column (3 Options / Capability Boxes)', value: '3-col' },
                { label: '2-Column (RPO vs MSP Responsibilities)', value: '2-col' }
              ],
              default: '3-col'
            },
            {
              name: 'highlightBox',
              label: 'Box Highlight Style',
              type: 'select',
              options: [
                { label: 'All Boxes Equal (No Highlight)', value: 'none' },
                { label: 'Highlight Box 3 (Secure-Centric)', value: 'box3' },
                { label: 'Highlight Box 1', value: 'box1' }
              ],
              default: 'none'
            },
            { name: 'btnText', label: 'CTA Button Text', default: 'Engage Secure-Centric →' },
            { name: 'btnUrl', label: 'CTA Button URL', default: '/services/cmmc-consulting/' }
          ]
        },
        {
          title: 'Option 1 / Box 1',
          initialOpen: false,
          fields: [
            { name: 'opt1Badge', label: 'Badge', default: 'Option 1' },
            { name: 'opt1Title', label: 'Title', default: 'DIY / In-House IT' },
            { name: 'opt1Desc', label: 'Description / Content', type: 'textarea', default: 'Internal IT teams download templates and attempt to interpret all 110 NIST controls alone.' },
            { name: 'opt1RiskTitle', label: 'Risk / Note Heading (Optional)', default: '' },
            { name: 'opt1RiskDesc', label: 'Risk / Note Details (Optional)', type: 'textarea', default: '' }
          ]
        },
        {
          title: 'Option 2 / Box 2',
          initialOpen: false,
          fields: [
            { name: 'opt2Badge', label: 'Badge', default: 'Option 2' },
            { name: 'opt2Title', label: 'Title', default: 'Generic Managed MSP' },
            { name: 'opt2Desc', label: 'Description / Content', type: 'textarea', default: 'IT vendors sell bundled cloud licenses and automated compliance portal subscriptions.' },
            { name: 'opt2RiskTitle', label: 'Risk / Note Heading (Optional)', default: '' },
            { name: 'opt2RiskDesc', label: 'Risk / Note Details (Optional)', type: 'textarea', default: '' }
          ]
        },
        {
          title: 'Option 3 / Box 3',
          initialOpen: false,
          fields: [
            { name: 'opt3Badge', label: 'Badge', default: 'Option 3: Secure-Centric' },
            { name: 'opt3Title', label: 'Title', default: 'Independent RPO Advisory' },
            { name: 'opt3Desc', label: 'Description / Content', type: 'textarea', default: 'Accredited RPO walks your facilities, reduces CUI scope, engineers controls, and stands beside you through the audit.' },
            { name: 'opt3RiskTitle', label: 'Risk / Note Heading (Optional)', default: '' },
            { name: 'opt3RiskDesc', label: 'Risk / Note Details (Optional)', type: 'textarea', default: '' }
          ]
        }
      ]
    });

    // =========================================================================
    // 9B. THREE FEATURE BOXES (EQUAL WEIGHT)
    // =========================================================================
    createBlockRegistration('secure-centric/feature-boxes', {
      title: 'Three Feature Boxes (Equal Weight)',
      icon: 'screenoptions',
      category: 'custom-blocks',
      panels: [
        {
          title: 'Section Heading',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// CAPABILITIES' },
            { name: 'title', label: 'Headline', default: 'More ways Secure-Centric can help' },
            { name: 'subtitle', label: 'Intro / Subtitle', type: 'textarea', default: '' },
            {
              name: 'theme',
              label: 'Background Theme',
              type: 'select',
              options: [
                { label: 'Soft Ice-Blue Background', value: 'ice' },
                { label: 'Clean White Background', value: 'white' }
              ],
              default: 'ice'
            }
          ]
        },
        {
          title: 'Box 1',
          initialOpen: false,
          fields: [
            { name: 'box1Badge', label: 'Top Badge (Optional)', default: '' },
            { name: 'box1Title', label: 'Title', default: 'Assess and prepare' },
            { name: 'box1Desc', label: 'Content (Supports Bullets & Bold Prefix)', type: 'textarea', rows: 6, default: 'Risk Assessments: Find your security risks and use the results to make decisions.\n\nPre-Assessment Preparation: Check your documentation and implementation of evidence before the required assessment.' }
          ]
        },
        {
          title: 'Box 2',
          initialOpen: false,
          fields: [
            { name: 'box2Badge', label: 'Top Badge (Optional)', default: '' },
            { name: 'box2Title', label: 'Title', default: 'Document and scope' },
            { name: 'box2Desc', label: 'Content (Supports Bullets & Bold Prefix)', type: 'textarea', rows: 6, default: '• NIST SP 800-171 Support: Know your requirement and plan security improvements.\n\n• CUI Scope and Enclave Guidance: Pin down where Controlled Unclassified Information (CUI) is handled, and which systems may fall in scope.\n\n• POA&M Support: Organize eligible open items with owners, where applicable CMMC rules permit a POA&M.' }
          ]
        },
        {
          title: 'Box 3',
          initialOpen: false,
          fields: [
            { name: 'box3Badge', label: 'Top Badge (Optional)', default: '' },
            { name: 'box3Title', label: 'Title', default: 'Lead and oversee' },
            { name: 'box3Desc', label: 'Content (Supports Bullets & Bold Prefix)', type: 'textarea', rows: 6, default: '• Compliance Leadership: Get structured directions for coordinating security work across your team.' }
          ]
        },
        {
          title: 'After Points / Planning Banner (Optional)',
          initialOpen: false,
          fields: [
            { name: 'showFooter', label: 'Show Planning & Sequencing Banner', type: 'checkbox', default: false, help: 'Enable to display the full-width planning card below the three boxes.' },
            { name: 'footerEyebrow', label: 'Banner Tag / Eyebrow', default: '' },
            { name: 'footerCol1Title', label: 'Column 1 Title (e.g. Pre preps)', default: '' },
            { name: 'footerCol1Desc', label: 'Column 1 Description', type: 'textarea', rows: 3, default: '' },
            { name: 'footerCol2Title', label: 'Column 2 Title (e.g. Order of work)', default: '' },
            { name: 'footerCol2Desc', label: 'Column 2 Description', type: 'textarea', rows: 3, default: '' },
            { name: 'footerCtaText', label: 'CTA Button Text (e.g. Get your engagement plan →)', default: '' },
            { name: 'footerCtaUrl', label: 'CTA Button URL', default: 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll' }
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Banner Content & Actions',
          initialOpen: true,
          fields: [
            { name: 'title', label: 'Headline', default: 'Planning to get started on CMMC?' },
            { name: 'theme', label: 'Background Theme', type: 'select', options: [
              { label: 'Electric Blue (Default)', value: 'electric-blue' },
              { label: 'Dark Navy', value: 'navy' },
              { label: 'White / Clean Section', value: 'white' }
            ], default: 'electric-blue' },
            { name: 'description', label: 'Description / Checklist (Supports ✓, -, *)', type: 'textarea', default: 'Talk with an accredited Cyber AB Registered Provider Organization. Get an actionable first step in writing within 30 minutes.' },
            { name: 'primaryBtnText', label: 'Primary Button Text', default: 'Book a Discovery Call →' },
            { name: 'primaryBtnUrl', label: 'Primary Button URL', default: 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll' },
            { name: 'secondaryBtnText', label: 'Secondary Button Text (Leave empty to hide)', default: 'Submit Your Query' },
            { name: 'secondaryBtnUrl', label: 'Secondary Button URL', default: '/contact/' }
          ]
        }
      ]
    });

    // =========================================================================
    // 10B. GATED RESOURCE DOWNLOAD BLOCK (POPUP MODAL & FILE TRIGGER)
    // =========================================================================
    registerBlockType('secure-centric/gated-download', {
      title: 'Gated Resource Download (Popup Form)',
      icon: 'download',
      category: 'custom-blocks',
      example: {},
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;
        const MediaUploadComponent = (wp.blockEditor && wp.blockEditor.MediaUpload) || (wp.editor && wp.editor.MediaUpload);

        const blockProps = useBlockProps ? useBlockProps({
          className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
          style: { position: 'relative', cursor: 'pointer', width: '100%', maxWidth: '100%' },
          onClick: function () {
            if (clientId && wp.data && wp.data.dispatch) {
              wp.data.dispatch('core/block-editor').selectBlock(clientId);
            }
          }
        }) : {
          className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
          style: { position: 'relative', cursor: 'pointer', width: '100%', maxWidth: '100%' }
        };

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/gated-download',
          attributes: attributes,
          className: 'sc-ssr-fullwidth',
          style: { width: '100%', maxWidth: '100%' }
        }) : el('div', { style: { padding: '24px', background: '#F8FAFC', border: '1px dashed #2F5BFF', width: '100%' } }, 'Gated Download Block');

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Card & Section Content', initialOpen: true },
            el(TextControl, {
              label: 'Eyebrow / Tag',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// FREE DOWNLOADABLE RESOURCE',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Headline',
              value: attributes.title !== undefined ? attributes.title : 'CMMC Level 2 Compliance Checklist & Scoring Engine',
              onChange: function (val) { setAttributes({ title: val }); }
            }),
            el(TextareaControl, {
              label: 'Description',
              rows: 3,
              value: attributes.description !== undefined ? attributes.description : '',
              onChange: function (val) { setAttributes({ description: val }); }
            }),
            CheckboxControl ? el(CheckboxControl, {
              label: 'Show Right-Side Document Preview Card',
              checked: attributes.showDocCard !== undefined ? !!attributes.showDocCard : false,
              help: 'Keep unchecked to remove the Excel & PDF preview card and display a clean full-width download band.',
              onChange: function (val) { setAttributes({ showDocCard: val }); }
            }) : null,
            (attributes.showDocCard === true) ? el(TextControl, {
              label: 'Document Badge (e.g. EXCEL & PDF)',
              value: attributes.docType !== undefined ? attributes.docType : 'EXCEL & PDF WORKBOOK',
              onChange: function (val) { setAttributes({ docType: val }); }
            }) : null,
            el(TextControl, {
              label: 'CTA Button Text',
              value: attributes.btnText !== undefined ? attributes.btnText : 'Download Free Checklist →',
              onChange: function (val) { setAttributes({ btnText: val }); }
            }),
            el(SelectControl, {
              label: 'Background Theme',
              value: attributes.theme || 'ice',
              options: [
                { label: 'Soft Ice-Blue Background', value: 'ice' },
                { label: 'Clean White Background', value: 'white' }
              ],
              onChange: function (val) { setAttributes({ theme: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Download File Settings', initialOpen: false },
            el(TextControl, {
              label: 'Direct File URL',
              value: attributes.fileUrl || '',
              help: 'Paste file URL or select a file from the Media Library below.',
              onChange: function (val) { setAttributes({ fileUrl: val }); }
            }),
            el(TextControl, {
              label: 'Download File Name (Optional)',
              value: attributes.fileName || '',
              placeholder: 'e.g. CMMC-Level-2-Checklist.xlsx',
              help: 'Sets custom filename for browser download.',
              onChange: function (val) { setAttributes({ fileName: val }); }
            }),
            MediaUploadComponent ? el(MediaUploadComponent, {
              onSelect: function (media) {
                setAttributes({
                  fileUrl: media.url,
                  fileId: media.id,
                  fileName: attributes.fileName || media.filename || media.title || ''
                });
              },
              render: function (obj) {
                return el(Button, {
                  isSecondary: true,
                  style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
                  onClick: obj.open
                }, attributes.fileUrl ? '📁 Replace File from Media Library' : '📁 Select File from Media Library');
              }
            }) : null,
            attributes.fileUrl ? el('div', { style: { marginTop: '10px', fontSize: '12px', color: '#00875A', fontWeight: 600 } }, '✓ File linked: ' + attributes.fileUrl.split('/').pop()) : null
          ),
          el(
            PanelBody,
            { title: 'Form & Modal Settings', initialOpen: false },
            el(SelectControl, {
              label: 'Forminator Form (Lead Capture & Flow)',
              value: attributes.formId || '102',
              options: getForminatorOptions(),
              help: 'Select the Forminator form that collects user details and triggers your workflow.',
              onChange: function (val) { setAttributes({ formId: val }); }
            }),
            el(TextControl, {
              label: 'Modal Headline',
              value: attributes.modalTitle !== undefined ? attributes.modalTitle : 'Where should we send your download?',
              onChange: function (val) { setAttributes({ modalTitle: val }); }
            }),
            el(TextareaControl, {
              label: 'Modal Subtitle / Instructions',
              rows: 2,
              value: attributes.modalSubtitle !== undefined ? attributes.modalSubtitle : 'Enter your name and corporate work email below. Your file will download immediately upon submission.',
              onChange: function (val) { setAttributes({ modalSubtitle: val }); }
            })
          )
        );

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
    // 11. FORM EMBED BLOCK (SPLIT & CARD LAYOUT WITH FULL SIDEBAR CONTROLS)
    // =========================================================================
    registerBlockType('secure-centric/form-embed', {
      title: 'Interactive Defense Lead & Scoping Form',
      icon: 'feedback',
      category: 'custom-blocks',
      example: {},
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
              label: 'Tag',
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
            el(SelectControl, {
              label: 'Select Forminator Form',
              value: attributes.formId !== undefined ? String(attributes.formId) : '',
              options: getForminatorOptions(),
              help: 'Select the Forminator form to render. Default: Form 101 (Contact & Discovery Call) or Form 102 (Checklist Download).',
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
      category: 'custom-blocks',
      example: {},
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
              label: 'Tag',
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
      category: 'custom-blocks',
      example: {},
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
              label: 'Tag',
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
      category: 'custom-blocks',
      example: {},
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
            { title: 'Layout & Styling', initialOpen: true },
            el(SelectControl, {
              label: 'Layout Variant',
              value: attributes.variant || 'standard',
              options: [
                { label: 'Standard Card Grid', value: 'standard' },
                { label: 'Slim Full-Width Strip (e.g. Who This Is For)', value: 'slim-strip' }
              ],
              onChange: function (v) { setAttributes({ variant: v }); }
            }),
            el(SelectControl, {
              label: 'Background Theme',
              value: attributes.theme || 'white',
              options: [
                { label: 'White', value: 'white' },
                { label: 'Soft Ice', value: 'ice' },
                { label: 'Midnight Blue', value: 'midnight' }
              ],
              onChange: function (v) { setAttributes({ theme: v }); }
            }),
            el(SelectControl, {
              label: 'Columns (Desktop)',
              value: String(attributes.columns || 4),
              options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' }
              ],
              onChange: function (v) { setAttributes({ columns: parseInt(v, 10) }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Principles Header', initialOpen: true },
            el(TextControl, {
              label: 'Tag',
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// PHASE-BY-PHASE EXECUTION' },
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
    // 16. STEPS HORIZONTAL BLOCK (DYNAMIC REPEATER)
    // =========================================================================
    registerBlockType('secure-centric/steps-horizontal', {
      title: 'Horizontal Steps Workflow',
      icon: 'ellipsis',
      category: 'custom-blocks',
      example: {},
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultSteps = [
          { no: '01', title: 'Discovery Call', desc: '30-minute scoping discussion under bilateral NDA to review your contracts, timeline, and current SPRS status.' },
          { no: '02', title: 'NDA Signed', desc: 'Bilateral non-disclosure executed within 2 hours. We review your statements of work and DFARS 7012 flowdowns.' },
          { no: '03', title: 'In-Person Walkthrough', desc: 'Our Registered Practitioners visit your facility, inspect network infrastructure, and interview key personnel on site.' },
          { no: '04', title: 'Scope & Action Plan', desc: 'You receive a formal CUI boundary map, estimated SPRS baseline score, and a prioritized remediation roadmap.' }
        ];

        let currentSteps = safeParseJsonArray(attributes.stepsData, defaultSteps);

        function updateSteps(newSteps) {
          setAttributes({ stepsData: JSON.stringify(newSteps) });
        }

        function addStep() {
          const nextNum = String(currentSteps.length + 1).padStart(2, '0');
          const next = currentSteps.concat([{
            no: nextNum,
            title: 'New Step',
            desc: 'Describe what occurs during this milestone or stage.'
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
        }) : {};

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/steps-horizontal',
          attributes: Object.assign({}, attributes, {
            stepsData: JSON.stringify(currentSteps)
          })
        }) : el('div', {
          style: { padding: '24px', border: '1px dashed #2F5BFF', background: '#F8FAFC', borderRadius: '8px' }
        }, el('strong', {}, 'Horizontal Steps (' + currentSteps.length + ' Steps)'));

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
            '🪜 Workflow Steps (' + currentSteps.length + ' Steps)'
          ),
          el(Button, {
            isPrimary: true,
            isSmall: true,
            onClick: addStep
          }, '+ Add Step')
        ) : null;

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Section Header', initialOpen: true },
            el(TextControl, {
              label: 'Tag / Eyebrow',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// ENGAGEMENT WORKFLOW',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Headline',
              value: attributes.title !== undefined ? attributes.title : 'How an engagement starts',
              onChange: function (val) { setAttributes({ title: val }); }
            }),
            el(TextareaControl, {
              label: 'Intro / Subtitle',
              value: attributes.subtitle !== undefined ? attributes.subtitle : '',
              rows: 2,
              onChange: function (val) { setAttributes({ subtitle: val }); }
            }),
            el(SelectControl, {
              label: 'Background Theme',
              value: attributes.theme || 'ice',
              options: [
                { label: 'Soft Ice-Blue Background', value: 'ice' },
                { label: 'Clean White Background', value: 'white' }
              ],
              onChange: function (val) { setAttributes({ theme: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Workflow Steps Manager (' + currentSteps.length + ' Steps)', initialOpen: false },
            el('div', { style: { marginBottom: '16px' } },
              el(Button, {
                isPrimary: true,
                style: { width: '100%', justifyContent: 'center' },
                onClick: addStep
              }, '+ Add New Step')
            ),
            currentSteps.map(function (st, idx) {
              const defaultNo = String(idx + 1).padStart(2, '0');
              return el('div', {
                key: 'step-' + idx,
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
                    (st.no ? 'Step ' + st.no + ': ' : '') + (st.title || 'Untitled Step')
                  ),
                  currentSteps.length > 1 ? el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeStep(idx); }
                  }, 'Remove') : null
                ),
                el(TextControl, {
                  label: 'Step Number Badge (Leave blank to remove)',
                  value: st.no !== undefined ? st.no : defaultNo,
                  onChange: function (v) { updateStepItem(idx, { no: v }); }
                }),
                el(TextControl, {
                  label: 'Step Title',
                  value: st.title || '',
                  placeholder: 'e.g. Understand',
                  onChange: function (v) { updateStepItem(idx, { title: v }); }
                }),
                el(TextareaControl, {
                  label: 'Step Description',
                  value: st.desc || '',
                  rows: 3,
                  placeholder: 'e.g. We talk through your contract needs...',
                  onChange: function (v) { updateStepItem(idx, { desc: v }); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addStep
            }, '+ Add New Step')
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
    // 17. LEAD MAGNET BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/lead-magnet', {
      title: 'Lead Magnet Download Band',
      icon: 'download',
      category: 'custom-blocks',
      panels: [
        {
          title: 'Lead Magnet Copy & Options',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// FREE DOWNLOADABLE RESOURCE' },
            { name: 'name', label: 'Resource Title', default: 'First-Call Prep Checklist (what to have ready)' },
            { name: 'docType', label: 'Document Badge', default: 'PDF / EXCEL WORKBOOK' },
            { name: 'placeholder', label: 'Input Placeholder', default: 'Enter corporate email address' },
            { name: 'btnText', label: 'Button Text', default: 'Instant Free Download →' },
            { name: 'disclaimer', label: 'Disclaimer Note', default: 'Strictly confidential. No spam guarantee.' },
            {
              name: 'formId',
              label: 'Select Forminator Form',
              type: 'select',
              default: '',
              options: getForminatorOptions,
              help: 'Select the Forminator form to render (Default: ID 102 for Checklist Download Form or ID 104 for Quick Consultation).'
            }
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// COMPREHENSIVE COMPLIANCE ANALYSIS' },
            { name: 'title', label: 'Heading', default: 'Long-form sections' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Explanations of requirements, timelines, and assessor expectations.' }
          ]
        },
        {
          title: 'Deep Dive Sections',
          initialOpen: true,
          fields: [
            { name: 'sectionsData', label: 'Deep Dive Sections (Supports multiple paragraphs, HTML & checklists ✓, -)', type: 'textarea' }
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// KNOWLEDGE ECOSYSTEM' },
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// COMPLIANCE TIERS' },
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// EXECUTIVE PERSONAS' },
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// DEFENSE INDUSTRIAL BASE (DIB)' },
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// DEFENSE SUPPLY CHAIN PATHS' },
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// OBJECTIVE COMPARISON' },
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
    // 25. CONSULTANT SCORER BLOCK (INTERACTIVE 7-CHECK DECISION MATRIX)
    // =========================================================================
    registerBlockType('secure-centric/consultant-scorer', {
      title: 'Consultant Selection Scorer (7 Checks)',
      icon: 'yes',
      category: 'custom-blocks',
      example: {},
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultChecks = [
          { label: 'Verify Cyber AB status', desc: "Confirm the organization's current listing and ask which credentialed people will work on your account." },
          { label: 'Ask who owns the engagement', desc: 'You should know the name and role of your day-to-day CMMC advisor before signing.' },
          { label: 'Request a written scope method', desc: 'The provider should explain how it traces contracts, CUI, systems, users, facilities, and outside services.' },
          { label: 'Inspect sample deliverables', desc: 'Review redacted examples of an SSP section, gap register, evidence request, or remediation tracker.' },
          { label: 'Separate preparation from assessment', desc: 'A consultant prepares you. An independent C3PAO performs the official Level 2 certification assessment.' },
          { label: 'Define the implementation boundary', desc: 'Ask which tasks the consultant performs, which belong to your IT team or MSP, and how work is validated.' },
          { label: 'Check how evidence is managed', desc: 'Ask where evidence is stored, how it is linked to requirements, and how environment changes are recorded.' }
        ];

        let checks = safeParseJsonArray(attributes.checksData, defaultChecks);
        if (!Array.isArray(checks) || checks.length === 0) checks = defaultChecks;

        function updateChecks(newList) {
          setAttributes({ checksData: JSON.stringify(newList) });
        }

        function updateCheckItem(index, key, val) {
          const next = checks.slice();
          const current = (typeof next[index] === 'string') ? { label: next[index], desc: '' } : Object.assign({}, next[index]);
          current[key] = val;
          next[index] = current;
          updateChecks(next);
        }

        function addCheckItem() {
          const next = checks.concat([{ label: 'New Check Point', desc: '' }]);
          updateChecks(next);
        }

        function removeCheckItem(index) {
          if (checks.length <= 1) return;
          const next = checks.filter(function (_, i) { return i !== index; });
          updateChecks(next);
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
          block: 'secure-centric/consultant-scorer',
          attributes: attributes
        }) : el('div', { style: { padding: '24px', border: '1px dashed #2F5BFF', background: '#F8FAFC', borderRadius: '8px' } },
          el('strong', {}, 'Consultant Selection Scorer (' + checks.length + ' Checks)')
        );

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Header & Eyebrow', initialOpen: true },
            el(TextControl, {
              label: 'Tag / Eyebrow',
              value: attributes.eyebrow !== undefined ? attributes.eyebrow : '// DECISION FRAMEWORK',
              onChange: function (v) { setAttributes({ eyebrow: v }); }
            }),
            el(TextControl, {
              label: 'Main Heading',
              value: attributes.title !== undefined ? attributes.title : 'How to choose a CMMC consultant: 7 key points',
              onChange: function (v) { setAttributes({ title: v }); }
            }),
            el(TextareaControl, {
              label: 'Subtitle / Intro',
              rows: 2,
              value: attributes.subtitle !== undefined ? attributes.subtitle : 'Choosing a consultant for a sales presentation alone makes it difficult to compare firms. Apply the same checks to every provider.',
              onChange: function (v) { setAttributes({ subtitle: v }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Checklist Points (' + checks.length + ' Checks) & Badges', initialOpen: true },
            CheckboxControl ? el(CheckboxControl, {
              label: 'Show "Verified" Badge on each item',
              checked: attributes.showBadge !== undefined ? attributes.showBadge : true,
              help: 'Uncheck to completely remove the "✓ Secure-Centric Verified" badge.',
              onChange: function (v) { setAttributes({ showBadge: v }); }
            }) : null,
            (attributes.showBadge !== false) ? el(TextControl, {
              label: 'Badge Text',
              value: attributes.badgeText !== undefined ? attributes.badgeText : 'Secure-Centric Verified',
              onChange: function (v) { setAttributes({ badgeText: v }); }
            }) : null,
            el('hr', { style: { margin: '14px 0' } }),
            checks.map(function (c, cIdx) {
              if (!c) return null;
              const itemLabel = (typeof c === 'string') ? c : (c.label || '');
              const itemDesc  = (typeof c === 'object' && c.desc) ? c.desc : '';
              return el('div', {
                key: 'check-item-' + cIdx,
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '10px'
                }
              },
                el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                  el('strong', { style: { fontSize: '12px', color: '#0F172A' } }, 'Point ' + (cIdx + 1)),
                  el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeCheckItem(cIdx); }
                  }, 'Remove')
                ),
                el(TextControl, {
                  label: 'Point Title',
                  value: itemLabel,
                  onChange: function (v) { updateCheckItem(cIdx, 'label', v); }
                }),
                el(TextareaControl, {
                  label: 'Point Description / Details (optional)',
                  rows: 2,
                  value: itemDesc,
                  onChange: function (v) { updateCheckItem(cIdx, 'desc', v); }
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '6px' },
              onClick: addCheckItem
            }, '+ Add Check Point')
          ),
          el(
            PanelBody,
            { title: 'Right-Side Result Card & Text', initialOpen: true },
            el(TextControl, {
              label: 'Score Badge (Top Circle)',
              value: attributes.scoreVal !== undefined ? attributes.scoreVal : '7 / 7',
              onChange: function (v) { setAttributes({ scoreVal: v }); }
            }),
            el(TextControl, {
              label: 'Score Subtitle',
              value: attributes.scoreSub !== undefined ? attributes.scoreSub : 'Full Compliance',
              onChange: function (v) { setAttributes({ scoreSub: v }); }
            }),
            el(TextControl, {
              label: 'Card Heading',
              value: attributes.resultTitle !== undefined ? attributes.resultTitle : '100% Verified CMMC Advisory Standard',
              onChange: function (v) { setAttributes({ resultTitle: v }); }
            }),
            el(TextareaControl, {
              label: 'Card Description / Summary Text',
              rows: 4,
              value: attributes.resultDesc !== undefined ? attributes.resultDesc : 'The perfect choice is the firm that can explain how your engagement will run, show useful work samples, name the people responsible, and state what it will not do.',
              onChange: function (v) { setAttributes({ resultDesc: v }); }
            }),
            el(TextControl, {
              label: 'CTA Button Text',
              value: attributes.btnText !== undefined ? attributes.btnText : 'Book a Discovery Call →',
              onChange: function (v) { setAttributes({ btnText: v }); }
            }),
            el(TextControl, {
              label: 'CTA Button Link URL',
              value: attributes.btnUrl !== undefined ? attributes.btnUrl : 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll',
              onChange: function (v) { setAttributes({ btnUrl: v }); }
            })
          )
        );

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
    // 26. STAGE LINE BAR BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/stageline', {
      title: 'Stage Line Bar',
      icon: 'flag',
      category: 'custom-blocks',
      panels: [
        {
          title: 'Stage Settings',
          initialOpen: true,
          fields: [
            { name: 'stage', label: 'Stage Name', default: 'Compliance Phase' },
            { name: 'title', label: 'Right Eyebrow', default: 'Where you fit' },
            { name: 'line', label: 'Stage Explanation', type: 'textarea', default: 'You know CMMC applies but need clarity on scoping, timeline, and audit boundaries.' },
            { name: 'serviceLink', label: 'Service Link URL', default: '/services/cmmc-compliance/' },
            { name: 'processLink', label: 'Full Process Link URL', default: '/cmmc/cmmc-process/' }
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Header & Eyebrow',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// DETAILED REVIEW STAGES' },
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Card Content',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// IN-PERSON VERIFICATION' },
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
    // 29. DATA TABLE BLOCK (GRANULAR EDITABLE HEADERS & SEPARATE CELL CONTROLS)
    // =========================================================================
    registerBlockType('secure-centric/data-table', {
      title: 'Data Table (Gap & Compliance Matrix)',
      icon: 'table-col-after',
      category: 'custom-blocks',
      example: {},
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;

        const defaultCols = ['Category / Control', 'Status', 'Impact', 'Required Remediation', 'Owner'];
        const defaultRows = [
          ['AC.L2-3.1.1 (Access Control & Boundary Protection)', 'Non-Compliant', 'High (-5 SPRS)', 'Enforce centralized MFA & remove shared admin credentials'],
          ['IA.L2-3.5.3 (Multifactor Authentication)', 'Partially Met', 'High (-5 SPRS)', 'Deploy FIPS 140-2 validated hardware tokens across all privileged sessions'],
          ['SC.L2-3.13.11 (FIPS-Validated Cryptography)', 'Non-Compliant', 'Medium (-3 SPRS)', 'Enable BitLocker with certified FIPS 140-2 cryptographic modules'],
          ['AU.L2-3.3.1 (Audit Logging & SIEM Review)', 'Compliant', 'Low (0 SPRS)', 'Weekly automated audit log analysis and tamper-proof log forwarding verified']
        ];

        let cols = safeParseJsonArray(attributes.colsData, defaultCols);
        if (!Array.isArray(cols) || cols.length === 0) cols = defaultCols;

        let rows = safeParseJsonArray(attributes.rowsData, defaultRows);
        if (!Array.isArray(rows) || rows.length === 0) rows = defaultRows;

        function updateCols(newCols) {
          setAttributes({ colsData: JSON.stringify(newCols) });
        }

        function updateRows(newRows) {
          setAttributes({ rowsData: JSON.stringify(newRows) });
        }

        function addColumn() {
          const newCols = cols.concat(['Column ' + (cols.length + 1)]);
          updateCols(newCols);
          const newRows = rows.map(function (r) {
            const arr = Array.isArray(r) ? r.slice() : [];
            while (arr.length < newCols.length) arr.push('');
            return arr;
          });
          updateRows(newRows);
        }

        function removeColumn(cIdx) {
          if (cols.length <= 1) return;
          const newCols = cols.filter(function (_, i) { return i !== cIdx; });
          updateCols(newCols);
          const newRows = rows.map(function (r) {
            if (!Array.isArray(r)) return [];
            return r.filter(function (_, i) { return i !== cIdx; });
          });
          updateRows(newRows);
        }

        function updateColHeader(cIdx, val) {
          const newCols = cols.map(function (c, i) { return i === cIdx ? val : c; });
          updateCols(newCols);
        }

        function addRow() {
          const emptyRow = cols.map(function () { return ''; });
          updateRows(rows.concat([emptyRow]));
        }

        function removeRow(rIdx) {
          if (rows.length <= 1) return;
          updateRows(rows.filter(function (_, i) { return i !== rIdx; }));
        }

        function updateCell(rIdx, cIdx, val) {
          const newRows = rows.map(function (r, ri) {
            if (ri === rIdx) {
              const arr = Array.isArray(r) ? r.slice() : [];
              while (arr.length < cols.length) arr.push('');
              arr[cIdx] = val;
              return arr;
            }
            return r;
          });
          updateRows(newRows);
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

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Table Headers, Text & Anchor', initialOpen: true },
            el(TextControl, {
              label: 'Tag / Eyebrow (optional)',
              value: attributes.eyebrow || '',
              placeholder: 'e.g. // COMPLIANCE MATRIX',
              onChange: function (val) { setAttributes({ eyebrow: val }); }
            }),
            el(TextControl, {
              label: 'Table Heading',
              value: attributes.title !== undefined ? attributes.title : 'Findings Matrix & Gap Breakdown',
              onChange: function (val) { setAttributes({ title: val }); }
            }),
            el(TextareaControl, {
              label: 'Text Below Title / Description (optional)',
              rows: 3,
              value: attributes.subtitle !== undefined ? attributes.subtitle : (attributes.description || ''),
              placeholder: 'Enter text or paragraph to display directly below the table heading...',
              onChange: function (val) { setAttributes({ subtitle: val }); }
            }),
            el(TextareaControl, {
              label: 'Normal Text After Table (optional)',
              rows: 3,
              value: attributes.afterText || '',
              placeholder: 'Enter standard readable body text or paragraphs to display directly below the table...',
              help: 'Renders in normal body font size and color (unlike muted footnotes).',
              onChange: function (val) { setAttributes({ afterText: val }); }
            }),
            el(TextareaControl, {
              label: 'Muted Footnote / Small Note (optional)',
              rows: 2,
              value: attributes.footerNote !== undefined ? attributes.footerNote : (attributes.footnote || ''),
              placeholder: 'Enter small gray footnote or disclaimer note...',
              onChange: function (val) { setAttributes({ footerNote: val }); }
            }),
            el(TextControl, {
              label: 'CTA Button Text (optional)',
              value: attributes.ctaText || '',
              placeholder: 'e.g. Schedule a CMMC Scoping Call →',
              onChange: function (val) { setAttributes({ ctaText: val }); }
            }),
            el(TextControl, {
              label: 'CTA Button URL',
              value: attributes.ctaUrl || '',
              placeholder: 'https://... or #contact',
              onChange: function (val) { setAttributes({ ctaUrl: val }); }
            }),
            el(TextControl, {
              label: 'CTA Subtext Note (optional)',
              value: attributes.ctaSubtext || '',
              placeholder: 'e.g. 30 min · No sales pitch · Signed NDA',
              onChange: function (val) { setAttributes({ ctaSubtext: val }); }
            }),
            el(TextControl, {
              label: 'Anchor ID',
              value: attributes.anchor || attributes.id || '',
              onChange: function (val) { setAttributes({ anchor: val }); }
            })
          ),
          el(
            PanelBody,
            { title: 'Table Column Headers (' + cols.length + ' Columns)', initialOpen: true },
            el('p', { style: { fontSize: '12px', color: '#64748B', marginBottom: '12px' } },
              'Customize the name of each column header. Adding or removing columns automatically adjusts table cells.'
            ),
            cols.map(function (c, cIdx) {
              return el('div', {
                key: 'col-header-' + cIdx,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px'
                }
              },
                el('div', { style: { flex: 1 } },
                  el(TextControl, {
                    label: 'Column ' + (cIdx + 1) + ' Heading',
                    value: c || '',
                    onChange: function (v) { updateColHeader(cIdx, v); }
                  })
                ),
                cols.length > 1 ? el(Button, {
                  isDestructive: true,
                  isSmall: true,
                  style: { marginTop: '22px' },
                  onClick: function () { removeColumn(cIdx); }
                }, 'Remove') : null
              );
            }),
            el(Button, {
              isSecondary: true,
              isSmall: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '6px' },
              onClick: addColumn
            }, '+ Add New Column Header')
          ),
          el(
            PanelBody,
            { title: 'Table Rows Data (' + rows.length + ' Rows)', initialOpen: true },
            el('p', { style: { fontSize: '12px', color: '#64748B', marginBottom: '14px' } },
              'Each row contains separate editable fields corresponding to each column header.'
            ),
            rows.map(function (row, rIdx) {
              const rowArr = Array.isArray(row) ? row : [];
              return el('div', {
                key: 'table-row-' + rIdx,
                style: {
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '14px'
                }
              },
                el('div', {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    paddingBottom: '6px',
                    borderBottom: '1px solid #E2E8F0'
                  }
                },
                  el('strong', { style: { fontSize: '13px', color: '#1E293B' } },
                    'Row ' + (rIdx + 1) + (rowArr[0] ? ' • ' + (String(rowArr[0]).length > 25 ? String(rowArr[0]).substring(0, 25) + '...' : rowArr[0]) : '')
                  ),
                  rows.length > 1 ? el(Button, {
                    isDestructive: true,
                    isSmall: true,
                    onClick: function () { removeRow(rIdx); }
                  }, 'Delete Row') : null
                ),
                cols.map(function (colName, cIdx) {
                  const cellVal = rowArr[cIdx] !== undefined ? rowArr[cIdx] : '';
                  const isLong = String(cellVal).length > 40 || colName.toLowerCase().indexOf('remediation') !== -1 || colName.toLowerCase().indexOf('desc') !== -1;
                  return isLong ? el(TextareaControl, {
                    key: 'cell-' + rIdx + '-' + cIdx,
                    label: colName || ('Column ' + (cIdx + 1)),
                    value: cellVal,
                    rows: 2,
                    onChange: function (v) { updateCell(rIdx, cIdx, v); }
                  }) : el(TextControl, {
                    key: 'cell-' + rIdx + '-' + cIdx,
                    label: colName || ('Column ' + (cIdx + 1)),
                    value: cellVal,
                    onChange: function (v) { updateCell(rIdx, cIdx, v); }
                  });
                })
              );
            }),
            el(Button, {
              isPrimary: true,
              isSmall: true,
              style: { width: '100%', justifyContent: 'center', marginTop: '8px' },
              onClick: addRow
            }, '+ Add New Table Row')
          )
        );

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/data-table',
          attributes: attributes
        }) : el('div', {
          style: { padding: '24px', border: '1px dashed #2F5BFF', background: '#F8FAFC', borderRadius: '8px' }
        }, el('strong', {}, 'Data Table (' + rows.length + ' Rows, ' + cols.length + ' Columns)'));

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
    // 30. BOUNDARY DIAGRAM BLOCK
    // =========================================================================
    createBlockRegistration('secure-centric/diagram', {
      title: 'Boundary Segregation Diagram',
      icon: 'networking',
      category: 'custom-blocks',
      panels: [
        {
          title: 'Diagram Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// BOUNDARY SEGREGATION' },
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
      category: 'custom-blocks',
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
      category: 'custom-blocks',
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Section Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// 110 NIST CONTROLS' },
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Section Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// 110 CONTROLS IN 14 FAMILIES' },
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
      category: 'custom-blocks',
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
      category: 'custom-blocks',
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Section Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// VERIFICATION PROCEDURE' },
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Section Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag', default: '// VERIFIED DEFENSE METRICS' },
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
      category: 'custom-blocks',
      panels: [
        {
          title: 'Card Header',
          initialOpen: true,
          fields: [
            { name: 'eyebrow', label: 'Tag / Eyebrow', default: '// COMPLIANCE ARTIFACT DEFINITION' },
            { name: 'title', label: 'Heading', default: 'What is this compliance artifact?' },
            { name: 'desc', label: 'Description', type: 'textarea', default: 'A structured, assessor-tested Excel and PDF template designed to evaluate internal technical controls.' }
          ]
        },
        {
          title: 'Points List',
          initialOpen: true,
          fields: [
            { name: 'pointsData', label: 'Points (JSON Array or 1 item per line)', type: 'textarea' }
          ]
        },
        {
          title: 'Call to Action (CTA) Button',
          initialOpen: true,
          fields: [
            { name: 'ctaText', label: 'Primary CTA Text (e.g. Download Checklist →)', default: '' },
            { name: 'ctaUrl', label: 'Primary CTA URL', default: 'https://api.leadconnectorhq.com/widget/booking/nZAjs4Kt86aEyfpwhcll' },
            { name: 'ctaSubtext', label: 'CTA Subtext (e.g. Instant PDF & Excel access)', default: '' },
            { name: 'secondaryCtaText', label: 'Secondary CTA Text (Optional)', default: '' },
            { name: 'secondaryCtaUrl', label: 'Secondary CTA URL', default: '/contact/' }
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
      category: 'custom-blocks',
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

    // =========================================================================
    // 41. CUSTOM HEADING BLOCK (H1, H2, H3, H4 SELECTION)
    // =========================================================================
    registerBlockType('secure-centric/heading', {
      title: 'Secure-Centric Heading',
      icon: 'heading',
      category: 'custom-blocks',
      example: {},
      edit: function (props) {
        const { attributes, setAttributes, isSelected, clientId } = props;
        const currentLevel = attributes.level || 'h2';

        const blockProps = useBlockProps ? useBlockProps({
          className: 'sc-gutenberg-block-wrapper' + (isSelected ? ' is-selected' : ''),
          style: { position: 'relative', cursor: 'pointer' },
          onClick: function () {
            if (clientId && wp.data && wp.data.dispatch) {
              wp.data.dispatch('core/block-editor').selectBlock(clientId);
            }
          }
        }) : {};

        const ToolbarGroup = wp.components.ToolbarGroup || (blockEditor && blockEditor.ToolbarGroup);
        const ToolbarButton = wp.components.ToolbarButton || (blockEditor && blockEditor.ToolbarButton);

        const blockControls = (BlockControls && ToolbarGroup && ToolbarButton) ? el(
          BlockControls,
          {},
          el(
            ToolbarGroup,
            {},
            ['h1', 'h2', 'h3', 'h4'].map(function (lvl) {
              return el(ToolbarButton, {
                key: lvl,
                isPressed: currentLevel === lvl,
                onClick: function () { setAttributes({ level: lvl }); }
              }, lvl.toUpperCase());
            })
          )
        ) : null;

        const previewElement = ServerSideRender ? el(ServerSideRender, {
          block: 'secure-centric/heading',
          attributes: attributes
        }) : el('div', { style: { padding: '16px', background: '#F8FAFC' } },
          el(currentLevel, { style: { margin: 0 } }, attributes.heading || 'Section Heading')
        );

        const inspectorControls = el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: 'Heading Level & Hierarchy', initialOpen: true },
            el(SelectControl, {
              label: 'Heading Level (Tag)',
              value: currentLevel,
              options: [
                { label: 'H1 (Main Hero / Page Title)', value: 'h1' },
                { label: 'H2 (Section Heading — Recommended)', value: 'h2' },
                { label: 'H3 (Sub-Section Title)', value: 'h3' },
                { label: 'H4 (Minor Title / Card Header)', value: 'h4' }
              ],
              help: 'Select the semantic HTML heading tag for accessibility and SEO hierarchy.',
              onChange: function (val) { setAttributes({ level: val }); }
            }),
            el('div', { style: { display: 'flex', gap: '8px', marginTop: '10px' } },
              ['h1', 'h2', 'h3', 'h4'].map(function (lvl) {
                return el(Button, {
                  key: lvl,
                  isPrimary: currentLevel === lvl,
                  isSecondary: currentLevel !== lvl,
                  isSmall: true,
                  style: { flex: 1, justifyContent: 'center', fontWeight: 'bold' },
                  onClick: function () { setAttributes({ level: lvl }); }
                }, lvl.toUpperCase());
              })
            )
          ),
          el(
            PanelBody,
            { title: 'Content & Typography', initialOpen: true },
            el(TextControl, {
              label: 'Headline Text',
              value: attributes.heading !== undefined ? attributes.heading : 'Section Heading',
              onChange: function (val) { setAttributes({ heading: val }); }
            }),
            el(TextareaControl, {
              label: 'Intro / Subtitle (Optional)',
              value: attributes.subtitle || '',
              rows: 3,
              placeholder: 'Add an optional lead paragraph or description below the heading...',
              onChange: function (val) { setAttributes({ subtitle: val }); }
            }),
            el(SelectControl, {
              label: 'Text Alignment',
              value: attributes.textAlign || 'left',
              options: [
                { label: 'Left Aligned (Default)', value: 'left' },
                { label: 'Centered', value: 'center' },
                { label: 'Right Aligned', value: 'right' }
              ],
              onChange: function (val) { setAttributes({ textAlign: val }); }
            }),
            el(SelectControl, {
              label: 'Heading Color Theme',
              value: attributes.theme || 'navy',
              options: [
                { label: 'Deep Navy (Standard on Light Sections)', value: 'navy' },
                { label: 'Pure White (For Midnight / Dark Sections)', value: 'white' },
                { label: 'Cyber Cyan (Brand Accent)', value: 'cyan' }
              ],
              onChange: function (val) { setAttributes({ theme: val }); }
            }),
            el(SelectControl, {
              label: 'Bottom Spacing (Margin)',
              value: attributes.marginBottom || '32px',
              options: [
                { label: 'None (0px)', value: '0px' },
                { label: 'Tight (16px)', value: '16px' },
                { label: 'Compact (24px)', value: '24px' },
                { label: 'Normal (32px)', value: '32px' },
                { label: 'Spacious (48px)', value: '48px' }
              ],
              onChange: function (val) { setAttributes({ marginBottom: val }); }
            }),
            el(ToggleControl, {
              label: 'Constrain to Site Container (1240px)',
              help: 'Keeps heading aligned within the website grid margins.',
              checked: attributes.wrapContainer !== undefined ? attributes.wrapContainer : true,
              onChange: function (val) { setAttributes({ wrapContainer: val }); }
            })
          )
        );

        return el(
          Fragment,
          {},
          blockControls,
          inspectorControls,
          el('div', blockProps, previewElement)
        );
      },
      save: function () {
        return null;
      }
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
