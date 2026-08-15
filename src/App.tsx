import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { SpecialHighlights } from './components/SpecialHighlights';
import { MenuSection } from './components/MenuSection';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { 
  MenuItem, 
  Category, 
  Supplement, 
  CartItem, 
  Language, 
  RestaurantConfig 
} from './types';
import { 
  initialCategories, 
  initialMenuItems, 
  initialSupplements, 
  initialRestaurantConfig 
} from './data/initialData';
import { 
  getStoredMenuItems, 
  persistMenuItems, 
  getStoredRestaurantConfig, 
  persistRestaurantConfig 
} from './services/firebase';
import { translations } from './data/translations';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  // State
  const [lang, setLang] = useState<Language>('fr');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [config, setConfig] = useState<RestaurantConfig>(initialRestaurantConfig);
  const [categories] = useState<Category[]>(initialCategories);
  const [supplements] = useState<Supplement[]>(initialSupplements);
  
  // Navigation & Search
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart State (stored in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tempo_cart_cache');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('tempo_cart_cache', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Listen to /admin route or #admin in URL
  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/admin') || hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    handleUrlRouting();
    window.addEventListener('popstate', handleUrlRouting);
    window.addEventListener('hashchange', handleUrlRouting);
    return () => {
      window.removeEventListener('popstate', handleUrlRouting);
      window.removeEventListener('hashchange', handleUrlRouting);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname.includes('/admin')) {
      window.history.pushState({}, '', '/');
    }
    if (window.location.hash === '#admin') {
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  // Load Firestore data on mount
  useEffect(() => {
    async function loadData() {
      const storedItems = await getStoredMenuItems();
      if (storedItems && storedItems.length > 0) {
        setMenuItems(storedItems);
      }
      const storedConfig = await getStoredRestaurantConfig();
      if (storedConfig) {
        setConfig(storedConfig);
      }
    }
    loadData();
  }, []);

  // Update HTML direction and language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Cart calculations
  const cartItemCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );
  
  const cartTotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.totalPrice, 0),
    [cartItems]
  );

  // Moroccan Touch Items for Highlights
  const moroccanItems = useMemo(
    () => menuItems.filter((i) => i.categoryId === 'moroccan-touch'),
    [menuItems]
  );

  // Helper to check if two cart items have identical options
  const areCartItemsEqual = (a: CartItem, b: CartItem): boolean => {
    // 1. Same base menu item
    if (a.item.id !== b.item.id) return false;

    // 2. Gratinage comparison
    const aGratinEnabled = Boolean(a.gratinage?.enabled);
    const bGratinEnabled = Boolean(b.gratinage?.enabled);
    if (aGratinEnabled !== bGratinEnabled) return false;
    if (aGratinEnabled && a.gratinage?.choice !== b.gratinage?.choice) return false;

    // 3. Sauce comparison
    const aSauce = (a.selectedSauce || '').trim();
    const bSauce = (b.selectedSauce || '').trim();
    if (aSauce !== bSauce) return false;

    // 4. Selected option comparison
    const aOption = a.selectedOption?.id || '';
    const bOption = b.selectedOption?.id || '';
    if (aOption !== bOption) return false;

    // 5. Supplements comparison
    const aSupps = (a.supplements || []).map((s) => s.id).sort().join(',');
    const bSupps = (b.supplements || []).map((s) => s.id).sort().join(',');
    if (aSupps !== bSupps) return false;

    // 6. Notes comparison
    const aNotes = (a.notes || '').trim();
    const bNotes = (b.notes || '').trim();
    if (aNotes !== bNotes) return false;

    return true;
  };

  // Cart Actions
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => areCartItemsEqual(item, newItem));
      if (existingIndex > -1) {
        // Merge with existing item: increment quantity and recalculate total
        const updated = [...prev];
        const existing = updated[existingIndex];
        const combinedQty = existing.quantity + newItem.quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: combinedQty,
          totalPrice: existing.unitPrice * combinedQty,
        };
        return updated;
      }
      // If no matching existing item, add as new entry
      return [...prev, newItem];
    });

    const itemName = newItem.item?.name?.[lang] || newItem.item?.name?.fr || newItem.item?.name?.en || 'Plat';
    setToastMessage(
      lang === 'fr'
        ? `"${itemName}" ajouté au panier !`
        : lang === 'ar'
        ? `تمت إضافة "${itemName}" إلى السلة !`
        : `"${itemName}" added to basket!`
    );
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            }
          : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Admin Save Handlers
  const handleSaveMenuItems = async (updated: MenuItem[]) => {
    setMenuItems(updated);
    await persistMenuItems(updated);
  };

  const handleSaveConfig = async (updated: RestaurantConfig) => {
    setConfig(updated);
    await persistRestaurantConfig(updated);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-warm-canvas text-[#1c1917] flex flex-col justify-between selection:bg-[#15803d] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1f1712] text-white px-4 py-2.5 rounded-full shadow-2xl border border-amber-500/40 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Layout */}
      <div>
        {/* Navigation Bar */}
        <Navbar
          lang={lang}
          onLanguageChange={setLang}
          cartItemCount={cartItemCount}
          cartTotal={cartTotal}
          onOpenCart={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          config={config}
        />

        {/* Hero Section with Large Image & Tagline */}
        <Hero
          lang={lang}
          config={config}
          onScrollToMenu={scrollToMenu}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Sticky Horizontal Category Bar */}
        <CategoryNav
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={setActiveCategoryId}
          lang={lang}
        />

        {/* Moroccan Touch Specials Banner (Couscous, Rfissa, Friture) */}
        {!searchQuery && activeCategoryId === 'all' && (
          <SpecialHighlights
            moroccanItems={moroccanItems}
            onOpenCustomizer={(item) => setCustomizingItem(item)}
            lang={lang}
          />
        )}

        {/* Full Dynamic Menu Section */}
        <main className="pb-16">
          <MenuSection
            categories={categories}
            menuItems={menuItems}
            activeCategoryId={activeCategoryId}
            searchQuery={searchQuery}
            onOpenCustomizer={(item) => setCustomizingItem(item)}
            lang={lang}
          />
        </main>
      </div>

      {/* Footer */}
      <Footer
        config={config}
        lang={lang}
      />

      {/* Mobile Floating Sticky Cart Bar (Always accessible on phone) */}
      {cartItemCount > 0 && !isCartOpen && (
        <div className="fixed bottom-3 left-3 right-3 sm:hidden z-40 animate-in slide-in-from-bottom duration-300">
          <button
            id="mobile-sticky-cart-bar"
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#15803d] hover:bg-[#166534] active:scale-98 text-white p-3 rounded-2xl shadow-2xl flex items-center justify-between font-black border-2 border-green-400/40 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative bg-white/20 p-1.5 rounded-xl">
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#dc2626] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              </div>
              <span className="text-xs">
                {lang === 'fr' ? 'Voir mon panier WhatsApp' : lang === 'ar' ? 'عرض السلة وإرسال الطلب' : 'View WhatsApp Cart'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-xl text-xs text-amber-200">
              <span>{cartTotal} {translations[lang].dh}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </div>
          </button>
        </div>
      )}

      {/* Customizer Modal */}
      <ItemCustomizeModal
        item={customizingItem}
        supplementsList={supplements}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        config={config}
        lang={lang}
      />

      {/* Admin Price & Menu Manager */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        menuItems={menuItems}
        onSaveMenuItems={handleSaveMenuItems}
        config={config}
        onSaveConfig={handleSaveConfig}
        lang={lang}
      />

    </div>
  );
}
