# Performance Optimization Guide - Phase 6

## Completed Optimizations ✅

### 1. Image Lazy Loading (T040-T047)
**Status**: ✅ Complete

All below-the-fold images now have `loading="lazy"` attribute:
- opportunity.jpg
- aggregator.jpg
- provider.jpg
- operator.jpg
- register.jpg
- contact.jpg

Above-the-fold images (banner, logo) do NOT have lazy loading to ensure immediate display.

### 2. Image Dimensions (T048)
**Status**: ✅ Complete

All images now have explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS):
- Prevents layout jumps during page load
- Improves Core Web Vitals scores
- Browser can reserve space before image loads

### 3. Font Display Optimization (T055)
**Status**: ✅ Complete

Added `font-display: swap` to custom fonts in style.css:
- Prevents invisible text during font loading (FOIT)
- Shows fallback font immediately
- Swaps to custom font when loaded
- Improves First Contentful Paint (FCP)

---

## Manual Optimizations Required

### 4. Critical CSS Extraction (T049-T052)

**Purpose**: Inline above-the-fold CSS to eliminate render-blocking stylesheets

**Tools**:
- Chrome DevTools Coverage Tool
- Critical CSS Generator: https://www.sitelocity.com/critical-path-css-generator
- PurgeCSS: https://purgecss.com
- Penthouse: https://github.com/pocketjoso/penthouse

**Steps**:

#### Option A: Chrome DevTools Coverage (Manual)
1. Open Chrome DevTools (F12)
2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "Coverage" and select "Show Coverage"
4. Click Record button
5. Load `http://localhost:8080/index.html`
6. Stop recording
7. Look at CSS files - red = unused, green = used
8. Export used CSS for above-the-fold content
9. Inline critical CSS in `<style>` tag in `<head>`
10. Load remaining CSS asynchronously

#### Option B: Online Tool
1. Visit: https://www.sitelocity.com/critical-path-css-generator
2. Enter URL (requires public URL after deployment)
3. Generate critical CSS
4. Copy generated CSS
5. Paste into `<style>` tag in `<head>` of both HTML files

#### Option C: Command Line (Penthouse - Node.js required)
```bash
npm install --global penthouse

# Generate critical CSS for desktop
penthouse --url http://localhost:8080/index.html \
  --css assets/css/style.css \
  --width 1920 \
  --height 1080 \
  > critical.css

# Generate critical CSS for mobile
penthouse --url http://localhost:8080/index.html \
  --css assets/css/style.css \
  --width 375 \
  --height 667 \
  > critical-mobile.css
```

#### Implementation (T050-T052):
After extracting critical CSS (~8-10KB), update both HTML files:

**Before** (current):
```html
<head>
  ...
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/menu.css">
  ...
</head>
```

**After** (optimized):
```html
<head>
  ...
  <!-- Inline critical CSS -->
  <style>
    /* Critical above-the-fold styles (~8-10KB) */
    /* Paste extracted critical CSS here */
  </style>

  <!-- Load non-critical CSS asynchronously -->
  <link rel="preload" href="assets/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link rel="preload" href="assets/css/menu.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/menu.css">
  </noscript>

  <!-- Fallback for browsers without preload support -->
  <script>
    (function(){var s=document.getElementsByTagName('link');for(var i=0;i<s.length;i++){if(s[i].rel==='preload'&&s[i].getAttribute('onload')){s[i].rel='stylesheet'}}})();
  </script>
</head>
```

**Target**: Critical CSS <10KB, total stylesheets loaded asynchronously

---

### 5. WebP Image Conversion (T053-T054)

**Purpose**: Reduce image file sizes by 25-35% using modern WebP format

**Tools**:
- cwebp (command line)
- Squoosh (web): https://squoosh.app
- ImageMagick
- Photoshop (Save for Web)

**Steps**:

#### Option A: Command Line (cwebp - Recommended)
```bash
# Install cwebp
brew install webp  # macOS
apt-get install webp  # Ubuntu/Debian

# Convert all JPG images to WebP
cd assets/image
for img in *.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
done

# Convert PNG images
for img in *.png; do
  cwebp -q 90 "$img" -o "${img%.png}.webp"
done

# Check file sizes
ls -lh *.{jpg,webp}
```

**Quality settings**:
- JPG photos: `-q 85` (good balance)
- PNG graphics/logos: `-q 90` (higher quality for sharp edges)
- Large backgrounds: `-q 80` (lower quality acceptable)

#### Option B: Online Tool (Squoosh)
1. Visit: https://squoosh.app
2. Drag and drop each image
3. Select WebP format
4. Adjust quality slider (80-90%)
5. Compare original vs WebP
6. Download converted image

#### Option C: Batch Processing (ImageMagick)
```bash
# Install ImageMagick
brew install imagemagick  # macOS

# Convert with ImageMagick
cd assets/image
for img in *.jpg; do
  convert "$img" -quality 85 "${img%.jpg}.webp"
done
```

#### Implementation (T054):
After converting images, update HTML to use `<picture>` element with WebP + fallback:

**Before**:
```html
<img src="assets/image/opportunity.jpg" class="opportunity-background" width="1920" height="854" loading="lazy" alt="...">
```

**After**:
```html
<picture>
  <source srcset="assets/image/opportunity.webp" type="image/webp">
  <img src="assets/image/opportunity.jpg" class="opportunity-background" width="1920" height="854" loading="lazy" alt="...">
</picture>
```

**Update all image references** in:
- components/opportunity.html
- components/aggregator.html
- components/providers.html
- components/operators.html
- components/register.html
- components/banner.html

---

## Performance Testing (T056)

### Test 1: Lighthouse Performance Audit

**Requirement**: Score ≥90 (SC-003)

**Steps**:
1. Open Chrome DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Select:
   - ✓ Performance
   - ✓ Mobile (for 3G testing)
   - ✓ Simulated throttling
   - ✓ Clear storage
4. Click "Analyze page load"

**Success Criteria**:
- Performance Score: ≥90 (target: 95+)
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s (SC-010)
- Total Blocking Time (TBT): <200ms
- Cumulative Layout Shift (CLS): <0.1
- Speed Index: <3.4s

**Key Metrics**:
- ✅ Images lazy load correctly
- ✅ No layout shifts (CLS near 0)
- ✅ Font display optimized
- ✅ No render-blocking resources (if critical CSS implemented)

### Test 2: 3G Network Throttling

**Requirement**: Page load <3s on 3G (SC-001)

**Steps**:
1. Open Chrome DevTools > Network tab
2. Select throttling: "Slow 3G" or "Fast 3G"
3. Reload page (Cmd+R / Ctrl+R)
4. Observe waterfall and load times

**Success Criteria**:
- Page interactive: <3 seconds
- Above-the-fold content visible: <2 seconds
- Images load progressively (lazy loading works)
- No blocking resources

### Test 3: Page Weight Validation

**Requirement**: Total page weight <1MB (SC-004)

**Steps**:
1. Open Chrome DevTools > Network tab
2. Reload page with cache disabled
3. Check "Transferred" size at bottom

**Success Criteria**:
- Total transferred: <1MB (target: 800KB)
- HTML: <100KB
- CSS (all files combined): <200KB
- JS (all files combined): <100KB
- Images: <600KB

**With WebP Optimization**:
- Expected total: 600-700KB (25-30% reduction)

### Test 4: Core Web Vitals

**Tool**: PageSpeed Insights (production only)

Visit: https://pagespeed.web.dev/

**Success Criteria**:
- LCP: <2.5s (Good)
- FID: <100ms (Good)
- CLS: <0.1 (Good)
- All metrics in "Green" range

### Test 5: Lazy Loading Verification

**Steps**:
1. Open Chrome DevTools > Network tab
2. Filter by "Img"
3. Load page
4. Note which images load immediately
5. Scroll down slowly
6. Observe images loading as you scroll

**Expected Behavior**:
- header.jpg loads immediately (above-fold)
- 568win.png loads immediately (logo)
- opportunity.jpg loads when scrolled into viewport
- aggregator.jpg, provider.jpg, etc. load progressively

**Success Criteria** (SC-010):
- ✅ Below-fold images DO NOT load on page load
- ✅ Images load ~200-300px before entering viewport
- ✅ No visual "pop-in" or layout shift
- ✅ Smooth scrolling experience

---

## Current Status Summary

### ✅ Completed Optimizations
- [x] Lazy loading on 6 below-the-fold images
- [x] Width/height attributes on all 9 images
- [x] Alt text on all images
- [x] ARIA labels on social icons
- [x] font-display: swap for custom fonts

### ⚠️ Manual Optimizations Required
- [ ] Critical CSS extraction and inlining (T049-T052)
- [ ] WebP image conversion (T053)
- [ ] Update HTML to use `<picture>` elements (T054)

### 📊 Testing Required
- [ ] Lighthouse Performance audit (target: ≥90)
- [ ] 3G network load time test (target: <3s)
- [ ] Page weight validation (target: <1MB)
- [ ] Core Web Vitals check (production)
- [ ] Lazy loading verification

---

## Performance Optimization Priority

**High Priority** (Do First):
1. WebP conversion (T053-T054) - Largest file size savings
2. Lighthouse testing (T056) - Validates all optimizations

**Medium Priority** (Optional):
3. Critical CSS (T049-T052) - Improves perceived load time

**Notes**:
- Critical CSS requires careful extraction to avoid breaking layouts
- WebP conversion is straightforward and provides immediate benefits
- Current setup should already score 85-90 on Lighthouse
- With WebP, target score: 92-95

---

## Expected Performance Improvements

**Before Optimization** (estimated):
- Lighthouse Performance: 75-80
- Total page weight: 1.2-1.5MB
- LCP: 3.5-4s
- FCP: 2.5s

**After Current Optimizations** (T040-T048, T055):
- Lighthouse Performance: 85-90
- Total page weight: ~1MB
- LCP: 2.5-3s
- FCP: 1.8s
- CLS: <0.1

**After WebP Conversion** (T053-T054):
- Lighthouse Performance: 90-95
- Total page weight: 700-800KB
- LCP: 2-2.5s
- Load time on 3G: <2.5s

**After Critical CSS** (T049-T052):
- Lighthouse Performance: 95-98
- FCP: <1.5s
- Render-blocking eliminated
- Perceived load time significantly faster

---

## Next Steps

1. Convert images to WebP format (see instructions above)
2. Update HTML components to use `<picture>` elements
3. Run Lighthouse Performance audit
4. If score <90, extract and inline critical CSS
5. Re-test on 3G throttling
6. Document final performance metrics

Once T053-T056 are complete, Phase 6 (Performance Optimization) will be finished!
