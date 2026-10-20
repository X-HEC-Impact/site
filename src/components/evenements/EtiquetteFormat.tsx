import { formats, type FormatEvenement } from '@/content/site';
import { cx } from '@/lib/utils';

/** Couleur pastel associée à chaque format (cartes, étiquettes). */
export const fondFormat: Record<FormatEvenement, string> = {
  lex: 'bg-menthe',
  conference: 'bg-ciel',
  hackathon: 'bg-lavande',
};

export function EtiquetteFormat({ type, className }: { type: FormatEvenement; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs leading-none font-medium text-sapin',
        fondFormat[type],
        className,
      )}
    >
      {formats[type].etiquette}
    </span>
  );
}
