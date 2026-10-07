import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  Zap,
  Wrench,
  Award,
} from 'lucide-react';
import { COMPANY_INFO, WHY_CHOOSE_US } from '../data/companyData';
import { DaliLogo } from '../components/DaliLogo';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuoteModal }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisan de Confiance à Cagnes-sur-Mer</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            À PROPOS DE DALI ÉLECTRICITÉ
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            L'alliance de l'expertise électrotechnique et de la précision des automatismes de fermeture sur toute la Côte d'Azur.
          </p>
        </div>
      </section>

      {/* Main Story & Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              ⚡ NOTRE IDENTITÉ &amp; SAVOIR-FAIRE
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              UN ARTISAN EXPERT DÉDIÉ À VOTRE CONFORT ET À VOTRE SÉCURITÉ
            </h2>

            <p className="text-slate-700 text-sm leading-relaxed">
              Implantée au <strong>13 impasses des espartes à Cagnes-sur-Mer (06800)</strong>, <strong>Dali Électricité</strong> est une entreprise artisanale spécialisée dans l'électricité générale, l'installation et le dépannage de portes automatiques, portails électriques, rideaux métalliques et tout type d'automatisme de menuiserie.
            </p>

            <p className="text-slate-700 text-sm leading-relaxed">
              Nous répondons aux exigences les plus strictes aussi bien pour les particuliers (villas, rénovations, mises aux normes) que pour les professionnels (commerces de proximité, grandes surfaces, pharmacies, syndics de copropriété et bureaux).
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900 uppercase">Électricité</h4>
                <p className="text-[11px] text-slate-600 mt-1">Conformité NF C 15-100, tableaux, dépannage et rénovation complète.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
                  <Wrench className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900 uppercase">Automatismes</h4>
                <p className="text-[11px] text-slate-600 mt-1">Motorisations de portails battants/coulissants et rideaux de commerce.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900 uppercase">Portes Auto</h4>
                <p className="text-[11px] text-slate-600 mt-1">Spécialiste agréé pour magasins, maintenance préventive et SAV 7j/7.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Brand Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 text-white rounded-3xl p-8 border-2 border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <DaliLogo variant="dark" size="lg" />

                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>13 impasses des espartes, 06800 Cagnes-sur-Mer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>07 49 13 71 01 (Ligne directe artisan)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Dépannage d’urgence 7 jours sur 7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Assurance RC Pro &amp; Garantie Décennale</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onOpenQuoteModal}
                    className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all text-center"
                  >
                    Demander une intervention ou un devis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commitments & Guarantees */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              ⚡ NOS ENGAGEMENTS CLIENTS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              POURQUOI FAIRE CONFIANCE À DALI ÉLECTRICITÉ ?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_CHOOSE_US.map((why) => (
              <div key={why.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-amber-600 font-extrabold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{why.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {why.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
