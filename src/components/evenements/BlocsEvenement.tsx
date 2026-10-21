import Image from "next/image";
import {
  Building2,
  HandCoins,
  Rocket,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Grille } from "@/components/ui/Grille";
import { Section, marges, rythme } from "@/components/ui/Section";
import { Surtitre } from "@/components/ui/Titre";
import type { Evenement } from "@/content/site";
import { cx, typo } from "@/lib/utils";

/* ------------------------------------------------------------------
   Blocs facultatifs de la page événement (utilisés par la LEX) :
   chiffres clés, itinéraire, types de rencontres. Ils ne s'affichent
   que si les données correspondantes existent dans site.ts.
   ------------------------------------------------------------------ */

const teintesChiffres = ["bg-menthe", "bg-ciel", "bg-prairie", "bg-citron"];

/**
 * Rangée de chiffres clés en cartes pastel, à poser sur une bande vert sapin
 * (comme les formats de l'accueil). Elle ne dessine que ses cartes : la bande
 * et ses marges sont celles de la page.
 */
export function ChiffresCles({
  chiffres,
}: {
  chiffres: NonNullable<Evenement["chiffres"]>;
}) {
  return (
    <ul
      aria-label="Chiffres clés"
      className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
    >
      {chiffres.map((chiffre, i) => (
        <li
          key={i}
          className={cx(
            "rounded-bouton px-5 py-7 md:px-7 md:py-9",
            teintesChiffres[i % teintesChiffres.length],
          )}
        >
          <p className="font-titre text-[44px] leading-none font-medium tracking-[-0.03em] text-vif-texte md:text-[52px]">
            {chiffre.valeur}
          </p>
          <p className="mt-3 text-[15px] leading-snug text-sapin/85">
            {chiffre.libelle}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Itinéraire : une ligne bordurée par étape, numérotée. */
export function Itineraire({
  etapes,
}: {
  etapes: NonNullable<Evenement["etapes"]>;
}) {
  return (
    <section
      id="itineraire"
      aria-labelledby="itineraire-titre"
      className="mt-16 md:mt-20"
    >
      <Surtitre>
        <span id="itineraire-titre">L’itinéraire</span>
      </Surtitre>
      <ol className="mt-8">
        {etapes.map((etape, i) => (
          <li key={etape.ville} className="relative flex gap-5 pb-9 last:pb-0">
            {/* Le trait qui relie chaque étape à la suivante */}
            {i < etapes.length - 1 && (
              <span
                aria-hidden
                className="absolute top-9 bottom-1 left-[15px] w-0.5 bg-sapin/20"
              />
            )}
            <span
              aria-hidden
              className={cx(
                "relative flex size-8 shrink-0 items-center justify-center rounded-full font-titre text-sm font-medium",
                i === etapes.length - 1
                  ? "bg-vif text-sapin"
                  : "bg-sapin text-white",
              )}
            >
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="font-titre text-xl leading-snug font-medium tracking-[-0.02em] text-sapin">
                {etape.ville}
              </p>
              <p className="mt-1 text-[15px]">{typo(etape.texte)}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-brume">
        Départ et retour à Paris, en train.
      </p>
    </section>
  );
}

const icones: LucideIcon[] = [Rocket, HandCoins, Building2, UserRound];

/** « Le programme » : types de rencontres en cartes, et secteurs visés. */
export function Rencontres({
  rencontres,
  secteurs,
  avecAncre,
}: {
  rencontres: NonNullable<Evenement["rencontres"]>;
  secteurs?: string;
  avecAncre: boolean;
}) {
  return (
    <section
      id={avecAncre ? "programme" : undefined}
      aria-labelledby="rencontres-titre"
      className="mt-16 md:mt-20"
    >
      <Surtitre>
        <span id="rencontres-titre">Le programme</span>
      </Surtitre>
      <p className="mt-3 font-titre text-2xl leading-snug font-medium tracking-[-0.02em] text-sapin">
        Des rencontres choisies par les étudiants.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {rencontres.map((rencontre, i) => {
          const Icone = icones[i % icones.length];
          return (
            <li
              key={rencontre.titre}
              className="rounded-bouton border border-filet p-5 md:p-6"
            >
              <Icone
                aria-hidden
                className="size-5 text-vif-texte"
                strokeWidth={1.75}
              />
              <p className="mt-3 font-medium text-sapin">{rencontre.titre}</p>
              <p className="mt-1 text-[15px]">{typo(rencontre.texte)}</p>
            </li>
          );
        })}
      </ul>
      {secteurs && (
        <p className="mt-6 text-[15px]">
          <span className="font-medium text-sapin">Secteurs visés :</span>{" "}
          {secteurs}
        </p>
      )}
    </section>
  );
}

/** Galerie « En images » : photos espacées, coins arrondis, sur une bande vert sapin. */
export function Galerie({
  photos,
}: {
  photos: NonNullable<Evenement["photos"]>;
}) {
  return (
    <section
      aria-labelledby="galerie-titre"
      className={cx("section-sombre bg-sapin", marges, rythme)}
    >
      <h2
        id="galerie-titre"
        className="text-[28px] leading-tight text-white md:text-[32px]"
      >
        En images
      </h2>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:gap-4">
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            className={cx(
              "relative overflow-hidden rounded-bouton bg-white/10",
              // Nombre impair : la première photo prend toute la largeur, pour ne pas laisser de trou.
              i === 0 && photos.length % 2 === 1
                ? "aspect-[3/2] sm:col-span-2 sm:aspect-[2/1]"
                : "aspect-[3/2]",
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1200px) 540px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

const teintes = ["bg-menthe", "bg-ciel", "bg-prairie", "bg-citron/50"];

/** Thématiques : cartes pastel dans la colonne de gauche. */
export function Thematiques({
  thematiques,
}: {
  thematiques: NonNullable<Evenement["thematiques"]>;
}) {
  return (
    <section aria-labelledby="thematiques-titre" className="mt-16 md:mt-20">
      <Surtitre>
        <span id="thematiques-titre">Les thématiques</span>
      </Surtitre>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {thematiques.map((theme, i) => (
          <li
            key={theme.titre}
            className={cx(
              "rounded-bouton p-5 md:p-6",
              teintes[i % teintes.length],
            )}
          >
            <p className="font-titre text-xl leading-snug font-medium tracking-[-0.02em] text-sapin">
              {theme.titre}
            </p>
            {theme.texte && (
              <p className="mt-1 text-[15px]">{typo(theme.texte)}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Intervenants et jury : cases bordurées avec nom et rôle. */
export function Intervenants({
  intervenants,
  note,
}: {
  intervenants: NonNullable<Evenement["intervenants"]>;
  note?: string;
}) {
  return (
    <Section titreId="intervenants-titre">
      <h2
        id="intervenants-titre"
        className="text-[28px] leading-tight md:text-[32px]"
      >
        Intervenants et jury
      </h2>
      <Grille colonnes="sm:grid-cols-2 lg:grid-cols-3" cadre className="mt-8">
        {intervenants.map((personne) => (
          <li key={personne.nom} className="px-6 py-6 md:px-7">
            <p className="font-titre text-xl font-medium tracking-[-0.02em] text-sapin">
              {personne.nom}
            </p>
            {personne.role && (
              <p className="mt-1 text-[15px] text-brume">{personne.role}</p>
            )}
          </li>
        ))}
      </Grille>
      {note && <p className="mt-5 text-[15px]">{typo(note)}</p>}
    </Section>
  );
}

/** Partenaires de l'événement : logo si disponible, sinon le nom. */
export function PartenairesEvenement({
  partenaires,
}: {
  partenaires: NonNullable<Evenement["partenaires"]>;
}) {
  return (
    <Section titreId="partenaires-evenement-titre">
      <h2
        id="partenaires-evenement-titre"
        className="text-[28px] leading-tight md:text-[32px]"
      >
        Partenaires
      </h2>
      <Grille colonnes="grid-cols-2 md:grid-cols-3" cadre className="mt-8">
        {partenaires.map((partenaire) => (
          <li
            key={partenaire.nom}
            className="flex h-28 items-center justify-center px-5 text-center md:h-32"
          >
            {partenaire.logo ? (
              <div className="relative h-14 w-[72%] md:h-16">
                <Image
                  src={partenaire.logo}
                  alt={partenaire.nom}
                  fill
                  sizes="220px"
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="font-titre text-xl font-medium tracking-[-0.02em] text-sapin md:text-2xl">
                {partenaire.nom}
              </span>
            )}
          </li>
        ))}
      </Grille>
    </Section>
  );
}
