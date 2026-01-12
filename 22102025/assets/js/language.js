const fs = require('fs');
const path = require('path');

function loadLocale(langCode) {
  try {
    const localePath = path.resolve(__dirname, `../../locale/${langCode}.json`);
    return JSON.parse(fs.readFileSync(localePath, 'utf8'));
  } catch (error) {
    console.warn(`Warning: Could not load locale ${langCode}.json`);
    return {};
  }
}

const languages = [
  { 
    code: 'en',
    file: 'index.html',
    locale: loadLocale('en')
  },
  { 
    code: 'zh-CN',
    file: 'index_cn.html',
    locale: loadLocale('zh-CN')
  },
  { 
    code: 'vi-VN',
    file: 'index_vn.html',
    locale: loadLocale('vi-VN')
  }
];

module.exports = { languages };