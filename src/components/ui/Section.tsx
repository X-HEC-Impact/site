import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

/** Marges intérieures standard d'une section (réutilisables ailleurs). */
export const marges = 'px-5 md:px-10 lg:px-14';

type Props = {
  children: ReactNode;
  id?: string;
  /** id du titre de la section, pour l'accessibilité. */
  titreId?: string;
  /** false pour une section dont le contenu touche les bords de la colonne (grilles). */
  avecMarges?: boolean;
  className?: string;
};

/**
 * Une bande de la page. Chaque section se termine par un filet horizontal
 * qui touche les deux filets verticaux de la colonne.
 */
export function Section({ children, id, titreId, avecMarges = true, className }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={titreId}
      className={cx('border-b border-filet', avecMarges && cx(marges, 'py-16 md:py-24'), className)}
    >
      {children}
    </section>
  );
}
