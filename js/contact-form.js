/**
 * Contact Form Handler with EmailJS Integration
 * Secure client-side email sending without domain restrictions
 */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Read EmailJS config from centralized file
  const cfg = window.EMAILJS_CONFIG || {};
  const EMAILJS_PUBLIC_KEY = cfg.PUBLIC_KEY || '';
  const EMAILJS_SERVICE_ID = cfg.SERVICE_ID || '';
  const EMAILJS_TEMPLATE_ID = cfg.TEMPLATE_ID || '';

  // Check if EmailJS configuration is available
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    console.warn('Contact form: EmailJS configuration not available');
    showFormMessage('error', 'Contact form is temporarily unavailable. Please email us directly.');
    return;
  }

  // gather extra context from page/form
  const siteEmail = contactForm.dataset.siteEmail || '';
  const pageTitle = contactForm.dataset.pageTitle || document.title || 'Contact Us';
  const pageUrl = window.location.href;
  const time = new Date().toLocaleString();

  // Initialize EmailJS if SDK present
  if (window.emailjs && EMAILJS_PUBLIC_KEY) {
    try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) { /* noop */ }
  }

  // Form validation and submission
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';

    // Get form data
    const formData = {
      from_name: document.getElementById('contact-name').value.trim(),
      from_email: document.getElementById('contact-email').value.trim(),
      subject: document.getElementById('contact-subject').value.trim() || "Contact Form Submission",
      message: document.getElementById('contact-message').value.trim(),
      page_title: pageTitle,
      page_url: pageUrl,
      site_email: siteEmail,
      time: time,
      title: 'Contact Us'
    };

    try {
      // Send email using EmailJS (use centralized config values)
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData);

      // Show success message
      showFormMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      contactForm.reset();

    } catch (error) {
      console.error('Error sending email:', error);
      showFormMessage('error', 'Sorry, there was a problem sending your message. Please try again later or contact us directly.');
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  // Form validation
  function validateForm() {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    let isValid = true;

    // Clear previous errors
    clearFormErrors();

    // Validate name
    if (!name) {
      showFieldError('contact-name', 'Name is required');
      isValid = false;
    }

    // Validate email
    if (!email) {
      showFieldError('contact-email', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showFieldError('contact-email', 'Please enter a valid email address');
      isValid = false;
    }

    // Validate message
    if (!message) {
      showFieldError('contact-message', 'Message is required');
      isValid = false;
    } else if (message.length < 10) {
      showFieldError('contact-message', 'Message must be at least 10 characters long');
      isValid = false;
    }

    return isValid;
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show field error
  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add('invalid');

      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      field.parentNode.appendChild(errorDiv);
    }
  }

  // Clear form errors
  function clearFormErrors() {
    const errorElements = contactForm.querySelectorAll('.field-error');
    errorElements.forEach(el => el.remove());

    const invalidFields = contactForm.querySelectorAll('.invalid');
    invalidFields.forEach(field => field.classList.remove('invalid'));
  }

  // Display form message (success or error)
  function showFormMessage(type, message) {
    // Remove any existing message
    const existingMessage = document.getElementById('form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageEl = document.createElement('div');
    messageEl.id = 'form-message';
    messageEl.className = `form-message ${type}`;
    messageEl.innerHTML = `
      <div class="form-message-content">
        <span class="form-message-icon">${type === 'success' ? '✅' : '❌'}</span>
        <span class="form-message-text">${message}</span>
      </div>
    `;

    // Insert after form
    contactForm.parentNode.insertBefore(messageEl, contactForm.nextSibling);

    // Scroll to message
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove success message after delay
    if (type === 'success') {
      setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => messageEl.remove(), 500);
      }, 5000);
    }
  }

  // Real-time field validation
  const formFields = contactForm.querySelectorAll('input, textarea');
  formFields.forEach(field => {
    field.addEventListener('blur', function() {
      validateField(field);
    });

    field.addEventListener('input', function() {
      if (field.classList.contains('invalid')) {
        validateField(field);
      }
    });
  });

  function validateField(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }

    field.classList.remove('invalid', 'valid');

    if (field.required && !field.value.trim()) {
      field.classList.add('invalid');
      return false;
    }

    if (field.type === 'email' && field.value.trim()) {
      if (!isValidEmail(field.value.trim())) {
        field.classList.add('invalid');
        return false;
      }
    }

    if (field.value.trim()) {
      field.classList.add('valid');
    }

    return true;
  }
});
