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
        'grid gap-8 border-b border-filet pt-20 pb-16 md:grid-cols-12 md:items-end md:gap-12 md:pt-28 md:pb-24',
      )}
    >
      <div className="md:col-span-7">
        <Surtitre>{surtitre}</Surtitre>
        <Titre niveau="h1" debut={titre} suite={titreSuite} className="mt-6" />
      </div>
      {description && (
        <p className="max-w-md text-[17px] leading-relaxed md:col-span-5 md:justify-self-end">{typo(description)}</p>
      )}
    </header>
  );
}
