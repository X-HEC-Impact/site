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
  /** Adresse e-mail de contact : remplacer [EMAIL] dès que l'adresse est créée. */
  email: '[EMAIL]',
  linkedin: 'https://www.linkedin.com/company/x-hec-impact/',
  /** Laisser vide ('') pour masquer Instagram partout sur le site. */
  instagram: '',
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
  texte: 'Prochain événement : LEX Europe, avril 2027.',
  libelleLien: 'Découvrir',
  lien: '/evenements/lex-europe',
};

/**
 * Bouton noir « S'inscrire » à droite du menu.
 * Il s'affiche tout seul dès qu'un événement à venir a inscriptionsOuvertes: true
 * (et n'est pas réservé aux étudiants), et mène au formulaire de cet événement.
 * Sinon il est masqué.
 */
export const boutonInscription = {
  libelle: 'S’inscrire',
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
    surtitre: 'Partenaires qui nous accompagnent',
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
   - date : au format 'AAAA-MM-JJ', ou 'AAAA-MM' si seul le mois est
     connu (ex. '2027-04' s'affiche « avril 2027 »). Tant qu'elle n'est pas
     fixée, mettez un placeholder entre crochets ('[DATES]') : l'événement
     est alors classé « à venir ».
   - dateFin : facultatif, pour un événement sur plusieurs jours.
   - Un événement passe automatiquement dans « Événements passés »
     le lendemain de sa date (ou de sa date de fin).
   - image : facultatif, la bannière en haut de la page, par exemple
     '/images/events/mon-slug/banniere.jpg' (avec imageAlt pour la décrire).
     Sans image, la texture du format s'affiche.
   - photos : facultatif, galerie « En images » en bas de la page.
   - inscriptionsOuvertes : true affiche le formulaire d'inscription.
   - reserveA : facultatif. Pour un événement interne, sans inscription
     publique (ex. la LEX) : le texte remplace le formulaire.
   - Blocs facultatifs pour une page plus riche : accroche (sous le
     titre), chiffres (chiffres clés), etapes (itinéraire), rencontres
     (cartes « Le programme »), secteurs, thematiques, intervenants,
     partenaires et soutien.
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
  imageAlt?: string;
  photos?: { src: string; alt: string }[];
  inscriptionsOuvertes: boolean;
  reserveA?: string;
  accroche?: string;
  chiffres?: { valeur: string; libelle: string }[];
  etapes?: { ville: string; texte: string }[];
  rencontres?: { titre: string; texte: string }[];
  secteurs?: string;
  soutien?: Soutien;
  /** Thématiques de l'événement (cartes pastel). */
  thematiques?: { titre: string; texte?: string }[];
  /** Intervenants et membres du jury. */
  intervenants?: { nom: string; role?: string }[];
  /** Note sous la liste des intervenants. */
  intervenantsNote?: string;
  /** Partenaires de l'événement ; logo facultatif (dans public/images/partners/). */
  partenaires?: { nom: string; logo?: string }[];
};

/** Bloc « Soutenir le projet » d'un événement (budget, niveaux de partenariat, contact). */
export type Soutien = {
  titre: string;
  titreSuite?: string;
  intro?: string;
  budget: { poste: string; couvre: string; montant: string; part: string }[];
  total: { montant: string; part: string };
  avantages: { titre: string; texte: string }[];
  niveaux: { nom: string; montant: string; avantages: string[] }[];
  note?: string;
  contact: { nom: string; role: string; email: string; telephone?: string };
};

export const evenements: Evenement[] = [
  {
    // Contenu tiré du dossier de partenariat « Learning Expedition en Europe ».
    slug: 'lex-europe',
    type: 'lex',
    titre: 'LEX Europe',
    date: '2027-04',
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
    // Bloc « Soutenir le projet » (repris du dossier de partenariat).
    soutien: {
      titre: 'Soutenir',
      titreSuite: 'la LEX Europe.',
      intro: 'Nous avons besoin de 25 000 € pour ce voyage.',
      budget: [
        { poste: 'Hébergement', couvre: '10 nuits pour 10 étudiants', montant: '8 500 €', part: '34 %' },
        { poste: 'Transport en train', couvre: 'Paris, 5 villes, retour à Paris', montant: '6 000 €', part: '24 %' },
        { poste: 'Repas', couvre: 'Pendant les 10 jours', montant: '5 000 €', part: '20 %' },
        { poste: 'Organisation', couvre: 'Transports locaux, tables rondes, photo et vidéo', montant: '5 500 €', part: '22 %' },
      ],
      total: { montant: '25 000 €', part: '100 %' },
      avantages: [
        {
          titre: 'Visibilité',
          texte: 'Des posts tout au long du voyage, un relais avec le réseau X-HEC Entrepreneurs, du matériel à votre nom.',
        },
        {
          titre: 'Rencontres avec les étudiants',
          texte: 'Un lien renforcé entre votre entreprise et de futurs entrepreneurs et repreneurs passionnés par l’écosystème européen.',
        },
        {
          titre: 'Un engagement RSE concret',
          texte: 'Vous soutenez un projet bas carbone au service de l’entrepreneuriat européen.',
        },
        {
          titre: 'Élargir votre réseau européen',
          texte: 'Des mises en relation avec les incubateurs, investisseurs et startups rencontrés dans 5 pays.',
        },
      ],
      niveaux: [
        {
          nom: 'Voyageur',
          montant: '1 000 €',
          avantages: ['Votre logo et nos remerciements dans les posts LinkedIn du voyage', 'Carnet de voyage envoyé au retour'],
        },
        {
          nom: 'Explorateur',
          montant: '3 000 €',
          avantages: [
            'Un post LinkedIn dédié à votre entreprise',
            'Organisation d’un dîner avec les étudiants du voyage pour un échange en comité réduit',
          ],
        },
        {
          nom: 'Ambassadeur',
          montant: '5 000 €',
          avantages: [
            'Votre logo sur le merch’ des étudiants et mis en avant pendant le voyage',
            'Organisation d’une conférence par l’association X-HEC Impact sur le sujet de votre choix',
          ],
        },
        {
          nom: 'Partenaire principal',
          montant: '10 000 €',
          avantages: [
            'Votre nom associé au voyage',
            'Restitution du voyage devant vos équipes',
            'Cocktail de networking avant le départ',
          ],
        },
      ],
      note: 'Chaque offre inclut les avantages précédents. Nous pouvons également organiser une visite de vos bureaux si vous vous trouvez dans les villes concernées.',
      contact: {
        nom: 'Thomas Rapoport',
        role: 'Responsable LEX Europe 2027',
        email: 'thomas.rapoport@hec.edu',
        telephone: '07 81 61 65 85',
      },
    },
  },
  {
    slug: 'hackathon-impact-2026',
    type: 'hackathon',
    titre: 'Hackathon Impact, 2e édition',
    date: '2026-10-16',
    lieu: 'Eurazeo · 50 Partners',
    accroche: '120 participants, 24 équipes, 2 sites et 4 thématiques au service de l’impact.',
    description: `Le Hackathon Impact a réuni 120 participants, répartis en 24 équipes, autour de l’impact et de quatre thématiques : économie circulaire, agriculture et souveraineté, ressources critiques (eau et énergie), éducation et inclusion.

L’événement s’est tenu sur deux sites, chez Eurazeo et chez 50 Partners, avec 70 personnes présentes sur chaque site, intervenants compris. Des partenaires de renom, des intervenants et des jurys venus de l’impact, de l’investissement et de l’entreprise l’ont accompagné.

Voir 120 personnes travailler ensemble sur l’impact est une formidable opportunité : nous espérons que de vrais projets en émergeront.`,
    chiffres: [
      { valeur: '120', libelle: 'participants' },
      { valeur: '24', libelle: 'équipes' },
      { valeur: '4', libelle: 'thématiques' },
      { valeur: '2', libelle: 'sites : Eurazeo et 50 Partners' },
    ],
    thematiques: [
      { titre: 'Économie circulaire' },
      { titre: 'Agriculture et souveraineté' },
      { titre: 'Ressources critiques', texte: 'Eau et énergie' },
      { titre: 'Éducation et inclusion' },
    ],
    intervenants: [
      { nom: 'Céline Rémy', role: 'Co-fondatrice de la Climate House' },
      { nom: 'Alexandre Mars', role: 'Entrepreneur et philanthrope' },
      { nom: 'Émilie Garcia', role: 'Responsable RSE de Bpifrance' },
    ],
    intervenantsNote: 'Ainsi que des experts de l’impact venus du capital-risque, d’Eurazeo et de 50 Partners.',
    partenaires: [
      { nom: 'Climate House', logo: '/images/partners/climate-house.png' },
      { nom: 'Lovable', logo: '/images/partners/lovable.png' },
      { nom: 'Eurazeo', logo: '/images/partners/eurazeo.png' },
      { nom: 'Bpifrance', logo: '/images/partners/bpifrance.png' },
      { nom: '50 Partners', logo: '/images/partners/50-partners.png' },
      { nom: 'Lingueo', logo: '/images/partners/lingueo.png' },
    ],
    inscriptionsOuvertes: false,
  },
  {
    slug: 'hackathon-impact-2025',
    type: 'hackathon',
    titre: 'Hackathon Impact, 1re édition',
    date: '2025-12-13',
    lieu: 'Mouzaïa, Paris 19e',
    image: '/images/events/hackathon-impact-2025/banniere.jpg',
    imageAlt: 'Des équipes au travail pendant le Hackathon Impact',
    photos: [
      {
        src: '/images/events/hackathon-impact-2025/equipe-au-travail.jpg',
        alt: 'Une équipe échange autour d’une table pendant le hackathon',
      },
      {
        src: '/images/events/hackathon-impact-2025/intervention-public.jpg',
        alt: 'Le public assiste à une intervention',
      },
      {
        src: '/images/events/hackathon-impact-2025/presentation-climat.jpg',
        alt: 'Présentation sur l’évolution des températures mondiales',
      },
      {
        src: '/images/events/hackathon-impact-2025/deroule-journee.jpg',
        alt: 'Présentation du déroulé de la journée aux participants',
      },
    ],
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
   ------------------------------------------------------------------ */

export type Membre = {
  prenom: string;
  nom: string;
  role: string;
  photo?: string;
  linkedin?: string;
};

export const equipe: Membre[] = [
  {
    prenom: 'Louis',
    nom: 'Honoré',
    role: 'Co-président',
    photo: '/images/team/louis-honore.webp',
    linkedin: 'https://www.linkedin.com/in/louis-honor%C3%A9-764974292/',
  },
  {
    prenom: 'Thomas',
    nom: 'Corvaisier',
    role: 'Co-président',
    photo: '/images/team/thomas-corvaisier.webp',
    linkedin: 'https://www.linkedin.com/in/tcorvaisier/',
  },
  {
    prenom: 'Renan',
    nom: 'Chauveau',
    role: 'Trésorier',
    photo: '/images/team/renan-chauveau.webp',
    linkedin: 'https://www.linkedin.com/in/renan-chauveau/',
  },
  {
    prenom: 'Thomas',
    nom: 'Rapoport',
    role: 'Responsable LEX',
    photo: '/images/team/thomas-rapoport.webp',
    linkedin: 'https://www.linkedin.com/in/thomas-rapoport-420944248/',
  },
  {
    prenom: 'Simon',
    nom: 'Pelissier',
    role: 'Responsable Hackathon et LEX',
    photo: '/images/team/simon-pelissier.webp',
    linkedin: 'https://www.linkedin.com/in/simon-pelissier-76b001178/',
  },
  {
    prenom: 'Matéo',
    nom: 'Gosselin',
    role: 'Responsable conférences',
    photo: '/images/team/mateo-gosselin.webp',
    linkedin: 'https://www.linkedin.com/in/mateo-gosselin/',
  },
  {
    prenom: 'Eléonore',
    nom: 'de Lambertye',
    role: '[RÔLE]',
    photo: '/images/team/eleonore-de-lambertye.webp',
    linkedin: 'https://www.linkedin.com/in/eleonore-de-lambertye/',
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
      citation:
        'Nous croyons qu’entreprendre est l’un des leviers les plus puissants pour répondre aux défis sociaux et environnementaux. Avec X-HEC Impact, nous créons des occasions concrètes d’apprendre, de rencontrer celles et ceux qui agissent déjà, et de passer de l’idée à l’action.',
      signature: 'L’équipe X-HEC Impact',
    },
  },
  contact: {
    surtitre: 'Contact',
    titre: 'Un projet, une question ?',
    titreSuite: 'Écrivez-nous.',
    description:
      'Une question sur nos événements, une envie de participer ou de nous soutenir ? Voici comment nous joindre.',
    email: {
      surtitre: 'Par e-mail',
      texte: 'Pour toute question sur l’association et ses événements.',
    },
    linkedin: 'Suivez nos actualités et nos prochains événements.',
    instagram: 'Les coulisses de nos événements.',
    partenariats: {
      titre: 'Partenariats',
      texte: 'Entreprise, fondation, école : soutenez la LEX Europe ou l’un de nos événements.',
      /** Objet pré-rempli de l'e-mail envoyé depuis la case « Partenariats ». */
      objet: 'Partenariat avec X-HEC Impact',
    },
  },
};
