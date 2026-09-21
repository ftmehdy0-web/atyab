/**
 * أطياب للعطور - منطق المتجر الإلكتروني وإدارة الحالة
 * متجر العطور الفاخر ثنائي اللغة (العربية / English)
 * ATYAB PERFUMES - Luxury Multilingual E-Commerce Logic & State Management
 */

// حالة التطبيق (Application State)
const urlParams = new URLSearchParams(window.location.search);
const paramLang = urlParams.get("lang");
const initialLang = (paramLang === "ar" || paramLang === "en") ? paramLang : (localStorage.getItem("atyab_language") || localStorage.getItem("aytyab_language") || "ar");

// The storefront is static, so this is a local profile only—not production authentication.
// Passwords are deliberately never written to localStorage.
function readStoredAccount() {
  try {
    const rawAccount = localStorage.getItem("atyab_account") || localStorage.getItem("aytyab_account");
    const account = rawAccount ? JSON.parse(rawAccount) : null;
    return account && typeof account.name === "string" && typeof account.email === "string" ? account : null;
  } catch {
    return null;
  }
}

const state = {
  language: initialLang,
  cart: JSON.parse(localStorage.getItem("atyab_cart") || localStorage.getItem("aytyab_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("atyab_wishlist") || localStorage.getItem("aytyab_wishlist") || "[]"),
  currency: localStorage.getItem("atyab_currency") || localStorage.getItem("aytyab_currency") || "SAR",
  filter: "all",
  searchQuery: "",
  sortBy: "featured",
  appliedCoupon: null,
  giftWrap: false,
  account: readStoredAccount(),
  rates: {
    SAR: { symbolAr: "ر.س", symbolEn: "SAR", rate: 1, freeShipThreshold: 150, nameAr: "ريال سعودي", nameEn: "Saudi Riyal" },
    AED: { symbolAr: "د.إ", symbolEn: "AED", rate: 0.98, freeShipThreshold: 150, nameAr: "درهم إماراتي", nameEn: "UAE Dirham" },
    USD: { symbolAr: "$", symbolEn: "$", rate: 0.27, freeShipThreshold: 40, nameAr: "دولار أمريكي", nameEn: "US Dollar" }
  },
  quiz: {
    step: 1,
    answers: {
      vibe: null,
      occasion: null,
      notes: null
    }
  }
};

// ===================================================================
// دالة الترجمة والمساعدة متعددة اللغات (I18N TRANSLATION HELPER)
// ===================================================================
function t(key, replacements = {}) {
  const lang = state.language || "ar";
  const transObj = (typeof ATYAB_TRANSLATIONS !== "undefined") ? ATYAB_TRANSLATIONS : (typeof AYTYAB_TRANSLATIONS !== "undefined" ? AYTYAB_TRANSLATIONS : null);
  let str = (transObj && transObj[lang] && transObj[lang][key]) ||
    (transObj && transObj["ar"] && transObj["ar"][key]) || key;
  for (const [k, v] of Object.entries(replacements)) {
    str = str.replaceAll(`{${k}}`, v);
  }
  return str;
}

// ===================================================================
// دوال تبديل اللغة (LANGUAGE TOGGLE & SWITCHING)
// ===================================================================
function toggleLangDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("lang-selector-dropdown");
  dropdown?.classList.toggle("open");
}

function switchLanguage(lang, notify = true) {
  if (lang !== "ar" && lang !== "en") lang = "ar";
  state.language = lang;
  localStorage.setItem("atyab_language", lang);
  localStorage.setItem("aytyab_language", lang);

  // تحديث سمات HTML والاتجاه (RTL / LTR)
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // إغلاق القائمة المنسدلة
  const dropdown = document.getElementById("lang-selector-dropdown");
  dropdown?.classList.remove("open");

  // تحديث تسمية الزر وحالة الاختيار
  const label = document.getElementById("current-lang-label");
  if (label) {
    label.textContent = lang === "en" ? "English" : "العربية";
  }

  const topLangText = document.getElementById("top-lang-text");
  if (topLangText) {
    topLangText.textContent = lang === "ar" ? "English" : "العربية";
  }

  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.querySelectorAll(".mobile-lang-btn").forEach((btn) => {
    btn.classList.toggle("active", (btn.textContent.includes("العربية") && lang === "ar") || (btn.textContent.includes("English") && lang === "en"));
  });

  // تحديث جميع النصوص التي تحمل السمة data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translated = t(key);
    if (translated && translated !== key) {
      el.innerHTML = translated;
    }
  });

  // تحديث النصوص في السمات (placeholder / title)
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const translated = t(key);
    if (translated) el.placeholder = translated;
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    const translated = t(key);
    if (translated) {
      el.title = translated;
      el.setAttribute("aria-label", translated);
    }
  });

  // تحديث خيارات محدد العملة
  const currSelect = document.getElementById("currency-select");
  if (currSelect) {
    currSelect.options[0].text = lang === "en" ? "Saudi Riyal (SAR)" : "ريال سعودي (ر.س)";
    currSelect.options[1].text = lang === "en" ? "UAE Dirham (AED)" : "درهم إماراتي (د.إ)";
    currSelect.options[2].text = lang === "en" ? "US Dollar ($)" : "دولار أمريكي ($)";
  }

  // تحديث أسعار قسم البخور الثابت
  const bakhoorOfficialPrice = document.getElementById("bakhoor-official-price");
  const bakhoorOldPrice = document.getElementById("bakhoor-old-price");
  if (bakhoorOfficialPrice) bakhoorOfficialPrice.textContent = formatPrice(30);
  if (bakhoorOldPrice) bakhoorOldPrice.textContent = formatPrice(50);

  // إعادة تصيير الأقسام الديناميكية
  renderProducts();
  renderShowcase();
  updateCartUI();
  updateWishlistBadge();
  updateAccountUI();

  if (document.getElementById("scent-quiz-modal")?.classList.contains("active")) {
    renderQuizStep();
  }

  // إذا كنا في صفحة المنتج المستقلة، أعد تصييرها أيضاً
  if (typeof renderProductPage === "function") {
    renderProductPage();
  }
  if (typeof updatePageSEO === "function") {
    updatePageSEO();
  }

  if (notify) {
    showToast(t("toast_lang_title"), t("toast_lang_msg"), "🌐");
  }
}

// ===================================================================
// دوال تنسيق الأسعار والعملة (CURRENCY HELPERS)
// ===================================================================
function formatPrice(amountSAR) {
  const currentRate = state.rates[state.currency] || state.rates.SAR;
  const converted = Math.round(amountSAR * currentRate.rate);
  const isEn = state.language === "en";

  if (state.currency === "USD") {
    return isEn ? `$${converted}` : `${converted} $`;
  }

  const sym = isEn ? currentRate.symbolEn : currentRate.symbolAr;
  return `${converted} ${sym}`;
}

function setCurrency(curr) {
  if (state.rates[curr]) {
    state.currency = curr;
    localStorage.setItem("atyab_currency", curr);
    localStorage.setItem("aytyab_currency", curr);
    const bakhoorOfficialPrice = document.getElementById("bakhoor-official-price");
    const bakhoorOldPrice = document.getElementById("bakhoor-old-price");
    if (bakhoorOfficialPrice) bakhoorOfficialPrice.textContent = formatPrice(30);
    if (bakhoorOldPrice) bakhoorOldPrice.textContent = formatPrice(50);
    renderProducts();
    updateCartUI();

    document.querySelectorAll(".mobile-curr-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.textContent.includes(curr));
    });

    // تحديث صفحة المنتج المنفصلة إن وجدت
    if (typeof renderProductPage === "function") {
      renderProductPage();
    }

    const currName = state.language === "en" ? state.rates[curr].nameEn : state.rates[curr].nameAr;
    showToast(t("toast_currency_title"), t("toast_currency_msg", { name: currName }));
  }
}

// ===================================================================
// تهيئة المتجر عند تحميل الصفحة (DOM INITIALIZATION)
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHeroSlider();
  switchLanguage(state.language, false);
  updateAccountUI();
  setupEventListeners();
  setTimeout(() => {
    initScrollReveal();
  }, 100);
});

function initHeader() {
  const header = document.querySelector(".main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }, { passive: true });

  const currSelect = document.getElementById("currency-select");
  if (currSelect) {
    currSelect.value = state.currency;
    currSelect.addEventListener("change", (e) => setCurrency(e.target.value));
  }

  // إغلاق قائمة اللغة عند النقر خارجها
  document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("lang-selector-dropdown");
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
}

// ===================================================================
// نظام الظهور الانسيابي عند التمرير (SMOOTH SCROLL REVEAL OBSERVER)
// ===================================================================
let scrollObserver = null;

function initScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".showcase-item, .chapter-card, .product-card, .trust-card, .review-card").forEach(el => {
      el.classList.add("revealed");
    });
    return;
  }

  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -30px 0px"
  });

  const targets = document.querySelectorAll(
    ".showcase-item, .chapter-card, .product-card, .trust-card, .category-bubble-card, .review-card, .pdp-tier-block, .pdp-accord-item, .spotlight-banner-wide, .scent-finder-banner"
  );

  targets.forEach((el, idx) => {
    if (!el.classList.contains("revealed")) {
      el.classList.add("reveal-item");
      const delayNum = (idx % 4) + 1;
      el.classList.add(`delay-${delayNum}`);
      scrollObserver.observe(el);
    }
  });
}

// ===================================================================
// التحريك والتنقل في السلايدر العريض الرئيسي (CINEMATIC HERO SLIDER)
// ===================================================================
let currentSlide = 0;
let slideInterval = null;

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  if (!slides.length) return;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((s, idx) => {
      s.classList.toggle("active", idx === currentSlide);
    });

    dots.forEach((d, idx) => {
      d.classList.toggle("active", idx === currentSlide);
    });
  }

  window.changeHeroSlide = function (delta) {
    showSlide(currentSlide + delta);
    resetSlideTimer();
  };

  window.goToHeroSlide = function (index) {
    showSlide(index);
    resetSlideTimer();
  };

  function startSlideTimer() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5500);
  }

  function resetSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
    startSlideTimer();
  }

  startSlideTimer();

  const sliderContainer = document.querySelector(".hero-slider-container");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => clearInterval(slideInterval));
    sliderContainer.addEventListener("mouseleave", () => startSlideTimer());
  }
}

// التصفية السريعة عبر دوائر التصنيفات
function filterByCategory(category) {
  state.filter = category;
  document.querySelectorAll(".filter-tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.filter === category);
  });
  renderProducts();
  const catalogEl = document.getElementById("catalog");
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: "smooth" });
  }
}

// ===================================================================
// عرض قسم "مقدَّر من الجميع" (SHOWCASE GRID)
// ===================================================================
function renderShowcase() {
  const container = document.getElementById("showcase-grid-items");
  if (!container) return;

  container.innerHTML = ATYAB_PRODUCTS.map((p) => {
    const lp = getProductLocalized(p, state.language);
    return `
      <div class="showcase-item">
        <a href="product.html?id=${p.id}" class="showcase-media" style="display: block;">
          <img src="${p.image}" alt="${lp.displayName}" loading="lazy" />
        </a>
        <h4 class="showcase-title">
          <a href="product.html?id=${p.id}">${lp.displayName}</a>
        </h4>
        <div class="showcase-price">${formatPrice(p.priceSAR)}</div>
        <a href="product.html?id=${p.id}" class="btn-classic" style="display: inline-block; padding: 6px 14px; font-size: 0.78rem;">
          ${t("showcase_shop_now")}
        </a>
      </div>
    `;
  }).join("");
  initScrollReveal();
}

// ===================================================================
// عرض كتالوج المنتجات الرئيسي (MAIN PRODUCT CATALOG RENDERING)
// ===================================================================
function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const query = state.searchQuery.toLowerCase().trim();

  let filtered = ATYAB_PRODUCTS.filter((p) => {
    const matchesCategory = state.filter === "all" || p.category === state.filter;
    const matchesSearch =
      query === "" ||
      p.name.toLowerCase().includes(query) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(query)) ||
      (p.englishName && p.englishName.toLowerCase().includes(query)) ||
      p.subtitle.toLowerCase().includes(query) ||
      (p.subtitleEn && p.subtitleEn.toLowerCase().includes(query)) ||
      p.family.toLowerCase().includes(query) ||
      (p.familyEn && p.familyEn.toLowerCase().includes(query)) ||
      p.notes.top.concat(p.notes.heart, p.notes.base).some((n) => n.toLowerCase().includes(query)) ||
      (p.notesEn && p.notesEn.top.concat(p.notesEn.heart, p.notesEn.base).some((n) => n.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  // الترتيب
  if (state.sortBy === "price-low") {
    filtered.sort((a, b) => a.priceSAR - b.priceSAR);
  } else if (state.sortBy === "price-high") {
    filtered.sort((a, b) => b.priceSAR - a.priceSAR);
  } else if (state.sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <span style="font-size: 2.5rem; color: var(--gold-primary); display: block; margin-bottom: 12px;">⚜️</span>
        <h3 style="font-size: 1.4rem;">${t("no_products_title")}</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">${t("no_products_desc")}</p>
        <button class="btn btn-secondary" onclick="resetFilters()" style="margin-top: 16px;">${t("reset_filters_btn")}</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map((product) => {
      const lp = getProductLocalized(product, state.language);
      const isWishlisted = state.wishlist.includes(product.id);
      const topNote = (lp.displayNotes && lp.displayNotes.top && lp.displayNotes.top[0]) || "";
      const heartNote = (lp.displayNotes && lp.displayNotes.heart && lp.displayNotes.heart[0]) || "";
      const baseNote = (lp.displayNotes && lp.displayNotes.base && lp.displayNotes.base[0]) || "";

      return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-media">
          <span class="badge-tag ${product.badgeType}">${lp.displayBadge}</span>
          <button class="wishlist-toggle ${isWishlisted ? "active" : ""}" 
                  onclick="toggleWishlist('${product.id}')" 
                  title="${isWishlisted ? t("toast_wishlist_removed") : t("wishlist_tooltip")}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${lp.displayName}" loading="lazy" />
          </a>
          <div class="quick-view-overlay">
            <a href="product.html?id=${product.id}" class="btn-quick-view" style="margin-bottom: 6px; text-decoration: none;">
              ${t("pdp_view_product_btn") || "تفاصيل العطر"}
            </a>
            <button class="btn-quick-view" onclick="openQuickView('${product.id}')" style="background: rgba(0,0,0,0.7); font-size: 0.75rem; padding: 6px 12px;">
              ${t("quick_view_btn")}
            </button>
          </div>
        </div>
        
        <div class="product-details">
          <div class="product-arabic-title">${lp.displayFamily}</div>
          <h3 class="product-title">
            <a href="product.html?id=${product.id}">${lp.displayName}</a>
          </h3>
          <p class="product-subtitle">${lp.displaySubtitle}</p>

          <div class="note-pills">
            <span class="note-pill">${topNote}</span>
            <span class="note-pill">${heartNote}</span>
            <span class="note-pill">${baseNote}</span>
          </div>

          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span style="font-weight: 700; color: #000;">${product.rating}</span>
            <span class="rating-count">(${product.reviewsCount} ${t("reviews_count_suffix")})</span>
          </div>

          <div class="product-footer">
            <div class="price-box">
              <div class="min-price-indicator">
                <span class="from-label">${t("from_label")}</span>
                <span class="current-price">${formatPrice(product.priceSAR)}</span>
              </div>
              <span class="original-price">${formatPrice(product.originalPriceSAR)}</span>
            </div>
            <button class="btn-add-cart" onclick="addToCart('${product.id}', '${product.defaultSize}', 1)" title="${t("cart_tooltip")}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
  initScrollReveal();
}

function resetFilters() {
  state.filter = "all";
  state.searchQuery = "";
  document.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"));
  document.querySelector('.filter-tab[data-filter="all"]')?.classList.add("active");
  renderProducts();
}

// ===================================================================
// إدارة سلة المشتريات (CART MANAGEMENT)
// ===================================================================
function addToCart(productId, size, quantity = 1) {
  const product = ATYAB_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const lp = getProductLocalized(product, state.language);
  const chosenSize = size || product.defaultSize;

  const existingIndex = state.cart.findIndex((item) => item.id === productId && item.size === chosenSize);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      nameEn: product.nameEn || product.englishName,
      image: product.image,
      priceSAR: product.priceSAR,
      size: chosenSize,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
  showToast(t("toast_cart_added_title"), t("toast_cart_added_msg", { name: lp.displayName }));
}

function removeFromCart(productId, size) {
  state.cart = state.cart.filter((item) => !(item.id === productId && item.size === size));
  saveCart();
  updateCartUI();
}

function updateCartQty(productId, size, delta) {
  const item = state.cart.find((i) => i.id === productId && i.size === size);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId, size);
  } else {
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem("atyab_cart", JSON.stringify(state.cart));
  localStorage.setItem("aytyab_cart", JSON.stringify(state.cart));
}

function updateCartUI() {
  const countBadges = document.querySelectorAll(".cart-count-badge");
  const cartBody = document.getElementById("cart-drawer-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const discountEl = document.getElementById("cart-discount");
  const totalEl = document.getElementById("cart-total");
  const meterProgress = document.getElementById("shipping-meter-progress");
  const meterText = document.getElementById("shipping-meter-text");

  // عدد المنتجات
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  countBadges.forEach((b) => (b.textContent = totalItems));

  // المجموع الفرعي بالريال السعودي
  const subtotalSAR = state.cart.reduce((sum, item) => sum + (item.priceSAR || 0) * item.quantity, 0);

  // الخصم
  let discountSAR = 0;
  if (state.appliedCoupon === "ATYAB10" || state.appliedCoupon === "AYTYAB10") {
    discountSAR = Math.round(subtotalSAR * 0.1);
  }

  const finalTotalSAR = Math.max(0, subtotalSAR - discountSAR);

  // شريط الشحن المجاني (150 ر.س)
  const freeThreshold = 150;
  const progressPercent = Math.min(100, (subtotalSAR / freeThreshold) * 100);

  if (meterProgress) {
    meterProgress.style.width = `${progressPercent}%`;
  }

  if (meterText) {
    if (subtotalSAR >= freeThreshold) {
      meterText.innerHTML = t("shipping_meter_qualified");
    } else {
      const remainingSAR = freeThreshold - subtotalSAR;
      meterText.innerHTML = t("shipping_meter_unqualified", { diff: formatPrice(remainingSAR) });
    }
  }

  // تحديث نصوص الفاتورة
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotalSAR);
  if (discountEl) discountEl.textContent = discountSAR > 0 ? `-${formatPrice(discountSAR)} (10%)` : formatPrice(0);
  if (totalEl) totalEl.textContent = formatPrice(finalTotalSAR);

  // عرض العناصر بالسلة
  if (!cartBody) return;

  if (state.cart.length === 0) {
    cartBody.innerHTML = `
      <div style="text-align: center; padding: 50px 20px;">
        <span style="font-size: 3rem; color: var(--gold-primary); display: block; margin-bottom: 12px;">⚜️</span>
        <h4 style="font-size: 1.25rem;">${t("cart_empty_title")}</h4>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 8px 0 24px;">${t("cart_empty_desc")}</p>
        <button class="btn btn-primary" onclick="closeCartDrawer(); window.location.href='#catalog';">
          ${t("cart_empty_btn")}
        </button>
      </div>
    `;
    return;
  }

  cartBody.innerHTML = state.cart
    .map((item) => {
      const isEn = state.language === "en";
      const itemTitle = isEn ? (item.nameEn || item.name) : item.name;
      return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${itemTitle}" />
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-title">${itemTitle}</h4>
          <div class="cart-item-size">${item.size}</div>
          <div class="cart-item-price">${formatPrice(item.priceSAR || 0)}</div>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateCartQty('${item.id}', '${item.size}', -1)">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQty('${item.id}', '${item.size}', 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}', '${item.size}')">${t("cart_item_remove")}</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  if (drawer) {
    drawer.style.visibility = "visible";
    drawer.classList.add("active");
  }
  if (backdrop) {
    backdrop.style.visibility = "visible";
    backdrop.classList.add("active");
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  drawer?.classList.remove("active");
  backdrop?.classList.remove("active");
  setTimeout(() => {
    if (drawer && !drawer.classList.contains("active")) {
      drawer.style.visibility = "hidden";
    }
    if (backdrop && !backdrop.classList.contains("active")) {
      backdrop.style.visibility = "hidden";
    }
  }, 460);
}

function openMobileNav() {
  const drawer = document.getElementById("mobile-nav-drawer");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  if (drawer) {
    drawer.style.visibility = "visible";
    drawer.classList.add("active");
  }
  if (backdrop) {
    backdrop.style.visibility = "visible";
    backdrop.classList.add("active");
  }
}

function closeMobileNav() {
  const drawer = document.getElementById("mobile-nav-drawer");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  drawer?.classList.remove("active");
  backdrop?.classList.remove("active");
  setTimeout(() => {
    if (drawer && !drawer.classList.contains("active")) {
      drawer.style.visibility = "hidden";
    }
    if (backdrop && !backdrop.classList.contains("active")) {
      backdrop.style.visibility = "hidden";
    }
  }, 460);
}

function applyCoupon() {
  const input = document.getElementById("coupon-input");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === "ATYAB10" || code === "AYTYAB10") {
    state.appliedCoupon = "ATYAB10";
    updateCartUI();
    showToast(t("toast_coupon_success_title"), t("toast_coupon_success_msg"));
  } else if (code === "") {
    showToast(t("toast_coupon_empty_title"), t("toast_coupon_empty_msg"));
  } else {
    showToast(t("toast_coupon_invalid_title"), t("toast_coupon_invalid_msg"));
  }
}

// ===================================================================
// إدارة قائمة المفضلة (WISHLIST)
// ===================================================================
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = ATYAB_PRODUCTS.find((p) => p.id === productId);
  const lp = product ? getProductLocalized(product, state.language) : null;

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(t("toast_wishlist_removed"), lp ? lp.displayName : "");
  } else {
    state.wishlist.push(productId);
    showToast(t("toast_wishlist_added"), lp ? lp.displayName : "", "❤️");
  }

  localStorage.setItem("atyab_wishlist", JSON.stringify(state.wishlist));
  localStorage.setItem("aytyab_wishlist", JSON.stringify(state.wishlist));
  updateWishlistBadge();
  renderProducts();
}

function updateWishlistBadge() {
  const badges = document.querySelectorAll(".wishlist-count-badge");
  badges.forEach((b) => (b.textContent = state.wishlist.length));
}

function openWishlistModal() {
  const modal = document.getElementById("wishlist-modal");
  const content = document.getElementById("wishlist-items-container");
  if (!modal || !content) return;

  const wishlistedProducts = ATYAB_PRODUCTS.filter((p) => state.wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    content.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 10px;">🤍</span>
        <h4 style="font-size: 1.25rem;">${t("wishlist_empty_title")}</h4>
        <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 6px;">${t("wishlist_empty_desc")}</p>
      </div>
    `;
  } else {
    content.innerHTML = wishlistedProducts
      .map((p) => {
        const lp = getProductLocalized(p, state.language);
        return `
        <div style="display: flex; gap: 16px; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--border-light);">
          <img src="${p.image}" alt="${lp.displayName}" style="width: 65px; height: 65px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-light);" />
          <div style="flex: 1;">
            <h4 style="font-size: 1rem; font-weight: 700;">${lp.displayName}</h4>
            <span style="color: var(--gold-primary); font-weight: 800; font-size: 0.95rem;">${t("from_label")} ${formatPrice(p.priceSAR)}</span>
          </div>
          <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.8rem;" onclick="addToCart('${p.id}', '${p.defaultSize}', 1); toggleWishlist('${p.id}');">
            ${t("wishlist_to_cart_btn")}
          </button>
        </div>
      `;
      })
      .join("");
  }

  modal.classList.add("active");
}

function closeWishlistModal() {
  document.getElementById("wishlist-modal")?.classList.remove("active");
}

// ===================================================================
// الحساب المحلي (LOCAL ACCOUNT EXPERIENCE)
// ===================================================================
function updateAccountUI() {
  const accountButton = document.getElementById("account-action-btn");
  const accountIcon = document.getElementById("account-action-icon");
  const accountInitial = document.getElementById("account-action-initial");
  const signedInPanel = document.getElementById("account-signed-in-panel");
  const accountTabs = document.getElementById("account-tabs");

  if (accountButton) {
    const isSignedIn = Boolean(state.account);
    accountButton.classList.toggle("signed-in", isSignedIn);
    accountButton.title = t(isSignedIn ? "account_signed_in_tooltip" : "account_tooltip");
    accountButton.setAttribute("aria-label", accountButton.title);
    if (accountIcon) accountIcon.hidden = isSignedIn;
    if (accountInitial) {
      accountInitial.hidden = !isSignedIn;
      accountInitial.textContent = isSignedIn ? state.account.name.trim().charAt(0).toUpperCase() : "";
    }
  }

  document.querySelectorAll(".account-signed-name").forEach((element) => {
    element.textContent = state.account?.name || "";
  });
  document.querySelectorAll(".account-signed-email").forEach((element) => {
    element.textContent = state.account?.email || "";
  });

  const isAdmin = Boolean(localStorage.getItem("atyab_admin_session") || (state.account && state.account.email === "admin@gmail.com"));
  document.querySelectorAll(".account-admin-link-box").forEach((box) => {
    box.hidden = !isAdmin;
  });

  if (!state.account && signedInPanel?.classList.contains("active")) {
    setAccountMode("login");
  }
  if (accountTabs) accountTabs.hidden = Boolean(state.account && signedInPanel?.classList.contains("active"));
}

function openAccountModal() {
  const modal = document.getElementById("account-modal");
  if (!modal) return;
  updateAccountUI();
  setAccountMode(state.account ? "signed-in" : "login");
  modal.classList.add("active");
}

function closeAccountModal() {
  document.getElementById("account-modal")?.classList.remove("active");
}

function setAccountMode(mode) {
  const validMode = ["login", "signup", "signed-in"].includes(mode) ? mode : "login";
  document.querySelectorAll(".account-panel").forEach((panel) => {
    panel.hidden = panel.dataset.accountPanel !== validMode;
    panel.classList.toggle("active", panel.dataset.accountPanel === validMode);
  });
  document.querySelectorAll(".account-tab").forEach((tab) => {
    const isActive = tab.dataset.accountMode === validMode;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  const accountTabs = document.getElementById("account-tabs");
  if (accountTabs) accountTabs.hidden = validMode === "signed-in";

  const message = document.getElementById("account-form-message");
  if (message) {
    message.textContent = "";
    message.classList.remove("error", "success");
  }
  const focusTarget = document.getElementById(validMode === "signup" ? "account-signup-name" : "account-login-email");
  if (focusTarget) setTimeout(() => focusTarget.focus(), 120);
}

function showAccountMessage(message, type = "error") {
  const target = document.getElementById("account-form-message");
  if (!target) return;
  target.textContent = message;
  target.classList.toggle("error", type === "error");
  target.classList.toggle("success", type === "success");
}

function saveAccount(account) {
  state.account = account;
  const storedProfile = JSON.stringify(account);
  localStorage.setItem("atyab_account", storedProfile);
  localStorage.setItem("aytyab_account", storedProfile);
  updateAccountUI();
}

function handleAccountLogin(event) {
  event.preventDefault();
  const email = document.getElementById("account-login-email")?.value.trim().toLowerCase();
  const password = document.getElementById("account-login-password")?.value;

  // فحص تسجيل دخول المشرف / الأدمن المخصص
  if (email === "admin@gmail.com") {
    if (password === "123456") {
      const adminSession = {
        email: "admin@gmail.com",
        name: "مدير المتجر الملكي (Super Admin)",
        role: "admin",
        token: "atyab_adm_" + Date.now(),
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem("atyab_admin_session", JSON.stringify(adminSession));
      sessionStorage.setItem("atyab_admin_session", JSON.stringify(adminSession));
      saveAccount({ name: "Super Admin (إدارة أطياب)", email: "admin@gmail.com", role: "admin" });

      showAccountMessage(
        state.language === "en" ? "👑 Admin verified! Redirecting to Royal Admin..." : "👑 تم التحقق من حساب الإدارة الملكية! جاري توجيهك...",
        "success"
      );
      showToast(
        state.language === "en" ? "👑 Welcome Super Admin" : "👑 مرحباً بمدير النظام",
        state.language === "en" ? "Access granted. Launching Royal Admin Panel..." : "تم التحقق بنجاح! جاري فتح لوحة التحكم الملكية...",
        "👑"
      );

      setTimeout(() => {
        closeAccountModal();
        window.location.href = "admin.html";
      }, 700);
      return;
    } else {
      showAccountMessage(
        state.language === "en" ? "Incorrect password for admin account (admin@gmail.com)." : "كلمة المرور غير صحيحة لحساب الإدارة (admin@gmail.com)."
      );
      return;
    }
  }

  // تسجيل دخول المستخدم العادي
  if (!email || !password || !state.account || state.account.email.toLowerCase() !== email) {
    showAccountMessage(t("account_login_error"));
    return;
  }

  setAccountMode("signed-in");
  showToast(t("account_login_success_title"), t("account_login_success_msg", { name: state.account.name }), "👋");
}

function handleAccountSignup(event) {
  event.preventDefault();
  const name = document.getElementById("account-signup-name")?.value.trim();
  const email = document.getElementById("account-signup-email")?.value.trim().toLowerCase();
  const password = document.getElementById("account-signup-password")?.value || "";
  const confirmPassword = document.getElementById("account-signup-confirm-password")?.value || "";

  if (!name || !email || password.length < 6) {
    showAccountMessage(t("account_password_min"));
    return;
  }
  if (password !== confirmPassword) {
    showAccountMessage(t("account_password_mismatch"));
    return;
  }

  saveAccount({ name, email });
  document.getElementById("account-signup-form")?.reset();
  setAccountMode("signed-in");
  showToast(t("account_signup_success_title"), t("account_signup_success_msg", { name }), "✨");
}

function logoutAccount() {
  state.account = null;
  localStorage.removeItem("atyab_account");
  localStorage.removeItem("aytyab_account");
  localStorage.removeItem("atyab_admin_session");
  sessionStorage.removeItem("atyab_admin_session");
  updateAccountUI();
  setAccountMode("login");
}

// ===================================================================
// نافذة النظرة السريعة (QUICK VIEW MODAL)
// ===================================================================
function openQuickView(productId) {
  const product = ATYAB_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("quickview-modal");
  const body = document.getElementById("quickview-body");
  if (!modal || !body) return;

  const lp = getProductLocalized(product, state.language);
  const topNotes = (lp.displayNotes && lp.displayNotes.top ? lp.displayNotes.top.join(" • ") : "");
  const heartNotes = (lp.displayNotes && lp.displayNotes.heart ? lp.displayNotes.heart.join(" • ") : "");
  const baseNotes = (lp.displayNotes && lp.displayNotes.base ? lp.displayNotes.base.join(" • ") : "");
  const sizesList = lp.displaySizes || product.sizes;

  body.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-img-box">
        <img src="${product.image}" alt="${lp.displayName}" />
      </div>
      <div>
        <span class="badge-tag ${product.badgeType}" style="position: static; display: inline-block; margin-bottom: 8px;">${lp.displayBadge}</span>
        <div style="font-size: 0.85rem; color: var(--gold-deep); font-weight: 700;">${lp.displayFamily}</div>
        <h2 style="font-size: 1.65rem; color: #000; margin-bottom: 6px;">${lp.displayName}</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 14px;">${lp.displaySubtitle}</p>

        <div style="display: flex; align-items: baseline; gap: 14px; margin-bottom: 18px;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">${t("from_label")}</span>
            <span style="font-size: 1.6rem; font-weight: 900; color: var(--gold-primary);">${formatPrice(product.priceSAR)}</span>
          </div>
          <span style="font-size: 0.95rem; color: var(--text-muted); text-decoration: line-through;">${formatPrice(product.originalPriceSAR)}</span>
          <span style="font-size: 0.78rem; background: var(--bg-ivory); color: #000; border: 1px solid var(--border-light); padding: 4px 12px; border-radius: 99px; font-weight: 700;">${lp.displayConcentration}</span>
        </div>

        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px;">
          ${lp.displayDescription}
        </p>

        <!-- الهرم العطري -->
        <div style="background: var(--bg-ivory); border: 1px solid var(--border-light); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h4 style="font-size: 0.9rem; font-weight: 800; color: var(--gold-deep); margin-bottom: 10px;">
            ${t("qv_pyramid_title")}
          </h4>
          <div style="font-size: 0.85rem; margin-bottom: 6px;">
            <strong>${t("qv_top_notes")}</strong> ${topNotes}
          </div>
          <div style="font-size: 0.85rem; margin-bottom: 6px;">
            <strong>${t("qv_heart_notes")}</strong> ${heartNotes}
          </div>
          <div style="font-size: 0.85rem;">
            <strong>${t("qv_base_notes")}</strong> ${baseNotes}
          </div>
        </div>

        <!-- القياسات -->
        <div style="display: flex; gap: 24px; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 24px;">
          <div>⏱️ <strong>${t("qv_longevity")}</strong> ${lp.displayLongevity}</div>
          <div>👑 <strong>${t("qv_sillage")}</strong> ${lp.displaySillage}</div>
        </div>

        <!-- المقاس والإضافة إلى السلة -->
        <div style="display: flex; gap: 12px; align-items: center;">
          <select id="qv-size-select" style="padding: 12px 16px; border-radius: 4px; border: 1px solid var(--border-light); font-size: 0.9rem; background: #FFF; outline: none; cursor: pointer; font-family: inherit;">
            ${sizesList.map((s, idx) => `<option value="${product.sizes[idx] || s}">${s}</option>`).join("")}
          </select>
          <button class="btn btn-primary" style="flex: 1;" onclick="
            const size = document.getElementById('qv-size-select').value;
            addToCart('${product.id}', size, 1);
            closeQuickView();
          ">
            ${t("qv_add_btn")}
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeQuickView() {
  document.getElementById("quickview-modal")?.classList.remove("active");
}

// ===================================================================
// مستشار العطور التفاعلي (SCENT FINDER QUIZ)
// ===================================================================
function openScentQuiz() {
  state.quiz.step = 1;
  state.quiz.answers = { vibe: null, occasion: null, notes: null };
  renderQuizStep();
  document.getElementById("scent-quiz-modal")?.classList.add("active");
}

function closeScentQuiz() {
  document.getElementById("scent-quiz-modal")?.classList.remove("active");
}

function selectQuizOption(key, value) {
  state.quiz.answers[key] = value;
  state.quiz.step += 1;
  renderQuizStep();
}

function renderQuizStep() {
  const container = document.getElementById("quiz-step-container");
  if (!container) return;

  if (state.quiz.step === 1) {
    container.innerHTML = `
      <div class="quiz-steps-indicator">
        <span class="step-dot active"></span>
        <span class="step-dot"></span>
        <span class="step-dot"></span>
      </div>
      <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--gold-primary); font-weight: 800;">${t("quiz_step_label", { step: 1 })}</span>
      <h3 style="font-size: 1.55rem; margin: 8px 0 16px;">${t("quiz_q1")}</h3>
      
      <div class="quiz-options-grid">
        <button class="quiz-option-btn" onclick="selectQuizOption('vibe', 'aquatic')">
          <span class="emoji">🌊</span>
          <span>${t("quiz_q1_o1")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('vibe', 'rose')">
          <span class="emoji">🌹</span>
          <span>${t("quiz_q1_o2")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('vibe', 'oud')">
          <span class="emoji">🐅</span>
          <span>${t("quiz_q1_o3")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('vibe', 'woody')">
          <span class="emoji">🌲</span>
          <span>${t("quiz_q1_o4")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('vibe', 'moon')">
          <span class="emoji">🌙</span>
          <span>${t("quiz_q1_o5")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('vibe', 'bakhoor')">
          <span class="emoji">💨</span>
          <span>${t("quiz_q1_o6")}</span>
        </button>
      </div>
    `;
  } else if (state.quiz.step === 2) {
    container.innerHTML = `
      <div class="quiz-steps-indicator">
        <span class="step-dot"></span>
        <span class="step-dot active"></span>
        <span class="step-dot"></span>
      </div>
      <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--gold-primary); font-weight: 800;">${t("quiz_step_label", { step: 2 })}</span>
      <h3 style="font-size: 1.55rem; margin: 8px 0 16px;">${t("quiz_q2")}</h3>
      
      <div class="quiz-options-grid">
        <button class="quiz-option-btn" onclick="selectQuizOption('occasion', 'daily')">
          <span class="emoji">☀️</span>
          <span>${t("quiz_q2_o1")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('occasion', 'evening')">
          <span class="emoji">🌙</span>
          <span>${t("quiz_q2_o2")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('occasion', 'wedding')">
          <span class="emoji">💍</span>
          <span>${t("quiz_q2_o3")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('occasion', 'home')">
          <span class="emoji">🕌</span>
          <span>${t("quiz_q2_o4")}</span>
        </button>
      </div>
    `;
  } else if (state.quiz.step === 3) {
    container.innerHTML = `
      <div class="quiz-steps-indicator">
        <span class="step-dot"></span>
        <span class="step-dot"></span>
        <span class="step-dot active"></span>
      </div>
      <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--gold-primary); font-weight: 800;">${t("quiz_step_label", { step: 3 })}</span>
      <h3 style="font-size: 1.55rem; margin: 8px 0 16px;">${t("quiz_q3")}</h3>
      
      <div class="quiz-options-grid">
        <button class="quiz-option-btn" onclick="selectQuizOption('notes', 'oud')">
          <span class="emoji">🪵</span>
          <span>${t("quiz_q3_o1")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('notes', 'rose')">
          <span class="emoji">🌹</span>
          <span>${t("quiz_q3_o2")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('notes', 'marine')">
          <span class="emoji">🌊</span>
          <span>${t("quiz_q3_o3")}</span>
        </button>
        <button class="quiz-option-btn" onclick="selectQuizOption('notes', 'white-floral')">
          <span class="emoji">🌸</span>
          <span>${t("quiz_q3_o4")}</span>
        </button>
      </div>
    `;
  } else {
    // نتيجة التوفيق العطري
    let matchedProduct = ATYAB_PRODUCTS[0];
    const { vibe, occasion, notes } = state.quiz.answers;

    if (vibe === "aquatic" || notes === "marine") {
      matchedProduct = ATYAB_PRODUCTS.find((p) => p.id === "atyab-a555") || ATYAB_PRODUCTS[0];
    } else if (vibe === "rose" || notes === "rose" || occasion === "wedding") {
      matchedProduct = ATYAB_PRODUCTS.find((p) => p.id === "atyab-mashair") || ATYAB_PRODUCTS[3];
    } else if (vibe === "oud" || notes === "oud" || occasion === "evening") {
      matchedProduct = ATYAB_PRODUCTS.find((p) => p.id === "atyab-tiger-oud") || ATYAB_PRODUCTS[5];
    } else if (vibe === "moon" || notes === "white-floral") {
      matchedProduct = ATYAB_PRODUCTS.find((p) => p.id === "atyab-moon-flower") || ATYAB_PRODUCTS[4];
    } else if (occasion === "home" || vibe === "bakhoor") {
      matchedProduct = ATYAB_PRODUCTS.find((p) => p.id === "atyab-backhoor") || ATYAB_PRODUCTS[2];
    } else {
      matchedProduct = ATYAB_PRODUCTS.find((p) => p.id === "atyab-nader") || ATYAB_PRODUCTS[1];
    }

    const lp = getProductLocalized(matchedProduct, state.language);

    container.innerHTML = `
      <div style="text-align: center; padding: 10px 0;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 6px;">⚜️</span>
        <span style="font-size: 0.85rem; color: var(--gold-primary); font-weight: 800;">${t("quiz_res_label")}</span>
        <h3 style="font-size: 1.8rem; color: #000; margin: 4px 0 16px;">
          ${lp.displayName}
        </h3>
        
        <div style="max-width: 220px; margin: 0 auto 16px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-light); box-shadow: var(--shadow-card);">
          <img src="${matchedProduct.image}" alt="${lp.displayName}" style="width: 100%; display: block;" />
        </div>

        <p style="font-size: 0.92rem; color: var(--text-secondary); max-width: 440px; margin: 0 auto 18px; line-height: 1.7;">
          ${lp.displayDescription}
        </p>

        <div style="margin-bottom: 24px;">
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">${t("from_label")}</span>
          <span style="font-size: 1.7rem; font-weight: 900; color: var(--gold-primary);">
            ${formatPrice(matchedProduct.priceSAR)}
          </span>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="addToCart('${matchedProduct.id}', '${matchedProduct.defaultSize}', 1); closeScentQuiz();">
            ${t("quiz_res_add_btn")}
          </button>
          <button class="btn btn-secondary" onclick="window.location.href='product.html?id=${matchedProduct.id}'; closeScentQuiz();">
            ${t("quiz_res_details_btn")}
          </button>
        </div>
      </div>
    `;
  }
}

// ===================================================================
// نافذة إتمام الطلب (CHECKOUT SIMULATION & CONFIRMATION)
// ===================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast(t("cart_empty_title"), t("cart_empty_desc"));
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById("checkout-modal");
  const subtotalSAR = state.cart.reduce((sum, item) => sum + (item.priceSAR || 0) * item.quantity, 0);
  const discountSAR = (state.appliedCoupon === "ATYAB10" || state.appliedCoupon === "AYTYAB10") ? Math.round(subtotalSAR * 0.1) : 0;
  const totalSAR = Math.max(0, subtotalSAR - discountSAR);

  const summaryEl = document.getElementById("checkout-summary-box");
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="background: var(--bg-ivory); border: 1px solid var(--border-light); border-radius: 8px; padding: 20px;">
        <h4 style="font-size: 1rem; margin-bottom: 14px; color: #000; font-weight: 800;">
          ${t("co_summary_title", { count: state.cart.length })}
        </h4>
        ${state.cart
        .map((i) => {
          const itemTitle = state.language === "en" ? (i.nameEn || i.name) : i.name;
          return `
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px;">
            <span>${itemTitle} (${i.size}) × ${i.quantity}</span>
            <span style="font-weight: 700;">${formatPrice((i.priceSAR || 0) * i.quantity)}</span>
          </div>
        `;
        })
        .join("")}
        <div style="border-top: 1px solid var(--border-light); margin-top: 12px; padding-top: 12px; display: flex; justify-content: space-between; font-weight: 900; font-size: 1.15rem; color: #000;">
          <span>${t("co_total_due")}</span>
          <span style="color: var(--gold-primary);">${formatPrice(totalSAR)}</span>
        </div>
      </div>
    `;
  }

  modal?.classList.add("active");
}

function closeCheckoutModal() {
  document.getElementById("checkout-modal")?.classList.remove("active");
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("co-name")?.value.trim() || (state.language === "en" ? "Royal Customer" : "عميل أطياب الملكي");
  const email = document.getElementById("co-email")?.value.trim() || "";
  const phone = document.getElementById("co-phone")?.value.trim() || "";
  const city = document.getElementById("co-city")?.value || (state.language === "en" ? "Riyadh" : "الرياض");
  const paymentMethod = document.getElementById("co-payment")?.value || "mada";
  const address = document.getElementById("co-address")?.value.trim() || "";
  const orderId = "ATY-KSA-" + Math.floor(100000 + Math.random() * 900000);

  const subtotalSAR = state.cart.reduce((sum, item) => sum + (item.priceSAR || 0) * item.quantity, 0);
  const discountSAR = (state.appliedCoupon === "ATYAB10" || state.appliedCoupon === "AYTYAB10") ? Math.round(subtotalSAR * 0.1) : 0;
  const shippingSAR = subtotalSAR >= 150 ? 0 : 25;
  const totalSAR = Math.max(0, subtotalSAR - discountSAR) + shippingSAR;

  const paymentLabels = {
    mada: "مدى (Mada Debit)",
    applepay: "آبل باي (Apple Pay)",
    credit: "بطاقة ائتمانية (Visa / MasterCard)",
    cod: "الدفع عند الاستلام (COD)"
  };

  // تجهيز سجل الطلب الكامل لحفظه في لوحة الإدارة
  const orderRecord = {
    id: orderId,
    createdAt: new Date().toISOString(),
    status: "pending", // pending, confirmed, processing, shipped, delivered, cancelled
    customer: {
      name,
      email,
      phone,
      city,
      address,
      paymentMethod,
      paymentLabel: paymentLabels[paymentMethod] || paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "عند الاستلام (Pending COD)" : "مدفوع إلكترونياً (Paid)"
    },
    items: state.cart.map((item) => ({
      id: item.id,
      name: item.name,
      nameEn: item.nameEn || item.name,
      size: item.size,
      priceSAR: item.priceSAR,
      quantity: item.quantity,
      image: item.image
    })),
    financials: {
      subtotalSAR,
      discountSAR,
      shippingSAR,
      totalSAR
    },
    tracking: {
      carrier: "أرامكس السعودية (Aramex)",
      trackingNumber: "ATY" + Math.floor(10000000 + Math.random() * 90000000)
    },
    notes: [
      {
        author: "النظام الملكي",
        text: "تم إنشاء الطلب بنجاح عبر المتجر الإلكتروني بانتظار التأكيد",
        date: new Date().toISOString()
      }
    ],
    timeline: [
      {
        status: "pending",
        title: "تم استلام الطلب",
        titleEn: "Order Received",
        time: new Date().toISOString(),
        note: "تم تسجيل الطلب في قائمة الانتظار للمراجعة والتأكيد"
      }
    ]
  };

  try {
    const stored = localStorage.getItem("atyab_orders");
    const orders = stored ? JSON.parse(stored) : [];
    orders.unshift(orderRecord);
    localStorage.setItem("atyab_orders", JSON.stringify(orders));
  } catch (err) {
    console.error("Error saving order to localStorage:", err);
  }

  closeCheckoutModal();

  // تأكيد الطلب الملكي
  const confModal = document.getElementById("confirmation-modal");
  const confBody = document.getElementById("confirmation-body");
  if (confModal && confBody) {
    confBody.innerHTML = `
      <div style="text-align: center; padding: 24px 12px;">
        <span style="font-size: 3rem; color: var(--gold-primary); display: block; margin-bottom: 12px;">👑</span>
        <span style="font-size: 0.85rem; color: var(--gold-deep); font-weight: 800;">${t("order_conf_pill")}</span>
        <h2 style="font-size: 1.85rem; margin: 8px 0 14px; color: #000;">${t("order_conf_title", { name })}</h2>
        <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto 20px; line-height: 1.7;">
          ${t("order_conf_desc")}
        </p>

        <div style="background: var(--bg-ivory); border: 1px dashed var(--gold-primary); border-radius: 8px; padding: 16px 24px; display: inline-block; margin-bottom: 24px;">
          <div style="font-size: 0.8rem; color: var(--text-muted);">${t("order_ref_label")}</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--gold-primary); letter-spacing: 0.05em;">${orderId}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">${t("order_email_note", { email })}</div>
        </div>

        <div>
          <button class="btn btn-primary" onclick="document.getElementById('confirmation-modal').classList.remove('active');">
            ${t("order_continue_btn")}
          </button>
        </div>
      </div>
    `;
    confModal.classList.add("active");
  }

  // تفريغ السلة
  state.cart = [];
  saveCart();
  updateCartUI();
}

// ===================================================================
// نافذة البحث السريع (LIVE SEARCH MODAL)
// ===================================================================
function openSearchModal() {
  const modal = document.getElementById("search-modal");
  modal?.classList.add("active");
  setTimeout(() => document.getElementById("search-input-box")?.focus(), 150);
}

function closeSearchModal() {
  document.getElementById("search-modal")?.classList.remove("active");
}

function handleSearchInput(e) {
  const query = e.target.value.trim().toLowerCase();
  const resultsContainer = document.getElementById("live-search-results");
  if (!resultsContainer) return;

  if (query.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.88rem;">
        ${t("search_hint")}
      </div>
    `;
    return;
  }

  const matches = ATYAB_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(query)) ||
      (p.englishName && p.englishName.toLowerCase().includes(query)) ||
      p.subtitle.toLowerCase().includes(query) ||
      (p.subtitleEn && p.subtitleEn.toLowerCase().includes(query)) ||
      p.family.toLowerCase().includes(query) ||
      (p.familyEn && p.familyEn.toLowerCase().includes(query)) ||
      p.notes.top.concat(p.notes.heart, p.notes.base).some((n) => n.toLowerCase().includes(query)) ||
      (p.notesEn && p.notesEn.top.concat(p.notesEn.heart, p.notesEn.base).some((n) => n.toLowerCase().includes(query)))
  );

  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--text-muted);">
        ${t("search_no_results", { query })}
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = matches
    .map((p) => {
      const lp = getProductLocalized(p, state.language);
      return `
      <div style="display: flex; gap: 14px; align-items: center; padding: 12px; border-radius: 6px; cursor: pointer; transition: background 0.2s;"
           onmouseover="this.style.background='var(--bg-ivory)'"
           onmouseout="this.style.background='transparent'"
           onclick="window.location.href='product.html?id=${p.id}'; closeSearchModal();">
        <img src="${p.image}" alt="${lp.displayName}" style="width: 54px; height: 54px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-light);" />
        <div style="flex: 1;">
          <h4 style="font-size: 0.98rem; font-weight: 700; color: #000;">${lp.displayName}</h4>
          <span style="font-size: 0.78rem; color: var(--text-secondary);">${lp.displayFamily}</span>
        </div>
        <div style="font-weight: 800; color: var(--gold-primary); font-size: 0.98rem;">
          ${formatPrice(p.priceSAR)}
        </div>
      </div>
    `;
    })
    .join("");
}

// ===================================================================
// التنبيهات المنبثقة (TOAST NOTIFICATIONS)
// ===================================================================
function showToast(title, message, icon = "⚜️") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="icon" style="font-size: 1.2rem;">${icon}</span>
    <div>
      <strong style="display: block; font-size: 0.9rem; color: #F8E2A7;">${title}</strong>
      <span style="font-size: 0.8rem; color: #DDD;">${message}</span>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = state.language === "en" ? "translateX(100%)" : "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ===================================================================
// إعداد مستمعي الأحداث (EVENT LISTENERS)
// ===================================================================
function setupEventListeners() {
  // أزرار فلتر الكتالوج
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      state.filter = tab.dataset.filter;
      renderProducts();
    });
  });

  // قائمة الترتيب
  const sortSelect = document.getElementById("catalog-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // إدخال البحث
  const searchInput = document.getElementById("search-input-box");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }

  // إغلاق الأدراج عند النقر على الخلفية
  document.getElementById("drawer-backdrop")?.addEventListener("click", () => {
    closeCartDrawer();
  });

  document.getElementById("mobile-nav-backdrop")?.addEventListener("click", () => {
    closeMobileNav();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeMobileNav();
      closeAccountModal();
    }
  });
}
