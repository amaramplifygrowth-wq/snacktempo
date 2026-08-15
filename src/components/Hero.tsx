import React from 'react';
import { 
  ArrowDown, 
  MessageCircle,
  Clock, 
  UtensilsCrossed, 
  Flame 
} from 'lucide-react';
import { Language, RestaurantConfig } from '../types';
import { translations } from '../data/translations';
import { HERO_BG_IMAGE_PLACEHOLDER } from '../data/heroImagePlaceholder';
import { TEMPO_SIGNATURE_IMAGE_PLACEHOLDER } from '../data/signatureImagePlaceholder';

interface HeroProps {
  lang: Language;
  config: RestaurantConfig;
  onScrollToMenu: () => void;
  onOpenCart?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  config,
  onScrollToMenu,
}) => {
  const t = translations[lang];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#1f1712] text-white pt-6 pb-12 sm:pb-16 lg:pb-20 border-b-4 border-[#15803d]">
      {/* Italian Flag subtle accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex z-20">
        <div className="w-1/3 bg-[#15803d]" />
        <div className="w-1/3 bg-[#fdfbf7]" />
        <div className="w-1/3 bg-[#dc2626]" />
      </div>

      {/* PLACEHOLDER - vervang door echte Tempo productfoto voor livegang */}
      {/* Hero Background Food Image with Responsive Object-Fit & Appetizing Light Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={HERO_BG_IMAGE_PLACEHOLDER}
          alt="Tempo Hero Food Background - Loaded Fries & Melted Cheese"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_35%] brightness-95 contrast-105"
          loading="eager"
        />
        {/* Directional gradient: soft dark protection focused on left/bottom text area, light & vibrant in center/top */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#17100b]/85 via-[#17100b]/55 to-transparent sm:from-[#17100b]/80 sm:via-[#17100b]/40 sm:to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17100b]/85 via-transparent to-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content / Tagline */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-5 text-left rtl:text-right">
            
            {/* Top Badge: Homemade & Delivery */}
            <div className="inline-flex items-center gap-2 bg-[#2a1e16] border border-[#dc2626]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dc2626]"></span>
              </span>
              <span className="tracking-wide uppercase font-heading text-[11px]">
                {lang === 'fr' ? 'Snack Italien & Fait Maison' : lang === 'ar' ? 'سناك ومطعم إيطالي مغربي' : 'Italian & Moroccan Home Made'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.08] text-white">
              <span className="block text-[#fdfbf7]">{t.heroTagline.split(',')[0]}</span>
              <span className="text-[#22c55e] inline-block">
                {t.heroTagline.split(',')[1] || config.tagline[lang]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal">
              {t.heroSub}
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full pt-1 text-xs sm:text-sm text-neutral-200">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="font-semibold">
                  {lang === 'fr' ? 'Pizzas & Gratinages au four' : lang === 'ar' ? 'بيتزا وكراتيناج بالفرن' : 'Oven-Baked & Cheesy'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                <UtensilsCrossed className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">
                  {lang === 'fr' ? '100% Frais & Fait Maison' : lang === 'ar' ? '100% طازج وصنع منزلي' : '100% Fresh & Homemade'}
                </span>
              </div>
            </div>

            {/* Action Buttons: Primary Menu CTA + Secondary Question/Contact */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2.5 sm:pt-3 w-full sm:w-auto">
              <button
                id="hero-cta-menu-btn"
                onClick={onScrollToMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#15803d] hover:bg-[#166534] active:scale-95 text-white font-black text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full shadow-xl shadow-green-950/60 transition-all cursor-pointer border-b-2 border-green-900 group"
              >
                <span>{t.seeMenu}</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 animate-bounce" />
              </button>

              <a
                id="hero-cta-question-btn"
                href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  lang === 'fr'
                    ? "Bonjour Snack Tempo, j'ai une question sur vos plats / horaires :"
                    : lang === 'ar'
                    ? "السلام عليكم سناك تيمبو، لدي سؤال بخصوص الأطباق أو أوقات العمل:"
                    : "Hello Snack Tempo, I have a question regarding your dishes or hours:"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 active:scale-95 text-neutral-200 hover:text-white font-bold text-xs sm:text-sm px-5 py-3 sm:py-3.5 rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>
                  {lang === 'fr' 
                    ? 'Une question ? Contactez-nous' 
                    : lang === 'ar' 
                    ? 'لديك سؤال؟ تواصل معنا' 
                    : 'Have a question? Contact us'}
                </span>
              </a>
            </div>

            {/* Quick Meta Info - Single calm compact line */}
            <div className="inline-flex items-center gap-1.5 text-xs text-neutral-300/90 pt-1">
              <Clock className="w-3.5 h-3.5 text-amber-400/90 shrink-0" />
              <span className="font-medium">{config.openingHours[lang]}</span>
              <span className="text-neutral-500 mx-1">·</span>
              <span className="text-neutral-400">{lang === 'fr' ? 'Emporter +2 DH' : lang === 'ar' ? 'إمبورطي +2 د.م' : 'Takeaway +2 DH'}</span>
            </div>
          </div>

          {/* Hero Big High-Impact Food Showcase Visual */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30 bg-[#292019] flex flex-col justify-between min-h-[340px] sm:min-h-[400px] md:min-h-[430px]">
              {/* Photo Background */}
              <img
                src={TEMPO_SIGNATURE_IMAGE_PLACEHOLDER}
                alt="Tempo Pasticcio Gratiné & Loaded Fries"
                className="absolute inset-0 w-full h-full object-cover object-[center_45%] pointer-events-none"
                loading="eager"
              />
              
              {/* Clean soft gradient backdrop */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />

              {/* Top: Badges Stack */}
              <div className="relative z-10 p-3.5 sm:p-4 flex flex-wrap items-center gap-2">
                <div className="bg-[#15803d] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>TEMPO SIGNATURE</span>
                </div>
                <div className="bg-[#dc2626] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md">
                  {lang === 'fr' ? 'Fromage Fondant 100% Mozza' : lang === 'ar' ? 'جبنة موزاريلا ذائبة' : '100% Melted Mozzarella'}
                </div>
              </div>

              {/* Bottom: Dedicated Info Block (Le Plat Culte + Title + Price) */}
              <div className="relative z-10 m-3.5 sm:m-4 p-3.5 sm:p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-amber-400 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mb-0.5">
                      {lang === 'fr' ? 'Le Plat Culte' : lang === 'ar' ? 'الطبق الأكثر شهرة' : 'The Cult Favorite'}
                    </div>
                    <div className="text-white font-black font-heading text-base sm:text-lg leading-tight">
                      {lang === 'fr' ? 'Pasticcio Royal & Tacos Gratiné' : lang === 'ar' ? 'باستيسيو رويال وتاكوس كراتيني' : 'Royal Pasticcio & Gratin Taco'}
                    </div>
                  </div>
                  <div className="text-right shrink-0 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                    <div className="text-[10px] text-neutral-300 font-medium">{t.from}</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-300 font-heading leading-none">
                      30 <span className="text-xs font-bold">{t.dh}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
