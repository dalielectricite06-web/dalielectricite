import React from 'react';
import { X, Phone, ShieldCheck } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { COMPANY_INFO } from '../data/companyData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              ⚡ DALI ÉLECTRICITÉ — CAGNES-SUR-MER
            </span>
            <h3 className="text-lg font-black text-white">
              Demande de Devis Gratuit &amp; Sans Engagement
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Contact Form */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
              Réponse assurée sous 30 minutes par notre artisan électricien.
            </span>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="font-bold text-rose-900 hover:underline flex items-center gap-1 flex-shrink-0 ml-2"
            >
              <Phone className="w-3 h-3" />
              {COMPANY_INFO.phone}
            </a>
          </div>

          <ContactForm
            initialService={preselectedService}
            isCompact={true}
            onSuccess={() => {}}
            className="border-0 shadow-none p-0"
          />
        </div>
      </div>
    </div>
  );
};
