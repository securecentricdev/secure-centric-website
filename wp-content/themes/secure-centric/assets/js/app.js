/**
 * SECURE-CENTRIC | APPLICATION ENGINE & GUTENBERG ARCHITECTURE HUD
 * Renders all 20 pages with full high-fidelity components, mobile drawer & popup
 */

(function () {
  'use strict';

  const PAGES = window.SITE_PAGES_DATA || [];
  let currentPageId = 'page-1';
  let isMobilePreview = false;
  let isGutenbergInspector = false;
  let activeRoadmapStep = 0;
  let popupDismissed = false;

  // Cache DOM references
  const mainAppContainer = document.getElementById('app-main-content');
  const pageSelectDropdown = document.getElementById('hud-page-select');
  const gutenbergToggleBtn = document.getElementById('hud-gutenberg-toggle');
  const viewportToggleBtn = document.getElementById('hud-viewport-toggle');
  const metaToggleBtn = document.getElementById('hud-meta-toggle');
  const metaDrawer = document.getElementById('page-meta-drawer');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const leadPopup = document.getElementById('floating-lead-popup');
  const minPopupTrigger = document.getElementById('floating-min-trigger');

  /**
   * Helper: Find Page by ID (Defensive case-insensitive lookup)
   */
  function getPage(id) {
    if (!id) return PAGES[0];
    const target = String(id).toLowerCase().replace('#', '');
    return PAGES.find(p => p.id.toLowerCase() === target) || PAGES[0];
  }

  /**
   * Helper: Sanitize string for HTML
   */
  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Render Top Presentation HUD Dropdown Options
   */
  function initHudDropdown() {
    if (!pageSelectDropdown) return;
    const groups = [
      { name: 'Core Pages', group: 'Core' },
      { name: 'Core Services (3 Pages)', group: 'Services' },
      { name: 'Engagement Stages (Included)', group: 'Stages' },
      { name: 'Knowledge Pillars', group: 'Pillars' },
      { name: 'Downloadable Checklists', group: 'Checklists' }
    ];

    let html = '';
    groups.forEach(g => {
      const groupPages = PAGES.filter(p => p.group === g.group);
      if (groupPages.length > 0) {
        html += `<optgroup label="${g.name}">`;
        groupPages.forEach(p => {
          html += `<option value="${p.id}">${String(p.no).padStart(2, '0')}. ${p.name} (${p.url})</option>`;
        });
        html += `</optgroup>`;
      }
    });

    if (!pageSelectDropdown) return;
    pageSelectDropdown.innerHTML = html;
    pageSelectDropdown.value = currentPageId;

    pageSelectDropdown.addEventListener('change', (e) => {
      window.location.hash = e.target.value;
    });
  }

  /**
   * Render Block HTML: Hero Home
   */
  function renderHeroHome(block, page) {
    return `
      <section class="hero-home-wrap wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:cover {align:'full', backgroundColor:'midnight'}" 
               data-wp-pattern="secure-centric/hero-home">
        <div class="hero-video-bg-container" aria-hidden="true">
          <video class="hero-video-bg" autoplay muted loop playsinline webkit-playsinline preload="auto" poster="assets/video/cmmc-concept-poster.jpg">
            <source src="assets/video/cmmc-concept.mp4" type="video/mp4">
            <source src="assets/video/cmmc-cyber-concept.mp4" type="video/mp4">
          </video>
          <div class="hero-video-overlay"></div>
        </div>
        <div class="site-container" style="position: relative; z-index: 2;">
          <div class="hero-home-grid">
            <div class="hero-home-content">
              <span class="section-eyebrow dark">// ${esc(block.eyebrow)}</span>
              <h1>CMMC compliance for defense subcontractors, guided by a <span class="cyan-highlight">Cyber AB RPO</span></h1>
              <p class="hero-lead">${esc(block.sub)}</p>
              <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
                <a href="#contact" class="btn btn-primary btn-lg">Book a Discovery Call &rarr;</a>
                <span style="font-size: 0.8125rem; color: var(--color-slate); font-family: var(--font-mono);">30 min · No sales pitch · Signed NDA</span>
              </div>
              <div class="hero-topic-cards">
                ${block.topics.map(t => `
                  <a href="${t.url}" class="hero-topic-card">
                    <b>${esc(t.title)} &rarr;</b>
                    <span>${esc(t.desc)}</span>
                  </a>
                `).join('')}
              </div>
            </div>
            
            <div class="hero-readiness-card">
              <div class="eyebrow">
                <span>${esc(block.leadCardBadge)}</span>
                <span class="badge-chip accent" style="font-size: 0.65rem;">Free Tool</span>
              </div>
              <h3>${esc(block.leadCardTitle)}</h3>
              <p style="font-size: 0.875rem; color: var(--color-body-text); margin-bottom: 16px;">
                ${esc(block.leadCardDesc)}
              </p>
              <form class="readiness-inline-form" onsubmit="event.preventDefault(); window.triggerToolModal();">
                <div style="margin-bottom: 12px;">
                  <input type="email" class="form-input" placeholder="Enter corporate work email" required />
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                  Start 3-Minute Readiness Check &rarr;
                </button>
              </form>
              <p style="font-size: 0.6875rem; color: var(--color-slate); margin-top: 10px; text-align: center;">
                🔒 Work email required. Never submit classified or CUI information.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Hero Service (6-Phase Strip)
   */
  function renderHeroService(block, page) {
    return `
      <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
               data-wp-pattern="secure-centric/hero-service-phases" 
               style="border-bottom: 1px solid var(--color-dark-line); position: relative;">
        <div class="site-container">
          <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); margin-bottom: 16px;">
            HOME / SERVICES / <span style="color: var(--color-cyber-cyan);">${esc(page.name).toUpperCase()}</span>
          </div>
          <div class="hero-home-grid">
            <div>
              <span class="section-eyebrow dark">// ${esc(block.eyebrow)}</span>
              <h1 style="color: var(--color-white); margin-bottom: 16px;">${esc(page.h1)}</h1>
              <p class="hero-lead" style="color: var(--color-text-on-dark);">${esc(block.sub)}</p>
              <div style="display: flex; gap: 16px; align-items: center; margin-top: 24px; flex-wrap: wrap;">
                <a href="#page-4" class="btn btn-primary btn-lg">Book a Discovery Call &rarr;</a>
                <a href="#phases-detail" class="text-link on-dark">Explore Every Phase &darr;</a>
              </div>
              <div style="display: flex; gap: 10px; margin-top: 28px; flex-wrap: wrap;">
                <span class="badge-chip dark"><i class="dot"></i> Cyber AB RPO · CPN #3942</span>
                <span class="badge-chip dark"><i class="dot"></i> Inc. 5000 Honoree</span>
                <span class="badge-chip dark"><i class="dot"></i> 100% C3PAO Pass Record</span>
              </div>
            </div>

            <div class="card-dark" style="background-color: #0B1437; border: 1.5px solid var(--color-dark-outline); padding: 28px;">
              <span class="section-eyebrow dark" style="font-size: 0.6875rem;">ENGAGEMENT AT A GLANCE</span>
              <h4 style="color: var(--color-white); margin-bottom: 14px;">The 6 Delivery Phases</h4>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                ${block.phases.map((p, i) => `
                  <a href="#phases-detail" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(30, 42, 90, 0.6); text-decoration: none;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="width: 22px; height: 22px; border-radius: 50%; background: var(--color-electric-blue); color: #fff; font-size: 0.6875rem; font-family: var(--font-mono); font-weight: 700; display: flex; align-items: center; justify-content: center;">${i+1}</span>
                      <span style="font-size: 0.875rem; color: var(--color-white); font-weight: 600;">${esc(p)}</span>
                    </div>
                    <span style="color: var(--color-slate); font-size: 0.75rem;">&darr;</span>
                  </a>
                `).join('')}
              </div>
              <span style="font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-slate); display: block; margin-bottom: 8px;">Key Deliverables You Keep:</span>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${block.deliverables.map(d => `
                  <span class="badge-chip dark" style="font-size: 0.6875rem; border-color: rgba(0, 212, 255, 0.3);">${esc(d)}</span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Enhanced Phase by Phase (Page 2)
   */
  function renderPhases(block) {
    const phasesData = block.items || [];
    return `
      <section class="section-ice py-section wp-block-inspect wp-pattern-inspect" 
               id="phases-detail"
               data-wp-block="wp:group {backgroundColor:'ice'}" 
               data-wp-pattern="secure-centric/phase-by-phase-work">
        <div class="site-container">
          <div style="max-width: 780px; margin-bottom: 40px;">
            <span class="section-eyebrow">// PHASE-BY-PHASE EXECUTION</span>
            <h2>${esc(block.t || 'What We Do, Phase by Phase')}</h2>
            <p style="font-size: 1.0625rem; color: var(--color-body-text); margin-top: 8px;">
              Our structured 6-phase advisory engagement ensures every control is scoped, addressed, and documented with precision before your official C3PAO assessment date.
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${phasesData.map((phase, idx) => {
              const [phaseName, whatWeDo, whatYouGet] = phase;
              const involvedRoles = [
                'Executive Sponsor + IT Lead',
                'System Admins + Operations Lead',
                'Internal IT / MSP Partner',
                'Technical Authors + Security Lead',
                'All Systems Custodians',
                'Affirming Official + vCISO'
              ][idx] || 'Client Team';

              return `
                <div class="phase-step-card">
                  <div class="phase-badge-number">
                    0${idx + 1}
                  </div>

                  <div>
                    <span style="font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-electric-blue); font-weight: 700; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">
                      PHASE 0${idx + 1} // ADVISORY MILESTONE
                    </span>
                    <h3 style="font-size: 1.25rem; color: var(--color-navy); margin-bottom: 8px;">${esc(phaseName)}</h3>
                    <p style="font-size: 0.9375rem; color: var(--color-body-text); line-height: 1.5; margin: 0;">
                      ${esc(whatWeDo)}
                    </p>
                  </div>

                  <div class="phase-deliverables-tile">
                    <h5>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                      DELIVERABLES YOU KEEP
                    </h5>
                    <b>${esc(whatYouGet)}</b>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    <span style="font-size: 0.6875rem; font-family: var(--font-mono); color: var(--color-slate); text-transform: uppercase;">Who is involved:</span>
                    <span class="badge-chip" style="font-size: 0.75rem; background-color: #fff;">${esc(involvedRoles)}</span>
                    <a href="#page-4" class="text-link" style="font-size: 0.8125rem; margin-top: 4px;">Phase Details &rarr;</a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Compare Cards (RPO vs MSP)
   */
  function renderCompareCards(block) {
    const rpoPoints = block.leftPoints || [
      "Scopes the FCI & CUI boundary to minimize audit cost and timeline",
      "Performs formal gap analysis against all 110 NIST SP 800-171 controls",
      "Authors your System Security Plan (SSP) and Plan of Action & Milestones (POA&M)",
      "Conducts pre-assessment mock audits simulating C3PAO interview methods",
      "Provides 100% vendor-neutral advice (we never resell hardware or antivirus)"
    ];

    const mspPoints = block.rightPoints || [
      "Implements technical IT changes (MFA, firewalls, server patching, endpoint agents)",
      "Deploys hardware tokens, encrypted laptops, and network access switches",
      "Manages daily user ticketing, desktop support, and password resets",
      "Maintains daily backup retention and system uptime monitoring",
      "Executes configuration instructions derived from our RPO advisory plan"
    ];

    return `
      <section class="section-white py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:columns {columns:2}" 
               data-wp-pattern="secure-centric/rpo-vs-msp-cards">
        <div class="site-container">
          <div style="text-align: center; max-width: 720px; margin: 0 auto 36px;">
            <span class="section-eyebrow" style="justify-content: center;">// CLEAR DIVISION OF RESPONSIBILITIES</span>
            <h2>${esc(block.t || 'Secure-Centric versus Your IT / MSP')}</h2>
            <p style="font-size: 1rem; color: var(--color-body-text); margin-top: 10px;">
              Defense contractors frequently ask: <em>"Can our MSP do this alone?"</em> Here is how an accredited Cyber AB RPO works alongside your existing technical team without overlap.
            </p>
          </div>

          <div class="comparison-grid">
            <!-- Left Card: Secure-Centric (RPO) -->
            <div class="compare-card-rpo">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
                <div>
                  <span class="badge-chip accent" style="font-size: 0.6875rem;">ACCREDITED RPO ADVISOR</span>
                  <h3 style="font-size: 1.35rem; color: var(--color-navy); margin-top: 6px;">${esc(block.left || 'What Secure-Centric Does')}</h3>
                </div>
                <span class="logo-icon" style="width: 32px; height: 32px; font-size: 0.9rem;">SC</span>
              </div>
              <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">
                We lead compliance governance, boundary scoping, document authorship, and assessor defense.
              </p>
              <ul class="compare-list">
                ${rpoPoints.map(pt => `
                  <li>
                    <i class="check">✓</i>
                    <span>${esc(pt)}</span>
                  </li>
                `).join('')}
              </ul>
              <div style="margin-top: 28px;">
                <a href="#page-2" class="btn btn-primary" style="width: 100%;">Engage Secure-Centric &rarr;</a>
              </div>
            </div>

            <!-- Right Card: Your MSP -->
            <div class="compare-card-msp">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
                <div>
                  <span class="badge-chip" style="font-size: 0.6875rem;">OPERATIONAL EXECUTION</span>
                  <h3 style="font-size: 1.35rem; color: var(--color-navy); margin-top: 6px;">${esc(block.right || 'What Your MSP / Internal IT Does')}</h3>
                </div>
                <div class="card-icon-box" style="margin: 0; width: 36px; height: 36px; font-size: 1rem;">⚙️</div>
              </div>
              <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">
                Your IT team implements physical and digital configurations to satisfy our technical requirements.
              </p>
              <ul class="compare-list">
                ${mspPoints.map(pt => `
                  <li>
                    <i class="check msp-check">✓</i>
                    <span>${esc(pt)}</span>
                  </li>
                `).join('')}
              </ul>
              <div style="margin-top: 28px;">
                <div class="card-soft-blue" style="padding: 12px; font-size: 0.8125rem; text-align: center; color: var(--color-navy); font-weight: 600;">
                  🤝 We collaborate directly with your MSP engineers
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Notice -->
          <div class="card-soft-blue" style="margin-top: 32px; padding: 18px 24px; border-left: 4px solid var(--color-electric-blue);">
            <p style="font-size: 0.875rem; color: var(--color-navy); line-height: 1.5; margin: 0;">
              <b>⚖️ Crucial Cyber AB Role Separation:</b> By Department of War regulation, an RPO advises, your MSP configures, and an independent C3PAO assesses. We never assess companies we advise, guaranteeing 100% conflict-free compliance and audit objectivity.
            </p>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Hero ICP (4 Audience Tiles)
   */
  function renderHeroICP(block, page) {
    return `
      <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
               data-wp-pattern="secure-centric/hero-icp-tiles"
               style="border-bottom: 1px solid var(--color-dark-line);">
        <div class="site-container">
          <div class="hero-home-grid">
            <div>
              <span class="section-eyebrow dark">// ${esc(block.eyebrow)}</span>
              <h1 style="color: var(--color-white); margin-bottom: 16px;">${esc(page.h1)}</h1>
              <p class="hero-lead" style="color: var(--color-text-on-dark);">${esc(block.sub)}</p>
              <div style="margin-top: 24px;">
                <a href="#page-4" class="btn btn-primary btn-lg">Book a Discovery Call &rarr;</a>
              </div>
            </div>

            <div>
              <span class="section-eyebrow dark" style="font-size: 0.75rem;">SELECT YOUR SITUATION</span>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
                ${block.audiences.map(a => `
                  <div class="card-dark" style="cursor: pointer; padding: 20px;" onclick="alert('Viewing tailored compliance path for: ${a}')">
                    <h4 style="font-size: 0.9375rem; color: var(--color-white); margin-bottom: 8px;">${esc(a)}</h4>
                    <span class="text-link on-dark" style="font-size: 0.75rem;">See Your Path &rarr;</span>
                  </div>
                `).join('')}
              </div>
              <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); text-align: center; margin-top: 12px;">
                Not sure? Start with your contract tier below &darr;
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: ICP Tiers
   */
  function renderTiers(block) {
    const items = block.items || [];
    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:columns {columns:4}">
        <div class="site-container">
          <span class="section-eyebrow">// COMPLIANCE TIERS</span>
          <h2 style="margin-bottom: 32px;">${esc(block.t || 'By CMMC Level: Where Your Contract Puts You')}</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
            ${items.map(t => {
              const [levelName, levelDesc] = t;
              return `
                <div class="card-white" style="display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <span class="badge-chip accent" style="margin-bottom: 12px;">${esc(levelName)}</span>
                    <h4 style="margin-bottom: 10px;">${esc(levelName)} Requirement</h4>
                    <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">${esc(levelDesc)}</p>
                  </div>
                  <div style="margin-top: 20px; border-top: 1px solid var(--color-border); padding-top: 12px;">
                    <a href="#page-2" class="text-link">Explore Level Roadmap &rarr;</a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Personas
   */
  function renderPersonas(block) {
    const items = block.items || [];
    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:columns {columns:4}">
        <div class="site-container">
          <span class="section-eyebrow">// EXECUTIVE PERSONAS</span>
          <h2 style="margin-bottom: 32px;">${esc(block.t || 'By Role: What Each Executive Needs From Us')}</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
            ${items.map(p => {
              const [roleName, roleDesc] = p;
              return `
                <div class="card-white">
                  <div class="card-icon-box" style="margin-bottom: 12px;">👤</div>
                  <h4 style="font-size: 1.05rem; margin-bottom: 8px;">${esc(roleName)}</h4>
                  <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">${esc(roleDesc)}</p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Hero Guide (Pillar Pages)
   */
  function renderHeroGuide(block, page) {
    const isTool = (block.side || '').startsWith('tool:');
    const sideContent = (block.side || '').replace(/^(tool|diagram|facts):/, '');

    return `
      <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
               data-wp-pattern="secure-centric/hero-pillar-guide"
               style="border-bottom: 1px solid var(--color-dark-line);">
        <div class="site-container">
          <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); margin-bottom: 16px;">
            HOME / LEARN / <span style="color: var(--color-cyber-cyan);">${esc(page.name).toUpperCase()}</span>
          </div>
          <div class="hero-home-grid">
            <div>
              <span class="section-eyebrow dark">// ${esc(block.eyebrow)}</span>
              <h1 style="color: var(--color-white); margin-bottom: 16px;">${esc(page.h1)}</h1>
              
              <div class="card-dark" style="background-color: rgba(11, 20, 55, 0.85); border-left: 3px solid var(--color-cyber-cyan); margin-bottom: 20px; padding: 18px 22px;">
                <span style="font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-cyber-cyan); display: block; margin-bottom: 6px;">DIRECT ANSWER (EXECUTIVE SUMMARY)</span>
                <p style="color: var(--color-white); font-size: 1rem; margin: 0; line-height: 1.5;">${esc(block.sub)}</p>
              </div>

              <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
                <span>Reviewed by: <b>Son Phan, Principal Architect</b></span>
                <span>•</span>
                <span>Last Updated: <b>Q4 2026</b></span>
                <span>•</span>
                <span class="badge-chip dark" style="font-size: 0.65rem;">Cyber AB RPO Verified</span>
              </div>
            </div>

            <div>
              ${isTool ? `
                <div class="card-white" style="padding: 28px;">
                  <span class="section-eyebrow">// INTERACTIVE TOOL</span>
                  <h3>${esc(sideContent)}</h3>
                  <div style="display: flex; flex-direction: column; gap: 12px; margin: 16px 0;">
                    <label style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem;">
                      <span>Does your contract contain DFARS 7012?</span>
                      <input type="checkbox" checked style="accent-color: var(--color-electric-blue); width: 18px; height: 18px;" />
                    </label>
                    <label style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem;">
                      <span>Do you store or process technical drawings / CAD?</span>
                      <input type="checkbox" checked style="accent-color: var(--color-electric-blue); width: 18px; height: 18px;" />
                    </label>
                    <label style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem;">
                      <span>Are you a designated critical weapon system supplier?</span>
                      <input type="checkbox" style="accent-color: var(--color-electric-blue); width: 18px; height: 18px;" />
                    </label>
                  </div>
                  <div class="card-soft-blue" style="padding: 14px; margin-bottom: 16px;">
                    <b style="color: var(--color-navy); font-size: 0.875rem; display: block;">Calculated Level Requirement:</b>
                    <span style="color: var(--color-electric-blue); font-weight: 800; font-size: 1.15rem;">CMMC Level 2 (110 Controls)</span>
                  </div>
                  <a href="#page-13" class="btn btn-primary" style="width: 100%;">View Level 2 Action Plan &rarr;</a>
                </div>
              ` : `
                <div class="card-dark" style="padding: 28px;">
                  <span class="section-eyebrow dark">// KEY SPECIFICATIONS</span>
                  <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 14px;">
                    ${(sideContent || '110 Requirements · 14 Control Families · Rev 2 Baseline').split('·').map(fact => `
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="width: 28px; height: 28px; border-radius: 6px; background: rgba(0, 212, 255, 0.15); color: var(--color-cyber-cyan); display: flex; align-items: center; justify-content: center; font-size: 0.875rem;">✓</span>
                        <b style="color: var(--color-white); font-size: 0.9375rem;">${esc(fact.trim())}</b>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Hero Split (Stage Pages)
   */
  function renderHeroSplit(block, page) {
    return `
      <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
               data-wp-pattern="secure-centric/hero-split-stage"
               style="border-bottom: 1px solid var(--color-dark-line);">
        <div class="site-container">
          <div style="font-size: 0.75rem; color: var(--color-slate); font-family: var(--font-mono); margin-bottom: 16px;">
            HOME / SERVICES / ENGAGEMENT STAGES / <span style="color: var(--color-cyber-cyan);">${esc(page.name).toUpperCase()}</span>
          </div>
          <div class="hero-home-grid">
            <div>
              <span class="section-eyebrow dark">// ${esc(block.eyebrow)}</span>
              <h1 style="color: var(--color-white); margin-bottom: 16px;">${esc(page.h1)}</h1>
              <p class="hero-lead" style="color: var(--color-text-on-dark);">${esc(block.sub)}</p>
              <div style="display: flex; gap: 16px; align-items: center; margin-top: 24px; flex-wrap: wrap;">
                <a href="#contact" class="btn btn-primary btn-lg">Book a Discovery Call &rarr;</a>
                <a href="#details" class="text-link on-dark">${esc(block.link)} &darr;</a>
              </div>
            </div>

            <div class="card-white" style="padding: 28px;">
              <span class="section-eyebrow">// DIRECT ADVISORY</span>
              <h3>Talk to a CMMC Advisor</h3>
              <p style="font-size: 0.875rem; color: var(--color-body-text); margin: 8px 0 16px;">
                Here is exactly what you receive on your confidential 30-minute scoping review:
              </p>
              <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
                <div class="tick-item" style="display: flex; gap: 10px; font-size: 0.875rem;">
                  <span style="color: var(--color-electric-blue); font-weight: 800;">✓</span>
                  <span>Where you stand today against NIST 800-171</span>
                </div>
                <div class="tick-item" style="display: flex; gap: 10px; font-size: 0.875rem;">
                  <span style="color: var(--color-electric-blue); font-weight: 800;">✓</span>
                  <span>Which level and scoping boundary fits your contracts</span>
                </div>
                <div class="tick-item" style="display: flex; gap: 10px; font-size: 0.875rem;">
                  <span style="color: var(--color-electric-blue); font-weight: 800;">✓</span>
                  <span>A concrete, written first step before committing budget</span>
                </div>
              </div>
              <a href="#contact" class="btn btn-primary" style="width: 100%;">Book Discovery Call &rarr;</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Hero Center (Checklists & About)
   */
  function renderHeroCenter(block, page) {
    const isResourcePage = (page.group === 'Checklists') ||
      (page.type && page.type.toLowerCase().includes('resource')) ||
      (page.url && page.url.includes('/resources/')) ||
      page.id === 'page-21' || page.id === 'page-22' || page.id === 'page-23';

    const subtitle = block.sub || page.meta || (page.name.toLowerCase().includes('about')
      ? 'Safeguarding Controlled Unclassified Information (CUI) protects the warfighters and defense systems that keep our nation safe. Secure-Centric stands beside defense contractors on site from initial scoping through official C3PAO certification.'
      : 'Authoritative, assessor-ready template engineered for defense contractors and DoD subcontractors preparing for formal Level 1 and Level 2 CMMC audits.');

    // If resource page: 2-column hero with header/text/bullets on left and full contact form on right
    if (isResourcePage) {
      return `
        <section class="resource-hero-wrap wp-block-inspect wp-pattern-inspect" 
                 data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
                 data-wp-pattern="secure-centric/resource-split-hero">
          <div class="site-container">
            <div class="resource-hero-grid">
              <!-- Left Column: Header, lead, bullet points, credibility -->
              <div class="resource-hero-left">
                <span class="section-eyebrow dark" style="margin-bottom: 14px;">// COMPLIANCE RESOURCE &bull; INSTANT ACCESS</span>
                <h1>${esc(page.h1)}</h1>
                <p class="hero-lead">${esc(subtitle)}</p>

                <div class="resource-hero-bullets">
                  <div class="resource-bullet-item">
                    <span class="bullet-check">✓</span>
                    <div><b>Assessor-Defensible Format:</b> Fully aligned with NIST SP 800-171 Rev 2 &amp; 32 CFR Part 170 CMMC Level 2 objectives.</div>
                  </div>
                  <div class="resource-bullet-item">
                    <span class="bullet-check">✓</span>
                    <div><b>Pre-Built Evidence Mapping:</b> Detailed assessment methods, evidence artifact references, and responsible owner assignments.</div>
                  </div>
                  <div class="resource-bullet-item">
                    <span class="bullet-check">✓</span>
                    <div><b>Cyber AB RPO Reviewed:</b> Maintained by certified Registered Practitioners who guide defense subcontractors through live C3PAO audits.</div>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 12px; margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.12); font-size: 0.8125rem; color: var(--color-cyber-cyan); font-family: var(--font-mono);">
                  <span>🔒 100% Confidential</span>
                  <span>&bull;</span>
                  <span>Never Shared</span>
                  <span>&bull;</span>
                  <span>Direct Download</span>
                </div>
              </div>

              <!-- Right Column: Contact Form (Identical to Contact Page) -->
              <div class="resource-hero-right">
                <div class="resource-hero-card-form" id="contact-form-container">
                  <h3 style="margin-bottom: 6px; font-size: 1.35rem; color: var(--color-navy);">Request Your Compliance Pack</h3>
                  <p style="font-size: 0.8125rem; color: var(--color-slate); margin-bottom: 18px;">
                    Complete the form below to receive the official compliance checklist and speak with a Cyber AB Registered Practitioner.
                  </p>

                  <form id="resource-contact-form" onsubmit="window.handleContactSubmit(event)">
                    <div class="form-row-2">
                      <div class="form-group">
                        <label class="form-label" for="contact-name">First &amp; Last Name*</label>
                        <input type="text" id="contact-name" class="form-input" placeholder="e.g. John Miller" required />
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="contact-email">Work Email (Corporate Domain)*</label>
                        <input type="email" id="contact-email" class="form-input" placeholder="john@defensecontractor.com" required />
                      </div>
                    </div>

                    <div class="form-row-2">
                      <div class="form-group">
                        <label class="form-label" for="contact-phone">Phone Number*</label>
                        <input type="tel" id="contact-phone" class="form-input" placeholder="(555) 000-0000" required />
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="contact-company">Company / Organization*</label>
                        <input type="text" id="contact-company" class="form-input" placeholder="e.g. Precision Aerospace LLC" required />
                      </div>
                    </div>

                    <div class="form-row-2">
                      <div class="form-group">
                        <label class="form-label" for="contact-role">Supply Chain Role*</label>
                        <select id="contact-role" class="form-select" required>
                          <option value="">Select your role...</option>
                          <option value="Prime Contractor">Prime Contractor</option>
                          <option value="Subcontractor Tier 1">Subcontractor (Tier 1)</option>
                          <option value="Subcontractor Tier 2+">Subcontractor (Tier 2 or Lower)</option>
                          <option value="Commercial Item Supplier">Commercial Item Supplier</option>
                          <option value="Managed Service Provider">MSP / IT Provider</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="contact-level">Target CMMC Level*</label>
                        <select id="contact-level" class="form-select" required>
                          <option value="Level 2">CMMC Level 2 (110 Controls &bull; CUI)</option>
                          <option value="Level 1">CMMC Level 1 (15 Controls &bull; FCI)</option>
                          <option value="Not Sure">Not Sure — Need Boundary Scoping</option>
                          <option value="NIST 800-171">NIST SP 800-171 / DFARS 7012 Only</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="contact-sprs">Current SPRS Score (Optional)</label>
                      <input type="text" id="contact-sprs" class="form-input" placeholder="e.g. -35, +60, or 'Never Calculated'" />
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="contact-message">How can our Registered Practitioners help you?*</label>
                      <textarea id="contact-message" class="form-textarea" rows="2" placeholder="Tell us about your upcoming contract renewals, DoD deadlines, or primary challenges with NIST SP 800-171." required></textarea>
                    </div>

                    <div style="margin-top: 16px;">
                      <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">
                        Download Checklist &amp; Book Call &rarr;
                      </button>
                    </div>

                    <div style="margin-top: 10px; font-size: 0.72rem; color: var(--color-slate); text-align: center; line-height: 1.4;">
                      🔒 Communications held under strict confidentiality. We do not sell or share contractor data.
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    const buttonText = page.name.toLowerCase().includes('about') ? 'Book a Discovery Call &rarr;' : 'Download Checklist (PDF/Excel) &darr;';
    const buttonLink = page.name.toLowerCase().includes('about') ? '#contact' : '#download-form';

    return `
      <section class="section-midnight py-section text-center wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {align:'full', backgroundColor:'midnight'}" 
               data-wp-pattern="secure-centric/hero-center"
               style="text-align: center; border-bottom: 1px solid var(--color-dark-line);">
        <div class="site-container" style="max-width: 860px; margin: 0 auto;">
          <span class="section-eyebrow dark" style="justify-content: center;">// ${esc(block.eyebrow || 'OFFICIAL COMPLIANCE RESOURCE')}</span>
          <h1 style="color: var(--color-white); margin-bottom: 16px;">${esc(page.h1)}</h1>
          <p class="hero-lead" style="color: var(--color-text-on-dark); margin: 0 auto 28px; line-height: 1.6; font-size: 1.125rem;">${esc(subtitle)}</p>
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="${buttonLink}" class="btn btn-primary btn-lg">${buttonText}</a>
            ${page.name.toLowerCase().includes('about') ? '<a href="#page-2" class="btn btn-ghost-dark btn-lg">Explore Services &rarr;</a>' : ''}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Scrolling Client Logos (One-Line Infinite Carousel)
   */
  function renderLogos(block) {
    const logos = block.logos || [];
    const itemsHtml = logos.map(logo => `
      <div class="logo-item">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="color: var(--color-electric-blue);">
          <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/>
        </svg>
        <span>${esc(logo)}</span>
      </div>
    `).join('');

    return `
      <section class="logos-band-wrap wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {align:'full', backgroundColor:'white'}" 
               data-wp-pattern="secure-centric/client-logos-marquee">
        <div class="site-container">
          <div class="logos-band-title">${esc(block.t)}</div>
        </div>
        <div class="logos-carousel-container">
          <div class="logos-carousel-track">
            ${itemsHtml}
            ${itemsHtml}
            ${itemsHtml}
          </div>
        </div>
      </section>
    `;
  }

  const DEFAULT_JOURNEY_STEPS = [
    { no: "01", name: "Site visit", who: "You + Secure-Centric", help: "In-person physical & technical walkthrough of facilities, server rooms, and shop-floor enclaves.", output: "Asset discovery baseline & boundary notes", link: "#page-2" },
    { no: "02", name: "Scoping", who: "Secure-Centric + IT Leads", help: "Map CUI/FCI flows, identify people, systems, and network storage touching DoD contracts.", output: "Formal Scope Document & Data-Flow Architecture", link: "#page-16" },
    { no: "03", name: "Gap assessment", who: "Secure-Centric", help: "Audit all 110 NIST SP 800-171 controls against actual day-to-day operations.", output: "Defensible SPRS Score estimate & findings register", link: "#page-5" },
    { no: "04", name: "Remediation", who: "Your IT/MSP (guided by us)", help: "Prioritize fixes by risk weight; guide MFA, encryption, logging, and enclave deployments.", output: "Remediation Roadmap with owners and completion targets", link: "#page-7" },
    { no: "05", name: "Documentation", who: "Secure-Centric + You", help: "Co-write your System Security Plan (SSP), POA&M, and all required operational policies.", output: "Assessor-ready SSP and comprehensive policy suite", link: "#page-8" },
    { no: "06", name: "Readiness review", who: "Secure-Centric RPs", help: "Full rehearsal mock audit simulating C3PAO interview techniques and evidence requests.", output: "Readiness sign-off report & Evidence Binder index", link: "#page-4" },
    { no: "07", name: "Assessment", who: "Independent C3PAO", help: "We stand alongside your team during official DIBCAC or Authorized C3PAO evaluation.", output: "Level 2 CMMC Certification recommendation", link: "#page-19" },
    { no: "08", name: "Maintain", who: "Virtual CISO / You", help: "Continuous compliance, annual SPRS reaffirmation, change management, and evidence refreshes.", output: "Annual Affirmation pack & ongoing compliance posture", link: "#page-11" }
  ];

  /**
   * Render Block HTML: 8-Step CMMC Journey Roadmap
   */
  function renderJourney(block) {
    const rawItems = (block && block.items && block.items.length) ? block.items : DEFAULT_JOURNEY_STEPS;
    const items = DEFAULT_JOURNEY_STEPS.map((defStep, i) => {
      const raw = rawItems[i];
      if (typeof raw === 'object' && raw !== null && raw.name) {
        return { ...defStep, ...raw };
      } else if (typeof raw === 'string') {
        return { ...defStep, name: raw };
      }
      return defStep;
    });

    if (activeRoadmapStep < 0) activeRoadmapStep = 0;
    if (activeRoadmapStep >= items.length) activeRoadmapStep = items.length - 1;

    const activeStep = items[activeRoadmapStep] || items[0];
    const totalSteps = items.length;
    const progressPercent = Math.round(((activeRoadmapStep) / (totalSteps - 1)) * 100);
    const isStep7 = activeRoadmapStep === 6;
    const isLast = activeRoadmapStep === totalSteps - 1;
    const isFirst = activeRoadmapStep === 0;

    // Phase categorization for defense contractor milestone context
    let phaseName = 'Phase 1: Facility Walkthrough & Scope Discovery';
    if (activeRoadmapStep >= 2 && activeRoadmapStep <= 3) {
      phaseName = 'Phase 2: Gap Assessment & Enclave Remediation';
    } else if (activeRoadmapStep >= 4 && activeRoadmapStep <= 5) {
      phaseName = 'Phase 3: SSP Authoring & Mock Audit Readiness';
    } else if (activeRoadmapStep >= 6) {
      phaseName = 'Phase 4: Official C3PAO Assessment & Affirmation';
    }

    // Helper to get tablet screen icon matching the active milestone
    function getTabletIcon(stepIdx) {
      switch(stepIdx) {
        case 0: // 01 Site visit (Location pin)
          return `<path d="M99 89 q-7.5 -8 -7.5 -12.5 a7.5 7.5 0 0 1 15 0 q0 4.5 -7.5 12.5 z" fill="#2F5BFF" class="sc-tablet-icon"/><circle cx="99" cy="76.5" r="2.8" fill="#FFFFFF"/>`;
        case 1: // 02 Scoping (Target boundary / Scoping grid)
          return `<rect x="92.5" y="70" width="13" height="13" rx="1.5" fill="none" stroke="#2F5BFF" stroke-width="1.8" stroke-dasharray="2.5 1.5" class="sc-tablet-icon"/><rect x="96" y="73.5" width="6" height="6" rx="1" fill="#19C3F0"/>`;
        case 2: // 03 Gap assessment (Check & Cross)
          return `<path d="M92.44 74 l2.08 2.24 l3.68 -4.32" fill="none" stroke="#19C3F0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><rect x="99.5" y="72.6" width="7" height="2.4" rx="1.2" fill="#2F5BFF" class="sc-tablet-icon"/><path d="M92.8 81.2 l4.4 4.4 M97.2 81.2 l-4.4 4.4" stroke="#FF6B4A" stroke-width="2.2" stroke-linecap="round"/><rect x="99.5" y="82.2" width="7" height="2.4" rx="1.2" fill="#2F5BFF" class="sc-tablet-icon"/>`;
        case 3: // 04 Remediation (Spanner / Wrench)
          return `<path d="M93.5 86.5 L101.5 77.5" stroke="#2F5BFF" stroke-width="3.4" stroke-linecap="round" class="sc-tablet-icon"/><circle cx="103" cy="74.5" r="4.6" fill="#2F5BFF" class="sc-tablet-icon"/><path d="M103 70 l3 3.2 l-2 2 l-3.2 -3 z" fill="#FFFFFF"/>`;
        case 4: // 05 Documentation (Policy / Procedure Sheet)
          return `<path d="M92.5 69.5 h9 l4.5 4.5 v14.5 h-13.5 z" fill="none" stroke="#2F5BFF" stroke-width="1.8" stroke-linejoin="round" class="sc-tablet-icon"/><path d="M101.5 69.5 v4.5 h4.5" fill="none" stroke="#2F5BFF" stroke-width="1.6" class="sc-tablet-icon"/><rect x="95" y="77" width="8.5" height="1.8" rx=".9" fill="#19C3F0"/><rect x="95" y="80.6" width="8.5" height="1.8" rx=".9" fill="#19C3F0"/><rect x="95" y="84.2" width="5.5" height="1.8" rx=".9" fill="#19C3F0"/>`;
        case 5: // 06 Readiness review (Audit Checklist)
          return `<path d="M92.26 72.5 l1.82 1.96 l3.22 -3.78" fill="none" stroke="#19C3F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="98.5" y="70.9" width="8" height="2.2" rx="1.1" fill="#2F5BFF" class="sc-tablet-icon"/><path d="M92.26 79 l1.82 1.96 l3.22 -3.78" fill="none" stroke="#19C3F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="98.5" y="77.4" width="8" height="2.2" rx="1.1" fill="#2F5BFF" class="sc-tablet-icon"/><path d="M92.26 85.5 l1.82 1.96 l3.22 -3.78" fill="none" stroke="#19C3F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="98.5" y="83.9" width="8" height="2.2" rx="1.1" fill="#2F5BFF" class="sc-tablet-icon"/>`;
        case 6: // 07 Assessment (Target C3PAO Certification Badge & Ribbon)
          return `<circle cx="99" cy="74.5" r="5" fill="#7B5CFF" class="sc-tablet-icon"/><path d="M96.8 74.5 l1.6 1.6 l3.6 -3.6" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M96.5 78.5 L95 86 L99 83.5 L103 86 L101.5 78.5" fill="#7B5CFF" class="sc-tablet-icon"/>`;
        case 7: // 08 Maintain (Continuous Monitoring / Sync Arrows)
        default:
          return `<path d="M95 78 A5 5 0 1 1 103 81" fill="none" stroke="#2F5BFF" stroke-width="2" stroke-linecap="round" class="sc-tablet-icon"/><polygon points="103,77 106,81 101,82" fill="#2F5BFF" class="sc-tablet-icon"/><path d="M103 80 A5 5 0 1 1 95 77" fill="none" stroke="#19C3F0" stroke-width="2" stroke-linecap="round"/><polygon points="95,81 92,77 97,76" fill="#19C3F0"/>`;
      }
    }

    return `
      <section class="py-section roadmap-wrap wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {backgroundColor:'ice'}" 
               data-wp-pattern="secure-centric/cmmc-8-step-journey" 
               id="roadmap-section">
        <div class="site-container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="section-eyebrow">// THE CMMC PROCESS</span>
              <h2>${esc(block.t)}</h2>
            </div>
            <a href="#page-19" class="text-link">View Detailed 8-Step Process &rarr;</a>
          </div>

          <!-- Interactive Milestone Flow Stepper -->
          <div class="roadmap-timeline-nav" role="tablist" aria-label="CMMC Milestone Process" id="roadmap-timeline-nav">
            <div class="roadmap-timeline-rail">
              <div class="roadmap-timeline-fill" id="roadmap-timeline-fill" style="width: ${progressPercent}%;"></div>
            </div>

            <!-- Standalone Walking Character (WordPress Custom Block Ready: wp:secure-centric/cmmc-journey) -->
            <div class="roadmap-walker is-idle ${activeRoadmapStep === 6 ? 'step-7-active' : ''}" 
                 id="roadmap-walker" 
                 aria-hidden="true">
              <svg class="walker-figure-svg" viewBox="0 0 140 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="sc-walker-root">
                  <!-- Ground Shadow -->
                  <ellipse cx="72" cy="206" rx="36" ry="4.5" fill="#14204B" opacity=".12"/>

                  <!-- Back Arm (Left) -->
                  <g class="sc-ref-arm-left">
                    <path d="M65 58 L57 85 L52 104" fill="none" stroke="#0F1A3E" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="51.5" cy="107" r="5" fill="#C98B63"/>
                  </g>

                  <!-- Back Leg (Left) -->
                  <g class="sc-ref-leg-left">
                    <path d="M69 111 L59 151 L48 186" fill="none" stroke="#111A40" stroke-width="14" stroke-linejoin="round"/>
                    <path d="M41 184 h13 q8 0 9 6.5 v2.5 h-22 z" fill="#0A0F24" transform="rotate(22 52 189)"/>
                  </g>

                  <!-- Front Leg (Right) -->
                  <g class="sc-ref-leg-right">
                    <path d="M78 110 L90 152 L97 192" fill="none" stroke="#1A2552" stroke-width="15" stroke-linejoin="round"/>
                    <path d="M89 191 h15 q8 0 8 6 v2.5 h-23 z" fill="#0A0F24"/>
                  </g>

                  <!-- Torso, Suit Jacket, Head & Credentials -->
                  <g class="sc-ref-torso-group">
                    <!-- Tailored Navy Suit Jacket -->
                    <path d="M58 58 Q60 47 72 47 Q85 47 87 55 L91 112 Q74 119 57 113 Z" fill="#14204B" class="sc-suit-jacket"/>
                    <!-- White Inner Shirt V-Collar -->
                    <path d="M78 47 L86 52 L84 70 Z" fill="#FFFFFF"/>
                    <!-- Inner Suit Fold / Lapel Depth -->
                    <path d="M78 50 L85 60 L80 84 L76 62 Z" fill="#0C1533"/>
                    <!-- Neck -->
                    <rect x="69" y="40" width="9" height="10" rx="2" fill="#C98B63"/>
                    <!-- Cyan Security Lanyard Ribbon -->
                    <path d="M76.5 47.5 L83 66.5" stroke="#19C3F0" stroke-width="1.8" stroke-linecap="round" class="sc-lanyard"/>
                    <!-- Cyber AB Assessor ID Credential Badge -->
                    <rect x="79.5" y="66" width="8" height="11" rx="1.4" fill="#FFFFFF"/>
                    <rect x="79.5" y="66" width="8" height="3.4" rx="1.4" fill="#2F5BFF" class="sc-badge-header"/>
                    <rect x="81.3" y="71.6" width="4.4" height="1.4" rx=".7" fill="#14204B" opacity=".5"/>
                    <rect x="81.3" y="74" width="3" height="1.4" rx=".7" fill="#14204B" opacity=".35"/>
                    <!-- Head & Professional Hair Profile -->
                    <circle cx="75" cy="29" r="14" fill="#E3A880"/>
                    <path d="M88.5 27 q3.5 2.5 0.5 6" fill="#E3A880"/>
                    <path d="M61 30 Q60 13 76 13 Q90 14 89 25 Q82 20 76 23 Q70 25 70 33 Q66 37 62 36 Q61 33 61 30 Z" fill="#1D1A2B"/>
                    <ellipse cx="70.5" cy="31" rx="2.4" ry="3.4" fill="#C98B63"/>
                  </g>

                  <!-- Front Arm (Right) holding CMMC Milestone Tablet -->
                  <g class="sc-ref-arm-right">
                    <path d="M75 58 L73 89 L89 95" fill="none" stroke="#1E2C63" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" class="sc-suit-arm"/>
                    <!-- Tablet Folio with Step-Specific Icon -->
                    <g class="sc-ref-tablet" transform="rotate(8 99 79)">
                      <rect x="85.5" y="61.5" width="27" height="35" rx="4" fill="#2F5BFF" class="sc-tablet-border"/>
                      <rect x="88.5" y="65" width="21" height="28" rx="2" fill="#FFFFFF"/>
                      ${getTabletIcon(activeRoadmapStep)}
                    </g>
                    <!-- Hand holding tablet -->
                    <circle cx="91" cy="95.5" r="5" fill="#E3A880"/>
                  </g>
                </g>
              </svg>
            </div>

            ${items.map((step, idx) => {
              const isCompleted = idx < activeRoadmapStep;
              const isActive = idx === activeRoadmapStep;
              const isNodeStep7 = idx === 6;
              let stateClass = '';
              if (isActive) stateClass = 'active';
              else if (isCompleted) stateClass = 'completed';
              return `
                <button type="button" 
                        class="step-node ${isNodeStep7 ? 'step-7' : ''} ${stateClass}" 
                        onclick="window.selectRoadmapStep(${idx}, event)"
                        role="tab"
                        aria-selected="${isActive}"
                        title="Milestone ${step.no}: ${step.name}">
                  ${isNodeStep7 ? `
                    <div class="milestone-flag-wrap ${activeRoadmapStep === 6 ? 'is-visible' : ''}" id="step-7-flag" aria-label="Target C3PAO Certification Milestone">
                      <svg class="milestone-flag-svg" viewBox="0 0 28 36" fill="none">
                        <line x1="5" y1="2" x2="5" y2="34" stroke="#0B1437" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="5" cy="2.5" r="2" fill="#7B5CFF"/>
                        <path d="M5 4 C 12 1.5, 17 7.5, 26 5 C 23.5 11, 26 16, 26 16 C 17 18.5, 12 12.5, 5 15 Z" fill="#7B5CFF"/>
                        <path d="M8 8 L13 8 M8 11.5 L16 11.5" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round"/>
                      </svg>
                    </div>
                  ` : ''}
                  <span class="node-circle">
                    ${isCompleted ? '✓' : step.no}
                  </span>
                  <span class="node-label">${esc(step.name)}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Active Milestone Flow Detail Card -->
          <div class="step-detail-card" id="roadmap-detail-card" style="margin-top: 32px;">
            <div class="milestone-flow-header">
              <div class="milestone-stepper-pills">
                <span class="milestone-flow-badge ${isStep7 ? 'violet' : ''}">
                  <span class="pulse-dot" style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: currentColor; margin-right: 5px;"></span>
                  MILESTONE ${activeStep.no} OF 08 &bull; ${phaseName}
                </span>
              </div>

              <div class="milestone-stepper-nav">
                <button type="button" 
                        class="milestone-nav-btn" 
                        ${isFirst ? 'disabled' : ''} 
                        onclick="window.selectRoadmapStep(${activeRoadmapStep - 1}, event)">
                  &larr; Prev Milestone
                </button>
                <button type="button" 
                        class="milestone-nav-btn" 
                        ${isLast ? 'disabled' : ''} 
                        onclick="window.selectRoadmapStep(${activeRoadmapStep + 1}, event)">
                  Next Milestone &rarr;
                </button>
              </div>
            </div>

            <div class="step-detail-left">
              <span class="section-eyebrow ${isStep7 ? 'violet' : ''}">MILESTONE ${activeStep.no} &bull; ${esc(activeStep.name).toUpperCase()}</span>
              <h3>${esc(activeStep.name)}</h3>
              <p style="font-size: 1.0625rem; color: var(--color-body-text); line-height: 1.6; margin-bottom: 24px;">
                ${esc(activeStep.help)}
              </p>
              <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
                ${isStep7 ? `
                  <a href="#page-19" class="btn btn-primary" style="background-color: var(--color-violet); border-color: var(--color-violet);">
                    Official C3PAO Assessment Support &rarr;
                  </a>
                ` : !isLast ? `
                  <button type="button" class="btn btn-primary" onclick="window.selectRoadmapStep(${activeRoadmapStep + 1}, event)">
                    Advance to Milestone ${(items[activeRoadmapStep + 1]).no}: ${esc(items[activeRoadmapStep + 1].name)} &rarr;
                  </button>
                ` : `
                  <a href="#contact" class="btn btn-primary">
                    Achieve Continuous CMMC Readiness &rarr;
                  </a>
                `}
                <a href="${activeStep.link || '#page-2'}" class="btn btn-secondary-outline">Explore Milestone Scope</a>
              </div>
            </div>

            <div class="step-detail-right">
              <div class="step-subcard">
                <h5>WHO DOES THIS WORK</h5>
                <b style="color: var(--color-navy); font-size: 0.9375rem;">${esc(activeStep.who)}</b>
              </div>
              <div class="step-subcard" style="border-left: 3px solid ${isStep7 ? 'var(--color-violet)' : 'var(--color-electric-blue)'};">
                <h5>PRIMARY DELIVERABLE YOU KEEP</h5>
                <b style="color: ${isStep7 ? 'var(--color-violet)' : 'var(--color-electric-blue)'}; font-size: 0.9375rem;">${esc(activeStep.output)}</b>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Default 5 Verified Defense Contractor Testimonials
   */
  const DEFAULT_TESTIMONIALS = [
    {
      no: "01",
      name: "Alex Liu",
      role: "IT Manager",
      company: "Tower Semiconductor",
      quote: "Secure-Centric gave us absolute clarity on what was inside our CUI boundary and what was not. We passed our official C3PAO Level 2 assessment on the first attempt with zero open items.",
      linkedin: true
    },
    {
      no: "02",
      name: "Patrick Shaw",
      role: "Cyber Security Analyst",
      company: "Safran Federal Systems",
      quote: "Their team was on site at our facility within two weeks. They didn't hand us generic compliance templates—they helped configure our actual firewalls, SIEM, and author an ironclad SSP.",
      linkedin: true
    },
    {
      no: "03",
      name: "Rafael Omar Lemus",
      role: "IT Director",
      company: "Goodwin & Associates",
      quote: "Most consultants sell managed IT products. Secure-Centric provided strictly independent advisory. They worked directly with our internal team and existing MSP without conflicts.",
      linkedin: true
    },
    {
      no: "04",
      name: "Regina Amosi",
      role: "CISO",
      company: "Tower Semiconductor",
      quote: "I would like to thank Secure-Centric and Desmond Thompson, who guided us through the preparation stages for the certification, even before the external assessment.",
      linkedin: true
    },
    {
      no: "05",
      name: "Albert Leon",
      role: "CIO",
      company: "HRD Aero Systems",
      quote: "From scoping out shop-floor test equipment to submitting our SPRS score defense, Secure-Centric made what felt like an impossible 110-control standard manageable.",
      linkedin: true
    }
  ];

  /**
   * Render Block HTML: Testimonials
   */
  function renderQuotes(block) {
    const rawItems = block.items || [];
    const items = DEFAULT_TESTIMONIALS.map((def, idx) => {
      const src = rawItems[idx];
      if (!src) return def;
      if (typeof src === 'object' && src !== null) {
        return {
          no: src.no || def.no,
          name: src.name || def.name,
          role: src.role || def.role,
          company: src.company || def.company,
          quote: src.quote || def.quote,
          linkedin: (src.linkedin !== undefined) ? src.linkedin : def.linkedin
        };
      }
      return def;
    });

    const renderCard = (q, i) => {
      const num = q.no || `0${i + 1}`;
      const name = q.name || 'Defense Contractor';
      const role = q.role || 'Leadership';
      const company = q.company || 'Aerospace & Defense Subcontractor';
      const quote = q.quote || '';
      const hasLinkedIn = (q.linkedin !== undefined) ? !!q.linkedin : true;
      const initials = (name || 'DC').split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 3).toUpperCase();

      return `
        <div class="testimonial-card" data-index="${i}">
          <div class="testimonial-card-header">
            <span class="testimonial-num">${esc(num)}</span>
            <span class="testimonial-quote-icon" aria-hidden="true">&ldquo;</span>
          </div>
          <div class="testimonial-body">
            <p class="testimonial-quote-text">${esc(quote)}</p>
          </div>
          <div class="testimonial-card-divider"></div>
          <div class="testimonial-footer-row">
            <div class="testimonial-avatar" aria-hidden="true">${esc(initials)}</div>
            <div class="testimonial-author-meta">
              <div class="testimonial-author-name">${esc(name)}</div>
              <div class="testimonial-author-role">${esc(role)}, ${esc(company)}</div>
              ${hasLinkedIn ? `
                <a href="https://www.linkedin.com/company/secure-centric/" target="_blank" rel="noopener noreferrer" class="testimonial-linkedin-link" title="Shared publicly on LinkedIn" onclick="event.stopPropagation();">
                  <svg class="linkedin-badge-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect width="16" height="16" rx="3" fill="#0A66C2"/>
                    <path d="M4.6 6.3H2.5V13H4.6V6.3Z" fill="white"/>
                    <path d="M3.55 5.4C4.24 5.4 4.8 4.84 4.8 4.15C4.8 3.46 4.24 2.9 3.55 2.9C2.86 2.9 2.3 3.46 2.3 4.15C2.3 4.84 2.86 5.4 3.55 5.4Z" fill="white"/>
                    <path d="M8.1 6.3H6.1V13H8.1V9.5C8.1 7.6 10.5 7.4 10.5 9.5V13H12.6V8.6C12.6 5.2 8.7 5.3 8.1 6.9V6.3Z" fill="white"/>
                  </svg>
                  <span>Shared publicly on LinkedIn</span>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    };

    const cardsHtml = items.map(renderCard).join('');

    if (block.k === 'stories') {
      return `
        <section class="section-ice py-section wp-block-inspect wp-pattern-inspect" 
                 data-wp-block="wp:group {align:'full', backgroundColor:'ice'}" 
                 data-wp-pattern="secure-centric/testimonials-grid">
          <div class="site-container">
            <div class="section-heading-center" style="margin-bottom: 40px;">
              <span class="section-eyebrow">// CLIENT REVIEWS</span>
              <h2>${esc(block.t || 'What Defense Contractors Say About Working With Us')}</h2>
              <p style="color: var(--color-slate); max-width: 600px; margin: 8px auto 0;">Real feedback from C-level executives and IT leadership across the defense industrial base.</p>
            </div>
            <div class="testimonials-static-grid">
              ${cardsHtml}
            </div>
          </div>
        </section>
      `;
    }

    return `
      <section class="section-ice py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {align:'full', backgroundColor:'ice'}" 
               data-wp-pattern="secure-centric/testimonials-carousel"
               id="testimonials-section">
        <div class="site-container">
          <div class="testimonials-header-row">
            <div>
              <span class="section-eyebrow">// ${esc(block.eyebrow || 'CLIENT REVIEWS')}</span>
              <h2>${esc(block.t || 'What Defense Contractors Say About Working With Us')}</h2>
            </div>
          </div>
        </div>

        <div class="testimonials-carousel-container" 
             onmouseenter="this.querySelector('.testimonials-carousel-track')?.classList.add('is-paused')" 
             onmouseleave="this.querySelector('.testimonials-carousel-track')?.classList.remove('is-paused')"
             onclick="this.querySelector('.testimonials-carousel-track')?.classList.toggle('is-paused')">
          <div class="testimonials-carousel-track" role="region" aria-label="Client Testimonials Carousel">
            ${cardsHtml}
            ${cardsHtml}
            ${cardsHtml}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Why Secure-Centric & Proof
   */
  function renderWhy(block) {
    const stats = (block.stats && block.stats.length) ? block.stats : [
      { number: "120+", label: "Defense contractors prepared for CMMC & NIST SP 800-171 audits", date: "As of Q4 2026", color: "blue" },
      { number: "100%", label: "First-time pass record with Authorized C3PAO and DIBCAC assessors", date: "Level 2 CMMC audits", color: "violet" }
    ];

    const reasons = (block.reasons && block.reasons.length) ? block.reasons : [
      {
        title: "Cyber AB Authorized RPO",
        text: "Formally credentialed by the Cyber AB (RPO #3942) with certified Registered Practitioners (RPs) leading every client engagement on site."
      },
      {
        title: "Exclusive CMMC & NIST Focus",
        text: "We do not sell generic IT services or managed antivirus. Our sole specialization is defense cybersecurity compliance and C3PAO audit readiness."
      },
      {
        title: "On-Site Physical & Technical Walkthrough",
        text: "We walk your facilities, shop floors, and secure server rooms to physically map CUI flows and isolate enclave boundaries."
      },
      {
        title: "Independent & Scope-Shrinking Advisory",
        text: "We provide vendor-neutral advisory to shrink your assessment scope, saving tens of thousands in hardware, software, and audit fees."
      }
    ];

    return `
      <section class="section-white py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group" 
               data-wp-pattern="secure-centric/why-proof-badges">
        <div class="site-container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; flex-wrap: wrap; gap: 20px;">
            <div style="max-width: 780px;">
              <span class="section-eyebrow">// PROOF & CREDENTIALS</span>
              <h2 style="margin-bottom: 12px;">${esc(block.t || 'Why Secure-Centric')}</h2>
              <p style="font-size: 1.0625rem; color: var(--color-body-text); line-height: 1.6; margin: 0;">
                Secure-Centric is an accredited Cyber AB Registered Provider Organization (RPO). We help defense subcontractors navigate DFARS 252.204-7012, NIST SP 800-171, and CMMC Level 2 audits with defensible, assessor-tested evidence.
              </p>
            </div>
            <a href="#page-n1" class="text-link" style="white-space: nowrap; font-weight: 700;">Full Company Credentials &rarr;</a>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 32px; align-items: start;">
            <!-- Left Stats Numbers -->
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${stats.map(s => `
                <div class="stats-number-block">
                  <div class="number ${s.color === 'violet' ? 'violet' : ''}">${s.number}</div>
                  <div class="label">${esc(s.label)}</div>
                  <div class="date">${esc(s.date)}</div>
                </div>
              `).join('')}
            </div>

            <!-- Right 4 Reasons Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">
              ${reasons.map(r => `
                <div class="card-white" style="padding: 24px; display: flex; flex-direction: column; gap: 8px;">
                  <div class="card-icon-box" style="width: 36px; height: 36px; font-size: 1.1rem; border-radius: 8px; background: var(--color-soft-blue); color: var(--color-electric-blue); display: flex; align-items: center; justify-content: center;">🛡️</div>
                  <h4 style="font-size: 1.0625rem; margin-top: 4px; color: var(--color-navy);">${esc(r.title)}</h4>
                  <p style="font-size: 0.875rem; color: var(--color-body-text); line-height: 1.55; margin: 0;">${esc(r.text)}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Verified Credentials Bottom Strip -->
          <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--color-slate); font-weight: 700;">Official Badges:</span>
              <span class="badge-chip" style="background: var(--color-soft-blue); color: var(--color-navy); border: 1px solid var(--color-border); font-size: 0.75rem;">🛡️ Cyber AB RPO #3942</span>
              <span class="badge-chip" style="background: var(--color-soft-blue); color: var(--color-navy); border: 1px solid var(--color-border); font-size: 0.75rem;">⭐ Inc. 5000 #452 Fastest Growing</span>
              <span class="badge-chip" style="background: var(--color-soft-blue); color: var(--color-navy); border: 1px solid var(--color-border); font-size: 0.75rem;">🔒 Bilateral NDA Standard</span>
            </div>
            <span style="font-size: 0.8125rem; color: var(--color-slate); font-family: var(--font-mono);">Los Angeles, California · Nationwide On-Site Deployments</span>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: 14 Control Families Tiles (Page 13)
   */
  function renderAccordionTiles(block) {
    const families = [
      { code: "AC", name: "Access Control", count: 22, desc: "Limit information system access to authorized users and devices." },
      { code: "AT", name: "Awareness & Training", count: 3, desc: "Ensure personnel understand cybersecurity risks and CUI safeguarding duties." },
      { code: "AU", name: "Audit & Accountability", count: 9, desc: "Track, record, review, and correlate security actions and logs." },
      { code: "CM", name: "Configuration Management", count: 9, desc: "Establish and maintain baseline configurations and hardware inventories." },
      { code: "IA", name: "Identification & Authentication", count: 11, desc: "Enforce MFA, user identity proofs, and cryptographic credentials." },
      { code: "IR", name: "Incident Response", count: 3, desc: "Detect, analyze, contain, and report cyber incidents to DoD within 72 hours." },
      { code: "MA", name: "Maintenance", count: 6, desc: "Perform scheduled system maintenance with authenticated tools." },
      { code: "MP", name: "Media Protection", count: 8, desc: "Sanitize, mark, and securely transport physical and digital CUI media." },
      { code: "PE", name: "Physical Protection", count: 6, desc: "Escort visitors, protect server rooms, and enforce physical locks." },
      { code: "PS", name: "Personnel Security", count: 2, desc: "Screen individuals before authorizing access to CUI systems." },
      { code: "RA", name: "Risk Assessment", count: 3, desc: "Identify vulnerabilities and perform vulnerability scanning." },
      { code: "CA", name: "Security Assessment", count: 4, desc: "Regularly test controls, maintain SSP, and manage the POA&M." },
      { code: "SC", name: "System & Communications", count: 16, desc: "Enforce network boundary firewalls, FIPS 140-2 encryption, and VPNs." },
      { code: "SI", name: "System & Information Integrity", count: 7, desc: "Deploy antivirus, spam protection, and continuous system monitoring." }
    ];

    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group">
        <div class="site-container">
          <span class="section-eyebrow">// 110 NIST CONTROLS</span>
          <h2>${esc(block.t || 'The 110 Requirements Across 14 Families')}</h2>
          <p style="font-size: 1rem; color: var(--color-body-text); margin-top: 8px;">
            Click on any control family below to see requirement counts and scope objectives tested by C3PAO assessors.
          </p>

          <div class="families-grid">
            ${families.map(f => `
              <div class="family-tile" onclick="alert('Viewing NIST SP 800-171 Family: ${f.name} (${f.count} controls)')">
                <div class="family-tile-header">
                  <span class="family-code">${f.code}</span>
                  <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--color-slate);">${f.count} Controls</span>
                </div>
                <h4 style="font-size: 1.05rem; margin-bottom: 6px;">${f.name}</h4>
                <p style="font-size: 0.8125rem; color: var(--color-body-text); line-height: 1.45; margin: 0;">${f.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Gated Download Form
   */
  function renderForm(block) {
    return `
      <section class="section-white py-section wp-block-inspect" id="download-form" data-wp-block="wp:columns">
        <div class="site-container">
          <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: center;">
            <div>
              <div class="doc-preview-mock" style="padding: 32px;">
                <div class="doc-badge">OFFICIAL DEFENSE CONTRACTOR WORKBOOK</div>
                <h3 style="font-size: 1.35rem; color: var(--color-navy); margin-bottom: 14px;">${esc(block.docTitle || 'CMMC Assessment Workbook')}</h3>
                <div class="doc-skeleton-line"></div>
                <div class="doc-skeleton-line short"></div>
                <div class="doc-skeleton-line medium"></div>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border); font-size: 0.8125rem; color: var(--color-slate);">
                  Includes: Excel Scoring Engine + PDF Field Manual
                </div>
              </div>
            </div>

            <div class="card-white" style="padding: 32px; border: 2px solid var(--color-soft-blue-line);">
              <span class="section-eyebrow" style="font-size: 0.6875rem;">// INSTANT DOWNLOAD ACCESS</span>
              <h3 style="margin-bottom: 10px;">${esc(block.t || 'Download the Compliance Checklist')}</h3>
              <p style="font-size: 0.875rem; color: var(--color-body-text); margin-bottom: 20px;">
                Enter your details below to receive the editable spreadsheet workbook and instructions directly in your inbox.
              </p>
              <form onsubmit="event.preventDefault(); alert('Checklist has been sent to your work email!');">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                  <input type="text" class="form-input" placeholder="First Name" required />
                  <input type="text" class="form-input" placeholder="Last Name" required />
                </div>
                <div style="margin-bottom: 12px;">
                  <input type="text" class="form-input" placeholder="Company / Organization" required />
                </div>
                <div style="margin-bottom: 16px;">
                  <input type="email" class="form-input" placeholder="Corporate Work Email" required />
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Download Now (Free PDF & Excel) &rarr;</button>
                <span style="font-size: 0.6875rem; color: var(--color-slate); display: block; margin-top: 8px; text-align: center;">
                  🔒 We protect your data. No spam, ever.
                </span>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Accordion FAQ
   */
  function renderFAQ(block) {
    return `
      <section class="section-ice py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:details-group" 
               data-wp-pattern="secure-centric/faq-accordion">
        <div class="site-container">
          <div class="faq-grid-layout">
            <div class="faq-intro-col">
              <span class="section-eyebrow">// FREQUENTLY ASKED QUESTIONS</span>
              <h2 style="margin-bottom: 16px;">${esc(block.t)}</h2>
              <p style="color: var(--color-body-text); font-size: 0.9375rem; margin-bottom: 24px;">
                Still have questions regarding your specific CMMC clauses or audit dates? Speak directly with our lead Registered Practitioner.
              </p>
              <a href="#contact" class="btn btn-secondary-outline">Book a Discovery Call &rarr;</a>
            </div>

            <div class="accordion-group">
              ${(block.items || []).map((faq, i) => {
                let qText = '';
                let aText = '';
                if (typeof faq === 'string') {
                  qText = faq;
                  if (faq.toLowerCase().includes('nda')) {
                    aText = 'Yes, absolutely. We sign your company\'s bilateral NDA or provide our standard defense-grade mutual NDA within 2 business hours before any discovery call or review of contract clauses.';
                  } else if (faq.toLowerCase().includes('certify')) {
                    aText = 'No RPO can certify a defense contractor. Under Cyber AB rules, only accredited C3PAOs can issue official Level 2 certifications. As an RPO, Secure-Centric prepares you to pass your assessment with a 100% C3PAO first-time pass rate guarantee.';
                  } else if (faq.toLowerCase().includes('ready') || faq.toLowerCase().includes('information')) {
                    aText = 'Having your prime contract\'s Section I DFARS clauses (e.g. 252.204-7012, 7019, 7020), your high-level network topology, and whether you handle CUI or FCI will make the call most productive.';
                  } else if (faq.toLowerCase().includes('quickly') || faq.toLowerCase().includes('start')) {
                    aText = 'Our lead Registered Practitioners typically conduct on-site discovery walkthroughs within 2 to 3 weeks of signed scope engagement.';
                  } else {
                    aText = 'Please speak with our Lead Registered Practitioner for customized advisory regarding your contract requirements.';
                  }
                } else if (typeof faq === 'object' && faq !== null) {
                  qText = faq.q || faq.question || faq.title || '';
                  aText = faq.a || faq.answer || faq.text || faq.desc || 'Please speak with our Lead Registered Practitioner for customized advisory regarding your contract requirements.';
                }
                if (!qText) qText = 'Defense Contractor Advisory Consultation';
                return `
                  <div class="accordion-item ${i === 0 ? 'active' : ''}">
                    <div class="accordion-header" onclick="window.toggleAccordion(this)">
                      <span class="accordion-title">${esc(qText)}</span>
                      <span class="accordion-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </span>
                    </div>
                    <div class="accordion-content">
                      ${esc(aText)}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Inline Lead Magnet Band
   */
  function renderLeadMagnet(block) {
    const ticks = (block.ticks && block.ticks.length) ? block.ticks : [
      'Line-by-line audit objective breakdown with defense-industry scoring weights',
      'Assessor evidence artifact templates and dual-source verification matrix',
      'Automated SPRS deduction formulas and deficiency priority flags',
      'Executive ownership tracker with target closeout dates for internal teams'
    ];

    return `
      <section class="py-section-sm wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {className:'lead-magnet-block'}" 
               data-wp-pattern="secure-centric/lead-magnet-inline">
        <div class="site-container">
          <div class="lead-magnet-band">
            <div class="lead-magnet-grid">
              <div>
                <span class="section-eyebrow" style="font-size: 0.6875rem;">// FREE DOWNLOADABLE RESOURCE</span>
                <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${esc(block.name)}</h3>
                <ul class="checklist-bullet-list">
                  ${ticks.map(t => `<li>${esc(t)}</li>`).join('')}
                </ul>
              </div>

              <div>
                <div class="doc-preview-mock">
                  <div class="doc-badge">PDF / EXCEL WORKBOOK</div>
                  <div class="doc-title">${esc(block.name)}</div>
                  <div class="doc-skeleton-line"></div>
                  <div class="doc-skeleton-line short"></div>
                  <div class="doc-skeleton-line medium"></div>
                </div>
              </div>

              <div>
                <form onsubmit="event.preventDefault(); alert('Checklist sent! Check your inbox for the download link.');">
                  <div style="margin-bottom: 10px;">
                    <input type="email" class="form-input" placeholder="Enter corporate email address" required />
                  </div>
                  <button type="submit" class="btn btn-primary" style="width: 100%;">Instant Free Download &rarr;</button>
                  <span style="font-size: 0.6875rem; color: var(--color-slate); display: block; margin-top: 6px; text-align: center;">
                    Strictly confidential. No spam guarantee.
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Contact Hero
   */
  function renderContactHero(block, page) {
    return `
      <section class="section-midnight py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:cover {align:'full', backgroundColor:'midnight'}" 
               data-wp-pattern="secure-centric/contact-hero"
               style="border-bottom: 1px solid var(--color-dark-line); position: relative;">
        <div class="site-container">
          <div style="max-width: 860px; margin: 0 auto; text-align: center;">
            <span class="badge-chip dark" style="margin-bottom: 16px;">
              <i class="dot"></i> ${esc(block.eyebrow || 'CYBER AB REGISTERED PROVIDER ORGANIZATION')}
            </span>
            <h1 style="color: var(--color-white); font-size: clamp(2rem, 4vw, 2.75rem); margin-bottom: 20px; line-height: 1.2;">
              ${esc(block.h1 || 'Schedule Your Confidential CMMC Discovery Call')}
            </h1>
            <p style="font-size: 1.125rem; color: var(--color-text-on-dark); line-height: 1.7; margin-bottom: 28px;">
              ${esc(block.sub)}
            </p>
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <span class="badge-chip dark">⏱ 30-Min Scoping Assessment</span>
              <span class="badge-chip dark">🔒 Mutual NDA Signed First</span>
              <span class="badge-chip dark">🏛 Cyber AB RPO #3942</span>
              <span class="badge-chip dark">🚫 Zero Sales Pressure</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Contact Form Section
   */
  function renderContactSection(block) {
    return `
      <section class="section-ice py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:columns" 
               data-wp-pattern="secure-centric/contact-form-split">
        <div class="site-container">
          <div class="contact-grid-split">
            <!-- Left Info Column -->
            <div class="contact-info-panel">
              <span class="section-eyebrow">// DIRECT ENGAGEMENT</span>
              <h2 style="margin-bottom: 16px; font-size: 1.85rem;">Direct Access to Registered Practitioners</h2>
              <p style="color: var(--color-body-text); margin-bottom: 24px; line-height: 1.6;">
                Every discovery call is led directly by an accredited Cyber AB Registered Practitioner (RP), not a generalist salesperson. We review your contract's DFARS 252.204-7012 clauses and help determine your exact scoping boundaries.
              </p>

              <div class="contact-card-box">
                <h4 style="margin-bottom: 14px; font-size: 1.05rem;">Direct Contractor Inquiries</h4>
                <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.9375rem;">
                  <div style="display: flex; gap: 12px; align-items: center;">
                    <span style="font-size: 1.25rem;">📞</span>
                    <div>
                      <b style="color: var(--color-navy);">Phone:</b>
                      <div><a href="tel:323-410-5941" style="color: var(--color-electric-blue); font-weight: 600;">(323) 410-5941</a></div>
                      <small style="color: var(--color-slate);">Mon – Fri: 8:00 AM – 6:00 PM PT</small>
                    </div>
                  </div>
                  <div style="display: flex; gap: 12px; align-items: center;">
                    <span style="font-size: 1.25rem;">✉️</span>
                    <div>
                      <b style="color: var(--color-navy);">Confidential Email:</b>
                      <div><a href="mailto:info@secure-centric.com" style="color: var(--color-electric-blue); font-weight: 600;">info@secure-centric.com</a></div>
                      <small style="color: var(--color-slate);">PGP encryption available upon request</small>
                    </div>
                  </div>
                  <div style="display: flex; gap: 12px; align-items: center;">
                    <span style="font-size: 1.25rem;">📍</span>
                    <div>
                      <b style="color: var(--color-navy);">Location & Coverage:</b>
                      <div>Los Angeles, California</div>
                      <small style="color: var(--color-slate);">On-site facility assessments delivered nationwide</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3-Step Process -->
              <div style="margin-top: 28px;">
                <h4 style="font-size: 1rem; margin-bottom: 14px; color: var(--color-navy);">What Happens After You Request a Call:</h4>
                <div class="contact-step-item">
                  <div class="contact-step-num">1</div>
                  <div>
                    <b>Mutual NDA Execution:</b> We sign a standard bilateral NDA within 2 business hours before discussing any contract details.
                  </div>
                </div>
                <div class="contact-step-item">
                  <div class="contact-step-num">2</div>
                  <div>
                    <b>30-Min Scoping Assessment:</b> We review CUI boundary requirements, your target level (Level 1 vs 2), and existing SPRS scores.
                  </div>
                </div>
                <div class="contact-step-item">
                  <div class="contact-step-num">3</div>
                  <div>
                    <b>Clear Fixed-Scope Roadmap:</b> You receive a written action plan detailing exact deliverables, milestones, and timeline.
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Interactive Form Column -->
            <div class="contact-form-panel">
              <div class="contact-form-card" id="contact-form-container">
                <h3 style="margin-bottom: 8px; font-size: 1.4rem;">Request a Discovery Call</h3>
                <p style="font-size: 0.875rem; color: var(--color-slate); margin-bottom: 20px;">
                  Fields marked with * are required. We strictly respect your privacy.
                </p>

                <form id="expert-contact-form" onsubmit="window.handleContactSubmit(event)">
                  <div class="form-row-2">
                    <div class="form-group">
                      <label class="form-label" for="contact-name">First & Last Name*</label>
                      <input type="text" id="contact-name" class="form-input" placeholder="e.g. John Miller" required />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="contact-email">Work Email (Corporate Domain)*</label>
                      <input type="email" id="contact-email" class="form-input" placeholder="john@defensecontractor.com" required />
                    </div>
                  </div>

                  <div class="form-row-2">
                    <div class="form-group">
                      <label class="form-label" for="contact-phone">Phone Number*</label>
                      <input type="tel" id="contact-phone" class="form-input" placeholder="(555) 000-0000" required />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="contact-company">Company / Organization*</label>
                      <input type="text" id="contact-company" class="form-input" placeholder="e.g. Precision Aerospace LLC" required />
                    </div>
                  </div>

                  <div class="form-row-2">
                    <div class="form-group">
                      <label class="form-label" for="contact-role">Supply Chain Role*</label>
                      <select id="contact-role" class="form-select" required>
                        <option value="">Select your role...</option>
                        <option value="Prime Contractor">Prime Contractor</option>
                        <option value="Subcontractor Tier 1">Subcontractor (Tier 1)</option>
                        <option value="Subcontractor Tier 2+">Subcontractor (Tier 2 or Lower)</option>
                        <option value="Commercial Item Supplier">Commercial Item Supplier</option>
                        <option value="Managed Service Provider">MSP / IT Provider</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="contact-level">Target CMMC Level*</label>
                      <select id="contact-level" class="form-select" required>
                        <option value="Level 2">CMMC Level 2 (110 Controls · CUI)</option>
                        <option value="Level 1">CMMC Level 1 (15 Controls · FCI)</option>
                        <option value="Not Sure">Not Sure — Need Boundary Scoping</option>
                        <option value="NIST 800-171">NIST SP 800-171 / DFARS 7012 Only</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="contact-sprs">Current SPRS Score (Optional)</label>
                    <input type="text" id="contact-sprs" class="form-input" placeholder="e.g. -35, +60, or 'Never Calculated'" />
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="contact-message">How can our Registered Practitioners help you?*</label>
                    <textarea id="contact-message" class="form-textarea" rows="3" placeholder="Tell us about your upcoming contract renewals, DoD deadlines, or primary challenges with NIST SP 800-171." required></textarea>
                  </div>

                  <div style="margin-top: 20px;">
                    <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">
                      Submit Discovery Call Request &rarr;
                    </button>
                  </div>

                  <div style="margin-top: 14px; font-size: 0.75rem; color: var(--color-slate); text-align: center; line-height: 1.4;">
                    🔒 All communications are held under strict confidentiality. We do not sell or share contractor data.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Final Global CTA Band
   */
  function renderFinalCTA(block) {
    return `
      <section class="final-cta-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:group {align:'full', backgroundColor:'electric-blue'}" 
               data-wp-pattern="secure-centric/final-cta-band">
        <div class="site-container">
          <h2>${esc(block.t || 'Planning to get started on CMMC?')}</h2>
          <p>${esc(block.sub || 'Talk with an accredited Cyber AB Registered Provider Organization. Get an actionable first step in writing within 30 minutes.')}</p>
          <div class="final-cta-buttons">
            <a href="#contact" class="btn btn-primary-dark btn-lg">Book a Discovery Call &rarr;</a>
            <a href="tel:323-410-5941" class="btn btn-ghost-dark btn-lg">Call (323) 410-5941</a>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Custom Tables
   */
  function renderTable(block) {
    const rawCols = Array.isArray(block.cols) ? block.cols : (Array.isArray(block.headers) ? block.headers : ['Category / Feature', 'Details', 'Compliance Impact']);
    const cols = rawCols.filter(c => typeof c === 'string');

    let rows = [];
    if (Array.isArray(block.rows)) {
      rows = block.rows.map(r => Array.isArray(r) ? r : (typeof r === 'object' && r !== null ? Object.values(r) : [String(r)]));
    } else {
      const titleLower = (block.t || '').toLowerCase();
      if (titleLower.includes('findings') || titleLower.includes('gap')) {
        rows = [
          ['AC.L2-3.1.1 (Access Control & Boundary Protection)', 'Non-Compliant', 'High (-5 SPRS)', 'Enforce centralized MFA & remove shared admin credentials', 'Lead SecOps Engineer'],
          ['IA.L2-3.5.3 (Multifactor Authentication)', 'Partially Met', 'High (-5 SPRS)', 'Deploy FIPS 140-2 validated hardware tokens across all privileged sessions', 'IT Director'],
          ['SC.L2-3.13.11 (FIPS-Validated Cryptography)', 'Non-Compliant', 'Medium (-3 SPRS)', 'Enable BitLocker with certified FIPS 140-2 cryptographic modules', 'Systems Administrator'],
          ['AU.L2-3.3.1 (Audit Logging & SIEM Review)', 'Compliant', 'Low (0 SPRS)', 'Weekly automated audit log analysis and tamper-proof log forwarding verified', 'Security Analyst']
        ];
      } else if (titleLower.includes('levels') || titleLower.includes('comparison')) {
        rows = [
          ['Target Information Safeguarded', 'Federal Contract Information (FCI)', 'Controlled Unclassified Information (CUI)', 'High-Value Assets & Critical CUI'],
          ['Security Controls Baseline', '15 FAR 52.204-21 Basic Safeguards', '110 NIST SP 800-171 Requirements', '110 NIST SP 800-171 + Select 800-172 Controls'],
          ['Assessment & Audit Mechanism', 'Annual Self-Assessment in SPRS', 'Triennial Independent C3PAO Audit', 'Triennial Government-Led (DIBCAC) Audit'],
          ['Executive Affirmation', 'Annual Affirmation by Corporate Official', 'Annual Executive Affirmation in SPRS', 'Annual Executive Affirmation in SPRS'],
          ['Defense Supply Chain Tier', 'Subcontractors handling FCI only', 'Prime & Subcontractors handling DoD CUI', 'Defense Prime Contractors on critical programs'],
          ['Typical Implementation Timeline', '1 – 2 months', '6 – 9 months', '9 – 14 months']
        ];
      } else {
        const count = typeof block.rows === 'number' ? block.rows : 4;
        rows = Array.from({ length: count }, (_, i) => [
          `Requirement Objective ${i + 1}`,
          `Implemented safeguard verification ${i + 1}`,
          'Compliant',
          'Documented in System Security Plan (SSP)'
        ]);
      }
    }

    return `
      <section class="section-white py-section wp-block-inspect wp-pattern-inspect" 
               data-wp-block="wp:table" 
               data-wp-pattern="secure-centric/data-table">
        <div class="site-container">
          <h3 style="margin-bottom: 20px;">${esc(block.t)}</h3>
          <div class="custom-table-wrap">
            <table class="custom-table">
              <thead>
                <tr>
                  ${cols.map(c => `<th>${esc(c)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${rows.map(row => `
                  <tr>
                    ${row.map(cell => `<td>${esc(cell)}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Main Page Renderer
   */
  
  /**
   * Render Block HTML: Stage Line Bar
   */
  function renderStageLine(block) {
    return `
      <section class="stage-line-bar wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/stage-line">
        <div class="site-container">
          <div class="stage-line-inner">
            <div class="stage-line-left">
              <span class="stage-pill">STAGE</span>
              <span class="stage-name">${esc(block.stage || 'Compliance Phase')}</span>
              <a href="${esc(block.serviceLink || '#page-2')}" class="stage-link">Part of CMMC compliance services &rarr;</a>
            </div>
            <div class="stage-line-right">
              <span class="stage-eyebrow">${esc(block.t || 'Where you fit')}</span>
              <p class="stage-sentence">${esc(block.line || 'You know CMMC applies but need clarity on scoping, timeline, and audit boundaries.')}</p>
              <a href="${esc(block.processLink || '#page-19')}" class="stage-link-subtle">See the full CMMC 8-step process &rarr;</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Steps Horizontal (Row)
   */
  function renderStepsH(block) {
    const steps = block.steps || [];
    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/steps-horizontal">
        <div class="site-container">
          <div class="section-header-center">
            <span class="section-eyebrow">// ENGAGEMENT WORKFLOW</span>
            <h2 style="margin-bottom: 16px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); max-width: 680px; margin: 0 auto 36px;">${esc(block.n || 'A structured, predictable path to verifiable defense compliance with zero surprises.')}</p>
          </div>
          <div class="steps-horizontal-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
            ${steps.map((st, i) => `
              <div class="step-h-card">
                <div class="step-h-num">${esc(st.no || String(i + 1).padStart(2, '0'))}</div>
                <h4 class="step-h-title">${esc(st.title || st.name)}</h4>
                <p class="step-h-desc">${esc(st.desc || st.text || '')}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Steps Vertical (Table/List)
   */
  function renderStepsV(block) {
    const steps = block.steps || [];
    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/steps-vertical">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 32px;">
            <span class="section-eyebrow">// DETAILED REVIEW STAGES</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem;">${esc(block.n || 'Every activity, team participant, and tangible deliverable produced during this review.')}</p>
          </div>
          <div class="steps-v-container">
            <div class="steps-v-header-row">
              <span style="width: 48px;">#</span>
              <span style="flex: 1.2;">Review Activity</span>
              <span style="flex: 1.5;">Who Is Involved</span>
              <span style="flex: 1.5;">What You Leave With</span>
            </div>
            ${steps.map(st => `
              <div class="steps-v-row">
                <div class="steps-v-num">${esc(st.step || st.no)}</div>
                <div class="steps-v-name"><b>${esc(st.name || st.title)}</b></div>
                <div class="steps-v-who"><span class="chip-sm">${esc(st.who)}</span></div>
                <div class="steps-v-output"><strong>${esc(st.output)}</strong></div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Two Column Comparison
   */
  function renderTwoCol(block) {
    const col1 = block.col1 || { title: 'Option A', desc: '', items: [] };
    const col2 = block.col2 || { title: 'Option B', desc: '', items: [] };
    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:columns" data-wp-pattern="secure-centric/two-col-compare">
        <div class="site-container">
          <div class="section-header-center" style="margin-bottom: 40px;">
            <span class="section-eyebrow">// OBJECTIVE COMPARISON</span>
            <h2>${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); max-width: 700px; margin: 12px auto 0;">${esc(block.n || 'Understanding the fundamental regulatory distinctions to make informed compliance decisions.')}</p>
          </div>
          <div class="two-col-grid">
            <div class="two-col-card left-card">
              <div class="two-col-header">
                <h3>${esc(col1.title)}</h3>
                <p>${esc(col1.desc)}</p>
              </div>
              <ul class="two-col-list">
                ${(col1.items || []).map(it => `
                  <li>
                    <svg class="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>${esc(it)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div class="two-col-card right-card">
              <div class="two-col-header">
                <h3>${esc(col2.title)}</h3>
                <p>${esc(col2.desc)}</p>
              </div>
              <ul class="two-col-list">
                ${(col2.items || []).map(it => `
                  <li>
                    <svg class="check-icon-blue" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    <span>${esc(it)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Bullets Feature Card Grid
   */
  function renderBullets(block) {
    let items = block.items || [];
    if (!items.length) {
      const tLower = (block.t || '').toLowerCase();
      if (tLower.includes('signs') || tLower.includes('need a cmmc consultant')) {
        items = [
          { title: "Unknown or Negative SPRS Score", desc: "Your DoD score is blank, stale, or below 0 in the Supplier Performance Risk System, disqualifying your company from upcoming awards." },
          { title: "Generic Template SSP in Place", desc: "System Security Plan was downloaded from the internet without site-specific scoping, network topology maps, or evidence links." },
          { title: "Unassigned POA&M Open Items", desc: "Corrective actions lack dedicated internal owners, realistic resource budgets, or committed 180-day milestone close dates." },
          { title: "Urgent Prime Contractor Inquiries", desc: "Defense prime contractors (Lockheed, Boeing, Northrop, etc.) are issuing 30-day compliance verification questionnaires." },
          { title: "DFARS 7021 Solicitation Clauses", desc: "Department of War bids explicitly mandate CMMC Level 2 certification prior to contract award, and no roadmap exists." },
          { title: "No Internal Full-Time Security Lead", desc: "IT staff is overwhelmed managing day-to-day operations and needs expert external RPs to handle DoD documentation." }
        ];
      } else if (tLower.includes('level 2 requires') || tLower.includes('requires')) {
        items = [
          { title: "110 NIST SP 800-171 Requirements", desc: "Rigorous operational implementation across all 14 security families, fulfilling all 320 assessment objectives in NIST SP 800-171A." },
          { title: "Triennial Independent C3PAO Audit", desc: "Formal on-site and remote evaluation conducted by an Authorized Third-Party Assessment Organization accredited by the Cyber AB." },
          { title: "Assessor-Ready System Security Plan", desc: "Detailed, defensible documentation detailing how every technical and physical safeguard operates inside your CUI boundary." },
          { title: "Strict Time-Bound POA&M Rules", desc: "Plan of Action allowed only for eligible 1-point controls; high-weight (-5 and -3) controls must be 100% remediated prior to audit." },
          { title: "Annual Executive SPRS Affirmation", desc: "Corporate executive must formally sign and submit an annual affirmation of continuing cybersecurity compliance." }
        ];
      } else if (tLower.includes('what we do for nist') || tLower.includes('nist sp 800-171')) {
        items = [
          { title: "Defensible SPRS Score Calculation", desc: "Accurate point calculations adhering strictly to DoD Assessment Methodology, eliminating False Claims Act liability." },
          { title: "On-Site Facility & Network Scoping", desc: "Physical walkthroughs of server closets, manufacturing floors, and endpoints to draw enforceable CUI boundaries." },
          { title: "Complete SSP & Policy Generation", desc: "Custom, assessor-grade System Security Plan and 14 operational security policies tailored directly to your team." },
          { title: "Annual SPRS Maintenance & Reaffirmation", desc: "Ongoing compliance tracking to ensure annual corporate affirmations remain accurate as systems evolve." }
        ];
      } else if (tLower.includes('receive from') || tLower.includes('receive during') || tLower.includes('receive')) {
        items = [
          { title: "Defensible SPRS Scorecard & Findings Matrix", desc: "Line-by-line evaluation of all 110 requirements with weighted point deductions and risk priorities." },
          { title: "CUI Flow Diagrams & Scoping Boundary Maps", desc: "Architectural schematics defining where CUI is received, stored, processed, and transmitted." },
          { title: "Prioritized Remediation Roadmap & Budget", desc: "Sequenced action plan highlighting fast-turn fixes, required hardware/software tokens, and budget estimates." },
          { title: "Assessor Evidence Collection Binder Index", desc: "Structured repository templates organizing screenshots, log exports, and policies for C3PAO evaluation." }
        ];
      } else if (tLower.includes('how we work')) {
        items = [
          { title: "Independent Advisory Only", desc: "We are Registered Provider Organizations (RPOs), not C3PAO assessors. We never audit the defense clients we advise." },
          { title: "On Site by Default", desc: "Real cybersecurity scoping requires physical inspection of buildings, employee workstations, and air-gapped enclaves." },
          { title: "Plain English, Zero FUD", desc: "We explain DoD requirements without cybersecurity jargon, fearmongering, or aggressive sales tactics." },
          { title: "Practical Scope Minimization", desc: "Our primary objective is isolating your CUI so you only need to audit a fraction of your corporate network." }
        ];
      } else {
        items = [
          { title: "Targeted Gap Identification", desc: "Audit Day verification ensuring every safeguard is operational and backed by dual evidence artifacts." },
          { title: "Scope Isolation & Segmentation", desc: "Segregating CUI networks and servers to drastically minimize assessment boundary costs." },
          { title: "Full Regulatory Defensibility", desc: "Policies, procedures, and implementation notes mapped directly to NIST SP 800-171A objectives." },
          { title: "Continuous Compliance Management", desc: "Ongoing support to maintain audit readiness between triennial C3PAO evaluation cycles." }
        ];
      }
    }

    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/bullets-grid">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 36px;">
            <span class="section-eyebrow">// CORE PRINCIPLES & INDICATORS</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem;">${esc(block.n || 'Defensible execution standards grounded in DoD cybersecurity regulations.')}</p>
          </div>
          <div class="bullets-grid">
            ${items.map(it => `
              <div class="bullet-card">
                <div class="bullet-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4 style="margin-bottom: 8px; color: var(--color-navy); font-size: 1.1rem;">${esc(it.title || it)}</h4>
                  <p style="color: var(--color-body-text); font-size: 0.9375rem; line-height: 1.6;">${esc(it.desc || '')}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: TextGroup (Long-Form Repeating Explainer)
   */
  function renderTextGroup(block) {
    let sections = block.sections || [];
    if (!sections.length) {
      sections = [
        {
          title: "Scoping Boundaries & CUI Network Isolation",
          paragraphs: [
            "Under DoD 32 CFR 170.19, scoping is the single most critical factor determining compliance costs and timeline. An uncontrolled network boundary brings every corporate computer, server, and IoT device into audit scope.",
            "Our Registered Practitioners conduct physical on-site inspections of facility cabling, server racks, and workcenters to establish isolated enclaves—dramatically reducing the systems that an Authorized C3PAO must examine."
          ]
        },
        {
          title: "Technical Safeguards & FIPS-Validated Cryptography",
          paragraphs: [
            "NIST SP 800-171 requires multifactor authentication (IA.L2-3.5.3) for all local and network access to privileged and non-privileged accounts, alongside FIPS 140-2 validated encryption (SC.L2-3.13.11).",
            "We guide your IT team and MSP through configuring cryptographic modules, centralizing SIEM audit log collection, and deploying hardware tokens that assessors accept without objection."
          ]
        },
        {
          title: "Assessor Evidence Binder & Mock Audit Simulation",
          paragraphs: [
            "A System Security Plan (SSP) is only as defensible as the operational evidence behind it. For all 320 assessment objectives, C3PAO assessors require examination, interview, and test evidence.",
            "Secure-Centric builds your comprehensive Assessor Evidence Binder and conducts a rigorous dress-rehearsal mock audit, ensuring your engineers and leadership speak with confidence on assessment day."
          ]
        }
      ];
    }

    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/textgroup-deepdive">
        <div class="site-container" style="max-width: 960px;">
          <div class="section-header-left" style="margin-bottom: 40px;">
            <span class="section-eyebrow">// COMPREHENSIVE COMPLIANCE ANALYSIS</span>
            <h2 style="margin-bottom: 16px;">${esc(block.t || 'Long-Form Regulatory Analysis')}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem; line-height: 1.7;">${esc(block.n || 'Explanations of requirements, timelines, and assessor expectations.')}</p>
          </div>
          <div class="textgroup-list">
            ${sections.map((sec, i) => `
              <div class="textgroup-item">
                <h3 class="textgroup-title"><span class="textgroup-num">§ ${i + 1}</span> ${esc(sec.title)}</h3>
                ${(sec.paragraphs || []).map(p => `
                  <p class="textgroup-para">${esc(p)}</p>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Related Pages 4-Card Strip
   */
  function renderRelated(block) {
    let pages = block.pages || [];
    if (!pages.length) {
      pages = [
        { title: "CMMC Consulting by Role", desc: "Tailored roadmaps for executives, IT leaders, and defense supplier tiers.", url: "#page-3" },
        { title: "CMMC Readiness Assessment", desc: "In-person facility inspection, asset discovery, and defensible SPRS baseline.", url: "#page-4" },
        { title: "CMMC Enclave Advisory", desc: "Segregate CUI in a compliant enclave to cut 70%+ of assessment costs.", url: "#page-16" },
        { title: "CMMC Complete Guide", desc: "Authoritative handbook on 32 CFR Part 170 rules, levels, and audit timelines.", url: "#page-12" }
      ];
    }

    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:columns" data-wp-pattern="secure-centric/related-pages">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 32px;">
            <span class="section-eyebrow">// KNOWLEDGE ECOSYSTEM</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t || 'Related Compliance Resources')}</h2>
            <p style="color: var(--color-body-text); font-size: 1rem;">Explore related compliance frameworks, staging guides, and scoping resources.</p>
          </div>
          <div class="related-pages-grid">
            ${pages.map(p => `
              <a href="${esc(p.url)}" class="related-page-card">
                <div class="related-card-top">
                  <span class="related-badge">Guide</span>
                  <span class="related-arrow">&rarr;</span>
                </div>
                <h4 class="related-title">${esc(p.title)}</h4>
                <p class="related-desc">${esc(p.desc)}</p>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Numbers4 Key Stats Band
   */
  function renderNumbers4(block) {
    const stats = block.stats || [];
    return `
      <section class="numbers4-band-wrap wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/numbers4-stats">
        <div class="site-container">
          <div class="section-header-center" style="margin-bottom: 36px;">
            <span class="section-eyebrow">// VERIFIED DEFENSE METRICS</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); max-width: 600px; margin: 0 auto;">CMMC compliance numbers grounded in Department of War regulatory criteria.</p>
          </div>
          <div class="numbers4-grid">
            ${stats.map(st => `
              <div class="num4-card">
                <div class="num4-big">${esc(st.num)}</div>
                <div class="num4-label">${esc(st.label)}</div>
                <p class="num4-desc">${esc(st.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Results / Numbers Block
   */
  function renderNumbers(block) {
    const items = block.items || [];
    return `
      <section class="section-midnight py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/results-numbers" style="background-color: var(--color-midnight); color: var(--color-white);">
        <div class="site-container">
          <div class="section-header-center" style="margin-bottom: 40px;">
            <span class="section-eyebrow dark">// VERIFIED TRACK RECORD</span>
            <h2 style="color: var(--color-white); margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-slate); max-width: 640px; margin: 0 auto;">100% C3PAO first-time pass record across defense primes and subcontractors nationwide.</p>
          </div>
          <div class="numbers-results-grid">
            <div class="result-box">
              <div class="result-number cyan-highlight">120+</div>
              <div class="result-title">Defense Contractors Prepared</div>
              <p class="result-sub">Guided across 45 states protecting $2.4B in active DoD solicitations.</p>
            </div>
            <div class="result-box">
              <div class="result-number cyan-highlight">100%</div>
              <div class="result-title">C3PAO First-Time Pass Rate</div>
              <p class="result-sub">Zero clients failed an official external third-party audit after readiness sign-off.</p>
            </div>
            <div class="result-box">
              <div class="result-number cyan-highlight">3 Weeks</div>
              <div class="result-title">On-Site Walkthrough Guarantee</div>
              <p class="result-sub">In-person facility inspection of server rooms and shop-floor enclaves.</p>
            </div>
            <div class="result-box">
              <div class="result-number cyan-highlight">Flat-Fee</div>
              <div class="result-title">Fixed Transparent Scope</div>
              <p class="result-sub">Zero hourly billing surprises, travel markups, or tool licensing kickbacks.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Topic Cluster Grid
   */
  function renderCluster(block) {
    const links = block.links || [];
    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/topic-cluster">
        <div class="site-container">
          <div class="section-header-center" style="margin-bottom: 36px;">
            <span class="section-eyebrow">// TOPIC CLUSTER</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); max-width: 600px; margin: 0 auto;">Cross-linked compliance pillars, assessment staging, and implementation guides.</p>
          </div>
          <div class="topic-cluster-grid">
            ${links.map(l => `
              <a href="${esc(l.url)}" class="cluster-link-pill">
                <span>${esc(l.label)}</span>
                <span class="cluster-arrow">&rarr;</span>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Freshness & Primary Sources
   */
  function renderFresh(block) {
    const sources = block.sources || [];
    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/freshness-sources">
        <div class="site-container">
          <div class="freshness-card">
            <div class="freshness-header">
              <div>
                <span class="section-eyebrow">// REGULATORY CITATIONS</span>
                <h3 style="margin-bottom: 8px; color: var(--color-navy);">${esc(block.t)}</h3>
                <p style="color: var(--color-body-text); font-size: 0.9375rem;">Last formally reviewed and verified against DoD acquisition rulemaking: <strong>${esc(block.updated || 'November 2026')}</strong>.</p>
              </div>
              <div class="verified-seal">
                <span class="pulse-dot"></span>
                <span>Active 32 CFR 170 Rule</span>
              </div>
            </div>
            <div class="sources-list">
              ${sources.map(s => `
                <a href="${esc(s.url)}" target="_blank" rel="noopener" class="source-item-row">
                  <span class="source-icon">🏛️</span>
                  <span class="source-name">${esc(s.name)}</span>
                  <span class="source-link-out">View Official Government Source &nearr;</span>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Architectural / Scoping Diagram
   */
  function renderDiagram(block) {
    const steps = block.steps || [];
    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/boundary-diagram">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 32px;">
            <span class="section-eyebrow">// BOUNDARY SEGREGATION</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem;">Data flow path defining CUI entry, processing, storage, and physical facility boundaries.</p>
          </div>
          <div class="diagram-flow-box">
            <div class="diagram-flow-grid">
              ${steps.map((st, i) => `
                <div class="diagram-node">
                  <div class="diagram-node-num">0${i + 1}</div>
                  <h4>${esc(st.label)}</h4>
                  <p>${esc(st.desc)}</p>
                </div>
                ${i < steps.length - 1 ? '<div class="diagram-connector">&rarr;</div>' : ''}
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: IconBox (On-Site Walkthrough Highlight)
   */
  function renderIconBox(block) {
    const points = block.points || [];
    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/iconbox-highlight">
        <div class="site-container">
          <div class="iconbox-card">
            <div class="iconbox-header">
              <div class="iconbox-symbol">🏢</div>
              <div>
                <span class="section-eyebrow">// IN-PERSON VERIFICATION</span>
                <h3 style="margin-bottom: 10px; color: var(--color-navy);">${esc(block.t)}</h3>
                <p style="font-size: 1.0625rem; color: var(--color-navy); font-weight: 600;">${esc(block.lead)}</p>
              </div>
            </div>
            <div class="iconbox-points-grid">
              ${points.map(pt => `
                <div class="iconbox-point">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>${esc(pt)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Audience Pathways (Paths)
   */
  function renderPaths(block) {
    const items = block.items || [];
    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/audience-paths">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 36px;">
            <span class="section-eyebrow">// DEFENSE SUPPLY CHAIN PATHS</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem;">Sequential milestones tailored to your exact role in the Defense Industrial Base.</p>
          </div>
          <div class="pathways-list">
            ${items.map(it => `
              <div class="pathway-card">
                <div class="pathway-info">
                  <h4>${esc(it.name)}</h4>
                  <p>${esc(it.desc)}</p>
                </div>
                <div class="pathway-chips">
                  ${(it.steps || []).map((step, idx) => `
                    <span class="path-chip ${idx === (it.steps || []).length - 1 ? 'final' : ''}">
                      <span class="path-num">${idx + 1}.</span> ${esc(step)}
                    </span>
                    ${idx < (it.steps || []).length - 1 ? '<span class="path-sep">&rarr;</span>' : ''}
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Defense Industrial Base Tiers (DIB)
   */
  function renderDIB(block) {
    const items = block.items || [];
    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/dib-supply-chain">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 36px;">
            <span class="section-eyebrow">// DEFENSE INDUSTRIAL BASE (DIB)</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem;">Where defense contractors sit in the DoD supply chain and what triggers compliance.</p>
          </div>
          <div class="dib-grid">
            ${items.map(it => `
              <div class="dib-card">
                <div class="dib-badge">${esc(it.role)}</div>
                <div class="dib-field">
                  <span class="dib-label">Typical Trigger:</span>
                  <p>${esc(it.trigger)}</p>
                </div>
                <div class="dib-field">
                  <span class="dib-label">Target Level:</span>
                  <p><strong>${esc(it.level)}</strong></p>
                </div>
                <div class="dib-field">
                  <span class="dib-label">First Action:</span>
                  <p>${esc(it.firstStep)}</p>
                </div>
                <a href="#contact" class="text-link" style="margin-top: 12px; display: inline-block;">Explore Your Path &rarr;</a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Interactive Tool (7 Checks Scorer)
   */
  function renderTool(block) {
    const checks = block.checks || [];
    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/consultant-scorer">
        <div class="site-container">
          <div class="section-header-center" style="margin-bottom: 36px;">
            <span class="section-eyebrow">// DECISION FRAMEWORK</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); max-width: 650px; margin: 0 auto;">Check every qualification before engaging any CMMC advisory firm.</p>
          </div>
          <div class="tool-scorer-card">
            <div class="scorer-list">
              ${checks.map((c, i) => `
                <label class="scorer-item">
                  <input type="checkbox" checked disabled class="scorer-check" />
                  <span class="scorer-label"><strong>0${i + 1}.</strong> ${esc(c.label)}</span>
                  <span class="scorer-status-pass">&check; Secure-Centric Verified</span>
                </label>
              `).join('')}
            </div>
            <div class="scorer-result-box">
              <div class="scorer-score-circle">
                <span class="score-val">7 / 7</span>
                <span class="score-sub">Full Compliance</span>
              </div>
              <h4>100% Verified CMMC Advisory Standard</h4>
              <p style="color: var(--color-body-text); font-size: 0.9375rem; margin-bottom: 18px;">
                Secure-Centric satisfies all 7 rigorous criteria: Cyber AB RPO accreditation, active Registered Practitioners, on-site audits, 100% independent conflict-free advice, flat-fee pricing, and guaranteed readiness.
              </p>
              <a href="#contact" class="btn btn-primary" style="width: 100%; text-align: center;">Book a Discovery Call &rarr;</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Definition Callout
   */
  function renderDefinition(block) {
    const points = block.points || [];
    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/definition-callout">
        <div class="site-container">
          <div class="definition-card">
            <span class="section-eyebrow">// COMPLIANCE ARTIFACT DEFINITION</span>
            <h2 style="margin-bottom: 16px; color: var(--color-navy);">${esc(block.t)}</h2>
            <p class="definition-desc">${esc(block.desc)}</p>
            <div class="definition-points">
              ${points.map(pt => `
                <div class="def-point-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>${esc(pt)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Checklist Preview Table
   */
  function renderChecklistPreview(block) {
    const rows = block.rows || [];
    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:table" data-wp-pattern="secure-centric/checklist-preview">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 32px;">
            <span class="section-eyebrow">// SAMPLE SPREADSHEET ARTIFACT</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem;">A preview of the columns, assessment objectives, and evidence fields included in the downloadable resource.</p>
          </div>
          <div class="table-responsive-wrapper">
            <table class="site-data-table">
              <thead>
                <tr>
                  <th>Req ID</th>
                  <th>Domain Family</th>
                  <th>Assessment Objective</th>
                  <th>Status</th>
                  <th>Assigned Owner</th>
                  <th>Evidence Artifact</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map(r => `
                  <tr>
                    <td><strong>${esc(r.req)}</strong></td>
                    <td>${esc(r.family)}</td>
                    <td>${esc(r.objective)}</td>
                    <td><span class="status-chip ${r.status === 'Implemented' ? 'green' : 'amber'}">${esc(r.status)}</span></td>
                    <td>${esc(r.owner)}</td>
                    <td><span class="evidence-link">${esc(r.evidence)}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: HowTo Action Steps
   */
  function renderHowTo(block) {
    const steps = block.steps || [];
    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/howto-guide">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 36px;">
            <span class="section-eyebrow">// VERIFICATION PROCEDURE</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem;">Protect your company from unqualified consultants by verifying accreditation directly on the official Cyber AB registry.</p>
          </div>
          <div class="howto-grid">
            ${steps.map(st => `
              <div class="howto-card">
                <div class="howto-num">${esc(st.no)}</div>
                <h4 style="margin-bottom: 10px; color: var(--color-navy);">${esc(st.title)}</h4>
                <p style="color: var(--color-body-text); font-size: 0.9375rem; line-height: 1.6;">${esc(st.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: People / Leadership Team
   */
  function renderPeople(block) {
    const items = block.items || [];
    return `
      <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/leadership-team">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 40px;">
            <span class="section-eyebrow">// DEFENSE SPECIALISTS</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem;">Accredited Cyber AB Registered Practitioners with decades of technical engineering and audit defense experience.</p>
          </div>
          <div class="team-grid">
            ${items.map(p => `
              <div class="team-card">
                <div class="team-avatar-box">
                  <div class="team-initials">${esc(p.initials || 'RP')}</div>
                  <span class="team-rpo-badge">&check; Cyber AB RP</span>
                </div>
                <h3 class="team-name">${esc(p.name)}</h3>
                <div class="team-role">${esc(p.role)}</div>
                <p class="team-bio">${esc(p.bio)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Block HTML: Badge Line
   */
  function renderBadge(block) {
    return `
      <div class="badge-line-strip wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/accreditation-badge">
        <div class="site-container">
          <div class="badge-line-inner">
            <span class="badge-shield">🛡️ Cyber AB Registered Provider Organization &middot; CPN #3942</span>
            <span class="badge-meta">Formally Reviewed: November 2026 &middot; 32 CFR 170 Compliant</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Block HTML: Tiles (14 NIST Control Families)
   */
  function renderTiles(block) {
    const families = [
      { code: 'AC', name: 'Access Control', count: '22 Controls' },
      { code: 'AT', name: 'Awareness & Training', count: '3 Controls' },
      { code: 'AU', name: 'Audit & Accountability', count: '9 Controls' },
      { code: 'CM', name: 'Configuration Mgmt', count: '9 Controls' },
      { code: 'IA', name: 'Identification & Auth', count: '11 Controls' },
      { code: 'IR', name: 'Incident Response', count: '3 Controls' },
      { code: 'MA', name: 'Maintenance', count: '6 Controls' },
      { code: 'MP', name: 'Media Protection', count: '8 Controls' },
      { code: 'PS', name: 'Personnel Security', count: '2 Controls' },
      { code: 'PE', name: 'Physical Protection', count: '6 Controls' },
      { code: 'RA', name: 'Risk Assessment', count: '3 Controls' },
      { code: 'CA', name: 'Security Assessment', count: '4 Controls' },
      { code: 'SC', name: 'System & Comms', count: '16 Controls' },
      { code: 'SI', name: 'System & Info Integrity', count: '7 Controls' }
    ];
    return `
      <section class="section-ice py-section wp-block-inspect" data-wp-block="wp:group" data-wp-pattern="secure-centric/14-control-families">
        <div class="site-container">
          <div class="section-header-left" style="margin-bottom: 36px;">
            <span class="section-eyebrow">// 110 CONTROLS IN 14 FAMILIES</span>
            <h2 style="margin-bottom: 12px;">${esc(block.t)}</h2>
            <p style="color: var(--color-body-text); font-size: 1.05rem;">The complete NIST SP 800-171 Rev 2 security control architecture required for CMMC Level 2.</p>
          </div>
          <div class="families-grid">
            ${families.map(f => `
              <div class="family-card">
                <div class="family-code">${f.code}</div>
                <div class="family-name">${f.name}</div>
                <div class="family-count">${f.count}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderCurrentPage() {
    if (!mainAppContainer) return;
    const page = getPage(currentPageId);
    if (!page) return;

    // Update Browser Document Title
    document.title = `${page.title} | Secure-Centric`;

    // Sync HUD Select
    if (pageSelectDropdown) pageSelectDropdown.value = page.id;

    // Render Blocks
    let contentHtml = '';
    page.blocks.forEach(block => {
      switch (block.k) {
        case 'hero_home':
          contentHtml += renderHeroHome(block, page);
          break;
        case 'hero_service':
          contentHtml += renderHeroService(block, page);
          break;
        case 'hero_icp':
          contentHtml += renderHeroICP(block, page);
          break;
        case 'hero_guide':
          contentHtml += renderHeroGuide(block, page);
          break;
        case 'hero_split':
          contentHtml += renderHeroSplit(block, page);
          break;
        case 'hero_center':
          contentHtml += renderHeroCenter(block, page);
          break;
        case 'logos':
          contentHtml += renderLogos(block);
          break;
        case 'journey':
          contentHtml += renderJourney(block);
          break;
        case 'quotes':
        case 'stories':
          contentHtml += renderQuotes(block);
          break;
        case 'why':
          contentHtml += renderWhy(block);
          break;
        case 'phases':
          contentHtml += renderPhases(block);
          break;
        case 'compare_cards':
          contentHtml += renderCompareCards(block);
          break;
        case 'tiers':
          contentHtml += renderTiers(block);
          break;
        case 'personas':
          contentHtml += renderPersonas(block);
          break;
        case 'accordion_tiles':
          contentHtml += renderAccordionTiles(block);
          break;
        case 'form':
          contentHtml += renderForm(block);
          break;
        case 'faq':
          contentHtml += renderFAQ(block);
          break;
        case 'lead':
          contentHtml += renderLeadMagnet(block);
          break;
        case 'cta':
          contentHtml += renderFinalCTA(block);
          break;
        case 'contact_hero':
          contentHtml += renderContactHero(block, page);
          break;
        case 'contact_section':
          contentHtml += renderContactSection(block);
          break;
        case 'table':
          contentHtml += renderTable(block);
          break;
        case 'stageline':
          contentHtml += renderStageLine(block);
          break;
        case 'steps_h':
          contentHtml += renderStepsH(block);
          break;
        case 'steps_v':
          contentHtml += renderStepsV(block);
          break;
        case 'two_col':
          contentHtml += renderTwoCol(block);
          break;
        case 'bullets':
          contentHtml += renderBullets(block);
          break;
        case 'textgroup':
          contentHtml += renderTextGroup(block);
          break;
        case 'related':
          contentHtml += renderRelated(block);
          break;
        case 'numbers4':
          contentHtml += renderNumbers4(block);
          break;
        case 'numbers':
          contentHtml += renderNumbers(block);
          break;
        case 'cluster':
          contentHtml += renderCluster(block);
          break;
        case 'fresh':
          contentHtml += renderFresh(block);
          break;
        case 'diagram':
          contentHtml += renderDiagram(block);
          break;
        case 'iconbox':
          contentHtml += renderIconBox(block);
          break;
        case 'paths':
          contentHtml += renderPaths(block);
          break;
        case 'dib':
          contentHtml += renderDIB(block);
          break;
        case 'tool':
          contentHtml += renderTool(block);
          break;
        case 'definition':
          contentHtml += renderDefinition(block);
          break;
        case 'preview':
          contentHtml += renderChecklistPreview(block);
          break;
        case 'howto':
          contentHtml += renderHowTo(block);
          break;
        case 'people':
          contentHtml += renderPeople(block);
          break;
        case 'badge':
          contentHtml += renderBadge(block);
          break;
        case 'tiles':
          contentHtml += renderTiles(block);
          break;
        case 'toc':
          const tocLinks = [
            { label: 'Scoping & Boundaries', anchor: '#scoping' },
            { label: 'The 14 Control Families', anchor: '#families' },
            { label: 'SPRS Scoring Methodology', anchor: '#sprs' },
            { label: 'Technical Remediation & Enclaves', anchor: '#enclaves' },
            { label: 'SSP & Policy Documentation', anchor: '#ssp' },
            { label: 'C3PAO Audit Day Readiness', anchor: '#audit' }
          ];
          contentHtml += `
            <section class="section-ice py-section-sm wp-block-inspect" data-wp-block="wp:group {className:'on-this-page-toc'}" style="background-color: var(--color-ice); border-bottom: 1px solid var(--color-border); padding: 18px 0;">
              <div class="site-container">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--color-electric-blue); background: var(--color-soft-blue); padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(47,91,255,0.2);">📑 ${esc(block.t || 'On This Page')}</span>
                    <span style="font-size: 0.875rem; color: var(--color-body-text); font-weight: 600;">Jump to section:</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    ${tocLinks.map(l => `
                      <a href="${l.anchor}" class="hud-btn" style="background: var(--color-white); border: 1px solid var(--color-border); color: var(--color-navy); padding: 5px 12px; font-size: 0.8125rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s ease;">
                        ${l.label} &darr;
                      </a>
                    `).join('')}
                  </div>
                </div>
              </div>
            </section>
          `;
          break;
        case 'cards':
          const cardItems = block.items || [
            { title: 'CMMC Complete Guide', text: 'The definitive executive and technical overview of CMMC levels, rulemaking, and audits.', link: '#page-12' },
            { title: 'CMMC Level 2 Guide', text: '110 requirements across 14 security families: technical breakdown and scoping rules.', link: '#page-13' },
            { title: 'NIST SP 800-171 Standard', text: 'The foundational standard behind DFARS 7012 and Level 2 C3PAO certifications.', link: '#page-14' },
            { title: 'CUI Scoping & Handling Guide', text: 'Controlled Unclassified Information: identification, markings, and boundary isolation.', link: '#page-15' },
            { title: 'CMMC Enclave Advisory', text: 'How segregating your CUI network saves months of implementation and audit costs.', link: '#page-16' },
            { title: 'Level 2 Compliance Checklist', text: 'Downloadable 110-control Excel checklist with ownership and objective columns.', link: '#page-21' }
          ];
          contentHtml += `
            <section class="section-white py-section wp-block-inspect" data-wp-block="wp:columns">
              <div class="site-container">
                <h3 style="margin-bottom: 24px;">${esc(block.t)}</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                  ${cardItems.map(card => `
                    <div class="card-white">
                      <div class="card-icon-box">📁</div>
                      <h4>${esc(card.title || card)}</h4>
                      <p style="font-size: 0.875rem; color: var(--color-body-text); margin: 8px 0 16px;">${esc(card.text || card.desc || 'Accredited advisory guidance and deliverable frameworks.')}</p>
                      <a href="${card.link || card.url || '#page-12'}" class="text-link">Explore Resource &rarr;</a>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>
          `;
          break;
        case 'text':
          let textParas = [];
          if (Array.isArray(block.paras)) {
            textParas = block.paras;
          } else if (typeof block.paras === 'number') {
            textParas = [
              'CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense subcontractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI).',
              'Under 32 CFR Part 170 and DFARS 252.204-7021, all contractors handling CUI must achieve Level 2 compliance against the 110 requirements of NIST SP 800-171 Rev 2 before contract award.',
              'Our Cyber AB Registered Practitioners conduct on-site facility walkthroughs, map exact CUI boundaries, guide technical remediation, and co-author your assessor-ready System Security Plan (SSP).'
            ].slice(0, block.paras);
          } else if (typeof block.desc === 'string') {
            textParas = [block.desc];
          } else if (typeof block.n === 'string') {
            textParas = [block.n];
          } else {
            textParas = ['Comprehensive compliance guidance tailored to your defense contract specifications and operational scope.'];
          }
          contentHtml += `
            <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group">
              <div class="site-container" style="max-width: 900px;">
                <span class="section-eyebrow">// SECTION EXPLAINER</span>
                <h2 style="margin-bottom: 20px;">${esc(block.t)}</h2>
                ${textParas.map(p => `<p style="font-size: 1.0625rem; line-height: 1.7; color: var(--color-body-text); margin-bottom: 16px;">${esc(p)}</p>`).join('')}
              </div>
            </section>
          `;
          break;
        default:
          contentHtml += `
            <section class="section-white py-section wp-block-inspect" data-wp-block="wp:group {className:'${block.k}'}">
              <div class="site-container">
                <span class="section-eyebrow">// ${esc(block.k || 'COMPLIANCE SPECIFICATION').toUpperCase()}</span>
                <h3 style="margin-bottom: 12px; color: var(--color-navy);">${esc(block.t || page.name)}</h3>
                <p style="color: var(--color-body-text); font-size: 1.05rem; line-height: 1.6; max-width: 800px; margin-bottom: 24px;">
                  ${esc(block.n || 'Authoritative compliance execution specifications aligned with DoD 32 CFR Part 170 rulemaking and NIST SP 800-171 Rev 2 controls.')}
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
                  <div class="card-white" style="padding: 20px; border-left: 3px solid var(--color-electric-blue);">
                    <h5 style="margin-bottom: 6px; color: var(--color-navy); font-size: 0.9375rem;">ASSESSOR-DEFENSIBLE</h5>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">Every control mapping is substantiated by dual verification artifacts (examination + test).</p>
                  </div>
                  <div class="card-white" style="padding: 20px; border-left: 3px solid var(--color-violet);">
                    <h5 style="margin-bottom: 6px; color: var(--color-navy); font-size: 0.9375rem;">ON-SITE VERIFIED</h5>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">Physical facility boundaries and server enclaves walked in person by accredited Registered Practitioners.</p>
                  </div>
                  <div class="card-white" style="padding: 20px; border-left: 3px solid var(--color-cyber-cyan);">
                    <h5 style="margin-bottom: 6px; color: var(--color-navy); font-size: 0.9375rem;">FLAT-FEE PRICING</h5>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--color-body-text); line-height: 1.5;">Transparent engagement scope with no hourly billing surprises, travel markups, or tool kickbacks.</p>
                  </div>
                </div>
              </div>
            </section>
          `;
          break;
      }
    });

    mainAppContainer.innerHTML = contentHtml;

    // Ensure hero background video starts playing reliably across all browsers & devices
    const heroVideos = mainAppContainer.querySelectorAll('.hero-video-bg');
    heroVideos.forEach(video => {
      video.muted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      // Load via fetch Blob to bypass GitHub Pages HTTP 206 Partial Content / Range header limitations in Chrome
      const sourceEl = video.querySelector('source');
      const srcUrl = sourceEl ? sourceEl.getAttribute('src') : video.getAttribute('src');

      if (srcUrl && !video.src.startsWith('blob:')) {
        fetch(srcUrl)
          .then(res => {
            if (!res.ok) throw new Error('Network error loading video');
            return res.blob();
          })
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            video.removeAttribute('src');
            video.innerHTML = '';
            video.src = blobUrl;
            video.load();
            video.play().catch(() => {});
          })
          .catch(() => {
            // Fallback to direct stream
            video.play().catch(() => {});
          });
      } else {
        video.play().catch(() => {});
      }

      // Also attach interaction listener in case strict browser autoplay blocks initial trigger
      const onUserInteract = () => {
        if (video.paused) video.play().catch(() => {});
        ['click', 'touchstart', 'scroll'].forEach(evt => window.removeEventListener(evt, onUserInteract));
      };
      ['click', 'touchstart', 'scroll'].forEach(evt => window.addEventListener(evt, onUserInteract, { once: true, passive: true }));
    });

    // Update Meta Drawer Data
    updateMetaDrawer(page);

    // Align walker exactly above active step
    setTimeout(() => alignWalkerToActiveStep(true), 40);

    // Initialize or clear Roadmap Autoplay loop
    const hasJourney = page.blocks && page.blocks.some(b => b.k === 'journey');
    if (hasJourney) {
      setTimeout(() => initRoadmapAutoplay(), 150);
    } else {
      clearRoadmapAutoplay();
    }

    // Initialize Testimonials Carousel (starts only after user reaches section fully)
    const hasReviews = page.blocks && page.blocks.some(b => b.k === 'reviews');
    if (hasReviews) {
      setTimeout(() => initTestimonialsCarousel(), 150);
    }

    // Close mobile drawer if open
    window.closeMobileDrawer();

    // Scroll to top on page transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Update Bottom SEO Metadata Drawer
   */
  function updateMetaDrawer(page) {
    if (!metaDrawer) return;
    metaDrawer.innerHTML = `
      <div class="site-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <b style="color: var(--color-cyber-cyan); font-family: var(--font-mono); font-size: 0.8125rem;">
            [PAGE SPECIFICATION & SEO ARCHITECTURE]
          </b>
          <button onclick="window.toggleMetaDrawer()" style="background: none; border: none; color: var(--color-slate); font-size: 1.1rem; cursor: pointer;">✕</button>
        </div>
        <div class="page-meta-grid">
          <div class="page-meta-item">
            <dt>Target URL</dt>
            <dd>${esc(page.url)}</dd>
          </div>
          <div class="page-meta-item">
            <dt>Primary Keyword</dt>
            <dd style="color: var(--color-cyber-cyan);">${esc(page.kw)}</dd>
          </div>
          <div class="page-meta-item">
            <dt>H1 Tag</dt>
            <dd>${esc(page.h1)}</dd>
          </div>
          <div class="page-meta-item">
            <dt>Gutenberg Theme Template</dt>
            <dd style="color: var(--color-violet);">templates/page-${esc(page.group.toLowerCase())}.html</dd>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Helper: Align Walking Person exactly centered above the active step's circle on all viewports
   */
  function alignWalkerToActiveStep(instant = true) {
    const roadmapSection = document.getElementById('roadmap-section');
    if (!roadmapSection) return;
    const walker = roadmapSection.querySelector('#roadmap-walker');
    const nav = roadmapSection.querySelector('#roadmap-timeline-nav');
    if (!walker || !nav) return;

    const nodes = nav.querySelectorAll('.step-node');
    if (!nodes || !nodes[activeRoadmapStep]) return;

    const targetNode = nodes[activeRoadmapStep];
    const circle = targetNode.querySelector('.node-circle') || targetNode;
    const exactCenterX = targetNode.offsetLeft + circle.offsetLeft + (circle.offsetWidth / 2);

    if (instant) {
      walker.style.transition = 'none';
    }
    walker.style.left = `${exactCenterX}px`;

    if (!isRoadmapWalking) {
      walker.classList.remove('is-walking');
      walker.classList.add('is-idle');
    }

    if (activeRoadmapStep === 6) {
      walker.classList.add('step-7-active');
    } else {
      walker.classList.remove('step-7-active');
    }
  }

  // Ensure walker remains exactly aligned on window resize & viewport changes
  window.addEventListener('resize', () => {
    alignWalkerToActiveStep(true);
    handleRoadmapFocusChange();
    handleTestimonialsScrollCheck();
  });

  /**
   * Global interactive handlers attached to window
   */
  let isRoadmapWalking = false;

  // =========================================================================
  // ROADMAP STEPPER AUTOPLAY & CONTINUOUS LOOP ENGINE
  // Automatically advances through all 8 steps at a measured, comfortable pace
  // STRICT RULE: Autoplay ONLY runs when section is in full focus.
  // Stops as soon as section is not in full focus, resumes when back in view.
  // NEVER scrolls the page/window on autoplay.
  // =========================================================================
  let roadmapAutoplayTimer = null;
  let isRoadmapCurrentlyFocused = false;
  let roadmapFocusObserver = null;
  const ROADMAP_AUTOPLAY_READ_DELAY = 3800; // 3.8s measured, comfortable reading pace per step

  function clearRoadmapAutoplay() {
    if (roadmapAutoplayTimer) {
      clearTimeout(roadmapAutoplayTimer);
      roadmapAutoplayTimer = null;
    }
  }

  function isRoadmapSectionInFullFocus() {
    const roadmapSection = document.getElementById('roadmap-section');
    if (!roadmapSection) return false;
    const rect = roadmapSection.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // Viewport center must fall within the section
    const viewportCenter = vh / 2;
    const isCenterInside = (rect.top <= viewportCenter) && (rect.bottom >= viewportCenter);

    // Section must occupy a substantial portion of viewport
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(vh, rect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const hasSufficientHeight = visibleHeight >= Math.min(rect.height * 0.5, vh * 0.5);

    return isCenterInside && hasSufficientHeight;
  }

  function handleRoadmapFocusChange() {
    const inFocus = isRoadmapSectionInFullFocus();
    if (inFocus) {
      if (!isRoadmapCurrentlyFocused) {
        isRoadmapCurrentlyFocused = true;
        scheduleNextAutoplayStep();
      }
    } else {
      if (isRoadmapCurrentlyFocused) {
        isRoadmapCurrentlyFocused = false;
        clearRoadmapAutoplay();
      }
    }
  }

  function scheduleNextAutoplayStep() {
    clearRoadmapAutoplay();
    const roadmapSection = document.getElementById('roadmap-section');
    if (!roadmapSection) return;

    // Do not schedule if section is not currently in full focus
    if (!isRoadmapSectionInFullFocus()) {
      isRoadmapCurrentlyFocused = false;
      return;
    }
    isRoadmapCurrentlyFocused = true;

    roadmapAutoplayTimer = setTimeout(() => {
      advanceRoadmapAutoplay();
    }, ROADMAP_AUTOPLAY_READ_DELAY);
  }

  function advanceRoadmapAutoplay() {
    const roadmapSection = document.getElementById('roadmap-section');
    if (!roadmapSection) return;

    // Check if still in full focus; if user scrolled away, stop immediately
    if (!isRoadmapSectionInFullFocus()) {
      isRoadmapCurrentlyFocused = false;
      clearRoadmapAutoplay();
      return;
    }

    // If character is mid-walk, defer check
    if (isRoadmapWalking) {
      scheduleNextAutoplayStep();
      return;
    }

    const page = getPage(currentPageId);
    if (!page) return;
    const block = (page.blocks || []).find(b => b.k === 'journey');
    const totalSteps = (block && block.items && block.items.length) ? block.items.length : 8;

    // Advance to next step; if at end (Step 8 / idx 7), loop back to step 0
    let nextStep = activeRoadmapStep + 1;
    if (nextStep >= totalSteps) {
      nextStep = 0;
    }

    window.selectRoadmapStep(nextStep);
  }

  function observeRoadmapVisibility() {
    const roadmapSection = document.getElementById('roadmap-section');
    if (!roadmapSection || typeof IntersectionObserver === 'undefined') return;
    if (roadmapFocusObserver) {
      roadmapFocusObserver.disconnect();
    }
    roadmapFocusObserver = new IntersectionObserver(() => {
      handleRoadmapFocusChange();
    }, {
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
    });
    roadmapFocusObserver.observe(roadmapSection);
  }

  function initRoadmapAutoplay() {
    clearRoadmapAutoplay();
    const roadmapSection = document.getElementById('roadmap-section');
    if (!roadmapSection) return;

    observeRoadmapVisibility();

    // Check whether roadmap is in full focus initially
    isRoadmapCurrentlyFocused = isRoadmapSectionInFullFocus();
    if (isRoadmapCurrentlyFocused) {
      scheduleNextAutoplayStep();
    }
  }

  // =========================================================================
  // TESTIMONIALS CAROUSEL CONTROLLER
  // Starts only after user reaches the section fully. Holds static for a few
  // seconds (3.5s) to allow reading, then begins continuous smooth scrolling.
  // Pauses when scrolled out of view.
  // =========================================================================
  let testimonialsStartTimer = null;
  let isTestimonialsStarted = false;
  let isTestimonialsInView = false;
  let testimonialsObserver = null;
  const TESTIMONIALS_HOLD_DELAY = 3500; // 3.5s hold time before carousel starts

  function isTestimonialsSectionFullyReached() {
    const section = document.getElementById('testimonials-section');
    if (!section) return false;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(vh, rect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const sectionHeight = rect.height || 500;
    const visibleRatio = visibleHeight / Math.min(sectionHeight, vh);

    const isFullyContained = (rect.top >= -40 && rect.bottom <= vh + 60);
    const isSubstantiallyVisible = (rect.top <= vh * 0.25 && visibleRatio >= 0.80);

    return isFullyContained || isSubstantiallyVisible;
  }

  function handleTestimonialsScrollCheck() {
    const section = document.getElementById('testimonials-section');
    if (!section) return;
    const track = section.querySelector('.testimonials-carousel-track');
    if (!track) return;

    const isFullyReached = isTestimonialsSectionFullyReached();

    if (isFullyReached) {
      if (!isTestimonialsInView) {
        isTestimonialsInView = true;
        // User just reached the section fully
        if (!isTestimonialsStarted) {
          // Keep it static for a few seconds (3.5s), then start carousel
          if (!testimonialsStartTimer) {
            testimonialsStartTimer = setTimeout(() => {
              isTestimonialsStarted = true;
              track.classList.add('is-running');
              testimonialsStartTimer = null;
            }, TESTIMONIALS_HOLD_DELAY);
          }
        } else {
          // Already started previously, resume running
          track.classList.add('is-running');
        }
      }
    } else {
      // Not in full view -> if user scrolled away, pause carousel
      if (isTestimonialsInView) {
        isTestimonialsInView = false;
        if (testimonialsStartTimer) {
          clearTimeout(testimonialsStartTimer);
          testimonialsStartTimer = null;
        }
        track.classList.remove('is-running');
      }
    }
  }

  function initTestimonialsCarousel() {
    if (testimonialsStartTimer) {
      clearTimeout(testimonialsStartTimer);
      testimonialsStartTimer = null;
    }
    isTestimonialsStarted = false;
    isTestimonialsInView = false;

    const section = document.getElementById('testimonials-section');
    if (!section) return;

    const track = section.querySelector('.testimonials-carousel-track');
    if (track) {
      track.classList.remove('is-running');
    }

    if (testimonialsObserver) {
      testimonialsObserver.disconnect();
    }

    if (typeof IntersectionObserver !== 'undefined') {
      testimonialsObserver = new IntersectionObserver(() => {
        handleTestimonialsScrollCheck();
      }, {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
      });
      testimonialsObserver.observe(section);
    }

    // Check immediately in case section is already in full view
    handleTestimonialsScrollCheck();
  }

  // Window scroll listener for both Roadmap and Testimonials focus detection
  window.addEventListener('scroll', () => {
    handleRoadmapFocusChange();
    handleTestimonialsScrollCheck();
  }, { passive: true });

  window.selectRoadmapStep = function (idx, e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
      // If user clicked manually, reset autoplay timer so they get full reading duration
      clearRoadmapAutoplay();
    }
    if (isRoadmapWalking) return; // Prevent multiple clicks while walking
    const page = getPage(currentPageId);
    if (!page) return;
    const block = (page.blocks || []).find(b => b.k === 'journey');
    if (!block || !block.items || idx < 0 || idx >= block.items.length) return;

    const oldIdx = activeRoadmapStep;
    const newIdx = idx;

    if (newIdx === oldIdx) return;

    const roadmapSection = document.getElementById('roadmap-section');
    if (!roadmapSection) {
      activeRoadmapStep = newIdx;
      renderCurrentPage();
      return;
    }

    // Helper: update whole section DOM smoothly
    function finishStepTransition() {
      activeRoadmapStep = newIdx;
      const temp = document.createElement('div');
      temp.innerHTML = renderJourney(block);
      const newSection = temp.firstElementChild;
      roadmapSection.replaceWith(newSection);

      alignWalkerToActiveStep(true);

      const newWalker = newSection.querySelector('#roadmap-walker');
      if (newWalker) {
        newWalker.classList.remove('is-walking');
        newWalker.classList.add('is-idle');
      }

      // Safe local scroll for mobile horizontal rail only; NEVER scroll the browser window/page
      const timelineNav = newSection.querySelector('#roadmap-timeline-nav') || newSection.querySelector('.roadmap-timeline-nav');
      const activeBtn = newSection.querySelector('.step-node.active');
      if (timelineNav && activeBtn && timelineNav.scrollWidth > timelineNav.clientWidth) {
        const targetScrollLeft = activeBtn.offsetLeft - (timelineNav.clientWidth / 2) + (activeBtn.offsetWidth / 2);
        timelineNav.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
      }

      // Reconnect observer to the new section DOM node
      observeRoadmapVisibility();

      // Continue autoplay loop only if section is currently in full focus
      scheduleNextAutoplayStep();
    }

    // On selecting previous or looping back (step before current), instant update without forward walk
    if (newIdx < oldIdx) {
      finishStepTransition();
      return;
    }

    // Forward selection: Character walks smoothly across rail to the target node
    // Content is displayed cleanly with zero loading overlay or spinner
    const nav = roadmapSection.querySelector('#roadmap-timeline-nav') || roadmapSection.querySelector('.roadmap-timeline-nav');
    const walker = roadmapSection.querySelector('#roadmap-walker');
    const timelineFill = roadmapSection.querySelector('#roadmap-timeline-fill') || roadmapSection.querySelector('.roadmap-timeline-fill');
    const nodes = nav ? nav.querySelectorAll('.step-node') : [];

    if (!walker || nodes.length <= newIdx) {
      finishStepTransition();
      return;
    }

    isRoadmapWalking = true;

    // Milestone 7 special flag (Authorized C3PAO Assessment)
    if (newIdx === 6) {
      const flag = roadmapSection.querySelector('#step-7-flag') || roadmapSection.querySelector('.milestone-flag-wrap');
      if (flag) {
        flag.classList.add('is-visible');
      }
    }

    // Calculate walking distance and duration (steady, measured stride: ~750ms - 1250ms)
    const stepDiff = Math.abs(newIdx - oldIdx);
    const durationMs = Math.min(1250, 640 + (stepDiff * 110));

    // Target center calculated directly from node and circle
    const targetNode = nodes[newIdx];
    const circle = targetNode.querySelector('.node-circle') || targetNode;
    const targetX = targetNode.offsetLeft + circle.offsetLeft + (circle.offsetWidth / 2);

    walker.classList.remove('is-idle');
    walker.classList.add('is-walking');
    if (newIdx === 6) {
      walker.classList.add('step-7-active');
    } else {
      walker.classList.remove('step-7-active');
    }

    walker.style.transition = `left ${durationMs}ms cubic-bezier(0.35, 0, 0.25, 1)`;
    walker.style.left = `${targetX}px`;

    // Advance the timeline fill in sync with the walking character
    if (timelineFill) {
      const newProgress = Math.round((newIdx / (block.items.length - 1)) * 100);
      timelineFill.style.transition = `width ${durationMs}ms cubic-bezier(0.35, 0, 0.25, 1)`;
      timelineFill.style.width = `${newProgress}%`;
    }

    setTimeout(() => {
      isRoadmapWalking = false;
      finishStepTransition();
    }, durationMs + 60);
  };

  window.toggleAccordion = function (headerEl) {
    const item = headerEl.closest('.accordion-item');
    if (item) {
      item.classList.toggle('active');
    }
  };

  window.toggleGutenbergInspector = function () {
    isGutenbergInspector = !isGutenbergInspector;
    document.body.classList.toggle('gutenberg-inspector-active', isGutenbergInspector);
    if (gutenbergToggleBtn) {
      gutenbergToggleBtn.classList.toggle('active-gutenberg', isGutenbergInspector);
      gutenbergToggleBtn.textContent = isGutenbergInspector ? '⚡ Hide Block Inspector' : '🔍 Inspect Gutenberg Blocks';
    }
  };

  window.toggleViewport = function () {
    isMobilePreview = !isMobilePreview;
    document.body.classList.toggle('mobile-preview-mode', isMobilePreview);
    if (viewportToggleBtn) {
      viewportToggleBtn.textContent = isMobilePreview ? '📱 Mobile (390px)' : '💻 Desktop (1440px)';
    }
    setTimeout(() => alignWalkerToActiveStep(true), 60);
  };

  window.toggleMetaDrawer = function () {
    if (metaDrawer) {
      metaDrawer.classList.toggle('open');
    }
  };

  window.openMobileDrawer = function () {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
  };

  window.closeMobileDrawer = function () {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
  };

  window.dismissPopup = function () {
    popupDismissed = true;
    if (leadPopup) leadPopup.classList.remove('visible');
    if (minPopupTrigger) minPopupTrigger.classList.add('visible');
  };

  window.restorePopup = function () {
    popupDismissed = false;
    if (minPopupTrigger) minPopupTrigger.classList.remove('visible');
    if (leadPopup) leadPopup.classList.add('visible');
  };

  window.triggerToolModal = function () {
    alert("CMMC Readiness Calculator: Based on your selections, your organization has a 78% baseline readiness score. Complete findings roadmap has been sent to your work email.");
  };

  window.handleContactSubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    const container = form ? (form.closest('.contact-form-card') || form.closest('.resource-hero-card-form') || document.getElementById('contact-form-container')) : document.getElementById('contact-form-container');
    if (!container) return;
    const nameInput = form ? form.querySelector('#contact-name') : document.getElementById('contact-name');
    const name = nameInput?.value || 'Contractor';
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="width: 60px; height: 60px; background: rgba(0, 212, 255, 0.15); border: 2px solid var(--color-cyber-cyan); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.75rem; color: var(--color-cyber-cyan);">
          ✓
        </div>
        <h3 style="color: var(--color-navy); margin-bottom: 12px; font-size: 1.5rem;">Discovery Call Requested!</h3>
        <p style="color: var(--color-body-text); font-size: 0.9375rem; line-height: 1.6; max-width: 440px; margin: 0 auto 20px;">
          Thank you, <b>${esc(name)}</b>. Your consultation request has been securely routed to a Lead Cyber AB Registered Practitioner.
        </p>
        <div style="background: var(--color-soft-blue); border: 1px solid var(--color-border); border-radius: 8px; padding: 16px; max-width: 440px; margin: 0 auto 24px; text-align: left; font-size: 0.8125rem;">
          <b style="color: var(--color-navy);">What Happens Next:</b>
          <ul style="margin: 8px 0 0 18px; color: var(--color-body-text); line-height: 1.5;">
            <li>Our team will email you calendar scheduling slots within 2 business hours.</li>
            <li>We will attach our standard mutual NDA for digital review prior to your call.</li>
          </ul>
        </div>
        <a href="#page-1" class="btn btn-primary" style="display: inline-flex;">Return to Home &rarr;</a>
      </div>
    `;
  };

  /**
   * Scroll listener to reveal bottom-right popup
   */
  function handleScrollPopup() {
    if (popupDismissed) return;
    if (window.scrollY > 300) {
      if (leadPopup) leadPopup.classList.add('visible');
    }
  }

  window.addEventListener('scroll', handleScrollPopup, { passive: true });
  // Also show automatically after 3.5s if not already shown
  setTimeout(() => {
    if (!popupDismissed && leadPopup) {
      leadPopup.classList.add('visible');
    }
  }, 3500);

  /**
   * Hash Route Listener
   */
  function handleRoute() {
    let hash = window.location.hash.replace('#', '');
    if (hash === 'contact') hash = 'page-contact';
    if (hash && PAGES.some(p => p.id === hash)) {
      currentPageId = hash;
    } else {
      currentPageId = 'page-1';
    }
    renderCurrentPage();
  }

  // Bind Buttons
  if (gutenbergToggleBtn) {
    gutenbergToggleBtn.addEventListener('click', window.toggleGutenbergInspector);
  }
  if (viewportToggleBtn) {
    viewportToggleBtn.addEventListener('click', window.toggleViewport);
  }
  if (metaToggleBtn) {
    metaToggleBtn.addEventListener('click', window.toggleMetaDrawer);
  }

  window.addEventListener('hashchange', handleRoute);

  // Initialize
  if (pageSelectDropdown) {
    initHudDropdown();
  }
  if (mainAppContainer) {
    handleRoute();
  } else {
    // WordPress page: initialize active interactive blocks directly from DOM
    const heroVideos = document.querySelectorAll('.hero-video-bg');
    heroVideos.forEach(video => {
      video.muted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.play().catch(() => {});
    });

    if (document.getElementById('roadmap-section')) {
      setTimeout(() => {
        alignWalkerToActiveStep(true);
        initRoadmapAutoplay();
      }, 100);
    }
    if (document.getElementById('testimonials-section')) {
      setTimeout(() => {
        initTestimonialsCarousel();
      }, 100);
    }
  }

})();
