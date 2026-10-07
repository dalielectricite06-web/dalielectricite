import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight, Zap, Instagram, ExternalLink } from 'lucide-react';
import { DaliLogo } from './DaliLogo';
import { COMPANY_INFO, SERVICES_DATA, INTERVENTION_ZONES } from '../data/companyData';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner inside Footer */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border-b border-amber-400/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-amber-400 text-xs font-black uppercase tracking-widest">
              ⚡ BESOIN D'UNE INTERVENTION RAPIDE OU D'UN DEVIS ?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Dali Électricité intervient chez vous à Cagnes-sur-Mer et dans le 06
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Dépannage d’urgence 7j/7, mise en conformité, motorisation de portails et portes automatiques.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-5 py-3 rounded-xl bg-rose-900 hover:bg-rose-950 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              Demander un Devis Gratuit
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Presentation */}
          <div className="space-y-4">
            <DaliLogo variant="dark" size="md" />

            <p className="text-xs text-slate-400 leading-relaxed">
              Entreprise spécialisée en électricité générale, pose et maintenance de portes automatiques, motorisation de portails et rideaux métalliques. Basée à Cagnes-sur-Mer, nous intervenons pour particuliers, commerces et copropriétés sur toute la Côte d'Azur.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Garantie Décennale &amp; Responsabilité Civile</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Dépannage d'urgence 7j/7</span>
              </div>
            </div>
          </div>

          {/* Col 2: Nos Services */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Nos Prestations
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      handleNav('services');
                    }}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left text-slate-300 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                    <span>{srv.title}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left text-amber-400 font-semibold pt-1"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Dépannage Express 7j/7</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Zones */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Zones d'Intervention (06)
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-400">
              {INTERVENTION_ZONES.slice(0, 8).map((zone) => (
                <button
                  key={zone.name}
                  onClick={() => handleNav('zones')}
                  className="hover:text-amber-400 transition-colors text-left truncate flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{zone.name}</span>
                </button>
              ))}
            </div>

            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mt-6 mb-3 border-b border-slate-800 pb-1">
              Liens Rapides
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <button onClick={() => handleNav('accueil')} className="hover:text-amber-400">
                Accueil
              </button>
              <button onClick={() => handleNav('services')} className="hover:text-amber-400">
                Services
              </button>
              <button onClick={() => handleNav('realisations')} className="hover:text-amber-400 font-semibold text-amber-300">
                Réalisations
              </button>
              <button onClick={() => handleNav('apropos')} className="hover:text-amber-400">
                À Propos
              </button>
              <button onClick={() => handleNav('contact')} className="hover:text-amber-400">
                Contact &amp; Devis
              </button>
            </div>
          </div>

          {/* Col 4: Coordonnées de Contact direct */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Coordonnées Officielles
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">{COMPANY_INFO.name}</strong>
                  <span>{COMPANY_INFO.address.street}</span>
                  <br />
                  <span>{COMPANY_INFO.address.zip} {COMPANY_INFO.address.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="text-white font-bold hover:text-amber-400 transition-colors text-sm"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-slate-300 hover:text-amber-400 transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              {/* Instagram footer button */}
              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <a
                  href={COMPANY_INFO.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 font-bold hover:text-pink-300 transition-colors flex items-center gap-1"
                >
                  <span>{COMPANY_INFO.instagram.handle}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <p className="font-semibold text-slate-200">Horaires :</p>
                <p>{COMPANY_INFO.hours.standard}</p>
                <p className="text-amber-400 font-medium mt-0.5">{COMPANY_INFO.hours.emergencies}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name} — Tous droits réservés. Cagnes-sur-Mer (06800).</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Norme NF C 15-100</span>
            <span>·</span>
            <span>Garantie Décennale</span>
            <span>·</span>
            <span>Automatismes &amp; Fermetures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
