/**
 * ATYAB LUXURY PERFUMES - SUPABASE CLIENT & BACKEND INTEGRATION
 * Handles Supabase database operations, authentication, user-scoped carts,
 * orders, and real-time order status updates (including cancellations).
 *
 * HOW TO CONNECT YOUR SUPABASE PROJECT:
 * 1. Go to https://supabase.com and create a new project.
 * 2. In your Supabase Project Settings -> API:
 *    - Copy "Project URL" and paste into SUPABASE_CONFIG.url below.
 *    - Copy "anon public" key and paste into SUPABASE_CONFIG.anonKey below.
 * 3. Go to SQL Editor in your Supabase dashboard and run "supabase_setup.sql".
 *
 * Note: If keys are left empty, the application automatically uses its
 * high-fidelity local storage sync engine so your site remains 100% operational!
 */

const SUPABASE_CONFIG = {
  // Replace these with your actual Supabase project credentials:
  url: localStorage.getItem("atyab_supabase_url") || "",
  anonKey: localStorage.getItem("atyab_supabase_key") || ""
};

let _supabaseInstance = null;

/**
 * Checks whether Supabase credentials have been configured
 */
function isSupabaseConfigured() {
  const url = (SUPABASE_CONFIG.url || "").trim();
  const key = (SUPABASE_CONFIG.anonKey || "").trim();
  return Boolean(
    url.length > 10 &&
    key.length > 20 &&
    !url.includes("YOUR_SUPABASE") &&
    !key.includes("YOUR_SUPABASE") &&
    typeof window.supabase !== "undefined"
  );
}

/**
 * Returns the active Supabase client singleton instance
 */
function getSupabaseClient() {
  if (_supabaseInstance) return _supabaseInstance;
  if (!isSupabaseConfigured()) return null;

  try {
    _supabaseInstance = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    return _supabaseInstance;
  } catch (err) {
    console.warn("Could not initialize Supabase client:", err);
    return null;
  }
}

// ===================================================================
// 1. AUTHENTICATION & USER PROFILE
// ===================================================================

/**
 * Register a new user with Supabase
 */
async function supabaseAuthSignUp(fullName, email, password) {
  const client = getSupabaseClient();
  if (!client) {
    // Local fallback
    return { success: true, user: { name: fullName, email, id: "local_" + Date.now() }, isLocal: true };
  }

  try {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) throw error;

    // Record profile in profiles table
    if (data?.user) {
      await client.from("profiles").upsert({
        auth_id: data.user.id,
        email: email.toLowerCase(),
        full_name: fullName
      }, { onConflict: "email" });
    }

    return { success: true, user: data.user };
  } catch (err) {
    console.error("Supabase SignUp error:", err);
    return { success: false, error: err.message || err };
  }
}

/**
 * Sign in existing user with Supabase
 */
async function supabaseAuthSignIn(email, password) {
  const client = getSupabaseClient();
  if (!client) {
    return { success: true, isLocal: true };
  }

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Fetch user profile data
    let profile = null;
    const { data: profData } = await client
      .from("profiles")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    profile = profData || {
      name: data.user?.user_metadata?.full_name || email.split("@")[0],
      email: email.toLowerCase()
    };

    return { success: true, user: data.user, profile };
  } catch (err) {
    console.error("Supabase SignIn error:", err);
    return { success: false, error: err.message || err };
  }
}

/**
 * Sign out from Supabase
 */
async function supabaseAuthSignOut() {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (err) {
      console.warn("Supabase SignOut notice:", err);
    }
  }
}

// ===================================================================
// 2. ORDER MANAGEMENT & LIVE STATUS
// ===================================================================

/**
 * Save new order into Supabase
 */
async function supabaseCreateOrder(orderData) {
  const client = getSupabaseClient();
  if (!client) {
    return { success: true, isLocal: true };
  }

  try {
    const payload = {
      id: orderData.id,
      user_email: (orderData.customer?.email || "").toLowerCase(),
      customer_name: orderData.customer?.name || "Customer",
      customer_phone: orderData.customer?.phone || "",
      customer_city: orderData.customer?.city || "",
      customer_address: orderData.customer?.address || "",
      payment_method: orderData.customer?.paymentMethod || "mada",
      payment_status: orderData.customer?.paymentStatus || "pending",
      status: orderData.status || "pending",
      items: orderData.items || [],
      financials: orderData.financials || {},
      tracking_number: orderData.tracking?.trackingNumber || "",
      carrier: orderData.tracking?.carrier || "SMSA Express",
      timeline: orderData.timeline || [],
      notes: orderData.notes || []
    };

    const { data, error } = await client.from("orders").insert([payload]);
    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("Supabase CreateOrder error:", err);
    return { success: false, error: err.message || err };
  }
}

/**
 * Fetch orders for a specific customer
 */
async function supabaseGetOrders(userEmail) {
  if (!userEmail) return [];
  const client = getSupabaseClient();
  if (!client) {
    // Read from local orders
    try {
      const stored = localStorage.getItem("atyab_orders");
      const orders = stored ? JSON.parse(stored) : [];
      return orders.filter(o => o.customer?.email?.toLowerCase() === userEmail.toLowerCase() || o.user_email?.toLowerCase() === userEmail.toLowerCase());
    } catch {
      return [];
    }
  }

  try {
    const { data, error } = await client
      .from("orders")
      .select("*")
      .eq("user_email", userEmail.toLowerCase())
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []).map(normalizeSupabaseOrder);
  } catch (err) {
    console.error("Supabase GetOrders error, falling back to local:", err);
    try {
      const stored = localStorage.getItem("atyab_orders");
      const orders = stored ? JSON.parse(stored) : [];
      return orders.filter(o => o.customer?.email?.toLowerCase() === userEmail.toLowerCase() || o.user_email?.toLowerCase() === userEmail.toLowerCase());
    } catch {
      return [];
    }
  }
}

/**
 * Fetch all orders for the Admin Portal
 */
async function supabaseGetAllOrders() {
  const client = getSupabaseClient();
  if (!client) {
    try {
      const stored = localStorage.getItem("atyab_orders");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  try {
    const { data, error } = await client
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []).map(normalizeSupabaseOrder);
  } catch (err) {
    console.error("Supabase GetAllOrders error, falling back to local:", err);
    try {
      const stored = localStorage.getItem("atyab_orders");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}

/**
 * Update an order's status (e.g. from Admin portal: 'cancelled', 'shipped', etc.)
 */
async function supabaseUpdateOrderStatus(orderId, newStatus) {
  const client = getSupabaseClient();
  if (!client) return { success: true, isLocal: true };

  try {
    const { data, error } = await client
      .from("orders")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq("id", orderId);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Supabase UpdateOrderStatus error:", err);
    return { success: false, error: err.message || err };
  }
}

/**
 * Normalize Supabase row format to match local format
 */
function normalizeSupabaseOrder(row) {
  if (!row) return null;
  return {
    id: row.id,
    user_email: row.user_email,
    createdAt: row.created_at,
    status: row.status,
    customer: {
      name: row.customer_name,
      email: row.user_email,
      phone: row.customer_phone,
      city: row.customer_city,
      address: row.customer_address,
      paymentMethod: row.payment_method,
      paymentStatus: row.payment_status
    },
    items: row.items || [],
    financials: row.financials || {},
    tracking: {
      carrier: row.carrier || "SMSA Express",
      trackingNumber: row.tracking_number || row.id
    },
    timeline: row.timeline || [],
    notes: row.notes || []
  };
}

// ===================================================================
// 3. USER-SCOPED PERSISTENT CART
// ===================================================================

/**
 * Fetch persistent cart items for a user
 */
async function supabaseGetCart(userEmail) {
  if (!userEmail) return [];
  const client = getSupabaseClient();
  if (!client) {
    try {
      const raw = localStorage.getItem(`atyab_cart_${userEmail.toLowerCase()}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  try {
    const { data, error } = await client
      .from("cart_items")
      .select("*")
      .eq("user_email", userEmail.toLowerCase());

    if (error) throw error;
    return (data || []).map(row => ({
      id: row.product_id,
      size: row.size,
      quantity: row.quantity,
      priceSAR: row.price_sar,
      name: row.name,
      nameEn: row.name_en,
      image: row.image
    }));
  } catch (err) {
    console.warn("Supabase GetCart notice, using local:", err);
    try {
      const raw = localStorage.getItem(`atyab_cart_${userEmail.toLowerCase()}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}

/**
 * Sync user cart items to Supabase
 */
async function supabaseSaveCart(userEmail, cartItems) {
  if (!userEmail) return;

  // Always mirror in localStorage for instant offline access
  try {
    localStorage.setItem(`atyab_cart_${userEmail.toLowerCase()}`, JSON.stringify(cartItems || []));
  } catch (e) {}

  const client = getSupabaseClient();
  if (!client) return;

  try {
    // Clear and replace cart for user
    await client.from("cart_items").delete().eq("user_email", userEmail.toLowerCase());
    if (cartItems && cartItems.length > 0) {
      const rows = cartItems.map(item => ({
        user_email: userEmail.toLowerCase(),
        product_id: item.id,
        size: item.size || "100ml",
        quantity: item.quantity || 1,
        price_sar: item.priceSAR || 0,
        name: item.name || "",
        name_en: item.nameEn || item.name || "",
        image: item.image || ""
      }));
      await client.from("cart_items").insert(rows);
    }
  } catch (err) {
    console.warn("Supabase SaveCart notice:", err);
  }
}

// ===================================================================
// 4. REAL-TIME EVENT SUBSCRIPTION
// ===================================================================

/**
 * Subscribe to live order updates (status changes, cancellations)
 */
function supabaseSubscribeToOrders(onOrderUpdate) {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const channel = client
      .channel("public:orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
        if (typeof onOrderUpdate === "function") {
          onOrderUpdate(payload);
        }
      })
      .subscribe();

    return channel;
  } catch (err) {
    console.warn("Could not subscribe to Supabase realtime:", err);
    return null;
  }
}

// Expose globally
if (typeof window !== "undefined") {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
  window.isSupabaseConfigured = isSupabaseConfigured;
  window.getSupabaseClient = getSupabaseClient;
  window.supabaseAuthSignUp = supabaseAuthSignUp;
  window.supabaseAuthSignIn = supabaseAuthSignIn;
  window.supabaseAuthSignOut = supabaseAuthSignOut;
  window.supabaseCreateOrder = supabaseCreateOrder;
  window.supabaseGetOrders = supabaseGetOrders;
  window.supabaseGetAllOrders = supabaseGetAllOrders;
  window.supabaseUpdateOrderStatus = supabaseUpdateOrderStatus;
  window.supabaseGetCart = supabaseGetCart;
  window.supabaseSaveCart = supabaseSaveCart;
  window.supabaseSubscribeToOrders = supabaseSubscribeToOrders;
}
