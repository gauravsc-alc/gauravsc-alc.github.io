# EmailJS Integration - Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER PURCHASE FLOW                        │
└─────────────────────────────────────────────────────────────────┘

1. Customer selects book
   │
   ├──> books.html / book.html
   │
   └──> Clicks "Buy Now"
        │
        ▼

2. Payment Page
   │
   ├──> payment.html loads
   │
   ├──> Shows order summary
   │
   └──> Customer fills address form
        │
        ▼

3. Razorpay Payment
   │
   ├──> Customer clicks "Proceed to Pay"
   │
   ├──> Razorpay modal opens
   │
   └──> Customer completes payment
        │
        ▼

4. Payment Success Handler (js/payment.js)
   │
   ├──> handlePaymentSuccess() called
   │
   ├──> Saves order data
   │
   └──> Calls sendOrderEmail()
        │
        ▼

5. Email Sending Process
   │
   ├──> Reads window.EMAILJS_CONFIG
   │    │
   │    ├─ PUBLIC_KEY: 'abc123...'
   │    ├─ SERVICE_ID: 'service_...'
   │    └─ TEMPLATE_ID: 'template_...'
   │
   ├──> Prepares email parameters
   │    │
   │    ├─ customer_name
   │    ├─ book_title
   │    ├─ author
   │    ├─ final_price
   │    ├─ delivery_address
   │    └─ payment_id
   │
   └──> Calls emailjs.send()
        │
        ▼

6. EmailJS Processing
   │
   ├──> Validates credentials
   │
   ├──> Loads template
   │
   ├──> Populates variables
   │
   └──> Sends email via connected service
        │
        ▼

7. Email Delivered
   │
   ├──> Customer receives confirmation
   │
   └──> Email contains:
        ├─ Order details
        ├─ Payment summary
        ├─ Delivery address
        └─ Next steps
```

---

## Configuration Flow

```
┌──────────────────────────────────────────────────────────────┐
│                  EMAILJS CONFIGURATION                        │
└──────────────────────────────────────────────────────────────┘

Step 1: EmailJS Dashboard Setup
┌────────────────────────────────┐
│  https://emailjs.com           │
│                                │
│  1. Create Account             │
│  2. Add Email Service          │
│     ├─ Gmail                   │
│     ├─ Outlook                 │
│     └─ Yahoo                   │
│  3. Create Template            │
│  4. Get Credentials            │
│     ├─ Service ID              │
│     ├─ Template ID             │
│     └─ Public Key              │
└────────────────────────────────┘
         │
         │ Copy IDs
         ▼
Step 2: Update Website Code
┌────────────────────────────────┐
│  js/emailjs-config.js          │
│                                │
│  window.EMAILJS_CONFIG = {     │
│    PUBLIC_KEY: 'xxx',          │
│    SERVICE_ID: 'yyy',          │
│    TEMPLATE_ID: 'zzz'          │
│  };                            │
└────────────────────────────────┘
         │
         │ Commit & Push
         ▼
Step 3: GitHub Pages Deployment
┌────────────────────────────────┐
│  GitHub Actions                │
│  ├─ Build site                 │
│  ├─ Deploy to Pages            │
│  └─ Site live                  │
└────────────────────────────────┘
         │
         │ Site Ready
         ▼
Step 4: Test Purchase
┌────────────────────────────────┐
│  Website                       │
│  ├─ Select book                │
│  ├─ Enter address              │
│  ├─ Complete payment           │
│  └─ Email sent ✅              │
└────────────────────────────────┘
```

---

## Code Structure

```
┌──────────────────────────────────────────────────────────────┐
│                  FILE ORGANIZATION                            │
└──────────────────────────────────────────────────────────────┘

Website Root
│
├─ payment.html                   ← Payment page HTML
│
├─ js/
│  ├─ payment.js                  ← Main payment logic
│  │  ├─ handlePaymentSuccess()  ← Called when payment succeeds
│  │  └─ sendOrderEmail()        ← Sends confirmation email
│  │
│  └─ emailjs-config.js          ← 🔧 UPDATE THIS FILE
│     └─ window.EMAILJS_CONFIG   ← Your credentials go here
│
├─ email-templates/
│  └─ order_confirmation_emailjs.html  ← Email template HTML
│
└─ docs/
   ├─ EMAILJS_SETUP_GUIDE.md     ← Full setup instructions
   ├─ EMAILJS_QUICK_SETUP.md     ← Quick reference
   └─ EMAILJS_ACTION_ITEMS.md    ← This file
```

---

## Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│              EMAIL PARAMETER MAPPING                          │
└──────────────────────────────────────────────────────────────┘

JavaScript (payment.js)          EmailJS Template
─────────────────────            ────────────────

emailParams = {
  to_email: 'customer@email.com' → {{to_email}}
  customer_name: 'John Doe'      → {{customer_name}}
  book_title: 'Sample Book'      → {{book_title}}
  author: 'Jane Author'          → {{author}}
  final_price: 399               → {{final_price}}
  original_price: 499            → {{original_price}}
  discount: 20                   → {{discount}}
  savings: 100                   → {{savings}}
  payment_id: 'pay_ABC123'       → {{payment_id}}
  order_date: '02/11/2025'       → {{order_date}}
  delivery_address: '123 St...'  → {{delivery_address}}
  phone: '+91 1234567890'        → {{phone}}
}

All variables must match exactly!
```

---

## Error Handling Flow

```
┌──────────────────────────────────────────────────────────────┐
│                  ERROR TROUBLESHOOTING                        │
└──────────────────────────────────────────────────────────────┘

Payment Success
│
├─ EmailJS Check
│  │
│  ├─ Is emailjs loaded? ──NO──> Console: "EmailJS not loaded"
│  │                              (Already fixed ✅)
│  │
│  └─ YES
│     │
│     ├─ Are credentials set? ──NO──> Console: "Invalid config"
│     │                               (Update emailjs-config.js)
│     │
│     └─ YES
│        │
│        ├─ Is domain allowed? ──NO──> Error: "403 Forbidden"
│        │                             (Add to allowlist)
│        │
│        └─ YES
│           │
│           ├─ Template exists? ──NO──> Error: "Template not found"
│           │                          (Check TEMPLATE_ID)
│           │
│           └─ YES
│              │
│              └─ Email Sent ✅
│
└─ Success: Customer receives email
```

---

## Priority Checklist

```
┌──────────────────────────────────────────────────────────────┐
│                   SETUP PRIORITY ORDER                        │
└──────────────────────────────────────────────────────────────┘

Priority 1: EmailJS Account Setup
├─ [ ] Create account at emailjs.com
├─ [ ] Add email service (Gmail/Outlook/Yahoo)
├─ [ ] Create template
├─ [ ] Copy Service ID
├─ [ ] Copy Template ID
└─ [ ] Copy Public Key

Priority 2: Update Configuration
├─ [ ] Open js/emailjs-config.js
├─ [ ] Replace PUBLIC_KEY
├─ [ ] Replace SERVICE_ID
└─ [ ] Replace TEMPLATE_ID

Priority 3: Domain Allowlist
├─ [ ] Go to EmailJS Account settings
└─ [ ] Add gauravsc-alc.github.io

Priority 4: Deploy & Test
├─ [ ] Commit changes
├─ [ ] Push to GitHub
├─ [ ] Wait for deployment
├─ [ ] Test purchase
└─ [ ] Verify email received

Priority 5: Verify Content
├─ [ ] Check customer name
├─ [ ] Check book title
├─ [ ] Check pricing
├─ [ ] Check address
└─ [ ] Check formatting
```

---

## Quick Reference

**Files to Edit:**
```
js/emailjs-config.js    ← YOUR ACTION REQUIRED
```

**Current Values (Replace These):**
```javascript
PUBLIC_KEY: 'oftKysdm_C9YNFpcd'     ← ❌ OLD
SERVICE_ID: 'service_tij9azu'       ← ❌ OLD
TEMPLATE_ID: 'template_qvzl2ie'     ← ❌ OLD
```

**What You Need from EmailJS Dashboard:**
```
Your PUBLIC_KEY:   _____________________
Your SERVICE_ID:   _____________________
Your TEMPLATE_ID:  _____________________
```

---

## Time Estimate

```
┌────────────────────────────┬──────────┐
│ Task                       │ Time     │
├────────────────────────────┼──────────┤
│ Create EmailJS account     │ 2 min    │
│ Add email service          │ 2 min    │
│ Create template            │ 3 min    │
│ Copy credentials           │ 1 min    │
│ Update code                │ 2 min    │
│ Allowlist domain           │ 1 min    │
│ Commit & deploy            │ 2 min    │
│ Test purchase              │ 3 min    │
│ Verify email               │ 2 min    │
├────────────────────────────┼──────────┤
│ TOTAL                      │ 18 min   │
└────────────────────────────┴──────────┘
```

**You can complete the entire setup in under 20 minutes!**

---

## Success Indicators

✅ **Setup Successful When:**
```
1. EmailJS dashboard shows:
   ├─ Service connected (green checkmark)
   ├─ Template created
   └─ Domain allowlisted

2. Code updated:
   └─ js/emailjs-config.js has YOUR credentials

3. Test purchase:
   ├─ Payment succeeds
   ├─ Email arrives in inbox
   └─ All data displays correctly

4. Email Logs show:
   └─ Successful delivery (green status)
```

---

## Need Help?

📖 **Documentation:**
- Full Guide: `docs/EMAILJS_SETUP_GUIDE.md`
- Quick Setup: `docs/EMAILJS_QUICK_SETUP.md`
- Action Items: `docs/EMAILJS_ACTION_ITEMS.md`

🌐 **External Resources:**
- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Dashboard: https://dashboard.emailjs.com/

📧 **Support:**
- EmailJS Support: support@emailjs.com
- Delta Publications: connectkpanda@gmail.com

---

**Ready? Start with Priority 1! 🚀**
