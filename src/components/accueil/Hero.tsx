import type { CSSProperties } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { Grain } from "@/components/ui/Motif";
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
        "relative isolate grid min-h-[calc(100svh-108px)] content-center gap-10 overflow-hidden border-b border-filet pt-16 pb-44 md:pt-20 md:pb-52 lg:grid-cols-12 lg:items-center lg:gap-12",
      )}
    >
      {/* Les ondes du logo, tracées fin et très discrètes, qui partent du bord droit (comme les visuels des formats) */}
      <svg
        aria-hidden
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute inset-0 -z-10 hidden size-full lg:block [&_*]:[vector-effect:non-scaling-stroke]"
      >
        <g transform="translate(1110 400)" fill="none">
          {[130, 210, 290, 370, 450, 530, 610, 690].map((r, i) => (
            <circle
              key={r}
              r={r}
              stroke="#062a21"
              strokeOpacity="0.09"
              strokeWidth="1.5"
              className="onde"
              style={{ "--i": i + 1 } as CSSProperties}
            />
          ))}
          <g strokeLinecap="round" strokeWidth="3">
            <path
              d="M-92 -92A130 130 0 0 0 -92 92"
              stroke="#2ec27e"
              className="onde"
              style={{ "--i": 1 } as CSSProperties}
            />
            <path
              d="M-148 -148A210 210 0 0 0 -148 148"
              stroke="#5aa469"
              strokeOpacity="0.7"
              className="onde"
              style={{ "--i": 2 } as CSSProperties}
            />
            <path
              d="M-205 -205A290 290 0 0 0 -205 205"
              stroke="#3e7750"
              strokeOpacity="0.5"
              className="onde"
              style={{ "--i": 3 } as CSSProperties}
            />
          </g>
          <circle
            r="26"
            fill="#2ec27e"
            className="onde"
            style={{ "--i": 0 } as CSSProperties}
          />
        </g>
      </svg>

      {/* Un paysage dessiné au pied de la page : les ondes se lèvent derrière les collines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 md:h-52"
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 size-full"
        >
          <path
            d="M0 190 L120 125 L210 170 L330 92 L470 180 L560 142 L700 210 L820 112 L950 175 L1080 102 L1200 170 L1320 132 L1440 182 V320 H0 Z"
            fill="#e1eaf8"
          />
          <path
            d="M0 232 C180 172 340 192 520 226 C700 260 820 172 1020 192 C1200 208 1320 242 1440 216 V320 H0 Z"
            fill="#d3eadb"
          />
          <path
            d="M0 272 C220 232 420 282 640 267 C860 252 1040 218 1240 247 C1340 262 1400 272 1440 264 V320 H0 Z"
            fill="#bfe3cc"
          />
        </svg>
        <Grain />
      </div>

      <div className="lg:col-span-7">
        <h1
          id="hero-titre"
          className="-ml-[0.05em] text-[clamp(46px,9vw,76px)] leading-[1.02] font-medium tracking-[-0.04em] lg:text-[min(6.4vw,92px)]"
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
        <p className="mt-6 text-base font-medium text-ardoise">
          {hero.surtitre}
        </p>
      </div>

      <div className="relative max-w-xl before:absolute before:-inset-y-8 before:right-0 before:-left-10 before:-z-10 before:rounded-[3rem] before:bg-white/90 before:blur-xl lg:col-span-5 lg:max-w-[28rem] lg:justify-self-end">
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
