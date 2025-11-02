# EmailJS Order Confirmation Template (Customer)

Use this guide to configure your EmailJS template so emails are sent after successful Razorpay payments.

## Variables sent from the site

These template variables are provided by `js/payment.js`:

- customer_name
- email (buyer email)
- phone
- book_title
- author
- original_price
- discount
- savings
- final_price
- amount (same as final_price; kept for compatibility)
- pricing_details (multiline)
- payment_id
- order_date
- delivery_address

## Recommended Subject

```
Order Confirmed – {{book_title}} (Payment {{payment_id}})
```

## HTML Body (copy/paste)

See `email-templates/order_confirmation_emailjs.html` in this repo.
Paste its content into the EmailJS template editor (Content Type = HTML).
Inline styles are used intentionally for email client compatibility.

## Plain Text Body (optional)

```
Hi {{customer_name}},

Thank you for your order!

Book: {{book_title}}
Author: {{author}}
Original Price: ₹{{original_price}}
Discount: {{discount}}% OFF
You Saved: ₹{{savings}}
Final Price: ₹{{final_price}}
Payment ID: {{payment_id}}
Order Date: {{order_date}}

Delivery Address:
{{delivery_address}}

Customer Details:
Name: {{customer_name}}
Email: {{email}}
Phone: {{phone}}

Pricing Details (raw):
{{pricing_details}}

We will ship your order to the address above. If you have questions, just reply to this email.

— Delta Publications
```

## EmailJS Dashboard setup checklist

1. Connect an email service (e.g., Gmail) in EmailJS dashboard (Account → Email Services).
2. Create a template and paste the HTML above; set the subject shown above.
3. Template variables in the body should match the list under "Variables sent from the site".
4. Set Reply-To to `{{email}}` (or `{{reply_to}}`) in template settings.
5. Add your site domain to EmailJS Authorized Origins: Dashboard → Account → Domains.
6. Ensure IDs/keys match:
   - Service ID = your dashboard value
   - Template ID = your dashboard value
   - Public Key = your dashboard value
7. Verify the EmailJS SDK loads on the payment page (open DevTools Console):
   - Should see no `EmailJS not loaded` warnings.
8. Check Email History in EmailJS dashboard after a test payment.

## Troubleshooting

- Unauthorized domain: whitelist your domain in EmailJS (Authorized Origins)
- 404/SDK not loaded: ensure the EmailJS script is present on `payment.html`
- Wrong IDs: verify Service/Template/Public Key match exactly
- Template missing variables: confirm variable names match (case-sensitive)
- Rate limits: EmailJS Free allows 200 emails/month
