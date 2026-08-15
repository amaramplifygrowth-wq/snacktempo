import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search,
  ChevronDown,
  Check
} from 'lucide-react';
import { TempoLogo } from './TempoLogo';
import { Language, RestaurantConfig } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  config: RestaurantConfig;
}

const LANGUAGE_OPTIONS: { code: Language; label: string; shortLabel: string }[] = [
  { code: 'fr', label: 'Français', shortLabel: 'FR' },
  { code: 'ar', label: 'العربية', shortLabel: 'العربية' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
];

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  cartItemCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  config,
}) => {
  const t = translations[lang];
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLangDropdownOpen(false);
      }
    };

    if (isLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLangDropdownOpen]);

  const currentShortLabel = lang === 'fr' ? 'FR' : lang === 'ar' ? 'العربية' : 'EN';

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e7dec8] transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-4 lg:px-8">
        
        {/* ROW 1: Logo (Left) | Language Switcher & Cart (Right) */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 py-2">
          
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <a href="#hero-section" className="focus:outline-hidden inline-flex items-center">
              <TempoLogo size="sm" />
            </a>
          </div>

          {/* Right Actions: Language Switcher & Cart Badge */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Mobile Language Switcher Dropdown (< 768px: md:hidden) */}
            <div className="relative md:hidden shrink-0" ref={langDropdownRef}>
              <button
                id="mobile-lang-dropdown-trigger"
                type="button"
                onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                aria-expanded={isLangDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Changer de langue / Change language"
                className="flex items-center gap-1 bg-[#f0eade] hover:bg-[#e6decf] active:scale-95 text-[#1c1917] px-2.5 py-1 rounded-full border border-[#ded5c2] text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <span className="text-[#15803d]">{currentShortLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-600 transition-transform duration-200 ${
                    isLangDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mobile Dropdown Menu */}
              {isLangDropdownOpen && (
                <div
                  role="listbox"
                  id="mobile-lang-dropdown-menu"
                  className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-1.5 w-36 bg-[#fbf9f5] rounded-xl border border-[#ded5c2] shadow-xl py-1 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
                >
                  {LANGUAGE_OPTIONS.map((item) => {
                    const isSelected = lang === item.code;
                    return (
                      <button
                        key={item.code}
                        id={`mobile-lang-option-${item.code}`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          onLanguageChange(item.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer text-left rtl:text-right ${
                          isSelected
                            ? 'bg-emerald-50/90 text-[#15803d] font-bold'
                            : 'text-[#1c1917] hover:bg-[#f0eade]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#15803d] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop/Tablet Language Switcher (≥ 768px: hidden md:flex) */}
            <div className="hidden md:flex items-center bg-[#f0eade] p-0.5 rounded-full border border-[#ded5c2] text-xs font-semibold shrink-0">
              <button
                id="lang-btn-fr"
                onClick={() => onLanguageChange('fr')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'fr'
                    ? 'bg-[#15803d] text-white shadow-xs'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                FR
              </button>
              <button
                id="lang-btn-ar"
                onClick={() => onLanguageChange('ar')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold ${
                  lang === 'ar'
                    ? 'bg-[#15803d] text-white shadow-xs'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                العربية
              </button>
              <button
                id="lang-btn-en"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#15803d] text-white shadow-xs'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Cart Trigger Button with safe spacing */}
            <button
              id="navbar-cart-trigger"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-[#15803d] hover:bg-[#166534] active:scale-95 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer border-b-2 border-green-900 shrink-0"
              aria-label={t.cartTitle}
            >
              <div className="relative flex items-center">
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#dc2626] text-white text-[9px] sm:text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#15803d] animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs">{t.cartTitle.split(' ')[1] || 'Panier'}</span>
              <span className="bg-[#166534] text-amber-200 px-1.5 sm:px-2 py-0.5 rounded-full font-black text-[11px] sm:text-xs whitespace-nowrap">
                {cartTotal} {t.dh}
              </span>
            </button>
          </div>

        </div>

        {/* ROW 2: Compact Search Bar */}
        <div className="pb-2 pt-0.5">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              id="navbar-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#f2ecde] text-[#1c1917] pl-8 pr-8 py-1.5 text-xs rounded-full border border-[#ded5c2] focus:border-[#15803d] focus:bg-white focus:outline-hidden transition-all placeholder:text-neutral-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-neutral-500 hover:text-neutral-800"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
