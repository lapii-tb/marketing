document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offset = 50;
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - offset;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  });
});
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

function toggleMenu() {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  mobileMenuOverlay.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

function closeMenu() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", toggleMenu);

mobileMenuOverlay.addEventListener("click", closeMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const targetDate = new Date("2026-06-11T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = tabCategoryMap[btn.textContent.trim()];
    if (category) {
      renderProviders(category);
    }
  });
});

function toggleDesktopLangDropdown() {
  const langSwitcher = document.querySelector(".desktop-lang-switcher");
  langSwitcher.classList.toggle("active");
}
function toggleLangDropdown() {
  const langSwitcher = document.querySelector(".lang-switcher");
  langSwitcher.classList.toggle("active");
}

function toggleCategory(element, category) {
  document.querySelectorAll('.category-button').forEach(btn => {
    btn.classList.remove('active');
  });
  element.classList.add('active');
  const container = document.querySelector('.providers');
  if (container && category === 'slots') {
    container.classList.add('large-height-render');
  } else if (container) {
    container.classList.remove('large-height-render');
  }
  document.querySelectorAll('.default-render, .sports-render, .slots-render, .dealers-render, .fishings-render').forEach(container => {
    container.style.display = 'none';
  });
  const targetContainer = document.querySelector('.' + category + '-render');
  if (targetContainer) {
    targetContainer.style.display = 'flex';
  }
}


const popupElement = document.querySelector('.thank-you-popup');

function showPopup() {
  if (popupElement) {
    popupElement.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function hidePopup() {
  if (popupElement) {
    popupElement.classList.remove('show');
    document.body.style.overflow = '';
  }
}

const getStartedBtn = document.querySelector('.show-popup-btn');
getStartedBtn.addEventListener('click', showPopup);

if (popupElement) {
  const closeBtn = popupElement.querySelector('#close-popup-btn');
  closeBtn.addEventListener('click', hidePopup);

  window.addEventListener('click', (event) => {
    if (event.target === popupElement) {
      hidePopup();
    }
  });
}


const dowloadHandbookBtn = document.getElementById('download-handbook');
const langSelector = document.querySelector('html').getAttribute('lang') || 'en';
dowloadHandbookBtn.addEventListener('click', async () => {
  const pdfUrl = `assets/docs/${langSelector}/handbook.pdf`;
  const fileName = `handbook-${new Date().toISOString().split('T')[0]}.pdf`;

  try {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
    hidePopup();
  } catch (error) {
    console.error('Download failed:', error);
    window.open(pdfUrl, '_blank');
  }
});