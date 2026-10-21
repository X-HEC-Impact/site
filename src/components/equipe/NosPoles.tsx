import { UsersRound } from 'lucide-react';
import { EnTeteSection, Section, ecart } from '@/components/ui/Section';
import { pages } from '@/content/site';
import { cx, typo } from '@/lib/utils';

// Les cartes reprennent les teintes pastel du site, dans l'ordre.
const teintes = ['bg-menthe', 'bg-ciel', 'bg-lavande', 'bg-citron/50'];

/** Bloc « Nos pôles » : une carte pastel par pôle, espacées. */
export function NosPoles() {
  const { poles } = pages.equipe;

  return (
    <Section titreId="poles-titre">
      <EnTeteSection id="poles-titre" surtitre={poles.surtitre} titre={poles.titre} titreSuite={poles.titreSuite} />

      <ul className={cx('apparition grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5', ecart)}>
        {poles.liste.map((pole, index) => (
          <li key={index} className={cx('flex flex-col rounded-bouton p-6 lg:p-8', teintes[index % teintes.length])}>
            <h3 className="text-2xl">{pole.nom}</h3>
            <p className="mt-3 flex-1">{typo(pole.description)}</p>
            <p className="mt-8 flex items-start gap-2 border-t border-sapin/15 pt-4 text-[15px] font-medium text-sapin">
              <UsersRound aria-hidden className="mt-0.5 size-4 shrink-0" />
              {pole.membres}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
