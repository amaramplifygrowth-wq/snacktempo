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
    'moroccan-touch': <Sparkles className="w-4 h-4 text-amber-500" />,
    'pizzas': <Pizza className="w-4 h-4 text-red-500" />,
    'tacos-gratine': <Flame className="w-4 h-4 text-orange-500" />,
    'tacos': <UtensilsCrossed className="w-4 h-4 text-emerald-600" />,
    'pasticcio': <Layers className="w-4 h-4 text-amber-600" />,
    'frisby': <Award className="w-4 h-4 text-red-600" />,
    'fait-maison': <Heart className="w-4 h-4 text-rose-500" />,
    'whoppers': <Sandwich className="w-4 h-4 text-amber-700" />,
    'pasta': <Soup className="w-4 h-4 text-emerald-700" />,
    'poutine': <Box className="w-4 h-4 text-yellow-600" />,
    'burritos': <Flame className="w-4 h-4 text-orange-600" />,
    'm9ila': <CookingPot className="w-4 h-4 text-red-700" />,
    'bras': <Flame className="w-4 h-4 text-amber-600" />,
    'kamikaz': <Award className="w-4 h-4 text-purple-600" />,
    'escalope': <Utensils className="w-4 h-4 text-emerald-600" />,
    'salades': <Salad className="w-4 h-4 text-green-600" />,
    'petit-faim': <Cookie className="w-4 h-4 text-amber-600" />,
    'mezzo-mezzo': <Grid className="w-4 h-4 text-blue-600" />,
    'desserts': <Cake className="w-4 h-4 text-pink-600" />,
    'jus-frais': <CupSoda className="w-4 h-4 text-cyan-600" />,
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-[86px] sm:top-[90px] z-30 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e7dec8] py-2 sm:py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 relative flex items-center">
        
        {/* Left Arrow (desktop) */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-[#eee6d5] hover:bg-[#ded5c2] text-neutral-700 shrink-0 mr-1.5 transition-colors cursor-pointer shadow-xs"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full"
        >
          {/* "All" button */}
          <button
            id="cat-pill-all"
            onClick={() => onSelectCategory('all')}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategoryId === 'all'
                ? 'bg-[#15803d] text-white shadow-md shadow-green-900/20'
                : 'bg-[#ede5d3] hover:bg-[#e4dcce] text-neutral-800 border border-[#ded5c2]'
            }`}
          >
            <span>✨</span>
            <span>{t.all}</span>
          </button>

          {/* Dynamic Categories */}
          {categories.map((category) => {
            const isActive = activeCategoryId === category.id;
            return (
              <button
                key={category.id}
                id={`cat-pill-${category.id}`}
                onClick={() => onSelectCategory(category.id)}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#dc2626] text-white shadow-md shadow-red-900/20'
                    : 'bg-[#ede5d3] hover:bg-[#e4dcce] text-neutral-800 border border-[#ded5c2]'
                }`}
              >
                <span className="shrink-0">{iconMap[category.id] || <UtensilsCrossed className="w-3.5 h-3.5" />}</span>
                <span className="whitespace-nowrap">{category.name[lang]}</span>
                {category.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase ${
                      isActive
                        ? 'bg-white/20 text-white'
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
          onClick={() => scroll('right')}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-[#eee6d5] hover:bg-[#ded5c2] text-neutral-700 shrink-0 ml-1.5 transition-colors cursor-pointer shadow-xs"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </nav>
  );
};
