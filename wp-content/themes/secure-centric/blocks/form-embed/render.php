<?php
/**
 * Render Template for Form Embed Block (Card or Split Layout)
 * Strictly matches demo/assets/js/app.js renderContactSection
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$layout = ! empty( $attributes['layout'] ) ? $attributes['layout'] : 'card';

if ( 'split' === $layout ) :
    $info_eyebrow = ! empty( $attributes['infoEyebrow'] ) ? $attributes['infoEyebrow'] : '// DIRECT ENGAGEMENT';
    $info_title   = ! empty( $attributes['infoTitle'] ) ? $attributes['infoTitle'] : 'Direct Access to Registered Practitioners';
    $info_desc    = ! empty( $attributes['infoDesc'] ) ? $attributes['infoDesc'] : "Every discovery call is led directly by an accredited Cyber AB Registered Practitioner (RP), not a generalist salesperson. We review your contract's DFARS 252.204-7012 clauses and help determine your exact scoping boundaries.";
    $phone        = ! empty( $attributes['phone'] ) ? $attributes['phone'] : '(323) 410-5941';
    $email        = ! empty( $attributes['email'] ) ? $attributes['email'] : 'info@secure-centric.com';
    $location     = ! empty( $attributes['location'] ) ? $attributes['location'] : 'Los Angeles, California';
?>
  <section class="section-ice py-section wp-block-inspect wp-pattern-inspect" 
           data-wp-block="wp:columns" 
           data-wp-pattern="secure-centric/contact-form-split">
    <div class="site-container">
      <div class="contact-grid-split">
        <!-- Left Info Column -->
        <div class="contact-info-panel">
          <span class="section-eyebrow"><?php echo esc_html( $info_eyebrow ); ?></span>
          <h2 style="margin-bottom: 16px; font-size: 1.85rem; color: var(--color-navy);"><?php echo esc_html( $info_title ); ?></h2>
          <p style="color: var(--color-body-text); margin-bottom: 24px; line-height: 1.6;">
            <?php echo esc_html( $info_desc ); ?>
          </p>

          <div class="contact-card-box">
            <h4 style="margin-bottom: 14px; font-size: 1.05rem;">Direct Contractor Inquiries</h4>
            <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.9375rem;">
              <div style="display: flex; gap: 12px; align-items: center;">
                <span style="font-size: 1.25rem;">📞</span>
                <div>
                  <b style="color: var(--color-navy);">Phone:</b>
                  <div><a href="tel:<?php echo esc_attr( preg_replace( '/[^0-9]/', '', $phone ) ); ?>" style="color: var(--color-electric-blue); font-weight: 600;"><?php echo esc_html( $phone ); ?></a></div>
                  <small style="color: var(--color-slate);">Mon – Fri: 8:00 AM – 6:00 PM PT</small>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <span style="font-size: 1.25rem;">✉️</span>
                <div>
                  <b style="color: var(--color-navy);">Confidential Email:</b>
                  <div><a href="mailto:<?php echo esc_attr( $email ); ?>" style="color: var(--color-electric-blue); font-weight: 600;"><?php echo esc_html( $email ); ?></a></div>
                  <small style="color: var(--color-slate);">PGP encryption available upon request</small>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <span style="font-size: 1.25rem;">📍</span>
                <div>
                  <b style="color: var(--color-navy);">Location & Coverage:</b>
                  <div><?php echo esc_html( $location ); ?></div>
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

            <form id="expert-contact-form" onsubmit="event.preventDefault(); alert('Thank you! Your discovery call request has been received under bilateral NDA. Our certified Registered Practitioner will respond within 4 business hours.');">
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
<?php else : ?>
  <!-- Card embed for inline / simple forms -->
  <div style="max-width: 680px; margin: 0 auto;">
    <div class="contact-form-card">
      <h3 style="margin-bottom: 8px; font-size: 1.4rem;">Get in Touch</h3>
      <p style="font-size: 0.875rem; color: var(--color-slate); margin-bottom: 20px;">
        Submit your details below and a Registered Practitioner will follow up.
      </p>
      <form onsubmit="event.preventDefault(); alert('Thank you! Submitted.');">
        <div class="form-group" style="margin-bottom: 14px;">
          <label class="form-label">Full Name*</label>
          <input type="text" class="form-input" required />
        </div>
        <div class="form-group" style="margin-bottom: 14px;">
          <label class="form-label">Work Email*</label>
          <input type="email" class="form-input" required />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Submit</button>
      </form>
    </div>
  </div>
<?php endif; ?>
