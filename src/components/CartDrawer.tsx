import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  Bike, 
  Package, 
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Language, RestaurantConfig, DeliveryType } from '../types';
import { translations } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  config: RestaurantConfig;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  config,
  lang,
}) => {
  const t = translations[lang];

  // Order Details Form State
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const packagingFee = deliveryType === 'takeaway' ? config.takeawayFee : 0;
  const total = subtotal + packagingFee;

  // Generate clean formatted WhatsApp Message
  const generateWhatsAppMessage = (): string => {
    const isArabic = lang === 'ar';
    let msg = '';

    if (isArabic) {
      msg += `*🍕 طلبية جديدة من مطعم تيمبو (Tempo — Home made)*\n`;
      msg += `--------------------------------------\n`;
      msg += `*طريقة الاستلام:* ${deliveryType === 'delivery' ? '🛵 توصيل للمنزل' : '📦 أخذ من المطعم (إمبورطي)'}\n`;
      msg += `*اسم الزبون:* ${customerName || 'غير محدد'}\n`;
      msg += `*رقم الهاتف:* ${customerPhone || 'غير محدد'}\n`;
      if (deliveryType === 'delivery') {
        msg += `*عنوان التوصيل:* ${customerAddress || 'يرجى التحديد'}\n`;
      }
      if (orderNotes) {
        msg += `*ملاحظات:* ${orderNotes}\n`;
      }
      msg += `--------------------------------------\n`;
      msg += `*📋 تفاصيل الوجبات المطلوبة:*\n\n`;

      cartItems.forEach((item, index) => {
        msg += `${index + 1}. *${item.item.name.ar}* (×${item.quantity})\n`;
        if (item.gratinage && item.gratinage.enabled) {
          msg += `   🔥 *كراتيناج:* ${item.gratinage.choice || '4 أجبان'}\n`;
        }
        if (item.selectedSauce) {
          msg += `   🥫 *الصلصة:* ${item.selectedSauce}\n`;
        }
        if (item.supplements && item.supplements.length > 0) {
          msg += `   ➕ *إضافات:* ${item.supplements.map((s) => s.name).join(' + ')}\n`;
        }
        if (item.notes) {
          msg += `   📝 *ملاحظة:* ${item.notes}\n`;
        }
        msg += `   💰 *السعر:* ${item.totalPrice} درهم\n\n`;
      });

      msg += `--------------------------------------\n`;
      msg += `*المجموع الجزئي:* ${subtotal} درهم\n`;
      if (packagingFee > 0) {
        msg += `*رسوم تعليب إمبورطي:* +${packagingFee} درهم\n`;
      }
      msg += `*المجموع الكلي:* *${total} درهم*\n`;
      msg += `--------------------------------------\n`;
      msg += `شكراً لكم! المرجو تأكيد الطلب ووقت التوصيل التقريبي. 🙏`;
    } else {
      msg += `*🍕 NOUVELLE COMMANDE — TEMPO (Home made)*\n`;
      msg += `--------------------------------------\n`;
      msg += `*Mode:* ${deliveryType === 'delivery' ? '🛵 Livraison à domicile' : '📦 À emporter (Takeaway)'}\n`;
      msg += `*Client:* ${customerName || 'Non précisé'}\n`;
      msg += `*Téléphone:* ${customerPhone || 'Non précisé'}\n`;
      if (deliveryType === 'delivery') {
        msg += `*Adresse:* ${customerAddress || 'À préciser'}\n`;
      }
      if (orderNotes) {
        msg += `*Notes:* ${orderNotes}\n`;
      }
      msg += `--------------------------------------\n`;
      msg += `*📋 DÉTAIL DES PLATS:*\n\n`;

      cartItems.forEach((item, index) => {
        msg += `${index + 1}. *${item.item.name.fr}* (x${item.quantity})\n`;
        if (item.gratinage && item.gratinage.enabled) {
          msg += `   🔥 *Gratinage:* ${item.gratinage.choice || '4 Fromages'}\n`;
        }
        if (item.selectedSauce) {
          msg += `   🥫 *Sauce:* ${item.selectedSauce}\n`;
        }
        if (item.supplements && item.supplements.length > 0) {
          msg += `   ➕ *Suppléments:* ${item.supplements.map((s) => s.name).join(' + ')}\n`;
        }
        if (item.notes) {
          msg += `   📝 *Remarque:* ${item.notes}\n`;
        }
        msg += `   💰 *Prix:* ${item.totalPrice} DH\n\n`;
      });

      msg += `--------------------------------------\n`;
      msg += `*Sous-total:* ${subtotal} DH\n`;
      if (packagingFee > 0) {
        msg += `*Frais emballage emporter:* +${packagingFee} DH\n`;
      }
      msg += `*TOTAL À PAYER:* *${total} DH*\n`;
      msg += `--------------------------------------\n`;
      msg += `Merci de me confirmer la réception et le délai estimé ! 🙏`;
    }

    return msg;
  };

  const handleSendToWhatsApp = () => {
    if (cartItems.length === 0) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#15803d', '#dc2626', '#f59e0b'],
      });
    } catch {
      // Ignore if canvas blocked
    }

    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const cleanNumber = config.whatsappNumber.replace(/\D/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encoded}`;

    window.open(waUrl, '_blank');
  };

  const handleCopyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 w-full max-w-full">
      
      {/* Slide-over Panel */}
      <div
        id="cart-drawer-panel"
        className="w-full max-w-full sm:max-w-md bg-[#fbf9f5] h-full shadow-2xl flex flex-col justify-between border-l border-[#ded5c2] animate-in slide-in-from-right duration-300 overflow-x-hidden box-border"
      >
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#1f1712] text-white flex items-center justify-between shrink-0 border-b border-amber-900/40 w-full max-w-full overflow-x-hidden box-border">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#15803d] flex items-center justify-center text-white shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="font-heading font-black text-base sm:text-lg leading-none truncate">
                {t.cartTitle}
              </h2>
              <span className="text-[10px] text-amber-300 font-semibold">
                {cartItems.length} {lang === 'fr' ? 'articles' : lang === 'ar' ? 'أصناف' : 'items'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {cartItems.length > 0 && (
              <button
                id="clear-cart-btn"
                type="button"
                onClick={onClearCart}
                className="text-neutral-400 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                title={lang === 'fr' ? 'Vider le panier' : 'Clear'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              id="close-cart-btn"
              type="button"
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Middle Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 space-y-5 text-left rtl:text-right w-full max-w-full box-border">
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#f0e8d5] text-neutral-400 flex items-center justify-center mx-auto text-2xl">
                🛒
              </div>
              <h3 className="font-heading font-bold text-neutral-800 text-base">
                {t.emptyCartTitle}
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                {t.emptyCartSubtitle}
              </p>
            </div>
          ) : (
            <>
              {/* Delivery Type Selector */}
              <div className="bg-[#f0e8d5] p-1 rounded-2xl border border-[#ded5c2] flex gap-1 w-full max-w-full box-border">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                    deliveryType === 'delivery'
                      ? 'bg-[#15803d] text-white shadow-xs'
                      : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.delivery}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('takeaway')}
                  className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                    deliveryType === 'takeaway'
                      ? 'bg-[#dc2626] text-white shadow-xs'
                      : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.takeaway}</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 w-full max-w-full">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  {lang === 'fr' ? 'Vos plats choisis' : lang === 'ar' ? 'الوجبات المختارة' : 'Selected items'}
                </h3>

                <div className="space-y-2.5 w-full max-w-full">
                  {cartItems.map((cartItem) => (
                    <div
                      key={cartItem.cartItemId}
                      className="bg-white p-3 rounded-2xl border border-[#ded5c2] shadow-xs flex items-start justify-between gap-2.5 w-full max-w-full box-border"
                    >
                      {/* Image & details */}
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name[lang]}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 bg-neutral-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-neutral-900 leading-snug break-words truncate">
                            {cartItem.item.name[lang]}
                          </h4>

                          {/* Customizations tags */}
                          <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-neutral-600 break-words">
                            {cartItem.gratinage?.enabled && (
                              <span className="bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded-sm">
                                🔥 Gratin ({cartItem.gratinage.choice})
                              </span>
                            )}
                            {cartItem.selectedSauce && (
                              <span className="bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded-sm">
                                {cartItem.selectedSauce}
                              </span>
                            )}
                            {cartItem.supplements.map((s) => (
                              <span key={s.id} className="bg-green-50 text-green-800 font-semibold px-1.5 py-0.5 rounded-sm">
                                +{s.name}
                              </span>
                            ))}
                            {cartItem.notes && (
                              <span className="text-neutral-500 italic block w-full mt-0.5 break-words">
                                "{cartItem.notes}"
                              </span>
                            )}
                          </div>

                          <div className="font-black text-xs text-[#15803d] font-heading mt-1">
                            {cartItem.totalPrice} {t.dh}
                          </div>
                        </div>
                      </div>

                      {/* Quantity stepper & delete */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="flex items-center gap-1 bg-[#f0eade] rounded-full p-0.5 border border-[#ded5c2]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                            className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-100 text-xs shrink-0 cursor-pointer shadow-2xs"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-4 text-center font-bold text-xs">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                            className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-100 text-xs shrink-0 cursor-pointer shadow-2xs"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(cartItem.cartItemId)}
                          className="text-neutral-400 hover:text-red-500 text-[10px] p-1 cursor-pointer"
                          aria-label="Supprimer l'article"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Contact & Address Form */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#ded5c2] space-y-3 w-full max-w-full box-border">
                <h3 className="text-xs font-black text-neutral-900 font-heading">
                  {t.clientInfo}
                </h3>

                <div className="space-y-2 text-xs w-full max-w-full">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                      {t.fullName}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t.fullNamePlaceholder}
                      className="w-full min-w-0 max-w-full bg-[#fbf9f5] border border-[#ded5c2] rounded-xl px-3 py-2 text-xs focus:border-[#15803d] focus:outline-hidden box-border"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full min-w-0 max-w-full bg-[#fbf9f5] border border-[#ded5c2] rounded-xl px-3 py-2 text-xs focus:border-[#15803d] focus:outline-hidden box-border"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                        {t.address}
                      </label>
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder={t.addressPlaceholder}
                        className="w-full min-w-0 max-w-full bg-[#fbf9f5] border border-[#ded5c2] rounded-xl px-3 py-2 text-xs focus:border-[#15803d] focus:outline-hidden box-border"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                      {t.orderNotes}
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder={t.orderNotesPlaceholder}
                      className="w-full min-w-0 max-w-full bg-[#fbf9f5] border border-[#ded5c2] rounded-xl px-3 py-2 text-xs focus:border-[#15803d] focus:outline-hidden box-border"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Bottom Checkout Action Area */}
        {cartItems.length > 0 && (
          <div className="p-3.5 sm:p-5 bg-white border-t border-[#ded5c2] shrink-0 space-y-3 w-full max-w-full overflow-x-hidden box-border">
            
            {/* Price Calculations */}
            <div className="space-y-1 text-xs w-full">
              <div className="flex justify-between text-neutral-600">
                <span>{t.subtotal}</span>
                <span className="font-bold">{subtotal} {t.dh}</span>
              </div>
              {packagingFee > 0 && (
                <div className="flex justify-between text-amber-800 font-semibold">
                  <span>{t.packagingFee} (+2 DH)</span>
                  <span>+{packagingFee} {t.dh}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-neutral-900 pt-1 border-t border-dashed border-neutral-200">
                <span className="font-heading">{t.totalToPay}</span>
                <span className="text-[#15803d] font-heading text-lg">{total} {t.dh}</span>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <button
              id="send-whatsapp-order-btn"
              type="button"
              onClick={handleSendToWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-[#072412] font-black text-xs sm:text-sm py-3.5 px-3 rounded-2xl shadow-lg shadow-green-950/20 transition-all cursor-pointer box-border"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
              <span className="truncate">{t.sendWhatsAppBtn}</span>
            </button>

            {/* Copy order as backup */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-neutral-500 pt-0.5 w-full">
              <span className="text-[10px] sm:text-[11px] leading-tight text-neutral-500 line-clamp-1">{t.whatsAppSubtitle}</span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900 font-semibold underline cursor-pointer shrink-0 text-[11px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
                <span>{copied ? t.copiedToast : t.copyOrder}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
