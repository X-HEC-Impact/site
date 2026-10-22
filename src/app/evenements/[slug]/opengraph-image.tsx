import { evenements, formats } from '@/content/site';
import { dateLongue } from '@/lib/dates';
import { getEvenement } from '@/lib/evenements';
import { imagePartage, pastillesFormat, photoPartage, taillePartage } from '@/lib/image-partage';
import { decouperTitre } from '@/lib/utils';

export const alt = 'Événement X-HEC Impact';
export const size = taillePartage;
export const contentType = 'image/png';

export function generateStaticParams() {
  return evenements.map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const evenement = getEvenement(slug);
  if (!evenement) {
    return imagePartage({ titre: 'X-HEC Impact', titreSuite: 'Événements' });
  }
  const { debut, suite } = decouperTitre(evenement.titre);
  const date = dateLongue(evenement);
  const format = formats[evenement.type].nom;
  return imagePartage({
    // Pas de pastille quand le titre commence déjà par le nom du format (ex. « LEX Europe »).
    pastille: evenement.titre.trim().startsWith(format) ? undefined : { texte: format, fond: pastillesFormat[evenement.type] },
    titre: debut,
    titreSuite: suite,
    details: [date.charAt(0).toUpperCase() + date.slice(1), evenement.lieu],
    // Même paysage que l'en-tête de la page de l'événement.
    photo: photoPartage(evenement.entete?.src, evenement.entete?.position),
  });
}
