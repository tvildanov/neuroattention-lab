/* NeuroAttention Lab - Main JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize navigation
  initNavigation();

  // Initialize animations
  initAnimations();

  // Initialize language switcher
  initLanguageSwitcher();
});

/* Navigation Functions */
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (hamburger) {
        hamburger.classList.remove('active');
      }
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    });
  });

  // Update active nav item based on current page
  updateActiveNavItem();

  // Navbar background on scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(13, 22, 41, 0.8)';
    } else {
      navbar.style.background = '';
    }
  });
}

function updateActiveNavItem() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');

    if (currentPage === 'index' && (href === 'index.html' || href === '/')) {
      link.classList.add('active');
    } else if (href.includes(currentPage)) {
      link.classList.add('active');
    }
  });
}

function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return filename.replace('.html', '');
}

/* Animation Functions */
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll('.card, section').forEach(el => {
    observer.observe(el);
  });

  // Add fade-in animation class
  const style = document.createElement('style');
  style.textContent = `
    .card, section {
      opacity: 0;
      transform: translateY(20px);
    }
    .card.fade-in, section.fade-in {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  X
