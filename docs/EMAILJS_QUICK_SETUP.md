# EmailJS Quick Setup Checklist

## ⚡ Quick Reference - 5 Minute Setup

### 1️⃣ Get Your EmailJS Credentials

Login to https://dashboard.emailjs.com/ and copy these:

```
Service ID:   _________________
Template ID:  _________________
Public Key:   _________________
```

### 2️⃣ Update Code (Choose ONE method)

#### Method A: Update emailjs-config.js (Recommended)
File: `js/emailjs-config.js`

```javascript
window.EMAILJS_CONFIG = {
  PUBLIC_KEY: 'PASTE_YOUR_PUBLIC_KEY',
  SERVICE_ID: 'PASTE_YOUR_SERVICE_ID',
  TEMPLATE_ID: 'PASTE_YOUR_TEMPLATE_ID'
};
```

#### Method B: Update payment.js directly
File: `js/payment.js` (lines 424-426)

```javascript
const EMAILJS_SERVICE_ID = cfg.SERVICE_ID || 'PASTE_YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = cfg.TEMPLATE_ID || 'PASTE_YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = cfg.PUBLIC_KEY || 'PASTE_YOUR_PUBLIC_KEY';
```

### 3️⃣ Create Template in EmailJS Dashboard

**Template Name:** Order Confirmation - Delta Publications

**Subject Line:**
```
Order Confirmation: {{book_title}} - Delta Publications
```

**Required Variables:**
- `to_email` (set as "To Email" in settings)
- `customer_name`
- `book_title`
- `author`
- `final_price`
- `original_price`
- `discount`
- `savings`
- `payment_id`
- `order_date`
- `delivery_address`
- `phone`
- `email`
- `reply_to`

**Template HTML:** Copy from `EMAILJS_SETUP_GUIDE.md` or use the visual editor in EmailJS dashboard.

### 4️⃣ Verify Domain Allowlist

In EmailJS dashboard → Account → General:

Add these domains:
- ✅ `gauravsc-alc.github.io`
- ✅ `localhost` (for local testing)

### 5️⃣ Test

1. Push changes to GitHub
2. Wait for deployment
3. Make a test purchase
4. Check your email!

---

## 🔍 Current Status

**Files to Update:**
- [ ] `js/emailjs-config.js` - Update with your credentials
- [x] `js/payment.js` - Already configured, uses centralized config
- [x] Email template HTML - Available in setup guide

**Current Fallback Values (Replace These!):**
```javascript
PUBLIC_KEY: 'oftKysdm_C9YNFpcd'     // ❌ Replace with YOUR key
SERVICE_ID: 'service_tij9azu'       // ❌ Replace with YOUR service ID
TEMPLATE_ID: 'template_qvzl2ie'     // ❌ Replace with YOUR template ID
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] EmailJS service is connected (green checkmark in dashboard)
- [ ] Template is created with all variables
- [ ] Domain is allowlisted
- [ ] Code is updated with your credentials
- [ ] Changes are committed and pushed to GitHub
- [ ] Site has been redeployed
- [ ] Test purchase sends email successfully
- [ ] Email content displays correctly
- [ ] All variables populate with real data
- [ ] Email arrives in inbox (not spam)

---

## 🐛 Quick Debug

**Email not sending?**

1. Open browser console (F12)
2. Look for errors with "EmailJS" or "email"
3. Check these common issues:

```javascript
// Issue: "EmailJS is not defined"
// Fix: Add EmailJS CDN to your HTML
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Issue: "403 Forbidden"
// Fix: Add your domain to EmailJS allowlist

// Issue: "Template not found"
// Fix: Double-check TEMPLATE_ID matches dashboard

// Issue: Variables showing as {{variable_name}}
// Fix: Variable names in template must match JavaScript exactly
```

---

## 📞 Need Help?

1. Full setup guide: `docs/EMAILJS_SETUP_GUIDE.md`
2. EmailJS docs: https://www.emailjs.com/docs/
3. EmailJS support: support@emailjs.com

---

**Last Updated:** November 2, 2025
