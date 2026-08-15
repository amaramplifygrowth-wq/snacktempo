import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { MenuItem, RestaurantConfig } from '../types';
import { initialMenuItems, initialRestaurantConfig } from '../data/initialData';

// Shared Firebase Project specified by user
const firebaseConfig = {
  projectId: 'gen-lang-client-0510279061',
  appId: '1:232033512681:web:tempo-app',
  storageBucket: 'gen-lang-client-0510279061.appspot.com',
  apiKey: 'AIzaSyDemoTempoClientKeyPlaceholder',
  authDomain: 'gen-lang-client-0510279061.firebaseapp.com',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Target Firestore Database instance
export const db = getFirestore(app);

const MENU_STORAGE_KEY = 'tempo_menu_items_cache';
const CONFIG_STORAGE_KEY = 'tempo_restaurant_config_cache';

/**
 * Load Menu Items with Firestore sync and robust LocalStorage fallback
 */
export async function getStoredMenuItems(): Promise<MenuItem[]> {
  try {
    // Check local cache first for instant rendering
    const cached = localStorage.getItem(MENU_STORAGE_KEY);
    let items: MenuItem[] = cached ? JSON.parse(cached) : initialMenuItems;

    // Try fetching from Firestore collection
    try {
      const menuCol = collection(db, 'menu_items');
      const snapshot = await getDocs(menuCol);
      if (!snapshot.empty) {
        const remoteItems: MenuItem[] = [];
        snapshot.forEach((d) => {
          remoteItems.push(d.data() as MenuItem);
        });
        if (remoteItems.length > 0) {
          items = remoteItems;
          localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(remoteItems));
        }
      }
    } catch (e) {
      console.warn('Firestore fetch fallback to cached/initial menu:', e);
    }

    return items;
  } catch {
    return initialMenuItems;
  }
}

/**
 * Save updated menu items to both Firestore and LocalStorage
 */
export async function persistMenuItems(items: MenuItem[]): Promise<boolean> {
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
    
    // Attempt batch write / individual doc update to Firestore
    try {
      for (const item of items) {
        const itemRef = doc(db, 'menu_items', item.id);
        await setDoc(itemRef, item, { merge: true });
      }
    } catch (err) {
      console.warn('Firestore doc write fallback (saved locally):', err);
    }
    return true;
  } catch (err) {
    console.error('Error persisting menu items:', err);
    return false;
  }
}

/**
 * Load Restaurant Config
 */
export async function getStoredRestaurantConfig(): Promise<RestaurantConfig> {
  try {
    const cached = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
    return initialRestaurantConfig;
  } catch {
    return initialRestaurantConfig;
  }
}

/**
 * Save Restaurant Config
 */
export async function persistRestaurantConfig(config: RestaurantConfig): Promise<boolean> {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    try {
      const configRef = doc(db, 'restaurant_settings', 'main');
      await setDoc(configRef, config, { merge: true });
    } catch (err) {
      console.warn('Firestore config write fallback:', err);
    }
    return true;
  } catch (err) {
    console.error('Error persisting restaurant config:', err);
    return false;
  }
}
