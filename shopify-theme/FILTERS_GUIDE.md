# Collection Filters Guide

## Overview
The collection page now supports fully customizable filters that can be configured directly from the Shopify theme editor. This allows you to control which filters appear on your collection pages without any coding.

## How to Add/Remove Filters

1. **Navigate to the Theme Editor**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Customize" on your active theme
   - Navigate to any collection page

2. **Access the Collection Products Section**
   - Click on the "Collection Products" section
   - You'll see the section settings and blocks

3. **Add a New Filter**
   - Click "+ Add block"
   - Select "Filter"
   - Configure the filter settings (see below)

4. **Remove a Filter**
   - Click on the filter block you want to remove
   - Click "Remove block" at the bottom

5. **Reorder Filters**
   - Drag and drop filter blocks to change their order

## Available Filter Types

### 1. Availability Filter
- **What it does**: Shows "In stock" and "Out of stock" options
- **Settings**: 
  - Filter type: Select "Availability"
  - Custom label: Optional (e.g., "Stock Status")

### 2. Price Filter
- **What it does**: Allows customers to filter by price range with min/max inputs
- **Settings**:
  - Filter type: Select "Price"
  - Custom label: Optional (e.g., "Price Range")

### 3. Product Type Filter
- **What it does**: Filters by product categories/types you've assigned
- **Settings**:
  - Filter type: Select "Product type"
  - Custom label: Optional (e.g., "Category")
- **Note**: Products must have product types assigned in your catalog

### 4. Vendor Filter
- **What it does**: Filters by product vendors/brands
- **Settings**:
  - Filter type: Select "Vendor"
  - Custom label: Optional (e.g., "Brand")
- **Note**: Products must have vendors assigned

### 5. Custom Tag Filter
- **What it does**: Filters by any custom tag you specify
- **Settings**:
  - Filter type: Select "Custom tag"
  - Custom filter source: Enter the exact tag name (e.g., "Color", "Size", "Material")
  - Custom label: Optional (e.g., "Choose Color")
- **Note**: Products must be tagged with the exact tag name you specify

## Additional Section Settings

### Product Card Min Width
- Controls the minimum width of each product card (300-600px)
- The grid automatically adjusts the number of columns based on screen size
- Default: 450px

### Enable Sorting
- Toggle to show/hide the sort dropdown
- When enabled, customers can sort by:
  - Featured
  - Best selling
  - Alphabetically (A-Z, Z-A)
  - Price (low to high, high to low)
  - Date (old to new, new to old)

## Setting Up Product Filters

For filters to work, you need to configure your products correctly:

1. **For Product Type filters**:
   - Go to Products → Select a product
   - Scroll to "Product organization"
   - Set the "Product type" field

2. **For Vendor filters**:
   - Go to Products → Select a product
   - Scroll to "Product organization"
   - Set the "Vendor" field

3. **For Custom Tag filters**:
   - Go to Products → Select a product
   - Scroll to "Product organization"
   - Add tags in the "Tags" field
   - Use consistent tag names (e.g., "Color: Red", "Size: Large", "Material: Cotton")

## Best Practices

1. **Limit the number of filters**: Too many filters can overwhelm customers. Start with 3-5 most important filters.

2. **Use clear labels**: If using custom labels, make them clear and concise (e.g., "Color" instead of "Filter by Color Options").

3. **Consistent tagging**: When using custom tag filters, use a consistent format across all products (e.g., always use "Color: Blue" not sometimes "Blue" and sometimes "Color: Blue").

4. **Test your filters**: After adding filters, visit your collection page and test each filter to ensure products are tagged correctly.

5. **Mobile experience**: Filters work responsively on mobile devices with the same dropdown interface.

## Troubleshooting

**Filter doesn't appear**:
- Make sure products in the collection have the relevant attributes (tags, product type, vendor, etc.)
- Check that the filter type matches your product data

**No products show after filtering**:
- Verify products are tagged/categorized correctly
- Check for spelling errors in custom tag names
- Clear filters and try again

**Filter shows but has no options**:
- No products in the collection have that attribute
- For custom tags, ensure the exact tag name matches

## Technical Notes

- Filters use Shopify's native filtering system (storefront filtering API)
- All filters respect Shopify's automatic filter generation
- Filter state is preserved in the URL, so customers can share filtered results
- The "Clear all" link appears automatically when any filters are active
