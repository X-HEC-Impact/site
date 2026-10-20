import { cacheLife } from 'next/cache';
import { evenements, type Evenement } from '@/content/site';

/* ------------------------------------------------------------------
   Outils autour des événements : tri « à venir / passés » et dates.
   Le contenu lui-même est dans src/content/site.ts.
   ------------------------------------------------------------------ */

const FORMAT_ISO = /^\d{4}-\d{2}-\d{2}$/;

/** Vrai si la date est une vraie date 'AAAA-MM-JJ' (et pas un placeholder). */
export function dateEstFixee(date: string | undefined): date is string {
  return !!date && FORMAT_ISO.test(date);
}

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

/* ------------------------------------------------------------------
   Affichage des dates
   ------------------------------------------------------------------ */

/** Ce qu'on affiche tant que la date n'est pas fixée : « Dates à venir » ou « Date à venir ». */
function libelleAVenir(placeholder: string) {
  return /DATES/i.test(placeholder) ? 'Dates à venir' : 'Date à venir';
}

function versDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`);
}

function format(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'UTC', ...options }).format(versDate(iso));
}

/**
 * Date courte en deux morceaux pour les grilles :
 * { principal: '13 déc.', annee: '2025' } ou { principal: '12–15 mars', annee: '2027' }.
 * Une date non fixée devient { principal: 'Dates à venir', fixee: false }.
 */
export function dateCourte({ date, dateFin }: Pick<Evenement, 'date' | 'dateFin'>) {
  if (!dateEstFixee(date)) return { principal: libelleAVenir(date), annee: '', fixee: false };

  const annee = date.slice(0, 4);
  if (!dateEstFixee(dateFin) || dateFin === date) {
    return { principal: format(date, { day: 'numeric', month: 'short' }), annee, fixee: true };
  }

  const memeMois = date.slice(0, 7) === dateFin.slice(0, 7);
  const principal = memeMois
    ? `${format(date, { day: 'numeric' })}–${format(dateFin, { day: 'numeric', month: 'short' })}`
    : `${format(date, { day: 'numeric', month: 'short' })} – ${format(dateFin, { day: 'numeric', month: 'short' })}`;
  return { principal, annee: dateFin.slice(0, 4), fixee: true };
}

/** Date complète : « samedi 13 décembre 2025 », « du … au … », ou « Dates à venir ». */
export function dateLongue({ date, dateFin }: Pick<Evenement, 'date' | 'dateFin'>) {
  if (!dateEstFixee(date)) return libelleAVenir(date);
  const longue = (iso: string) =>
    format(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  if (!dateEstFixee(dateFin) || dateFin === date) return longue(date);
  return `du ${longue(date)} au ${longue(dateFin)}`;
}
