import { Grille } from "@/components/ui/Grille";
import { EnTeteSection, Section, ecart } from "@/components/ui/Section";
import { pages } from "@/content/site";

/** Bloc « Les éditions précédentes » : les équipes qui ont organisé les éditions passées. */
export function EditionsPrecedentes() {
  const { editions } = pages.equipe;

  return (
    <Section titreId="editions-titre">
      <EnTeteSection
        id="editions-titre"
        surtitre={editions.surtitre}
        titre={editions.titre}
        titreSuite={editions.titreSuite}
      />

      <div className={ecart}>
        {editions.liste.map((edition) => (
          <div
            key={edition.libelle}
            data-reveal="monte"
            className="overflow-hidden rounded-bouton border border-filet [&+&]:mt-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-filet bg-voile px-5 py-4 md:px-7">
              <h3 className="text-lg">{edition.libelle}</h3>
              <p className="text-[15px] text-brume">
                À l’organisation ·{" "}
                <span className="text-vif-texte">{edition.date}</span>
              </p>
            </div>

            <Grille
              colonnes="grid-cols-2 md:grid-cols-4"
              ariaLabel={`Organisation : ${edition.libelle}`}
            >
              {edition.organisation.map((nom) => (
                <li
                  key={nom}
                  className="flex min-h-20 items-center px-5 py-5 md:px-7"
                >
                  <span className="font-titre text-base leading-snug font-medium tracking-[-0.02em] text-sapin sm:text-lg">
                    {nom}
                  </span>
                </li>
              ))}
              {edition.organisation.length % 4 !== 0 && (
                <li
                  aria-hidden
                  className="hidden bg-voile md:block"
                  style={{ gridColumn: "span 1" }}
                />
              )}
            </Grille>
          </div>
        ))}
      </div>
    </Section>
  );
}
