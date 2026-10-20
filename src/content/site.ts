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
   ------------------------------------------------------------------ */

export const annonce = {
  afficher: true,
  texte: 'Prochain événement : LEX Europe, [DATES].',
  libelleLien: 'Découvrir',
  lien: '/evenements/lex-europe',
};

/** Bouton noir à droite du menu. */
export const boutonInscription = {
  libelle: 'S’inscrire',
  href: '/evenements',
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
   - inscriptionsOuvertes : true affiche le formulaire d'inscription.
   - reserveA : facultatif. Pour un événement interne, sans inscription
     publique (ex. la LEX) : le texte remplace le formulaire.
   - Blocs facultatifs pour une page plus riche : accroche (sous le
     titre), chiffres (chiffres clés), etapes (itinéraire), rencontres
     (cartes « Le programme ») et secteurs.
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
  reserveA?: string;
  accroche?: string;
  chiffres?: { valeur: string; libelle: string }[];
  etapes?: { ville: string; texte: string }[];
  rencontres?: { titre: string; texte: string }[];
  secteurs?: string;
};

export const evenements: Evenement[] = [
  {
    // Contenu tiré du dossier de partenariat « Learning Expedition en Europe ».
    slug: 'lex-europe',
    type: 'lex',
    titre: 'LEX Europe',
    date: '[DATES]',
    lieu: 'Lille · Amsterdam · Munich · Zurich · Milan',
    accroche:
      '5 pays · 10 jours · 10 étudiants du Master X-HEC Entrepreneurs, en train au départ de Paris.',
    description: `Une Learning Expedition organisée de A à Z par les étudiants du Master X-HEC Entrepreneurs, à la découverte de l’écosystème startup européen et à la rencontre de ses acteurs majeurs. Un projet entrepreneurial en soi : on démarche, on négocie, on s’adapte.

Pourquoi l’Europe ? L’Union européenne fait de l’innovation et de la compétitivité la clé de son indépendance. Avec le Pacte vert et la neutralité carbone visée en 2050, elle fait naître les startups de demain. Talents, grandes écoles, fonds et industriels : chaque pays apporte ses atouts, à quelques heures de train.

Un voyage à faible impact carbone : 19,3 kg de CO2e par étudiant pour 10 jours en train, contre plus de 3 000 kg pour un vol transatlantique.`,
    chiffres: [
      { valeur: '10', libelle: 'étudiants X-HEC Entrepreneurs' },
      { valeur: '5', libelle: 'pays traversés' },
      { valeur: '10', libelle: 'jours de rencontres' },
      { valeur: '100 %', libelle: 'en train, au départ de Paris' },
    ],
    etapes: [
      { ville: 'Lille', texte: 'EuraTechnologies, incubateur majeur de la tech en France.' },
      { ville: 'Amsterdam', texte: 'Entreprises et ONG à impact : Fairphone, The Ocean Cleanup et d’autres.' },
      { ville: 'Munich', texte: 'UnternehmerTUM, incubateur allemand de renommée mondiale.' },
      { ville: 'Zurich', texte: 'ETH Zurich, l’école polytechnique fédérale suisse.' },
      { ville: 'Milan', texte: 'PoliHub, pôle d’innovation du Politecnico di Milano.' },
    ],
    rencontres: [
      { titre: 'Incubateurs', texte: 'Comment chaque pays fait-il naître ses startups ?' },
      { titre: 'Fonds d’investissement', texte: 'Comment s’organisent les financements à l’échelle européenne ?' },
      { titre: 'Entreprises et startups', texte: 'Des visites dans les secteurs dynamiques et stratégiques.' },
      { titre: 'Entrepreneurs', texte: 'Échanger avec des fondateurs et des repreneurs inspirants.' },
    ],
    secteurs: 'impact, tech, food, retail, logistique, mode, santé, défense…',
    inscriptionsOuvertes: false,
    reserveA: 'Ce voyage est réservé aux étudiants du Master X-HEC Entrepreneurs.',
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
   - photo : déposez-la dans public/images/team/ (format carré conseillé)
     puis indiquez son chemin, par exemple '/images/team/prenom-nom.jpg'.
   - linkedin : l'adresse complète du profil (https://www.linkedin.com/in/…).
     Tant que c'est un placeholder entre crochets, l'icône ne s'affiche pas.
   - phrase : une ligne personnelle (facultatif).
   ------------------------------------------------------------------ */

export type Membre = {
  prenom: string;
  nom: string;
  role: string;
  photo?: string;
  phrase?: string;
  linkedin?: string;
};

export const equipe: Membre[] = [
  {
    prenom: 'Louis',
    nom: 'Honoré',
    role: 'Co-président',
    photo: '/images/team/louis-honore.webp',
    phrase: '[PHRASE PERSO]',
    linkedin: 'https://www.linkedin.com/in/louis-honor%C3%A9-764974292/',
  },
  {
    prenom: 'Thomas',
    nom: 'Corvaisier',
    role: 'Co-président',
    photo: '/images/team/thomas-corvaisier.webp',
    phrase: '[PHRASE PERSO]',
    linkedin: 'https://www.linkedin.com/in/tcorvaisier/',
  },
  {
    prenom: 'Renan',
    nom: 'Chauveau',
    role: 'Trésorier',
    photo: '/images/team/renan-chauveau.webp',
    phrase: '[PHRASE PERSO]',
    linkedin: 'https://www.linkedin.com/in/renan-chauveau/',
  },
  {
    prenom: 'Thomas',
    nom: 'Rapoport',
    role: 'Responsable LEX',
    photo: '/images/team/thomas-rapoport.webp',
    phrase: '[PHRASE PERSO]',
    linkedin: 'https://www.linkedin.com/in/thomas-rapoport-420944248/',
  },
  {
    prenom: 'Simon',
    nom: 'Pelissier',
    role: 'Responsable Hackathon et LEX',
    photo: '/images/team/simon-pelissier.webp',
    phrase: '[PHRASE PERSO]',
    linkedin: 'https://www.linkedin.com/in/simon-pelissier-76b001178/',
  },
  {
    prenom: 'Matéo',
    nom: 'Gosselin',
    role: 'Éco-terroriste, supporter actif de Total et Emirates',
    photo: '/images/team/mateo-gosselin.webp',
    phrase: '[PHRASE PERSO]',
    linkedin: 'https://www.linkedin.com/in/mateo-gosselin/',
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
    /** Bloc « Nos pôles » : ajoutez ou retirez des pôles librement. */
    poles: {
      surtitre: 'Nos pôles',
      titre: 'Comment',
      titreSuite: 'on s’organise.',
      liste: [
        { nom: '[PÔLE]', description: '[DESCRIPTION DU PÔLE]', membres: '[MEMBRES]' },
        { nom: '[PÔLE]', description: '[DESCRIPTION DU PÔLE]', membres: '[MEMBRES]' },
        { nom: '[PÔLE]', description: '[DESCRIPTION DU PÔLE]', membres: '[MEMBRES]' },
      ],
    },
    /** Bloc « Éditions précédentes » : les équipes qui ont organisé les éditions passées. */
    editions: {
      surtitre: 'Les éditions précédentes',
      titre: 'Avant nous,',
      titreSuite: 'ils ont ouvert la voie.',
      liste: [
        {
          libelle: 'Hackathon Impact, 1re édition',
          date: 'Décembre 2025',
          organisation: [
            'Adama Kanate',
            'Amélie Prudhomme',
            'Aymeric Desbazeille',
            'Marie-Lou Gosselet',
            'Marc-Florent Touati',
            'Florentin Koch',
            'Edgar de Turckheim',
          ],
        },
      ],
    },
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
