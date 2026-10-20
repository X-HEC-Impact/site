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
  },
  agenda: {
    surtitre: 'Agenda',
    titre: 'Prochains',
    titreSuite: 'événements',
  },
  president: {
    surtitre: 'Mot du président',
    titre: 'Pourquoi',
    titreSuite: 'X-HEC Impact ?',
    citation: '[CITATION]',
    nom: '[NOM]',
    role: '[RÔLE]',
    /** Chemin de la photo, par exemple '/images/team/prenom-nom.jpg'. Vide = pictogramme. */
    photo: '',
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
      "La première édition du Hackathon Impact : une journée pour imaginer des solutions autour d’un objectif de développement durable rarement abordé. [BILAN DE L’ÉDITION]",
    inscriptionsOuvertes: false,
  },
];

/* ------------------------------------------------------------------
   Écoles et partenaires
   Pour afficher un logo, déposez le fichier dans public/images/partners/
   et indiquez son chemin, par exemple logo: '/images/partners/hec.svg'.
   Sans logo, le nom s'affiche à la place.
   ------------------------------------------------------------------ */

export const partenaires: { nom: string; logo?: string }[] = [
  { nom: 'HEC Paris' },
  { nom: 'École polytechnique' },
  { nom: 'AgroParisTech' },
  { nom: 'ISAE-SUPAERO' },
  { nom: 'INSA Lyon' },
  { nom: 'UniLaSalle' },
  { nom: 'Climate House' },
  { nom: 'EFCI' },
];

/* ------------------------------------------------------------------
   Équipe
   Photo : déposez-la dans public/images/team/ (format carré conseillé)
   puis indiquez son chemin, par exemple '/images/team/prenom-nom.jpg'.
   ------------------------------------------------------------------ */

export type Membre = { prenom: string; nom: string; role: string; photo?: string };

export const equipe: Membre[] = [
  { prenom: '[PRÉNOM]', nom: '[NOM]', role: '[RÔLE]' },
  { prenom: '[PRÉNOM]', nom: '[NOM]', role: '[RÔLE]' },
  { prenom: '[PRÉNOM]', nom: '[NOM]', role: '[RÔLE]' },
  { prenom: '[PRÉNOM]', nom: '[NOM]', role: '[RÔLE]' },
  { prenom: '[PRÉNOM]', nom: '[NOM]', role: '[RÔLE]' },
  { prenom: '[PRÉNOM]', nom: '[NOM]', role: '[RÔLE]' },
  { prenom: '[PRÉNOM]', nom: '[NOM]', role: '[RÔLE]' },
  { prenom: '[PRÉNOM]', nom: '[NOM]', role: '[RÔLE]' },
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
    description: "Les étudiantes et étudiants du Master Entrepreneurs X-HEC qui font vivre l’association.",
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
