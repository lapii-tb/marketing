document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  const socials = document.querySelector('.social-icons');
  if (!toggle || !menu || !socials) {
    return;
  }

  // Attach the click event listener
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    socials.classList.toggle('active');
  });
});