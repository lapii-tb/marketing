# Testing Instructions for Language Switching Feature

## Prerequisites
- A local web server (Python HTTP server, Live Server extension, or similar)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Setup

1. Start a local web server from the project root:
```bash
cd /Users/mazlapii/Projects/wls/568win/22102025
python3 -m http.server 8080
```

2. Open your browser and navigate to:
   - English page: `http://localhost:8080/index.html`
   - Chinese page: `http://localhost:8080/index_cn.html`

## Test Cases for T017

### TC1: Initial Page Load - English
1. Open `http://localhost:8080/index.html`
2. **Expected Results**:
   - Page loads with English content
   - Navigation menu shows: "Opportunity", "Why Choose", "Features", etc.
   - EN button in language switcher is highlighted (gold color)
   - No console errors

### TC2: Initial Page Load - Chinese
1. Open `http://localhost:8080/index_cn.html`
2. **Expected Results**:
   - Page loads with Chinese content
   - Navigation menu shows: "商机", "选择我们", "功能特色", etc.
   - CN button in language switcher is highlighted (gold color)
   - No console errors

### TC3: Language Switch - English to Chinese
1. Open `http://localhost:8080/index.html`
2. Click the "CN" button in the navigation
3. **Expected Results**:
   - Loading indicator appears briefly (spinner overlay)
   - All navigation text changes to Chinese
   - CN button becomes highlighted (gold color)
   - EN button returns to gray
   - Switch completes in <500ms (check Network tab)
   - No page reload occurs
   - No console errors

### TC4: Language Switch - Chinese to English
1. Open `http://localhost:8080/index_cn.html`
2. Click the "EN" button in the navigation
3. **Expected Results**:
   - Loading indicator appears briefly
   - All navigation text changes to English
   - EN button becomes highlighted (gold color)
   - CN button returns to gray
   - Switch completes in <500ms
   - No page reload occurs
   - No console errors

### TC5: Scroll Position Maintained
1. Open `http://localhost:8080/index.html`
2. Scroll down to approximately 500px from top
3. Click the "CN" button
4. **Expected Results**:
   - Page scroll position remains at ~500px
   - No jump to top or bottom
   - Language switches smoothly

### TC6: localStorage Persistence
1. Open `http://localhost:8080/index.html`
2. Click "CN" to switch to Chinese
3. Refresh the page (F5 or Cmd+R)
4. **Expected Results**:
   - Page loads with Chinese content (last selected language)
   - CN button is highlighted
5. Open Developer Tools > Application > Local Storage > localhost:8080
6. **Expected Results**:
   - Key `preferredLang` exists with value `zh-CN`

### TC7: Multiple Language Switches
1. Open `http://localhost:8080/index.html`
2. Click CN → EN → CN → EN (rapid succession)
3. **Expected Results**:
   - All switches complete successfully
   - Final state shows correct language
   - No errors in console
   - UI remains responsive

### TC8: Browser DevTools Validation
1. Open `http://localhost:8080/index.html`
2. Open Developer Tools (F12)
3. Go to Console tab
4. **Expected Results**:
   - See "Loaded en locale in XXms" message
   - See "Language system initialized" message
   - See "Updated XX elements with locale data" message
   - No error messages
5. Switch language by clicking CN
6. **Expected Results**:
   - See "Loaded zh-CN locale in XXms" message
   - See "Language switched to: zh-CN" message
   - See custom event "languagechange" fired

### TC9: Network Performance
1. Open `http://localhost:8080/index.html`
2. Open Developer Tools > Network tab
3. Click "CN" button
4. **Expected Results**:
   - Single request to `/locale/zh-CN.json`
   - File size < 5KB
   - Load time < 500ms (on local server should be <50ms)
   - Status 200 OK
5. Click "EN" button
6. **Expected Results**:
   - Single request to `/locale/en.json`
   - Similar performance metrics

### TC10: HTML Lang Attribute Updates
1. Open `http://localhost:8080/index.html`
2. Inspect the `<html>` tag in Elements panel
3. **Expected Results**:
   - `lang` attribute is "en"
4. Click "CN" button
5. **Expected Results**:
   - `lang` attribute changes to "zh-CN"

### TC11: Meta Tags Update
1. Open `http://localhost:8080/index.html`
2. View page source or inspect `<head>` section
3. **Expected Results**:
   - `<title>` is "568Win - Premier iGaming API Aggregator Platform"
   - Meta description contains English text
4. Click "CN" button
5. Inspect `<head>` section again
6. **Expected Results**:
   - `<title>` changes to "568Win - 顶级iGaming API聚合平台"
   - Meta description changes to Chinese text

## Success Criteria (from SC-007)
- ✅ Language switch completes in <500ms
- ✅ All translatable content updates correctly
- ✅ Scroll position maintained during switch
- ✅ Loading indicator displays during fetch
- ✅ Active language button highlighted
- ✅ localStorage persists user preference
- ✅ No page reload required
- ✅ No console errors
- ✅ Works on all modern browsers

## Known Limitations
- Language switcher only affects navigation menu text currently
- Content sections (banner, opportunity, etc.) will need data-i18n attributes added in future phases
- Meta tags update dynamically but may not reflect in browser page info until reload

## Next Steps
After T017 testing is complete, proceed to:
- **Phase 4: User Story 2** - Navigation functionality (T018-T026)
