# Payment Gateway Integration Documentation
## Delta Publications - Razorpay Integration

**Version:** 1.0
**Last Updated:** November 1, 2025
**Author:** Development Team

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Payment Gateway Options](#payment-gateway-options)
3. [Razorpay Setup Guide](#razorpay-setup-guide)
4. [Installation Steps](#installation-steps)
5. [Configuration](#configuration)
6. [Testing](#testing)
7. [Going Live](#going-live)
8. [Security Best Practices](#security-best-practices)
9. [Troubleshooting](#troubleshooting)
10. [API Reference](#api-reference)

---

## 🎯 Overview

This documentation covers the complete payment gateway integration for Delta Publications website, enabling secure online book purchases through Razorpay payment gateway.

### Features Implemented

- ✅ Secure payment processing
- ✅ Multiple payment methods (Cards, UPI, Net Banking, Wallets)
- ✅ Test mode for development
- ✅ Payment success/failure handling
- ✅ Order management
- ✅ Invoice generation
- ✅ Mobile responsive design
- ✅ Error handling and logging

### Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Payment Gateway:** Razorpay
- **Framework:** Jekyll (Static Site Generator)
- **Hosting:** GitHub Pages

---

## 💳 Payment Gateway Options

### Recommended Gateways for India

#### 1. **Razorpay** ⭐ (Currently Implemented)

**Pros:**
- ✅ Free test environment
- ✅ Easy integration
- ✅ Excellent documentation
- ✅ Support for all payment methods
- ✅ No setup fees
- ✅ Transaction fees: 2% + GST

**Cons:**
- ❌ Requires KYC for live mode
- ❌ Settlement takes 2-3 days

**Best For:** Small to medium businesses

#### 2. **Cashfree**

**Pros:**
- ✅ Competitive pricing (1.75% + GST)
- ✅ Instant settlements available
- ✅ Good API documentation

**Cons:**
- ❌ Slightly complex setup
- ❌ Customer support response time

#### 3. **Instamojo**

**Pros:**
- ✅ Easiest to setup
- ✅ No technical knowledge required
- ✅ Payment links feature

**Cons:**
- ❌ Higher transaction fees (2% + GST + ₹3)
- ❌ Limited customization

#### 4. **PayU**

**Pros:**
- ✅ Enterprise-grade features
- ✅ Extensive payment methods

**Cons:**
- ❌ Complex integration
- ❌ Higher setup requirements

---

## 🚀 Razorpay Setup Guide

### Step 1: Create Razorpay Account

1. Visit: https://dashboard.razorpay.com/signup
2. Enter your details:
   - Email address
   - Password
   - Business name
3. Verify email
4. Complete phone verification

### Step 2: Access Dashboard

1. Login to Razorpay Dashboard
2. You'll land on the home screen
3. By default, you're in **TEST MODE** (perfect for development)

### Step 3: Get API Keys

#### For Testing (Development):

1. Go to **Settings** (⚙️ icon) → **API Keys**
2. Ensure **Test Mode** toggle is ON (top right)
3. Click **Generate Test Key**
4. You'll receive:
   ```
   Key ID: rzp_test_XXXXXXXXXXXX
   Key Secret: XXXXXXXXXXXXXXXXXXXXXXXX
   ```
5. **Copy both keys** - you'll need them

#### For Production (Live):

1. Complete KYC verification:
   - Business documents (PAN, GST if applicable)
   - Bank account details
   - Business address proof
2. Wait for approval (usually 24-48 hours)
3. Switch to **Live Mode**
4. Generate **Live Keys** (similar to test keys)

### Step 4: Understand Test Mode vs Live Mode

| Feature | Test Mode | Live Mode |
|---------|-----------|-----------|
| API Keys | `rzp_test_*` | `rzp_live_*` |
| Real Money | ❌ No | ✅ Yes |
| KYC Required | ❌ No | ✅ Yes |
| Test Cards | ✅ Works | ❌ Won't work |
| Settlement | ❌ No | ✅ Yes (2-3 days) |

---

## 📦 Installation Steps

### Files Created

```
gauravsc-alc.github.io/
├── payment.html                 # Payment checkout page
├── payment-success.html         # Success confirmation page
├── js/
│   └── payment.js              # Payment processing logic
└── docs/
    └── PAYMENT_INTEGRATION.md  # This documentation
```

### Step-by-Step Installation

#### 1. Add Payment Files

All three main files have been created:
- `payment.html` - Main payment page
- `payment-success.html` - Success page
- `js/payment.js` - Payment logic

#### 2. Update Configuration

Edit `js/payment.js` and update:

```javascript
// Line 13: Replace with your actual Razorpay Key
const RAZORPAY_KEY_ID = 'rzp_test_XXXXXXXXXXXX'; // Your key here

// Lines 17-22: Update company details
const COMPANY_CONFIG = {
  name: 'Delta Publications',
  description: 'Book Purchase',
  logo: '/images/logo.png',      // Update with actual logo path
  theme_color: '#6366f1',
  currency: 'INR'
};
```

#### 3. Add Payment Button to Book Pages

In your book detail pages (e.g., `_layouts/book.html`), add:

```html
<a href="/payment.html?book={{ page.title | url_encode }}&price={{ page.price }}&author={{ page.author | url_encode }}"
   class="buy-button">
  Buy Now - ₹{{ page.price }}
</a>
```

#### 4. Test Local Setup

```bash
# Start Jekyll server
bundle exec jekyll serve

# Open in browser
http://localhost:4000/payment.html?book=Sample%20Book&price=499
```

---

## ⚙️ Configuration

### Environment Variables (Recommended)

For security, store API keys in environment variables:

**Create `.env` file:** (Add to `.gitignore`)

```env
# Razorpay Configuration
RAZORPAY_TEST_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_TEST_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
RAZORPAY_LIVE_KEY_ID=rzp_live_XXXXXXXXXXXX
RAZORPAY_LIVE_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX

# Environment
PAYMENT_ENV=test  # Change to 'live' for production
```

**Update `.gitignore`:**

```gitignore
# Environment variables
.env
.env.local
.env.production

# Sensitive files
**/config/secrets.js
**/config/keys.js
```

### Payment Configuration Options

In `js/payment.js`, you can customize:

```javascript
// Customize payment options
const options = {
  key: RAZORPAY_KEY_ID,
  amount: order.price * 100,        // Amount in paise
  currency: 'INR',

  // Customize checkout appearance
  theme: {
    color: '#6366f1',               // Your brand color
    backdrop_color: '#000000'       // Modal backdrop
  },

  // Pre-fill customer details (if available)
  prefill: {
    name: 'Customer Name',
    email: 'customer@example.com',
    contact: '9999999999'
  },

  // Customize modal behavior
  modal: {
    ondismiss: function() {
      // Handle modal close
    },
    escape: false,                  // Prevent ESC key close
    backdropclose: false            // Prevent backdrop click close
  },

  // Additional metadata
  notes: {
    book_id: order.bookId,
    book_title: order.bookTitle,
    custom_field: 'value'
  }
};
```

---

## 🧪 Testing

### Test Mode Setup

1. Ensure `RAZORPAY_KEY_ID` starts with `rzp_test_`
2. Use test payment methods (provided below)
3. No real money is charged

### Test Payment Methods

#### Test Cards (Success)

| Card Number | Type | Behavior |
|-------------|------|----------|
| 4111 1111 1111 1111 | Visa | Success |
| 5555 5555 5555 4444 | Mastercard | Success |
| 3782 822463 10005 | Amex | Success |

**For all cards:**
- CVV: Any 3 digits (e.g., 123)
- Expiry: Any future date (e.g., 12/28)
- Name: Any name

#### Test Cards (Failure)

| Card Number | Behavior |
|-------------|----------|
| 4111 1111 1111 1234 | Payment fails |
| 5555 5555 5555 1234 | Insufficient funds |

#### Test UPI

- **Success:** `success@razorpay`
- **Failure:** `failure@razorpay`

#### Test Net Banking

1. Select any bank from the list
2. Use provided test credentials
3. All banks work in test mode

#### Test Wallets

All wallets work in test mode without real money.

### Testing Checklist

- [ ] Test successful payment flow
- [ ] Test failed payment flow
- [ ] Test modal close (user cancellation)
- [ ] Test different payment methods
- [ ] Test mobile responsiveness
- [ ] Test with different browsers
- [ ] Verify payment success page displays correctly
- [ ] Check console for errors
- [ ] Test order details display correctly
- [ ] Verify invoice download works

### Testing Commands

```bash
# Start local server
bundle exec jekyll serve

# Test with different book prices
http://localhost:4000/payment.html?book=Test%20Book&price=499
http://localhost:4000/payment.html?book=Premium%20Book&price=999
http://localhost:4000/payment.html?book=Cheap%20Book&price=99

# Test success page directly
http://localhost:4000/payment-success.html?payment_id=pay_test123&status=success
```

---

## 🌐 Going Live

### Pre-Launch Checklist

#### 1. Complete KYC on Razorpay

**Required Documents:**
- [ ] PAN Card (Mandatory)
- [ ] GST Certificate (if turnover > ₹20 lakhs)
- [ ] Business Registration Certificate
- [ ] Bank Account Proof (Cancelled cheque/Bank statement)
- [ ] Address Proof (Electricity bill/Rent agreement)
- [ ] Website URL

**Submit Documents:**
1. Login to Razorpay Dashboard
2. Go to **Account & Settings** → **Account Details**
3. Click **Complete KYC**
4. Upload required documents
5. Wait for approval (24-48 hours usually)

#### 2. Generate Live API Keys

1. After KYC approval
2. Switch to **Live Mode** (toggle in dashboard)
3. Generate **Live API Keys**
4. Securely store keys

#### 3. Update Configuration

```javascript
// js/payment.js - Line 13
const RAZORPAY_KEY_ID = 'rzp_live_XXXXXXXXXXXX'; // Live key
```

#### 4. Test on Staging

Before going live:
- [ ] Test with small real payment (₹1)
- [ ] Verify webhook delivery (if implemented)
- [ ] Check payment confirmation emails
- [ ] Test refund process
- [ ] Verify settlement to bank account

#### 5. Deploy to Production

```bash
# Commit changes
git add .
git commit -m "Add payment gateway integration"
git push origin main

# GitHub Pages will auto-deploy
```

#### 6. Monitor First Transactions

- Watch Razorpay dashboard for first payments
- Check for any errors in browser console
- Verify customer receives confirmation
- Monitor settlement to bank account

### Live Mode Best Practices

1. **Always use HTTPS** - GitHub Pages provides this automatically
2. **Never commit live keys** to Git
3. **Set up webhooks** for payment notifications
4. **Enable email notifications** in Razorpay
5. **Monitor transaction logs** regularly
6. **Test refund process** before going live

---

## 🔒 Security Best Practices

### 1. API Key Security

**❌ DON'T:**
```javascript
// Never hardcode keys directly
const KEY = 'rzp_live_ActualKeyHere123';
```

**✅ DO:**
```javascript
// Use environment variables
const KEY = process.env.RAZORPAY_KEY_ID;
```

### 2. Never Expose Key Secret

- Key ID (public): ✅ Can be in frontend code
- Key Secret (private): ❌ NEVER in frontend code
- Key Secret is only for server-side operations

### 3. Implement Payment Verification

**Add server-side verification:**

```javascript
// Server-side (Node.js example)
const crypto = require('crypto');

function verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
  const text = razorpay_order_id + "|" + razorpay_payment_id;
  const generated_signature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(text)
    .digest('hex');

  return generated_signature === razorpay_signature;
}
```

### 4. HTTPS Only

- Never use payment gateway on HTTP
- GitHub Pages provides HTTPS automatically
- Verify SSL certificate is valid

### 5. Input Validation

```javascript
// Validate order details
function validateOrder(order) {
  if (!order.price || order.price <= 0) {
    throw new Error('Invalid price');
  }
  if (order.price > 100000) {
    throw new Error('Price exceeds limit');
  }
  // Add more validations
}
```

### 6. PCI Compliance

- Never store card details
- Never log sensitive payment info
- Use Razorpay's hosted checkout (already implemented)

### 7. Monitor for Fraud

- Set up alerts for unusual transactions
- Monitor multiple failed attempts
- Check for unusual order patterns

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. "Razorpay is not defined" Error

**Problem:** Razorpay SDK not loaded

**Solution:**
```html
<!-- Ensure this is in payment.html BEFORE payment.js -->
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script src="/js/payment.js"></script>
```

#### 2. "Invalid Key ID" Error

**Problem:** Wrong API key or not updated

**Solutions:**
- Verify key starts with `rzp_test_` or `rzp_live_`
- Check for extra spaces or characters
- Ensure key is from correct environment (test/live)
- Regenerate key if needed

#### 3. Payment Modal Not Opening

**Problem:** JavaScript error or button not connected

**Solution:**
```javascript
// Check console for errors
console.log('Razorpay loaded:', typeof Razorpay !== 'undefined');
console.log('Button found:', document.getElementById('rzp-button') !== null);
```

#### 4. Success Page Not Showing Payment Details

**Problem:** localStorage not saved or cleared

**Solution:**
```javascript
// Check if data exists
const data = localStorage.getItem('lastPayment');
console.log('Payment data:', data);
```

#### 5. Test Cards Not Working

**Problem:** Not in test mode or wrong card number

**Solution:**
- Verify using `rzp_test_` key
- Use exact card number: `4111111111111111` (no spaces)
- Try different payment method (UPI: `success@razorpay`)

#### 6. Amount Showing Incorrectly

**Problem:** Razorpay expects amount in paise

**Solution:**
```javascript
// Always multiply by 100
const amount = 499; // ₹499
const razorpayAmount = amount * 100; // 49900 paise
```

#### 7. Mobile Display Issues

**Problem:** CSS not responsive

**Solution:**
```html
<!-- Ensure viewport meta tag in layout -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Debug Mode

Enable detailed logging:

```javascript
// Add to payment.js for debugging
const DEBUG = true;

function debugLog(...args) {
  if (DEBUG) {
    console.log('[Payment Debug]', ...args);
  }
}

// Use throughout code
debugLog('Order details:', order);
debugLog('Razorpay initialized');
```

### Getting Help

1. **Razorpay Support:**
   - Email: support@razorpay.com
   - Dashboard: Live chat available
   - Docs: https://razorpay.com/docs/

2. **Check Browser Console:**
   - Press F12
   - Go to Console tab
   - Look for errors

3. **Test in Different Browsers:**
   - Chrome (recommended)
   - Firefox
   - Safari
   - Edge

---

## 📚 API Reference

### Payment Flow

```
User clicks "Pay Now"
    ↓
initializePayment() called
    ↓
Razorpay modal opens
    ↓
User completes payment
    ↓
handlePaymentSuccess() or handlePaymentFailure()
    ↓
Redirect to success/failure page
```

### Key Functions

#### `getOrderDetails()`

Retrieves order information from URL parameters or localStorage.

**Returns:**
```javascript
{
  bookTitle: string,
  author: string,
  price: number,
  bookId: string,
  currency: string
}
```

**Usage:**
```javascript
const order = getOrderDetails();
```

---

#### `initializePayment()`

Initializes Razorpay checkout modal.

**Parameters:** None (uses getOrderDetails internally)

**Usage:**
```javascript
document.getElementById('rzp-button').addEventListener('click', initializePayment);
```

---

#### `handlePaymentSuccess(response, orderDetails)`

Called when payment succeeds.

**Parameters:**
- `response` (object): Razorpay payment response
  - `razorpay_payment_id` (string)
  - `razorpay_order_id` (string)
  - `razorpay_signature` (string)
- `orderDetails` (object): Order information

**Usage:**
```javascript
// Automatically called by Razorpay
// Can be customized for additional logic
```

---

#### `handlePaymentFailure(response)`

Called when payment fails.

**Parameters:**
- `response` (object): Razorpay error response
  - `error.code` (string)
  - `error.description` (string)
  - `error.reason` (string)

---

### Razorpay Options

Complete options object:

```javascript
const options = {
  // Required
  key: 'rzp_test_xxx',              // API Key ID
  amount: 49900,                     // Amount in paise
  currency: 'INR',                   // Currency code

  // Company Info
  name: 'Delta Publications',
  description: 'Book Purchase',
  image: '/images/logo.png',

  // Order (optional, for verification)
  order_id: 'order_xxx',             // From backend

  // Customer Info (prefill)
  prefill: {
    name: 'John Doe',
    email: 'john@example.com',
    contact: '9999999999'
  },

  // Customization
  theme: {
    color: '#6366f1',
    backdrop_color: '#000000'
  },

  // Metadata
  notes: {
    book_id: 'book_123',
    custom_data: 'value'
  },

  // Callbacks
  handler: function(response) {
    // Success handler
  },
  modal: {
    ondismiss: function() {
      // Modal closed
    },
    escape: true,                   // Allow ESC to close
    backdropclose: true             // Allow backdrop click
  }
};
```

---

## 🔄 Webhooks (Advanced)

For server-side payment verification:

### Setup Webhook

1. Go to Razorpay Dashboard → **Settings** → **Webhooks**
2. Add webhook URL: `https://yourdomain.com/webhook/razorpay`
3. Select events:
   - payment.authorized
   - payment.captured
   - payment.failed
4. Copy webhook secret

### Handle Webhook (Backend)

```javascript
// Example: Node.js/Express
app.post('/webhook/razorpay', (req, res) => {
  const webhookSecret = 'YOUR_WEBHOOK_SECRET';
  const signature = req.headers['x-razorpay-signature'];

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature === expectedSignature) {
    const event = req.body.event;
    const payment = req.body.payload.payment.entity;

    switch(event) {
      case 'payment.captured':
        // Payment successful
        // Update database, send email, etc.
        break;
      case 'payment.failed':
        // Payment failed
        break;
    }

    res.json({ status: 'ok' });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
});
```

---

## 📊 Analytics & Reporting

### Track Payment Events

```javascript
// Add to payment.js
function trackPaymentEvent(event, data) {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', event, data);
  }

  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', event, data);
  }
}

// Usage
trackPaymentEvent('begin_checkout', {
  value: order.price,
  currency: 'INR',
  items: [{
    item_name: order.bookTitle,
    price: order.price
  }]
});
```

### Monitor in Razorpay Dashboard

1. **Payments:** All transactions
2. **Refunds:** Refund requests
3. **Settlements:** Bank deposits
4. **Analytics:** Success rate, trends
5. **Reports:** Download CSV/Excel

---

## 📖 Additional Resources

### Documentation Links

- **Razorpay Docs:** https://razorpay.com/docs/
- **Checkout.js API:** https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-card-details/
- **Webhooks:** https://razorpay.com/docs/webhooks/

### Video Tutorials

- Razorpay YouTube Channel: https://www.youtube.com/c/Razorpay
- Integration tutorial: Search "Razorpay JavaScript integration"

### Support Contacts

- **Email:** support@razorpay.com
- **Phone:** 080-68727374 (10 AM - 7 PM IST)
- **Twitter:** @Razorpay
- **Dashboard:** Live chat (Mon-Sat, 10 AM - 7 PM)

---

## 📝 Changelog

### Version 1.0 (November 1, 2025)
- ✅ Initial payment integration
- ✅ Razorpay checkout implementation
- ✅ Success/failure page handling
- ✅ Order management system
- ✅ Mobile responsive design
- ✅ Test mode configuration
- ✅ Comprehensive documentation

### Planned Features
- [ ] Webhook integration
- [ ] Backend verification
- [ ] Email notifications
- [ ] Downloadable invoices (PDF)
- [ ] Order history page
- [ ] Multiple currency support
- [ ] Subscription payments
- [ ] Discount codes

---

## 🎓 Quick Start Summary

1. **Sign up on Razorpay** → Get test keys
2. **Update `js/payment.js`** → Add your test key
3. **Test locally** → Use test cards
4. **Complete KYC** → For live mode
5. **Update to live key** → Deploy
6. **Monitor dashboard** → Track payments

---

## 📞 Need Help?

If you encounter any issues:

1. Check **Troubleshooting** section above
2. Review browser console for errors
3. Test in different browser
4. Contact Razorpay support
5. Check Razorpay status page: https://status.razorpay.com/

---

**Last Updated:** November 1, 2025
**Maintained By:** Delta Publications Development Team
**License:** Private - For Internal Use Only
