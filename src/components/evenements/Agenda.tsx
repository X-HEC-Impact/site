import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Bouton } from "@/components/ui/Bouton";
import { Motif } from "@/components/ui/Motif";
import { CelluleEvenement } from "@/components/evenements/CelluleEvenement";
import { EtiquetteFormat } from "@/components/evenements/EtiquetteFormat";
import { Grille } from "@/components/ui/Grille";
import { LienFleche } from "@/components/ui/LienFleche";
import { Pictogramme } from "@/components/ui/Pictogramme";
import { marges, rythme } from "@/components/ui/Section";
import { formats, type Evenement, type FormatEvenement } from "@/content/site";
import { dateCourte } from "@/lib/dates";
import { cx } from "@/lib/utils";

export type Filtre = "tous" | FormatEvenement;

type Props = {
  aVenir: Evenement[];
  passes: Evenement[];
  filtre: Filtre;
};

const onglets: { cle: Filtre; libelle: string }[] = [
  { cle: "tous", libelle: "Tous" },
  ...(Object.keys(formats) as FormatEvenement[]).map((cle) => ({
    cle,
    libelle: cle === "hackathon" ? "Hackathon" : formats[cle].nom,
  })),
];

/**
 * L'agenda : onglets de filtre, grille « À venir », liste « Événements passés ».
 * Le filtre vient de l'adresse (/evenements?format=lex) : chaque onglet est un simple lien.
 */
export function Agenda({ aVenir, passes, filtre }: Props) {
  const garde = (e: Evenement) => filtre === "tous" || e.type === filtre;
  const aVenirFiltres = aVenir.filter(garde);
  const passesFiltres = passes.filter(garde);

  return (
    <>
      <section
        aria-labelledby="a-venir-titre"
        className={cx("border-b border-filet", marges, rythme)}
      >
        {/* Onglets de filtre */}
        <nav aria-label="Filtrer par format">
          <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
            {onglets.map(({ cle, libelle }) => {
              const actif = filtre === cle;
              return (
                <li key={cle} className="shrink-0">
                  <Link
                    href={
                      cle === "tous"
                        ? "/evenements"
                        : `/evenements?format=${cle}`
                    }
                    scroll={false}
                    aria-current={actif ? "true" : undefined}
                    className={cx(
                      "inline-flex h-10 items-center rounded-bouton px-4 text-sm font-medium whitespace-nowrap transition-colors",
                      actif
                        ? "bg-sapin text-white"
                        : "border border-filet text-ardoise hover:border-brume hover:text-sapin",
                    )}
                  >
                    {cle !== "tous" && (
                      <Pictogramme type={cle} className="mr-2 -ml-1 size-5" />
                    )}
                    {libelle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* À venir */}
        <h2
          id="a-venir-titre"
          className="mt-14 text-[28px] leading-tight md:mt-16 md:text-[32px]"
        >
          À venir
        </h2>
        <div className="mt-8">
          {aVenirFiltres.length > 0 ? (
            <div className="space-y-8">
              <EvenementEnVedette evenement={aVenirFiltres[0]} />
              {aVenirFiltres.length > 1 && (
                <Grille colonnes="md:grid-cols-3" cadre>
                  {aVenirFiltres.slice(1).map((evenement) => (
                    <li key={evenement.slug}>
                      <CelluleEvenement evenement={evenement} />
                    </li>
                  ))}
                </Grille>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4 rounded-bouton bg-voile p-8 md:p-10">
              <CalendarDays
                aria-hidden
                className="size-6 text-brume"
                strokeWidth={1.5}
              />
              <p className="font-titre text-xl font-medium tracking-[-0.02em] text-sapin">
                Aucun événement à venir dans ce format pour l’instant.
              </p>
              <LienFleche href="/evenements">
                Voir tous les événements
              </LienFleche>
            </div>
          )}
        </div>
      </section>

      {/* Passés : cartes avec photo, sur fond doux pour se distinguer de « À venir » */}
      {passesFiltres.length > 0 && (
        <section
          aria-labelledby="passes-titre"
          className={cx("border-b border-filet bg-voile", marges, rythme)}
        >
          <h2
            id="passes-titre"
            className="text-[28px] leading-tight md:text-[32px]"
          >
            Événements passés
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {passesFiltres.map((evenement) => (
              <li key={evenement.slug}>
                <CartePassee evenement={evenement} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function visuel(evenement: Evenement) {
  return evenement.image ?? evenement.photos?.[0]?.src;
}

/** Le prochain événement, en grand : visuel du format à gauche, infos et bouton à droite. */
function EvenementEnVedette({ evenement }: { evenement: Evenement }) {
  const { slug, type, titre, lieu, accroche, inscriptionsOuvertes, reserveA } =
    evenement;
  const { principal, annee, fixee } = dateCourte(evenement);
  const page = `/evenements/${slug}`;

  return (
    <article className="grid overflow-hidden rounded-bouton border border-filet bg-white shadow-[0_1px_2px_rgb(6_42_33/0.05),0_16px_40px_-20px_rgb(6_42_33/0.25)] md:grid-cols-12">
      <div className="relative aspect-[16/9] md:col-span-5 md:aspect-auto md:min-h-[22rem]">
        <Motif type={type} />
      </div>

      <div className="flex flex-col p-6 sm:p-8 md:col-span-7 lg:p-12">
        <EtiquetteFormat type={type} className="self-start" />

        <p className="mt-6 flex items-end gap-3 font-titre">
          {fixee ? (
            <>
              <time
                dateTime={evenement.date}
                className="text-[56px] leading-none tracking-[-0.03em] text-vif-texte"
              >
                {principal}
              </time>
              <span className="pb-1 text-lg text-brume">{annee}</span>
            </>
          ) : (
            <span className="text-4xl leading-none tracking-[-0.02em] text-vif-texte">
              {principal}
              {annee && (
                <span className="ml-3 text-lg text-brume">{annee}</span>
              )}
            </span>
          )}
        </p>

        <h3 className="mt-5 text-[32px] leading-tight md:text-4xl">{titre}</h3>
        {accroche && (
          <p className="mt-3 max-w-lg text-[17px] leading-relaxed">
            {accroche}
          </p>
        )}

        <p className="mt-5 flex items-start gap-1.5 text-[15px]">
          <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-brume" />
          <span>
            {lieu.split(" · ").map((morceau, i) => (
              <span key={morceau} className="whitespace-nowrap">
                {i > 0 && " · "}
                {morceau}
              </span>
            ))}
          </span>
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-auto md:pt-8">
          <Bouton
            href={
              inscriptionsOuvertes && !reserveA ? `${page}#inscription` : page
            }
          >
            {inscriptionsOuvertes && !reserveA ? "S’inscrire" : "Découvrir"}
          </Bouton>
          {!inscriptionsOuvertes && !reserveA && (
            <span className="text-[15px] text-brume">
              Inscriptions bientôt ouvertes
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/** Un événement passé : photo (ou visuel du format), date, titre, lieu. Toute la carte est cliquable. */
function CartePassee({ evenement }: { evenement: Evenement }) {
  const { principal, annee } = dateCourte(evenement);
  const photo = visuel(evenement);

  return (
    <Link
      href={`/evenements/${evenement.slug}`}
      className="group block overflow-hidden rounded-bouton border border-filet bg-white transition-shadow duration-200 hover:shadow-[0_16px_40px_-20px_rgb(6_42_33/0.3)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt=""
            fill
            sizes="(min-width: 1200px) 560px, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <Motif type={evenement.type} />
        )}
      </div>
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="font-titre text-vif-texte">
            <span className="text-2xl tracking-[-0.02em]">{principal}</span>{" "}
            <span className="text-[15px] text-brume">{annee}</span>
          </p>
          <EtiquetteFormat type={evenement.type} />
        </div>
        <h3 className="mt-3 text-xl leading-snug group-hover:underline group-hover:underline-offset-4">
          {evenement.titre}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-[15px]">
          <MapPin aria-hidden className="size-4 shrink-0 text-brume" />
          {evenement.lieu}
        </p>
        <p className="mt-5 flex items-center gap-1.5 text-[15px] font-medium text-sapin">
          Revoir l’événement
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </p>
      </div>
    </Link>
  );
}
