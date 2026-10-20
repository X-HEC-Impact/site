/** Joint des classes CSS en ignorant les valeurs vides. */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/** Vrai si la valeur est encore un placeholder du type « [EMAIL] ». */
export function estPlaceholder(valeur: string | undefined | null) {
  return !valeur || valeur.trim().startsWith('[');
}

/**
 * Typographie française : espace insécable avant ? ! : ; et dans les « guillemets »,
 * apostrophe courbe. Évite qu'un « ? » se retrouve seul en début de ligne.
 */
export function typo(texte: string) {
  return texte
    .replace(/ ([?!:;»])/g, '\u202F$1')
    .replace(/« /g, '«\u202F')
    .replace(/'/g, '’')
    .replace(/X-HEC/g, 'X\u2011HEC'); // trait d'union insécable : « X-HEC » ne se coupe jamais
}

/** Vrai si le lien sort du site (https://, mailto:…). */
export function estLienExterne(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

/** Coupe un titre à la première virgule pour l'afficher en deux tons. */
export function decouperTitre(titre: string) {
  const [debut, ...reste] = titre.split(', ');
  const suite = reste.join(', ');
  return suite ? { debut: `${debut},`, suite } : { debut, suite: undefined };
}
