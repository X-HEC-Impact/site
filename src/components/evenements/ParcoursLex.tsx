import type { CSSProperties } from "react";
import type { Evenement } from "@/content/site";
import { Grain } from "@/components/ui/Motif";
import { cx } from "@/lib/utils";

/** Ville de départ et de retour (« Départ et retour à Paris, en train »). */
const DEPART = "Paris";

/*
  Positions (en % de la largeur et de la hauteur) des six gares : Paris puis les cinq étapes.
  Le tracé suit grossièrement la carte : vers le nord (Lille, Amsterdam), puis vers le sud-est
  (Munich, Zurich, Milan).
*/
const POSITIONS: [number, number][] = [
  [9, 52],
  [27, 30],
  [45, 17],
  [62, 46],
  [78, 62],
  [92, 80],
];

/** Où poser le nom de chaque gare pour qu'il ne touche pas la ligne : sous la gare, au-dessus, ou sous et à gauche. */
const PLACEMENTS = ["bas", "bas", "haut", "bas", "bas-gauche", "bas"] as const;

/** Durée (ms) du tracé de la ligne : les gares s'allument au moment où le tracé les atteint. */
const DUREE_TRACE = 1800;

/** Images clés du train : il part de Paris, marque un arrêt à chaque gare, s'arrête à la dernière, puis disparaît. */
function imagesTrain(points: [number, number][]) {
  const segments = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  const total = segments.reduce((a, b) => a + b, 0) || 1;
  const debut = 5; // % du cycle avant le départ
  const fin = 88; // % du cycle à l'arrivée
  const arret = 2.4; // % du cycle à chaque gare intermédiaire
  const deplacement = fin - debut - arret * (points.length - 2);
  const doux = "animation-timing-function:cubic-bezier(.45,0,.55,1)";
  const place = (p: [number, number], opacite: number) => `left:${p[0]}%;top:${p[1]}%;opacity:${opacite}`;

  const images = [`0%{${place(points[0], 0)}}`, `${debut}%{${place(points[0], 1)};${doux}}`];
  let t = debut;
  points.slice(1).forEach((p, i) => {
    t += (segments[i] / total) * deplacement;
    images.push(`${t.toFixed(2)}%{${place(p, 1)};${doux}}`);
    if (i < points.length - 2) {
      t += arret;
      images.push(`${t.toFixed(2)}%{${place(p, 1)};${doux}}`);
    }
  });
  const derniere = points[points.length - 1];
  images.push(`93%{${place(derniere, 1)}}`, `97%{${place(derniere, 0)}}`, `100%{${place(points[0], 0)}}`);
  return `@keyframes parcours-train{${images.join("")}}`;
}

/** Dessin du voyage : la ligne de train avec le nom de chaque ville traversée. */
export function ParcoursLex({
  etapes,
}: {
  etapes: NonNullable<Evenement["etapes"]>;
}) {
  const villes = [DEPART, ...etapes.map((e) => e.ville)];
  const points: [number, number][] =
    villes.length === POSITIONS.length
      ? POSITIONS
      : villes.map(
          (_, i) =>
            [9 + (i * 83) / Math.max(villes.length - 1, 1), 50] as [
              number,
              number,
            ],
        );
  const ligne = points.map(([x, y]) => `${x},${y}`).join(" ");
  const dernier = villes.length - 1;
  const x0 = points[0][0];
  const xN = points[dernier][0];
  // Moment (ms) où le tracé atteint la gare i.
  const delai = (i: number) => Math.round(((points[i][0] - x0) / Math.max(xN - x0, 1)) * DUREE_TRACE);

  return (
    <div aria-hidden data-reveal="trace" className="absolute inset-0 overflow-hidden bg-menthe">
      <style>{imagesTrain(points)}</style>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="trace-ligne absolute inset-0 size-full [&_*]:[vector-effect:non-scaling-stroke]"
      >
        {/* Les deux rails, très discrets, de part et d'autre de la ligne */}
        {[-5, 5].map((decalage) => (
          <polyline
            key={decalage}
            points={ligne}
            transform={`translate(0 ${decalage})`}
            fill="none"
            stroke="var(--color-sapin)"
            strokeOpacity={0.14}
            strokeWidth={1.5}
          />
        ))}
        <polyline
          points={ligne}
          fill="none"
          stroke="var(--color-sapin)"
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </svg>

      {points.map(([x, y], i) => (
        <span
          key={villes[i]}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          {/* Une onde part de la dernière gare : le terminus */}
          {i === dernier && (
            <span
              className="pulse-gare absolute inset-0 rounded-full border-2 border-vif"
              style={{ animationDelay: `${DUREE_TRACE + 300}ms` }}
            />
          )}
          <span
            className={cx(
              "trace-gare relative block rounded-full border-[3px] border-sapin",
              i === dernier
                ? "size-5 bg-vif sm:size-6"
                : "size-3.5 bg-menthe sm:size-[18px]",
            )}
            style={{ "--t": delai(i) } as CSSProperties}
          />
        </span>
      ))}

      {points.map(([x, y], i) => {
        const placement =
          villes.length === PLACEMENTS.length ? PLACEMENTS[i] : "bas";
        return (
          <span
            key={`nom-${villes[i]}`}
            className={cx(
              "trace-nom absolute font-titre text-[11px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap text-sapin sm:text-base md:text-lg",
              placement === "bas-gauche"
                ? "-translate-x-[85%]"
                : i === 0
                  ? "-translate-x-1/4"
                  : i === dernier
                    ? "-translate-x-3/4"
                    : "-translate-x-1/2",
              placement === "haut" && "-translate-y-full",
            )}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              marginTop: placement === "haut" ? "-1.1rem" : "1.2rem",
              "--t": delai(i),
            } as CSSProperties}
          >
            {villes[i]}
          </span>
        );
      })}

      {/* Le train : il parcourt la ligne d'une gare à l'autre, en boucle */}
      <span
        className="trace-train absolute z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vif shadow-[0_0_0_5px_rgb(46_194_126/0.3)] sm:size-3.5"
        style={{ left: `${points[0][0]}%`, top: `${points[0][1]}%` }}
      />

      <Grain />
    </div>
  );
}
