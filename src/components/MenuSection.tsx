import React from 'react';
import { Search, X } from 'lucide-react';
import { MenuItemCard } from './MenuItemCard';
import { Category, MenuItem, Language } from '../types';
import { translations } from '../data/translations';

interface MenuSectionProps {
  categories: Category[];
  menuItems: MenuItem[];
  activeCategoryId: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCustomizer: (item: MenuItem) => void;
  lang: Language;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  categories,
  menuItems,
  activeCategoryId,
  searchQuery,
  onSearchChange,
  onOpenCustomizer,
  lang,
}) => {
  const t = translations[lang];

  // Filter items by search query in real time across names & descriptions
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = menuItems.filter((item) => {
    if (!normalizedQuery) return true;
    const nameMatch =
      (item.name.fr && item.name.fr.toLowerCase().includes(normalizedQuery)) ||
      (item.name.ar && item.name.ar.toLowerCase().includes(normalizedQuery)) ||
      (item.name.en && item.name.en.toLowerCase().includes(normalizedQuery));
    const descMatch =
      (item.description.fr && item.description.fr.toLowerCase().includes(normalizedQuery)) ||
      (item.description.ar && item.description.ar.toLowerCase().includes(normalizedQuery)) ||
      (item.description.en && item.description.en.toLowerCase().includes(normalizedQuery));
    return nameMatch || descMatch;
  });

  // Filter categories to display
  const targetCategories = activeCategoryId === 'all'
    ? categories
    : categories.filter((c) => c.id === activeCategoryId);

  return (
    <div id="menu-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
      
      {/* Search Input Bar at top of Menu Section */}
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative w-full shadow-xs">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-4 rtl:pl-0 rtl:pr-4 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
          </div>
          <input
            id="menu-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-[#f2ecde] text-[#1c1917] pl-11 pr-10 rtl:pl-10 rtl:pr-11 py-3 text-xs sm:text-sm rounded-full border border-[#ded5c2] focus:border-[#15803d] focus:bg-white focus:outline-hidden transition-all placeholder:text-neutral-500 font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3.5 rtl:pr-0 rtl:pl-3.5 flex items-center text-xs sm:text-sm text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
              aria-label="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Search Results Indicator */}
      {searchQuery && filteredItems.length > 0 && (
        <div className="bg-[#f0e8d5] border border-[#dfd2ba] px-4 py-3 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-800">
          <p>
            {lang === 'fr'
              ? `Résultats pour "${searchQuery}" (${filteredItems.length} plat${filteredItems.length > 1 ? 's' : ''} trouvé${filteredItems.length > 1 ? 's' : ''})`
              : lang === 'ar'
              ? `نتائج البحث عن "${searchQuery}" (${filteredItems.length} وجبة)`
              : `Search results for "${searchQuery}" (${filteredItems.length} dish${filteredItems.length > 1 ? 'es' : ''} found)`}
          </p>
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="text-xs text-[#15803d] hover:underline font-bold cursor-pointer"
          >
            {lang === 'fr' ? 'Effacer la recherche' : lang === 'ar' ? 'مسح البحث' : 'Clear'}
          </button>
        </div>
      )}

      {/* Categories & Dish Cards */}
      {targetCategories.map((category) => {
        const categoryItems = filteredItems.filter((i) => i.categoryId === category.id);
        if (categoryItems.length === 0) return null;

        return (
          <section
            key={category.id}
            id={`section-${category.id}`}
            className="scroll-mt-36 space-y-4"
          >
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-[#15803d]/20 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#15803d]" />
                <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-[#1c1917]">
                  {category.name[lang]}
                </h2>
                {category.badge && (
                  <span className="bg-[#15803d]/15 text-[#15803d] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {category.badge[lang]}
                  </span>
                )}
              </div>
              {category.description && (
                <p className="text-xs text-neutral-500 font-medium">
                  {category.description[lang]}
                </p>
              )}
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {categoryItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onOpenCustomizer={onOpenCustomizer}
                  lang={lang}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Empty State when no dishes match */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#ded5c2] p-8 shadow-xs max-w-lg mx-auto space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#f2ecde] flex items-center justify-center mx-auto text-neutral-500">
            <Search className="w-6 h-6 text-neutral-400" />
          </div>
          <h3 className="text-base sm:text-lg font-bold font-heading text-neutral-800">
            {lang === 'fr'
              ? 'Aucun plat trouvé'
              : lang === 'ar'
              ? 'لم يتم العثور على أي وجبة'
              : 'No dishes found'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xs mx-auto">
            {lang === 'fr'
              ? 'Essayez avec un autre mot-clé comme Pizza, Tacos, Gratin ou Kefta.'
              : lang === 'ar'
              ? 'جرب البحث بكلمات أخرى مثل بيتزا، تاكوس، كفتة أو تيراميسو.'
              : 'Try searching with keywords like Pizza, Tacos, Gratin or Kefta.'}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="mt-2 inline-flex items-center gap-1.5 bg-[#f0eade] hover:bg-[#e6decf] text-[#1c1917] px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border border-[#ded5c2]"
            >
              <span>✕</span>
              <span>{lang === 'fr' ? 'Réinitialiser la recherche' : lang === 'ar' ? 'إعادة ضبط البحث' : 'Reset search'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
