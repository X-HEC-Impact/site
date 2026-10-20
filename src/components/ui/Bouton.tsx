import type { ReactNode } from 'react';
import { Lien } from './Lien';
import { cx } from '@/lib/utils';

type Variante = 'principal' | 'contour' | 'noir';
type Taille = 'normal' | 'petit';

const variantes: Record<Variante, string> = {
  // Vert vif, texte vert sapin : l'action principale de la section.
  principal: 'bg-vif text-sapin hover:bg-[#3ccd8a]',
  // Blanc, contour gris-vert : l'action secondaire.
  contour: 'bg-white text-sapin border border-filet hover:border-brume',
  // Noir : uniquement le bouton « S'inscrire » du menu.
  noir: 'bg-black text-white hover:bg-sapin',
};

const tailles: Record<Taille, string> = {
  normal: 'h-11 px-5 text-[15px]',
  petit: 'h-9 px-3.5 text-sm',
};

export function classesBouton(variante: Variante = 'principal', taille: Taille = 'normal') {
  return cx(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-bouton font-medium transition-colors duration-200',
    variantes[variante],
    tailles[taille],
  );
}

type Props = {
  href: string;
  variante?: Variante;
  taille?: Taille;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

/** Bouton qui est un lien (la grande majorité des boutons du site). */
export function Bouton({ href, variante, taille, className, onClick, children }: Props) {
  return (
    <Lien href={href} onClick={onClick} className={cx(classesBouton(variante, taille), className)}>
      {children}
    </Lien>
  );
}
