import React, { useState } from 'react';
import { QrCode, Download, ExternalLink, Check, Copy, CreditCard, Sparkles, Printer } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { DaliLogo } from './DaliLogo';

export const QrCodeCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const websiteUrl = 'https://dalielectricite.fr';

  const copyUrl = () => {
    navigator.clipboard.writeText(websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Spécial Cartes de Visite &amp; Flyers</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Votre QR Code Officiel Dali Électricité
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Prêt pour vos futures cartes de visite, flyers, devis papier et marquage camionnette.
          </p>
        </div>

        {/* Copy site button */}
        <button
          onClick={copyUrl}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Lien copié !</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copier le lien</span>
            </>
          )}
        </button>
      </div>

      {/* Grid: QR Code display + Business Card Mockup */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: The QR Code itself */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-amber-50/40 rounded-2xl border border-slate-200 text-center">
          <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200/80 mb-4 relative group">
            <img
              src="/qr-code-dali-electricite.png"
              alt="QR Code Dali Électricité"
              className="w-48 h-48 object-contain rounded-lg"
            />
            <div className="absolute inset-0 bg-slate-900/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2 pointer-events-none">
              <QrCode className="w-5 h-5 text-amber-400" />
              <span>Flashez pour tester</span>
            </div>
          </div>

          <span className="text-xs font-extrabold text-slate-800 tracking-wide font-mono bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            {websiteUrl}
          </span>
          <span className="text-[11px] text-slate-500 mt-1">
            Redirige directement vers votre site sécurisé HTTPS
          </span>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-5 w-full">
            <a
              href="/qr-code-dali-electricite.png"
              download="QR-Code-Dali-Electricite-HD.png"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Format Image PNG (HD)</span>
            </a>

            <a
              href="/qr-code-dali-electricite-noir.svg"
              download="QR-Code-Dali-Electricite-Vectoriel.svg"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-slate-950" />
              <span>Format Vectoriel SVG</span>
            </a>
          </div>
          <span className="text-[10px] text-slate-400 mt-2">
            * Le format SVG offre une qualité infinie pour votre imprimeur (VistaPrint, Moo, etc.)
          </span>
        </div>

        {/* Right: Business Card Preview Mockup */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600">
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span>Aperçu suggéré pour votre carte de visite (85 × 55 mm)</span>
          </div>

          {/* Business card design */}
          <div className="w-full aspect-[85/55] max-w-md mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/70 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-amber-400/30 flex flex-col justify-between relative overflow-hidden">
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <DaliLogo variant="dark" size="sm" />
                <span className="block text-[11px] text-amber-400 font-bold uppercase tracking-widest mt-1">
                  Électricité Générale &amp; Automatismes
                </span>
              </div>
              <div className="bg-white p-1.5 rounded-lg shadow border border-amber-400/50">
                <img
                  src="/qr-code-dali-electricite.png"
                  alt="QR Code"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
              </div>
            </div>

            {/* Bottom row */}
            <div className="space-y-1.5 text-xs border-t border-slate-800/80 pt-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-white font-extrabold text-sm block">
                    {COMPANY_INFO.phone}
                  </span>
                  <span className="text-[10px] text-slate-300">
                    {COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-amber-400 font-black text-xs block font-mono">
                    dalielectricite.fr
                  </span>
                  <span className="text-[10px] text-pink-400 font-bold">
                    @{COMPANY_INFO.instagram.handle}
                  </span>
                </div>
              </div>
            </div>

            {/* Subtile ambient shine */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Print advice */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>💡 Conseil pour l'impression de vos cartes :</span>
            </p>
            <p className="text-[11px] leading-relaxed">
              Donnez simplement le fichier <strong>SVG</strong> ou <strong>PNG HD</strong> à votre imprimeur ou téléversez-le sur <strong>VistaPrint</strong>. Le QR code a une marge de sécurité et un niveau de correction élevé pour être scanné facilement avec n'importe quel smartphone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
