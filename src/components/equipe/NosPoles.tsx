import { UsersRound } from 'lucide-react';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { pages } from '@/content/site';
import { cx, typo } from '@/lib/utils';

// Les cartes reprennent les teintes pastel du site, dans l'ordre.
const teintes = ['bg-menthe', 'bg-ciel', 'bg-lavande'];

/** Bloc « Nos pôles » : une carte pastel par pôle. */
export function NosPoles() {
  const { poles } = pages.equipe;

  return (
    <section aria-labelledby="poles-titre" className={cx('border-b border-filet py-16 md:py-24', marges)}>
      <div className="apparition">
        <Surtitre>{poles.surtitre}</Surtitre>
        <Titre id="poles-titre" debut={poles.titre} suite={poles.titreSuite} className="mt-4" />
      </div>

      <ul className="apparition mt-12 grid gap-px overflow-hidden rounded-bouton md:mt-14 md:grid-cols-3">
        {poles.liste.map((pole, index) => (
          <li key={index} className={cx('flex flex-col p-6 lg:p-8', teintes[index % teintes.length])}>
            <h3 className="text-2xl">{pole.nom}</h3>
            <p className="mt-2 flex-1">{typo(pole.description)}</p>
            <p className="mt-6 flex items-start gap-2 border-t border-sapin/15 pt-4 text-[15px] font-medium text-sapin">
              <UsersRound aria-hidden className="mt-0.5 size-4 shrink-0" />
              {pole.membres}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
