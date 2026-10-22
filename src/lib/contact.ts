import { z } from 'zod';
import { sujetsContact } from '@/content/site';

/* ------------------------------------------------------------------
   Formulaire de contact : règles de validation partagées entre le
   navigateur (retour immédiat) et le serveur (contrôle final).
   ------------------------------------------------------------------ */

const texte = (message: string) => z.string({ error: message }).trim().min(1, message);

const valeursSujets = sujetsContact.map((s) => s.valeur) as [
  (typeof sujetsContact)[number]['valeur'],
  ...(typeof sujetsContact)[number]['valeur'][],
];

export const schemaContact = z.object({
  sujet: z.enum(valeursSujets, { error: 'Choisissez un sujet.' }),
  nom: texte('Indiquez votre nom.').max(120, 'Nom trop long.'),
  email: z
    .string({ error: 'Indiquez votre adresse e-mail.' })
    .trim()
    .min(1, 'Indiquez votre adresse e-mail.')
    .toLowerCase()
    .pipe(z.email({ error: 'Cette adresse e-mail ne semble pas valide.' })),
  organisation: z.string().trim().max(120, 'Nom trop long.').optional().default(''),
  message: texte('Écrivez votre message.').max(2000, 'Votre message est trop long.'),
  consentement: z.literal('on', { error: 'Votre accord est nécessaire pour nous écrire.' }),
});

export type DonneesContact = z.infer<typeof schemaContact>;
export type ChampContact = keyof DonneesContact;
export type ErreursContact = Partial<Record<ChampContact, string>>;
/** Ce que le visiteur a saisi, renvoyé en cas d'erreur pour ne pas lui faire tout retaper. */
export type ValeursContact = Partial<Record<ChampContact, string>>;

export type EtatContact =
  | { statut: 'initial' }
  | { statut: 'succes' }
  | { statut: 'erreur'; message: string; erreurs?: ErreursContact; valeurs?: ValeursContact };

/** Transforme le FormData du formulaire en objet simple à valider. */
export function lireContact(formData: FormData) {
  const valeur = (cle: string) => {
    const v = formData.get(cle);
    return typeof v === 'string' ? v : undefined;
  };
  return {
    sujet: valeur('sujet'),
    nom: valeur('nom'),
    email: valeur('email'),
    organisation: valeur('organisation'),
    message: valeur('message'),
    consentement: valeur('consentement'),
  };
}

/** Un message d'erreur par champ (le premier trouvé). */
export function erreursContact(erreur: z.ZodError): ErreursContact {
  const erreurs: ErreursContact = {};
  for (const probleme of erreur.issues) {
    const champ = probleme.path[0] as ChampContact | undefined;
    if (champ && !erreurs[champ]) erreurs[champ] = probleme.message;
  }
  return erreurs;
}

/** Le sujet demandé dans l'adresse (?sujet=table-ronde), s'il existe dans la liste. */
export function sujetValide(valeur: string | null | undefined) {
  return sujetsContact.find((s) => s.valeur === valeur)?.valeur;
}
