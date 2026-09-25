/**
 * أطياب للعطور - بيانات المنتجات الرسمية المحدثة (النسخة العربية والإنجليزية - طراز أحمد المغربي)
 * ATYAB PERFUMES - Official Enriched Product Catalog (Arabic & English)
 * All images preserve the authentic company bottles, logos, labels, and calligraphy.
 */

const BASE_ATYAB_PRODUCTS = [
  {
    id: "atyab-tiger-oud",
    slug: "tiger-oud",
    name: "عطر أطياب تايقر عود",
    englishName: "Atyab Tiger Oud",
    nameEn: "Atyab Tiger Oud",
    subtitle: "عود كمبودي بري، زعفران فارسي أحمر، وعنبر مدخن عتيق",
    subtitleEn: "Wild Cambodian Oud, Red Saffron & Smoked Vintage Amber",
    category: "perfumes",
    family: "عود شرقي أصيل فائق الثبات",
    familyEn: "Authentic Oriental Oud with Legendary Sillage",
    priceSAR: 40,
    originalPriceSAR: 60,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 285,
    badge: "فوحان أسطوري",
    badgeEn: "Legendary Sillage",
    badgeType: "royal",
    image: "assets/images/tiger_oud.jpg",
    gallery: [
      {
        src: "assets/images/tiger_oud.jpg",
        titleAr: "الواجهة الرسمية للزجاجة",
        titleEn: "Official Bottle Front View",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      },
      {
        src: "assets/images/angles/tiger_oud_cap.jpg",
        titleAr: "الغطاء الملكي المذهب والمرش",
        titleEn: "Royal Ornate Cap & Atomizer",
        badgeAr: "زاوية علوية",
        badgeEn: "Top Angle"
      },
      {
        src: "assets/images/angles/tiger_oud_label.jpg",
        titleAr: "تفاصيل الرخام والخط العربي والشعار",
        titleEn: "Marble Texture, Crest & Calligraphy",
        badgeAr: "تفاصيل الشعار",
        badgeEn: "Emblem Macro"
      }
    ],
    sizes: ["قارورة 50 مل (إصدار السفر)", "قارورة 110 مل (الحجم الرسمي)", "صندوق الملوك الملكي 150 مل + ميني"],
    sizesEn: ["50ml Bottle (Travel Edition)", "110ml Bottle (Official Signature)", "Royal Kings Box 150ml + Mini"],
    defaultSize: "قارورة 110 مل (الحجم الرسمي)",
    defaultSizeEn: "110ml Bottle (Official Signature)",
    sizeVariants: [
      {
        size: "قارورة 50 مل (إصدار السفر)",
        sizeEn: "50ml Bottle (Travel Edition)",
        priceSAR: 40,
        originalPriceSAR: 60,
        savePercent: "33%",
        sku: "AYT-TO-50",
        stockNoteAr: "متوفر بالمستودع - الرياض",
        stockNoteEn: "In Stock - Riyadh Hub",
        isPopular: false
      },
      {
        size: "قارورة 110 مل (الحجم الرسمي)",
        sizeEn: "110ml Bottle (Official Signature)",
        priceSAR: 40,
        originalPriceSAR: 60,
        savePercent: "33%",
        sku: "AYT-TO-110",
        stockNoteAr: "الأكثر طلباً بالمملكة - شحن فوري",
        stockNoteEn: "Most Popular in KSA - Express Dispatch",
        isPopular: true
      },
      {
        size: "صندوق الملوك الملكي 150 مل + ميني",
        sizeEn: "Royal Kings Box 150ml + Mini",
        priceSAR: 40,
        originalPriceSAR: 60,
        savePercent: "32%",
        sku: "AYT-TO-150-BOX",
        stockNoteAr: "إصدار حصري في صندوق هدايا مخملي",
        stockNoteEn: "Exclusive Velvet Gift Box Edition",
        isPopular: false
      }
    ],
    concentration: "أو دو بارفان رويال (ثبات أسطوري)",
    concentrationEn: "Eau De Parfum Royal (Immense Sillage)",
    gender: "للجنسين / هيبة وقوة",
    genderEn: "Unisex / Majestic Authority",
    longevity: "18+ ساعة (ثبات هائل على الأقمشة)",
    longevityEn: "18+ Hours (Immense Sillage on Fabrics)",
    sillage: "أثر ملكي عميق يملأ القاعات",
    sillageEn: "Deep, Commanding & Room-Filling",
    season: "الخريف، الشتاء والمناسبات الرسمية الكبرى",
    seasonEn: "Autumn, Winter & Grand Receptions",
    timeOfDay: "المساء والأمسيات الفاخرة",
    timeOfDayEn: "Evenings & Grand Nights",
    description: "شجاعة وفخامة لا مثيل لهما. تايقر عود يجسد القوة والشموخ المستمدين من غابات العود العريقة في آسيا. يبدأ باشتعال الزعفران الفارسي الفاخر مع رشة من جوزة الطيب، ليمتزج بقلب من العود الكمبودي البري النقي واللابدانوم والجلد المدبوغ، مع قاعدة راسخة من دهن العود المعتق والعنبر الملكي والمسك الأسود. معبأ في قارورة ذات نقوش رخامية بيضاء مذهبة متوجة بغطاء ملكي أندلسي.",
    descriptionEn: "Unmatched bravery and opulence. Tiger Oud epitomizes commanding stature derived from ancient wild agarwood groves. Igniting with red Persian saffron and crushed nutmeg, converging with wild Cambodian agarwood, resinous labdanum, and burnished leather, resting upon aged Indian oud oil, ambergris, and black royal musk. Housed in a gilded white-marble bottle crowned with an ornate Andalusian crest.",
    story: "وُلد عطر 'تايقر عود' ليمنح حضورك بصمة أسطورية لا تمحى. تم تقطير قطرات العود الكمبودي النادرة على الطريقة التراثية البطيئة لضمان استخلاص أعمق جزيئات الخشب المشبع بالراتنجات الطبيعية، قبل تعتيقه في أوانٍ نحاسية محكمة لسنوات عديدة ليظهر بهذا العمق المهيب.",
    storyEn: "Tiger Oud was forged to grant your aura an indelible, legendary presence. Rare wild Cambodian agarwood drops were slow-distilled using heritage methods to extract the deepest resinous timber molecules, then aged for years in sealed copper vessels to produce this majestic depth.",
    ritual: "رشتان إلى ثلاث رشات على الثوب أو المشلح عند ياقة العنق والمعصمين كافية لتمنحك هيبة تستمر طوال اليوم. يُنصح بتبخير الثياب مسبقاً ببخور أطياب الملكي لتحقيق أرقى تناغم عِطري شرقي.",
    ritualEn: "Two to three sprays upon the bisht, thobe collar, or suit cuffs suffice for all-day commanding authority. For the ultimate royal sillage, layer over garments pre-scented with Atyab Royal Bakhoor.",
    accords: [
      { name: "عود كمبودي عتيق", nameEn: "Aged Cambodian Oud", pct: 95, color: "#8C6220" },
      { name: "عنبر ملكي دافئ", nameEn: "Warm Royal Amber", pct: 88, color: "#C59B27" },
      { name: "توابل وزعفران قائنات", nameEn: "Persian Saffron & Spices", pct: 82, color: "#B9621E" },
      { name: "جلود مدبوغة فاخرة", nameEn: "Artisanal Leather", pct: 75, color: "#5C3A21" },
      { name: "بخور ودخان الأخشاب", nameEn: "Smoky Incense Woods", pct: 70, color: "#3A2E2B" }
    ],
    notes: {
      top: ["زعفران فارسي أحمر سوبر نقيل", "فلفل أسود مجروش", "جوزة الطيب السيلانية", "لبان حوجري عماني"],
      heart: ["عود كمبودي بري مقطر", "لابدانوم صمغي دافئ", "أوراق الباتشولي الداكنة", "جلد طبيعي مدخن"],
      base: ["دهن عود هندي معتق 25 عاماً", "عنبر رمادي أصيل", "خشب أرز الأطلس المدخن", "مسك الملوك الأسود"]
    },
    notesEn: {
      top: ["Super Negin Persian Saffron", "Crushed Black Pepper", "Ceylon Nutmeg", "Omani Hojari Frankincense"],
      heart: ["Wild Distilled Cambodian Oud", "Warm Resinous Labdanum", "Dark Patchouli Leaves", "Fine Smoked Leather"],
      base: ["25-Year Aged Indian Oud Oil", "Authentic Ambergris", "Smoked Atlas Cedar", "Musk of Kings"]
    },
    mood: ["مناسبات كبرى", "أجواء الشتاء", "توقيع شخصي لا يُنسى", "هيبة ملكية"],
    moodEn: ["Grand Occasions", "Winter Elegance", "Unforgettable Signature", "Royal Authority"],
    reviews: [
      {
        author: "سلطان القحطاني",
        authorEn: "Sultan Al-Qahtani",
        city: "الرياض",
        cityEn: "Riyadh",
        rating: 5,
        date: "منذ أسبوعين",
        dateEn: "2 weeks ago",
        title: "ثبات أسطوري وفخامة تليق بالمناسبات الكبرى",
        titleEn: "Legendary Longevity & True Regal Stature",
        comment: "ما شاء الله تبارك الله، العطر ريحته فخمة جداً وثباته على المشلح والثوب يستمر يومين كاملين. كل من سلم علي بالزواج سألني عن اسم العطر. تغليف فاخر وسرعة توصيل خيالية للرياض.",
        commentEn: "Unbelievable sillage and longevity; stayed vivid on my bisht for two full days. Everyone at the wedding reception asked about it. Fast delivery to Riyadh."
      },
      {
        author: "سعود بن فهد التميمي",
        authorEn: "Saud Al-Tamimi",
        city: "الدمام",
        cityEn: "Dammam",
        rating: 5,
        date: "منذ شهر",
        dateEn: "1 month ago",
        title: "العود الكمبودي واضح وأصيل بدون زناخة",
        titleEn: "Authentic Cambodian Oud Without Any Sharpness",
        comment: "جربت عطور عود كثيرة بأسعار أضعاف هذا السعر، لكن تايقر عود نقي ومتزن جداً بفضل الزعفران والعنبر. زجاجته الرخامية تحفة على التسريحة.",
        commentEn: "I've tried oud perfumes costing five times more, but Tiger Oud is pure, balanced, and stunning with saffron and amber. The marble bottle is an art piece."
      }
    ]
  },
  {
    id: "atyab-nader",
    slug: "nader",
    name: "عطر أطياب نادر",
    englishName: "Atyab Nader",
    nameEn: "Atyab Nader",
    subtitle: "أخشاب الغابات النبيلة، هيل أخضر، وجلد فاخر مدخن",
    subtitleEn: "Noble Forest Woods, Green Cardamom & Smoked Leather",
    category: "perfumes",
    family: "خشبي حار شرقي ملكي",
    familyEn: "Spicy Woody Royal Oriental",
    priceSAR: 50,
    originalPriceSAR: 75,
    isMinPrice: true,
    rating: 5.0,
    reviewsCount: 245,
    badge: "صُنِعَ للمتميزين",
    badgeEn: "Made for Distinction",
    badgeType: "royal",
    image: "assets/images/nader.jpg",
    gallery: [
      {
        src: "assets/images/nader.jpg",
        titleAr: "الواجهة الزمردية الرسمية",
        titleEn: "Official Emerald Front View",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      },
      {
        src: "assets/images/angles/nader_cap.jpg",
        titleAr: "التاج الملكي المرصع والغطاء",
        titleEn: "Crowned Royal Cap & Collar",
        badgeAr: "زاوية علوية",
        badgeEn: "Top Angle"
      },
      {
        src: "assets/images/angles/nader_label.jpg",
        titleAr: "الزجاج الزمردي والشعار الذهبي",
        titleEn: "Emerald Glass & Golden Crest",
        badgeAr: "تفاصيل الشعار",
        badgeEn: "Emblem Macro"
      }
    ],
    sizes: ["قارورة 50 مل (أنيقة وعملية)", "قارورة 100 مل (الحجم الرسمي المعتمد)", "طقم الإهداء الملكي 100 مل + دهن نادر"],
    sizesEn: ["50ml Bottle (Sleek Pocket)", "100ml Bottle (Official Signature)", "Royal Gift Set 100ml + Nader Dehn"],
    defaultSize: "قارورة 100 مل (الحجم الرسمي المعتمد)",
    defaultSizeEn: "100ml Bottle (Official Signature)",
    sizeVariants: [
      {
        size: "قارورة 50 مل (أنيقة وعملية)",
        sizeEn: "50ml Bottle (Sleek Pocket)",
        priceSAR: 50,
        originalPriceSAR: 75,
        savePercent: "30%",
        sku: "AYT-ND-50",
        stockNoteAr: "متوفر بالمستودع - الرياض",
        stockNoteEn: "In Stock - Riyadh Hub",
        isPopular: false
      },
      {
        size: "قارورة 100 مل (الحجم الرسمي المعتمد)",
        sizeEn: "100ml Bottle (Official Signature)",
        priceSAR: 50,
        originalPriceSAR: 75,
        savePercent: "33%",
        sku: "AYT-ND-100",
        stockNoteAr: "الأعلى تقييماً 5 نجوم - شحن سريع",
        stockNoteEn: "Top Rated 5 Stars - Express Dispatch",
        isPopular: true
      },
      {
        size: "طقم الإهداء الملكي 100 مل + دهن نادر",
        sizeEn: "Royal Gift Set 100ml + Nader Dehn",
        priceSAR: 50,
        originalPriceSAR: 75,
        savePercent: "29%",
        sku: "AYT-ND-SET",
        stockNoteAr: "صندوق زمردي فاخر مبطن بالحرير",
        stockNoteEn: "Luxury Silk-Lined Emerald Presentation Box",
        isPopular: false
      }
    ],
    concentration: "أو دو بارفان انتنس (تركيز عالي)",
    concentrationEn: "Eau De Parfum Intense (High Concentration)",
    gender: "للجنسين / حضور مهيب ووقور",
    genderEn: "Unisex / Majestic Authority",
    longevity: "14+ ساعة (ثبات دائم)",
    longevityEn: "14+ Hours (Enduring Longevity)",
    sillage: "فوحان راقٍ وآسر لا يزعج",
    sillageEn: "Potent, Sophisticated & Captivating",
    season: "جميع الفصول، متميز في الأجواء المعتدلة والباردة",
    seasonEn: "All Seasons, Excels in Cool & Temperate Weather",
    timeOfDay: "الصباح الرسمي والمساء الأنيق",
    timeOfDayEn: "Executive Morning & Elegant Evening",
    description: "اسمٌ على مسمى، 'نادر' هو جوهرة الزمرد في عالم العطور العربية الأصيلة. صُمم لمن يتقنون فنّ الأناقة والظهور الاستثنائي، حيث يمتزج عبير الأخشاب العميقة مع الهيل الأخضر الفاخر والبخور المدخن، محاطاً ببتلات الورد الطائفي والجلد الفاخر. يتألق في زجاجة خضراء زمردية ساحرة متوجة بغطاء ملكي ذهبي على شكل تاج ملكي مرصع.",
    descriptionEn: "True to its name ('Rare'), Nader is an emerald treasure in authentic Arabian perfumery. Designed for connoisseurs of distinguished poise, marrying deep woods with royal green cardamom and smoked incense, wrapped in Taif rose petals and artisanal leather. Crowned with an ornate royal golden imperial crest.",
    story: "استلهم صانع العطور 'نادر' من خضرة واحات الجزيرة العربية في مواسم المطر حين تلتقي برودة النسيم مع دفء الأخشاب والتوابل الشرقية المنعشة. اختيار الهيل الأخضر الملكي مع البخور الطائفي خلق بصمة عطرية تمثل الهيبة السعودية الأصيلة.",
    storyEn: "Inspired by the lush emerald oases of Arabia after rain, where cool breezes mingle with warm noble woods and spices. Blending royal green cardamom with Taif incense creates an olfactory signature of authentic authority.",
    ritual: "رشة واحدة على كل جانب من العنق ورشة على المعصمين تمنحك هالة قيادية مريحة للحواس تدوم طيلة يوم العمل والاجتماعات الهامة.",
    ritualEn: "One spray on each neck pulse and one on the inner wrists grant a calm, commanding leadership aura throughout meetings and daily affairs.",
    accords: [
      { name: "هيل أخضر ملكي وتوابل", nameEn: "Royal Green Cardamom", pct: 92, color: "#2E7D32" },
      { name: "أخشاب نبيلة وأرز الأطلس", nameEn: "Noble Woods & Cedar", pct: 88, color: "#5D4037" },
      { name: "بخور طائفي مدخن", nameEn: "Smoked Taif Incense", pct: 78, color: "#8D6E63" },
      { name: "جلد طبيعي ناعم", nameEn: "Supple Leather", pct: 74, color: "#4E342E" },
      { name: "عنبر ونجيل الهند الهايتي", nameEn: "Ambergris & Vetiver", pct: 68, color: "#C59B27" }
    ],
    notes: {
      top: ["هيل أخضر ملكي منتقى باليد", "فلفل وردي مدغشقري", "جريب فروت صقلي مشرق", "كزبرة عطرية"],
      heart: ["راتنجات البخور الملكي", "ورد طائفي ندي", "خشب الغاياك العطري", "قرفة مدخنة ناعمة"],
      base: ["عود داكن معتق", "عنبر رمادي مدخن", "نجيل الهند الهايتي الصافي", "جلد طبيعي ناعم مصقول"]
    },
    notesEn: {
      top: ["Hand-Selected Royal Green Cardamom", "Madagascar Pink Peppercorn", "Bright Sicilian Grapefruit", "Coriander"],
      heart: ["Royal Incense Resins", "Dewy Taif Rose", "Aromatic Guaiac Wood", "Soft Smoked Cinnamon"],
      base: ["Aged Dark Oud", "Smoked Ambergris", "Pure Haitian Vetiver", "Supple Polished Leather"]
    },
    mood: ["أمسيات فاخرة", "حفلات رسمية", "توقيع شخصي مميز", "حضور دائم"],
    moodEn: ["Grand Evenings", "Formal Receptions", "Signature Aura", "Enduring Charisma"],
    reviews: [
      {
        author: "عبدالعزيز الدوسري",
        authorEn: "Abdulaziz Al-Dossari",
        city: "الخبر",
        cityEn: "Khobar",
        rating: 5,
        date: "منذ 3 أسابيع",
        dateEn: "3 weeks ago",
        title: "عطر نادر اسم على مسمى للدوام والاجتماعات",
        titleEn: "True to its Name: Rare, Refined & Executive",
        comment: "عطر نادر جمع بين الهيل والأخشاب الملكية بدون أي إزعاج، فوحانه هادئ وفخم جداً للدوام والاجتماعات المهمة. صراحة سعر 50 ريال عليه فرصة ذهبية مقارنة بجودته العالية وثباته الفائق.",
        commentEn: "Pairs cardamom and noble woods without any sharp edges. Calm, aristocratic projection for executive offices. Incredible value at this high quality."
      }
    ]
  },
  {
    id: "atyab-a555",
    slug: "a555",
    name: "عطر أطياب أ. 555",
    englishName: "Atyab A.555",
    nameEn: "Atyab A.555",
    subtitle: "نسيم البحر المنعش، برغموت صقلي، وعنبر ملكي",
    subtitleEn: "Invigorating Sea Breeze, Sicilian Bergamot & Royal Amber",
    category: "perfumes",
    family: "عطور شرقية منعشة (أكواتيك فاخر)",
    familyEn: "Fresh Oriental Aquatic Luxury",
    priceSAR: 35,
    originalPriceSAR: 50,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 184,
    badge: "الأكثر مبيعاً",
    badgeEn: "Best Seller",
    badgeType: "gold",
    image: "assets/images/a555.jpg",
    gallery: [
      {
        src: "assets/images/a555.jpg",
        titleAr: "الواجهة الزرقاء الملكية الرسمية",
        titleEn: "Official Royal Blue Front View",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      },
      {
        src: "assets/images/angles/a555_cap.jpg",
        titleAr: "الغطاء الذهبي المشغول والمرش",
        titleEn: "Golden Ornate Cap & Atomizer",
        badgeAr: "زاوية علوية",
        badgeEn: "Top Angle"
      },
      {
        src: "assets/images/angles/a555_label.jpg",
        titleAr: "الرخام الأزرق وشعار أ. 555",
        titleEn: "Sapphire Marble & A.555 Crest",
        badgeAr: "تفاصيل الشعار",
        badgeEn: "Emblem Macro"
      }
    ],
    sizes: ["قارورة 50 مل (حجم يومي)", "قارورة 110 مل (الحجم الرسمي المعتمد)", "طقم الإهداء 110 مل + عينة بخور"],
    sizesEn: ["50ml Bottle (Daily Fresh)", "110ml Bottle (Official Signature)", "Gift Set 110ml + Bakhoor Sample"],
    defaultSize: "قارورة 110 مل (الحجم الرسمي المعتمد)",
    defaultSizeEn: "110ml Bottle (Official Signature)",
    sizeVariants: [
      {
        size: "قارورة 50 مل (حجم يومي)",
        sizeEn: "50ml Bottle (Daily Fresh)",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "34%",
        sku: "AYT-A555-50",
        stockNoteAr: "متوفر بالمستودع - الرياض",
        stockNoteEn: "In Stock - Riyadh Hub",
        isPopular: false
      },
      {
        size: "قارورة 110 مل (الحجم الرسمي المعتمد)",
        sizeEn: "110ml Bottle (Official Signature)",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "30%",
        sku: "AYT-A555-110",
        stockNoteAr: "الأكثر مبيعاً للدوام والصيف",
        stockNoteEn: "Best Seller for Daily & Summer",
        isPopular: true
      },
      {
        size: "طقم الإهداء 110 مل + عينة بخور",
        sizeEn: "Gift Set 110ml + Bakhoor Sample",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "29%",
        sku: "AYT-A555-SET",
        stockNoteAr: "صندوق كحلي مذهب جاهز للإهداء",
        stockNoteEn: "Royal Navy & Gold Ready-to-Gift Box",
        isPopular: false
      }
    ],
    concentration: "أو دو بارفان (ثبات فائق منعش)",
    concentrationEn: "Eau De Parfum (Long Lasting Freshness)",
    gender: "للجنسين / انتعاش وجاذبية",
    genderEn: "Unisex / Crisp & Alluring",
    longevity: "12+ ساعة (ثبات نادر للعطور المائية)",
    longevityEn: "12+ Hours (Rare for Aquatic Scents)",
    sillage: "فوحان منعش ومريح للنفس",
    sillageEn: "Invigorating, Breezy & Alluring",
    season: "الربيع، الصيف، وجميع أيام العمل الحيوية",
    seasonEn: "Spring, Summer & Daily Executive Wear",
    timeOfDay: "الصباح والظهيرة وطوال اليوم",
    timeOfDayEn: "Morning, Midday & All Day Long",
    description: "تحفة عطرية نابضة بالحياة تستحضر نسيم المحيط العليل تحت أشعة الشمس الذهبية. يفتتح العطر بنفحات البرغموت الصقلي والأكورد البحري النقي، ليتدرج بانسيابية نحو قلب عطري من اللافندر والميرمية، قبل أن يستقر على قاعدة نبيلة من خشب الأرز الأبيض والعنبر الملكي النادر. معبأ في زجاجة ملكية زرقاء داكنة بتفاصيل رخامية ذهبية.",
    descriptionEn: "A vibrant olfactory creation capturing the cool ocean breeze kissed by golden sunlight. Opening with sparkling Sicilian bergamot and crisp marine accords, flowing smoothly into an aromatic heart of lavender and clary sage, resting upon a noble base of white cedarwood and rare royal amber. Bottled in deep royal blue with gilded marble motifs.",
    story: "صيغ عطر أ. 555 لمحبي الروائح المنعشة الفواحة التي تبعث على الطاقة والحيوية دون التنازل عن الأصالة الشرقية، حيث جرى تثبيت النوتات البحرية الحساسة بعنبر الحوت الملكي وخشب الصندل الصافي ليدوم طويلاً حتى في درجات الحرارة المرتفعة.",
    storyEn: "Engineered for connoisseurs who seek ocean freshness without losing oriental longevity. By anchoring crisp marine accords with pure royal ambergris and white cedar, A.555 sustains crisp radiance even in desert heat.",
    ritual: "رش على المعصمين، الرقبة، وأكتاف الثوب الأبيض ليبث حولك هالة نقاء منعشة تستمر طوال ساعات العمل.",
    ritualEn: "Mist across wrists, neck, and shoulders of clean garments to radiate a crisp, sparkling aura all day.",
    accords: [
      { name: "نسيم البحر وأكواتيك نقي", nameEn: "Pure Marine & Aquatic", pct: 94, color: "#1976D2" },
      { name: "برغموت صقلي وحمضيات", nameEn: "Sicilian Bergamot Citrus", pct: 86, color: "#FBC02D" },
      { name: "عنبر ملكي ومسك أبيض", nameEn: "Royal Amber & White Musk", pct: 80, color: "#C59B27" },
      { name: "لافندر بري وميرمية", nameEn: "Aromatic Lavender & Sage", pct: 75, color: "#7B1FA2" },
      { name: "خشب الأرز الأبيض", nameEn: "White Cedarwood", pct: 70, color: "#8D6E63" }
    ],
    notes: {
      top: ["برغموت كالابريا المعصور على البارد", "أكورد نسيم البحر النقي", "تفاح أخضر مقرمش", "لافندر بري فرنسي"],
      heart: ["أمواج المحيط المنعشة", "ميرمية عطرية دافئة", "جوزة الطيب الخفيفة", "بتلات الزنبق الأبيض"],
      base: ["عنبر ملكي ناصع", "خشب الأرز الأبيض النبيل", "مسك أبيض بلوري نقي", "خشب صندل سلطاني"]
    },
    notesEn: {
      top: ["Cold-Pressed Calabrian Bergamot", "Crisp Sea Breeze Accord", "Crunchy Green Apple", "French Lavender"],
      heart: ["Oceanic Waves", "Warm Clary Sage", "Light Nutmeg", "White Lily Petals"],
      base: ["Bright Royal Amber", "Noble White Cedarwood", "Crystal White Musk", "Sultani Sandalwood"]
    },
    mood: ["انتعاش يومي", "مناسب للعمل", "صيف مفعم بالحيوية", "أناقة عصرية"],
    moodEn: ["Daily Freshness", "Executive Work", "Vibrant Summer", "Modern Poise"],
    reviews: [
      {
        author: "فيصل الشمري",
        authorEn: "Faisal Al-Shammari",
        city: "حائل",
        cityEn: "Hail",
        rating: 5,
        date: "منذ أسبوع",
        dateEn: "1 week ago",
        title: "أفضل عطر صيفي منعش وثابت جربته",
        titleEn: "Best Refreshing & Long-Lasting Summer Perfume",
        comment: "نادر جداً تلقى عطر بحري منعش ويكون ثباته فوق 10 ساعات! أ. 555 عطر رايق جداً ونظيف، ريحته تحسسك بالانتعاش والنشاط كل ما شميته. أنصح به بقوة.",
        commentEn: "Extremely rare to find an aquatic perfume lasting over 10 hours! A.555 is pristine, energizing, and so crisp."
      }
    ]
  },
  {
    id: "atyab-mashair",
    slug: "mashair",
    name: "عطر أطياب مشاعر",
    englishName: "Atyab Mashair",
    nameEn: "Atyab Mashair",
    subtitle: "ورد دمشقي مخملي، ياسمين فرنسي، وفانيليا البوربون الدافئة",
    subtitleEn: "Velvety Damask Rose, French Jasmine & Bourbon Vanilla",
    category: "perfumes",
    family: "زهري شرقي دافئ رومانسي",
    familyEn: "Warm Floral Oriental Romance",
    priceSAR: 55,
    originalPriceSAR: 80,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 198,
    badge: "الأكثر رومانسية",
    badgeEn: "Most Romantic",
    badgeType: "gold",
    image: "assets/images/mashair.jpg",
    gallery: [
      {
        src: "assets/images/mashair.jpg",
        titleAr: "الواجهة العنابية الياقوتية الرسمية",
        titleEn: "Official Ruby Velvet Front View",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      },
      {
        src: "assets/images/angles/mashair_cap.jpg",
        titleAr: "التاج الذهبي وشبكة العنق المذهبة",
        titleEn: "Golden Crown & Lattice Neck",
        badgeAr: "زاوية علوية",
        badgeEn: "Top Angle"
      },
      {
        src: "assets/images/angles/mashair_label.jpg",
        titleAr: "تفاصيل الزجاج الياقوتي والشعار",
        titleEn: "Ruby Glass & Royal Crest",
        badgeAr: "تفاصيل الشعار",
        badgeEn: "Emblem Macro"
      }
    ],
    sizes: ["قارورة 50 مل (إصدار ناعم)", "قارورة 100 مل (الحجم الرسمي المعتمد)", "طقم مشاعر الفاخر 100 مل + لوشن عطري"],
    sizesEn: ["50ml Bottle (Delicate Size)", "100ml Bottle (Official Signature)", "Luxury Mashair Set 100ml + Perfumed Lotion"],
    defaultSize: "قارورة 100 مل (الحجم الرسمي المعتمد)",
    defaultSizeEn: "100ml Bottle (Official Signature)",
    sizeVariants: [
      {
        size: "قارورة 50 مل (إصدار ناعم)",
        sizeEn: "50ml Bottle (Delicate Size)",
        priceSAR: 55,
        originalPriceSAR: 80,
        savePercent: "31%",
        sku: "AYT-MSH-50",
        stockNoteAr: "متوفر بالمستودع - الرياض",
        stockNoteEn: "In Stock - Riyadh Hub",
        isPopular: false
      },
      {
        size: "قارورة 100 مل (الحجم الرسمي المعتمد)",
        sizeEn: "100ml Bottle (Official Signature)",
        priceSAR: 55,
        originalPriceSAR: 80,
        savePercent: "31%",
        sku: "AYT-MSH-100",
        stockNoteAr: "الأكثر طلباً للهدايا والأعراس",
        stockNoteEn: "Most Requested for Gifting & Weddings",
        isPopular: true
      },
      {
        size: "طقم مشاعر الفاخر 100 مل + لوشن عطري",
        sizeEn: "Luxury Mashair Set 100ml + Perfumed Lotion",
        priceSAR: 55,
        originalPriceSAR: 80,
        savePercent: "30%",
        sku: "AYT-MSH-SET",
        stockNoteAr: "صندوق إهداء رومانسي عنابي مذهب",
        stockNoteEn: "Velvet Burgundy & Gold Gift Presentation",
        isPopular: false
      }
    ],
    concentration: "أو دو بارفان (تركيز رومانسي عميق)",
    concentrationEn: "Eau De Parfum (Deep Romantic Concentration)",
    gender: "للجنسين / ناعم وجذاب",
    genderEn: "Unisex / Gentle & Seductive",
    longevity: "14+ ساعة (أثر عطري ساحر)",
    longevityEn: "14+ Hours (Captivating Trail)",
    sillage: "مخملي يترك أثراً جذاباً لا يُنسى",
    sillageEn: "Velvety with an Irresistible Trail",
    season: "الخريف، الشتاء، ومناسبات الربيع الخاصة",
    seasonEn: "Autumn, Winter & Romantic Celebrations",
    timeOfDay: "المساء، الأمسيات الهادئة وحفلات الزفاف",
    timeOfDayEn: "Evenings, Weddings & Intimate Nights",
    description: "تجسيد حقيقي لأرقى الأحاسيس والمشاعر النبيلة. ينبض عطر مشاعر بدفء جذاب يبدأ بعبير التوت البري المنعش والمندرين المحلى، ليتفتح قلبه في باقة آسرة من الورد الجوري والياسمين، ويستقر برقة على قاعدة غنية بفانيليا البوربون المدغشقرية وخشب الصندل والعنبر الذهبي. زجاجة عنابية متدرجة بفخامة ملكية متناهية.",
    descriptionEn: "A genuine embodiment of refined romance and affection. Mashair pulsates with comforting warmth opening with wild berries and candied mandarin, blooming into Damascene rose and French jasmine sambac, grounded gracefully on Madagascar bourbon vanilla, creamy sandalwood, and warm amber.",
    story: "ابتُكر 'مشاعر' ليكون قصيدة عشق تُروى عبر أنقى قطرات الورد والياسمين. جرى قطف بتلات الورد في الصباح الباكر لتبقى محتفظة بعبير الندى الطبيعي، ثم أُضيفت فانيليا البوربون لتمنحه ملمساً كشميرياً دافئاً يلامس الوجدان.",
    storyEn: "Crafted as an ode to noble affection through dewy roses and velvety vanilla. Hand-harvested rose petals preserved with dawn moisture meet warm bourbon vanilla for an irresistible cashmere embrace.",
    ritual: "رشتان على أماكن النبض خلف الأذنين والمعصمين؛ يترك أثراً مخملياً دافئاً كلما اقتربت.",
    ritualEn: "Mist behind earlobes and pulse points; leaves an intoxicating velvety presence whenever you move.",
    accords: [
      { name: "ورد دمشقي مخملي", nameEn: "Velvet Damask Rose", pct: 92, color: "#C2185B" },
      { name: "فانيليا بوربون وبرالين", nameEn: "Bourbon Vanilla & Praline", pct: 86, color: "#FFA000" },
      { name: "ياسمين فرنسي أبيض", nameEn: "French White Jasmine", pct: 80, color: "#E0E0E0" },
      { name: "توت بري وفاكهة حمراء", nameEn: "Wild Red Berries", pct: 75, color: "#880E4F" },
      { name: "صندل وعنبر دافئ", nameEn: "Warm Sandalwood & Amber", pct: 70, color: "#A67B30" }
    ],
    notes: {
      top: ["توت بري أحمر بري", "مندرين مسكر بلطف", "رحيق الخوخ الفوار", "رشة هيل ناعمة"],
      heart: ["ورد دمشقي مخملي غني", "ياسمين سامباك فرنسي قطاف أول", "زهر الهيلوتروب", "برالين مكرمل دافئ"],
      base: ["فانيليا بوربون مدغشقر السوداء", "عنبر ذهبي نقي", "خشب صندل كريمي", "مسك حريري ناعم"]
    },
    notesEn: {
      top: ["Wild Red Berries", "Candied Mandarin", "Sparkling Peach Nectar", "Soft Cardamom Kiss"],
      heart: ["Velvety Damascene Rose", "First-Harvest French Jasmine Sambac", "Heliotrope", "Warm Caramelized Praline"],
      base: ["Madagascar Black Bourbon Vanilla", "Pure Golden Amber", "Creamy Sandalwood", "Silky Skin Musk"]
    },
    mood: ["مناسبات رومانسية", "أمسيات هادئة", "أعراس واحتفالات", "سحر لا يُقاوم"],
    moodEn: ["Romantic Rendezvous", "Serene Evenings", "Weddings & Galas", "Irresistible Charisma"],
    reviews: [
      {
        author: "هيا العتيبي",
        authorEn: "Haya Al-Otaibi",
        city: "الرياض",
        cityEn: "Riyadh",
        rating: 5,
        date: "منذ أسبوعين",
        dateEn: "2 weeks ago",
        title: "ريحته أنوثة وفخامة تدوم لليوم الثاني",
        titleEn: "Feminine Luxury Lingering Into the Next Day",
        comment: "مشاعر عطر يخليك تحسين بجمالك ورقتك! الفانيليا مع الورد متجانسة بطريقة احترافية جداً وما فيها أي حلاوة زايدة. التغليف يبيض الوجه كهدية.",
        commentEn: "Mashair makes you feel graceful and radiant! Vanilla and rose blend seamlessly without being cloying. Beautiful presentation."
      }
    ]
  },
  {
    id: "atyab-moon-flower",
    slug: "moon-flower",
    name: "عطر أطياب مون فلاور",
    englishName: "Atyab Moon Flower",
    nameEn: "Atyab Moon Flower",
    subtitle: "زهور بيضاء ليلية مضيئة، نيرولي تونسي، وعنبر أبيض شفاف",
    subtitleEn: "Nocturnal White Blossoms, Tunisian Neroli & Crystal Amber",
    category: "perfumes",
    family: "زهري ندي مضيء راقٍ",
    familyEn: "Luminous Dewy Floral Elegance",
    priceSAR: 80,
    originalPriceSAR: 115,
    isMinPrice: true,
    rating: 5.0,
    reviewsCount: 220,
    badge: "إصدار النخبة",
    badgeEn: "Elite Edition",
    badgeType: "royal",
    image: "assets/images/moon_flower.jpg",
    gallery: [
      {
        src: "assets/images/moon_flower.jpg",
        titleAr: "الواجهة الكريستالية المضيئة الرسمية",
        titleEn: "Official Luminous Crystal Front View",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      },
      {
        src: "assets/images/angles/moon_flower_cap.jpg",
        titleAr: "الغطاء الفضي المتلألئ والمرش",
        titleEn: "Silver Ornate Cap & Atomizer",
        badgeAr: "زاوية علوية",
        badgeEn: "Top Angle"
      },
      {
        src: "assets/images/angles/moon_flower_label.jpg",
        titleAr: "النقوش الكريستالية والشعار المذهب",
        titleEn: "Crystal Carvings & Gilded Seal",
        badgeAr: "تفاصيل الشعار",
        badgeEn: "Emblem Macro"
      }
    ],
    sizes: ["قارورة 50 مل (إصدار راقٍ)", "قارورة 100 مل (الحجم الرسمي المعتمد)", "صندوق النخبة الملكي 100 مل + معطر شعر"],
    sizesEn: ["50ml Bottle (Prestige Size)", "100ml Bottle (Official Signature)", "Elite Royal Box 100ml + Hair Mist"],
    defaultSize: "قارورة 100 مل (الحجم الرسمي المعتمد)",
    defaultSizeEn: "100ml Bottle (Official Signature)",
    sizeVariants: [
      {
        size: "قارورة 50 مل (إصدار راقٍ)",
        sizeEn: "50ml Bottle (Prestige Size)",
        priceSAR: 80,
        originalPriceSAR: 115,
        savePercent: "27%",
        sku: "AYT-MF-50",
        stockNoteAr: "متوفر بالمستودع - الرياض",
        stockNoteEn: "In Stock - Riyadh Hub",
        isPopular: false
      },
      {
        size: "قارورة 100 مل (الحجم الرسمي المعتمد)",
        sizeEn: "100ml Bottle (Official Signature)",
        priceSAR: 80,
        originalPriceSAR: 115,
        savePercent: "30%",
        sku: "AYT-MF-100",
        stockNoteAr: "إصدار النخبة الأعلى طلباً بالمملكة",
        stockNoteEn: "Elite Edition - Top Demand Across KSA",
        isPopular: true
      },
      {
        size: "صندوق النخبة الملكي 100 مل + معطر شعر",
        sizeEn: "Elite Royal Box 100ml + Hair Mist",
        priceSAR: 80,
        originalPriceSAR: 115,
        savePercent: "27%",
        sku: "AYT-MF-BOX",
        stockNoteAr: "علبة فاخرة بيضاء بلمسات ذهبية",
        stockNoteEn: "White & Gold Luxury Presentation Box",
        isPopular: false
      }
    ],
    concentration: "أو دو بارفان انتنس (نقاء فائق)",
    concentrationEn: "Eau De Parfum Intense (Supreme Purity)",
    gender: "للجنسين / نضارة ملكية جذابة",
    genderEn: "Unisex / Royal Radiance",
    longevity: "14+ ساعة (إشراقة مستمرة)",
    longevityEn: "14+ Hours (Continuous Radiance)",
    sillage: "إشعاع زهري بهيج ينتشر بلطف",
    sillageEn: "Radiant, Uplifting & Elegant",
    season: "جميع فصول السنة، متألق في ليالي الصيف والربيع",
    seasonEn: "All Seasons, Radiant on Summer & Spring Nights",
    timeOfDay: "الصباح الفاخر والأمسيات الملكية",
    timeOfDayEn: "Aristocratic Morning & Gala Evenings",
    description: "مستوحى من الزهور النادرة التي تفتح بتلاتها الفاتنة تحت ضوء القمر الفضي في ليالي الصحراء الصافية. تناغم سماوي يجمع بين النيرولي المتلألئ وزهر القمر الليلي والياسمين الندي، ترفعه خضرة أوراق الشجر الندية ويحتضنه خشب الأرز النقي والعنبر الأبيض الحريري. عطر النقاء والأناقة العالية في زجاجة شفافة تعكس لون الإشراق والجمال.",
    descriptionEn: "Inspired by nocturnal flowers that unfurl under silver moonlight across calm desert nights. A celestial accord pairing sparkling Tunisian neroli and night-blooming moonflower with dewy jasmine petals, lifted by fresh green foliage and embraced by atlas cedar and silk white amber.",
    story: "تطلب تطوير 'مون فلاور' أكثر من عامين لاختيار خلاصة زهور بيضاء لا تفقد نقاءها وسط حرارة الصيف. النتيجة كانت إشراقة عطرية تشع بالسكون والجمال النادر، وتمنح من يرتديها إحساساً ملكياً بالنقاء والرقي.",
    storyEn: "Over two years were spent perfecting Moon Flower so nocturnal petals remain crystal-pure in desert summers. The result is an ethereal luminescence giving its wearer serenity, poise, and aristocratic presence.",
    ritual: "رشتان على الشعر من مسافة 20 سم ورشة على الياقة؛ تنبثق نفحاته الزكية مع كل حركة وهبوب نسيم.",
    ritualEn: "Mist lightly over hair and garment lapel from 20cm; releases captivating petals with every breeze.",
    accords: [
      { name: "زهور بيضاء ليلية ونيرولي", nameEn: "Nocturnal White Blossoms", pct: 96, color: "#E0E0E0" },
      { name: "عنبر أبيض شفاف", nameEn: "Crystal White Amber", pct: 85, color: "#FFF9C4" },
      { name: "ياسمين وغاردينيا نديّة", nameEn: "Dewy Jasmine & Gardenia", pct: 80, color: "#F5F5F5" },
      { name: "خشب أرز الأطلس النقي", nameEn: "Atlas Cedar", pct: 72, color: "#8D6E63" },
      { name: "كشميران ومسك قطني", nameEn: "Clean Cotton Musk", pct: 68, color: "#ECEFF1" }
    ],
    notes: {
      top: ["نيرولي تونسي فاخر مقطر", "أوراق خضراء نديّة فجرية", "كمثرى بيضاء بلورية", "حمضيات صقلية مشمسة"],
      heart: ["زهرة القمر الليلية النادرة", "ياسمين أبيض نقي ملكي", "بتلات الغاردينيا المخملية", "ماغنوليا صيفية"],
      base: ["عنبر أبيض شفاف نادر", "خشب أرز الأطلس الطبيعي", "مسك قطني نقي فائق النقاء", "كشميران حريري ناعم"]
    },
    notesEn: {
      top: ["Distilled Tunisian Neroli", "Dewy Morning Green Leaves", "Crystal White Pear", "Sunlit Citrus Accords"],
      heart: ["Rare Night-Blooming Moonflower", "Royal White Jasmine", "Gardenia Petals", "Summer Magnolia"],
      base: ["Rare Crystal White Amber", "Natural Atlas Cedarwood", "Ultra-Clean Cotton Musk", "Silk Cashmeran"]
    },
    mood: ["أناقة راقية", "سهرات صيفية", "إشراقة صباحية", "تميز لافت"],
    moodEn: ["Sophisticated Poise", "Summer Evenings", "Morning Radiance", "Effortless Elegance"],
    reviews: [
      {
        author: "نورة الشمري",
        authorEn: "Noura Al-Shammari",
        city: "جدة",
        cityEn: "Jeddah",
        rating: 5,
        date: "منذ أسبوعين",
        dateEn: "2 weeks ago",
        title: "سحر أنثوي هادئ ونقاء لا يقاوم",
        titleEn: "Calm Feminine Grace & Irresistible Purity",
        comment: "عطر مون فلاور أخذ قلبي من أول رشة! ناعم جداً وفيه دفء زهر القمر مع العنبر الأبيض، استخدمته لزواج أختي والكل سألني عنه. يستحق كل ريال وخدمتكم بالواتساب راقية جداً.",
        commentEn: "Moon Flower stole my heart from the first spray! Extremely gentle with nocturnal warmth and white amber. Highly recommended."
      }
    ]
  },
  {
    id: "atyab-backhoor",
    slug: "backhoor",
    name: "بخور أطياب الملكي",
    englishName: "Atyab Royal Bakhoor",
    nameEn: "Atyab Royal Bakhoor",
    subtitle: "رقائق خشب العود المعتقة المشبعة بالورد الطائفي والعنبر",
    subtitleEn: "Aged Agarwood Chips Infused with Taif Rose & Amber",
    category: "bakhoor",
    family: "بخور عربي ودخون فاخر للمجالس",
    familyEn: "Arabian Incense & Royal Dakhoon for Majlis",
    priceSAR: 30,
    originalPriceSAR: 45,
    isMinPrice: true,
    rating: 5.0,
    reviewsCount: 312,
    badge: "أصالة الضيافة",
    badgeEn: "Hospitality Heritage",
    badgeType: "gold",
    image: "assets/images/backhoor.jpg",
    gallery: [
      {
        src: "assets/images/backhoor.jpg",
        titleAr: "العبوة الملكية الرسمية للبخور",
        titleEn: "Official Royal Bakhoor Pack View",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      },
      {
        src: "assets/images/angles/backhoor_jar.jpg",
        titleAr: "علبة البخور والكريستال المذهب",
        titleEn: "Bakhoor Luxury Jar & Gold Details",
        badgeAr: "تفاصيل العبوة",
        badgeEn: "Pack Details"
      },
      {
        src: "assets/images/angles/backhoor_chips.jpg",
        titleAr: "رقائق العود المشبعة بالزيوت النقية",
        titleEn: "Aged Agarwood Chips Infused in Pure Oils",
        badgeAr: "الرقائق المعتقة",
        badgeEn: "Oud Chips"
      }
    ],
    sizes: ["عبوة فاخرة 50 جم (للتجربة)", "عبوة ملكية 100 جم (الحجم الرسمي)", "صندوق الضيافة الملكي 250 جم + مبخرة فاخرة"],
    sizesEn: ["Luxury Pouch 50g (Trial)", "Royal Official Pack 100g", "Majlis Hospitality Box 250g + Burner"],
    defaultSize: "عبوة ملكية 100 جم (الحجم الرسمي)",
    defaultSizeEn: "Royal Official Pack 100g",
    sizeVariants: [
      {
        size: "عبوة فاخرة 50 جم (للتجربة)",
        sizeEn: "Luxury Pouch 50g (Trial)",
        priceSAR: 30,
        originalPriceSAR: 45,
        savePercent: "33%",
        sku: "AYT-BKH-50",
        stockNoteAr: "متوفر بالمستودع - الرياض",
        stockNoteEn: "In Stock - Riyadh Hub",
        isPopular: false
      },
      {
        size: "عبوة ملكية 100 جم (الحجم الرسمي)",
        sizeEn: "Royal Official Pack 100g",
        priceSAR: 30,
        originalPriceSAR: 45,
        savePercent: "33%",
        sku: "AYT-BKH-100",
        stockNoteAr: "الأكثر طلباً للضيافة ويوم الجمعة",
        stockNoteEn: "Most Popular for Friday Blessings & Guests",
        isPopular: true
      },
      {
        size: "صندوق الضيافة الملكي 250 جم + مبخرة فاخرة",
        sizeEn: "Majlis Hospitality Box 250g + Burner",
        priceSAR: 30,
        originalPriceSAR: 45,
        savePercent: "31%",
        sku: "AYT-BKH-250-SET",
        stockNoteAr: "صندوق إهداء خشبي فاخر يشمل مبخرة",
        stockNoteEn: "Wooden Gift Box Including Crystal Burner",
        isPopular: false
      }
    ],
    concentration: "أقراص ورقائق بخور معجونة يدوياً بالزيوت النقية",
    concentrationEn: "Handcrafted Incense Tablets with Pure Oils",
    gender: "للمنازل، المجالس، قصور الضيافة والمناسبات",
    genderEn: "Homes, Majlis, Palaces & Celebrations",
    longevity: "تدوم الرائحة في الأرجاء والمفروشات حتى 48 ساعة",
    longevityEn: "Fragrance lingers in atmosphere for up to 48 Hours",
    sillage: "سحابة عطرية غنية ودافئة تملأ المكان بالسكينة",
    sillageEn: "Rich & Warm Aromatic Cloud",
    season: "طوال العام، أساسي في أيام الجمع والأعياد والمناسبات",
    seasonEn: "All Year, Essential for Fridays, Eids & Galas",
    timeOfDay: "الصباح بعد الفجر، استقبال الضيوف والمساء",
    timeOfDayEn: "Dawn, Welcoming Guests & Evening Gatherings",
    description: "انقل منزلك ومجلسك إلى أجواء القصور الملكية مع كرم الضيافة العربية الأصيلة. يُصنع بخور أطياب الملكي يدوياً من أجود رقائق العود الطبيعي المعتق، المنقوعة لأشهر في دهن الورد الطائفي الصافي والعنبر السائل ودهن العود. يحترق بنقاء فائق على الفحم أو المباخر الكهربائية ليعم المكان بالسكينة والدفء.",
    descriptionEn: "Infuse your home and majlis with the atmosphere of Arabian royal palaces and hospitality. Handcrafted from natural aged agarwood chips steeped in Taif rose attar, liquid golden amber, and Cambodian oud oil. Burns cleanly on charcoal or electronic burners to fill rooms with warmth and tranquility.",
    story: "توارثت عائلة أطياب سر خلطة الدخون الملكي منذ عقود؛ حيث تُختار رقائق عود آسام والمروكي الطبيعي وتُترك لتتشرب دهن العنبر والمسك والورد في جرار فخارية معتقة لتضمن احتراقاً متواصلاً بدون أي رائحة احتراق مزعجة.",
    storyEn: "The secret recipe for this royal dakhoon has been preserved for generations. Hand-selected Assam and Moroki agarwood chips soak in pure ambergris, musk, and Taif rose attar in aged clay jars to ensure clean, smoke-pure burning.",
    ritual: "ضع قرصاً صغيراً أو قطعة من الرقائق على جمرة هادئة ومغطاة بطبقة رماد خفيفة (أو على مبخرة كهربائية بدرجة حرارة 180°)، واستمتع بانتشار سحابة الدخون العطري في أرجاء البيت والمجلس.",
    ritualEn: "Place a small chip on mild charcoal covered with a thin layer of ash (or on an electronic burner at 180°C) to release smooth, long-lingering plumes.",
    accords: [
      { name: "رقائق خشب العود المروكي", nameEn: "Moroki Agarwood Chips", pct: 95, color: "#5D4037" },
      { name: "دهن الورد الطائفي الصافي", nameEn: "Taif Rose Attar", pct: 88, color: "#AD1457" },
      { name: "عنبر سائل ودهن عود", nameEn: "Liquid Amber & Oud Oil", pct: 84, color: "#C59B27" },
      { name: "زعفران ومسك الغزال", nameEn: "Saffron Water & Musk", pct: 76, color: "#E65100" },
      { name: "صندل وراتنجات مكرملة", nameEn: "Sandalwood Resins", pct: 70, color: "#8D6E63" }
    ],
    notes: {
      top: ["رذاذ زهري ندي منعش", "ماء الزعفران الصافي", "لمسات برغموت خفيفة لفتح العبير"],
      heart: ["خلاصة الورد الطائفي الجبلي", "راتنجات مكرملة فاخرة", "دهن العنبر السائل الذهبي"],
      base: ["رقائق عود مروكي وآسام طبيعي", "مسحوق خشب الصندل الصافي", "جوهر مسك الغزال الأصيل"]
    },
    notesEn: {
      top: ["Dewy Floral Mist", "Pure Saffron Water", "Light Bergamot Accents"],
      heart: ["Taif Mountain Rose Essence", "Caramelized Resins", "Liquid Golden Ambergris"],
      base: ["Natural Assam & Moroki Agarwood Chips", "Pure Sandalwood Powder", "Imperial Musk Accord"]
    },
    mood: ["ضيافة كريمة", "استقبال الضيوف", "أجواء يوم الجمعة", "سكينة وطمأنينة"],
    moodEn: ["Generous Hospitality", "Welcoming Guests", "Friday Blessings", "Tranquil Peace"],
    reviews: [
      {
        author: "أم محمد الشريف",
        authorEn: "Um Muhammad Al-Sharif",
        city: "مكة المكرمة",
        cityEn: "Makkah",
        rating: 5,
        date: "منذ أسبوع",
        dateEn: "1 week ago",
        title: "بخور يبيض الوجه عند الضيوف والريحة تجلس يومين",
        titleEn: "Honors your Majlis in Front of Guests, Scent Lasts 2 Days",
        comment: "ما شاء الله لا قوة إلا بالله، أحسن بخور جربته لمجلس الرجال وصالة البيت. ريحته هادية ومحبوبة وما تكتم الصدر، وتجلس بالكنب والستاير يومين كاملين. طلبت العلبة الكبيرة مباشرة.",
        commentEn: "The finest bakhoor for our home and majlis. Warm, non-irritating smoke that stays in curtains and furniture for two whole days."
      }
    ]
  },
  {
    id: "atyab-cream-oud-roses",
    slug: "cream-oud-roses",
    name: "كريم عود وورد الفاخر للجسم",
    englishName: "Atyab Oud & Roses Perfumed Body Cream",
    nameEn: "Atyab Oud & Roses Perfumed Body Cream",
    subtitle: "ترطيب مخملي فاخر بعبير دهن الورد الطائفي النقي وخشب العود",
    subtitleEn: "Velvety Rich Body Hydration Infused with Taif Rose & Precious Agarwood",
    category: "cream",
    family: "كريم معطر للجسم فائق النعومة والترطيب",
    familyEn: "Luxurious Perfumed Body Cream with 24H Silk Hydration",
    priceSAR: 35,
    originalPriceSAR: 50,
    isMinPrice: true,
    rating: 5.0,
    reviewsCount: 312,
    badge: "الأكثر مبيعاً",
    badgeEn: "Best Seller",
    badgeType: "popular",
    image: "assets/images/cream_oud_roses.jpg",
    gallery: [
      {
        src: "assets/images/cream_oud_roses.jpg",
        titleAr: "مرطبان كريم عود وورد الملكي",
        titleEn: "Royal Oud & Roses Cream Jar",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["عبوة 50 جم (إصدار حقيبة اليد)", "مرطبان 150 جم (الحجم الملكي)", "صندوق الدلال 250 جم + ملعقة ذهبية"],
    sizesEn: ["50g Jar (Handbag Edition)", "150g Jar (Royal Size)", "Indulgence Set 250g + Gold Spatula"],
    defaultSize: "مرطبان 150 جم (الحجم الملكي)",
    defaultSizeEn: "150g Jar (Royal Size)",
    sizeVariants: [
      {
        size: "عبوة 50 جم (إصدار حقيبة اليد)",
        sizeEn: "50g Jar (Handbag Edition)",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "28%",
        sku: "AYT-CRM-OR-50",
        stockNoteAr: "متوفر بالمستودع - شحن فوري",
        stockNoteEn: "In Stock - Express Dispatch",
        isPopular: false
      },
      {
        size: "مرطبان 150 جم (الحجم الملكي)",
        sizeEn: "150g Jar (Royal Size)",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "30%",
        sku: "AYT-CRM-OR-150",
        stockNoteAr: "الأكثر طلباً بالمملكة",
        stockNoteEn: "Most Popular in KSA",
        isPopular: true
      },
      {
        size: "صندوق الدلال 250 جم + ملعقة ذهبية",
        sizeEn: "Indulgence Set 250g + Gold Spatula",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "27%",
        sku: "AYT-CRM-OR-250",
        stockNoteAr: "إصدار هدايا فاخر",
        stockNoteEn: "Luxury Gift Edition",
        isPopular: false
      }
    ],
    concentration: "كريم حريري مركز فائق النعومة والترطيب 24 ساعة",
    concentrationEn: "Intense Silk Cream with 24-Hour Deep Hydration",
    gender: "للجنسين / عناية ملكية",
    genderEn: "Unisex / Royal Body Care",
    longevity: "تستمر الرائحة على البشرة لأكثر من 24 ساعة",
    longevityEn: "Fragrance clings to skin for over 24 Hours",
    sillage: "فوحان مخملي ناعم وأنيق يحيط بالجسم",
    sillageEn: "Soft Velvet Radiance & Elegant Aura",
    season: "مثالي لجميع الفصول، بعد الاستحمام وقبل النوم",
    seasonEn: "Ideal for All Seasons, Post-Shower & Evenings",
    timeOfDay: "الصباح والمساء وكل لحظة دلال",
    timeOfDayEn: "Morning & Night",
    description: "انغمسي في تجربة ترطيب ملكية استثنائية. يجمع كريم عود وورد بين زبدة الشيا النقية وزيت اللوز الحلو مع قطرات الورد الطائفي النادر ونفحات العود المعتق الناعم. يذوب فور ملامسته للجلد دون أي ملمس دهني، ليمنحك نعومة الحرير وفوحاناً راقياً يرافقك طوال اليوم.",
    descriptionEn: "Surrender to an extraordinary royal hydration ritual. Oud & Roses Cream harmonizes pure shea butter, sweet almond oil, and dew-kissed Taif rose nectar with a whisper of vintage agarwood. It melts instantaneously into the skin with zero greasiness, leaving a velvety silk finish and an enduring royal sillage.",
    story: "ابتكر خبراء أطياب هذا الكريم المعطر ليكون الامتداد المثالي لعطر عود وورد الأيقوني؛ حيث يعمل الكريم كطبقة أساسية مغذية للبشرة تضاعف ثبات وفوحان العطر لساعات طويلة.",
    storyEn: "Crafted by Atyab artisans to serve as the ultimate foundation for the iconic Oud & Roses fragrance, locking in moisture and intensifying your personal scent trail all day.",
    ritual: "دلكي كمية سخية بحركات دائرية على بشرة نظيفة بعد الاستحمام، خاصة عند مواضع النبض والرقبة واليدين. للحصول على أقصى فوحان، رشي عطر عود وورد فوقه مباشرة.",
    ritualEn: "Massage gently onto clean skin post-shower, focusing on pulse points, neck, and hands. Layer with Oud & Roses Eau De Parfum for legendary sillage.",
    accords: [
      { name: "ورد طائفي ملكي ندي", nameEn: "Dewy Taif Rose", pct: 94, color: "#C2185B" },
      { name: "عود ناعم معتق", nameEn: "Soft Vintage Oud", pct: 86, color: "#8C6220" },
      { name: "عنبر بلوري نقي", nameEn: "Crystal Amber", pct: 80, color: "#C59B27" },
      { name: "مسك الحرير الأبيض", nameEn: "White Silk Musk", pct: 88, color: "#E0E0E0" }
    ],
    notes: {
      top: ["بتلات الورد الطائفي الندي", "رشة ليمون صقلي خفيف"],
      heart: ["خلاصة الورد الجوري والياسمين", "عنبر أبيض دافئ"],
      base: ["خشب العود الخفيف", "مسك أبيض مخملي", "فانيليا مدغشقر"]
    },
    notesEn: {
      top: ["Dewy Taif Rose Petals", "Sicilian Lemon Sparkle"],
      heart: ["Damascena Rose Nectar", "Warm White Amber"],
      base: ["Whispering Agarwood", "Velvet Silk Musk", "Madagascar Vanilla"]
    },
    mood: ["دلال يومي", "نعومة الحرير", "بعد الاستحمام", "رومانسية راقية"],
    moodEn: ["Daily Pampering", "Silk Softness", "Post-Bath Ritual", "Romantic Elegance"],
    reviews: [
      {
        author: "نورة العتيبي",
        authorEn: "Noura Al-Otaibi",
        city: "الرياض",
        cityEn: "Riyadh",
        rating: 5,
        date: "منذ 4 أيام",
        dateEn: "4 days ago",
        title: "أفضل كريم جسم جربته بحياتي! ترطيب وثبات يجنن",
        titleEn: "The Best Body Cream Ever! Unreal Hydration & Sillage",
        comment: "ريحته ورد وعود بارد ناعم يجنن وما يدبق أبداً على الجسم، والريحة تظل بالبيجاما والسرير يومين! أخذت الحجم الكبير وأكيد بكرر الطلب.",
        commentEn: "Soft cool rose and delicate oud. Never greasy, absorbs instantly, and the scent stays on fabrics for 2 days! Ordered the big jar."
      }
    ]
  },
  {
    id: "atyab-cream-bin-shaikh",
    slug: "cream-bin-shaikh",
    name: "كريم بن شيخ المخملي للجسم",
    englishName: "Atyab Bin Shaikh Velvet Body Cream",
    nameEn: "Atyab Bin Shaikh Velvet Body Cream",
    subtitle: "زبدة ترطيب غنية بعبير دهن العود المعتق، البخور، والزعفران الملكي",
    subtitleEn: "Rich Nourishing Butter Infused with Aged Oud, Incense & Royal Saffron",
    category: "cream",
    family: "زبدة ترطيب شرقية مكثفة",
    familyEn: "Intense Oriental Body Butter with Lasting Sillage",
    priceSAR: 38,
    originalPriceSAR: 55,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 248,
    badge: "هيبة وفخامة",
    badgeEn: "Royal Presence",
    badgeType: "royal",
    image: "assets/images/cream_bin_shaikh.jpg",
    gallery: [
      {
        src: "assets/images/cream_bin_shaikh.jpg",
        titleAr: "مرطبان بن شيخ الذهبي الملكي",
        titleEn: "Royal Bin Shaikh Cream Jar",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["عبوة 50 جم (عملية وسريعة)", "مرطبان 150 جم (الحجم الملكي)", "صندوق الملوك 250 جم"],
    sizesEn: ["50g Jar (Travel Size)", "150g Jar (Royal Size)", "Kings Set 250g"],
    defaultSize: "مرطبان 150 جم (الحجم الملكي)",
    defaultSizeEn: "150g Jar (Royal Size)",
    sizeVariants: [
      {
        size: "عبوة 50 جم (عملية وسريعة)",
        sizeEn: "50g Jar (Travel Size)",
        priceSAR: 38,
        originalPriceSAR: 55,
        savePercent: "30%",
        sku: "AYT-CRM-BS-50",
        stockNoteAr: "متوفر بالمستودع",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "مرطبان 150 جم (الحجم الملكي)",
        sizeEn: "150g Jar (Royal Size)",
        priceSAR: 38,
        originalPriceSAR: 55,
        savePercent: "31%",
        sku: "AYT-CRM-BS-150",
        stockNoteAr: "الأكثر طلباً للرجال والنساء",
        stockNoteEn: "Top Rated Unisex Luxury",
        isPopular: true
      },
      {
        size: "صندوق الملوك 250 جم",
        sizeEn: "Kings Set 250g",
        priceSAR: 38,
        originalPriceSAR: 55,
        savePercent: "30%",
        sku: "AYT-CRM-BS-250",
        stockNoteAr: "كمية محدودة",
        stockNoteEn: "Limited VIP Stock",
        isPopular: false
      }
    ],
    concentration: "زبدة ترطيب مكثفة بالزيوت الشرقية المعتقة",
    concentrationEn: "Intensive Body Butter Infused with Vintage Oriental Oils",
    gender: "للجنسين / هيبة وفخامة",
    genderEn: "Unisex / Commanding Prestige",
    longevity: "ثبات عميق يتجاوز 24 ساعة",
    longevityEn: "24+ Hours Deep Lasting Power",
    sillage: "أثر مهيب غني برائحة البخور والعود",
    sillageEn: "Commanding Aura of Bakhoor & Aged Agarwood",
    season: "الخريف، الشتاء والمناسبات الرسمية",
    seasonEn: "Autumn, Winter & Formal Evenings",
    timeOfDay: "المساء والأمسيات الفاخرة",
    timeOfDayEn: "Evenings & Special Gatherings",
    description: "رمز الفخامة والوقار. كريم بن شيخ للجسم يجمع بين القوة والدلال؛ صُمم بتركيبة غنية بزبدة الكاكاو والزيوت العطرية النقية لدهن العود والزعفران والبخور الفاخر ليمد الجلد بتغذية عميقة وفوحان يفرض حضوره في أرقى المجالس.",
    descriptionEn: "The pinnacle of prestige. Bin Shaikh Velvet Cream marries deep nourishment with commanding luxury. Infused with pure cocoa butter, vintage Indian oud oils, saffron, and royal bakhoor, it deeply conditions the skin while releasing an opulent oriental aura.",
    story: "صيغ كريم بن شيخ خصيصاً لأصحاب الشخصيات القيادية الذين يبحثون عن تميز متكامل في إطلالتهم وعنايتهم اليومية.",
    storyEn: "Engineered specifically for distinguished leaders who demand uncompromised excellence in grooming and fragrance layering.",
    ritual: "وزع كمية مناسبة على الصدر والذراعين والمعصمين لتهيئة البشرة قبل رش عطر بن شيخ الرسمي.",
    ritualEn: "Apply across chest, arms, and pulse points to lock in moisture before spraying Bin Shaikh Eau De Parfum.",
    accords: [
      { name: "دهن عود هندي أصيل", nameEn: "Pure Indian Oud Oil", pct: 95, color: "#5C3A21" },
      { name: "زعفران قائنات أحمر", nameEn: "Persian Saffron", pct: 88, color: "#C59B27" },
      { name: "بخور مروكي مدخن", nameEn: "Smoked Moroki Bakhoor", pct: 84, color: "#3A2E2B" },
      { name: "عنبر ملكي دافئ", nameEn: "Warm Royal Amber", pct: 78, color: "#8C6220" }
    ],
    notes: {
      top: ["زعفران ملكي أحمر", "هيل أخضر مطحون"],
      heart: ["بخور أطياب المدخن", "لابدانوم صمغي"],
      base: ["دهن عود هندي معتق", "عنبر دافئ", "أخشاب الصندل"]
    },
    notesEn: {
      top: ["Royal Red Saffron", "Crushed Green Cardamom"],
      heart: ["Smoked Atyab Incense", "Warm Labdanum"],
      base: ["Vintage Indian Agarwood", "Warm Amber", "Mysore Sandalwood"]
    },
    mood: ["هيبة ووقار", "مناسبات رسمية", "ثبات أسطوري"],
    moodEn: ["Regal Authority", "Formal Galas", "Legendary Sillage"],
    reviews: [
      {
        author: "عبدالله بن تركي السديري",
        authorEn: "Abdullah Al-Sudairy",
        city: "جدة",
        cityEn: "Jeddah",
        rating: 5,
        date: "منذ أسبوع",
        dateEn: "1 week ago",
        title: "فخامة لا توصف.. كريم بن شيخ مع العطر ثبات خيالي",
        titleEn: "Unrivaled Luxury.. The Cream + Perfume Combo is Incredible",
        comment: "الكريم فاخر جداً والعلبة ثقيلة ومذهبة. أحطه قبل لبس الثوب، ريحته عود راقي وبخور وتجلس ثابتة كل اليوم.",
        commentEn: "Extremely luxurious and the golden jar is heavy and beautiful. I apply it before putting on my thobe; the scent is pure high-end oud and stays all day."
      }
    ]
  },
  {
    id: "atyab-cream-musk-silk",
    slug: "cream-musk-silk",
    name: "كريم مسك الحرير المخفوق للجسم",
    englishName: "Atyab Musk Silk Whipped Body Cream",
    nameEn: "Atyab Musk Silk Whipped Body Cream",
    subtitle: "قوام سحابي فائق النعومة بعبير المسك الأبيض النقي وزهر القطن والياسمين",
    subtitleEn: "Cloud-light Whipped Body Soufflé with Pure White Musk & Cashmere Blossoms",
    category: "cream",
    family: "كريم مسك بودري ناعم فائق الامتصاص",
    familyEn: "Powdery Clean Cotton Musk Soufflé",
    priceSAR: 32,
    originalPriceSAR: 48,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 276,
    badge: "نعومة فائقة",
    badgeEn: "Ultra Silk Soft",
    badgeType: "popular",
    image: "assets/images/cream_musk_silk.jpg",
    gallery: [
      {
        src: "assets/images/cream_musk_silk.jpg",
        titleAr: "مرطبان مسك الحرير اللؤلؤي",
        titleEn: "Pearlescent Musk Silk Jar",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["عبوة 50 جم", "مرطبان 150 جم (الأكثر طلباً)", "مرطبان 200 جم عائلي"],
    sizesEn: ["50g Jar", "150g Jar (Most Popular)", "200g Family Jar"],
    defaultSize: "مرطبان 150 جم (الأكثر طلباً)",
    defaultSizeEn: "150g Jar (Most Popular)",
    sizeVariants: [
      {
        size: "عبوة 50 جم",
        sizeEn: "50g Jar",
        priceSAR: 32,
        originalPriceSAR: 48,
        savePercent: "37%",
        sku: "AYT-CRM-MS-50",
        stockNoteAr: "متوفر",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "مرطبان 150 جم (الأكثر طلباً)",
        sizeEn: "150g Jar (Most Popular)",
        priceSAR: 32,
        originalPriceSAR: 48,
        savePercent: "33%",
        sku: "AYT-CRM-MS-150",
        stockNoteAr: "الأكثر طلباً - انتعاش يومي",
        stockNoteEn: "Top Rated Daily Freshness",
        isPopular: true
      },
      {
        size: "مرطبان 200 جم عائلي",
        sizeEn: "200g Family Jar",
        priceSAR: 32,
        originalPriceSAR: 48,
        savePercent: "30%",
        sku: "AYT-CRM-MS-200",
        stockNoteAr: "حجم توفيري",
        stockNoteEn: "Value Size",
        isPopular: false
      }
    ],
    concentration: "سوفليه مسك مخفوق فائق الامتصاص",
    concentrationEn: "Ultra-Light Whipped Musk Soufflé",
    gender: "للجنسين والنساء",
    genderEn: "Unisex & Women",
    longevity: "18+ ساعة من النظافة والانتعاش",
    longevityEn: "18+ Hours Clean Crisp Freshness",
    sillage: "هالة ناعمة من النقاء والبودر",
    sillageEn: "Soft Powdery Clean Aura",
    season: "كافة الفصول والطقس الحار",
    seasonEn: "All Seasons & Warm Climates",
    timeOfDay: "الصباح وبعد الاستحمام",
    timeOfDayEn: "Morning & Post-Bath Routine",
    description: "كريم مسك الحرير يجسد النقاء المطلق. قوامه المخفوق كالسحاب ينساب على بشرتك برقة متناهية ليمنحك شعوراً فورياً بالانتعاش والنظافة مع عبير المسك الأبيض البودري وزهر القطن والياسمين الدمشقي.",
    descriptionEn: "The epitome of pure tranquility. Musk Silk Whipped Cream glides onto the skin like a weightless cloud, instantly infusing it with cooling moisture and the crisp, soothing embrace of powdery white musk, cotton blossoms, and clean dewy petals.",
    story: "صُمم لمحبي العطور النقية والنظيفة، وهو المستحضر المفضل للاستخدام اليومي بعد حمام الصباح.",
    storyEn: "Formulated for lovers of clean, pristine scent profiles; the quintessential morning indulgence.",
    ritual: "يدهن على الجسم بأكمله بعد الاستحمام مباشرة بينما الجلد رطب لحبس الرطوبة.",
    ritualEn: "Smooth over entire body immediately following a warm bath to seal in lasting hydration.",
    accords: [
      { name: "مسك أبيض بودري نقي", nameEn: "Powdery White Musk", pct: 96, color: "#E0E0E0" },
      { name: "زهر القطن والكتان", nameEn: "Cotton Blossom & Linen", pct: 88, color: "#F5F5F5" },
      { name: "ياسمين ندي هادئ", nameEn: "Dewy White Jasmine", pct: 80, color: "#FFF9C4" },
      { name: "فانيليا حليبية خفيفة", nameEn: "Milky Vanilla", pct: 74, color: "#FFFDE7" }
    ],
    notes: {
      top: ["المسك الأبيض النقي", "زهر القطن"],
      heart: ["ياسمين فرنسي أبيض", "زنبق الوادي"],
      base: ["بودرة المسك الناعمة", "خشب الأرز الأبيض"]
    },
    notesEn: {
      top: ["Pristine White Musk", "Cotton Blossoms"],
      heart: ["French White Jasmine", "Lily of the Valley"],
      base: ["Velvet Musk Powder", "White Cedar"]
    },
    mood: ["نظافة وانتعاش", "استرخاء وهدوء", "عناية يومية"],
    moodEn: ["Clean Freshness", "Relaxation", "Daily Radiance"],
    reviews: [
      {
        author: "سارة الشمري",
        authorEn: "Sarah Al-Shammari",
        city: "حائل",
        cityEn: "Hail",
        rating: 5,
        date: "منذ 3 أيام",
        dateEn: "3 days ago",
        title: "ريحة نظافة تجيب السعادة وتريح الأعصاب",
        titleEn: "Scent of Pure Cleanliness and Peace",
        comment: "قوامه رهيب وخفيف جداً ويتشربه الجلد بثواني، والريحة مسك بودرة نظيف يفتح النفس. مستحيل أستغني عنه بعد الشاور.",
        commentEn: "The texture is heavenly and absorbs in seconds. Pure clean powdery musk that lifts your mood. Indispensable after a shower."
      }
    ]
  },
  {
    id: "atyab-cream-marj",
    slug: "cream-marj",
    name: "كريم مرج المرطب الفاخر للجسم",
    englishName: "Atyab Marj Golden Body Hydrating Cream",
    nameEn: "Atyab Marj Golden Body Hydrating Cream",
    subtitle: "انتعاش الفواكه الملكية والزهور المخملية مع لمسة ذهبية مرطبة للبشرة",
    subtitleEn: "Vibrant Exotic Fruits & Velvet Florals with Radiant Golden Glow",
    category: "cream",
    family: "كريم مرطب ومنعش بلمعان مخملي",
    familyEn: "Hydrating Velvet Body Cream with Subtle Glow",
    priceSAR: 36,
    originalPriceSAR: 52,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 198,
    badge: "إشراقة ذهبية",
    badgeEn: "Radiant Glow",
    badgeType: "popular",
    image: "assets/images/cream_marj_gold.jpg",
    gallery: [
      {
        src: "assets/images/cream_marj_gold.jpg",
        titleAr: "مرطبان كريم مرج الزمردي والمذهب",
        titleEn: "Emerald & Gold Marj Cream Jar",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["عبوة 50 جم", "مرطبان 150 جم", "صندوق إهداء 250 جم"],
    sizesEn: ["50g Jar", "150g Jar", "Gift Box 250g"],
    defaultSize: "مرطبان 150 جم",
    defaultSizeEn: "150g Jar",
    sizeVariants: [
      {
        size: "عبوة 50 جم",
        sizeEn: "50g Jar",
        priceSAR: 36,
        originalPriceSAR: 52,
        savePercent: "31%",
        sku: "AYT-CRM-MJ-50",
        stockNoteAr: "متوفر",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "مرطبان 150 جم",
        sizeEn: "150g Jar",
        priceSAR: 36,
        originalPriceSAR: 52,
        savePercent: "30%",
        sku: "AYT-CRM-MJ-150",
        stockNoteAr: "متوفر بالمستودع",
        stockNoteEn: "In Stock - Fast Dispatch",
        isPopular: true
      },
      {
        size: "صندوق إهداء 250 جم",
        sizeEn: "Gift Box 250g",
        priceSAR: 36,
        originalPriceSAR: 52,
        savePercent: "27%",
        sku: "AYT-CRM-MJ-250",
        stockNoteAr: "إصدار هدايا",
        stockNoteEn: "Gift Edition",
        isPopular: false
      }
    ],
    concentration: "كريم مرطب غني بالجلسرين والزيوت العطرية",
    concentrationEn: "Rich Hydrating Cream with Glycerin & Essential Oils",
    gender: "للجنسين / إشراقة شبابية",
    genderEn: "Unisex / Radiant Youthfulness",
    longevity: "20+ ساعة من الانتعاش والترطيب",
    longevityEn: "20+ Hours Hydration & Radiance",
    sillage: "فوحان زهري فاكهي جذاب ومبهج",
    sillageEn: "Alluring Fruity Floral Radiance",
    season: "الربيع والصيف وكافة الأوقات",
    seasonEn: "Spring, Summer & All Occasions",
    timeOfDay: "النهار والمساء",
    timeOfDayEn: "Day & Evening",
    description: "بهجة الحياة وإشراقة الطبيعة. كريم مرج يمنح بشرتك ترطيباً مكثفاً ولمعاناً صحياً جذاباً بفضل تركيبته الحريرية الغنية برائحة الزعفران والتوت البري والزهور الدمشقية مع قاعدة ناعمة من خشب الصندل والعنبر.",
    descriptionEn: "Joyous vibrance for radiant skin. Marj Hydrating Body Cream drenches your body in supple moisture, infusing every contour with red berries, pink blossoms, saffron, and a glowing foundation of golden sandalwood and amber.",
    story: "تم استلهام كريم مرج من البساتين الملكية المزهرة ليمنح المرأة والرجل إحساساً بالحيوية والجاذبية طوال النهار.",
    storyEn: "Inspired by blooming royal gardens, Marj was forged to instill boundless vitality and allure.",
    ritual: "وزعيه بسخاء على الذراعين والكتفين والساقين لترطيب عميق ومظهر متوهج.",
    ritualEn: "Apply generously over arms, shoulders, and legs for deep moisture and a healthy glow.",
    accords: [
      { name: "توت بري وفاكهة حمراء", nameEn: "Wild Red Berries", pct: 92, color: "#AD1457" },
      { name: "زعفران وزهور مخملية", nameEn: "Saffron & Velvet Flora", pct: 86, color: "#C59B27" },
      { name: "عنبر ذهبي وصندل", nameEn: "Golden Amber & Sandalwood", pct: 80, color: "#8C6220" }
    ],
    notes: {
      top: ["توت بري", "برغموت منعش", "زعفران"],
      heart: ["ورد دمشقي", "ياسمين", "فلفل وردي"],
      base: ["خشب الصندل", "عنبر ذهبي", "مسك ناعم"]
    },
    notesEn: {
      top: ["Wild Berries", "Zesty Bergamot", "Saffron"],
      heart: ["Damask Rose", "Jasmine", "Pink Pepper"],
      base: ["Sandalwood", "Golden Amber", "Soft Musk"]
    },
    mood: ["حيوية وجاذبية", "انتعاش فاكهي", "تألق وإشراق"],
    moodEn: ["Vibrant Allure", "Fruity Freshness", "Luminous Radiance"],
    reviews: [
      {
        author: "ريما خالد",
        authorEn: "Rima Khalid",
        city: "الخبر",
        cityEn: "Khobar",
        rating: 5,
        date: "منذ 5 أيام",
        dateEn: "5 days ago",
        title: "ترطيب رهيب والريحة فواحة جداً",
        titleEn: "Incredible Hydration & Scent That Fills the Room",
        comment: "كريم مرج فظيع! ريحته فواكه مع لمسة عطرية فاخرة تدوم طوال اليوم بدون ما يدبق، والعلبة شكلها يجنن على التسريحة.",
        commentEn: "Marj cream is fantastic! Delicious fruits with an ultra-luxurious perfume undertone that lasts all day without stickiness."
      }
    ]
  },
  {
    id: "atyab-marj",
    slug: "marj",
    name: "عطر أطياب مرج الملكي",
    englishName: "Atyab Marj Royal Perfume",
    nameEn: "Atyab Marj Royal Perfume",
    subtitle: "تناغم ساحر بين الزعفران والتوت البري مع قلب الورد والعود المدخن",
    subtitleEn: "Harmonious Blend of Saffron, Wild Berries, Rose & Smoked Agarwood",
    category: "perfumes",
    family: "شرقي فاكهي خشبي أسطوري",
    familyEn: "Legendary Fruity Woody Oriental",
    priceSAR: 45,
    originalPriceSAR: 65,
    isMinPrice: true,
    rating: 5.0,
    reviewsCount: 388,
    badge: "محبوب الملايين",
    badgeEn: "Adored by Millions",
    badgeType: "royal",
    image: "assets/images/marj.jpg",
    gallery: [
      {
        src: "assets/images/marj.jpg",
        titleAr: "الواجهة الرسمية لعطر مرج",
        titleEn: "Official Marj Bottle Front View",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["قارورة 50 مل", "قارورة 100 مل (الحجم الرسمي)", "طقم الملوك 100 مل + لوشن معطر"],
    sizesEn: ["50ml Bottle", "100ml Bottle (Official)", "Kings Set 100ml + Scented Lotion"],
    defaultSize: "قارورة 100 مل (الحجم الرسمي)",
    defaultSizeEn: "100ml Bottle (Official)",
    sizeVariants: [
      {
        size: "قارورة 50 مل",
        sizeEn: "50ml Bottle",
        priceSAR: 45,
        originalPriceSAR: 65,
        savePercent: "33%",
        sku: "AYT-MRJ-50",
        stockNoteAr: "متوفر بالمستودع",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "قارورة 100 مل (الحجم الرسمي)",
        sizeEn: "100ml Bottle (Official)",
        priceSAR: 45,
        originalPriceSAR: 65,
        savePercent: "30%",
        sku: "AYT-MRJ-100",
        stockNoteAr: "الأكثر طلباً بالمملكة",
        stockNoteEn: "Top Seller Across KSA",
        isPopular: true
      },
      {
        size: "طقم الملوك 100 مل + لوشن معطر",
        sizeEn: "Kings Set 100ml + Scented Lotion",
        priceSAR: 45,
        originalPriceSAR: 65,
        savePercent: "30%",
        sku: "AYT-MRJ-SET",
        stockNoteAr: "صندوق إهداء",
        stockNoteEn: "Gift Box",
        isPopular: false
      }
    ],
    concentration: "أو دو بارفان رويال مكثف",
    concentrationEn: "Eau De Parfum Royal Intense",
    gender: "للجنسين / جاذبية استثنائية",
    genderEn: "Unisex / Exceptional Magnetic Allure",
    longevity: "20+ ساعة من الثبات الأسطوري",
    longevityEn: "20+ Hours Legendary Sillage",
    sillage: "فوحان ينتشر في أرجاء المكان فور حضورك",
    sillageEn: "Room-filling Luxurious Presence",
    season: "كافة الفصول والمناسبات الكبرى",
    seasonEn: "All Seasons & Grand Events",
    timeOfDay: "المساء والصباح",
    timeOfDayEn: "Day & Evening",
    description: "العطر الأكثر تميزاً وجاذبية في التشكيلة الملكية. يبدأ باشتعال منعش من البرغموت والتوت البري مع لمسة الزعفران الفاخر، ليتعمق سريعاً في قلب من الورد الجوري والياسمين وخشب العود المدخن، مع قاعدة من العنبر الدافئ والمسك والجلد المدبوغ.",
    descriptionEn: "The crowning glory of oriental perfumery. Marj captivates instantly with vibrant bergamot, crimson wild berries, and saffron, surging into an opulent heart of Damask rose, jasmine, and smoked agarwood, anchored by ambergris, leather, and royal musk.",
    story: "صُمم عطر مرج ليكون التوقيع العطري الذي لا ينسى، حيث يجمع بين عذوبة الفواكه وجبروت العود في تركيبة متجانسة بامتياز.",
    storyEn: "Engineered to deliver an indelible impression, weaving together sweet berry freshness with the majestic weight of agarwood.",
    ritual: "رشتان عند ياقة العنق والمعصمين كافيتان لفرض هيبتك وجاذبيتك طوال اليوم.",
    ritualEn: "Two sprays at collar and cuffs suffice for enduring prestige.",
    accords: [
      { name: "عود مدخن معتق", nameEn: "Smoked Vintage Oud", pct: 92, color: "#8C6220" },
      { name: "توت بري وزعفران", nameEn: "Wild Berries & Saffron", pct: 88, color: "#AD1457" },
      { name: "عنبر ملكي دافئ", nameEn: "Warm Ambergris", pct: 82, color: "#C59B27" },
      { name: "جلود ناعمة فاخرة", nameEn: "Fine Leather", pct: 75, color: "#5C3A21" }
    ],
    notes: {
      top: ["زعفران أحمر", "توت بري", "برغموت"],
      heart: ["ورد جوري مخملي", "عود كمبودي", "لابدانوم"],
      base: ["عنبر ملكي", "مسك أسود", "خشب الصندل", "جلد مدبوغ"]
    },
    notesEn: {
      top: ["Red Saffron", "Wild Berries", "Bergamot"],
      heart: ["Velvet Damask Rose", "Cambodian Oud", "Labdanum"],
      base: ["Royal Ambergris", "Black Musk", "Sandalwood", "Tanned Leather"]
    },
    mood: ["حضور طاغٍ", "مناسبات ملكية", "ثبات لا يضاهى"],
    moodEn: ["Commanding Stature", "Royal Gala", "Unmatched Longevity"],
    reviews: [
      {
        author: "فيصل الشريف",
        authorEn: "Faisal Al-Sharif",
        city: "الطائف",
        cityEn: "Taif",
        rating: 5,
        date: "منذ أسبوع",
        dateEn: "1 week ago",
        title: "عطر خيالي بكل ما تعنيه الكلمة.. ثابت لليوم الثاني",
        titleEn: "Mindblowing Scent.. Still Projecting on Day Two",
        comment: "عطر مرج أفضل عطر شريته في آخر 5 سنوات. فوحانه عالي جداً وثابت على المشلح يومين كاملين.",
        commentEn: "Marj is the finest fragrance I purchased in the last 5 years. Massive projection and stayed on my cloak for two days."
      }
    ]
  },
  {
    id: "atyab-bin-shaikh",
    slug: "bin-shaikh",
    name: "عطر أطياب بن شيخ الأسطوري",
    englishName: "Atyab Bin Shaikh Signature Perfume",
    nameEn: "Atyab Bin Shaikh Signature Perfume",
    subtitle: "رمز الهيبة والوقار الخليجي: مزيج دهن العود الهندي، البخور الملكي، والزعفران",
    subtitleEn: "Iconic Arabian Authority: Pure Indian Oud, Royal Bakhoor & Persian Saffron",
    category: "perfumes",
    family: "عود شرقي حار مكثف",
    familyEn: "Intense Oriental Spicy Agarwood",
    priceSAR: 48,
    originalPriceSAR: 70,
    isMinPrice: true,
    rating: 5.0,
    reviewsCount: 420,
    badge: "توقيع الملوك",
    badgeEn: "Kings Signature",
    badgeType: "royal",
    image: "assets/images/bin_shaikh.jpg",
    gallery: [
      {
        src: "assets/images/bin_shaikh.jpg",
        titleAr: "الواجهة الرسمية لعطر بن شيخ",
        titleEn: "Official Bin Shaikh Bottle Front View",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["قارورة 50 مل", "قارورة 100 مل (الحجم الرسمي)", "صندوق بن شيخ الفاخر + تولة دهن عود"],
    sizesEn: ["50ml Bottle", "100ml Bottle (Official)", "Bin Shaikh VIP Box + Oud Oil"],
    defaultSize: "قارورة 100 مل (الحجم الرسمي)",
    defaultSizeEn: "100ml Bottle (Official)",
    sizeVariants: [
      {
        size: "قارورة 50 مل",
        sizeEn: "50ml Bottle",
        priceSAR: 48,
        originalPriceSAR: 70,
        savePercent: "32%",
        sku: "AYT-BS-50",
        stockNoteAr: "متوفر",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "قارورة 100 مل (الحجم الرسمي)",
        sizeEn: "100ml Bottle (Official)",
        priceSAR: 48,
        originalPriceSAR: 70,
        savePercent: "31%",
        sku: "AYT-BS-100",
        stockNoteAr: "أعلى تقييم بالمملكة",
        stockNoteEn: "Highest Rated in KSA",
        isPopular: true
      },
      {
        size: "صندوق بن شيخ الفاخر + تولة دهن عود",
        sizeEn: "Bin Shaikh VIP Box + Oud Oil",
        priceSAR: 48,
        originalPriceSAR: 70,
        savePercent: "29%",
        sku: "AYT-BS-VIP",
        stockNoteAr: "صندوق مخملي فاخر",
        stockNoteEn: "Luxury Velvet Presentation",
        isPopular: false
      }
    ],
    concentration: "أو دو بارفان رويال إنتنس",
    concentrationEn: "Eau De Parfum Royal Intense",
    gender: "للجنسين / هيبة الملوك",
    genderEn: "Unisex / Majestic Stature",
    longevity: "24+ ساعة ثبات هائل على الأقمشة",
    longevityEn: "24+ Hours Immense Sillage",
    sillage: "أثر ملكي عميق يملأ القاعات والمجالس",
    sillageEn: "Room-Commanding Royal Aura",
    season: "الخريف، الشتاء والمناسبات الكبرى",
    seasonEn: "Autumn, Winter & Grand Galas",
    timeOfDay: "المساء",
    timeOfDayEn: "Evenings",
    description: "عطر بن شيخ هو التجسيد الحقيقي للشهامة والرجولة والأصالة الخليجية. يفتتح بعبير الزعفران وقشر الليمون وجوزة الطيب، ليتألق في قلبه عبير البخور والدخون والورد الطائفي، مستقراً على قاعدة خالدة من دهن العود الهندي المعتق وخشب الصندل والعنبر والمسك.",
    descriptionEn: "The undisputed monarch of Gulf fragrance majesty. Igniting with Persian saffron, cracked nutmeg, and citrus zest, flowing intoTaif rose and royal bakhoor smoke, grounded upon ancient Indian agarwood, ambergris, and patchouli.",
    story: "توليفة متوارثة تم تطويرها لتعكس هيبة الشيوخ والأعيان في مناسباتهم الرسمية وحفلات الاستقبال الكبرى.",
    storyEn: "A legacy blend crafted to honor nobility, commanding deference at state dinners and grand celebrations.",
    ritual: "يُرش على المشلح أو الثوب بعد تبخيره بالدخون الملكي لأرقى تناغم عِطري خليجي.",
    ritualEn: "Spray over garments pre-scented with Royal Dakhoon for the zenith of Gulf fragrance layering.",
    accords: [
      { name: "دهن عود هندي أصيل", nameEn: "Aged Indian Oud", pct: 96, color: "#5C3A21" },
      { name: "زعفران قائنات أحمر", nameEn: "Persian Saffron", pct: 90, color: "#B9621E" },
      { name: "بخور ودخان الأخشاب", nameEn: "Majlis Incense Smoke", pct: 86, color: "#3A2E2B" },
      { name: "عنبر ملكي دافئ", nameEn: "Warm Royal Amber", pct: 80, color: "#C59B27" }
    ],
    notes: {
      top: ["زعفران قائنات", "قشر الليمون", "جوزة الطيب"],
      heart: ["بخور ملكي", "ورد طائفي", "لابدانوم"],
      base: ["دهن عود هندي", "عنبر رمادي", "خشب الصندل", "مسك"]
    },
    notesEn: {
      top: ["Persian Saffron", "Lemon Zest", "Nutmeg"],
      heart: ["Royal Incense Smoke", "Taif Rose", "Labdanum"],
      base: ["Indian Oud Oil", "Grey Ambergris", "Sandalwood", "Musk"]
    },
    mood: ["هيبة ووقار", "حفلات الزفاف", "مجالس الشيوخ"],
    moodEn: ["Majestic Dignity", "Weddings", "Royal Majlis"],
    reviews: [
      {
        author: "سعد بن ناصر الدوسري",
        authorEn: "Saad Al-Dossary",
        city: "الرياض",
        cityEn: "Riyadh",
        rating: 5,
        date: "منذ أسبوعين",
        dateEn: "2 weeks ago",
        title: "عطر الهيبة الأول بلا منازع.. يبيض الوجه",
        titleEn: "The Undisputed King of Prestige",
        comment: "بن شيخ عطر ما يحتاج مدح، معروف عند أهل الذوق. ثباته خرافي ورائحته تدل على راعيها. ممتاز جداً جداً.",
        commentEn: "Bin Shaikh requires no introduction. Legendary longevity and unmistakable authority. Highly recommended."
      }
    ]
  },
  {
    id: "atyab-oud-roses",
    slug: "oud-roses",
    name: "عطر أطياب عود وورد الفاخر",
    englishName: "Atyab Oud & Roses Eau De Parfum",
    nameEn: "Atyab Oud & Roses Eau De Parfum",
    subtitle: "الأكثر شهرة: ثنائية الورد التركي والعود النقي مع لمسات العنبر والكراميل",
    subtitleEn: "Global Icon: Romantic Harmony of Turkish Rose, Pure Oud & Golden Caramel Amber",
    category: "perfumes",
    family: "زهري شرقي عود مخملي",
    familyEn: "Velvet Floral Oriental Oud",
    priceSAR: 45,
    originalPriceSAR: 65,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 395,
    badge: "الأكثر مبيعاً عالمياً",
    badgeEn: "Global Best Seller",
    badgeType: "popular",
    image: "assets/images/oud_roses.jpg",
    gallery: [
      {
        src: "assets/images/oud_roses.jpg",
        titleAr: "الواجهة الرسمية لزجاجة عود وورد",
        titleEn: "Official Oud & Roses Bottle",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["قارورة 50 مل", "قارورة 100 مل (الحجم الرسمي)", "صندوق عود وورد + لوشن + كريم"],
    sizesEn: ["50ml Bottle", "100ml Bottle (Official)", "Oud & Roses Indulgence Box"],
    defaultSize: "قارورة 100 مل (الحجم الرسمي)",
    defaultSizeEn: "100ml Bottle (Official)",
    sizeVariants: [
      {
        size: "قارورة 50 مل",
        sizeEn: "50ml Bottle",
        priceSAR: 45,
        originalPriceSAR: 65,
        savePercent: "33%",
        sku: "AYT-OR-50",
        stockNoteAr: "متوفر",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "قارورة 100 مل (الحجم الرسمي)",
        sizeEn: "100ml Bottle (Official)",
        priceSAR: 45,
        originalPriceSAR: 65,
        savePercent: "30%",
        sku: "AYT-OR-100",
        stockNoteAr: "طلب قياسي يومياً",
        stockNoteEn: "Daily Best Seller",
        isPopular: true
      },
      {
        size: "صندوق عود وورد + لوشن + كريم",
        sizeEn: "Oud & Roses Indulgence Box",
        priceSAR: 45,
        originalPriceSAR: 65,
        savePercent: "28%",
        sku: "AYT-OR-BOX",
        stockNoteAr: "صندوق إهداء متكامل",
        stockNoteEn: "Complete Gifting Box",
        isPopular: false
      }
    ],
    concentration: "أو دو بارفان ملكي",
    concentrationEn: "Eau De Parfum Royal",
    gender: "للجنسين / رومانسية وأناقة",
    genderEn: "Unisex / Romantic Elegance",
    longevity: "18+ ساعة فوحان مستمر",
    longevityEn: "18+ Hours Persistent Projection",
    sillage: "هالة مخملية آسرة تأسر القلوب",
    sillageEn: "Captivating Velvet Sillage",
    season: "طوال العام، ومثالي للأمسيات",
    seasonEn: "All Year & Special Evenings",
    timeOfDay: "المساء والنهار",
    timeOfDayEn: "Day & Evening",
    description: "الأيقونة الخالدة التي حصدت إعجاب الملايين. يجمع عطر عود وورد بين نعومة الورد الجوري والتركي مع ثراء العود الطبيعي المعتق، معززاً بلمسات الكراميل الدافئ والعنبر الأبيض والمسك النقي ليمنحك شعوراً بالفخامة والجاذبية التي لا تقاوم.",
    descriptionEn: "The undisputed global icon adored by millions. Oud & Roses weaves luscious Turkish rose and blooming peony with refined Cambodian agarwood, sweetened with warm caramel, luminous amber, and soft musk.",
    story: "وُلدت هذه الرائحة لتحقق المعادلة الصعبة: التوازن المثالي بين أنوثة الورد وعنفوان العود العربي الأصيل.",
    storyEn: "Engineered to attain supreme harmony between delicate floral romanticism and noble agarwood power.",
    ritual: "رشتان على الصدر والمعصمين تمنحك إطلالة لا تقاوم تدوم طوال اليوم.",
    ritualEn: "Apply two sprays to pulse points and lapels for effortless charm.",
    accords: [
      { name: "ورد تركي وجوري ندي", nameEn: "Turkish & Damask Rose", pct: 95, color: "#C2185B" },
      { name: "عود طبيعي معتق", nameEn: "Aged Agarwood", pct: 85, color: "#8C6220" },
      { name: "عنبر وكراميل دافئ", nameEn: "Warm Amber & Caramel", pct: 82, color: "#FFA000" },
      { name: "مسك أبيض حريري", nameEn: "White Silk Musk", pct: 78, color: "#E0E0E0" }
    ],
    notes: {
      top: ["ورد تركي", "فاوانيا زهرية", "برتقال خفيف"],
      heart: ["عود كمبودي", "كراميل دافئ", "عنبر أبيض"],
      base: ["مسك الملوك", "أخشاب الصندل", "فانيليا"]
    },
    notesEn: {
      top: ["Turkish Rose", "Pink Peony", "Light Mandarin"],
      heart: ["Cambodian Oud", "Warm Caramel", "White Amber"],
      base: ["Imperial Musk", "Sandalwood", "Vanilla"]
    },
    mood: ["رومانسية وجاذبية", "فخامة يومية", "مناسبات خاصة"],
    moodEn: ["Romantic Allure", "Everyday Luxury", "Special Occasions"],
    reviews: [
      {
        author: "منى الخالدي",
        authorEn: "Mona Al-Khaldi",
        city: "الدمام",
        cityEn: "Dammam",
        rating: 5,
        date: "منذ 4 أيام",
        dateEn: "4 days ago",
        title: "أجمل عطر ورد وعود مر علي، أنثوي وفخم جداً",
        titleEn: "The Prettiest Rose-Oud Blend Ever, Ultra Feminine & Rich",
        comment: "عطر عود وورد إدمان، ما يمر يوم بدون ما أتعطر منه. كل زميلاتي بالعمل يسألوني عنه.",
        commentEn: "Oud & Roses is pure addiction. Not a day passes without me wearing it. All my colleagues ask what I'm wearing."
      }
    ]
  },
  {
    id: "atyab-oil-dehn-oud",
    slug: "dehn-al-oud-royal",
    name: "دهن عود قديم ملكي معتق (تولة)",
    englishName: "Atyab Royal Vintage Dehn Al Oud Oil",
    nameEn: "Atyab Royal Vintage Dehn Al Oud Oil",
    subtitle: "تقطير تراثي نقي 100% من غابات كمبوديا العريقة، معتق 25 عاماً في قوارير بلورية",
    subtitleEn: "100% Pure Heritage Distillation from Ancient Cambodian Groves, Aged 25 Years",
    category: "oil",
    family: "دهن عود نقي أصيل فائق التعليق",
    familyEn: "Pure Concentrated Royal Agarwood Oil (Attar)",
    priceSAR: 75,
    originalPriceSAR: 110,
    isMinPrice: true,
    rating: 5.0,
    reviewsCount: 342,
    badge: "نقاء 100%",
    badgeEn: "100% Pure",
    badgeType: "royal",
    image: "assets/images/oil_dehn_oud.jpg",
    gallery: [
      {
        src: "assets/images/oil_dehn_oud.jpg",
        titleAr: "تولة دهن العود القديم الملكي",
        titleEn: "Royal Dehn Al Oud Crystal Tola",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["ربع تولة (3 مل)", "نصف تولة (6 مل)", "تولة كاملة ملكية في صندوق خشبي (12 مل)"],
    sizesEn: ["Quarter Tola (3ml)", "Half Tola (6ml)", "Full Royal Tola in Velvet Box (12ml)"],
    defaultSize: "نصف تولة (6 مل)",
    defaultSizeEn: "Half Tola (6ml)",
    sizeVariants: [
      {
        size: "ربع تولة (3 مل)",
        sizeEn: "Quarter Tola (3ml)",
        priceSAR: 75,
        originalPriceSAR: 110,
        savePercent: "30%",
        sku: "AYT-OIL-DO-3",
        stockNoteAr: "متوفر",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "نصف تولة (6 مل)",
        sizeEn: "Half Tola (6ml)",
        priceSAR: 75,
        originalPriceSAR: 110,
        savePercent: "32%",
        sku: "AYT-OIL-DO-6",
        stockNoteAr: "الأكثر طلباً لأهل الذوق الرفيع",
        stockNoteEn: "Connoisseur's Choice",
        isPopular: true
      },
      {
        size: "تولة كاملة ملكية في صندوق خشبي (12 مل)",
        sizeEn: "Full Royal Tola in Velvet Box (12ml)",
        priceSAR: 75,
        originalPriceSAR: 110,
        savePercent: "29%",
        sku: "AYT-OIL-DO-12",
        stockNoteAr: "إصدار الإهداء الملكي",
        stockNoteEn: "Royal Gift Edition",
        isPopular: false
      }
    ],
    concentration: "دهن عود بيور نقي 100% غير مخلوط",
    concentrationEn: "100% Pure Undiluted Wild Agarwood Attar",
    gender: "للجنسين / هيبة الملوك والأعيان",
    genderEn: "Unisex / Imperial Connoisseur",
    longevity: "ثبات هائل يدوم لأيام على الأقمشة والشماغ",
    longevityEn: "Immense Staying Power for Days on Fabrics & Shemagh",
    sillage: "فوحان بخوري خشبي عتيق يملأ المكان وقاراً",
    sillageEn: "Resinous, Earthy & Deeply Commanding Sillage",
    season: "كافة الفصول، أيام الجمع، والمناسبات الرسمية",
    seasonEn: "All Seasons, Friday Blessings & High Galas",
    timeOfDay: "كافة الأوقات والمناسبات",
    timeOfDayEn: "All Times & Formal Gatherings",
    description: "جوهرة العطور العربية وأصل الفخامة. قطرات دهن العود القديم المعتق مستخلصة من أندر أشجار العود المعمرة في كمبوديا وبورما. يبدأ بنفحات خشبية غنية تتبعها حلاوة راتنجية دافئة تدوم لأيام على المعصم والشماغ.",
    descriptionEn: "The undisputed jewel of authentic Arabian perfumery. Hand-distilled drops of aged Cambodian and Burmese wild agarwood. Ignites with rich balsamic wood notes evolving into sweet resinous warmth that lingers on skin and shemagh for days.",
    story: "عُتق هذا الدهن في براميل نحاسية محكمة لأكثر من ربع قرن ليتحول إلى إكسير نقي خالٍ تماماً من أي روائح احتراق حادة.",
    storyEn: "Slowly aged in sealed copper vessels for over 25 years to mature into a velvet, non-pungent royal nectar.",
    ritual: "مسحة واحدة بواسطة المرواد على المعصمين وخلف شحمتي الأذن وعند ثنية الشماغ تكفي ليومين كاملين.",
    ritualEn: "A single glass-wand touch on wrists, behind ears, or shemagh collar grants 48-hour regal aura.",
    accords: [
      { name: "دهن عود كمبودي معتق 25 سنة", nameEn: "25-Yr Aged Cambodian Oud", pct: 98, color: "#5C3A21" },
      { name: "راتنجات خشبية بلسمية", nameEn: "Balsamic Wood Resins", pct: 90, color: "#8C6220" },
      { name: "عنبر مدخن طبيعي", nameEn: "Natural Smoked Amber", pct: 85, color: "#C59B27" }
    ],
    notes: {
      top: ["خشب العود الخام", "لمسة بخورية ناعمة"],
      heart: ["راتنجات عطرية دافئة", "عبير الخشب المعتق"],
      base: ["دهن العود الصافي المركز", "أثر ترابي عتيق"]
    },
    notesEn: {
      top: ["Raw Agarwood Essence", "Gentle Incense Vapor"],
      heart: ["Warm Balsamic Resins", "Aged Timber Undertone"],
      base: ["Pure Concentrated Dehn Al Oud", "Earthy Vintage Note"]
    },
    mood: ["أصالة وهيبة", "صلوات الجمع والأعياد", "إهداء للملوك والشيوخ"],
    moodEn: ["Heritage Majesty", "Friday Prayer & Eids", "Gifts for Nobility"],
    reviews: [
      {
        author: "الشيخ فهد المنصور",
        authorEn: "Sheikh Fahad Al-Mansour",
        city: "الرياض",
        cityEn: "Riyadh",
        rating: 5,
        date: "منذ 6 أيام",
        dateEn: "6 days ago",
        title: "دهن عود أصيل 100% وريحته تفتح النفس",
        titleEn: "100% Genuine Agarwood, Uplifting & Pure",
        comment: "نادر جداً تلقى دهن عود بهذا النقاء والتعريق بسعر معقول. مسحة على الشماغ تجلس 3 أيام بدون ما تتغير ريحته. بيض الله وجوهكم.",
        commentEn: "Extremely rare to find such pure, well-aged dehn al oud at this price. A single touch on my shemagh lasts 3 days without turning sour."
      }
    ]
  },
  {
    id: "atyab-dakhoon-molook",
    slug: "dakhoon-al-molook",
    name: "دخون الملوك الفاخر المعتق",
    englishName: "Atyab Dakhoon Al-Molook Royal Incense",
    nameEn: "Atyab Dakhoon Al-Molook Royal Incense",
    subtitle: "أقراص دخون معجونة بدهن الورد الجبلي والعنبر والمسك ودهن العود القديم",
    subtitleEn: "Precious Incense Tablets Infused with Mountain Rose Attar & Ambergris",
    category: "bakhoor",
    family: "دخون عربي أصيل فاخر",
    familyEn: "Authentic Imperial Arabic Dakhoon",
    priceSAR: 35,
    originalPriceSAR: 50,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 188,
    badge: "ضيافة القصور",
    badgeEn: "Palace Hospitality",
    badgeType: "royal",
    image: "assets/images/dakhoon.jpg",
    gallery: [
      {
        src: "assets/images/dakhoon.jpg",
        titleAr: "عبوة دخون الملوك الملكية",
        titleEn: "Official Royal Dakhoon Pack",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["عبوة 70 جم", "عبوة 150 جم", "صندوق الضيافة 250 جم"],
    sizesEn: ["70g Pack", "150g Pack", "250g Majlis Box"],
    defaultSize: "عبوة 150 جم",
    defaultSizeEn: "150g Pack",
    sizeVariants: [
      {
        size: "عبوة 70 جم",
        sizeEn: "70g Pack",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "34%",
        sku: "AYT-DKH-70",
        stockNoteAr: "متوفر بالمستودع",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "عبوة 150 جم",
        sizeEn: "150g Pack",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "30%",
        sku: "AYT-DKH-150",
        stockNoteAr: "الأكثر طلباً للمجالس",
        stockNoteEn: "Top Seller for Majlis",
        isPopular: true
      },
      {
        size: "صندوق الضيافة 250 جم",
        sizeEn: "250g Majlis Box",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "29%",
        sku: "AYT-DKH-250",
        stockNoteAr: "صندوق فاخر مع ملقط ذهبي",
        stockNoteEn: "Luxury Box with Tongs",
        isPopular: false
      }
    ],
    concentration: "أقراص دخون معجونة بدهن الورد والعنبر الأصيل",
    concentrationEn: "Hand-blended Dakhoon with Rose Attar & Amber",
    gender: "للمنازل والقصور والمجالس",
    genderEn: "Homes, Palaces & Majlis",
    longevity: "تدوم الرائحة في الأرجاء لأكثر من 48 ساعة",
    longevityEn: "Lingers in Atmosphere for 48+ Hours",
    sillage: "دخان عطري كثيف وأصيل يبعث السكينة",
    sillageEn: "Dense Aromatic Smoke Spreading Serenity",
    season: "طوال العام، أساسي في المناسبات والأعياد",
    seasonEn: "All Year, Essential for Festivities",
    timeOfDay: "الصباح والمساء واستقبال الضيوف",
    timeOfDayEn: "Morning, Evenings & Guest Reception",
    description: "دخون الملوك الفاخر يحول بيتك ومجلسك إلى واحة من السكينة والكرم العربي الأصيل. تُعجن الأقراص يدوياً من مسحوق رقائق العود المروكي مع دهن الورد الجبلي والعنبر والمسك النقي، لتعطي دخاناً طيباً وبارداً لا يسبب أي كتمة في الصدر.",
    descriptionEn: "Dakhoon Al-Molook infuses your residence with warmth and royal hospitality. Hand-kneaded from crushed Moroki agarwood, mountain rose attar, amber, and pure musk, producing aromatic, cool smoke that delights all guests.",
    story: "سر الخلطة الملكية الموروثة لضيافة كبار الزوار في المجالس الخليجية.",
    storyEn: "A heritage recipe perfected for welcoming esteemed guests in Gulf receptions.",
    ritual: "ضع قرصاً على جمرة هادئة مغطاة بطبقة رماد واستمتع بانتشار عبير العود الفاخر.",
    ritualEn: "Place a tablet over mild charcoal covered with a thin ash layer to experience royal fragrance plumes.",
    accords: [
      { name: "رقائق عود مروكي طبيعي", nameEn: "Moroki Agarwood Chips", pct: 94, color: "#5D4037" },
      { name: "دهن الورد الجبلي", nameEn: "Mountain Rose Attar", pct: 88, color: "#AD1457" },
      { name: "عنبر سائل ومسك", nameEn: "Liquid Amber & Musk", pct: 82, color: "#C59B27" }
    ],
    notes: {
      top: ["رذاذ الورد الطائفي", "زعفران"],
      heart: ["دهن العود المدخن", "عنبر بلوري"],
      base: ["أخشاب العود المروكي", "صندل", "مسك ناعم"]
    },
    notesEn: {
      top: ["Taif Rose Mist", "Saffron"],
      heart: ["Smoked Oud Oil", "Crystal Amber"],
      base: ["Moroki Agarwood", "Sandalwood", "Soft Musk"]
    },
    mood: ["كرم الضيافة", "أجواء يوم الجمعة", "فخامة المجالس"],
    moodEn: ["Generous Hospitality", "Friday Blessings", "Majlis Splendor"],
    reviews: [
      {
        author: "أبو خالد الدوسري",
        authorEn: "Abu Khalid Al-Dossary",
        city: "الدمام",
        cityEn: "Dammam",
        rating: 5,
        date: "منذ أسبوع",
        dateEn: "1 week ago",
        title: "دخون يبيض الوجه عند الضيوف، ريحة أصيلة",
        titleEn: "Honors your Majlis in Front of Guests, Authentic Scent",
        comment: "ما شاء الله دخون فاخر وما يكتم الصدر وريحته تدوم يومين بالصالة والكنب. ممتاز جداً.",
        commentEn: "Luxurious dakhoon that doesn't irritate, and the fragrance lingers in curtains and living room for 2 days."
      }
    ]
  },
  {
    id: "atyab-gift-set-royal",
    slug: "royal-kings-gift-set",
    name: "صندوق الإهداء الملكي الفاخر (VIP)",
    englishName: "Royal Kings VIP Presentation Gift Box",
    nameEn: "Royal Kings VIP Presentation Gift Box",
    subtitle: "صندوق هدايا جلدي مبطن بالمخمل يشمل عطر تايقر عود، تولة دهن عود، ومبخرة كريستالية",
    subtitleEn: "Velvet-Lined Leather Chest with Tiger Oud, Pure Dehn Al Oud & Crystal Burner",
    category: "giftset",
    family: "أطقم هدايا ملكية فاخرة",
    familyEn: "Imperial VIP Luxury Gift Box",
    priceSAR: 95,
    originalPriceSAR: 145,
    isMinPrice: true,
    rating: 5.0,
    reviewsCount: 165,
    badge: "إهداء الملوك",
    badgeEn: "Gift of Kings",
    badgeType: "royal",
    image: "assets/images/gift_set.jpg",
    gallery: [
      {
        src: "assets/images/gift_set.jpg",
        titleAr: "صندوق الإهداء الملكي الكامل",
        titleEn: "Complete Royal VIP Gift Set",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["صندوق الهدايا الملكي الكامل"],
    sizesEn: ["Complete Royal Gift Box"],
    defaultSize: "صندوق الهدايا الملكي الكامل",
    defaultSizeEn: "Complete Royal Gift Box",
    sizeVariants: [
      {
        size: "صندوق الهدايا الملكي الكامل",
        sizeEn: "Complete Royal Gift Box",
        priceSAR: 95,
        originalPriceSAR: 145,
        savePercent: "34%",
        sku: "AYT-GFT-ROYAL",
        stockNoteAr: "تغليف هدايا ملكي مجاني مع بطاقة تهنئة",
        stockNoteEn: "Free Royal Ribbon Wrapping & Card",
        isPopular: true
      }
    ],
    concentration: "مجموعة هدايا متكاملة تشمل عطور ودهون وبخور فاخر",
    concentrationEn: "Complete Royal Gift Casket: Perfume, Attar & Incense",
    gender: "للجنسين / إهداء فاخر للوجهاء",
    genderEn: "Unisex / VIP Presentation for Dignitaries",
    longevity: "هدية تخلد أثرك في الذاكرة",
    longevityEn: "An Unforgettable Memory of Gracious Gifting",
    sillage: "توليفة شاملة تملأ الأرجاء",
    sillageEn: "Full Regal Sillage Array",
    season: "الأعياد، حفلات التخرج، الزواج ومناسبات التكريم",
    seasonEn: "Eids, Weddings, Honors & Grand Celebrations",
    timeOfDay: "كافة الأوقات",
    timeOfDayEn: "All Times",
    description: "الهدية الأرقى التي تعبر عن أسمى معاني التقدير والوفاء. صُمم صندوق الإهداء الملكي من الجلد الطبيعي المحفور بالشعار الذهبي والمبطن بالمخمل الملكي. يحتوي على قارورة عطر تايقر عود الرسمي (110 مل)، وتولة دهن عود معتق، ومرطبان بخور أطياب الملكي، ومبخرة كريستالية مذهبة، مع كيس إهداء فاخر وبطاقة تهنئة مخصصة.",
    descriptionEn: "The quintessential luxury presentation to express highest esteem. Bound in gold-stamped fine leather and lined in velvet. Encases a 110ml Tiger Oud bottle, a crystal tola of aged agarwood attar, Royal Bakhoor, and a gilded crystal burner, complete with VIP gift bag and personalized calligraphy greeting card.",
    story: "أُعد هذا الصندوق ليكون الخيار الأول لكبار الشخصيات عند الرغبة في تقديم هدية تليق بأصحاب المقام الرفيع.",
    storyEn: "Crafted specifically for dignitaries seeking a presentation that commands admiration and remembrance.",
    ritual: "جاهز تماماً للإهداء الفوري مع تغليف شريطي ذهبي وبطاقة تهنئة راقية.",
    ritualEn: "Ready for immediate VIP presentation with satin ribbons and embossed gift card.",
    accords: [
      { name: "عود كمبودي وعنبر ملكي", nameEn: "Cambodian Oud & Amber", pct: 95, color: "#8C6220" },
      { name: "ورد طائفي وبخور", nameEn: "Taif Rose & Bakhoor", pct: 90, color: "#AD1457" },
      { name: "زعفران قائنات أصيل", nameEn: "Persian Saffron", pct: 86, color: "#C59B27" }
    ],
    notes: {
      top: ["زعفران فارسي", "برغموت", "ماء الورد"],
      heart: ["عود كمبودي", "ورد طائفي", "بخور ملكي"],
      base: ["دهن عود هندي", "عنبر", "مسك الملوك"]
    },
    notesEn: {
      top: ["Persian Saffron", "Bergamot", "Rosewater"],
      heart: ["Cambodian Oud", "Taif Rose", "Royal Incense"],
      base: ["Indian Oud Attar", "Ambergris", "Kings Musk"]
    },
    mood: ["إهداء فاخر", "حفلات الزواج", "مناسبات التكريم والأعياد"],
    moodEn: ["VIP Gifting", "Weddings", "Honors & Festive Occasions"],
    reviews: [
      {
        author: "سعود القاسم",
        authorEn: "Saud Al-Qasim",
        city: "الرياض",
        cityEn: "Riyadh",
        rating: 5,
        date: "منذ يومين",
        dateEn: "2 days ago",
        title: "هدية تبيض الوجه قدام أغلى الناس.. تغليف فخم جداً",
        titleEn: "Honored Me In Front of My Guests.. Stunning Presentation",
        comment: "أهديت الصندوق لمديري في العمل بمناسبة ترقيته، انبهر جداً بفخامة الصندوق وجودة العطور والبخور. شكراً أطياب على الاهتمام بأدق التفاصيل.",
        commentEn: "Gifted this box to my director on his promotion; he was utterly mesmerized by the craftsmanship, perfume, and incense. Thank you Atyab for this perfection."
      }
    ]
  }

,
  {
    id: "atyab-kaaf",
    slug: "kaaf",
    name: "عطر أطياب كاف المنعش",
    englishName: "Atyab Kaaf Fresh Perfume",
    nameEn: "Atyab Kaaf Fresh Perfume",
    subtitle: "انفجار منعش من البطيخ والخزامى مع نفحات بحرية وأخشاب خفيفة",
    subtitleEn: "Vibrant Marine & Watermelon Freshness with Lavender & Driftwood",
    category: "perfumes",
    family: "أروماتيك بحري منعش صيفي",
    familyEn: "Aromatic Marine Fresh Summer Sillage",
    priceSAR: 42,
    originalPriceSAR: 60,
    isMinPrice: true,
    rating: 4.8,
    reviewsCount: 310,
    badge: "انتعاش ساحق",
    badgeEn: "Supreme Freshness",
    badgeType: "popular",
    image: "assets/images/kaaf.jpg",
    gallery: [
      {
        src: "assets/images/kaaf.jpg",
        titleAr: "الواجهة الرسمية لعطر كاف",
        titleEn: "Official Kaaf Bottle",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["قارورة 50 مل", "قارورة 100 مل (الحجم الرسمي)"],
    sizesEn: ["50ml Bottle", "100ml Bottle (Official)"],
    defaultSize: "قارورة 100 مل (الحجم الرسمي)",
    defaultSizeEn: "100ml Bottle (Official)",
    sizeVariants: [
      {
        size: "قارورة 50 مل",
        sizeEn: "50ml Bottle",
        priceSAR: 42,
        originalPriceSAR: 60,
        savePercent: "33%",
        sku: "AYT-KF-50",
        stockNoteAr: "متوفر",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "قارورة 100 مل (الحجم الرسمي)",
        sizeEn: "100ml Bottle (Official)",
        priceSAR: 42,
        originalPriceSAR: 60,
        savePercent: "30%",
        sku: "AYT-KF-100",
        stockNoteAr: "الأكثر مبيعاً لفصل الصيف",
        stockNoteEn: "Summer Best Seller",
        isPopular: true
      }
    ],
    concentration: "أو دو بارفان منعش فائق الفوحان",
    concentrationEn: "Eau De Parfum Fresh Marine",
    gender: "للجنسين / طاقة وحيوية",
    genderEn: "Unisex / Dynamic Energy",
    longevity: "16+ ساعة من الانتعاش المتجدد",
    longevityEn: "16+ Hours Uplifting Longevity",
    sillage: "نسيم بحري فواح يترك أثراً منعشاً",
    sillageEn: "Clean Marine Breeze Trail",
    season: "الصيف والربيع والدوام اليومي",
    seasonEn: "Summer, Spring & Daily Office",
    timeOfDay: "الصباح والظهيرة",
    timeOfDayEn: "Daytime & Morning",
    description: "انتعاش يوقظ الحواس. عطر كاف يجمع بين برودة البطيخ الأحمر وخزامى بروفانس مع نفحات نسيم المحيط والأخشاب الشاطئية البيضاء ليمنحك شعوراً مستمراً بالنظافة والانتعاش الفوري.",
    descriptionEn: "Supreme vitality and coastal calm. Kaaf explodes with cool red watermelon and Provence lavender, merging with sea spray minerals and sun-bleached driftwood.",
    story: "صُمم ليكون العطر الصيفي المثالي في أجواء الخليج الحارة.",
    storyEn: "Engineered specifically to conquer Arabian summer heat with enduring freshness.",
    ritual: "ثلاث رشات صباحية على العنق والقميص لبداية يوم حافلة بالحيوية.",
    ritualEn: "Three morning sprays ensure all-day crispness.",
    accords: [
      { name: "بطيخ ونفحات بحرية", nameEn: "Watermelon & Marine", pct: 95, color: "#00ACC1" },
      { name: "خزامى فرنسية منعشة", nameEn: "French Lavender", pct: 88, color: "#7E57C2" },
      { name: "أخشاب بيضاء ومسك", nameEn: "White Woods & Musk", pct: 80, color: "#B0BEC5" }
    ],
    notes: {
      top: ["بطيخ أحمر مثلج", "برغموت", "تفاح أخضر"],
      heart: ["خزامى", "مريمية", "ياسمين مائي"],
      base: ["خشب الأرز الأبيض", "مسك نقي", "عنبر بحري"]
    },
    notesEn: {
      top: ["Iced Watermelon", "Bergamot", "Green Apple"],
      heart: ["Provence Lavender", "Clary Sage", "Aquatic Jasmine"],
      base: ["White Cedar", "Clean Musk", "Marine Amber"]
    },
    mood: ["انتعاش يومي", "دوام ورياضة", "طاقة وحيوية"],
    moodEn: ["Daily Freshness", "Office & Gym", "Boundless Energy"],
    reviews: [
      {
        author: "خالد الحربي",
        authorEn: "Khalid Al-Harbi",
        city: "المدينة المنورة",
        cityEn: "Madinah",
        rating: 5,
        date: "منذ 3 أيام",
        dateEn: "3 days ago",
        title: "أفضل عطر صيفي بالدوام، نظيف وبارد جداً",
        titleEn: "Best Daily Summer Office Fragrance",
        comment: "كاف عطر أسطوري للصيف والحر، ريحة بطيخ ونظافة فواحة وتفتح النفس بدون أي صداع.",
        commentEn: "Kaaf is an absolute summer legend. Crisp watermelon and clean lavender."
      }
    ]
  },
  {
    id: "atyab-summer-oud",
    slug: "summer-oud",
    name: "عطر أطياب سمر عود",
    englishName: "Atyab Summer Oud Eau De Parfum",
    nameEn: "Atyab Summer Oud Eau De Parfum",
    subtitle: "توليفة استثنائية: فخامة العود الشرقي بلمسة حمضية صيفية خفيفة وباردة",
    subtitleEn: "Oriental Oud Elegance Infused with Bright Citrus and Summer Amber",
    category: "perfumes",
    family: "عود صيفي مشرق منعش",
    familyEn: "Bright Luminous Summer Agarwood",
    priceSAR: 44,
    originalPriceSAR: 62,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 220,
    badge: "عود صيفي بارد",
    badgeEn: "Cool Summer Oud",
    badgeType: "popular",
    image: "assets/images/summer_oud.jpg",
    gallery: [
      {
        src: "assets/images/summer_oud.jpg",
        titleAr: "الواجهة الرسمية لسمر عود",
        titleEn: "Summer Oud Official Bottle",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["قارورة 50 مل", "قارورة 100 مل (الحجم الرسمي)"],
    sizesEn: ["50ml Bottle", "100ml Bottle (Official)"],
    defaultSize: "قارورة 100 مل (الحجم الرسمي)",
    defaultSizeEn: "100ml Bottle (Official)",
    sizeVariants: [
      {
        size: "قارورة 50 مل",
        sizeEn: "50ml Bottle",
        priceSAR: 44,
        originalPriceSAR: 62,
        savePercent: "30%",
        sku: "AYT-SO-50",
        stockNoteAr: "متوفر",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "قارورة 100 مل (الحجم الرسمي)",
        sizeEn: "100ml Bottle (Official)",
        priceSAR: 44,
        originalPriceSAR: 62,
        savePercent: "29%",
        sku: "AYT-SO-100",
        stockNoteAr: "الأكثر مبيعاً للطقس الحار",
        stockNoteEn: "Hot Weather Best Seller",
        isPopular: true
      }
    ],
    concentration: "أو دو بارفان صيفي",
    concentrationEn: "Eau De Parfum Summer Edition",
    gender: "للجنسين",
    genderEn: "Unisex",
    longevity: "18+ ساعة ثبات وفوحان",
    longevityEn: "18+ Hours Projection",
    sillage: "فوحان راقٍ خفيف على النفس",
    sillageEn: "Refined Non-Heavy Projection",
    season: "الصيف والربيع والخريف",
    seasonEn: "Summer, Spring & Autumn",
    timeOfDay: "كافة الأوقات",
    timeOfDayEn: "All Times",
    description: "لمحبي العود الذين يرغبون في ارتدائه في الأيام الدافئة دون ثقل؛ سمر عود يمزج خشب العود الخفيف مع الماندرين وزهر البرتقال والعنبر الشفاف ليقدم هيبة العود بروح عصرية مشرقة.",
    descriptionEn: "Created for oud enthusiasts who desire agarwood nobility during warmer months. Light Cambodian oud softened by sunlit mandarin, neroli, and crystalline amber.",
    story: "تطوير مبتكر يكسر الصورة النمطية لثقل عطور العود ويجعلها رفيقك اليومي في الصيف.",
    storyEn: "A visionary formulation that reinvents oud for effortless warm-weather sophistication.",
    ritual: "رشتان إلى ثلاث رشات على الثوب والياقة.",
    ritualEn: "Spray collar and lapels freely.",
    accords: [
      { name: "عود خفيف معتق", nameEn: "Luminous Soft Oud", pct: 90, color: "#8C6220" },
      { name: "حمضيات ونيرولي مشرق", nameEn: "Citrus & Sunlit Neroli", pct: 86, color: "#FFA000" },
      { name: "عنبر بلوري شفاف", nameEn: "Crystal Transparent Amber", pct: 80, color: "#FFD54F" }
    ],
    notes: {
      top: ["ماندرين إيطالي", "زهر البرتقال", "برغموت"],
      heart: ["عود كمبودي خفيف", "عنبر أبيض", "زعفران ناعم"],
      base: ["خشب الصندل", "مسك أبيض", "فانيليا خفيفة"]
    },
    notesEn: {
      top: ["Italian Mandarin", "Neroli Blossoms", "Bergamot"],
      heart: ["Luminous Cambodian Oud", "White Amber", "Fine Saffron"],
      base: ["Sandalwood", "White Musk", "Soft Vanilla"]
    },
    mood: ["فخامة صيفية", "حضور مشرق", "انتعاش العود"],
    moodEn: ["Summer Luxury", "Radiant Aura", "Cool Agarwood"],
    reviews: [
      {
        author: "سالم المنصوري",
        authorEn: "Salem Al-Mansouri",
        city: "أبها",
        cityEn: "Abha",
        rating: 5,
        date: "منذ أسبوع",
        dateEn: "1 week ago",
        title: "عود بارد وراقي جداً ما يغث بالحر أبداً",
        titleEn: "Cool, High-Class Oud That Never Feels Heavy",
        comment: "توليفة عبقرية، عود مع حمضيات منعشة ونظيفة. ثباته ممتاز جداً.",
        commentEn: "Ingenious blend of oud with fresh clean citrus. Outstanding performance."
      }
    ]
  },
  {
    id: "atyab-oil-white-musk",
    slug: "royal-white-musk-oil",
    name: "مسك أطياب الأبيض الملكي النقي (تولة)",
    englishName: "Atyab Royal White Musk Concentrated Oil",
    nameEn: "Atyab Royal White Musk Concentrated Oil",
    subtitle: "قطرات المسك الصافي الحريري، ثبات لا يُضاهى ونقاء يناسب كافة الأوقات",
    subtitleEn: "Pure Liquid Silk Musk, Unmatched Long-lasting Cleanliness",
    category: "oil",
    family: "مسك أبيض مركز نقي",
    familyEn: "Pure Concentrated White Musk Attar",
    priceSAR: 35,
    originalPriceSAR: 50,
    isMinPrice: true,
    rating: 4.9,
    reviewsCount: 290,
    badge: "نقاء مطلق",
    badgeEn: "Absolute Purity",
    badgeType: "popular",
    image: "assets/images/white_musk.jpg",
    gallery: [
      {
        src: "assets/images/white_musk.jpg",
        titleAr: "تولة المسك الأبيض الملكي",
        titleEn: "Royal White Musk Tola",
        badgeAr: "الأصلية 100%",
        badgeEn: "100% Authentic"
      }
    ],
    sizes: ["ربع تولة (3 مل)", "نصف تولة (6 مل)", "تولة كاملة (12 مل)"],
    sizesEn: ["Quarter Tola (3ml)", "Half Tola (6ml)", "Full Tola (12ml)"],
    defaultSize: "نصف تولة (6 مل)",
    defaultSizeEn: "Half Tola (6ml)",
    sizeVariants: [
      {
        size: "ربع تولة (3 مل)",
        sizeEn: "Quarter Tola (3ml)",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "31%",
        sku: "AYT-OIL-WM-3",
        stockNoteAr: "متوفر",
        stockNoteEn: "In Stock",
        isPopular: false
      },
      {
        size: "نصف تولة (6 مل)",
        sizeEn: "Half Tola (6ml)",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "30%",
        sku: "AYT-OIL-WM-6",
        stockNoteAr: "الأكثر مبيعاً بعد الاستحمام",
        stockNoteEn: "Best Seller Post-Shower",
        isPopular: true
      },
      {
        size: "تولة كاملة (12 مل)",
        sizeEn: "Full Tola (12ml)",
        priceSAR: 35,
        originalPriceSAR: 50,
        savePercent: "29%",
        sku: "AYT-OIL-WM-12",
        stockNoteAr: "حجم اقتصادي",
        stockNoteEn: "Value Size",
        isPopular: false
      }
    ],
    concentration: "زيت مسك مركز 100% خالٍ من الكحول",
    concentrationEn: "100% Alcohol-Free Concentrated Musk Oil",
    gender: "للجنسين والأطفال والنساء",
    genderEn: "Unisex, Women & Children",
    longevity: "24+ ساعة من النظافة والهدوء",
    longevityEn: "24+ Hours Pristine Aura",
    sillage: "هالة ناعمة تشع بالنظافة",
    sillageEn: "Soft Powdery Clean Scent",
    season: "كافة الفصول",
    seasonEn: "All Seasons",
    timeOfDay: "بعد الاستحمام وكل صباح",
    timeOfDayEn: "Morning & Post-Shower",
    description: "مسك الطهارة والنظافة الأصيل. قطرات حريرية غنية بالمسك الأبيض البودري الصافي وزهر اللوتس وزنبق الماء. آمن تماماً على البشرة يمنحك شعوراً مستمراً بالانتعاش والهدوء طوال 24 ساعة.",
    descriptionEn: "The undisputed gold standard of pristine white musk. Silky, alcohol-free, and skin-friendly drops whispering powdery white flowers and soothing cashmere.",
    story: "عطر الطهارة والنظافة المفضل لدى الأسر الخليجية لأجيال متعاقبة.",
    storyEn: "Cherished across Arabian households for generations as the ultimate post-bath ritual.",
    ritual: "مسحة خفيفة بالمرواد على مواضع النبض بعد الاستحمام مباشرة.",
    ritualEn: "Touch glass applicator to wrists, neck, and pulse points post-bath.",
    accords: [
      { name: "مسك أبيض بيور نقي", nameEn: "Pure White Musk", pct: 98, color: "#E0E0E0" },
      { name: "بودرة وزهور قطنية", nameEn: "Cotton Flower & Powder", pct: 88, color: "#F5F5F5" },
      { name: "زنبق الماء الأبيض", nameEn: "White Water Lily", pct: 80, color: "#E8EAF6" }
    ],
    notes: {
      top: ["المسك الأبيض النقي", "زهر القطن"],
      heart: ["زنبق الماء", "ياسمين أبيض"],
      base: ["بودرة المسك الصافية", "خشب الصندل الأبيض"]
    },
    notesEn: {
      top: ["Pristine White Musk", "Cotton Flower"],
      heart: ["Water Lily", "White Jasmine"],
      base: ["Pure Musk Powder", "White Sandalwood"]
    },
    mood: ["نظافة مطلقة", "هدوء وسكينة", "بعد الاستحمام"],
    moodEn: ["Pure Cleanliness", "Tranquil Peace", "Post-Shower"],
    reviews: [
      {
        author: "حصة الغامدي",
        authorEn: "Hessa Al-Ghamdi",
        city: "جدة",
        cityEn: "Jeddah",
        rating: 5,
        date: "منذ 5 أيام",
        dateEn: "5 days ago",
        title: "ريحة نظافة وبودرة تلازمك طول اليوم، خيال!",
        titleEn: "Pure Clean Powdery Scent All Day Long!",
        comment: "مسك أبيض نظيف وبارد جداً، أحطه بعد الشاور ويبقى بالجسم يومين. روعة.",
        commentEn: "Cool, ultra-clean musk that lingers on skin for two days. Stunning."
      }
    ]
  }

];

/**
 * Helper to get localized product attributes
 */
function getProductLocalized(product, lang = "ar") {
  const isEn = lang === "en";
  return {
    ...product,
    displayName: isEn ? (product.nameEn || product.englishName) : product.name,
    displaySubtitle: isEn ? (product.subtitleEn || product.subtitle) : product.subtitle,
    displayFamily: isEn ? (product.familyEn || product.family) : product.family,
    displayBadge: isEn ? (product.badgeEn || product.badge) : product.badge,
    displayConcentration: isEn ? (product.concentrationEn || product.concentration) : product.concentration,
    displayGender: isEn ? (product.genderEn || product.gender) : product.gender,
    displayLongevity: isEn ? (product.longevityEn || product.longevity) : product.longevity,
    displaySillage: isEn ? (product.sillageEn || product.sillage) : product.sillage,
    displaySeason: isEn ? (product.seasonEn || product.season) : product.season,
    displayTimeOfDay: isEn ? (product.timeOfDayEn || product.timeOfDay) : product.timeOfDay,
    displayDescription: isEn ? (product.descriptionEn || product.description) : product.description,
    displayStory: isEn ? (product.storyEn || product.story) : product.story,
    displayRitual: isEn ? (product.ritualEn || product.ritual) : product.ritual,
    displayNotes: isEn ? (product.notesEn || product.notes) : product.notes,
    displaySizes: isEn ? (product.sizesEn || product.sizes) : product.sizes,
    displayDefaultSize: isEn ? (product.defaultSizeEn || product.defaultSize) : product.defaultSize,
    displaySizeVariants: (product.sizeVariants || []).map(v => ({
      ...v,
      displaySize: isEn ? (v.sizeEn || v.size) : v.size,
      displayStockNote: isEn ? (v.stockNoteEn || v.stockNoteAr) : v.stockNoteAr
    })),
    displayGallery: (product.gallery || []).map(g => ({
      ...g,
      displayTitle: isEn ? (g.titleEn || g.titleAr) : g.titleAr,
      displayBadge: isEn ? (g.badgeEn || g.badgeAr) : g.badgeAr
    })),
    displayReviews: (product.reviews || []).map(r => ({
      ...r,
      displayAuthor: isEn ? (r.authorEn || r.author) : r.author,
      displayCity: isEn ? (r.cityEn || r.city) : r.city,
      displayTitle: isEn ? (r.titleEn || r.title) : r.title,
      displayComment: isEn ? (r.commentEn || r.comment) : r.comment,
      displayDate: isEn ? (r.dateEn || r.date) : r.date
    }))
  };
}

// Global dynamic products assignment
/**
 * Dynamic Unified Products Catalog Engine
 * Automatically merges built-in catalog with custom added/updated/deleted products.
 */
function getUnifiedProductsCatalog() {
  let list = Array.isArray(BASE_ATYAB_PRODUCTS) ? [...BASE_ATYAB_PRODUCTS] : [];

  // 1. Filter out deleted products (allows removing both custom and default products)
  try {
    const deletedIds = JSON.parse(localStorage.getItem("atyab_deleted_product_ids") || "[]");
    if (Array.isArray(deletedIds) && deletedIds.length > 0) {
      const delSet = new Set(deletedIds);
      list = list.filter(p => !delSet.has(p.id));
    }
  } catch (e) {
    console.warn("Error reading atyab_deleted_product_ids:", e);
  }

  // 2. Apply modifications to existing products
  try {
    const updatedMap = JSON.parse(localStorage.getItem("atyab_updated_products") || "{}");
    if (updatedMap && typeof updatedMap === "object") {
      list = list.map(p => updatedMap[p.id] ? { ...p, ...updatedMap[p.id] } : p);
    }
  } catch (e) {
    console.warn("Error reading atyab_updated_products:", e);
  }

  // 3. Prepend custom newly created products
  try {
    const customList = JSON.parse(localStorage.getItem("atyab_custom_products") || "[]");
    if (Array.isArray(customList) && customList.length > 0) {
      // Avoid duplicates with custom products
      const customIds = new Set(customList.map(c => c.id));
      list = [...customList, ...list.filter(p => !customIds.has(p.id))];
    }
  } catch (e) {
    console.warn("Error reading atyab_custom_products:", e);
  }

  return list;
}

// Global mutable reference
let ATYAB_PRODUCTS = getUnifiedProductsCatalog();
let AYTYAB_PRODUCTS = ATYAB_PRODUCTS;

/**
 * Re-reads catalog from storage and refreshes all global references
 */
function refreshAtyabProducts() {
  ATYAB_PRODUCTS = getUnifiedProductsCatalog();
  AYTYAB_PRODUCTS = ATYAB_PRODUCTS;
  if (typeof window !== "undefined") {
    window.ATYAB_PRODUCTS = ATYAB_PRODUCTS;
    window.AYTYAB_PRODUCTS = ATYAB_PRODUCTS;
    try {
      window.dispatchEvent(new CustomEvent("atyab_products_updated", { detail: { products: ATYAB_PRODUCTS } }));
    } catch {}
  }
  return ATYAB_PRODUCTS;
}

/**
 * Save custom product (Add or update)
 */
function saveCustomProductToStorage(product) {
  try {
    let custom = JSON.parse(localStorage.getItem("atyab_custom_products") || "[]");
    if (!Array.isArray(custom)) custom = [];

    // Ensure isCustom flag
    product.isCustom = true;
    product.updatedAt = new Date().toISOString();

    const existingIdx = custom.findIndex(p => p.id === product.id);
    if (existingIdx > -1) {
      custom[existingIdx] = { ...custom[existingIdx], ...product };
    } else {
      product.createdAt = product.createdAt || new Date().toISOString();
      custom.unshift(product);
    }

    localStorage.setItem("atyab_custom_products", JSON.stringify(custom));

    // Also remove from deleted list if previously deleted
    let deletedIds = JSON.parse(localStorage.getItem("atyab_deleted_product_ids") || "[]");
    if (Array.isArray(deletedIds) && deletedIds.includes(product.id)) {
      deletedIds = deletedIds.filter(id => id !== product.id);
      localStorage.setItem("atyab_deleted_product_ids", JSON.stringify(deletedIds));
    }

    refreshAtyabProducts();
    return { success: true, product };
  } catch (err) {
    console.error("Failed to save custom product:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Update an existing product (custom or built-in)
 */
function updateProductInStorage(productId, updates) {
  try {
    let custom = JSON.parse(localStorage.getItem("atyab_custom_products") || "[]");
    const customIdx = custom.findIndex(p => p.id === productId);

    if (customIdx > -1) {
      custom[customIdx] = { ...custom[customIdx], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem("atyab_custom_products", JSON.stringify(custom));
    } else {
      let updatedMap = JSON.parse(localStorage.getItem("atyab_updated_products") || "{}");
      updatedMap[productId] = { ...(updatedMap[productId] || {}), ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem("atyab_updated_products", JSON.stringify(updatedMap));
    }

    refreshAtyabProducts();
    return { success: true };
  } catch (err) {
    console.error("Failed to update product:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Delete / Remove product from catalog
 */
function deleteProductFromStorage(productId) {
  try {
    // 1. Remove from custom products
    let custom = JSON.parse(localStorage.getItem("atyab_custom_products") || "[]");
    if (Array.isArray(custom)) {
      custom = custom.filter(p => p.id !== productId);
      localStorage.setItem("atyab_custom_products", JSON.stringify(custom));
    }

    // 2. Add to deleted IDs (hides both base & custom)
    let deletedIds = JSON.parse(localStorage.getItem("atyab_deleted_product_ids") || "[]");
    if (!Array.isArray(deletedIds)) deletedIds = [];
    if (!deletedIds.includes(productId)) {
      deletedIds.push(productId);
      localStorage.setItem("atyab_deleted_product_ids", JSON.stringify(deletedIds));
    }

    // 3. Clean up updated map
    let updatedMap = JSON.parse(localStorage.getItem("atyab_updated_products") || "{}");
    if (updatedMap[productId]) {
      delete updatedMap[productId];
      localStorage.setItem("atyab_updated_products", JSON.stringify(updatedMap));
    }

    refreshAtyabProducts();
    return { success: true };
  } catch (err) {
    console.error("Failed to delete product:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Restore all default catalog products
 */
function restoreDefaultCatalogInStorage() {
  try {
    localStorage.removeItem("atyab_deleted_product_ids");
    localStorage.removeItem("atyab_updated_products");
    refreshAtyabProducts();
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

if (typeof window !== "undefined") {
  window.BASE_ATYAB_PRODUCTS = BASE_ATYAB_PRODUCTS;
  window.ATYAB_PRODUCTS = ATYAB_PRODUCTS;
  window.AYTYAB_PRODUCTS = ATYAB_PRODUCTS;
  window.getUnifiedProductsCatalog = getUnifiedProductsCatalog;
  window.refreshAtyabProducts = refreshAtyabProducts;
  window.saveCustomProductToStorage = saveCustomProductToStorage;
  window.updateProductInStorage = updateProductInStorage;
  window.deleteProductFromStorage = deleteProductFromStorage;
  window.restoreDefaultCatalogInStorage = restoreDefaultCatalogInStorage;

  // React instantly to cross-tab product changes
  window.addEventListener("storage", (e) => {
    if (
      e.key === "atyab_custom_products" ||
      e.key === "atyab_deleted_product_ids" ||
      e.key === "atyab_updated_products"
    ) {
      refreshAtyabProducts();
      if (typeof renderProducts === "function") renderProducts();
      if (typeof renderCategoryProducts === "function") renderCategoryProducts();
      if (typeof renderShowcase === "function") renderShowcase();
      if (typeof renderProductsManagement === "function") renderProductsManagement();
    }
  });
}
if (typeof window !== "undefined") {
  window.ATYAB_PRODUCTS = ATYAB_PRODUCTS;
  window.AYTYAB_PRODUCTS = ATYAB_PRODUCTS;
}
