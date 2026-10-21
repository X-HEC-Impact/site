import Link from 'next/link';
import { cx } from '@/lib/utils';

/**
 * Pictogramme du logo : un point d'où partent trois ondes qui s'éloignent
 * (la prise de parole, la rencontre, l'impact). Couleurs d'origine du logo.
 */
export function Marque({ className }: { className?: string }) {
  return (
    <svg viewBox="-60 -80 140 140" aria-hidden className={cx('size-9 shrink-0', className)}>
      <circle r="14.5" fill="#7fd28a" />
      <g fill="none" strokeWidth="10" strokeLinecap="round">
        <path d="M-24.75 -24.75A35 35 0 0 1 24.75 24.75" stroke="#7fd28a" />
        <path d="M-38.89 -38.89A55 55 0 0 1 38.89 38.89" stroke="#5aa469" />
        <path d="M-52.33 -52.33A74 74 0 0 1 52.33 52.33" stroke="#3e7750" />
      </g>
    </svg>
  );
}

export function Logo({ className, sombre }: { className?: string; sombre?: boolean }) {
  return (
    <Link
      href="/"
      className={cx('inline-flex items-center gap-2.5', sombre ? 'text-white' : 'text-sapin', className)}
      aria-label="X-HEC Impact, retour à l'accueil"
    >
      <Marque />
      <span className="font-titre text-[20px] tracking-[-0.02em] whitespace-nowrap">
        <span className="font-bold">X-HEC</span> <span className={cx('font-normal', sombre ? 'text-vif' : 'text-vif-texte')}>impact</span>
      </span>
    </Link>
  );
}
