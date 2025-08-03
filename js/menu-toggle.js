document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (toggle && menu) {
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Toggle menu function
    function toggleMenu() {
      const isActive = menu.classList.contains('active');

      if (isActive) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Close any open submenus
        const openSubmenus = document.querySelectorAll('.has-submenu.open');
        openSubmenus.forEach(submenu => {
          submenu.classList.remove('open');
        });
      } else {
        menu.classList.add('active');
        toggle.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    // Event listeners
    toggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Handle submenu toggle on mobile
    const submenus = document.querySelectorAll('.has-submenu');
    submenus.forEach(submenu => {
      const link = submenu.querySelector('a');
      if (link) {
        link.addEventListener('click', function(e) {
          // Only prevent default on mobile when menu is active
          if (window.innerWidth <= 768 && menu.classList.contains('active')) {
            e.preventDefault();
            e.stopPropagation();

            // Close other open submenus
            const otherSubmenus = document.querySelectorAll('.has-submenu.open');
            otherSubmenus.forEach(other => {
              if (other !== submenu) {
                other.classList.remove('open');
              }
            });

            // Toggle current submenu
            submenu.classList.toggle('open');
          }
        });
      }
    });

    // Handle submenu navigation - auto close and navigate
    const submenuLinks = document.querySelectorAll('.submenu a:not(.submenu-back)');
    submenuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Allow navigation but close mobile menu
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            toggleMenu();
          }, 100);
        }
      });
    });

    // Handle back button in submenu
    const backButtons = document.querySelectorAll('.submenu-back');
    backButtons.forEach(backButton => {
      backButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Close the submenu and go back to main menu
        const parentSubmenu = this.closest('.has-submenu');
        if (parentSubmenu) {
          parentSubmenu.classList.remove('open');
        }
      });
    });

    // Close menus when window is resized to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        // Close mobile menu
        menu.classList.remove('active');
        toggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Close all submenus
        const openSubmenus = document.querySelectorAll('.has-submenu.open');
        openSubmenus.forEach(submenu => {
          submenu.classList.remove('open');
        });
      }
    });
  }

  // Add click handlers for book cards to ensure they work
  document.addEventListener('click', function(e) {
    const bookCardLink = e.target.closest('.book-card-link');
    if (bookCardLink && !e.target.closest('.amazon-link-wrapper')) {
      // If clicking on book card but not on amazon link, navigate to book page
      const href = bookCardLink.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;
      }
    }
  });
});