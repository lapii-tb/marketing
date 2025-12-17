const hamburgerIcon = document.querySelector(".hamburger-icon");
const hamburgerMenu = document.getElementById("hamburger-menu");
const menuLinks = hamburgerMenu.querySelectorAll("a");

hamburgerIcon.addEventListener("click", (e) => {
  hamburgerMenu.classList.toggle("active");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (!hamburgerMenu.contains(e.target)) {
    hamburgerMenu.classList.remove("active");
  }
});

hamburgerMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerMenu.classList.remove("active");
  });
});
const providerLogos = [
  "assets/images/providers/568win.png",
  "assets/images/providers/AFBCasino.png",
  "assets/images/providers/Aviatrix.png",
  "assets/images/providers/BigGaming.png",
  "assets/images/providers/EvolutionGaming.png",
  "assets/images/providers/Fachai.png",
  "assets/images/providers/FunkyGame.png",
  "assets/images/providers/Habanero.png",
  "assets/images/providers/JDB.png",
  "assets/images/providers/MicroGaming.png",
  "assets/images/providers/PandaSport.png",
  "assets/images/providers/PG.png",
  "assets/images/providers/PlayAce.png",
  "assets/images/providers/Playtech.png",
  "assets/images/providers/Pragmaticplay.png",
  "assets/images/providers/RelaxGaming.png",
  "assets/images/providers/SabaSport.png",
  "assets/images/providers/SBObet.png",
  "assets/images/providers/SexyGaming.png",
  "assets/images/providers/Yggdrasil.png",
  "assets/images/providers/YGR.png",
];
const elProviderLogo = document.querySelector(".provider-logos");
if (elProviderLogo) {
  providerLogos.forEach((logoPath) => {
    const img = document.createElement("img");
    img.src = logoPath;
    img.alt = "Provider Logo";
    img.className = "provider-logo";
    elProviderLogo.appendChild(img);
  });
}

const navbar = document.querySelector(".navbar-container");
const mobileNavbar = document.querySelector(".mobile-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    mobileNavbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
    mobileNavbar.classList.remove("scrolled");
  }
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
