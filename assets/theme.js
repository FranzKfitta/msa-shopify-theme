/**
 * Theme JavaScript
 * Handles cart functionality, filters, variant selection, and other interactivity
 */

(function() {
  'use strict';

  function setCookie(name, value, days) {
    try {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    } catch (e) {
      // no-op
    }
  }

  function getCookie(name) {
    try {
      const target = `${encodeURIComponent(name)}=`;
      const parts = document.cookie.split(';');
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (part.indexOf(target) === 0) return decodeURIComponent(part.substring(target.length));
      }
    } catch (e) {
      // no-op
    }
    return null;
  }

  // Cart Drawer Functionality
  const cartDrawer = document.getElementById('cart-drawer');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartIconBubble = document.getElementById('cart-icon-bubble');
  const cartDrawerClose = document.getElementById('cart-drawer-close');

  // Pre-order modal on product page
  const preorderModal = document.getElementById('preorder-modal');
  const preorderModalOverlay = preorderModal ? preorderModal.querySelector('[data-preorder-modal-overlay]') : null;
  const preorderModalClose = preorderModal ? preorderModal.querySelector('[data-preorder-modal-close]') : null;
  const preorderConfirmButton = preorderModal ? preorderModal.querySelector('[data-preorder-confirm]') : null;
  let preorderConfirmed = false;

  function openPreorderModal() {
    if (!preorderModal) return;
    preorderModal.classList.add('is-open');
    preorderModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePreorderModal() {
    if (!preorderModal) return;
    preorderModal.classList.remove('is-open');
    preorderModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

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

  if (preorderModalOverlay) {
    preorderModalOverlay.addEventListener('click', closePreorderModal);
  }

  if (preorderModalClose) {
    preorderModalClose.addEventListener('click', closePreorderModal);
  }

  if (preorderConfirmButton) {
    preorderConfirmButton.addEventListener('click', function() {
      preorderConfirmed = true;
      closePreorderModal();
      const productForm = document.getElementById('product-form');
      if (productForm) {
        productForm.requestSubmit();
      }
    });
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && preorderModal && preorderModal.classList.contains('is-open')) {
      closePreorderModal();
    }
  });

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
    const cartDrawerFooter = document.getElementById('cart-drawer-footer');
    if (!cartDrawerItems) return;

    // Update cart total
    if (cartTotal) {
      const currency = cart.currency?.iso_code || 'USD';
      cartTotal.textContent = `${formatMoney(cart.total_price, currency)} ${currency}`;
    }

    if (cart.item_count === 0) {
      cartDrawerItems.innerHTML = `
        <div class="px-6 py-12 text-center">
          <h3 class="text-xl font-bold text-foreground mb-4">YOUR CART IS EMPTY</h3>
          <p class="text-sm text-muted-foreground mb-6">Continue shopping to add items</p>
          <a href="${window.routes.all_products_collection_url || '/collections/all'}" class="cart-btn-default inline-block h-11">
            Continue shopping
          </a>
        </div>
      `;
      if (cartDrawerFooter) {
        cartDrawerFooter.classList.add('hidden');
      }
      return;
    }

    let html = '';
    cart.items.forEach(item => {
      html += `
        <div class="flex gap-4 px-6 py-5 border-b border-border" data-cart-item-key="${item.key}">
          <div class="w-20 h-20 flex-shrink-0 overflow-hidden">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" style="max-width: 80px; max-height: 80px; width: 100%; height: 100%;">
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-normal text-sm mb-1 text-foreground leading-tight">${item.product_title}</h3>
            ${item.variant_title !== 'Default Title' ? `<p class="text-xs text-muted-foreground mb-2">${item.variant_title}</p>` : ''}
            <p class="font-medium text-sm mb-3 text-foreground">${formatMoney(item.line_price, cart.currency?.iso_code)}</p>
            <div class="flex items-center gap-2">
              <button type="button" class="cart-item-decrease cart-btn-outline-icon h-8 w-8" data-item-key="${item.key}" data-variant-id="${item.variant_id}" aria-label="Decrease quantity">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <span class="text-sm font-medium min-w-[32px] text-center text-foreground">${item.quantity}</span>
              <button type="button" class="cart-item-increase cart-btn-outline-icon h-8 w-8" data-item-key="${item.key}" data-variant-id="${item.variant_id}" aria-label="Increase quantity">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          <button type="button" class="cart-item-remove cart-btn-ghost h-10 w-10 text-muted-foreground flex-shrink-0 self-start mt-1" data-item-key="${item.key}" data-variant-id="${item.variant_id}" aria-label="Remove item">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      `;
    });

    cartDrawerItems.innerHTML = html;

    if (cartDrawerFooter) {
      cartDrawerFooter.classList.remove('hidden');
    }

    attachCartItemListeners();
  }

  // Format Money
  function formatMoney(cents, currencyCode) {
    const currency = currencyCode || window.Shopify?.currency?.active || 'USD';
    return new Intl.NumberFormat(document.documentElement.lang || 'en', {
      style: 'currency',
      currency: currency
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

    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
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
      // First submit: show pre-order info modal instead of adding directly to cart
      if (!preorderConfirmed) {
        e.preventDefault();
        openPreorderModal();
        return;
      }

      e.preventDefault();
      
      const formData = new FormData(this);
      const addButton = document.getElementById('add-to-cart-button');
      
      if (addButton) {
        addButton.disabled = true;
        addButton.textContent = 'Adding...';
      }

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.description || 'Failed to add to cart');
          });
        }
        return response.json();
      })
      .then(data => {
        // Successfully added to cart
        updateCartCount();
        openCartDrawer();
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        alert(error.message || window.cartStrings.error);
      })
      .finally(() => {
        if (addButton) {
          addButton.disabled = false;
          addButton.textContent = window.variantStrings.addToCart;
        }

        // Reset confirmation so the modal can be shown again on a fresh visit
        preorderConfirmed = false;
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
        btn.classList.remove('is-selected');
        btn.classList.add('is-unselected');
      });
      this.classList.add('is-selected');
      this.classList.remove('is-unselected');

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
          discountIcon.classList.add('rotated');
        }
      } else {
        discountForm.classList.add('hidden');
        if (discountIcon) {
          discountIcon.classList.remove('rotated');
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

  // Search overlay (loupe)
  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');

  function openOverlay(overlayEl, toggleEl, focusSelector) {
    if (!overlayEl) return;
    overlayEl.hidden = false;
    overlayEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (toggleEl) toggleEl.setAttribute('aria-expanded', 'true');
    window.setTimeout(() => {
      if (focusSelector) {
        const input = overlayEl.querySelector(focusSelector);
        if (input) input.focus();
      }
    }, 50);
  }

  function closeOverlay(overlayEl, toggleEl) {
    if (!overlayEl) return;
    overlayEl.hidden = true;
    overlayEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (toggleEl) toggleEl.setAttribute('aria-expanded', 'false');
  }

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', function() {
      const isOpen = searchOverlay.getAttribute('aria-hidden') === 'false';
      if (isOpen) {
        closeOverlay(searchOverlay, searchToggle);
      } else {
        openOverlay(searchOverlay, searchToggle, '#overlay-search-input');
      }
    });

    searchOverlay.querySelectorAll('[data-overlay-close]').forEach(el => {
      el.addEventListener('click', function() {
        closeOverlay(searchOverlay, searchToggle);
      });
    });
  }

  // Predictive search results inside the search overlay
  const overlaySearchInput = document.getElementById('overlay-search-input');
  const predictiveResultsRoot = document.querySelector('[data-predictive-search-results]');

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderPredictiveProducts(products) {
    if (!predictiveResultsRoot) return;

    if (!products || products.length === 0) {
      predictiveResultsRoot.innerHTML = '';
      predictiveResultsRoot.hidden = true;
      return;
    }

    const html = products.map(p => {
      const url = p.url || '#';
      const title = escapeHtml(p.title);
      const img = p.featured_image && p.featured_image.url ? p.featured_image.url : null;

      return `
        <a class="predictive-search-item" href="${url}">
          <span class="predictive-search-thumb">${img ? `<img src="${img}" alt="${title}" loading="lazy">` : ''}</span>
          <span class="predictive-search-title">${title}</span>
        </a>
      `;
    }).join('');

    predictiveResultsRoot.innerHTML = html;
    predictiveResultsRoot.hidden = false;
  }

  let predictiveTimer = null;
  let predictiveAbort = null;

  function clearPredictive() {
    if (!predictiveResultsRoot) return;
    predictiveResultsRoot.innerHTML = '';
    predictiveResultsRoot.hidden = true;
  }

  function fetchPredictive(term) {
    if (!window.routes || !window.routes.predictive_search_url) return;
    if (!predictiveResultsRoot) return;

    if (predictiveAbort) {
      try { predictiveAbort.abort(); } catch (e) { /* no-op */ }
    }
    predictiveAbort = new AbortController();

    const url = new URL(window.routes.predictive_search_url, window.location.origin);
    url.searchParams.set('q', term);
    url.searchParams.set('resources[type]', 'product');
    url.searchParams.set('resources[limit]', '6');
    url.searchParams.set('resources[options][unavailable_products]', 'hide');

    fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: predictiveAbort.signal
    })
      .then(res => {
        if (!res.ok) throw new Error('Predictive search failed');
        return res.json();
      })
      .then(data => {
        const products = data && data.resources && data.resources.results && data.resources.results.products
          ? data.resources.results.products
          : [];
        renderPredictiveProducts(products);
      })
      .catch(err => {
        if (err && err.name === 'AbortError') return;
        clearPredictive();
      });
  }

  if (overlaySearchInput && predictiveResultsRoot) {
    overlaySearchInput.addEventListener('input', function() {
      const term = String(this.value || '').trim();
      if (predictiveTimer) window.clearTimeout(predictiveTimer);

      if (term.length < 2) {
        clearPredictive();
        return;
      }

      predictiveTimer = window.setTimeout(() => {
        fetchPredictive(term);
      }, 180);
    });

    overlaySearchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        clearPredictive();
      }
    });
  }

  // Newsletter popup
  const newsletterOverlay = document.getElementById('newsletter-popup');
  const newsletterConfig = newsletterOverlay ? newsletterOverlay.querySelector('[data-newsletter-config]') : null;

  if (newsletterOverlay && newsletterConfig) {
    const cookieName = 'msa_newsletter_dismissed';
    const delayMs = parseInt(newsletterConfig.getAttribute('data-newsletter-delay-ms') || '2000', 10);
    const cookieDays = parseInt(newsletterConfig.getAttribute('data-newsletter-cookie-days') || '30', 10);

    const dismissed = getCookie(cookieName);
    if (!dismissed) {
      window.setTimeout(() => {
        openOverlay(newsletterOverlay, null, 'input[type="email"]');
      }, delayMs);
    }

    function dismissNewsletter() {
      setCookie(cookieName, '1', cookieDays);
      closeOverlay(newsletterOverlay, null);
    }

    newsletterOverlay.querySelectorAll('[data-newsletter-close]').forEach(el => {
      el.addEventListener('click', dismissNewsletter);
    });

    const newsletterForm = newsletterOverlay.querySelector('form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function() {
        setCookie(cookieName, '1', cookieDays);
      });
    }
  }

  // BUYERS ONLY access gate (code)
  const buyersOnlyRoot = document.querySelector('[data-buyers-only]');
  const buyersOnlyForm = document.querySelector('[data-buyers-only-form]');
  const buyersOnlyConfig = document.querySelector('[data-buyers-only-config]');
  const buyersOnlyError = document.querySelector('[data-buyers-only-error]');

  if (buyersOnlyRoot && buyersOnlyForm && buyersOnlyConfig) {
    const accessCode = buyersOnlyConfig.getAttribute('data-buyers-only-code') || '';
    const redirectUrl = buyersOnlyConfig.getAttribute('data-buyers-only-redirect-url') || '/';

    buyersOnlyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = buyersOnlyForm.querySelector('input[name="buyers-only-code"]');
      const value = input ? String(input.value || '') : '';
      const ok = value === accessCode;

      if (!ok) {
        if (buyersOnlyError) buyersOnlyError.classList.remove('hidden');
        return;
      }

      try {
        window.sessionStorage.setItem('msa_buyers_only_ok', '1');
      } catch (err) {
        // no-op
      }

      window.location.href = redirectUrl;
    });
  }

  // BUYERS ONLY collection guard (basic anti-bypass)
  const buyersOnlyGuard = document.querySelector('[data-buyers-only-collection-guard]');
  if (buyersOnlyGuard) {
    let ok = false;
    try {
      ok = window.sessionStorage.getItem('msa_buyers_only_ok') === '1';
    } catch (err) {
      ok = false;
    }

    if (!ok) {
      const gateUrl = buyersOnlyGuard.getAttribute('data-buyers-only-gate-url') || '/pages/buyers-only';
      window.location.replace(gateUrl);
    }
  }

  // BUYERS ONLY page guard (basic anti-bypass)
  const buyersOnlyPageGuard = document.querySelector('[data-buyers-only-page-guard]');
  if (buyersOnlyPageGuard) {
    let ok = false;
    try {
      ok = window.sessionStorage.getItem('msa_buyers_only_ok') === '1';
    } catch (err) {
      ok = false;
    }

    if (!ok) {
      const gateUrl = buyersOnlyPageGuard.getAttribute('data-buyers-only-gate-url') || '/pages/buyers-only';
      window.location.replace(gateUrl);
    }
  }

  // BUYERS ONLY Hub - Modal functionality
  const buyersOnlyModals = document.querySelectorAll('.buyers-only-hub__modal');
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  
  function openBuyersModal(modalType, pdfUrl = null) {
    const modal = document.querySelector(`[data-modal="${modalType}"]`);
    if (!modal) return;

    if (modalType === 'pdf-viewer' && pdfUrl) {
      const iframe = document.getElementById('buyers-only-pdf-iframe');
      const downloadLink = document.getElementById('buyers-only-pdf-download');
      if (iframe) iframe.src = pdfUrl;
      if (downloadLink) downloadLink.href = pdfUrl;
    }

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeBuyersModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-active');
    document.body.style.overflow = '';

    const iframe = modal.querySelector('iframe');
    if (iframe) {
      setTimeout(() => { iframe.src = ''; }, 300);
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const modalType = this.getAttribute('data-modal-trigger');
      const pdfUrl = this.getAttribute('data-pdf-url');
      openBuyersModal(modalType, pdfUrl);
    });
  });

  buyersOnlyModals.forEach(modal => {
    const closeButtons = modal.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => closeBuyersModal(modal));
    });
  });

  // Close overlays on ESC
  document.addEventListener('keydown', function(event) {
    if (event.key !== 'Escape') return;
    if (searchOverlay && searchOverlay.getAttribute('aria-hidden') === 'false') {
      closeOverlay(searchOverlay, searchToggle);
    }
    if (newsletterOverlay && newsletterOverlay.getAttribute('aria-hidden') === 'false') {
      closeOverlay(newsletterOverlay, null);
    }
    
    buyersOnlyModals.forEach(modal => {
      if (modal.classList.contains('is-active')) {
        closeBuyersModal(modal);
      }
    });
  });

  // Expose cart count updater globally so other scripts (e.g. collection quick-add)
  // can trigger a unified cart refresh and drawer update
  if (typeof window !== 'undefined') {
    window.updateCartCount = updateCartCount;
  }

  // Add rotate utility class for SVG
  const style = document.createElement('style');
  style.textContent = '.rotate-180 { transform: rotate(180deg); }';
  document.head.appendChild(style);

  // Mobile product gallery thumbnail behavior
  function initProductGallery() {
    const gallery = document.querySelector('.product-gallery');
    if (!gallery) return;

    const mainImage = gallery.querySelector('[data-main-image]');
    const thumbs = gallery.querySelectorAll('.product-thumb');
    if (!mainImage || thumbs.length === 0) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        const newSrc = this.getAttribute('data-image-src');
        const newAlt = this.getAttribute('data-image-alt') || mainImage.alt;
        if (newSrc) {
          mainImage.src = newSrc;
        }
        mainImage.alt = newAlt;

        thumbs.forEach(t => t.classList.remove('is-active'));
        this.classList.add('is-active');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductGallery);
  } else {
    initProductGallery();
  }

  // Sticky product details on desktop
  function initProductSticky() {
    const layout = document.querySelector('.product-layout');
    const details = document.querySelector('.product-details');
    if (!layout || !details) return;

    const MIN_WIDTH = 1024;
    let layoutTop = 0;
    let layoutBottom = 0;
    let headerOffset = 0;
    let detailsWidth = 0;
    let detailsLeft = 0;

    function getHeaderOffset() {
      let offset = 0;
      const announcement = document.querySelector('.announcement-bar');
      const header = document.getElementById('main-header');
      if (announcement) offset += announcement.offsetHeight || 0;
      if (header) offset += header.offsetHeight || 0;
      return offset;
    }

    function resetStyles() {
      details.style.position = '';
      details.style.top = '';
      details.style.bottom = '';
      details.style.width = '';
      details.style.left = '';
      details.style.height = '';
    }

    function onScroll() {
      if (window.innerWidth < MIN_WIDTH) {
        resetStyles();
        return;
      }

      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const start = layoutTop - headerOffset;
      const end = layoutBottom - details.offsetHeight - headerOffset;

      if (scrollY <= start) {
        resetStyles();
        details.style.position = 'relative';
      } else if (scrollY >= end) {
        resetStyles();
        details.style.position = 'absolute';
        details.style.bottom = '0';
        details.style.width = detailsWidth + 'px';
      } else {
        resetStyles();

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const fixedHeight = viewportHeight - headerOffset;

        details.style.position = 'fixed';
        details.style.top = headerOffset + 'px';
        details.style.width = detailsWidth + 'px';
        details.style.left = detailsLeft + 'px';

        if (fixedHeight > 0) {
          details.style.height = fixedHeight + 'px';
          details.style.overflowY = 'auto';
        }
      }
    }

    function recalcBounds() {
      resetStyles();

      if (window.innerWidth < MIN_WIDTH) {
        return;
      }

      headerOffset = getHeaderOffset();

      const layoutRect = layout.getBoundingClientRect();
      const detailsRect = details.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      layoutTop = layoutRect.top + scrollY;
      layoutBottom = layoutTop + layout.offsetHeight;
      detailsWidth = detailsRect.width;
      detailsLeft = detailsRect.left;

      onScroll();
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', function() {
      window.setTimeout(recalcBounds, 100);
    });

    recalcBounds();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductSticky);
  } else {
    initProductSticky();
  }

  // Pre-order steps carousel on the dedicated page
  function initPreorderCarousel() {
    const section = document.querySelector('[data-preorder-section]');
    if (!section) return;

    const carousel = section.querySelector('[data-preorder-carousel]');
    if (!carousel) return;

    const steps = Array.from(carousel.querySelectorAll('[data-preorder-step]'));
    if (!steps.length) return;

    const prevBtn = carousel.querySelector('[data-preorder-prev]');
    const nextBtn = carousel.querySelector('[data-preorder-next]');
    const dotsContainer = carousel.querySelector('[data-preorder-dots]');
    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('[data-step-dot]')) : [];

    let currentIndex = 0;

    function showStep(index) {
      const maxIndex = steps.length - 1;
      if (index < 0) index = maxIndex;
      if (index > maxIndex) index = 0;
      currentIndex = index;

      steps.forEach((step, i) => {
        if (i === currentIndex) {
          step.classList.add('is-active');
        } else {
          step.classList.remove('is-active');
        }
      });

      if (dots.length) {
        dots.forEach((dot, i) => {
          if (i === currentIndex) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        showStep(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        showStep(currentIndex + 1);
      });
    }

    if (dots.length) {
      dots.forEach(dot => {
        dot.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-step-index'), 10) || 0;
          showStep(index);
        });
      });
    }

    showStep(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreorderCarousel);
  } else {
    initPreorderCarousel();
  }

})();

