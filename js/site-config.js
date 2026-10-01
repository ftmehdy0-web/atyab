/* Shared storefront configuration: use this as the single source for common
 * storefront content. Header navigation, footer data and checkout options are
 * intentionally rendered from this object on every interactive storefront. */
(function () {
  "use strict";

  try {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested && requested.toLowerCase().startsWith("en")) {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    }
  } catch (_) { }

  const SITE = {
    email: "info@atyabalarabperfumes.com",
    phone: "+966558879839",
    whatsapp: "https://wa.me/966558879839",
    vatNumber: "314378223100003",
    commercialRegistration: "7052462681",
    hoursAr: "يومياً: 9:00 ص – 11:00 م",
    hoursEn: "Daily: 9:00 AM – 11:00 PM",
    // Do not invent a street address. Replace this once the business confirms it.
    addressAr: "الرياض، المملكة العربية السعودية — يرجى التواصل معنا قبل الزيارة",
    addressEn: "Riyadh, Saudi Arabia — please contact us before visiting",
    cities: [
      ["الرياض", "Riyadh"], ["جدة", "Jeddah"], ["مكة المكرمة", "Makkah"],
      ["المدينة المنورة", "Madinah"], ["الدمام", "Dammam"], ["الخبر", "Khobar"],
      ["القصيم", "Qassim"], ["أبها", "Abha"], ["تبوك", "Tabuk"], ["مدينة أخرى", "Other city"]
    ],
    payments: [
      ["mada", "مدى (Mada)", "Mada"],
      ["applepay", "آبل باي (Apple Pay)", "Apple Pay"],
      ["credit", "فيزا / ماستركارد", "Visa / Mastercard"],
      ["tabby", "تابي — ادفع لاحقاً (يتطلب التفعيل)", "Tabby — pay later (activation required)"],
      ["tamara", "تمارا — ادفع لاحقاً (يتطلب التفعيل)", "Tamara — pay later (activation required)"],
      ["cod", "الدفع عند الاستلام", "Cash on delivery"]
    ]
  };
  window.ATYAB_SITE = SITE;

  function isEnglish() {
    return document.documentElement.lang === "en" || document.documentElement.dir === "ltr";
  }

  function esc(value) {
    const div = document.createElement("div");
    div.textContent = String(value || "");
    return div.innerHTML;
  }

  function renderSharedHeaderNavigation() {
    const menu = document.getElementById("header-category-nav-menu");
    if (!menu) return;
    const en = isEnglish();
    const lang = en ? "&lang=en" : "";
    const items = [
      ["perfumes", en ? "Perfumes" : "عطور"],
      ["oil", en ? "Perfume Oils" : "عطور زيتية"],
      ["bakhoor", en ? "Bakhoor" : "بخور"],
      ["cream", en ? "Body Creams" : "كريمات الجسم"],
      ["giftset", en ? "Gift Sets" : "أطقم هدايا"],
      ["quiz", en ? "Fragrance Finder" : "اختبار مستشار العطور"]
    ];
    menu.innerHTML = items.map(([id, label]) => {
      const quiz = id === "quiz";
      const href = quiz ? `index.html?${en ? "lang=en&" : ""}#scent-quiz` : `perfumes.html?cat=${id}${lang}`;
      return `<li class="category-nav-item"><a href="${href}" class="cat-nav-link"${quiz ? "" : ` data-cat="${id}"`}>${label}</a></li>`;
    }).join("");
  }

  function sharedFooterMarkup() {
    const en = isEnglish();
    const lang = en ? "?lang=en" : "";
    const text = en ? {
      brand: "Atyab Al Arab Perfumes", desc: "A Saudi fragrance house focused on considered scents and clear customer care.",
      shop: "Shop", support: "Customer care", contact: "Contact", home: "Home", perfumes: "Perfumes", oils: "Perfume Oils", bakhoor: "Bakhoor", creams: "Body Creams", gifts: "Gift Sets",
      policies: "Policies", privacy: "Privacy Policy", terms: "Terms & Conditions", returns: "Returns policy", shipping: "Shipping information", contactUs: "Contact us",
      address: "Address", hours: "Hours", email: "Email", vat: "VAT number", cr: "Commercial registration", subscribe: "Join our newsletter", subscribeText: "Occasional product and store updates. You can unsubscribe at any time.", subscribeButton: "Subscribe", placeholder: "Your email address", rights: "All rights reserved."
    } : {
      brand: "أطياب العرب للعطور", desc: "دار عطور سعودية تهتم بالتوليفات المختارة وخدمة العملاء الواضحة.",
      shop: "المتجر", support: "خدمة العملاء", contact: "التواصل", home: "الرئيسية", perfumes: "العطور", oils: "العطور الزيتية", bakhoor: "البخور", creams: "كريمات الجسم", gifts: "أطقم الهدايا",
      policies: "السياسات", privacy: "سياسة الخصوصية", terms: "الشروط والأحكام", returns: "سياسة الاسترجاع", shipping: "معلومات الشحن", contactUs: "تواصل معنا",
      address: "العنوان", hours: "ساعات العمل", email: "البريد الإلكتروني", vat: "الرقم الضريبي", cr: "السجل التجاري", subscribe: "اشترك في النشرة البريدية", subscribeText: "تحديثات مختارة عن المنتجات والمتجر. يمكنك إلغاء الاشتراك في أي وقت.", subscribeButton: "اشتراك", placeholder: "بريدك الإلكتروني", rights: "جميع الحقوق محفوظة."
    };
    return `
      <div class="footer-grid container">
        <section class="footer-brand"><h3>${text.brand}</h3><p>${text.desc}</p>
          <form class="newsletter-form" onsubmit="return handleNewsletterSignup(event)">
            <label for="newsletter-email">${text.subscribe}</label><p>${text.subscribeText}</p>
            <div class="newsletter-controls"><input id="newsletter-email" type="email" required autocomplete="email" placeholder="${text.placeholder}"><button class="btn btn-secondary" type="submit">${text.subscribeButton}</button></div>
            <small id="newsletter-status" aria-live="polite"></small>
          </form>
        </section>
        <section class="footer-col"><h4>${text.shop}</h4><ul class="footer-links">
          <li><a href="index.html${lang}">${text.home}</a></li><li><a href="perfumes.html?cat=perfumes${en ? "&lang=en" : ""}">${text.perfumes}</a></li><li><a href="perfumes.html?cat=oil${en ? "&lang=en" : ""}">${text.oils}</a></li><li><a href="perfumes.html?cat=bakhoor${en ? "&lang=en" : ""}">${text.bakhoor}</a></li><li><a href="perfumes.html?cat=cream${en ? "&lang=en" : ""}">${text.creams}</a></li><li><a href="perfumes.html?cat=giftset${en ? "&lang=en" : ""}">${text.gifts}</a></li>
        </ul></section>
        <section class="footer-col"><h4>${text.support}</h4><ul class="footer-links">
          <li><a href="privacy.html${lang}">${text.privacy}</a></li><li><a href="terms.html${lang}">${text.terms}</a></li><li><a href="javascript:void(0)" onclick="openReturnsModal()">${text.returns}</a></li><li><a href="javascript:void(0)" onclick="openShippingModal()">${text.shipping}</a></li><li><a href="contact.html${lang}">${text.contactUs}</a></li>
        </ul></section>
        <section class="footer-col"><h4>${text.contact}</h4><div class="contact-info">
          <div class="contact-item"><span>${text.address}: ${en ? SITE.addressEn : SITE.addressAr}</span></div><div class="contact-item"><span>${text.hours}: ${en ? SITE.hoursEn : SITE.hoursAr}</span></div><div class="contact-item"><a href="tel:${SITE.phone}" dir="ltr">${SITE.phone}</a></div><div class="contact-item"><a href="mailto:${SITE.email}">${SITE.email}</a></div><div class="contact-item"><strong>${text.vat}:</strong>&nbsp;${SITE.vatNumber}</div><div class="contact-item"><strong>${text.cr}:</strong>&nbsp;${SITE.commercialRegistration}</div>
          <div class="social-links" aria-label="Social media"><a href="${SITE.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-10.416c-4.991 0-9.05 4.058-9.05 9.05 0 1.602.42 3.109 1.156 4.417l-1.226 4.478 4.606-1.208c1.261.688 2.709 1.081 4.249 1.081 4.991 0 9.05-4.058 9.05-9.05 0-4.992-4.059-9.05-9.05-9.05z"/></svg></a><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a><a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.36-6.36V8.92a8.12 8.12 0 0 0 3.86.87V6.69z"/></svg></a><a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a></div>
        </div></section>
      </div>
      <div class="container"><div class="footer-bottom"><span>© 2026 ${text.brand}. ${text.rights}</span><span>Mada · Apple Pay · Visa · Mastercard</span></div></div>`;
  }

  function renderSharedFooter() {
    document.querySelectorAll("footer.main-footer").forEach((footer) => {
      footer.innerHTML = sharedFooterMarkup();
      footer.dataset.sharedComponent = "footer-v1";
    });
  }

  function normalizeCheckout() {
    const en = isEnglish();
    document.querySelectorAll("#co-city").forEach((select) => {
      const selected = select.value || SITE.cities[0][0];
      select.innerHTML = SITE.cities.map(([ar, english], index) => `<option value="${ar}"${selected === ar || (!selected && index === 0) ? " selected" : ""}>${en ? english : `${ar} / ${english}`}</option>`).join("");
      select.dataset.sharedComponent = "cities-v1";
    });
    document.querySelectorAll("#co-payment").forEach((select) => {
      const selected = select.value || "mada";
      select.innerHTML = SITE.payments.map(([value, ar, english]) => `<option value="${value}"${selected === value ? " selected" : ""}>${en ? english : ar}</option>`).join("");
      select.dataset.sharedComponent = "payments-v1";
    });
  }

  function replaceModalCopy() {
    document.querySelectorAll("#returns-policy-modal .modal-card").forEach((card) => {
      card.innerHTML = `<button class="modal-close-btn" onclick="closeReturnsModal()" aria-label="Close">&times;</button><h3>${isEnglish() ? "Returns & exchanges" : "سياسة الاسترجاع والاستبدال"}</h3><p>${isEnglish() ? "Return eligibility depends on the product condition and the final policy published at checkout. Do not use or open a product you intend to return. Contact our customer-care team before sending any item back; collection, delivery and refund timings are confirmed with you before a request is accepted." : "تخضع أهلية الاسترجاع لحالة المنتج والسياسة النهائية المنشورة عند إتمام الطلب. لا تستخدم أو تفتح المنتج الذي تنوي إرجاعه. تواصل مع خدمة العملاء قبل إرسال أي منتج؛ ويتم تأكيد الاستلام والتوصيل ومدة الاسترداد معك قبل قبول الطلب."}</p><a class="btn btn-secondary" href="contact.html${isEnglish() ? "?lang=en" : ""}">${isEnglish() ? "Contact customer care" : "تواصل مع خدمة العملاء"}</a>`;
    });
    document.querySelectorAll("#shipping-policy-modal .modal-card").forEach((card) => {
      card.innerHTML = `<button class="modal-close-btn" onclick="closeShippingModal()" aria-label="Close">&times;</button><h3>${isEnglish() ? "Shipping information" : "معلومات الشحن"}</h3><p>${isEnglish() ? "Delivery availability, charges and estimated delivery dates are confirmed during checkout or by customer care before your order is accepted." : "يتم تأكيد توفر التوصيل والتكلفة والموعد المتوقع عند إتمام الطلب أو من خلال خدمة العملاء قبل قبول طلبك."}</p><a class="btn btn-secondary" href="contact.html${isEnglish() ? "?lang=en" : ""}">${isEnglish() ? "Contact customer care" : "تواصل مع خدمة العملاء"}</a>`;
    });
  }

  function removeUnapprovedCopy(root) {
    const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || /SCRIPT|STYLE|NOSCRIPT/.test(parent.tagName)) return;
      let value = node.nodeValue;
      value = value.replace(/\bRoyal\b/gi, "Signature").replace(/\broyal\b/gi, "signature");
      value = value.replace(/الملكية/g, "الفاخرة").replace(/الملكي/g, "الفاخر");
      value = value.replace(/(?:more than|over|up to)\s*48\s*hours?/gi, "without a stated duration");
      value = value.replace(/(?:أكثر من |حتى )?48\s*ساعة/g, "دون تحديد مدة");
      value = value.replace(/18\+?\s*Hours?/gi, "No stated duration").replace(/18\+?\s*ساعة/g, "دون تحديد مدة");
      value = value.replace(/24\s*[-–]\s*48\s*(?:hours?|hrs?)/gi, "delivery timing confirmed at checkout");
      value = value.replace(/24\s*(?:إلى|[-–])\s*48\s*ساعة/g, "يؤكد موعده عند إتمام الطلب");
      if (node.nodeValue !== value) node.nodeValue = value;
    });
    document.querySelectorAll("li, p, span").forEach((element) => {
      const text = element.textContent || "";
      if (/\b(?:IFRA|SFDA)\b|100%\s*(?:natural|طبيعية|طبيعي)/i.test(text)) element.remove();
    });
  }

  window.handleNewsletterSignup = async function (event) {
    event.preventDefault();
    const email = document.getElementById("newsletter-email")?.value.trim() || "";
    const status = document.getElementById("newsletter-status");
    if (status) status.textContent = isEnglish() ? "Saving your subscription…" : "جارٍ حفظ اشتراكك…";
    const result = typeof window.firebaseSubscribeNewsletter === "function"
      ? await window.firebaseSubscribeNewsletter(email, "footer")
      : { success: false };
    if (status) status.textContent = result.success
      ? (isEnglish() ? "Thanks — you’re subscribed." : "شكرًا، تم تسجيل اشتراكك.")
      : (isEnglish() ? "We couldn’t save this right now. Please try again later." : "تعذر حفظ الاشتراك حالياً. يرجى المحاولة لاحقاً.");
    if (result.success) event.target.reset();
    return false;
  };

  function renderSharedComponents() {
    renderSharedHeaderNavigation();
    renderSharedFooter();
    normalizeCheckout();
    replaceModalCopy();
    removeUnapprovedCopy();
    document.querySelectorAll("[data-static-lang]").forEach((section) => {
      section.hidden = section.dataset.staticLang !== (isEnglish() ? "en" : "ar");
    });
  }
  window.renderAtyabSharedComponents = renderSharedComponents;
  document.addEventListener("DOMContentLoaded", () => {
    renderSharedComponents();
    const observer = new MutationObserver(() => removeUnapprovedCopy());
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
