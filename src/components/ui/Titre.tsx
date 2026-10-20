import type { ReactNode } from 'react';
import { cx, typo } from '@/lib/utils';

/** Applique la typographie française et, si demandé, surligne un mot en vert citron. */
function soigne(texte: ReactNode, surligne?: string) {
  if (typeof texte !== 'string') return texte;
  const propre = typo(texte);
  const position = surligne ? propre.indexOf(surligne) : -1;
  if (!surligne || position === -1) return propre;
  return (
    <>
      {propre.slice(0, position)}
      <mark className="surlignage">{surligne}</mark>
      {propre.slice(position + surligne.length)}
    </>
  );
}

type Props = {
  /** Première partie, en vert sapin (ou blanc sur fond sombre). */
  debut: ReactNode;
  /** Suite du titre, en gris-vert plus clair. */
  suite?: ReactNode;
  /** Mot à surligner en vert citron, par exemple 'impact'. À utiliser avec parcimonie. */
  surligne?: string;
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
export function Titre({ debut, suite, surligne, niveau = 'h2', sombre, id, className }: Props) {
  const Balise = niveau;
  const taille = niveau === 'h1' ? 'titre-h1' : niveau === 'h2' ? 'titre-h2' : 'text-2xl';

  return (
    <Balise id={id} className={cx(taille, sombre && 'text-white', className)}>
      {soigne(debut, surligne)}
      {suite && (
        <>
          {' '}
          <span className={sombre ? 'text-lichen' : 'text-brume'}>{soigne(suite, surligne)}</span>
        </>
      )}
    </Balise>
  );
}

/** Petit texte en capitales espacées au-dessus d'un titre ou d'une grille. */
export function Surtitre({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('surtitre', className)}>{children}</p>;
}
