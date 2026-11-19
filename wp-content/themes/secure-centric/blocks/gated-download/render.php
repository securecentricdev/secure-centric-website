<?php
/**
 * Render Template for Gated Resource Download (Popup Form) Block
 *
 * @package SecureCentric
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$unique_id = 'sc-gated-' . wp_unique_id();

$eyebrow        = isset( $attributes['eyebrow'] ) ? trim( str_replace( array( 'U0026', 'u0026' ), '&', $attributes['eyebrow'] ) ) : '// FREE DOWNLOADABLE RESOURCE';
$title          = ! empty( $attributes['title'] ) ? $attributes['title'] : 'CMMC Level 2 Compliance Checklist & Scoring Engine';
$description    = ! empty( $attributes['description'] ) ? $attributes['description'] : 'Assess your readiness against all 110 NIST SP 800-171 controls with automated SPRS scoring formulas, evidence templates, and team milestone tracking.';
$doc_type       = ! empty( $attributes['docType'] ) ? $attributes['docType'] : 'EXCEL & PDF WORKBOOK';
$file_url       = ! empty( $attributes['fileUrl'] ) ? esc_url( $attributes['fileUrl'] ) : '';
$file_name      = ! empty( $attributes['fileName'] ) ? esc_attr( $attributes['fileName'] ) : '';
$btn_text       = ! empty( $attributes['btnText'] ) ? $attributes['btnText'] : 'Download Free Checklist →';
$form_id        = ! empty( $attributes['formId'] ) ? (string) $attributes['formId'] : '102';
$modal_title    = ! empty( $attributes['modalTitle'] ) ? $attributes['modalTitle'] : 'Where should we send your download?';
$modal_subtitle = ! empty( $attributes['modalSubtitle'] ) ? $attributes['modalSubtitle'] : 'Enter your name and corporate work email below. Your file will download immediately upon submission.';
$theme          = ! empty( $attributes['theme'] ) ? $attributes['theme'] : 'ice';
$is_ice         = ( 'ice' === $theme );

if ( function_exists( 'sc_clean_text' ) ) {
    $eyebrow        = sc_clean_text( $eyebrow );
    $title          = sc_clean_text( $title );
    $description    = sc_clean_text( $description );
    $doc_type       = sc_clean_text( $doc_type );
    $btn_text       = sc_clean_text( $btn_text );
    $modal_title    = sc_clean_text( $modal_title );
    $modal_subtitle = sc_clean_text( $modal_subtitle );
}

$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : ( ! empty( $attributes['id'] ) ? $attributes['id'] : '' );
$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>

<section class="<?php echo $is_ice ? 'section-ice' : 'section-white'; ?> py-section wp-block-inspect" data-wp-pattern="secure-centric/gated-download"<?php echo $anchor_attr; ?>>
  <div class="site-container">
    <div class="card card-white" style="border-radius: 12px; border: 1.5px solid var(--color-border); box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: clamp(28px, 4vw, 44px); position: relative; overflow: hidden; background: #ffffff;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; align-items: center;">
        <div>
          <?php if ( ! empty( $eyebrow ) ) : ?>
          <span class="section-eyebrow" style="margin-bottom: 12px; display: inline-flex;"><?php echo esc_html( $eyebrow ); ?></span>
          <?php endif; ?>
          <h2 style="font-size: clamp(1.5rem, 2.6vw, 2.1rem); color: var(--color-navy); margin-bottom: 14px; line-height: 1.25; font-weight: 700;">
            <?php echo esc_html( $title ); ?>
          </h2>
          <p style="font-size: 1.05rem; color: var(--color-body-text); line-height: 1.6; margin-bottom: 24px; max-width: 620px;">
            <?php echo esc_html( $description ); ?>
          </p>
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px;">
            <button type="button" 
                    class="btn btn-primary sc-gated-open-trigger" 
                    data-modal-id="<?php echo esc_attr( $unique_id ); ?>" 
                    style="font-size: 1.05rem; padding: 14px 28px; cursor: pointer; border: none; font-weight: 700; border-radius: 6px; box-shadow: 0 4px 14px rgba(47, 91, 255, 0.35);">
              <?php echo esc_html( $btn_text ); ?>
            </button>
            <span style="font-size: 0.8125rem; color: var(--color-slate); font-family: var(--font-mono); display: inline-flex; align-items: center; gap: 6px;">
              <span>🔒</span> Instant File Access · No Sales Pitch
            </span>
          </div>
        </div>

        <div style="display: flex; justify-content: center;">
          <div style="width: 100%; max-width: 320px; background: linear-gradient(135deg, #0B1437 0%, #101E56 100%); border-radius: 10px; padding: 24px; color: #ffffff; box-shadow: 0 12px 30px rgba(11,20,55,0.25); border: 1px solid rgba(0, 212, 255, 0.25); text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 12px;">📄</div>
            <span style="font-size: 0.75rem; font-family: var(--font-mono); letter-spacing: 0.1em; color: var(--color-cyber-cyan); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 8px;">
              <?php echo esc_html( $doc_type ); ?>
            </span>
            <strong style="display: block; font-size: 1.1rem; color: #ffffff; line-height: 1.35; margin-bottom: 14px;">
              <?php echo esc_html( $title ); ?>
            </strong>
            <div style="height: 1px; background: rgba(255,255,255,0.15); margin: 12px 0;"></div>
            <span style="font-size: 0.8125rem; color: #94A3B8;">
              <?php echo ! empty( $file_url ) ? '✅ File Linked & Ready' : '⚡ Complete form to download'; ?>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Popup Modal Overlay -->
  <div id="<?php echo esc_attr( $unique_id ); ?>" 
       class="sc-gated-modal-overlay" 
       data-file-url="<?php echo esc_attr( $file_url ); ?>"
       data-file-name="<?php echo esc_attr( $file_name ); ?>"
       data-form-id="<?php echo esc_attr( $form_id ); ?>"
       style="display: none; position: fixed; inset: 0; background: rgba(11, 20, 55, 0.75); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); z-index: 999999; align-items: center; justify-content: center; padding: 20px; opacity: 0; transition: opacity 0.25s ease;">
    
    <div class="sc-gated-modal-card" style="background: #ffffff; border-radius: 12px; max-width: 540px; width: 100%; padding: clamp(24px, 4vw, 36px); box-shadow: 0 25px 50px rgba(0,0,0,0.3); position: relative; max-height: 90vh; overflow-y: auto; transform: translateY(20px); transition: transform 0.25s ease;">
      <!-- Close button -->
      <button type="button" 
              class="sc-gated-modal-close" 
              aria-label="Close modal" 
              style="position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--color-border); background: #f8fafc; color: var(--color-navy); font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">
        ✕
      </button>

      <!-- Modal Header -->
      <div class="sc-gated-modal-header" style="margin-bottom: 20px; padding-right: 30px;">
        <span style="font-size: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-electric-blue); text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 6px;">
          INSTANT ACCESS // STEP 1 OF 1
        </span>
        <h3 style="font-size: 1.35rem; color: var(--color-navy); margin-bottom: 8px; font-weight: 700;">
          <?php echo esc_html( $modal_title ); ?>
        </h3>
        <p style="font-size: 0.9375rem; color: var(--color-body-text); line-height: 1.5; margin: 0;">
          <?php echo esc_html( $modal_subtitle ); ?>
        </p>
      </div>

      <!-- Forminator Form Container -->
      <div class="sc-gated-form-container">
        <?php
        if ( ! empty( $form_id ) && shortcode_exists( 'forminator_form' ) ) :
            echo do_shortcode( '[forminator_form id="' . esc_attr( $form_id ) . '"]' );
        else :
        ?>
          <form class="sc-gated-fallback-form" onsubmit="event.preventDefault(); window.scTriggerGatedDownload('<?php echo esc_js( $unique_id ); ?>');">
            <div style="margin-bottom: 12px;">
              <label style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 4px; color: var(--color-navy);">Full Name *</label>
              <input type="text" class="form-input" placeholder="e.g. John Doe" required style="width: 100%;" />
            </div>
            <div style="margin-bottom: 16px;">
              <label style="display: block; font-size: 0.8125rem; font-weight: 600; margin-bottom: 4px; color: var(--color-navy);">Work Email *</label>
              <input type="email" class="form-input" placeholder="john@defensecompany.com" required style="width: 100%;" />
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; font-weight: 700; padding: 12px 20px;">
              Download Now →
            </button>
          </form>
        <?php endif; ?>
      </div>

      <!-- Success State Container (Shown after submission) -->
      <div class="sc-gated-success-state" style="display: none; text-align: center; padding: 24px 10px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
        <h4 style="font-size: 1.35rem; color: var(--color-navy); margin-bottom: 8px; font-weight: 700;">
          Download Started!
        </h4>
        <p style="font-size: 0.9375rem; color: var(--color-body-text); line-height: 1.55; margin-bottom: 20px;">
          Your file is downloading to your device right now. A copy has also been registered to your email.
        </p>
        <?php if ( ! empty( $file_url ) ) : ?>
        <a href="<?php echo esc_url( $file_url ); ?>" 
           download="<?php echo esc_attr( $file_name ); ?>" 
           class="btn btn-primary sc-direct-download-btn" 
           style="display: inline-block; padding: 12px 24px; font-weight: 700; text-decoration: none;">
          Click Here to Download Directly ⤓
        </a>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>

<!-- Client Script for Modal & Download Handling (Runs once per page) -->
<?php if ( ! wp_script_is( 'sc-gated-download-runtime', 'enqueued' ) ) : ?>
<script id="sc-gated-download-runtime">
(function() {
  if (window.__scGatedDownloadInit) return;
  window.__scGatedDownloadInit = true;

  function triggerDownload(fileUrl, fileName) {
    if (!fileUrl) return;
    var a = document.createElement('a');
    a.href = fileUrl;
    if (fileName) {
      a.download = fileName;
    } else {
      a.setAttribute('download', '');
    }
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      if (a.parentNode) a.parentNode.removeChild(a);
    }, 1500);
  }

  window.scTriggerGatedDownload = function(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    var fileUrl = modal.getAttribute('data-file-url');
    var fileName = modal.getAttribute('data-file-name');
    
    // Switch to success UI
    var formWrap = modal.querySelector('.sc-gated-form-container');
    var successWrap = modal.querySelector('.sc-gated-success-state');
    var header = modal.querySelector('.sc-gated-modal-header');
    if (formWrap) formWrap.style.display = 'none';
    if (header) header.style.display = 'none';
    if (successWrap) successWrap.style.display = 'block';

    triggerDownload(fileUrl, fileName);
  };

  // Open modal click handler
  document.addEventListener('click', function(e) {
    var openBtn = e.target.closest('.sc-gated-open-trigger');
    if (openBtn) {
      e.preventDefault();
      var targetId = openBtn.getAttribute('data-modal-id');
      var modal = document.getElementById(targetId);
      if (modal) {
        modal.style.display = 'flex';
        setTimeout(function() {
          modal.style.opacity = '1';
          var card = modal.querySelector('.sc-gated-modal-card');
          if (card) card.style.transform = 'translateY(0)';
        }, 10);
      }
    }

    // Close modal click handler
    var closeBtn = e.target.closest('.sc-gated-modal-close');
    if (closeBtn) {
      e.preventDefault();
      var modal = closeBtn.closest('.sc-gated-modal-overlay');
      closeModal(modal);
    }

    // Backdrop click
    if (e.target.classList.contains('sc-gated-modal-overlay')) {
      closeModal(e.target);
    }
  });

  function closeModal(modal) {
    if (!modal) return;
    modal.style.opacity = '0';
    var card = modal.querySelector('.sc-gated-modal-card');
    if (card) card.style.transform = 'translateY(20px)';
    setTimeout(function() {
      modal.style.display = 'none';
    }, 250);
  }

  // Close on ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      document.querySelectorAll('.sc-gated-modal-overlay').forEach(function(m) {
        if (m.style.display === 'flex') closeModal(m);
      });
    }
  });

  // Listen to Forminator AJAX submission success
  if (typeof jQuery !== 'undefined') {
    jQuery(document).on('forminator:form:submit:success', function(event, formData, data) {
      var modal = event.target ? event.target.closest('.sc-gated-modal-overlay') : null;
      if (!modal) {
        // Fallback: look for currently open modal
        document.querySelectorAll('.sc-gated-modal-overlay').forEach(function(m) {
          if (m.style.display === 'flex') modal = m;
        });
      }
      if (modal) {
        window.scTriggerGatedDownload(modal.id);
      }
    });
  }
})();
</script>
<?php endif; ?>
