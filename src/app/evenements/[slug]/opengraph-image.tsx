import { evenements, formats } from '@/content/site';
import { dateLongue } from '@/lib/dates';
import { getEvenement } from '@/lib/evenements';
import { imagePartage, taillePartage } from '@/lib/image-partage';
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
    return imagePartage({ surtitre: 'Événements', titre: 'X-HEC Impact' });
  }
  const { debut, suite } = decouperTitre(evenement.titre);
  const date = dateLongue(evenement);
  return imagePartage({
    surtitre: formats[evenement.type].nom,
    titre: debut,
    titreSuite: suite,
    details: [date.charAt(0).toUpperCase() + date.slice(1), evenement.lieu],
  });
}
