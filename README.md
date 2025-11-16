# The Pure - Shopify Theme

This is a Shopify theme converted from a React/TypeScript/Vite application. The theme maintains the original design and functionality while using Shopify's native Liquid templating system.

## Theme Structure

```
shopify-theme/
├── assets/          # CSS, JavaScript, images, and other static files
├── config/          # Theme configuration files
├── layout/          # Theme layout templates
├── locales/         # Translation files
├── sections/        # Reusable theme sections
├── snippets/        # Reusable code snippets
└── templates/       # Page templates
```

## Installation

1. Zip the `shopify-theme` folder
2. Go to your Shopify admin panel
3. Navigate to Online Store > Themes
4. Click "Add theme" > "Upload zip file"
5. Select your zip file and upload

## Features

- **Full E-commerce Functionality**: Product pages, collections, cart, and checkout integration
- **Responsive Design**: Mobile-first design that works on all devices
- **Customizable**: Theme settings available in Shopify admin
- **Performance Optimized**: Compiled CSS and optimized JavaScript
- **SEO Friendly**: Proper meta tags and structured data

## Theme Sections

- **Header**: Navigation menu with cart and account links
- **Footer**: Links, newsletter signup, and social media
- **Hero**: Customizable hero banner with image and text
- **Featured Collection**: Display products from any collection
- **Announcement Bar**: Top banner with customizable message

## Templates

- **Index**: Homepage with hero and featured collection
- **Collection**: Product listing with filters and sorting
- **Product**: Product detail page with variant selection
- **List Collections**: All collections listing page
- **Page**: Custom pages (for lookbooks, etc.)
- **404**: Error page

## Customization

All theme settings can be customized through the Shopify theme editor:
- Colors and typography
- Header and footer content
- Announcement bar text
- Collection selection for featured products

## JavaScript Functionality

The theme includes vanilla JavaScript for:
- Cart drawer/sidebar
- Add to cart functionality
- Variant selection
- Quantity controls
- Collection filters
- Sort functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All images should be uploaded to the Shopify theme assets folder
- Product data comes from Shopify's product objects
- Cart functionality uses Shopify's Cart API
- The theme uses Shopify's native collection filters

