import type { FormatEvenement } from '@/content/site';
import { cx } from '@/lib/utils';

/*
  Pictogrammes dessinés pour les trois formats, dans le langage du logo :
  traits de 1,5 px, coins arrondis, un seul élément vert vif.
*/

function Lex() {
  return (
    <>
      <polyline points="4,20 10,13 17,16 24,8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="4" cy="20" r="2.25" className="fill-white" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="13" r="2.25" className="fill-white" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="16" r="2.25" className="fill-white" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="8" r="3" className="fill-vif" stroke="currentColor" strokeWidth="1.5" />
    </>
  );
}

function Conference() {
  return (
    <>
      <rect x="2.75" y="4.75" width="15" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 15.75v3.5l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="11.25" y="11.25" width="14" height="10" rx="3" className="fill-vif" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 21.25v3l-3-3" className="fill-vif" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  );
}

function Hackathon() {
  return (
    <>
      <rect x="3.75" y="14.75" width="9.5" height="9.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14.75" y="14.75" width="9.5" height="9.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9.25" y="3.75" width="9.5" height="9.5" rx="2" className="fill-vif" stroke="currentColor" strokeWidth="1.5" />
    </>
  );
}

const dessins = { lex: Lex, conference: Conference, hackathon: Hackathon };

export function Pictogramme({ type, className }: { type: FormatEvenement; className?: string }) {
  const Dessin = dessins[type];
  return (
    <svg viewBox="0 0 28 28" aria-hidden className={cx('size-7', className)}>
      <Dessin />
    </svg>
  );
}
