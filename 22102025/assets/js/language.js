/**
 * Language switching and locale management
 * Implements FR-002, FR-003 for multi-language support
 */

(function() {
  'use strict';

  const DEFAULT_LANG = 'en';
  const LOCALE_PATH = '/locale/';
  const STORAGE_KEY = 'preferredLang';

  let currentLocale = null;
  let currentLang = DEFAULT_LANG;

  /**
   * Load locale data from JSON file
   * @param {string} lang - Language code (en, zh-CN)
   * @returns {Promise<Object>} Locale data object
   */
  async function loadLocale(lang) {
    try {
      const response = await fetch(`${LOCALE_PATH}${lang}.json`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to load locale ${lang}:`, error);

      // Fallback to English if loading fails and not already English
      if (lang !== DEFAULT_LANG) {
        console.warn(`Falling back to ${DEFAULT_LANG}`);
        return loadLocale(DEFAULT_LANG);
      }

      // If even English fails, return empty object
      return {
        meta: {},
        navigation: {},
        sections: {},
        common: {}
      };
    }
  }

  /**
   * Get nested value from object using dot notation path
   * @param {Object} obj - Source object
   * @param {string} path - Dot notation path (e.g., "sections.banner.title")
   * @returns {*} Value at path or undefined
   */
  function getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => {
      return current && current[prop] !== undefined ? current[prop] : undefined;
    }, obj);
  }

  /**
   * Update all elements with data-i18n attributes
   * @param {Object} localeData - Locale data object
   */
  function updateContent(localeData) {
    const elements = document.querySelectorAll('[data-i18n]');
    let updatedCount = 0;

    elements.forEach(element => {
      const key = element.dataset.i18n;
      const value = getNestedValue(localeData, key);

      if (value !== undefined) {
        // Update text content
        element.textContent = value;
        updatedCount++;
      } else {
        console.warn(`Translation key not found: ${key}`);
      }
    });

    console.log(`Updated ${updatedCount} elements with locale data`);
  }

  /**
   * Update document meta tags with locale-specific values
   * @param {Object} metaData - Meta section from locale data
   */
  function updateMetaTags(metaData) {
    if (!metaData) return;

    // Update title
    if (metaData.title) {
      document.title = metaData.title;
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && metaData.description) {
      metaDesc.content = metaData.description;
    }

    // Update Open Graph tags
    if (metaData.ogTitle) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.content = metaData.ogTitle;
    }

    if (metaData.ogDescription) {
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.content = metaData.ogDescription;
    }

    // Update Twitter Card tags
    if (metaData.twitterTitle) {
      const twitterTitle = document.querySelector('meta[name="twitter:title"]') ||
                          document.querySelector('meta[property="twitter:title"]');
      if (twitterTitle) twitterTitle.content = metaData.twitterTitle;
    }

    if (metaData.twitterDescription) {
      const twitterDesc = document.querySelector('meta[name="twitter:description"]') ||
                         document.querySelector('meta[property="twitter:description"]');
      if (twitterDesc) twitterDesc.content = metaData.twitterDescription;
    }
  }

  /**
   * Switch to a different language
   * @param {string} lang - Language code to switch to
   * @param {boolean} savePreference - Whether to save preference to localStorage
   * @returns {Promise<void>}
   */
  async function switchLanguage(lang, savePreference = true) {
    try {
      // Show loading indicator if it exists
      const loadingIndicator = document.getElementById('language-loading');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
      }

      // Store current scroll position
      const scrollY = window.scrollY || window.pageYOffset;

      // Load locale data
      const startTime = performance.now();
      const localeData = await loadLocale(lang);
      const loadTime = performance.now() - startTime;

      console.log(`Loaded ${lang} locale in ${loadTime.toFixed(2)}ms`);

      // Update content
      updateContent(localeData);

      // Update meta tags
      updateMetaTags(localeData.meta);

      // Update current language
      currentLocale = localeData;
      currentLang = lang;

      // Update html lang attribute
      document.documentElement.lang = lang;

      // Save preference if requested
      if (savePreference) {
        try {
          localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
          console.warn('Could not save language preference:', e);
        }
      }

      // Restore scroll position
      window.scrollTo(0, scrollY);

      // Hide loading indicator
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }

      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('languagechange', {
        detail: { lang, locale: localeData }
      }));

      console.log(`Language switched to: ${lang}`);
    } catch (error) {
      console.error('Language switch failed:', error);

      // Show error message to user
      alert('Failed to load language. Please try again or refresh the page.');
    }
  }

  /**
   * Initialize language system on page load
   */
  async function init() {
    try {
      // Determine initial language
      let initialLang = DEFAULT_LANG;

      // Check localStorage for saved preference
      try {
        const savedLang = localStorage.getItem(STORAGE_KEY);
        if (savedLang) {
          initialLang = savedLang;
        }
      } catch (e) {
        console.warn('Could not access localStorage:', e);
      }

      // Check if page URL indicates language (index_cn.html = Chinese)
      const path = window.location.pathname;
      if (path.includes('index_cn')) {
        initialLang = 'zh-CN';
      } else if (path.includes('index')) {
        initialLang = 'en';
      }

      // Load initial language
      await switchLanguage(initialLang, false);

      console.log('Language system initialized');
    } catch (error) {
      console.error('Language initialization failed:', error);
    }
  }

  /**
   * Get current language code
   * @returns {string} Current language code
   */
  function getCurrentLanguage() {
    return currentLang;
  }

  /**
   * Get current locale data
   * @returns {Object|null} Current locale data
   */
  function getCurrentLocale() {
    return currentLocale;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded
    init();
  }

  // Expose public API
  window.LanguageManager = {
    switchLanguage,
    getCurrentLanguage,
    getCurrentLocale,
    loadLocale
  };

})();
