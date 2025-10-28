
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');
const socials = document.querySelector('.social-icons');
const langIcon = document.querySelector('.social-language');

if (toggle && menu && socials) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    socials.classList.toggle('active');
  });
}

if (langIcon) {
  langIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    langIcon.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!langIcon.contains(e.target)) {
      langIcon.classList.remove('active');
    }
  });
}
