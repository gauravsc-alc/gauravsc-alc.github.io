document.addEventListener("DOMContentLoaded", function() {
  const floatingMenu = document.querySelector('.floating-category-menu');
  const menuToggle = document.querySelector('.floating-menu-toggle');
  const menuContent = document.querySelector('.floating-menu-content');

  if (!floatingMenu || !menuToggle || !menuContent) return;

  let isMenuOpen = false;

  // Set initial icon with enhanced styling - using book emoji as fallback
  menuToggle.innerHTML = '<span class="floating-icon">📖</span>';
  menuToggle.setAttribute('aria-label', 'Open category menu');

  // Toggle floating menu
  function toggleFloatingMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      menuToggle.classList.add('active');
      menuContent.classList.add('active');
      menuToggle.innerHTML = '<span class="floating-icon">✕</span>';
      menuToggle.setAttribute('aria-label', 'Close category menu');
    } else {
      menuToggle.classList.remove('active');
      menuContent.classList.remove('active');
      menuToggle.innerHTML = '<span class="floating-icon">📖</span>';
      menuToggle.setAttribute('aria-label', 'Open category menu');
    }
  }

  // Event listeners
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleFloatingMenu();
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (isMenuOpen && !floatingMenu.contains(e.target)) {
      toggleFloatingMenu();
    }
  });

  // Close menu when clicking on a category link
  const categoryLinks = menuContent.querySelectorAll('.floating-category-list a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Small delay to allow navigation to start
      setTimeout(() => {
        if (isMenuOpen) {
          toggleFloatingMenu();
        }
      }, 100);
    });
  });

  // Handle scroll behavior - hide menu when scrolling up, show when scrolling down
  let lastScrollTop = 0;
  let scrollTimeout;

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down and past header
        floatingMenu.style.opacity = '0.7';
        floatingMenu.style.transform = 'scale(0.9)';
      } else {
        // Scrolling up or at top
        floatingMenu.style.opacity = '1';
        floatingMenu.style.transform = 'scale(1)';
      }

      lastScrollTop = scrollTop;
    }, 100);
  });

  // Touch gesture support for mobile
  let touchStartY = 0;
  let touchEndY = 0;

  menuContent.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  menuContent.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;

    // Swipe up to close menu
    if (swipeDistance > swipeThreshold && isMenuOpen) {
      toggleFloatingMenu();
    }
  }

  // Keyboard navigation
  menuToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFloatingMenu();
    }
  });

  // Focus management for accessibility
  menuContent.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleFloatingMenu();
      menuToggle.focus();
    }
  });
});
