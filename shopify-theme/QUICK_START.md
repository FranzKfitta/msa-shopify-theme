# Quick Start Guide - Customizable Collection Filters

## 🚀 Getting Started (5 Minutes)

### Step 1: Access Theme Editor
1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Customize** button
3. Navigate to a **Collection page** (e.g., "All Products" collection)

### Step 2: Find Collection Filters Section
- Look in the left sidebar for sections:
  - **Collection Header** (title)
  - **Collection Filters** ← This is where filters are configured
  - **Collection Products** (product grid)

### Step 3: Add Your First Filter
1. Click on **Collection Filters** section
2. Click **+ Add block** button
3. Choose **List Filter** or **Price Filter**
4. Configure the filter settings:
   - For **List Filter**: Select filter source (availability, product type, etc.)
   - For **Price Filter**: Toggle enable/disable

### Step 4: Save and Preview
1. Click **Save** in the top right
2. Preview your collection page
3. Filters should now appear above the product grid!

---

## 📋 Available Filter Types

### List Filters (Categorical)
Choose from these filter sources:
- ✅ **All available filters** - Shows everything
- ✅ **Availability** - In stock / Out of stock
- ✅ **Product Type** - Product categories
- ✅ **Vendor** - Brands/manufacturers
- ✅ **Size** - Sizes (requires tags/metafields)
- ✅ **Color** - Colors (requires tags/metafields)
- ✅ **Material** - Materials (requires tags/metafields)
- ✅ **Style** - Styles (requires tags/metafields)

### Price Filter
- Number input fields for min and max price
- Apply button to submit filter
- Only one price filter allowed per page

---

## 🎛️ Configuration Options

### Section Settings
- **Show clear filters button** ☑️ Show "Clear all" when filters are active
- **Clear button text** - Customize the text (default: "Clear all")

### Product Grid Settings
In the **Collection Products** section:
- **Product card min width** (300-600px) - Controls how many products per row
- **Show image carousel arrows** - Enable hover arrows for multiple images

---

## 💡 Common Configurations

### Basic E-commerce Store
```
1. Availability filter
2. Price filter  
3. Product Type filter
```

### Fashion Store
```
1. Availability filter
2. Size filter
3. Color filter
4. Price filter
5. Product Type filter
```

### Home Goods Store
```
1. Availability filter
2. Product Type filter
3. Material filter
4. Price filter
5. Style filter
```

### Minimal Store
```
1. Product Type filter
```

---

## 🔧 Enable Filters in Shopify

Before filters will work, enable them:

1. Go to **Shopify Admin** → **Online Store** → **Navigation** → **Filters**
2. Check the boxes to enable filters:
   - ☑️ Product availability
   - ☑️ Price
   - ☑️ Product type
   - ☑️ Product vendor
   - ☑️ Product tags (for custom filters)

---

## 🏷️ Add Filter Data to Products

### For Custom Filters (Size, Color, Material, Style)

**Option A: Use Product Tags**
1. Edit a product
2. Add tags in format: `property:value`
   - `color:blue`
   - `size:large`
   - `material:cotton`
   - `style:modern`

**Option B: Use Metafields (Recommended)**
1. Go to **Settings** → **Custom data** → **Products**
2. Add metafield definitions:
   - `custom.color` (Single line text)
   - `custom.size` (Single line text)
   - `custom.material` (Single line text)
   - `custom.style` (Single line text)
3. Edit products and fill in the metafields
4. Enable as filters in **Navigation** → **Filters**

---

## ✨ Features

### For Customers:
- Click filter buttons to open dropdown
- Select multiple options
- Click "Clear all" to reset
- See product count update in real-time
- Filters persist in URL (can bookmark filtered views)
- Works on mobile and desktop

### For Merchants:
- No coding required
- Add/remove filters via theme editor
- Reorder filters with drag & drop
- Customize per collection
- Works with existing product data
- SEO-friendly URLs

---

## 🎨 Customization Tips

### Reorder Filters
- Click and drag filter blocks up or down in the theme editor
- Filters appear in the order you arrange them

### Remove Filters
- Click on a filter block
- Click the trash icon to delete it

### Duplicate Filters
- You can add multiple "List Filter" blocks
- Each can target a different filter source
- Only one price filter allowed

---

## ❓ Troubleshooting

### Filter Not Showing
- ✓ Check filter is enabled in **Navigation** → **Filters**
- ✓ Verify products have the required tags/metafields
- ✓ Make sure at least one product in collection has the filter value

### Price Filter Not Working
- ✓ Ensure products have prices set
- ✓ Check that enable_price_filter is checked

### No Products After Filtering
- ✓ Check that products match the selected filters
- ✓ Click "Clear all" to reset
- ✓ Verify product data is correct

---

## 📱 Mobile Testing

Filters are fully responsive:
- Dropdowns adjust for mobile screens
- Touch-friendly tap targets
- Smooth animations
- Product grid adapts (2 columns on mobile)

---

## 🔗 Additional Resources

- **Full Documentation**: `COLLECTION_FILTERS_GUIDE.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **Shopify Help**: [Shopify Filter Documentation](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/filters)

---

## 🎯 Quick Tips

1. **Start Simple**: Begin with 2-3 essential filters
2. **Test First**: Add filters to one collection before rolling out to all
3. **Use Metafields**: More reliable than tags for professional stores
4. **Mobile Check**: Always test on mobile devices
5. **Monitor Usage**: See which filters customers use most via analytics

---

## ✅ Success Checklist

- [ ] Filters appear in theme editor
- [ ] Can add filter blocks
- [ ] Can remove filter blocks
- [ ] Can reorder filters
- [ ] Filters work on collection pages
- [ ] Can select multiple options
- [ ] Clear all button works
- [ ] Price filter works
- [ ] Mobile responsive
- [ ] Product count updates
- [ ] Sorting still works

---

**Need Help?** Check the full guides:
- `COLLECTION_FILTERS_GUIDE.md` - Complete documentation
- `IMPLEMENTATION_SUMMARY.md` - Technical details
