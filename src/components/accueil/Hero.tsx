import { Bouton } from '@/components/ui/Bouton';
import { marges } from '@/components/ui/Section';
import { accueil } from '@/content/site';
import { cx, typo } from '@/lib/utils';

/**
 * Haut de l'accueil, sans image : le titre fait le visuel.
 * Deux lignes fixes (« Entreprendre » / « pour l'impact »), un trait vert vif
 * tracé sous le mot surligné, puis le texte et les boutons sur une même ligne.
 */
export function Hero() {
  const { hero } = accueil;
  const suite = typo(hero.titreSuite);
  const mot = hero.titreSurligne;
  const position = mot ? suite.indexOf(mot) : -1;

  return (
    <section
      aria-labelledby="hero-titre"
      className={cx(marges, 'grid gap-10 border-b border-filet py-20 md:py-28 lg:grid-cols-12 lg:items-end lg:gap-12')}
    >
      <div className="lg:col-span-7">
        <p className="flex items-center gap-2.5 text-sm font-medium text-ardoise">
          <span aria-hidden className="size-2 rounded-full bg-vif" />
          {hero.surtitre}
        </p>

        <h1
          id="hero-titre"
          className="mt-7 text-[clamp(44px,5.6vw,76px)] leading-[1.02] font-medium tracking-[-0.035em]"
        >
          <span className="block">{typo(hero.titre)}</span>
          <span className="block text-brume">
            {position === -1 ? (
              suite
            ) : (
              <>
                {suite.slice(0, position)}
                <span className="relative inline-block text-sapin">
                  {mot}
                  {/* Trait tracé à la main sous le mot */}
                  <svg
                    aria-hidden
                    viewBox="0 0 300 24"
                    preserveAspectRatio="none"
                    className="absolute -bottom-[0.08em] left-[-1%] h-[0.14em] w-[102%] text-vif"
                  >
                    <path
                      d="M3 15 C 60 6, 130 4, 190 9 S 270 16, 297 8"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      className="[stroke-width:3px] md:[stroke-width:4px]"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
                {suite.slice(position + mot.length)}
              </>
            )}
          </span>
        </h1>
      </div>

      {/* À droite, calé sur le bas du titre : le texte et les boutons */}
      <div className="max-w-xl lg:col-span-5 lg:max-w-none lg:pb-1">
        <p className="text-[17px] leading-relaxed">{typo(hero.texte)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Bouton href="/evenements">Voir nos événements</Bouton>
          <Bouton href="/equipe" variante="contour">
            Rencontrer l’équipe
          </Bouton>
        </div>
      </div>
    </section>
  );
}
