<!--
SYNC IMPACT REPORT
==================
Version Change: N/A → 1.0.0
Change Type: Initial constitution creation
Ratification Date: 2025-11-13

Modified Principles: N/A (initial creation)

Added Sections:
  - Core Principles (6 principles defined)
    1. Vanilla HTML/CSS/JS Standards (code quality)
    2. Figma Design Fidelity (UX consistency)
    3. SEO & Discoverability (search optimization)
    4. Lightweight & Performance-First (file size optimization)
    5. Component Modularity
    6. Cross-Browser Compatibility
  - Code Quality Standards
  - Governance

Removed Sections: N/A

Templates Status:
  ✅ spec-template.md - Reviewed, compatible with code quality and SEO focus
  ✅ plan-template.md - Reviewed, compatible with lightweight performance requirements
  ✅ tasks-template.md - Reviewed, compatible with component-based development
  ✅ checklist-template.md - No changes required
  ✅ agent-file-template.md - No changes required

Follow-up TODOs: None

Rationale:
- Version 1.0.0: Initial constitution establishing baseline governance
- Principles chosen per user requirements: code quality (raw HTML/CSS/JS), UX consistency
  (Figma), SEO/AIO optimization, and lightweight file principles
- Project type: Static landing page (HTML/CSS/JS, no frameworks)
- Focus: Clean code, design accuracy, search engine optimization, minimal footprint
-->

# 568Win Landing Page Constitution

## Core Principles

### I. Vanilla HTML/CSS/JS Standards (NON-NEGOTIABLE)

All code MUST use raw HTML5, CSS3, and vanilla JavaScript without frameworks or build tools.

**Rules:**
- HTML MUST be semantic and valid HTML5 (pass W3C validation)
- CSS MUST be written in plain CSS3 (no preprocessors like SASS/LESS)
- JavaScript MUST be vanilla ES6+ (no jQuery, React, Vue, or other frameworks)
- No build tools required for development (no webpack, vite, etc.)
- Code MUST be human-readable and maintainable without transpilation
- All files MUST be directly editable and deployable without compilation
- Use native browser APIs (Fetch, DOM manipulation, CSS Grid/Flexbox)

**Rationale:** Framework-free code ensures zero dependencies, maximum control, minimal
file size, instant deployment, and eliminates build pipeline complexity. Raw code is
more accessible to all developers and has zero technical debt from framework updates.

### II. Figma Design Fidelity (NON-NEGOTIABLE)

All UI implementation MUST match Figma design specifications pixel-perfectly.

**Rules:**
- Layout dimensions, spacing, and alignment MUST match Figma measurements exactly
- Color values MUST be extracted directly from Figma (hex/RGB values)
- Typography MUST match Figma specs: font family, size, weight, line height, letter spacing
- Component states (hover, active, disabled) MUST match Figma interactive prototypes
- Responsive breakpoints MUST align with Figma artboard sizes
- Deviations from Figma MUST be documented and approved before implementation
- Design tokens (colors, spacing, typography) MUST be defined as CSS variables
- Before marking any UI task complete, visual comparison with Figma MUST be performed

**Rationale:** Consistent execution of approved designs ensures professional polish,
maintains brand integrity, and eliminates guesswork. Pixel-perfect implementation
demonstrates attention to detail critical in competitive iGaming market.

### III. SEO & Discoverability

All pages MUST be optimized for search engines and social media discoverability.

**Rules:**
- Every page MUST have unique, descriptive `<title>` (50-60 characters optimal)
- Meta description MUST be present and compelling (150-160 characters)
- Heading hierarchy MUST be semantic (single H1, proper H2-H6 structure)
- Images MUST have descriptive alt text (both accessibility and SEO)
- Open Graph tags MUST be present for social media sharing (og:title, og:description, og:image)
- Twitter Card meta tags MUST be included
- Structured data (JSON-LD) SHOULD be added where applicable (Organization, Website)
- URLs MUST be clean and descriptive (no query parameters for main pages)
- Canonical URLs MUST be specified to prevent duplicate content
- robots.txt and sitemap.xml MUST be present and properly configured
- Page load performance MUST support good Core Web Vitals scores

**Rationale:** iGaming is highly competitive in search results. Proper SEO ensures
organic traffic, reduces customer acquisition costs, and improves conversion rates.
Social media optimization drives viral sharing and brand awareness.

### IV. Lightweight & Performance-First

All assets MUST be optimized for minimal file size and maximum loading speed.

**Rules:**
- Total page weight MUST be under 1MB for initial load (including all critical resources)
- Individual CSS files MUST be under 50KB uncompressed
- Individual JS files MUST be under 50KB uncompressed
- Images MUST be compressed (WebP preferred, with JPEG/PNG fallbacks)
- Images MUST be appropriately sized (no oversized images scaled down in CSS)
- Unused CSS/JS MUST be removed (no dead code)
- Critical CSS SHOULD be inlined in `<head>` for above-the-fold content
- Non-critical resources MUST be lazy-loaded where appropriate
- Fonts MUST use font-display: swap to prevent render blocking
- HTTP requests MUST be minimized (combine files where logical)
- Minification MUST be applied for production deployments

**Rationale:** Every kilobyte and millisecond impacts bounce rate and conversion.
Mobile users in target markets often have slower connections. Search engines penalize
slow sites. Lightweight code also means lower hosting costs and better scalability.

### V. Component Modularity

Features MUST be built as self-contained, reusable components with clear separation.

**Rules:**
- Each UI component lives in `components/[name].html` with matching `assets/css/[name].css`
- Components MUST be independently loadable and testable
- Component CSS MUST use namespaced class names to prevent conflicts (BEM or prefix pattern)
- Components MUST NOT have hard dependencies on other component internals
- Shared JavaScript utilities MUST be in `assets/js/` with clear, single-purpose modules
- Component documentation MUST describe: purpose, dependencies, usage example
- Components MUST support both English and Chinese content via locale JSON

**Rationale:** Modular architecture enables parallel development, easier debugging,
code reusability, and simplified maintenance. Components can be added/removed without
breaking the entire page structure.

### VI. Cross-Browser Compatibility

All features MUST work consistently across modern browsers without polyfills.

**Rules:**
- MUST support: Chrome (latest 2 versions), Firefox (latest 2 versions), Safari (latest 2 versions)
- MUST support mobile browsers: iOS Safari 14+, Chrome Android (latest 2 versions)
- CSS features MUST be widely supported or have graceful fallbacks
- JavaScript MUST be ES6+ but avoid bleeding-edge features with poor support
- Use caniuse.com to verify browser support before using newer APIs
- Visual regression testing MUST be performed on major browsers before release
- Vendor prefixes MUST be included where necessary for CSS properties

**Rationale:** User base spans diverse devices and browsers. Poor cross-browser
support leads to broken experiences and lost conversions. Avoiding polyfills keeps
code lightweight and maintainable.

## Code Quality Standards

### HTML Standards

- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Maintain proper document structure (DOCTYPE, lang attribute, charset)
- Use descriptive IDs and classes (avoid generic names like "container1")
- Keep nesting depth reasonable (max 8-10 levels)
- Close all tags properly (even self-closing tags for consistency)
- Use meaningful attribute values (title, aria-label where appropriate)

### CSS Standards

- Use CSS custom properties (variables) for colors, spacing, and typography scales
- Follow mobile-first responsive design (base styles, then `@media` for larger screens)
- Use flexbox and grid for layouts (avoid float-based layouts)
- Maintain consistent naming convention (BEM recommended: `.block__element--modifier`)
- Group related styles logically (layout, typography, colors, states)
- Avoid `!important` except for utility classes
- Use CSS comments to document complex logic or calculations
- Prefer class selectors over ID selectors for styling

### JavaScript Standards

- Use `const` by default, `let` only when reassignment needed (no `var`)
- Write pure functions where possible (minimize side effects)
- Use meaningful variable and function names (avoid abbreviations)
- Add JSDoc comments for complex functions
- Handle errors gracefully (try-catch for async operations)
- Use event delegation for dynamic content
- Avoid global variables (use IIFE or modules if needed)
- Keep functions small and single-purpose (max 30-40 lines)

### File Organization

```
/
├── index.html              # Main English landing page
├── index_cn.html           # Chinese version
├── components/             # Reusable HTML components
│   ├── menu.html
│   ├── banner.html
│   └── [component].html
├── assets/
│   ├── css/
│   │   ├── style.css       # Global styles, CSS variables
│   │   ├── [component].css # Component-specific styles
│   ├── js/
│   │   ├── page.js         # Main page logic
│   │   ├── language.js     # Localization handling
│   │   └── [feature].js    # Feature-specific logic
│   └── image/              # Optimized images
│       ├── icons/          # SVG/PNG icons
│       └── [images]
├── locale/
│   ├── en.json             # English translations
│   └── zh-CN.json          # Chinese translations
├── sitemap.xml             # SEO sitemap
└── robots.txt              # Search engine directives
```

## Governance

### Amendment Process

1. Proposed changes to this constitution MUST be documented with clear rationale
2. Changes MUST follow semantic versioning (MAJOR.MINOR.PATCH)
3. MAJOR changes require review of all templates and existing components for compliance
4. All developers MUST be notified of constitutional amendments
5. Amendment proposals MUST include impact assessment on existing codebase

### Versioning Policy

- **MAJOR (X.0.0)**: Principle removal or redefinition that breaks existing patterns
  (e.g., allowing frameworks, removing SEO requirements)
- **MINOR (1.X.0)**: New principles added, expanded guidance, new mandatory standards
  (e.g., adding accessibility principle, requiring TypeScript)
- **PATCH (1.0.X)**: Clarifications, wording improvements, non-breaking refinements
  (e.g., updating file size limits, clarifying CSS naming)

### Compliance Review

- All new features MUST pass constitution check before PR approval
- Constitution Check gates in implementation plans MUST verify:
  1. Pure HTML/CSS/JS (no frameworks)
  2. Figma design match confirmation
  3. SEO tags present and complete
  4. File size under limits
  5. Component modularity maintained
  6. Browser compatibility tested
- Violations MUST be justified in `plan.md` Complexity Tracking table
- Constitution supersedes individual preferences and shortcuts
- Technical debt from non-compliance MUST be documented and tracked

### Development Workflow

For day-to-day development:
1. Reference `.specify/templates/spec-template.md` for feature specifications
2. Use `.specify/templates/plan-template.md` for implementation planning with Constitution Checks
3. Break work into tasks using `.specify/templates/tasks-template.md`
4. Before marking tasks complete:
   - Validate HTML (W3C validator)
   - Compare UI against Figma
   - Check file sizes
   - Test in Chrome, Firefox, Safari
   - Verify SEO meta tags

### Quality Gates

Before any deployment:
- [ ] HTML validation passes (W3C)
- [ ] CSS validation passes (W3C)
- [ ] JavaScript has no console errors
- [ ] Figma design match verified visually
- [ ] Page weight under 1MB
- [ ] SEO meta tags complete
- [ ] Open Graph tags present
- [ ] Images optimized and compressed
- [ ] Cross-browser testing completed
- [ ] Mobile responsive testing completed
- [ ] Lighthouse score: Performance 90+, SEO 95+

**Version**: 1.0.0 | **Ratified**: 2025-11-13 | **Last Amended**: 2025-11-13
