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

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-menthe">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full [&_*]:[vector-effect:non-scaling-stroke]"
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
          <span
            className={cx(
              "block rounded-full border-[3px] border-sapin",
              i === dernier
                ? "size-5 bg-vif sm:size-6"
                : "size-3.5 bg-menthe sm:size-[18px]",
            )}
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
              "absolute font-titre text-[11px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap text-sapin sm:text-base md:text-lg",
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
            }}
          >
            {villes[i]}
          </span>
        );
      })}

      <Grain />
    </div>
  );
}
