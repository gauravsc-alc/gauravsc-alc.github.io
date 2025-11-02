# EmailJS Setup Guide for Payment Confirmation Emails

This guide will walk you through setting up EmailJS to send payment confirmation emails from your Delta Publications website.

---

## 📋 Prerequisites

1. EmailJS account (sign up at https://www.emailjs.com/)
2. Access to your website's codebase
3. Email account for sending (Gmail, Outlook, etc.)

---

## 🚀 Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click **"Sign Up"**
3. Create your account (free tier allows 200 emails/month)
4. Verify your email address

---

### Step 2: Add Email Service

1. Log in to your EmailJS dashboard
2. Click **"Email Services"** in the left sidebar
3. Click **"Add New Service"**
4. Select your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook/Office 365**
   - **Yahoo**
   - Or use custom SMTP
5. Follow the connection wizard
6. **IMPORTANT**: Copy your **Service ID** (e.g., `service_abc1234`)
   - You'll need this for the code

---

### Step 3: Create Email Template

1. In EmailJS dashboard, click **"Email Templates"**
2. Click **"Create New Template"**
3. **Template Name**: `Order Confirmation - Delta Publications`
4. Copy and paste this template content:

#### Template Subject:
```
Order Confirmation: {{book_title}} - Delta Publications
```

#### Template Content (HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 30px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎉 Order Confirmed!</h1>
                            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">Thank you for your purchase</p>
                        </td>
                    </tr>

                    <!-- Customer Info -->
                    <tr>
                        <td style="padding: 30px 20px;">
                            <p style="font-size: 16px; color: #333; margin: 0 0 10px 0;">
                                Dear <strong>{{customer_name}}</strong>,
                            </p>
                            <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0;">
                                Your order has been successfully confirmed! We're excited to deliver your book to you.
                            </p>
                        </td>
                    </tr>

                    <!-- Order Details -->
                    <tr>
                        <td style="padding: 0 20px 20px 20px;">
                            <table width="100%" cellpadding="10" style="background-color: #f8f9fa; border-radius: 6px;">
                                <tr>
                                    <td colspan="2" style="border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">
                                        <h2 style="color: #6366f1; margin: 0; font-size: 18px;">📚 Order Details</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #666; font-size: 14px; width: 35%;">Book Title:</td>
                                    <td style="color: #333; font-size: 14px; font-weight: bold;">{{book_title}}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666; font-size: 14px;">Author:</td>
                                    <td style="color: #333; font-size: 14px;">{{author}}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666; font-size: 14px;">Order Date:</td>
                                    <td style="color: #333; font-size: 14px;">{{order_date}}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666; font-size: 14px;">Payment ID:</td>
                                    <td style="color: #333; font-size: 14px; font-family: monospace;">{{payment_id}}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Pricing Details -->
                    <tr>
                        <td style="padding: 0 20px 20px 20px;">
                            <table width="100%" cellpadding="10" style="background-color: #f0fdf4; border-radius: 6px; border: 1px solid #86efac;">
                                <tr>
                                    <td colspan="2" style="border-bottom: 2px solid #86efac; padding-bottom: 10px;">
                                        <h2 style="color: #16a34a; margin: 0; font-size: 18px;">💰 Payment Summary</h2>
                                    </td>
                                </tr>
                                {{#if discount}}
                                <tr>
                                    <td style="color: #666; font-size: 14px;">Original Price:</td>
                                    <td style="color: #999; font-size: 14px; text-decoration: line-through; text-align: right;">₹{{original_price}}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666; font-size: 14px;">Discount ({{discount}}%):</td>
                                    <td style="color: #dc2626; font-size: 14px; font-weight: bold; text-align: right;">-₹{{savings}}</td>
                                </tr>
                                {{/if}}
                                <tr style="border-top: 2px solid #86efac;">
                                    <td style="color: #16a34a; font-size: 16px; font-weight: bold; padding-top: 10px;">Total Paid:</td>
                                    <td style="color: #16a34a; font-size: 18px; font-weight: bold; text-align: right; padding-top: 10px;">₹{{final_price}}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Delivery Address -->
                    <tr>
                        <td style="padding: 0 20px 20px 20px;">
                            <table width="100%" cellpadding="10" style="background-color: #fef3c7; border-radius: 6px; border: 1px solid #fbbf24;">
                                <tr>
                                    <td>
                                        <h2 style="color: #b45309; margin: 0 0 10px 0; font-size: 18px;">📦 Delivery Address</h2>
                                        <p style="color: #78350f; font-size: 14px; line-height: 1.6; margin: 0;">
                                            {{delivery_address}}
                                        </p>
                                        <p style="color: #78350f; font-size: 14px; margin: 10px 0 0 0;">
                                            📞 Contact: {{phone}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Next Steps -->
                    <tr>
                        <td style="padding: 0 20px 30px 20px;">
                            <table width="100%" cellpadding="15" style="background-color: #eff6ff; border-radius: 6px;">
                                <tr>
                                    <td>
                                        <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">📌 What Happens Next?</h3>
                                        <ul style="color: #1e3a8a; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                            <li>Your order is being processed</li>
                                            <li>You'll receive a shipping confirmation within 2-3 business days</li>
                                            <li>Expected delivery: 5-7 business days</li>
                                            <li>Track your order using Payment ID: <strong>{{payment_id}}</strong></li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Support -->
                    <tr>
                        <td style="padding: 0 20px 30px 20px; text-align: center;">
                            <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">
                                Need help? Contact us at:
                            </p>
                            <p style="margin: 0;">
                                <a href="mailto:connectkpanda@gmail.com" style="color: #6366f1; text-decoration: none; font-weight: bold;">connectkpanda@gmail.com</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="color: #6366f1; font-size: 18px; font-weight: bold; margin: 0 0 5px 0;">Delta Publications</p>
                            <p style="color: #666; font-size: 12px; margin: 0;">
                                India's Leading Publishing House
                            </p>
                            <p style="color: #999; font-size: 11px; margin: 10px 0 0 0;">
                                © 2025 Delta Publications. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

5. **Variable Settings** - Make sure these variables are configured in EmailJS:
   - `to_email` - Recipient's email (set as "To email" in template settings)
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

6. Click **"Save"**
7. **IMPORTANT**: Copy your **Template ID** (e.g., `template_xyz5678`)

---

### Step 4: Get Your Public Key

1. In EmailJS dashboard, click **"Account"** (top right)
2. Go to **"General"** tab
3. Find your **Public Key** (e.g., `xyz123ABC_456DEF`)
4. Copy this key

---

### Step 5: Update Your Website Code

Now update the configuration in your code with the IDs you copied:

#### Option A: Update `js/emailjs-config.js` (Recommended)

Open `js/emailjs-config.js` and replace the values:

```javascript
window.EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',      // From Step 4
  SERVICE_ID: 'YOUR_SERVICE_ID_HERE',      // From Step 2
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE'     // From Step 3
};
```

**Example:**
```javascript
window.EMAILJS_CONFIG = {
  PUBLIC_KEY: 'xyz123ABC_456DEF',
  SERVICE_ID: 'service_abc1234',
  TEMPLATE_ID: 'template_xyz5678'
};
```

#### Option B: Update in payment.js directly

If you prefer, you can also update the fallback values in `js/payment.js` around line 424-426:

```javascript
const EMAILJS_SERVICE_ID = cfg.SERVICE_ID || 'YOUR_SERVICE_ID_HERE';
const EMAILJS_TEMPLATE_ID = cfg.TEMPLATE_ID || 'YOUR_TEMPLATE_ID_HERE';
const EMAILJS_PUBLIC_KEY = cfg.PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE';
```

---

### Step 6: Test the Integration

1. **Commit and push** your changes to GitHub
2. Wait for the site to rebuild (check GitHub Actions)
3. Go to your website
4. Try to purchase a book with a test payment
5. Check if you receive the confirmation email

#### Test Checklist:
- ✅ Email arrives in inbox
- ✅ All book details are correct
- ✅ Price and discount show correctly
- ✅ Delivery address is complete
- ✅ Payment ID is present
- ✅ Email formatting looks good on mobile and desktop

---

## 🔧 Troubleshooting

### Emails Not Sending?

1. **Check EmailJS Dashboard**
   - Go to "Auto-Reply Settings"
   - Verify email service is connected (green checkmark)
   - Check "Email Logs" for any errors

2. **Check Browser Console**
   - Open DevTools (F12)
   - Look for EmailJS errors
   - Verify the PUBLIC_KEY, SERVICE_ID, and TEMPLATE_ID match your dashboard

3. **Verify Domain Allowlist**
   - In EmailJS dashboard, go to Account → General
   - Add your domain to the allowlist:
     - `gauravsc-alc.github.io`
     - `localhost` (for testing)

4. **Test Variables**
   - In EmailJS dashboard, use "Test It" button on your template
   - Manually enter test values for all variables
   - Check if email arrives

### Common Issues:

| Problem | Solution |
|---------|----------|
| "EmailJS not loaded" error | Add `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>` to your HTML |
| Email arrives but with {{variable_name}} | Variable names in template don't match the ones sent from JavaScript |
| 403 Forbidden error | Domain not allowlisted in EmailJS account settings |
| Template not found error | Wrong TEMPLATE_ID - double-check in dashboard |

---

## 🔐 Security Best Practices

1. **Keep your Private Key private!** (Never commit it to GitHub)
2. Use environment variables for sensitive data in production
3. Consider using EmailJS's domain restrictions
4. Monitor your email quota (free tier: 200/month)
5. Set up email rate limiting if needed

---

## 📊 Monitoring

To monitor email delivery:

1. Go to EmailJS dashboard
2. Click "Email Logs"
3. See all sent emails, success rate, and errors
4. Filter by date, template, or status

---

## 🎯 Next Steps

After setup is complete:

1. ✅ Test with real payment flow
2. ✅ Customize email template colors/branding
3. ✅ Add company logo to email header
4. ✅ Set up order tracking system (optional)
5. ✅ Configure backup email service for redundancy

---

## 📞 Support

If you need help:

- **EmailJS Docs**: https://www.emailjs.com/docs/
- **EmailJS Support**: support@emailjs.com
- **Delta Publications**: connectkpanda@gmail.com

---

## ✅ Setup Complete!

Once you've completed all steps, your payment confirmation emails will be automatically sent to customers after successful payment.

**Current Configuration:**
- Service ID: `[YOUR_SERVICE_ID]`
- Template ID: `[YOUR_TEMPLATE_ID]`
- Public Key: `[YOUR_PUBLIC_KEY]`

Remember to update these values in `js/emailjs-config.js`!
