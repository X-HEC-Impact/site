import Image from 'next/image';
import { Quote, UserRound } from 'lucide-react';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil } from '@/content/site';
import { cx, typo } from '@/lib/utils';

export function MotDuPresident() {
  const { president } = accueil;

  return (
    <section aria-labelledby="president-titre" className="grid border-b border-filet md:grid-cols-2">
      <div className={cx(marges, 'apparition py-16 md:py-24')}>
        <Surtitre>{president.surtitre}</Surtitre>
        <Titre id="president-titre" debut={president.titre} suite={president.titreSuite} className="mt-4" />
        <blockquote className="mt-10 max-w-lg">
          <Quote aria-hidden className="size-6 text-vif-texte" strokeWidth={1.75} />
          <p className="mt-4 font-titre text-2xl leading-snug tracking-[-0.01em] text-sapin">
            {typo(`« ${president.citation} »`)}
          </p>
        </blockquote>
      </div>

      <div className="flex items-center justify-center border-t border-filet bg-voile px-5 py-14 md:border-t-0 md:border-l">
        <div className="apparition w-full max-w-[260px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-bouton border border-filet bg-white">
            {president.photo ? (
              <Image
                src={president.photo}
                alt={`Portrait de ${president.nom}`}
                fill
                sizes="260px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-filet">
                <UserRound aria-hidden className="size-20" strokeWidth={1} />
              </div>
            )}
          </div>
          <p className="mt-5 font-titre text-xl font-medium tracking-[-0.02em] text-sapin">{president.nom}</p>
          <p className="text-[15px] text-brume">{president.role}</p>
        </div>
      </div>
    </section>
  );
}
