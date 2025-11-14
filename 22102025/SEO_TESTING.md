# SEO Testing Guide - User Story 3

## Prerequisites

1. Local web server running:
```bash
cd /Users/mazlapii/Projects/wls/568win/22102025
python3 -m http.server 8080
```

2. Required assets created (see ASSETS_REQUIRED.md):
   - og-image.jpg (1200×630px)
   - Favicon files

## Test Cases for T039

### TC1: Basic SEO Meta Tags Validation

**Tool**: View Page Source or Browser DevTools

1. Open `http://localhost:8080/index.html`
2. View Page Source (Ctrl+U or Cmd+Option+U)
3. Verify presence of all meta tags in `<head>`:

**Required Meta Tags**:
```html
✓ <meta charset="UTF-8">
✓ <meta name="viewport" content="width=device-width, initial-scale=1.0">
✓ <meta name="description" content="..."> (150-160 chars)
✓ <meta name="keywords" content="...">
✓ <meta name="author" content="568Win">
✓ <meta name="robots" content="index, follow">
✓ <title>568Win - Premier iGaming API Aggregator Platform</title> (50-60 chars)
```

**Pass Criteria**:
- ✅ All meta tags present
- ✅ Title length: 50-60 characters
- ✅ Description length: 150-160 characters
- ✅ No duplicate meta tags

### TC2: Open Graph Tags Validation

**Tools**: Facebook Sharing Debugger, View Source

1. **Local Testing** (View Source):
   - Verify all og: tags present in `<head>`

**Required Open Graph Tags**:
```html
✓ <meta property="og:title" content="568Win | iGaming API Aggregator Platform">
✓ <meta property="og:description" content="...">
✓ <meta property="og:type" content="website">
✓ <meta property="og:url" content="https://www.568win.best/index.html">
✓ <meta property="og:image" content="https://www.568win.best/assets/image/og-image.jpg">
✓ <meta property="og:image:width" content="1200">
✓ <meta property="og:image:height" content="630">
✓ <meta property="og:image:alt" content="568Win iGaming API Aggregator Platform">
✓ <meta property="og:site_name" content="568Win">
✓ <meta property="og:locale" content="en_US">
✓ <meta property="og:locale:alternate" content="zh_CN">
```

2. **Production Testing** (After deployment):
   - Visit: https://developers.facebook.com/tools/debug/
   - Enter URL: `https://www.568win.best/index.html`
   - Click "Scrape Again" to refresh cache
   - Verify preview card displays correctly

**Pass Criteria** (SC-011):
- ✅ All required og: tags present
- ✅ Image dimensions correct (1200×630)
- ✅ Preview card shows correct title, description, image
- ✅ Image loads without errors
- ✅ No warnings in Facebook debugger

### TC3: Twitter Card Tags Validation

**Tools**: Twitter Card Validator, View Source

1. **Local Testing** (View Source):
   - Verify all twitter: tags present

**Required Twitter Card Tags**:
```html
✓ <meta name="twitter:card" content="summary_large_image">
✓ <meta name="twitter:title" content="568Win - iGaming API Aggregator">
✓ <meta name="twitter:description" content="...">
✓ <meta name="twitter:image" content="https://www.568win.best/assets/image/og-image.jpg">
✓ <meta name="twitter:image:alt" content="568Win iGaming API Aggregator Platform">
```

2. **Production Testing** (After deployment):
   - Visit: https://cards-dev.twitter.com/validator
   - Enter URL: `https://www.568win.best/index.html`
   - Verify preview card displays correctly

**Pass Criteria** (SC-012):
- ✅ All twitter: tags present
- ✅ Card type: summary_large_image
- ✅ Preview shows correct title, description, image
- ✅ Image displays properly in Twitter preview
- ✅ No errors in Twitter Card Validator

### TC4: Canonical and Hreflang Tags

**Tool**: View Source

1. Open both pages in separate tabs
2. View source for each

**English Page (index.html)**:
```html
✓ <link rel="canonical" href="https://www.568win.best/index.html">
✓ <link rel="alternate" hreflang="en" href="https://www.568win.best/index.html">
✓ <link rel="alternate" hreflang="zh-CN" href="https://www.568win.best/index_cn.html">
✓ <link rel="alternate" hreflang="x-default" href="https://www.568win.best/index.html">
```

**Chinese Page (index_cn.html)**:
```html
✓ <link rel="canonical" href="https://www.568win.best/index_cn.html">
✓ <link rel="alternate" hreflang="en" href="https://www.568win.best/index.html">
✓ <link rel="alternate" hreflang="zh-CN" href="https://www.568win.best/index_cn.html">
✓ <link rel="alternate" hreflang="x-default" href="https://www.568win.best/index.html">
```

**Pass Criteria**:
- ✅ Canonical URL matches current page
- ✅ Hreflang tags present on both pages
- ✅ x-default points to English version
- ✅ Bidirectional linking (each page links to other)

### TC5: JSON-LD Structured Data

**Tools**: Google Rich Results Test, View Source

1. **Local Testing** (View Source):
   - Find `<script type="application/ld+json">` in `<head>`
   - Copy JSON content
   - Validate at: https://jsonlint.com

**Required JSON-LD Structure**:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "568Win",
  "url": "https://www.568win.best",
  "logo": "https://www.568win.best/assets/image/568win.png",
  "description": "...",
  "sameAs": [
    "https://www.instagram.com/sbobet_568win_asia",
    "https://t.me/sbo568winmk"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "url": "https://www.568win.best/API.html"
  }
}
```

2. **Production Testing**:
   - Visit: https://search.google.com/test/rich-results
   - Enter URL: `https://www.568win.best/index.html`
   - Verify schema validation passes

**Pass Criteria**:
- ✅ Valid JSON syntax
- ✅ Organization schema recognized
- ✅ All required properties present
- ✅ No validation errors in Rich Results Test
- ✅ Social media profiles linked correctly

### TC6: Favicon and App Icons

**Tool**: Browser DevTools, View Source

1. **Desktop Browser**:
   - Open `http://localhost:8080/index.html`
   - Check browser tab for favicon
   - Expected: 568Win logo visible

2. **Inspect Links**:
```html
✓ <link rel="icon" type="image/x-icon" href="assets/image/icons/favicon.ico">
✓ <link rel="icon" type="image/png" sizes="32x32" href="assets/image/icons/favicon-32x32.png">
✓ <link rel="icon" type="image/png" sizes="16x16" href="assets/image/icons/favicon-16x16.png">
✓ <link rel="apple-touch-icon" sizes="180x180" href="assets/image/icons/apple-touch-icon.png">
✓ <link rel="manifest" href="assets/image/icons/site.webmanifest">
```

3. **Test App Manifest**:
   - Visit: `http://localhost:8080/assets/image/icons/site.webmanifest`
   - Verify JSON is valid and contains correct values

**Pass Criteria**:
- ✅ Favicon links present in HTML
- ✅ site.webmanifest file exists and is valid JSON
- ✅ Manifest references correct icon files
- ✅ Icons display correctly when created

### TC7: Lighthouse SEO Audit (SC-002)

**Tool**: Chrome DevTools Lighthouse

**Requirement**: Lighthouse SEO score ≥95

1. Open Chrome DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Select:
   - ✓ SEO (uncheck others for focused test)
   - ✓ Desktop or Mobile
   - ✓ Clear storage (optional)
4. Click "Analyze page load"
5. Wait for report

**Expected SEO Checks** (all should pass):
- ✓ Document has a `<title>` element
- ✓ Document has a meta description
- ✓ Page has successful HTTP status code
- ✓ Links have descriptive text
- ✓ Document has a valid `rel=canonical`
- ✓ Document has a meta viewport tag
- ✓ Document has a valid hreflang
- ✓ Page isn't blocked from indexing
- ✓ robots.txt is valid
- ✓ Image elements have [alt] attributes
- ✓ Links are crawlable
- ✓ Structured data is valid

**Pass Criteria**:
- ✅ SEO Score: **≥95** (target: 100)
- ✅ All SEO checks pass
- ✅ No critical issues
- ✅ Meta description length appropriate

### TC8: Multi-Language SEO

**Test**: Verify both language versions have correct SEO metadata

1. **English Version** (`index.html`):
   - Title in English
   - Description in English
   - OG/Twitter content in English
   - og:locale = "en_US"
   - lang="en" on `<html>`

2. **Chinese Version** (`index_cn.html`):
   - Title in Chinese
   - Description in Chinese
   - OG/Twitter content in Chinese
   - og:locale = "zh_CN"
   - lang="zh-CN" on `<html>`

3. **Cross-Linking**:
   - Both pages have hreflang to each other
   - Both pages have same hreflang structure

**Pass Criteria**:
- ✅ Content language matches metadata language
- ✅ No mixed language in meta tags
- ✅ Hreflang tags consistent across both pages
- ✅ Locale values correct (en_US, zh_CN)

### TC9: Dynamic Meta Tag Updates (Language Switching)

**Test**: Verify meta tags update when language switches

**Note**: The language.js already updates dynamic meta tags via `updateMetaTags()` function.

1. Open `http://localhost:8080/index.html` (English)
2. Open DevTools > Elements
3. Inspect `<title>` and meta tags in `<head>`
4. Click "CN" language switcher button
5. Observe meta tag changes in real-time

**Expected Changes**:
- ✅ `<title>` changes to Chinese
- ✅ `<meta name="description">` changes to Chinese
- ✅ OG tags update to Chinese content
- ✅ Twitter tags update to Chinese content
- ✅ `<html lang>` attribute changes to "zh-CN"

**Pass Criteria**:
- ✅ All meta tags update dynamically
- ✅ No page reload required
- ✅ Changes happen instantly (<100ms)
- ✅ No JavaScript errors in console

### TC10: Sitemap and Robots.txt

**Test**: Verify SEO files are accessible

1. **robots.txt**:
   - Visit: `http://localhost:8080/robots.txt`
   - Should be accessible (200 OK)
   - Content should include:
     ```
     User-agent: *
     Allow: /
     Sitemap: https://www.568win.best/sitemap.xml
     ```

2. **sitemap.xml**:
   - Visit: `http://localhost:8080/sitemap.xml`
   - Should be accessible (200 OK)
   - Should be valid XML
   - Should list both pages (index.html, index_cn.html)
   - Should include hreflang annotations

**Pass Criteria**:
- ✅ robots.txt exists and is accessible
- ✅ sitemap.xml exists and is valid XML
- ✅ Sitemap includes both language versions
- ✅ Sitemap has correct hreflang attributes
- ✅ URLs use production domain

---

## Summary of Success Criteria

### SC-002: Lighthouse SEO Score ≥95
**Status**: Test with Chrome Lighthouse
**Target**: Score 95-100

### SC-011: Facebook Sharing Debugger Validation
**Status**: Test after deployment
**Tool**: https://developers.facebook.com/tools/debug/
**Target**: No errors, correct preview

### SC-012: Twitter Card Validator Validation
**Status**: Test after deployment
**Tool**: https://cards-dev.twitter.com/validator
**Target**: No errors, correct preview

---

## Known Limitations

### Assets Pending Manual Creation
- ⚠️ **og-image.jpg** - Required for social media previews (see ASSETS_REQUIRED.md)
- ⚠️ **Favicon files** - Required for browser tabs and bookmarks (see ASSETS_REQUIRED.md)

These assets are referenced in HTML but need manual creation. The site will function without them, but social media sharing and favicon display will be incomplete.

### Production-Only Tests
- Facebook Sharing Debugger requires public URL
- Twitter Card Validator requires public URL
- Google Rich Results Test requires public URL

These tests can only be performed after deployment to production server.

---

## Next Steps

After T039 testing is complete:
1. Phase 5 (User Story 3 - SEO) is complete ✅
2. Phase 6: Performance optimization (T040-T056)
3. Phase 7-9: Visual design, HTML structure, polish
