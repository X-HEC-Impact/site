import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { CelluleEvenement } from '@/components/evenements/CelluleEvenement';
import { EtiquetteFormat } from '@/components/evenements/EtiquetteFormat';
import { Grille } from '@/components/ui/Grille';
import { LienFleche } from '@/components/ui/LienFleche';
import { marges, rythme } from '@/components/ui/Section';
import { formats, type Evenement, type FormatEvenement } from '@/content/site';
import { dateCourte } from '@/lib/dates';
import { cx } from '@/lib/utils';

export type Filtre = 'tous' | FormatEvenement;

type Props = {
  aVenir: Evenement[];
  passes: Evenement[];
  filtre: Filtre;
};

const onglets: { cle: Filtre; libelle: string }[] = [
  { cle: 'tous', libelle: 'Tous' },
  ...(Object.keys(formats) as FormatEvenement[]).map((cle) => ({
    cle,
    libelle: cle === 'hackathon' ? 'Hackathon' : formats[cle].nom,
  })),
];

/**
 * L'agenda : onglets de filtre, grille « À venir », liste « Événements passés ».
 * Le filtre vient de l'adresse (/evenements?format=lex) : chaque onglet est un simple lien.
 */
export function Agenda({ aVenir, passes, filtre }: Props) {
  const garde = (e: Evenement) => filtre === 'tous' || e.type === filtre;
  const aVenirFiltres = aVenir.filter(garde);
  const passesFiltres = passes.filter(garde);

  return (
    <>
      <section aria-labelledby="a-venir-titre" className={cx('border-b border-filet', marges, rythme)}>
        {/* Onglets de filtre */}
        <nav aria-label="Filtrer par format">
          <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
            {onglets.map(({ cle, libelle }) => {
              const actif = filtre === cle;
              return (
                <li key={cle} className="shrink-0">
                  <Link
                    href={cle === 'tous' ? '/evenements' : `/evenements?format=${cle}`}
                    scroll={false}
                    aria-current={actif ? 'true' : undefined}
                    className={cx(
                      'inline-flex h-10 items-center rounded-bouton px-4 text-sm font-medium whitespace-nowrap transition-colors',
                      actif ? 'bg-sapin text-white' : 'border border-filet text-ardoise hover:border-brume hover:text-sapin',
                    )}
                  >
                    {libelle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* À venir */}
        <h2 id="a-venir-titre" className="mt-14 text-[28px] leading-tight md:mt-16 md:text-[32px]">
          À venir
        </h2>
        <div className="mt-8">
          {aVenirFiltres.length > 0 ? (
            <Grille colonnes="md:grid-cols-3" cadre>
              {aVenirFiltres.map((evenement) => (
                <li key={evenement.slug}>
                  <CelluleEvenement evenement={evenement} />
                </li>
              ))}
              {/* Sur ordinateur, une case complète la dernière ligne de la grille. */}
              {aVenirFiltres.length % 3 !== 0 && (
                <li className="hidden bg-voile md:block">
                  <div className="flex h-full flex-col p-8">
                    <CalendarDays aria-hidden className="size-6 text-brume" strokeWidth={1.5} />
                    <p className="mt-6 font-titre text-xl leading-snug font-medium tracking-[-0.02em] text-sapin">
                      D’autres rendez-vous se préparent.
                    </p>
                    <p className="mt-2 text-[15px]">Revenez bientôt pour découvrir les prochaines dates.</p>
                  </div>
                </li>
              )}
            </Grille>
          ) : (
            <div className="flex flex-col items-start gap-4 rounded-bouton bg-voile p-8 md:p-10">
              <CalendarDays aria-hidden className="size-6 text-brume" strokeWidth={1.5} />
              <p className="font-titre text-xl font-medium tracking-[-0.02em] text-sapin">
                Aucun événement à venir dans ce format pour l’instant.
              </p>
              <LienFleche href="/evenements">Voir tous les événements</LienFleche>
            </div>
          )}
        </div>
      </section>

      {/* Passés */}
      {passesFiltres.length > 0 && (
        <section aria-labelledby="passes-titre" className={cx('border-b border-filet', marges, rythme)}>
          <h2 id="passes-titre" className="text-[28px] leading-tight md:text-[32px]">
            Événements passés
          </h2>
          <ul className="mt-8 overflow-hidden rounded-bouton border border-filet">
            {passesFiltres.map((evenement) => (
              <li key={evenement.slug} className="border-b border-filet last:border-b-0">
                <LignePassee evenement={evenement} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

/** Une ligne bordurée : date · titre · lieu · format. Toute la ligne est cliquable. */
function LignePassee({ evenement }: { evenement: Evenement }) {
  const { principal, annee } = dateCourte(evenement);

  return (
    <Link
      href={`/evenements/${evenement.slug}`}
      className="group grid gap-x-6 gap-y-2 px-6 py-6 transition-colors hover:bg-voile md:grid-cols-12 md:items-center md:px-8 md:py-7"
    >
      <p className="font-titre text-vif-texte md:col-span-2">
        <span className="text-2xl tracking-[-0.02em]">{principal}</span>{' '}
        <span className="text-[15px] text-brume">{annee}</span>
      </p>
      <p className="font-titre text-xl leading-snug font-medium tracking-[-0.02em] text-sapin group-hover:underline group-hover:underline-offset-4 md:col-span-4">
        {evenement.titre}
      </p>
      <p className="flex items-center gap-1.5 text-[15px] md:col-span-3">
        <MapPin aria-hidden className="size-4 shrink-0 text-brume" />
        {evenement.lieu}
      </p>
      <div className="flex items-center justify-between gap-4 md:col-span-3">
        <EtiquetteFormat type={evenement.type} />
        <ArrowRight
          aria-hidden
          className="size-5 text-sapin transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
