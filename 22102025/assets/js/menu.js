(function() {
  'use strict';

  // DOM Elements
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  
  // Mobile language elements
  const languageBtn = document.querySelector('.language-btn');
  const languageDropdown = document.querySelector('.language-dropdown');
  
  // Desktop language elements
  const desktopLanguageBtn = document.querySelector('.desktop-language-btn');
  const desktopLanguageDropdown = document.querySelector('.desktop-language-dropdown');
  
  // Language options (both mobile and desktop)
  const languageOptions = document.querySelectorAll('.language-option');
  const language = document.querySelector('.language-text');
  const desktopLanguage = document.querySelector('.desktop-language-text');

  // Set language text based on current page
  function setLanguageText() {
    const path = new URL(document.location.href).pathname;
    const target = path.endsWith('/') ? '' : path.split('/').pop();
    const langText = target.toLowerCase() === 'index_cn.html' ? '简体中文' : 'ENGLISH';
    
    if (language) language.innerHTML = langText;
    if (desktopLanguage) desktopLanguage.innerHTML = langText;
  }

  setLanguageText();

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
    closeMobileLanguageDropdown();
  }

  // Mobile language dropdown functions
  function toggleMobileLanguageDropdown() {
    const isOpen = languageDropdown.classList.contains('active');
    if (isOpen) {
      closeMobileLanguageDropdown();
    } else {
      openMobileLanguageDropdown();
    }
  }

  function openMobileLanguageDropdown() {
    if (languageBtn) languageBtn.setAttribute('aria-expanded', 'true');
    if (languageDropdown) languageDropdown.classList.add('active');
  }

  function closeMobileLanguageDropdown() {
    if (languageBtn) languageBtn.setAttribute('aria-expanded', 'false');
    if (languageDropdown) languageDropdown.classList.remove('active');
  }

  // Desktop language dropdown functions
  function toggleDesktopLanguageDropdown() {
    const isOpen = desktopLanguageDropdown.classList.contains('active');
    if (isOpen) {
      closeDesktopLanguageDropdown();
    } else {
      openDesktopLanguageDropdown();
    }
  }

  function openDesktopLanguageDropdown() {
    if (desktopLanguageBtn) desktopLanguageBtn.setAttribute('aria-expanded', 'true');
    if (desktopLanguageDropdown) desktopLanguageDropdown.classList.add('active');
  }

  function closeDesktopLanguageDropdown() {
    if (desktopLanguageBtn) desktopLanguageBtn.setAttribute('aria-expanded', 'false');
    if (desktopLanguageDropdown) desktopLanguageDropdown.classList.remove('active');
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

  // Mobile language selector toggle
  if (languageBtn) {
    languageBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileLanguageDropdown();
    });
  }

  // Desktop language selector toggle
  if (desktopLanguageBtn) {
    desktopLanguageBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDesktopLanguageDropdown();
    });
  }

  // Language option selection
  languageOptions.forEach(option => {
    option.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');

      closeMobileLanguageDropdown();
      closeDesktopLanguageDropdown();

      // Navigate to the appropriate language page
      const currentPath = window.location.pathname;
      const isEnglish = !currentPath.includes('_cn');

      if (lang === 'cn' && isEnglish) {
        window.location.href = currentPath.replace('index.html', 'index_cn.html').replace(/\/$/, '/index_cn.html');
      } else if (lang === 'en' && !isEnglish) {
        window.location.href = currentPath.replace('index_cn.html', 'index.html');
      }
    });
  });

  // Close language dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    // Close mobile dropdown
    if (languageDropdown && !languageDropdown.contains(e.target) && 
        languageBtn && !languageBtn.contains(e.target)) {
      closeMobileLanguageDropdown();
    }
    
    // Close desktop dropdown
    if (desktopLanguageDropdown && !desktopLanguageDropdown.contains(e.target) && 
        desktopLanguageBtn && !desktopLanguageBtn.contains(e.target)) {
      closeDesktopLanguageDropdown();
    }
  });

  // Handle escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
      closeMobileLanguageDropdown();
      closeDesktopLanguageDropdown();
    }
  });

  // Handle resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
})();