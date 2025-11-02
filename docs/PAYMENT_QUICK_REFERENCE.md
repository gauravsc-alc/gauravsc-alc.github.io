# Payment Gateway - Quick Reference Guide

## 🚀 Quick Setup (5 Minutes)

### 1. Get Razorpay Test Key
```
1. Visit: https://dashboard.razorpay.com/signup
2. Sign up (no KYC needed for test)
3. Settings → API Keys → Generate Test Key
4. Copy: rzp_test_XXXXXXXXXXXX
```

### 2. Update Configuration
```javascript
// Edit: js/payment.js (Line 13)
const RAZORPAY_KEY_ID = 'rzp_test_XXXXXXXXXXXX'; // Paste your key here
```

### 3. Test It!
```bash
bundle exec jekyll serve
# Open: http://localhost:4000/payment.html?book=Test&price=499
```

---

## 💳 Test Cards (Copy-Paste Ready)

### ✅ Success Card
```
Card Number: 4111111111111111
CVV: 123
Expiry: 12/28
Name: Test User
```

### ❌ Failure Card
```
Card Number: 4111111111111234
CVV: 123
Expiry: 12/28
Name: Test User
```

### 📱 Test UPI
```
Success: success@razorpay
Failure: failure@razorpay
```

---

## 🔗 URL Format for Payment Page

```
/payment.html?book=BOOK_NAME&price=AMOUNT&author=AUTHOR_NAME
```

### Examples:
```
/payment.html?book=Sample%20Book&price=499
/payment.html?book=Premium%20Guide&price=999&author=John%20Doe
```

---

## 📋 Testing Checklist

- [ ] Payment modal opens
- [ ] Test card works (4111111111111111)
- [ ] Success page shows payment ID
- [ ] Failed card shows error
- [ ] Mobile view works
- [ ] Modal can be closed
- [ ] Order details display correctly

---

## 🐛 Quick Fixes

### Payment modal not opening?
```javascript
// Check console (F12)
// Ensure Razorpay script is loaded:
console.log(typeof Razorpay); // Should not be 'undefined'
```

### Key not working?
```
✓ Starts with rzp_test_ ?
✓ No extra spaces?
✓ In TEST mode on Razorpay dashboard?
```

### Amount wrong?
```javascript
// Razorpay uses paise (₹1 = 100 paise)
// ₹499 = 49900 paise
amount: 499 * 100  // Correct ✓
```

---

## 🌐 Going Live (When Ready)

1. **Complete KYC** on Razorpay (upload documents)
2. **Generate Live Key** (rzp_live_xxx)
3. **Update code** with live key
4. **Test with ₹1** first
5. **Deploy** to production

---

## 📞 Quick Support

| Issue | Contact |
|-------|---------|
| Technical | support@razorpay.com |
| Phone | 080-68727374 |
| Docs | https://razorpay.com/docs/ |
| Status | https://status.razorpay.com/ |

---

## 🎯 File Locations

```
payment.html              # Main payment page
payment-success.html      # Success page
js/payment.js            # Payment logic (UPDATE KEY HERE)
docs/PAYMENT_INTEGRATION.md  # Full documentation
docs/PAYMENT_QUICK_REFERENCE.md  # This file
```

---

## ⚡ Commands

```bash
# Start local server
bundle exec jekyll serve

# View payment page
http://localhost:4000/payment.html?book=Test&price=499

# View success page (test)
http://localhost:4000/payment-success.html?payment_id=test123&status=success
```

---

## 🔒 Security Reminders

- ✅ Never commit live keys to Git
- ✅ Use test keys for development
- ✅ HTTPS only (auto on GitHub Pages)
- ❌ Never store card details
- ❌ Never share key secret

---

## 📊 Test Scenarios

| Scenario | How to Test | Expected Result |
|----------|-------------|-----------------|
| Success | Card: 4111111111111111 | Payment success page |
| Failure | Card: 4111111111111234 | Error message shown |
| Cancel | Close modal with X | Back to payment page |
| Mobile | Open on phone/resize | Responsive design |
| UPI | Use success@razorpay | Payment success |

---

## 💰 Pricing (Razorpay)

- **Setup:** FREE
- **Test Mode:** FREE
- **Live Transactions:** 2% + GST
- **Settlement:** 2-3 days
- **No Hidden Charges**

Example: ₹499 sale = You get ₹489 (after 2% + GST)

---

## 🎓 Next Steps

1. ✅ Test payment flow completely
2. ✅ Add "Buy Now" buttons to book pages
3. ✅ Test on mobile devices
4. ✅ Complete Razorpay KYC
5. ✅ Switch to live keys
6. ✅ Monitor first real payments

---

**Quick Tip:** Keep this file handy during testing!

For detailed information, see: `docs/PAYMENT_INTEGRATION.md`
