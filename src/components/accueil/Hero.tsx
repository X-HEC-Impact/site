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
      className={cx(marges, 'flex min-h-[calc(100svh-108px)] flex-col border-b border-filet')}
    >
      {/* Le titre occupe le haut de l'écran, centré dans l'espace disponible. */}
      <div className="flex flex-1 items-center py-14 md:py-16">
        <h1
          id="hero-titre"
          className="-ml-[0.05em] text-[clamp(46px,8.2vw,124px)] leading-[1] font-medium tracking-[-0.04em]"
        >
          <span className="block">{typo(hero.titre)}</span>
          <span className="block text-brume">
            {position === -1 ? (
              suite
            ) : (
              <>
                {suite.slice(0, position)}
                <span className="relative isolate inline-block text-sapin">
                  {mot}
                  {/* Trait tracé à la main sous le mot */}
                  <svg
                    aria-hidden
                    viewBox="0 0 300 24"
                    preserveAspectRatio="none"
                    className="absolute -bottom-[0.06em] left-[-1%] -z-10 h-[0.14em] w-[102%] text-vif"
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

      {/* Bandeau du bas : qui nous sommes, ce qu'on fait, et les deux boutons. */}
      <div className="grid gap-8 border-t border-filet py-8 md:py-10 lg:grid-cols-12 lg:gap-12">
        <p className="text-base font-medium text-ardoise lg:col-span-5">{hero.surtitre}</p>
        <div className="lg:col-span-7">
          <p className="max-w-[34rem] text-[17px] leading-relaxed">{typo(hero.texte)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Bouton href="/evenements">Voir nos événements</Bouton>
            <Bouton href="/equipe" variante="contour">
              Rencontrer l’équipe
            </Bouton>
          </div>
        </div>
      </div>
    </section>
  );
}
