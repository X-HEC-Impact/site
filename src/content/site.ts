/**
 * ============================================================
 *  CONTENU DU SITE X-HEC IMPACT
 * ============================================================
 *
 *  Tout le texte modifiable du site est dans ce fichier.
 *  Pas besoin de toucher aux composants pour mettre à jour le site.
 *
 *  Règle : tant qu'une information n'est pas confirmée, on laisse un
 *  placeholder visible entre crochets, par exemple '[DATES]'.
 *  Le site les affiche tels quels pour qu'on les repère facilement.
 */

/* ------------------------------------------------------------------
   L'association
   ------------------------------------------------------------------ */

export const association = {
  nom: 'X-HEC Impact',
  /** Utilisée pour le référencement (Google, partages sur les réseaux). */
  description:
    "L’association du Master Entrepreneurs de l’École polytechnique et d’HEC Paris. Elle rassemble, accompagne et connecte les porteurs de projets à impact social et environnemental.",
  /** Phrase courte du pied de page. */
  accroche:
    'Rassembler, accompagner et connecter les porteurs de projets à impact social et environnemental.',
  email: '[EMAIL]',
  linkedin: '[URL LINKEDIN]',
  instagram: '[URL INSTAGRAM]',
};

/* ------------------------------------------------------------------
   Les trois formats d'événements
   La clé (lex, conference, hackathon) est celle du champ `type`
   des événements plus bas.
   ------------------------------------------------------------------ */

export type FormatEvenement = 'lex' | 'conference' | 'hackathon';

export const formats: Record<
  FormatEvenement,
  { nom: string; etiquette: string; texte: string; image: string }
> = {
  lex: {
    nom: 'LEX Europe',
    etiquette: 'LEX Europe',
    texte:
      'Une learning expedition à travers l’Europe, alternative à la LEX San Francisco.',
    image: '/images/textures/lex.webp',
  },
  conference: {
    nom: 'Conférences & tables rondes',
    etiquette: 'Conférence',
    texte:
      'Fondateurs, chercheurs et décideurs partagent leur expérience et débattent.',
    image: '/images/textures/conference.webp',
  },
  hackathon: {
    nom: 'Hackathon Impact',
    etiquette: 'Hackathon',
    texte:
      'Une journée de création autour d’un objectif de développement durable rarement abordé.',
    image: '/images/textures/hackathon.webp',
  },
};

/* ------------------------------------------------------------------
   Barre d'annonce (tout en haut du site)
   Le bouton noir « S'inscrire » du menu pointe vers le même lien.
   ------------------------------------------------------------------ */

export const annonce = {
  afficher: true,
  texte: 'Prochain événement : LEX Europe, [DATES].',
  libelleLien: "S’inscrire",
  lien: '/evenements/lex-europe#inscription',
};

/* ------------------------------------------------------------------
   Menu principal
   ------------------------------------------------------------------ */

export const navigation = [
  { libelle: 'Accueil', href: '/' },
  { libelle: 'Événements', href: '/evenements' },
  { libelle: 'Équipe', href: '/equipe' },
  { libelle: 'Contact', href: '/contact' },
];

/* ------------------------------------------------------------------
   Page d'accueil
   ------------------------------------------------------------------ */

export const accueil = {
  hero: {
    surtitre: 'Association du Master Entrepreneurs X-HEC',
    titre: 'Entreprendre',
    titreSuite: "pour l’impact",
    /** Mot surligné en vert citron dans le titre (laisser vide pour aucun). */
    titreSurligne: 'impact',
    texte:
      "X-HEC Impact rassemble, accompagne et connecte les porteurs de projets à impact social et environnemental. Learning expedition, conférences, hackathon : on crée les occasions de passer de l’idée à l’action.",
    image: '/images/textures/hero.webp',
    /** Laisser vide pour une texture décorative. Décrire la photo si c'en est une. */
    imageAlt: '',
  },
  partenaires: {
    surtitre: 'Écoles et partenaires qui nous accompagnent',
  },
  formats: {
    surtitre: "Ce qu’on fait",
    titre: 'Trois formats.',
    titreSuite: 'Un même objectif.',
    intro: 'Des rencontres pour apprendre, débattre et passer à l’action.',
  },
  agenda: {
    surtitre: 'Agenda',
    titre: 'Prochains',
    titreSuite: 'événements',
  },
  /** Bloc « Retour sur… » : l’événement mis en avant et ses photos (dans public/images/events/). */
  retour: {
    surtitre: 'Retour sur',
    evenement: 'hackathon-impact-2025',
    /** Ajouter les photos ainsi : { src: '/images/events/hackathon-1.jpg', alt: 'Description de la photo' } */
    photos: [] as { src: string; alt: string }[],
  },
  cta: {
    titre: 'Un projet, un partenariat ?',
    titreSuite: 'Parlons-en.',
    texte:
      'Intervenir lors d’une table ronde, soutenir la LEX Europe, proposer un sujet de hackathon : écrivez-nous.',
    bouton: 'Nous écrire',
    image: '/images/textures/appel.webp',
  },
};

/* ------------------------------------------------------------------
   Événements
   ------------------------------------------------------------------
   Pour ajouter un événement, copiez un bloc { … } et modifiez-le.
   - slug : identifiant dans l'adresse (/evenements/mon-slug), sans
     espace ni accent.
   - date : au format 'AAAA-MM-JJ'. Tant qu'elle n'est pas fixée, mettez
     un placeholder entre crochets ('[DATES]') : l'événement est alors
     classé « à venir ».
   - dateFin : facultatif, pour un événement sur plusieurs jours.
   - Un événement passe automatiquement dans « Événements passés »
     le lendemain de sa date (ou de sa date de fin).
   - image : facultatif, par exemple '/images/events/mon-slug.jpg'.
   ------------------------------------------------------------------ */

export type Evenement = {
  slug: string;
  type: FormatEvenement;
  titre: string;
  date: string;
  dateFin?: string;
  lieu: string;
  description: string;
  programme?: { quand: string; quoi: string }[];
  image?: string;
  inscriptionsOuvertes: boolean;
};

export const evenements: Evenement[] = [
  {
    slug: 'lex-europe',
    type: 'lex',
    titre: 'LEX Europe',
    date: '[DATES]',
    lieu: '[VILLES ÉTAPES]',
    description:
      "Une learning expedition à travers l’Europe, pensée comme une alternative à la LEX San Francisco, à la rencontre des entreprises et des acteurs qui font l’impact. [PRÉSENTATION DÉTAILLÉE]",
    programme: [
      { quand: '[JOUR 1]', quoi: '[ÉTAPE ET VISITES]' },
      { quand: '[JOUR 2]', quoi: '[ÉTAPE ET VISITES]' },
      { quand: '[JOUR 3]', quoi: '[ÉTAPE ET VISITES]' },
    ],
    inscriptionsOuvertes: true,
  },
  {
    slug: 'conference-1',
    type: 'conference',
    titre: '[TITRE DE LA CONFÉRENCE]',
    date: '[DATE]',
    lieu: '[LIEU]',
    description: '[DESCRIPTION DE LA CONFÉRENCE ET DES INTERVENANTS]',
    inscriptionsOuvertes: false,
  },
  {
    slug: 'hackathon-impact-2025',
    type: 'hackathon',
    titre: 'Hackathon Impact, 1re édition',
    date: '2025-12-13',
    lieu: 'Mouzaïa, Paris 19e',
    description:
      'Un marathon de 12 h non-stop pour réinventer l’impact. Étudiants et jeunes actifs aux profils variés sont passés en une journée de l’exploration des problèmes à des solutions concrètes, accompagnés par des alumni X-HEC et des entrepreneurs expérimentés, jusqu’au pitch devant un jury exigeant.',
    inscriptionsOuvertes: false,
  },
];

/* ------------------------------------------------------------------
   Écoles et partenaires
   Pour afficher un logo, déposez le fichier dans public/images/partners/
   et indiquez son chemin, par exemple logo: '/images/partners/hec-paris.png'.
   Format conseillé : PNG à fond transparent ou SVG.
   Sans logo, le nom s'affiche à la place.
   ------------------------------------------------------------------ */

export const partenaires: { nom: string; logo?: string }[] = [
  { nom: 'HEC Paris', logo: '/images/partners/hec-paris.png' },
  { nom: 'École polytechnique', logo: '/images/partners/ecole-polytechnique.png' },
  { nom: 'AgroParisTech', logo: '/images/partners/agroparistech.png' },
  { nom: 'ISAE-SUPAERO', logo: '/images/partners/isae-supaero.png' },
  { nom: 'INSA Lyon', logo: '/images/partners/insa-lyon.png' },
  { nom: 'UniLaSalle', logo: '/images/partners/unilasalle.png' },
  { nom: 'Climate House', logo: '/images/partners/climate-house.png' },
  { nom: 'EFCI', logo: '/images/partners/efci.png' },
];

/* ------------------------------------------------------------------
   Équipe
   Photo : déposez-la dans public/images/team/ (format carré conseillé)
   puis indiquez son chemin, par exemple '/images/team/prenom-nom.jpg'.
   ------------------------------------------------------------------ */

export type Membre = { prenom: string; nom: string; role: string; photo?: string };

export const equipe: Membre[] = [
  { prenom: 'Louis', nom: 'Honore', role: '[RÔLE]', photo: '/images/team/louis-honore.webp' },
  { prenom: 'Renan', nom: 'Chauveau', role: '[RÔLE]', photo: '/images/team/renan-chauveau.webp' },
  { prenom: 'Simon', nom: 'Pelissier', role: '[RÔLE]', photo: '/images/team/simon-pelissier.webp' },
  { prenom: 'Thomas', nom: 'Corvaisier', role: '[RÔLE]', photo: '/images/team/thomas-corvaisier.webp' },
  { prenom: 'Thomas', nom: 'Rapoport', role: '[RÔLE]', photo: '/images/team/thomas-rapoport.webp' },
  {
    prenom: 'Matéo',
    nom: 'Gosselin',
    role: 'Éco-terroriste, supporter actif de Total et Emirates',
    photo: '/images/team/mateo-gosselin.webp',
  },
];

/* ------------------------------------------------------------------
   Textes des autres pages
   ------------------------------------------------------------------ */

export const pages = {
  evenements: {
    surtitre: 'Agenda',
    titre: 'Nos événements.',
    titreSuite: "Pour passer de l’idée à l’action.",
    description:
      'LEX Europe, conférences, tables rondes et Hackathon Impact : tous les événements de X-HEC Impact.',
  },
  equipe: {
    surtitre: "L’équipe",
    titre: 'Les visages',
    titreSuite: 'de X-HEC Impact.',
    description: 'Les étudiants du Master Entrepreneurs X-HEC qui font vivre l’association.',
    /** Surtitre au-dessus de la grille des portraits (les membres sont dans la liste `equipe`). */
    grille: 'Les membres',
    /** Bloc « Mot de l’équipe » (section sombre). */
    mot: {
      surtitre: 'Mot de l’équipe',
      titre: 'Pourquoi',
      titreSuite: 'X-HEC Impact ?',
      citation: '[MOT DE L’ÉQUIPE]',
      signature: 'L’équipe X-HEC Impact',
    },
  },
  contact: {
    surtitre: 'Contact',
    titre: 'Un projet, une question ?',
    titreSuite: 'Écrivez-nous.',
    description:
      'Une question sur nos événements, une envie de participer ou de nous soutenir ? Écrivez-nous.',
    partenariats:
      'Entreprise, fondation, école : soutenez la LEX Europe ou un de nos événements. [MODALITÉS DE PARTENARIAT]',
  },
};
