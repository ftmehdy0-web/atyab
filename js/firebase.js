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

const FIREBASE_ADMIN_EMAIL = "admin@gmail.com";

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
let firebasePhoneRecaptcha = null;
let firebasePhoneRecaptchaContainerId = null;
let firebasePhoneConfirmation = null;

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
              name: user.displayName || user.email?.split("@")[0] || user.phoneNumber || "Atyab Customer",
              email: user.email || "",
              phoneNumber: user.phoneNumber || ""
            };
            if (typeof saveAccount === "function") {
              saveAccount(profile);
            }
          }
          try {
            window.dispatchEvent(new CustomEvent("atyab_firebase_auth_changed", {
              detail: { user: user ? { uid: user.uid, email: user.email || "", phoneNumber: user.phoneNumber || "" } : null }
            }));
          } catch (e) {}
        });
      } catch (e) {}
    }
    
    if (typeof firebase.firestore === "function") {
      firebaseDbInstance = firebase.firestore();

      // Cloud product catalog sync. The initial Firestore snapshot and every
      // later change are applied to the local catalog used by every storefront
      // page, so an admin publish does not require a customer refresh.
      setTimeout(async () => {
        try {
          firebaseSubscribeToProducts(syncCloudProductsToLocal);
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
    case "auth/invalid-phone-number":
      return isEn
        ? "Enter a valid Saudi mobile number, for example 05XXXXXXXX or +9665XXXXXXXX."
        : "أدخل رقم جوال سعودي صحيحاً، مثل 05XXXXXXXX أو +9665XXXXXXXX.";
    case "auth/missing-phone-number":
      return isEn
        ? "Enter your mobile number first."
        : "أدخل رقم جوالك أولاً.";
    case "auth/invalid-verification-code":
      return isEn
        ? "The verification code is incorrect. Please check the SMS and try again."
        : "رمز التحقق غير صحيح. تحقق من رسالة SMS وحاول مرة أخرى.";
    case "auth/code-expired":
      return isEn
        ? "This verification code has expired. Request a new code."
        : "انتهت صلاحية رمز التحقق. اطلب رمزاً جديداً.";
    case "auth/captcha-check-failed":
      return isEn
        ? "Security verification failed. Please try sending the code again."
        : "تعذر التحقق الأمني. يرجى طلب الرمز من جديد.";
    case "auth/app-not-authorized":
      return isEn
        ? "This website domain is not authorized for Firebase Phone Authentication."
        : "نطاق الموقع غير مصرح به لمصادقة Firebase برقم الجوال.";
    case "auth/unauthorized-domain":
      return isEn
        ? "This domain is not authorized in Firebase Console. Please add this domain under Firebase > Authentication > Settings > Authorized domains."
        : "هذا النطاق غير مصرح به في Firebase Console. يُرجى إضافة رابط الموقع في لوحة فايربيس (Authentication > Settings > Authorized domains).";
    case "auth/account-exists-with-different-credential":
      return isEn
        ? "An account already exists with the same email address using different sign-in credentials."
        : "يوجد حساب مسجل مسبقاً بنفس البريد الإلكتروني عبر وسيلة دخول أخرى.";
    case "auth/cancelled-popup-request":
      return isEn
        ? "The sign-in popup request was cancelled."
        : "تم إلغاء طلب تسجيل الدخول.";
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

// 5.1 Sign In With Google (تسجيل الدخول والمتابعة عبر جوجل)
async function firebaseAuthSignInWithGoogle() {
  if (!isFirebaseConfigured()) {
    return { success: false, error: "Firebase is not configured." };
  }

  const auth = getFirebaseAuth();
  if (!auth) {
    return { success: false, error: "Firebase Auth service not ready." };
  }

  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    const userCredential = await auth.signInWithPopup(provider);
    const user = userCredential.user;

    // Save profile record in Firestore
    const db = getFirebaseDb();
    if (db && user) {
      db.collection("users").doc(user.uid).set({
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
        photoURL: user.photoURL || null,
        provider: "google",
        lastLoginAt: new Date().toISOString()
      }, { merge: true }).catch(() => {});
    }

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL || null
      }
    };
  } catch (error) {
    console.error("Firebase Google Sign-In Error:", error);
    if (error.code === "auth/popup-closed-by-user") {
      const isEn = (typeof state !== "undefined" && state.language === "en");
      return { 
        success: false, 
        error: isEn ? "Google sign-in popup was closed before completing." : "تم إغلاق نافذة تسجيل دخول جوجل قبل الإكمال.", 
        code: error.code 
      };
    }
    if (error.code === "auth/popup-blocked") {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithRedirect(provider);
        return { success: true, isRedirecting: true };
      } catch (redirErr) {
        const isEn = (typeof state !== "undefined" && state.language === "en");
        return { 
          success: false, 
          error: isEn ? "Popup blocked by browser. Please allow popups." : "تم حظر النافذة المنبثقة من قِبل المتصفح. يُرجى السماح بالنوافذ المنبثقة.", 
          code: error.code 
        };
      }
    }
    const lang = (typeof state !== "undefined" && state.language) ? state.language : "ar";
    return {
      success: false,
      error: getFirebaseErrorMessage(error.code, lang),
      code: error.code
    };
  }
}

// 5.2 Phone number authentication (Firebase sends an SMS OTP; Firebase does
// not support a password-only sign-in with a phone number on the web).
function normalizeSaudiPhoneNumber(phoneNumber) {
  const raw = String(phoneNumber || "").trim().replace(/[\s\-()]/g, "");
  let normalized = raw.replace(/^00966/, "+966");
  if (/^05\d{8}$/.test(normalized)) normalized = `+966${normalized.slice(1)}`;
  if (/^5\d{8}$/.test(normalized)) normalized = `+966${normalized}`;
  if (/^9665\d{8}$/.test(normalized)) normalized = `+${normalized}`;
  return /^\+9665\d{8}$/.test(normalized) ? normalized : null;
}

function getFirebasePhoneRecaptcha(containerId = "firebase-phone-recaptcha") {
  const auth = getFirebaseAuth();
  const container = document.getElementById(containerId);
  if (!auth || !container || typeof firebase === "undefined" || !firebase.auth?.RecaptchaVerifier) return null;

  if (firebasePhoneRecaptcha && firebasePhoneRecaptchaContainerId === containerId) {
    return firebasePhoneRecaptcha;
  }

  try {
    firebasePhoneRecaptcha?.clear();
  } catch (err) {}

  container.innerHTML = "";
  firebasePhoneRecaptcha = new firebase.auth.RecaptchaVerifier(containerId, {
    size: "invisible",
    "expired-callback": () => {
      firebasePhoneConfirmation = null;
    }
  }, auth);
  firebasePhoneRecaptchaContainerId = containerId;
  return firebasePhoneRecaptcha;
}

async function firebaseAuthSendPhoneOtp(phoneNumber, containerId = "firebase-phone-recaptcha") {
  if (!isFirebaseConfigured()) {
    return { success: false, error: "Firebase is not configured." };
  }

  const auth = getFirebaseAuth();
  const normalizedPhone = normalizeSaudiPhoneNumber(phoneNumber);
  const appVerifier = getFirebasePhoneRecaptcha(containerId);
  if (!auth || !appVerifier) {
    return { success: false, error: "Firebase Phone Authentication is not ready. Reload the page and try again." };
  }
  if (!normalizedPhone) {
    const lang = (typeof state !== "undefined" && state.language) ? state.language : "ar";
    return { success: false, error: getFirebaseErrorMessage("auth/invalid-phone-number", lang) };
  }

  try {
    firebasePhoneConfirmation = await auth.signInWithPhoneNumber(normalizedPhone, appVerifier);
    return { success: true, phoneNumber: normalizedPhone };
  } catch (error) {
    try { firebasePhoneRecaptcha.reset(); } catch (err) {}
    const lang = (typeof state !== "undefined" && state.language) ? state.language : "ar";
    return {
      success: false,
      error: getFirebaseErrorMessage(error.code, lang),
      code: error.code
    };
  }
}

async function firebaseAuthVerifyPhoneOtp(code) {
  const cleanCode = String(code || "").replace(/\D/g, "");
  if (!firebasePhoneConfirmation) {
    return { success: false, error: "Request an SMS verification code first." };
  }
  if (cleanCode.length !== 6) {
    const lang = (typeof state !== "undefined" && state.language) ? state.language : "ar";
    return { success: false, error: getFirebaseErrorMessage("auth/invalid-verification-code", lang) };
  }

  try {
    const userCredential = await firebasePhoneConfirmation.confirm(cleanCode);
    const user = userCredential.user;
    const db = getFirebaseDb();
    if (db && user) {
      db.collection("users").doc(user.uid).set({
        phoneNumber: user.phoneNumber || "",
        provider: "phone",
        lastLoginAt: new Date().toISOString()
      }, { merge: true }).catch(() => {});
    }
    firebasePhoneConfirmation = null;
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        displayName: user.displayName || user.phoneNumber || "Atyab Customer"
      }
    };
  } catch (error) {
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
 * Save a complete order record after an admin change (notes, confirmation,
 * manual orders, and status edits). This prevents fields from being lost when
 * the dashboard synchronizes an order back to Firestore.
 */
async function firebaseSaveOrder(orderRecord) {
  if (!orderRecord || !orderRecord.id) {
    return { success: false, error: "A valid order ID is required." };
  }
  return firebaseCreateOrder({ ...orderRecord, _deleted: false });
}

/**
 * Keep a deletion marker instead of removing a document outright. A marker is
 * included in live snapshots, allowing every open storefront to hide the item.
 */
async function firebaseDeleteOrder(orderId) {
  if (!isFirebaseConfigured()) return { success: true, isLocal: true };
  const db = getFirebaseDb();
  if (!db) return { success: true, isLocal: true };

  try {
    await db.collection("orders").doc(orderId).set({
      id: orderId,
      _deleted: true,
      deletedAt: new Date().toISOString()
    }, { merge: true });
    return { success: true };
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not remove order from Firestore:", err);
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

  const ordersQuery = getFirebaseOrdersQuery(db);
  if (!ordersQuery) return [];

  try {
    const snapshot = await ordersQuery.get();
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

function getFirebaseOrdersQuery(db) {
  const user = firebaseAuthInstance?.currentUser;
  if (!user?.uid) return null;

  if (user.email?.toLowerCase() === FIREBASE_ADMIN_EMAIL) {
    return db.collection("orders");
  }

  return db.collection("orders").where("user_uid", "==", user.uid);
}

function firebaseSubscribeToOrders(onUpdate) {
  if (!isFirebaseConfigured()) return null;
  const db = getFirebaseDb();
  if (!db) return null;
  const ordersQuery = getFirebaseOrdersQuery(db);
  if (!ordersQuery) {
    if (firestoreOrdersUnsubscribe) {
      firestoreOrdersUnsubscribe();
      firestoreOrdersUnsubscribe = null;
    }
    return null;
  }

  try {
    if (firestoreOrdersUnsubscribe) {
      firestoreOrdersUnsubscribe();
    }

    firestoreOrdersUnsubscribe = ordersQuery.onSnapshot((snapshot) => {
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
      id: orderId,
      _deleted: false,
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
function getFirebaseCartOwner(account) {
  const user = firebaseAuthInstance?.currentUser;
  if (!user?.uid) return null;
  return {
    uid: user.uid,
    email: user.email || account?.email || "",
    phoneNumber: user.phoneNumber || account?.phoneNumber || ""
  };
}

async function firebaseSaveCart(account, cartItems) {
  if (!isFirebaseConfigured()) return;
  const db = getFirebaseDb();
  const owner = getFirebaseCartOwner(account);
  if (!db || !owner) return;

  try {
    await db.collection("carts").doc(owner.uid).set({
      ownerUid: owner.uid,
      email: owner.email,
      phoneNumber: owner.phoneNumber,
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
async function firebaseGetCart(account) {
  if (!isFirebaseConfigured()) return [];
  const db = getFirebaseDb();
  const owner = getFirebaseCartOwner(account);
  if (!db || !owner) return [];

  try {
    const doc = await db.collection("carts").doc(owner.uid).get();
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
    // Do not physically delete the document. The tombstone is what tells
    // customers in other browsers to hide built-in products as well.
    await db.collection("products").doc(productId).set({
      id: productId,
      _deleted: true,
      deletedAt: new Date().toISOString()
    }, { merge: true });
    console.log(`[Firebase Live Sync] Product ${productId} unpublished in Firestore.`);
    return { success: true };
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not delete product from Firestore:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Remove cloud deletion markers so restored default products reappear on all
 * storefronts. Custom product documents remain untouched.
 */
async function firebaseRestoreDefaultProducts() {
  if (!isFirebaseConfigured()) return { success: true, isLocal: true };
  const db = getFirebaseDb();
  if (!db) return { success: true, isLocal: true };

  try {
    const snapshot = await db.collection("products").get();
    const removals = [];
    const baseProductIds = new Set(
      (typeof window !== "undefined" && Array.isArray(window.BASE_ATYAB_PRODUCTS)
        ? window.BASE_ATYAB_PRODUCTS
        : [])
        .map((product) => product.id)
    );
    snapshot.forEach((doc) => {
      const product = doc.data();
      if (product?._deleted || baseProductIds.has(doc.id)) {
        removals.push(doc.ref.delete());
      }
    });
    await Promise.all(removals);
    return { success: true };
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not restore default products:", err);
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

/**
 * Merge Firestore products into the browser catalog and mirror Firestore
 * tombstones separately from local-only product deletions.
 */
function syncCloudProductsToLocal(cloudProducts) {
  if (!Array.isArray(cloudProducts)) return;

  try {
    const cloudDeletedIds = cloudProducts
      .filter((product) => product && product.id && product._deleted)
      .map((product) => product.id);
    const localCustom = JSON.parse(localStorage.getItem("atyab_custom_products") || "[]");
    const localMap = new Map(
      (Array.isArray(localCustom) ? localCustom : [])
        .filter((product) => product && product.id && !cloudDeletedIds.includes(product.id))
        .map((product) => [product.id, product])
    );

    cloudProducts.forEach((product) => {
      if (product && product.id && !product._deleted) {
        localMap.set(product.id, { ...(localMap.get(product.id) || {}), ...product });
      }
    });

    localStorage.setItem("atyab_custom_products", JSON.stringify(Array.from(localMap.values())));
    localStorage.setItem("atyab_firebase_deleted_product_ids", JSON.stringify(cloudDeletedIds));

    if (typeof refreshAtyabProducts === "function") refreshAtyabProducts();
    if (typeof triggerLiveWebsiteSync === "function") {
      triggerLiveWebsiteSync({ action: "firebase_catalog_sync" });
    } else {
      if (typeof renderProducts === "function") renderProducts();
      if (typeof renderCategoryProducts === "function") renderCategoryProducts();
      if (typeof renderProductsManagement === "function") renderProductsManagement();
    }
  } catch (err) {
    console.warn("[Firebase Live Sync] Could not apply cloud catalog:", err);
  }
}

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
  window.firebaseAuthSignInWithGoogle = firebaseAuthSignInWithGoogle;
  window.firebaseAuthSendPhoneOtp = firebaseAuthSendPhoneOtp;
  window.firebaseAuthVerifyPhoneOtp = firebaseAuthVerifyPhoneOtp;
  window.normalizeSaudiPhoneNumber = normalizeSaudiPhoneNumber;
  window.firebaseAuthSignOut = firebaseAuthSignOut;
  window.firebaseCreateOrder = firebaseCreateOrder;
  window.firebaseSaveOrder = firebaseSaveOrder;
  window.firebaseDeleteOrder = firebaseDeleteOrder;
  window.firebaseGetAllOrders = firebaseGetAllOrders;
  window.firebaseSubscribeToOrders = firebaseSubscribeToOrders;
  window.firebaseUpdateOrderStatus = firebaseUpdateOrderStatus;
  window.firebaseSaveCart = firebaseSaveCart;
  window.firebaseGetCart = firebaseGetCart;
  window.firebaseSaveProduct = firebaseSaveProduct;
  window.firebaseDeleteProduct = firebaseDeleteProduct;
  window.firebaseRestoreDefaultProducts = firebaseRestoreDefaultProducts;
  window.firebaseGetAllProducts = firebaseGetAllProducts;
  window.firebaseSubscribeToProducts = firebaseSubscribeToProducts;
  window.syncCloudProductsToLocal = syncCloudProductsToLocal;
}
