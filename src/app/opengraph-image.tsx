import { accueil } from '@/content/site';
import { imagePartage, taillePartage } from '@/lib/image-partage';

export const alt = 'X-HEC Impact : entreprendre pour l’impact';
export const size = taillePartage;
export const contentType = 'image/png';

export default async function Image() {
  return imagePartage({
    surtitre: accueil.hero.surtitre,
    titre: accueil.hero.titre,
    titreSuite: accueil.hero.titreSuite,
    details: ['LEX Europe', 'Conférences', 'Hackathon Impact'],
  });
}
