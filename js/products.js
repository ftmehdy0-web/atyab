/**
 * أطياب للعطور - بيانات المنتجات الرسمية المحدثة (النسخة العربية والإنجليزية - طراز أحمد المغربي)
 * ATYAB PERFUMES - Official Enriched Product Catalog (Arabic & English)
 * All images preserve the authentic company bottles, logos, labels, and calligraphy.
 */

const ATYAB_PRODUCTS = [
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
        priceSAR: 30,
        originalPriceSAR: 45,
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
        priceSAR: 65,
        originalPriceSAR: 95,
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
        priceSAR: 35,
        originalPriceSAR: 50,
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
        priceSAR: 85,
        originalPriceSAR: 120,
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
        priceSAR: 25,
        originalPriceSAR: 38,
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
        priceSAR: 60,
        originalPriceSAR: 85,
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
        priceSAR: 38,
        originalPriceSAR: 55,
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
        priceSAR: 88,
        originalPriceSAR: 125,
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
        priceSAR: 55,
        originalPriceSAR: 75,
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
        priceSAR: 120,
        originalPriceSAR: 165,
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
    category: "dakhoon",
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
        priceSAR: 20,
        originalPriceSAR: 30,
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
        priceSAR: 65,
        originalPriceSAR: 95,
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

const AYTYAB_PRODUCTS = ATYAB_PRODUCTS;
if (typeof window !== "undefined") {
  window.ATYAB_PRODUCTS = ATYAB_PRODUCTS;
  window.AYTYAB_PRODUCTS = ATYAB_PRODUCTS;
}

