/**
 * Theme JavaScript
 * Handles cart functionality, filters, variant selection, and other interactivity
 */

(function() {
  'use strict';

  // Cart Drawer Functionality
  const cartDrawer = document.getElementById('cart-drawer');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartIconBubble = document.getElementById('cart-icon-bubble');
  const cartDrawerClose = document.getElementById('cart-drawer-close');

  function openCartDrawer() {
    if (cartDrawer && cartDrawerOverlay) {
      cartDrawer.classList.remove('translate-x-full');
      cartDrawer.classList.add('cart-drawer-open');
      cartDrawer.setAttribute('aria-hidden', 'false');
      cartDrawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
      cartDrawerOverlay.classList.add('cart-overlay-open');
      cartDrawerOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    if (cartDrawer && cartDrawerOverlay) {
      cartDrawer.classList.add('translate-x-full');
      cartDrawer.classList.remove('cart-drawer-open');
      cartDrawer.setAttribute('aria-hidden', 'true');
      cartDrawerOverlay.classList.add('opacity-0', 'pointer-events-none');
      cartDrawerOverlay.classList.remove('cart-overlay-open');
      cartDrawerOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (cartIconBubble) {
    cartIconBubble.addEventListener('click', openCartDrawer);
  }

  if (cartDrawerClose) {
    cartDrawerClose.addEventListener('click', closeCartDrawer);
  }

  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', closeCartDrawer);
  }

  // Update Cart Count
  function updateCartCount() {
    fetch(window.routes.cart_url + '.js')
      .then(response => response.json())
      .then(cart => {
        const cartCountBubble = document.getElementById('cart-count-bubble');
        if (cartCountBubble) {
          if (cart.item_count > 0) {
            cartCountBubble.textContent = cart.item_count;
            cartCountBubble.style.display = 'flex';
          } else {
            cartCountBubble.textContent = '';
            cartCountBubble.style.display = 'none';
          }
        }
        // Update cart count badge in drawer
        const cartCountBadge = document.getElementById('cart-count-badge');
        if (cartCountBadge) {
          if (cart.item_count > 0) {
            cartCountBadge.textContent = cart.item_count;
            cartCountBadge.style.display = 'flex';
          } else {
            cartCountBadge.style.display = 'none';
          }
        }
        updateCartDrawer(cart);
      })
      .catch(error => console.error('Error updating cart:', error));
  }

  // Update Cart Drawer Content
  function updateCartDrawer(cart) {
    const cartDrawerItems = document.getElementById('cart-drawer-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartDrawerItems) return;

    // Update cart total
    if (cartTotal) {
      const currency = cart.currency?.iso_code || 'USD';
      cartTotal.textContent = `${formatMoney(cart.total_price)} ${currency}`;
    }

    if (cart.item_count === 0) {
      cartDrawerItems.innerHTML = `
        <div class="px-6 py-12 text-center">
          <h3 class="text-xl font-bold text-black mb-4">YOUR CART IS EMPTY</h3>
          <p class="text-sm text-gray-600 mb-1">Have an account?</p>
          <p class="text-sm text-gray-600 mb-6">to check out faster.</p>
          <a href="${window.routes.all_products_collection_url || '/collections/all'}" class="inline-block bg-black text-white text-center py-3 px-6 font-medium hover:opacity-90 transition-opacity">
            Continue shopping
          </a>
        </div>
      `;
      return;
    }

    let html = '';
    cart.items.forEach(item => {
      html += `
        <div class="flex gap-4 px-6 py-5 border-b border-gray-200" data-cart-item-key="${item.key}">
          <div class="w-20 h-20 flex-shrink-0 overflow-hidden">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" style="max-width: 80px; max-height: 80px; width: 100%; height: 100%;">
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-normal text-sm mb-1 text-black leading-tight">${item.product_title}</h3>
            ${item.variant_title !== 'Default Title' ? `<p class="text-xs text-gray-600 mb-2">${item.variant_title}</p>` : ''}
            <p class="font-medium text-sm mb-3 text-black">${formatMoney(item.line_price)}</p>
            <div class="flex items-center gap-2">
              <button type="button" class="cart-item-decrease w-6 h-6 flex items-center justify-center border border-gray-300 bg-white text-black hover:bg-gray-100 transition-colors text-sm" data-item-key="${item.key}" data-variant-id="${item.variant_id}">-</button>
              <span class="cart-item-quantity text-sm font-medium min-w-[20px] text-center text-black">${item.quantity}</span>
              <button type="button" class="cart-item-increase w-6 h-6 flex items-center justify-center border border-gray-300 bg-white text-black hover:bg-gray-100 transition-colors text-sm" data-item-key="${item.key}" data-variant-id="${item.variant_id}">+</button>
            </div>
          </div>
          <button type="button" class="cart-item-remove text-gray-600 hover:text-black transition-colors flex-shrink-0 self-start mt-1" data-item-key="${item.key}" data-variant-id="${item.variant_id}" aria-label="Remove item">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      `;
    });

    cartDrawerItems.innerHTML = html;
    attachCartItemListeners();
  }

  // Format Money
  function formatMoney(cents) {
    return new Intl.NumberFormat(document.documentElement.lang || 'en', {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'USD'
    }).format(cents / 100);
  }

  // Cart Item Listeners
  function attachCartItemListeners() {
    document.querySelectorAll('.cart-item-increase').forEach(button => {
      button.addEventListener('click', function() {
        const variantId = this.dataset.variantId;
        const quantityElement = this.previousElementSibling;
        const currentQuantity = parseInt(quantityElement.textContent);
        updateCartItem(variantId, currentQuantity + 1);
      });
    });

    document.querySelectorAll('.cart-item-decrease').forEach(button => {
      button.addEventListener('click', function() {
        const variantId = this.dataset.variantId;
        const quantityElement = this.nextElementSibling;
        const currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 1) {
          updateCartItem(variantId, currentQuantity - 1);
        }
      });
    });

    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', function() {
        const variantId = this.dataset.variantId;
        updateCartItem(variantId, 0);
      });
    });
  }

  // Update Cart Item
  function updateCartItem(variantId, quantity) {
    const formData = {
      id: variantId,
      quantity: quantity
    };

    fetch(window.routes.cart_change_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => {
      updateCartCount();
    })
    .catch(error => {
      console.error('Error updating cart:', error);
      alert(window.cartStrings.error);
    });
  }

  // Add to Cart
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const addButton = document.getElementById('add-to-cart-button');
      
      if (addButton) {
        addButton.disabled = true;
        addButton.textContent = 'Adding...';
      }

      fetch(window.routes.cart_add_url, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.description || window.cartStrings.error);
        } else {
          updateCartCount();
          openCartDrawer();
        }
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        alert(window.cartStrings.error);
      })
      .finally(() => {
        if (addButton) {
          addButton.disabled = false;
          addButton.textContent = window.variantStrings.addToCart;
        }
      });
    });
  }

  // Variant Selection
  const variantOptions = document.querySelectorAll('.variant-option');
  const variantIdInput = document.getElementById('product-variant-id');
  const productFormData = productForm ? new FormData(productForm) : null;

  variantOptions.forEach(option => {
    option.addEventListener('click', function() {
      const optionName = this.dataset.optionName;
      const optionValue = this.dataset.optionValue;

      // Update visual state
      document.querySelectorAll(`[data-option-name="${optionName}"]`).forEach(btn => {
        btn.classList.remove('border-foreground', 'bg-foreground', 'text-background');
        btn.classList.add('border-border');
      });
      this.classList.add('border-foreground', 'bg-foreground', 'text-background');
      this.classList.remove('border-border');

      // Update variant selection (simplified - in production, you'd need to match all options)
      if (variantIdInput && productFormData) {
        // This is a simplified version - you'd need to match all selected options to find the correct variant
        // For now, we'll let the form submit handle it
      }
    });
  });

  // Quantity Controls
  const quantityDecrease = document.querySelector('.quantity-decrease');
  const quantityIncrease = document.querySelector('.quantity-increase');
  const quantityInput = document.getElementById('quantity');

  if (quantityDecrease) {
    quantityDecrease.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  }

  if (quantityIncrease) {
    quantityIncrease.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value) || 1;
      quantityInput.value = currentValue + 1;
    });
  }

  // Collapsible Filters
  const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');
  collapsibleTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const content = this.nextElementSibling;
      if (content) {
        const isHidden = content.hasAttribute('hidden');
        if (isHidden) {
          content.removeAttribute('hidden');
          this.querySelector('svg')?.classList.add('rotate-180');
        } else {
          content.setAttribute('hidden', '');
          this.querySelector('svg')?.classList.remove('rotate-180');
        }
      }
    });
  });

  // Collection Sort
  const sortSelect = document.getElementById('sort-by');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }

  // Discount Code Toggle
  const discountToggle = document.getElementById('discount-toggle');
  const discountForm = document.getElementById('discount-form');
  const discountIcon = document.getElementById('discount-icon');
  
  if (discountToggle && discountForm) {
    discountToggle.addEventListener('click', function() {
      const isHidden = discountForm.classList.contains('hidden');
      if (isHidden) {
        discountForm.classList.remove('hidden');
        if (discountIcon) {
          discountIcon.style.transform = 'rotate(45deg)';
        }
      } else {
        discountForm.classList.add('hidden');
        if (discountIcon) {
          discountIcon.style.transform = 'rotate(0deg)';
        }
      }
    });
  }

  // Discount Code Form
  const discountFormElement = document.getElementById('cart-discount-form');
  if (discountFormElement) {
    discountFormElement.addEventListener('submit', function(e) {
      e.preventDefault();
      const discountCode = document.getElementById('discount-code').value.trim();
      const discountMessage = document.getElementById('discount-message');
      
      if (!discountCode) {
        if (discountMessage) {
          discountMessage.textContent = 'Please enter a discount code';
          discountMessage.className = 'mt-2 text-xs text-red-600';
        }
        return;
      }

      // Store discount code in cart note (Shopify doesn't apply discounts in cart, only at checkout)
      // We'll redirect to checkout with the discount code
      if (discountMessage) {
        discountMessage.textContent = 'Redirecting to checkout with discount code...';
        discountMessage.className = 'mt-2 text-xs text-blue-600';
      }

      // Redirect to checkout with discount code
      window.location.href = `${window.routes.cart_url}?discount=${encodeURIComponent(discountCode)}`;
    });
  }

  // Initialize cart count on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCartCount);
  } else {
    updateCartCount();
  }

  // Add rotate utility class for SVG
  const style = document.createElement('style');
  style.textContent = '.rotate-180 { transform: rotate(180deg); }';
  document.head.appendChild(style);

})();

