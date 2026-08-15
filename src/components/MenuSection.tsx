import React from 'react';
import { MenuItemCard } from './MenuItemCard';
import { Category, MenuItem, Language } from '../types';
import { translations } from '../data/translations';

interface MenuSectionProps {
  categories: Category[];
  menuItems: MenuItem[];
  activeCategoryId: string;
  searchQuery: string;
  onOpenCustomizer: (item: MenuItem) => void;
  lang: Language;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  categories,
  menuItems,
  activeCategoryId,
  searchQuery,
  onOpenCustomizer,
  lang,
}) => {
  const t = translations[lang];

  // Filter items by search query if any
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = menuItems.filter((item) => {
    if (!normalizedQuery) return true;
    const nameMatch =
      item.name.fr.toLowerCase().includes(normalizedQuery) ||
      item.name.ar.toLowerCase().includes(normalizedQuery) ||
      item.name.en.toLowerCase().includes(normalizedQuery);
    const descMatch =
      item.description.fr.toLowerCase().includes(normalizedQuery) ||
      item.description.ar.toLowerCase().includes(normalizedQuery) ||
      item.description.en.toLowerCase().includes(normalizedQuery);
    return nameMatch || descMatch;
  });

  // Filter categories to display
  const targetCategories = activeCategoryId === 'all'
    ? categories
    : categories.filter((c) => c.id === activeCategoryId);

  return (
    <div id="menu-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {searchQuery && (
        <div className="bg-[#f0e8d5] border border-[#dfd2ba] p-4 rounded-2xl flex items-center justify-between">
          <p className="text-sm font-bold text-neutral-800">
            {lang === 'fr' ? `Résultats pour "${searchQuery}" (${filteredItems.length} plats trouvés)` :
             lang === 'ar' ? `نتائج البحث عن "${searchQuery}" (${filteredItems.length} وجبة)` :
             `Search results for "${searchQuery}" (${filteredItems.length} items)`}
          </p>
        </div>
      )}

      {targetCategories.map((category) => {
        const categoryItems = filteredItems.filter((i) => i.categoryId === category.id);
        if (categoryItems.length === 0) return null;

        return (
          <section
            key={category.id}
            id={`section-${category.id}`}
            className="scroll-mt-36"
          >
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-[#15803d]/20 pb-3 mb-6">
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

            {/* Asymmetric Dynamic Cards Grid */}
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

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#ded5c2] p-8">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-neutral-800">
            {lang === 'fr' ? 'Aucun plat ne correspond à votre recherche' :
             lang === 'ar' ? 'لم يتم العثور على أي وجبة مطابقة للبحث' :
             'No dish found matching your search'}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            {lang === 'fr' ? 'Essayez avec un autre mot clé comme Pizza, Tacos ou Kefta.' :
             lang === 'ar' ? 'جرب البحث بكلمات أخرى مثل بيتزا، تاكوس، كفتة أو تيراميسو.' :
             'Try searching with keywords like Pizza, Tacos or Kefta.'}
          </p>
        </div>
      )}
    </div>
  );
};
