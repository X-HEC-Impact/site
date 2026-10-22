import { accueil } from '@/content/site';
import { imagePartage, photoPartage, taillePartage } from '@/lib/image-partage';

export const alt = 'X-HEC Impact : entreprendre pour l’impact';
export const size = taillePartage;
export const contentType = 'image/png';

export default async function Image() {
  const { hero } = accueil;
  return imagePartage({
    titre: hero.titre,
    titreSuite: hero.titreSuite,
    souligne: hero.titreSurligne || undefined,
    sousTitre: hero.surtitre,
    photo: photoPartage(),
  });
}
