import React, { useState } from 'react';
import { MapPin, Phone, ArrowRight, ShieldCheck, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { COMPANY_INFO, INTERVENTION_ZONES } from '../data/companyData';

interface ZonesPageProps {
  onOpenQuoteModal: () => void;
}

export const ZonesPage: React.FC<ZonesPageProps> = ({ onOpenQuoteModal }) => {
  const [selectedTown, setSelectedTown] = useState<string>('Cagnes-sur-Mer');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rayon d'action Côte d'Azur</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            ZONES D'INTERVENTION DANS LES ALPES-MARITIMES (06)
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Basé à Cagnes-sur-Mer, Dali Électricité intervient avec rapidité et ponctualité sur tout le département des Alpes-Maritimes.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTERVENTION_ZONES.map((zone) => {
            const isHq = zone.isHeadquarter;
            return (
              <div
                key={zone.name}
                className={`rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                  isHq
                    ? 'bg-amber-50/60 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isHq ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-amber-600'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">
                        {zone.name}
                      </h3>
                    </div>

                    {isHq && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-950 bg-amber-400 px-2 py-0.5 rounded-full">
                        Siège
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 font-mono mb-3">
                    Code Postal : {zone.zip}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-semibold text-slate-900">{zone.delay}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Électricité, Portes &amp; Portails</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-xs font-black text-rose-900 hover:text-rose-950 uppercase"
                  >
                    Dépannage 7j/7
                  </a>

                  <button
                    onClick={onOpenQuoteModal}
                    className="text-xs font-extrabold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    <span>Devis gratuit</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Callout */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Votre commune n'est pas expressément listée ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Nous couvrons l'ensemble des communes de la Côte d'Azur et du moyen-pays des Alpes-Maritimes. Contactez-nous pour confirmer la prise en charge immédiate.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-6 py-3.5 rounded-xl bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs uppercase tracking-wider"
            >
              Appelez le {COMPANY_INFO.phone}
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider"
            >
              Demande de devis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
