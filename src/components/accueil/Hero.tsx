import { Bouton } from '@/components/ui/Bouton';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil } from '@/content/site';
import { cx, typo } from '@/lib/utils';

/** Haut de l'accueil : le titre en très grand sur toute la largeur, sans visuel. */
export function Hero() {
  const { hero } = accueil;

  return (
    <section aria-labelledby="hero-titre" className={cx(marges, 'border-b border-filet py-24 md:py-32 lg:py-36')}>
      <Surtitre>{hero.surtitre}</Surtitre>
      <Titre
        id="hero-titre"
        niveau="h1"
        debut={hero.titre}
        suite={hero.titreSuite}
        surligne={hero.titreSurligne}
        className="mt-7 text-[clamp(48px,7.6vw,96px)] leading-[1.02] tracking-[-0.035em]"
      />
      <p className="mt-9 max-w-[40rem] text-[17px] leading-relaxed md:text-lg">{typo(hero.texte)}</p>
      <div className="mt-11 flex flex-wrap gap-3">
        <Bouton href="/evenements">Voir nos événements</Bouton>
        <Bouton href="/equipe" variante="contour">
          Rencontrer l’équipe
        </Bouton>
      </div>
    </section>
  );
}
