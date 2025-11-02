# Email Notifications Setup Guide
## Delta Publications - Payment & Order Confirmation Emails

**Version:** 1.0
**Last Updated:** November 2, 2025

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Method 1: EmailJS (Recommended - Easy)](#method-1-emailjs-recommended)
3. [Method 2: Razorpay Email Notifications](#method-2-razorpay-email-notifications)
4. [Method 3: Webhook + Backend Server](#method-3-webhook-backend-server)
5. [Testing Email Notifications](#testing-email-notifications)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

When a customer completes a payment, you want to:
1. ✅ Send order confirmation to customer
2. ✅ Send order notification to you (admin)
3. ✅ Include book details, payment info, and delivery address

### Three Methods Available:

| Method | Difficulty | Cost | Best For |
|--------|-----------|------|----------|
| **EmailJS** | ⭐ Easy | FREE (200/month) | Quick setup, static sites |
| **Razorpay Emails** | ⭐⭐ Medium | FREE | Basic notifications |
| **Webhook + Backend** | ⭐⭐⭐⭐ Hard | Depends | Full control, custom logic |

---

## 📧 Method 1: EmailJS (Recommended)

### What is EmailJS?

EmailJS allows you to send emails directly from JavaScript without a backend server. Perfect for static sites like yours!

### Step 1: Create EmailJS Account

1. Visit: https://www.emailjs.com/
2. Click **Sign Up** (free account)
3. Verify your email
4. Login to dashboard

### Step 2: Connect Your Email Service

1. In dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook**
   - **Yahoo**
   - Or any SMTP service

#### For Gmail:

1. Select **Gmail**
2. Click **Connect Account**
3. Login with your Gmail
4. Allow EmailJS permissions
5. Give service a name: "Delta Publications Orders"
6. Click **Create Service**
7. **Copy the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates** in dashboard
2. Click **Create New Template**
3. Template Name: "Order Confirmation"
4. Set up the template:

```html
Subject: Order Confirmation - {{book_title}} - Delta Publications

From Name: Delta Publications
Reply To: {{to_email}}

Email Body:
---
Dear {{customer_name}},

Thank you for your purchase! Your order has been confirmed.

📚 ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Book: {{book_title}}
Author: {{author}}
Amount Paid: ₹{{amount}}
Payment ID: {{payment_id}}
Order Date: {{order_date}}

📦 DELIVERY ADDRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{delivery_address}}
Phone: {{phone}}

Your book will be shipped within 3-5 business days.
You will receive a tracking number once shipped.

Thank you for choosing Delta Publications!

Best regards,
Delta Publications Team

---
Questions? Reply to this email or contact us at support@deltapublications.com
```

4. Click **Save**
5. **Copy the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find **Public Key** section
3. **Copy the Public Key** (e.g., `YOUR_PUBLIC_KEY_HERE`)

### Step 5: Update Your Code

Open `js/payment.js` and find the `sendOrderEmail` function (around line 395):

```javascript
// Replace these three values:
const EMAILJS_SERVICE_ID = 'service_abc123';     // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789';   // Your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE'; // Your Public Key
```

### Step 6: Test It!

1. Start your local server:
   ```powershell
   bundle exec jekyll serve
   ```

2. Go to: `http://localhost:4000/payment.html?book=Test&price=499`

3. Fill in the delivery address form with **your real email**

4. Click "Pay Securely with Razorpay"

5. Use test card: `4111111111111111`

6. Complete payment

7. **Check your email inbox!** (check spam folder too)

### EmailJS Free Limits

- **200 emails/month** (FREE)
- Upgrade for more: $10/month = 1,000 emails
- Perfect for getting started!

---

## 📮 Method 2: Razorpay Email Notifications

Razorpay can send basic email notifications to customers and you.

### Step 1: Enable Customer Emails

1. Login to Razorpay Dashboard: https://dashboard.razorpay.com/
2. Go to **Settings** → **Email Notifications**
3. Enable these:
   - ✅ **Payment Success** (to customer)
   - ✅ **Payment Captured** (to you)
   - ✅ **Refund Processed** (to customer)

### Step 2: Customize Email Content

1. Click **Customize Email Templates**
2. Edit **Payment Success** template
3. Add your branding:
   - Logo URL
   - Brand colors
   - Custom message
4. Save changes

### What Razorpay Emails Include:

✅ Payment amount
✅ Payment ID
✅ Transaction date
✅ Customer contact (if provided)
❌ **NO delivery address** (Razorpay doesn't have this)
❌ **NO book details** (generic payment email)

### Limitations:

- Generic templates
- Limited customization
- Doesn't include order-specific details
- Delivery address NOT included

**Recommendation:** Use EmailJS for customer emails + Razorpay for admin notifications

---

## 🔗 Method 3: Webhook + Backend Server

For advanced users who want full control.

### What are Webhooks?

Webhooks notify your server when a payment succeeds, allowing you to:
- Verify payment authenticity
- Store order in database
- Send custom emails
- Update inventory
- Trigger shipping

### Step 1: Setup Webhook Endpoint

You need a server endpoint (not available on GitHub Pages static site).

**Options:**
1. **Netlify Functions** (serverless)
2. **Vercel API Routes** (serverless)
3. **AWS Lambda** (serverless)
4. **Your own Node.js/Python server**

### Step 2: Configure Razorpay Webhook

1. Razorpay Dashboard → **Settings** → **Webhooks**
2. Click **+ Add New Webhook**
3. Enter webhook URL: `https://yourdomain.com/api/razorpay-webhook`
4. Select events:
   - ✅ `payment.authorized`
   - ✅ `payment.captured`
   - ✅ `payment.failed`
5. **Copy the Webhook Secret**
6. Click **Create**

### Step 3: Implement Webhook Handler

**Example (Node.js):**

```javascript
const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

app.post('/api/razorpay-webhook', (req, res) => {
  const webhookSecret = 'YOUR_WEBHOOK_SECRET';
  const signature = req.headers['x-razorpay-signature'];

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).send('Invalid signature');
  }

  // Process payment event
  const event = req.body.event;
  const payment = req.body.payload.payment.entity;

  if (event === 'payment.captured') {
    // Send order confirmation email
    sendOrderEmail(payment);

    // Store in database
    saveOrderToDatabase(payment);
  }

  res.json({ status: 'ok' });
});
```

### Step 4: Send Email from Server

```javascript
const nodemailer = require('nodemailer');

async function sendOrderEmail(payment) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password' // Generate in Gmail settings
    }
  });

  const mailOptions = {
    from: 'Delta Publications <orders@deltapublications.com>',
    to: payment.email,
    subject: `Order Confirmation - ${payment.notes.book_title}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Book: ${payment.notes.book_title}</p>
      <p>Amount: ₹${payment.amount / 100}</p>
      <p>Payment ID: ${payment.id}</p>
      <p>Delivery to: ${payment.notes.delivery_address}</p>
    `
  };

  await transporter.sendMail(mailOptions);
}
```

### Pros & Cons:

**Pros:**
- ✅ Full control over email content
- ✅ Payment verification on server
- ✅ Can store orders in database
- ✅ Unlimited emails

**Cons:**
- ❌ Requires backend server
- ❌ More complex setup
- ❌ Hosting costs
- ❌ Maintenance required

---

## 🧪 Testing Email Notifications

### Test EmailJS:

1. **Use Test Mode:**
   - Your Razorpay test key: `rzp_test_Rak0LTinuDdfTh`
   - EmailJS works with test payments

2. **Steps:**
   ```powershell
   bundle exec jekyll serve
   ```
   - Visit: `http://localhost:4000/payment.html?book=Test&price=1`
   - Fill address with **your real email**
   - Pay with test card: `4111111111111111`
   - Check inbox (and spam!)

3. **What to Check:**
   - ✅ Email received within 1 minute
   - ✅ All details correct (book, amount, address)
   - ✅ No errors in browser console (F12)

### Test Razorpay Emails:

1. **Test Mode Behavior:**
   - Razorpay sends test emails in test mode
   - Look for subject: `[TEST MODE] Payment Successful`

2. **To Your Email:**
   - Dashboard → Settings → Email Notifications
   - Add your email in "Send notifications to"

3. **To Customer:**
   - Emails sent to the email you provide during checkout

### EmailJS Debug Tips:

```javascript
// Check if EmailJS loaded
console.log('EmailJS:', typeof emailjs !== 'undefined' ? 'Loaded' : 'Not loaded');

// Check for errors in sendOrderEmail function
emailjs.send(...)
  .then(response => {
    console.log('✅ Email sent:', response);
  })
  .catch(error => {
    console.error('❌ Email failed:', error);
  });
```

---

## 🐛 Troubleshooting

### Issue 1: Emails Not Received

**Possible Causes:**
1. ❌ Wrong EmailJS credentials
2. ❌ Email in spam folder
3. ❌ EmailJS service not connected
4. ❌ Monthly limit exceeded

**Solutions:**
1. ✅ Double-check Service ID, Template ID, Public Key
2. ✅ Check spam/junk folder
3. ✅ Verify Gmail account connected in EmailJS dashboard
4. ✅ Check usage: EmailJS Dashboard → Account → Usage

### Issue 2: EmailJS "Unauthorized" Error

**Cause:** Wrong Public Key or Service ID

**Solution:**
1. Go to EmailJS Dashboard
2. Account → General → Copy Public Key
3. Email Services → Copy Service ID
4. Update `payment.js` with correct values

### Issue 3: Email Sent But Missing Details

**Cause:** Template variable mismatch

**Solution:**
1. Check template variables match exactly:
   - Template: `{{book_title}}`
   - Code: `book_title: 'Book Name'`
2. Variables are case-sensitive!

### Issue 4: Browser Console Shows CORS Error

**Cause:** EmailJS script not loaded or blocked

**Solution:**
1. Check `payment.html` has:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
2. Script must load BEFORE `payment.js`
3. Check browser console for load errors

### Issue 5: Razorpay Emails Not Sending

**Cause:** Email notifications not enabled

**Solution:**
1. Dashboard → Settings → Email Notifications
2. Enable all relevant notifications
3. Save changes
4. Test with new payment

---

## 📊 Email Delivery Status

### Check EmailJS Delivery:

1. EmailJS Dashboard → **Email History**
2. See all sent emails with:
   - ✅ Sent successfully
   - ❌ Failed with reason
   - 🕐 Pending delivery

### Check Razorpay Emails:

1. Dashboard → **Payments**
2. Click on specific payment
3. Scroll to **Email Activity**
4. See delivery status

---

## 🎯 Recommended Setup

For your book store, use **both methods**:

### 1. EmailJS (Primary - for customers):
- ✅ Send detailed order confirmation
- ✅ Include book details
- ✅ Include delivery address
- ✅ Custom branding

### 2. Razorpay Notifications (Secondary - for you):
- ✅ Admin notification when payment received
- ✅ Quick payment alerts to your email
- ✅ Backup in case EmailJS fails

### Setup in 10 Minutes:

```
Step 1: Create EmailJS account (3 min)
Step 2: Connect Gmail service (2 min)
Step 3: Create email template (3 min)
Step 4: Update payment.js (1 min)
Step 5: Test it! (1 min)
```

---

## 🔒 Security Best Practices

### EmailJS:
1. ✅ Never expose Service Secret (only use Public Key in frontend)
2. ✅ Set up domain whitelist in EmailJS dashboard
3. ✅ Enable reCAPTCHA if needed
4. ✅ Monitor monthly usage

### Razorpay Webhooks:
1. ✅ Always verify webhook signature
2. ✅ Never expose Webhook Secret in frontend
3. ✅ Use HTTPS endpoint only
4. ✅ Validate payment status on server

---

## 💡 Pro Tips

### Tip 1: Create Admin Email Template

Create second EmailJS template for **you** (admin):

Subject: `New Order Received - {{book_title}}`

Body:
```
NEW ORDER ALERT!

Customer: {{customer_name}}
Book: {{book_title}}
Amount: ₹{{amount}}
Payment ID: {{payment_id}}

Delivery Address:
{{delivery_address}}
Phone: {{phone}}

Action Required:
1. Verify payment in Razorpay dashboard
2. Prepare book for shipment
3. Send tracking number to customer
```

Then send TWO emails in `sendOrderEmail()`:
```javascript
// Email to customer
emailjs.send(SERVICE_ID, 'template_customer', customerParams, PUBLIC_KEY);

// Email to you (admin)
emailjs.send(SERVICE_ID, 'template_admin', adminParams, PUBLIC_KEY);
```

### Tip 2: Add Email Copy to User

In `payment.html`, add checkbox:
```html
<input type="checkbox" id="send-copy" checked>
<label>Send order confirmation to my email</label>
```

Only send email if checked!

### Tip 3: Test Email Template Preview

EmailJS has **Test Template** button:
1. Email Templates → Your Template
2. Click **Test It**
3. Enter sample data
4. Preview how email looks
5. Send test email to yourself

---

## 📞 Getting Help

### EmailJS Support:
- Docs: https://www.emailjs.com/docs/
- Support: support@emailjs.com
- FAQ: https://www.emailjs.com/docs/faq/

### Razorpay Support:
- Docs: https://razorpay.com/docs/
- Email: support@razorpay.com
- Phone: 080-68727374

---

## ✅ Quick Checklist

Before going live:

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created and tested
- [ ] Service ID, Template ID, Public Key updated in code
- [ ] Test email sent successfully
- [ ] Customer receives order confirmation
- [ ] You receive admin notification
- [ ] Razorpay email notifications enabled
- [ ] All details (book, address, payment) appear correctly
- [ ] Spam folder checked
- [ ] Email template looks good on mobile
- [ ] Monthly limit sufficient (200 free)

---

## 📝 Summary

**Easiest Method:** EmailJS (recommended for you)
- Free, quick setup, no backend needed
- Perfect for static GitHub Pages site
- 200 emails/month free

**Configure in 3 lines:**
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

**Test in 1 minute:**
1. Fill address form with your email
2. Pay with test card
3. Check your inbox!

---

**Last Updated:** November 2, 2025
**Maintained By:** Delta Publications Development Team

---

Need help? Contact support or refer to the troubleshooting section above! 📧
