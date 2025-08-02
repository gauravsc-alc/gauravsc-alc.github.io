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

    // Handle submenu toggle on mobile with double-click for Books
    const submenus = document.querySelectorAll('.has-submenu');
    submenus.forEach(submenu => {
      const link = submenu.querySelector('a');
      if (link) {
        let clickTimeout;
        let clickCount = 0;

        link.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();

            clickCount++;

            if (clickCount === 1) {
              clickTimeout = setTimeout(() => {
                // Single click - toggle submenu
                const isOpen = submenu.classList.contains('open');

                // Close all other submenus first
                submenus.forEach(otherSubmenu => {
                  if (otherSubmenu !== submenu) {
                    otherSubmenu.classList.remove('open');
                  }
                });

                if (isOpen) {
                  submenu.classList.remove('open');
                } else {
                  submenu.classList.add('open');
                }

                clickCount = 0;
              }, 300);
            } else if (clickCount === 2) {
              // Double click - navigate to the page
              clearTimeout(clickTimeout);
              clickCount = 0;

              // Close menu first
              menu.classList.remove('active');
              toggle.classList.remove('active');
              overlay.classList.remove('active');
              document.body.style.overflow = '';

              // Close any open submenus
              submenus.forEach(openSubmenu => {
                openSubmenu.classList.remove('open');
              });

              // Navigate to the page
              window.location.href = link.href;
            }
          }
        });
      }
    });

    // Handle back button in submenu
    const backButtons = document.querySelectorAll('.submenu-back');
    backButtons.forEach(backButton => {
      backButton.addEventListener('click', function(e) {
        e.preventDefault();
        const submenu = this.closest('.has-submenu');
        if (submenu) {
          submenu.classList.remove('open');
        }
      });
    });

    // Close menu when window is resized to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Close all submenus
        submenus.forEach(submenu => {
          submenu.classList.remove('open');
        });
      }
    });
  }
});