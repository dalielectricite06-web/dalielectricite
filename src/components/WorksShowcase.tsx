import React, { useState, useEffect, useRef } from 'react';
import {
  DoorOpen,
  Car,
  Warehouse,
  Wrench,
  Zap,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Instagram,
  Upload,
  Plus,
  Sparkles,
  ShieldCheck,
  X,
  Star,
  Check,
} from 'lucide-react';
import { PROJECTS_DATA, WorkProject, COMPANY_INFO } from '../data/companyData';
import {
  getSavedPhotos,
  saveCustomPhoto,
  setHeroBanner,
  CustomWorkPhoto,
} from '../utils/photosStorage';

interface WorksShowcaseProps {
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const WorksShowcase: React.FC<WorksShowcaseProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<WorkProject | null>(null);
  const [activeModalCustomPhoto, setActiveModalCustomPhoto] = useState<CustomWorkPhoto | null>(null);
  const [customPhotos, setCustomPhotos] = useState<CustomWorkPhoto[]>([]);
  const [bannerSuccess, setBannerSuccess] = useState<string | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Load persisted photos from localStorage
  useEffect(() => {
    setCustomPhotos(getSavedPhotos());
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const saved = saveCustomPhoto(file, event.target.result as string);
          setCustomPhotos(getSavedPhotos());
          if (file.name.includes('6336') || saved.isBanner) {
            setBannerSuccess('Image 6336 configurée comme bannière principale du site !');
            setTimeout(() => setBannerSuccess(null), 4000);
            // Trigger storage event so HomePage picks it up immediately
            window.dispatchEvent(new Event('dali_banner_updated'));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetBanner = (photo: CustomWorkPhoto) => {
    setHeroBanner(photo.url);
    setBannerSuccess('Photo définie comme bannière principale du site !');
    setTimeout(() => setBannerSuccess(null), 3000);
    window.dispatchEvent(new Event('dali_banner_updated'));
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const getProjectVisual = (proj: WorkProject) => {
    switch (proj.id) {
      case 'hotel-west-end':
        return (
          <div className="w-full h-full bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mb-3 shadow-lg">
              <DoorOpen className="w-9 h-9" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full mb-1">
              Arche Cintrée Dorée
            </span>
            <h4 className="text-lg font-black text-white">Hôtel West-End 4★</h4>
            <p className="text-xs text-slate-300 max-w-xs mt-1">
              Porte automatique de prestige avec profilés laiton brossé &amp; tapis rouge
            </p>
          </div>
        );
      case 'softica-bureaux':
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center mb-3 shadow-lg">
              <DoorOpen className="w-9 h-9" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full mb-1">
              Opérateur Softica
            </span>
            <h4 className="text-lg font-black text-white">Porte Vitrée Coulissante</h4>
            <p className="text-xs text-slate-300 max-w-xs mt-1">
              Vantaux en verre sécurit dépoli &amp; rail suspendu aluminium laqué noir
            </p>
          </div>
        );
      case 'porte-rapide-industrielle':
        return (
          <div className="w-full h-full bg-gradient-to-br from-amber-900 via-slate-900 to-rose-950 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mb-3 shadow-lg">
              <Warehouse className="w-9 h-9" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full mb-1">
              Haute Vitesse 1,5 m/s
            </span>
            <h4 className="text-lg font-black text-white">Porte Rapide à Enroulement</h4>
            <p className="text-xs text-slate-300 max-w-xs mt-1">
              Tablier souple renforcé avec hublot transparent &amp; cellules infrarouges
            </p>
          </div>
        );
      case 'portail-coulissant-anthracite':
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mb-3 shadow-lg">
              <Car className="w-9 h-9" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full mb-1">
              Grand Format Barreaudé
            </span>
            <h4 className="text-lg font-black text-white">Portail Coulissant Anthracite</h4>
            <p className="text-xs text-slate-300 max-w-xs mt-1">
              Motorisation intensive sur rail avec photocellules &amp; feu de sécurité
            </p>
          </div>
        );
      case 'portail-fer-forge-villa':
        return (
          <div className="w-full h-full bg-gradient-to-br from-stone-900 via-slate-900 to-stone-950 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mb-3 shadow-lg">
              <Car className="w-9 h-9" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full mb-1">
              Villa Prestige Antibes
            </span>
            <h4 className="text-lg font-black text-white">Portail Fer Forgé Motorisé</h4>
            <p className="text-xs text-slate-300 max-w-xs mt-1">
              Motorisation vérins discrets préservant l'authenticité de la pierre
            </p>
          </div>
        );
      case 'porte-auto-mairie-public':
        return (
          <div className="w-full h-full bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-sky-400/20 border border-sky-400/40 text-sky-300 flex items-center justify-center mb-3 shadow-lg">
              <DoorOpen className="w-9 h-9" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 bg-sky-400/20 px-2.5 py-0.5 rounded-full mb-1">
              Accessibilité PMR &amp; ERP
            </span>
            <h4 className="text-lg font-black text-white">Établissement Public &amp; Mairie</h4>
            <p className="text-xs text-slate-300 max-w-xs mt-1">
              Doubles vantaux coulissants automatiques avec radars volumétriques
            </p>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-center text-white relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mb-3 shadow-lg">
              <Wrench className="w-9 h-9" />
            </div>
            <h4 className="text-base font-black text-white">{proj.title}</h4>
            <p className="text-xs text-slate-400 mt-1">{proj.location}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-10">
      {/* Banner Success Notification if 6336 or banner set */}
      {bannerSuccess && (
        <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-between shadow-xl animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>{bannerSuccess}</span>
          </div>
          <Check className="w-5 h-5 text-slate-950" />
        </div>
      )}

      {/* Category selector & Slider Navigation Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'Tous les Chantiers' },
            { id: 'portes', label: 'Portes Automatiques' },
            { id: 'portails', label: 'Portails & Motorisations' },
            { id: 'fermetures', label: 'Rideaux & Fermetures' },
            { id: 'maintenance', label: 'Maintenance & SAV' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollSlider('left')}
            className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center shadow-xs transition-all active:scale-95"
            aria-label="Faire défiler vers la gauche"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollSlider('right')}
            className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-sm transition-all active:scale-95"
            aria-label="Faire défiler vers la droite"
          >
            <ChevronRight className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FLUID SMOOTH SLIDER (Défilement fluide des chantiers)     */}
      {/* ======================================================== */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Custom Photos first (including 6336) */}
          {customPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex-shrink-0 w-[300px] sm:w-[360px] snap-start bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-amber-400"
            >
              <div>
                {/* Photo Media Container */}
                <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Clean Badge without raw numbers */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-xs text-amber-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    <span>{photo.dateBadge}</span>
                  </div>

                  {photo.isBanner && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-slate-950" />
                      <span>Bannière</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-slate-900/90 backdrop-blur-xs text-slate-200 text-[10px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{photo.location}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 block mb-1">
                    {photo.categoryLabel}
                  </span>
                  <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug group-hover:text-amber-600 transition-colors mb-2">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Chantier réalisé et certifié par notre artisan. Conforme aux normes françaises en vigueur et garantie décennale.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => handleSetBanner(photo)}
                  className="text-[11px] font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1 transition-colors"
                  title="Utiliser cette photo comme bannière d'accueil"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>En bannière</span>
                </button>

                <button
                  onClick={() => onOpenQuoteModal('electricite-generale')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  Devis
                </button>
              </div>
            </div>
          ))}

          {/* Official Projects */}
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[300px] sm:w-[360px] snap-start bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-amber-400"
            >
              <div>
                {/* Media Preview Container */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-950 border-b border-slate-100">
                  {getProjectVisual(project)}

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className="bg-slate-950/85 backdrop-blur-xs text-amber-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 shadow-md">
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      <span>Chantier Terminé</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="bg-slate-900/90 backdrop-blur-xs text-amber-300 text-[10px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{project.location}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 block mb-1">
                    {project.clientType}
                  </span>

                  <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug group-hover:text-amber-600 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  <div className="space-y-1 border-t border-slate-100 pt-3">
                    {project.specs.slice(0, 2).map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-2">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-500" />
                  <span>Fiche complète</span>
                </button>

                <button
                  onClick={() => onOpenQuoteModal(project.category)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors"
                >
                  Devis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Box for user's chantiers (Clean, high-end design) */}
      <div className="rounded-3xl border-2 border-dashed border-slate-300 p-7 sm:p-9 text-center bg-white hover:border-amber-400 transition-all shadow-sm">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <h4 className="text-base sm:text-lg font-black text-slate-900 uppercase">
          Ajouter de nouvelles photos de chantiers terminés
        </h4>
        <p className="text-xs text-slate-600 max-w-lg mx-auto mt-1 leading-relaxed">
          Sélectionnez vos photos (tableaux électriques, portails, portes automatiques). Elles seront ajoutées au défilement fluide et vous pourrez les définir comme bannière principale du site en 1 clic.
        </p>

        <label className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all">
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Sélectionner une photo (ex: 6336)</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Modal Detail View for Official Projects */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 overflow-hidden">
            <div className="aspect-[16/9] relative bg-slate-950 overflow-hidden">
              {getProjectVisual(activeModalProject)}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
                  <span>{activeModalProject.categoryLabel}</span>
                  <span>•</span>
                  <span>{activeModalProject.clientType}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {activeModalProject.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{activeModalProject.location}</span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {activeModalProject.description}
              </p>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Caractéristiques &amp; Matériel Installé
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeModalProject.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span className="font-semibold">Constructeurs :</span>
                  <span className="text-amber-700 font-bold">{activeModalProject.equipment}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href={COMPANY_INFO.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Voir la vidéo sur Instagram</span>
                </a>

                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    onOpenQuoteModal(activeModalProject.category);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider"
                >
                  Demander un devis pour ce type d'installation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
