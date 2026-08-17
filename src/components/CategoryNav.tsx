import React, { useRef } from 'react';
import { 
  Pizza, 
  Flame, 
  UtensilsCrossed, 
  Layers, 
  Award, 
  Heart, 
  Sandwich, 
  Soup, 
  Box, 
  CookingPot, 
  Utensils, 
  Salad, 
  Cookie, 
  Grid, 
  Cake, 
  CupSoda, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Category, Language } from '../types';
import { translations } from '../data/translations';

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  lang: Language;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  lang,
}) => {
  const t = translations[lang];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const iconMap: Record<string, React.ReactNode> = {
    'moroccan-touch': <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500" />,
    'pizzas': <Pizza className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-500" />,
    'tacos-gratine': <Flame className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-500" />,
    'tacos': <UtensilsCrossed className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600" />,
    'pasticcio': <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-600" />,
    'frisby': <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-600" />,
    'fait-maison': <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-rose-500" />,
    'whoppers': <Sandwich className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-700" />,
    'pasta': <Soup className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-700" />,
    'poutine': <Box className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-yellow-600" />,
    'burritos': <Flame className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-600" />,
    'm9ila': <CookingPot className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-700" />,
    'bras': <Flame className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-600" />,
    'kamikaz': <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-600" />,
    'escalope': <Utensils className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600" />,
    'salades': <Salad className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-green-600" />,
    'petit-faim': <Cookie className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-600" />,
    'mezzo-mezzo': <Grid className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600" />,
    'desserts': <Cake className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-pink-600" />,
    'jus-frais': <CupSoda className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-600" />,
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="menu-categories-section" className="py-7 sm:py-9 lg:py-10 bg-[#fbf9f5] border-b border-[#e7dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#15803d]/10 border border-[#15803d]/25 px-3 py-1 rounded-full text-xs font-bold text-[#15803d] mb-2.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#15803d]" />
              <span className="uppercase tracking-wider font-heading text-[11px] sm:text-xs">
                {lang === 'fr' ? 'Carte & Spécialités' : lang === 'ar' ? 'أصناف وقائمة الطعام' : 'Menu & Specialties'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-[#1c1917]">
              {t.ourMenuTitle}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mt-1.5 font-normal">
              {t.ourMenuSub}
            </p>
          </div>
        </div>

        {/* Category Navigation Pills Carousel */}
        <div className="relative flex items-center">
          
          {/* Left Arrow (desktop) */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-[#f0e8d5] hover:bg-[#e4dcce] active:scale-95 text-neutral-800 shrink-0 mr-2.5 transition-all cursor-pointer shadow-sm border border-[#ded5c2]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-2 w-full"
          >
            {/* "All" button */}
            <button
              id="cat-pill-all"
              type="button"
              onClick={() => onSelectCategory('all')}
              className={`shrink-0 flex items-center gap-2 px-4.5 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black font-heading transition-all cursor-pointer shadow-xs ${
                activeCategoryId === 'all'
                  ? 'bg-[#15803d] text-white shadow-md shadow-green-900/25 border-2 border-green-700 ring-2 ring-[#15803d]/30 scale-[1.02]'
                  : 'bg-[#f2ecde] hover:bg-[#e8e0ce] text-[#1c1917] border-2 border-[#d8ccb4] hover:border-[#c5b597]'
              }`}
            >
              <span className="text-sm sm:text-base">✨</span>
              <span className="whitespace-nowrap">{t.all}</span>
            </button>

            {/* Dynamic Categories */}
            {categories.map((category) => {
              const isActive = activeCategoryId === category.id;
              return (
                <button
                  key={category.id}
                  id={`cat-pill-${category.id}`}
                  type="button"
                  onClick={() => onSelectCategory(category.id)}
                  className={`shrink-0 flex items-center gap-2.5 px-4.5 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold font-heading transition-all cursor-pointer shadow-xs ${
                    isActive
                      ? 'bg-[#dc2626] text-white shadow-md shadow-red-900/25 border-2 border-red-700 ring-2 ring-[#dc2626]/30 scale-[1.02]'
                      : 'bg-[#f2ecde] hover:bg-[#e8e0ce] text-[#1c1917] border-2 border-[#d8ccb4] hover:border-[#c5b597]'
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? 'text-white' : ''}`}>
                    {iconMap[category.id] || <UtensilsCrossed className="w-4 h-4" />}
                  </span>
                  <span className="whitespace-nowrap">{category.name[lang]}</span>
                  {category.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-[#15803d]/15 text-[#15803d]'
                      }`}
                    >
                      {category.badge[lang]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Arrow (desktop) */}
          <button
            type="button"
            onClick={() => scroll('right')}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-[#f0e8d5] hover:bg-[#e4dcce] active:scale-95 text-neutral-800 shrink-0 ml-2.5 transition-all cursor-pointer shadow-sm border border-[#ded5c2]"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </section>
  );
};

