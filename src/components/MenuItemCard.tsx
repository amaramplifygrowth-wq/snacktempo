import React from 'react';
import { Plus, Flame, Sparkles, Heart, Check } from 'lucide-react';
import { MenuItem, Language } from '../types';
import { translations } from '../data/translations';

interface MenuItemCardProps {
  item: MenuItem;
  onOpenCustomizer: (item: MenuItem) => void;
  lang: Language;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onOpenCustomizer,
  lang,
}) => {
  const t = translations[lang];

  return (
    <div
      id={`menu-card-${item.id}`}
      className={`group bg-white rounded-2xl border border-[#e5dccb] hover:border-[#15803d]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        !item.available ? 'opacity-60 grayscale-30' : ''
      }`}
    >
      {/* Top Image Container */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-[#f4eee2]">
        <img
          src={item.image}
          alt={item.name[lang]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 max-w-[85%]">
          {item.isHomemade && (
            <span className="bg-[#15803d] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
              {t.homemadeBadge}
            </span>
          )}
          {item.isPopular && (
            <span className="bg-[#dc2626] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
              {t.popular}
            </span>
          )}
          {item.isGratinable && (
            <span className="bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" />
              <span>{lang === 'fr' ? 'Gratin +10 DH' : lang === 'ar' ? 'كراتيناج +10 د.م' : 'Gratin +10 DH'}</span>
            </span>
          )}
        </div>

        {/* Price Tag Overlay on Image */}
        <div className="absolute bottom-2.5 right-2.5 bg-[#1c1917]/90 backdrop-blur-xs text-amber-300 font-heading font-black text-sm sm:text-base px-3 py-1 rounded-full shadow-md border border-white/10">
          {item.price} <span className="text-[11px] font-bold text-white">{t.dh}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-bold text-base sm:text-lg text-[#1c1917] group-hover:text-[#15803d] transition-colors leading-snug">
              {item.name[lang]}
            </h3>
          </div>

          <p className="text-xs text-neutral-600 mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {item.description[lang]}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3 border-t border-[#f0eade] flex items-center justify-between gap-3">
          <div className="text-xs font-semibold text-neutral-500">
            {item.isGratinable || item.options ? (
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md text-[10px] font-bold border border-amber-200">
                {t.customize}
              </span>
            ) : (
              <span>{item.price} {t.dh}</span>
            )}
          </div>

          {item.available ? (
            <button
              id={`btn-add-${item.id}`}
              onClick={() => onOpenCustomizer(item)}
              className="flex items-center gap-1.5 bg-[#15803d] hover:bg-[#166534] active:scale-95 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.addToCart}</span>
            </button>
          ) : (
            <span className="text-[11px] font-bold text-neutral-400 italic">
              {t.unavailable}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
