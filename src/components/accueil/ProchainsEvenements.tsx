import { CalendarDays } from 'lucide-react';
import { CelluleEvenement } from '@/components/evenements/CelluleEvenement';
import { Grille } from '@/components/ui/Grille';
import { LienFleche } from '@/components/ui/LienFleche';
import { EnTeteSection, Section, ecart } from '@/components/ui/Section';
import { accueil } from '@/content/site';
import { getEvenements } from '@/lib/evenements';
import { cx } from '@/lib/utils';

const NOMBRE_MAX = 3;

export async function ProchainsEvenements() {
  const { aVenir } = await getEvenements();
  const affiches = aVenir.slice(0, NOMBRE_MAX);

  return (
    <Section titreId="agenda-titre" className="bg-ciel">
      <EnTeteSection
        id="agenda-titre"
        titre={accueil.agenda.titre}
        titreSuite={accueil.agenda.titreSuite}
        lien={{ href: '/evenements', libelle: 'Tous les événements' }}
      />

      <Grille colonnes="md:grid-cols-3" cadre className={cx(ecart, 'bg-white')}>
        {affiches.map((evenement) => (
          <li key={evenement.slug}>
            <CelluleEvenement evenement={evenement} />
          </li>
        ))}

        {/* S'il reste de la place, une case renvoie vers l'agenda complet. */}
        {affiches.length < NOMBRE_MAX && (
          <li className={cx('bg-voile', affiches.length === 1 && 'md:col-span-2', affiches.length === 0 && 'md:col-span-3')}>
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
    </Section>
  );
}
