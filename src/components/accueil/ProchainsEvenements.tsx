import { CalendarDays } from 'lucide-react';
import { CelluleEvenement } from '@/components/evenements/CelluleEvenement';
import { Grille } from '@/components/ui/Grille';
import { LienFleche } from '@/components/ui/LienFleche';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil } from '@/content/site';
import { getEvenements } from '@/lib/evenements';
import { cx } from '@/lib/utils';

const NOMBRE_MAX = 3;

export async function ProchainsEvenements() {
  const { aVenir } = await getEvenements();
  const affiches = aVenir.slice(0, NOMBRE_MAX);

  return (
    <section aria-labelledby="agenda-titre" className="border-b border-filet">
      <div
        className={cx(
          marges,
          'apparition flex flex-col gap-6 py-16 md:flex-row md:items-end md:justify-between md:py-20',
        )}
      >
        <div>
          <Surtitre>{accueil.agenda.surtitre}</Surtitre>
          <Titre id="agenda-titre" debut={accueil.agenda.titre} suite={accueil.agenda.titreSuite} className="mt-4" />
        </div>
        <LienFleche href="/evenements">Tous les événements</LienFleche>
      </div>

      <div className="border-t border-filet">
        <Grille colonnes="md:grid-cols-3">
          {affiches.map((evenement) => (
            <li key={evenement.slug}>
              <CelluleEvenement evenement={evenement} />
            </li>
          ))}

          {/* S'il reste de la place, une case renvoie vers l'agenda complet. */}
          {affiches.length < NOMBRE_MAX && (
            <li className="bg-voile">
              <div className="flex h-full flex-col p-6 md:p-8">
                <CalendarDays aria-hidden className="size-6 text-brume" strokeWidth={1.5} />
                <p className="mt-6 font-titre text-xl leading-snug font-medium tracking-[-0.02em] text-sapin">
                  {affiches.length === 0
                    ? 'Les prochaines dates arrivent bientôt.'
                    : 'D’autres rendez-vous se préparent.'}
                </p>
                <p className="mt-2 text-[15px]">Retrouvez aussi nos événements passés dans l’agenda.</p>
                <div className="mt-auto pt-8 text-[15px]">
                  <LienFleche href="/evenements">Voir l’agenda</LienFleche>
                </div>
              </div>
            </li>
          )}
        </Grille>
      </div>
    </section>
  );
}
