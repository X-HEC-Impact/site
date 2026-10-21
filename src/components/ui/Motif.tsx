import type { FormatEvenement } from '@/content/site';
import { cx } from '@/lib/utils';

/*
  Visuels dessinés pour le site, à la place des dégradés flous :
  - LEX Europe : un plan de ligne de train, avec ses gares ;
  - Conférences : des ondes qui partent d'une prise de parole ;
  - Hackathon : des blocs qu'on assemble.
  Même langage partout : fond pastel, traits fins vert sapin, un seul élément vert vif, un léger grain.
*/

const fonds: Record<FormatEvenement, string> = {
  lex: 'bg-menthe',
  conference: 'bg-ciel',
  hackathon: 'bg-lavande',
};

const trait = { stroke: 'var(--color-sapin)', strokeOpacity: 0.16, strokeWidth: 1.5, fill: 'none' } as const;

function DessinLex() {
  const ligne = '-40,392 150,392 310,232 480,232 630,332 840,132';
  const gares: [number, number][] = [
    [150, 392],
    [310, 232],
    [480, 232],
  ];
  return (
    <>
      <polyline points={ligne} transform="translate(0 -26)" {...trait} />
      <polyline points={ligne} transform="translate(0 26)" {...trait} />
      <polyline points={ligne} fill="none" stroke="var(--color-sapin)" strokeWidth={3} strokeLinejoin="round" />
      {gares.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={10} fill="var(--color-menthe)" stroke="var(--color-sapin)" strokeWidth={3} />
      ))}
      <circle cx={630} cy={332} r={16} fill="var(--color-vif)" stroke="var(--color-sapin)" strokeWidth={3} />
    </>
  );
}

function DessinConference() {
  const rayons = [120, 200, 280, 440, 520, 600, 680];
  return (
    <>
      {rayons.map((r) => (
        <circle key={r} cx={170} cy={430} r={r} {...trait} />
      ))}
      <circle cx={170} cy={430} r={360} fill="none" stroke="var(--color-sapin)" strokeWidth={3} />
      <circle cx={170} cy={430} r={56} fill="var(--color-vif)" stroke="var(--color-sapin)" strokeWidth={3} />
    </>
  );
}

function DessinHackathon() {
  const pas = 76;
  const cote = 60;
  // Quelques blocs « posés » (plus foncés) et un seul bloc vert vif.
  const poses = new Set(['4-2', '5-2', '5-3', '6-3', '3-4', '4-4', '8-1', '8-2', '1-5', '2-5']);
  const vif = '6-2';
  const cases = [];
  for (let c = 0; c < 12; c++) {
    for (let l = 0; l < 8; l++) {
      const cle = `${c}-${l}`;
      const x = 18 + c * pas;
      const y = 10 + l * pas;
      if (cle === vif) {
        cases.push(
          <rect key={cle} x={x} y={y} width={cote} height={cote} rx={8} fill="var(--color-vif)" stroke="var(--color-sapin)" strokeWidth={3} />,
        );
      } else if (poses.has(cle)) {
        cases.push(
          <rect key={cle} x={x} y={y} width={cote} height={cote} rx={8} fill="#ddd5f6" stroke="var(--color-sapin)" strokeWidth={2} />,
        );
      } else {
        cases.push(<rect key={cle} x={x} y={y} width={cote} height={cote} rx={8} {...trait} />);
      }
    }
  }
  return <>{cases}</>;
}

const dessins: Record<FormatEvenement, () => React.JSX.Element> = {
  lex: DessinLex,
  conference: DessinConference,
  hackathon: DessinHackathon,
};

/** Visuel d'un format, qui remplit son parent (à placer dans un cadre en position relative). */
export function Motif({ type, className }: { type: FormatEvenement; className?: string }) {
  const Dessin = dessins[type];
  return (
    <div aria-hidden className={cx('absolute inset-0 overflow-hidden', fonds[type], className)}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full [&_*]:[vector-effect:non-scaling-stroke]">
        <Dessin />
      </svg>
      <Grain />
    </div>
  );
}

/** Léger grain imprimé par-dessus les aplats. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[url(/images/textures/grain.png)] bg-[length:160px] opacity-30 mix-blend-multiply"
    />
  );
}
