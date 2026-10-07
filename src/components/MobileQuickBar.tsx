import React from 'react';
import { Phone, Calendar, Zap } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface MobileQuickBarProps {
  onOpenQuoteModal: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenQuoteModal }) => {
  return (
    <aside
      aria-label="Actions rapides pour mobile"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2 sm:p-2.5 shadow-2xl"
    >
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-900 active:bg-rose-950 text-white font-bold text-xs tracking-wide shadow"
        >
          <div className="w-5 h-5 rounded-full bg-rose-800 flex items-center justify-center">
            <Phone className="w-3 h-3 text-amber-300" />
          </div>
          <span>Appeler {COMPANY_INFO.phone}</span>
        </a>

        {/* Free Quote Button */}
        <button
          onClick={onOpenQuoteModal}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-400 active:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow"
        >
          <Zap className="w-3.5 h-3.5 fill-slate-950" />
          <span>Devis Gratuit</span>
        </button>
      </div>
    </aside>
  );
};
