import Image from "next/image";
import { cx } from "@/lib/utils";

type Props = {
  /** Autre photo que le paysage de l'accueil (chemin dans public/). */
  src?: string;
  /** Partie de la photo à montrer, en pourcentages (x y) : « 50% 100% » = le bas (le lac). */
  position?: string;
  /** Voile vert sapin plus ou moins foncé, pour que le texte blanc reste lisible. */
  voile?: "normal" | "fort";
  priority?: boolean;
  className?: string;
  /**
   * Mouvement de la photo : « parallaxe » (elle glisse un peu moins vite que la page),
   * « respire » (en plus, un zoom très lent), ou « aucun ».
   */
  mouvement?: "parallaxe" | "respire" | "aucun";
};

/**
 * Photo de paysage (lac, forêt, montagnes) en fond d'une section, teintée de vert sapin.
 * À placer dans une section en position relative et « isolate » : elle reste derrière le contenu.
 * La même photo sert partout, avec un cadrage différent selon la page.
 */
export function PhotoFond({
  src = "/images/accueil/paysage.webp",
  position = "50% 58%",
  voile = "normal",
  priority,
  className,
  mouvement = "parallaxe",
}: Props) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute inset-0 -z-10 overflow-clip bg-sapin",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className={cx(
          "object-cover",
          mouvement !== "aucun" && "photo-parallaxe",
          mouvement === "respire" && "photo-respire",
        )}
        style={{ objectPosition: position }}
      />
      <div
        className={cx(
          "absolute inset-0 bg-gradient-to-r from-sapin/85 via-sapin/60",
          voile === "fort" ? "to-sapin/65 max-md:bg-sapin/30" : "to-sapin/40",
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sapin/50 via-transparent to-transparent" />
    </div>
  );
}
