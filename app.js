/* ==========================================================================
   Printiums Corporate website JavaScript
   Bilingual toggle, scroll animation, stats counter, tab system, and slider
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize App Features
  initLanguageSwitcher();
  initMobileMenu();
  initNavbarScroll();
  initScrollAnimations();
  initStatsCounter();
  initTabsSystem();
  initTestimonialSlider();
  initPortfolioSlider();
});

/* ==========================================================================
   1. Language Switcher (Bilingual: Malay & English)
   ========================================================================== */
function initLanguageSwitcher() {
  const body = document.body;
  const desktopToggle = document.getElementById('langToggle');
  const mobileToggle = document.getElementById('mobileLangToggle');

  // Load saved language or default to Malay
  const savedLang = localStorage.getItem('printiums_lang') || 'ms';
  setLanguage(savedLang);

  // Desktop Switcher Event
  if (desktopToggle) {
    desktopToggle.addEventListener('click', (e) => {
      const option = e.target.closest('.lang-option');
      if (!option) return;
      const lang = option.getAttribute('data-lang');
      setLanguage(lang);
    });
  }

  // Mobile Switcher Event
  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      const option = e.target.closest('.lang-option');
      if (!option) return;
      const lang = option.getAttribute('data-lang');
      setLanguage(lang);
    });
  }

  function setLanguage(lang) {
    // Save selection
    localStorage.setItem('printiums_lang', lang);
    
    // Toggle body class
    if (lang === 'en') {
      body.classList.remove('lang-ms');
      body.classList.add('lang-en');
      document.documentElement.setAttribute('lang', 'en');
    } else {
      body.classList.remove('lang-en');
      body.classList.add('lang-ms');
      document.documentElement.setAttribute('lang', 'ms');
    }

    // Update active class in navbar toggle
    updateToggleState(desktopToggle, lang);
    updateToggleState(mobileToggle, lang);
  }

  function updateToggleState(container, lang) {
    if (!container) return;
    const options = container.querySelectorAll('.lang-option');
    options.forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   2. Mobile Drawer Menu Navigation
   ========================================================================== */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

function initMobileMenu() {
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      toggleMobileMenu();
    });
  }
}

function toggleMobileMenu() {
  if (!menuToggle || !mobileNav) return;
  
  const isActive = mobileNav.classList.toggle('active');
  
  // Update Icon
  const icon = menuToggle.querySelector('i');
  if (isActive) {
    icon.className = 'fa-solid fa-xmark';
    document.body.style.overflow = 'hidden'; // Lock background scroll
  } else {
    icon.className = 'fa-solid fa-bars';
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. Navbar Shrink on Scroll
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   4. Scroll Triggered Entrance Animations
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once animated
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   5. Dynamic Statistics Counter Animation
   ========================================================================== */
function initStatsCounter() {
  const statsSection = document.querySelector('.about-section');
  const numbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = () => {
    numbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'), 10);
      const duration = 2000; // Animation duration in milliseconds
      const stepTime = 30; // Time interval in milliseconds
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          num.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          num.textContent = Math.floor(current).toLocaleString();
        }
      }, stepTime);
    });
  };

  // Trigger countUp when stats section enters viewport
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        countUp();
        animated = true;
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }
}

/* ==========================================================================
   6. Why Choose Us Interactive Tabs
   ========================================================================== */
function initTabsSystem() {
  const tabsControl = document.querySelector('.tabs-control');
  if (!tabsControl) return;

  tabsControl.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn || btn.classList.contains('active')) return;

    // Remove active classes
    const buttons = tabsControl.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));

    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(p => p.classList.remove('active'));

    // Add active classes
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    const activePane = document.getElementById(`tab-${tabId}`);
    if (activePane) {
      activePane.classList.add('active');
    }
  });
}

/* ==========================================================================
   7. Testimonial Auto Slider & Dot Controllers
   ========================================================================== */
function initTestimonialSlider() {
  const slider = document.getElementById('testimonialSlider');
  const dotsContainer = document.getElementById('sliderDots');
  if (!slider || !dotsContainer) return;

  const cards = slider.querySelectorAll('.testimonial-card');
  const cardCount = cards.length;
  let currentIndex = 0;
  let autoSlideTimer;

  // Generate Navigation Dots
  for (let i = 0; i < cardCount; i++) {
    const dot = document.createElement('div');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('data-index', i);
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll('.dot');

  // Go to Specific Slide
  function goToSlide(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update Dots Status
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Reset autoplay timer on manual slide change
    resetAutoplay();
  }

  // Dots click events
  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.dot');
    if (!dot) return;
    const index = parseInt(dot.getAttribute('data-index'), 10);
    goToSlide(index);
  });

  // Autoplay functionality
  function startAutoplay() {
    autoSlideTimer = setInterval(() => {
      let nextIndex = (currentIndex + 1) % cardCount;
      goToSlide(nextIndex);
    }, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoSlideTimer);
    startAutoplay();
  }

  startAutoplay();
}

/* ==========================================================================
   8. Contact Form Handling
   ========================================================================== */
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const feedback = document.getElementById('formFeedback');
  const submitBtn = form.querySelector('button[type="submit"]');
  const isEn = document.body.classList.contains('lang-en');

  // Save button original text
  const originalBtnHTML = submitBtn.innerHTML;

  // Loading state visual feedback
  submitBtn.disabled = true;
  submitBtn.innerHTML = isEn 
    ? 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>' 
    : 'Menghantar... <i class="fa-solid fa-spinner fa-spin"></i>';

  // Simulate network request
  setTimeout(() => {
    // Reset form
    form.reset();
    
    // Restore button status
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;

    // Display feedback message
    feedback.className = 'form-feedback success';
    feedback.innerHTML = isEn
      ? '<strong>Success!</strong> Thank you. Your inquiry has been sent successfully. We will contact you soon.'
      : '<strong>Berjaya!</strong> Terima kasih. Pertanyaan anda telah berjaya dihantar. Kami akan menghubungi anda sebentar lagi.';
    
    // Reset focus and float labels
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.blur());

    // Fade out message after 8 seconds
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 8000);
  }, 1500);
}

/* ==========================================================================
   9. Concert Portfolio Carousel Slider (Supports 4/2/1 view counts)
   ========================================================================== */
function initPortfolioSlider() {
  const slider = document.getElementById('portfolioSlider');
  const prevBtn = document.getElementById('portfolioPrev');
  const nextBtn = document.getElementById('portfolioNext');
  const dotsContainer = document.getElementById('portfolioDots');
  if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = slider.querySelectorAll('.portfolio-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoSlideTimer;

  // Calculate how many items are visible based on screen size
  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 4;
  }

  function getMaxIndex() {
    return totalSlides - getVisibleCount();
  }

  // Generate Navigation Dots
  function generateDots() {
    dotsContainer.innerHTML = '';
    const visibleCount = getVisibleCount();
    const dotCount = totalSlides - visibleCount + 1;
    
    if (dotCount <= 1) return; // No need for dots if all are visible

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = `dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('data-index', i);
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const visibleCount = getVisibleCount();
    const maxIndex = getMaxIndex();
    
    // Clamp index
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // Calculate slide width and gap (32px matching flex gap)
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 32;
    const offset = currentIndex * (slideWidth + gap);
    
    slider.style.transform = `translateX(-${offset}px)`;

    // Update active dots
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    // Toggle button opacity and interactivity
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    nextBtn.style.opacity = currentIndex === maxIndex ? '0.3' : '1';
    nextBtn.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';

    // Reset auto-slide timer whenever the slide updates
    resetAutoplay();
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateSlider();
    }
  });

  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.dot');
    if (!dot) return;
    currentIndex = parseInt(dot.getAttribute('data-index'), 10);
    updateSlider();
  });

  // Handle screen resize events
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      generateDots();
      updateSlider();
    }, 100);
  });

  // Autoplay functions
  function startAutoplay() {
    autoSlideTimer = setInterval(() => {
      const maxIndex = getMaxIndex();
      if (maxIndex <= 0) return;
      
      let nextIndex = currentIndex + 1;
      if (nextIndex > maxIndex) {
        nextIndex = 0; // Wrap back to beginning
      }
      currentIndex = nextIndex;
      updateSlider();
    }, 4000); // Slide every 4 seconds
  }

  function resetAutoplay() {
    clearInterval(autoSlideTimer);
    startAutoplay();
  }

  // Initial layout & start auto-sliding
  generateDots();
  updateSlider();
  startAutoplay();
}
