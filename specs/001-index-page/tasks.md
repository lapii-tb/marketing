# Tasks: Multi-Language Index Page with SEO Optimization

**Input**: Design documents from `/specs/001-index-page/`
**Prerequisites**: plan.md (complete), spec.md (complete), research.md (complete)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[TaskID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Static web application at repository root
- Components in `/Users/mazlapii/Projects/wls/568win/22102025/components/`
- CSS in `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/`
- JS in `/Users/mazlapii/Projects/wls/568win/22102025/assets/js/`
- Images in `/Users/mazlapii/Projects/wls/568win/22102025/assets/image/`
- Locale in `/Users/mazlapii/Projects/wls/568win/22102025/locale/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure preparation

- [ ] T001 Extract Figma design tokens (colors, typography, spacing) and document in `/Users/mazlapii/Projects/wls/568win/specs/001-index-page/design-tokens.md`
- [ ] T002 [P] Verify all image assets exist in `/Users/mazlapii/Projects/wls/568win/22102025/assets/image/` directory and check file sizes
- [ ] T003 [P] Create `/Users/mazlapii/Projects/wls/568win/22102025/sitemap.xml` for SEO with URLs for English and Chinese pages
- [ ] T004 [P] Create `/Users/mazlapii/Projects/wls/568win/22102025/robots.txt` with proper search engine directives

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Add design tokens as CSS custom properties in `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/style.css` (colors, typography, spacing from T001)
- [ ] T006 [P] Verify and update locale JSON structure in `/Users/mazlapii/Projects/wls/568win/22102025/locale/en.json` with all required keys (meta, navigation, sections, common)
- [ ] T007 [P] Verify and update locale JSON structure in `/Users/mazlapii/Projects/wls/568win/22102025/locale/zh-CN.json` with all required keys matching en.json structure
- [ ] T008 Create favicon and app icons in `/Users/mazlapii/Projects/wls/568win/22102025/assets/image/icons/` (favicon.ico, apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Landing Page in Preferred Language (Priority: P1) 🎯 MVP

**Goal**: Visitors see content in their preferred language (English or Chinese) with proper localization and language switching

**Independent Test**: Load index.html and index_cn.html, verify all text displays correctly in each language, test language switcher without backend

### Implementation for User Story 1

- [ ] T009 [P] [US1] Update `/Users/mazlapii/Projects/wls/568win/22102025/locale/en.json` with complete English translations for all sections (navigation, banner, opportunity, aggregator, features, providers, markets, operators, faq, register)
- [ ] T010 [P] [US1] Update `/Users/mazlapii/Projects/wls/568win/22102025/locale/zh-CN.json` with complete Chinese translations for all sections matching en.json keys
- [ ] T011 [US1] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/js/language.js` to implement locale loading via Fetch API with error handling and localStorage persistence
- [ ] T012 [US1] Add language switcher UI to `/Users/mazlapii/Projects/wls/568win/22102025/components/menu.html` with EN/CN toggle buttons
- [ ] T013 [P] [US1] Update `/Users/mazlapii/Projects/wls/568win/22102025/index.html` to add `data-i18n` attributes to all translatable text elements and set `lang="en"`
- [ ] T014 [P] [US1] Update `/Users/mazlapii/Projects/wls/568win/22102025/index_cn.html` to add `data-i18n` attributes to all translatable text elements and set `lang="zh-CN"`
- [ ] T015 [US1] Add loading indicator HTML/CSS in `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/style.css` for locale loading state
- [ ] T016 [US1] Implement language switch event handler in `/Users/mazlapii/Projects/wls/568win/22102025/assets/js/language.js` that updates DOM without page reload and maintains scroll position
- [ ] T017 [US1] Test language switching in browser (verify <500ms switch time per SC-007, all content updates correctly, scroll position maintained)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (multilingual content display works)

---

## Phase 4: User Story 2 - Navigate Through Landing Page Sections (Priority: P1)

**Goal**: Smooth navigation through all landing page sections with sticky navigation and anchor scrolling

**Independent Test**: Click all navigation links, verify smooth scrolling, test sticky navigation activation at 60px scroll

### Implementation for User Story 2

- [ ] T018 [P] [US2] Create `/Users/mazlapii/Projects/wls/568win/22102025/assets/js/navigation.js` with sticky navigation logic (activate at 60px scroll per FR-004)
- [ ] T019 [P] [US2] Add smooth scroll implementation in `/Users/mazlapii/Projects/wls/568win/22102025/assets/js/navigation.js` using CSS scroll-behavior and JS fallback
- [ ] T020 [US2] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/menu.css` to add sticky navigation styles with .sticky class and z-index
- [ ] T021 [US2] Add section IDs to all components (banner, opportunity, aggregator, features, providers, markets, operators, faq, start) for anchor linking
- [ ] T022 [US2] Update navigation links in `/Users/mazlapii/Projects/wls/568win/22102025/components/menu.html` with href="#section-id" for all sections
- [ ] T023 [US2] Add scroll event listener in `/Users/mazlapii/Projects/wls/568win/22102025/assets/js/navigation.js` to toggle sticky class at 60px threshold
- [ ] T024 [US2] Implement active navigation item highlighting in `/Users/mazlapii/Projects/wls/568win/22102025/assets/js/navigation.js` based on current scroll position
- [ ] T025 [US2] Add mobile-optimized spacing adjustments in `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/menu.css` using @media (max-width: 768px)
- [ ] T026 [US2] Test navigation (verify smooth scroll <1s per SC-008, sticky activates at 60px per SC-013, mobile spacing appropriate)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently (language + navigation both functional)

---

## Phase 5: User Story 3 - Discover via Search Engines and Social Media (Priority: P2)

**Goal**: Complete SEO optimization with meta tags, Open Graph, Twitter Cards, and structured data

**Independent Test**: Use Lighthouse SEO audit, Facebook Sharing Debugger, Twitter Card Validator to verify all metadata

### Implementation for User Story 3

- [ ] T027 [P] [US3] Add complete SEO meta tags to `/Users/mazlapii/Projects/wls/568win/22102025/index.html` (title 50-60 chars, description 150-160 chars, charset, viewport per FR-007)
- [ ] T028 [P] [US3] Add complete SEO meta tags to `/Users/mazlapii/Projects/wls/568win/22102025/index_cn.html` with Chinese-language meta title and description
- [ ] T029 [P] [US3] Add Open Graph meta tags to `/Users/mazlapii/Projects/wls/568win/22102025/index.html` (og:title, og:description, og:image, og:url, og:type per FR-008)
- [ ] T030 [P] [US3] Add Open Graph meta tags to `/Users/mazlapii/Projects/wls/568win/22102025/index_cn.html` with Chinese content
- [ ] T031 [P] [US3] Add Twitter Card meta tags to `/Users/mazlapii/Projects/wls/568win/22102025/index.html` (twitter:card, twitter:title, twitter:description, twitter:image per FR-009)
- [ ] T032 [P] [US3] Add Twitter Card meta tags to `/Users/mazlapii/Projects/wls/568win/22102025/index_cn.html` with Chinese content
- [ ] T033 [P] [US3] Add canonical URL tags to both `/Users/mazlapii/Projects/wls/568win/22102025/index.html` and `index_cn.html` per FR-010
- [ ] T034 [P] [US3] Add hreflang alternate tags to both HTML files linking English and Chinese versions for multilingual SEO
- [ ] T035 [P] [US3] Add JSON-LD structured data (Organization schema) to `/Users/mazlapii/Projects/wls/568win/22102025/index.html` with organization name, logo, social links per FR-011
- [ ] T036 [P] [US3] Add JSON-LD structured data to `/Users/mazlapii/Projects/wls/568win/22102025/index_cn.html` matching English version
- [ ] T037 [US3] Create `/Users/mazlapii/Projects/wls/568win/22102025/assets/js/seo.js` to dynamically update meta tags when language switches (update og:title, og:description, twitter:title, twitter:description)
- [ ] T038 [US3] Create Open Graph preview image (1200x630px) and save to `/Users/mazlapii/Projects/wls/568win/22102025/assets/image/og-image.jpg`
- [ ] T039 [US3] Test SEO metadata (run Lighthouse SEO audit targeting ≥95 score per SC-002, test Facebook Sharing Debugger per SC-011, test Twitter Card Validator per SC-012)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently (language + navigation + SEO all functional)

---

## Phase 6: User Story 4 - Fast Page Load on Mobile Networks (Priority: P2)

**Goal**: Optimize page load performance to <3s on 3G with lazy loading, critical CSS, and image optimization

**Independent Test**: Run Lighthouse Performance audit with 3G throttling, verify score ≥90 and load time <3s

### Implementation for User Story 4

- [ ] T040 [P] [US4] Add `loading="lazy"` attribute to all below-fold images in `/Users/mazlapii/Projects/wls/568win/22102025/components/opportunity.html`
- [ ] T041 [P] [US4] Add `loading="lazy"` attribute to all below-fold images in `/Users/mazlapii/Projects/wls/568win/22102025/components/aggregator.html`
- [ ] T042 [P] [US4] Add `loading="lazy"` attribute to all below-fold images in `/Users/mazlapii/Projects/wls/568win/22102025/components/features.html`
- [ ] T043 [P] [US4] Add `loading="lazy"` attribute to all below-fold images in `/Users/mazlapii/Projects/wls/568win/22102025/components/providers.html`
- [ ] T044 [P] [US4] Add `loading="lazy"` attribute to all below-fold images in `/Users/mazlapii/Projects/wls/568win/22102025/components/markets.html`
- [ ] T045 [P] [US4] Add `loading="lazy"` attribute to all below-fold images in `/Users/mazlapii/Projects/wls/568win/22102025/components/operators.html`
- [ ] T046 [P] [US4] Add `loading="lazy"` attribute to all below-fold images in `/Users/mazlapii/Projects/wls/568win/22102025/components/faq.html`
- [ ] T047 [P] [US4] Add `loading="lazy"` attribute to all below-fold images in `/Users/mazlapii/Projects/wls/568win/22102025/components/register.html`
- [ ] T048 [US4] Add width and height attributes to all images to prevent layout shift (update all component HTML files)
- [ ] T049 [US4] Use Chrome DevTools Coverage tool to identify critical CSS (<10KB above-fold styles)
- [ ] T050 [US4] Extract critical CSS and inline in `<style>` tag in `<head>` of `/Users/mazlapii/Projects/wls/568win/22102025/index.html`
- [ ] T051 [US4] Extract critical CSS and inline in `<style>` tag in `<head>` of `/Users/mazlapii/Projects/wls/568win/22102025/index_cn.html`
- [ ] T052 [US4] Load non-critical CSS asynchronously in both HTML files using media="print" onload="this.media='all'" pattern
- [ ] T053 [P] [US4] Generate WebP versions of all JPEG/PNG images using Squoosh or cwebp CLI and save to `/Users/mazlapii/Projects/wls/568win/22102025/assets/image/` with .webp extension
- [ ] T054 [US4] Update all image references to use `<picture>` element with WebP source and JPEG/PNG fallback in all component files
- [ ] T055 [US4] Add `font-display: swap` to any custom font declarations in `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/style.css` per FR-020
- [ ] T056 [US4] Test performance (run Lighthouse Performance audit with 3G throttling targeting ≥90 score per SC-003, verify <3s load per SC-001, verify lazy loading per SC-010)

**Checkpoint**: All user stories should now be independently functional and performance-optimized

---

## Phase 7: Visual Design Implementation (Figma Pixel-Perfect)

**Purpose**: Apply Figma design specifications pixel-perfectly to all components

- [ ] T057 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/menu.css` with Figma-exact navigation styles (colors, typography, spacing, hover states)
- [ ] T058 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/banner.css` with Figma-exact hero section styles
- [ ] T059 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/opportunity.css` with Figma-exact opportunity section styles
- [ ] T060 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/aggregator.css` with Figma-exact aggregator section styles
- [ ] T061 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/features.css` with Figma-exact features section styles
- [ ] T062 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/providers.css` with Figma-exact providers section styles
- [ ] T063 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/markets.css` with Figma-exact markets section styles
- [ ] T064 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/operators.css` with Figma-exact operators section styles
- [ ] T065 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/faq.css` with Figma-exact FAQ section styles
- [ ] T066 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/assets/css/register.css` with Figma-exact register/contact section styles
- [ ] T067 Add responsive breakpoints (480px, 768px, 1024px) to all component CSS files using @media queries
- [ ] T068 Verify pixel-perfect match (open Figma side-by-side with browser, compare at 375px, 768px, 1920px viewports, verify ±2px tolerance per SC-009)

---

## Phase 8: HTML Structure & Semantic Markup

**Purpose**: Ensure valid HTML5 with semantic elements and proper document structure

- [ ] T069 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/menu.html` with semantic HTML5 elements (`<nav>`, `<ul>`, `<li>`)
- [ ] T070 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/banner.html` with semantic `<header>` or `<section>` element and proper heading hierarchy
- [ ] T071 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/opportunity.html` with semantic `<section>` element and H2 heading
- [ ] T072 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/aggregator.html` with semantic `<section>` element and H2 heading
- [ ] T073 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/features.html` with semantic `<section>` element and H2 heading
- [ ] T074 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/providers.html` with semantic `<section>` element and H2 heading
- [ ] T075 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/markets.html` with semantic `<section>` element and H2 heading
- [ ] T076 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/operators.html` with semantic `<section>` element and H2 heading
- [ ] T077 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/faq.html` with semantic `<section>` element and H2 heading
- [ ] T078 [P] Update `/Users/mazlapii/Projects/wls/568win/22102025/components/register.html` with semantic `<section>` or `<footer>` element
- [ ] T079 [P] Add descriptive alt text to all images in all component files per FR-015 and accessibility requirements
- [ ] T080 Verify heading hierarchy (single H1 in banner, H2 for each section, proper nesting per FR-016)
- [ ] T081 Wrap main content in `<main>` element in both `/Users/mazlapii/Projects/wls/568win/22102025/index.html` and `index_cn.html` per FR-014

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final quality improvements, validation, and cross-browser testing

- [ ] T082 [P] Validate HTML5 markup using W3C validator (https://validator.w3.org/nu/) for both index.html and index_cn.html targeting zero errors per SC-005
- [ ] T083 [P] Validate CSS using W3C CSS validator (https://jigsaw.w3.org/css-validator/) for all CSS files targeting zero errors per SC-006
- [ ] T084 [P] Check total page weight using Chrome DevTools Network tab (verify <1MB per FR-013 and SC-004)
- [ ] T085 [P] Check individual CSS file sizes (verify each <50KB uncompressed per constraints)
- [ ] T086 [P] Check individual JS file sizes (verify each <50KB uncompressed per constraints)
- [ ] T087 [P] Test in Chrome (latest 2 versions) on desktop and Android per SC-014
- [ ] T088 [P] Test in Firefox (latest 2 versions) on desktop per SC-014
- [ ] T089 [P] Test in Safari (latest 2 versions) on desktop and iOS 14+ per SC-014
- [ ] T090 Add ARIA labels where needed for accessibility (navigation landmarks, button labels, section landmarks)
- [ ] T091 Test keyboard navigation (verify tab order, focus indicators, Enter/Space for buttons)
- [ ] T092 Run final Lighthouse audit (Performance ≥90, SEO ≥95, verify all success criteria met)
- [ ] T093 Create deployment checklist in `/Users/mazlapii/Projects/wls/568win/specs/001-index-page/deployment-checklist.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T004) - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion (T005-T008)
  - User stories can proceed in parallel after foundation OR sequentially by priority
- **Visual Design (Phase 7)**: Can proceed in parallel with user stories OR after user stories
- **HTML Structure (Phase 8)**: Can proceed in parallel with user stories OR after user stories
- **Polish (Phase 9)**: Depends on all previous phases being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational - No dependencies on other stories (independent)
- **User Story 3 (P2)**: Can start after Foundational - Benefits from US1 locale system but independently testable
- **User Story 4 (P2)**: Can start after Foundational - No dependencies on other stories (independent)

### Within Each User Story

- Locale files (T009-T010) before language.js implementation (T011, T016)
- language.js implementation (T011) before language switcher UI (T012) and HTML updates (T013-T014)
- Navigation.js creation (T018-T019) before CSS styles (T020) and HTML updates (T021-T022)
- Meta tag additions (T027-T036) can all proceed in parallel
- Image lazy loading attributes (T040-T047) can all proceed in parallel
- CSS file updates (T057-T066) can all proceed in parallel

### Parallel Opportunities

- **Setup phase**: T002, T003, T004 can run in parallel
- **Foundational phase**: T006, T007 can run in parallel
- **User Story 1**: T009, T010 in parallel; T013, T014 in parallel after T011
- **User Story 3**: T027-T036 all in parallel (meta tags for both pages)
- **User Story 4**: T040-T047 all in parallel (lazy loading), T053 can run early (WebP generation)
- **Visual Design phase**: All CSS updates (T057-T066) in parallel
- **HTML Structure phase**: All component updates (T069-T079) in parallel
- **Polish phase**: All validation tasks (T082-T089) in parallel

---

## Parallel Example: User Story 1 (Language Display)

```bash
# Launch locale file updates together:
Task T009: Update locale/en.json with complete English translations
Task T010: Update locale/zh-CN.json with complete Chinese translations

# After locale files ready, launch HTML updates together:
Task T013: Update index.html with data-i18n attributes
Task T014: Update index_cn.html with data-i18n attributes
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T008) - CRITICAL BLOCKER
3. Complete Phase 3: User Story 1 (T009-T017)
4. **STOP and VALIDATE**: Test language display independently
5. If successful, this is a deployable MVP (multilingual content works)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (T009-T017) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (T018-T026) → Test independently → Deploy/Demo (navigation works)
4. Add User Story 3 (T027-T039) → Test independently → Deploy/Demo (SEO optimized)
5. Add User Story 4 (T040-T056) → Test independently → Deploy/Demo (performance optimized)
6. Apply Visual Design (T057-T068) → Verify Figma match
7. Ensure HTML Structure (T069-T081) → Validate semantics
8. Final Polish (T082-T093) → Comprehensive testing
9. Each increment adds value without breaking previous functionality

### Parallel Team Strategy

With multiple developers after Foundational phase completes:

- **Developer A**: User Story 1 (T009-T017) - Language system
- **Developer B**: User Story 2 (T018-T026) - Navigation system
- **Developer C**: User Story 3 (T027-T039) - SEO implementation
- **Developer D**: User Story 4 (T040-T056) - Performance optimization
- **Developer E**: Visual Design (T057-T068) - Figma implementation

Stories complete and integrate independently.

---

## Notes

- **[P] tasks**: Different files, no dependencies on incomplete work - safe to parallelize
- **[Story] labels**: Map tasks to user stories for traceability and independent testing
- Each user story should be independently completable and testable
- Stop at any checkpoint to validate story works independently
- Commit after each task or logical group of tasks
- Avoid: vague tasks, same-file conflicts, cross-story dependencies that break independence
- Priority order: P1 stories (US1, US2) before P2 stories (US3, US4), but all can proceed in parallel after foundation
- File paths are absolute for clarity and immediate executability
