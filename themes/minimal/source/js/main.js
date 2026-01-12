// ========================================
// Minimal Theme - Main JavaScript
// ========================================

(function() {
  'use strict';

  // DOM Elements
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const backToTopButton = document.getElementById('backToTop');

  // Mobile Menu Toggle
  function toggleMenu() {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('visible');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleMenu);
  }

  // Close sidebar when clicking a navigation link (mobile)
  const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // Back to Top Button
  function handleScroll() {
    if (backToTopButton) {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (backToTopButton) {
    window.addEventListener('scroll', handleScroll);
    backToTopButton.addEventListener('click', scrollToTop);
  }

  // Active Navigation Link
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-nav-link');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      if (linkPath === currentPath ||
          (currentPath === '/' && linkPath === '/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveNavLink();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add fade-in animation on scroll
  function handleScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe post cards
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
      observer.observe(card);
    });
  }

  // Run animations on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleScrollAnimations);
  } else {
    handleScrollAnimations();
  }

  // Escape key to close sidebar (mobile)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      toggleMenu();
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
        toggleMenu();
      }
    }, 250);
  });

  // External links
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  console.log('Minimal Theme loaded successfully ✨');

})();
