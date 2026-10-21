import type { ReactNode } from 'react';
import { Lien } from './Lien';
import { cx } from '@/lib/utils';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Lien texte souligné d'un trait vert qui se remplit au survol (sans flèche). */
export function LienFleche({ href, children, className }: Props) {
  return (
    <Lien href={href} className={cx('lien-trait font-medium text-sapin', className)}>
      {children}
    </Lien>
  );
}
