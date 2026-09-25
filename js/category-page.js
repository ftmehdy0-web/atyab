/**
 * أطياب للعطور - محرك صفحات الأقسام الفاخرة والشراء المباشر
 * ATYAB PERFUMES - Luxury Dedicated Category Engine & Instant Cart
 * Architecture inspired by Ahmed Al Maghribi KSA (Haute Parfumerie)
 */

let currentCategoryFilter = "perfumes";
let currentSortBy = "featured";
let currentSubTag = "all";
let currentGridLayout = "cols-4"; // 'cols-4' or 'cols-3'

function initCategoryPage(defaultCategory = "perfumes") {
  const params = new URLSearchParams(window.location.search);
  const urlCat = params.get("cat") || defaultCategory;
  currentCategoryFilter = urlCat;

  // Set active header category nav link
  document.querySelectorAll(".category-nav-menu .cat-nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.dataset.cat === urlCat || link.getAttribute("href")?.includes(urlCat)) {
      link.classList.add("active");
    }
  });

  updateCategoryPageHeader();
  renderCategoryProducts();
}

/**
 * Updates page headers, breadcrumbs, descriptions and filter pills in both EN & AR
 */
function updateCategoryPageHeader() {
  const isEn = typeof state !== "undefined" && state.language === "en";

  // Category title & meta configuration
  const config = {
    perfumes: {
      pillAr: "⚜️ أفخر التوليفات الشرقية والفرنسية الملكية",
      pillEn: "⚜️ Royal Oriental & French Haute Parfumerie",
      titleAr: "العطور الملكية الفاخرة",
      titleEn: "LUXURY PERFUMES COLLECTION",
      accentAr: "أثرٌ خالد وفوحان يأسر الحواس",
      accentEn: "Enduring Aura & Majestic Sillage",
      descAr: "توليفات عطرية استثنائية صُممت لمحبي التميز والوقار؛ تجمع بين نبل العود الكمبودي والورود الدمشقية وزعفران قصر الملوك لتمنحك حضوراً يفرض هيبته في أرقى المناسبات.",
      descEn: "Exceptional fragrance creations handcrafted for connoisseurs of distinction. Marrying the noble depth of wild Cambodian agarwood, dewy Taif rose, and Persian saffron to bestow a commanding presence at grand receptions.",
      crumbAr: "العطور الملكية",
      crumbEn: "Luxury Perfumes",
      filters: [
        { id: "all", labelAr: "جميع العطور (10)", labelEn: "All Perfumes (10)" },
        { id: "oud", labelAr: "عود شرقي أصيل (4)", labelEn: "Oriental Oud (4)" },
        { id: "floral", labelAr: "زهري ومخملي (3)", labelEn: "French Floral (3)" },
        { id: "fresh", labelAr: "منعش وصيفي (3)", labelEn: "Fresh & Aquatic (3)" },
        { id: "woody", labelAr: "خشبي وتوابل (2)", labelEn: "Spicy & Woody (2)" }
      ]
    },
    oil: {
      pillAr: "💎 نقاء التراث العربي 100%",
      pillEn: "💎 100% Pure Heritage Distillations",
      titleAr: "دهن العود والمسك المركز",
      titleEn: "DEHN AL OUD & CONCENTRATED ATTARS",
      accentAr: "نقاء التراث وعراقة التولة",
      accentEn: "The Sacred Purity of Authentic Tolas",
      descAr: "أندر أنواع دهن العود الكمبودي والهندي المعتق لسنوات عديدة، وتولات المسك الأبيض النقي الخالية تماماً من الكحول.",
      descEn: "Rare distillations of aged Cambodian and Indian agarwood oils paired with pristine crystal white musks, completely alcohol-free.",
      crumbAr: "عطور زيتية",
      crumbEn: "Perfume Oils",
      filters: [
        { id: "all", labelAr: "الكل", labelEn: "All" },
        { id: "oud", labelAr: "دهن عود معتق", labelEn: "Aged Oud Oil" },
        { id: "musk", labelAr: "مسك الطهارة", labelEn: "Pure Musk" }
      ]
    },
    bakhoor: {
      pillAr: "🕌 كرم الضيافة العربية وفخامة المجالس",
      pillEn: "🕌 Arabian Hospitality & Royal Majlis",
      titleAr: "بخور ودخون المجالس الملكية",
      titleEn: "ROYAL BAKHOOR & DAKHOON",
      accentAr: "سحابة عطرية تملأ المكان بالسكينة",
      accentEn: "A Warm Aromatic Cloud of Tranquility",
      descAr: "رقائق عود مروكي وآسام طبيعية منقوعة في أصفى الزيوت الشرقية والورد الطائفي لتعطير البيوت والمجالس بأصالة تدوم طويلاً.",
      descEn: "Natural Moroki and Assam agarwood chips soaked in golden amber, black musk, and Taif rose attar for royal home hospitality.",
      crumbAr: "بخور",
      crumbEn: "Bakhoor & Incense",
      filters: [
        { id: "all", labelAr: "الكل", labelEn: "All" },
        { id: "bakhoor", labelAr: "بخور ملكي", labelEn: "Royal Bakhoor" },
        { id: "chips", labelAr: "رقائق عود", labelEn: "Oud Chips" }
      ]
    },
    cream: {
      pillAr: "✨ عناية ملكية مخملية وترطيب 24 ساعة",
      pillEn: "✨ Velvety 24-Hour Silk Hydration",
      titleAr: "كريمات الجسم المعطرة الفاخرة",
      titleEn: "PERFUMED BODY CREAMS & SOUFFLÉS",
      accentAr: "دلال الحرير ونعومة تدوم طويلاً",
      accentEn: "Cashmere Softness & Lingering Scent",
      descAr: "قوام حريري غني بزبدة الشيا والزيوت النقية لترطيب عميق وفوحان عطري يرافقك طوال اليوم.",
      descEn: "Indulgent silk soufflés enriched with pure shea butter and fine fragrance oils to leave skin velvety soft all day.",
      crumbAr: "كريمات الجسم",
      crumbEn: "Body Creams",
      filters: [
        { id: "all", labelAr: "الكل", labelEn: "All" },
        { id: "oud", labelAr: "عود وورد", labelEn: "Oud & Roses" },
        { id: "musk", labelAr: "مسك الحرير", labelEn: "Musk Silk" }
      ]
    },
    giftset: {
      pillAr: "🎁 فن الإهداء الملكي الفاخر",
      pillEn: "🎁 The Art of Royal Gifting",
      titleAr: "صناديق الإهداء الفاخرة (VIP)",
      titleEn: "ROYAL PRESENTATION GIFT SETS",
      accentAr: "هدية تخلد أثرك وتبهج القلوب",
      accentEn: "A Distinguished Gift of Remembrance",
      descAr: "صناديق جلدية مبطنة بالمخمل ومذهبة بشرائط أنيقة، تشمل أفخر العطور والدهون والبخور الجاهز للإهداء الفوري.",
      descEn: "Velvet-lined luxury presentation chests complete with bespoke calligraphy cards, ready for immediate VIP presentation.",
      crumbAr: "أطقم هدايا",
      crumbEn: "Gift Sets",
      filters: [
        { id: "all", labelAr: "الكل", labelEn: "All" }
      ]
    }
  };

  const curr = config[currentCategoryFilter] || config.perfumes;

  // Breadcrumbs
  const crumbHome = document.getElementById("cat-breadcrumb-home");
  if (crumbHome) crumbHome.textContent = isEn ? "Home" : "الرئيسية";

  const crumbCurrent = document.getElementById("cat-breadcrumb-current");
  if (crumbCurrent) crumbCurrent.textContent = isEn ? curr.crumbEn : curr.crumbAr;

  // Hero pill, title, subtitle, desc
  const pillEl = document.getElementById("cat-hero-pill-text");
  if (pillEl) pillEl.textContent = isEn ? curr.pillEn : curr.pillAr;

  const titleEl = document.getElementById("cat-hero-title-main");
  if (titleEl) titleEl.textContent = isEn ? curr.titleEn : curr.titleAr;

  const accentEl = document.getElementById("cat-hero-title-accent");
  if (accentEl) accentEl.textContent = isEn ? curr.accentEn : curr.accentAr;

  const descEl = document.getElementById("cat-hero-desc-text");
  if (descEl) descEl.textContent = isEn ? curr.descEn : curr.descAr;

  // Sort label & options
  const sortLabel = document.getElementById("cat-sort-label");
  if (sortLabel) sortLabel.textContent = isEn ? "Sort by:" : "ترتيب حسب:";

  const sortSelect = document.getElementById("cat-sort-select");
  if (sortSelect) {
    sortSelect.options[0].text = isEn ? "Featured & Recommended" : "المقترح والمميز";
    sortSelect.options[1].text = isEn ? "Price: Low to High" : "السعر: من الأقل للأعلى";
    sortSelect.options[2].text = isEn ? "Price: High to Low" : "السعر: من الأعلى للأقل";
    sortSelect.options[3].text = isEn ? "Customer Rating ★" : "الأعلى تقييماً ★";
  }

  // Render Filter Buttons dynamically
  const filterGroup = document.getElementById("cat-filters-group");
  if (filterGroup && curr.filters) {
    filterGroup.innerHTML = curr.filters.map(f => {
      const isAct = currentSubTag === f.id;
      const label = isEn ? f.labelEn : f.labelAr;
      return `
        <button type="button" 
                class="cat-filter-btn ${isAct ? "active" : ""}" 
                data-tag="${f.id}"
                onclick="filterCategoryByTag('${f.id}', this)">
          ${label}
        </button>
      `;
    }).join("");
  }

  // Update Page Title
  document.title = (isEn ? curr.titleEn : curr.titleAr) + " | ATYAB PERFUMES";
}

/**
 * Main product grid renderer with Ahmed Al Maghribi luxury aesthetics
 */
function renderCategoryProducts() {
  const container = document.getElementById("category-products-container");
  if (!container) return;

  const isEn = typeof state !== "undefined" && state.language === "en";
  const allProducts = typeof ATYAB_PRODUCTS !== "undefined" ? ATYAB_PRODUCTS : [];

  // Filter by primary category
  let filtered = allProducts;
  if (currentCategoryFilter && currentCategoryFilter !== "all") {
    if (currentCategoryFilter === "bakhoor" || currentCategoryFilter === "dakhoon") {
      filtered = filtered.filter(p => p.category === "bakhoor" || p.category === "dakhoon");
    } else {
      filtered = filtered.filter(p => p.category === currentCategoryFilter);
    }
  }

  // Filter by sub-tag (semantic matching across EN and AR)
  if (currentSubTag && currentSubTag !== "all") {
    filtered = filtered.filter(p => {
      const id = p.id.toLowerCase();
      const txt = (p.name + " " + (p.nameEn || "") + " " + p.subtitle + " " + (p.subtitleEn || "") + " " + (p.family || "") + " " + (p.familyEn || "")).toLowerCase();
      
      if (currentSubTag === "oud") {
        return id.includes("oud") || id.includes("shaikh") || txt.includes("oud") || txt.includes("عود");
      }
      if (currentSubTag === "floral") {
        return id.includes("flower") || id.includes("mashair") || id.includes("rose") || txt.includes("rose") || txt.includes("ورد") || txt.includes("زهري") || txt.includes("floral");
      }
      if (currentSubTag === "fresh") {
        return id.includes("a555") || id.includes("kaaf") || id.includes("summer") || txt.includes("marine") || txt.includes("sea") || txt.includes("بحر") || txt.includes("fresh") || txt.includes("منعش") || txt.includes("صيفي");
      }
      if (currentSubTag === "woody") {
        return id.includes("nader") || id.includes("marj") || txt.includes("wood") || txt.includes("cardamom") || txt.includes("أخشاب") || txt.includes("هيل");
      }
      if (currentSubTag === "musk") {
        return id.includes("musk") || txt.includes("مسك") || txt.includes("musk");
      }
      if (currentSubTag === "bakhoor" || currentSubTag === "chips") {
        return id.includes("bakhoor") || txt.includes("بخور") || txt.includes("دخون");
      }
      return txt.includes(currentSubTag.toLowerCase());
    });
  }

  // Sort
  if (currentSortBy === "price-asc") {
    filtered.sort((a, b) => (a.priceSAR || 0) - (b.priceSAR || 0));
  } else if (currentSortBy === "price-desc") {
    filtered.sort((a, b) => (b.priceSAR || 0) - (a.priceSAR || 0));
  } else if (currentSortBy === "rating") {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Update count badge
  const countEl = document.getElementById("cat-count-num");
  if (countEl) {
    countEl.textContent = isEn ? `${filtered.length} Creations` : `${filtered.length} عطور ملكية`;
  }

  // Empty state
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="cat-empty-state">
        <span class="cat-empty-icon">⚜️</span>
        <h3>${isEn ? "No matching fragrances found" : "لا توجد عطور متطابقة مع هذا الفلتر"}</h3>
        <p>${isEn ? "Please explore all creations or reset your scent filters." : "تفضل بتصفح جميع العطور أو اختر تصنيفاً آخر لاستكشاف نفائس الدار."}</p>
        <button class="btn btn-primary" onclick="filterCategoryByTag('all')">
          ${isEn ? "Show All Perfumes" : "عرض جميع العطور"}
        </button>
      </div>
    `;
    return;
  }

  // Apply grid layout
  container.className = `cat-products-grid ${currentGridLayout}`;

  // Render cards with exact single given rate (Ahmed Al Maghribi Haute Parfumerie aesthetic)
  container.innerHTML = filtered.map((product, index) => {
    const lp = getProductLocalized(product, isEn ? "en" : "ar");
    const exactPrice = product.priceSAR;
    const exactOldPrice = product.originalPriceSAR;
    const officialVolume = isEn ? (product.defaultSizeEn || "100ml Bottle") : (product.defaultSize || "قارورة 100 مل");
    const cleanVolume = officialVolume.split("(")[0].trim();

    // Format top 3 accords/notes as clean preview chips
    let keyNotesPreview = "";
    if (product.notes) {
      const topList = (isEn ? (product.notesEn?.top || product.notes.top) : product.notes.top) || [];
      const baseList = (isEn ? (product.notesEn?.base || product.notes.base) : product.notes.base) || [];
      const combined = [topList[0], topList[1], baseList[0]].filter(Boolean);
      keyNotesPreview = combined.map(n => n.replace(/\(.*?\)/g, "").trim()).slice(0, 3).join(" • ");
    }

    const isWishlisted = typeof state !== "undefined" && state.wishlist && state.wishlist.some(w => (typeof w === "object" ? w.id : w) === product.id);
    const savePercent = exactOldPrice && exactOldPrice > exactPrice 
      ? Math.round((1 - exactPrice / exactOldPrice) * 100) 
      : 0;

    const pdpUrl = `product.html?id=${product.id}${isEn ? '&lang=en' : ''}`;

    return `
      <article class="cat-card-lux" 
               id="card-${product.id}" 
               data-selected-size="${encodeURIComponent(officialVolume)}" 
               data-price="${exactPrice}"
               style="animation-delay: ${index * 0.05}s;">

        <!-- Media Container -->
        <div class="cat-card-media-box">
          <a href="${pdpUrl}" class="cat-card-img-link" title="${lp.displayName}">
            <img src="${product.image}" alt="${lp.displayName}" class="cat-card-img" loading="lazy" />
          </a>

          <!-- Luxury Badges -->
          <div class="cat-card-badges">
            ${lp.displayBadge ? `<span class="cat-tag-pill cat-tag-gold">${lp.displayBadge}</span>` : ""}
            ${savePercent > 0 ? `<span class="cat-tag-pill cat-tag-dark">${isEn ? "Save" : "وفر"} ${savePercent}%</span>` : ""}
          </div>

          <!-- Quick Action Buttons -->
          <div class="cat-card-floating-actions">
            <button type="button" 
                    class="cat-action-circle-btn ${isWishlisted ? "active" : ""}" 
                    onclick="toggleWishlistCategory('${product.id}', event)"
                    title="${isEn ? "Add to Wishlist" : "أضف للمفضلة"}"
                    aria-label="Wishlist">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="${isWishlisted ? '#E53935' : 'none'}" stroke="${isWishlisted ? '#E53935' : 'currentColor'}" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button type="button" 
                    class="cat-action-circle-btn" 
                    onclick="openQuickViewCategory('${product.id}', event)"
                    title="${isEn ? "Quick View" : "نظرة سريعة"}"
                    aria-label="Quick View">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>

        <!-- Card Body -->
        <div class="cat-card-body">
          <!-- Rating -->
          <div class="cat-card-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-num">${product.rating || 5.0}</span>
            <span class="reviews-count">(${product.reviewsCount || 150} ${isEn ? "reviews" : "تقييم"})</span>
          </div>

          <!-- Eyebrow Category & Official Volume -->
          <div class="cat-card-meta-line">
            <span class="cat-card-volume-pill">${cleanVolume}</span>
            <span class="cat-card-meta-dot">•</span>
            <span class="cat-card-concentration">
              ${lp.displayConcentration ? lp.displayConcentration.split("(")[0].trim() : (isEn ? "EAU DE PARFUM" : "أو دو بارفان")}
            </span>
          </div>

          <!-- Product Title -->
          <h3 class="cat-card-title-wrap">
            <a href="${pdpUrl}" class="cat-card-title">
              ${lp.displayName}
            </a>
          </h3>

          <!-- Subtitle / Notes preview -->
          <p class="cat-card-sub" title="${lp.displaySubtitle || ''}">
            ${lp.displaySubtitle || lp.displayFamily || ""}
          </p>

          ${keyNotesPreview ? `
            <div class="cat-card-notes-chips" title="${keyNotesPreview}">
              <span class="notes-icon">✨</span>
              <span>${keyNotesPreview}</span>
            </div>
          ` : ""}

          <!-- Authentic Single Given Rate Box -->
          <div class="cat-card-price-box">
            <div class="cat-prices-wrap">
              <span class="cat-card-price-current" id="price-display-${product.id}">
                ${formatPrice(exactPrice)}
              </span>
              ${exactOldPrice ? `
                <span class="cat-card-price-old" id="old-price-display-${product.id}">
                  ${formatPrice(exactOldPrice)}
                </span>
              ` : ""}
            </div>
            ${savePercent > 0 ? `
              <span class="cat-price-save-tag">${isEn ? "SAVE" : "وفر"} ${savePercent}%</span>
            ` : ""}
          </div>

          <!-- Add to Bag Button -->
          <div class="cat-card-actions">
            <button type="button" 
                    class="cat-btn-add-cart" 
                    id="add-btn-${product.id}"
                    onclick="handleCardDirectAddToCart('${product.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>${isEn ? "Add to Bag" : "أضف للسلة"}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/**
 * Direct Add to Bag with instant visual feedback and exact rate
 */
function handleCardDirectAddToCart(productId) {
  const card = document.getElementById(`card-${productId}`);
  if (!card) return;

  const product = (typeof ATYAB_PRODUCTS !== "undefined" ? ATYAB_PRODUCTS : []).find(p => p.id === productId);
  const size = decodeURIComponent(card.dataset.selectedSize || (product ? product.defaultSize : ""));
  const btn = document.getElementById(`add-btn-${productId}`);
  const isEn = typeof state !== "undefined" && state.language === "en";

  if (btn) {
    const originalContent = btn.innerHTML;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${isEn ? "Added to Bag ✓" : "تمت الإضافة للسلة ✓"}</span>
    `;
    btn.classList.add("btn-added-state");

    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.classList.remove("btn-added-state");
    }, 1600);
  }

  if (typeof addToCart === "function") {
    addToCart(productId, size, 1);
  }
}

/**
 * Wishlist toggle from category card
 */
function toggleWishlistCategory(productId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (typeof toggleWishlist === "function") {
    toggleWishlist(productId);
  }
  renderCategoryProducts();
}

/**
 * Open Quick View modal for a product from category card
 */
function openQuickViewCategory(productId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (typeof openQuickView === "function") {
    openQuickView(productId);
  }
}

/**
 * Filter by sub-tag (Oriental, Floral, Fresh, etc.)
 */
function filterCategoryByTag(tag, btn) {
  currentSubTag = tag;
  document.querySelectorAll(".cat-filter-btn").forEach(b => b.classList.remove("active"));
  if (btn) {
    btn.classList.add("active");
  } else {
    const target = document.querySelector(`.cat-filter-btn[data-tag="${tag}"]`);
    if (target) target.classList.add("active");
  }
  renderCategoryProducts();
}

/**
 * Sort category products
 */
function sortCategoryProducts(sortVal) {
  currentSortBy = sortVal;
  renderCategoryProducts();
}

/**
 * Toggle grid columns (3 or 4)
 */
function setCategoryGridLayout(layout) {
  currentGridLayout = layout;
  document.querySelectorAll(".grid-view-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.layout === layout);
  });
  const container = document.getElementById("category-products-container");
  if (container) {
    container.className = `cat-products-grid ${layout}`;
  }
}

// Global expose
window.initCategoryPage = initCategoryPage;
window.renderCategoryProducts = renderCategoryProducts;
window.updateCategoryPageHeader = updateCategoryPageHeader;
window.selectCardVariant = selectCardVariant;
window.handleCardDirectAddToCart = handleCardDirectAddToCart;
window.filterCategoryByTag = filterCategoryByTag;
window.sortCategoryProducts = sortCategoryProducts;
window.setCategoryGridLayout = setCategoryGridLayout;
