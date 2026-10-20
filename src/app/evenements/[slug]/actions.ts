'use server';

import { evenementEstPasse, getEvenement } from '@/lib/evenements';
import { erreursParChamp, lireFormulaire, schemaInscription, type EtatInscription } from '@/lib/inscription';
import { clientSupabase } from '@/lib/supabase';

/** Enregistre une inscription dans la table Supabase `inscriptions`. */
export async function inscrire(_etat: EtatInscription, formData: FormData): Promise<EtatInscription> {
  // Champ piège invisible : seuls les robots le remplissent.
  if (formData.get('site_web')) return { statut: 'succes', prenom: '' };

  const resultat = schemaInscription.safeParse(lireFormulaire(formData));
  if (!resultat.success) {
    return {
      statut: 'erreur',
      message: 'Certains champs sont à corriger.',
      erreurs: erreursParChamp(resultat.error),
    };
  }
  const donnees = resultat.data;

  const evenement = getEvenement(donnees.event_slug);
  if (
    !evenement ||
    !evenement.inscriptionsOuvertes ||
    evenement.reserveA ||
    (await evenementEstPasse(evenement.slug))
  ) {
    return { statut: 'erreur', message: 'Les inscriptions à cet événement ne sont pas ouvertes.' };
  }

  const supabase = clientSupabase();
  if (!supabase) {
    console.error('Inscriptions : SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant.');
    return {
      statut: 'erreur',
      message: 'Les inscriptions en ligne ne sont pas encore activées. Réessayez un peu plus tard.',
    };
  }

  const { error } = await supabase.from('inscriptions').insert({
    event_slug: donnees.event_slug,
    prenom: donnees.prenom,
    nom: donnees.nom,
    email: donnees.email,
    ecole: donnees.ecole,
    motivation: donnees.motivation || null,
    consentement: true,
  });

  if (error) {
    // 23505 = contrainte d'unicité (event_slug, email) : déjà inscrit.
    if (error.code === '23505') {
      return {
        statut: 'erreur',
        message: 'Vous êtes déjà inscrit·e à cet événement avec cette adresse e-mail.',
        erreurs: { email: 'Cette adresse est déjà inscrite à cet événement.' },
      };
    }
    console.error('Inscriptions : erreur Supabase', error);
    return { statut: 'erreur', message: 'Une erreur est survenue. Réessayez dans quelques instants.' };
  }

  return { statut: 'succes', prenom: donnees.prenom };
}
