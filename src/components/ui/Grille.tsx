import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

type Props = {
  children: ReactNode;
  /** Colonnes de la grille, par exemple 'grid-cols-2 md:grid-cols-4'. */
  colonnes?: string;
  /** Ajoute un cadre complet (quand la grille ne touche pas les bords de la colonne). */
  cadre?: boolean;
  className?: string;
  /** Étiquette lue par les lecteurs d'écran. */
  ariaLabel?: string;
  /** Les cases apparaissent l'une après l'autre quand la grille entre à l'écran. */
  apparition?: boolean;
};

/**
 * Grille de cases séparées par des filets de 1 px, sans espace entre elles.
 * Chaque enfant doit être un <li>. Les filets du bord droit et du bas sont
 * masqués : ce sont les bords de la colonne ou de la section qui les dessinent.
 */
export function Grille({ children, colonnes, cadre, className, ariaLabel, apparition }: Props) {
  return (
    <div className={cx('overflow-hidden', cadre && 'rounded-bouton border border-filet', className)}>
      <ul
        aria-label={ariaLabel}
        data-reveal={apparition ? 'liste' : undefined}
        className={cx(
          '-mr-px -mb-px grid *:border-r *:border-b *:border-filet',
          colonnes,
        )}
      >
        {children}
      </ul>
    </div>
  );
}
