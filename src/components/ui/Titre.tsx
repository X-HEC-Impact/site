import type { ReactNode } from 'react';
import { cx, typo } from '@/lib/utils';

const soigne = (texte: ReactNode) => (typeof texte === 'string' ? typo(texte) : texte);

type Props = {
  /** Première partie, en vert sapin (ou blanc sur fond sombre). */
  debut: ReactNode;
  /** Suite du titre, en gris-vert plus clair. */
  suite?: ReactNode;
  niveau?: 'h1' | 'h2' | 'h3';
  /** À mettre dans une section sombre (fond sapin). */
  sombre?: boolean;
  id?: string;
  className?: string;
};

/**
 * Titre en deux tons, signature visuelle du site :
 * « Trois formats. **Un même objectif.** »
 */
export function Titre({ debut, suite, niveau = 'h2', sombre, id, className }: Props) {
  const Balise = niveau;
  const taille = niveau === 'h1' ? 'titre-h1' : niveau === 'h2' ? 'titre-h2' : 'text-2xl';

  return (
    <Balise id={id} className={cx(taille, sombre && 'text-white', className)}>
      {soigne(debut)}
      {suite && (
        <>
          {' '}
          <span className={sombre ? 'text-lichen' : 'text-brume'}>{soigne(suite)}</span>
        </>
      )}
    </Balise>
  );
}

/** Petit texte en capitales espacées au-dessus d'un titre ou d'une grille. */
export function Surtitre({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('surtitre', className)}>{children}</p>;
}
