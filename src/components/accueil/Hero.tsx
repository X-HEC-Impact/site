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
    <section aria-labelledby="hero-titre" className={cx(marges, 'border-b border-filet pt-20 pb-16 md:pt-28 md:pb-20')}>
      <p className="flex items-center gap-2.5 text-sm font-medium text-ardoise">
        <span aria-hidden className="size-2 rounded-full bg-vif" />
        {hero.surtitre}
      </p>

      <h1
        id="hero-titre"
        className="mt-8 text-[clamp(52px,10.4vw,132px)] leading-[0.96] font-medium tracking-[-0.045em] md:mt-10"
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
                  className="absolute -bottom-[0.06em] left-[-2%] h-[0.16em] w-[104%] text-vif"
                >
                  <path
                    d="M3 15 C 60 6, 130 4, 190 9 S 270 16, 297 8"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    className="[stroke-width:4px] md:[stroke-width:7px]"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
              {suite.slice(position + mot.length)}
            </>
          )}
        </span>
      </h1>

      <div className="mt-14 grid gap-8 border-t border-filet pt-8 md:mt-20 md:grid-cols-12 md:items-end md:gap-10">
        <p className="max-w-[36rem] text-[17px] leading-relaxed md:col-span-7 md:text-lg">{typo(hero.texte)}</p>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <Bouton href="/evenements">Voir nos événements</Bouton>
          <Bouton href="/equipe" variante="contour">
            Rencontrer l’équipe
          </Bouton>
        </div>
      </div>
    </section>
  );
}
