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

// Close menu when clicking overlay
mobileMenuOverlay.addEventListener("click", closeMenu);

// Close menu when clicking a link
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Countdown Timer - Set target date to World Cup 2026 (June 11, 2026)
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

// Provider logos - simple provider names
const providerLogos = [
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

// Populate provider logos
const providersPath = "assets/icons/providers/";
const logosContainer = document.getElementById("provider-logos");
providerLogos.forEach((name) => {
  const img = document.createElement("img");
  img.src = `${providersPath}${name}.png`;
  img.alt = name;
  img.className = "provider-logo";
  logosContainer.appendChild(img);
});

// Tab functionality
const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! We will contact you soon.");
});
