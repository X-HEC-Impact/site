import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { Bouton } from "@/components/ui/Bouton";
import { EnTeteSection, Section, ecart } from "@/components/ui/Section";
import type { Soutien as DonneesSoutien } from "@/content/site";
import { cx, typo } from "@/lib/utils";

/** « 34 % » → 34 (pour la largeur de la barre) ; 0 si le texte n'est pas un pourcentage. */
function pourcentage(part: string) {
  const n = parseFloat(part.replace(",", "."));
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), 100) : 0;
}

/** Barre fine qui visualise la part d'un poste du budget. */
function BarrePart({ part, className }: { part: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        "block h-1.5 overflow-hidden rounded-full bg-menthe",
        className,
      )}
    >
      <span
        data-barre
        className="block h-full rounded-full bg-vif"
        style={{ width: `${pourcentage(part)}%` }}
      />
    </span>
  );
}

/**
 * Bloc « Soutenir le projet », dans l'ordre où un partenaire se décide :
 * les niveaux (quoi choisir), ce que ça apporte, où va l'argent, puis le contact.
 */
export function Soutien({ soutien }: { soutien: DonneesSoutien }) {
  const { budget, total, avantages, niveaux, note, contact } = soutien;
  const objet = (suffixe?: string) =>
    encodeURIComponent(
      suffixe
        ? `Partenariat LEX Europe : ${suffixe}`
        : "Partenariat LEX Europe",
    );
  const mailto = (suffixe?: string) =>
    `mailto:${contact.email}?subject=${objet(suffixe)}`;

  return (
    <Section id="soutenir" titreId="soutenir-titre">
      <EnTeteSection
        id="soutenir-titre"
        surtitre="Soutenir le projet"
        titre={soutien.titre}
        titreSuite={soutien.titreSuite}
        intro={soutien.intro}
      />

      {/* 1. Les niveaux : l'essentiel, tout de suite */}
      <h3 id="niveaux-titre" className={cx("text-2xl", ecart)}>
        Quatre niveaux de partenariat
      </h3>
      <ul
        aria-labelledby="niveaux-titre"
        data-reveal="liste"
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch"
      >
        {niveaux.map((niveau, i) => {
          const principal = i === niveaux.length - 1;
          return (
            <li
              key={niveau.nom}
              className={cx(
                "flex flex-col rounded-bouton p-6 transition-transform duration-300 hover:-translate-y-1 lg:p-7",
                principal
                  ? "section-sombre bg-sapin text-white/80 shadow-[0_20px_40px_-24px_rgb(6_42_33/0.6)]"
                  : "border border-filet bg-white",
              )}
            >
              <p
                className={cx(
                  "font-medium",
                  principal ? "text-white" : "text-sapin",
                )}
              >
                {niveau.nom}
              </p>
              <p
                className={cx(
                  "mt-3 font-titre text-[40px] leading-none font-medium tracking-[-0.03em] tabular-nums",
                  principal ? "text-vif" : "text-vif-texte",
                )}
              >
                {niveau.montant}
              </p>
              {i > 0 && (
                <p
                  className={cx(
                    "mt-3 text-sm",
                    principal ? "text-lichen" : "text-brume",
                  )}
                >
                  Inclut les avantages précédents
                </p>
              )}
              <ul
                className={cx(
                  "mt-5 space-y-3 border-t pt-5 text-[15px]",
                  principal ? "border-white/15" : "border-filet",
                )}
              >
                {niveau.avantages.map((avantage) => (
                  <li key={avantage} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden
                      className={cx(
                        "mt-1 size-4 shrink-0",
                        principal ? "text-vif" : "text-vif-texte",
                      )}
                    />
                    {typo(avantage)}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <a
                  href={mailto(niveau.nom)}
                  className={cx(
                    "group/choix flex items-center justify-between gap-2 rounded-bouton px-4 py-3 text-[15px] font-medium transition-colors",
                    principal
                      ? "bg-vif text-sapin hover:bg-white"
                      : "border border-sapin/25 text-sapin hover:border-sapin hover:bg-voile",
                  )}
                >
                  Choisir cette offre
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover/choix:translate-x-0.5"
                  />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      {note && (
        <p className="mt-5 max-w-3xl text-[15px] text-brume">{typo(note)}</p>
      )}

      {/* 2. Ce que le partenariat apporte */}
      <h3 className="mt-16 text-2xl md:mt-20">
        Ce que vous apporte ce partenariat
      </h3>
      <ul data-reveal="liste" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {avantages.map((avantage) => (
          <li
            key={avantage.titre}
            className="rounded-bouton border border-filet bg-voile p-5 md:p-6"
          >
            <p className="font-medium text-sapin">{avantage.titre}</p>
            <p className="mt-2 text-[15px]">{typo(avantage.texte)}</p>
          </li>
        ))}
      </ul>

      {/* 3. Le budget : où va l'argent */}
      <h3 className="mt-16 text-2xl md:mt-20">Budget prévisionnel</h3>

      {/* Sur mobile : une carte par poste, le total en dernier */}
      <div data-reveal="barres" className="mt-6 md:hidden">
        <ul className="overflow-hidden rounded-bouton border border-filet text-[15px]">
          {budget.map((ligne) => (
            <li key={ligne.poste} className="border-b border-filet px-5 py-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-medium text-sapin">{ligne.poste}</p>
                <p className="whitespace-nowrap text-sapin tabular-nums">
                  {ligne.montant}
                </p>
              </div>
              <p className="mt-1">{ligne.couvre}</p>
              <div className="mt-3 flex items-center gap-3">
                <BarrePart part={ligne.part} className="flex-1" />
                <p className="text-sm whitespace-nowrap tabular-nums text-brume">
                  {ligne.part}
                </p>
              </div>
            </li>
          ))}
          <li className="section-sombre flex items-baseline justify-between gap-4 bg-sapin px-5 py-4 text-white">
            <p className="font-medium">Total</p>
            <p className="font-medium whitespace-nowrap text-vif tabular-nums">
              {total.montant}
            </p>
          </li>
        </ul>
      </div>

      {/* À partir de 768 px : le tableau, avec une barre dans la colonne « Part » */}
      <div data-reveal="barres" className="mt-6 hidden overflow-hidden rounded-bouton border border-filet md:block">
        <table className="w-full border-collapse text-left text-[15px]">
          <caption className="sr-only">Budget prévisionnel</caption>
          <thead className="bg-voile text-sapin">
            <tr className="border-b border-filet">
              <th scope="col" className="px-5 py-3.5 font-medium md:px-6">
                Poste
              </th>
              <th scope="col" className="px-5 py-3.5 font-medium md:px-6">
                Ce que ça couvre
              </th>
              <th
                scope="col"
                className="px-5 py-3.5 text-right font-medium md:px-6"
              >
                Montant
              </th>
              <th scope="col" className="w-56 px-5 py-3.5 font-medium md:px-6">
                Part
              </th>
            </tr>
          </thead>
          <tbody>
            {budget.map((ligne) => (
              <tr key={ligne.poste} className="border-b border-filet">
                <th
                  scope="row"
                  className="px-5 py-4 font-medium text-sapin md:px-6"
                >
                  {ligne.poste}
                </th>
                <td className="px-5 py-4 md:px-6">{ligne.couvre}</td>
                <td className="px-5 py-4 text-right whitespace-nowrap text-sapin tabular-nums md:px-6">
                  {ligne.montant}
                </td>
                <td className="px-5 py-4 md:px-6">
                  <span className="flex items-center gap-3">
                    <BarrePart part={ligne.part} className="flex-1" />
                    <span className="w-10 text-right tabular-nums">
                      {ligne.part}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="section-sombre bg-sapin text-white">
            <tr>
              <th
                scope="row"
                colSpan={2}
                className="px-5 py-4 font-medium md:px-6"
              >
                Total
              </th>
              <td className="px-5 py-4 text-right font-medium whitespace-nowrap text-vif tabular-nums md:px-6">
                {total.montant}
              </td>
              <td className="px-5 py-4 text-right tabular-nums md:px-6">
                {total.part}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 4. Contact */}
      <div data-reveal="monte" className="mt-16 flex flex-col gap-8 rounded-bouton bg-menthe p-6 md:mt-20 md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <p className="font-titre text-2xl font-medium tracking-[-0.02em] text-sapin">
            Parlons de votre engagement
          </p>
          <p className="mt-2">
            <span className="font-medium text-sapin">{contact.nom}</span>,{" "}
            {contact.role}
          </p>
          <ul className="mt-4 space-y-1.5 text-[15px]">
            <li>
              <a
                href={mailto()}
                className="inline-flex items-center gap-2 text-sapin hover:underline hover:underline-offset-4"
              >
                <Mail aria-hidden className="size-4" />
                {contact.email}
              </a>
            </li>
            {contact.telephone && (
              <li>
                <a
                  href={`tel:${contact.telephone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-sapin hover:underline hover:underline-offset-4"
                >
                  <Phone aria-hidden className="size-4" />
                  {contact.telephone}
                </a>
              </li>
            )}
          </ul>
        </div>
        <Bouton href={mailto()} className="self-start md:self-center">
          Devenir partenaire
        </Bouton>
      </div>
    </Section>
  );
}
