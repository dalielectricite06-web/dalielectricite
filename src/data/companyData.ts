export interface ServiceCategory {
  id: string;
  title: string;
  shortDesc: string;
  badge: string;
  iconName: 'zap' | 'door' | 'gate' | 'warehouse' | 'wrench' | 'phoneCall';
  description: string;
  features: string[];
  recommendedFor: string;
  emergencyAvailable: boolean;
}

export const COMPANY_INFO = {
  name: 'Dali Électricité',
  legalName: 'Dali Électricité',
  tagline: 'Solutions & Installations Électriques, Portes Automatiques et Automatismes',
  phone: '07 49 13 71 01',
  phoneRaw: '0749137101',
  phoneFormatted: '07 49 13 71 01',
  phoneInternational: '+33749137101',
  email: 'dali.electricite06@gmail.com',
  address: {
    street: '13 impasses des espartes',
    zip: '06800',
    city: 'Cagnes-sur-Mer',
    region: 'Alpes-Maritimes (06)',
    country: 'France',
    full: '13 impasses des espartes, 06800 Cagnes-sur-Mer, France',
  },
  hours: {
    standard: 'Lundi au Samedi : 07h00 - 20h00',
    emergencies: 'Dépannage d’urgence 7j/7 & 24h/24',
  },
  stats: {
    experienceYears: '15+',
    satisfactionRate: '100%',
    emergencyInterventionTime: '< 45 min',
    interventionsCompleted: '1 400+',
  },
  certifications: [
    'Conformité Norme NF C 15-100',
    'Garantie Décennale',
    'Assurance Responsabilité Civile Professionnelle',
    'Techniciens Spécialistes Agréés Automatismes',
  ],
  instagram: {
    handle: '@dali_electricite06',
    display: '@dali_electricite06',
    url: 'https://www.instagram.com/dali_electricite06/',
  },
};

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'electricite-generale',
    title: 'Électricité Générale',
    badge: 'Neuf & Rénovation',
    iconName: 'zap',
    shortDesc: 'Installations complètes, remises aux normes, recherche de pannes et tableaux électriques pour résidences et locaux professionnels.',
    description: "Spécialiste de l'électricité générale à Cagnes-sur-Mer et sur toute la Côte d'Azur. De l'installation neuve à la rénovation complète en passant par la mise en conformité NF C 15-100, nous assurons des installations fiables, sécurisées et performantes.",
    features: [
      'Installation électrique neuf et rénovation',
      'Dépannage électrique & diagnostic de pannes 7j/7',
      'Recherche et réparation méthodique de pannes et courts-circuits',
      'Mise en conformité et sécurisation d’installations vétustes',
      'Tableaux électriques, disjoncteurs et différentiels 30mA',
      'Remplacement et pose d’interrupteurs et prises de courant',
      'Éclairage intérieur & extérieur sur-mesure (LED, ambiance)',
      'Détecteurs de mouvement, minuteries et éclairage de sécurité',
      'Raccordement d’équipements lourds, plaques, chauffe-eau et clim',
    ],
    recommendedFor: 'Particuliers (maisons, appartements), commerces, bureaux, copropriétés.',
    emergencyAvailable: true,
  },
  {
    id: 'portes-automatiques',
    title: 'Portes Automatiques',
    badge: 'Spécialiste Commerces & Résidences',
    iconName: 'door',
    shortDesc: 'Pose, maintenance préventive et dépannage rapide de portes coulissantes, télescopiques, battantes et piétonnes.',
    description: "Installateur et dépanneur certifié de portes automatiques pour entrées de magasins, pharmacies, hôtels, immeubles et sièges d'entreprise. Nous garantissons la fluidité et la stricte sécurité de vos accès piétons.",
    features: [
      'Installation de portes automatiques coulissantes, télescopiques et battantes',
      'Dépannage d’urgence et déblocage de portes piétonnes bloquées',
      'Maintenance préventive obligatoire et contrôle semestriel',
      'Réglage fin des vitesses d’ouverture/fermeture et mise en service',
      'Remplacement de moteurs, courroies et chariots de guidage',
      'Remplacement de capteurs, radars infrarouges et cellules de sécurité',
      'Recherche de pannes électroniques sur centrales de commande',
      'Réparation et remplacement de composants d’usure d’origine',
      'Contrats de maintenance personnalisés avec astreinte prioritaire',
    ],
    recommendedFor: 'Commerces, supermarchés, cliniques, résidences de standing, copropriétés.',
    emergencyAvailable: true,
  },
  {
    id: 'portails-automatismes',
    title: 'Portails & Automatismes',
    badge: 'Motorisation & Sécurité',
    iconName: 'gate',
    shortDesc: 'Motorisation complète, réglage et dépannage de portails coulissants ou battants avec télécommandes et cellules de sécurité.',
    description: 'Transformez ou sécurisez votre entrée de propriété. Dali Électricité installe et répare tous types de motorisations de portails battants et coulissants avec les meilleures marques du marché.',
    features: [
      'Motorisation neuve de portails battants (vérins, bras articulés, enterrés)',
      'Motorisation de portails coulissants sur rail ou autoportants',
      'Installation et remplacement d’automatismes complets',
      'Dépannage rapide de portails motorisés qui ne s’ouvrent plus',
      'Réglage fin des fins de course et programmation des logiques de commande',
      'Remplacement de moteurs électriques et condensateurs',
      'Télécommandes, claviers à code, photocellules et gyrophares de sécurité',
      'Dispositifs anti-écrasement et sécurisation conformes aux normes',
    ],
    recommendedFor: 'Villas individuelles, résidences fermées, parkings d’entreprises.',
    emergencyAvailable: true,
  },
  {
    id: 'rideaux-metalliques',
    title: 'Rideaux Métalliques & Fermetures',
    badge: 'Protection Commerces & Garages',
    iconName: 'warehouse',
    shortDesc: 'Pose, motorisation et déblocage d’urgence de rideaux métalliques de vitrines, hangars et grilles de sécurité.',
    description: 'La sécurité physique de vos locaux commerciaux et entrepôts est primordiale. Nous intervenons en urgence pour le déblocage et assurons l’installation de rideaux métalliques robustes et silencieux.',
    features: [
      'Installation de rideaux métalliques motorisés (lames pleines, micro-perforées, cobra)',
      'Dépannage d’urgence de rideaux métalliques coincés ou désaxés',
      'Motorisation de rideaux manuels existants (moteurs centraux ou tubulaires)',
      'Remplacement de moteurs défaillants et boîtes à clés / commandes sécurisées',
      'Débrayage manuel de secours et systèmes parachute anti-chute',
      'Réglage des fins de course et lubrification des coulisses',
      'Recherche et réparation de pannes électriques et mécaniques',
    ],
    recommendedFor: 'Boutiques, entrepôts, concessions, garages et locaux industriels.',
    emergencyAvailable: true,
  },
  {
    id: 'maintenance-sav',
    title: 'Maintenance & SAV',
    badge: 'Pérennité & Prévention',
    iconName: 'wrench',
    shortDesc: 'Contrats de maintenance réglementaire, entretien préventif et service après-vente rapide sur site.',
    description: 'Évitez les pannes coûteuses et les arrêts d’activité grâce à des visites d’entretien régulières et un contrat SAV réactif couvrant l’ensemble de vos installations électriques et automatismes.',
    features: [
      'Maintenance préventive planifiée selon la réglementation en vigueur',
      'Dépannage prioritaire sur site avec stock de pièces courantes',
      'Diagnostic complet d’usure et bilan de sécurité électrique',
      'Entretien minutieux des organes mécaniques, glissières et cellules',
      'Resserrage des connexions électriques et vérification des disjoncteurs',
      'Intervention rapide pour professionnels, commerces et particuliers',
      'Rapports d’intervention détaillés et carnet d’entretien à jour',
    ],
    recommendedFor: 'Syndics de copropriété, gestionnaires d’immeubles, gérants de magasins.',
    emergencyAvailable: true,
  },
];

export const WHY_CHOOSE_US = [
  {
    id: 'qualification',
    title: 'Électriciens & Automatismes Qualifiés — Artisans Experts',
    desc: 'Chaque chantier est réalisé directement par notre technicien qualifié avec une maîtrise approfondie des systèmes électriques et automatismes mécaniques.',
  },
  {
    id: 'conformite',
    title: 'Travaux aux Normes NF & Garantie Décennale',
    desc: 'Toutes nos interventions respectent scrupuleusement la norme NF C 15-100 et bénéficient de garanties complètes (responsabilité civile et décennale).',
  },
  {
    id: 'reactivite',
    title: 'Intervention Rapide & Délais Respectés',
    desc: 'Basés à Cagnes-sur-Mer, nous intervenons dans les meilleurs délais sur tout le littoral des Alpes-Maritimes, avec un créneau horaire précis garanti.',
  },
  {
    id: 'transparence',
    title: 'Devis Gratuit, Clair & Tarifs Sans Surprise',
    desc: 'Un devis gratuit détaillé est systématiquement établi avant le début des travaux. Aucune mauvaise surprise sur votre facture.',
  },
];

export const WORK_STEPS = [
  {
    number: '01',
    title: 'Contact ou Demande en Ligne',
    desc: 'Appelez directement le 07 49 13 71 01 ou remplissez notre formulaire. En cas d’urgence, notre équipe s’organise immédiatement.',
  },
  {
    number: '02',
    title: 'Diagnostic Précis sur Site',
    desc: 'Nous venons sur place à Cagnes-sur-Mer ou dans les Alpes-Maritimes pour analyser la panne ou évaluer votre projet.',
  },
  {
    number: '03',
    title: 'Intervention & Matériel Garanti',
    desc: 'Réalisation des travaux avec du matériel certifié (Legrand, Schneider, Somfy, Came...). Exécution soignée et sécurisée.',
  },
  {
    number: '04',
    title: 'Mise en Service & Nettoyage',
    desc: 'Contrôle complet des sécurités, test fonctionnel approfondi, explication des commandes et remise du chantier parfaitement propre.',
  },
];

export const CLIENT_TESTIMONIALS = [
  {
    id: '1',
    author: 'Marc V.',
    city: 'Cagnes-sur-Mer (06800)',
    role: 'Propriétaire villa',
    rating: 5,
    date: 'Il y a 2 semaines',
    text: 'Notre portail électrique coulissant était bloqué un samedi matin avec notre voiture coincée. Dali Électricité est intervenu en 45 minutes chrono ! Diagnostic rapide, changement de la cellule défectueuse et réglage parfait. Un grand merci pour votre réactivité et votre sérieux.',
    service: 'Portails & automatismes',
  },
  {
    id: '2',
    author: 'Sophie B.',
    city: 'Nice Ouest (06200)',
    role: 'Gérante de pharmacie',
    rating: 5,
    date: 'Le mois dernier',
    text: 'La porte automatique de notre officine s’est mise en défaut en pleine journée. Intervention très professionnelle avec les bonnes pièces de rechange dans le camion. Réglage fluide, sécurités vérifiées. Nous avons immédiatement souscrit au contrat de maintenance annuel.',
    service: 'Portes automatiques',
  },
  {
    id: '3',
    author: 'Laurent D.',
    city: 'Antibes (06600)',
    role: 'Rénovation maison',
    rating: 5,
    date: 'Il y a 1 mois',
    text: 'Rénovation totale de notre tableau électrique et création de tout l’éclairage LED intérieur/extérieur. Travail d’une propreté exemplaire, conformité NF C 15-100 impeccable et conseils très avisés. Devis respecté au centime près !',
    service: 'Électricité générale',
  },
  {
    id: '4',
    author: 'Karim E.',
    city: 'Saint-Laurent-du-Var (06700)',
    role: 'Commerçant',
    rating: 5,
    date: 'Il y a 3 semaines',
    text: 'Moteur de rideau métallique changé en un temps record suite à un blocage mécanique. Très disponible par téléphone, poli, efficace et tarif très honnête. Je recommande les yeux fermés pour tous les pros du secteur.',
    service: 'Rideaux métalliques',
  },
];

export const INTERVENTION_ZONES = [
  { name: 'Cagnes-sur-Mer', zip: '06800', delay: 'Intervention < 30 min', isHeadquarter: true },
  { name: 'Nice', zip: '06000 - 06300', delay: 'Intervention < 45 min' },
  { name: 'Antibes / Juan-les-Pins', zip: '06600', delay: 'Intervention < 35 min' },
  { name: 'Saint-Laurent-du-Var', zip: '06700', delay: 'Intervention < 25 min' },
  { name: 'Villeneuve-Loubet', zip: '06270', delay: 'Intervention < 20 min' },
  { name: 'Vence / La Gaude', zip: '06140', delay: 'Intervention < 35 min' },
  { name: 'Biot / Valbonne', zip: '06410', delay: 'Intervention < 40 min' },
  { name: 'Cannes / Le Cannet', zip: '06400', delay: 'Intervention < 45 min' },
  { name: 'Grasse & Moyen-Pays', zip: '06130', delay: 'Sur rendez-vous' },
  { name: 'Monaco / Menton', zip: '98000', delay: 'Sur devis / RDV' },
];

export const FAQ_ITEMS = [
  {
    question: "Intervenez-vous en urgence pour les pannes électriques ou les portes bloquées ?",
    answer: "Oui, Dali Électricité propose un service d'intervention d'urgence 7 jours sur 7 à Cagnes-sur-Mer et dans toutes les Alpes-Maritimes pour les coupures électriques totales, les portails ou portes automatiques bloquées ainsi que les rideaux métalliques coincés.",
  },
  {
    question: "Le devis est-il gratuit et sans engagement ?",
    answer: "Absolument. Tout devis est 100% gratuit, clair et détaillé avant l'exécution de tout travail. Vous connaissez à l'avance le prix exact des pièces et de la main d'œuvre sans frais cachés.",
  },
  {
    question: "Quelles marques de motorisations et de matériel électrique utilisez-vous ?",
    answer: "Nous ne posons que du matériel professionnel réputé pour sa longévité et sa sécurité : pour l'électricité générale (Schneider Electric, Legrand, Hager) et pour les automatismes & portes (Somfy, Came, FAAC, BFT, Nice, Record, Besam, Ditec).",
  },
  {
    question: "Êtes-vous couvert par une garantie décennale ?",
    answer: "Oui, l'ensemble de nos travaux d'installation et de rénovation est couvert par une assurance responsabilité civile professionnelle et une garantie décennale conforme aux exigences légales françaises.",
  },
];

export interface WorkProject {
  id: string;
  title: string;
  category: 'portes' | 'portails' | 'fermetures' | 'maintenance' | 'electricite';
  categoryLabel: string;
  location: string;
  clientType: string;
  description: string;
  specs: string[];
  equipment: string;
  instagramRef?: string;
  aspectRatio: string;
  iconType: 'door' | 'gate' | 'warehouse' | 'wrench' | 'zap';
}

export const PROJECTS_DATA: WorkProject[] = [
  {
    id: 'chantier-6336-tableau-electrique',
    title: 'Rénovation & Tableau Électrique NF C 15-100',
    category: 'electricite',
    categoryLabel: 'Électricité Générale',
    location: 'Cagnes-sur-Mer (06800)',
    clientType: 'Rénovation Résidentielle & Copropriété',
    description: 'Remplacement complet et remise aux normes NF C 15-100 d’un tableau électrique : pose d’un coffret modulaire Hager 3 rangées, disjoncteurs différentiels 30mA Type A & AC, parafoudre et repérage au millimètre.',
    specs: [
      'Coffret modulaire Hager 3 rangées avec porte de protection',
      'Protection différentielle haute sensibilité 30mA (Type A et AC)',
      'Parafoudre autoprotégé contre les surtensions réseau',
      'Équilibrage des phases et repérage clair de chaque circuit',
    ],
    equipment: 'Appareillage Hager / Schneider Electric & Câblage certifié',
    instagramRef: '@dali_electricite06',
    aspectRatio: '16:9',
    iconType: 'zap',
  },
  {
    id: 'hotel-west-end',
    title: 'Hôtel West-End 4★ — Entrée de Prestige',
    category: 'portes',
    categoryLabel: 'Portes Automatiques',
    location: 'Promenade des Anglais, Nice',
    clientType: 'Hôtellerie de Luxe',
    description: 'Installation et réglage sur-mesure d’une porte automatique télescopique sous arche avec profilés finition laiton doré brossé, tapis de détection haute sensibilité et conformité ERP.',
    specs: [
      'Porte cintrée architecturale sur-mesure',
      'Opérateur motorisé haut trafic silencieux',
      'Radars combinés ouverture & présence infrarouge',
      'Finitions laiton doré coordonnées à l’arche historique',
    ],
    equipment: 'Opérateur Axed / Softica & Vitrage feuilleté sécurit',
    instagramRef: '@dali_electricite06',
    aspectRatio: '4:3',
    iconType: 'door',
  },
  {
    id: 'softica-bureaux',
    title: 'Porte Automatique Coulissante Vitrée Softica',
    category: 'portes',
    categoryLabel: 'Portes Automatiques',
    location: 'Cagnes-sur-Mer (06800)',
    clientType: 'Bureaux & Espaces Professionnels',
    description: 'Pose complète d’un opérateur automatique Softica avec châssis suspendu, vantaux vitrés grand clair de baie, commande d’accès sécurisée et guidage doux.',
    specs: [
      'Opérateur automatique certifié Softica',
      'Châssis aluminium noir thermolaqué',
      'Vantaux grand format en verre sécurit dépoli',
      'Radar volumétrique d’approche',
    ],
    equipment: 'Softica Automatisme & Profilés aluminium',
    instagramRef: '@dali_electricite06',
    aspectRatio: '3:4',
    iconType: 'door',
  },
  {
    id: 'porte-rapide-industrielle',
    title: 'Porte Rapide Souple Industrielle à Enroulement',
    category: 'fermetures',
    categoryLabel: 'Fermetures & Rideaux',
    location: 'Zone Logistique Alpes-Maritimes',
    clientType: 'Entrepôt & Industrie',
    description: 'Installation d’une porte rapide à enroulement vertical motorisé pour sas thermique et logistique. Équipée d’un hublot de vision panoramique et d’une barrière immatérielle de sécurité.',
    specs: [
      'Ouverture rapide haute fréquence (jusqu’à 1,5 m/s)',
      'Tablier PVC renforcé avec hublot transparent',
      'Boîtier de commande mural programmable & coup de poing d’arrêt',
      'Système d’auto-réinsertion du tablier',
    ],
    equipment: 'Motorisation industrielle triphasée & Barrière cellule',
    instagramRef: '@dali_electricite06',
    aspectRatio: '4:3',
    iconType: 'warehouse',
  },
  {
    id: 'portail-coulissant-anthracite',
    title: 'Grand Portail Coulissant Barreaudé Motorisé',
    category: 'portails',
    categoryLabel: 'Portails & Automatismes',
    location: 'Villeneuve-Loubet / Cagnes-sur-Mer',
    clientType: 'Résidence Privée & Parking',
    description: 'Motorisation robuste d’un grand portail coulissant à lames horizontales design anthracite. Pose de crémaillère en acier, feu clignotant réglementaire et gestion par télécommandes.',
    specs: [
      'Motorisation coulissante intensive avec encodeur',
      'Jeu de photocellules synchronisées anti-pincement',
      'Poteau technique intégré avec récepteur radio',
      'Débrayage manuel sécurisé en cas de coupure secteur',
    ],
    equipment: 'Automatisme CAME / FAAC 24V & Crémaillère acier',
    instagramRef: '@dali_electricite06',
    aspectRatio: '16:9',
    iconType: 'gate',
  },
  {
    id: 'portail-fer-forge-villa',
    title: 'Portail en Fer Forgé Artisanal Motorisé',
    category: 'portails',
    categoryLabel: 'Portails & Automatismes',
    location: 'Cap d’Antibes (06600)',
    clientType: 'Villa de Maître',
    description: 'Motorisation invisible à vérins électromécaniques sur un portail double battant traditionnel en fer forgé posé entre piliers en pierre naturelle de taille.',
    specs: [
      'Vérins électromécaniques discrets haute puissance',
      'Respect total du cachet architectural de la propriété',
      'Cellules discrètement intégrées dans la pierre',
      'Commande domotique à distance & visiophone',
    ],
    equipment: 'Motorisation Somfy / Came vérins renforcés',
    instagramRef: '@dali_electricite06',
    aspectRatio: '4:3',
    iconType: 'gate',
  },
  {
    id: 'porte-auto-mairie-public',
    title: 'Portes Automatiques Établissement Public & Mairie',
    category: 'portes',
    categoryLabel: 'Portes Automatiques',
    location: 'Collectivité territoriale (06)',
    clientType: 'Bâtiment Public & ERP',
    description: 'Modernisation des accès piétons d’un bâtiment municipal avec double porte coulissante automatique conforme aux normes ERP et d’accessibilité PMR.',
    specs: [
      'Conformité stricte norme accessibilité PMR & ERP',
      'Bandes visuelles de sécurité contrastées sur verre',
      'Radars volumétriques bi-technologie ouverture / sécurisation',
      'Dispositif de sécurité d’ouverture d’urgence intrinsèque',
    ],
    equipment: 'Automatisme Record / Axed & Détection BEA',
    instagramRef: '@dali_electricite06',
    aspectRatio: '4:3',
    iconType: 'door',
  },
  {
    id: 'hall-residence-standing',
    title: 'Hall d’Immeuble & Résidence de Standing',
    category: 'portes',
    categoryLabel: 'Portes Automatiques',
    location: 'Nice Ouest (06200)',
    clientType: 'Copropriété & Syndic',
    description: 'Pose d’un ensemble porte automatique 4 vantaux télescopiques en façade marbre avec platine interphone intégrée et ventouses de verrouillage magnétiques.',
    specs: [
      'Vantaux télescopiques pour passage maximal',
      'Verre feuilleté sécurité thermique & phonique',
      'Verrouillage électromagnétique nocturne',
      'Contrat de maintenance préventive semestrielle',
    ],
    equipment: 'Opérateur télescopique & Contrôle d’accès vigik',
    instagramRef: '@dali_electricite06',
    aspectRatio: '3:4',
    iconType: 'door',
  },
  {
    id: 'maintenance-operateurs',
    title: 'Maintenance Préventive & Réglage d’Opérateurs',
    category: 'maintenance',
    categoryLabel: 'Maintenance & SAV',
    location: 'Commerces Côte d’Azur',
    clientType: 'Commerces & Grandes Enseignes',
    description: 'Visite d’entretien semestrielle réglementaire : contrôle d’usure des courroies, graissage des rails, vérification des cellules et délivrance du carnet d’entretien.',
    specs: [
      'Contrôle réglementaire des sécurités et arrêts d’urgence',
      'Réglage fin des courbes de décélération et temporisation',
      'Nettoyage des glissières et dépoussiérage des cartes mères',
      'Attestation de conformité remise au gérant',
    ],
    equipment: 'Outillage professionnel de diagnostic électronique',
    instagramRef: '@dali_electricite06',
    aspectRatio: '4:3',
    iconType: 'wrench',
  },
];

