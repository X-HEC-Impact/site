import { PhotoFond } from '@/components/ui/PhotoFond';
import { marges } from '@/components/ui/Section';
import { Titre } from '@/components/ui/Titre';
import { cx, typo } from '@/lib/utils';

type Props = {
  surtitre: string;
  titre: string;
  titreSuite?: string;
  description?: string;
  /** Photo de paysage en fond (même photo que l'accueil, autre cadrage : « 50% 20% » = les sommets). */
  photo?: string;
  /** Autre photo que le paysage de l'accueil (chemin dans public/). */
  photoSrc?: string;
  /** Fondu vers le vert sapin en bas de la photo (à garder si la section suivante est sombre). */
  fonduBas?: boolean;
};

/**
 * En-tête commun aux pages intérieures (Événements, Équipe, Contact) :
 * surtitre, grand titre en deux tons à gauche, phrase d'introduction à droite,
 * et les ondes du logo, très discrètes, qui partent du bord droit (comme sur l'accueil).
 */
export function EnTetePage({ surtitre, titre, titreSuite, description, photo, photoSrc, fonduBas = true }: Props) {
  return (
    <header
      className={cx(
        marges,
        'section-sombre relative isolate grid gap-8 overflow-hidden bg-sapin pt-20 pb-16 md:grid-cols-12 md:items-end md:gap-12 md:pt-28 md:pb-24',
        photo && 'min-h-[22rem] pt-24 pb-24 md:min-h-[30rem] md:pt-32 md:pb-32',
      )}
    >
      {photo && (
        <>
          <PhotoFond src={photoSrc} position={photo} voile="fort" priority />
          {/* Fondu vers la section sombre qui suit */}
          {fonduBas && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-sapin to-transparent"
            />
          )}
        </>
      )}
      {!photo && (
        <svg
          aria-hidden
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMaxYMid slice"
          className="pointer-events-none absolute inset-0 -z-10 hidden size-full [mask-image:linear-gradient(to_right,transparent_45%,black_85%)] lg:block [&_*]:[vector-effect:non-scaling-stroke]"
        >
          <g transform="translate(1180 400)" fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5">
            {[130, 210, 290, 370, 450, 530, 610, 690].map((r) => (
              <circle key={r} r={r} />
            ))}
          </g>
        </svg>
      )}

      <div className="md:col-span-7">
        <p className="surtitre">{surtitre}</p>
        <Titre niveau="h1" sombre debut={titre} suite={titreSuite} className={cx('mt-5', photo && '[&>span]:text-white/75')} />
      </div>
      {description && (
        <p className="max-w-md text-[17px] leading-relaxed text-white/85 md:col-span-5 md:justify-self-end">{typo(description)}</p>
      )}
    </header>
  );
}
