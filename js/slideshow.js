// Simple auto-slideshow
document.addEventListener("DOMContentLoaded", () => {
  const slideshow = document.querySelector('.slideshow');
  const slides = document.querySelectorAll('.slide');

  if (!slideshow || !slides.length) return;

  let currentSlide = 0;
  let autoSlideInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  let isTransitioning = false;

  // Create slide indicators (dots)
  function createIndicators() {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slide-indicators';

    slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'slide-indicator';
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });

    slideshow.appendChild(indicatorsContainer);
    return indicatorsContainer.querySelectorAll('.slide-indicator');
  }

  const indicators = createIndicators();

  // Show specific slide
  function showSlide(index) {
    if (isTransitioning || index === currentSlide) return;

    isTransitioning = true;

    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Reset transition flag after animation
    setTimeout(() => {
      isTransitioning = false;
    }, 1000);
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
      showSlide(index);
      resetAutoSlide();
    }
  }

  // Next slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  // Previous slide
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  // Auto slide functionality
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Touch event handlers
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swiped left - next slide
        nextSlide();
      } else {
        // Swiped right - previous slide
        prevSlide();
      }
      resetAutoSlide();
    }
  }

  // Click event handler for desktop
  function handleClick(e) {
    // Don't handle click if it was on an indicator
    if (e.target.classList.contains('slide-indicator')) return;

    const rect = slideshow.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const slideWidth = rect.width;

    if (clickX < slideWidth * 0.3) {
      // Clicked on left third - previous slide
      prevSlide();
    } else if (clickX > slideWidth * 0.7) {
      // Clicked on right third - next slide
      nextSlide();
    } else {
      // Clicked on center - next slide
      nextSlide();
    }
    resetAutoSlide();
  }

  // Keyboard navigation
  function handleKeydown(e) {
    switch(e.key) {
      case 'ArrowLeft':
        prevSlide();
        resetAutoSlide();
        break;
      case 'ArrowRight':
        nextSlide();
        resetAutoSlide();
        break;
      case ' ': // Spacebar
        nextSlide();
        resetAutoSlide();
        e.preventDefault();
        break;
    }
  }

  // Add event listeners
  slideshow.addEventListener('touchstart', handleTouchStart, { passive: true });
  slideshow.addEventListener('touchend', handleTouchEnd, { passive: true });
  slideshow.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);

  // Pause auto-slide on hover (desktop)
  slideshow.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  slideshow.addEventListener('mouseleave', () => {
    startAutoSlide();
  });

  // Pause auto-slide when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(autoSlideInterval);
    } else {
      startAutoSlide();
    }
  });

  // Initialize first slide and start auto-slide
  showSlide(0);
  startAutoSlide();
});
