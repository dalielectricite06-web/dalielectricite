import React, { useState } from 'react';
import {
  Zap,
  DoorOpen,
  Car,
  Warehouse,
  Wrench,
  CheckCircle2,
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/companyData';

interface ServicesPageProps {
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuoteModal }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('all');

  const filteredServices =
    selectedServiceId === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.id === selectedServiceId);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="w-8 h-8 text-amber-500" />;
      case 'door':
        return <DoorOpen className="w-8 h-8 text-amber-500" />;
      case 'gate':
        return <Car className="w-8 h-8 text-amber-500" />;
      case 'warehouse':
        return <Warehouse className="w-8 h-8 text-amber-500" />;
      case 'wrench':
        return <Wrench className="w-8 h-8 text-amber-500" />;
      default:
        return <Zap className="w-8 h-8 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue Officiel Dali Électricité</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            NOS SERVICES &amp; EXPERTISES TECHNIQUES
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            Positionnée comme l'entreprise de référence à Cagnes-sur-Mer alliant <strong>électricité générale</strong>, <strong>portes automatiques</strong> et <strong>fermetures motorisées</strong>. Nous intervenons pour particuliers, commerces, syndics et entreprises.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Garantie Décennale
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Dépannage d’urgence 7j/7
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Normes NF C 15-100
            </span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-20 z-30 bg-white border-b border-slate-200 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedServiceId('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedServiceId === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tous nos pôles d'activité ({SERVICES_DATA.length})
            </button>

            {SERVICES_DATA.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedServiceId === srv.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {srv.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services List Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {filteredServices.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Presentation & Overview */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-200/60 shadow-inner">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                      {service.badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {service.description}
                </p>

                {/* Target Audience Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-900 block mb-1">
                    Pour qui ?
                  </span>
                  <span className="text-slate-600">{service.recommendedFor}</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onOpenQuoteModal(service.id)}
                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Devis Gratuit pour ce Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Appeler l'artisan</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Detailed Checklist (All items from user prompt) */}
              <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b border-slate-200 flex items-center justify-between">
                  <span>Prestations &amp; Opérations couvertes</span>
                  <span className="text-xs text-amber-600 font-bold">100% Garanti</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs text-xs text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    Matériel certifié constructeur d'origine
                  </span>
                  <span className="font-semibold text-slate-700">
                    Intervention Alpes-Maritimes (06)
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Emergency Assistance Section */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto rounded-3xl bg-rose-950/40 border-2 border-rose-900 p-8 sm:p-12 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-rose-400 bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
            DÉPANNAGE D’URGENCE 7J/7 &amp; 24H/24
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            UNE PORTE OU UN PORTAIL BLOQUÉ ? PANNE DE COURANT TOTALE ?
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Dali Électricité intervient en urgence dans un rayon de 35 km autour de Cagnes-sur-Mer pour rétablir vos accès et sécuriser vos locaux.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-8 py-4 rounded-xl bg-rose-900 hover:bg-rose-950 text-white font-black text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-xl transition-all"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              <span>Appeler le {COMPANY_INFO.phone} (Intervention Urgente)</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal('depannage-urgence')}
              className="px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider"
            >
              Demande de dépannage express
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
