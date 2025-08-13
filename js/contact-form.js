/**
 * Contact Form Handler for Microsoft Outlook Email
 * Uses Microsoft Graph API with secure client-side authentication
 */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Form validation and submission
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';

    // Get form data
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value || "Contact Form Submission";
    const message = document.getElementById('contact-message').value;

    try {
      // Method 1: Email.js - simplest solution that works without server setup
      // Requires EmailJS account (free tier available)
      await sendWithEmailJS(name, email, subject, message);

      // Show success message
      showFormMessage('success', 'Thank you! Your message has been sent successfully.');
      contactForm.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      showFormMessage('error', 'Sorry, there was a problem sending your message. Please try again later.');
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  // Email.js implementation - requires EmailJS account setup
  async function sendWithEmailJS(name, email, subject, message) {
    // Replace with your EmailJS service ID, template ID, and user ID
    // You can sign up for free at https://www.emailjs.com/
    const serviceID = 'YOUR_SERVICE_ID';  // Get this from EmailJS dashboard
    const templateID = 'YOUR_TEMPLATE_ID';  // Get this from EmailJS dashboard
    const userID = 'YOUR_USER_ID';  // Get this from EmailJS dashboard

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    };

    // Use EmailJS to send the email
    return emailjs.send(serviceID, templateID, templateParams, userID);
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
    messageEl.textContent = message;

    // Insert after form
    contactForm.parentNode.insertBefore(messageEl, contactForm.nextSibling);

    // Scroll to message
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove message after delay if it's a success message
    if (type === 'success') {
      setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => messageEl.remove(), 500);
      }, 5000);
    }
  }

  // Form field validation
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
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    // Check if field is required and empty
    if (field.required && !field.value.trim()) {
      showFieldError(field, 'This field is required');
      return false;
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }

    // Field is valid
    field.classList.remove('invalid');
    field.classList.add('valid');
    return true;
  }

  function showFieldError(field, message) {
    field.classList.remove('valid');
    field.classList.add('invalid');

    const errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    field.parentNode.appendChild(errorEl);
  }
});
