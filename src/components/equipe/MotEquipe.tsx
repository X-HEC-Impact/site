import { Quote } from 'lucide-react';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { pages } from '@/content/site';
import { cx, typo } from '@/lib/utils';

/** Section sombre « Mot de l'équipe » : titre à gauche, citation à droite. */
export function MotEquipe() {
  const { mot } = pages.equipe;

  return (
    <section
      aria-labelledby="mot-titre"
      className={cx(
        'section-sombre grid gap-10 border-b border-filet bg-sapin py-16 md:grid-cols-12 md:py-24',
        marges,
      )}
    >
      <div className="apparition md:col-span-5">
        <Surtitre>{mot.surtitre}</Surtitre>
        <Titre id="mot-titre" sombre debut={mot.titre} suite={mot.titreSuite} className="mt-4" />
      </div>

      <figure className="apparition md:col-span-7">
        <Quote aria-hidden className="size-7 text-vif" strokeWidth={1.75} />
        <blockquote className="mt-5 font-titre text-[26px] leading-snug tracking-[-0.01em] text-white md:text-[30px]">
          <p>{typo(`« ${mot.citation} »`)}</p>
        </blockquote>
        <figcaption className="mt-6 text-[15px] text-lichen">{typo(mot.signature)}</figcaption>
      </figure>
    </section>
  );
}
