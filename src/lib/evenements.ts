import { cacheLife } from 'next/cache';
import { evenements, type Evenement } from '@/content/site';
import { dateEstFixee } from '@/lib/dates';

/* ------------------------------------------------------------------
   Événements « à venir » et « passés » (côté serveur uniquement).
   Le contenu lui-même est dans src/content/site.ts, l'affichage des
   dates dans src/lib/dates.ts.
   ------------------------------------------------------------------ */

/** Date du jour à Paris, au format 'AAAA-MM-JJ'. */
function aujourdhuiAParis() {
  const morceaux = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const valeur = (type: string) => morceaux.find((m) => m.type === type)?.value;
  return `${valeur('year')}-${valeur('month')}-${valeur('day')}`;
}

function estPasse(evenement: Evenement, aujourdhui: string) {
  const derniereDate = dateEstFixee(evenement.dateFin) ? evenement.dateFin : evenement.date;
  return dateEstFixee(derniereDate) && derniereDate < aujourdhui;
}

/** Les dates fixées d'abord, de la plus proche à la plus lointaine ; les « [DATE] » ensuite. */
function parDateCroissante(a: Evenement, b: Evenement) {
  const fixeeA = dateEstFixee(a.date);
  const fixeeB = dateEstFixee(b.date);
  if (fixeeA && fixeeB) return a.date.localeCompare(b.date);
  return Number(fixeeB) - Number(fixeeA);
}

/**
 * Sépare les événements à venir et passés selon la date du jour.
 * Le résultat est mis en cache et recalculé environ toutes les heures :
 * un événement bascule donc tout seul dans « passés » le lendemain.
 */
export async function getEvenements() {
  'use cache';
  cacheLife('hours');

  const aujourdhui = aujourdhuiAParis();
  const aVenir = evenements.filter((e) => !estPasse(e, aujourdhui)).sort(parDateCroissante);
  const passes = evenements
    .filter((e) => estPasse(e, aujourdhui))
    .sort((a, b) => b.date.localeCompare(a.date));

  return { aVenir, passes };
}

export function getEvenement(slug: string) {
  return evenements.find((e) => e.slug === slug);
}

/** Vrai si l'événement est terminé. */
export async function evenementEstPasse(slug: string) {
  const { passes } = await getEvenements();
  return passes.some((e) => e.slug === slug);
}
