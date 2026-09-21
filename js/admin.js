/**
 * ATYAB LUXURY PERFUMES - ROYAL ADMIN DASHBOARD CONTROLLER (ENGLISH)
 * Executive Order Management, Live Analytics & Real-Time Sync System
 * Strictly protected for: admin@gmail.com / 123456
 * 100% REAL ORDERS ONLY — All dummy/fake seed data removed.
 */

// ===================================================================
// 1. STRICT ACCESS GUARD
// If not authenticated via the website sign-in modal, redirect to home.
// ===================================================================
const REQUIRED_EMAIL = "admin@gmail.com";

function verifyAdminSession() {
  const sessionRaw = localStorage.getItem("atyab_admin_session") || sessionStorage.getItem("atyab_admin_session");
  if (!sessionRaw) {
    window.location.replace("index.html");
    return false;
  }
  try {
    const session = JSON.parse(sessionRaw);
    if (!session || !session.email || session.email.toLowerCase() !== REQUIRED_EMAIL) {
      window.location.replace("index.html");
      return false;
    }
    return true;
  } catch (e) {
    window.location.replace("index.html");
    return false;
  }
}

// Immediate verification on script parse
if (!verifyAdminSession()) {
  throw new Error("Access Denied: Admin session required.");
}

// Known legacy demo order IDs to purge from previous sessions
const LEGACY_FAKE_ORDER_IDS = [
  "ATY-KSA-914820",
  "ATY-KSA-883921",
  "ATY-KSA-742910",
  "ATY-KSA-651092",
  "ATY-KSA-519283",
  "ATY-KSA-402918"
];

// Admin Application State (Starts clean, 0 fake orders)
const adminState = {
  orders: [],
  currentFilter: "all",
  searchQuery: "",
  cityFilter: "all",
  activeOrder: null,
  lastKnownOrderCount: 0,
  lastKnownOrdersHash: ""
};

// ===================================================================
// 2. STORAGE & REAL-TIME SYNCHRONIZATION
// ===================================================================
function loadOrdersFromStorage() {
  try {
    const raw = localStorage.getItem("atyab_orders");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Automatically purge any previous legacy fake/seed orders
        adminState.orders = parsed.filter(o => !LEGACY_FAKE_ORDER_IDS.includes(o.id));
        if (adminState.orders.length !== parsed.length) {
          saveOrdersToStorage();
        }
        return;
      }
    }
  } catch (err) {
    console.error("Error reading atyab_orders:", err);
  }

  // 100% clean empty list for real incoming orders
  adminState.orders = [];
  saveOrdersToStorage();
}

function saveOrdersToStorage() {
  try {
    localStorage.setItem("atyab_orders", JSON.stringify(adminState.orders));
    adminState.lastKnownOrdersHash = JSON.stringify(adminState.orders);
  } catch (err) {
    console.error("Error writing atyab_orders:", err);
  }
}

/**
 * Real-Time Synchronization Engine
 * Instantly reacts whenever an order is submitted from the customer storefront
 */
function startLiveSyncEngine() {
  // Cross-tab storage change event
  window.addEventListener("storage", (e) => {
    if (e.key === "atyab_orders") {
      handleLiveOrdersUpdate();
    }
  });

  // Custom event for same-tab updates
  window.addEventListener("atyab_orders_updated", () => {
    handleLiveOrdersUpdate();
  });

  // High-frequency polling (every 1.5 seconds) for instant reactivity
  setInterval(() => {
    try {
      const currentRaw = localStorage.getItem("atyab_orders") || "[]";
      if (currentRaw !== adminState.lastKnownOrdersHash) {
        handleLiveOrdersUpdate();
      }
    } catch (e) {}
  }, 1500);
}

function handleLiveOrdersUpdate() {
  const previousCount = adminState.orders.length;
  loadOrdersFromStorage();
  const newCount = adminState.orders.length;

  renderDashboard();

  // If a new live order arrived from the website checkout
  if (newCount > previousCount) {
    const newestOrder = adminState.orders[0];
    playRoyalChime();
    showToast(
      `🔔 New Live Order: ${newestOrder.id}`,
      `Customer: ${newestOrder.customer?.name} (${newestOrder.customer?.city || "KSA"}) • Total: ${newestOrder.financials?.totalSAR || 0} SAR`
    );

    // Golden pulse animation on the newest row
    setTimeout(() => {
      const firstRow = document.querySelector("#orders-table-body tr");
      if (firstRow) {
        firstRow.classList.add("new-order-highlight");
        setTimeout(() => firstRow.classList.remove("new-order-highlight"), 3200);
      }
    }, 100);
  }
}

/**
 * Synthesize a luxury subtle notification chime using Web Audio API
 */
function playRoyalChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {}
}

// ===================================================================
// 3. ORDER MUTATION ACTIONS (CONFIRM, UPDATE, DELETE)
// ===================================================================

/**
 * One-Click Order Confirmation
 */
function confirmOrder(orderId) {
  const order = adminState.orders.find((o) => o.id === orderId);
  if (!order) return;

  order.status = "confirmed";
  if (!order.timeline) order.timeline = [];
  order.timeline.push({
    status: "confirmed",
    title: "Order Confirmed by Admin",
    time: new Date().toISOString(),
    note: "Order reviewed and officially approved for packaging & dispatch"
  });

  saveOrdersToStorage();
  renderDashboard();
  showToast(`✅ Order ${orderId} Confirmed!`, "Status updated to Confirmed. Preparations underway.");

  if (adminState.activeOrder && adminState.activeOrder.id === orderId) {
    openOrderDetails(orderId);
  }
}

/**
 * Change Order Status
 */
function updateOrderStatus(orderId, newStatus) {
  const order = adminState.orders.find((o) => o.id === orderId);
  if (!order || order.status === newStatus) return;

  const statusLabels = {
    pending: "Pending Approval",
    confirmed: "Confirmed",
    processing: "Processing / Packaging",
    shipped: "Shipped with Courier",
    delivered: "Delivered to Customer",
    cancelled: "Cancelled"
  };

  order.status = newStatus;
  if (!order.timeline) order.timeline = [];
  order.timeline.push({
    status: newStatus,
    title: `Status updated to ${statusLabels[newStatus] || newStatus}`,
    time: new Date().toISOString(),
    note: "Updated by Executive Admin"
  });

  saveOrdersToStorage();
  renderDashboard();
  showToast(`Status Updated`, `Order ${orderId} marked as ${statusLabels[newStatus] || newStatus}`);

  if (adminState.activeOrder && adminState.activeOrder.id === orderId) {
    openOrderDetails(orderId);
  }
}

/**
 * Delete Order from Records
 */
function deleteOrder(orderId) {
  if (!confirm(`Are you sure you want to delete order ${orderId}?`)) return;
  adminState.orders = adminState.orders.filter((o) => o.id !== orderId);
  saveOrdersToStorage();
  closeOrderModal();
  renderDashboard();
  showToast("Order Deleted", `Order ${orderId} was removed from records.`);
}

/**
 * Clear All Orders (Reset store records)
 */
function clearAllOrders() {
  if (confirm("Are you sure you want to clear all orders? This will empty the orders list completely.")) {
    adminState.orders = [];
    saveOrdersToStorage();
    renderDashboard();
    showToast("Orders Cleared", "All order records have been cleared.");
  }
}

/**
 * Add Private Internal Admin Note
 */
function addOrderNote(orderId) {
  const input = document.getElementById("admin-new-note-input");
  const text = input ? input.value.trim() : "";
  if (!text) return;

  const order = adminState.orders.find((o) => o.id === orderId);
  if (!order) return;

  if (!order.notes) order.notes = [];
  order.notes.push({
    author: "Executive Admin",
    text: text,
    date: new Date().toISOString()
  });

  saveOrdersToStorage();
  if (input) input.value = "";
  openOrderDetails(orderId);
  showToast("Note Saved", "Internal note added to order record.");
}

// ===================================================================
// 4. LIVE DASHBOARD & ANALYTICS RENDERERS
// ===================================================================
function initDashboard() {
  loadOrdersFromStorage();
  setupEventListeners();
  startLiveClock();
  populateCityFilter();
  renderDashboard();
  startLiveSyncEngine();
}

function renderDashboard() {
  renderKPIs();
  renderLiveAnalytics();
  renderFilterTabs();
  renderOrdersTable();
}

/**
 * Calculate and render top financial and operational KPIs
 */
function renderKPIs() {
  const orders = adminState.orders;

  const totalRevenue = orders.reduce((sum, o) => {
    if (o.status !== "cancelled") {
      return sum + (o.financials?.totalSAR || 0);
    }
    return sum;
  }, 0);

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const activeCount = orders.filter((o) => ["confirmed", "processing", "shipped"].includes(o.status)).length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const validOrdersCount = orders.filter((o) => o.status !== "cancelled").length;
  const aov = validOrdersCount > 0 ? Math.round(totalRevenue / validOrdersCount) : 0;
  const usdEquiv = Math.round(totalRevenue / 3.75);

  setElText("kpi-total-revenue", `${totalRevenue.toLocaleString()} SAR`);
  setElText("kpi-usd-sub", `~$${usdEquiv.toLocaleString()} USD`);
  setElText("kpi-total-orders", orders.length);
  setElText("kpi-pending-count", pendingCount);
  setElText("kpi-active-count", activeCount);
  setElText("kpi-delivered-count", deliveredCount);
  setElText("kpi-aov-val", `${aov} SAR`);
}

/**
 * Render Live Analytics: Status Distribution, Top Perfumes & Regional Splits
 */
function renderLiveAnalytics() {
  const orders = adminState.orders.filter((o) => o.status !== "cancelled");
  const total = orders.length;

  // If no orders yet, display clean zero-state
  if (total === 0) {
    setElWidth("bar-seg-pending", "0%");
    setElWidth("bar-seg-confirmed", "0%");
    setElWidth("bar-seg-processing", "0%");
    setElWidth("bar-seg-shipped", "0%");
    setElWidth("bar-seg-delivered", "0%");

    setElText("leg-val-pending", "0");
    setElText("leg-val-confirmed", "0");
    setElText("leg-val-processing", "0");
    setElText("leg-val-shipped", "0");
    setElText("leg-val-delivered", "0");

    const perfumeListEl = document.getElementById("analytics-perfumes-list");
    if (perfumeListEl) {
      perfumeListEl.innerHTML = `<div style="color: var(--text-muted); font-size: 0.84rem; text-align: center; padding: 28px 12px; line-height: 1.6;">No fragrance sales recorded yet.<br><span style="font-size: 0.76rem; color: var(--gold-pale);">Top-selling flacons will automatically rank here once customer orders arrive.</span></div>`;
    }

    const regionalListEl = document.getElementById("analytics-regional-list");
    if (regionalListEl) {
      regionalListEl.innerHTML = `<div style="color: var(--text-muted); font-size: 0.84rem; text-align: center; padding: 28px 12px; line-height: 1.6;">No regional orders recorded yet.<br><span style="font-size: 0.76rem; color: var(--gold-pale);">Saudi regional distribution will display here live.</span></div>`;
    }
    return;
  }

  // 1. Status Distribution
  const counts = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length
  };

  const pPending = Math.round((counts.pending / total) * 100);
  const pConfirmed = Math.round((counts.confirmed / total) * 100);
  const pProcessing = Math.round((counts.processing / total) * 100);
  const pShipped = Math.round((counts.shipped / total) * 100);
  const pDelivered = Math.round((counts.delivered / total) * 100);

  setElWidth("bar-seg-pending", `${pPending}%`);
  setElWidth("bar-seg-confirmed", `${pConfirmed}%`);
  setElWidth("bar-seg-processing", `${pProcessing}%`);
  setElWidth("bar-seg-shipped", `${pShipped}%`);
  setElWidth("bar-seg-delivered", `${pDelivered}%`);

  setElText("leg-val-pending", counts.pending);
  setElText("leg-val-confirmed", counts.confirmed);
  setElText("leg-val-processing", counts.processing);
  setElText("leg-val-shipped", counts.shipped);
  setElText("leg-val-delivered", counts.delivered);

  // 2. Top-Selling Perfumes Live Ranking
  const productStats = {};
  adminState.orders.forEach((o) => {
    if (o.status === "cancelled") return;
    (o.items || []).forEach((item) => {
      const name = item.nameEn || item.name || "Atyab Perfume";
      if (!productStats[name]) {
        productStats[name] = {
          name: name,
          image: item.image || "assets/images/tiger_oud.jpg",
          units: 0,
          revenue: 0
        };
      }
      productStats[name].units += (item.quantity || 1);
      productStats[name].revenue += (item.priceSAR || 0) * (item.quantity || 1);
    });
  });

  const rankedPerfumes = Object.values(productStats).sort((a, b) => b.units - a.units);
  const perfumeListEl = document.getElementById("analytics-perfumes-list");
  if (perfumeListEl) {
    perfumeListEl.innerHTML = rankedPerfumes
      .slice(0, 5)
      .map((p, idx) => `
        <div class="perfume-rank-row">
          <div class="perfume-rank-left">
            <span class="perfume-rank-badge">#${idx + 1}</span>
            <img src="${p.image}" alt="${escapeHTML(p.name)}" class="perfume-rank-img" />
            <div class="perfume-rank-info">
              <span class="perfume-rank-name">${escapeHTML(p.name)}</span>
              <span class="perfume-rank-units">${p.units} bottles sold</span>
            </div>
          </div>
          <div class="perfume-rank-rev">${p.revenue.toLocaleString()} SAR</div>
        </div>
      `)
      .join("");
  }

  // 3. Regional Saudi Cities Distribution
  const cityStats = {};
  adminState.orders.forEach((o) => {
    if (o.status === "cancelled") return;
    const city = o.customer?.city || "Riyadh";
    cityStats[city] = (cityStats[city] || 0) + 1;
  });

  const sortedCities = Object.entries(cityStats).sort((a, b) => b[1] - a[1]);
  const regionalListEl = document.getElementById("analytics-regional-list");
  if (regionalListEl) {
    regionalListEl.innerHTML = sortedCities
      .slice(0, 5)
      .map(([city, count]) => {
        const pct = Math.round((count / total) * 100);
        return `
          <div class="regional-row">
            <div class="regional-row-top">
              <span class="regional-city-name">${escapeHTML(city)}</span>
              <span class="regional-order-count">${count} orders (${pct}%)</span>
            </div>
            <div class="regional-progress-track">
              <div class="regional-progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }
}

function renderFilterTabs() {
  const orders = adminState.orders;
  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length
  };

  document.querySelectorAll("[data-filter-key]").forEach((el) => {
    const key = el.getAttribute("data-filter-key");
    if (counts[key] !== undefined) {
      el.textContent = counts[key];
    }
  });
}

function getFilteredOrders() {
  return adminState.orders.filter((o) => {
    if (adminState.currentFilter !== "all" && o.status !== adminState.currentFilter) {
      return false;
    }
    if (adminState.cityFilter !== "all" && o.customer?.city !== adminState.cityFilter) {
      return false;
    }
    if (adminState.searchQuery) {
      const q = adminState.searchQuery.toLowerCase();
      const idMatch = (o.id || "").toLowerCase().includes(q);
      const nameMatch = (o.customer?.name || "").toLowerCase().includes(q);
      const phoneMatch = (o.customer?.phone || "").includes(q);
      const cityMatch = (o.customer?.city || "").toLowerCase().includes(q);
      const itemMatch = (o.items || []).some(
        (i) => (i.name || "").toLowerCase().includes(q) || (i.nameEn || "").toLowerCase().includes(q)
      );
      if (!idMatch && !nameMatch && !phoneMatch && !cityMatch && !itemMatch) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Render Orders Table (Clean empty state if 0 orders)
 */
function renderOrdersTable() {
  const tbody = document.getElementById("orders-table-body");
  if (!tbody) return;

  const orders = getFilteredOrders();

  if (orders.length === 0) {
    if (adminState.orders.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 70px 20px;">
            <div style="font-size: 3rem; margin-bottom: 12px; color: var(--gold-primary);">👑</div>
            <h3 style="color: #FFFFFF; font-size: 1.25rem; margin-bottom: 6px; font-weight: 800;">No Customer Orders Yet</h3>
            <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 18px; font-size: 0.88rem; line-height: 1.6;">
              Your luxury store is live and operational. When a customer completes checkout on the website, their order will appear here in real-time.
            </p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <a href="index.html" target="_blank" class="btn-primary-action" style="text-decoration: none;">🛍️ Place Test Order on Store</a>
              <button type="button" class="btn-secondary-action" onclick="openNewOrderModal()">➕ Create Manual Order</button>
            </div>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 50px 20px;">
            <div style="font-size: 2.2rem; margin-bottom: 8px; color: var(--gold-primary);">🔍</div>
            <h3 style="color: #FFFFFF; font-size: 1.1rem; margin-bottom: 4px; font-weight: 700;">No Orders Match Active Filter</h3>
            <p style="color: var(--text-muted); font-size: 0.84rem;">Try selecting "All Orders" or clearing your search term.</p>
          </td>
        </tr>
      `;
    }
    return;
  }

  tbody.innerHTML = orders
    .map((o) => {
      const dateFormatted = formatOrderDate(o.createdAt);
      const statusBadge = getStatusBadgeHTML(o.status);
      const totalStr = `${o.financials?.totalSAR || 0} SAR`;
      const customerName = o.customer?.name || "Atyab Customer";
      const customerPhone = o.customer?.phone || "";
      const customerCity = o.customer?.city || "Riyadh";

      const firstItem = (o.items && o.items[0]) || { name: "Atyab Perfume", image: "assets/images/tiger_oud.jpg" };
      const itemsCount = o.items ? o.items.reduce((acc, i) => acc + (i.quantity || 1), 0) : 0;
      const extraItems = (o.items?.length || 0) - 1;

      const isPending = o.status === "pending";
      const confirmButton = isPending
        ? `<button class="btn-confirm-action" onclick="confirmOrder('${o.id}')" title="Quick 1-Click Order Confirmation">
             <span>👑</span>
             <span>Confirm Order</span>
           </button>`
        : "";

      return `
        <tr>
          <!-- Order ID & Date -->
          <td>
            <span class="order-id-chip" onclick="openOrderDetails('${o.id}')" title="View Full Order Details">
              ${o.id}
            </span>
            <div class="order-date-caption">${dateFormatted}</div>
          </td>

          <!-- Customer & Destination -->
          <td>
            <div class="customer-title">${escapeHTML(customerName)}</div>
            <div class="customer-detail-sub">
              <span>📍 ${escapeHTML(customerCity)}</span>
              ${customerPhone ? `• <a href="tel:${customerPhone}" class="phone-link">${customerPhone}</a>` : ""}
            </div>
          </td>

          <!-- Perfume Line Items -->
          <td>
            <div class="table-items-box">
              <img src="${firstItem.image}" alt="${escapeHTML(firstItem.name)}" class="item-thumb-square" />
              <div>
                <div class="item-title-bold">${escapeHTML(firstItem.nameEn || firstItem.name)}</div>
                <div class="item-count-sub">${itemsCount} flacons total ${extraItems > 0 ? `(+${extraItems} more)` : ""}</div>
              </div>
            </div>
          </td>

          <!-- Financial Total & Payment -->
          <td>
            <div style="font-weight: 800; color: var(--gold-pale); font-size: 0.95rem;">${totalStr}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
              ${escapeHTML(o.customer?.paymentLabel || o.customer?.paymentMethod || "Mada")}
            </div>
          </td>

          <!-- Live Status -->
          <td>${statusBadge}</td>

          <!-- Actions -->
          <td>
            <div class="table-actions-cluster">
              ${confirmButton}

              <!-- Status Dropdown Selector -->
              <select class="status-dropdown-select" onchange="updateOrderStatus('${o.id}', this.value)" title="Change Order Status">
                <option value="pending" ${o.status === "pending" ? "selected" : ""}>🟡 Pending</option>
                <option value="confirmed" ${o.status === "confirmed" ? "selected" : ""}>🟢 Confirmed</option>
                <option value="processing" ${o.status === "processing" ? "selected" : ""}>🔵 Processing</option>
                <option value="shipped" ${o.status === "shipped" ? "selected" : ""}>🚚 Shipped</option>
                <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>🏁 Delivered</option>
                <option value="cancelled" ${o.status === "cancelled" ? "selected" : ""}>🔴 Cancelled</option>
              </select>

              <!-- View Details Modal -->
              <button class="btn-icon-square" onclick="openOrderDetails('${o.id}')" title="Inspect Order Details">
                👁️
              </button>

              <!-- Print Invoice -->
              <button class="btn-icon-square" onclick="printInvoice('${o.id}')" title="Print Official Tax Invoice">
                🖨️
              </button>

              <!-- Customer WhatsApp Direct -->
              ${customerPhone ? `
              <button class="btn-icon-square btn-whatsapp-square" onclick="openWhatsApp('${o.id}')" title="Message Customer via WhatsApp">
                💬
              </button>` : ""}
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function getStatusBadgeHTML(status) {
  const map = {
    pending: { label: "Pending Review", class: "pending" },
    confirmed: { label: "Confirmed", class: "confirmed" },
    processing: { label: "Processing", class: "processing" },
    shipped: { label: "Shipped", class: "shipped" },
    delivered: { label: "Delivered", class: "delivered" },
    cancelled: { label: "Cancelled", class: "cancelled" }
  };
  const item = map[status] || { label: status, class: "pending" };
  return `<span class="status-pill ${item.class}">${item.label}</span>`;
}

// ===================================================================
// 5. ORDER DETAILS MODAL
// ===================================================================
function openOrderDetails(orderId) {
  const order = adminState.orders.find((o) => o.id === orderId);
  if (!order) return;

  adminState.activeOrder = order;

  const modal = document.getElementById("order-details-modal");
  const body = document.getElementById("order-details-body");
  if (!modal || !body) return;

  // Stepper Sequence
  const steps = [
    { key: "pending", label: "Order Received" },
    { key: "confirmed", label: "Confirmed" },
    { key: "processing", label: "Packaging" },
    { key: "shipped", label: "Dispatched" },
    { key: "delivered", label: "Delivered" }
  ];

  const statusList = ["pending", "confirmed", "processing", "shipped", "delivered"];
  const currentIdx = statusList.indexOf(order.status);

  const stepperHTML = `
    <div class="stepper-container">
      ${steps
        .map((st, idx) => {
          let stepClass = "";
          if (idx < currentIdx) stepClass = "completed";
          else if (idx === currentIdx) stepClass = "active";
          return `
            <div class="stepper-step ${stepClass}">
              <div class="step-circle">${idx < currentIdx ? "✓" : idx + 1}</div>
              <div>${st.label}</div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  // Itemized Products
  const itemsHTML = (order.items || [])
    .map(
      (item) => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.02); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${item.image || 'assets/images/tiger_oud.jpg'}" alt="${escapeHTML(item.name)}" style="width: 44px; height: 44px; border-radius: var(--radius-xs); object-fit: cover; border: 1px solid var(--border-light);" />
          <div>
            <div style="font-weight: 700; font-size: 0.88rem; color: #FFF;">${escapeHTML(item.nameEn || item.name)}</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">${escapeHTML(item.size || "100ml")} × ${item.quantity || 1}</div>
          </div>
        </div>
        <div style="font-weight: 800; color: var(--gold-pale); font-size: 0.92rem;">
          ${(item.priceSAR || 0) * (item.quantity || 1)} SAR
        </div>
      </div>
    `
    )
    .join("");

  // Internal Notes
  const notesHTML = (order.notes || [])
    .map(
      (n) => `
      <div style="background: rgba(255,255,255,0.03); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); font-size: 0.82rem; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; color: var(--gold-pale); font-weight: 700; margin-bottom: 4px;">
          <span>${escapeHTML(n.author)}</span>
          <span style="font-weight: 400; color: var(--text-muted); font-size: 0.72rem;">${formatOrderDate(n.date)}</span>
        </div>
        <div style="color: #FFF;">${escapeHTML(n.text)}</div>
      </div>
    `
    )
    .join("");

  // Historical Timeline
  const timelineHTML = (order.timeline || [])
    .map(
      (tl) => `
      <div style="display: flex; gap: 12px; margin-bottom: 12px; font-size: 0.82rem;">
        <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--gold-vibrant); margin-top: 6px; box-shadow: 0 0 6px var(--gold-vibrant);"></div>
        <div>
          <div style="font-weight: 700; color: #FFF;">${escapeHTML(tl.title || tl.status)}</div>
          <div style="color: var(--text-muted); font-size: 0.74rem;">${formatOrderDate(tl.time)}</div>
          ${tl.note ? `<div style="color: var(--text-secondary); margin-top: 2px;">${escapeHTML(tl.note)}</div>` : ""}
        </div>
      </div>
    `
    )
    .join("");

  body.innerHTML = `
    <!-- Stepper Sequence -->
    ${stepperHTML}

    <!-- Customer & Financial Details Grid -->
    <div class="info-cards-grid">
      <!-- Customer Information Block -->
      <div class="info-block">
        <div class="info-block-header">
          <span>👤</span>
          <span>Customer & Destination</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Name:</span>
          <span class="info-data-val">${escapeHTML(order.customer?.name || "—")}</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Phone:</span>
          <span class="info-data-val">
            <a href="tel:${order.customer?.phone}" class="phone-link">${order.customer?.phone || "—"}</a>
          </span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Email:</span>
          <span class="info-data-val">${order.customer?.email || "—"}</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">City:</span>
          <span class="info-data-val">${escapeHTML(order.customer?.city || "—")}</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Address:</span>
          <span class="info-data-val">${escapeHTML(order.customer?.address || "—")}</span>
        </div>
      </div>

      <!-- Financial & Dispatch Block -->
      <div class="info-block">
        <div class="info-block-header">
          <span>💳</span>
          <span>Payment & Fulfillment</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Payment Method:</span>
          <span class="info-data-val">${escapeHTML(order.customer?.paymentLabel || order.customer?.paymentMethod || "Mada")}</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Payment Status:</span>
          <span class="info-data-val" style="color: #10B981;">${escapeHTML(order.customer?.paymentStatus || "Paid Online")}</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Subtotal:</span>
          <span class="info-data-val">${order.financials?.subtotalSAR || 0} SAR</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Discount Applied:</span>
          <span class="info-data-val" style="color: #F87171;">-${order.financials?.discountSAR || 0} SAR</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Shipping Fee:</span>
          <span class="info-data-val">${order.financials?.shippingSAR ? order.financials.shippingSAR + " SAR" : "Free (0 SAR)"}</span>
        </div>
        <div class="info-data-row" style="border-top: 1px dashed var(--gold-border); margin-top: 6px; padding-top: 8px;">
          <span class="info-data-key" style="font-weight: 800; color: #FFF;">Total Amount:</span>
          <span class="info-data-val" style="font-size: 1.15rem; color: var(--gold-vibrant); font-weight: 900;">
            ${order.financials?.totalSAR || 0} SAR
          </span>
        </div>
        <div class="info-data-row" style="margin-top: 6px;">
          <span class="info-data-key">Carrier:</span>
          <span class="info-data-val">${escapeHTML(order.tracking?.carrier || "Aramex Saudi Arabia")}</span>
        </div>
        <div class="info-data-row">
          <span class="info-data-key">Tracking Code:</span>
          <span class="info-data-val" style="font-family: monospace; color: var(--gold-pale);">${order.tracking?.trackingNumber || "—"}</span>
        </div>
      </div>
    </div>

    <!-- Perfume Items Ordered -->
    <div class="info-block">
      <div class="info-block-header">
        <span>🧴</span>
        <span>Ordered Fragrance Flacons (${order.items?.length || 0} items)</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${itemsHTML}
      </div>
    </div>

    <!-- Notes & Timeline Grid -->
    <div class="info-cards-grid">
      <!-- Internal Notes -->
      <div class="info-block">
        <div class="info-block-header">
          <span>📝</span>
          <span>Executive Internal Notes</span>
        </div>
        <div style="max-height: 140px; overflow-y: auto; margin-bottom: 12px;">
          ${notesHTML || '<div style="color: var(--text-muted); font-size: 0.8rem;">No internal notes logged.</div>'}
        </div>
        <div style="display: flex; gap: 8px;">
          <input type="text" id="admin-new-note-input" placeholder="Type private order memo..." style="flex: 1; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 8px 12px; color: #FFF; font-size: 0.82rem; outline: none;" />
          <button class="btn-primary-action" style="padding: 8px 14px; font-size: 0.82rem;" onclick="addOrderNote('${order.id}')">Post</button>
        </div>
      </div>

      <!-- Activity Timeline -->
      <div class="info-block">
        <div class="info-block-header">
          <span>⏱️</span>
          <span>Order Lifecycle Log</span>
        </div>
        <div style="max-height: 180px; overflow-y: auto;">
          ${timelineHTML}
        </div>
      </div>
    </div>
  `;

  // Modal Footer
  const footer = document.getElementById("order-details-footer");
  if (footer) {
    const isPending = order.status === "pending";
    footer.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center;">
        <span style="font-size: 0.82rem; color: var(--gold-pale); font-weight: 700;">Update Status:</span>
        <select class="select-filter" onchange="updateOrderStatus('${order.id}', this.value)">
          <option value="pending" ${order.status === "pending" ? "selected" : ""}>🟡 Pending Approval</option>
          <option value="confirmed" ${order.status === "confirmed" ? "selected" : ""}>🟢 Confirmed</option>
          <option value="processing" ${order.status === "processing" ? "selected" : ""}>🔵 Processing</option>
          <option value="shipped" ${order.status === "shipped" ? "selected" : ""}>🚚 Shipped</option>
          <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>🏁 Delivered</option>
          <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>🔴 Cancelled</option>
        </select>
      </div>

      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        ${isPending ? `<button class="btn-confirm-action" style="padding: 9px 18px; font-size: 0.86rem;" onclick="confirmOrder('${order.id}')">👑 Confirm Order</button>` : ""}
        <button class="btn-secondary-action" onclick="printInvoice('${order.id}')">🖨️ Tax Invoice</button>
        ${order.customer?.phone ? `<button class="btn-secondary-action" onclick="openWhatsApp('${order.id}')">💬 WhatsApp</button>` : ""}
        <button class="btn-secondary-action" style="color: #F87171; border-color: rgba(239, 68, 68, 0.4);" onclick="deleteOrder('${order.id}')">🗑️ Delete</button>
        <button class="btn-secondary-action" onclick="closeOrderModal()">Close</button>
      </div>
    `;
  }

  modal.classList.add("active");
}

function closeOrderModal() {
  document.getElementById("order-details-modal")?.classList.remove("active");
}

// ===================================================================
// 6. MANUAL ORDER CREATION MODAL
// ===================================================================
function openNewOrderModal() {
  const modal = document.getElementById("new-order-modal");
  if (!modal) return;

  const productSelect = document.getElementById("manual-product-select");
  if (productSelect && window.ATYAB_PRODUCTS) {
    productSelect.innerHTML = window.ATYAB_PRODUCTS.map(
      (p) => `<option value="${p.id}" data-price="${p.priceSAR}" data-name="${escapeHTML(p.nameEn || p.name)}" data-img="${p.image}">${p.nameEn || p.name} — ${p.priceSAR} SAR</option>`
    ).join("");
    updateManualPriceCalculation();
  }

  modal.classList.add("active");
}

function closeNewOrderModal() {
  document.getElementById("new-order-modal")?.classList.remove("active");
}

function updateManualPriceCalculation() {
  const select = document.getElementById("manual-product-select");
  const qtyInput = document.getElementById("manual-product-qty");
  const preview = document.getElementById("manual-total-preview");
  if (!select || !qtyInput || !preview) return;

  const option = select.options[select.selectedIndex];
  const unitPrice = parseFloat(option?.dataset.price || 40);
  const qty = parseInt(qtyInput.value) || 1;
  const subtotal = unitPrice * qty;
  const shipping = subtotal >= 150 ? 0 : 25;
  const total = subtotal + shipping;

  preview.textContent = `${total} SAR (${subtotal} SAR items + ${shipping === 0 ? "Free Shipping" : shipping + " SAR shipping"})`;
}

function handleManualOrderSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("manual-name")?.value.trim() || "VIP Walk-in Client";
  const phone = document.getElementById("manual-phone")?.value.trim() || "0500000000";
  const city = document.getElementById("manual-city")?.value || "Riyadh";
  const address = document.getElementById("manual-address")?.value.trim() || "Direct Store Pickup";
  const paymentMethod = document.getElementById("manual-payment")?.value || "mada";

  const productSelect = document.getElementById("manual-product-select");
  const option = productSelect?.options[productSelect.selectedIndex];
  const productId = option?.value || "atyab-tiger-oud";
  const productName = option?.dataset.name || "Atyab Tiger Oud Perfume";
  const productImg = option?.dataset.img || "assets/images/tiger_oud.jpg";
  const unitPrice = parseFloat(option?.dataset.price || 40);
  const qty = parseInt(document.getElementById("manual-product-qty")?.value) || 1;

  const subtotalSAR = unitPrice * qty;
  const shippingSAR = subtotalSAR >= 150 ? 0 : 25;
  const totalSAR = subtotalSAR + shippingSAR;

  const orderId = "ATY-KSA-" + Math.floor(100000 + Math.random() * 900000);

  const paymentLabels = {
    mada: "Mada Debit Card",
    applepay: "Apple Pay",
    credit: "Visa / MasterCard",
    cod: "Cash on Delivery (COD)"
  };

  const newOrder = {
    id: orderId,
    createdAt: new Date().toISOString(),
    status: "confirmed",
    customer: {
      name,
      phone,
      email: "direct.order@atyab.sa",
      city,
      address,
      paymentMethod,
      paymentLabel: paymentLabels[paymentMethod] || paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending COD Collection" : "Paid Online"
    },
    items: [
      {
        id: productId,
        name: productName,
        nameEn: productName,
        size: "110ml Bottle (Official Signature)",
        priceSAR: unitPrice,
        quantity: qty,
        image: productImg
      }
    ],
    financials: {
      subtotalSAR,
      discountSAR: 0,
      shippingSAR,
      totalSAR
    },
    tracking: {
      carrier: "Aramex Saudi Arabia",
      trackingNumber: "ATY" + Math.floor(10000000 + Math.random() * 90000000)
    },
    notes: [
      {
        author: "Executive Admin",
        text: "Manual order logged via Executive Dashboard",
        date: new Date().toISOString()
      }
    ],
    timeline: [
      {
        status: "confirmed",
        title: "Manual Order Created & Approved",
        time: new Date().toISOString(),
        note: "Direct order logged into system"
      }
    ]
  };

  adminState.orders.unshift(newOrder);
  saveOrdersToStorage();
  closeNewOrderModal();
  renderDashboard();
  showToast("Order Created", `Manual Order ${orderId} successfully registered.`);
}

// ===================================================================
// 7. PRINT OFFICIAL TAX INVOICE
// ===================================================================
function printInvoice(orderId) {
  const order = adminState.orders.find((o) => o.id === orderId);
  if (!order) return;

  const invoiceEl = document.getElementById("printable-invoice");
  if (!invoiceEl) return;

  const dateStr = formatOrderDate(order.createdAt);
  const subtotal = order.financials?.subtotalSAR || 0;
  const vat = Math.round(subtotal * 0.15 * 100) / 100;
  const discount = order.financials?.discountSAR || 0;
  const shipping = order.financials?.shippingSAR || 0;
  const total = order.financials?.totalSAR || 0;

  invoiceEl.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; font-family: sans-serif; color: #000; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 16px; margin-bottom: 24px;">
        <div>
          <div style="font-size: 26px; font-weight: 900; color: #8C6220; letter-spacing: 0.05em;">ATYAB LUXURY PERFUMES</div>
          <div style="font-size: 13px; color: #555;">RIYADH, KINGDOM OF SAUDI ARABIA</div>
          <div style="font-size: 12px; color: #777; margin-top: 4px;">Tax Registration (VAT): 310984210900003 | CR: 1010892019</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 20px; font-weight: bold; color: #000;">SIMPLIFIED TAX INVOICE</div>
          <div style="font-size: 16px; font-weight: bold; color: #8C6220; font-family: monospace;">${order.id}</div>
          <div style="font-size: 13px; color: #555; margin-top: 4px;">Date: ${dateStr}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #F8F7F3; padding: 16px; border-radius: 6px; margin-bottom: 24px; border: 1px solid #E6E0D5;">
        <div>
          <div style="font-weight: bold; margin-bottom: 6px; color: #8C6220;">Billed To / Customer:</div>
          <div><strong>Name:</strong> ${escapeHTML(order.customer?.name || "Atyab Customer")}</div>
          <div><strong>Phone:</strong> ${order.customer?.phone || "—"}</div>
          <div><strong>Destination:</strong> ${escapeHTML(order.customer?.city || "Riyadh")}, ${escapeHTML(order.customer?.address || "")}</div>
        </div>
        <div>
          <div style="font-weight: bold; margin-bottom: 6px; color: #8C6220;">Payment & Shipment:</div>
          <div><strong>Method:</strong> ${escapeHTML(order.customer?.paymentLabel || order.customer?.paymentMethod || "Mada")}</div>
          <div><strong>Status:</strong> ${escapeHTML(order.customer?.paymentStatus || "Paid")}</div>
          <div><strong>Courier:</strong> ${escapeHTML(order.tracking?.carrier || "Aramex")} (${order.tracking?.trackingNumber || ""})</div>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <thead>
          <tr style="background: #F0EDE5; border-bottom: 1px solid #D5CEBE;">
            <th style="padding: 10px; text-align: left;">#</th>
            <th style="padding: 10px; text-align: left;">Perfume Description</th>
            <th style="padding: 10px; text-align: left;">Size / Edition</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Unit Price</th>
            <th style="padding: 10px; text-align: right;">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          ${(order.items || [])
            .map(
              (item, i) => `
              <tr style="border-bottom: 1px solid #EEE;">
                <td style="padding: 10px;">${i + 1}</td>
                <td style="padding: 10px; font-weight: bold;">${escapeHTML(item.nameEn || item.name)}</td>
                <td style="padding: 10px; color: #555;">${escapeHTML(item.size || "100ml")}</td>
                <td style="padding: 10px; text-align: center;">${item.quantity || 1}</td>
                <td style="padding: 10px; text-align: right;">${item.priceSAR} SAR</td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">${(item.priceSAR || 0) * (item.quantity || 1)} SAR</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>

      <div style="display: flex; justify-content: flex-end;">
        <div style="width: 320px; background: #F8F7F3; padding: 16px; border-radius: 6px; border: 1px solid #E6E0D5; font-size: 14px;">
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>Subtotal:</span>
            <span>${subtotal} SAR</span>
          </div>
          ${discount > 0 ? `
          <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #C0392B;">
            <span>Discount:</span>
            <span>-${discount} SAR</span>
          </div>` : ""}
          <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #555;">
            <span>VAT (15% Included):</span>
            <span>${vat} SAR</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>Delivery / Shipping:</span>
            <span>${shipping === 0 ? "Free Shipping" : shipping + " SAR"}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px 0 4px; border-top: 2px solid #8C6220; margin-top: 6px; font-weight: 900; font-size: 18px; color: #8C6220;">
            <span>Grand Total:</span>
            <span>${total} SAR</span>
          </div>
        </div>
      </div>

      <div style="margin-top: 40px; text-align: center; border-top: 1px dashed #CCC; padding-top: 16px; color: #777; font-size: 13px;">
        Thank you for choosing Atyab Royal Fragrances 👑 • For inquiries, call Concierge: 920000000 • Riyadh, Saudi Arabia
      </div>
    </div>
  `;

  window.print();
}

// ===================================================================
// 8. WHATSAPP & EXPORT UTILITIES
// ===================================================================
function openWhatsApp(orderId) {
  const order = adminState.orders.find((o) => o.id === orderId);
  if (!order || !order.customer?.phone) return;

  let phone = order.customer.phone.replace(/[^0-9]/g, "");
  if (phone.startsWith("05")) {
    phone = "966" + phone.substring(1);
  } else if (!phone.startsWith("966") && phone.length === 9) {
    phone = "966" + phone;
  }

  const message = `Hello ${order.customer.name} 👑,\nGreetings from ATYAB Royal Perfumes regarding your Order #${order.id}.\nYour order is currently ${order.status.toUpperCase()} and being processed with our finest royal standards.\n\nThank you for choosing ATYAB.`;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function exportOrdersCSV() {
  const orders = adminState.orders;
  if (!orders || orders.length === 0) {
    showToast("No Orders", "There are no orders available to export.");
    return;
  }

  let csv = "\uFEFFOrder ID,Date,Customer Name,Phone,City,Address,Status,Payment Method,Payment Status,Total SAR\n";
  orders.forEach((o) => {
    const row = [
      `"${o.id}"`,
      `"${o.createdAt}"`,
      `"${escapeCSV(o.customer?.name)}"`,
      `"${escapeCSV(o.customer?.phone)}"`,
      `"${escapeCSV(o.customer?.city)}"`,
      `"${escapeCSV(o.customer?.address)}"`,
      `"${o.status}"`,
      `"${escapeCSV(o.customer?.paymentLabel || o.customer?.paymentMethod)}"`,
      `"${escapeCSV(o.customer?.paymentStatus)}"`,
      `"${o.financials?.totalSAR || 0}"`
    ];
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `atyab_orders_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("CSV Export Complete", "All order data downloaded as a spreadsheet.");
}

function logoutAdmin() {
  localStorage.removeItem("atyab_admin_session");
  sessionStorage.removeItem("atyab_admin_session");
  window.location.replace("index.html");
}

// ===================================================================
// 9. EVENT LISTENERS & DOM HELPERS
// ===================================================================
function setupEventListeners() {
  // Filter tabs
  document.querySelectorAll(".tab-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".tab-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      adminState.currentFilter = pill.getAttribute("data-status-filter") || "all";
      renderOrdersTable();
    });
  });

  // Search input
  const searchInput = document.getElementById("admin-order-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      adminState.searchQuery = e.target.value.trim();
      renderOrdersTable();
    });
  }

  // City filter
  const cityFilter = document.getElementById("admin-city-filter");
  if (cityFilter) {
    cityFilter.addEventListener("change", (e) => {
      adminState.cityFilter = e.target.value;
      renderOrdersTable();
    });
  }

  // Manual modal price dynamic update
  document.getElementById("manual-product-select")?.addEventListener("change", updateManualPriceCalculation);
  document.getElementById("manual-product-qty")?.addEventListener("input", updateManualPriceCalculation);
}

function populateCityFilter() {
  const cityFilter = document.getElementById("admin-city-filter");
  if (!cityFilter) return;

  const cities = ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam", "Khobar", "Qassim", "Abha", "Tabuk"];
  let options = `<option value="all">All Saudi Regions</option>`;
  cities.forEach((c) => {
    options += `<option value="${c}">${c}</option>`;
  });
  cityFilter.innerHTML = options;
}

function startLiveClock() {
  const clockEl = document.getElementById("live-ksa-clock");
  if (!clockEl) return;

  function tick() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  }
  tick();
  setInterval(tick, 1000);
}

function formatOrderDate(isoString) {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (e) {
    return isoString;
  }
}

function setElText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setElWidth(id, val) {
  const el = document.getElementById(id);
  if (el) el.style.width = val;
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeCSV(str) {
  if (!str) return "";
  return String(str).replace(/"/g, '""');
}

function showToast(title, message = "") {
  let hub = document.getElementById("admin-toast-hub");
  if (!hub) {
    hub = document.createElement("div");
    hub.id = "admin-toast-hub";
    hub.className = "admin-toast-hub";
    document.body.appendChild(hub);
  }

  const toast = document.createElement("div");
  toast.className = "admin-toast-pill";
  toast.innerHTML = `
    <span>👑</span>
    <div>
      <div style="font-weight: 700; color: #FFF;">${escapeHTML(title)}</div>
      ${message ? `<div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">${escapeHTML(message)}</div>` : ""}
    </div>
  `;
  hub.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Bootstrap dashboard on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initDashboard();
});
