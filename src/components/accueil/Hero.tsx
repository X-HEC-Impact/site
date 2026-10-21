import type { CSSProperties } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { PhotoFond } from "@/components/ui/PhotoFond";
import { marges } from "@/components/ui/Section";
import { accueil } from "@/content/site";
import { cx, typo } from "@/lib/utils";

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
      className={cx(
        marges,
        "relative isolate grid min-h-[calc(100svh-68px)] content-center gap-10 overflow-clip py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-12",
      )}
    >
      <PhotoFond priority mouvement="respire" />
      {/* Les ondes du logo, qui partent du coin en bas à droite et s'éloignent */}
      <svg
        aria-hidden
        viewBox="-300 -300 600 600"
        className="pointer-events-none absolute -right-40 -bottom-40 -z-10 size-[32rem] [&_*]:[vector-effect:non-scaling-stroke] md:-right-24 md:-bottom-24 md:size-[48rem]"
      >
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            className="ping"
            style={{ "--i": i, "--pic": 0.32 } as CSSProperties}
            r="300"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-sapin to-transparent" />

      <div className="lg:col-span-7">
        <h1
          id="hero-titre"
          className="-ml-[0.05em] text-[clamp(46px,9vw,76px)] leading-[1.02] font-medium tracking-[-0.04em] lg:text-[min(6.4vw,92px)]"
        >
          <span className="entree block text-white [--d:120ms]">{typo(hero.titre)}</span>
          <span className="entree block text-white/75 [--d:280ms]">
            {position === -1 ? (
              suite
            ) : (
              <>
                {suite.slice(0, position)}
                <span className="relative isolate inline-block text-white">
                  {mot}
                  {/* Trait tracé à la main sous le mot */}
                  <svg
                    aria-hidden
                    viewBox="0 0 300 24"
                    preserveAspectRatio="none"
                    className="souligne absolute -bottom-[0.06em] left-[-1%] -z-10 h-[0.14em] w-[102%] text-vif"
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
        <p className="entree mt-6 text-base font-medium text-white/85 [--d:460ms]">
          {hero.surtitre}
        </p>
      </div>

      <div className="relative max-w-xl before:absolute before:-inset-y-8 before:right-0 before:-left-10 before:-z-10 before:rounded-[3rem] before:bg-sapin/35 before:blur-xl lg:col-span-5 lg:max-w-[28rem] lg:justify-self-end">
        <p className="entree text-[17px] leading-relaxed text-white/90 [--d:520ms]">
          {typo(hero.texte)}
        </p>
        <div className="entree mt-8 flex flex-wrap gap-3 [--d:660ms]">
          <Bouton href="/evenements">Voir nos événements</Bouton>
          <Bouton href="/equipe" variante="contour">
            Rencontrer l’équipe
          </Bouton>
        </div>
      </div>
    </section>
  );
}
