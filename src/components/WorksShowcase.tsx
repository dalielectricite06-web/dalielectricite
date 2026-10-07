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
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';
import { PROJECTS_DATA, WorkProject, COMPANY_INFO } from '../data/companyData';
import {
  getSavedPhotos,
  saveCustomPhoto,
  setHeroBanner,
  deleteCustomPhoto,
  compressImageFile,
  CustomWorkPhoto,
  DEFAULT_BANNER_URL,
} from '../utils/photosStorage';

interface WorksShowcaseProps {
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const WorksShowcase: React.FC<WorksShowcaseProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<WorkProject | null>(null);
  const [customPhotos, setCustomPhotos] = useState<CustomWorkPhoto[]>([]);
  const [bannerSuccess, setBannerSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Load persisted photos from localStorage
  useEffect(() => {
    setCustomPhotos(getSavedPhotos());
  }, []);

  const processFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        const compressedDataUrl = await compressImageFile(file);
        if (compressedDataUrl) {
          const saved = saveCustomPhoto(file, compressedDataUrl);
          setCustomPhotos(getSavedPhotos());
          if (file.name.includes('6336') || saved.isBanner) {
            setBannerSuccess('Photo de chantier ajoutée et définie comme bannière principale !');
            setTimeout(() => setBannerSuccess(null), 4000);
            window.dispatchEvent(new Event('dali_banner_updated'));
          } else {
            setBannerSuccess('Photo ajoutée avec succès au carrousel des chantiers !');
            setTimeout(() => setBannerSuccess(null), 4000);
          }
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleSetBanner = (url: string) => {
    setHeroBanner(url);
    setBannerSuccess('Photo définie comme bannière principale du site !');
    setTimeout(() => setBannerSuccess(null), 3000);
    window.dispatchEvent(new Event('dali_banner_updated'));
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCustomPhoto(id);
    setCustomPhotos(getSavedPhotos());
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

  const getProjectImageSrc = (proj: WorkProject): string => {
    switch (proj.id) {
      case 'chantier-6336-tableau-electrique':
        return DEFAULT_BANNER_URL;
      case 'softica-bureaux':
      case 'hotel-west-end':
      case 'porte-auto-mairie-public':
      case 'hall-residence-standing':
        return '/images/porte-automatique-softica.svg';
      case 'portail-coulissant-anthracite':
      case 'portail-fer-forge-villa':
        return '/images/portail-coulissant-motorise.svg';
      case 'porte-rapide-industrielle':
        return '/images/rideau-metallique-commerce.svg';
      default:
        return DEFAULT_BANNER_URL;
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner Success Notification */}
      {bannerSuccess && (
        <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-between shadow-xl animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>{bannerSuccess}</span>
          </div>
          <Check className="w-5 h-5 text-slate-950" />
        </div>
      )}

      {/* Prominent Direct Drag-and-Drop Area for User's Photos */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-6 sm:p-7 rounded-3xl border-2 transition-all ${
          isDragging
            ? 'border-amber-400 bg-amber-400/15 shadow-xl scale-[1.01]'
            : 'border-dashed border-amber-400/70 bg-gradient-to-r from-amber-400/10 via-amber-300/5 to-slate-900/5 hover:border-amber-400'
        } flex flex-col md:flex-row items-center justify-between gap-5`}
      >
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md">
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-7 h-7" />
            )}
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md">
                Transfert Immédiat
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {customPhotos.length} photo{customPhotos.length > 1 ? 's' : ''} active{customPhotos.length > 1 ? 's' : ''}
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900 tracking-tight mt-0.5">
              Glissez vos photos ici pour les afficher instantanément sur votre site
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Vos photos de chantiers s'ajoutent directement en tête du défilement ci-dessous sans aucun numéro brut.
            </p>
          </div>
        </div>

        <label className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-lg transition-all whitespace-nowrap active:scale-95 flex items-center gap-2">
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Sélectionner vos photos</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Category selector & Slider Navigation Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'Tous les Chantiers' },
            { id: 'electricite', label: 'Électricité Générale' },
            { id: 'portes', label: 'Portes Automatiques' },
            { id: 'portails', label: 'Portails & Motorisations' },
            { id: 'fermetures', label: 'Rideaux Métalliques' },
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

        {/* Carousel Arrow Controls for smooth scrolling */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollSlider('left')}
            className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center shadow-xs transition-all active:scale-95"
            aria-label="Faire défiler vers la gauche"
            title="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollSlider('right')}
            className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-sm transition-all active:scale-95"
            aria-label="Faire défiler vers la droite"
            title="Suivant"
          >
            <ChevronRight className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FLUID SMOOTH SLIDER (Défilement fluide de nos chantiers) */}
      {/* ======================================================== */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* 1. Custom Photos uploaded by user shown FIRST */}
          {customPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex-shrink-0 w-[300px] sm:w-[360px] snap-start bg-white rounded-3xl border-2 border-amber-400 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Media Container */}
                <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Clean Badge: ONLY "Chantier Terminé" */}
                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-xs text-amber-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    <span>Chantier Terminé</span>
                  </div>

                  {photo.isBanner && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-slate-950" />
                      <span>Bannière Active</span>
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
                    Chantier réalisé et certifié par notre artisan. Conforme aux normes NF C 15-100 et couvert par notre garantie décennale.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => handleSetBanner(photo.url)}
                  className="text-[11px] font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1 transition-colors"
                  title="Définir en bannière d'accueil"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>En bannière</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDeletePhoto(photo.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Supprimer la photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal('electricite-generale')}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Devis
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* 2. Official Projects (with Chantier 6336 in first position) */}
          {filteredProjects.map((project) => {
            const imgSrc = getProjectImageSrc(project);
            const is6336 = project.id === 'chantier-6336-tableau-electrique';

            return (
              <div
                key={project.id}
                className={`flex-shrink-0 w-[300px] sm:w-[360px] snap-start bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                  is6336 ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-amber-400'
                }`}
              >
                <div>
                  {/* Media Visual Container */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-950 border-b border-slate-100">
                    <img
                      src={imgSrc}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Clean Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="bg-slate-950/90 backdrop-blur-xs text-amber-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 shadow-md">
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                        <span>Chantier Terminé</span>
                      </span>
                    </div>

                    {is6336 && (
                      <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                        <Star className="w-3 h-3 fill-slate-950" />
                        <span>Bannière Principale</span>
                      </div>
                    )}

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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-500" />
                      <span>Détails</span>
                    </button>

                    <button
                      onClick={() => handleSetBanner(imgSrc)}
                      className="text-[11px] font-bold text-slate-500 hover:text-amber-600 flex items-center gap-1 transition-colors ml-2"
                      title="Utiliser en bannière d'accueil"
                    >
                      <Star className="w-3 h-3 text-amber-500" />
                      <span>Bannière</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenQuoteModal(project.category)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors"
                  >
                    Devis
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Detail View for Official Projects */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 overflow-hidden">
            <div className="aspect-[16/9] relative bg-slate-950 overflow-hidden">
              <img
                src={getProjectImageSrc(activeModalProject)}
                alt={activeModalProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
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
                <button
                  onClick={() => {
                    handleSetBanner(getProjectImageSrc(activeModalProject));
                    setActiveModalProject(null);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Définir en bannière principale</span>
                </button>

                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    onOpenQuoteModal(activeModalProject.category);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider"
                >
                  Demander un devis pour ce type de chantier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
