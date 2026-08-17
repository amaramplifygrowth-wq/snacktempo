import React from 'react';
import { 
  ArrowDown, 
  UtensilsCrossed, 
  Flame,
  Clock,
  Star
} from 'lucide-react';
import { Language, RestaurantConfig } from '../types';
import { translations } from '../data/translations';
import { HERO_BG_IMAGE_PLACEHOLDER } from '../data/heroImagePlaceholder';
import { TEMPO_SIGNATURE_IMAGE_PLACEHOLDER } from '../data/signatureImagePlaceholder';

/* ==========================================================================
   1. HeroBackground
   Wrapper for the hero food background image and darkening gradient overlays
   ========================================================================== */
interface HeroBackgroundProps {
  imageSrc: string;
  altText: string;
  children?: React.ReactNode;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ imageSrc, altText, children }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <img
        src={imageSrc}
        alt={altText}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-[center_35%] brightness-95 contrast-105"
        loading="eager"
      />
      {/* Directional gradient: soft dark protection focused on left/bottom text area, light & vibrant in center/top */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#17100b]/90 via-[#17100b]/65 to-[#17100b]/40 sm:from-[#17100b]/85 sm:via-[#17100b]/50 sm:to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#17100b] via-[#17100b]/40 to-black/30" />
      {children}
    </div>
  );
};

/* ==========================================================================
   2. HeroBadge
   Top pill badge indicating specialty and homemade status with pulsating dot
   ========================================================================== */
interface HeroBadgeProps {
  label: string;
}

export const HeroBadge: React.FC<HeroBadgeProps> = ({ label }) => {
  return (
    <div className="inline-flex items-center justify-center gap-1.5 bg-[#2a1e16]/90 border border-[#dc2626]/40 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-amber-300 shadow-sm mx-auto backdrop-blur-xs">
      <span className="flex h-1.5 w-1.5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#dc2626]"></span>
      </span>
      <span className="tracking-wide uppercase font-heading">
        {label}
      </span>
    </div>
  );
};

/* ==========================================================================
   3. HeroHeadline
   Main two-line hero title with highlighted secondary phrase
   ========================================================================== */
interface HeroHeadlineProps {
  primaryLine: string;
  highlightLine: string;
}

export const HeroHeadline: React.FC<HeroHeadlineProps> = ({ primaryLine, highlightLine }) => {
  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.08] text-white text-center">
      <span className="block text-[#fdfbf7]">{primaryLine}</span>
      <span className="text-[#22c55e] inline-block">
        {highlightLine}
      </span>
    </h1>
  );
};

/* ==========================================================================
   4. HeroSubtitle
   Concise one-line supporting subheadline beneath the main title
   ========================================================================== */
interface HeroSubtitleProps {
  text: string;
}

export const HeroSubtitle: React.FC<HeroSubtitleProps> = ({ text }) => {
  return (
    <p className="text-neutral-300/90 text-xs sm:text-sm md:text-base max-w-md leading-relaxed font-normal text-center mx-auto">
      {text}
    </p>
  );
};

/* ==========================================================================
   5. HeroFeaturePills
   Row of two compact feature badges (baked/cheesy + homemade)
   ========================================================================== */
interface HeroFeaturePillsProps {
  feature1: string;
  feature2: string;
}

export const HeroFeaturePills: React.FC<HeroFeaturePillsProps> = ({ feature1, feature2 }) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-sm pt-0.5 text-[10px] sm:text-xs text-neutral-300 mx-auto">
      <div className="flex items-center justify-center gap-1.5 bg-black/25 border border-white/10 px-2.5 py-1.5 rounded-lg text-center backdrop-blur-xs">
        <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
        <span className="font-medium">
          {feature1}
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 bg-black/25 border border-white/10 px-2.5 py-1.5 rounded-lg text-center backdrop-blur-xs">
        <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="font-medium">
          {feature2}
        </span>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. HeroCTAButton
   Primary high-contrast call-to-action button scrolling to menu
   ========================================================================== */
interface HeroCTAButtonProps {
  text: string;
  onClick: () => void;
}

export const HeroCTAButton: React.FC<HeroCTAButtonProps> = ({ text, onClick }) => {
  return (
    <div className="pt-3 sm:pt-5 w-full flex justify-center">
      <button
        id="hero-cta-menu-btn"
        onClick={onClick}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#15803d] hover:bg-[#166534] active:scale-95 text-white font-black text-base sm:text-lg px-9 sm:px-10 py-4 sm:py-4.5 rounded-full shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 ring-2 ring-emerald-400/40 transition-all cursor-pointer border-b-2 border-green-950 group text-center"
      >
        <span>{text}</span>
        <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-y-0.5 animate-bounce" />
      </button>
    </div>
  );
};

/* ==========================================================================
   7. HeroShowcaseCard (Desktop Only)
   Featured signature dish card visible on desktop viewports
   ========================================================================== */
interface HeroShowcaseCardProps {
  imageSrc: string;
  badgeLabel: string;
  subBadgeLabel: string;
  culteLabel: string;
  dishName: string;
  fromLabel: string;
  price: number;
  currency: string;
}

export const HeroShowcaseCard: React.FC<HeroShowcaseCardProps> = ({
  imageSrc,
  badgeLabel,
  subBadgeLabel,
  culteLabel,
  dishName,
  fromLabel,
  price,
  currency,
}) => {
  return (
    <div className="hidden lg:block lg:col-span-6 relative mt-6 lg:mt-0">
      <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30 bg-[#292019] flex flex-col justify-between min-h-[340px] sm:min-h-[400px] md:min-h-[430px]">
        {/* Photo Background */}
        <img
          src={imageSrc}
          alt={dishName}
          className="absolute inset-0 w-full h-full object-cover object-[center_45%] pointer-events-none"
          loading="eager"
        />
        
        {/* Clean soft gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />

        {/* Top: Badges Stack */}
        <div className="relative z-10 p-3.5 sm:p-4 flex flex-wrap items-center gap-2">
          <div className="bg-[#15803d] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{badgeLabel}</span>
          </div>
          <div className="bg-[#dc2626] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md">
            {subBadgeLabel}
          </div>
        </div>

        {/* Bottom: Dedicated Info Block */}
        <div className="relative z-10 m-3.5 sm:m-4 p-3.5 sm:p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-amber-400 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mb-0.5">
                {culteLabel}
              </div>
              <div className="text-white font-black font-heading text-base sm:text-lg leading-tight">
                {dishName}
              </div>
            </div>
            <div className="text-right shrink-0 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-neutral-300 font-medium">{fromLabel}</div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-heading leading-none">
                {price} <span className="text-xs font-bold">{currency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   8. HeroTrustStrip
   Floating pill bar with 3 trust badges overlapping the wave transition
   ========================================================================== */
interface HeroTrustStripProps {
  deliveryText: string;
  ratingText: string;
  homemadeText: string;
}

export const HeroTrustStrip: React.FC<HeroTrustStripProps> = ({
  deliveryText,
  ratingText,
  homemadeText,
}) => {
  return (
    <div className="relative z-20 max-w-3xl mx-auto px-4 -mt-5 sm:-mt-7 mb-2 sm:mb-4">
      <div className="bg-[#fdfbf7] border border-[#e7dec8] rounded-2xl sm:rounded-full py-2.5 sm:py-3.5 px-3.5 sm:px-8 shadow-xl shadow-black/8 flex items-center justify-around gap-1.5 sm:gap-6 text-center text-[#1c1917]">
        
        {/* Stat 1: Speed/Delivery */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-100/80 flex items-center justify-center text-[#15803d] shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#15803d]" />
          </div>
          <span className="text-[11px] sm:text-xs md:text-sm font-black font-heading truncate">
            {deliveryText}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 sm:h-6 bg-[#ded5c2] shrink-0" />

        {/* Stat 2: Rating */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-100/80 flex items-center justify-center text-amber-500 shrink-0">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-500" />
          </div>
          <span className="text-[11px] sm:text-xs md:text-sm font-black font-heading truncate">
            {ratingText}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 sm:h-6 bg-[#ded5c2] shrink-0" />

        {/* Stat 3: Homemade Quality */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-100/80 flex items-center justify-center text-orange-500 shrink-0">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
          </div>
          <span className="text-[11px] sm:text-xs md:text-sm font-black font-heading truncate">
            {homemadeText}
          </span>
        </div>

      </div>
    </div>
  );
};

/* ==========================================================================
   Main Hero Component
   Composes all sub-components into the complete hero experience
   ========================================================================== */
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

  const badgeText = lang === 'fr' 
    ? 'Snack Italien & Fait Maison' 
    : lang === 'ar' 
      ? 'سناك ومطعم إيطالي مغربي' 
      : 'Italian & Moroccan Home Made';

  const headlinePrimary = t.heroTagline.split(',')[0];
  const headlineHighlight = t.heroTagline.split(',')[1] || config.tagline[lang];

  const feature1Text = lang === 'fr' 
    ? 'Pizzas & Gratinages' 
    : lang === 'ar' 
      ? 'بيتزا وكراتيناج' 
      : 'Oven Pizzas & Gratins';

  const feature2Text = lang === 'fr' 
    ? '100% Fait Maison' 
    : lang === 'ar' 
      ? '100% صنع منزلي' 
      : '100% Homemade';

  const showcaseSubBadge = lang === 'fr' 
    ? 'Fromage Fondant 100% Mozza' 
    : lang === 'ar' 
      ? 'جبنة موزاريلا ذائبة' 
      : '100% Melted Mozzarella';

  const showcaseCulteLabel = lang === 'fr' 
    ? 'Le Plat Culte' 
    : lang === 'ar' 
      ? 'الطبق الأكثر شهرة' 
      : 'The Cult Favorite';

  const showcaseDishName = lang === 'fr' 
    ? 'Pasticcio Royal & Tacos Gratiné' 
    : lang === 'ar' 
      ? 'باستيسيو رويال وتاكوس كراتيني' 
      : 'Royal Pasticcio & Gratin Taco';

  return (
    <div className="relative bg-[#1f1712]">
      <section 
        id="hero-section" 
        className="relative overflow-hidden text-white min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-62px)] lg:min-h-0 pt-9 sm:pt-10 pb-16 sm:pb-20 lg:pb-24 flex flex-col justify-between"
      >
        {/* Italian Flag subtle accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex z-20">
          <div className="w-1/3 bg-[#15803d]" />
          <div className="w-1/3 bg-[#fdfbf7]" />
          <div className="w-1/3 bg-[#dc2626]" />
        </div>

        {/* 1. Hero Background Visual */}
        <HeroBackground 
          imageSrc={HERO_BG_IMAGE_PLACEHOLDER}
          altText="Tempo Hero Food Background - Loaded Fries & Melted Cheese"
        />

        {/* Hero Content Container - Vertically Centered on Mobile */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex items-center py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left/Center Text Stack */}
            <div className="lg:col-span-6 flex flex-col items-center text-center space-y-3.5 sm:space-y-4 lg:space-y-5 mx-auto w-full">
              
              {/* 2. Badge */}
              <HeroBadge label={badgeText} />

              {/* 3. Headline */}
              <HeroHeadline 
                primaryLine={headlinePrimary} 
                highlightLine={headlineHighlight} 
              />

              {/* 4. Subtitle */}
              <HeroSubtitle text={t.heroSub} />

              {/* 5. Feature Pills */}
              <HeroFeaturePills 
                feature1={feature1Text} 
                feature2={feature2Text} 
              />

              {/* 6. Call to Action Button */}
              <HeroCTAButton 
                text={t.seeMenu} 
                onClick={onScrollToMenu} 
              />

            </div>

            {/* 7. Desktop Showcase Card */}
            <HeroShowcaseCard
              imageSrc={TEMPO_SIGNATURE_IMAGE_PLACEHOLDER}
              badgeLabel="TEMPO SIGNATURE"
              subBadgeLabel={showcaseSubBadge}
              culteLabel={showcaseCulteLabel}
              dishName={showcaseDishName}
              fromLabel={t.from}
              price={30}
              currency={t.dh}
            />

          </div>
        </div>

        {/* Bottom Curved Wave Transition SVG */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-8 sm:h-12 lg:h-14 text-[#fbf9f5] fill-current"
          >
            <path d="M0,0 C240,65 480,10 720,55 C960,100 1100,40 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 8. Floating Trust Strip */}
      <HeroTrustStrip
        deliveryText={t.trustDelivery}
        ratingText={t.trustRating}
        homemadeText={t.trustHomemade}
      />
    </div>
  );
};
