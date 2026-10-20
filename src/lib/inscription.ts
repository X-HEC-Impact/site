import { z } from 'zod';

/* ------------------------------------------------------------------
   Formulaire d'inscription : règles de validation partagées entre le
   navigateur (retour immédiat) et le serveur (contrôle final).
   ------------------------------------------------------------------ */

const texte = (message: string) => z.string({ error: message }).trim().min(1, message);

export const schemaInscription = z.object({
  event_slug: texte('Événement inconnu.'),
  prenom: texte('Indiquez votre prénom.').max(80, 'Prénom trop long.'),
  nom: texte('Indiquez votre nom.').max(80, 'Nom trop long.'),
  email: z
    .string({ error: 'Indiquez votre adresse e-mail.' })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: 'Cette adresse e-mail ne semble pas valide.' })),
  ecole: texte('Indiquez votre école ou organisation.').max(120, 'Nom trop long.'),
  motivation: z.string().trim().max(1000, 'Votre message est trop long.').optional().default(''),
  consentement: z.literal('on', { error: 'Votre accord est nécessaire pour vous inscrire.' }),
});

export type DonneesInscription = z.infer<typeof schemaInscription>;
export type Champ = keyof DonneesInscription;
export type Erreurs = Partial<Record<Champ, string>>;

export type EtatInscription =
  | { statut: 'initial' }
  | { statut: 'succes'; prenom: string }
  | { statut: 'erreur'; message: string; erreurs?: Erreurs };

/** Transforme le FormData du formulaire en objet simple à valider. */
export function lireFormulaire(formData: FormData) {
  const valeur = (cle: string) => {
    const v = formData.get(cle);
    return typeof v === 'string' ? v : undefined;
  };
  return {
    event_slug: valeur('event_slug'),
    prenom: valeur('prenom'),
    nom: valeur('nom'),
    email: valeur('email'),
    ecole: valeur('ecole'),
    motivation: valeur('motivation'),
    consentement: valeur('consentement'),
  };
}

/** Un message d'erreur par champ (le premier trouvé). */
export function erreursParChamp(erreur: z.ZodError): Erreurs {
  const erreurs: Erreurs = {};
  for (const probleme of erreur.issues) {
    const champ = probleme.path[0] as Champ | undefined;
    if (champ && !erreurs[champ]) erreurs[champ] = probleme.message;
  }
  return erreurs;
}
