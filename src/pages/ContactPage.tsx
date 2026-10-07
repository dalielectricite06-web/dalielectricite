import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  Zap,
  ExternalLink,
  Instagram,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ContactForm } from '../components/ContactForm';
import { InstagramBadge } from '../components/InstagramBadge';
import { QrCodeCard } from '../components/QrCodeCard';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contact Direct &amp; Devis Gratuit</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            CONTACTEZ DALI ÉLECTRICITÉ
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Une panne urgente, un projet d'électricité ou un automatisme de porte à installer ? Notre artisan vous répond rapidement.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-md space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                  ⚡ COORDONNÉES OFFICIELLES
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  Dali Électricité
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Électricien &amp; Spécialiste Portes Automatiques à Cagnes-sur-Mer
                </p>
              </div>

              {/* Coordinates list */}
              <div className="space-y-4 text-xs">
                {/* Phone */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-rose-900 text-white flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-bold block">
                      Téléphone Direct / Dépannage
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="text-base font-extrabold text-slate-900 hover:text-amber-600 transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="block text-[10px] text-emerald-600 font-semibold mt-0.5">
                      ● Ligne directe artisan disponible 7j/7
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-bold block">
                      Adresse Email
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <span className="block text-[10px] text-slate-500 mt-0.5">
                      Réponse par email sous 24h
                    </span>
                  </div>
                </div>

                {/* Instagram Direct */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200/80">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-700 text-white flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-pink-700 uppercase font-bold block">
                      Instagram Officiel &amp; Vidéos Chantiers
                    </span>
                    <a
                      href={COMPANY_INFO.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-black text-slate-900 hover:text-pink-600 transition-colors flex items-center gap-1"
                    >
                      <span>{COMPANY_INFO.instagram.handle}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-pink-600" />
                    </a>
                    <span className="block text-[10px] text-slate-600 mt-0.5">
                      Retrouvez nos dernières réalisations &amp; démonstrations
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-bold block">
                      Adresse de l'Atelier
                    </span>
                    <strong className="text-sm text-slate-900 font-bold block">
                      {COMPANY_INFO.address.street}
                    </strong>
                    <span className="text-slate-600">
                      {COMPANY_INFO.address.zip} {COMPANY_INFO.address.city}, France
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-bold block">
                      Horaires d'Ouverture &amp; Interventions
                    </span>
                    <p className="text-slate-800 font-semibold">
                      {COMPANY_INFO.hours.standard}
                    </p>
                    <p className="text-rose-900 font-bold text-[11px] mt-0.5">
                      ⚡ {COMPANY_INFO.hours.emergencies}
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-extrabold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Garanties &amp; Assurances Professionnelles</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Garantie Décennale et Responsabilité Civile Professionnelle à jour. Travaux certifiés aux normes NF C 15-100.
                </p>
              </div>

              {/* Instagram Card & QR Code directly in Contact page */}
              <InstagramBadge variant="card" />
            </div>

            {/* Geographical Map Preview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md overflow-hidden">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center justify-between">
                <span>Localisation : Cagnes-sur-Mer (06)</span>
                <span className="text-amber-600 font-bold">Zone d'intervention 06</span>
              </h3>

              <div className="aspect-[16/9] rounded-2xl bg-slate-900 relative flex flex-col items-center justify-center text-center p-4 text-white overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(#FACC15 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <MapPin className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
                <span className="font-extrabold text-sm text-white">
                  13 impasses des espartes
                </span>
                <span className="text-xs text-slate-300">
                  06800 Cagnes-sur-Mer
                </span>
                <span className="text-[10px] text-amber-400 mt-2 font-mono">
                  Rayon d'intervention : Nice, Antibes, Cannes, Grasse...
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: The Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Full-width QR Code & Business Card Section */}
        <div className="mt-14">
          <QrCodeCard />
        </div>
      </div>
    </div>
  );
};
