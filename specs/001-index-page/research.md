# Research: Multi-Language Landing Page Implementation

**Created**: 2025-11-13
**Purpose**: Document technical decisions, design tokens, and implementation patterns

## Design Tokens Extraction

**Figma Source**: https://www.figma.com/design/dJcCSUD5YqppoUPzXXth2o/API-Landing-Page?node-id=51-236&p=f&t=KhOZJQh4YOUdc6Q3-0

### Extraction Instructions

1. Open Figma file (requires authentication)
2. Select each frame/component
3. Use Inspect panel (right sidebar) to copy values
4. Document all tokens below
5. Add to `assets/css/style.css` as CSS custom properties

### Color Palette

Based on existing site analysis (to be verified against Figma):

```css
:root {
  /* Primary Colors */
  --color-primary: #FFD700;           /* Gold - primary brand color */
  --color-primary-dark: #FFC700;      /* Darker gold for hover states */
  --color-primary-light: #FFED4E;     /* Lighter gold for accents */

  /* Secondary Colors */
  --color-secondary: #1A1A2E;         /* Dark blue/navy - backgrounds */
  --color-secondary-light: #16213E;   /* Lighter navy */

  /* Neutral Colors */
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-gray-100: #F5F5F5;
  --color-gray-200: #E0E0E0;
  --color-gray-300: #BDBDBD;
  --color-gray-600: #757575;
  --color-gray-800: #424242;
  --color-gray-900: #212121;

  /* Semantic Colors */
  --color-success: #4CAF50;
  --color-error: #F44336;
  --color-warning: #FF9800;
  --color-info: #2196F3;

  /* Text Colors */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A0A0A0;
  --color-text-muted: #666666;
}
```

**Action Required**: Verify all hex values against Figma design and update if different.

### Typography Scale

```css
:root {
  /* Font Families (update with actual fonts from Figma) */
  --font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  --font-family-heading: var(--font-family-primary);

  /* Font Sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
  --font-size-5xl: 48px;
  --font-size-6xl: 60px;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2;

  /* Letter Spacing */
  --letter-spacing-tight: -0.05em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;
}
```

**Action Required**: Extract exact values from Figma for each heading level (H1-H6) and body text.

### Spacing Scale

```css
:root {
  /* Spacing (8px base system) */
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* Container Max Widths */
  --container-xs: 320px;
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

### Responsive Breakpoints

```css
/* Breakpoints (use in media queries) */
--breakpoint-mobile: 320px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1280px;

/* Usage in media queries */
@media (min-width: 768px) {  /* Tablet and up */
@media (min-width: 1024px) {  /* Desktop and up */
```

### Component Dimensions

**To be extracted from Figma:**
- Navigation height: 60px (sticky position)
- Button heights: Small (32px), Medium (40px), Large (48px)
- Button padding: 12px 24px
- Card border-radius: 8px
- Input heights: 44px (mobile touch target minimum)

## Technology Decisions

### 1. Lazy Loading: Native HTML Attribute

**Decision**: Use `<img loading="lazy">` attribute
**Rationale**:
- Widely supported (Chrome 77+, Firefox 75+, Safari 15.4+)
- Zero JavaScript required
- Aligns with lightweight principle
- Automatic performance optimization

**Implementation**:
```html
<img src="/assets/image/opportunity.jpg"
     alt="Opportunity section"
     loading="lazy"
     width="1920"
     height="1080">
```

**Fallback**: Not needed - target browsers all support native lazy loading

### 2. Language Switching: Dynamic DOM Update

**Decision**: Fetch JSON + update text content without full page reload

**Rationale**:
- Better UX (maintains scroll position per FR-003)
- Faster perceived performance (no full page load)
- Saves bandwidth (only JSON fetched, not full HTML)

**Implementation**:
```javascript
async function switchLanguage(lang) {
  try {
    const data = await fetch(`/locale/${lang}.json`).then(r => r.json());
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = getNestedValue(data, el.dataset.i18n);
      if (value) el.textContent = value;
    });
    localStorage.setItem('preferredLang', lang);
    updateMetaTags(data.meta);
  } catch (error) {
    console.error('Language switch failed:', error);
    // Fallback: reload page with language parameter
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}
```

**Progressive Enhancement**: Separate HTML files (index.html, index_cn.html) for no-JS users

### 3. SEO Meta Tags: Language-Specific Templates

**Decision**: Each HTML file has unique meta tags for its language

**Rationale**:
- Improves search engine relevance for language-specific queries
- Better social media sharing (language-appropriate previews)
- Hreflang tags enable proper multilingual SEO

**Implementation**:
- index.html: English meta tags, `lang="en"`, hreflang alternate to Chinese
- index_cn.html: Chinese meta tags, `lang="zh-CN"`, hreflang alternate to English
- Dynamic meta update on language switch (via seo.js)

### 4. Critical CSS: Inline Above-Fold Styles

**Decision**: Inline critical CSS in `<head>`, load full CSS asynchronously

**Rationale**:
- Improves First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
- Eliminates render-blocking CSS for above-fold content
- Meets performance target (<3s load on 3G)

**Method**:
1. Use Chrome DevTools Coverage tool to identify critical CSS
2. Extract ~5-10KB of above-fold styles
3. Inline in `<style>` tag in `<head>`
4. Load full CSS with `media="print" onload="this.media='all'"`

**Example**:
```html
<head>
  <style>
    /* Critical CSS: navigation, hero, above-fold content */
    .navbar { /* ... */ }
    .banner-container { /* ... */ }
  </style>
  <link rel="stylesheet" href="/assets/css/style.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="/assets/css/style.css"></noscript>
</head>
```

### 5. Image Format: WebP with JPEG Fallback

**Decision**: Use `<picture>` element with WebP source + JPEG fallback

**Rationale**:
- WebP provides ~30% smaller file sizes vs JPEG
- Maintains universal browser compatibility with JPEG fallback
- Reduces page weight significantly (helps meet <1MB target)

**Implementation**:
```html
<picture>
  <source srcset="/assets/image/hero.webp" type="image/webp">
  <source srcset="/assets/image/hero.jpg" type="image/jpeg">
  <img src="/assets/image/hero.jpg"
       alt="568Win iGaming Platform"
       width="1920"
       height="1080"
       loading="eager">
</picture>
```

**Conversion**: Use tools like Squoosh, cwebp CLI, or ImageMagick to generate WebP versions

### 6. Smooth Scrolling: CSS + JS Fallback

**Decision**: CSS `scroll-behavior: smooth` with JS polyfill for Safari

**Implementation**:
```css
html {
  scroll-behavior: smooth;
}
```

```javascript
// Polyfill for older Safari
function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
```

## Alternatives Considered

### Alternative 1: Use React/Vue Framework
**Rejected**: Violates Constitution Principle I (Vanilla HTML/CSS/JS)
**Impact**: Would add 50-150KB bundle size, require build tools, increase complexity

### Alternative 2: Server-Side Rendering (SSR)
**Rejected**: Spec assumes static hosting, no backend available
**Impact**: Would require Node.js server, increase hosting costs, add complexity

### Alternative 3: Single HTML with JS Template System
**Rejected**: Poor SEO (empty shell), bad no-JS fallback
**Impact**: Search engines see no content, accessibility suffers

### Alternative 4: CSS Preprocessor (SASS/LESS)
**Rejected**: Violates Constitution Principle I (no build tools)
**Impact**: Would require compilation step, more complex deployment

## Best Practices Applied

1. **Semantic HTML5**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
2. **Progressive Enhancement**: Core content works without JS, JS enhances UX
3. **Mobile-First CSS**: Base styles for mobile, media queries add desktop styles
4. **BEM CSS Naming**: `.block__element--modifier` for clear component structure
5. **Accessibility**: ARIA labels, keyboard navigation, alt text, semantic markup
6. **Performance**: Lazy loading, critical CSS, optimized images, minimal JS
7. **SEO**: Complete meta tags, structured data, semantic markup, fast load times

## Implementation Priorities

### Phase 1: Foundation (Must Have)
1. Extract and implement design tokens from Figma
2. Update HTML structure with semantic elements and SEO meta tags
3. Implement locale loading and language switching
4. Add sticky navigation and smooth scrolling

### Phase 2: Visual Parity (Must Have)
1. Apply Figma design pixel-perfectly to all components
2. Implement responsive breakpoints
3. Add hover states and interactive elements
4. Optimize images (compress, generate WebP variants)

### Phase 3: Performance (Must Have)
1. Inline critical CSS
2. Implement lazy loading for below-fold images
3. Minify CSS/JS (optional but recommended)
4. Validate Lighthouse scores meet targets

### Phase 4: Polish (Nice to Have)
1. Add loading animations/transitions
2. Enhance error handling
3. Add analytics tracking points (if required)
4. Final cross-browser testing and fixes

## Risk Mitigation

**Risk 1**: Figma design tokens differ from existing site
**Mitigation**: Create side-by-side comparison, get stakeholder approval before full implementation

**Risk 2**: Performance targets not met on first attempt
**Mitigation**: Use Chrome DevTools Performance panel to identify bottlenecks, apply optimizations iteratively

**Risk 3**: Language switching breaks on edge cases
**Mitigation**: Comprehensive error handling, fallback to page reload if JSON fails

**Risk 4**: Cross-browser incompatibilities discovered late
**Mitigation**: Test on multiple browsers early and often, use caniuse.com for feature support verification
