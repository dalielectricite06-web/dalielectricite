import React, { useState } from 'react';
import { Instagram, ExternalLink, QrCode, Check, Copy, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface InstagramBadgeProps {
  variant?: 'card' | 'compact' | 'inline' | 'banner';
  className?: string;
}

export const InstagramBadge: React.FC<InstagramBadgeProps> = ({
  variant = 'card',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const instagramUrl = COMPANY_INFO.instagram.url;
  const handle = COMPANY_INFO.instagram.handle;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(instagramUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'inline') {
    return (
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-amber-400 transition-colors group ${className}`}
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-700 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
          <Instagram className="w-3.5 h-3.5" />
        </div>
        <span>{handle}</span>
        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-white ${className}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-700 flex items-center justify-center text-white flex-shrink-0">
            <Instagram className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-extrabold">{handle}</div>
            <div className="text-[10px] text-slate-400">Vidéos de chantiers en direct</div>
          </div>
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1 transition-colors"
        >
          <span>Voir</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <>
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-7 border border-slate-800 shadow-xl ${className}`}>
        {/* Subtle Instagram Gradient Glow in background */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-pink-600 via-purple-600 to-amber-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-700 flex items-center justify-center text-white shadow-lg p-0.5">
                <div className="w-full h-full rounded-[14px] bg-slate-950/20 backdrop-blur-xs flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Instagram Officiel
                </span>
                <h4 className="text-lg font-black text-white tracking-tight">
                  {handle}
                </h4>
              </div>
            </div>

            <button
              onClick={() => setShowQrModal(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Scanner le QR Code Instagram"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">QR Code</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Découvrez nos interventions en direct, vidéos de portes automatiques en fonctionnement, tests de motorisations de portails et photos récentes de nos réalisations.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Instagram className="w-4 h-4" />
              <span>S'abonner sur Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handleCopy}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copier lien</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal for Instagram */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-700 flex items-center justify-center text-white">
              <Instagram className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                Scanner avec votre smartphone
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                {handle}
              </h3>
            </div>

            {/* Stylized Instagram QR Code Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center">
              <div className="w-48 h-48 bg-white p-3 rounded-xl shadow-md flex items-center justify-center relative">
                {/* SVG QR Code Simulation with Instagram logo in center matching user uploaded QR */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* QR finder patterns */}
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#3B82F6" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="13" width="10" height="10" rx="1" fill="#3B82F6" />

                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#3B82F6" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="77" y="13" width="10" height="10" rx="1" fill="#3B82F6" />

                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#3B82F6" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="77" width="10" height="10" rx="1" fill="#3B82F6" />

                  {/* Dot matrix pattern */}
                  <circle cx="42" cy="12" r="2.5" fill="#6366F1" />
                  <circle cx="50" cy="18" r="2.5" fill="#6366F1" />
                  <circle cx="58" cy="12" r="2.5" fill="#6366F1" />
                  <circle cx="45" cy="28" r="2.5" fill="#6366F1" />
                  <circle cx="55" cy="28" r="2.5" fill="#6366F1" />
                  <circle cx="15" cy="45" r="2.5" fill="#6366F1" />
                  <circle cx="25" cy="45" r="2.5" fill="#6366F1" />
                  <circle cx="18" cy="55" r="2.5" fill="#6366F1" />
                  <circle cx="28" cy="55" r="2.5" fill="#6366F1" />
                  <circle cx="75" cy="45" r="2.5" fill="#6366F1" />
                  <circle cx="85" cy="45" r="2.5" fill="#6366F1" />
                  <circle cx="72" cy="55" r="2.5" fill="#6366F1" />
                  <circle cx="82" cy="55" r="2.5" fill="#6366F1" />
                  <circle cx="45" cy="72" r="2.5" fill="#6366F1" />
                  <circle cx="55" cy="72" r="2.5" fill="#6366F1" />
                  <circle cx="42" cy="88" r="2.5" fill="#6366F1" />
                  <circle cx="50" cy="82" r="2.5" fill="#6366F1" />
                  <circle cx="58" cy="88" r="2.5" fill="#6366F1" />

                  {/* Central Instagram Icon */}
                  <rect x="36" y="36" width="28" height="28" rx="8" fill="#3B82F6" />
                  <circle cx="50" cy="50" r="7" stroke="white" strokeWidth="2.5" fill="none" />
                  <circle cx="58" cy="42" r="1.5" fill="white" />
                </svg>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-700 mt-2">
                @DALI_ELECTRICITE06
              </span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs uppercase"
              >
                Ouvrir directement l'application
              </a>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
