import Image from "next/image";
import { cx } from "@/lib/utils";

type Props = {
  /** Partie de la photo à montrer, en pourcentages (x y) : « 50% 100% » = le bas (le lac). */
  position?: string;
  /** Voile vert sapin plus ou moins foncé, pour que le texte blanc reste lisible. */
  voile?: "normal" | "fort";
  priority?: boolean;
  className?: string;
};

/**
 * Photo de paysage (lac, forêt, montagnes) en fond d'une section, teintée de vert sapin.
 * À placer dans une section en position relative et « isolate » : elle reste derrière le contenu.
 * La même photo sert partout, avec un cadrage différent selon la page.
 */
export function PhotoFond({
  position = "50% 58%",
  voile = "normal",
  priority,
  className,
}: Props) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute inset-0 -z-10 bg-sapin",
        className,
      )}
    >
      <Image
        src="/images/accueil/paysage.webp"
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div
        className={cx(
          "absolute inset-0 bg-gradient-to-r from-sapin/85 via-sapin/60",
          voile === "fort" ? "to-sapin/65" : "to-sapin/40",
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sapin/50 via-transparent to-transparent" />
    </div>
  );
}
