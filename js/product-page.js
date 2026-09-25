/**
 * أطياب للعطور - منطق صفحة المنتج المستقلة والتفاعلية
 * ATYAB PERFUMES - Luxury Individual Product Page Logic & State
 * Handles multi-angle gallery, interactive size selector with dynamic pricing,
 * fragrance pyramid, accords, verified reviews, and mobile sticky bar.
 */

// حالة صفحة المنتج (PDP State)
let currentProduct = null;
let currentSizeIndex = 0;
let currentQty = 1;
let currentAngleIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  initProductPage();
});

function initProductPage() {
  // 1. استخراج معرف العطر من الرابط
  const params = new URLSearchParams(window.location.search);
  let productId = params.get("id");
  let productSlug = params.get("slug");

  if (productSlug && !productId) {
    const foundBySlug = ATYAB_PRODUCTS.find(p => p.slug === productSlug);
    if (foundBySlug) productId = foundBySlug.id;
  }

  // Also auto-detect product from filename (e.g. product-backhoor.html)
  if (!productId) {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("backhoor") || path.includes("bakhoor")) productId = "atyab-bakhoor";
    else if (path.includes("tiger-oud")) productId = "atyab-tiger-oud";
    else if (path.includes("nader")) productId = "atyab-nader";
    else if (path.includes("moon-flower")) productId = "atyab-moon-flower";
    else if (path.includes("mashair")) productId = "atyab-mashair";
    else if (path.includes("a555")) productId = "atyab-a555";
  }

  // إذا تم فتح صفحة العطر مباشرة بدون معرّف أو كان المعرف غير صالح
  currentProduct = ATYAB_PRODUCTS.find(p => p.id === productId) || ATYAB_PRODUCTS[0];

  // تحديد الحجم الافتراضي (الحجم الشعبي إن وُجد أو الحجم الأوسط)
  if (currentProduct.sizeVariants && currentProduct.sizeVariants.length) {
    const popIdx = currentProduct.sizeVariants.findIndex(v => v.isPopular);
    currentSizeIndex = popIdx > -1 ? popIdx : 0;
  } else {
    currentSizeIndex = 0;
  }

  currentQty = 1;
  currentAngleIndex = 0;

  // 2. تحديث عنوان الصفحة ووسوم SEO
  updatePageSEO();

  // 3. تصيير كامل أجزاء صفحة العطر
  renderProductPage();

  // 4. تهيئة شريط الشراء السريع للجوال
  initMobileStickyBar();

  // 5. استماع للتمرير لتفعيل الترويسة
  initHeader();
}

/**
 * تحديث وسوم الصفحة وSEO
 */
function updatePageSEO() {
  if (!currentProduct) return;
  const lp = getProductLocalized(currentProduct, state.language);
  const isEn = state.language === "en";

  document.title = `${lp.displayName} | ${isEn ? "Atyab Official Royal Store KSA" : "أطياب للعطور | المتجر الرسمي بالمملكة"}`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", lp.displayDescription);
  }
}

/**
 * تصيير كامل أقسام صفحة العطر
 */
function renderProductPage() {
  if (!currentProduct) return;
  const lp = getProductLocalized(currentProduct, state.language);
  const isEn = state.language === "en";

  // 1. شريط مسار التنقل (Breadcrumb)
  renderBreadcrumb(lp);

  // 2. معرض الصور وزوايا الزجاجة (Multi-Angle Gallery)
  renderGallery(lp);

  // 3. تفاصيل العطر وخيارات الشراء والسعة
  renderPurchaseBox(lp);

  // 4. الهرم العطري والمكونات النقية (Fragrance Pyramid)
  renderPyramid(lp);

  // 5. التوافقات العطرية والمواصفات الفنية
  renderAccordsAndSpecs(lp);

  // 6. قصة الصياغة وطقوس التطيب
  renderStoryAndRitual(lp);

  // 7. تقييمات العملاء الموثقة بالمملكة
  renderReviewsSection(lp);

  // 8. عطور أخرى قد تنال إعجابك (Cross-Sell)
  renderRelatedPerfumes();
}

/**
 * شريط مسار التنقل (Breadcrumb)
 */
function renderBreadcrumb(lp) {
  const container = document.getElementById("pdp-breadcrumb-container");
  if (!container) return;

  const isEn = state.language === "en";
  const homeUrl = `index.html${isEn ? '?lang=en' : ''}`;
  const perfumesUrl = `perfumes.html${isEn ? '?lang=en' : ''}`;

  container.innerHTML = `
    <ul class="pdp-breadcrumb-list">
      <li>
        <a href="${homeUrl}">${t("pdp_breadcrumb_home")}</a>
      </li>
      <li class="pdp-breadcrumb-sep">/</li>
      <li>
        <a href="${perfumesUrl}">${isEn ? "Perfumes" : "العطور"}</a>
      </li>
      <li class="pdp-breadcrumb-sep">/</li>
      <li>
        <a href="${perfumesUrl}">${t("pdp_breadcrumb_perfumes")}</a>
      </li>
      <li class="pdp-breadcrumb-sep">/</li>
      <li class="pdp-breadcrumb-current">${lp.displayName}</li>
    </ul>
  `;
}

/**
 * معرض زوايا العطر الأصلي المتعددة (Multi-Angle Gallery)
 */
function renderGallery(lp) {
  const gallery = lp.displayGallery || [];
  const activeImage = gallery[currentAngleIndex] || gallery[0] || { src: currentProduct.image, displayTitle: lp.displayName, displayBadge: "" };

  const viewport = document.getElementById("pdp-main-viewport");
  if (viewport) {
    viewport.innerHTML = `
      <span class="pdp-gallery-badge">${activeImage.displayBadge || t("pdp_verified_purchase")}</span>
      <img src="${activeImage.src}" alt="${activeImage.displayTitle}" class="pdp-main-image" id="pdp-active-img" />
      <div class="pdp-gallery-action-overlay">
        <button class="pdp-zoom-btn" onclick="openLightbox('${activeImage.src}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <span>${t("pdp_zoom_btn")}</span>
        </button>
      </div>
    `;
  }

  // شريط الصور المصغرة لكل زاوية
  const thumbStrip = document.getElementById("pdp-thumbnails-strip");
  if (thumbStrip) {
    thumbStrip.innerHTML = gallery.map((item, idx) => `
      <div class="pdp-thumb-card ${idx === currentAngleIndex ? 'active' : ''}" onclick="switchGalleryAngle(${idx})" title="${item.displayTitle}">
        <img src="${item.src}" alt="${item.displayTitle}" loading="lazy" />
        <span class="pdp-thumb-label">${item.displayTitle}</span>
      </div>
    `).join("");
  }
}

/**
 * تبديل زاوية العرض الحالية بتأثير انتقال استوديو سلس
 */
function switchGalleryAngle(idx) {
  if (currentAngleIndex === idx) return;
  currentAngleIndex = idx;
  const lp = getProductLocalized(currentProduct, state.language);
  const activeImg = document.getElementById("pdp-active-img");
  if (activeImg) {
    activeImg.classList.add("switching");
    setTimeout(() => {
      renderGallery(lp);
      const newImg = document.getElementById("pdp-active-img");
      if (newImg) {
        newImg.classList.add("switching");
        requestAnimationFrame(() => {
          setTimeout(() => newImg.classList.remove("switching"), 20);
        });
      }
    }, 120);
  } else {
    renderGallery(lp);
  }
}

/**
 * تكبير الصورة في نافذة منبثقة (Lightbox)
 */
function openLightbox(src) {
  const modal = document.getElementById("pdp-lightbox-modal");
  const img = document.getElementById("pdp-lightbox-img");
  if (modal && img) {
    img.src = src;
    modal.classList.add("active");
  }
}

function closeLightbox() {
  document.getElementById("pdp-lightbox-modal")?.classList.remove("active");
}

/**
 * تفاصيل العطر، الحساب الديناميكي للسعر، وخيارات السعة
 */
function renderPurchaseBox(lp) {
  const isEn = state.language === "en";
  const singlePrice = currentProduct.priceSAR;
  const oldPrice = currentProduct.originalPriceSAR;
  const officialSize = isEn ? (currentProduct.defaultSizeEn || "100ml Bottle (Official Signature)") : (currentProduct.defaultSize || "قارورة 100 مل (الحجم الرسمي)");
  const cleanVolume = officialSize.split("(")[0].trim();
  const savePercent = oldPrice && oldPrice > singlePrice 
    ? Math.round((1 - singlePrice / oldPrice) * 100) 
    : 0;

  const isWishlisted = state.wishlist && state.wishlist.some(w => (typeof w === "object" ? w.id : w) === currentProduct.id);

  // تحديث أعلى الصندوق
  const metaContainer = document.getElementById("pdp-info-meta");
  if (metaContainer) {
    metaContainer.innerHTML = `
      <div class="pdp-top-meta">
        <span class="pdp-family-badge">⚜️ ${lp.displayFamily || currentProduct.family}</span>
        <div class="pdp-rating-strip">
          <span class="pdp-rating-stars">★★★★★</span>
          <span class="pdp-rating-number">${currentProduct.rating || 5.0}</span>
          <a href="#reviews-section" class="pdp-reviews-jump">(${currentProduct.reviewsCount || 150} ${isEn ? "reviews" : "تقييم"})</a>
        </div>
      </div>
      <h1 class="pdp-title">${lp.displayName}</h1>
      <p class="pdp-subtitle">${lp.displaySubtitle || lp.displayFamily}</p>
    `;
  }

  // تحديث صندوق السعر
  const priceContainer = document.getElementById("pdp-price-container");
  if (priceContainer) {
    priceContainer.innerHTML = `
      <div class="pdp-price-box">
        <div class="pdp-price-left">
          <span class="pdp-current-price">${formatPrice(singlePrice * currentQty)}</span>
          ${oldPrice ? `<span class="pdp-old-price">${formatPrice(oldPrice * currentQty)}</span>` : ''}
          ${savePercent > 0 ? `<span class="pdp-save-badge">${isEn ? "Save" : "وفر"} ${savePercent}%</span>` : ''}
        </div>
        <span class="pdp-concentration-pill">${lp.displayConcentration ? lp.displayConcentration.split("(")[0].trim() : (isEn ? "Eau De Parfum Royal" : "أو دو بارفان ملكي")}</span>
      </div>
    `;
  }

  // سعة القارورة الرسمية المعتمدة (Authentic Signature Edition - Ahmed Al Maghribi Architecture)
  const sizeSelectorContainer = document.getElementById("pdp-size-selector-container");
  if (sizeSelectorContainer) {
    sizeSelectorContainer.innerHTML = `
      <div class="pdp-size-selector-section">
        <div class="pdp-selector-label">
          <span>${isEn ? "Official Bottle Volume & Edition:" : "سعة القارورة الرسمية:"}</span>
          <span style="color: var(--gold-primary); font-weight: 800;">${cleanVolume}</span>
        </div>
        <div class="pdp-signature-edition-pill" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border: 1.5px solid var(--gold-primary); border-radius: 8px; background: rgba(197, 155, 39, 0.05); margin-top: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.5rem;">💎</span>
            <div>
              <div style="font-weight: 800; font-size: 0.98rem; color: #111;">${officialSize}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${isEn ? "100% Authentic Signature Royal Bottle" : "الإصدار الملكي الأصلي المعتمد"}</div>
            </div>
          </div>
          <div style="text-align: end;">
            <span style="font-family: var(--font-arabic-title); font-size: 1.2rem; font-weight: 900; color: #111;">${formatPrice(singlePrice)}</span>
          </div>
        </div>
      </div>
    `;
  }

  // حالة التوفر بالمستودع
  const stockContainer = document.getElementById("pdp-stock-container");
  if (stockContainer) {
    stockContainer.innerHTML = `
      <div class="pdp-stock-banner">
        <span class="pdp-pulse-dot"></span>
        <span>${isEn ? "In Stock - Riyadh Central Fulfillment (Immediate Express Dispatch across KSA 🇸🇦)" : "متوفر بالمستودع المركزي - الرياض (شحن فوري سريع لكافة مدن المملكة 🇸🇦)"}</span>
      </div>
    `;
  }

  // أزرار الشراء والإضافة للسلة
  const actionsContainer = document.getElementById("pdp-actions-container");
  if (actionsContainer) {
    const rawPriceText = formatPrice(singlePrice * currentQty);
    const waText = encodeURIComponent(
      isEn
        ? `Hello Atyab Fragrance Concierge, I would like to order ${lp.displayName} (${cleanVolume}) at ${rawPriceText} from the official store.`
        : `مرحباً مستشار أطياب، أود طلب ${lp.displayName} (${cleanVolume}) بسعر ${rawPriceText} من المتجر الرسمي.`
    );
    const waUrl = `https://wa.me/966500000000?text=${waText}`;

    actionsContainer.innerHTML = `
      <div class="pdp-action-row">
        <div class="pdp-qty-picker">
          <button type="button" class="pdp-qty-btn" onclick="updatePdpQty(-1)" aria-label="Decrease quantity">-</button>
          <span class="pdp-qty-val">${currentQty}</span>
          <button type="button" class="pdp-qty-btn" onclick="updatePdpQty(1)" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" class="pdp-btn-add-cart" id="pdp-add-cart-btn" onclick="addCurrentVariantToCart()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span>${t("pdp_add_to_cart_btn")} (${rawPriceText})</span>
        </button>
        <button type="button" class="pdp-btn-wishlist ${isWishlisted ? 'active' : ''}" onclick="togglePdpWishlist()" title="${t("wishlist_tooltip")}">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="pdp-btn-whatsapp-buy">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-10.416c-4.991 0-9.05 4.058-9.05 9.05 0 1.602.42 3.109 1.156 4.417l-1.226 4.478 4.606-1.208c1.261.688 2.709 1.081 4.249 1.081 4.991 0 9.05-4.058 9.05-9.05 0-4.992-4.059-9.05-9.05-9.05z"></path>
        </svg>
        <span>${t("pdp_buy_whatsapp_btn")}</span>
      </a>

      <div class="pdp-perks-card">
        <div class="pdp-perk-item">
          <span>🚚</span>
          <span><strong>${t("pdp_fast_shipping_note")}</strong></span>
        </div>
        <div class="pdp-perk-item">
          <span>👑</span>
          <span>${t("pdp_golden_guarantee")}</span>
        </div>
        <div class="pdp-perk-item">
          <span>💳</span>
          <span>${t("pdp_pay_secure_badge")}</span>
        </div>
      </div>
    `;
  }
}

/**
 * تأثير نبضة السعر التفاعلية عند تغيير الخيارات
 */
function triggerPriceBump() {
  const priceEl = document.querySelector(".pdp-current-price");
  if (priceEl) {
    priceEl.classList.remove("price-bump");
    void priceEl.offsetWidth; // إعادة حساب التدفق لتفعيل التحريك مجدداً
    priceEl.classList.add("price-bump");
  }
}

/**
 * تغيير حجم العطر المختار
 */
function selectSizeVariant(index) {
  currentSizeIndex = index;
  const lp = getProductLocalized(currentProduct, state.language);
  renderPurchaseBox(lp);
  triggerPriceBump();
  updateMobileStickyBar();
}

/**
 * تعديل الكمية (+ / -)
 */
function updatePdpQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  const lp = getProductLocalized(currentProduct, state.language);
  renderPurchaseBox(lp);
  triggerPriceBump();
  updateMobileStickyBar();
}

/**
 * إضافة السعة الحالية المختارة إلى السلة بالسعر الدقيق
 */
function addCurrentVariantToCart() {
  const isEn = state.language === "en";
  const officialSize = isEn ? (currentProduct.defaultSizeEn || currentProduct.defaultSize) : currentProduct.defaultSize;

  addToCart(currentProduct.id, officialSize, currentQty);

  const btn = document.getElementById("pdp-add-cart-btn");
  if (btn) {
    const origContent = btn.innerHTML;
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${isEn ? "Added to Bag ✓" : "تمت الإضافة للسلة ✓"}</span>
    `;
    btn.classList.add("btn-added-state");

    setTimeout(() => {
      btn.innerHTML = origContent;
      btn.classList.remove("btn-added-state");
    }, 1600);
  }
}

/**
 * تبديل المفضلة من صفحة المنتج
 */
function togglePdpWishlist() {
  toggleWishlist(currentProduct.id);
  const lp = getProductLocalized(currentProduct, state.language);
  renderPurchaseBox(lp);
}

/**
 * الهرم العطري المرئي (Fragrance Pyramid)
 */
function renderPyramid(lp) {
  const pyramidContainer = document.getElementById("pdp-pyramid-container");
  if (!pyramidContainer) return;

  const notes = lp.displayNotes || currentProduct.notes || { top: [], heart: [], base: [] };

  pyramidContainer.innerHTML = `
    <div class="pdp-pyramid-card">
      <span class="section-subtitle">⚜️ ${t("pdp_view_full_notes")}</span>
      <h2 style="font-family: var(--font-arabic-title); font-size: 1.8rem; font-weight: 800; margin: 6px 0;">${t("pdp_pyramid_title")}</h2>
      <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7;">${t("pdp_pyramid_subtitle")}</p>

      <div class="pdp-pyramid-tiers">
        <!-- 1. مقدمة العطر -->
        <div class="pdp-tier-block">
          <div class="pdp-tier-header">
            <div class="pdp-tier-title">
              <span>🌿</span>
              <span>${t("pdp_top_notes_title")}</span>
            </div>
            <span class="pdp-tier-duration">${t("pdp_tier1_duration")}</span>
          </div>
          <div class="pdp-tier-desc">${t("pdp_top_notes_desc")}</div>
          <div class="pdp-tier-pills">
            ${(notes.top || []).map(n => `<span class="pdp-tier-pill">${n}</span>`).join("")}
          </div>
        </div>

        <!-- 2. قلب العطر -->
        <div class="pdp-tier-block" style="border-right-color: var(--gold-light);">
          <div class="pdp-tier-header">
            <div class="pdp-tier-title">
              <span>🌹</span>
              <span>${t("pdp_heart_notes_title")}</span>
            </div>
            <span class="pdp-tier-duration">${t("pdp_tier2_duration")}</span>
          </div>
          <div class="pdp-tier-desc">${t("pdp_heart_notes_desc")}</div>
          <div class="pdp-tier-pills">
            ${(notes.heart || []).map(n => `<span class="pdp-tier-pill">${n}</span>`).join("")}
          </div>
        </div>

        <!-- 3. قاعدة العطر -->
        <div class="pdp-tier-block" style="border-right-color: var(--gold-deep);">
          <div class="pdp-tier-header">
            <div class="pdp-tier-title">
              <span>🪵</span>
              <span>${t("pdp_base_notes_title")}</span>
            </div>
            <span class="pdp-tier-duration">${t("pdp_tier3_duration")}</span>
          </div>
          <div class="pdp-tier-desc">${t("pdp_base_notes_desc")}</div>
          <div class="pdp-tier-pills">
            ${(notes.base || []).map(n => `<span class="pdp-tier-pill">${n}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * التوافقات العطرية والمواصفات الفنية
 */
function renderAccordsAndSpecs(lp) {
  const accordsContainer = document.getElementById("pdp-accords-container");
  if (!accordsContainer) return;

  const accords = currentProduct.accords || [];

  accordsContainer.innerHTML = `
    <div class="pdp-accords-card">
      <div>
        <span class="section-subtitle">📊 ${t("pdp_accords_eyebrow")}</span>
        <h3 style="font-family: var(--font-arabic-title); font-size: 1.35rem; font-weight: 800; margin: 4px 0 16px;">${t("pdp_accords_title")}</h3>
        ${accords.map(a => `
          <div class="pdp-accord-item">
            <div class="pdp-accord-info">
              <span>${state.language === 'en' ? a.nameEn : a.name}</span>
              <span>${a.pct}%</span>
            </div>
            <div class="pdp-accord-bar">
              <div class="pdp-accord-fill" style="width: ${a.pct}%; background: ${a.color || 'var(--gold-primary)'};"></div>
            </div>
          </div>
        `).join("")}
      </div>

      <div>
        <h4 style="font-family: var(--font-arabic-title); font-size: 1.15rem; font-weight: 800; margin-bottom: 12px;">${t("pdp_specs_title")}</h4>
        <div class="pdp-specs-table">
          <div class="pdp-spec-box">
            <span class="pdp-spec-label">${t("pdp_spec_concentration")}</span>
            <span class="pdp-spec-val">${lp.displayConcentration}</span>
          </div>
          <div class="pdp-spec-box">
            <span class="pdp-spec-label">${t("pdp_spec_longevity")}</span>
            <span class="pdp-spec-val">⏱️ ${lp.displayLongevity}</span>
          </div>
          <div class="pdp-spec-box">
            <span class="pdp-spec-label">${t("pdp_spec_sillage")}</span>
            <span class="pdp-spec-val">👑 ${lp.displaySillage}</span>
          </div>
          <div class="pdp-spec-box">
            <span class="pdp-spec-label">${t("pdp_spec_gender")}</span>
            <span class="pdp-spec-val">${lp.displayGender}</span>
          </div>
          <div class="pdp-spec-box" style="grid-column: 1 / -1;">
            <span class="pdp-spec-label">${t("pdp_spec_season")}</span>
            <span class="pdp-spec-val">${lp.displaySeason || t("pdp_specs_season_all")}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * قصة الصياغة وطقوس التطيب
 */
function renderStoryAndRitual(lp) {
  const container = document.getElementById("pdp-story-container");
  if (!container) return;

  container.innerHTML = `
    <div class="pdp-story-grid">
      <div class="pdp-story-box">
        <span class="section-subtitle">⚜️ ${t("pdp_story_eyebrow")}</span>
        <h3 style="font-family: var(--font-arabic-title); font-size: 1.45rem; font-weight: 800; margin: 6px 0 14px; color: #000;">${t("pdp_story_title")}</h3>
        <p>${lp.displayStory || lp.displayDescription}</p>
      </div>

      <div class="pdp-story-box">
        <span class="section-subtitle">👑 ${t("pdp_ritual_eyebrow")}</span>
        <h3 style="font-family: var(--font-arabic-title); font-size: 1.45rem; font-weight: 800; margin: 6px 0 14px; color: #000;">${t("pdp_ritual_title")}</h3>
        <p>${lp.displayRitual || t("pdp_ritual_fallback")}</p>
        <div style="margin-top: 16px; padding: 12px 16px; background: #FFF; border-radius: 6px; border: 1px dashed var(--gold-primary); font-size: 0.85rem; color: var(--gold-deep);">
          💡 <strong>${t("pdp_tip_label")}</strong> ${t("pdp_golden_guarantee")}
        </div>
      </div>
    </div>
  `;
}

/**
 * قسم تقييمات العملاء الموثقة بالمملكة
 */
function renderReviewsSection(lp) {
  const container = document.getElementById("pdp-reviews-container");
  if (!container) return;

  const reviews = lp.displayReviews || [];

  container.innerHTML = `
    <div class="pdp-reviews-header-bar">
      <div>
        <span class="section-subtitle">⭐ ${t("pdp_reviews_eyebrow")}</span>
        <h2 style="font-family: var(--font-arabic-title); font-size: 1.8rem; font-weight: 800; color: #000;">${t("pdp_reviews_section_title")}</h2>
        <span style="font-size: 0.9rem; color: var(--text-muted);">${t("pdp_reviews_based_on", { count: currentProduct.reviewsCount })}</span>
      </div>
      <button class="btn btn-secondary" onclick="openReviewModal()">
        ✍️ ${t("pdp_write_review_btn")}
      </button>
    </div>

    <div class="pdp-reviews-cards-list">
      ${reviews.map(r => `
        <div class="pdp-review-card">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="stars" style="color: #D4AF37; font-size: 1.1rem;">★★★★★</span>
              <span style="font-size: 0.78rem; color: var(--text-muted);">${r.displayDate}</span>
            </div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #000; margin-bottom: 8px;">${r.displayTitle}</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7;">${r.displayComment}</p>
          </div>
          <div style="border-top: 1px solid var(--border-light); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="display: block; font-size: 0.9rem; color: #000;">${r.displayAuthor}</strong>
              <span style="font-size: 0.78rem; color: var(--text-muted);">${r.displayCity}</span>
            </div>
            <span style="font-size: 0.76rem; background: #E8F5E9; color: #2E7D32; padding: 3px 8px; border-radius: var(--radius-full); font-weight: 700;">
              ${t("pdp_verified_purchase")}
            </span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

/**
 * قسم عطور أخرى مقترحة
 */
function renderRelatedPerfumes() {
  const container = document.getElementById("pdp-related-container");
  if (!container) return;

  const related = ATYAB_PRODUCTS.filter(p => p.id !== currentProduct.id).slice(0, 4);

  container.innerHTML = related.map(p => {
    const lp = getProductLocalized(p, state.language);
    return `
      <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'" style="cursor: pointer;">
        <div class="product-media">
          <span class="badge-tag ${p.badgeType}">${lp.displayBadge}</span>
          <img src="${p.image}" alt="${lp.displayName}" loading="lazy" />
        </div>
        <div class="product-details">
          <div class="product-arabic-title">${lp.displayFamily}</div>
          <h3 class="product-title">${lp.displayName}</h3>
          <p class="product-subtitle">${lp.displaySubtitle}</p>
          <div class="product-footer" style="margin-top: 12px;">
            <div class="current-price">${formatPrice(p.priceSAR)}</div>
            <a href="product.html?id=${p.id}" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.8rem;">
              ${t("pdp_view_product_btn")}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * الشريط العائم للشراء السريع بالجوال
 */
function initMobileStickyBar() {
  const bar = document.getElementById("pdp-mobile-sticky-bar");
  if (!bar) return;

  updateMobileStickyBar();

  window.addEventListener("scroll", () => {
    const actionsBox = document.getElementById("pdp-actions-container");
    if (!actionsBox) return;
    const rect = actionsBox.getBoundingClientRect();
    if (rect.bottom < 0) {
      bar.classList.add("visible");
      document.body.classList.add("has-mobile-bar");
    } else {
      bar.classList.remove("visible");
      document.body.classList.remove("has-mobile-bar");
    }
  }, { passive: true });
}

function updateMobileStickyBar() {
  const bar = document.getElementById("pdp-mobile-sticky-bar");
  if (!bar || !currentProduct) return;
  const lp = getProductLocalized(currentProduct, state.language);
  const isEn = state.language === "en";
  const officialSize = isEn ? (currentProduct.defaultSizeEn || currentProduct.defaultSize) : currentProduct.defaultSize;
  const cleanVol = officialSize.split("(")[0].trim();

  bar.innerHTML = `
    <div class="pdp-sticky-product-info">
      <img src="${currentProduct.image}" alt="${lp.displayName}" class="pdp-sticky-product-thumb" />
      <div>
        <div class="pdp-sticky-title">${lp.displayName}</div>
        <div class="pdp-sticky-price">${formatPrice(currentProduct.priceSAR * currentQty)} (${cleanVol})</div>
      </div>
    </div>
    <button class="btn btn-primary" onclick="addCurrentVariantToCart()" style="padding: 10px 18px; font-size: 0.88rem;">
      ${t("pdp_sticky_add")}
    </button>
  `;
}

/**
 * نافذة كتابة تقييم جديد
 */
function openReviewModal() {
  const modal = document.getElementById("pdp-review-modal");
  modal?.classList.add("active");
}

function closeReviewModal() {
  document.getElementById("pdp-review-modal")?.classList.remove("active");
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("rev-name").value;
  const city = document.getElementById("rev-city").value;
  const rating = document.getElementById("rev-rating").value;
  const comment = document.getElementById("rev-comment").value;

  currentProduct.reviews = currentProduct.reviews || [];
  currentProduct.reviews.unshift({
    author: name,
    authorEn: name,
    city: city,
    cityEn: city,
    rating: parseInt(rating),
    date: "الآن",
    dateEn: "Just now",
    title: "تجربة شراء وتقييم أصلي",
    titleEn: "Verified Purchase Experience",
    comment: comment,
    commentEn: comment
  });

  currentProduct.reviewsCount += 1;
  closeReviewModal();
  const lp = getProductLocalized(currentProduct, state.language);
  renderReviewsSection(lp);
  showToast(t("review_success_title"), t("review_success_msg"), "⭐");
}
