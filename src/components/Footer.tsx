import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck, 
  ShoppingBag,
  Flame,
  Heart,
  Star
} from 'lucide-react';
import { TempoLogo } from './TempoLogo';
import { Language, RestaurantConfig } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  config: RestaurantConfig;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ config, lang }) => {
  const t = translations[lang];

  return (
    <footer className="relative bg-[#1a130e] text-[#ded5c2] pt-14 pb-12 border-t-4 border-[#15803d]">
      
      {/* Italian Flag bar atop footer */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="w-1/3 bg-[#15803d]" />
        <div className="w-1/3 bg-[#fdfbf7]" />
        <div className="w-1/3 bg-[#dc2626]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 3 Columns (Varied Asymmetric Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Story: 5 cols */}
          <div className="md:col-span-5 space-y-4">
            <TempoLogo size="lg" variant="light" />
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm pt-2">
              {t.aboutText}
            </p>

            {/* Snack Tempo mention pill */}
            <div className="inline-flex items-center gap-2 bg-[#2a1e16] border border-amber-600/30 px-3 py-1.5 rounded-xl text-xs text-amber-300">
              <MapPin className="w-3.5 h-3.5 text-[#dc2626]" />
              <span>
                {lang === 'fr' ? 'Retrouvez-nous sous le nom' : lang === 'ar' ? 'تجدوننا على الخريطة باسم' : 'Find us as'}{' '}
                <strong className="text-white">"{config.mapsName}"</strong> sur Google Maps
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={config.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
              >
                <span>{t.findOnMaps}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://g.page/r/PLACEHOLDER/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#241a13] hover:bg-[#2e2119] border border-amber-500/30 hover:border-amber-500/50 text-amber-300 hover:text-amber-200 text-xs font-semibold px-3.5 py-2 rounded-full transition-all"
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{t.leaveReview}</span>
              </a>
            </div>
          </div>

          {/* Opening Hours & Takeaway Note: 3 cols */}
          <div className="md:col-span-3 space-y-3.5">
            <h3 className="font-heading font-black text-white text-base tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{t.openingHoursTitle}</span>
            </h3>

            <div className="bg-[#241a13] p-3.5 rounded-2xl border border-white/5 space-y-2 text-xs">
              <div className="font-bold text-white">
                {config.openingHours[lang]}
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'fr' ? 'Service continu non-stop' : lang === 'ar' ? 'خدمة متواصلة طيلة اليوم' : 'Non-stop service'}</span>
              </div>
            </div>

            {/* Takeaway / Emporter Note */}
            <div className="bg-[#166534]/20 border border-[#15803d]/40 p-3 rounded-2xl text-xs text-green-200 space-y-1">
              <div className="font-bold flex items-center gap-1 text-white">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                <span>Takeaway / Emporter</span>
              </div>
              <p className="text-[11px] text-green-100/90 leading-tight">
                {t.takeawayFooterNote}
              </p>
            </div>
          </div>

          {/* Contact & WhatsApp Ordering: 4 cols */}
          <div className="md:col-span-4 space-y-3.5">
            <h3 className="font-heading font-black text-white text-base tracking-wide flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{t.contactTitle}</span>
            </h3>

            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5 bg-[#241a13] p-3 rounded-xl border border-white/5">
                <MapPin className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                <span>{config.address[lang]}</span>
              </div>

              <a
                href={`tel:${config.phoneNumber}`}
                className="flex items-center gap-2.5 bg-[#241a13] hover:bg-[#2e2119] p-3 rounded-xl border border-white/5 text-white transition-colors block"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold">{config.phoneNumber}</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#25D366] hover:bg-[#20ba59] text-[#072412] p-3 rounded-xl font-bold transition-all shadow-md"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp direct</span>
                </div>
                <span className="text-[11px] font-mono">+{config.whatsappNumber}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom micro footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} <span className="font-bold text-white">Tempo — Home made</span> ({config.mapsName}). {t.allRightsReserved}
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px]">
              <span>Cuisiné avec passion</span>
              <Heart className="w-3 h-3 text-red-500 fill-current" />
              <span>au Maroc</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
