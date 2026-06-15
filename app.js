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
  initHeroSlider();
});

/* ==========================================================================
   1. Language Switcher (Bilingual: Malay & English)
   ========================================================================== */
function initLanguageSwitcher() {
  const body = document.body;
  const desktopToggle = document.getElementById('langToggle');
  const mobileToggle = document.getElementById('mobileLangToggle');

  // Load saved language or default to English
  const savedLang = localStorage.getItem('printiums_lang') || 'en';
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

/* ==========================================================================
   10. Auto-Sliding Hero Poster Showcase (Right Side of Hero Section)
   ========================================================================== */
function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide-item');
  const totalSlides = slides.length;
  let currentIndex = 0;
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 3000); // Slide every 3 seconds
}

/* ==========================================================================
   11. Bilingual PDF/AI Company Profile Generator
   ========================================================================== */
function generatePDFProfile() {
  try {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
      alert("Error: jsPDF library is not loaded. Please refresh the page and try again.");
      return;
    }

    const isEn = document.body.classList.contains('lang-en');

    // Profile Data (Bilingual)
    const profileData = {
      en: {
        filename: "Printiums_Company_Profile.pdf",
        cover: {
          subtitle: "Design, Printing & Concert Merchandise Specialist",
          established: "Established 2026",
          website: "www.printiums.com",
          profile: "COMPANY PROFILE"
        },
        about: {
          title: "ABOUT US",
          subtitle: "Your Physical Branding Partner",
          p1: "Printiums Sdn Bhd is a design, printing, and merchandise company based in Ampang, Selangor. We provide printing services, custom merchandise, corporate gifts, promotional items, t-shirt printing, banners, buntings, and marketing materials for companies, organizations, and event organizers across Malaysia.",
          p2: "We are also a concert merchandise supplier, helping artists and organizers produce high-quality merchandise such as t-shirts, tote bags, lanyards, posters, and various promotional products. With a combination of creativity, quality, and fast delivery, Printiums is the preferred choice for clients seeking printing services, corporate gift suppliers, and merchandise suppliers in Malaysia.",
          coreTitle: "OUR CORE VALUES",
          cores: [
            {
              title: "Creativity",
              desc: "Innovative design solutions that set your brand apart."
            },
            {
              title: "Quality",
              desc: "Industrial-grade materials and ultra HD printing precision."
            },
            {
              title: "Speed",
              desc: "Fast turnaround times to meet your tight corporate schedules."
            }
          ]
        },
        services: {
          title: "OUR SERVICES",
          subtitle: "Premium Printing Solutions for Business",
          items: [
            {
              num: "01",
              title: "Corporate Stickers & Labels",
              desc: "Waterproof brand stickers with precise kiss-cut or die-cut using PP White, PP Transparent, and Mirrorcoat."
            },
            {
              num: "02",
              title: "Banners & Buntings",
              desc: "High-impact advertising using thick industrial tarpaulin, PVC pipes, and rust-proof metal eyelets."
            },
            {
              num: "03",
              title: "Business Cards",
              desc: "Premium cardstock (310/360gsm) featuring elegant Matte Lamination and exclusive Spot UV finishes."
            },
            {
              num: "04",
              title: "Marketing Materials",
              desc: "High-quality brochures, flyers, booklets, and corporate folders to complete your campaigns."
            },
            {
              num: "05",
              title: "Concert Merchandise",
              desc: "Official band t-shirts, tote bags, lanyards, and custom collectibles for music concerts and festivals."
            }
          ]
        },
        contact: {
          title: "GET IN TOUCH",
          subtitle: "Start Your Print Project Today",
          methods: [
            { label: "Our Location", value: "3A, Jalan AWF 2, Ampang Waterfront,\n68000 Ampang, Selangor" },
            { label: "Phone Line", value: "+6018-943 5343" },
            { label: "Email Address", value: "myprinitums@gmail.com" },
            { label: "Official Website", value: "www.printiums.com" }
          ],
          footer: "© 2026 Printiums Sdn Bhd. All rights reserved."
        }
      },
      ms: {
        filename: "Profil_Syarikat_Printiums.pdf",
        cover: {
          subtitle: "Pakar Reka Bentuk, Percetakan & Merchandise Konsert",
          established: "Ditubuhkan 2026",
          website: "www.printiums.com",
          profile: "PROFIL SYARIKAT"
        },
        about: {
          title: "MENGENAI KAMI",
          subtitle: "Rakan Kongsi Penjenamaan Fizikal Anda",
          p1: "Printiums Sdn Bhd ialah syarikat design, printing dan merchandise yang berpangkalan di Ampang, Selangor. Kami menyediakan perkhidmatan percetakan, custom merchandise, corporate gift, promotional items, t-shirt printing, banner, bunting dan bahan pemasaran untuk syarikat, organisasi serta event organizer di seluruh Malaysia.",
          p2: "Kami juga merupakan supplier merchandise konsert yang membantu artis dan penganjur menghasilkan merchandise berkualiti seperti t-shirt, tote bag, lanyard, poster dan pelbagai barangan promosi. Dengan gabungan kreativiti, kualiti dan penghantaran yang pantas, Printiums menjadi pilihan bagi pelanggan yang mencari printing service, corporate gift supplier dan merchandise supplier di Malaysia.",
          coreTitle: "NILAI TERAS KAMI",
          cores: [
            {
              title: "Kreativiti",
              desc: "Solusi reka bentuk inovatif yang membezakan jenama anda."
            },
            {
              title: "Kualiti",
              desc: "Material gred industri dan ketepatan cetakan ultra HD."
            },
            {
              title: "Kelajuan",
              desc: "Penghantaran pantas untuk menepati jadual korporat anda."
            }
          ]
        },
        services: {
          title: "PERKHIDMATAN KAMI",
          subtitle: "Penyelesaian Cetakan Premium Untuk Perniagaan",
          items: [
            {
              num: "01",
              title: "Pelekat & Label Korporat",
              desc: "Pelekat jenama kalis air dengan pemotongan kiss-cut/die-cut menggunakan material PP White, PP Transparent, & Mirrorcoat."
            },
            {
              num: "02",
              title: "Banner & Bunting Gergasi",
              desc: "Sistem pengiklanan fizikal berimpak tinggi menggunakan tarpaulin tebal, paip PVC, dan lubang cincin karat."
            },
            {
              num: "03",
              title: "Kad Perniagaan Premium",
              desc: "Kad perniagaan tebal (Art Card 310gsm/360gsm) dilengkapi kemasan Matte Lamination dan Spot UV eksklusif."
            },
            {
              num: "04",
              title: "Bahan Promosi & Pemasaran",
              desc: "Cetak risalah (Flyers), brosur lipatan, profil syarikat, dan buku panduan berkualiti tinggi untuk pemasaran."
            },
            {
              num: "05",
              title: "Merchandise Konsert & Acara",
              desc: "Pembekal barangan konsert rasmi membantu artis/penganjur menghasilkan t-shirt, tote bag, lanyard, dan poster."
            }
          ]
        },
        contact: {
          title: "HUBUNGI KAMI",
          subtitle: "Mulakan Projek Cetakan Anda Hari Ini",
          methods: [
            { label: "Lokasi Kami", value: "3A, Jalan AWF 2, Ampang Waterfront,\n68000 Ampang, Selangor" },
            { label: "Talian Telefon", value: "+6018-943 5343" },
            { label: "E-mel Rasmi", value: "myprinitums@gmail.com" },
            { label: "Laman Web", value: "www.printiums.com" }
          ],
          footer: "© 2026 Printiums Sdn Bhd. Hak Cipta Terpelihara."
        }
      }
    };

    const data = isEn ? profileData.en : profileData.ms;

    // Initialize document: A4 Portrait, mm coordinates
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Color Palette Definition (RGB)
    const cBlack = [7, 8, 10];
    const cMagenta = [224, 0, 108];
    const cWhite = [255, 255, 255];
    const cGrayBg = [244, 245, 247];
    const cCardBg = [18, 20, 26];
    
    const textDark = [51, 51, 51];
    const textMid = [100, 100, 100];
    const textLight = [160, 165, 181];

    // =========================================================================
    // PAGE 1: COVER
    // =========================================================================
    
    // Background
    doc.setFillColor(cBlack[0], cBlack[1], cBlack[2]);
    doc.rect(0, 0, 210, 297, 'F');

    // Left Border Accents
    doc.setFillColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.rect(0, 0, 12, 297, 'F');
    
    // Elegant Corner Decoration
    doc.setFillColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.rect(170, 0, 40, 15, 'F');
    doc.rect(185, 20, 25, 5, 'F');

    // Main Brand Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(44);
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.text('PRINTIUMS', 30, 110);

    // Profile Subheading
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.text(data.cover.profile, 30, 125);

    // Details Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    const coverDescLines = doc.splitTextToSize(data.cover.subtitle, 150);
    let subtitleY = 140;
    coverDescLines.forEach(line => {
      doc.text(line, 30, subtitleY);
      subtitleY += 6;
    });

    // Established Date & Website at footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.text(data.cover.established, 30, 255);
    doc.setTextColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.text(data.cover.website, 30, 262);

    // =========================================================================
    // PAGE 2: ABOUT US
    // =========================================================================
    doc.addPage();

    // Side Accent
    doc.setFillColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.rect(20, 20, 6, 28, 'F');

    // Section Headers
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(cBlack[0], cBlack[1], cBlack[2]);
    doc.text(data.about.title, 32, 30);

    doc.setFontSize(11);
    doc.setTextColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.text(data.about.subtitle, 32, 40);

    // Main paragraphs
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    
    let textY = 60;
    const p1Lines = doc.splitTextToSize(data.about.p1, 170);
    p1Lines.forEach(line => {
      doc.text(line, 20, textY);
      textY += 6.5;
    });

    textY += 4;
    const p2Lines = doc.splitTextToSize(data.about.p2, 170);
    p2Lines.forEach(line => {
      doc.text(line, 20, textY);
      textY += 6.5;
    });

    // Core values section
    textY += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(cBlack[0], cBlack[1], cBlack[2]);
    doc.text(data.about.coreTitle, 20, textY);
    
    textY += 6;
    data.about.cores.forEach(core => {
      // Gray background box
      doc.setFillColor(cGrayBg[0], cGrayBg[1], cGrayBg[2]);
      doc.rect(20, textY, 170, 20, 'F');
      
      // Magenta left edge indicator
      doc.setFillColor(cMagenta[0], cMagenta[1], cMagenta[2]);
      doc.rect(20, textY, 3, 20, 'F');

      // Core details
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(cBlack[0], cBlack[1], cBlack[2]);
      doc.text(core.title, 28, textY + 6.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(textMid[0], textMid[1], textMid[2]);
      doc.text(core.desc, 28, textY + 13);

      textY += 24;
    });

    // Page number & footer reference
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text('Printiums Company Profile | About Us', 20, 285);
    doc.text('Page 2', 185, 285);

    // =========================================================================
    // PAGE 3: SERVICES
    // =========================================================================
    doc.addPage();

    // Background
    doc.setFillColor(cBlack[0], cBlack[1], cBlack[2]);
    doc.rect(0, 0, 210, 297, 'F');

    // Side Accent
    doc.setFillColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.rect(20, 20, 6, 28, 'F');

    // Headers
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.text(data.services.title, 32, 30);

    doc.setFontSize(11);
    doc.setTextColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.text(data.services.subtitle, 32, 40);

    // Grid layout for 5 services
    const services = data.services.items;
    const positions = [
      { x: 20, y: 56 },
      { x: 110, y: 56 },
      { x: 20, y: 124 },
      { x: 110, y: 124 },
      { x: 20, y: 192 }
    ];

    services.forEach((service, idx) => {
      const pos = positions[idx];

      // Draw container block
      doc.setFillColor(cCardBg[0], cCardBg[1], cCardBg[2]);
      doc.rect(pos.x, pos.y, 80, 52, 'F');

      // Left Accent line
      doc.setFillColor(cMagenta[0], cMagenta[1], cMagenta[2]);
      doc.rect(pos.x, pos.y, 2, 52, 'F');

      // Service Number
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(cMagenta[0], cMagenta[1], cMagenta[2]);
      doc.text(service.num, pos.x + 8, pos.y + 10);

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
      
      const titleLines = doc.splitTextToSize(service.title, 68);
      let tY = pos.y + 17;
      titleLines.forEach(l => {
        doc.text(l, pos.x + 8, tY);
        tY += 5;
      });

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textLight[0], textLight[1], textLight[2]);
      
      const descLines = doc.splitTextToSize(service.desc, 66);
      let dY = tY + 2;
      descLines.forEach(line => {
        doc.text(line, pos.x + 8, dY);
        dY += 4.5;
      });
    });

    // Page number & footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text('Printiums Company Profile | Services', 20, 285);
    doc.text('Page 3', 185, 285);

    // =========================================================================
    // PAGE 4: CONTACT & BACK COVER
    // =========================================================================
    doc.addPage();

    // Top half dark, bottom half magenta
    doc.setFillColor(cBlack[0], cBlack[1], cBlack[2]);
    doc.rect(0, 0, 210, 220, 'F');
    doc.setFillColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.rect(0, 220, 210, 77, 'F');

    // Header Side Accent
    doc.setFillColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.rect(20, 20, 6, 28, 'F');

    // Headers
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.text(data.contact.title, 32, 30);

    doc.setFontSize(11);
    doc.setTextColor(cMagenta[0], cMagenta[1], cMagenta[2]);
    doc.text(data.contact.subtitle, 32, 40);

    // 2x2 Grid for Contact Methods
    const methods = data.contact.methods;
    const mPositions = [
      { x: 20, y: 65 },
      { x: 110, y: 65 },
      { x: 20, y: 125 },
      { x: 110, y: 125 }
    ];

    methods.forEach((method, idx) => {
      const pos = mPositions[idx];

      // Draw a neat solid vector block indicator
      doc.setFillColor(cMagenta[0], cMagenta[1], cMagenta[2]);
      doc.rect(pos.x, pos.y + 1, 3, 3, 'F');

      // Method Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
      doc.text(method.label, pos.x + 8, pos.y + 4);

      // Method Value
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(textLight[0], textLight[1], textLight[2]);
      
      const valLines = doc.splitTextToSize(method.value, 75);
      let vY = pos.y + 10;
      valLines.forEach(line => {
        doc.text(line, pos.x + 8, vY);
        vY += 5.5;
      });
    });

    // Bottom brand section (on magenta background)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.text('PRINTIUMS', 20, 250);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.text(data.cover.subtitle, 20, 258);

    doc.setFontSize(8.5);
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.text(data.contact.footer, 20, 280);
    doc.text('Page 4', 185, 280);

    // Save PDF
    doc.save(data.filename);
  } catch (error) {
    console.error("Bilingual PDF generation failed:", error);
    alert("An error occurred while generating the PDF. Please try again.");
  }
}
