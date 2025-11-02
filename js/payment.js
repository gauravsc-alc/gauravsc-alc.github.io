/**
 * Payment Integration with Razorpay
 * Delta Publications - Book Purchase System
 *
 * IMPORTANT: Replace RAZORPAY_KEY_ID with your actual test/live key
 */

// ============================================
// CONFIGURATION
// ============================================

// STEP 1: Replace this with your Razorpay Key ID
// Test Mode: rzp_test_xxxxxxxxxx
// Live Mode: rzp_live_xxxxxxxxxx
const RAZORPAY_KEY_ID = 'rzp_test_Rak0LTinuDdfTh'; // TODO: Replace with your actual key
// Aliases for compatibility (as requested)
const RAZORPAY_ID = RAZORPAY_KEY_ID; // alias
const RAZORPAY_Id = RAZORPAY_KEY_ID; // alias (case as requested)

// Company Details
const COMPANY_CONFIG = {
  name: 'Delta Publications',
  description: 'Book Purchase',
  logo: '/images/logo.png', // Update with actual logo path
  theme_color: '#6366f1',
  currency: 'INR'
};

// ============================================
// ORDER MANAGEMENT
// ============================================

/**
 * Get order details from URL parameters or localStorage
 * Expected URL format: payment.html?book=Book+Title&price=499&author=Author+Name
 */
function getOrderDetails() {
  const params = new URLSearchParams(window.location.search);

  // Try URL parameters first
  const bookTitle = params.get('book') || params.get('title');
  const price = params.get('price');
  const originalPrice = params.get('original_price');
  const discount = params.get('discount');
  const author = params.get('author');
  const bookId = params.get('id');

  // If URL params exist, use them
  if (bookTitle && price) {
    return {
      bookTitle: decodeURIComponent(bookTitle),
      author: author ? decodeURIComponent(author) : 'Delta Publications',
      price: parseInt(price),
      originalPrice: originalPrice ? parseInt(originalPrice) : parseInt(price),
      discount: discount ? parseInt(discount) : 0,
      bookId: bookId || generateBookId(bookTitle),
      currency: 'INR'
    };
  }

  // Fallback to localStorage
  const savedOrder = localStorage.getItem('pendingOrder');
  if (savedOrder) {
    try {
      return JSON.parse(savedOrder);
    } catch (e) {
      console.error('Error parsing saved order:', e);
    }
  }

  // Default fallback
  return {
    bookTitle: 'Sample Book',
    author: 'Delta Publications',
    price: 499,
    bookId: 'sample-001',
    currency: 'INR'
  };
}

/**
 * Generate a unique book ID from title
 */
function generateBookId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .substring(0, 20) + '-' + Date.now().toString(36);
}

/**
 * Save order to localStorage for persistence
 */
function saveOrder(orderDetails) {
  localStorage.setItem('pendingOrder', JSON.stringify(orderDetails));
}

/**
 * Clear saved order after completion
 */
function clearOrder() {
  localStorage.removeItem('pendingOrder');
}

// ============================================
// UI UPDATES
// ============================================

/**
 * Display order summary on the page
 */
function displayOrderSummary() {
  const order = getOrderDetails();
  const detailsDiv = document.getElementById('order-details');

  if (!detailsDiv) {
    console.error('Order details container not found');
    return;
  }

  let priceHTML = '';
  if (order.discount > 0) {
    const savings = order.originalPrice - order.price;
    priceHTML = `
      <div class="order-item">
        <span><strong>Original Price:</strong></span>
        <span style="text-decoration: line-through; color: #888;">₹${order.originalPrice}</span>
      </div>
      <div class="order-item">
        <span><strong>Discount:</strong></span>
        <span style="color: #28a745; font-weight: bold;">${order.discount}% OFF (You save ₹${savings})</span>
      </div>
      <div class="order-item">
        <span><strong>Final Price:</strong></span>
        <span style="font-size: 1.2rem; color: #d9534f; font-weight: bold;">₹${order.price}</span>
      </div>
    `;
  } else {
    priceHTML = `
      <div class="order-item">
        <span><strong>Price:</strong></span>
        <span>₹${order.price}</span>
      </div>
    `;
  }

  detailsDiv.innerHTML = `
    <div class="order-item">
      <span><strong>Book:</strong></span>
      <span>${order.bookTitle}</span>
    </div>
    <div class="order-item">
      <span><strong>Author:</strong></span>
      <span>${order.author}</span>
    </div>
    ${priceHTML}
    <div class="order-item" style="border-top: 2px solid #ddd; padding-top: 10px; margin-top: 10px;">
      <span><strong>Total Amount:</strong></span>
      <span style="font-size: 1.3rem; font-weight: bold;">₹${order.price}</span>
    </div>
  `;

  // Save order for later reference
  saveOrder(order);
}

/**
 * Update button state
 */
function setButtonLoading(isLoading) {
  const button = document.getElementById('rzp-button');
  if (button) {
    button.disabled = isLoading;
    button.innerHTML = isLoading
      ? '<span>Processing...</span>'
      : '<span class="button-icon">🔒</span> Pay Securely with Razorpay';
  }
}

/**
 * Get and validate delivery address from form
 */
function getDeliveryAddress() {
  const form = document.getElementById('address-form');
  if (!form) {
    console.error('Address form not found');
    return null;
  }

  const formData = new FormData(form);
  const address = {
    name: formData.get('name')?.trim() || '',
    phone: formData.get('phone')?.trim() || '',
    email: formData.get('email')?.trim() || '',
    address: formData.get('address')?.trim() || '',
    city: formData.get('city')?.trim() || '',
    state: formData.get('state')?.trim() || '',
    pincode: formData.get('pincode')?.trim() || '',
    country: formData.get('country')?.trim() || 'India'
  };

  return address;
}

/**
 * Validate delivery address
 */
function validateAddress(address) {
  if (!address.name || address.name.length < 3) {
    alert('⚠️ Please enter your full name (minimum 3 characters)');
    document.getElementById('customer-name')?.focus();
    return false;
  }

  if (!address.phone || !/^[0-9]{10}$/.test(address.phone)) {
    alert('⚠️ Please enter a valid 10-digit mobile number');
    document.getElementById('customer-phone')?.focus();
    return false;
  }

  if (!address.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
    alert('⚠️ Please enter a valid email address');
    document.getElementById('customer-email')?.focus();
    return false;
  }

  if (!address.address || address.address.length < 10) {
    alert('⚠️ Please enter a complete street address (minimum 10 characters)');
    document.getElementById('customer-address')?.focus();
    return false;
  }

  if (!address.city || address.city.length < 2) {
    alert('⚠️ Please enter your city name');
    document.getElementById('customer-city')?.focus();
    return false;
  }

  if (!address.state || address.state.length < 2) {
    alert('⚠️ Please enter your state name');
    document.getElementById('customer-state')?.focus();
    return false;
  }

  if (!address.pincode || !/^[0-9]{6}$/.test(address.pincode)) {
    alert('⚠️ Please enter a valid 6-digit PIN code');
    document.getElementById('customer-pincode')?.focus();
    return false;
  }

  return true;
}

// ============================================
// RAZORPAY INTEGRATION
// ============================================

/**
 * Initialize Razorpay payment
 */
function initializePayment() {
  // Validate Razorpay key
  if (RAZORPAY_KEY_ID === 'rzp_test_xxxxxxxxxx') {
    alert('⚠️ Payment configuration error!\n\nPlease update RAZORPAY_KEY_ID in payment.js with your actual Razorpay key.\n\nGet your key from: https://dashboard.razorpay.com/');
    return;
  }

  // Check if Razorpay SDK is loaded
  if (typeof Razorpay === 'undefined') {
    alert('Payment system is loading. Please try again in a moment.');
    console.error('Razorpay SDK not loaded');
    return;
  }

  // Get and validate delivery address
  const address = getDeliveryAddress();
  if (!address || !validateAddress(address)) {
    return; // Stop if address validation fails
  }

  const order = getOrderDetails();
  setButtonLoading(true);

  // Razorpay options
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: order.price * 100, // Amount in paise (₹499 = 49900 paise)
    currency: order.currency,
    name: COMPANY_CONFIG.name,
    description: order.bookTitle,
    image: COMPANY_CONFIG.logo,

    // Order ID (optional, for server-side verification)
    // order_id: 'order_xxxxx', // Generate this from your backend

    // Customer details prefill (from address form)
    prefill: {
      name: address.name,
      email: address.email,
      contact: address.phone
    },

    // Checkout customization
    theme: {
      color: COMPANY_CONFIG.theme_color
    },

    // Additional notes (include delivery address and discount info)
    notes: {
      book_id: order.bookId,
      book_title: order.bookTitle,
      purchase_type: 'physical_book',
      original_price: order.originalPrice || order.price,
      discount_percent: order.discount || 0,
      final_price: order.price,
      savings: (order.originalPrice || order.price) - order.price,
      delivery_name: address.name,
      delivery_phone: address.phone,
      delivery_address: address.address,
      delivery_city: address.city,
      delivery_state: address.state,
      delivery_pincode: address.pincode,
      delivery_country: address.country
    },

    // Payment Success Handler
    handler: function(response) {
      handlePaymentSuccess(response, order, address);
    },

    // Modal settings
    modal: {
      ondismiss: function() {
        console.log('Payment modal closed by user');
        setButtonLoading(false);
      },
      // Prevent closing modal by clicking outside
      escape: false,
      backdropclose: false
    }
  };

  try {
    const rzp = new Razorpay(options);

    // Error handler
    rzp.on('payment.failed', function(response) {
      handlePaymentFailure(response);
      setButtonLoading(false);
    });

    // Open Razorpay checkout modal
    rzp.open();
    setButtonLoading(false);

  } catch (error) {
    console.error('Error initializing Razorpay:', error);
    alert('Payment initialization failed. Please try again.');
    setButtonLoading(false);
  }
}

// ============================================
// PAYMENT HANDLERS
// ============================================

/**
 * Handle successful payment
 */
function handlePaymentSuccess(response, orderDetails, deliveryAddress) {
  console.log('Payment Successful!', response);

  // Payment response contains:
  // - razorpay_payment_id
  // - razorpay_order_id (if order was created)
  // - razorpay_signature (if order was created)

  // Store payment details with delivery address
  const paymentData = {
    payment_id: response.razorpay_payment_id,
    order_id: response.razorpay_order_id || 'N/A',
    signature: response.razorpay_signature || 'N/A',
    book_title: orderDetails.bookTitle,
    author: orderDetails.author,
    amount: orderDetails.price,
     original_price: orderDetails.originalPrice || orderDetails.price,
     discount: orderDetails.discount || 0,
     timestamp: new Date().toISOString(),
     delivery_address: deliveryAddress
  };

  // Save to localStorage for success page
  localStorage.setItem('lastPayment', JSON.stringify(paymentData));

  // Clear pending order
  clearOrder();

  // Send email notification
  sendOrderEmail(paymentData);

  // TODO: Send payment details to your server for verification
  // Example:
  // fetch('/api/verify-payment', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(paymentData)
  // });

  // Redirect to success page
  const params = new URLSearchParams({
    payment_id: response.razorpay_payment_id,
    status: 'success'
  });

  window.location.href = `/payment-success.html?${params.toString()}`;
}

/**
 * Send order confirmation email using EmailJS
 */
function sendOrderEmail(paymentData) {
  // Prefer centralized EmailJS config injected by layout or CI; fallback to known IDs
  const cfg = (typeof window !== 'undefined' && window.EMAILJS_CONFIG) ? window.EMAILJS_CONFIG : {};
  const EMAILJS_SERVICE_ID = cfg.SERVICE_ID || 'service_tij9azu';
  const EMAILJS_TEMPLATE_ID = cfg.TEMPLATE_ID || 'template_qvzl2ie';
  const EMAILJS_PUBLIC_KEY = cfg.PUBLIC_KEY || 'oftKysdm_C9YNFpcd';

  // Check if EmailJS is loaded
  if (typeof emailjs === 'undefined') {
    console.warn('EmailJS not loaded. Email notification skipped.');
    return;
  }

  const addr = paymentData.delivery_address;
  const fullAddress = `${addr.address}, ${addr.city}, ${addr.state} - ${addr.pincode}, ${addr.country}`;

  // Prepare pricing details
  const originalPrice = paymentData.original_price || paymentData.amount;
  const discount = paymentData.discount || 0;
  const finalPrice = paymentData.amount;
  const savings = originalPrice - finalPrice;

  let pricingDetails = '';
  if (discount > 0) {
    pricingDetails = `
Original Price: ₹${originalPrice}
Discount: ${discount}% OFF
You Saved: ₹${savings}
Final Price: ₹${finalPrice}`;
  } else {
    pricingDetails = `Amount: ₹${finalPrice}`;
  }

  const emailParams = {
    to_email: addr.email,
    reply_to: addr.email,
    email: addr.email,
    customer_name: addr.name,
    book_title: paymentData.book_title,
    author: paymentData.author,
    amount: paymentData.amount,
    final_price: finalPrice,
    original_price: originalPrice,
    discount: discount,
    savings: savings,
    pricing_details: pricingDetails,
    payment_id: paymentData.payment_id,
    order_date: new Date(paymentData.timestamp).toLocaleString('en-IN'),
    delivery_address: fullAddress,
    phone: addr.phone
  };

  // Initialize EmailJS just in case this is the first call on this page
  try { if (EMAILJS_PUBLIC_KEY && window.emailjs && emailjs.init) { emailjs.init(EMAILJS_PUBLIC_KEY); } } catch (e) { /* noop */ }

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_KEY)
    .then(function(response) {
      console.log('✅ Email sent successfully:', response);
    })
    .catch(function(error) {
      console.error('❌ Email send failed:', error);
    });
}

/**
 * Handle failed payment
 */
function handlePaymentFailure(response) {
  console.error('Payment Failed:', response);

  const error = response.error || {};
  const errorMessage = error.description || error.reason || 'Payment failed. Please try again.';

  // Log error details
  console.error('Error Details:', {
    code: error.code,
    description: error.description,
    source: error.source,
    step: error.step,
    reason: error.reason,
    metadata: error.metadata
  });

  // Show user-friendly error message
  alert(`❌ Payment Failed\n\n${errorMessage}\n\nPlease try again or contact support if the issue persists.`);

  // Optional: Send error to analytics
  // trackPaymentError(error);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Validate order details
 */
function validateOrder(order) {
  if (!order.bookTitle || order.bookTitle.trim() === '') {
    throw new Error('Book title is required');
  }

  if (!order.price || order.price <= 0) {
    throw new Error('Invalid price');
  }

  if (order.price > 100000) {
    throw new Error('Price exceeds maximum limit');
  }

  return true;
}

/**
 * Format currency
 */
function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize payment page on DOM load
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Payment page initialized');

  try {
    // Display order summary
    displayOrderSummary();

    // Validate order
    const order = getOrderDetails();
    validateOrder(order);

    // Attach event listener to pay button
    const payButton = document.getElementById('rzp-button');
    if (payButton) {
      payButton.addEventListener('click', function(e) {
        e.preventDefault();
        initializePayment();
      });
    } else {
      console.error('Pay button not found');
    }

    // Check for Razorpay script
    if (typeof Razorpay === 'undefined') {
      console.warn('Razorpay SDK not loaded yet. It will be loaded from CDN.');
    }

  } catch (error) {
    console.error('Initialization error:', error);
    alert('Error loading payment page. Please refresh and try again.');
  }
});

// ============================================
// TEST MODE HELPERS (Remove in production)
// ============================================

/**
 * Check if running in test mode
 */
function isTestMode() {
  return RAZORPAY_KEY_ID.includes('test');
}

// Display test mode indicator
if (isTestMode()) {
  console.log('%c🧪 TEST MODE ACTIVE', 'background: #fef3c7; color: #92400e; padding: 10px; font-size: 14px; font-weight: bold;');
  console.log('%cUse test cards for payment:', 'color: #92400e; font-weight: bold;');
  console.log('Card: 4111 1111 1111 1111 | CVV: Any 3 digits | Expiry: Any future date');
  console.log('UPI: success@razorpay');
}
