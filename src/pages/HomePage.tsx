import React, { useState } from 'react';
import {
  Phone,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Star,
  MapPin,
  HelpCircle,
  Wrench,
  DoorOpen,
  Warehouse,
  Car,
  Settings,
  Sparkles,
  Camera,
  Upload,
} from 'lucide-react';
import {
  COMPANY_INFO,
  SERVICES_DATA,
  WHY_CHOOSE_US,
  WORK_STEPS,
  CLIENT_TESTIMONIALS,
  INTERVENTION_ZONES,
  FAQ_ITEMS,
} from '../data/companyData';
import { QuickQuoteHeroForm } from '../components/QuickQuoteHeroForm';
import { WorksShowcase } from '../components/WorksShowcase';
import { InstagramBadge } from '../components/InstagramBadge';
import { getHeroBanner, saveCustomPhoto, setHeroBanner } from '../utils/photosStorage';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedZone, setSelectedZone] = useState<string>('Cagnes-sur-Mer');
  const [heroBanner, setHeroBannerState] = useState<string | null>(getHeroBanner());
  const [bannerFeedback, setBannerFeedback] = useState<string | null>(null);

  React.useEffect(() => {
    const updateBanner = () => {
      setHeroBannerState(getHeroBanner());
    };
    window.addEventListener('dali_banner_updated', updateBanner);
    return () => window.removeEventListener('dali_banner_updated', updateBanner);
  }, []);

  const handleHeroBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        saveCustomPhoto(file, dataUrl, 'Bannière Officielle Dali Électricité');
        setHeroBanner(dataUrl);
        setHeroBannerState(dataUrl);
        setBannerFeedback('Image configurée avec succès en bannière principale !');
        setTimeout(() => setBannerFeedback(null), 3500);
        window.dispatchEvent(new Event('dali_banner_updated'));
      }
    };
    reader.readAsDataURL(file);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'door':
        return <DoorOpen className="w-6 h-6 text-amber-500" />;
      case 'gate':
        return <Car className="w-6 h-6 text-amber-500" />;
      case 'warehouse':
        return <Warehouse className="w-6 h-6 text-amber-500" />;
      case 'wrench':
        return <Wrench className="w-6 h-6 text-amber-500" />;
      default:
        return <Settings className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Inspired by DK Electrical reference)   */}
      {/* ======================================================== */}
      <section className="relative bg-slate-950 text-white pt-12 pb-24 sm:pt-16 sm:pb-28 overflow-hidden border-b border-slate-800">
        {/* Real photo banner background if set (e.g. image 6336) */}
        {heroBanner && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-40"
            style={{ backgroundImage: `url(${heroBanner})` }}
          />
        )}
        <div className={`absolute inset-0 ${heroBanner ? 'bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/90' : 'bg-slate-950/90'} pointer-events-none`} />

        {/* Ambient electrical grid background glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-80 h-80 bg-rose-600 rounded-full blur-3xl opacity-30" />
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Kicker badge with banner uploader */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Votre Spécialiste Électricien &amp; Automatismes</span>
                </div>

                <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 text-amber-300 text-[11px] font-black border border-amber-400/40 cursor-pointer transition-all shadow-md active:scale-95">
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Personnaliser la photo de bannière</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroBannerUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {bannerFeedback && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 text-xs font-bold animate-in fade-in">
                  <span>✓ {bannerFeedback}</span>
                </div>
              )}

              {/* Grand Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                ÉLECTRICITÉ, <br />
                <span className="text-amber-400">PORTES AUTOMATIQUES</span> <br />
                &amp; FERMETURES 7J/7.
              </h1>

              {/* Value Proposition Description */}
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Intervention rapide à <strong>Cagnes-sur-Mer</strong> et sur toute la <strong>Côte d'Azur</strong>. Installation neuve, rénovation, dépannage d'urgence, motorisation de portails et maintenance certifiée.
              </p>

              {/* 4 Trust Checkmarks with lightning icons matching reference design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-semibold text-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span>Artisan Qualifié &amp; Assurance RC Pro</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span>Dépannage d’Urgence 7j/7</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span>Devis Gratuit &amp; Prix Sans Surprise</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span>Norme NF C 15-100 &amp; Garantie Décennale</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Emergency Call Button */}
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-amber-400/20 active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <Phone className="w-4 h-4 fill-slate-950" />
                  <span>Appeler pour Dépannage Immédiat</span>
                </a>

                {/* Free Quote Button */}
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm uppercase tracking-wider border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <span>Demander un Devis Gratuit</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Local Reassurance Text */}
              <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Atelier basé au <strong>13 impasses des espartes, 06800 Cagnes-sur-Mer</strong></span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase with Electrician Emblem & Live Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative card with angled cut */}
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 border-2 border-slate-800 shadow-2xl overflow-hidden">
                  {/* Decorative electric circuits lines */}
                  <div className="absolute top-0 right-0 w-36 h-36 border-t-2 border-r-2 border-amber-400/20 rounded-tr-3xl pointer-events-none" />

                  {/* Technician / Equipment Illustration Container */}
                  <div className="relative rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 p-8 border border-slate-700/60 text-center">
                    {/* Visual Technician Badge Avatar */}
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-1 shadow-xl flex items-center justify-center mb-5">
                      <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                        <Zap className="w-12 h-12 text-amber-400 animate-pulse" />
                      </div>
                    </div>

                    <span className="inline-block text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-2">
                      Artisan Agréé &amp; Certifié
                    </span>

                    <h2 className="text-xl font-black text-white uppercase">
                      Dali Électricité
                    </h2>
                    <p className="text-xs text-slate-300 mt-1">
                      Spécialiste Électrotechnique, Portes Automatisées &amp; Fermetures
                    </p>

                    {/* Stats Grid inside card */}
                    <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800 text-left">
                      <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <div className="text-2xl font-black text-amber-400 font-mono">
                          {COMPANY_INFO.stats.emergencyInterventionTime}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          Délai d'intervention urgences
                        </div>
                      </div>

                      <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <div className="text-2xl font-black text-white font-mono">
                          100%
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          Conformité NF C 15-100
                        </div>
                      </div>
                    </div>

                    {/* Live status badge */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 py-2 rounded-lg border border-emerald-800/40">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Permanence dépannage active à Cagnes-sur-Mer</span>
                    </div>
                  </div>

                  {/* Floating floating badge: 15+ years experience */}
                  <div className="absolute -bottom-2 -left-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-amber-400/40 shadow-xl flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div className="text-left leading-tight">
                      <div className="text-xs font-extrabold text-amber-400">Garantie Décennale</div>
                      <div className="text-[10px] text-slate-400">Travaux assurés &amp; certifiés</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FLOATING QUICK QUOTE FORM (Matching inspiration)     */}
      {/* ======================================================== */}
      <QuickQuoteHeroForm
        onSuccessNotice={() => {
          // Handled inside form
        }}
      />

      {/* ======================================================== */}
      {/* 3. TRUST & PARTNERS BAR (Hager, Legrand, Somfy, Came...) */}
      {/* ======================================================== */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-black uppercase tracking-widest text-slate-600 mb-6">
            MATÉRIEL PROFESSIONNEL HAUTE QUALITÉ &amp; MARQUES RECONNUES
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {['Schneider Electric', 'Legrand', 'Hager', 'Somfy', 'Came', 'FAAC', 'BFT', 'Nice'].map(
              (brand) => (
                <div key={brand} className="text-slate-800 font-black text-lg tracking-wider">
                  {brand}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SERVICES OVERVIEW (The 5 Core Pillars from prompt)    */}
      {/* ======================================================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                ⚡ NOS DOMAINES D'EXPERTISE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                SOLUTIONS COMPLÈTES POUR VOTRE HABITAT &amp; VOS COMMERCES
              </h2>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <span>Voir tout le catalogue détaillé</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5 Distinct Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-amber-400"
              >
                <div>
                  {/* Top card header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-400/20 flex items-center justify-center transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Top 3 key features */}
                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    {service.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenQuoteModal(service.id)}
                    className="text-xs font-black uppercase tracking-wider text-slate-900 group-hover:text-amber-600 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Demander un Devis</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigate('services')}
                    className="text-xs text-slate-600 hover:text-slate-900 underline"
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}

            {/* Special 6th Card: Dépannage Urgent 7j/7 */}
            <div className="bg-slate-950 text-white rounded-2xl p-7 border-2 border-rose-900 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-900/50 text-amber-400 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-400 animate-pulse" />
                  </div>
                  <span className="text-[11px] font-black text-rose-300 uppercase tracking-widest bg-rose-950 px-2.5 py-1 rounded-full border border-rose-800">
                    URGENCE 24/7
                  </span>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight mb-2">
                  Dépannage d’Urgence 7j/7
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Panne de courant totale, portail ou porte automatique coincée, rideau métallique bloqué empêchant l’ouverture de votre magasin ? Nous intervenons immédiatement.
                </p>

                <div className="space-y-2 border-t border-slate-800 pt-4 mb-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Arrivée sur site sous 45 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Camion d’intervention outillé et pièces de secours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tarif annoncé avant toute intervention</span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full py-3 px-4 rounded-xl bg-rose-900 hover:bg-rose-950 text-white font-extrabold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Appel d’urgence : {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. WHY CHOOSE US (Inspiration section from screenshot)   */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left title and CTA */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                ⚡ POURQUOI NOUS CHOISIR
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">
                L'ARTISAN ÉLECTRICIEN SUR LEQUEL VOUS POUVEZ COMPTER
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chez Dali Électricité, nous combinons l’exigence technique de l'électricité générale à la précision mécanique des automatismes et fermetures. Pas d'intermédiaire, pas de sous-traitance opaque.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Contacter Notre Équipe
                </button>
              </div>
            </div>

            {/* Right 4 Trust Cards matching inspiration */}
            <div className="lg:col-span-7 space-y-4">
              {WHY_CHOOSE_US.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5b. APERÇU DE NOS TRAVAUX & CHANTIERS (Real works)       */}
      {/* ======================================================== */}
      <section className="py-20 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              ⚡ CHANTIERS TERMINÉS &amp; RÉALISATIONS CONFORMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              DÉFILEMENT DE NOS CHANTIERS TERMINÉS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Faites glisser pour découvrir nos réalisations en électricité générale, portes automatiques de magasins et motorisations de portails sur Cagnes-sur-Mer et la Côte d'Azur.
            </p>
          </div>

          {/* Embedded Works Showcase component */}
          <WorksShowcase onOpenQuoteModal={onOpenQuoteModal} />

          {/* Instagram Banner */}
          <div className="mt-14">
            <InstagramBadge variant="card" />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. OUR SIMPLE PROCESS (4 Easy Steps from screenshot)     */}
      {/* ======================================================== */}
      <section className="py-20 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            ⚡ NOTRE MÉTHODE DE TRAVAIL
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1 mb-14">
            RÉSOUDRE VOTRE PROBLÈME EN 4 ÉTAPES SIMPLES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {WORK_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-400/50 transition-all text-left relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center mb-5 shadow-lg">
                    {step.number}
                  </div>

                  <h3 className="text-base font-extrabold text-white tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Étape certifiée</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl transition-all"
            >
              Lancer votre projet dès maintenant
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. TESTIMONIALS (Google Reviews from screenshot)         */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              ⚡ AVIS CLIENTS &amp; TÉMOIGNAGES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 mt-1">
              CE QUE NOS CLIENTS DISENT DE DALI ÉLECTRICITÉ
            </h2>

            {/* Google Rating Banner matching inspiration */}
            <div className="mt-6 inline-flex items-center gap-3 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl shadow-sm">
              <span className="text-sm font-black text-slate-900 uppercase">EXCELLENT</span>
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">5.0 / 5 sur Google Avis Vérifiés</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                    « {t.text} »
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs">
                  <div className="font-extrabold text-slate-900">{t.author}</div>
                  <div className="text-slate-500 text-[11px]">{t.role} · {t.city}</div>
                  <div className="text-amber-600 font-bold text-[10px] mt-1">{t.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. INTERVENTION AREAS (Serving Cagnes-sur-Mer & Alpes-M.) */}
      {/* ======================================================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                ⚡ ZONE D'ACTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
                INTERVENTIONS À CAGNES-SUR-MER ET DANS TOUT LE 06
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Notre atelier et nos véhicules d'intervention sont positionnés à <strong>Cagnes-sur-Mer (13 impasses des espartes)</strong>, nous permettant de rejoindre très rapidement l'ensemble des communes de la Côte d'Azur pour tous dépannages d'urgence ou chantiers neufs.
              </p>

              {/* City Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                {INTERVENTION_ZONES.map((zone) => (
                  <button
                    key={zone.name}
                    onClick={() => setSelectedZone(zone.name)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                      selectedZone === zone.name
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md font-bold'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400'
                    }`}
                  >
                    <div className="font-bold truncate">{zone.name}</div>
                    <div className="text-[10px] opacity-80">{zone.delay}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-xs font-black text-rose-900 hover:text-rose-950 uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  <span>Une urgence dans votre commune ? 07 49 13 71 01</span>
                </a>
              </div>
            </div>

            {/* Right Map Visual Box */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-xl overflow-hidden relative">
                {/* Visual Map Representation */}
                <div className="aspect-[4/3] rounded-2xl bg-slate-900 relative flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(#FACC15 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Pin on Cagnes sur mer */}
                  <div className="relative z-10 p-4 rounded-full bg-amber-400 text-slate-950 shadow-2xl animate-bounce mb-3">
                    <MapPin className="w-8 h-8 fill-slate-950" />
                  </div>

                  <div className="relative z-10">
                    <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-black">
                      SIÈGE OPÉRATIONNEL
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      Cagnes-sur-Mer (06800)
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm">
                      13 impasses des espartes, 06800 Cagnes-sur-Mer
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-medium border border-slate-700">
                      <span>Rayon d'intervention : 35 km à la ronde</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>Commune sélectionnée : <strong className="text-slate-900">{selectedZone}</strong></span>
                  <button
                    onClick={() => onOpenQuoteModal()}
                    className="text-amber-600 font-bold hover:underline"
                  >
                    Vérifier disponibilité
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. FAQ ACCORDION                                         */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              ⚡ RÉPONSES À VOS QUESTIONS
            </span>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
              QUESTIONS FRÉQUENTES SUR NOS INTERVENTIONS
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-amber-600 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <span className="text-amber-500 text-xl font-mono flex-shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. FINAL BOTTOM CALL TO ACTION                          */}
      {/* ======================================================== */}
      <section className="py-16 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-slate-900">
            ⚡ UNE PANNE ? UN PROJET D'INSTALLATION OU DE MOTORISATION ?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
            OBTENEZ UN DEVIS CLAIR, RAPIDE ET 100% GRATUIT
          </h2>
          <p className="text-sm sm:text-base font-medium text-slate-800 max-w-2xl mx-auto">
            Contactez Dali Électricité dès aujourd'hui. Réponse sous 30 minutes, intervention possible dans la journée à Cagnes-sur-Mer et environs.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Appeler le {COMPANY_INFO.phone}</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-md flex items-center justify-center gap-2"
            >
              <span>Remplir le Formulaire de Devis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
