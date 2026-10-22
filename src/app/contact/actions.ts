'use server';

import { erreursContact, lireContact, schemaContact, type EtatContact, type ValeursContact } from '@/lib/contact';
import { clientSupabase } from '@/lib/supabase';

/** Enregistre un message du formulaire de contact dans la table Supabase `messages`. */
export async function envoyerMessage(_etat: EtatContact, formData: FormData): Promise<EtatContact> {
  // Champ piège invisible : seuls les robots le remplissent.
  if (formData.get('site_web')) return { statut: 'succes' };

  const saisie = lireContact(formData);
  // Ce que le visiteur a écrit, pour le lui réafficher en cas d'erreur.
  const valeurs: ValeursContact = {
    sujet: saisie.sujet,
    nom: saisie.nom,
    email: saisie.email,
    organisation: saisie.organisation,
    message: saisie.message,
    consentement: saisie.consentement,
  };

  const resultat = schemaContact.safeParse(saisie);
  if (!resultat.success) {
    return {
      statut: 'erreur',
      message: 'Certains champs sont à corriger.',
      erreurs: erreursContact(resultat.error),
      valeurs,
    };
  }
  const donnees = resultat.data;

  const supabase = clientSupabase();
  if (!supabase) {
    console.error('Contact : SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant.');
    return { statut: 'erreur', message: 'Le formulaire n’est pas disponible pour le moment. Réessayez plus tard.', valeurs };
  }

  const { error } = await supabase.from('messages').insert({
    sujet: donnees.sujet,
    nom: donnees.nom,
    email: donnees.email,
    organisation: donnees.organisation || null,
    message: donnees.message,
    consentement: true,
  });

  if (error) {
    // On ne journalise que le code et le texte de l'erreur, jamais les données saisies.
    console.error('Contact : erreur Supabase', error.code, error.message);
    return { statut: 'erreur', message: 'Une erreur est survenue. Réessayez dans quelques instants.', valeurs };
  }

  return { statut: 'succes' };
}
