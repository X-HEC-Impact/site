import { Grille } from '@/components/ui/Grille';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { pages } from '@/content/site';
import { cx } from '@/lib/utils';

/** Bloc « Les éditions précédentes » : les équipes qui ont organisé les éditions passées. */
export function EditionsPrecedentes() {
  const { editions } = pages.equipe;

  return (
    <section aria-labelledby="editions-titre" className="border-b border-filet">
      <div className={cx(marges, 'apparition py-16 md:py-20')}>
        <Surtitre>{editions.surtitre}</Surtitre>
        <Titre id="editions-titre" debut={editions.titre} suite={editions.titreSuite} className="mt-4" />
      </div>

      {editions.liste.map((edition) => (
        <div key={edition.libelle} className="border-t border-filet">
          <div
            className={cx(
              marges,
              'flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-filet bg-voile py-4',
            )}
          >
            <h3 className="text-lg">{edition.libelle}</h3>
            <p className="text-[15px] text-brume">
              À l’organisation · <span className="text-vif-texte">{edition.date}</span>
            </p>
          </div>

          <Grille colonnes="grid-cols-2 md:grid-cols-4" ariaLabel={`Organisation : ${edition.libelle}`}>
            {edition.organisation.map((nom) => (
              <li key={nom} className="flex min-h-20 items-center px-5 py-4 md:px-8">
                <span className="font-titre text-base leading-snug font-medium tracking-[-0.02em] text-sapin sm:text-lg">
                  {nom}
                </span>
              </li>
            ))}
          </Grille>
        </div>
      ))}
    </section>
  );
}
