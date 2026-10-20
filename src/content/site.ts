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
    "L'association du Master Entrepreneurs de l'École polytechnique et d'HEC Paris. Elle rassemble, accompagne et connecte les porteurs de projets à impact social et environnemental.",
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
      "Une learning expedition à travers l'Europe, pensée comme une alternative à la LEX San Francisco.",
    image: '/images/textures/lex.webp',
  },
  conference: {
    nom: 'Conférences & tables rondes',
    etiquette: 'Conférence',
    texte:
      "Fondateurs, chercheurs et décideurs partagent leur expérience et débattent des grands enjeux de l'impact.",
    image: '/images/textures/conference.webp',
  },
  hackathon: {
    nom: 'Hackathon Impact',
    etiquette: 'Hackathon',
    texte:
      'Une journée pour imaginer des solutions autour d’un objectif de développement durable rarement abordé.',
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
  libelleLien: "S'inscrire",
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
