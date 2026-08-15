import React from 'react';
import { 
  Calendar, 
  Sparkles, 
  Flame, 
  Award, 
  Plus, 
  Check, 
  Layers 
} from 'lucide-react';
import { MenuItem, Language } from '../types';
import { translations } from '../data/translations';

interface SpecialHighlightsProps {
  moroccanItems: MenuItem[];
  onOpenCustomizer: (item: MenuItem) => void;
  lang: Language;
}

export const SpecialHighlights: React.FC<SpecialHighlightsProps> = ({
  moroccanItems,
  onOpenCustomizer,
  lang,
}) => {
  const t = translations[lang];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Moroccan Touch Special Section Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2a1d17] via-[#1f1610] to-[#140e0a] text-white p-6 sm:p-8 md:p-10 border border-[#b45309]/40 shadow-xl">
        
        {/* Moroccan Zellige / Geometric Pattern subtle background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#b45309]/30 border border-[#f59e0b]/30 px-3 py-1 rounded-full text-xs font-bold text-amber-300 mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider font-heading">
                  {lang === 'fr' ? 'Tradition & Saveurs Beldi' : lang === 'ar' ? 'أصالة المطبخ المغربي البلدي' : 'Heritage Moroccan Cuisine'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-amber-100">
                {t.moroccanTouchTitle}
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mt-1.5 font-normal">
                {t.moroccanTouchSub}
              </p>
            </div>

            {/* Italian-Moroccan Flag badge */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-neutral-300 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fdfbf7]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
              <span className="font-semibold text-white">Tempo Fait Maison</span>
            </div>
          </div>

          {/* Cards for Moroccan Touch: Couscous, Rfissa, Friture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {moroccanItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-[#2e221b]/90 border border-amber-500/20 hover:border-amber-400/50 p-4 sm:p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Photo & Day Tag */}
                <div className="relative h-44 sm:h-48 rounded-xl overflow-hidden mb-4 bg-neutral-800">
                  <img
                    src={item.image}
                    alt={item.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Day Badge */}
                  {item.dayAvailable && (
                    <div className="absolute top-3 left-3 bg-[#dc2626] text-white text-xs font-black px-2.5 py-1 rounded-md shadow-md flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.dayAvailable[lang]}</span>
                    </div>
                  )}

                  {/* Price overlay */}
                  <div className="absolute bottom-3 right-3 bg-amber-400 text-black font-black text-sm px-3 py-1 rounded-full shadow-lg font-heading">
                    {item.price} {t.dh}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                    {item.name[lang]}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1.5 line-clamp-2 leading-relaxed flex-1">
                    {item.description[lang]}
                  </p>
                </div>

                {/* Order Button */}
                <button
                  id={`btn-add-moroccan-${item.id}`}
                  onClick={() => onOpenCustomizer(item)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] active:scale-95 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addToCart}</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};
