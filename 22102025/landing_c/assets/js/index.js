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

const providersByCategory = {
  slots: [
    "Pragmaticplay",
    "PGSoft",
    "Jili",
    "Spribe",
    "Yggdrasil",
    "MicroGaming",
    "Playtech",
  ],
  sports: [
    "SBObet",
    "568Win",
    "SabaSports",
    "PandaSports",
    "BTISports",
  ],
  "fishing-arcade": [
    "FunkyGames",
    "Aviatrix",
    "Jili",
    "Spribe",
  ],
  "live-dealer": [
    "Evolution",
    "SexyGaming",
    "BigGaming",
    "SAGaming",
    "Pragmaticplay",
    "Playtech",
  ],
};

const allProviders = [
  "SBObet",
  "568Win",
  "SabaSports",
  "PandaSports",
  "BTISports",
  "FunkyGames",
  "Aviatrix",
  "Evolution",
  "Pragmaticplay",
  "SexyGaming",
  "Jili",
  "Spribe",
  "Yggdrasil",
  "BigGaming",
  "Playtech",
  "PGSoft",
  "SAGaming",
  "MicroGaming",
];

const tabCategoryMap = {
  // English
  "Slots": "slots",
  "Sports": "sports",
  "Fishing / Arcade": "fishing-arcade",
  "Live Dealer": "live-dealer",
  // Chinese
  "老虎机": "slots",
  "体育": "sports",
  "捕鱼 / 街机": "fishing-arcade",
  "真人荷官": "live-dealer",
};

const providersPath = "assets/icons/providers/";
const logosContainer = document.getElementById("provider-logos");

function renderProviders(category) {
  logosContainer.innerHTML = "";
  const providers = category === "all" ? allProviders : (providersByCategory[category] || []);
  providers.forEach((name) => {
    const img = document.createElement("img");
    img.src = `${providersPath}${name}.png`;
    img.alt = name;
    img.className = "provider-logo";
    logosContainer.appendChild(img);
  });
}

renderProviders("all");

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

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! We will contact you soon.");
});

function toggleLangDropdown() {
  const langSwitcher = document.querySelector(".lang-switcher");
  langSwitcher.classList.toggle("active");
}

document.addEventListener("click", (e) => {
  const langSwitcher = document.querySelector(".lang-switcher");
  if (langSwitcher && !langSwitcher.contains(e.target)) {
    langSwitcher.classList.remove("active");
  }
});
