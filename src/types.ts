export type Language = 'fr' | 'ar' | 'en';

export interface Category {
  id: string;
  name: {
    fr: string;
    ar: string;
    en: string;
  };
  icon: string;
  badge?: {
    fr: string;
    ar: string;
    en: string;
  };
  description?: {
    fr: string;
    ar: string;
    en: string;
  };
}

export interface Supplement {
  id: string;
  name: {
    fr: string;
    ar: string;
    en: string;
  };
  price: number;
  category?: 'cheese' | 'meat' | 'veg' | 'sauce' | 'side';
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: {
    fr: string;
    ar: string;
    en: string;
  };
  description: {
    fr: string;
    ar: string;
    en: string;
  };
  price: number;
  image: string;
  isPopular?: boolean;
  isHomemade?: boolean;
  isGratinable?: boolean;
  isMoroccanTouch?: boolean;
  dayAvailable?: {
    fr: string;
    ar: string;
    en: string;
  };
  options?: {
    title: {
      fr: string;
      ar: string;
      en: string;
    };
    choices: Array<{
      id: string;
      name: {
        fr: string;
        ar: string;
        en: string;
      };
      extraPrice?: number;
    }>;
  };
  available: boolean;
}

export interface SelectedOption {
  id: string;
  name: string;
  extraPrice: number;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  gratinage?: {
    enabled: boolean;
    choice?: string;
    price: number;
  };
  supplements: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  selectedOption?: SelectedOption;
  selectedSauce?: string;
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export type DeliveryType = 'delivery' | 'takeaway';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  deliveryType: DeliveryType;
  address: string;
  neighborhood: string;
  notes: string;
}

export interface RestaurantConfig {
  name: string;
  displayName: string;
  mapsName: string;
  tagline: {
    fr: string;
    ar: string;
    en: string;
  };
  whatsappNumber: string;
  phoneNumber: string;
  address: {
    fr: string;
    ar: string;
    en: string;
  };
  mapsUrl: string;
  openingHours: {
    fr: string;
    ar: string;
    en: string;
  };
  takeawayFee: number;
  currency: string;
}
