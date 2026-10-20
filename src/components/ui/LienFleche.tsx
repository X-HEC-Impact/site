import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Lien } from './Lien';
import { cx } from '@/lib/utils';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Lien texte suivi d'une flèche qui glisse au survol : « S'inscrire → ». */
export function LienFleche({ href, children, className }: Props) {
  return (
    <Lien
      href={href}
      className={cx(
        'group inline-flex items-center gap-1.5 font-medium text-sapin underline-offset-4 hover:underline',
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Lien>
  );
}
