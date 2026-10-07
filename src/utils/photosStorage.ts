export interface CustomWorkPhoto {
  id: string;
  url: string;
  title: string;
  category: string;
  categoryLabel: string;
  location: string;
  isBanner?: boolean;
  dateBadge: string;
}

const STORAGE_KEY = 'dali_custom_photos_v1';
const BANNER_KEY = 'dali_hero_banner_v1';

// Professional fallback titles when an image filename has numbers like IMG_6336
const PRESET_TITLES = [
  'Rénovation & Mise en Conformité Tableau Électrique',
  'Installation Porte Automatique Coulissante Vitrée',
  'Motorisation de Portail Coulissant Aluminium',
  'Rideau Métallique Motorisé de Sécurité & Vitrine',
  'Éclairage LED Architectural & Rénovation Complète',
  'Contrôle d’Accès & Interphonie Résidentielle',
  'Maintenance Préventive & Réglage d’Automatismes',
];

export const getSavedPhotos = (): CustomWorkPhoto[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveCustomPhoto = (
  file: File,
  dataUrl: string,
  preferredTitle?: string
): CustomWorkPhoto => {
  const existing = getSavedPhotos();
  const is6336 = file.name.includes('6336') || file.name.toLowerCase().includes('6336');

  // Generate a clean, prestigious title with NO image numbers
  let cleanTitle = preferredTitle;
  if (!cleanTitle) {
    if (is6336) {
      cleanTitle = 'Rénovation & Tableau Électrique de Précision';
    } else {
      const idx = existing.length % PRESET_TITLES.length;
      cleanTitle = PRESET_TITLES[idx];
    }
  }

  const newPhoto: CustomWorkPhoto = {
    id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    url: dataUrl,
    title: cleanTitle,
    category: is6336 ? 'electricite' : 'portes',
    categoryLabel: is6336 ? 'Électricité Générale' : 'Chantier Réalisé',
    location: 'Cagnes-sur-Mer (06)',
    isBanner: is6336 || existing.length === 0,
    dateBadge: 'Chantier Terminé',
  };

  const updated = is6336 ? [newPhoto, ...existing] : [newPhoto, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (is6336 || !localStorage.getItem(BANNER_KEY)) {
      localStorage.setItem(BANNER_KEY, dataUrl);
    }
  } catch (err) {
    console.warn('Storage limit reached for photos', err);
  }

  return newPhoto;
};

export const getHeroBanner = (): string | null => {
  try {
    const banner = localStorage.getItem(BANNER_KEY);
    if (banner) return banner;
    // Check if any photo in list is marked as banner
    const photos = getSavedPhotos();
    const bannerPhoto = photos.find((p) => p.isBanner) || photos[0];
    return bannerPhoto ? bannerPhoto.url : null;
  } catch {
    return null;
  }
};

export const setHeroBanner = (url: string) => {
  try {
    localStorage.setItem(BANNER_KEY, url);
  } catch (err) {
    console.warn('Unable to save banner to localStorage', err);
  }
};
