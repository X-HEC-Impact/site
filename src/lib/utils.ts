/** Joint des classes CSS en ignorant les valeurs vides. */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/** Vrai si la valeur est encore un placeholder du type « [EMAIL] ». */
export function estPlaceholder(valeur: string | undefined | null) {
  return !valeur || valeur.trim().startsWith('[');
}

/** Vrai si le lien sort du site (https://, mailto:…). */
export function estLienExterne(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}
