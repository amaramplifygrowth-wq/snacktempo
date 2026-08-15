import React, { useState } from 'react';
import { X, Flame, Check, Plus, Minus } from 'lucide-react';
import { MenuItem, Supplement, CartItem, Language } from '../types';
import { translations } from '../data/translations';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  supplementsList: Supplement[];
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  lang: Language;
}

interface ItemCustomizeModalInnerProps {
  item: MenuItem;
  supplementsList: Supplement[];
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  lang: Language;
}

const ItemCustomizeModalInner: React.FC<ItemCustomizeModalInnerProps> = ({
  item,
  supplementsList,
  onClose,
  onAddToCart,
  lang,
}) => {
  const t = translations[lang];

  // Local customization state - called unconditionally inside mounted inner component
  const [quantity, setQuantity] = useState<number>(1);
  const [gratinageEnabled, setGratinageEnabled] = useState<boolean>(
    item.categoryId === 'tacos-gratine' || false
  );
  const [selectedGratinChoice, setSelectedGratinChoice] = useState<string>(
    item.categoryId === 'tacos-gratine' ? '4 Fromages Fondant' : '4 Fromages Fondant'
  );
  const [selectedSupplements, setSelectedSupplements] = useState<Supplement[]>([]);
  const [selectedSauce, setSelectedSauce] = useState<string>('Sauce Algérienne');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const sauces = [
    { id: 'algérienne', name: 'Sauce Algérienne' },
    { id: 'samurai', name: 'Sauce Samouraï (Piquante)' },
    { id: 'biggy', name: 'Sauce Biggy Burger' },
    { id: 'andalouse', name: 'Sauce Andalouse' },
    { id: 'fromagere', name: 'Sauce Fromagère Maison' },
    { id: 'barbecue', name: 'Sauce Barbecue Fumée' },
    { id: 'mayo-ketchup', name: 'Mayonnaise & Ketchup' },
    { id: 'blanche', name: 'Sauce Blanche Ail & Fines Herbes' },
  ];

  // Gratin cost: for tacos-gratine it's already in base price, for others with gratin enabled it is +10 DH
  const gratinCost = (gratinageEnabled && item.categoryId !== 'tacos-gratine') ? 10 : 0;
  const supplementsTotal = selectedSupplements.reduce((acc, curr) => acc + curr.price, 0);
  const unitPrice = item.price + gratinCost + supplementsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleSupplement = (supp: Supplement) => {
    if (selectedSupplements.some((s) => s.id === supp.id)) {
      setSelectedSupplements(selectedSupplements.filter((s) => s.id !== supp.id));
    } else {
      setSelectedSupplements([...selectedSupplements, supp]);
    }
  };

  const handleConfirm = () => {
    const cartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      item,
      quantity,
      gratinage: gratinageEnabled
        ? {
            enabled: true,
            choice: selectedGratinChoice,
            price: gratinCost,
          }
        : undefined,
      supplements: selectedSupplements.map((s) => ({
        id: s.id,
        name: s.name[lang],
        price: s.price,
      })),
      selectedSauce: selectedSauce,
      notes: specialNotes.trim(),
      unitPrice,
      totalPrice,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div
        id="item-customizer-modal"
        className="relative bg-[#fbf9f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#ded5c2] overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header with image banner */}
        <div className="relative h-40 sm:h-48 shrink-0 bg-neutral-900">
          <img
            src={item.image}
            alt={item.name[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/40 to-transparent" />

          {/* Close button */}
          <button
            id="close-customizer-btn"
            onClick={onClose}
            aria-label="Fermer la personnalisation"
            className="absolute top-3.5 right-3.5 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Base Price overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider font-heading">
                {t.customizeTitle}
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading leading-tight">
                {item.name[lang]}
              </h2>
            </div>
            <div className="bg-[#15803d] text-white px-3 py-1 rounded-full font-black text-sm shrink-0 font-heading">
              {item.price} {t.dh}
            </div>
          </div>
        </div>

        {/* Scrollable Options Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-left rtl:text-right">
          
          <p className="text-xs text-neutral-600 leading-relaxed">
            {item.description[lang]}
          </p>

          {/* ================= GRATINAGE OPTION (+10 DH) ================= */}
          {(item.isGratinable || item.categoryId === 'tacos-gratine') && (
            <div className="bg-amber-50/80 border border-amber-300/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center">
                    <Flame className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-amber-950 font-heading">
                      {item.categoryId === 'tacos-gratine'
                        ? (lang === 'fr' ? 'Choix du Gratinage Four' : lang === 'ar' ? 'نوع الكراتيناج بالفرن' : 'Gratin Style')
                        : t.selectGratinage}
                    </h3>
                    <p className="text-[11px] text-amber-800">
                      {t.gratinageDescription}
                    </p>
                  </div>
                </div>

                {item.categoryId !== 'tacos-gratine' && (
                  <button
                    type="button"
                    onClick={() => setGratinageEnabled(!gratinageEnabled)}
                    className={`px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                      gratinageEnabled
                        ? 'bg-[#15803d] text-white shadow-xs'
                        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                    }`}
                  >
                    {gratinageEnabled ? '✓ Inclus +10 DH' : '+ Ajouter 10 DH'}
                  </button>
                )}
              </div>

              {/* Cheese Choices if gratinage is active */}
              {gratinageEnabled && (
                <div className="pt-2 border-t border-amber-200/80">
                  <label className="text-[11px] font-bold text-amber-900 block mb-1.5">
                    {t.chooseGratinStyle}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: '4fromages', label: t.gratin4Cheeses, desc: 'Mozza, Gouda, Emmental, Bleu' },
                      { id: 'champagne', label: t.gratinChampagne, desc: 'Crème onctueuse & Mozza' },
                      { id: 'cheddar', label: t.gratinCheddar, desc: 'Cheddar coulant anglais' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setSelectedGratinChoice(g.label)}
                        className={`p-2.5 rounded-xl text-left rtl:text-right border transition-all cursor-pointer text-xs ${
                          selectedGratinChoice === g.label
                            ? 'bg-[#15803d] text-white border-[#15803d] font-bold shadow-xs'
                            : 'bg-white text-neutral-800 border-amber-200 hover:bg-amber-100/50'
                        }`}
                      >
                        <div className="font-extrabold">{g.label}</div>
                        <div className={`text-[10px] ${selectedGratinChoice === g.label ? 'text-green-100' : 'text-neutral-500'}`}>
                          {g.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= SAUCE CHOICES ================= */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
              <span>{t.chooseSauce}</span>
              <span className="text-[11px] text-neutral-500 font-normal">
                {lang === 'fr' ? '1 sauce incluse' : lang === 'ar' ? 'صلصة مجانية' : '1 sauce included'}
              </span>
            </label>
            <select
              value={selectedSauce}
              onChange={(e) => setSelectedSauce(e.target.value)}
              className="w-full bg-white border border-[#ded5c2] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 font-semibold focus:border-[#15803d] focus:outline-hidden"
            >
              {sauces.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* ================= SUPPLEMENTS SECTION ================= */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 font-heading">
                {t.supplementsTitle}
              </h3>
              <span className="text-[11px] text-neutral-500">
                {lang === 'fr' ? 'Optionnel' : lang === 'ar' ? 'اختياري' : 'Optional'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {supplementsList.map((supp) => {
                const isSelected = selectedSupplements.some((s) => s.id === supp.id);
                return (
                  <button
                    key={supp.id}
                    type="button"
                    onClick={() => toggleSupplement(supp)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#15803d]/10 border-[#15803d] text-[#15803d] font-bold shadow-xs'
                        : 'bg-white border-[#ded5c2] text-neutral-800 hover:bg-[#f4efe4]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                          isSelected
                            ? 'bg-[#15803d] border-[#15803d] text-white'
                            : 'border-neutral-400 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{supp.name[lang]}</span>
                    </div>
                    <span className="font-extrabold shrink-0">
                      +{supp.price} {t.dh}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= SPECIAL NOTES ================= */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-800 block">
              {t.specialNotes}
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full bg-white border border-[#ded5c2] rounded-xl px-3.5 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-[#15803d] focus:outline-hidden"
            />
          </div>

        </div>

        {/* Footer: Quantity Stepper & Add Button */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#ded5c2] flex items-center justify-between gap-3 shrink-0">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-[#f0eade] p-1 rounded-full border border-[#ded5c2]">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Diminuer la quantité"
              className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 active:scale-95 shadow-xs cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-black text-sm text-neutral-800 font-heading">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Augmenter la quantité"
              className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 active:scale-95 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Confirm Button */}
          <button
            id="confirm-add-to-cart-btn"
            type="button"
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-between bg-[#15803d] hover:bg-[#166534] active:scale-98 text-white px-5 py-3 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <span>{t.addTotalToCart}</span>
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full font-black text-xs font-heading">
              {totalPrice} {t.dh}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  supplementsList,
  isOpen,
  onClose,
  onAddToCart,
  lang,
}) => {
  if (!isOpen || !item) {
    return null;
  }

  return (
    <ItemCustomizeModalInner
      key={item.id}
      item={item}
      supplementsList={supplementsList}
      onClose={onClose}
      onAddToCart={onAddToCart}
      lang={lang}
    />
  );
};
