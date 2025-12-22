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
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            "name": "Sportsbook API Aggregator for 2026 World Cup",
            "description": "Get your website ready for the 2026 World Cup with a single API. Access 80+ game providers, real-time odds, and seamless integration for all sportsbook and virtual sports bets.",
            "brand": {
              "@type": "Brand",
              "name": "568Win"
            },
            "slogan": "YOUR 2026 WORLD CUP IN ONE CLICK",
            "category": "Software > API",
            "audience": {
              "@type": "Audience",
              "audienceType": "Business",
              "name": "Sportsbook Operators & iGaming Platforms"
            }
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How to integrate our API?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "我們提供詳細的技術文件和 24/7 技術支援，多數客戶可以在 1-3 天內完成整合。"
                }
              },
              {
                "@type": "Question",
                "name": "What is your pricing model?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "我們提供彈性的定價方案，包含月費制和依流量計費。請聯繫我們的業務團隊以取得客製化報價。"
                }
              },
              {
                "@type": "Question",
                "name": "Which sports are covered?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "我們的 API 涵蓋所有主流體育賽事，包括足球（世界盃、歐洲冠軍聯賽）、籃球、網球、棒球以及虛擬體育等。"
                }
              },
              {
                "@type": "Question",
                "name": "How do I get a demo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "您可以點擊頁面上的「Demo」按鈕，或填寫下方的聯繫表單，我們的專員會立即與您安排線上產品演示。"
                }
              }
            ]
          }
        ]
      }
    </script>
  </head>
  <body>{CONTENT}
  <script src="assets/js/menu.js"></script>
  <script src="assets/js/counter.js"></script>
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

      document.querySelectorAll('.sports-render, .slots-render, .dealers-render, .fishings-render').forEach(container => {
        container.style.display = 'none';
      });
      const defaultRender = document.querySelector('.default-render');
      if (defaultRender) {
        defaultRender.style.display = 'flex';
      }
    });
    function toggleFaq(element) {
      const answer = element.nextElementSibling;
      const icon = element.querySelector('.faq-icon');
      const parent = element.closest('.faq-item');
      
      // Toggle active class
      answer.classList.toggle('active');
      parent.classList.toggle('collapsed');
      
      // Smooth height transition
      if (answer.classList.contains('active')) {
        icon.textContent = '×';
        answer.style.maxHeight = '110px';
      } else {
        icon.textContent = '+';
        answer.style.maxHeight = '0px';
      }
    }
    function toggleCategory(element, category) {
      document.querySelectorAll('.category-button').forEach(btn => {
        btn.classList.remove('active');
      });
      element.classList.add('active');
      const container = document.querySelector('.one-api-container');
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
    function handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const name = form.Name.value;
      const email = form.Mail.value;
      const message = form.Message.value;
      
      const subject = '568Win Submission Request - ' + name;
      const body = message + '%0D%0A%0D%0AFrom: ' + name + '%0D%0AEmail: ' + email;
      
      window.location.href = 'mailto:568winmk@568win.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
      form.reset();
    }
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