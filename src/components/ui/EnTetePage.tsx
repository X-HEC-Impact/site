import { marges } from '@/components/ui/Section';
import { Titre } from '@/components/ui/Titre';
import { cx, typo } from '@/lib/utils';

type Props = {
  surtitre: string;
  titre: string;
  titreSuite?: string;
  description?: string;
};

/**
 * En-tête commun aux pages intérieures (Événements, Équipe, Contact) :
 * surtitre, grand titre en deux tons à gauche, phrase d'introduction à droite,
 * et les ondes du logo, très discrètes, qui partent du bord droit (comme sur l'accueil).
 */
export function EnTetePage({ surtitre, titre, titreSuite, description }: Props) {
  return (
    <header
      className={cx(
        marges,
        'relative isolate grid gap-8 overflow-hidden border-b border-filet pt-20 pb-16 md:grid-cols-12 md:items-end md:gap-12 md:pt-28 md:pb-24',
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute inset-0 -z-10 hidden size-full [mask-image:linear-gradient(to_right,transparent_45%,black_85%)] lg:block [&_*]:[vector-effect:non-scaling-stroke]"
      >
        <g transform="translate(1180 400)" fill="none" stroke="#062a21" strokeOpacity="0.09" strokeWidth="1.5">
          {[130, 210, 290, 370, 450, 530, 610, 690].map((r) => (
            <circle key={r} r={r} />
          ))}
        </g>
      </svg>

      <div className="md:col-span-7">
        <p className="surtitre">{surtitre}</p>
        <Titre niveau="h1" debut={titre} suite={titreSuite} className="mt-5" />
      </div>
      {description && (
        <p className="max-w-md text-[17px] leading-relaxed md:col-span-5 md:justify-self-end">{typo(description)}</p>
      )}
    </header>
  );
}
