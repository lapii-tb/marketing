const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');
const socials = document.querySelector('.social-icons');

// --- Desktop language dropdown ---
const langIcon = document.querySelector('.social-language');

// --- Mobile language dropdown ---
const mobileLang = document.querySelector('.language-select-mobile');

if (toggle && menu && socials) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    socials.classList.toggle('active');
  });
}

// --- Desktop dropdown (unchanged from your working code) ---
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

// --- Mobile dropdown ---
if (mobileLang) {
  const btn = mobileLang.querySelector('.lang-btn');
  const items = mobileLang.querySelectorAll('.language-dropdown-mobile li');

  // Detect current language
  const currentLang = window.location.href.includes('index_cn.html') ? 'zh-CN' : 'en';

  // Set button text
  btn.innerHTML = (currentLang === 'en' ? 'English' : '中文') + ' <span class="arrow">▼</span>';

  // Show only alternative language in dropdown
  items.forEach(item => {
    item.style.display = item.dataset.lang === currentLang ? 'none' : 'block';
  });

  // Toggle dropdown
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileLang.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileLang.contains(e.target)) {
      mobileLang.classList.remove('active');
    }
  });

  // Handle selecting a language
  items.forEach(item => {
    const link = item.querySelector('a');
    link.addEventListener('click', () => {
      btn.innerHTML = link.textContent + ' <span class="arrow">▼</span>';
      mobileLang.classList.remove('active');

      // Swap visibility: hide selected, show other
      items.forEach(li => {
        li.style.display = li.dataset.lang === link.dataset.lang ? 'none' : 'block';
      });
    });
  });
}
