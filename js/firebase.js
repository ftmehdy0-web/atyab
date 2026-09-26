/**
 * أطياب للعطور - تكامل فايربيس للمصادقة والمزامنة الحية للطلبات
 * ATYAB PERFUMES - Firebase Live Sync (Firestore) & Authentication
 * 
 * Zero-build vanilla static web support using Firebase v9/v10 Compat CDN.
 */

// 1. Firebase Project Configuration
// Project: atyab-ee869 (Official ATYAB Perfumes Cloud Project)
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyC4qLDcJTPkJDYWJsSddKyLn2ZVl04fUe4",
  authDomain: "atyab-ee869.firebaseapp.com",
  projectId: "atyab-ee869",
  storageBucket: "atyab-ee869.firebasestorage.app",
  messagingSenderId: "1089523266130",
  appId: "1:1089523266130:web:caa7a127da4428fe68a58b",
  measurementId: "G-2DQRHH2X0R"
};

function getFirebaseConfig() {
  try {
    const custom = localStorage.getItem("atyab_firebase_config");
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed && parsed.apiKey && parsed.projectId && parsed.apiKey.startsWith("AIzaSy")) {
        return parsed;
      }
    }
  } catch {}
  return DEFAULT_FIREBASE_CONFIG;
}

function isFirebaseConfigured() {
  const cfg = getFirebaseConfig();
  return Boolean(
    cfg &&
    cfg.apiKey &&
    cfg.apiKey.trim() !== "" &&
    cfg.apiKey !== "PASTE_YOUR_API_KEY_HERE" &&
    cfg.projectId &&
    cfg.projectId.trim() !== ""
  );
}

// 2. Initialize Firebase App, Auth & Firestore
let firebaseAppInstance = null;
let firebaseAuthInstance = null;
let firebaseDbInstance = null;

function initFirebase() {
  if (typeof firebase === "undefined") {
    console.warn("Firebase SDK scripts not loaded yet.");
    return null;
  }

  const cfg = getFirebaseConfig();
  if (!isFirebaseConfigured()) {
    return null;
  }

  try {
    if (!firebase.apps || firebase.apps.length === 0) {
      firebaseAppInstance = firebase.initializeApp(cfg);
    } else {
      firebaseAppInstance = firebase.app();
    }
    
    if (typeof firebase.analytics === "function" && cfg.measurementId) {
      try {
        firebase.analytics();
      } catch (e) {
        console.warn("Analytics notice:", e);
      }
    }

    if (typeof firebase.auth === "function") {
      firebaseAuthInstance = firebase.auth();
      // Listen for authenticated user state changes
      try {
        firebaseAuthInstance.onAuthStateChanged((user) => {
          if (user && typeof state !== "undefined" && !state.account) {
            const profile = {
              uid: user.uid,
              name: user.displayName || user.email.split("@")[0],
              email: user.email
            };
            if (typeof saveAccount === "function") {
              saveAccount(profile);
            }
          }
        });
      } catch (e) {}
    }
    
    if (typeof firebase.firestore === "function") {
      firebaseDbInstance = firebase.firestore();

      // Cloud Product Catalog Background Sync
      setTimeout(async () => {
        try {
          const cloudProducts = await firebaseGetAllProducts();
          if (Array.isArray(cloudProducts) && cloudProducts.length > 0) {
            const localCustom = JSON.parse(localStorage.getItem("atyab_custom_products") || "[]");
            const localMap = new Map(localCustom.map(p => [p.id, p]));
            cloudProducts.forEach(cp => {
              if (cp && cp.id) localMap.set(cp.id, { ...(localMap.get(cp.id) || {}), ...cp });
            });
            localStorage.setItem("atyab_custom_products", JSON.stringify(Array.from(localMap.values())));
            if (typeof refreshAtyabProducts === "function") refreshAtyabProducts();
            if (typeof renderProducts === "function") renderProducts();
            if (typeof renderCategoryProducts === "function") renderCategoryProducts();
            if (typeof renderProductsManagement === "function") renderProductsManagement();
          }
        } catch (e) {
          console.warn("Background product sync notice:", e);
        }
      }, 500);
    }

    return {
      app: firebaseAppInstance,
      auth: firebaseAuthInstance,
      db: firebaseDbInstance
    };
  } catch (err) {
    console.error("Firebase initialization failed:", err);
    return null;
  }
}

function getFirebaseAuth() {
  if (!firebaseAuthInstance) initFirebase();
  return firebaseAuthInstance;
}

function getFirebaseDb() {
  if (!firebaseDbInstance) initFirebase();
  return firebaseDbInstance;
}

// Initialize on DOM ready
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    initFirebase();
  });
}

// 3. User-friendly Firebase Auth Error Translations
function getFirebaseErrorMessage(code, lang = "ar") {
  const isEn = lang === "en";
  switch (code) {
    case "auth/email-already-in-use":
      return isEn 
        ? "This email address is already registered. Please sign in instead."
        : "هذا البريد الإلكتروني مسجل بالفعل. يُرجى تسجيل الدخول مباشرة.";
    case "auth/invalid-email":
      return isEn 
        ? "The email address is badly formatted."
        : "صيغة البريد الإلكتروني غير صحيحة. يرجى التأكد وكتابته بشكل سليم.";
    case "auth/operation-not-allowed":
      return isEn 
        ? "Email/Password sign-in is not enabled in Firebase Console."
        : "تسجيل الدخول بالبريد وكلمة المرور غير مفعّل في لوحة تحكم Firebase.";
    case "auth/weak-password":
      return isEn 
        ? "The password must be at least 6 characters."
        : "كلمة المرور ضعيفة جداً. يجب أن تتكون من 6 أحرف أو أرقام على الأقل.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return isEn 
        ? "Incorrect email or password. Please verify and try again."
        : "البريد الإلكتروني أو كلمة المرور غير صحيحة. يُرجى التحقق والمحاولة ثانية.";
    case "auth/user-disabled":
      return isEn 
        ? "This user account has been disabled."
        : "تم تعطيل هذا الحساب من قِبل الإدارة.";
    case "auth/too-many-requests":
      return isEn 
        ? "Access temporarily blocked due to many failed attempts. Try again later."
        : "تم حظر الدخول مؤقتاً بسبب تكرار المحاولات الخاطئة. يُرجى الانتظار والمحاولة لاحقاً.";
    case "auth/network-request-failed":
      return isEn 
        ? "Network error. Please check your internet connection."
        : "تعذر الاتصال بالخادم. يُرجى التحقق من اتصالك بالإنترنت.";
    default:
      return isEn 
        ? `Authentication failed (${code || "unknown error"}).`
        : `فشلت المصادقة (${code || "خطأ غير معروف"}).`;
  }
}

// 4. Sign Up (إنشاء حساب جديد)
async function firebaseAuthSignUp(name, email, password) {
  if (!isFirebaseConfigured()) {
    return { success: true, isLocal: true };
  }

  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: true, isLocal: true };
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (name && user) {
      await user.updateProfile({ displayName: name }).catch(() => {});
    }

    // Save profile record in Firestore
    const db = getFirebaseDb();
    if (db) {
      db.collection("users").doc(user.uid).set({
        name,
        email,
        createdAt: new Date().toISOString()
      }, { merge: true }).catch(() => {});
    }

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: name || user.displayName || email.split("@")[0]
      }
    };
  } catch (error) {
    console.error("Firebase Sign Up Error:", error);
    const lang = (typeof state !== "undefined" && state.language) ? state.language : "ar";
    return {
      success: false,
      error: getFirebaseErrorMessage(error.code, lang),
      code: error.code
    };
  }
}

// 5. Sign In (تسجيل الدخول)
async function firebaseAuthSignIn(email, password) {
  if (!isFirebaseConfigured()) {
    return { success: true, isLocal: true };
  }

  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: true, isLocal: true };
  }

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email.split("@")[0]
      }
    };
  } catch (error) {
    console.error("Firebase Sign In Error:", error);
    const lang = (typeof state !== "undefined" && state.language) ? state.language : "ar";
    return {
      success: false,
      error: getFirebaseErrorMessage(error.code, lang),
      code: error.code
    };
  }
}

// 6. Sign Out (تسجيل الخروج)
async function firebaseAuthSignOut() {
  if (!isFirebaseConfigured()) return;
  const auth = getFirebaseAuth();
  if (!auth) return;

  try {
    await auth.signOut();
  } catch (error) {
    console.warn("Firebase Sign Out Error:", error);
  }
}

// ===================================================================
// 7. FIREBASE FIRESTORE LIVE SYNC (ORDERS & CARTS)
// ===================================================================

/**
 * Push an order into Firebase Firestore
 */
async function firebaseCreateOrder(orderRecord) {
  if (!isFirebaseConfigured()) {
    return { success: true, isLocal: true };
  }
  const db = getFirebaseDb();
  if (!db) {
    return { success: true, isLocal: true };
  }

  try {
    await db.collection("orders").doc(orderRecord.id).set({
      ...orderRecord,
      syncedAt: new Date().toISOString()
    });
    console.log(`[Firebase Live Sync] Order ${orderRecord.id} saved to Firestore.`);
    return { success: true };
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not save order to Firestore:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all orders from Firebase Firestore
 */
async function firebaseGetAllOrders() {
  if (!isFirebaseConfigured()) return [];
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const snapshot = await db.collection("orders").get();
    const orders = [];
    snapshot.forEach((doc) => {
      orders.push(doc.data());
    });
    return orders;
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not fetch orders from Firestore:", err);
    return [];
  }
}

/**
 * Subscribe to realtime order updates via Firestore onSnapshot
 * Invokes callback whenever any order is created, modified or cancelled
 */
let firestoreOrdersUnsubscribe = null;

function firebaseSubscribeToOrders(onUpdate) {
  if (!isFirebaseConfigured()) return null;
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    if (firestoreOrdersUnsubscribe) {
      firestoreOrdersUnsubscribe();
    }

    firestoreOrdersUnsubscribe = db.collection("orders").onSnapshot((snapshot) => {
      const orders = [];
      snapshot.forEach((doc) => {
        orders.push(doc.data());
      });
      if (typeof onUpdate === "function") {
        onUpdate(orders);
      }
    }, (err) => {
      console.warn("[Firebase Live Sync] onSnapshot listener notice:", err);
    });

    return firestoreOrdersUnsubscribe;
  } catch (err) {
    console.warn("[Firebase Live Sync] Failed to attach realtime listener:", err);
    return null;
  }
}

/**
 * Update order status in Firebase Firestore (e.g. Cancelled / Confirmed)
 */
async function firebaseUpdateOrderStatus(orderId, newStatus, timeline) {
  if (!isFirebaseConfigured()) {
    return { success: true, isLocal: true };
  }
  const db = getFirebaseDb();
  if (!db) {
    return { success: true, isLocal: true };
  }

  try {
    const updateData = {
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    if (timeline) updateData.timeline = timeline;

    await db.collection("orders").doc(orderId).set(updateData, { merge: true });
    console.log(`[Firebase Live Sync] Order ${orderId} updated to ${newStatus}`);
    return { success: true };
  } catch (err) {
    console.warn("[Firebase Live Sync] Failed to update order status in Firestore:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Save user cart to Firebase Firestore
 */
async function firebaseSaveCart(email, cartItems) {
  if (!isFirebaseConfigured() || !email) return;
  const db = getFirebaseDb();
  if (!db) return;

  try {
    const key = email.toLowerCase().replace(/[^a-zA-Z0-9_]/g, "_");
    await db.collection("carts").doc(key).set({
      email: email.toLowerCase(),
      items: cartItems,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not save user cart:", err);
  }
}

/**
 * Retrieve user cart from Firebase Firestore
 */
async function firebaseGetCart(email) {
  if (!isFirebaseConfigured() || !email) return [];
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const key = email.toLowerCase().replace(/[^a-zA-Z0-9_]/g, "_");
    const doc = await db.collection("carts").doc(key).get();
    if (doc.exists && doc.data()?.items) {
      return doc.data().items;
    }
    return [];
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not fetch user cart:", err);
    return [];
  }
}

/**
 * 8. Firestore Product Management (Cloud Sync for Products)
 */
async function firebaseSaveProduct(product) {
  if (!isFirebaseConfigured()) return { success: true, isLocal: true };
  const db = getFirebaseDb();
  if (!db) return { success: true, isLocal: true };

  try {
    await db.collection("products").doc(product.id).set({
      ...product,
      syncedAt: new Date().toISOString()
    });
    console.log(`[Firebase Live Sync] Product ${product.id} synced to Firestore.`);
    return { success: true };
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not save product to Firestore:", err);
    return { success: false, error: err.message };
  }
}

async function firebaseDeleteProduct(productId) {
  if (!isFirebaseConfigured()) return { success: true, isLocal: true };
  const db = getFirebaseDb();
  if (!db) return { success: true, isLocal: true };

  try {
    await db.collection("products").doc(productId).delete();
    console.log(`[Firebase Live Sync] Product ${productId} deleted from Firestore.`);
    return { success: true };
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not delete product from Firestore:", err);
    return { success: false, error: err.message };
  }
}

async function firebaseGetAllProducts() {
  if (!isFirebaseConfigured()) return [];
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const snapshot = await db.collection("products").get();
    const products = [];
    snapshot.forEach(doc => products.push(doc.data()));
    return products;
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not fetch products from Firestore:", err);
    return [];
  }
}

let firestoreProductsUnsubscribe = null;
function firebaseSubscribeToProducts(onUpdate) {
  if (!isFirebaseConfigured()) return null;
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    if (firestoreProductsUnsubscribe) {
      firestoreProductsUnsubscribe();
    }
    firestoreProductsUnsubscribe = db.collection("products").onSnapshot((snapshot) => {
      const products = [];
      snapshot.forEach(doc => products.push(doc.data()));
      if (typeof onUpdate === "function") {
        onUpdate(products);
      }
    }, (err) => {
      console.warn("[Firebase Live Sync] Product snapshot listener notice:", err);
    });
    return firestoreProductsUnsubscribe;
  } catch (err) {
    console.warn("[Firebase Live Sync] Failed to attach product listener:", err);
    return null;
  }
}

// Global exports for browser window
if (typeof window !== "undefined") {
  window.DEFAULT_FIREBASE_CONFIG = DEFAULT_FIREBASE_CONFIG;
  window.FIREBASE_CONFIG = DEFAULT_FIREBASE_CONFIG;
  window.isFirebaseConfigured = isFirebaseConfigured;
  window.getFirebaseConfig = getFirebaseConfig;
  window.initFirebase = initFirebase;
  window.getFirebaseAuth = getFirebaseAuth;
  window.getFirebaseDb = getFirebaseDb;
  window.firebaseAuthSignUp = firebaseAuthSignUp;
  window.firebaseAuthSignIn = firebaseAuthSignIn;
  window.firebaseAuthSignOut = firebaseAuthSignOut;
  window.firebaseCreateOrder = firebaseCreateOrder;
  window.firebaseGetAllOrders = firebaseGetAllOrders;
  window.firebaseSubscribeToOrders = firebaseSubscribeToOrders;
  window.firebaseUpdateOrderStatus = firebaseUpdateOrderStatus;
  window.firebaseSaveCart = firebaseSaveCart;
  window.firebaseGetCart = firebaseGetCart;
  window.firebaseSaveProduct = firebaseSaveProduct;
  window.firebaseDeleteProduct = firebaseDeleteProduct;
  window.firebaseGetAllProducts = firebaseGetAllProducts;
  window.firebaseSubscribeToProducts = firebaseSubscribeToProducts;
}
