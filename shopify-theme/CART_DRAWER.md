# Cart Drawer - Vertical Right-Side Implementation

## Overview

The cart drawer is implemented as a **vertical sidebar** that slides in from the **right side** of the screen. It provides a modern, elegant shopping cart experience that overlays the main content without navigating away from the current page.

## Features

### Design
- **Position**: Fixed to the right side, full height
- **Width**: Maximum 28rem (448px) on desktop, full width on mobile
- **Animation**: Smooth slide-in/out transition (300ms ease-in-out)
- **Overlay**: Semi-transparent backdrop that dims the background
- **Shadow**: Elegant shadow for depth and visual separation

### Layout Structure
1. **Header Section**
   - Cart title with item count badge
   - Close button (X icon)
   - Sticky at the top while scrolling

2. **Items Section**
   - Scrollable area for cart items
   - Product thumbnail images (80x80px)
   - Product titles and variant information
   - Quantity controls (+/- buttons)
   - Remove item button
   - Custom scrollbar styling

3. **Footer Section**
   - Discount code section (collapsible)
   - Estimated total price
   - Checkout button (primary CTA)
   - Continue shopping button
   - PayPal express checkout button (if enabled)

## Technical Implementation

### Files
- **snippets/cart-drawer.liquid** - Main template structure
- **assets/theme.css** - Styling and animations
- **assets/theme.js** - Interactive functionality

### Key Classes

#### Positioning
```css
.fixed          /* Fixed positioning */
.inset-y-0      /* Full height (top: 0, bottom: 0) */
.right-0        /* Positioned on the right */
.z-50           /* High z-index for overlay */
```

#### Visibility
```css
.translate-x-full           /* Hidden state (off-screen right) */
.cart-drawer-open           /* Visible state (on-screen) */
```

#### Responsive Behavior
- **Mobile (<640px)**: Full screen width
- **Desktop (≥641px)**: Maximum 28rem width

### JavaScript Functions

#### Open Cart Drawer
```javascript
openCartDrawer()
- Removes translate-x-full class
- Adds cart-drawer-open class
- Shows overlay
- Prevents body scroll
```

#### Close Cart Drawer
```javascript
closeCartDrawer()
- Adds translate-x-full class
- Removes cart-drawer-open class
- Hides overlay
- Restores body scroll
```

#### Update Cart
```javascript
updateCartDrawer(cart)
- Refreshes cart items display
- Updates total price
- Updates item count badges
```

## User Interactions

### Opening the Cart
- Click the cart icon in the header
- Add a product to cart (auto-opens)

### Closing the Cart
- Click the X button in cart header
- Click the overlay backdrop
- Navigate to checkout

### Cart Operations
- **Increase Quantity**: Click + button
- **Decrease Quantity**: Click - button (min: 1)
- **Remove Item**: Click trash icon
- **Apply Discount**: Expand discount section, enter code
- **Checkout**: Click "Check out" button

## Styling

### Color Scheme
- **Background**: White (#FFFFFF)
- **Text**: Black (#000000)
- **Borders**: Gray-200 (#E5E7EB)
- **Hover States**: Gray-100 (#F3F4F6)
- **Overlay**: Black at 50% opacity

### Scrollbar Styling
Custom thin scrollbar for the items section:
- Width: 6px
- Color: Muted theme color
- Hover: Darker shade

## Accessibility

- **ARIA Labels**: Proper labels for icon buttons
- **ARIA Hidden**: Managed for drawer and overlay states
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Management**: Visible focus states on all controls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Adjust Width
Edit the `max-w-md` class in cart-drawer.liquid:
```liquid
max-w-md  /* 28rem / 448px */
max-w-lg  /* 32rem / 512px */
max-w-xl  /* 36rem / 576px */
```

### Adjust Animation Speed
Edit the `duration-300` class:
```liquid
duration-300  /* 300ms */
duration-500  /* 500ms */
```

### Change Shadow
Edit the CSS in theme.css:
```css
#cart-drawer {
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
}
```

## Notes

- The cart drawer maintains the existing color scheme and design aesthetic
- All animations use hardware acceleration for smooth performance
- The overlay prevents interaction with page content when cart is open
- Cart state persists across page refreshes (Shopify Cart API)
