import React, { useState } from 'react';
import { X, Lock, Unlock, Save, RotateCcw, Check, DollarSign, Eye, EyeOff } from 'lucide-react';
import { MenuItem, RestaurantConfig, Language } from '../types';
import { translations } from '../data/translations';
import { initialMenuItems, initialRestaurantConfig } from '../data/initialData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onSaveMenuItems: (updated: MenuItem[]) => Promise<void>;
  config: RestaurantConfig;
  onSaveConfig: (updated: RestaurantConfig) => Promise<void>;
  lang: Language;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onSaveMenuItems,
  config,
  onSaveConfig,
  lang,
}) => {
  const t = translations[lang];

  const [pin, setPin] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [itemsDraft, setItemsDraft] = useState<MenuItem[]>(menuItems);
  const [configDraft, setConfigDraft] = useState<RestaurantConfig>(config);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Sync draft when opened
  React.useEffect(() => {
    setItemsDraft(menuItems);
    setConfigDraft(config);
  }, [isOpen, menuItems, config]);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === '0000') {
      setIsUnlocked(true);
    } else {
      alert(lang === 'fr' ? 'Code PIN incorrect (par défaut: 1234)' : 'Incorrect PIN (Default: 1234)');
    }
  };

  const handlePriceChange = (itemId: string, newPrice: number) => {
    setItemsDraft((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, price: newPrice } : it))
    );
  };

  const handleToggleAvailability = (itemId: string) => {
    setItemsDraft((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, available: !it.available } : it))
    );
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await onSaveMenuItems(itemsDraft);
      await onSaveConfig(configDraft);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (confirm(lang === 'fr' ? 'Réinitialiser le menu aux prix d’origine ?' : 'Reset to default prices?')) {
      setItemsDraft(initialMenuItems);
      setConfigDraft(initialRestaurantConfig);
      await onSaveMenuItems(initialMenuItems);
      await onSaveConfig(initialRestaurantConfig);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div
        id="admin-management-modal"
        className="relative bg-[#fbf9f5] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#ded5c2] overflow-hidden max-h-[90vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#1b261b] text-white flex items-center justify-between shrink-0 border-b border-green-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#15803d] flex items-center justify-center text-white">
              {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="font-heading font-black text-base sm:text-lg">
                {t.adminTitle}
              </h2>
              <span className="text-[11px] text-neutral-400">
                Firebase Firestore DB : <code className="text-amber-300">tempo-rabat</code>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unlocked / Locked State */}
        {!isUnlocked ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-xl">
              🔐
            </div>
            <h3 className="font-heading font-bold text-lg text-neutral-900">
              {lang === 'fr' ? 'Accès gérant restaurant' : 'Staff & Owner Access'}
            </h3>
            <p className="text-xs text-neutral-500">
              {lang === 'fr' ? 'Saisissez votre code PIN gérant pour éditer les prix et disponibilités.' : 'Enter your staff PIN code to manage menu prices and availability.'}
            </p>

            <form onSubmit={handleUnlock} className="space-y-3 pt-2">
              <input
                id="admin-pin-input"
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN (ex: 1234)"
                className="w-full text-center tracking-widest text-lg font-mono py-2.5 bg-white border border-[#ded5c2] rounded-xl focus:border-[#15803d] focus:outline-hidden"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md"
              >
                {t.adminUnlock}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-left rtl:text-right">
            
            {showToast && (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>{t.changesSaved}</span>
              </div>
            )}

            {/* General Settings */}
            <div className="bg-white p-4 rounded-2xl border border-[#ded5c2] space-y-3">
              <h3 className="text-xs font-black text-neutral-800 uppercase tracking-wider">
                {lang === 'fr' ? 'Paramètres de commande' : 'Order Settings'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                    {t.whatsappSetting}
                  </label>
                  <input
                    type="text"
                    value={configDraft.whatsappNumber}
                    onChange={(e) =>
                      setConfigDraft({ ...configDraft, whatsappNumber: e.target.value })
                    }
                    placeholder="212600000000"
                    className="w-full bg-[#fbf9f5] border border-[#ded5c2] rounded-xl px-3 py-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                    {t.takeawayFeeSetting}
                  </label>
                  <input
                    type="number"
                    value={configDraft.takeawayFee}
                    onChange={(e) =>
                      setConfigDraft({
                        ...configDraft,
                        takeawayFee: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-[#fbf9f5] border border-[#ded5c2] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white rounded-2xl border border-[#ded5c2] overflow-hidden">
              <div className="p-3.5 bg-[#f0e8d5] border-b border-[#ded5c2] flex items-center justify-between">
                <h3 className="text-xs font-black text-neutral-900 font-heading">
                  {t.editPrices} ({itemsDraft.length} {lang === 'fr' ? 'plats' : 'items'})
                </h3>
                <span className="text-[10px] text-neutral-500">
                  {lang === 'fr' ? 'Modifications synchronisées en temps réel' : 'Live synced'}
                </span>
              </div>

              <div className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
                {itemsDraft.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 flex items-center justify-between gap-3 hover:bg-neutral-50 text-xs"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <img
                        src={item.image}
                        alt=""
                        className="w-8 h-8 rounded-lg object-cover shrink-0 bg-neutral-200"
                      />
                      <div className="truncate">
                        <div className="font-bold text-neutral-900 truncate">
                          {item.name[lang]}
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          Catégorie : {item.categoryId}
                        </div>
                      </div>
                    </div>

                    {/* Controls: Price input & Stock toggle */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1 bg-[#fbf9f5] border border-[#ded5c2] rounded-lg px-2 py-1">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handlePriceChange(item.id, Math.max(1, Number(e.target.value) || 0))
                          }
                          className="w-12 text-center font-bold text-xs bg-transparent focus:outline-hidden"
                        />
                        <span className="text-[10px] font-bold text-neutral-500">DH</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleAvailability(item.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          item.available
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {item.available ? t.inStock : t.outOfStock}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions inside Unlocked view */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-red-600 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetDefaults}</span>
              </button>

              <button
                type="button"
                onClick={handleSaveAll}
                disabled={isSaving}
                className="flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Sauvegarde...' : t.saveChanges}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
