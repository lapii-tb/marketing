# Design Tokens: 568Win Landing Page

**Source**: https://www.figma.com/design/dJcCSUD5YqppoUPzXXth2o/API-Landing-Page?node-id=51-236&p=f&t=KhOZJQh4YOUdc6Q3-0
**Extracted**: 2025-11-13
**Status**: ⚠️ REQUIRES MANUAL VERIFICATION - Please verify all values against actual Figma design

## Color Palette

Based on existing site analysis. **ACTION REQUIRED**: Open Figma and verify/update these hex values.

### Primary Colors
```css
--color-primary: #FFD700;           /* Gold - primary brand color */
--color-primary-dark: #FFC700;      /* Darker gold for hover states */
--color-primary-light: #FFED4E;     /* Lighter gold for accents */
```

### Secondary Colors
```css
--color-secondary: #1A1A2E;         /* Dark blue/navy - backgrounds */
--color-secondary-light: #16213E;   /* Lighter navy */
```

### Neutral Colors
```css
--color-white: #FFFFFF;
--color-black: #000000;
--color-gray-100: #F5F5F5;
--color-gray-200: #E0E0E0;
--color-gray-300: #BDBDBD;
--color-gray-600: #757575;
--color-gray-800: #424242;
--color-gray-900: #212121;
```

### Semantic Colors
```css
--color-success: #4CAF50;
--color-error: #F44336;
--color-warning: #FF9800;
--color-info: #2196F3;
```

### Text Colors
```css
--color-text-primary: #FFFFFF;
--color-text-secondary: #A0A0A0;
--color-text-muted: #666666;
```

## Typography Scale

**ACTION REQUIRED**: Extract exact font specifications from Figma Inspect panel.

### Font Families
```css
--font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
--font-family-heading: var(--font-family-primary);
```

**Note**: If custom fonts are used in Figma, update with actual font names and ensure font files are available.

### Font Sizes
```css
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
```

### Font Weights
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Line Heights
```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;
```

### Letter Spacing
```css
--letter-spacing-tight: -0.05em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em;
```

## Spacing Scale

Based on 8px grid system. **ACTION REQUIRED**: Verify spacing values match Figma.

```css
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
```

## Container & Layout

```css
--container-xs: 320px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

## Responsive Breakpoints

```css
/* Use in media queries */
@media (min-width: 480px)  /* Mobile landscape */
@media (min-width: 768px)  /* Tablet */
@media (min-width: 1024px) /* Desktop */
@media (min-width: 1280px) /* Wide desktop */
```

## Component-Specific Dimensions

**ACTION REQUIRED**: Extract from Figma components.

### Navigation
- Height: 60px (sticky position)
- Z-index: 1000

### Buttons
- Small: height 32px, padding 8px 16px
- Medium: height 40px, padding 12px 24px
- Large: height 48px, padding 16px 32px
- Border radius: 8px

### Cards & Containers
- Border radius: 8px
- Box shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

### Forms & Inputs
- Input height: 44px (minimum touch target)
- Input padding: 12px 16px
- Border radius: 4px

## Verification Checklist

- [ ] Colors extracted from Figma Inspect panel
- [ ] Typography sizes match Figma text styles
- [ ] Spacing values verified against Figma layouts
- [ ] Custom fonts identified and font files obtained
- [ ] Component dimensions measured from Figma frames
- [ ] Hover/active state colors documented
- [ ] Mobile/tablet/desktop variations noted

## Usage Instructions

1. Open Figma design file
2. Select each element and use Inspect panel (right sidebar)
3. Copy exact hex values for colors
4. Copy font family, size, weight, line-height for text elements
5. Measure spacing between elements (padding, margins, gaps)
6. Update this document with verified values
7. Copy all CSS custom properties to `assets/css/style.css`
