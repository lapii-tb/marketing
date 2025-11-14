# Required Assets for 568Win Landing Page

## Manual Asset Generation Required

The following image assets need to be manually created as they require design work or image processing tools:

### 1. Favicon and App Icons (T008)

**Source**: Use existing `/assets/image/568win.png` logo as base

**Required Files** (save to `/assets/image/icons/`):

1. **favicon.ico** - 32×32px, ICO format
   - Multi-resolution ICO file (16×16, 32×32)
   - Use online tool: https://favicon.io or https://realfavicongenerator.net

2. **favicon-16x16.png** - 16×16px, PNG format
   - Standard browser favicon

3. **favicon-32x32.png** - 32×32px, PNG format
   - Standard browser favicon (high-res)

4. **apple-touch-icon.png** - 180×180px, PNG format
   - iOS home screen icon
   - Rounded corners applied by iOS automatically
   - No transparency, solid background recommended

5. **android-chrome-192x192.png** - 192×192px, PNG format
   - Android home screen icon (standard)
   - Transparent or solid background

6. **android-chrome-512x512.png** - 512×512px, PNG format
   - Android home screen icon (high-res)
   - Used for splash screens on Android
   - Transparent or solid background

**Generation Instructions**:

#### Option A: Online Tool (Easiest)
1. Visit https://realfavicongenerator.net
2. Upload `assets/image/568win.png`
3. Customize settings:
   - iOS: Use solid background (#1A1A2E)
   - Android: Keep transparency or use background
   - Windows: Use accent color (#FFD700)
4. Generate and download package
5. Extract files to `assets/image/icons/`

#### Option B: Command Line (ImageMagick)
```bash
cd assets/image
# Create favicon.ico
convert 568win.png -resize 32x32 -background transparent -flatten favicon-32x32.png
convert 568win.png -resize 16x16 -background transparent -flatten favicon-16x16.png
convert favicon-16x16.png favicon-32x32.png icons/favicon.ico

# Create apple-touch-icon
convert 568win.png -resize 180x180 -background "#1A1A2E" -flatten icons/apple-touch-icon.png

# Create Android icons
convert 568win.png -resize 192x192 -background transparent -flatten icons/android-chrome-192x192.png
convert 568win.png -resize 512x512 -background transparent -flatten icons/android-chrome-512x512.png
```

#### Option C: Design Software (Figma/Photoshop)
1. Open `568win.png` in design software
2. Create artboards for each size
3. Center logo on each artboard
4. Add appropriate padding (10-15% margin)
5. Export each size with correct filename

---

### 2. Open Graph Preview Image (T038)

**File**: `/assets/image/og-image.jpg`

**Specifications**:
- Dimensions: **1200×630 pixels** (Facebook/LinkedIn standard)
- Format: JPEG (optimize quality 85-90%)
- File size: <300KB (ideally <200KB)
- Color space: RGB

**Content Requirements**:
- 568Win logo prominently displayed
- Tagline: "Premier iGaming API Aggregator"
- Background: Brand colors (#1A1A2E dark blue, #FFD700 gold accents)
- Text should be readable at thumbnail size (200×105px)
- Keep important content within "safe zone" (avoid extreme edges)

**Safe Zone Guidelines**:
- Mobile crop preview: Center 1080×1080px square
- Desktop preview: Full 1200×630px
- Critical text/logo: Center 1000×500px

**Design Template Structure**:
```
┌─────────────────────────────────────┐
│         [Background Pattern]         │
│                                       │
│        ┌───────────────────┐         │
│        │   568Win Logo     │         │
│        └───────────────────┘         │
│                                       │
│     Premier iGaming API Aggregator   │
│   Seamless Integration · Top Providers│
│                                       │
└─────────────────────────────────────┘
```

**Creation Instructions**:

#### Option A: Design Software (Figma/Canva - Recommended)
1. Create new 1200×630px artboard
2. Add dark blue gradient background (#1A1A2E to #16213E)
3. Place 568win.png logo at 400px width
4. Add headline text (60-72px font, bold, white)
5. Add subheadline (32-40px font, light gray #A0A0A0)
6. Add gold accent elements (lines, shapes using #FFD700)
7. Export as JPEG at 85% quality

#### Option B: Online Tool
1. Use Canva (https://www.canva.com)
   - Template: "Facebook Post" (1200×630)
   - Upload 568win.png
   - Add text layers
   - Download as JPEG
2. Use Figma (https://www.figma.com)
   - Import Figma design from project
   - Export specific frame as JPEG

#### Option C: Photoshop
1. New file: 1200×630px, RGB, 72dpi
2. Background layer: Fill with #1A1A2E
3. Import 568win.png as Smart Object
4. Add text layers with proper font
5. Add effects (drop shadows, glows)
6. Export as: Save for Web (JPEG, Quality 85)

**Testing the OG Image**:
After creating, test preview at:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

---

### 3. Optional: WebP Image Versions (T053 - Phase 6)

**For all existing JPG/PNG images in `/assets/image/`**:

Convert to WebP format for better compression (Phase 6 task).

**Command Line Conversion**:
```bash
# Install cwebp (if needed)
brew install webp  # macOS
apt-get install webp  # Ubuntu

# Convert all images
cd assets/image
for img in *.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
done

for img in *.png; do
  cwebp -q 90 "$img" -o "${img%.png}.webp"
done
```

**Online Tool**:
- Squoosh: https://squoosh.app
- Cloudinary: https://cloudinary.com/tools/webp-converter

---

## Current Status

### ✅ Completed
- [x] site.webmanifest created
- [x] Favicon references added to HTML files
- [x] OG image references added to HTML files

### ⚠️ Awaiting Manual Creation
- [ ] favicon.ico (32×32, multi-res)
- [ ] favicon-16x16.png
- [ ] favicon-32x32.png
- [ ] apple-touch-icon.png (180×180)
- [ ] android-chrome-192x192.png
- [ ] android-chrome-512x512.png
- [ ] og-image.jpg (1200×630)

### 📝 Note
The HTML files already reference these assets. Once created and placed in the correct directories, they will work automatically. The site will function without these assets, but SEO and social media previews will be incomplete.

## Priority
- **High**: og-image.jpg (affects social media sharing)
- **Medium**: favicon files (affects browser tabs and bookmarks)
- **Low**: Android icons (only affects users who add to home screen)
