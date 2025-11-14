/**
 * Navigation functionality for sticky nav and smooth scrolling
 * Implements FR-004, FR-005 for navigation behavior
 */

(function() {
  'use strict';

  const STICKY_THRESHOLD = 60; // Pixels from top to activate sticky nav (FR-004)
  const SCROLL_OFFSET = 80; // Offset for scroll position to account for sticky nav height

  let navbar = null;
  let navLinks = null;
  let sections = null;
  let isScrolling = false;

  /**
   * Initialize navigation system on page load
   */
  function init() {
    navbar = document.querySelector('.navbar');
    navLinks = document.querySelectorAll('.nav-item-link');

    if (!navbar || !navLinks.length) {
      console.warn('Navigation elements not found');
      return;
    }

    // Get all sections that have IDs matching navigation hrefs
    updateSections();

    // Set up event listeners
    setupStickyNavigation();
    setupSmoothScrolling();
    setupActiveNavigation();

    console.log('Navigation system initialized');
  }

  /**
   * Update sections list (called after page structure changes)
   */
  function updateSections() {
    const sectionIds = Array.from(navLinks)
      .map(link => {
        const href = link.getAttribute('href');
        return href && href.startsWith('#') ? href.substring(1) : null;
      })
      .filter(Boolean);

    sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);
  }

  /**
   * Set up sticky navigation behavior
   * Activates sticky class when scrolled past threshold
   */
  function setupStickyNavigation() {
    let ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateStickyState();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial check
    updateStickyState();
  }

  /**
   * Update sticky navigation state based on scroll position
   */
  function updateStickyState() {
    if (!navbar) return;

    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > STICKY_THRESHOLD) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }

  /**
   * Set up smooth scrolling for anchor links
   * Uses native CSS scroll-behavior with JS fallback
   */
  function setupSmoothScrolling() {
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Only handle anchor links (starting with #)
        if (!href || !href.startsWith('#')) {
          return;
        }

        e.preventDefault();

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (!targetSection) {
          console.warn(`Section not found: ${targetId}`);
          return;
        }

        // Smooth scroll to target
        smoothScrollTo(targetSection);
      });
    });
  }

  /**
   * Smooth scroll to target element with offset for sticky nav
   * @param {HTMLElement} target - Target element to scroll to
   */
  function smoothScrollTo(target) {
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - SCROLL_OFFSET;

    // Check if browser supports smooth scrolling
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback for browsers without smooth scroll support
      animateScroll(offsetPosition, 800); // 800ms duration
    }
  }

  /**
   * Fallback smooth scroll animation for older browsers
   * @param {number} targetPosition - Target scroll position
   * @param {number} duration - Animation duration in milliseconds
   */
  function animateScroll(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function (ease-in-out)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  /**
   * Set up active navigation highlighting based on scroll position
   * Updates active class on nav items as user scrolls through sections
   */
  function setupActiveNavigation() {
    let ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateActiveNavItem();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial check
    updateActiveNavItem();
  }

  /**
   * Update active navigation item based on current scroll position
   */
  function updateActiveNavItem() {
    if (!sections || !sections.length || !navLinks.length) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Find the current section based on scroll position
    let currentSectionId = null;

    // Check sections from bottom to top
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop - SCROLL_OFFSET - 100;

      if (scrollY >= sectionTop) {
        currentSectionId = section.id;
        break;
      }
    }

    // Special case: if at bottom of page, highlight last section
    if (scrollY + windowHeight >= document.documentElement.scrollHeight - 10) {
      currentSectionId = sections[sections.length - 1]?.id;
    }

    // Update active class on nav links
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkSectionId = href && href.startsWith('#') ? href.substring(1) : null;

      if (linkSectionId === currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Refresh navigation system (useful if DOM structure changes)
   */
  function refresh() {
    updateSections();
    updateStickyState();
    updateActiveNavItem();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded
    init();
  }

  // Expose public API
  window.NavigationManager = {
    refresh,
    smoothScrollTo,
    updateSections
  };

})();
