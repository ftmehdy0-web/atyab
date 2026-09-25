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

function getCartStorageKey(email) {
  const account = state?.account || readStoredAccount();
  const userEmail = email || account?.email;
  return userEmail ? `atyab_cart_${userEmail.toLowerCase()}` : "atyab_guest_cart";
}

function readStoredCart() {
  const account = readStoredAccount();
  if (account && account.email) {
    const userKey = `atyab_cart_${account.email.toLowerCase()}`;
    try {
      const raw = localStorage.getItem(userKey);
      if (raw) return JSON.parse(raw);
    } catch { }
  }
  try {
    const raw = localStorage.getItem("atyab_guest_cart") || localStorage.getItem("atyab_cart");
    if (raw) return JSON.parse(raw);
  } catch { }
  return [];
}


const state = {
  language: initialLang,
  account: readStoredAccount(),
  cart: readStoredCart(),
  wishlist: JSON.parse(localStorage.getItem("atyab_wishlist") || localStorage.getItem("aytyab_wishlist") || "[]"),
  currency: localStorage.getItem("atyab_currency") || localStorage.getItem("aytyab_currency") || "SAR",
  filter: "all",
  searchQuery: "",
  sortBy: "featured",
  appliedCoupon: null,
  giftWrap: false,
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
  },
  lastTrackedNumber: null
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
// ===================================================================
// دوال تبديل اللغة ومحددات الترويسة الفاخرة (HEADER CONTROLS & I18N)
// ===================================================================
function toggleHdrLang(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("hdr-lang-dropdown");
  const countryDropdown = document.getElementById("hdr-country-dropdown");
  countryDropdown?.classList.remove("open");
  dropdown?.classList.toggle("open");
}

function toggleHdrCountry(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("hdr-country-dropdown");
  const langDropdown = document.getElementById("hdr-lang-dropdown");
  langDropdown?.classList.remove("open");
  dropdown?.classList.toggle("open");
}

function selectHdrCountry(countryCode, currency) {
  state.country = countryCode;
  localStorage.setItem("atyab_country", countryCode);

  const currentLabel = document.getElementById("hdr-country-current");
  if (currentLabel) currentLabel.textContent = countryCode;

  document.querySelectorAll("#hdr-country-dropdown .hdr-dropdown-item").forEach(item => {
    item.classList.toggle("active", item.dataset.country === countryCode);
  });

  const dropdown = document.getElementById("hdr-country-dropdown");
  dropdown?.classList.remove("open");

  if (currency && state.currency !== currency) {
    state.currency = currency;
    localStorage.setItem("atyab_currency", currency);
    renderProducts();
    renderShowcase();
    updateCartUI();
    showToast(state.language === "ar" ? `تم تحديث الدولة إلى ${countryCode}` : `Region set to ${countryCode}`);
  }
}

function handleHeaderSearch() {
  const input = document.getElementById("hdr-search-input");
  const query = input?.value?.trim() || "";
  openSearchModal();
  const modalInput = document.getElementById("search-input-box");
  if (modalInput) {
    modalInput.value = query;
    handleLiveSearch(query);
    modalInput.focus();
  }
}

function openTrackOrderModal() {
  const modal = document.getElementById("track-order-modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    renderTrackModalContent();
  }
}

function closeTrackOrderModal() {
  const modal = document.getElementById("track-order-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function getStoredOrdersList() {
  try {
    const raw = localStorage.getItem("atyab_orders");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function formatDateKSA(isoStr) {
  if (!isoStr) return "";
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString(state.language === "ar" ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return "";
  }
}

function getOrderStatusBadgeText(status) {
  const isEn = state.language === "en";
  switch (status) {
    case "cancelled":
      return isEn ? "Cancelled ❌" : "ملغي ❌";
    case "delivered":
      return isEn ? "Delivered ✅" : "تم التوصيل ✅";
    case "shipped":
      return isEn ? "Shipped 🚚" : "قيد الشحن 🚚";
    case "processing":
      return isEn ? "Packaging 📦" : "قيد التجهيز 📦";
    case "confirmed":
      return isEn ? "Confirmed ✨" : "تم التأكيد ✨";
    case "pending":
    default:
      return isEn ? "Pending ⏳" : "قيد الانتظار ⏳";
  }
}

function renderTrackModalContent(forceGuest = false) {
  const body = document.getElementById("track-modal-card-body");
  if (!body) return;

  const isEn = state.language === "en";

  // CASE 1: User is NOT logged in and hasn't selected guest tracking
  if (!state.account && !forceGuest) {
    body.innerHTML = `
      <div class="track-login-prompt-box">
        <span style="font-size: 2.8rem; display: block; margin-bottom: 10px;">🔒</span>
        <h3 style="font-family: var(--font-arabic-title); font-size: 1.3rem; font-weight: 800; color: #111; margin-bottom: 8px;" data-i18n="track_login_prompt_title">
          ${t("track_login_prompt_title")}
        </h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); max-width: 440px; margin: 0 auto 20px; line-height: 1.6;" data-i18n="track_login_prompt_desc">
          ${t("track_login_prompt_desc")}
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="closeTrackOrderModal(); openAccountModal(); setAccountMode('login');" style="padding: 12px 26px;">
            🔑 <span data-i18n="track_login_btn">${t("track_login_btn")}</span>
          </button>
          <button class="btn btn-secondary" onclick="renderTrackModalContent(true)" style="padding: 12px 20px;">
            🔍 <span data-i18n="track_guest_lookup_btn">${t("track_guest_lookup_btn")}</span>
          </button>
        </div>
      </div>
    `;
    return;
  }

  // CASE 2: Guest Lookup View
  if (!state.account && forceGuest) {
    body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.4rem;">📦</span>
          <h3 style="font-family: var(--font-arabic-title); font-size: 1.25rem; font-weight: 800;" data-i18n="track_order_title">
            ${t("track_order_title")}
          </h3>
        </div>
        <button type="button" class="btn btn-sm btn-outline" onclick="renderTrackModalContent(false)" style="font-size: 0.78rem; padding: 4px 10px;">
          🔒 ${t("track_login_btn")}
        </button>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 14px;" data-i18n="track_order_desc">
        ${t("track_order_desc")}
      </p>
      <div class="track-input-group">
        <input type="text" id="track-order-input" class="track-input-field" placeholder="${t("track_order_input_placeholder")}" data-i18n-placeholder="track_order_input_placeholder" />
        <button class="track-submit-btn" onclick="submitTrackOrder()" data-i18n="track_order_submit">${t("track_order_submit")}</button>
      </div>
      <div id="track-order-result" class="track-status-box" style="display: none;"></div>
    `;
    setTimeout(() => document.getElementById("track-order-input")?.focus(), 80);
    return;
  }

  // CASE 3: Authenticated User with Personal Orders
  const allOrders = getStoredOrdersList();
  const userEmail = state.account.email.toLowerCase();
  const userOrders = allOrders.filter(o =>
    (o.customer?.email && o.customer.email.toLowerCase() === userEmail) ||
    (o.user_email && o.user_email.toLowerCase() === userEmail)
  );

  if (userOrders.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 28px 12px;">
        <span style="font-size: 3rem; display: block; margin-bottom: 10px;">📦</span>
        <h3 style="font-family: var(--font-arabic-title); font-size: 1.3rem; font-weight: 800; color: #111; margin-bottom: 8px;" data-i18n="track_no_orders_title">
          ${t("track_no_orders_title")}
        </h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); max-width: 420px; margin: 0 auto 20px; line-height: 1.6;" data-i18n="track_no_orders_desc">
          ${t("track_no_orders_desc")}
        </p>
        <button class="btn btn-primary" onclick="closeTrackOrderModal(); window.location.href='#catalog';" style="padding: 11px 24px;">
          🛍️ <span data-i18n="track_no_orders_shop_btn">${t("track_no_orders_shop_btn")}</span>
        </button>
        <div style="margin-top: 24px; padding-top: 18px; border-top: 1px dashed var(--border-light);">
          <button type="button" class="btn btn-sm btn-outline" onclick="renderTrackModalContent(true)" style="font-size: 0.8rem;">
            🔍 ${t("track_guest_lookup_btn")}
          </button>
        </div>
      </div>
    `;
    return;
  }

  // User has active or historical orders!
  body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 1.4rem;">👑</span>
        <h3 style="font-family: var(--font-arabic-title); font-size: 1.25rem; font-weight: 800;" data-i18n="track_order_title">
          ${t("track_order_title")}
        </h3>
      </div>
      <span style="font-size: 0.8rem; color: var(--gold-deep); font-weight: 700;">
        ${state.account.name}
      </span>
    </div>
    <label for="track-user-orders-select" style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;" data-i18n="track_select_order_label">
      ${t("track_select_order_label")}
    </label>
    <select id="track-user-orders-select" class="track-user-orders-selector" onchange="renderTrackOrderResult(this.value)">
      ${userOrders.map((o) => `
        <option value="${o.id}">
          ${o.id} • ${formatDateKSA(o.createdAt)} • ${getOrderStatusBadgeText(o.status)} (${formatPrice(o.financials?.totalSAR || 0)})
        </option>
      `).join("")}
    </select>
    <div id="track-order-result" class="track-status-box" style="display: block;"></div>
    <div style="margin-top: 16px; text-align: center;">
      <button type="button" class="btn btn-sm btn-outline" onclick="renderTrackModalContent(true)" style="font-size: 0.78rem;">
        🔍 ${isEn ? "Search Another Order Number" : "البحث برقم طلب آخر"}
      </button>
    </div>
  `;

  renderTrackOrderResult(userOrders[0].id);
}

function renderTrackOrderResult(trackingNum) {
  const resultBox = document.getElementById("track-order-result");
  if (!resultBox) return;

  const targetId = (trackingNum || state.lastTrackedNumber || "").trim();
  state.lastTrackedNumber = targetId;
  const isEn = state.language === "en";

  const allOrders = getStoredOrdersList();
  let order = allOrders.find(o =>
    o.id === targetId ||
    o.tracking?.trackingNumber === targetId ||
    o.customer?.phone === targetId
  );

  if (!order) {
    if (state.account) {
      resultBox.innerHTML = `
        <div style="text-align: center; padding: 20px; color: #DC2626;">
          ${t("track_order_not_found")}
        </div>
      `;
      resultBox.style.display = "block";
      return;
    } else {
      order = {
        id: targetId || "ATY-KSA-994821",
        status: "processing",
        carrier: "SMSA Express (سمسا إكسبريس)",
        tracking: { carrier: "SMSA Express (سمسا إكسبريس)", trackingNumber: targetId || "SMSA-KSA-994821" }
      };
    }
  }

  const orderNum = order.id || targetId;
  const carrierName = order.tracking?.carrier || "SMSA Express (سمسا إكسبريس)";
  const isCancelled = order.status === "cancelled";
  const status = order.status || "pending";

  // Status Badge
  let statusBadgeHtml = "";
  if (isCancelled) {
    statusBadgeHtml = `
      <span class="track-status-cancelled-badge">
        <span>❌</span>
        <span>${t("track_status_cancelled")}</span>
      </span>
    `;
  } else if (status === "delivered") {
    statusBadgeHtml = `
      <span style="font-size: 0.78rem; background: #E8F5E9; color: #2E7D32; padding: 3px 10px; border-radius: 999px; font-weight: 700;">
        ${isEn ? "Delivered 🎉" : "تم التوصيل بنجاح 🎉"}
      </span>
    `;
  } else if (status === "shipped") {
    statusBadgeHtml = `
      <span style="font-size: 0.78rem; background: #E0F2FE; color: #0369A1; padding: 3px 10px; border-radius: 999px; font-weight: 700;">
        ${t("track_status_in_transit")}
      </span>
    `;
  } else if (status === "processing") {
    statusBadgeHtml = `
      <span style="font-size: 0.78rem; background: #FEF3C7; color: #B45309; padding: 3px 10px; border-radius: 999px; font-weight: 700;">
        ${isEn ? "Packaging 📦" : "جاري التجهيز والتغليف 📦"}
      </span>
    `;
  } else if (status === "confirmed") {
    statusBadgeHtml = `
      <span style="font-size: 0.78rem; background: #EDE9FE; color: #6D28D9; padding: 3px 10px; border-radius: 999px; font-weight: 700;">
        ${isEn ? "Confirmed ✨" : "تم التأكيد الملكي ✨"}
      </span>
    `;
  } else {
    statusBadgeHtml = `
      <span style="font-size: 0.78rem; background: #F3F4F6; color: #4B5563; padding: 3px 10px; border-radius: 999px; font-weight: 700;">
        ${isEn ? "Pending Review ⏳" : "قيد المراجعة ⏳"}
      </span>
    `;
  }

  // Cancellation Alert Notice if order was cancelled by admin
  let cancellationNoticeHtml = "";
  if (isCancelled) {
    cancellationNoticeHtml = `
      <div class="track-cancelled-notice-box">
        <div style="font-weight: 800; font-size: 0.92rem; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <span>⚠️</span>
          <span>${isEn ? "Order Cancelled by Store Administration" : "تم إلغاء هذا الطلب من قِبل إدارة المتجر"}</span>
        </div>
        <p style="margin: 0; font-size: 0.84rem; line-height: 1.6;">${t("track_cancelled_notice")}</p>
      </div>
    `;
  }

  // Timeline steps
  let timelineStepsHtml = "";
  if (isCancelled) {
    timelineStepsHtml = `
      <li class="track-step-item completed">
        <span class="track-step-icon">✓</span>
        <div>
          <div class="track-step-title">${t("track_step1_title")}</div>
          <div class="track-step-sub">${formatDateKSA(order.createdAt || new Date().toISOString())}</div>
        </div>
      </li>
      <li class="track-step-item cancelled">
        <span class="track-step-icon">✕</span>
        <div>
          <div class="track-step-title">${t("track_step_cancelled_title")}</div>
          <div class="track-step-sub">${t("track_step_cancelled_sub")}</div>
        </div>
      </li>
    `;
  } else {
    const isStep1Done = ["pending", "confirmed", "processing", "shipped", "delivered"].includes(status);
    const isStep1Active = status === "pending";
    const isStep2Done = ["confirmed", "processing", "shipped", "delivered"].includes(status);
    const isStep2Active = status === "confirmed";
    const isStep3Done = ["processing", "shipped", "delivered"].includes(status);
    const isStep3Active = status === "processing";
    const isStep4Done = status === "delivered";
    const isStep4Active = status === "shipped";

    timelineStepsHtml = `
      <li class="track-step-item ${isStep1Done ? (isStep1Active ? 'active' : 'completed') : ''}">
        <span class="track-step-icon">${isStep1Done && !isStep1Active ? '✓' : '1'}</span>
        <div>
          <div class="track-step-title">${t("track_step1_title")}</div>
          <div class="track-step-sub">${t("track_step1_sub")}</div>
        </div>
      </li>
      <li class="track-step-item ${isStep2Done ? (isStep2Active ? 'active' : 'completed') : ''}">
        <span class="track-step-icon">${isStep2Done && !isStep2Active ? '✓' : '2'}</span>
        <div>
          <div class="track-step-title">${t("track_step2_title")}</div>
          <div class="track-step-sub">${t("track_step2_sub")}</div>
        </div>
      </li>
      <li class="track-step-item ${isStep3Done ? (isStep3Active ? 'active' : 'completed') : ''}">
        <span class="track-step-icon">${isStep3Done && !isStep3Active ? '✓' : '3'}</span>
        <div>
          <div class="track-step-title">${t("track_step3_title")}</div>
          <div class="track-step-sub">${t("track_step3_sub")}</div>
        </div>
      </li>
      <li class="track-step-item ${isStep4Done ? 'completed' : (isStep4Active ? 'active' : '')}">
        <span class="track-step-icon">${isStep4Done ? '✓' : '4'}</span>
        <div>
          <div class="track-step-title">${t("track_step4_title")}</div>
          <div class="track-step-sub">${t("track_step4_sub")}</div>
        </div>
      </li>
    `;
  }

  // Items Chips
  let itemsHtml = "";
  if (order.items && order.items.length > 0) {
    itemsHtml = `
      <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(184, 138, 40, 0.2);">
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--gold-deep); margin-bottom: 6px;">
          ${isEn ? "Order Fragrances:" : "عطور ومقتنيات الطلب الملكي:"}
        </div>
        ${order.items.map(item => `
          <div class="track-order-item-chip">
            <img src="${item.image || 'assets/images/mashair.jpg'}" alt="" style="width: 36px; height: 36px; object-fit: cover; border-radius: 4px;" />
            <div style="flex: 1; font-size: 0.82rem;">
              <strong style="display: block;">${isEn ? (item.nameEn || item.name) : item.name}</strong>
              <span style="color: var(--text-muted); font-size: 0.76rem;">${item.size || "100ml"} × ${item.quantity}</span>
            </div>
            <strong style="color: var(--gold-primary); font-size: 0.85rem;">${formatPrice((item.priceSAR || 0) * (item.quantity || 1))}</strong>
          </div>
        `).join("")}
        <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 0.92rem; margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--border-light);">
          <span>${isEn ? "Grand Total:" : "المجموع الإجمالي:"}</span>
          <span style="color: var(--gold-primary);">${formatPrice(order.financials?.totalSAR || 0)}</span>
        </div>
      </div>
    `;
  }

  resultBox.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(184, 138, 40, 0.2); padding-bottom: 8px;">
      <div>
        <span style="font-size: 0.74rem; color: var(--text-muted); display: block;">${carrierName}</span>
        <span style="font-weight: 700; font-size: 0.9rem;">
          ${t("track_waybill_label")} <strong id="track-result-num" style="color: #B88A28;">${orderNum}</strong>
        </span>
      </div>
      ${statusBadgeHtml}
    </div>

    ${cancellationNoticeHtml}

    <ul class="track-steps-timeline">
      ${timelineStepsHtml}
    </ul>

    ${itemsHtml}
  `;

  resultBox.style.display = "block";
}

function submitTrackOrder() {
  const input = document.getElementById("track-order-input");
  const val = input?.value?.trim();
  const resultBox = document.getElementById("track-order-result");
  if (!val) {
    showToast(t("track_error_empty"), "", "⚠️");
    return;
  }
  state.lastTrackedNumber = val;
  if (resultBox) {
    renderTrackOrderResult(val);
    showToast(`${t("track_searching")} ${val}`, "", "📦");
  }
}

function refreshActiveOrderTracking() {
  const modal = document.getElementById("track-order-modal");
  if (!modal || !modal.classList.contains("active")) return;

  const selector = document.getElementById("track-user-orders-select");
  if (selector && selector.value) {
    renderTrackOrderResult(selector.value);
  } else if (state.lastTrackedNumber) {
    renderTrackOrderResult(state.lastTrackedNumber);
  } else if (state.account) {
    renderTrackModalContent();
  }
}

function openStoreLocatorModal() {
  const modal = document.getElementById("store-locator-modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeStoreLocatorModal() {
  const modal = document.getElementById("store-locator-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

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
  document.documentElement.classList.toggle("lang-en", lang === "en");
  document.documentElement.classList.toggle("lang-ar", lang === "ar");
  document.body.classList.toggle("lang-en", lang === "en");
  document.body.classList.toggle("lang-ar", lang === "ar");

  // مزامنة الروابط الداخلية لتحمل اللغة النشطة تلقائياً
  syncNavLinksLanguage(lang);

  // إغلاق القوائم المنسدلة
  document.getElementById("lang-selector-dropdown")?.classList.remove("open");
  document.getElementById("hdr-lang-dropdown")?.classList.remove("open");
  document.getElementById("hdr-country-dropdown")?.classList.remove("open");

  // تحديث مبدل اللغة الشريطي المنفصل (Segmented Pill Toggle)
  const btnAr = document.getElementById("lang-btn-ar");
  const btnEn = document.getElementById("lang-btn-en");
  if (btnAr) btnAr.classList.toggle("active", lang === "ar");
  if (btnEn) btnEn.classList.toggle("active", lang === "en");

  // تحديث تسمية الزر وحالة الاختيار في الترويسة
  const hdrLangCurrent = document.getElementById("hdr-lang-current");
  if (hdrLangCurrent) {
    hdrLangCurrent.textContent = lang === "en" ? "English" : "عربي";
  }

  const label = document.getElementById("current-lang-label");
  if (label) {
    label.textContent = lang === "en" ? "English" : "العربية";
  }

  const topLangText = document.getElementById("top-lang-text");
  if (topLangText) {
    topLangText.textContent = lang === "ar" ? "English" : "العربية";
  }

  document.querySelectorAll("#hdr-lang-dropdown .hdr-dropdown-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.querySelectorAll(".mobile-lang-btn").forEach((btn) => {
    btn.classList.toggle("active", (btn.textContent.includes("العربية") && lang === "ar") || (btn.textContent.includes("English") && lang === "en"));
  });

  // تحديث نصوص خانات البحث
  document.querySelectorAll(".hdr-search-input, #search-input-box, #mobile-search-input").forEach((inp) => {
    inp.placeholder = lang === "en" ? "SEARCH" : "ابحث في عطور أطياب...";
  });

  // تحديث عنوان الصفحة
  if (typeof currentProduct === "undefined" || !currentProduct) {
    const pageTitle = t("page_title");
    if (pageTitle && pageTitle !== "page_title") {
      document.title = pageTitle;
    }
  }

  // تحديث جميع النصوص التي تحمل السمة data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translated = t(key);
    if (translated && translated !== key) {
      if (el.tagName === "OPTION") {
        el.textContent = translated.replace(/<[^>]*>/g, "");
      } else {
        el.innerHTML = translated;
      }
    }
  });

  // تحديث النصوص في السمات (placeholder / title / aria-label)
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

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    const translated = t(key);
    if (translated) {
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

  // تحديث صندوق تتبع الشحنة المباشر
  renderTrackOrderResult(state.lastTrackedNumber || "SMSA-KSA-994821");

  // إعادة تصيير الأقسام الديناميكية
  renderProducts();
  renderShowcase();
  renderCreamsSpotlight();
  updateCartUI();
  updateWishlistBadge();
  updateAccountUI();

  if (document.getElementById("scent-quiz-modal")?.classList.contains("active")) {
    renderQuizStep();
  }

  if (document.getElementById("checkout-modal")?.classList.contains("active")) {
    openCheckoutModal();
  }

  // إذا كنا في صفحة المنتج المستقلة، أعد تصييرها أيضاً
  if (typeof renderProductPage === "function") {
    renderProductPage();
  }
  if (typeof renderCategoryProducts === "function") {
    renderCategoryProducts();
  }
  if (typeof updateCategoryPageHeader === "function") {
    updateCategoryPageHeader();
  }
  if (typeof updatePageSEO === "function") {
    updatePageSEO();
  }

  if (notify) {
    showToast(t("toast_lang_title") || "اللغة", t("toast_lang_msg") || (lang === "en" ? "Switched to English" : "تم التبديل إلى العربية"), "🌐");
  }
}

/**
 * مزامنة جميع الروابط الداخلية للتنقل بلغة العرض الحالية دون فقدان السياق
 */
function syncNavLinksLanguage(lang) {
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://wa.me") || href.startsWith("http")) return;

    if (href.endsWith(".html") || href.includes(".html?")) {
      try {
        const parts = href.split("?");
        const base = parts[0];
        const search = parts[1] || "";
        const sp = new URLSearchParams(search);
        if (lang === "en") {
          sp.set("lang", "en");
        } else {
          sp.delete("lang");
        }
        const newSearch = sp.toString();
        a.setAttribute("href", newSearch ? `${base}?${newSearch}` : base);
      } catch (e) { }
    }
  });
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
    if (typeof renderCategoryProducts === "function") {
      renderCategoryProducts();
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

  // إغلاق قوائم اللغة والدولة عند النقر خارجها
  document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("lang-selector-dropdown");
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
    const hdrLang = document.getElementById("hdr-lang-dropdown");
    if (hdrLang && !hdrLang.contains(e.target)) {
      hdrLang.classList.remove("open");
    }
    const hdrCountry = document.getElementById("hdr-country-dropdown");
    if (hdrCountry && !hdrCountry.contains(e.target)) {
      hdrCountry.classList.remove("open");
    }
  });
}

// ===================================================================
// نظام الظهور الانسيابي عند التمرير (SMOOTH SCROLL REVEAL OBSERVER)
// ===================================================================
let scrollObserver = null;

function initScrollReveal() {
  const selector = ".showcase-item, .cherished-card, .lux-cat-card, .chapter-card, .product-card, .trust-card, .category-bubble-card, .review-card, .pdp-tier-block, .pdp-accord-item, .spotlight-banner-wide, .scent-finder-banner, .mastery-section, .reveal-on-scroll";

  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(selector).forEach(el => {
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
    threshold: 0.02,
    rootMargin: "0px 0px 80px 0px"
  });

  const targets = document.querySelectorAll(selector);

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
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5500);
  }

  function resetSlideTimer() {
    startSlideTimer();
  }

  startSlideTimer();

  // ربط أزرار الأسهم السابقة والتالية
  const prevBtns = document.querySelectorAll("#heroPrev, .hero-nav-prev");
  const nextBtns = document.querySelectorAll("#heroNext, .hero-nav-next");

  prevBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      window.changeHeroSlide(-1);
    };
  });

  nextBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      window.changeHeroSlide(1);
    };
  });

  // ربط نقاط التنقل
  dots.forEach((dot, idx) => {
    dot.onclick = (e) => {
      e.preventDefault();
      window.goToHeroSlide(idx);
    };
  });

  const sliderContainer = document.querySelector(".hero-slider-section, .hero-slider-container");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => clearInterval(slideInterval));
    sliderContainer.addEventListener("mouseleave", () => startSlideTimer());

    // دعم السحب باللمس على الجوال (Touch Swipe Support)
    let touchStartX = 0;
    sliderContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          window.changeHeroSlide(document.documentElement.dir === "rtl" ? 1 : -1);
        } else {
          window.changeHeroSlide(document.documentElement.dir === "rtl" ? -1 : 1);
        }
      }
    }, { passive: true });
  }
}

// التصفية السريعة عبر دوائر وتصنيفات الترويسة
function filterByCategory(category) {
  if (category === "bakhoor") {
    const bakhoorEl = document.getElementById("bakhoor");
    if (bakhoorEl) {
      bakhoorEl.scrollIntoView({ behavior: "smooth" });
      document.querySelectorAll(".cat-nav-link").forEach((link) => {
        link.classList.toggle("active", link.dataset.cat === "bakhoor");
      });
      return;
    }
  }
  state.filter = category;
  document.querySelectorAll(".filter-tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.filter === category);
  });
  document.querySelectorAll(".cat-nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.cat === category);
  });
  renderProducts();
  const catalogEl = document.getElementById("catalog");
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: "smooth" });
  }
}

// ===================================================================
// عرض قسم "مقدَّر ومحبوب من الجميع" (CHERISHED BY ALL - DYNAMIC RENDERING)
// ===================================================================
function renderShowcase() {
  const container = document.getElementById("cherished-grid-items") || document.getElementById("showcase-grid-items");
  if (!container) return;

  const targetIds = ["atyab-marj", "atyab-tiger-oud", "atyab-kaaf", "atyab-bin-shaikh"];
  const products = targetIds
    .map(id => ATYAB_PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  container.innerHTML = products.map((p) => {
    const lp = getProductLocalized(p, state.language);
    const isEn = state.language === "en";
    const defaultSize = isEn ? (p.defaultSizeEn || p.defaultSize) : p.defaultSize;
    const pdpUrl = `product.html?id=${p.id}${isEn ? '&lang=en' : ''}`;

    return `
      <div class="cherished-card">
        <div class="cherished-card-media">
          ${lp.displayBadge ? `<span class="cherished-badge">${lp.displayBadge}</span>` : ""}
          <a href="${pdpUrl}" aria-label="${lp.displayName}">
            <img src="${p.image}" alt="${lp.displayName}" loading="lazy" />
          </a>
        </div>
        <div class="cherished-card-content">
          <h3 class="cherished-item-title">
            <a href="${pdpUrl}">${lp.displayName}</a>
          </h3>
          <p class="cherished-item-notes">${lp.displaySubtitle || lp.displayFamily}</p>
          <div class="cherished-item-price-row">
            <span class="cherished-current-price">${formatPrice(p.priceSAR)}</span>
            ${p.originalPriceSAR ? `<span class="cherished-old-price">${formatPrice(p.originalPriceSAR)}</span>` : ""}
          </div>
          <div class="cherished-actions">
            <button type="button" class="btn-cherished-cart" onclick="addToCart('${p.id}', '${defaultSize}', 1)" title="${t("cherished_add_cart") || "Add to Bag"}">
              <span>🛍️</span> <span>${t("cherished_add_cart") || "أضف للسلة"}</span>
            </button>
            <a href="${pdpUrl}" class="btn-cherished-view" title="${lp.displayName}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join("");

  initScrollReveal();
}

// ===================================================================
// عرض تسليط الضوء على كريمات الجسم المخملية (CREAMS SPOTLIGHT)
// ===================================================================
function renderCreamsSpotlight() {
  const container = document.getElementById("creams-spotlight-items");
  if (!container) return;

  const creamIds = ["atyab-cream-oud-roses", "atyab-cream-bin-shaikh", "atyab-cream-musk-silk", "atyab-cream-marj"];
  const creams = creamIds
    .map(id => ATYAB_PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  container.innerHTML = creams.map((p) => {
    const lp = getProductLocalized(p, state.language);
    const isEn = state.language === "en";
    const defaultSize = isEn ? (p.defaultSizeEn || p.defaultSize) : p.defaultSize;

    const pdpUrl = `product.html?id=${p.id}${isEn ? '&lang=en' : ''}`;
    return `
      <div class="cherished-card">
        <div class="cherished-card-media">
          ${lp.displayBadge ? `<span class="cherished-badge">${lp.displayBadge}</span>` : ""}
          <a href="${pdpUrl}" aria-label="${lp.displayName}">
            <img src="${p.image}" alt="${lp.displayName}" loading="lazy" />
          </a>
        </div>
        <div class="cherished-card-content">
          <h3 class="cherished-item-title">
            <a href="${pdpUrl}">${lp.displayName}</a>
          </h3>
          <p class="cherished-item-notes">${lp.displaySubtitle || lp.displayFamily}</p>
          <div class="cherished-item-price-row">
            <span class="cherished-current-price">${formatPrice(p.priceSAR)}</span>
            ${p.originalPriceSAR ? `<span class="cherished-old-price">${formatPrice(p.originalPriceSAR)}</span>` : ""}
          </div>
          <button type="button" class="btn-cherished-cart" onclick="addToCart('${p.id}', '${defaultSize}', 1)" style="width: 100%;">
            <span>🛍️</span> <span>${t("cherished_add_cart") || "أضف للسلة الآن"}</span>
          </button>
        </div>
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
    let matchesCategory = state.filter === "all" || p.category === state.filter;
    if (state.filter === "oud") {
      matchesCategory = p.category === "bakhoor" || (p.family && p.family.includes("عود")) || p.id === "atyab-tiger-oud";
    } else if (state.filter === "oriental") {
      matchesCategory = (p.family && p.family.includes("شرقي")) || p.id === "atyab-nader" || p.id === "atyab-mashair" || p.id === "atyab-bin-shaikh";
    } else if (state.filter === "fresh") {
      matchesCategory = p.id === "atyab-a555" || p.id === "atyab-moon-flower" || p.id === "atyab-kaaf";
    } else if (state.filter === "perfumes") {
      matchesCategory = p.category === "perfumes";
    } else if (state.filter === "oil") {
      matchesCategory = p.category === "oil";
    } else if (state.filter === "cream") {
      matchesCategory = p.category === "cream";
    } else if (state.filter === "bakhoor") {
      matchesCategory = p.category === "bakhoor";
    }
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
          <a href="product.html?id=${product.id}${state.language === 'en' ? '&lang=en' : ''}">
            <img src="${product.image}" alt="${lp.displayName}" loading="lazy" />
          </a>
          <div class="quick-view-overlay">
            <a href="product.html?id=${product.id}${state.language === 'en' ? '&lang=en' : ''}" class="btn-quick-view" style="margin-bottom: 6px; text-decoration: none;">
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
            <a href="product.html?id=${product.id}${state.language === 'en' ? '&lang=en' : ''}">${lp.displayName}</a>
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
                <span class="current-price">${formatPrice(product.priceSAR)}</span>
              </div>
              ${product.originalPriceSAR ? `<span class="original-price">${formatPrice(product.originalPriceSAR)}</span>` : ""}
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
  const product = (typeof ATYAB_PRODUCTS !== "undefined" ? ATYAB_PRODUCTS : []).find((p) => p.id === productId);
  if (!product) return;

  const lp = getProductLocalized(product, state.language);
  const chosenSize = size || (state.language === "en" ? (product.defaultSizeEn || product.defaultSize) : product.defaultSize);

  // Exact authentic single given rate - no variant distortion
  const itemPrice = product.priceSAR;

  const existingIndex = state.cart.findIndex((item) => item.id === productId && item.size === chosenSize);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      nameEn: product.nameEn || product.englishName,
      image: product.image,
      priceSAR: itemPrice,
      size: chosenSize,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();

  // Trigger badge bounce animation
  document.querySelectorAll(".cart-count-badge").forEach(badge => {
    badge.classList.remove("badge-bounce");
    void badge.offsetWidth; // trigger reflow
    badge.classList.add("badge-bounce");
  });

  openCartDrawer();
  showToast(
    state.language === "en" ? "Added to Royal Bag" : "تمت الإضافة إلى السلة الملكية",
    state.language === "en" ? `${lp.displayName} has been added.` : `تمت إضافة ${lp.displayName} بنجاح ✨`,
    "🛍️"
  );
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
  const key = getCartStorageKey();
  try {
    localStorage.setItem(key, JSON.stringify(state.cart));
    localStorage.setItem("atyab_guest_cart", JSON.stringify(state.cart));
    localStorage.setItem("atyab_cart", JSON.stringify(state.cart));
    if (state.account) {
      if (typeof firebaseSaveCart === "function") {
        firebaseSaveCart(state.account.email, state.cart).catch((e) => console.warn("Firebase cart sync notice:", e));
      }
      if (typeof supabaseSaveCart === "function") {
        supabaseSaveCart(state.account.email, state.cart).catch((e) => console.warn("Supabase cart sync notice:", e));
      }
    }
  } catch (err) {
    console.warn("Could not save cart:", err);
  }
}

function formatItemSize(size, lang = state.language) {
  if (!size) return "";
  if (lang !== "en") return size;
  return size
    .replace(/قارورة/g, "Bottle")
    .replace(/مرطبان/g, "Jar")
    .replace(/تولة/g, "Tola")
    .replace(/نصف تولة/g, "1/2 Tola")
    .replace(/ربع تولة/g, "1/4 Tola")
    .replace(/مل/g, "ml")
    .replace(/جرام/g, "g")
    .replace(/\(الحجم الرسمي\)/g, "(Official Volume)")
    .replace(/\(الحجم الملكي\)/g, "(Royal Volume)")
    .replace(/\(الأكثر طلباً\)/g, "(Most Popular)")
    .replace(/\(الحجم الكلاسيكي\)/g, "(Classic Volume)")
    .replace(/\(حجم السفر\)/g, "(Travel Size)")
    .replace(/\(الحجم الفاخر\)/g, "(Luxury Size)");
}

function updateCartUI() {
  const countBadges = document.querySelectorAll(".cart-count-badge");
  const cartBody = document.getElementById("cart-drawer-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const discountEl = document.getElementById("cart-discount");
  const totalEl = document.getElementById("cart-total");
  const meterProgress = document.getElementById("shipping-meter-progress");
  const meterText = document.getElementById("shipping-meter-text");


  // Empty cart check
  if (!state.cart || state.cart.length === 0) {
    countBadges.forEach((b) => (b.textContent = 0));
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    if (discountEl) discountEl.textContent = formatPrice(0);
    if (totalEl) totalEl.textContent = formatPrice(0);
    if (meterProgress) meterProgress.style.width = "0%";
    if (meterText) meterText.innerHTML = t("shipping_meter_unqualified", { diff: formatPrice(150) });

    if (cartBody) {
      cartBody.innerHTML = `
        <div style="text-align: center; padding: 48px 18px;">
          <span style="font-size: 3rem; color: var(--gold-primary); display: block; margin-bottom: 12px;">🛍️</span>
          <h4 style="font-size: 1.25rem; font-weight: 800; color: #000; margin-bottom: 8px;">${t("cart_empty_title")}</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0 auto 22px; line-height: 1.6; max-width: 320px;">${t("cart_empty_desc")}</p>
          <a class="btn btn-primary" href="index.html#catalog" onclick="closeCartDrawer();" style="padding: 12px 24px; display: inline-flex; align-items: center; gap: 8px;">
            ✨ ${t("cart_empty_cta")}
          </a>
        </div>
      `;
    }
    return;
  }

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
          <div class="cart-item-size">${formatItemSize(item.size)}</div>
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
    drawer.style.display = "flex";
    drawer.style.visibility = "visible";
    drawer.classList.add("active");
  }
  if (backdrop) {
    backdrop.style.display = "block";
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
      drawer.style.display = "none";
    }
    if (backdrop && !backdrop.classList.contains("active")) {
      backdrop.style.visibility = "hidden";
      backdrop.style.display = "none";
    }
  }, 460);
}

function openMobileNav() {
  const drawer = document.getElementById("mobile-nav-drawer");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  if (drawer) {
    drawer.style.display = "flex";
    drawer.style.visibility = "visible";
    drawer.classList.add("active");
  }
  if (backdrop) {
    backdrop.style.display = "block";
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
      drawer.style.display = "none";
    }
    if (backdrop && !backdrop.classList.contains("active")) {
      backdrop.style.visibility = "hidden";
      backdrop.style.display = "none";
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

async function handleAccountLogin(event) {
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

  // تسجيل دخول المستخدم العادي (Supabase أو الحساب المحلي)
  if (!email || !password || password.length < 6) {
    showAccountMessage(t("account_login_error"));
    return;
  }

  let userProfile = null;

  // Try Firebase Auth if configured
  if (typeof firebaseAuthSignIn === "function" && typeof isFirebaseConfigured === "function" && isFirebaseConfigured()) {
    const fbRes = await firebaseAuthSignIn(email, password);
    if (fbRes && fbRes.success && !fbRes.isLocal) {
      userProfile = {
        name: fbRes.user?.displayName || email.split("@")[0],
        email: fbRes.user?.email || email
      };
    } else if (fbRes && !fbRes.isLocal) {
      showAccountMessage(fbRes.error || t("account_login_error"));
      return;
    }
  }

  // Try Supabase Auth if configured (and not already authenticated by Firebase)
  if (!userProfile && typeof supabaseAuthSignIn === "function" && typeof isSupabaseConfigured === "function" && isSupabaseConfigured()) {
    const res = await supabaseAuthSignIn(email, password);
    if (res && res.success) {
      userProfile = {
        name: res.profile?.name || res.user?.user_metadata?.full_name || email.split("@")[0],
        email: email
      };
    } else if (res && !res.isLocal) {
      showAccountMessage(res.error || t("account_login_error"));
      return;
    }
  }

  // Local fallback recovery
  if (!userProfile) {
    try {
      const storedUserRaw = localStorage.getItem(`atyab_user_${email}`);
      if (storedUserRaw) {
        userProfile = JSON.parse(storedUserRaw);
      }
    } catch { }
    if (!userProfile && state.account && state.account.email.toLowerCase() === email) {
      userProfile = state.account;
    }
    if (!userProfile) {
      userProfile = { name: email.split("@")[0], email };
    }
  }

  // Save active account
  saveAccount(userProfile);
  try {
    localStorage.setItem(`atyab_user_${email}`, JSON.stringify(userProfile));
  } catch { }

  // LOAD USER-SCOPED CART (Saved exclusively for this user):
  const userCartRaw = localStorage.getItem(`atyab_cart_${email}`);
  let userCart = userCartRaw ? JSON.parse(userCartRaw) : [];
  state.cart = userCart;
  saveCart();
  updateCartUI();

  // If Supabase is active, sync cloud cart
  if (typeof supabaseGetCart === "function" && typeof isSupabaseConfigured === "function" && isSupabaseConfigured()) {
    supabaseGetCart(email).then((cloudCart) => {
      if (cloudCart && cloudCart.length > 0) {
        state.cart = cloudCart;
        saveCart();
        updateCartUI();
      }
    });
  }

  setAccountMode("signed-in");
  showToast(t("account_login_success_title"), t("account_login_success_msg", { name: userProfile.name }), "👋");
}

async function handleAccountSignup(event) {
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

  // Try Firebase Auth signup if configured
  if (typeof firebaseAuthSignUp === "function" && typeof isFirebaseConfigured === "function" && isFirebaseConfigured()) {
    const fbRes = await firebaseAuthSignUp(name, email, password);
    if (fbRes && !fbRes.success && !fbRes.isLocal) {
      showAccountMessage(fbRes.error || t("account_login_error"));
      return;
    }
  }

  // Try Supabase signup if active (and Firebase is not configured)
  const isFbActive = typeof isFirebaseConfigured === "function" && isFirebaseConfigured();
  if (!isFbActive && typeof supabaseAuthSignUp === "function" && typeof isSupabaseConfigured === "function" && isSupabaseConfigured()) {
    const res = await supabaseAuthSignUp(name, email, password);
    if (res && !res.success && !res.isLocal) {
      showAccountMessage(res.error || t("account_login_error"));
      return;
    }
  }

  const userProfile = { name, email };
  saveAccount(userProfile);
  try {
    localStorage.setItem(`atyab_user_${email}`, JSON.stringify(userProfile));
  } catch { }

  // User starts with their own fresh/saved cart
  state.cart = [];
  saveCart();
  updateCartUI();

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

  // As requested: "jaise hi logged out ho waise hi site normal ho jae without uska data"
  // Completely reset cart and session data to clean guest mode
  state.cart = [];
  state.lastTrackedNumber = null;
  state.appliedCoupon = null;
  localStorage.removeItem("atyab_guest_cart");
  localStorage.removeItem("atyab_cart");
  localStorage.removeItem("aytyab_cart");

  // Reset checkout input fields
  const coName = document.getElementById("co-name");
  const coEmail = document.getElementById("co-email");
  const coPhone = document.getElementById("co-phone");
  const coAddr = document.getElementById("co-address");
  if (coName) coName.value = "";
  if (coEmail) coEmail.value = "";
  if (coPhone) coPhone.value = "";
  if (coAddr) coAddr.value = "";

  closeCartDrawer();
  closeCheckoutModal();

  updateCartUI();
  updateAccountUI();
  setAccountMode("login");

  // Reset Track Order modal back to unauthenticated login lock screen
  const trackModal = document.getElementById("track-order-modal");
  if (trackModal && trackModal.classList.contains("active")) {
    renderTrackModalContent(false);
  }

  if (typeof firebaseAuthSignOut === "function") {
    firebaseAuthSignOut();
  }

  if (typeof supabaseAuthSignOut === "function") {
    supabaseAuthSignOut();
  }

  showToast(
    state.language === "en" ? "Logged Out" : "تم تسجيل الخروج",
    state.language === "en" ? "Storefront reset to guest mode. Your cart and details have been cleared." : "تم تفريغ الجلسة والسلة بنجاح وعاد المتجر للوضع الطبيعي.",
    "👋"
  );
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
  if (!state.account) {
    showToast(t("cart_login_prompt_title"), t("cart_login_required"), "🔒");
    openAccountModal();
    setAccountMode("login");
    showAccountMessage(t("cart_login_required"), "error");
    return;
  }

  if (state.cart.length === 0) {
    showToast(t("cart_empty_title"), t("cart_empty_desc"));
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById("checkout-modal");

  // Pre-fill user details into checkout form
  const nameInput = document.getElementById("co-name");
  const emailInput = document.getElementById("co-email");
  if (nameInput && state.account) nameInput.value = state.account.name || "";
  if (emailInput && state.account) emailInput.value = state.account.email || "";

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
            <span>${itemTitle} (${formatItemSize(i.size)}) × ${i.quantity}</span>
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

  const customerEmail = (state.account?.email || email || "customer@atyab.sa").toLowerCase();

  // تجهيز سجل الطلب الكامل لحفظه في لوحة الإدارة
  const orderRecord = {
    id: orderId,
    createdAt: new Date().toISOString(),
    status: "pending", // pending, confirmed, processing, shipped, delivered, cancelled
    user_email: customerEmail,
    customer: {
      name,
      email: customerEmail,
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
    localStorage.setItem("atyab_orders_updated", Date.now().toString());
    window.dispatchEvent(new CustomEvent("atyab_orders_updated", { detail: { order: orderRecord } }));
  } catch (err) {
    console.error("Error saving order to localStorage:", err);
  }

  // Live Firebase Firestore database sync
  if (typeof firebaseCreateOrder === "function") {
    firebaseCreateOrder(orderRecord).catch((err) => console.warn("Firebase create order notice:", err));
  }

  // Live Supabase database sync (fallback if configured)
  if (typeof supabaseCreateOrder === "function") {
    supabaseCreateOrder(orderRecord).catch((err) => console.warn("Supabase create order notice:", err));
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
      closeTrackOrderModal();
    }
  });

  // Cross-tab and Realtime Synchronization
  window.addEventListener("storage", (e) => {
    if (e.key === "atyab_orders" || e.key === "atyab_orders_updated") {
      refreshActiveOrderTracking();
    }
    if (e.key === "atyab_account") {
      state.account = readStoredAccount();
      updateAccountUI();
    }
  });

  window.addEventListener("atyab_orders_updated", () => {
    refreshActiveOrderTracking();
  });

  // Firebase Live Sync realtime subscription for tracking status updates (including cancellations)
  if (typeof firebaseSubscribeToOrders === "function") {
    firebaseSubscribeToOrders((orders) => {
      if (orders && orders.length > 0) {
        try {
          const stored = localStorage.getItem("atyab_orders");
          const localOrders = stored ? JSON.parse(stored) : [];
          const localMap = new Map(localOrders.map(o => [o.id, o]));
          orders.forEach(co => {
            localMap.set(co.id, co);
          });
          localStorage.setItem("atyab_orders", JSON.stringify(Array.from(localMap.values())));
        } catch { }
      }
      refreshActiveOrderTracking();
    });
  }

  // Supabase live realtime subscription for tracking status updates (including cancellations)
  if (typeof supabaseSubscribeToOrders === "function") {
    supabaseSubscribeToOrders((payload) => {
      refreshActiveOrderTracking();
    });
  }
}
