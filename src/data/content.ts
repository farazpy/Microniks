import { Product, BasalDoseItem, CropSolution, Testimonial, BlogPost, DealerLocation, ComparisonItem } from '../types';

export const LOGO_URL = 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498106/IMG-20260530-WA0065_1.jpg';

export const COMPANY_DETAILS = {
  nameMr: 'मायक्रॉनिक ॲग्री प्रायव्हेट लिमिटेड',
  nameEn: 'Micronik Agri Private Limited',
  taglineMr: 'उत्तम माती. उत्तम पिके. उत्तम उद्या.',
  taglineEn: 'Better Soil. Better Crops. Better Tomorrow.',
  secondaryLineMr: 'मातीची समज. पिकाचा आधार. शेतकऱ्याचे सक्षमीकरण.',
  secondaryLineEn: 'Understanding the Soil. Supporting the Crop. Empowering the Farmer.',
  positioningMr: 'पिकांचे डॉक्टर (Doctors of Crops)',
  positioningEn: 'Doctors of Crops',
  locationMr: 'पिंपळगाव बसवंत, नाशिक, महाराष्ट्र',
  locationEn: 'Pimpalgaon Baswant, Nashik, Maharashtra, India',
  fullAddressMr: 'मायक्रॉनिक ॲग्री सर्व्हिसेस, वणी रोड, जगदंबा माता मंदिरासमोर, पिंपळगाव बसवंत, तालुका निफाड, जिल्हा नाशिक, महाराष्ट्र ४२२२०९',
  fullAddressEn: 'Micronik Agri Services, Vani Road, In Front of Jagdamba Mata Mandir, Pimpalgaon Baswant, Maharashtra, India 422209',
  contactPerson: 'B.M. Sonawane',
  phones: ['8805452288', '8767278160'],
  phonePrimary: '8805452288',
  phone: '8805452288',
  phoneFormatted: '+91 8805452288 / 8767278160',
  whatsappNumber: '918805452288',
  email: 'micronikagripvtltd@gmail.com',
  gstNumber: '27AAPCM8755L3ZG',
  instagramUrl: 'https://www.instagram.com/micronikagripvtltd?stkn=MW9pdDNvM2Y1Mjh5Nw==',
  workingHoursMr: 'सोम - शनि: सकाळी ९:०० ते संध्याकाळी ७:००',
  workingHoursEn: 'Mon - Sat: 9:00 AM to 7:00 PM',
  establishedYear: '2014',
  farmersServed: '50,000+',
  dealersNetwork: '300+'
};

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'micsell-bm-20',
    nameMr: 'मायक्सेल बीएम-२० (MICSELL BM-20)',
    nameEn: 'MICSELL BM-20',
    taglineMr: 'उच्च क्षमतेचे सूक्ष्म अन्नद्रव्य फॉर्म्युलेशन',
    taglineEn: 'High Performance Micronutrient Formulation',
    category: 'micronutrient',
    price: 273,
    mrp: 430,
    dealerPrice: 273,
    bagSize: '500 GM × 20 Packets',
    variants: [
      {
        id: 'bm20-500g',
        packing: '500 GM × 20 Packets',
        dealerPrice: 273,
        mrp: 430,
        price: 273
      },
      {
        id: 'bm20-1kg',
        packing: '1 KG × 20 Packets',
        dealerPrice: 509,
        mrp: 850,
        price: 509
      }
    ],
    stock: 150,
    inStock: true,
    rating: 4.9,
    reviewsCount: 142,
    sku: 'MIC-BM20-500',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789988510/ChatGPT_Image_Sep_21_2026_04_31_41_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789988510/ChatGPT_Image_Sep_21_2026_04_31_41_PM.png'
    ],
    shortDescMr: 'द्राक्ष, टोमॅटो व फळबागांसाठी विशेष सूक्ष्म अन्नद्रव्य मिश्रण जे पिकांची निरोगी वाढ आणि उत्पादन क्षमता वाढवते.',
    shortDescEn: 'Specialized micronutrient formulation engineered for grapes, tomatoes, and cash crops to accelerate vegetative growth and nutrient uptake.',
    descriptionMr: 'मायक्सेल बीएम-२० (MICSELL BM-20) हे मायक्रॉनिक ॲग्रीचे प्रमाणित सूक्ष्म अन्नद्रव्य खत आहे. हे पिकांमधील अन्नद्रव्यांची कमतरता भरून काढून निरोगी वाढ व उच्च दर्जाचे उत्पादन मिळवून देते.',
    descriptionEn: 'MICSELL BM-20 is a certified plant nutrition formulation designed to correct essential trace element deficiencies and support balanced crop growth.',
    benefitsMr: [
      'पिकांची शाकीय व मुळांची वाढ जोमदार करते',
      'पानांमधील हरितद्रव्य वाढवून प्रकाशसंश्लेषण गतिमान करते',
      'फळांचा आकार आणि वजन एकसारखे राखते',
      'हवामानातील बदलांशी लढण्याची ताकद देते'
    ],
    benefitsEn: [
      'Stimulates vigorous root and shoot development',
      'Boosts chlorophyll synthesis and photosynthetic efficiency',
      'Ensures uniform fruit sizing and weight gain',
      'Improves crop resilience against adverse weather stress'
    ],
    recommendedCropsMr: ['द्राक्ष (Grapes)', 'टोमॅटो (Tomato)', 'डाळिंब (Pomegranate)', 'भाजीपाला'],
    recommendedCropsEn: ['Grapes', 'Tomato', 'Pomegranate', 'Vegetables & Orchards'],
    compositionMr: 'Balanced Micronutrient Formulation (Zinc, Iron, Boron, Manganese, Copper)',
    compositionEn: 'Balanced Micronutrient Formulation (Zinc, Iron, Boron, Manganese, Copper)',
    dosageMr: '५०० ग्रॅम ते १ किलो प्रति एकर (फवारणी अथवा ड्रिपद्वारे)',
    dosageEn: '500 GM to 1 KG per acre (Foliar Spray or Drip Application)',
    isPopular: true
  },
  {
    id: 'micsell-bm-40',
    nameMr: 'मायक्सेल बीएम-४० (MICSELL BM-40)',
    nameEn: 'MICSELL BM-40',
    taglineMr: 'पायाभूत व विशेष पोषण संपृक्त खत',
    taglineEn: 'Specialized Basal & Plant Nutrition Booster',
    category: 'fertilizer',
    price: 278,
    mrp: 450,
    dealerPrice: 278,
    bagSize: '500 GM × 20 Packets',
    variants: [
      {
        id: 'bm40-500g',
        packing: '500 GM × 20 Packets',
        dealerPrice: 278,
        mrp: 450,
        price: 278
      },
      {
        id: 'bm40-1kg',
        packing: '1 KG × 20 Packets',
        dealerPrice: 520,
        mrp: 870,
        price: 520
      }
    ],
    stock: 140,
    inStock: true,
    rating: 5.0,
    reviewsCount: 165,
    sku: 'MIC-BM40-500',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789988182/ChatGPT_Image_Sep_21_2026_04_25_37_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789988182/ChatGPT_Image_Sep_21_2026_04_25_37_PM.png'
    ],
    shortDescMr: 'द्राक्ष घड लांबी, मणी सेटिंग आणि फळ फुगवणीसाठी उच्च क्षमतेचे विशेष खत.',
    shortDescEn: 'High-grade nutritional formula designed to support bunch elongation, berry sizing, and fruit firmness.',
    descriptionMr: 'मायक्सेल बीएम-४० (MICSELL BM-40) हे बागायती पिकांसाठी विशेष विकसित केलेले फॉर्म्युलेशन आहे जे फळांची गुणवत्ता आणि वजन वाढवण्यासाठी मदत करते.',
    descriptionEn: 'MICSELL BM-40 delivers specialized macronutrient and micronutrient synergy for export-quality fruit size and skin texture.',
    benefitsMr: [
      'द्राक्ष घडांची लांबी व एकसारखी सेटिंग घडवून आणते',
      'फळांचे वजन व साखरेचे प्रमाण (Brix) वाढवते',
      'फळांची कातडी टणक करून ट्रान्सपोर्ट क्षमता वाढवते'
    ],
    benefitsEn: [
      'Enhances bunch elongation and uniform fruit set',
      'Maximizes berry tonnage and Brix sugar levels',
      'Improves skin thickness and post-harvest shelf life'
    ],
    recommendedCropsMr: ['द्राक्ष (Export Grapes)', 'टोमॅटो', 'डाळिंब', 'केळी'],
    recommendedCropsEn: ['Export Grapes', 'Tomato', 'Pomegranate', 'Banana'],
    compositionMr: 'Enriched Growth Formulation with Bio-Active Elements',
    compositionEn: 'Enriched Growth Formulation with Bio-Active Elements',
    dosageMr: '५०० ग्रॅम ते १ किलो प्रति एकर',
    dosageEn: '500 GM to 1 KG per acre',
    isPopular: true
  },
  {
    id: 'mollsale-m',
    nameMr: 'मॉलसेल-एम (MOLLSALE-M)',
    nameEn: 'MOLLSALE-M',
    taglineMr: 'सेंद्रिय व सूक्ष्म पोषण समृद्ध विशेष फॉर्म्युला',
    taglineEn: 'Bio-Organic & Micronutrient Enriched Specialty',
    category: 'specialty',
    price: 420,
    mrp: 580,
    dealerPrice: 420,
    bagSize: '250 GM × 40 Packets',
    variants: [
      {
        id: 'molls-250g',
        packing: '250 GM × 40 Packets',
        dealerPrice: 420,
        mrp: 580,
        price: 420
      },
      {
        id: 'molls-500g',
        packing: '500 GM × 40 Packets',
        dealerPrice: 798,
        mrp: 1060,
        price: 798
      }
    ],
    stock: 110,
    inStock: true,
    rating: 4.9,
    reviewsCount: 128,
    sku: 'MIC-MOL-250',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789986674/ChatGPT_Image_Sep_21_2026_04_00_52_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789986674/ChatGPT_Image_Sep_21_2026_04_00_52_PM.png'
    ],
    shortDescMr: 'झाडांची नवती, पांढऱ्या मुळांची संख्या आणि चयापचय क्रिया गतिमान करणारे विशेष उत्पादन.',
    shortDescEn: 'Bio-stimulant and trace element concentrate to invigorate metabolic pathways and active feeder root branching.',
    descriptionMr: 'मॉलसेल-एम (MOLLSALE-M) झाडातील हार्मोन्स आणि एन्झाईम्स सक्रिय करून प्रतिकूल हवामानातही पिकाला तजेलदार ठेवते.',
    descriptionEn: 'MOLLSALE-M acts as a biological metabolic trigger, enhancing root uptake and ensuring stress-free fruit development.',
    benefitsMr: [
      'पांढऱ्या मुळांची संख्या झपाट्याने वाढवते',
      'अन्नद्रव्यांचे जलद वहन करून पिकाला जोमदार बनवते',
      'हवामानातील ताणतणाव सहन करण्याची क्षमता देते'
    ],
    benefitsEn: [
      'Accelerates white root generation and nutrient uptake',
      'Enhances physiological metabolism and plant vigor',
      'Imparts resistance against extreme climate fluctuations'
    ],
    recommendedCropsMr: ['द्राक्ष', 'डाळिंब', 'टोमॅटो', 'स्ट्रॉबेरी', 'भाजीपाला'],
    recommendedCropsEn: ['Grapes', 'Pomegranate', 'Tomato', 'Strawberry', 'Cash Crops'],
    compositionMr: 'Bio-Organic Extract + Trace Mineral Synergy',
    compositionEn: 'Bio-Organic Extract + Trace Mineral Synergy',
    dosageMr: '२५० ते ५०० ग्रॅम प्रति एकर ड्रिप अथवा फवारणीद्वारे',
    dosageEn: '250 to 500 GM per acre via drip or foliar spray',
    isPopular: true
  },
  {
    id: 'microsale-g',
    nameMr: 'मायक्रोसेल जी (MICROSALE G)',
    nameEn: 'MICROSALE G',
    taglineMr: 'दाणेदार माती आरोग्य व सूक्ष्म अन्नद्रव्य पोषण',
    taglineEn: 'Granular Soil Health & Micronutrient Booster',
    category: 'soil_health',
    price: 189,
    mrp: 320,
    dealerPrice: 189,
    bagSize: '500 ML × 20 Bottles',
    variants: [
      {
        id: 'micg-500ml',
        packing: '500 ML × 20 Bottles',
        dealerPrice: 189,
        mrp: 320,
        price: 189
      },
      {
        id: 'micg-1ltr',
        packing: '1 LTR × 10 Bottles',
        dealerPrice: 357,
        mrp: 600,
        price: 357
      }
    ],
    stock: 130,
    inStock: true,
    rating: 4.8,
    reviewsCount: 89,
    sku: 'MIC-MSG-500',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987574/ChatGPT_Image_Sep_21_2026_04_15_17_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987574/ChatGPT_Image_Sep_21_2026_04_15_17_PM.png'
    ],
    shortDescMr: 'मातीची सुपीकता, पांढरी मुळे आणि झाडाची शाकीय वाढ वाढवणारे लिक्विड/ग्रॅन्युलर मायक्रोन्युट्रिएंट.',
    shortDescEn: 'Soil conditioner and liquid micronutrient concentrate that rejuvenates soil biology and stimulates white root flushes.',
    descriptionMr: 'मायक्रोसेल जी (MICROSALE G) मातीमधील जिवाणूंची संख्या वाढवते आणि जमिनीत अडकलेली अन्नद्रव्ये मुळांपर्यंत पोहोचवण्यास मदत करते.',
    descriptionEn: 'MICROSALE G mobilizes locked-up soil nutrients and provides immediate micronutrient availability to root zones.',
    benefitsMr: [
      'मातीतील जिवाणूंची संख्या व सेंद्रिय क्रियाशीलता वाढवते',
      'पांढऱ्या मुळांचे जाळे तयार करते',
      'रासायनिक खतांची कार्यक्षमता वाढवते'
    ],
    benefitsEn: [
      'Promotes beneficial soil microbial activity',
      'Forms a dense network of active white feeder roots',
      'Maximizes efficiency of applied NPK fertilizers'
    ],
    recommendedCropsMr: ['सर्व पिके', 'द्राक्ष', 'कांदा', 'ऊस', 'टोमॅटो'],
    recommendedCropsEn: ['All Crops', 'Grapes', 'Onion', 'Sugarcane', 'Vegetables'],
    compositionMr: 'Bio-Activated Trace Minerals & Organic Solubles',
    compositionEn: 'Bio-Activated Trace Minerals & Organic Solubles',
    dosageMr: '५०० मिली ते १ लिटर प्रति एकर ड्रिपद्वारे',
    dosageEn: '500 ML to 1 LTR per acre via drip irrigation',
    isPopular: false
  },
  {
    id: 'microsale-df',
    nameMr: 'मायक्रोसेल डीएफ (MICROSALE DF)',
    nameEn: 'MICROSALE DF',
    taglineMr: 'लिक्विड ड्रिप व फवारणी सूक्ष्म अन्नद्रव्य',
    taglineEn: 'Liquid Drip & Foliar Micronutrient Concentrate',
    category: 'micronutrient',
    price: 357,
    mrp: 600,
    dealerPrice: 357,
    bagSize: '1 LTR × 10 Bottles',
    variants: [
      {
        id: 'micdf-1ltr',
        packing: '1 LTR × 10 Bottles',
        dealerPrice: 357,
        mrp: 600,
        price: 357
      },
      {
        id: 'micdf-5ltr',
        packing: '5 LTR × 2 Cans',
        dealerPrice: 1549,
        mrp: 2150,
        price: 1549
      },
      {
        id: 'micdf-20ltr',
        packing: '20 LTR × 1 Drum',
        dealerPrice: 5460,
        mrp: 8100,
        price: 5460
      }
    ],
    stock: 90,
    inStock: true,
    rating: 4.9,
    reviewsCount: 110,
    sku: 'MIC-MSDF-1L',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789988181/ChatGPT_Image_Sep_21_2026_04_26_02_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789988181/ChatGPT_Image_Sep_21_2026_04_26_02_PM.png'
    ],
    shortDescMr: '१००% पाण्यात विरघळणारे लिक्विड मायक्रोन्युट्रिएंट जे ड्रिप व फवारणीसाठी अत्यंत सोयीस्कर आहे.',
    shortDescEn: '100% water-soluble liquid micronutrient solution engineered for instant drip feeding and high-absorption foliar sprays.',
    descriptionMr: 'मायक्रोसेल डीएफ (MICROSALE DF) पिकांना आवश्यक सर्व सूक्ष्म अन्नद्रव्ये तात्काळ उपलब्ध करून देते. यामुळे पानांमधील पिवळेपणा काही तासांत नाहीसा होतो.',
    descriptionEn: 'MICROSALE DF is a high-availability liquid grade that quickly corrects interveinal chlorosis and promotes balanced vegetative-reproductive balance.',
    benefitsMr: [
      'ड्रिपमधून देण्यासाठी अतिशय सोपे व त्वरित परिणाम देणारे',
      'पानांमधील सर्व सूक्ष्म अन्नद्रव्यांची कमतरता त्वरित दूर करते',
      'फळांचा रंग, चकाकी आणि आकार सुधारते'
    ],
    benefitsEn: [
      'Readily miscible in drip systems with zero nozzle clogging',
      'Rapidly alleviates multi-micronutrient hunger symptoms',
      'Improves harvest appearance, fruit color, and uniform sizing'
    ],
    recommendedCropsMr: ['द्राक्ष', 'टोमॅटो', 'डाळिंब', 'केळी', 'भाजीपाला'],
    recommendedCropsEn: ['Grapes', 'Tomato', 'Pomegranate', 'Banana', 'Vegetables'],
    compositionMr: 'Liquid Chelate Multi-Micronutrient Concentrate (Fe, Zn, Mn, Cu, B, Mo)',
    compositionEn: 'Liquid Chelate Multi-Micronutrient Concentrate (Fe, Zn, Mn, Cu, B, Mo)',
    dosageMr: '१ लिटर प्रति एकर (ड्रिप) किंवा २ ते २.५ मिली / लिटर पाणी (फवारणी)',
    dosageEn: '1 LTR per acre (Drip) or 2 to 2.5 ML / Liter water (Foliar Spray)',
    isPopular: true
  },
  {
    id: 'boromix-sf',
    nameMr: 'बोरोमिक्स एसएफ (BOROMIX SF)',
    nameEn: 'BOROMIX SF',
    taglineMr: 'मल्टी-मायक्रोन्युट्रिएंट सूक्ष्म अन्नद्रव्य खत मिश्रण',
    taglineEn: 'Multi-Micronutrient Mixture Enriched with Boron & Essential Minerals',
    category: 'micronutrient',
    price: 940,
    mrp: 1300,
    dealerPrice: 940,
    bagSize: '10 KG × 5 × 1 Sack',
    variants: [
      {
        id: 'borosf-10kg',
        packing: '10 KG × 5 × 1 Sack',
        dealerPrice: 940,
        mrp: 1300,
        price: 940
      },
      {
        id: 'borosf-50kg',
        packing: '50 KG × 1 Bag',
        dealerPrice: 4536,
        mrp: 5900,
        price: 4536
      }
    ],
    stock: 95,
    inStock: true,
    rating: 5.0,
    reviewsCount: 189,
    sku: 'MIC-BOR-SF10',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789986668/ChatGPT_Image_Sep_21_2026_03_55_15_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789986668/ChatGPT_Image_Sep_21_2026_03_55_15_PM.png'
    ],
    shortDescMr: 'बोरॉन, झिंक, लोह, मँगनीज आणि कॉपरचे शास्त्रोक्त मिश्रण जे द्राक्ष व डाळिंब मणी तडकणे पूर्णपणे रोखते.',
    shortDescEn: 'Scientific multi-micronutrient mixture rich in Boron and essential trace metals that prevents berry cracking and boosts Brix sugar.',
    descriptionMr: 'बोरोमिक्स एसएफ (BOROMIX SF) हे द्राक्ष बागायतदारांसाठी वरदान आहे. हे परागीभवन सुधारून मणी तडकणे (Berry Cracking) पूर्णपणे रोखते व फळांमध्ये शर्करा (Brix) प्रमाण वाढवते.',
    descriptionEn: 'BOROMIX SF is engineered for viticulture perfection. It prevents fruit splitting, improves pollination, and builds intense skin luster in grapes, pomegranates, and tomatoes.',
    benefitsMr: [
      'द्राक्ष मणी तडकणे (Berry Cracking) पूर्णपणे थांबवते',
      'फूलधारणा व परागीभवन (Pollination) प्रक्रियेला गती देते',
      'फळांमध्ये शर्करा (TSS / Brix) प्रमाण वाढवते',
      'पानांमधील हरितद्रव्य (Chlorophyll) वाढवून पाने टवटवीत ठेवते'
    ],
    benefitsEn: [
      'Prevents grape berry cracking and skin blemishes',
      'Accelerates flowering, pollen tube formation, and fruit set',
      'Increases Brix sugar levels and shelf life of harvest',
      'Boosts chlorophyll synthesis for lush green canopy'
    ],
    recommendedCropsMr: ['द्राक्ष (Grapes Specialist)', 'डाळिंब', 'टोमॅटो', 'संत्रा/मोसंबी', 'स्ट्रॉबेरी'],
    recommendedCropsEn: ['Grapes Specialist', 'Pomegranate', 'Tomato', 'Citrus', 'Strawberry'],
    compositionMr: 'Boron (B 0.5%), Zinc (Zn 5.0%), Iron (Fe 2.0%), Manganese (Mn 1.0%), Copper (Cu 0.5%)',
    compositionEn: 'Boron (B 0.5%), Zinc (Zn 5.0%), Iron (Fe 2.0%), Manganese (Mn 1.0%), Copper (Cu 0.5%)',
    dosageMr: '१० किलो प्रति एकर (बेसल डोस किंवा आळवणी)',
    dosageEn: '10 KG per acre (Basal Dose or Drenching)',
    isPopular: true
  },
  {
    id: 'zincfer',
    nameMr: 'झिंकफर (ZINCFER)',
    nameEn: 'ZINCFER',
    taglineMr: 'उच्च प्रतिचे झिंक व सूक्ष्म अन्नद्रव्य पोषण',
    taglineEn: 'High-Purity Zinc & Plant Growth Activator Nutrition',
    category: 'zinc',
    price: 1680,
    mrp: 2100,
    dealerPrice: 1680,
    bagSize: '25 KG × 1 Bag',
    variants: [
      {
        id: 'zincfer-25k',
        packing: '25 KG × 1 Bag',
        dealerPrice: 1680,
        mrp: 2100,
        price: 1680
      }
    ],
    stock: 80,
    inStock: true,
    rating: 4.8,
    reviewsCount: 96,
    sku: 'MIC-ZNC-25K',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987060/ChatGPT_Image_Sep_21_2026_04_07_04_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987060/ChatGPT_Image_Sep_21_2026_04_07_04_PM.png'
    ],
    shortDescMr: 'झाडांच्या संजीवकांची (Auxins) निर्मिती वाढवणारे व पानांचा आकार मोठा करणारे दर्जेदार झिंकयुक्त पोषण.',
    shortDescEn: 'Chelated & soluble Zinc nutrition that drives natural plant hormone synthesis and prevents leaf rosette defects.',
    descriptionMr: 'झिंकफर (ZINCFER) झाडांची नवती जोमदार करते व पेऱ्यांमधील अंतर (Internode Spacing) संतुलित ठेवून द्राक्ष घड सुटसुटीत बनवते.',
    descriptionEn: 'ZINCFER stimulates natural growth auxins, cures leaf yellowing, and regulates internode distance for optimal bunch aeration.',
    benefitsMr: [
      'झाडांची शाकीय वाढ व नवती (Shoot Growth) जोमदार करते',
      'पानांमधील लहान पिवळेपणा व झिंकची कमतरता दूर करते',
      'इंटरनोड (पेऱ्यांमधील अंतर) योग्य ठेवून घड सुटसुटीत करते',
      'प्रतिकूल हवामानात पिकांचे रक्षण करते'
    ],
    benefitsEn: [
      'Stimulates growth hormones (Auxins) for vigorous shoot growth',
      'Eliminates leaf yellowing and interveinal chlorosis',
      'Maintains ideal internode distance for loose, healthy bunches',
      'Protects crop against sudden heat waves or cold snaps'
    ],
    recommendedCropsMr: ['द्राक्ष', 'मका', 'भाजीपाला', 'टोमॅटो', 'ऊस', 'केळी'],
    recommendedCropsEn: ['Grapes', 'Maize', 'Vegetables', 'Tomato', 'Sugarcane', 'Banana'],
    compositionMr: 'Zinc Sulphate (Zn 21%) + Organic Plant Growth Promoters',
    compositionEn: 'Zinc Sulphate (Zn 21%) + Organic Plant Growth Promoters',
    dosageMr: '२५ किलो प्रति एकर (बेसल डोसमध्ये)',
    dosageEn: '25 KG per acre (In Basal Application)',
    isPopular: true
  },
  {
    id: 'magpro',
    nameMr: 'मॅगप्रो (MAGPRO)',
    nameEn: 'MAGPRO',
    taglineMr: 'प्युअर मॅग्नेशियम सल्फेट व प्रकाशसंश्लेषण उर्जा',
    taglineEn: 'Pure Magnesium Sulphate & Chlorophyll Booster',
    category: 'magnesium',
    price: 580,
    mrp: 750,
    dealerPrice: 580,
    bagSize: '25 KG × 1 Bag',
    variants: [
      {
        id: 'magpro-25k',
        packing: '25 KG × 1 Bag',
        dealerPrice: 580,
        mrp: 750,
        price: 580
      }
    ],
    stock: 110,
    inStock: true,
    rating: 4.9,
    reviewsCount: 114,
    sku: 'MIC-MAG-25K',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987907/ChatGPT_Image_Sep_21_2026_04_17_47_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987907/ChatGPT_Image_Sep_21_2026_04_17_47_PM.png'
    ],
    shortDescMr: 'पानांचा हिरवेगारपणा टिकवून अन्न तयार करण्याची गती दुपटीने वाढवणारे शुद्ध मॅग्नेशियम सल्फेट.',
    shortDescEn: 'Ultra-pure Magnesium Sulphate that energizes chlorophyll formation, boosting photosynthetic output and fruit shine.',
    descriptionMr: 'मॅगप्रो (MAGPRO) हे प्रकाशसंश्लेषण गतीमान करणारे उच्च क्षमतेचे मॅग्नेशियम सल्फेट आहे. हे पानांचा पिवळेपणा घालवून पानांना गडद हिरवा रंग व फळांना चकाकी देते.',
    descriptionEn: 'MAGPRO supplies essential Magnesium and Sulphur. It cures interveinal chlorosis, strengthens green foliage, and maximizes fruit sugar output.',
    benefitsMr: [
      'पानांमधील पिवळेपणा घालवून गर्द हिरवा रंग आणते',
      'प्रकाशसंश्लेषण (Photosynthesis) वेगवान करते',
      'स्फुरद (Phosphorus) उचलण्यास मदत करते',
      'फळांचा रंग, गोडी आणि वजन वाढवते'
    ],
    benefitsEn: [
      'Restores deep dark green foliage by curing magnesium hunger',
      'Accelerates natural sugar production through active photosynthesis',
      'Synergizes phosphorus transport inside plant tissues',
      'Improves final crop tonnage and fruit color uniformness'
    ],
    recommendedCropsMr: ['द्राक्ष', 'टोमॅटो', 'केळी', 'डाळिंब', 'मिरची'],
    recommendedCropsEn: ['Grapes', 'Tomato', 'Banana', 'Pomegranate', 'Chilli'],
    compositionMr: 'Magnesium Sulphate (Mg 9.6% + S 12.0%) High Soluble Grade',
    compositionEn: 'Magnesium Sulphate (Mg 9.6% + S 12.0%) High Soluble Grade',
    dosageMr: '२५ किलो प्रति एकर (बेसल डोस अथवा ड्रिपद्वारे)',
    dosageEn: '25 KG per acre (Basal application or Drip irrigation)',
    isPopular: true
  },
  {
    id: 'silkfert',
    nameMr: 'सिल्कफर्ट (Silkfert)',
    nameEn: 'Silkfert',
    taglineMr: 'सेंद्रिय व सूक्ष्म पोषण संपृक्त खत',
    taglineEn: 'Bio-Mineral Soil Conditioner & Organic Fertilizer',
    category: 'fertilizer',
    price: 1450,
    mrp: 1850,
    dealerPrice: 1450,
    bagSize: '40 KG × 1 Bag',
    variants: [
      {
        id: 'silkfert-40kg',
        packing: '40 KG × 1 Bag',
        dealerPrice: 1450,
        mrp: 1850,
        price: 1450
      }
    ],
    stock: 120,
    inStock: true,
    rating: 5.0,
    reviewsCount: 165,
    sku: 'MIC-SLK-40K',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987574/ChatGPT_Image_Sep_21_2026_04_15_59_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987574/ChatGPT_Image_Sep_21_2026_04_15_59_PM.png'
    ],
    shortDescMr: 'सेंद्रिय कर्ब व मुळांची ताकद वाढवणारा पायाभूत बेसल डोस.',
    shortDescEn: 'Bio-mineral soil conditioner rich in organic carbon and root activators.',
    descriptionMr: 'सिल्कफर्ट (Silkfert) हे जमिनीची सुपीकता, सेंद्रिय कर्ब आणि पांढऱ्या मुळांची संख्या वाढवण्यासाठी अत्यंत प्रभावी आहे.',
    descriptionEn: 'Silkfert strengthens root zones, activates microbial flora, and boosts nutrient uptake efficiency across viticulture and horticulture.',
    benefitsMr: [
      'सेंद्रिय कर्ब (Organic Carbon) वाढवते',
      'पांढऱ्या मुळांची संख्या झपाट्याने वाढवते',
      'जमिनीची पाणी धरून ठेवण्याची क्षमता सुधारते'
    ],
    benefitsEn: [
      'Enriches soil organic carbon',
      'Triggers explosive white feeder root growth',
      'Enhances soil moisture retention & aeration'
    ],
    recommendedCropsMr: ['द्राक्ष', 'डाळिंब', 'टोमॅटो', 'ऊस', 'केळी'],
    recommendedCropsEn: ['Grapes', 'Pomegranate', 'Tomato', 'Sugarcane', 'Banana'],
    compositionMr: 'Organic Carbon (Min 14%), Humic & Fulvic Derivatives with Enriched Minerals',
    compositionEn: 'Organic Carbon (Min 14%), Humic & Fulvic Derivatives with Enriched Minerals',
    dosageMr: '४० किलो प्रति एकर (बेसल डोस)',
    dosageEn: '40 KG per acre (Basal Dose)',
    isPopular: true
  },
  {
    id: 'orthosale',
    nameMr: 'ऑर्थोसेल (Orthosale)',
    nameEn: 'Orthosale',
    taglineMr: 'सक्रिय ऑर्थो-सिलिसिक ॲसिड व वनस्पती रोगप्रतिकारशक्ती बूस्टर',
    taglineEn: 'Active Orthosilicic Acid & Advanced Plant Immunity Booster',
    category: 'specialty',
    price: 850,
    mrp: 1150,
    dealerPrice: 850,
    bagSize: '1 Litre × 1 Bottle',
    variants: [
      {
        id: 'orthosale-1ltr',
        packing: '1 Litre × 1 Bottle',
        dealerPrice: 850,
        mrp: 1150,
        price: 850
      }
    ],
    stock: 85,
    inStock: true,
    rating: 4.9,
    reviewsCount: 78,
    sku: 'MIC-ORT-1L',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987466/ChatGPT_Image_Sep_21_2026_04_14_09_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987466/ChatGPT_Image_Sep_21_2026_04_14_09_PM.png'
    ],
    shortDescMr: 'पेशीभित्तिका मजबूत करून रोग, कीड व हवामानातील ताण सहन करण्याची क्षमता वाढवणारे ऑर्थो-सिलिसिक ॲसिड.',
    shortDescEn: 'Bio-available orthosilicic acid that fortifies cell walls against biotic and abiotic stresses.',
    descriptionMr: 'ऑर्थोसेल (Orthosale) पिकांच्या पानांवर व खोडावर सिलिकाचे नैसर्गिक संरक्षणात्मक आवरण तयार करते, ज्यामुळे बुरशीजन्य रोग व किडींचा प्रादुर्भाव कमी होतो.',
    descriptionEn: 'Orthosale deposits an active silica barrier inside plant epidermis cells, maximizing structural rigidity, heat tolerance, and pest resistance.',
    benefitsMr: [
      'पानांची व फळांची कातडी टणक करते',
      'उष्णता व दुष्काळाचा ताण सहन करण्यास मदत करते',
      'बुरशी व किडींपासून नैसर्गिक संरक्षण पुरवते'
    ],
    benefitsEn: [
      'Thickens cuticle and epidermal cell walls',
      'Increases thermal tolerance and drought endurance',
      'Natural physical barrier against piercing pests and fungal hyphae'
    ],
    recommendedCropsMr: ['द्राक्ष', 'डाळिंब', 'टोमॅटो', 'मिरची', 'कांदा'],
    recommendedCropsEn: ['Grapes', 'Pomegranate', 'Tomato', 'Chilli', 'Onion'],
    compositionMr: 'Orthosilicic Acid (Bio-Available Liquid Silicon Formulation 2.0%)',
    compositionEn: 'Orthosilicic Acid (Bio-Available Liquid Silicon Formulation 2.0%)',
    dosageMr: '१ ते २ मिली प्रति लिटर पाणी (फवारणी) किंवा १ लिटर प्रति एकर (ड्रिप)',
    dosageEn: '1 to 2 ML per Liter water (Foliar) or 1 Litre per acre (Drip)',
    isPopular: true
  },
  {
    id: 'cropgel',
    nameMr: 'क्रॉपजेल (Cropgel)',
    nameEn: 'Cropgel',
    taglineMr: 'उच्च क्षमतेचे कॉन्सन्ट्रेटेड न्यूट्रिएंट जेल खत',
    taglineEn: 'High-Concentration Nutrient Gel & Foliar Energy Delivery',
    category: 'specialty',
    price: 680,
    mrp: 950,
    dealerPrice: 680,
    bagSize: '1 KG × 1 Pack',
    variants: [
      {
        id: 'cropgel-1kg',
        packing: '1 KG × 1 Pack',
        dealerPrice: 680,
        mrp: 950,
        price: 680
      }
    ],
    stock: 95,
    inStock: true,
    rating: 4.8,
    reviewsCount: 62,
    sku: 'MIC-CRG-1K',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987906/ChatGPT_Image_Sep_21_2026_04_19_44_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987906/ChatGPT_Image_Sep_21_2026_04_19_44_PM.png'
    ],
    shortDescMr: 'पानांवर जास्त काळ टिकणारे व त्वरित शोषले जाणारे उच्च एकाग्रतेचे न्यूट्रिएंट जेल.',
    shortDescEn: 'Non-drip nutrient gel designed for prolonged surface adhesion and rapid cellular uptake.',
    descriptionMr: 'क्रॉपजेल (Cropgel) हे प्रगत जेल तंत्रज्ञानावर आधारित खत असून फवारणीनंतर पानांवरून वाहून न जाता तात्काळ पिकाला उपलब्ध होते.',
    descriptionEn: 'Cropgel features advanced adjuvant gel matrices that stick firmly to leaf surfaces without runoff, delivering continuous nutrient feeding.',
    benefitsMr: [
      'फवारणीचे पाणी वाहून न जाता पानांवर टिकून राहते',
      'अन्नद्रव्ये शोषणाची गती तिप्पट वाढवते',
      'फळांची चकाकी व वजन वाढवते'
    ],
    benefitsEn: [
      'Eliminates foliar wash-off and spray drift loss',
      'Triples micronutrient absorption rate',
      'Improves fruit luster, size, and export quality'
    ],
    recommendedCropsMr: ['द्राक्ष', 'टोमॅटो', 'डाळिंब', 'भाजीपाला', 'केळी'],
    recommendedCropsEn: ['Grapes', 'Tomato', 'Pomegranate', 'Vegetables', 'Banana'],
    compositionMr: 'Concentrated Micro & Macro Mineral Gel with Bio-Polymer Matrix',
    compositionEn: 'Concentrated Micro & Macro Mineral Gel with Bio-Polymer Matrix',
    dosageMr: '२ ते २.५ ग्रॅम प्रति लिटर पाणी (फवारणी)',
    dosageEn: '2 to 2.5 GM per Liter water (Foliar spray)',
    isPopular: false
  },
  {
    id: 'potassium-schoenite',
    nameMr: 'पोटॅशियम शोएनाइट (Potassium Schoenite)',
    nameEn: 'Potassium Schoenite',
    taglineMr: 'क्लोराईडमुक्त पोटॅश व मॅग्नेशियम सल्फेट खत',
    taglineEn: 'Chloride-Free Dual Potash & Magnesium Sulphate Nutrition',
    category: 'fertilizer',
    price: 3020,
    mrp: 3800,
    dealerPrice: 3020,
    bagSize: '25 KG × 1 Bag',
    variants: [
      {
        id: 'potschoen-25kg',
        packing: '25 KG × 1 Bag',
        dealerPrice: 3020,
        mrp: 3800,
        price: 3020
      }
    ],
    stock: 70,
    inStock: true,
    rating: 5.0,
    reviewsCount: 89,
    sku: 'MIC-PST-25K',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987387/ChatGPT_Image_Sep_21_2026_04_11_42_PM.png',
    gallery: [
      'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789987387/ChatGPT_Image_Sep_21_2026_04_11_42_PM.png'
    ],
    shortDescMr: 'मणी फुगवणी, शर्करा वाढ व चकाकीसाठी सर्वोत्तम क्लोराईडमुक्त पोटॅशियम व मॅग्नेशियम खत.',
    shortDescEn: '100% water-soluble Potash (K₂O 23%) and Magnesium (MgO 11%) for Brix sugar and fruit sizing.',
    descriptionMr: 'पोटॅशियम शोएनाइट (Potassium Schoenite) हे द्राक्ष व फळबागांसाठी अत्यावश्यक खत आहे. हे क्लोराईडमुक्त असल्याने जमिनीची क्षारता न वाढवता फळांचे वजन व गोडी वाढवते.',
    descriptionEn: 'Potassium Schoenite provides balanced potassium and magnesium in sulphate form, critical for carbohydrate transport and fruit weight without salt buildup.',
    benefitsMr: [
      'फळांमधील शर्करा (Brix) व रंग वेगाने सुधारते',
      'क्लोराईडमुक्त असल्याने पिकाला कोणताही धक्का बसत नाही',
      'द्राक्ष मण्यांची लांबी व वजन वाढवते'
    ],
    benefitsEn: [
      'Maximizes sugar Brix and uniform coloring',
      'Zero chloride content protects sensitive root zones',
      'Accelerates berry elongation and pulp density'
    ],
    recommendedCropsMr: ['द्राक्ष (Viticulture)', 'डाळिंब', 'केळी', 'टोमॅटो', 'संत्रा'],
    recommendedCropsEn: ['Grapes (Viticulture)', 'Pomegranate', 'Banana', 'Tomato', 'Citrus'],
    compositionMr: 'Potassium (K₂O 23%) + Magnesium (MgO 11%) Sulphate Grade (FCO Standard)',
    compositionEn: 'Potassium (K₂O 23%) + Magnesium (MgO 11%) Sulphate Grade (FCO Standard)',
    dosageMr: '२५ किलो प्रति एकर (ड्रिप अथवा बेसल डोस)',
    dosageEn: '25 KG per acre (Drip or Basal Application)',
    isPopular: true
  }
];

export const BASAL_DOSE_ITEMS: BasalDoseItem[] = [
  {
    id: 'boromix-sf',
    productNameMr: 'बोरोमिक्स एसएफ (BOROMIX SF)',
    productNameEn: 'BOROMIX SF',
    quantityKg: 10,
    percentage: 10,
    color: '#B71C1C',
    iconName: 'Sparkles',
    descriptionMr: 'मायक्रोन्युट्रिएंट्सचे योग्य संतुलन, मणी फुटणे रोखते व चकाकी आणते.',
    descriptionEn: 'Essential trace minerals for berry strength, flowering & shine.'
  },
  {
    id: 'micsell-bm-40',
    productNameMr: 'मायक्सेल बीएम-४० (MICSELL BM-40)',
    productNameEn: 'MICSELL BM-40',
    quantityKg: 40,
    percentage: 40,
    color: '#F5C400',
    iconName: 'ShieldCheck',
    descriptionMr: 'सेंद्रिय व सूक्ष्म पोषण संपृक्त खत, घडांची लांबी व मुळांची ताकद वाढवणारा डोस.',
    descriptionEn: 'Soil conditioner & root mass backbone providing plant vigor.'
  },
  {
    id: 'zincfer',
    productNameMr: 'झिंकफर (ZINCFER)',
    productNameEn: 'ZINCFER',
    quantityKg: 25,
    percentage: 25,
    color: '#1B5E20',
    iconName: 'Zap',
    descriptionMr: 'संजीवकांची निर्मिती, पानांचा आकार मोठा व पेऱ्यांमधील अंतर योग्य ठेवते.',
    descriptionEn: 'Hormonal growth driver ensuring ideal bunch internode spacing.'
  },
  {
    id: 'magpro',
    productNameMr: 'मॅगप्रो (MAGPRO)',
    productNameEn: 'MAGPRO',
    quantityKg: 25,
    percentage: 25,
    color: '#4CAF50',
    iconName: 'Sun',
    descriptionMr: 'हरितद्रव्य निर्मिती आणि प्रकाशसंश्लेषण वेगवान करून पाने गर्द हिरवी ठेवते.',
    descriptionEn: 'Magnesium boost for dark leaf canopy & active photosynthesis.'
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 'doctors_of_crops',
    titleMr: 'पिकांचे डॉक्टर (Doctors of Crops)',
    titleEn: 'Doctors of Crops Philosophy',
    descMr: 'केवळ खत विक्री नाही, तर माती व पिकाच्या गरजेनुसार अचूक कृषी औषध आणि पोषण सल्ला.',
    descEn: 'We don’t just sell fertilizers; we diagnose soil chemistry and prescribe targeted crop nutrition.',
    icon: 'Stethoscope'
  },
  {
    id: 'quality',
    titleMr: 'प्रयोगशाळा प्रमाणित गुणवत्ता (Lab Certified)',
    titleEn: '100% Lab-Tested Purity',
    descMr: 'प्रत्येक बॅचची कडक प्रयोगशाळा तपासणी. आंतरराष्ट्रीय दर्जाची भेसळमुक्त खते.',
    descEn: 'Every batch passes multi-point lab verification ensuring maximum solubility and zero heavy metals.',
    icon: 'Award'
  },
  {
    id: 'yield',
    titleMr: 'उत्पादनात २५% ते ३५% वाढ (Proven Tonnage)',
    titleEn: '25% to 35% Yield Surge',
    descMr: 'द्राक्ष, टोमॅटो व डाळिंब पिकांमध्ये हमखास उत्पादन वाढ आणि एक्सपोर्ट दर्जा.',
    descEn: 'Proven record of boosting crop weight, berry elongation, and premium market pricing.',
    icon: 'TrendingUp'
  },
  {
    id: 'grapes_experts',
    titleMr: 'द्राक्ष बागायतदार तज्ज्ञ (Grape Viticulture Hub)',
    titleEn: 'Pimpalgaon Grape Pioneers',
    descMr: 'पिंपळगाव बसवंतच्या द्राक्ष राजधानीत १०+ वर्षांचा प्रत्यक्ष अनुभव व संशोधन.',
    descEn: 'Decade of specialized viticulture research based in Pimpalgaon Baswant, Maharashtra.',
    icon: 'Grape'
  },
  {
    id: 'soil_first',
    titleMr: 'माती-प्रथम विचार (Soil-First Approach)',
    titleEn: 'Soil-First Science',
    descMr: 'मातीचा पीएच आणि सेंद्रिय कर्ब सुधारून जमिनीचे आरोग्य पिढ्यानपिढ्या टिकवणे.',
    descEn: 'Restoring organic carbon and CEC balance so your farmland remains fertile for generations.',
    icon: 'Sprout'
  },
  {
    id: 'fast_delivery',
    titleMr: 'थेट शेतावर डिलिव्हरी (Direct Farm Dispatch)',
    titleEn: 'Direct Farm Dispatch & Support',
    descMr: 'नाशिक डेपोमधून थेट शेतकऱ्याच्या शेतावर किंवा जवळील कृषी दुकानात जलद पुरवठा.',
    descEn: 'Rapid delivery across Maharashtra with dedicated agronomist helpline support.',
    icon: 'Truck'
  }
];

export const CROP_SOLUTIONS: CropSolution[] = [
  {
    id: 'grapes',
    cropNameMr: 'द्राक्ष (Grapes Viticulture)',
    cropNameEn: 'Grapes (Export Viticulture)',
    icon: 'Grape',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498149/IMG-20260821-WA0030_1.jpg',
    descriptionMr: 'पिंपळगाव बसवंत व नाशिक भागातील द्राक्ष बागांसाठी विशेष बेसल डोस आणि टप्पा-निहाय पोषण नियोजन.',
    descriptionEn: 'Complete viticulture nutrition schedule featuring our flagship basal and micronutrient line for export quality grapes.',
    keyNutrientsMr: ['BOROMIX SF', 'MICSELL BM-40', 'ZINCFER', 'MAGPRO'],
    keyNutrientsEn: ['BOROMIX SF', 'MICSELL BM-40', 'ZINCFER', 'MAGPRO'],
    recommendedProducts: ['boromix-sf', 'micsell-bm-40', 'zincfer', 'magpro', 'mollsale-m', 'microsale-df'],
    stages: [
      {
        stageMr: 'ऑक्टोबर छाटणी / बेसल डोस (October Pruning / Basal)',
        stageEn: 'October Pruning & Basal Dose',
        productMr: 'BOROMIX SF + MICSELL BM-40 + ZINCFER + MAGPRO',
        productEn: 'BOROMIX SF + MICSELL BM-40 + ZINCFER + MAGPRO',
        dosageMr: 'प्रति एकर शिफारसीनुसार',
        dosageEn: 'As per acre viticulture chart'
      },
      {
        stageMr: 'पेडी व पोगा अवस्था (Shoot & Flower Bud Initiation)',
        stageEn: 'Shoot & Flower Bud Initiation',
        productMr: 'ZINCFER + MICROSALE G',
        productEn: 'ZINCFER + MICROSALE G',
        dosageMr: '५०० मिली / ५ किलो ड्रिपद्वारे',
        dosageEn: '500 ML / 5 KG via drip'
      },
      {
        stageMr: 'फूलधारणा व सेटिंग अवस्था (Flowering & Berry Set)',
        stageEn: 'Flowering & Berry Set Stage',
        productMr: 'BOROMIX SF Spray & Drenching',
        productEn: 'BOROMIX SF Spray & Drenching',
        dosageMr: '२ ग्रॅम / लिटर फवारणी',
        dosageEn: '2 gm / Liter Foliar Spray'
      },
      {
        stageMr: 'मणी विकास व शर्करा वाढ (Berry Elongation & Sugar Brix)',
        stageEn: 'Berry Elongation & Sugar Brix Stage',
        productMr: 'MOLLSALE-M + MAGPRO',
        productEn: 'MOLLSALE-M + MAGPRO',
        dosageMr: '५०० ग्रॅम / १० किलो प्रति एकर',
        dosageEn: '500 GM / 10 KG per acre'
      }
    ]
  },
  {
    id: 'pomegranate',
    cropNameMr: 'डाळिंब (Pomegranate)',
    cropNameEn: 'Pomegranate Orchards',
    icon: 'Citrus',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498137/IMG-20260821-WA0024.jpg',
    descriptionMr: 'डाळिंब फळे तडकणे रोखण्यासाठी आणि लालचुटुक रंग व वजनासाठी खास मायक्रोन्युट्रिएंट डोस.',
    descriptionEn: 'Prevents fruit cracking, ensures deep red aril color and improves export packout rates.',
    keyNutrientsMr: ['BOROMIX SF', 'MICSELL BM-20', 'ZINCFER', 'MOLLSALE-M'],
    keyNutrientsEn: ['BOROMIX SF', 'MICSELL BM-20', 'ZINCFER', 'MOLLSALE-M'],
    recommendedProducts: ['boromix-sf', 'micsell-bm-20', 'zincfer', 'mollsale-m'],
    stages: [
      {
        stageMr: 'बहार धरणे (Rest & Flowering Initiation)',
        stageEn: 'Rest & Flowering Initiation',
        productMr: 'BOROMIX SF + MICSELL BM-20',
        productEn: 'BOROMIX SF + MICSELL BM-20',
        dosageMr: '१० किलो प्रति एकर',
        dosageEn: '10 KG per acre'
      },
      {
        stageMr: 'फळ वाढ व फुगवणी (Fruit Expansion)',
        stageEn: 'Fruit Expansion',
        productMr: 'MAGPRO + ZINCFER',
        productEn: 'MAGPRO + ZINCFER',
        dosageMr: '१५ किलो प्रति एकर',
        dosageEn: '15 KG per acre'
      }
    ]
  },
  {
    id: 'tomato',
    cropNameMr: 'टोमॅटो (Tomato Crop)',
    cropNameEn: 'Tomatoes & Capsicum',
    icon: 'Apple',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498145/IMG-20260821-WA0025.jpg',
    descriptionMr: 'टोमॅटो फळांची चकाकी, वजन आणि व्हायरस प्रतिकारशक्ती वाढवण्यासाठी संतुलित मायक्रोन्युट्रिएंट डोस.',
    descriptionEn: 'High-potency nutrient program to prevent blossom end rot, enhance fruit firmness, and increase picking count.',
    keyNutrientsMr: ['ZINCFER', 'MAGPRO', 'BOROMIX SF', 'MICROSALE DF'],
    keyNutrientsEn: ['ZINCFER', 'MAGPRO', 'BOROMIX SF', 'MICROSALE DF'],
    recommendedProducts: ['zincfer', 'magpro', 'boromix-sf', 'microsale-df'],
    stages: [
      {
        stageMr: 'लागवड व बेसल डोस (Basal Planting)',
        stageEn: 'Basal Planting',
        productMr: 'MICSELL BM-40 + ZINCFER',
        productEn: 'MICSELL BM-40 + ZINCFER',
        dosageMr: 'शिफारसीनुसार प्रति एकर',
        dosageEn: 'As recommended per acre'
      },
      {
        stageMr: 'फूलधारणा अवस्था (Flowering Stage)',
        stageEn: 'Flowering Stage',
        productMr: 'BOROMIX SF',
        productEn: 'BOROMIX SF',
        dosageMr: '५ किलो प्रति एकर',
        dosageEn: '5 KG per acre'
      },
      {
        stageMr: 'तोडा व फळ पक्वता (Fruit Harvesting)',
        stageEn: 'Fruit Harvesting',
        productMr: 'MAGPRO + MICROSALE DF',
        productEn: 'MAGPRO + MICROSALE DF',
        dosageMr: '१० किलो / १ लिटर प्रति एकर',
        dosageEn: '10 KG / 1 LTR per acre'
      }
    ]
  },
  {
    id: 'vegetables',
    cropNameMr: 'भाजीपाला (Vegetables & Onion)',
    cropNameEn: 'Vegetables & Cash Crops',
    icon: 'Carrot',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498124/IMG-20260821-WA0023_1.jpg',
    descriptionMr: 'कांदा, मिरची, वांगी व भाजीपाला पिकांची गुणवत्ता वाढवण्यासाठी सुलभ खत नियोजन.',
    descriptionEn: 'Tailored trace element blends for onions, peppers, and cash vegetable farming.',
    keyNutrientsMr: ['MICSELL BM-20', 'ZINCFER', 'BOROMIX SF'],
    keyNutrientsEn: ['MICSELL BM-20', 'ZINCFER', 'BOROMIX SF'],
    recommendedProducts: ['micsell-bm-20', 'zincfer', 'boromix-sf', 'microsale-g'],
    stages: [
      {
        stageMr: 'पुनर्लागवड (Transplanting)',
        stageEn: 'Transplanting',
        productMr: 'MICROSALE G + ZINCFER',
        productEn: 'MICROSALE G + ZINCFER',
        dosageMr: '१ लिटर / १० किलो प्रति एकर',
        dosageEn: '1 LTR / 10 KG per acre'
      }
    ]
  },
  {
    id: 'commercial',
    cropNameMr: 'व्यावसायिक पिके (Commercial Crops - Sugarcane, Cotton & Maize)',
    cropNameEn: 'Commercial Crops (Sugarcane, Cotton & Maize)',
    icon: 'Trees',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498111/IMG-20260601-WA0007.jpg',
    descriptionMr: 'ऊस, कापूस आणि मका पिकांच्या कांड्यांची जाडी, वजन व टनेज वाढवणारे पोषण.',
    descriptionEn: 'Maximizes stalk thickness, sucrose content, and boll weight in sugarcane and cotton.',
    keyNutrientsMr: ['ZINCFER', 'MAGPRO', 'MICSELL BM-40'],
    keyNutrientsEn: ['ZINCFER', 'MAGPRO', 'MICSELL BM-40'],
    recommendedProducts: ['zincfer', 'magpro', 'micsell-bm-40', 'microsale-df'],
    stages: [
      {
        stageMr: 'लागवड व फूट (Tillering & Vegetative)',
        stageEn: 'Tillering & Vegetative',
        productMr: 'ZINCFER + MICSELL BM-40',
        productEn: 'ZINCFER + MICSELL BM-40',
        dosageMr: '२० किलो प्रति एकर',
        dosageEn: '20 KG per acre'
      }
    ]
  },
  {
    id: 'seasonal',
    cropNameMr: 'हंगामी पिके (Seasonal Crops - Soyabean, Pulses & Cereals)',
    cropNameEn: 'Seasonal Crops (Soyabean, Pulses & Cereals)',
    icon: 'Sprout',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498149/IMG-20260821-WA0030_1.jpg',
    descriptionMr: 'सोयाबीन, हरभरा आणि डाळींच्या शेंगांचे प्रमाण वाढवणारे सूक्ष्म अन्नद्रव्य खत.',
    descriptionEn: 'Enhances pod formation, grain filling, and protein synthesis in rainfed seasonal pulses.',
    keyNutrientsMr: ['BOROMIX SF', 'MICSELL BM-30'],
    keyNutrientsEn: ['BOROMIX SF', 'MICSELL BM-30'],
    recommendedProducts: ['boromix-sf', 'micsell-bm-30'],
    stages: [
      {
        stageMr: 'फूलधारणा (Pod Initiation)',
        stageEn: 'Pod Initiation',
        productMr: 'BOROMIX SF',
        productEn: 'BOROMIX SF',
        dosageMr: '५ किलो प्रति एकर',
        dosageEn: '5 KG per acre'
      }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    nameMr: 'नितीन नानासाहेब पाटील',
    nameEn: 'Nitin Nanasaheb Patil',
    locationMr: 'पिंपळगाव बसवंत, नाशिक',
    locationEn: 'Pimpalgaon Baswant, Nashik',
    cropMr: 'द्राक्ष बागायतदार (१५ एकर)',
    cropEn: 'Grape Grower (15 Acres)',
    quoteMr: 'मागील ५ वर्षांपासून मी माझ्या १५ एकर द्राक्ष बागेत माइक्रॉनिकचा १०० किलो बेसल डोस (बोरोमिक्स-५एफ, सिल्कफर्ट, झिंकफर, मॅगप्रो) वापरत आहे. मणी तडकणे पूर्ण थांबले असून एक्सपोर्ट बागेत २५ टनापेक्षा जास्त उत्पादन मिळाले!',
    quoteEn: 'I have been using Micronik’s 100 KG Basal Kit for 5 years on my 15-acre vineyard. Berry cracking stopped completely and my export yield exceeded 25 tons per acre!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    yieldGain: '+२८% उत्पन्न वाढ'
  },
  {
    id: 't2',
    nameMr: 'ज्ञानेश्वर कारभारी बनकर',
    nameEn: 'Dnyaneshwar Karbhari Bankar',
    locationMr: 'ओझर, नाशिक',
    locationEn: 'Ozar, Nashik',
    cropMr: 'टोमॅटो व द्राक्ष शेतकरी',
    cropEn: 'Tomato & Grape Farmer',
    quoteMr: 'माइक्रॉनिकचे बोरोमिक्स-५एफ आणि मॅगप्रो टोमॅटो पिकासाठी वरदान ठरले आहे. टोमॅटो फळांची चकाकी आणि टणकपणा अप्रतिम आहे. बाजारात माझ्या मालाला रु. ५०-६० जास्त भाव मिळाला.',
    quoteEn: 'Micronik Boromix-5F & Magpro transformed my tomato crop. The fruit shine and firmness were outstanding, earning me a premium price in Nashik market.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    yieldGain: 'उच्च बाजार भाव'
  },
  {
    id: 't3',
    nameMr: 'भाऊसाहेब एकनाथ सानप',
    nameEn: 'Bhausaheb Eknath Sanap',
    locationMr: 'दिंडोरी, नाशिक',
    locationEn: 'Dindori, Nashik',
    cropMr: 'डाळिंब बागायतदार',
    cropEn: 'Pomegranate Grower',
    quoteMr: 'बी. एम. सोनवणे सरांच्या मार्गदर्शनाखाली सिल्कफर्ट व झिंकफर वापरल्याने डाळिंबाची फळे तडकणे बंद झाले आणि पानांची हिरवळ शेवटपर्यंत टिकून राहिली.',
    quoteEn: 'Under B.M. Sonawane Sir’s personal guidance, using Silkfert & Zincfer cured pomegranate splitting and kept the trees healthy all season.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
    yieldGain: '१००% तडकणेमुक्त फळे'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'grape-october-pruning-tips',
    titleMr: 'द्राक्ष बागेत ऑक्टोबर छाटणीनंतर १०० किलो बेसल डोसचे महत्त्व',
    titleEn: 'Importance of 100 KG Basal Dose After Grape October Pruning',
    excerptMr: 'ऑक्टोबर छाटणीनंतर द्राक्ष बागेत योग्य पोषण देणे म्हणजे भरघोस व दर्जेदार एक्सपोर्ट उत्पादनाची खात्री. जाणून घ्या सिल्कफर्ट, बोरोमिक्स-५एफ चे प्रमाण.',
    excerptEn: 'Learn how to apply the 100 KG Basal Dose during October grape pruning to secure maximum export-grade tonnage.',
    contentMr: `द्राक्ष बागेत ऑक्टोबर छाटणी ही सर्वात महत्त्वाची टप्पा मानली जाते. या काळात झाडाच्या पांढऱ्या मुळांना सशक्त बनवणे आणि घड निर्मितीसाठी आवश्यक ती सर्व सूक्ष्म अन्नद्रव्ये जमिनीतून पुरवणे अत्यंत गरजेचे असते.

माइक्रॉनिक ॲग्रीचा विशेष १०० किलो बेसल डोस:
१. बोरोमिक्स-५एफ (१० किलो) - बोरॉन आणि ५ मुख्य सूक्ष्म घटकांचे मिश्रण जे परागीभवन सुधारते.
२. सिल्कफर्ट (४० किलो) - सेंद्रिय कर्ब व मुळांची ताकद वाढवणारा मुख्य घटक.
३. झिंकफर (२५ किलो) - पेऱ्यांमधील अंतर योग्य ठेवून झाडाची संजीवके सक्रिय करतो.
४. मॅगप्रो (२५ किलो) - पानांमधील हरितद्रव्य वाढवून प्रकाशसंश्लेषण वेगवान करते.

हा १०० किलो डोस प्रति एकर दिल्यास द्राक्ष मणी तडकण्याची समस्या पूर्णपणे दूर होते व मण्यांचा आकार एकसारखा होतो.`,
    contentEn: `October pruning is the critical turning point in viticulture. During this period, empowering white feeder roots and building soil nutrient reservoirs dictates harvest quality.

Micronik Agri's Signature 100 KG Basal Formula:
1. Boromix-5F (10 KG): Multi-micronutrient grade essential for pollen tube growth and berry setting.
2. Silkfert (40 KG): Organic soil conditioner supplying carbon & root vitality.
3. Zincfer (25 KG): Natural auxin builder for ideal internode elongation.
4. Magpro (25 KG): High-purity magnesium sulphate driving intense chlorophyll synthesis.

Applying this dose per acre eliminates berry cracking and yields uniform export bunches.`,
    categoryMr: 'द्राक्ष शेती मार्गदर्शन',
    categoryEn: 'Grape Viticulture',
    date: '१० सप्टेंबर २०२६',
    readTime: '४ मिनिटे',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498149/IMG-20260821-WA0030_1.jpg',
    author: 'B.M. Sonawane (Crop Doctor)'
  },
  {
    id: 'micronutrient-deficiency-guide',
    titleMr: 'पिकांमधील सूक्ष्म अन्नद्रव्यांची कमतरता कशी ओळखावी?',
    titleEn: 'How to Identify Micronutrient Deficiencies in Crops',
    excerptMr: 'झिंक, बोरॉन आणि मॅग्नेशियमच्या कमतरतेची लक्षणे ओळखा आणि वेळेवर माइक्रॉनिक खतांचा वापर करून पीक वाचवा.',
    excerptEn: 'Identify visual chlorosis, rosette leaves, and boron deficiency symptoms early to safeguard your crop value.',
    contentMr: `झाडांना एनपीके (NPK) सोबतच सूक्ष्म अन्नद्रव्यांची (Micronutrients) अत्यंत गरज असते. 

प्रमुख कमतरतेची लक्षणे:
- झिंक (Zinc) कमतरता: नवी पाने लहान होणे, पानांच्या शिरामधील भाग पिवळा पडणे.
- बोरॉन (Boron) कमतरता: फळे तडकणे, कळ्या गळणे व मण्यांचा आकार वाकडा होणे.
- मॅग्नेशियम (Magnesium) कमतरता: जुनी पाने पिवळी पडणे पण शिरा हिरव्या राहणे.

माइक्रॉनिक बोरोमिक्स-५एफ आणि झिंकफरच्या वापराने या सर्व कमतरता त्वरित दूर होतात.`,
    contentEn: `In addition to NPK, crops require micro-minerals in exact trace quantities.

Visual Symptoms:
- Zinc Hunger: Small rosette leaves, interveinal yellowing on new shoots.
- Boron Hunger: Fruit skin cracking, blossom drop, deformed berries.
- Magnesium Hunger: Bottom leaves turn yellow while veins remain green.

Micronik Boromix-5F and Zincfer rapidly resolve these deficiencies.`,
    categoryMr: 'माती व पीक आरोग्य',
    categoryEn: 'Soil & Crop Health',
    date: '०१ सप्टेंबर २०२६',
    readTime: '५ मिनिटे',
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498137/IMG-20260821-WA0024.jpg',
    author: 'माइक्रॉनिक ॲग्रोनॉमी टीम'
  }
];

export const DEALERS_LOCATIONS: DealerLocation[] = [
  {
    id: 'd1',
    districtMr: 'नाशिक (मुख्य केंद्र)',
    districtEn: 'Nashik (Main Hub)',
    dealerNameMr: 'माइक्रॉनिक ॲग्री सर्व्हिसेस (मुख्य डेपो)',
    dealerNameEn: 'Micronik Agri Services (Head Depot)',
    townMr: 'पिंपळगाव बसवंत, नाशिक',
    townEn: 'Vani Road, Pimpalgaon Baswant, Nashik',
    contactPerson: 'B.M. Sonawane',
    phone: '8805452288',
    lat: 20.1712,
    lng: 73.9842,
    isMainHub: true
  },
  {
    id: 'd2',
    districtMr: 'नाशिक',
    districtEn: 'Nashik',
    dealerNameMr: 'बसुका कृषी सेवा केंद्र',
    dealerNameEn: 'Basuka Krushi Seva Kendra',
    townMr: 'ओझर मिग, निफाड',
    townEn: 'Ozar MIG, Niphad',
    contactPerson: 'Sanjay Patil',
    phone: '9822334455',
    lat: 20.0984,
    lng: 73.9241
  },
  {
    id: 'd3',
    districtMr: 'नाशिक',
    districtEn: 'Nashik',
    dealerNameMr: 'किसान मित्र ॲग्रो',
    dealerNameEn: 'Kisan Mitra Agro',
    townMr: 'वणी, दिंडोरी',
    townEn: 'Vani, Dindori',
    contactPerson: 'Ramesh Sanap',
    phone: '9423188220',
    lat: 20.2511,
    lng: 73.8944
  }
];

export const BEFORE_AFTER_RESULTS: ComparisonItem[] = [
  {
    id: 'bunch-setting',
    titleMr: 'द्राक्ष घड एकसारखी सेटिंग व मण्यांची लांबी',
    titleEn: 'Grape Bunch Uniformity & Elongation',
    cropMr: 'द्राक्ष बाग (पिंपळगाव बसवंत)',
    cropEn: 'Grape Vineyard (Pimpalgaon Baswant)',
    beforeImage: 'https://images.unsplash.com/photo-1537084642907-629340c7e59c?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498149/IMG-20260821-WA0030_1.jpg',
    beforeLabelMr: 'मायक्रॉनिक बेसल डोस आधी (बारीक व तडकलेले मणी)',
    beforeLabelEn: 'Before Micronik (Irregular & Small Berries)',
    afterLabelMr: 'मायक्रॉनिक १०० किलो बेसल डोसनंतर (उत्कृष्ट एक्सपोर्ट प्रत)',
    afterLabelEn: 'After 100 KG Basal Kit (Export Quality Uniform Berries)',
    metricMr: '+३२% उत्पादनात वाढ',
    metricEn: '+32% Yield Surge',
    descriptionMr: 'बोरोमिक्स-५एफ आणि सिल्कफर्टच्या वापरामुळे द्राक्ष घडांची लांबी वाढली व मणी तडकणे ०% वर आले.',
    descriptionEn: 'Use of Boromix-5F & Silkfert eliminated berry cracking and produced export-spec bunch length.'
  }
];
