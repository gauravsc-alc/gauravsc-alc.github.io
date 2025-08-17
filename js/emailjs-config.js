/**
 * EmailJS Configuration
 * Simplified logic to allow email sending without domain restrictions
 */
// (function() {
// 	// If CI or another script already injected valid config, keep it
// 	if (window.EMAILJS_CONFIG && window.EMAILJS_CONFIG.PUBLIC_KEY) {
// 		console.log('EmailJS: Using existing configuration');
// 		return;
// 	}

// 	// Development configuration (will be overwritten in production by CI)
// 	window.EMAILJS_CONFIG = {
// 		PUBLIC_KEY: 'oftKysdm_C9YNFpcd',
// 		SERVICE_ID: 'service_tij9azu',
// 		TEMPLATE_ID: 'template_qvzl2ie'
// 	};

// 	console.log('EmailJS: Configuration loaded');
// })();
//     window.EMAILJS_CONFIG = {
//       PUBLIC_KEY: '',
//       SERVICE_ID: '',
//       TEMPLATE_ID: ''
//     };

  // Check if already configured by CI (production)
  if (window.EMAILJS_CONFIG && window.EMAILJS_CONFIG.PUBLIC_KEY) {
    console.log('EmailJS: Using CI-generated configuration');
    // return;
  }

  // Development configuration (will be overwritten in production by CI)
  window.EMAILJS_CONFIG = {
    PUBLIC_KEY: 'oftKysdm_C9YNFpcd',
    SERVICE_ID: 'service_tij9azu',
    TEMPLATE_ID: 'template_qvzl2ie'
  };

  console.log('EmailJS: Configuration loaded for authorized domain');

