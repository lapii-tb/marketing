const fs = require('fs');
const path = require('path');

const { components } = require('./page.js');
const { languages } = require('./language.js');

const TEMPLATE = `<!DOCTYPE html>
  <html lang="{LANG}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{TITLE}</title>
    {CSS_LINKS}
  </head>
  <body>{CONTENT}
  <script>
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 60) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    });
    document.addEventListener('DOMContentLoaded', function() {
      const faqItems = document.querySelectorAll('.faq-item');

      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close all other FAQ items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });

          // Toggle current item
          if (isActive) {
            item.classList.remove('active');
          } else {
            item.classList.add('active');
          }
        });
      });

      // Smooth scroll for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });

      // Add scroll animation for cards
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);

      // Observe all cards for animation
      document.querySelectorAll('.feature-card, .market-card, .faq-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
      });
    });
  </script>
  </body>
</html>`;

function replaceLocaleKeys(content, locale) {
  let translatedContent = content;

  Object.keys(locale).forEach(key => {
    const placeholder = `{${key}}`;
    const regex = new RegExp(placeholder, 'g');
    translatedContent = translatedContent.replace(regex, locale[key]);
  });
  return translatedContent;
}

function generateHTML() {
  console.log('HTML generating ...');
  languages.forEach(lang => {
    let contentHTML = '';
    const LINKS = ['<link rel="stylesheet" href="assets/css/style.css">'];
    components.forEach((component, index) => {
      try {
        const componentPath = component;
        const fullPath = path.resolve(__dirname, componentPath);
        if (fs.existsSync(fullPath)) {
          let CONTENT = fs.readFileSync(fullPath, 'utf8');
          CONTENT = replaceLocaleKeys(CONTENT, lang.locale);
          const PREFIX = index === 0 ? '\n' : '';
          const BREAKE = components.length !== index + 1;
          contentHTML += PREFIX + '    ' + CONTENT.trim() + (BREAKE ? '\n' : '');
          const NAMED = path.basename(component, '.html');
          LINKS.push(`    <link rel="stylesheet" href="assets/css/${NAMED}.css">`);
        }
      } catch (error) {
        console.error(`✗ Error reading ${component}:`, error.message);
      }
    });

    const outputPath = path.resolve(__dirname, `../../${lang.file}`);
    const finalHTML = TEMPLATE
      .replace('{CONTENT}', contentHTML)
      .replace('{LANG}', lang.code)
      .replace('{TITLE}', lang.locale.title)
      .replace('{CSS_LINKS}', LINKS.join('\n'));

    try {
      fs.writeFileSync(outputPath, finalHTML, 'utf8');
      console.log(`✓ Generated HTML with ${components.length} components`);
    } catch (error) {
      console.error('✗ Error writing index.html:', error.message);
    }
  });
}

if (require.main === module) {
  generateHTML();
}

module.exports = { generateHTML, components };