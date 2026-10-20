import Link from 'next/link';
import { cx } from '@/lib/utils';

/**
 * Logo provisoire : un carré découpé en quatre cases (comme la grille du
 * site), dont une case vert vif. À remplacer par le vrai logo si besoin.
 */
export function Marque({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden className={cx('size-7 shrink-0', className)}>
      <path d="M14 0.75h7.25a6 6 0 0 1 6 6V14H14z" className="fill-vif" />
      <rect
        x="0.75"
        y="0.75"
        width="26.5"
        height="26.5"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M14 1v26M1 14h26" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cx('inline-flex items-center gap-2.5 text-sapin', className)}
      aria-label="X-HEC Impact, retour à l'accueil"
    >
      <Marque />
      <span className="font-titre text-[19px] font-medium tracking-[-0.02em] whitespace-nowrap">
        X-HEC <span className="text-brume">Impact</span>
      </span>
    </Link>
  );
}
