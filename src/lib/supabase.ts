import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Client Supabase côté serveur, avec la clé secrète (service_role).
 * Cette clé contourne le RLS : elle ne doit JAMAIS être envoyée au navigateur.
 * C'est pour ça que ce fichier commence par `import 'server-only'`.
 *
 * Renvoie null si les variables d'environnement ne sont pas configurées.
 */
export function clientSupabase() {
  const url = process.env.SUPABASE_URL;
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !cle) return null;

  return createClient(url, cle, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Vrai quand les deux variables d'environnement Supabase sont renseignées (sans ouvrir de connexion). */
export function supabaseConfigure() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
