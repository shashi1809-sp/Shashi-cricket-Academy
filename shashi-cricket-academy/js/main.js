/**
 * Shashi Cricket Academy - Interactive JavaScript
 * Zero dependencies, works offline & on double-click
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar & Scroll Effect
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = hamburger.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Animated Stats Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(statsSection);
  } else {
    animateCounters();
  }

  // 4. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. Gallery Filter & Lightbox
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox-overlay');
  const lightboxImg = document.querySelector('.lightbox-container img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentGalleryIndex = 0;
  let visibleGalleryItems = [];

  const updateVisibleGallery = () => {
    visibleGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      updateVisibleGallery();
    });
  });

  updateVisibleGallery();

  const showLightboxImage = (index) => {
    if (visibleGalleryItems.length === 0) return;
    if (index < 0) index = visibleGalleryItems.length - 1;
    if (index >= visibleGalleryItems.length) index = 0;
    currentGalleryIndex = index;

    const targetItem = visibleGalleryItems[index];
    const img = targetItem.querySelector('img');
    const caption = targetItem.querySelector('.gallery-caption');

    if (img && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Gallery photo';
    }
    if (caption && lightboxCaption) {
      lightboxCaption.textContent = caption.textContent;
    }
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      updateVisibleGallery();
      const index = visibleGalleryItems.indexOf(item);
      if (index !== -1 && lightbox) {
        showLightboxImage(index);
        lightbox.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentGalleryIndex - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentGalleryIndex + 1);
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') lightbox.classList.remove('active');
      if (e.key === 'ArrowLeft') showLightboxImage(currentGalleryIndex - 1);
      if (e.key === 'ArrowRight') showLightboxImage(currentGalleryIndex + 1);
    }
  });

  // 6. Interactive Batch Finder Quiz
  const quizAge = document.getElementById('quiz-age');
  const quizLevel = document.getElementById('quiz-level');
  const quizGoal = document.getElementById('quiz-goal');
  const quizResult = document.getElementById('quiz-result');
  const quizRecommendation = document.getElementById('quiz-recommendation');
  const quizSchedule = document.getElementById('quiz-schedule');
  const quizBtn = document.getElementById('quiz-find-btn');

  if (quizBtn && quizAge && quizLevel && quizGoal) {
    quizBtn.addEventListener('click', () => {
      const age = quizAge.value;
      const level = quizLevel.value;
      const goal = quizGoal.value;

      let title = "Junior Development Squad";
      let schedule = "Tue & Thu: 4:30 PM - 7:00 PM | Sat: 7:00 AM - 10:30 AM";

      if (age === 'under-11') {
        title = "Beginner Development Batch (Ages 6–11)";
        schedule = "Mon, Wed, Fri: 4:30 PM - 6:30 PM | Ratio: 1:6 Max";
      } else if (age === '12-16') {
        if (goal === 'batting') {
          title = "Batting Specialization & Power Hitting (Junior Division)";
          schedule = "Tue, Thu, Sat: 4:30 PM - 7:30 PM | Video Analysis Included";
        } else if (goal === 'bowling') {
          title = "Bowling Masterclass (Pace & Spin Biomechanics)";
          schedule = "Mon, Wed, Fri: 4:30 PM - 7:30 PM | Speed Radar Tracking";
        } else {
          title = "Junior All-Round Comprehensive Program (Ages 12–16)";
          schedule = "Daily Morning / Evening Batches Available";
        }
      } else if (age === '17-plus' || age === 'adult') {
        title = "Advanced High-Performance Squad & League Match Prep";
        schedule = "Mon to Fri: 6:00 AM - 9:00 AM OR 5:00 PM - 8:00 PM";
      }

      if (quizRecommendation) quizRecommendation.textContent = title;
      if (quizSchedule) quizSchedule.textContent = schedule;
      if (quizResult) quizResult.classList.add('active');
    });
  }

  // 7. Modals: Trial & Program Details
  const trialModal = document.getElementById('trial-modal');
  const trialTriggers = document.querySelectorAll('.open-trial-modal');
  const modalCloses = document.querySelectorAll('.modal-close, .modal-overlay');

  trialTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (trialModal) trialModal.classList.add('active');
    });
  });

  modalCloses.forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close')) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      }
    });
  });

  // 8. Contact Form Validation
  const contactForm = document.getElementById('academy-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="fullName"]').value.trim();
      const phone = contactForm.querySelector('[name="phone"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const age = contactForm.querySelector('[name="age"]').value.trim();
      const role = contactForm.querySelector('[name="role"]').value;
      const message = contactForm.querySelector('[name="message"]').value.trim();

      if (!name || !phone || !email || !age) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please complete all required fields (Name, Phone, Email, Age).';
        }
        return;
      }

      if (phone.length < 8) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please enter a valid phone number with at least 8 digits.';
        }
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      // Success
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `<strong>Registration Submitted Successfully!</strong><br>Thank you, ${name}. Coach Shashi and the admissions team will reach out to you within 24 hours.<br><a href="https://wa.me/919876543210?text=Hi%20Coach%20Shashi,%20I%20have%20submitted%20my%20academy%20enquiry%20for%20${encodeURIComponent(name)}" target="_blank" class="btn btn-gold btn-sm" style="margin-top:0.8rem; display:inline-flex;"><i class="fa-brands fa-whatsapp"></i> Connect on WhatsApp Instantly</a>`;
      }
      contactForm.reset();
    });
  }

  // 9. Trial Modal Form
  const trialForm = document.getElementById('trial-form');
  const trialFeedback = document.getElementById('trial-feedback');

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = trialForm.querySelector('[name="trialName"]').value.trim();
      const phone = trialForm.querySelector('[name="trialPhone"]').value.trim();

      if (!name || !phone) {
        if (trialFeedback) {
          trialFeedback.className = 'form-feedback error';
          trialFeedback.textContent = 'Please enter your name and phone number.';
        }
        return;
      }

      if (trialFeedback) {
        trialFeedback.className = 'form-feedback success';
        trialFeedback.innerHTML = `<strong>Trial Session Reserved!</strong><br>We look forward to welcoming ${name} at Shashi Cricket Academy. Check your phone for session confirmation.`;
      }
      trialForm.reset();
    });
  }
});
