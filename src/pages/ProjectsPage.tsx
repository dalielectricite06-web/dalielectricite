import React from 'react';
import { Sparkles, Phone, ArrowRight, ShieldCheck, CheckCircle2, Instagram } from 'lucide-react';
import { WorksShowcase } from '../components/WorksShowcase';
import { InstagramBadge } from '../components/InstagramBadge';
import { COMPANY_INFO } from '../data/companyData';

interface ProjectsPageProps {
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chantiers &amp; Travaux Réalisés</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            APERÇU DE NOS RÉALISATIONS
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Découvrez nos chantiers récents en <strong>portes automatiques</strong>, <strong>motorisations de portails</strong>, <strong>portes industrielles rapides</strong> et <strong>électricité générale</strong> sur Cagnes-sur-Mer et la Côte d'Azur.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Chantiers réels vérifiés
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Matériel certifié d'origine
            </span>
            <span>•</span>
            <a
              href={COMPANY_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-pink-400 hover:text-pink-300 underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              {COMPANY_INFO.instagram.handle}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Instagram Follow Callout Banner */}
        <InstagramBadge variant="card" />

        {/* Gallery of Works */}
        <WorksShowcase onOpenQuoteModal={onOpenQuoteModal} />

        {/* Bottom CTA for a project */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border border-slate-800 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            ⚡ VOUS SOUHAITEZ UNE INSTALLATION SIMILAIRE ?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            OBTENEZ UN DEVIS SUR-MESURE POUR VOTRE PROPRIÉTÉ OU VOTRE COMMERCE
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Dali Électricité se déplace gratuitement pour étudier les contraintes de votre accès et vous proposer la motorisation ou la porte automatique la plus adaptée.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-6 py-3.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Appeler le {COMPANY_INFO.phone}</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Demander un devis gratuit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
