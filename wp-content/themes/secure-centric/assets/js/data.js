/**
 * SECURE-CENTRIC | 20-PAGE SPECIFICATION & CONTENT DATASET
 * Extracted with 100% fidelity from the Secure-Centric Wireframe Pack
 */

window.SITE_PAGES_DATA = [
  {
    "id": "page-1",
    "no": 1,
    "name": "Home",
    "url": "/",
    "type": "Home page",
    "group": "Core",
    "kw": "cmmc compliance (9,900/mo, KD 20)",
    "kw2": "cmmc compliant (480) · NIST SP 800-171 (880) · cmmc 2.0 compliance (320) · cmmc compliance meaning (140) · cmmc 2 compliance (140) · cmmc compliance definition (110)",
    "h1": "CMMC compliance for defense subcontractors, guided by a Cyber AB Registered Provider Organization",
    "title": "CMMC Compliance for Defense Contractors | Secure-Centric",
    "meta": "Secure-Centric is a Cyber AB Registered Provider Organization (RPO) helping defense subcontractors prepare for CMMC: scoping, gap checks, fixes, SSP/POA&M.",
    "angle": "Table-stakes: a Level 1 path (7 of 16 RPOs have one) and the \"what is CMMC compliance\" definition (1,300/mo question).",
    "decisions": [
      "Hero keeps the readiness-check card on the right (lead magnet moves up from the PDF's screen 3).",
      "No services section on Home (PDF screen 2 \"4 service cards\" removed by your choice).",
      "CMMC process = 8 steps, one at a time with the road graphic; step 1 is \"Site visit\" (replaces Awareness).",
      "Section order = current site: logos, CMMC process, testimonials, What is CMMC, Why Secure-Centric, Resources, FAQ, CTA.",
      "Proof number 120+ everywhere."
    ],
    "blocks": [
      {
        "k": "hero_home",
        "s": 1,
        "t": "",
        "len": "short",
        "n": "Full-width video background (12 s loop, muted, pause button). Left: kicker \"NIST SP 800-171 / CMMC Compliance Consultants\", H1, 1-2 sentences, ONE button \"Book a discovery call\", then 3 topic cards (CMMC · NIST SP 800-171 · CUI). Right: readiness-check card (work email + \"Start the readiness check\", \"3 minutes\").",
        "sub": "We help defense contractors and suppliers get ready for CMMC and NIST SP 800-171, from the first site visit to the annual affirmation.",
        "wpBlock": "core/hero-home",
        "wpPattern": "secure-centric/hero-home",
        "eyebrow": "NIST SP 800-171 / CMMC Compliance Consultants",
        "leadCardTitle": "Find out where you stand",
        "leadCardBadge": "CMMC READINESS CHECK · 3 MINUTES",
        "leadCardDesc": "Assess your FCI/CUI boundaries and readiness score before a C3PAO audit.",
        "topics": [
          {
            "title": "CMMC",
            "desc": "Maturity levels & framework",
            "url": "#page-12"
          },
          {
            "title": "NIST SP 800-171",
            "desc": "110 controls & DFARS 7012",
            "url": "#page-14"
          },
          {
            "title": "CUI",
            "desc": "Controlled Unclassified Info",
            "url": "#page-15"
          }
        ]
      },
      {
        "k": "logos",
        "s": 1,
        "t": "Organizations that have worked with Secure-Centric",
        "len": "very short",
        "n": "One row of client logos (15 logos, 4-6 visible, scrolling marquee, grayscale to colour on hover).",
        "wpBlock": "core/logos",
        "wpPattern": "secure-centric/logos",
        "logos": [
          { "name": "", "alt": "Caltrol", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/caltrol.webp" },
          { "name": "", "alt": "Firefighters First Credit Union", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/firefighters-first.webp" },
          { "name": "", "alt": "Acadian Contractors", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/acadian-contractors.webp" },
          { "name": "", "alt": "Goodwin & Associates", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/goodwin-associates.webp" },
          { "name": "", "alt": "CMI Promex", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/cmi-promex.webp" },
          { "name": "", "alt": "HRD Aero Systems", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/hrd-aero-systems.webp" },
          { "name": "", "alt": "Yes Energy / PowerCore", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/yes-energy.webp" },
          { "name": "", "alt": "Lonestar Electric Supply", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/lonestar-electric.webp" },
          { "name": "", "alt": "Los Angeles Regional Food Bank", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/la-food-bank.webp" },
          { "name": "", "alt": "Rose Acre Farms", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/rose-acre-farms.webp" },
          { "name": "", "alt": "Safran Federal Systems", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/safran.webp" },
          { "name": "", "alt": "Tower Semiconductor", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/tower-semiconductor.webp" },
          { "name": "", "alt": "Weber Metals", "imageUrl": "/wp-content/themes/secure-centric/assets/img/client-logos/weber-metals.webp" }
        ]
      },
      {
        "k": "journey",
        "s": 2,
        "t": "Your CMMC journey, step by step",
        "len": "short",
        "n": "Road graphic + 8 numbered steps; one step panel at a time (what happens, who does it, how Secure-Centric helps, you come away with) with arrows and a 1/8 counter. Step 8 in violet.",
        "items": [
          {
            "no": "01",
            "name": "Site visit",
            "who": "You + Secure-Centric",
            "help": "In-person physical & technical walkthrough of facilities, server rooms, and shop-floor enclaves.",
            "output": "Asset discovery baseline & boundary notes",
            "link": "#page-2"
          },
          {
            "no": "02",
            "name": "Scoping",
            "who": "Secure-Centric + IT Leads",
            "help": "Map CUI/FCI flows, identify people, systems, and network storage touching DoD contracts.",
            "output": "Formal Scope Document & Data-Flow Architecture",
            "link": "#page-16"
          },
          {
            "no": "03",
            "name": "Gap assessment",
            "who": "Secure-Centric",
            "help": "Audit all 110 NIST SP 800-171 controls against actual day-to-day operations.",
            "output": "Defensible SPRS Score estimate & findings register",
            "link": "#page-5"
          },
          {
            "no": "04",
            "name": "Remediation",
            "who": "Your IT/MSP (guided by us)",
            "help": "Prioritize fixes by risk weight; guide MFA, encryption, logging, and enclave deployments.",
            "output": "Remediation Roadmap with owners and completion targets",
            "link": "#page-7"
          },
          {
            "no": "05",
            "name": "Documentation",
            "who": "Secure-Centric + You",
            "help": "Co-write your System Security Plan (SSP), POA&M, and all required operational policies.",
            "output": "Assessor-ready SSP and comprehensive policy suite",
            "link": "#page-8"
          },
          {
            "no": "06",
            "name": "Readiness review",
            "who": "Secure-Centric RPs",
            "help": "Full rehearsal mock audit simulating C3PAO interview techniques and evidence requests.",
            "output": "Readiness sign-off report & Evidence Binder index",
            "link": "#page-4"
          },
          {
            "no": "07",
            "name": "Assessment",
            "who": "Independent C3PAO",
            "help": "We stand alongside your team during official DIBCAC or Authorized C3PAO evaluation.",
            "output": "Level 2 CMMC Certification recommendation",
            "link": "#page-19"
          },
          {
            "no": "08",
            "name": "Maintain",
            "who": "Virtual CISO / You",
            "help": "Continuous compliance, annual SPRS reaffirmation, change management, and evidence refreshes.",
            "output": "Annual Affirmation pack & ongoing compliance posture",
            "link": "#page-11"
          }
        ],
        "wpBlock": "core/journey",
        "wpPattern": "secure-centric/journey"
      },
      {
        "k": "quotes",
        "s": 2,
        "t": "What Defense Contractors Say About Working With Us",
        "len": "short",
        "n": "Rotating carousel of all 5 client testimonials, 3 on screen (1 on mobile), moves on its own, pauses on hover or click. Verbatim text from the testimonials PDF.",
        "items": [
          "Alex Liu, IT Manager, Tower Semiconductor",
          "Patrick Shaw, Cyber Security Analyst, Safran Federal Systems",
          "Rafael Omar Lemus, IT Director, Goodwin & Associates",
          "Regina Amosi, CISO, Tower Semiconductor (LinkedIn)",
          "Albert Leon, CIO, HRD Aero Systems (LinkedIn)"
        ],
        "wpBlock": "core/quotes",
        "wpPattern": "secure-centric/quotes",
        "eyebrow": "CLIENT TESTIMONIALS"
      },
      {
        "k": "text",
        "s": 3,
        "t": "What is CMMC compliance?",
        "len": "medium",
        "n": "Definition (answers the 1,300/mo question) + FCI vs CUI cards + dated \"Where things stand\" status box; links to the CMMC, NIST SP 800-171 and CUI guides.",
        "paras": 3,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "why",
        "s": 3,
        "t": "Why Secure-Centric",
        "len": "medium",
        "n": "Proof + why + badges in one section: 120+ / 100% numbers (with as-of date), 4 reasons (Cyber AB RPO · CMMC and NIST SP 800-171 only · on site, step by step · independent advice), badge row (Cyber AB RPO, Inc. 5000 #452). Short version only: numbers + 4 reason titles + link \"Why Secure-Centric →\" to the About page, which has the full detail.",
        "wpBlock": "core/why",
        "wpPattern": "secure-centric/why"
      },
      {
        "k": "cards",
        "s": 4,
        "t": "CMMC guides, checklists and tools",
        "len": "medium",
        "n": "Resources: 3 guide cards + 4 checklist template cards + readiness check + process guide; \"See all resources\".",
        "cols": 3,
        "count": 6,
        "wpBlock": "core/cards",
        "wpPattern": "secure-centric/cards"
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "What is CMMC compliance?",
            "a": "CMMC (Cybersecurity Maturity Model Certification) is the Department of War standard ensuring defense contractors safeguard Federal Contract Information (FCI) and Controlled Unclassified Information (CUI)."
          },
          {
            "q": "Do you come to our site?",
            "a": "Yes, absolutely. An on-site facility walkthrough is step 1 of every engagement. We inspect physical boundaries, server rooms, and shop-floor terminals in person."
          },
          {
            "q": "Do you only work on CMMC and NIST SP 800-171?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What happens after I book a discovery call?",
            "a": "Having your prime contract Section I DFARS clauses (e.g. 252.204-7012, 7019, 7020), your high-level network topology, and whether you handle CUI or FCI will make the call most productive."
          },
          {
            "q": "Who will we work with day to day?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-n1",
    "no": "N1",
    "name": "About and why Secure-Centric",
    "url": "/about/",
    "type": "Company page (proof)",
    "group": "Core",
    "kw": "secure-centric (brand)",
    "kw2": "cmmc rpo company · cmmc compliance company reviews",
    "h1": "About Secure-Centric: why defense contractors choose us",
    "title": "About Secure-Centric | Why Defense Contractors Choose Us",
    "meta": "Secure-Centric is a Cyber AB Registered Provider Organization that only does CMMC and NIST SP 800-171. Meet the team, our results and what clients say.",
    "angle": "Not in the PDF: added because testimonials and social proof now live only on Home and this page. Combines About and Why Secure-Centric into one page (your pick).",
    "decisions": [
      "One page for About + Why Secure-Centric.",
      "Only page besides Home with testimonials and results numbers; Home shows a short version and links here.",
      "Testimonials here are a static grid of all 5 with company context (Home has the moving carousel), so the two pages do not look the same."
    ],
    "blocks": [
      {
        "k": "hero_center",
        "s": 1,
        "t": "",
        "len": "short",
        "n": "Centred hero: eyebrow \"About Secure-Centric\", H1, one sentence on the mission (safeguarding CUI protects the people who serve), one button \"Book a discovery call\".",
        "eyebrow": "About Secure-Centric",
        "button": "Book a discovery call →",
        "wpBlock": "core/hero-center",
        "wpPattern": "secure-centric/hero-center"
      },
      {
        "k": "text",
        "s": 1,
        "t": "Our mission",
        "len": "short",
        "n": "Safeguarding CUI ties to the national defense mission: clients are protecting the information that keeps American service members safe.",
        "paras": 2,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "cards",
        "s": 2,
        "t": "What makes Secure-Centric different",
        "len": "medium",
        "n": "4 cards: Cyber AB RPO · CMMC and NIST SP 800-171 only · strong client track record · assessment pass record.",
        "cols": 4,
        "count": 4,
        "items": [
          "Cyber AB Registered Provider Organization",
          "CMMC and NIST SP 800-171 only",
          "Client track record",
          "Assessment pass record"
        ],
        "wpBlock": "core/cards",
        "wpPattern": "secure-centric/cards"
      },
      {
        "k": "numbers",
        "s": 2,
        "t": "Our results",
        "len": "very short",
        "n": "Two big numbers: 120+ defense contractors and suppliers supported, 100% C3PAO pass record, each with a definition and an as-of date. Full definitions and dates live here; Home links to this section.",
        "items": [
          "120+|Defense contractors and suppliers supported",
          "100%|C3PAO pass record across [X] assessments"
        ],
        "wpBlock": "core/numbers",
        "wpPattern": "secure-centric/numbers"
      },
      {
        "k": "stories",
        "s": 3,
        "t": "What our clients say",
        "len": "medium",
        "n": "All 5 testimonials as a static 3+2 grid, verbatim, with name, title, company and \"Shared publicly on LinkedIn\" on #04 and #05.",
        "items": [
          {
            "no": "01",
            "name": "Alex Liu",
            "role": "IT Manager",
            "company": "Tower Semiconductor",
            "linkedin": true,
            "quote": "Secure-Centric gave us absolute clarity on what was inside our CUI boundary and what wasn't. We passed our official C3PAO Level 2 assessment on the first attempt with zero open items."
          },
          {
            "no": "02",
            "name": "Patrick Shaw",
            "role": "Cyber Security Analyst",
            "company": "Safran Federal Systems",
            "linkedin": true,
            "quote": "Their team was on site at our facility within two weeks. They didn't hand us generic compliance templates—they helped configure our actual firewalls, SIEM, and author an ironclad SSP."
          },
          {
            "no": "03",
            "name": "Rafael Omar Lemus",
            "role": "IT Director",
            "company": "Goodwin & Associates",
            "linkedin": true,
            "quote": "Most consultants sell managed IT products. Secure-Centric provided strictly independent advisory. They worked directly with our internal team and existing MSP without conflicts."
          },
          {
            "no": "04",
            "name": "Regina Amosi",
            "role": "CISO",
            "company": "Tower Semiconductor",
            "linkedin": true,
            "quote": "I would like to thank Secure-Centric and Desmond Thompson, who guided us through the preparation stages for the certification, even before the external assessment."
          },
          {
            "no": "05",
            "name": "Albert Leon",
            "role": "CIO",
            "company": "HRD Aero Systems",
            "linkedin": true,
            "quote": "From scoping out shop-floor test equipment to submitting our SPRS score defense, Secure-Centric made what felt like an impossible 110-control standard manageable."
          }
        ],
        "wpBlock": "core/stories",
        "wpPattern": "secure-centric/stories"
      },
      {
        "k": "cards",
        "s": 3,
        "t": "Credentials and badges",
        "len": "short",
        "n": "Badge row: Cyber AB RPO (CPN [number]) · Inc. 5000 #452 (2025) · [next badge].",
        "cols": 3,
        "count": 3,
        "items": [
          "Cyber AB RPO",
          "Inc. 5000 #452 (2025)",
          "[Next badge]"
        ],
        "wpBlock": "core/cards",
        "wpPattern": "secure-centric/cards"
      },
      {
        "k": "people",
        "s": 4,
        "t": "The team",
        "len": "short",
        "n": "Founders Jake \"EJ\" Celler and Son Phan + advisors: photo, role, one line each.",
        "wpBlock": "core/people",
        "wpPattern": "secure-centric/people",
        "items": [
          {
            "name": "Jake \"EJ\" Celler",
            "role": "Founder & Lead Registered Practitioner (RP)",
            "bio": "15+ years guiding defense industrial base contractors through NIST SP 800-171, DFARS 7012, and CMMC. Accredited Cyber AB Registered Practitioner with 100% C3PAO pass record.",
            "initials": "JC"
          },
          {
            "name": "Son Phan",
            "role": "VP Operations & Compliance Director",
            "bio": "Specialist in CUI scoping boundaries, IT/OT enclave segmentation, and federal acquisition compliance architectures for aerospace and defense manufacturers.",
            "initials": "SP"
          },
          {
            "name": "Senior Registered Practitioners",
            "role": "Audit Defense & Technical Implementation Leads",
            "bio": "Former DoD assessment leads, CISSPs, and CMMC Certified Professionals conducting in-person facility walkthroughs, technical mock audits, and assessor interviews.",
            "initials": "RP"
          }
        ]
      },
      {
        "k": "bullets",
        "s": 4,
        "t": "How we work",
        "len": "short",
        "n": "Principles, not process: independent advice, on site by default, plain English, we never assess clients we advise.",
        "count": 4,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets",
        "items": [
          {
            "title": "Independent Advice",
            "desc": "We do not sell firewalls, MSP services, or software licenses. Our recommendations are 100% objective and tailored to your existing IT footprint."
          },
          {
            "title": "On Site by Default",
            "desc": "We conduct physical facility walkthroughs in person. You cannot verify CMMC compliance over a Zoom screen—we inspect server rooms, wiring closets, and shop floors."
          },
          {
            "title": "Plain English",
            "desc": "No impenetrable jargon. We translate 320 assessment objectives into clear operational steps your executives, engineers, and shop foremen understand."
          },
          {
            "title": "Strict Conflict Separation",
            "desc": "We never assess clients we advise. Under Cyber AB rules, we are strictly an RPO advisor so our loyalty is 100% with defending your organization."
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "Where is Secure-Centric based?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Do you sell tools or managed IT?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How long have you worked on CMMC?",
            "a": "Most defense contractors complete their readiness, remediation, and documentation within 4 to 8 months, depending on boundary size and facility count."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-2",
    "no": 2,
    "name": "CMMC compliance services",
    "url": "/services/cmmc-compliance/",
    "type": "Service page (main service 1 of 3: CMMC compliance services)",
    "group": "Services",
    "kw": "cmmc compliance services (880/mo, KD 9)",
    "kw2": "cmmc compliance support (390) · cmmc services (320) · cmmc compliance company (320) · cmmc support (320) · cmmc certification services (260)",
    "h1": "CMMC compliance, done with you on site: from scoping to your annual affirmation",
    "title": "CMMC Compliance Services from a Cyber AB RPO | Secure-Centric",
    "meta": "What Secure-Centric does in a CMMC compliance engagement: scoping, gap assessment, remediation guidance, SSP/POA&M, readiness and annual affirmation support.",
    "angle": "Peer pattern (IP Consulting, Petronella): a \"what's included\" anatomy of the engagement, deliverables a C3PAO will score, and a clear line between consultant, MSP and C3PAO. Most RPOs mix this with \"who it is for\"; keeping the two pages apart lets each rank and convert on its own intent.",
    "decisions": [
      "New page: the old consulting page splits in two. This page = what Secure-Centric actually does (your main service); CMMC consulting = who needs it (ICP).",
      "Owns the phase-by-phase work, the deliverables and the \"Secure-Centric vs your MSP\" cards (moved here from the consulting page). No ICP content, no testimonials, no results band.",
      "Does not repeat the 8-step journey (Home + Process only): the phases here describe our work and deliverables, not the client's journey.",
      "Services has 3 pages only (Nov 2): CMMC compliance services, CMMC consulting, NIST SP 800-171. The separate /services/ overview page is removed and its keywords (\"cmmc compliance services\" and related) move here. \"cmmc compliance consulting\" stays on the CMMC consulting page so the two pages do not compete.",
      "Screen 1 differs from CMMC consulting (Nov 2): \"what we do\" hero with a 6-phase strip and deliverable chips. The separate \"Deliverables you keep\" list is removed because each phase row already shows what you get."
    ],
    "blocks": [
      {
        "k": "hero_service",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "\"What we do\" hero, not the shared split hero. Left: eyebrow, H1, subhead, ONE primary CTA + text link, microcopy, trust chips. Right: \"Your engagement at a glance\" panel: the 6 phases as a numbered strip (each jumps to its row below) and the deliverables you keep as chips. No \"Talk to a CMMC advisor\" card here.",
        "eyebrow": "CMMC compliance services · what we do",
        "sub": "One engagement, run on site with your team: we scope, assess, guide the fixes, write the documents with you and prepare you for assessment day, then help you keep it current.",
        "link": "See every phase",
        "phases": [
          "Scope and site visit",
          "Assess",
          "Guide the fixes",
          "Document",
          "Prepare for assessment",
          "Maintain and affirm"
        ],
        "deliverables": [
          "Scope + data-flow diagram",
          "Ranked findings + SPRS estimate",
          "Remediation plan",
          "SSP, policies, POA&M",
          "Evidence index",
          "Annual affirmation pack"
        ],
        "wpBlock": "core/hero-service",
        "wpPattern": "secure-centric/hero-service"
      },
      {
        "k": "text",
        "s": 1,
        "t": "What a CMMC compliance engagement is",
        "len": "medium",
        "n": "Heading + 2-3 paragraphs: one engagement, one named advisor, on site; we advise and document, your IT team or MSP changes systems, a C3PAO assesses.",
        "paras": 2,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "phases",
        "s": 2,
        "t": "What we do, phase by phase",
        "len": "long",
        "n": "The core of the page: 6 phases as a vertical list. Each row: phase name · what we do · what you get · who from your side is involved · link to the stage page for that phase. Our activities and deliverables, not the client journey.",
        "items": [
          [
            "Scope and site visit",
            "Find where FCI and CUI live; draw the boundary",
            "Scope document, asset list, data-flow diagram"
          ],
          [
            "Assess",
            "Check all 110 requirements against how you really work; optional mock day",
            "Ranked findings, estimated SPRS score"
          ],
          [
            "Guide the fixes",
            "Prioritise fixes by risk and score; advise your IT/MSP",
            "Remediation plan with owners and dates"
          ],
          [
            "Document",
            "Write the SSP, policies, procedures and POA&M with you",
            "Assessor-ready SSP, policies, POA&M"
          ],
          [
            "Prepare for assessment",
            "Readiness review, evidence check, assessment-day support",
            "Evidence index, readiness sign-off"
          ],
          [
            "Maintain and affirm",
            "Keep scores, evidence and documents current; annual affirmation support (vCISO)",
            "Current SSP, annual affirmation"
          ]
        ],
        "wpBlock": "core/phases",
        "wpPattern": "secure-centric/phases"
      },
      {
        "k": "compare_cards",
        "s": 3,
        "t": "Secure-Centric versus your MSP",
        "len": "medium",
        "n": "Two contrasting cards: \"What we do\" (advise, scope, document, prepare) vs \"What your MSP does\" (makes the technical changes, runs IT day to day). Footnote: a C3PAO, never us, assesses.",
        "left": "What Secure-Centric does",
        "right": "What your MSP does",
        "wpBlock": "core/compare-cards",
        "wpPattern": "secure-centric/compare-cards"
      },
      {
        "k": "steps_h",
        "s": 3,
        "t": "How an engagement starts",
        "len": "short",
        "n": "3 steps: discovery call → on-site visit and scoping → written plan and scope.",
        "count": 3,
        "wpBlock": "core/steps-h",
        "wpPattern": "secure-centric/steps-h",
        "steps": [
          {
            "no": "01",
            "title": "Discovery Call",
            "desc": "Confidential 30-min scoping call under bilateral NDA to review contract clauses, DFARS flowdowns, and timeline."
          },
          {
            "no": "02",
            "title": "On-Site Walkthrough & Scoping",
            "desc": "Physical inspection of server rooms, shop floor enclaves, and technical architecture to map CUI/FCI boundaries."
          },
          {
            "no": "03",
            "title": "Written Plan & Scope",
            "desc": "Detailed phase-by-phase compliance roadmap with flat-fee pricing, deliverables timeline, and SPRS baseline."
          }
        ]
      },
      {
        "k": "lead",
        "s": 3,
        "t": "Lead magnet download (email needed): First-Call Prep Checklist (what to have ready)",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "First-Call Prep Checklist (what to have ready)",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "medium",
        "n": "Repeating text-section block (unique to this page).",
        "items": [
          "Level 1 and Level 2 engagements are different jobs",
          "How long an engagement takes, and what changes it",
          "What we will ask you on the first call",
          "How you will hear from us"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "Level 1 and Level 2 engagements are different jobs",
            "paragraphs": [
              "Ensuring full compliance with level 1 and level 2 engagements are different jobs requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "How long an engagement takes, and what changes it",
            "paragraphs": [
              "Ensuring full compliance with how long an engagement takes, and what changes it requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "What we will ask you on the first call",
            "paragraphs": [
              "Ensuring full compliance with what we will ask you on the first call requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "How you will hear from us",
            "paragraphs": [
              "Ensuring full compliance with how you will hear from us requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "What does a CMMC consultant do?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How is a CMMC compliance engagement priced?",
            "a": "All Secure-Centric engagements are priced as a transparent, fixed flat-fee with milestone deliverables. There are zero hourly overages or unexpected scope expansions."
          },
          {
            "q": "Can we start with one part, like the SSP?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What do we own at the end?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What is the difference between an RPO, a consultant and an advisor?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC consulting",
          "NIST SP 800-171 compliance",
          "CMMC process",
          "Readiness assessment"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-3",
    "no": 3,
    "name": "CMMC consulting",
    "url": "/services/cmmc-consulting/",
    "type": "Service page (service 2 of 3: CMMC consulting, who needs it)",
    "group": "Services",
    "kw": "cmmc consultant (1,000/mo, KD 20)",
    "kw2": "cmmc consulting (1,000) · cmmc compliance consultant (880) · cmmc compliance consulting (590) · cmmc consulting services (260) · cmmc advisor (260)",
    "h1": "CMMC consulting for defense subcontractors, suppliers and manufacturers",
    "title": "CMMC Consultant for Defense Contractors | Secure-Centric",
    "meta": "Who needs a CMMC consultant? Subcontractors, suppliers and manufacturers handling FCI or CUI, by CMMC level, role and place in the supply chain. From a Cyber AB RPO.",
    "angle": "Gap file: no independent \"how to choose a CMMC consultant\" framework among the 16 RPOs, and peers describe their audience in one line (\"small-medium DIB contractors\"). This page wins by letting each buyer find themselves: by CMMC level, by role and by position in the supply chain, plus honest signs you need help.",
    "decisions": [
      "ICP page, organised three ways (your pick): by CMMC compliance tier (the primary filter), by corporate role and persona (buyer profiles), by position in the Defense Industrial Base.",
      "Audiences: subcontractors and suppliers, small and mid-size manufacturers, contractors who are stuck or starting over, and the companies that actually require an RPO.",
      "What we do (phases, deliverables, MSP comparison) moved to the CMMC compliance page; no testimonials or results here.",
      "\"How to choose a consultant\" (7 checks + scorecard) lives only here; removed from the RPO page so it is not repeated.",
      "Second of the 3 Services pages; menu label is plain \"CMMC consulting\".",
      "Screen 1 differs from CMMC compliance (Nov 2): \"Which one are you?\" hero with 4 audience tiles instead of the shared CTA card. The 3-chip \"Which describes you?\" quiz is removed because the hero tiles do that job.",
      "Audience paths (your pick): each audience gets a 3-4 step path through existing pages; tier and supply-chain cards link to the matching path."
    ],
    "blocks": [
      {
        "k": "hero_icp",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "\"Which one are you?\" hero, not the shared split hero. Left: eyebrow, H1, subhead, ONE primary CTA, microcopy. Right: 4 audience tiles (label only + \"See your path →\") that jump to that audience's path further down. Under the tiles: \"Not sure? Start with your CMMC level ↓\".",
        "eyebrow": "CMMC consulting · who we help",
        "sub": "If your contract puts FCI or CUI in your hands, CMMC applies to you. Pick the one that sounds like you and follow the path built for it.",
        "audiences": [
          "Subcontractor or supplier",
          "Small or mid-size manufacturer",
          "Stuck or starting over",
          "Need an RPO before a C3PAO assessment"
        ],
        "wpBlock": "core/hero-icp",
        "wpPattern": "secure-centric/hero-icp"
      },
      {
        "k": "tiers",
        "s": 2,
        "t": "By CMMC level: where your contract puts you",
        "len": "medium",
        "n": "Primary filter. 4 columns, one per compliance tier. Each: who it is for, what the contract requires, where most companies get stuck, our first step for you. Each card ends with \"Your path →\", which jumps to the matching audience path.",
        "items": [
          [
            "Level 1",
            "FCI only · 15 requirements · annual self-assessment"
          ],
          [
            "Level 2 (self)",
            "CUI · 110 requirements · self-assessment + SPRS"
          ],
          [
            "Level 2 (C3PAO)",
            "CUI · 110 requirements · third-party certification"
          ],
          [
            "Level 3",
            "Rare · named by the contracting officer · government-led"
          ]
        ],
        "wpBlock": "core/tiers",
        "wpPattern": "secure-centric/tiers"
      },
      {
        "k": "personas",
        "s": 2,
        "t": "By role: what each buyer needs from us",
        "len": "medium",
        "n": "Buyer profiles. 4 persona cards: role · what keeps them up at night · what they need to see · what we give them.",
        "items": [
          [
            "Owner / CEO (Affirming Official)",
            "Signs the annual affirmation; worried about contracts and False Claims Act risk"
          ],
          [
            "IT manager or MSP",
            "Capable generalist; unsure how assessors judge evidence or what is in scope"
          ],
          [
            "Contracts / compliance lead",
            "Fielding prime questionnaires and solicitation clauses; needs dates and documents"
          ],
          [
            "Engineering / operations lead",
            "Owns the drawings and specs (CUI); needs rules that do not stop production"
          ]
        ],
        "wpBlock": "core/personas",
        "wpPattern": "secure-centric/personas"
      },
      {
        "k": "dib",
        "s": 3,
        "t": "By position in the defense supply chain",
        "len": "medium",
        "n": "4 columns: position · typical trigger · typical level · first step. Each card ends with \"Your path →\" to the matching audience path.",
        "items": [
          {
            "role": "Prime Contractor",
            "trigger": "Mandated directly in primary DoD solicitation (DFARS 252.204-7021).",
            "level": "CMMC Level 2 (C3PAO) or Level 3",
            "firstStep": "Enterprise scoping & supplier compliance monitoring system."
          },
          {
            "role": "Tier 1-2 Subcontractor",
            "trigger": "Prime vendor requires CMMC certification as a condition of subcontract award.",
            "level": "CMMC Level 2 (C3PAO Certified)",
            "firstStep": "Facility walkthrough and CUI boundary segmentation."
          },
          {
            "role": "Small Supplier / Machine Shop",
            "trigger": "Receives engineering CAD files, technical specs, or build-to-print drawings.",
            "level": "CMMC Level 2 (Enclave or Company-Wide)",
            "firstStep": "Evaluate managed CUI enclave vs whole-network remediation."
          },
          {
            "role": "Services & Software Provider",
            "trigger": "Provides cloud hosting, engineering support, or IT services touching CUI/FCI.",
            "level": "CMMC Level 1 or Level 2",
            "firstStep": "FedRAMP Moderate equivalence and boundary validation."
          }
        ],
        "wpBlock": "core/dib",
        "wpPattern": "secure-centric/dib"
      },
      {
        "k": "paths",
        "s": 3,
        "t": "Your path, step by step",
        "len": "medium",
        "n": "One row per audience (the same 4 as the hero tiles). Each row: who it is, then 3-4 linked pages in the order to read or do them, ending at the page where we start working together. This is how the consulting page hands visitors into the rest of the site.",
        "items": [
          {
            "name": "Prime Contractors",
            "desc": "Must achieve Level 2 certification and enforce supplier flowdowns.",
            "steps": [
              "Readiness Check",
              "Enclave Scoping",
              "SSP & POA&M",
              "C3PAO Audit"
            ]
          },
          {
            "name": "Tier 1 & Tier 2 Subcontractors",
            "desc": "Facing urgent prime contractor questionnaires and DFARS 7012 clauses.",
            "steps": [
              "Gap Assessment",
              "Remediation Advisory",
              "Documentation",
              "Audit Defense"
            ]
          },
          {
            "name": "Small Machine Shops & Suppliers",
            "desc": "Receiving CUI engineering drawings with limited internal IT staff.",
            "steps": [
              "CUI Enclave Setup",
              "Policy Suite",
              "Readiness Review",
              "SPRS Defense"
            ]
          },
          {
            "name": "Software & Cloud Service Providers",
            "desc": "Providing software touching DoD systems requiring FedRAMP Moderate equivalence.",
            "steps": [
              "Cloud Scoping",
              "FedRAMP Verification",
              "SSP Authoring",
              "Certification"
            ]
          }
        ],
        "wpBlock": "core/paths",
        "wpPattern": "secure-centric/paths"
      },
      {
        "k": "bullets",
        "s": 3,
        "t": "Signs you need a CMMC consultant now",
        "len": "short",
        "n": "Stuck or starting over: unknown or low SPRS score · SSP copied from a template · POA&M items with no owner or date · a prime questionnaire with a deadline · CMMC clause in a solicitation and no plan · a past self-assessment that went badly · nobody owns CMMC.",
        "count": 7,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets",
        "items": [
          {
            "title": "Prime Contractor CMMC Questionnaire Received",
            "desc": "Your prime asks for your SPRS score, SSP date, or CMMC certification roadmap within 30 days."
          },
          {
            "title": "Upcoming DoD RFP with DFARS 7021",
            "desc": "Contract renewals require verified CMMC compliance as a prerequisite for submission."
          },
          {
            "title": "Negative or Uncalculated SPRS Score",
            "desc": "Your DoD score is below zero or based on guesswork rather than the official assessment guide."
          },
          {
            "title": "Uncertainty on CUI Boundaries",
            "desc": "You cannot definitively prove which servers, endpoints, and employees touch defense data."
          },
          {
            "title": "MSP Unfamiliar with NIST 800-171A",
            "desc": "Your IT provider manages day-to-day help desk but lacks defense compliance engineering expertise."
          }
        ]
      },
      {
        "k": "two_col",
        "s": 4,
        "t": "Who needs an RPO, and who may not",
        "len": "medium",
        "n": "Honest two columns: companies that really need RPO-level help (Level 2 with CUI, no in-house security lead, assessment date set) vs those who may manage alone (Level 1 with capable IT, a good template and time).",
        "wpBlock": "core/two-col",
        "wpPattern": "secure-centric/two-col",
        "col1": {
          "title": "Who Needs an RPO",
          "desc": "Companies facing high-stakes DoD contract requirements where audit failure carries severe operational or financial risk.",
          "items": [
            "Defense contractors with DFARS 252.204-7012 or 7021 in contracts",
            "Subcontractors receiving engineering drawings containing CUI",
            "Companies with upcoming prime contractor audit deadlines",
            "Organizations lacking dedicated in-house cybersecurity compliance staff",
            "Contractors preparing for an official C3PAO Level 2 certification"
          ]
        },
        "col2": {
          "title": "Who May Manage In-House",
          "desc": "Small suppliers with limited Federal Contract Information (FCI) and simple, standard IT environments.",
          "items": [
            "Level 1 contractors handling FCI only (15 basic safeguarding controls)",
            "Suppliers with an experienced internal full-time cybersecurity engineer",
            "Organizations with 12+ months before upcoming DoD contract solicitations",
            "Companies operating completely air-gapped from federal networks"
          ]
        }
      },
      {
        "k": "tool",
        "s": 4,
        "t": "How to choose a CMMC consultant: 7 checks",
        "len": "medium",
        "n": "Interactive 7-check scorer with live score card (the only place this framework appears).",
        "label": "7 checkboxes  →  score 0/7",
        "wpBlock": "core/tool",
        "wpPattern": "secure-centric/tool",
        "checks": [
          {
            "id": "c1",
            "label": "Accredited Cyber AB Registered Provider Organization (RPO)?",
            "required": true
          },
          {
            "id": "c2",
            "label": "Employs active, vetted Registered Practitioners (RPs)?",
            "required": true
          },
          {
            "id": "c3",
            "label": "Conducts in-person on-site walkthroughs (not just Zoom)?",
            "required": true
          },
          {
            "id": "c4",
            "label": "100% independent advisory (does not sell managed IT/tools)?",
            "required": true
          },
          {
            "id": "c5",
            "label": "Fixed flat-fee engagement pricing (no hidden scope creep)?",
            "required": true
          },
          {
            "id": "c6",
            "label": "Guarantees C3PAO first-time pass readiness in writing?",
            "required": true
          },
          {
            "id": "c7",
            "label": "Signs bilateral defense-grade NDA within 2 hours?",
            "required": true
          }
        ]
      },
      {
        "k": "lead",
        "s": 4,
        "t": "Lead magnet download (email needed): 7-check consultant scorecard",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "7-check consultant scorecard",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "Do I need a CMMC consultant, or can I do it in-house?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How do I choose a CMMC consultant?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Which firm gives the best CMMC preparation advice?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Do small suppliers and machine shops need a CMMC consultant?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Do primes need help with their supply chain?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC compliance services",
          "NIST SP 800-171 compliance",
          "What is a CMMC RPO?",
          "Level 1 checklist"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-4",
    "no": 4,
    "name": "CMMC readiness assessment",
    "url": "/services/cmmc-readiness-assessment/",
    "type": "Engagement stage page",
    "group": "Stages",
    "kw": "cmmc readiness (480/mo, KD 7)",
    "kw2": "cmmc readiness assessment (390) · cmmc assessment services (210) · cmmc readiness services (110) · cmmc readiness services importance government contract bid (90) · cmmc audit prep company (70)",
    "h1": "CMMC readiness assessment: know your gaps and your score before the official assessment",
    "title": "CMMC Readiness Assessment for Defense Contractors",
    "meta": "A CMMC readiness assessment from a Cyber AB Registered Provider Organization: your gaps, a NIST 800-171 score and a fix list. Not the official assessment.",
    "angle": "Gap file: DIBCAC/JSVA preparation is unaddressed by peers; add one honest block if offered. Peers: 1,692 and 931 words; one has pricing, both a form and 5 FAQs.",
    "decisions": [
      "\"Our approach\" = 5 vertical steps, each showing who is involved and the output.",
      "On-site visit highlight = icon box: what happens on site (walkthrough, interviews, evidence check).",
      "Offer model: Included in the CMMC compliance engagement; not sold on its own (CMMC Study Guide, \"Where Secure-Centric fits\"). Shown as one line under the hero (stage name + link to the process page), not a repeated journey strip.",
      "Stage-only content (Nov 2): \"You're at this stage if…\" line replaces the audience list; generic benefit cards removed; one steps block about this stage only."
    ],
    "blocks": [
      {
        "k": "hero_split",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Split hero (B2B best practice): outcome-led H1, 2-3 line subhead, ONE primary CTA near the headline with reassurance microcopy, trust badges next to the CTA. Right: CTA card \"Talk to a CMMC advisor\" with 3 things you get on the call. No autoplay video, no pop-up. The stage name sits in the band under the hero (block 2), not in the hero itself.",
        "eyebrow": "Part of CMMC compliance · CMMC readiness assessment",
        "sub": "See every gap and your estimated NIST SP 800-171 score before an assessor does. We come to your site; this is not the official assessment.",
        "link": "What you leave with",
        "wpBlock": "core/hero-split",
        "wpPattern": "secure-centric/hero-split"
      },
      {
        "k": "stageline",
        "s": 1,
        "t": "You're at this stage if…",
        "len": "very short",
        "stage": "Readiness review",
        "line": "You know CMMC applies but not where you stand or what is in scope.",
        "n": "Thin band straight under the hero: stage name + one sentence. Replaces the \"Who it is for\" list so audience content lives only on the CMMC consulting page. Left: \"Stage: Readiness review · part of CMMC compliance services →\". Right: the sentence. Link to the CMMC process page for the full journey (not repeated here).",
        "wpBlock": "core/stageline",
        "wpPattern": "secure-centric/stageline",
        "serviceLink": "#page-2",
        "processLink": "#page-19"
      },
      {
        "k": "steps_v",
        "s": 2,
        "t": "What happens in the readiness review",
        "len": "medium",
        "n": "5 vertical steps; columns: step · who is involved · what you get. This stage only: what happens, who is in the room, what you leave with.",
        "count": 5,
        "wpBlock": "core/steps-v",
        "wpPattern": "secure-centric/steps-v",
        "steps": [
          {
            "step": "01",
            "name": "Scoping Re-Verification",
            "who": "Secure-Centric RP + IT Lead",
            "output": "Validated Asset Boundary Diagram"
          },
          {
            "step": "02",
            "name": "Documentation Deep Dive",
            "who": "Secure-Centric + Quality Director",
            "output": "SSP & Policy Completeness Scorecard"
          },
          {
            "step": "03",
            "name": "Assessor Interview Simulation",
            "who": "Department Leads & System Admins",
            "output": "Interview Readiness Notes & FAQ Prep"
          },
          {
            "step": "04",
            "name": "Live Technical Testing",
            "who": "Secure-Centric + Network Admin",
            "output": "MFA, Encryption & Logging Validation"
          },
          {
            "step": "05",
            "name": "Official Readiness Sign-Off",
            "who": "Secure-Centric Principals + C-Suite",
            "output": "Audit Go/No-Go Recommendation Report"
          }
        ]
      },
      {
        "k": "lead",
        "s": 2,
        "t": "Lead magnet download (email needed): CMMC Readiness Checklist",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "CMMC Readiness Checklist",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "iconbox",
        "s": 2,
        "t": "On-site visit",
        "len": "short",
        "n": "Highlight icon box: what happens on site: walkthrough, interviews, evidence check.",
        "items": [
          "Walkthrough",
          "Interviews",
          "Evidence check"
        ],
        "wpBlock": "core/iconbox",
        "wpPattern": "secure-centric/iconbox",
        "lead": "An in-person walkthrough is step 1 of every Secure-Centric engagement. You cannot verify CMMC compliance over a web call.",
        "points": [
          "Physical inspection of server rooms, wiring closets, and environmental controls",
          "Verification of shop-floor CNC machines, 3D printers, and test equipment network isolation",
          "Direct inspection of visitor badges, physical escort logs, and secure storage containers",
          "Face-to-face interviews with system administrators and department heads to confirm actual practices"
        ]
      },
      {
        "k": "two_col",
        "s": 4,
        "t": "Readiness assessment versus the official assessment",
        "len": "medium",
        "n": "Two columns.",
        "wpBlock": "core/two-col",
        "wpPattern": "secure-centric/two-col",
        "col1": {
          "title": "RPO Readiness Assessment",
          "desc": "A collaborative, advisory diagnostic that finds gaps, tests controls, and prepares your team to pass.",
          "items": [
            "Diagnostic and preparatory — identifies what needs fixing",
            "Collaborative: we work alongside your team and MSP",
            "Includes remediation advice and technical recommendations",
            "Covers evidence gathering and assessor interview rehearsal",
            "Guarantees readiness before committing to audit costs"
          ]
        },
        "col2": {
          "title": "Official C3PAO Assessment",
          "desc": "A formal, independent third-party evaluation that issues your official pass/fail certification.",
          "items": [
            "Evaluative only — strictly cannot provide advice or remediation",
            "Conducted by independent Certified CMMC Assessors (CCAs)",
            "Failures are recorded and can delay contract awards",
            "Requires fully mature evidence operational for at least 90 days",
            "High financial cost with zero do-overs if major deficiencies exist"
          ]
        }
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "What a readiness assessment looks at",
          "Preparing for the assessor (incl. DIBCAC/JSVA note if offered)",
          "From readiness to the gap assessment",
          "Who should be involved",
          "Signs you are ready for the official assessment"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "What a readiness assessment looks at",
            "paragraphs": [
              "Ensuring full compliance with what a readiness assessment looks at requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Preparing for the assessor (incl. DIBCAC/JSVA note if offered)",
            "paragraphs": [
              "Ensuring full compliance with preparing for the assessor (incl. dibcac/jsva note if offered) requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "From readiness to the gap assessment",
            "paragraphs": [
              "Ensuring full compliance with from readiness to the gap assessment requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Who should be involved",
            "paragraphs": [
              "Ensuring full compliance with who should be involved requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Signs you are ready for the official assessment",
            "paragraphs": [
              "Ensuring full compliance with signs you are ready for the official assessment requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "How do I prepare for a CMMC assessment?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Is a readiness assessment the same as a C3PAO assessment?",
            "a": "No RPO can certify a defense contractor. Under Cyber AB rules, only accredited C3PAOs can issue official certifications. As an RPO, Secure-Centric prepares you to pass with a 100% C3PAO pass guarantee."
          },
          {
            "q": "What does a CMMC readiness assessment cover?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How much does a CMMC assessment cost?",
            "a": "All Secure-Centric engagements are priced as a transparent, fixed flat-fee with milestone deliverables. There are zero hourly overages or unexpected scope expansions."
          },
          {
            "q": "Who is the best CMMC assessment provider for a subcontractor?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How long does a readiness assessment take?",
            "a": "Most defense contractors complete their readiness, remediation, and documentation within 4 to 8 months, depending on boundary size and facility count."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC compliance services",
          "NIST SP 800-171 compliance",
          "Gap and mock assessment",
          "Remediation advisory"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-5",
    "no": 5,
    "name": "CMMC gap and mock assessment",
    "url": "/services/cmmc-readiness-assessment/gap-assessment/",
    "type": "Engagement stage page",
    "group": "Stages",
    "kw": "cmmc gap assessment (320/mo, KD 2)",
    "kw2": "cmmc gap analysis (210) · cmmc mock assessment (90) · nist 800-171 gap assessment (70) · cmmc gap assessment definition (70) · cmmc pre assessment (40)",
    "h1": "CMMC gap assessment and mock assessment for defense contractors",
    "title": "CMMC Gap Assessment & Mock Assessment | Secure-Centric",
    "meta": "CMMC gap assessment from a Cyber AB Registered Provider Organization: every NIST 800-171 requirement reviewed, a ranked fix list, mock assessment option.",
    "angle": "Pages for this term run 1,682 and 2,330 words and both carry a table. Live page has stages and an FAQ that must carry over; add deliverables and a sample. KD 2, so winnable fast.",
    "decisions": [
      "Sample findings table columns: Requirement · Status · Risk · Fix · Owner.",
      "Add a 4-column comparison: gap vs mock vs readiness vs pre-assessment.",
      "Offer model: Included in the CMMC compliance engagement; not sold on its own (CMMC Study Guide, \"Where Secure-Centric fits\"). Shown as one line under the hero (stage name + link to the process page), not a repeated journey strip.",
      "Stage-only content (Nov 2): \"You're at this stage if…\" line replaces the audience list; generic benefit cards removed; one steps block about this stage only."
    ],
    "blocks": [
      {
        "k": "hero_split",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Split hero (B2B best practice): outcome-led H1, 2-3 line subhead, ONE primary CTA near the headline with reassurance microcopy, trust badges next to the CTA. Right: CTA card \"Talk to a CMMC advisor\" with 3 things you get on the call. No autoplay video, no pop-up. The stage name sits in the band under the hero (block 2), not in the hero itself.",
        "eyebrow": "Part of CMMC compliance · Gap and mock assessment",
        "sub": "Every NIST SP 800-171 requirement checked against how you really work, a ranked fix list, and a rehearsal of assessment day if you want one.",
        "link": "See a sample finding",
        "wpBlock": "core/hero-split",
        "wpPattern": "secure-centric/hero-split"
      },
      {
        "k": "stageline",
        "s": 1,
        "t": "You're at this stage if…",
        "len": "very short",
        "stage": "Gap assessment + readiness review",
        "line": "You have an SSP and a score and want to know how an assessor would grade you before it counts.",
        "n": "Thin band straight under the hero: stage name + one sentence. Replaces the \"Who it is for\" list so audience content lives only on the CMMC consulting page. Left: \"Stage: Gap assessment + readiness review · part of CMMC compliance services →\". Right: the sentence. Link to the CMMC process page for the full journey (not repeated here).",
        "wpBlock": "core/stageline",
        "wpPattern": "secure-centric/stageline",
        "serviceLink": "#page-2",
        "processLink": "#page-19"
      },
      {
        "k": "bullets",
        "s": 2,
        "t": "What you receive from the gap assessment",
        "len": "short",
        "n": "List of points.",
        "count": 4,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets",
        "items": [
          {
            "title": "Comprehensive 110-Control Findings Register",
            "desc": "Detailed spreadsheet mapping all 320 assessment objectives with pass, fail, or partial statuses."
          },
          {
            "title": "Defensible DoD SPRS Score Calculation",
            "desc": "Mathematically verified score (-203 to +110) calculated under official DoD scoring methodology."
          },
          {
            "title": "Prioritized Remediation Roadmap",
            "desc": "Step-by-step technical and procedural fix schedule with estimated costs and milestone dates."
          },
          {
            "title": "Executive Presentation & Briefing",
            "desc": "Clear summary deck for board and C-suite detailing contract risk, budget requirements, and timelines."
          }
        ]
      },
      {
        "k": "table",
        "s": 2,
        "t": "Sample findings table",
        "len": "short",
        "n": "Comparison table with 4 example rows.",
        "cols": [
          "Requirement",
          "Status",
          "Risk",
          "Fix",
          "Owner"
        ],
        "rows": 4,
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table"
      },
      {
        "k": "lead",
        "s": 2,
        "t": "Lead magnet download (email needed): Assessment-Day Prep Checklist",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "Assessment-Day Prep Checklist",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "table",
        "s": 4,
        "t": "Gap, mock, readiness or pre-assessment: which one?",
        "len": "short",
        "n": "4-column comparison (what it is · when · output).",
        "cols": [
          "",
          "Gap",
          "Mock",
          "Readiness",
          "Pre-assessment"
        ],
        "rows": [
          [
            "Gap Assessment",
            "Identify missing controls against NIST 800-171",
            "Secure-Centric RPs",
            "SPRS Score + Itemized Remediation Plan"
          ],
          [
            "Remediation Review",
            "Verify fixes and close out open POA&M items",
            "Secure-Centric + IT",
            "Updated SSP + Validated Evidence Binder"
          ],
          [
            "Mock Assessment",
            "Full rehearsal simulating exact C3PAO audit day",
            "Senior Lead RP",
            "Go/No-Go Decision + Assessor Defense Prep"
          ],
          [
            "Official Assessment",
            "Issue formal Level 2 CMMC certification",
            "Accredited C3PAO",
            "Official DoD CMMC Certification (3 Years)"
          ]
        ],
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table",
        "headers": [
          "Assessment Type",
          "Purpose",
          "Who Performs It",
          "Outcome / Deliverable"
        ]
      },
      {
        "k": "steps_h",
        "s": 4,
        "t": "What happens in the gap and mock assessment",
        "len": "short",
        "n": "4 numbered steps. This stage only: what happens, who is in the room, what you leave with.",
        "count": 4,
        "wpBlock": "core/steps-h",
        "wpPattern": "secure-centric/steps-h",
        "steps": [
          {
            "no": "01",
            "title": "Objective Scoping",
            "desc": "Define boundaries and collect existing network architecture, policies, and hardware inventories."
          },
          {
            "no": "02",
            "title": "110-Control Evidence Audit",
            "desc": "Deep dive into 320 assessment objectives with interviews, technical tests, and artifact verification."
          },
          {
            "no": "03",
            "title": "SPRS Scoring & Findings",
            "desc": "Calculate official defensible DoD score (-203 to +110) with itemized deficiency register."
          },
          {
            "no": "04",
            "title": "Actionable Remediation Plan",
            "desc": "Prioritized fixes with cost estimates, technical specifications, and POA&M draft."
          }
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "Common gaps we find",
          "How evidence is judged",
          "How gaps affect your SPRS score",
          "What a mock assessment day feels like"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "Common gaps we find",
            "paragraphs": [
              "Ensuring full compliance with common gaps we find requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "How evidence is judged",
            "paragraphs": [
              "Ensuring full compliance with how evidence is judged requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "How gaps affect your SPRS score",
            "paragraphs": [
              "Ensuring full compliance with how gaps affect your sprs score requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "What a mock assessment day feels like",
            "paragraphs": [
              "Ensuring full compliance with what a mock assessment day feels like requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "What is a CMMC gap assessment?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Gap assessment, mock assessment, readiness assessment or pre-assessment: which one?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What causes the most gaps in NIST 800-171 compliance?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Who should run my gap assessment?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How do I reduce the gaps an assessor would find?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Will I get a score?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC compliance services",
          "NIST SP 800-171 compliance",
          "Readiness assessment",
          "Remediation advisory"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-6",
    "no": 6,
    "name": "NIST SP 800-171 compliance services",
    "url": "/services/nist-800-171-compliance/",
    "type": "Service page (service 3 of 3: NIST SP 800-171 compliance)",
    "group": "Services",
    "kw": "nist 800-171 compliance consultant (260/mo, KD 9)",
    "kw2": "nist compliance services (390) · nist compliance consultant (260) · nist compliance solutions (260) · nist 800-171 compliance consulting (170) · nist continuous compliance (90)",
    "h1": "NIST 800-171 compliance services for defense contractors",
    "title": "NIST 800-171 Compliance Consultant | Secure-Centric",
    "meta": "NIST 800-171 compliance services from a Cyber AB Registered Provider Organization: assessment, fixes, SSP/POA&M and SPRS support for DFARS 7012.",
    "angle": "Live /nist-800-171 mixes service and education; this page is the commercial half. Peers: 1,098 and 1,074 words, one with no FAQ and no proof.",
    "decisions": [
      "\"A way to estimate their score\" = button to the SPRS checklist (no estimator tool on this page).",
      "14 control families and Rev 2 vs Rev 3 removed here (the NIST 800-171 guide owns them); \"fully explained\" replaced by \"What we do for NIST SP 800-171\"."
    ],
    "blocks": [
      {
        "k": "hero_split",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Split hero (B2B best practice): outcome-led H1, 2-3 line subhead, ONE primary CTA near the headline with reassurance microcopy, trust badges next to the CTA. Right: CTA card \"Talk to a CMMC advisor\" with 3 things you get on the call. No autoplay video, no pop-up.",
        "eyebrow": "NIST 800-171 compliance",
        "sub": "Yes: DFARS 7012 means you must meet NIST SP 800-171. We assess, guide the fixes and prepare your SSP, POA&M and SPRS score.",
        "link": "Estimate your score: SPRS checklist",
        "wpBlock": "core/hero-split",
        "wpPattern": "secure-centric/hero-split"
      },
      {
        "k": "bullets",
        "s": 1,
        "t": "What we do for NIST SP 800-171",
        "len": "medium",
        "n": "What we deliver for DFARS 7012 contracts: SPRS score you can defend, SSP, POA&M, 7019/7020 support, annual upkeep. The explanation of the standard lives on the NIST 800-171 guide (linked).",
        "paras": 3,
        "count": 5,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets",
        "items": [
          {
            "title": "DFARS 252.204-7012 Scoping",
            "desc": "Identify cyber incident reporting boundaries, FedRAMP Moderate cloud compliance, and CUI handling."
          },
          {
            "title": "DFARS 252.204-7019 SPRS Scoring",
            "desc": "Calculate and defend your Supplier Performance Risk System score before government submission."
          },
          {
            "title": "DFARS 252.204-7020 DIBCAC Support",
            "desc": "Prepare your documentation and staff for potential DoD DIBCAC basic or medium assessments."
          },
          {
            "title": "Comprehensive System Security Plan (SSP)",
            "desc": "Author complete, assessor-ready documentation reflecting all 110 security controls in practice."
          }
        ]
      },
      {
        "k": "two_col",
        "s": 2,
        "t": "NIST 800-171 versus CMMC",
        "len": "short",
        "n": "Two columns side by side.",
        "wpBlock": "core/two-col",
        "wpPattern": "secure-centric/two-col",
        "col1": {
          "title": "NIST SP 800-171 Standard",
          "desc": "The technical cybersecurity standard established by NIST containing 110 controls across 14 security families.",
          "items": [
            "Published technical requirements for safeguarding CUI",
            "Incorporated into defense contracts via DFARS 252.204-7012",
            "Requires entering an SPRS score into the DoD database",
            "Allows self-assessment scoring methodology",
            "Forms the exact technical baseline for CMMC Level 2"
          ]
        },
        "col2": {
          "title": "CMMC Framework",
          "desc": "The Department of Defense verification and certification program that enforces NIST 800-171 compliance.",
          "items": [
            "Verification program ensuring contractors actually implement NIST controls",
            "Introduces mandatory C3PAO third-party audits for Level 2",
            "Requires annual executive senior official affirmations",
            "Restricts or eliminates long-term open POA&Ms",
            "Condition of defense contract award under DFARS 252.204-7021"
          ]
        }
      },
      {
        "k": "lead",
        "s": 2,
        "t": "Lead magnet download (email needed): DFARS 7012 / 7019 / 7020 Contract Clause Checklist",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "DFARS 7012 / 7019 / 7020 Contract Clause Checklist",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "cards",
        "s": 3,
        "t": "Benefits of getting NIST 800-171 right",
        "len": "short",
        "n": "4 boxes.",
        "cols": 4,
        "count": 4,
        "wpBlock": "core/cards",
        "wpPattern": "secure-centric/cards",
        "items": [
          {
            "title": "Win & Retain DoD Contracts",
            "desc": "Satisfy mandatory Section I DFARS contract clauses and qualify for prime contractor supply chain tiers."
          },
          {
            "title": "Defend Your SPRS Score",
            "desc": "Establish an auditable score between -203 and +110 that withstands government DIBCAC review."
          },
          {
            "title": "Eliminate False Claims Act Liability",
            "desc": "Prevent severe civil liability from submitting inaccurate self-assessment scores to the federal government."
          },
          {
            "title": "Streamline CMMC Level 2 Transition",
            "desc": "NIST SP 800-171 is the exact technical baseline for CMMC Level 2—get both done in a single unified engagement."
          }
        ]
      },
      {
        "k": "steps_h",
        "s": 4,
        "t": "How a NIST 800-171 engagement runs",
        "len": "short",
        "n": "Numbered steps.",
        "count": 4,
        "wpBlock": "core/steps-h",
        "wpPattern": "secure-centric/steps-h",
        "steps": [
          {
            "no": "01",
            "title": "Clause Scoping (7012/7019/7020)",
            "desc": "Identify federal contract clauses and determine whether basic or specified CUI is received."
          },
          {
            "no": "02",
            "title": "On-Site Technical Walkthrough",
            "desc": "Verify physical access, network perimeter, MFA, and cloud storage compliance."
          },
          {
            "no": "03",
            "title": "SSP & POA&M Development",
            "desc": "Co-author comprehensive System Security Plan and itemized Plan of Action."
          },
          {
            "no": "04",
            "title": "SPRS Submission Defense",
            "desc": "Support entering verified score into DoD Supplier Performance Risk System with audit trail."
          }
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "DFARS 7012 and CMMC: do I need both?",
          "Staying compliant after the first pass",
          "Who NIST 800-171 applies to",
          "Common NIST 800-171 pitfalls"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "DFARS 7012 and CMMC: do I need both?",
            "paragraphs": [
              "Ensuring full compliance with dfars 7012 and cmmc: do i need both? requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Staying compliant after the first pass",
            "paragraphs": [
              "Ensuring full compliance with staying compliant after the first pass requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Who NIST 800-171 applies to",
            "paragraphs": [
              "Ensuring full compliance with who nist 800-171 applies to requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Common NIST 800-171 pitfalls",
            "paragraphs": [
              "Ensuring full compliance with common nist 800-171 pitfalls requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "How do I become NIST 800-171 compliant?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Is there software that makes me NIST 800-171 compliant?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Does a small business need NIST 800-171?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Who can help with NIST 800-171 implementation?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How do we keep our SPRS score current?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC compliance services",
          "NIST 800-171 guide",
          "SPRS checklist",
          "SSP, POA&M and policies"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-7",
    "no": 7,
    "name": "CMMC remediation advisory",
    "url": "/services/cmmc-implementation-remediation/",
    "type": "Engagement stage page",
    "group": "Stages",
    "kw": "cmmc implementation (170/mo, KD 33)",
    "kw2": "cmmc gap remediation (70) · prepare for cmmc compliance (70) · best cmmc implementation services for CUI (70) · best cybersecurity compliance consulting for cmmc preparation (70) · cmmc remediation services (50)",
    "h1": "CMMC implementation and remediation advisory for defense contractors",
    "title": "CMMC Implementation & Remediation Advisory",
    "meta": "Fix your CMMC gaps in the right order. A Cyber AB Registered Provider Organization advises and documents while your IT team makes the changes.",
    "angle": "Gap file: neutral enclave vs full-scope guidance; a \"remediate vs enclave\" aid is the unique block. Peer example: 900 words, no FAQ, no pricing; KD 33 is the highest of the service set, so differentiation matters.",
    "decisions": [
      "\"Remediate vs enclave\" = interactive 3-question aid.",
      "\"Our approach\" = vertical steps with who-does-what (Secure-Centric advises and documents, your IT/MSP makes the changes).",
      "Offer model: Included in the CMMC compliance engagement; not sold on its own (CMMC Study Guide, \"Where Secure-Centric fits\"). Shown as one line under the hero (stage name + link to the process page), not a repeated journey strip.",
      "Stage-only content (Nov 2): \"You're at this stage if…\" line replaces the audience list; generic benefit cards removed; one steps block about this stage only."
    ],
    "blocks": [
      {
        "k": "hero_split",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Split hero (B2B best practice): outcome-led H1, 2-3 line subhead, ONE primary CTA near the headline with reassurance microcopy, trust badges next to the CTA. Right: CTA card \"Talk to a CMMC advisor\" with 3 things you get on the call. No autoplay video, no pop-up. The stage name sits in the band under the hero (block 2), not in the hero itself.",
        "eyebrow": "Part of CMMC compliance · Remediation advisory",
        "sub": "We advise and document; your IT team or MSP makes the changes. Fix the gaps in the order that lifts your score and lowers risk first.",
        "link": "Who does what",
        "wpBlock": "core/hero-split",
        "wpPattern": "secure-centric/hero-split"
      },
      {
        "k": "stageline",
        "s": 1,
        "t": "You're at this stage if…",
        "len": "very short",
        "stage": "Remediation",
        "line": "You have a list of gaps and need them closed in the right order, by the right people.",
        "n": "Thin band straight under the hero: stage name + one sentence. Replaces the \"Who it is for\" list so audience content lives only on the CMMC consulting page. Left: \"Stage: Remediation · part of CMMC compliance services →\". Right: the sentence. Link to the CMMC process page for the full journey (not repeated here).",
        "wpBlock": "core/stageline",
        "wpPattern": "secure-centric/stageline",
        "serviceLink": "#page-2",
        "processLink": "#page-19"
      },
      {
        "k": "text",
        "s": 1,
        "t": "Typical remediation themes",
        "len": "long",
        "n": "Heading + paragraphs.",
        "paras": 4,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "bullets",
        "s": 2,
        "t": "What you receive during remediation",
        "len": "short",
        "n": "List of points.",
        "count": 4,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets",
        "items": [
          {
            "title": "Technical Security Configurations",
            "desc": "Direct guidance configuring FIPS-validated encryption, multi-factor authentication, and centralized logging."
          },
          {
            "title": "Complete Policy & Procedure Suite",
            "desc": "14 customized operational policies governing access control, incident response, and media protection."
          },
          {
            "title": "Evidence Binder Index",
            "desc": "Organized repository of screenshots, logs, and artifacts ready for external assessor review."
          },
          {
            "title": "Assessor Interview Preparation",
            "desc": "Mock interviews training your IT leads and department heads to answer CCA questions confidently."
          }
        ]
      },
      {
        "k": "steps_v",
        "s": 2,
        "t": "What happens during remediation",
        "len": "medium",
        "n": "Vertical steps; columns: step · who does it (Secure-Centric / your IT or MSP) · output. This stage only: what happens, who is in the room, what you leave with.",
        "count": 5,
        "wpBlock": "core/steps-v",
        "wpPattern": "secure-centric/steps-v",
        "steps": [
          {
            "step": "01",
            "name": "POA&M Prioritization",
            "who": "Secure-Centric + IT Lead",
            "output": "Weighted Risk Remediation Roadmap"
          },
          {
            "step": "02",
            "name": "Technical Fix Guidance",
            "who": "Your IT/MSP (guided by us)",
            "output": "MFA, FIPS 140-3 & SIEM Configs"
          },
          {
            "step": "03",
            "name": "Boundary Isolation",
            "who": "Secure-Centric + Network Eng",
            "output": "Enclave Firewall Rules & Air-Gap Access"
          },
          {
            "step": "04",
            "name": "Policy Drafting & SOPs",
            "who": "Secure-Centric Compliance Team",
            "output": "14 Core Domain Governance Policies"
          },
          {
            "step": "05",
            "name": "Deficiency Closeout Audit",
            "who": "Lead Registered Practitioner",
            "output": "Closed POA&M Items & Evidence Binder"
          }
        ]
      },
      {
        "k": "lead",
        "s": 3,
        "t": "Lead magnet download (email needed): Top 10 CMMC Gaps Checklist",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "Top 10 CMMC Gaps Checklist",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "tool",
        "s": 4,
        "t": "Remediate everywhere, or shrink the scope?",
        "len": "short",
        "n": "Unique block. Interactive 3-question aid: answers point to \"fix company-wide\" or \"consider an enclave\" with a link to enclave advisory.",
        "label": "3 questions  →  \"Fix company-wide\" / \"Consider an enclave\"",
        "wpBlock": "core/tool",
        "wpPattern": "secure-centric/tool",
        "checks": [
          {
            "id": "c1",
            "label": "Accredited Cyber AB Registered Provider Organization (RPO)?",
            "required": true
          },
          {
            "id": "c2",
            "label": "Employs active, vetted Registered Practitioners (RPs)?",
            "required": true
          },
          {
            "id": "c3",
            "label": "Conducts in-person on-site walkthroughs (not just Zoom)?",
            "required": true
          },
          {
            "id": "c4",
            "label": "100% independent advisory (does not sell managed IT/tools)?",
            "required": true
          },
          {
            "id": "c5",
            "label": "Fixed flat-fee engagement pricing (no hidden scope creep)?",
            "required": true
          },
          {
            "id": "c6",
            "label": "Guarantees C3PAO first-time pass readiness in writing?",
            "required": true
          },
          {
            "id": "c7",
            "label": "Signs bilateral defense-grade NDA within 2 hours?",
            "required": true
          }
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "How we prioritise: POA&M rules and SPRS weights",
          "Working with your MSP",
          "Proving each fix",
          "A typical remediation order",
          "After remediation"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "How we prioritise: POA&M rules and SPRS weights",
            "paragraphs": [
              "Ensuring full compliance with how we prioritise: poa&m rules and sprs weights requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Working with your MSP",
            "paragraphs": [
              "Ensuring full compliance with working with your msp requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Proving each fix",
            "paragraphs": [
              "Ensuring full compliance with proving each fix requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "A typical remediation order",
            "paragraphs": [
              "Ensuring full compliance with a typical remediation order requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "After remediation",
            "paragraphs": [
              "Ensuring full compliance with after remediation requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "Who makes the changes, you or us?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "In what order should we fix our gaps?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Do you provide logging, monitoring or incident-response tools?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What are the best CMMC implementation services for CUI?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How long does remediation take?",
            "a": "Most defense contractors complete their readiness, remediation, and documentation within 4 to 8 months, depending on boundary size and facility count."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC compliance services",
          "NIST SP 800-171 compliance",
          "Gap and mock assessment",
          "Enclave advisory"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-8",
    "no": 8,
    "name": "SSP, POA&M and policy documentation",
    "url": "/services/cmmc-implementation-remediation/ssp-poam-development/",
    "type": "Engagement stage page",
    "group": "Stages",
    "kw": "ssp development (70/mo, KD 18)",
    "kw2": "ssp and poam (50) · cmmc ssp consultant · ssp and poam development · trusted vendors cmmc 2.0 policy procedure development (40)",
    "h1": "SSP and POA&M development for CMMC and NIST 800-171",
    "title": "SSP Development and POA&M Support for CMMC",
    "meta": "Get a System Security Plan and POA&M written with your team by a Cyber AB Registered Provider Organization: accurate, defensible, ready for assessors.",
    "angle": "Peer: 804 words, no FAQ; keyword has 70/mo and low KD, so the win is conversion on a buyer-intent page. Gap: \"built with you\" answers the boilerplate fear.",
    "decisions": [
      "\"What goes in each document\" = 3 cards with icon + bullets (SSP · POA&M · policies).",
      "4-step \"templates + our review\" = vertical steps with who-does-what (your team drafts / we review / you approve).",
      "Offer model: Included in the CMMC compliance engagement; not sold on its own (CMMC Study Guide, \"Where Secure-Centric fits\"). Shown as one line under the hero (stage name + link to the process page), not a repeated journey strip.",
      "Stage-only content (Nov 2): \"You're at this stage if…\" line replaces the audience list; generic benefit cards removed; one steps block about this stage only."
    ],
    "blocks": [
      {
        "k": "hero_split",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Split hero (B2B best practice): outcome-led H1, 2-3 line subhead, ONE primary CTA near the headline with reassurance microcopy, trust badges next to the CTA. Right: CTA card \"Talk to a CMMC advisor\" with 3 things you get on the call. No autoplay video, no pop-up. The stage name sits in the band under the hero (block 2), not in the hero itself.",
        "eyebrow": "Part of CMMC compliance · SSP, POA&M and policies",
        "sub": "Your System Security Plan, POA&M and policies, written with your team and reviewed against what assessors check. Yes, you need both documents.",
        "link": "What goes in each document",
        "wpBlock": "core/hero-split",
        "wpPattern": "secure-centric/hero-split"
      },
      {
        "k": "stageline",
        "s": 1,
        "t": "You're at this stage if…",
        "len": "very short",
        "stage": "Documentation",
        "line": "Your SSP, POA&M or policies are missing, copied from a template, or out of date.",
        "n": "Thin band straight under the hero: stage name + one sentence. Replaces the \"Who it is for\" list so audience content lives only on the CMMC consulting page. Left: \"Stage: Documentation · part of CMMC compliance services →\". Right: the sentence. Link to the CMMC process page for the full journey (not repeated here).",
        "wpBlock": "core/stageline",
        "wpPattern": "secure-centric/stageline",
        "serviceLink": "#page-2",
        "processLink": "#page-19"
      },
      {
        "k": "cards",
        "s": 2,
        "t": "What goes in each document",
        "len": "short",
        "n": "3 cards with icon + bullets.",
        "cols": 3,
        "count": 3,
        "items": [
          "System Security Plan (SSP)",
          "POA&M",
          "Policies and procedures"
        ],
        "wpBlock": "core/cards",
        "wpPattern": "secure-centric/cards"
      },
      {
        "k": "lead",
        "s": 2,
        "t": "Lead magnet download (email needed): SSP Outline Template",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "SSP Outline Template",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "steps_v",
        "s": 3,
        "t": "Templates plus expert review",
        "len": "medium",
        "n": "4 vertical steps; columns: step · who (your team drafts / we review / you approve) · output.",
        "count": 4,
        "wpBlock": "core/steps-v",
        "wpPattern": "secure-centric/steps-v",
        "steps": [
          {
            "step": "01",
            "name": "System Identification",
            "who": "Secure-Centric + System Admins",
            "output": "Comprehensive Hardware & Software Inventory"
          },
          {
            "step": "02",
            "name": "Control Implementation Statements",
            "who": "Secure-Centric RPs",
            "output": "110 Detailed Narratives Matching NIST 800-171A"
          },
          {
            "step": "03",
            "name": "Network & Data-Flow Diagrams",
            "who": "Secure-Centric Technical Architect",
            "output": "CUI Flow Diagrams & Boundary Topology"
          },
          {
            "step": "04",
            "name": "POA&M Milestones Formulation",
            "who": "Secure-Centric + Leadership",
            "output": "Defensible Milestones with Resource Allocations"
          }
        ]
      },
      {
        "k": "table",
        "s": 4,
        "t": "A sample SSP outline",
        "len": "short",
        "n": "Table: section · what goes in it.",
        "cols": [
          "SSP section",
          "What goes in it"
        ],
        "rows": [
          [
            "System Security Plan (SSP)",
            "Complete description of boundary and 110 controls",
            "Annual or when major changes occur",
            "Must describe operational reality with zero fluff"
          ],
          [
            "Plan of Action & Milestones (POA&M)",
            "List of temporary control deficiencies and fix dates",
            "Monthly tracking until closeout",
            "Only 1-point and select 3-point controls allowed"
          ],
          [
            "Operational Policies (14 Families)",
            "Mandatory governance SOPs for all security domains",
            "Annual review and approval",
            "Assessor verifies staff actively follow each policy"
          ],
          [
            "Network Architecture Diagrams",
            "Visual topology of CUI boundary and segmentation",
            "Whenever infrastructure updates",
            "Assessor traces data paths from entry to storage"
          ]
        ],
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table",
        "headers": [
          "Document Type",
          "Primary Purpose",
          "Required Update Frequency",
          "C3PAO Assessor Expectation"
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "POA&M: what can and cannot go on it",
          "Common SSP mistakes",
          "Keeping your SSP current",
          "Diagrams and inventories assessors expect"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "POA&M: what can and cannot go on it",
            "paragraphs": [
              "Ensuring full compliance with poa&m: what can and cannot go on it requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Common SSP mistakes",
            "paragraphs": [
              "Ensuring full compliance with common ssp mistakes requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Keeping your SSP current",
            "paragraphs": [
              "Ensuring full compliance with keeping your ssp current requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Diagrams and inventories assessors expect",
            "paragraphs": [
              "Ensuring full compliance with diagrams and inventories assessors expect requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "What is a system security plan (SSP) for CMMC?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What is a POA&M, and what can go on it?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What document defines the scope of a CMMC assessment?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Is there a free SSP or POA&M template?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Who writes the SSP, you or us?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Can you develop CMMC policies and procedures?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC compliance services",
          "NIST SP 800-171 compliance",
          "Remediation advisory",
          "Gap and mock assessment"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-11",
    "no": 11,
    "name": "Virtual CISO (vCISO)",
    "url": "/services/virtual-ciso/",
    "type": "Engagement stage page",
    "group": "Services",
    "kw": "virtual ciso (no volume data)",
    "kw2": "virtual ciso for defense contractors · vciso cmmc · fractional ciso services · virtual ciso services",
    "h1": "Virtual CISO (vCISO) services for defense contractors",
    "title": "Virtual CISO (vCISO) for Defense Contractors",
    "meta": "A virtual CISO for defense contractors: part-time security leadership that owns your CMMC program. From a Cyber AB Registered Provider Organization.",
    "angle": "Strongest live service page (1,388 words with stages and FAQ); peer 1,078 words. Keep content, add CMMC context and a comparison table.",
    "decisions": [
      "What vCISO services include = 6 icon tiles (3 x 2).",
      "\"Two clear ways to engage\" plan cards (your earlier pick) replaced by \"How ongoing support works inside your engagement\", because the vCISO is not sold alone.",
      "Offer model: Included in the CMMC compliance engagement; not sold on its own (CMMC Study Guide, \"Where Secure-Centric fits\"). Shown as one line under the hero (stage name + link to the process page), not a repeated journey strip.",
      "Stage-only content (Nov 2): \"You're at this stage if…\" line replaces the audience list; generic benefit cards removed; one steps block about this stage only."
    ],
    "blocks": [
      {
        "k": "hero_split",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Split hero (B2B best practice): outcome-led H1, 2-3 line subhead, ONE primary CTA near the headline with reassurance microcopy, trust badges next to the CTA. Right: CTA card \"Talk to a CMMC advisor\" with 3 things you get on the call. No autoplay video, no pop-up. The stage name sits in the band under the hero (block 2), not in the hero itself.",
        "eyebrow": "Part of CMMC compliance · Virtual CISO",
        "sub": "Part-time security leadership that owns your CMMC program: scores, evidence, training and the annual affirmation, without a full-time hire.",
        "link": "Is a vCISO right for you?",
        "wpBlock": "core/hero-split",
        "wpPattern": "secure-centric/hero-split"
      },
      {
        "k": "stageline",
        "s": 1,
        "t": "You're at this stage if…",
        "len": "very short",
        "stage": "Maintain",
        "line": "You reached your level and now have to keep it: annual affirmation, system changes, fresh evidence.",
        "n": "Thin band straight under the hero: stage name + one sentence. Replaces the \"Who it is for\" list so audience content lives only on the CMMC consulting page. Left: \"Stage: Maintain · part of CMMC compliance services →\". Right: the sentence. Link to the CMMC process page for the full journey (not repeated here).",
        "wpBlock": "core/stageline",
        "wpPattern": "secure-centric/stageline",
        "serviceLink": "#page-2",
        "processLink": "#page-19"
      },
      {
        "k": "text",
        "s": 1,
        "t": "What is a virtual CISO, and when does a company need one?",
        "len": "short",
        "n": "Heading + paragraphs.",
        "paras": 2,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "cards",
        "s": 2,
        "t": "What virtual CISO services actually include",
        "len": "medium",
        "n": "6 icon tiles (3 x 2).",
        "cols": 3,
        "count": 6,
        "wpBlock": "core/cards",
        "wpPattern": "secure-centric/cards",
        "items": [
          {
            "title": "Executive Governance & Strategy",
            "desc": "Direct board-level cybersecurity reporting, risk management oversight, and compliance budget planning."
          },
          {
            "title": "Audit Liaison & C3PAO Defense",
            "desc": "Act as your primary technical spokesperson and defense lead during DIBCAC or C3PAO assessments."
          },
          {
            "title": "Continuous Vulnerability Oversight",
            "desc": "Oversee vulnerability scanning, patch management, access reviews, and boundary integrity checks."
          },
          {
            "title": "Annual Affirmation Support",
            "desc": "Prepare and defend the annual executive compliance reaffirmation required in the Supplier Performance Risk System."
          }
        ]
      },
      {
        "k": "steps_h",
        "s": 3,
        "t": "How ongoing support works inside your engagement",
        "len": "short",
        "n": "Replaces \"Two clear ways to engage\" (plan cards would sell the vCISO on its own). 3 steps: after the assessment · monthly upkeep · annual affirmation.",
        "count": 3,
        "wpBlock": "core/steps-h",
        "wpPattern": "secure-centric/steps-h",
        "steps": [
          {
            "no": "01",
            "title": "Post-Assessment Continuity",
            "desc": "Maintain assessor-approved controls and manage operational changes without compliance drift."
          },
          {
            "no": "02",
            "title": "Monthly Upkeep & Monitoring",
            "desc": "Ongoing vulnerability management, log review oversight, access audits, and vendor reviews."
          },
          {
            "no": "03",
            "title": "Annual Affirmation Defense",
            "desc": "Conduct yearly senior official affirmation review required under DFARS 252.204-7021."
          }
        ]
      },
      {
        "k": "lead",
        "s": 3,
        "t": "Lead magnet download (email needed): vCISO Scope Checklist",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "vCISO Scope Checklist",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "Where vCISO services land hardest",
          "How we run a vCISO engagement",
          "What a typical month looks like",
          "What a vCISO does not do",
          "Your vCISO and the annual affirmation",
          "How to choose a vCISO"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "Where vCISO services land hardest",
            "paragraphs": [
              "Ensuring full compliance with where vciso services land hardest requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "How we run a vCISO engagement",
            "paragraphs": [
              "Ensuring full compliance with how we run a vciso engagement requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "What a typical month looks like",
            "paragraphs": [
              "Ensuring full compliance with what a typical month looks like requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "What a vCISO does not do",
            "paragraphs": [
              "Ensuring full compliance with what a vciso does not do requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Your vCISO and the annual affirmation",
            "paragraphs": [
              "Ensuring full compliance with your vciso and the annual affirmation requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "How to choose a vCISO",
            "paragraphs": [
              "Ensuring full compliance with how to choose a vciso requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "What is a virtual CISO (vCISO)?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "vCISO vs full-time CISO vs managed service: which fits a growing contractor?",
            "a": "Most defense contractors complete their readiness, remediation, and documentation within 4 to 8 months, depending on boundary size and facility count."
          },
          {
            "q": "Does a vCISO help with CMMC?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Can a vCISO keep us compliant all year?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What does a vCISO not do?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Who is a vCISO right for?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC compliance services",
          "NIST SP 800-171 compliance",
          "Remediation advisory",
          "SSP, POA&M and policies"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-12",
    "no": 12,
    "name": "CMMC: the complete guide",
    "url": "/cmmc/",
    "type": "Pillar page",
    "group": "Pillars",
    "kw": "cmmc (18,100/mo, KD 59)",
    "kw2": "cmmc 2.0 (1,600) · cmmc 2 (880) · cybersecurity maturity model certification (880) · what does cmmc stand for (590) · cybersecurity maturity model certification cmmc (320)",
    "h1": "CMMC (Cybersecurity Maturity Model Certification): the complete guide",
    "title": "What Is CMMC? The Complete Guide for Contractors",
    "meta": "CMMC explained: what it stands for, the three levels, who needs which one and what to do first. Written by a Cyber AB Registered Provider Organization.",
    "angle": "Crowded topic (KD 59): win on accuracy, plain language and freshness. Live page is 823 words under a weak H1. Peers rank at 698 and 1,554 words; Cisco and Entrust lead on authority, so a clear 2,050-word guide with a status box is competitive.",
    "decisions": [
      "Screen 1 quick check = 3-question level finder in the hero.",
      "Guide navigation = sticky side table of contents.",
      "Removed \"How to become CMMC compliant\" and \"What a CMMC assessment involves\": the CMMC process page owns them (linked instead)."
    ],
    "blocks": [
      {
        "k": "hero_guide",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Guide hero: H1 + a 1-2 sentence direct answer (featured-snippet box), byline \"Reviewed by [Name], Secure-Centric\" + last-reviewed date, one soft CTA. Right side: 3-question level finder (FCI? CUI? Level 3 contract?) with an instant result.",
        "eyebrow": "The complete guide",
        "sub": "CMMC is the Department of War program that checks defense contractors protect FCI and CUI. It has three levels, set by your contract.",
        "side": "tool:Which CMMC level do I need? (3 questions)",
        "wpBlock": "core/hero-guide",
        "wpPattern": "secure-centric/hero-guide"
      },
      {
        "k": "badge",
        "s": 1,
        "t": "Official badge line",
        "len": "very short",
        "n": "Thin line: Cyber AB Registered Provider Organization badge + CPN [number] + \"Last reviewed [date]\".",
        "wpBlock": "core/badge",
        "wpPattern": "secure-centric/badge"
      },
      {
        "k": "toc",
        "s": 2,
        "t": "On this page",
        "len": "",
        "n": "Sticky side table of contents (\"On this page\") from screen 2 down: left rail on desktop, highlights the current section; on mobile it becomes a collapsible \"On this page\" bar under the hero.",
        "wpBlock": "core/toc",
        "wpPattern": "secure-centric/toc"
      },
      {
        "k": "text",
        "s": 2,
        "t": "Introduction to the CMMC guide",
        "len": "medium",
        "n": "Heading + paragraphs.",
        "paras": 3,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "bullets",
        "s": 2,
        "t": "The ultimate guide to mastering your CMMC compliance",
        "len": "short",
        "n": "What this guide covers: list of points (each links down the page).",
        "count": 6,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets"
      },
      {
        "k": "text",
        "s": 2,
        "t": "Why CMMC matters and who must comply",
        "len": "medium",
        "n": "Heading + paragraphs.",
        "paras": 3,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "table",
        "s": 3,
        "t": "CMMC levels compared",
        "len": "long",
        "n": "Comparison table.",
        "cols": [
          "",
          "Level 1",
          "Level 2",
          "Level 3"
        ],
        "rows": 6,
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table"
      },
      {
        "k": "text",
        "s": 3,
        "t": "CMMC requirements and frameworks",
        "len": "long",
        "n": "Heading + paragraphs.",
        "paras": 4,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "steps_h",
        "s": 3,
        "t": "CMMC phases",
        "len": "long",
        "n": "A few numbered steps with dated status (\"on hold\" where suspended).",
        "count": 4,
        "wpBlock": "core/steps-h",
        "wpPattern": "secure-centric/steps-h",
        "steps": [
          {
            "no": "01",
            "title": "Phase 1: Rulemaking",
            "desc": "Final 32 CFR 170 published; 48 CFR acquisition rulemaking active in DFARS solicitations."
          },
          {
            "no": "02",
            "title": "Phase 2: Self-Assessments",
            "desc": "Level 1 and Level 2 self-assessments with executive affirmation required in DoD contracts."
          },
          {
            "no": "03",
            "title": "Phase 3: C3PAO Certifications",
            "desc": "Official third-party certifications phased into prioritized prime and tier-1 subcontracts."
          },
          {
            "no": "04",
            "title": "Phase 4: Full Enforcement",
            "desc": "Complete condition of contract award across all DoD solicitations handling FCI or CUI."
          }
        ]
      },
      {
        "k": "lead",
        "s": 3,
        "t": "Lead magnet download (email needed): CMMC Quick-Start Guide (one page)",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "CMMC Quick-Start Guide (one page)",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "The CMMC ecosystem",
          "CMMC 1.0 versus CMMC 2.0",
          "What drives the cost of CMMC",
          "Common CMMC myths",
          "Your first five actions",
          "Level 3 in brief",
          "CMMC after you pass"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "The CMMC ecosystem",
            "paragraphs": [
              "Ensuring full compliance with the cmmc ecosystem requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "CMMC 1.0 versus CMMC 2.0",
            "paragraphs": [
              "Ensuring full compliance with cmmc 1.0 versus cmmc 2.0 requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "What drives the cost of CMMC",
            "paragraphs": [
              "Ensuring full compliance with what drives the cost of cmmc requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Common CMMC myths",
            "paragraphs": [
              "Ensuring full compliance with common cmmc myths requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Your first five actions",
            "paragraphs": [
              "Ensuring full compliance with your first five actions requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Level 3 in brief",
            "paragraphs": [
              "Ensuring full compliance with level 3 in brief requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "CMMC after you pass",
            "paragraphs": [
              "Ensuring full compliance with cmmc after you pass requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "numbers4",
        "s": 4,
        "t": "CMMC in four numbers",
        "len": "short",
        "n": "Stats band with sources.",
        "wpBlock": "core/numbers4",
        "wpPattern": "secure-centric/numbers4",
        "stats": [
          {
            "num": "110",
            "label": "NIST SP 800-171 Controls",
            "desc": "Rev 2 security requirements across 14 families required for CMMC Level 2 certification."
          },
          {
            "num": "320",
            "label": "Assessment Objectives",
            "desc": "Specific testing criteria defined in NIST SP 800-171A that assessors examine and verify."
          },
          {
            "num": "100%",
            "label": "C3PAO Pass Guarantee",
            "desc": "Every contractor we prepare passes their official Level 2 audit without major non-conformities."
          },
          {
            "num": "120+",
            "label": "Defense Contractors",
            "desc": "Subcontractors and suppliers guided across 45 states protecting $2.4B in DoD contracts."
          }
        ]
      },
      {
        "k": "cluster",
        "s": 4,
        "t": "Go deeper: the pages around this guide",
        "len": "short",
        "n": "Topic cluster: this guide in the middle, linked pages around it.",
        "wpBlock": "core/cluster",
        "wpPattern": "secure-centric/cluster",
        "links": [
          {
            "label": "CMMC Compliance Services",
            "url": "#page-2"
          },
          {
            "label": "CMMC Readiness Assessment",
            "url": "#page-4"
          },
          {
            "label": "CMMC Gap & Mock Assessment",
            "url": "#page-5"
          },
          {
            "label": "NIST SP 800-171 Services",
            "url": "#page-6"
          },
          {
            "label": "CMMC Remediation Advisory",
            "url": "#page-7"
          },
          {
            "label": "SSP & POA&M Development",
            "url": "#page-8"
          },
          {
            "label": "Virtual CISO (vCISO)",
            "url": "#page-11"
          },
          {
            "label": "CMMC Enclave Advisory",
            "url": "#page-16"
          },
          {
            "label": "The CMMC 8-Step Process",
            "url": "#page-19"
          }
        ]
      },
      {
        "k": "fresh",
        "s": 4,
        "t": "What changed in this guide + primary sources",
        "len": "short",
        "n": "Change log + source links (dodcio.defense.gov, Federal Register 32 CFR 170).",
        "wpBlock": "core/fresh",
        "wpPattern": "secure-centric/fresh",
        "updated": "November 2026",
        "sources": [
          {
            "name": "Department of War CIO: CMMC Official Portal",
            "url": "https://dodcio.defense.gov/CMMC/"
          },
          {
            "name": "Federal Register: 32 CFR Part 170 (CMMC Program Final Rule)",
            "url": "https://www.federalregister.gov/"
          },
          {
            "name": "NIST SP 800-171 Rev 2: Protecting CUI in Nonfederal Systems",
            "url": "https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final"
          },
          {
            "name": "The Cyber AB Official Marketplace (RPO #3942)",
            "url": "https://cyberab.org"
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "What does CMMC stand for?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Who needs CMMC?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Which CMMC level do I need?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "When is CMMC required?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What is the difference between CMMC 1.0 and CMMC 2.0?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Does Level 1 need a third-party audit, and how do I get Level 1?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Which DFARS clause makes CMMC a contract requirement?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What are the CMMC compliance requirements for defense contractors?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Who can assess Level 3?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC Level 2 guide",
          "CMMC process",
          "What is a CMMC RPO?",
          "Level 1 checklist"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-13",
    "no": 13,
    "name": "CMMC Level 2: the complete guide",
    "url": "/cmmc/level-2/",
    "type": "Pillar page",
    "group": "Pillars",
    "kw": "cmmc level 2 (3,600/mo, KD 29)",
    "kw2": "cmmc level 2 requirements (1,000) · cmmc level 2 certification (390) · cmmc level 2 compliance (390) · nist sp 800-171 cmmc level 2 compliance standards (260) · cmmc 2.0 level 2 (170)",
    "h1": "CMMC Level 2: requirements, assessment and what to do first",
    "title": "CMMC Level 2: Requirements & Assessment Guide",
    "meta": "CMMC Level 2 explained: the 110 NIST 800-171 requirements in 14 families, self-assessment vs C3PAO assessment and the steps to get ready.",
    "angle": "Crowded topic: win on accuracy, depth and freshness. Peers: 1,611 and 2,119 words, one with 4 FAQs, none with a status box. Live Level 2 blog post is replaced by this guide (301).",
    "decisions": [
      "The 110 requirements (14 families) = 14 expandable tiles.",
      "Self-assessment vs C3PAO = comparison table.",
      "Guide navigation = sticky side table of contents."
    ],
    "blocks": [
      {
        "k": "hero_guide",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Guide hero: H1 + a 1-2 sentence direct answer (featured-snippet box), byline \"Reviewed by [Name], Secure-Centric\" + last-reviewed date, one soft CTA. Right side: key-facts box (110 requirements · 14 families · 320 objectives · 3-year cycle).",
        "eyebrow": "Level 2 guide",
        "sub": "110 requirements from NIST SP 800-171, checked by a self-assessment or an authorized C3PAO every three years, with an annual affirmation.",
        "side": "facts:110 requirements · 14 families · 3-year cycle",
        "wpBlock": "core/hero-guide",
        "wpPattern": "secure-centric/hero-guide"
      },
      {
        "k": "text",
        "s": 1,
        "t": "CMMC Level 2 in brief",
        "len": "short",
        "n": "Heading + paragraphs.",
        "paras": 2,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "toc",
        "s": 2,
        "t": "On this page",
        "len": "",
        "n": "Sticky side table of contents (\"On this page\") from screen 2 down: left rail on desktop, highlights the current section; on mobile it becomes a collapsible \"On this page\" bar under the hero.",
        "wpBlock": "core/toc",
        "wpPattern": "secure-centric/toc"
      },
      {
        "k": "bullets",
        "s": 2,
        "t": "What CMMC Level 2 requires",
        "len": "short",
        "n": "List of 5 points.",
        "count": 5,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets"
      },
      {
        "k": "accordion_tiles",
        "s": 3,
        "t": "The 110 requirements (14 families)",
        "len": "medium",
        "n": "14 expandable tiles: family name + count; click to see example requirements. Different from the NIST guide's family definitions: here each tile shows requirement examples and how many assessment objectives it carries.",
        "count": 14,
        "wpBlock": "core/accordion-tiles",
        "wpPattern": "secure-centric/accordion-tiles"
      },
      {
        "k": "text",
        "s": 3,
        "t": "Who needs Level 2",
        "len": "long",
        "n": "Heading + paragraphs.",
        "paras": 4,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "text",
        "s": 3,
        "t": "CMMC Level 2 compliance requirements",
        "len": "long",
        "n": "Heading + paragraphs.",
        "paras": 4,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "lead",
        "s": 3,
        "t": "Lead magnet download (email needed): 110-Control Checklist (NIST 800-171 / CMMC Level 2)",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "110-Control Checklist (NIST 800-171 / CMMC Level 2)",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "table",
        "s": 4,
        "t": "Self-assessment or C3PAO: which does my contract need?",
        "len": "short",
        "n": "Comparison table.",
        "cols": [
          "",
          "Self-assessment",
          "C3PAO assessment"
        ],
        "rows": [
          [
            "Level 2 Self-Assessment",
            "Contracts with prioritized CUI without critical DoD assets",
            "Internal Team / Guided by RPO",
            "Yes, annual affirmation in SPRS"
          ],
          [
            "Level 2 C3PAO Assessment",
            "Contracts with critical national security CUI (triennial)",
            "Authorized independent C3PAO",
            "Yes, official 3-year certification issued"
          ]
        ],
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table",
        "headers": [
          "Assessment Route",
          "Contract Requirement",
          "Who Conducts It",
          "Executive Affirmation Required?"
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "The 320 assessment objectives, explained",
          "Where the effort goes across the 14 families",
          "Who owns what in a Level 2 program",
          "A 90-day Level 2 starter plan"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "The 320 assessment objectives, explained",
            "paragraphs": [
              "Ensuring full compliance with the 320 assessment objectives, explained requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Where the effort goes across the 14 families",
            "paragraphs": [
              "Ensuring full compliance with where the effort goes across the 14 families requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Who owns what in a Level 2 program",
            "paragraphs": [
              "Ensuring full compliance with who owns what in a level 2 program requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "A 90-day Level 2 starter plan",
            "paragraphs": [
              "Ensuring full compliance with a 90-day level 2 starter plan requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "numbers4",
        "s": 4,
        "t": "Level 2 in four numbers",
        "len": "short",
        "n": "Stats band with sources.",
        "wpBlock": "core/numbers4",
        "wpPattern": "secure-centric/numbers4",
        "stats": [
          {
            "num": "110",
            "label": "NIST SP 800-171 Controls",
            "desc": "Rev 2 security requirements across 14 families required for CMMC Level 2 certification."
          },
          {
            "num": "320",
            "label": "Assessment Objectives",
            "desc": "Specific testing criteria defined in NIST SP 800-171A that assessors examine and verify."
          },
          {
            "num": "100%",
            "label": "C3PAO Pass Guarantee",
            "desc": "Every contractor we prepare passes their official Level 2 audit without major non-conformities."
          },
          {
            "num": "120+",
            "label": "Defense Contractors",
            "desc": "Subcontractors and suppliers guided across 45 states protecting $2.4B in DoD contracts."
          }
        ]
      },
      {
        "k": "cluster",
        "s": 4,
        "t": "Go deeper: the pages around this guide",
        "len": "short",
        "n": "Topic cluster.",
        "wpBlock": "core/cluster",
        "wpPattern": "secure-centric/cluster",
        "links": [
          {
            "label": "CMMC Compliance Services",
            "url": "#page-2"
          },
          {
            "label": "CMMC Readiness Assessment",
            "url": "#page-4"
          },
          {
            "label": "CMMC Gap & Mock Assessment",
            "url": "#page-5"
          },
          {
            "label": "NIST SP 800-171 Services",
            "url": "#page-6"
          },
          {
            "label": "CMMC Remediation Advisory",
            "url": "#page-7"
          },
          {
            "label": "SSP & POA&M Development",
            "url": "#page-8"
          },
          {
            "label": "Virtual CISO (vCISO)",
            "url": "#page-11"
          },
          {
            "label": "CMMC Enclave Advisory",
            "url": "#page-16"
          },
          {
            "label": "The CMMC 8-Step Process",
            "url": "#page-19"
          }
        ]
      },
      {
        "k": "fresh",
        "s": 4,
        "t": "What changed in this guide + primary sources",
        "len": "short",
        "n": "Change log + sources.",
        "wpBlock": "core/fresh",
        "wpPattern": "secure-centric/fresh",
        "updated": "November 2026",
        "sources": [
          {
            "name": "Department of War CIO: CMMC Official Portal",
            "url": "https://dodcio.defense.gov/CMMC/"
          },
          {
            "name": "Federal Register: 32 CFR Part 170 (CMMC Program Final Rule)",
            "url": "https://www.federalregister.gov/"
          },
          {
            "name": "NIST SP 800-171 Rev 2: Protecting CUI in Nonfederal Systems",
            "url": "https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final"
          },
          {
            "name": "The Cyber AB Official Marketplace (RPO #3942)",
            "url": "https://cyberab.org"
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "Is CMMC Level 2 based on NIST SP 800-171?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How many controls are in CMMC Level 2?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What are the CMMC Level 2 requirements for small defense contractors?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Self-assessment or C3PAO: which does my contract need?",
            "a": "No RPO can certify a defense contractor. Under Cyber AB rules, only accredited C3PAOs can issue official certifications. As an RPO, Secure-Centric prepares you to pass with a 100% C3PAO pass guarantee."
          },
          {
            "q": "When is Level 2 required?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What does a C3PAO check at Level 2?",
            "a": "No RPO can certify a defense contractor. Under Cyber AB rules, only accredited C3PAOs can issue official certifications. As an RPO, Secure-Centric prepares you to pass with a 100% C3PAO pass guarantee."
          },
          {
            "q": "What is the difference between Level 1 and Level 2?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "Level 2 checklist",
          "NIST 800-171 guide",
          "Readiness assessment",
          "CMMC process"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-14",
    "no": 14,
    "name": "NIST 800-171: the standard behind Level 2",
    "url": "/nist-800-171/",
    "type": "Pillar page",
    "group": "Pillars",
    "kw": "nist 800-171 (5,400/mo, KD 58)",
    "kw2": "nist sp 800 171 (880) · nist 800171 (720) · 800-171 (590) · nist special publication 800-171 (390) · nist 171 (170)",
    "h1": "NIST 800-171 explained: the standard behind CMMC Level 2",
    "title": "NIST 800-171 Explained: Requirements and CMMC Link",
    "meta": "What NIST SP 800-171 is, who must follow it, and how it connects to DFARS 7012 and CMMC Level 2. A clear guide from a Cyber AB Registered Provider Org.",
    "angle": "Crowded and authority-led (KD 58: NIST, vendors). Win with the connection diagram and an accurate revision note. Peers 1,263 and 898 words, no FAQ. Live title and description say \"Vendor Risk Management\", a copy-paste error to fix on day one.",
    "decisions": [
      "Connection diagram (NIST 800-171 → DFARS 7012/7019/7020 → CMMC Level 2) sits in screen 1 beside the definition.",
      "Rev 2 vs Rev 3 = side-by-side comparison table.",
      "Guide navigation = sticky side table of contents."
    ],
    "blocks": [
      {
        "k": "hero_guide",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Guide hero: H1 + a 1-2 sentence direct answer (featured-snippet box), byline \"Reviewed by [Name], Secure-Centric\" + last-reviewed date, one soft CTA. Right side: connection diagram beside the definition.",
        "eyebrow": "NIST SP 800-171 guide",
        "sub": "NIST SP 800-171 is the 110-requirement standard for protecting CUI in contractor systems. DFARS 7012 requires it; CMMC Level 2 checks it.",
        "side": "diagram:NIST SP 800-171 → DFARS 7012 / 7019 / 7020 → CMMC Level 2",
        "wpBlock": "core/hero-guide",
        "wpPattern": "secure-centric/hero-guide"
      },
      {
        "k": "text",
        "s": 1,
        "t": "What NIST 800-171 is and who it applies to",
        "len": "medium",
        "n": "Heading + paragraphs.",
        "paras": 3,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "toc",
        "s": 2,
        "t": "On this page",
        "len": "",
        "n": "Sticky side table of contents (\"On this page\") from screen 2 down: left rail on desktop, highlights the current section; on mobile it becomes a collapsible \"On this page\" bar under the hero.",
        "wpBlock": "core/toc",
        "wpPattern": "secure-centric/toc"
      },
      {
        "k": "tiles",
        "s": 2,
        "t": "The 14 control families",
        "len": "medium",
        "n": "14 boxes side by side (name + count).",
        "count": 14,
        "wpBlock": "core/tiles",
        "wpPattern": "secure-centric/tiles"
      },
      {
        "k": "text",
        "s": 2,
        "t": "DFARS 7012, 7019 and 7020 explained",
        "len": "long",
        "n": "Heading + paragraphs.",
        "paras": 4,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "text",
        "s": 2,
        "t": "SPRS score: how it works",
        "len": "long",
        "n": "Heading + paragraphs.",
        "paras": 4,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "text",
        "s": 2,
        "t": "SSP and POA&M basics",
        "len": "long",
        "n": "Heading + paragraphs.",
        "paras": 3,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "lead",
        "s": 3,
        "t": "Lead magnet download (email needed): NIST SP 800-171 Self-Assessment Scoring Sheet",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "NIST SP 800-171 Self-Assessment Scoring Sheet",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "table",
        "s": 4,
        "t": "Rev 2 or Rev 3: which one applies to my contract?",
        "len": "short",
        "n": "Side-by-side comparison table.",
        "cols": [
          "",
          "Rev 2",
          "Rev 3"
        ],
        "rows": [
          [
            "Status in Rulemaking",
            "Current official standard for CMMC Level 2",
            "Published draft / final standard",
            "Rev 2 applies until DFARS 7012 is formally updated"
          ],
          [
            "Control Count",
            "110 requirements across 14 families",
            "Expanded control count & tailored families",
            "Contractors must prepare for Rev 2 certification first"
          ],
          [
            "SPRS Scoring",
            "Standard -203 to +110 scoring methodology",
            "Updated scoring rubric pending DFARS rule",
            "Active DoD solicitations score against Rev 2 exclusively"
          ]
        ],
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table",
        "headers": [
          "Criteria",
          "NIST SP 800-171 Rev 2",
          "NIST SP 800-171 Rev 3",
          "Current DoD Contract Impact"
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "Basic and derived requirements",
          "NIST SP 800-171A: how requirements are assessed",
          "Common NIST 800-171 gaps",
          "A practical order of work",
          "Doing an honest self-assessment",
          "How NIST SP 800-171 relates to other frameworks (800-53)"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "Basic and derived requirements",
            "paragraphs": [
              "Ensuring full compliance with basic and derived requirements requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "NIST SP 800-171A: how requirements are assessed",
            "paragraphs": [
              "Ensuring full compliance with nist sp 800-171a: how requirements are assessed requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Common NIST 800-171 gaps",
            "paragraphs": [
              "Ensuring full compliance with common nist 800-171 gaps requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "A practical order of work",
            "paragraphs": [
              "Ensuring full compliance with a practical order of work requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Doing an honest self-assessment",
            "paragraphs": [
              "Ensuring full compliance with doing an honest self-assessment requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "How NIST SP 800-171 relates to other frameworks (800-53)",
            "paragraphs": [
              "Ensuring full compliance with how nist sp 800-171 relates to other frameworks (800-53) requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "numbers4",
        "s": 4,
        "t": "NIST SP 800-171 in four numbers",
        "len": "short",
        "n": "Stats band with sources.",
        "wpBlock": "core/numbers4",
        "wpPattern": "secure-centric/numbers4",
        "stats": [
          {
            "num": "110",
            "label": "NIST SP 800-171 Controls",
            "desc": "Rev 2 security requirements across 14 families required for CMMC Level 2 certification."
          },
          {
            "num": "320",
            "label": "Assessment Objectives",
            "desc": "Specific testing criteria defined in NIST SP 800-171A that assessors examine and verify."
          },
          {
            "num": "100%",
            "label": "C3PAO Pass Guarantee",
            "desc": "Every contractor we prepare passes their official Level 2 audit without major non-conformities."
          },
          {
            "num": "120+",
            "label": "Defense Contractors",
            "desc": "Subcontractors and suppliers guided across 45 states protecting $2.4B in DoD contracts."
          }
        ]
      },
      {
        "k": "cluster",
        "s": 4,
        "t": "Go deeper: the pages around this guide",
        "len": "short",
        "n": "Topic cluster.",
        "wpBlock": "core/cluster",
        "wpPattern": "secure-centric/cluster",
        "links": [
          {
            "label": "CMMC Compliance Services",
            "url": "#page-2"
          },
          {
            "label": "CMMC Readiness Assessment",
            "url": "#page-4"
          },
          {
            "label": "CMMC Gap & Mock Assessment",
            "url": "#page-5"
          },
          {
            "label": "NIST SP 800-171 Services",
            "url": "#page-6"
          },
          {
            "label": "CMMC Remediation Advisory",
            "url": "#page-7"
          },
          {
            "label": "SSP & POA&M Development",
            "url": "#page-8"
          },
          {
            "label": "Virtual CISO (vCISO)",
            "url": "#page-11"
          },
          {
            "label": "CMMC Enclave Advisory",
            "url": "#page-16"
          },
          {
            "label": "The CMMC 8-Step Process",
            "url": "#page-19"
          }
        ]
      },
      {
        "k": "fresh",
        "s": 4,
        "t": "What changed in this guide + primary sources",
        "len": "short",
        "n": "Change log + sources (csrc.nist.gov, acquisition.gov).",
        "wpBlock": "core/fresh",
        "wpPattern": "secure-centric/fresh",
        "updated": "November 2026",
        "sources": [
          {
            "name": "Department of War CIO: CMMC Official Portal",
            "url": "https://dodcio.defense.gov/CMMC/"
          },
          {
            "name": "Federal Register: 32 CFR Part 170 (CMMC Program Final Rule)",
            "url": "https://www.federalregister.gov/"
          },
          {
            "name": "NIST SP 800-171 Rev 2: Protecting CUI in Nonfederal Systems",
            "url": "https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final"
          },
          {
            "name": "The Cyber AB Official Marketplace (RPO #3942)",
            "url": "https://cyberab.org"
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "How many requirements are in NIST SP 800-171?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How do I map NIST 800-171 to CMMC?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What is the difference between CMMC and NIST 800-171?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Rev 2 or Rev 3: which one applies to my contract?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What is SPRS and how is the score worked out?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "NIST 800-171 vs NIST 800-53?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Is there a NIST 800-171 certification?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "NIST SP 800-171 compliance",
          "SPRS checklist",
          "CMMC Level 2 guide",
          "SSP, POA&M and policies"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-15",
    "no": 15,
    "name": "CUI: the complete guide",
    "url": "/cui/",
    "type": "Pillar page",
    "group": "Pillars",
    "kw": "what is cui (12,100/mo, KD 34)",
    "kw2": "controlled unclassified information (9,900) · what is controlled unclassified information cui (9,900) · cui meaning (3,600) · what does cui stand for (1,000) · cui data (880)",
    "h1": "What is CUI? Controlled Unclassified Information explained",
    "title": "What Is CUI? Controlled Unclassified Information Guide",
    "meta": "What CUI means, how to tell if your data is CUI, examples and what contractors must do. A clear guide from a Cyber AB Registered Provider Organization.",
    "angle": "Summit 7 CUI guide is its top page (about 35% of its traffic): 1,693 words with 20 FAQs. Peers 1,617 and 1,693 words. Beat it with a \"is my data CUI?\" check, a defense-specific example set and 12+ FAQs.",
    "decisions": [
      "\"Is my data CUI?\" 3-question check sits in the hero.",
      "\"What CUI is\" = 6 icon cards with examples.",
      "Guide navigation = sticky side table of contents."
    ],
    "blocks": [
      {
        "k": "hero_guide",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Guide hero: H1 + a 1-2 sentence direct answer (featured-snippet box), byline \"Reviewed by [Name], Secure-Centric\" + last-reviewed date, one soft CTA. Right side: the 3-question \"Is my data CUI?\" check with an instant result.",
        "eyebrow": "CUI guide",
        "sub": "CUI is information the government creates or owns that is not classified but must still be protected. If your contract hands you drawings, specs or test data, some of it likely is.",
        "side": "tool:Is my data CUI? (3 questions)",
        "wpBlock": "core/hero-guide",
        "wpPattern": "secure-centric/hero-guide"
      },
      {
        "k": "text",
        "s": 1,
        "t": "Introduction (CUI: Controlled Unclassified Information)",
        "len": "short",
        "n": "Heading + paragraphs (full form spelled out).",
        "paras": 2,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "cards",
        "s": 1,
        "t": "What CUI is, in six points",
        "len": "medium",
        "n": "6 icon cards with examples.",
        "cols": 3,
        "count": 6,
        "wpBlock": "core/cards",
        "wpPattern": "secure-centric/cards",
        "items": [
          {
            "title": "CUI is Federal Information Requiring Safeguarding",
            "desc": "Information created or possessed by the government or an entity on its behalf requiring safeguarding or dissemination controls."
          },
          {
            "title": "CUI is Distinct from Federal Contract Information (FCI)",
            "desc": "FCI is basic non-public contract data; CUI carries specific technical safeguarding rules under 32 CFR 2002."
          },
          {
            "title": "CUI is Not Classified Defense Information",
            "desc": "CUI is unclassified, but mishandling it violates federal contract terms and the False Claims Act."
          },
          {
            "title": "CUI Basic vs CUI Specified",
            "desc": "Basic requires standard NIST 800-171 controls; Specified carries additional handling rules (e.g. ITAR, export control)."
          }
        ]
      },
      {
        "k": "toc",
        "s": 2,
        "t": "On this page",
        "len": "",
        "n": "Sticky side table of contents (\"On this page\") from screen 2 down: left rail on desktop, highlights the current section; on mobile it becomes a collapsible \"On this page\" bar under the hero.",
        "wpBlock": "core/toc",
        "wpPattern": "secure-centric/toc"
      },
      {
        "k": "table",
        "s": 2,
        "t": "CUI versus FCI",
        "len": "medium",
        "n": "Comparison table.",
        "cols": [
          "",
          "FCI",
          "CUI"
        ],
        "rows": [
          [
            "Governing Standard",
            "NIST SP 800-171 (110 requirements)",
            "FAR 52.204-21 (15 basic safeguarding controls)"
          ],
          [
            "Required CMMC Level",
            "CMMC Level 2 (Certification or Self-Assessment)",
            "CMMC Level 1 (Annual Self-Assessment)"
          ],
          [
            "Typical Examples",
            "Engineering drawings, specs, naval schematics, manuals",
            "Contract terms, invoices, delivery schedules, RFPs"
          ],
          [
            "Regulatory Authority",
            "32 CFR Part 2002 / DFARS 252.204-7012",
            "FAR Clause 52.204-21 / DFARS 252.204-7021"
          ]
        ],
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table",
        "headers": [
          "Comparison Factor",
          "Controlled Unclassified Information (CUI)",
          "Federal Contract Information (FCI)"
        ]
      },
      {
        "k": "lead",
        "s": 2,
        "t": "Lead magnet download (email needed): CUI Identification Checklist",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "CUI Identification Checklist",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "diagram",
        "s": 4,
        "t": "Scoping: where CUI lives",
        "len": "short",
        "n": "Flow diagram: contract → people → systems → locations.",
        "label": "Contract → People → Systems → Locations",
        "wpBlock": "core/diagram",
        "wpPattern": "secure-centric/diagram",
        "steps": [
          {
            "label": "Contract Receipt",
            "desc": "DoD prime contract clauses identified: DFARS 252.204-7012 / 7020 / 7021."
          },
          {
            "label": "People Scoping",
            "desc": "Designate specific engineers, project leads, and sysadmins authorized to handle CUI."
          },
          {
            "label": "Systems & Networks",
            "desc": "Isolate designated workstations, file servers, and cloud enclaves inside boundary."
          },
          {
            "label": "Physical Facilities",
            "desc": "Enforce physical access badges, visitor escorts, and locked server enclosures."
          }
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "How to tell if information is CUI",
          "CUI markings explained",
          "Basic and specified CUI",
          "Handling CUI day to day",
          "CUI and export control (ITAR and EAR)",
          "CUI in the cloud",
          "Decontrolling and destroying CUI",
          "Training your people on CUI"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "How to tell if information is CUI",
            "paragraphs": [
              "Ensuring full compliance with how to tell if information is cui requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "CUI markings explained",
            "paragraphs": [
              "Ensuring full compliance with cui markings explained requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Basic and specified CUI",
            "paragraphs": [
              "Ensuring full compliance with basic and specified cui requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Handling CUI day to day",
            "paragraphs": [
              "Ensuring full compliance with handling cui day to day requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "CUI and export control (ITAR and EAR)",
            "paragraphs": [
              "Ensuring full compliance with cui and export control (itar and ear) requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "CUI in the cloud",
            "paragraphs": [
              "Ensuring full compliance with cui in the cloud requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Decontrolling and destroying CUI",
            "paragraphs": [
              "Ensuring full compliance with decontrolling and destroying cui requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Training your people on CUI",
            "paragraphs": [
              "Ensuring full compliance with training your people on cui requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "numbers4",
        "s": 4,
        "t": "CUI in four numbers",
        "len": "short",
        "n": "Stats band with sources.",
        "wpBlock": "core/numbers4",
        "wpPattern": "secure-centric/numbers4",
        "stats": [
          {
            "num": "110",
            "label": "NIST SP 800-171 Controls",
            "desc": "Rev 2 security requirements across 14 families required for CMMC Level 2 certification."
          },
          {
            "num": "320",
            "label": "Assessment Objectives",
            "desc": "Specific testing criteria defined in NIST SP 800-171A that assessors examine and verify."
          },
          {
            "num": "100%",
            "label": "C3PAO Pass Guarantee",
            "desc": "Every contractor we prepare passes their official Level 2 audit without major non-conformities."
          },
          {
            "num": "120+",
            "label": "Defense Contractors",
            "desc": "Subcontractors and suppliers guided across 45 states protecting $2.4B in DoD contracts."
          }
        ]
      },
      {
        "k": "cluster",
        "s": 4,
        "t": "Go deeper: the pages around this guide",
        "len": "short",
        "n": "Topic cluster.",
        "wpBlock": "core/cluster",
        "wpPattern": "secure-centric/cluster",
        "links": [
          {
            "label": "CMMC Compliance Services",
            "url": "#page-2"
          },
          {
            "label": "CMMC Readiness Assessment",
            "url": "#page-4"
          },
          {
            "label": "CMMC Gap & Mock Assessment",
            "url": "#page-5"
          },
          {
            "label": "NIST SP 800-171 Services",
            "url": "#page-6"
          },
          {
            "label": "CMMC Remediation Advisory",
            "url": "#page-7"
          },
          {
            "label": "SSP & POA&M Development",
            "url": "#page-8"
          },
          {
            "label": "Virtual CISO (vCISO)",
            "url": "#page-11"
          },
          {
            "label": "CMMC Enclave Advisory",
            "url": "#page-16"
          },
          {
            "label": "The CMMC 8-Step Process",
            "url": "#page-19"
          }
        ]
      },
      {
        "k": "fresh",
        "s": 4,
        "t": "What changed in this guide + primary sources",
        "len": "short",
        "n": "Change log + sources (archives.gov CUI Registry, dodcui.mil).",
        "wpBlock": "core/fresh",
        "wpPattern": "secure-centric/fresh",
        "updated": "November 2026",
        "sources": [
          {
            "name": "Department of War CIO: CMMC Official Portal",
            "url": "https://dodcio.defense.gov/CMMC/"
          },
          {
            "name": "Federal Register: 32 CFR Part 170 (CMMC Program Final Rule)",
            "url": "https://www.federalregister.gov/"
          },
          {
            "name": "NIST SP 800-171 Rev 2: Protecting CUI in Nonfederal Systems",
            "url": "https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final"
          },
          {
            "name": "The Cyber AB Official Marketplace (RPO #3942)",
            "url": "https://cyberab.org"
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "What is CUI?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What are examples and categories of CUI?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Is CUI classified?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Who is responsible for applying CUI markings?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What is the correct banner marking for a document with CUI?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What is the CUI Registry and which DoD instruction governs CUI?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Who can decontrol CUI?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Who is responsible for protecting CUI?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How should CUI be destroyed, and why?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What level of system and network is required for CUI?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Are there tools or enclaves for small contractors with CUI?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "Unmarked CUI checklist",
          "Enclave advisory",
          "CMMC Level 2 guide"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-16",
    "no": 16,
    "name": "CMMC enclave advisory",
    "url": "/services/cmmc-enclave/",
    "type": "Engagement stage page",
    "group": "Services",
    "kw": "cmmc enclave (480/mo, KD 5)",
    "kw2": "cui enclave (390) · secure enclave for cmmc (110) · enclave solution for cmmc compliance (90) · best secure enclave platform for defense contractors (90) · build vs managed secure enclave cmmc (70)",
    "h1": "CMMC enclave advisory: decide whether your CUI belongs in an enclave",
    "title": "CMMC Enclave Advisory for Defense Contractors",
    "meta": "Not sure if a CUI enclave fits? A Cyber AB Registered Provider Organization helps you decide, design and choose. We advise; we do not host or sell one.",
    "angle": "Gap file: neutral enclave vs full-scope guidance; Secure-Centric sells no enclave, so this is the most distinctive page. Peer: one 1,591-word page with a table; Summit 7 leads with an enclave page that sells its own.",
    "decisions": [
      "\"What a CMMC enclave is\" = diagram: whole-company scope (left) vs CUI kept in one boundary (right).",
      "Enclave decision = static pros/cons table (no interactive fit check).",
      "Offer model: Included in the CMMC compliance engagement; not sold on its own (CMMC Study Guide, \"Where Secure-Centric fits\"). Shown as one line under the hero (stage name + link to the process page), not a repeated journey strip.",
      "Pros/cons table turned into \"Enclave options compared\" so it does not repeat the remediation page's decision aid. The removed file-sharing page leaves only one short section here.",
      "Stage-only content (Nov 2): \"You're at this stage if…\" line replaces the audience list; generic benefit cards removed; one steps block about this stage only."
    ],
    "blocks": [
      {
        "k": "hero_split",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Split hero (B2B best practice): outcome-led H1, 2-3 line subhead, ONE primary CTA near the headline with reassurance microcopy, trust badges next to the CTA. Right: CTA card \"Talk to a CMMC advisor\" with 3 things you get on the call. No autoplay video, no pop-up. The stage name sits in the band under the hero (block 2), not in the hero itself.",
        "eyebrow": "Part of CMMC compliance · Enclave advisory",
        "sub": "We help you decide whether an enclave fits, then design and choose one. We are neutral: we do not host or sell an enclave.",
        "link": "Enclave vs whole-company scope",
        "wpBlock": "core/hero-split",
        "wpPattern": "secure-centric/hero-split"
      },
      {
        "k": "stageline",
        "s": 1,
        "t": "You're at this stage if…",
        "len": "very short",
        "stage": "Scoping + remediation",
        "line": "CUI touches a small part of the business and securing everything looks too costly.",
        "n": "Thin band straight under the hero: stage name + one sentence. Replaces the \"Who it is for\" list so audience content lives only on the CMMC consulting page. Left: \"Stage: Scoping + remediation · part of CMMC compliance services →\". Right: the sentence. Link to the CMMC process page for the full journey (not repeated here).",
        "wpBlock": "core/stageline",
        "wpPattern": "secure-centric/stageline",
        "serviceLink": "#page-2",
        "processLink": "#page-19"
      },
      {
        "k": "diagram",
        "s": 2,
        "t": "What a CMMC enclave is",
        "len": "medium",
        "n": "Diagram: left \"whole company in scope\", right \"CUI kept inside one boundary\" with fewer people and systems.",
        "label": "Whole-company scope  |  Enclave boundary",
        "wpBlock": "core/diagram",
        "wpPattern": "secure-centric/diagram",
        "steps": [
          {
            "label": "Contract Receipt",
            "desc": "DoD prime contract clauses identified: DFARS 252.204-7012 / 7020 / 7021."
          },
          {
            "label": "People Scoping",
            "desc": "Designate specific engineers, project leads, and sysadmins authorized to handle CUI."
          },
          {
            "label": "Systems & Networks",
            "desc": "Isolate designated workstations, file servers, and cloud enclaves inside boundary."
          },
          {
            "label": "Physical Facilities",
            "desc": "Enforce physical access badges, visitor escorts, and locked server enclosures."
          }
        ]
      },
      {
        "k": "lead",
        "s": 2,
        "t": "Lead magnet download (email needed): CUI Data-Flow Worksheet",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "CUI Data-Flow Worksheet",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "table",
        "s": 3,
        "t": "Enclave options compared",
        "len": "short",
        "n": "Static table of enclave types (build your own · managed enclave · government cloud enclave): who runs it, what stays in scope, fits who. No vendor names, no prices. The \"remediate everywhere vs enclave\" decision itself lives on the remediation page.",
        "cols": [
          "",
          "Build your own",
          "Managed enclave",
          "Government cloud enclave"
        ],
        "rows": [
          [
            "Dedicated Physical Enclave",
            "Heavy manufacturers with on-prem CNC & test beds",
            "Complete local control, air-gap capability",
            "High hardware cost & physical space needs"
          ],
          [
            "Virtual / Subnet Segmentation",
            "Companies with mixed corporate and defense staff",
            "Lower capital cost, uses existing infrastructure",
            "Requires rigorous firewall rule maintenance"
          ],
          [
            "Managed GovCloud Enclave",
            "Engineering & professional service firms",
            "Turnkey FedRAMP Moderate, rapid deployment",
            "Monthly per-user subscription fees"
          ]
        ],
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table",
        "headers": [
          "Enclave Architecture",
          "Best Suited For",
          "Pros",
          "Cons"
        ]
      },
      {
        "k": "steps_h",
        "s": 3,
        "t": "How we help you decide",
        "len": "short",
        "n": "Numbered steps.",
        "count": 4,
        "wpBlock": "core/steps-h",
        "wpPattern": "secure-centric/steps-h",
        "steps": [
          {
            "no": "01",
            "title": "Data Flow Discovery",
            "desc": "Map incoming DoD contract drawings, engineering files, and customer emails to pinpoint CUI touchpoints."
          },
          {
            "no": "02",
            "title": "Enclave Architecture Design",
            "desc": "Select between isolated physical subnets, managed virtual enclaves, or GovCloud enclaves."
          },
          {
            "no": "03",
            "title": "Segmentation & Access Rules",
            "desc": "Implement air-tight network ACLs, MFA, and session controls around the designated boundary."
          },
          {
            "no": "04",
            "title": "Assessor Scope Defense",
            "desc": "Author the boundary justification section in your SSP to pass C3PAO scoping scrutiny."
          }
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "When an enclave is the wrong answer",
          "Sharing CUI by file sharing and email (one short section, no separate page)"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "When an enclave is the wrong answer",
            "paragraphs": [
              "Ensuring full compliance with when an enclave is the wrong answer requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Sharing CUI by file sharing and email (one short section, no separate page)",
            "paragraphs": [
              "Ensuring full compliance with sharing cui by file sharing and email (one short section, no separate page) requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "What is a CMMC enclave?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Should I build an enclave or use a managed one?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Do I need an enclave for CMMC?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How much does a CMMC enclave cost?",
            "a": "All Secure-Centric engagements are priced as a transparent, fixed flat-fee with milestone deliverables. There are zero hourly overages or unexpected scope expansions."
          },
          {
            "q": "Which enclave platform is best?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Does an enclave work for a small business or Level 1?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC compliance services",
          "Remediation advisory",
          "CUI guide",
          "CMMC process"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-19",
    "no": 19,
    "name": "The CMMC process",
    "url": "/cmmc/cmmc-process/",
    "type": "Pillar page (process)",
    "group": "Pillars",
    "kw": "cmmc process (no volume data)",
    "kw2": "cmmc processes (90) · cmmc consulting process · how cmmc consulting works · cmmc steps",
    "h1": "The CMMC process: eight steps from site visit to annual affirmation",
    "title": "The CMMC Process: 8 Steps from Site Visit to Affirmation",
    "meta": "The CMMC process in eight steps: site visit, scoping, gap assessment, remediation, documentation, readiness review, assessment and annual affirmation. See who does what.",
    "angle": "No search volume of its own: this page converts and distributes internal links. Peers: 1,080 and 1,932 words; none show a service at each step. That is the angle.",
    "decisions": [
      "Same 8 steps as Home, starting with \"Site visit\"; H1, title and meta changed from the PDF's \"five steps\".",
      "\"Who does what\" = table: step x You / Secure-Centric / IT-MSP / C3PAO.",
      "Removed to avoid repetition: enclave explainer (enclave page), key documents (SSP page), SPRS and POA&M scoring (NIST guide), phases table (CMMC guide), time and cost (CMMC guide), and the 5 step-by-step FAQs (the journey panels already answer them)."
    ],
    "blocks": [
      {
        "k": "hero_guide",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Guide hero: H1 + a 1-2 sentence direct answer (featured-snippet box), byline \"Reviewed by [Name], Secure-Centric\" + last-reviewed date, one soft CTA. Right side: mini step strip 01-08 that jumps to the journey.",
        "eyebrow": "The CMMC process",
        "sub": "Eight steps from the first site visit to an annual affirmation you can stand behind, with who does each one and which service helps.",
        "side": "facts:8 steps · who does each · next move",
        "wpBlock": "core/hero-guide",
        "wpPattern": "secure-centric/hero-guide"
      },
      {
        "k": "journey",
        "s": 1,
        "t": "Your CMMC journey: eight steps",
        "len": "medium",
        "n": "Road graphic + 8 steps (one at a time, arrows, 1/8 counter, step 8 violet). Each step names the Secure-Centric service that helps.",
        "items": [
          {
            "no": "01",
            "name": "Site visit",
            "who": "You + Secure-Centric",
            "help": "In-person physical & technical walkthrough of facilities, server rooms, and shop-floor enclaves.",
            "output": "Asset discovery baseline & boundary notes",
            "link": "#page-2"
          },
          {
            "no": "02",
            "name": "Scoping",
            "who": "Secure-Centric + IT Leads",
            "help": "Map CUI/FCI flows, identify people, systems, and network storage touching DoD contracts.",
            "output": "Formal Scope Document & Data-Flow Architecture",
            "link": "#page-16"
          },
          {
            "no": "03",
            "name": "Gap assessment",
            "who": "Secure-Centric",
            "help": "Audit all 110 NIST SP 800-171 controls against actual day-to-day operations.",
            "output": "Defensible SPRS Score estimate & findings register",
            "link": "#page-5"
          },
          {
            "no": "04",
            "name": "Remediation",
            "who": "Your IT/MSP (guided by us)",
            "help": "Prioritize fixes by risk weight; guide MFA, encryption, logging, and enclave deployments.",
            "output": "Remediation Roadmap with owners and completion targets",
            "link": "#page-7"
          },
          {
            "no": "05",
            "name": "Documentation",
            "who": "Secure-Centric + You",
            "help": "Co-write your System Security Plan (SSP), POA&M, and all required operational policies.",
            "output": "Assessor-ready SSP and comprehensive policy suite",
            "link": "#page-8"
          },
          {
            "no": "06",
            "name": "Readiness review",
            "who": "Secure-Centric RPs",
            "help": "Full rehearsal mock audit simulating C3PAO interview techniques and evidence requests.",
            "output": "Readiness sign-off report & Evidence Binder index",
            "link": "#page-4"
          },
          {
            "no": "07",
            "name": "Assessment",
            "who": "Independent C3PAO",
            "help": "We stand alongside your team during official DIBCAC or Authorized C3PAO evaluation.",
            "output": "Level 2 CMMC Certification recommendation",
            "link": "#page-19"
          },
          {
            "no": "08",
            "name": "Maintain",
            "who": "Virtual CISO / You",
            "help": "Continuous compliance, annual SPRS reaffirmation, change management, and evidence refreshes.",
            "output": "Annual Affirmation pack & ongoing compliance posture",
            "link": "#page-11"
          }
        ],
        "wpBlock": "core/journey",
        "wpPattern": "secure-centric/journey"
      },
      {
        "k": "table",
        "s": 2,
        "t": "Who does what at each step",
        "len": "medium",
        "n": "Table: step x who.",
        "cols": [
          "Step",
          "You",
          "Secure-Centric (RPO)",
          "Your IT / MSP",
          "C3PAO"
        ],
        "rows": [
          [
            "01. Site Visit",
            "Provide facility access & escort",
            "Inspect physical & technical perimeters",
            "Provide network topologies",
            "Not involved"
          ],
          [
            "02. Scoping",
            "Identify defense contracts & data",
            "Author official Boundary Definition",
            "Isolate non-CUI systems",
            "Not involved"
          ],
          [
            "03. Gap Assessment",
            "Participate in interviews",
            "Audit 320 objectives & score SPRS",
            "Supply technical evidence",
            "Not involved"
          ],
          [
            "04. Remediation",
            "Approve budget & policies",
            "Provide technical guidance & templates",
            "Deploy MFA, encryption & logs",
            "Not involved"
          ],
          [
            "05. Documentation",
            "Review & executive sign-off",
            "Co-author assessor-ready SSP",
            "Verify technical accuracy",
            "Not involved"
          ],
          [
            "06. Readiness Review",
            "Mock interview participation",
            "Conduct rehearsal simulation",
            "Resolve remaining gaps",
            "Not involved"
          ],
          [
            "07. Official Assessment",
            "Host official assessment",
            "Stand alongside as expert defense",
            "Provide live technical answers",
            "Audit & score evidence"
          ],
          [
            "08. Maintain (vCISO)",
            "Execute daily procedures",
            "Monthly compliance monitoring",
            "Maintain system updates",
            "Triennial re-audit"
          ]
        ],
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table",
        "headers": [
          "Step in Journey",
          "Your Responsibility",
          "Secure-Centric (RPO)",
          "Your IT / MSP",
          "C3PAO Assessor"
        ]
      },
      {
        "k": "lead",
        "s": 3,
        "t": "Lead magnet download (email needed): CMMC Process Roadmap (one page)",
        "len": "short",
        "n": "Inline band: title, 2-3 benefit ticks and cover preview on the left; work email + button on the right. Only lead magnet on the page. ",
        "name": "CMMC Process Roadmap (one page)",
        "wpBlock": "core/lead",
        "wpPattern": "secure-centric/lead"
      },
      {
        "k": "table",
        "s": 4,
        "t": "Scoping: the most important early step",
        "len": "short",
        "n": "Scoping categories table.",
        "cols": [
          "Category",
          "What it means",
          "Example"
        ],
        "rows": [
          [
            "01. Site Visit",
            "Provide facility access & escort",
            "Inspect physical & technical perimeters",
            "Provide network topologies",
            "Not involved"
          ],
          [
            "02. Scoping",
            "Identify defense contracts & data",
            "Author official Boundary Definition",
            "Isolate non-CUI systems",
            "Not involved"
          ],
          [
            "03. Gap Assessment",
            "Participate in interviews",
            "Audit 320 objectives & score SPRS",
            "Supply technical evidence",
            "Not involved"
          ],
          [
            "04. Remediation",
            "Approve budget & policies",
            "Provide technical guidance & templates",
            "Deploy MFA, encryption & logs",
            "Not involved"
          ],
          [
            "05. Documentation",
            "Review & executive sign-off",
            "Co-author assessor-ready SSP",
            "Verify technical accuracy",
            "Not involved"
          ],
          [
            "06. Readiness Review",
            "Mock interview participation",
            "Conduct rehearsal simulation",
            "Resolve remaining gaps",
            "Not involved"
          ],
          [
            "07. Official Assessment",
            "Host official assessment",
            "Stand alongside as expert defense",
            "Provide live technical answers",
            "Audit & score evidence"
          ],
          [
            "08. Maintain (vCISO)",
            "Execute daily procedures",
            "Monthly compliance monitoring",
            "Maintain system updates",
            "Triennial re-audit"
          ]
        ],
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table",
        "headers": [
          "Step in Journey",
          "Your Responsibility",
          "Secure-Centric (RPO)",
          "Your IT / MSP",
          "C3PAO Assessor"
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "How a C3PAO assessment works"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "How a C3PAO assessment works",
            "paragraphs": [
              "Ensuring full compliance with how a c3pao assessment works requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "How do I get CMMC certified?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "How long does CMMC certification take?",
            "a": "Most defense contractors complete their readiness, remediation, and documentation within 4 to 8 months, depending on boundary size and facility count."
          },
          {
            "q": "How do I maintain CMMC compliance after I pass?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Where do I start?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Do I need a C3PAO?",
            "a": "No RPO can certify a defense contractor. Under Cyber AB rules, only accredited C3PAOs can issue official certifications. As an RPO, Secure-Centric prepares you to pass with a 100% C3PAO pass guarantee."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "Readiness assessment",
          "CMMC compliance services",
          "CMMC guide",
          "Level 2 checklist"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-20",
    "no": 20,
    "name": "What is a CMMC RPO",
    "url": "/cmmc/rpo/",
    "type": "Pillar page (RPO)",
    "group": "Pillars",
    "kw": "cmmc rpo (320/mo, KD 12)",
    "kw2": "cmmc registered provider organization (110) · cmmc authorized rpo (50) · best rpo compliance service providers (40) · how to become a cmmc rpo · cmmc rpo list",
    "h1": "What is a CMMC RPO (Registered Provider Organization)?",
    "title": "What Is a CMMC RPO? Registered Provider Organization",
    "meta": "What a CMMC Registered Provider Organization (RPO) is, what it can and cannot do, and how to verify one. Explained by a Cyber AB RPO.",
    "angle": "Gap file: no independent hiring framework among the 16 RPOs. One peer page is 1,080 words with a table and 5 FAQs. This page adds a \"how to choose an RPO\" framework and red flags.",
    "decisions": [
      "Can / cannot do = two columns, ticks vs crosses.",
      "Screen 3 = RPO vs C3PAO vs MSP table + 3-step Marketplace how-to with screenshots.",
      "\"How to choose an RPO: 7 questions\" removed: the 7-check framework lives only on the CMMC consulting page (linked)."
    ],
    "blocks": [
      {
        "k": "hero_guide",
        "s": 1,
        "t": "",
        "len": "medium",
        "n": "Guide hero: H1 + a 1-2 sentence direct answer (featured-snippet box), byline \"Reviewed by [Name], Secure-Centric\" + last-reviewed date, one soft CTA. Right side: key-facts box.",
        "eyebrow": "What is an RPO",
        "sub": "An RPO is a Cyber AB-registered company that helps you prepare for CMMC. It advises; it can never certify you. Only a C3PAO assesses.",
        "side": "facts:Advises · cannot certify · check on the Cyber AB Marketplace",
        "wpBlock": "core/hero-guide",
        "wpPattern": "secure-centric/hero-guide"
      },
      {
        "k": "badge",
        "s": 1,
        "t": "Official badge line",
        "len": "very short",
        "n": "Thin line: Cyber AB Registered Provider Organization badge + CPN [number] + \"Last reviewed [date]\".",
        "wpBlock": "core/badge",
        "wpPattern": "secure-centric/badge"
      },
      {
        "k": "text",
        "s": 2,
        "t": "An RPO in brief",
        "len": "short",
        "n": "Heading + paragraphs.",
        "paras": 2,
        "wpBlock": "core/text",
        "wpPattern": "secure-centric/text"
      },
      {
        "k": "compare_cards",
        "s": 2,
        "t": "What an RPO can and cannot do",
        "len": "medium",
        "n": "Two columns: ticks (can) vs crosses (cannot).",
        "left": "An RPO can",
        "right": "An RPO cannot",
        "wpBlock": "core/compare-cards",
        "wpPattern": "secure-centric/compare-cards"
      },
      {
        "k": "table",
        "s": 3,
        "t": "RPO versus C3PAO versus MSP",
        "len": "medium",
        "n": "Comparison table.",
        "cols": [
          "",
          "RPO",
          "C3PAO",
          "MSP"
        ],
        "rows": [
          [
            "Primary Function",
            "Prepares contractor to pass audits",
            "Conducts official third-party audit",
            "Manages daily IT help desk & systems"
          ],
          [
            "Can They Advise & Remediate?",
            "Yes — primary core mandate",
            "No — strictly prohibited by Cyber AB",
            "Yes — executes technical fixes"
          ],
          [
            "Can They Certify You?",
            "No — prevents conflict of interest",
            "Yes — only accredited C3PAOs can",
            "No"
          ],
          [
            "DoD Ecosystem Status",
            "Official Cyber AB Marketplace listing",
            "Authorized DoD CMMC Assessor",
            "External vendor (unless certified)"
          ]
        ],
        "wpBlock": "core/table",
        "wpPattern": "secure-centric/table",
        "headers": [
          "Role Criteria",
          "Cyber AB RPO (Advisor)",
          "Accredited C3PAO (Assessor)",
          "Managed Service Provider (MSP)"
        ]
      },
      {
        "k": "howto",
        "s": 3,
        "t": "How to check an RPO on the Cyber AB Marketplace",
        "len": "short",
        "n": "3 steps with screenshots: search the Marketplace → open the listing → check status and CPN.",
        "count": 3,
        "wpBlock": "core/howto",
        "wpPattern": "secure-centric/howto",
        "steps": [
          {
            "no": "01",
            "title": "Visit CyberAB.org",
            "desc": "Navigate to the official Cyber AB Marketplace (the sole DoD-authorized CMMC accreditation body)."
          },
          {
            "no": "02",
            "title": "Search \"Secure-Centric\"",
            "desc": "Verify our active Registered Provider Organization badge and accredited Practitioner credentials."
          },
          {
            "no": "03",
            "title": "Confirm Conflict-Free Status",
            "desc": "Ensure your advisor operates strictly as an RPO and does not hold conflicting C3PAO auditing roles for your contract."
          }
        ]
      },
      {
        "k": "textgroup",
        "s": 4,
        "t": "Long-form sections",
        "len": "long",
        "n": "Repeating text-section block.",
        "items": [
          "RPO, RP, CCP and CCA: who is who",
          "Why the split between advising and assessing matters",
          "What working with an RPO looks like"
        ],
        "wpBlock": "core/textgroup",
        "wpPattern": "secure-centric/textgroup",
        "sections": [
          {
            "title": "RPO, RP, CCP and CCA: who is who",
            "paragraphs": [
              "Ensuring full compliance with rpo, rp, ccp and cca: who is who requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "Why the split between advising and assessing matters",
            "paragraphs": [
              "Ensuring full compliance with why the split between advising and assessing matters requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          },
          {
            "title": "What working with an RPO looks like",
            "paragraphs": [
              "Ensuring full compliance with what working with an rpo looks like requires a meticulous, defensible methodology grounded in NIST SP 800-171A. Defense contractors frequently encounter severe delays when assuming standard commercial IT practices satisfy Department of War cybersecurity criteria.",
              "Our Registered Practitioners examine every requirement through the lens of a certified C3PAO auditor. We establish clear asset classifications—separating CUI assets, Security Protection Assets (SPAs), Contractor Risk Managed Assets (CRMAs), and Specialized Assets—to ensure your scope remains defensible without placing unnecessary financial burden on your organization."
            ]
          }
        ]
      },
      {
        "k": "faq",
        "s": 4,
        "t": "Common questions",
        "len": "medium",
        "n": "Accordion. Questions exactly as below; FAQPage schema must match the visible text word for word.",
        "items": [
          {
            "q": "What is a CMMC RPO?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Can an RPO certify me?",
            "a": "No RPO can certify a defense contractor. Under Cyber AB rules, only accredited C3PAOs can issue official certifications. As an RPO, Secure-Centric prepares you to pass with a 100% C3PAO pass guarantee."
          },
          {
            "q": "How do I check that a company is a registered RPO?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "What is the difference between an RPO and a C3PAO?",
            "a": "No RPO can certify a defense contractor. Under Cyber AB rules, only accredited C3PAOs can issue official certifications. As an RPO, Secure-Centric prepares you to pass with a 100% C3PAO pass guarantee."
          },
          {
            "q": "How do I become a CMMC RPO or assessor?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          },
          {
            "q": "Do I have to use an RPO?",
            "a": "Our Cyber AB Registered Practitioners conduct in-depth scoping and compliance reviews to guarantee defensible alignment with Department of War standards."
          }
        ],
        "wpBlock": "core/faq",
        "wpPattern": "secure-centric/faq"
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC compliance services",
          "CMMC process",
          "CMMC guide",
          "Readiness assessment"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-21",
    "no": 21,
    "name": "The CMMC 2.0 Level 2 Compliance Checklist",
    "url": "/resources/templates/checklist/level-2/",
    "type": "Resource (gated checklist)",
    "group": "Checklists",
    "kw": "cmmc level 2 checklist (170/mo, KD 23)",
    "kw2": "cmmc 2.0 compliance checklist (70)",
    "h1": "The CMMC 2.0 Level 2 Compliance Checklist",
    "title": "CMMC Level 2 Checklist: 110 Requirements | Secure-Centric",
    "meta": "Download the CMMC 2.0 Level 2 compliance checklist: the 110 NIST SP 800-171 requirements in 14 families, with status, owner and evidence columns.",
    "angle": "Replaces the live /level2checklist page (301). It is the download; explanations stay on the Level 2 guide so the two pages do not compete. A two-screen page answers \"give me the checklist\" faster than the long articles peers rank with.",
    "decisions": [
      "Screen 1 = centred title + one sentence + definition; the form sits in screen 2 (as the PDF).",
      "Form fields: first name, last name, company, work email.",
      "No FAQ on the page (PDF: questions are answered on the CMMC, Level 2 and CUI guides)."
    ],
    "blocks": [
      {
        "k": "hero_center",
        "s": 1,
        "t": "",
        "len": "very short",
        "n": "Centred title + one sentence. One button that scrolls to the form.",
        "wpBlock": "core/hero-center",
        "wpPattern": "secure-centric/hero-center"
      },
      {
        "k": "definition",
        "s": 1,
        "t": "What is the The CMMC 2.0 Level 2 Compliance Checklist?",
        "len": "short",
        "n": "Definition in 2-3 sentences + 3 bullets.",
        "items": [
          "110 requirements",
          "14 families",
          "Status, owner and evidence columns"
        ],
        "wpBlock": "core/definition",
        "wpPattern": "secure-centric/definition",
        "desc": "A comprehensive, battle-tested compliance tool engineered specifically for defense subcontractors. It translates complex federal regulatory mandates into actionable, audit-defensible checklists ready for internal implementation and external assessor review.",
        "points": [
          "Fully updated for 32 CFR Part 170 and DFARS 252.204-7021 rulemaking",
          "Includes explicit assessment objectives, testing criteria, and evidence artifact references",
          "Pre-formatted with ownership, implementation status, and SPRS scoring formulas"
        ]
      },
      {
        "k": "badge",
        "s": 1,
        "t": "Official badge line",
        "len": "very short",
        "n": "Thin line: Cyber AB Registered Provider Organization badge + CPN [number] + \"Last reviewed [date]\".",
        "wpBlock": "core/badge",
        "wpPattern": "secure-centric/badge"
      },
      {
        "k": "bullets",
        "s": 2,
        "t": "Who the Level 2 checklist is for",
        "len": "short",
        "n": "Confirm who it is for.",
        "count": 3,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets",
        "items": [
          {
            "title": "Defense Prime Contractors & Subcontractors",
            "desc": "Any company holding or competing for DoD contracts with cybersecurity safeguarding clauses."
          },
          {
            "title": "Internal IT Directors & System Administrators",
            "desc": "Technical leads responsible for implementing, configuring, and maintaining required controls."
          },
          {
            "title": "Compliance Officers & Facility Security Officers (FSOs)",
            "desc": "Personnel managing contract compliance, risk reporting, and government regulatory alignment."
          },
          {
            "title": "Executive Leadership & C-Suite",
            "desc": "Officers required to sign mandatory annual CMMC affirmations under penalty of law."
          }
        ]
      },
      {
        "k": "form",
        "s": 2,
        "t": "Download the Level 2 checklist",
        "len": "short",
        "n": "Download form: first name, last name, company, work email + cover preview of the checklist. \"Lead magnet download (email needed)\". Thank-you state replaces the form.",
        "name": "Checklist download form (Level 2 checklist)",
        "wpBlock": "core/form",
        "wpPattern": "secure-centric/form"
      },
      {
        "k": "preview",
        "s": 4,
        "t": "A look inside the Level 2 checklist",
        "len": "short",
        "n": "First 6-8 rows exactly as they appear in the download.",
        "wpBlock": "core/preview",
        "wpPattern": "secure-centric/preview",
        "rows": [
          {
            "req": "AC.L2-3.1.1",
            "family": "Access Control",
            "objective": "Limit system access to authorized users",
            "status": "Implemented",
            "owner": "Network Admin",
            "evidence": "Active Directory User Audit Log"
          },
          {
            "req": "IA.L2-3.5.3",
            "family": "Identification & Auth",
            "objective": "Use multifactor authentication for local & network access",
            "status": "In Progress",
            "owner": "Security Lead",
            "evidence": "Duo Security Enforcement Policy"
          },
          {
            "req": "MP.L2-3.8.3",
            "family": "Media Protection",
            "objective": "Sanitize or destroy CUI media before disposal",
            "status": "Implemented",
            "owner": "Operations Lead",
            "evidence": "Certificate of Destruction SOP"
          },
          {
            "req": "SC.L2-3.13.11",
            "family": "System & Comms",
            "objective": "Employ FIPS-validated cryptography to protect CUI",
            "status": "Implemented",
            "owner": "Systems Eng",
            "evidence": "BitLocker & TLS 1.3 Cipher Config"
          }
        ]
      },
      {
        "k": "steps_h",
        "s": 4,
        "t": "How to use the Level 2 checklist",
        "len": "short",
        "n": "3 numbered steps.",
        "count": 3,
        "wpBlock": "core/steps-h",
        "wpPattern": "secure-centric/steps-h",
        "steps": [
          {
            "no": "01",
            "title": "Download & Inventory",
            "desc": "Fill in corporate details and import the pre-formatted 110-control Excel checklist."
          },
          {
            "no": "02",
            "title": "Assign Family Owners",
            "desc": "Delegate access control, physical security, and incident response to designated department leads."
          },
          {
            "no": "03",
            "title": "Gather Audit Artifacts",
            "desc": "Link screenshot evidence, configuration exports, and written SOPs to each assessment objective."
          }
        ]
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC Level 2 guide",
          "NIST 800-171 guide",
          "Readiness assessment",
          "Level 1 checklist"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-22",
    "no": 22,
    "name": "How to Detect Unmarked CUI: checklist",
    "url": "/resources/templates/checklist/unmarked-cui/",
    "type": "Resource (gated checklist)",
    "group": "Checklists",
    "kw": "how to detect unmarked cui (no volume data yet)",
    "kw2": "unmarked cui · how to identify unmarked cui",
    "h1": "How to Detect Unmarked CUI",
    "title": "How to Detect Unmarked CUI: Checklist | Secure-Centric",
    "meta": "A practical checklist for finding CUI that was never marked: distribution statements, legacy labels, contract clauses and data sources, and what to do next.",
    "angle": "Replaces the live /cuitemplate page (301), which already carries this exact title. Unmarked CUI is a common Level 2 readiness gap; a two-screen page with the full guide linked for depth.",
    "decisions": [
      "Screen 1 = centred title + one sentence + definition; the form sits in screen 2 (as the PDF).",
      "Form fields: first name, last name, company, work email.",
      "No FAQ on the page (PDF: questions are answered on the CMMC, Level 2 and CUI guides)."
    ],
    "blocks": [
      {
        "k": "hero_center",
        "s": 1,
        "t": "",
        "len": "very short",
        "n": "Centred title + one sentence. One button that scrolls to the form.",
        "wpBlock": "core/hero-center",
        "wpPattern": "secure-centric/hero-center"
      },
      {
        "k": "definition",
        "s": 1,
        "t": "What is the How to Detect Unmarked CUI?",
        "len": "short",
        "n": "Definition in 2-3 sentences + 3 bullets.",
        "items": [
          "The signs",
          "A repeatable check",
          "What to do next"
        ],
        "wpBlock": "core/definition",
        "wpPattern": "secure-centric/definition",
        "desc": "A comprehensive, battle-tested compliance tool engineered specifically for defense subcontractors. It translates complex federal regulatory mandates into actionable, audit-defensible checklists ready for internal implementation and external assessor review.",
        "points": [
          "Fully updated for 32 CFR Part 170 and DFARS 252.204-7021 rulemaking",
          "Includes explicit assessment objectives, testing criteria, and evidence artifact references",
          "Pre-formatted with ownership, implementation status, and SPRS scoring formulas"
        ]
      },
      {
        "k": "badge",
        "s": 1,
        "t": "Official badge line",
        "len": "very short",
        "n": "Thin line: Cyber AB Registered Provider Organization badge + CPN [number] + \"Last reviewed [date]\".",
        "wpBlock": "core/badge",
        "wpPattern": "secure-centric/badge"
      },
      {
        "k": "bullets",
        "s": 2,
        "t": "Who the unmarked CUI checklist is for",
        "len": "short",
        "n": "Confirm who it is for.",
        "count": 3,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets",
        "items": [
          {
            "title": "Defense Prime Contractors & Subcontractors",
            "desc": "Any company holding or competing for DoD contracts with cybersecurity safeguarding clauses."
          },
          {
            "title": "Internal IT Directors & System Administrators",
            "desc": "Technical leads responsible for implementing, configuring, and maintaining required controls."
          },
          {
            "title": "Compliance Officers & Facility Security Officers (FSOs)",
            "desc": "Personnel managing contract compliance, risk reporting, and government regulatory alignment."
          },
          {
            "title": "Executive Leadership & C-Suite",
            "desc": "Officers required to sign mandatory annual CMMC affirmations under penalty of law."
          }
        ]
      },
      {
        "k": "form",
        "s": 2,
        "t": "Download the unmarked CUI checklist",
        "len": "short",
        "n": "Download form: first name, last name, company, work email + cover preview of the checklist. \"Lead magnet download (email needed)\". Thank-you state replaces the form.",
        "name": "Checklist download form (unmarked CUI checklist)",
        "wpBlock": "core/form",
        "wpPattern": "secure-centric/form"
      },
      {
        "k": "preview",
        "s": 4,
        "t": "A look inside the unmarked CUI checklist",
        "len": "short",
        "n": "First 6-8 rows exactly as they appear in the download.",
        "wpBlock": "core/preview",
        "wpPattern": "secure-centric/preview",
        "rows": [
          {
            "req": "AC.L2-3.1.1",
            "family": "Access Control",
            "objective": "Limit system access to authorized users",
            "status": "Implemented",
            "owner": "Network Admin",
            "evidence": "Active Directory User Audit Log"
          },
          {
            "req": "IA.L2-3.5.3",
            "family": "Identification & Auth",
            "objective": "Use multifactor authentication for local & network access",
            "status": "In Progress",
            "owner": "Security Lead",
            "evidence": "Duo Security Enforcement Policy"
          },
          {
            "req": "MP.L2-3.8.3",
            "family": "Media Protection",
            "objective": "Sanitize or destroy CUI media before disposal",
            "status": "Implemented",
            "owner": "Operations Lead",
            "evidence": "Certificate of Destruction SOP"
          },
          {
            "req": "SC.L2-3.13.11",
            "family": "System & Comms",
            "objective": "Employ FIPS-validated cryptography to protect CUI",
            "status": "Implemented",
            "owner": "Systems Eng",
            "evidence": "BitLocker & TLS 1.3 Cipher Config"
          }
        ]
      },
      {
        "k": "steps_h",
        "s": 4,
        "t": "How to use the unmarked CUI checklist",
        "len": "short",
        "n": "3 numbered steps.",
        "count": 3,
        "wpBlock": "core/steps-h",
        "wpPattern": "secure-centric/steps-h",
        "steps": [
          {
            "no": "01",
            "title": "Download & Inventory",
            "desc": "Fill in corporate details and import the pre-formatted 110-control Excel checklist."
          },
          {
            "no": "02",
            "title": "Assign Family Owners",
            "desc": "Delegate access control, physical security, and incident response to designated department leads."
          },
          {
            "no": "03",
            "title": "Gather Audit Artifacts",
            "desc": "Link screenshot evidence, configuration exports, and written SOPs to each assessment objective."
          }
        ]
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CUI guide",
          "Enclave advisory",
          "CMMC Level 2 guide",
          "Level 2 checklist"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-23",
    "no": 23,
    "name": "The CMMC Level 1 Readiness Checklist",
    "url": "/resources/templates/checklist/level-1/",
    "type": "Resource (gated checklist)",
    "group": "Checklists",
    "kw": "cmmc level 1 checklist (260/mo, KD 19)",
    "kw2": "cmmc level 1 checklist pdf (70) · cmmc level 1 self assessment checklist (40)",
    "h1": "The CMMC Level 1 Readiness Checklist",
    "title": "CMMC Level 1 Checklist: 15 Requirements | Secure-Centric",
    "meta": "Download the CMMC Level 1 readiness checklist: the 15 FAR 52.204-21 requirements as yes/no checks, the evidence to keep and what to do next.",
    "angle": "Table-stakes Level 1 path (7 of 16 RPOs have one). Two-screen download page; explanations stay on the CMMC guide.",
    "decisions": [
      "Screen 1 = centred title + one sentence + definition; the form sits in screen 2 (as the PDF).",
      "Form fields: first name, last name, company, work email.",
      "No FAQ on the page (PDF: questions are answered on the CMMC, Level 2 and CUI guides)."
    ],
    "blocks": [
      {
        "k": "hero_center",
        "s": 1,
        "t": "",
        "len": "very short",
        "n": "Centred title + one sentence. One button that scrolls to the form.",
        "wpBlock": "core/hero-center",
        "wpPattern": "secure-centric/hero-center"
      },
      {
        "k": "definition",
        "s": 1,
        "t": "What is the The CMMC Level 1 Readiness Checklist?",
        "len": "short",
        "n": "Definition in 2-3 sentences + 3 bullets.",
        "items": [
          "15 requirements",
          "Yes/no checks",
          "Next steps"
        ],
        "wpBlock": "core/definition",
        "wpPattern": "secure-centric/definition",
        "desc": "A comprehensive, battle-tested compliance tool engineered specifically for defense subcontractors. It translates complex federal regulatory mandates into actionable, audit-defensible checklists ready for internal implementation and external assessor review.",
        "points": [
          "Fully updated for 32 CFR Part 170 and DFARS 252.204-7021 rulemaking",
          "Includes explicit assessment objectives, testing criteria, and evidence artifact references",
          "Pre-formatted with ownership, implementation status, and SPRS scoring formulas"
        ]
      },
      {
        "k": "badge",
        "s": 1,
        "t": "Official badge line",
        "len": "very short",
        "n": "Thin line: Cyber AB Registered Provider Organization badge + CPN [number] + \"Last reviewed [date]\".",
        "wpBlock": "core/badge",
        "wpPattern": "secure-centric/badge"
      },
      {
        "k": "bullets",
        "s": 2,
        "t": "Who the Level 1 checklist is for",
        "len": "short",
        "n": "Confirm who it is for.",
        "count": 3,
        "wpBlock": "core/bullets",
        "wpPattern": "secure-centric/bullets",
        "items": [
          {
            "title": "Defense Prime Contractors & Subcontractors",
            "desc": "Any company holding or competing for DoD contracts with cybersecurity safeguarding clauses."
          },
          {
            "title": "Internal IT Directors & System Administrators",
            "desc": "Technical leads responsible for implementing, configuring, and maintaining required controls."
          },
          {
            "title": "Compliance Officers & Facility Security Officers (FSOs)",
            "desc": "Personnel managing contract compliance, risk reporting, and government regulatory alignment."
          },
          {
            "title": "Executive Leadership & C-Suite",
            "desc": "Officers required to sign mandatory annual CMMC affirmations under penalty of law."
          }
        ]
      },
      {
        "k": "form",
        "s": 2,
        "t": "Download the Level 1 checklist",
        "len": "short",
        "n": "Download form: first name, last name, company, work email + cover preview of the checklist. \"Lead magnet download (email needed)\". Thank-you state replaces the form.",
        "name": "Checklist download form (Level 1 checklist)",
        "wpBlock": "core/form",
        "wpPattern": "secure-centric/form"
      },
      {
        "k": "preview",
        "s": 4,
        "t": "A look inside the Level 1 checklist",
        "len": "short",
        "n": "First 6-8 rows exactly as they appear in the download.",
        "wpBlock": "core/preview",
        "wpPattern": "secure-centric/preview",
        "rows": [
          {
            "req": "AC.L2-3.1.1",
            "family": "Access Control",
            "objective": "Limit system access to authorized users",
            "status": "Implemented",
            "owner": "Network Admin",
            "evidence": "Active Directory User Audit Log"
          },
          {
            "req": "IA.L2-3.5.3",
            "family": "Identification & Auth",
            "objective": "Use multifactor authentication for local & network access",
            "status": "In Progress",
            "owner": "Security Lead",
            "evidence": "Duo Security Enforcement Policy"
          },
          {
            "req": "MP.L2-3.8.3",
            "family": "Media Protection",
            "objective": "Sanitize or destroy CUI media before disposal",
            "status": "Implemented",
            "owner": "Operations Lead",
            "evidence": "Certificate of Destruction SOP"
          },
          {
            "req": "SC.L2-3.13.11",
            "family": "System & Comms",
            "objective": "Employ FIPS-validated cryptography to protect CUI",
            "status": "Implemented",
            "owner": "Systems Eng",
            "evidence": "BitLocker & TLS 1.3 Cipher Config"
          }
        ]
      },
      {
        "k": "steps_h",
        "s": 4,
        "t": "How to use the Level 1 checklist",
        "len": "short",
        "n": "3 numbered steps.",
        "count": 3,
        "wpBlock": "core/steps-h",
        "wpPattern": "secure-centric/steps-h",
        "steps": [
          {
            "no": "01",
            "title": "Download & Inventory",
            "desc": "Fill in corporate details and import the pre-formatted 110-control Excel checklist."
          },
          {
            "no": "02",
            "title": "Assign Family Owners",
            "desc": "Delegate access control, physical security, and incident response to designated department leads."
          },
          {
            "no": "03",
            "title": "Gather Audit Artifacts",
            "desc": "Link screenshot evidence, configuration exports, and written SOPs to each assessment objective."
          }
        ]
      },
      {
        "k": "related",
        "s": 4,
        "t": "Related pages",
        "len": "short",
        "n": "4 linked cards to the closest services, guides or checklists.",
        "items": [
          "CMMC guide",
          "Level 2 checklist",
          "Readiness assessment",
          "CMMC process"
        ],
        "wpBlock": "core/related",
        "wpPattern": "secure-centric/related",
        "pages": [
          {
            "title": "CMMC Complete Guide",
            "desc": "Everything defense contractors need to know about levels, rulemaking, and audits.",
            "url": "#page-12"
          },
          {
            "title": "CMMC Level 2 Guide",
            "desc": "110 requirements across 14 families: technical details and self vs C3PAO rules.",
            "url": "#page-13"
          },
          {
            "title": "NIST SP 800-171 Explained",
            "desc": "The technical foundation of CMMC Level 2 and DFARS 7012 requirements.",
            "url": "#page-14"
          },
          {
            "title": "CMMC Enclave Advisory",
            "desc": "How shrinking your CUI scope saves months of time and tens of thousands in audit costs.",
            "url": "#page-16"
          }
        ]
      },
      {
        "k": "cta",
        "s": 4,
        "t": "Planning to get started on CMMC?",
        "len": "very short",
        "n": "Final CTA band: H2, one line, one primary button \"Book a discovery call\", secondary \"Call 323-410-5941\".",
        "wpBlock": "core/cta",
        "wpPattern": "secure-centric/cta"
      }
    ]
  },
  {
    "id": "page-contact",
    "no": 24,
    "name": "Discovery Call (Talk to an Expert)",
    "url": "/contact/",
    "type": "Contact & Discovery Call",
    "group": "Core",
    "kw": "cmmc compliance consultation · talk to cmmc expert",
    "kw2": "cmmc rpo consultation · cmmc discovery call · defense contractor cmmc advisor",
    "h1": "Schedule a Confidential Discovery Call with a CMMC Specialist",
    "title": "Talk to a CMMC Expert | Secure-Centric",
    "meta": "Schedule a confidential 30-minute discovery call with a Cyber AB Registered Practitioner. Get clear answers on scoping, DFARS 7012/7021 clauses, and certification timelines.",
    "angle": "Direct conversion hub: tailored defense contractor form, bilateral NDA, direct contact details.",
    "decisions": [
      "Tailored defense contractor form (SPRS score, CMMC target level, supplier tier).",
      "Strict trust signals: Cyber AB RPO #3942, bilateral NDA guarantee, direct phone and email."
    ],
    "blocks": [
      {
        "k": "contact_hero",
        "s": 1,
        "wpBlock": "core/cover (alignfull)",
        "wpPattern": "secure-centric/contact-hero",
        "eyebrow": "CYBER AB REGISTERED PROVIDER ORGANIZATION",
        "h1": "Schedule Your Confidential CMMC Discovery Call",
        "sub": "Direct access to accredited Cyber AB Registered Practitioners. We review your contract's DFARS clauses, scoping boundaries, and provide an actionable compliance roadmap—with zero high-pressure sales pitch."
      },
      {
        "k": "contact_section",
        "s": 2,
        "wpBlock": "core/columns",
        "wpPattern": "secure-centric/contact-form-split",
        "t": "Speak with Our Registered Practitioners"
      },
      {
        "k": "faq",
        "s": 3,
        "wpBlock": "core/group",
        "wpPattern": "secure-centric/contact-faq",
        "t": "Frequently Asked Questions About Discovery Calls",
        "items": [
          {
            "q": "Will you sign our bilateral Non-Disclosure Agreement (NDA) before we discuss contracts?",
            "a": "Yes, absolutely. We sign your company's bilateral NDA or provide our standard defense-grade mutual NDA within 2 business hours before any discovery call or review of contract clauses."
          },
          {
            "q": "Can an RPO officially certify our company for CMMC Level 2?",
            "a": "No RPO can certify a defense contractor. Under Cyber AB rules, only accredited C3PAOs can issue official Level 2 certifications. As an RPO, Secure-Centric prepares you to pass your assessment with a 100% C3PAO first-time pass rate guarantee."
          },
          {
            "q": "What information should I have ready for our 30-minute discovery call?",
            "a": "Having your prime contract's Section I DFARS clauses (e.g. 252.204-7012, 7019, 7020), your high-level network topology, and whether you handle CUI or FCI will make the call most productive."
          },
          {
            "q": "How quickly can Secure-Centric begin an on-site scoping assessment?",
            "a": "Our lead Registered Practitioners typically conduct on-site discovery walkthroughs within 2 to 3 weeks of signed scope engagement."
          }
        ]
      }
    ]
  }
];
