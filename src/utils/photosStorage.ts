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

export const DEFAULT_BANNER_URL = '/images/banniere-chantier-6336.svg';

// Professional prestige titles for uploaded chantier photos (NO numbers, NO raw filenames)
const PRESET_TITLES = [
  'Rénovation & Tableau Électrique NF C 15-100',
  'Installation Porte Automatique Coulissante Vitrée',
  'Motorisation de Portail Coulissant Aluminium',
  'Rideau Métallique Motorisé de Sécurité & Vitrine',
  'Éclairage LED Architectural & Rénovation',
  'Contrôle d’Accès & Interphonie Résidentielle',
  'Maintenance Préventive & Réglage d’Automatismes',
];

export const getSavedPhotos = (): CustomWorkPhoto[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: CustomWorkPhoto[] = JSON.parse(raw);
    // Sanitize any existing photos to ensure clean titles and badges
    return parsed.map((p) => ({
      ...p,
      title: p.title.replace(/IMG[_\s-]?\d+/gi, 'Chantier Réalisé').replace(/\d{4,}/g, '').trim() || 'Rénovation Électrique & Automatismes',
      dateBadge: 'Chantier Terminé',
    }));
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
  const lowerName = file.name.toLowerCase();
  const is6336 = lowerName.includes('6336');

  // Clean title without any raw file numbers
  let cleanTitle = preferredTitle;
  if (!cleanTitle) {
    if (is6336) {
      cleanTitle = 'Rénovation & Tableau Électrique NF C 15-100';
    } else {
      const idx = existing.length % PRESET_TITLES.length;
      cleanTitle = PRESET_TITLES[idx];
    }
  }

  // Remove any remaining raw number patterns like IMG_6336 or 6336
  cleanTitle = cleanTitle.replace(/IMG[_\s-]?\d+/gi, '').replace(/\d{4,}/g, '').trim();
  if (!cleanTitle || cleanTitle.length < 5) {
    cleanTitle = 'Rénovation Électrique & Automatismes';
  }

  const newPhoto: CustomWorkPhoto = {
    id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    url: dataUrl,
    title: cleanTitle,
    category: is6336 ? 'electricite' : 'portes',
    categoryLabel: is6336 ? 'Électricité Générale' : 'Chantier Terminé',
    location: 'Cagnes-sur-Mer (06)',
    isBanner: is6336 || existing.length === 0,
    dateBadge: 'Chantier Terminé',
  };

  // 6336 always goes at the very top of the list
  const updated = is6336 ? [newPhoto, ...existing.filter(p => p.url !== dataUrl)] : [newPhoto, ...existing.filter(p => p.url !== dataUrl)];
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

export const getHeroBanner = (): string => {
  try {
    const banner = localStorage.getItem(BANNER_KEY);
    if (banner) return banner;
    // Check if any photo in list is marked as banner
    const photos = getSavedPhotos();
    const bannerPhoto = photos.find((p) => p.isBanner) || photos[0];
    if (bannerPhoto?.url) return bannerPhoto.url;
    return DEFAULT_BANNER_URL;
  } catch {
    return DEFAULT_BANNER_URL;
  }
};

export const setHeroBanner = (url: string) => {
  try {
    localStorage.setItem(BANNER_KEY, url);
  } catch (err) {
    console.warn('Unable to save banner to localStorage', err);
  }
};

export const deleteCustomPhoto = (id: string) => {
  try {
    const existing = getSavedPhotos();
    const filtered = existing.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn('Unable to delete photo', err);
  }
};
