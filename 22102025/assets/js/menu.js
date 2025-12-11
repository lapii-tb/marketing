/**
 * Mobile Menu Toggle Functionality
 * Handles hamburger menu, slide-out sidebar, and language selector
 */

(function() {
  'use strict';

  // DOM Elements
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const languageBtn = document.querySelector('.language-btn');
  const languageDropdown = document.querySelector('.language-dropdown');
  const languageOptions = document.querySelectorAll('.language-option');
  const navbar = document.querySelector('.navbar');

  // Toggle mobile menu
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('active');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Open mobile menu
  function openMobileMenu() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  // Close mobile menu
  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');

    // Also close language dropdown
    closeLanguageDropdown();
  }

  // Toggle language dropdown
  function toggleLanguageDropdown() {
    const isOpen = languageDropdown.classList.contains('active');

    if (isOpen) {
      closeLanguageDropdown();
    } else {
      openLanguageDropdown();
    }
  }

  // Open language dropdown
  function openLanguageDropdown() {
    languageBtn.setAttribute('aria-expanded', 'true');
    languageDropdown.classList.add('active');
  }

  // Close language dropdown
  function closeLanguageDropdown() {
    languageBtn.setAttribute('aria-expanded', 'false');
    languageDropdown.classList.remove('active');
  }

  // Event Listeners
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking nav items
  mobileNavItems.forEach(item => {
    item.addEventListener('click', closeMobileMenu);
  });

  // Language selector toggle
  if (languageBtn) {
    languageBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleLanguageDropdown();
    });
  }

  // Language option selection
  languageOptions.forEach(option => {
    option.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');

      closeLanguageDropdown();

      // Navigate to the appropriate language page
      const currentPath = window.location.pathname;
      const isEnglish = !currentPath.includes('_cn');

      if (lang === 'cn' && isEnglish) {
        // Switch to Chinese
        window.location.href = currentPath.replace('index.html', 'index_cn.html').replace(/\/$/, '/index_cn.html');
      } else if (lang === 'en' && !isEnglish) {
        // Switch to English
        window.location.href = currentPath.replace('index_cn.html', 'index.html');
      }
    });
  });

  // Close language dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (languageDropdown && !languageDropdown.contains(e.target) && !languageBtn.contains(e.target)) {
      closeLanguageDropdown();
    }
  });

  // Handle escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    }
  });

  // Handle resize - close mobile menu if window is resized to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
})();