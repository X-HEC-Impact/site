import { PhotoFond } from "@/components/ui/PhotoFond";
import { marges } from "@/components/ui/Section";
import { Titre } from "@/components/ui/Titre";
import { cx, typo } from "@/lib/utils";

type Props = {
  surtitre: string;
  titre: string;
  titreSuite?: string;
  description?: string;
  /** Cadrage de la photo de fond (voir PhotoFond). */
  position?: string;
};

/**
 * En-tête commun aux pages intérieures (Événements, Équipe, Contact) :
 * la photo de paysage de l'accueil (cadrée différemment), le surtitre, le grand titre
 * en deux tons à gauche et la phrase d'introduction à droite, en blanc.
 */
export function EnTetePage({
  surtitre,
  titre,
  titreSuite,
  description,
  position,
}: Props) {
  return (
    <header
      className={cx(
        marges,
        "section-sombre relative isolate grid gap-8 overflow-hidden border-b border-filet pt-20 pb-16 md:grid-cols-12 md:items-end md:gap-12 md:pt-28 md:pb-24",
      )}
    >
      <PhotoFond position={position} voile="fort" />

      <div className="md:col-span-7">
        <p className="surtitre">{surtitre}</p>
        <Titre
          niveau="h1"
          sombre
          debut={titre}
          suite={titreSuite}
          className="mt-5"
        />
      </div>
      {description && (
        <p className="max-w-md text-[17px] leading-relaxed text-white/90 md:col-span-5 md:justify-self-end">
          {typo(description)}
        </p>
      )}
    </header>
  );
}
