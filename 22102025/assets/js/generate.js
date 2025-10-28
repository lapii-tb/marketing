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