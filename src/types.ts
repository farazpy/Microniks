export type Language = 'mr' | 'en';

export interface ProductVariant {
  id: string;
  packing: string;
  dealerPrice?: number;
  mrp: number;
  price: number;
}

export interface Product {
  id: string;
  nameMr: string;
  nameEn: string;
  taglineMr: string;
  taglineEn: string;
  category: 'micronutrient' | 'fertilizer' | 'zinc' | 'magnesium' | 'specialty' | 'soil_health' | 'bio_fertilizer';
  price: number;
  mrp: number;
  dealerPrice?: number;
  bagSize: string;
  variants?: ProductVariant[];
  selectedVariantId?: string;
  stock: number;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  shortDescMr: string;
  shortDescEn: string;
  descriptionMr: string;
  descriptionEn: string;
  benefitsMr: string[];
  benefitsEn: string[];
  recommendedCropsMr: string[];
  recommendedCropsEn: string[];
  compositionMr: string;
  compositionEn: string;
  dosageMr: string;
  dosageEn: string;
  isPopular?: boolean;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface ShippingDetails {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  village?: string;
  taluka?: string;
  district?: string;
  city?: string;
  state?: string;
  pincode: string;
  gstin?: string;
  gstNumber?: string;
  notes?: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  phone?: string;
  savedAddresses?: ShippingDetails[];
  createdAt?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userLocation: string;
  rating: number;
  comment: string;
  crop?: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Order {
  id: string;
  orderNumber?: string;
  userId?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  gstAmount: number;
  total: number;
  totalAmount?: number;
  shipping: ShippingDetails;
  shippingDetails?: ShippingDetails;
  paymentMethod: 'razorpay' | 'cod' | 'upi' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'completed' | 'failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentId?: string;
  status: 'pending' | 'paid' | 'processing' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface CropDoctorQuery {
  crop: string;
  stage: string;
  soilType: string;
  season: string;
  problem: string;
  additionalNotes?: string;
}

export interface CropDoctorResult {
  id: string;
  cropName: string;
  diagnosisTitleMr: string;
  diagnosisTitleEn: string;
  doctorAnalysisMr: string;
  doctorAnalysisEn: string;
  deficiency: string;
  severity: 'mild' | 'moderate' | 'severe';
  recommendedProducts: Product[];
  prescriptionStepsMr: string[];
  prescriptionStepsEn: string[];
  applicationDosageMr: string;
  applicationDosageEn: string;
}

export interface BasalDoseItem {
  id: string;
  productNameMr: string;
  productNameEn: string;
  quantityKg: number;
  percentage: number;
  color: string;
  iconName: string;
  descriptionMr: string;
  descriptionEn: string;
}

export interface CropSolution {
  id: string;
  cropNameMr: string;
  cropNameEn: string;
  icon: string;
  image: string;
  descriptionMr: string;
  descriptionEn: string;
  keyNutrientsMr: string[];
  keyNutrientsEn: string[];
  recommendedProducts: string[];
  stages: {
    stageMr: string;
    stageEn: string;
    productMr: string;
    productEn: string;
    dosageMr: string;
    dosageEn: string;
  }[];
}

export interface Testimonial {
  id: string;
  nameMr: string;
  nameEn: string;
  locationMr: string;
  locationEn: string;
  cropMr: string;
  cropEn: string;
  quoteMr: string;
  quoteEn: string;
  rating: number;
  image: string;
  yieldGain: string;
}

export interface BlogPost {
  id: string;
  titleMr: string;
  titleEn: string;
  excerptMr: string;
  excerptEn: string;
  contentMr: string;
  contentEn: string;
  categoryMr: string;
  categoryEn: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export interface DealerLocation {
  id: string;
  districtMr: string;
  districtEn: string;
  dealerNameMr: string;
  dealerNameEn: string;
  townMr: string;
  townEn: string;
  contactPerson: string;
  phone: string;
  lat: number;
  lng: number;
  isMainHub?: boolean;
}

export interface ComparisonItem {
  id: string;
  titleMr: string;
  titleEn: string;
  cropMr: string;
  cropEn: string;
  beforeImage: string;
  afterImage: string;
  beforeLabelMr: string;
  beforeLabelEn: string;
  afterLabelMr: string;
  afterLabelEn: string;
  metricMr: string;
  metricEn: string;
  descriptionMr: string;
  descriptionEn: string;
}
