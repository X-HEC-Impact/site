import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EtiquetteFormat } from "@/components/evenements/EtiquetteFormat";
import { Bouton } from "@/components/ui/Bouton";
import { PhotoFond } from "@/components/ui/PhotoFond";
import { marges } from "@/components/ui/Section";
import { Titre } from "@/components/ui/Titre";
import type { Evenement } from "@/content/site";
import { cx, decouperTitre, typo } from "@/lib/utils";

/**
 * En-tête de la page d'un événement : photo de paysage teintée de vert sapin
 * (comme les autres pages), lien de retour en haut, titre et accroche en bas.
 * Il se fond dans la bande sombre qui suit (visuel et chiffres clés).
 */
export function EnTeteEvenement({
  evenement,
  passe,
}: {
  evenement: Evenement;
  passe: boolean;
}) {
  const { debut, suite } = decouperTitre(evenement.titre);

  return (
    <header
      className={cx(
        marges,
        "section-sombre relative isolate flex min-h-[28rem] flex-col overflow-clip bg-sapin pt-10 pb-16 md:min-h-[34rem] md:pt-14 md:pb-24",
      )}
    >
      <PhotoFond
        src={evenement.entete?.src}
        position={evenement.entete?.position}
        voile="fort"
        priority
        mouvement="respire"
      />
      {/* Fondu vers la bande sombre qui suit, sans arête */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-sapin to-transparent"
      />

      <Link
        href="/evenements"
        className="entree group inline-flex items-center gap-1.5 self-start text-sm font-medium text-white/85 hover:text-white"
      >
        <ArrowLeft
          aria-hidden
          className="size-4 transition-transform group-hover:-translate-x-0.5"
        />
        Tous les événements
      </Link>

      <div className="mt-auto pt-24 md:pt-32">
        <div className="entree flex flex-wrap items-center gap-3 [--d:120ms]">
          <EtiquetteFormat type={evenement.type} />
          {passe && (
            <span className="text-sm text-white/75">Événement passé</span>
          )}
        </div>
        <Titre
          niveau="h1"
          sombre
          debut={debut}
          suite={suite}
          className="entree mt-6 max-w-3xl [--d:220ms] [&>span]:text-white/75"
        />
        {evenement.accroche && (
          <p className="entree mt-6 max-w-2xl text-[17px] leading-relaxed text-white/90 [--d:360ms] md:text-lg">
            {typo(evenement.accroche)}
          </p>
        )}
        {/* Pour un événement à soutenir : l'action des partenaires dès l'en-tête */}
        {evenement.soutien && (
          <div className="entree mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 [--d:480ms]">
            <Bouton href="#soutenir">Soutenir le projet</Bouton>
            {evenement.etapes && evenement.etapes.length > 0 && (
              <Link
                href="#itineraire"
                className="font-medium text-white underline-offset-4 hover:underline"
              >
                Voir l’itinéraire
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
