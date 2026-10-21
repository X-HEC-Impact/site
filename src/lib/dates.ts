import type { Evenement } from '@/content/site';

/* ------------------------------------------------------------------
   Affichage des dates d'événements (utilisable côté serveur et client).
   ------------------------------------------------------------------ */

const FORMAT_ISO = /^\d{4}-\d{2}-\d{2}$/;
const FORMAT_MOIS = /^\d{4}-\d{2}$/;

/** Vrai si la date est une vraie date 'AAAA-MM-JJ' (et pas un placeholder). */
export function dateEstFixee(date: string | undefined): date is string {
  return !!date && FORMAT_ISO.test(date);
}

/** Vrai si seul le mois est connu : 'AAAA-MM' (ex. '2027-04' pour avril 2027). */
export function dateEstMois(date: string | undefined): boolean {
  return !!date && FORMAT_MOIS.test(date);
}

/** Vrai si la date est connue, au jour près ou au mois près. */
export function dateConnue(date: string | undefined): date is string {
  return dateEstFixee(date) || dateEstMois(date);
}

function moisEtAnnee(mois: string) {
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(
    new Date(`${mois}-15T12:00:00Z`),
  );
}

/** Ce qu'on affiche tant que la date n'est pas fixée : « Dates à venir » ou « Date à venir ». */
function libelleAVenir(placeholder: string) {
  return /DATES/i.test(placeholder) ? 'Dates à venir' : 'Date à venir';
}

function format(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'UTC', ...options }).format(new Date(`${iso}T12:00:00Z`));
}

/**
 * Date courte en deux morceaux pour les grilles :
 * { principal: '13 déc.', annee: '2025' } ou { principal: '12–15 mars', annee: '2027' }.
 * Une date non fixée devient { principal: 'Dates à venir', fixee: false }.
 */
export function dateCourte({ date, dateFin }: Pick<Evenement, 'date' | 'dateFin'>) {
  if (dateEstMois(date)) {
    const [mois] = moisEtAnnee(date).split(' ');
    return { principal: mois.charAt(0).toUpperCase() + mois.slice(1), annee: date.slice(0, 4), fixee: true };
  }
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
  if (dateEstMois(date)) return moisEtAnnee(date);
  if (!dateEstFixee(date)) return libelleAVenir(date);
  const longue = (iso: string) => format(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  if (!dateEstFixee(dateFin) || dateFin === date) return longue(date);
  return `du ${longue(date)} au ${longue(dateFin)}`;
}
