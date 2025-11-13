# FW25 Lookbook Implementation

## Overview
A beautiful, responsive lookbook page for showcasing seasonal fashion collections. The implementation includes a hero section, grid layout for looks, and optional collection product display.

## Files Created

### Templates
- `templates/page.lookbook.liquid` - Dedicated lookbook page template

### Sections
- `sections/lookbook.liquid` - Main lookbook grid section with configurable blocks
- `sections/lookbook-hero.liquid` - Hero section with seasonal branding

### Assets
- `assets/lookbook-fw25/` - Directory for lookbook images
  - `look-01.svg` - Placeholder image 1
  - `look-02.svg` - Placeholder image 2  
  - `look-03.svg` - Placeholder image 3
  - `look-04.svg` - Placeholder image 4

### CSS Enhancements
- Added lookbook-specific styles to `assets/theme.css`
- New utility classes for gradients, text truncation, and backdrop blur

## Features

### Responsive Design
- **Mobile**: 1-column grid
- **Tablet**: 2-column grid  
- **Desktop**: 4-column grid

### Interactive Elements
- Hover effects on lookbook items with smooth scaling
- Overlay with look details and shop links
- Look numbering badges
- Quick view overlay on collection products

### Customization Options
- Configurable section settings via Shopify admin
- Dynamic image picker for each look
- Featured product integration
- Collection product display

## Usage Instructions

### 1. Create a Lookbook Page
1. In Shopify Admin, go to Pages > Add page
2. Set the template to "page.lookbook"
3. Title: "FW25 Lookbook" (or your preferred title)
4. Add description content if desired

### 2. Configure the Lookbook Section
1. In the page editor, add the "Lookbook" section
2. Configure section settings:
   - Title and description
   - Optional collection for product display

### 3. Add Lookbook Items
For each look:
1. Click "Add lookbook item" block
2. Upload the look image (recommended: 800x1200px, 3:4 aspect ratio)
3. Add look title and description
4. Optionally link to featured product or shop URL
5. Repeat for all looks

### 4. Hero Section
The hero section automatically displays:
- FW25 Collection branding
- Seasonal title and subtitle
- Call-to-action buttons
- Animated floating elements

## Design System

### Colors
- Uses existing theme color palette
- Soft pink accents for seasonal feel
- Gradient overlays for depth

### Typography
- Playfair Display for headings (elegant serif)
- Inter for body text
- Dancing Script for special accents

### Animations
- Smooth hover transitions (0.3-0.7s)
- Pulse animations for floating elements
- Scale effects on image hover
- Fade-in effects for content

## Performance Optimizations

- Lazy loading for all images
- Optimized image sizes
- Efficient CSS animations
- Minimal JavaScript required

## Accessibility
- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support
- Screen reader friendly

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly interactions

## Future Enhancements
- Video support for hero section
- Filter/tag functionality for looks
- Social sharing integration
- Lookbook print functionality