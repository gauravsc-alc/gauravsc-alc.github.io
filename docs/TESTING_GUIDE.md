# 🧪 Testing Guide - Address Collection & Email Notifications

## Quick Test (5 Minutes)

### What to Test:
1. ✅ Delivery address form validation
2. ✅ Payment with address data
3. ✅ Email notification sent
4. ✅ Success page shows address

---

## Step-by-Step Testing

### 1. Start Local Server

```powershell
cd c:\Guarav_dev\Delta_Publish\gauravsc-alc.github.io
bundle exec jekyll serve
```

### 2. Open Payment Page

Visit: `http://localhost:4000/payment.html?book=Test%20Book&price=1&author=Test%20Author`

### 3. Fill Address Form

**Use YOUR REAL EMAIL to receive the confirmation!**

```
Full Name: Your Name
Phone: 9876543210
Email: your.email@gmail.com  ← Use your real email!
Address: 123, Test Street, Test Building
City: Mumbai
State: Maharashtra
PIN: 400001
Country: India (already filled)
```

### 4. Try Validation Errors

**Test these to see validation working:**

❌ **Empty name:**
- Leave name blank → Click Pay → Should show "Please enter your full name"

❌ **Invalid phone:**
- Enter: `123` → Click Pay → Should show "Please enter a valid 10-digit mobile number"

❌ **Invalid email:**
- Enter: `notanemail` → Should show "Please enter a valid email address"

❌ **Invalid PIN:**
- Enter: `123` → Should show "Please enter a valid 6-digit PIN code"

✅ **Fill correctly** and proceed!

### 5. Complete Payment

1. Click **"Pay Securely with Razorpay"**
2. Razorpay modal opens
3. Use **test card:**
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: `12/28`
   - Name: `Test User`
4. Click **Pay**

### 6. Check Success Page

After payment:
- ✅ Redirected to success page
- ✅ Shows payment ID
- ✅ Shows book details
- ✅ Shows **delivery address section**:
  ```
  📦 Delivery Details
  Name: Your Name
  Phone: 9876543210
  Email: your.email@gmail.com
  Address: 123, Test Street, Mumbai, Maharashtra - 400001, India
  ```
- ✅ Shows delivery note: "Your book will be shipped..."

### 7. Check Your Email

**Within 1-2 minutes:**

1. Open your email inbox
2. Look for email from **Delta Publications**
3. **If not in inbox, CHECK SPAM FOLDER!**

**Email should contain:**
- ✅ Book title
- ✅ Amount paid
- ✅ Payment ID
- ✅ Order date
- ✅ Full delivery address
- ✅ Your phone number

### 8. Browser Console Check

Press `F12` → Console tab:

**Should see:**
```
Payment page initialized
🧪 TEST MODE ACTIVE
Payment Successful! {payment_id: "pay_xxx..."}
✅ Email sent successfully: {status: 200, text: "OK"}
```

**Should NOT see:**
```
❌ Email failed: ...
⚠️ EmailJS not loaded
```

---

## 📧 Email Setup (If Not Working)

If email not received, follow these quick steps:

### 1. Create EmailJS Account (3 min)

1. Visit: https://www.emailjs.com/
2. Sign up (free)
3. Verify email
4. Login

### 2. Connect Gmail (2 min)

1. Dashboard → **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Connect your Gmail account
5. **Copy Service ID** (e.g., `service_abc123`)

### 3. Create Email Template (3 min)

1. Dashboard → **Email Templates**
2. Click **Create New Template**
3. Paste this template:

**Subject:**
```
Order Confirmation - {{book_title}}
```

**Body:**
```
Dear {{customer_name}},

Thank you for your purchase!

📚 ORDER DETAILS
Book: {{book_title}}
Author: {{author}}
Amount: ₹{{amount}}
Payment ID: {{payment_id}}
Date: {{order_date}}

📦 DELIVERY ADDRESS
{{delivery_address}}
Phone: {{phone}}

Your book will be shipped within 3-5 business days.

Best regards,
Delta Publications
```

4. **Copy Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key (1 min)

1. Dashboard → **Account** → **General**
2. **Copy Public Key** (e.g., `abcd1234xyz`)

### 5. Update Code (1 min)

Open: `js/payment.js` (around line 398)

Replace:
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';      // ← Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789';    // ← Your Template ID
const EMAILJS_PUBLIC_KEY = 'abcd1234xyz';         // ← Your Public Key
```

Save file.

### 6. Test Again!

Refresh payment page and complete another test payment.

---

## 🔍 Troubleshooting

### Email Not Received

**Check 1: Is EmailJS configured?**
```javascript
// In js/payment.js, check these are not default values:
EMAILJS_SERVICE_ID !== 'service_xxxxxxx'
EMAILJS_TEMPLATE_ID !== 'template_xxxxxxx'
EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
```

**Check 2: Spam folder**
- Gmail users: Check **Spam** and **Promotions** tabs

**Check 3: Browser console**
- Press F12 → Console
- Look for email errors

**Check 4: EmailJS Dashboard**
- Login to EmailJS
- Email History → See delivery status

### Address Not Showing on Success Page

**Check browser console:**
```javascript
// Should see in localStorage:
localStorage.getItem('lastPayment')
// Should contain: delivery_address: {...}
```

**If null:** Payment didn't complete or page refreshed too soon

### Validation Not Working

**Check form IDs match:**
```html
<!-- In payment.html -->
<input id="customer-name" ...>
<input id="customer-phone" ...>
<input id="customer-email" ...>
...
```

**Check JavaScript:**
```javascript
// In payment.js, around line 175
document.getElementById('customer-name')
document.getElementById('customer-phone')
...
```

---

## 🎯 What Success Looks Like

### ✅ Perfect Test Result:

1. ✅ Form validation catches errors
2. ✅ All required fields filled correctly
3. ✅ Razorpay modal opens
4. ✅ Test payment succeeds
5. ✅ Redirected to success page
6. ✅ Success page shows:
   - Payment ID
   - Book details
   - Delivery address section
7. ✅ Email received within 2 minutes
8. ✅ Email contains all details:
   - Book info
   - Payment ID
   - Full delivery address
9. ✅ No errors in browser console

---

## 📱 Mobile Testing

### Test on Mobile:

1. Find your local IP:
   ```powershell
   ipconfig
   # Look for IPv4 Address: 192.168.x.x
   ```

2. On mobile browser, visit:
   ```
   http://192.168.x.x:4000/payment.html?book=Test&price=1
   ```

3. Check:
   - ✅ Form layout responsive
   - ✅ Form fields easy to tap
   - ✅ Razorpay modal works
   - ✅ Success page readable

---

## 🎓 Test Scenarios

### Scenario 1: Invalid Phone Numbers

Try these and ensure validation catches them:
- `123` → Too short
- `abcdefghij` → Not numbers
- `12345678901` → Too long (11 digits)
- `9876543210` → ✅ Valid

### Scenario 2: Invalid PIN Codes

Try these:
- `123` → Too short
- `1234567` → Too long
- `abcdef` → Not numbers
- `400001` → ✅ Valid

### Scenario 3: Invalid Emails

Try these:
- `notemail` → No @
- `test@` → No domain
- `test@domain` → No TLD
- `test@domain.com` → ✅ Valid

### Scenario 4: Empty Fields

Leave each field empty one by one:
- Each should show specific validation message
- Focus should move to the empty field

---

## 📊 Test Checklist

Before going live, test all these:

### Payment Flow:
- [ ] Payment page loads correctly
- [ ] Order summary shows book details
- [ ] Address form displays properly
- [ ] All validation rules work

### Address Validation:
- [ ] Name: min 3 characters
- [ ] Phone: exactly 10 digits
- [ ] Email: valid format
- [ ] Address: min 10 characters
- [ ] City: min 2 characters
- [ ] State: min 2 characters
- [ ] PIN: exactly 6 digits

### Payment Processing:
- [ ] Razorpay modal opens
- [ ] Test card works
- [ ] Success page loads
- [ ] Payment ID displayed

### Address Display:
- [ ] Success page shows delivery section
- [ ] Name displayed correctly
- [ ] Phone displayed correctly
- [ ] Email displayed correctly
- [ ] Full address displayed correctly

### Email Notification:
- [ ] Email received within 2 minutes
- [ ] Subject line correct
- [ ] Book details correct
- [ ] Payment info correct
- [ ] Delivery address complete
- [ ] Email formatting good
- [ ] No broken links

### Mobile:
- [ ] Form responsive on mobile
- [ ] All fields accessible
- [ ] Razorpay works on mobile
- [ ] Success page readable

---

## 🚀 Quick Commands

```powershell
# Start server
bundle exec jekyll serve

# Test URL
http://localhost:4000/payment.html?book=Sample%20Book&price=499

# Check console
# Press F12 in browser

# View localStorage
localStorage.getItem('lastPayment')

# Clear localStorage (for fresh test)
localStorage.clear()
```

---

## 💡 Pro Tips

### Tip 1: Use Different Email Each Test
Add `+test1`, `+test2` to your Gmail:
- `yourname+test1@gmail.com`
- `yourname+test2@gmail.com`
- All go to same inbox but tracked separately!

### Tip 2: Save Test Data
Create test data file for quick copying:
```
Name: Test User
Phone: 9876543210
Email: test@example.com
Address: 123 Test Street, Building A
City: Mumbai
State: Maharashtra
PIN: 400001
```

### Tip 3: Test Failed Payments Too
Use fail card: `4111111111111234`
- Should show error message
- Should NOT send email
- Should NOT redirect to success

---

## 📞 Need Help?

If tests fail:
1. Check `docs/EMAIL_SETUP_GUIDE.md` - detailed email setup
2. Check browser console (F12) for errors
3. Verify EmailJS credentials
4. Check spam folder
5. Try different browser

---

**Status:** ✅ Ready to test!

**Expected Time:** 5-10 minutes for full test

**Required:** Real email address to receive confirmation

---

Good luck with testing! 🎉
