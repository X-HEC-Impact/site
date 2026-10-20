import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { cx, typo } from '@/lib/utils';

type Props = {
  surtitre: string;
  titre: string;
  titreSuite?: string;
  description?: string;
};

/**
 * En-tête commun aux pages intérieures (Événements, Équipe, Contact) :
 * surtitre, grand titre en deux tons à gauche, phrase d'introduction à droite.
 */
export function EnTetePage({ surtitre, titre, titreSuite, description }: Props) {
  return (
    <header
      className={cx(
        marges,
        'grid gap-6 border-b border-filet pt-16 pb-14 md:grid-cols-12 md:items-end md:gap-10 md:pt-24 md:pb-20',
      )}
    >
      <div className="md:col-span-7">
        <Surtitre>{surtitre}</Surtitre>
        <Titre niveau="h1" debut={titre} suite={titreSuite} className="mt-5" />
      </div>
      {description && (
        <p className="max-w-md text-[17px] md:col-span-5 md:justify-self-end">{typo(description)}</p>
      )}
    </header>
  );
}
