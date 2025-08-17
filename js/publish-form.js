document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('publish-form');
  if (!form) return;

  // Read keys from centralized config
  const cfg = window.EMAILJS_CONFIG || {};
  const EMAILJS_PUBLIC_KEY = cfg.PUBLIC_KEY || 'oftKysdm_C9YNFpcd';
  const EMAILJS_SERVICE_ID = cfg.SERVICE_ID || 'service_tij9azu';
  const EMAILJS_TEMPLATE_ID = cfg.TEMPLATE_ID || 'template_qvzl2ie';

  // Check if EmailJS configuration is available
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    console.warn('Publish form: EmailJS configuration not available');
    showMessage('error', 'Publishing form is temporarily unavailable. Please email us directly.');
    return;
  }

  // Initialize EmailJS only if the SDK has loaded and public key exists
  if (window.emailjs && EMAILJS_PUBLIC_KEY) {
    try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) { /* noop */ }
  }

  const submitBtn = document.getElementById('publish-submit');
  const msgBox = document.getElementById('publish-form-msg');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearMessage();

    // Basic validation
    const name = document.getElementById('pub-name').value.trim();
    const email = document.getElementById('pub-email').value.trim();
    const message = document.getElementById('pub-message').value.trim();

    if (!name || !email || !message) {
      showMessage('error', 'Please fill required fields: name, email and message.');
      return;
    }

    // validate email format to avoid empty/invalid Reply-To (prevents Outlook 412)
    if (!isValidEmail(email)) {
      showMessage('error', 'Please enter a valid email address.');
      return;
    }

    // gather extra context from page/form
    const siteEmail = form.dataset.siteEmail || '';
    const pageTitle = form.dataset.pageTitle || document.title || 'Publish With Us';
    const pageUrl = window.location.href;

    // timestamp for template
    const time = new Date().toLocaleString();

    // Prepare data for EmailJS template (keys match your template placeholders)
    const templateParams = {
      from_name: name,
      from_email: email,
      // provide explicit reply fields so EmailJS can set Reply-To header
      reply_to: email,
      reply_to_name: name,
      phone: document.getElementById('pub-phone').value.trim(),
      interested_package: document.getElementById('pub-package').value,
      synopsis: document.getElementById('pub-synopsis').value.trim(),
      message: message,
      page_title: pageTitle,
      page_url: pageUrl,
      site_email: siteEmail,
      time: time,
      title: 'Publish With Us' // <-- added static title field for {{title}}
    };

    // UI: disable button
    const oldText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      showMessage('success', 'Enquiry sent. We will contact you soon.');
      form.reset();
    } catch (err) {
      console.error('Publish form send error:', err);
      const fallbackEmail = siteEmail ? ` You can also email us directly at ${siteEmail}.` : '';
      showMessage('error', `Unable to send enquiry right now.${fallbackEmail}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = oldText;
    }
  });

  // New helper: simple email format check
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showMessage(type, text) {
    msgBox.innerHTML = `<div class="form-message ${type}" style="padding:10px;border-radius:8px;">${text}</div>`;
    msgBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearMessage() {
    if (msgBox) {
      msgBox.innerHTML = '';
    }
  }
});
