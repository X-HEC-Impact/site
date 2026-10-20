import Image from 'next/image';
import { Bouton } from '@/components/ui/Bouton';
import { LienFleche } from '@/components/ui/LienFleche';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil } from '@/content/site';
import { dateLongue, getEvenements } from '@/lib/evenements';
import { cx, typo } from '@/lib/utils';

export async function Hero() {
  const { hero } = accueil;
  const { aVenir } = await getEvenements();
  const prochain = aVenir[0];

  return (
    <section aria-labelledby="hero-titre" className="grid border-b border-filet md:grid-cols-2">
      <div className={cx(marges, 'flex flex-col justify-center py-14 md:py-24')}>
        <Surtitre>{hero.surtitre}</Surtitre>
        <Titre id="hero-titre" niveau="h1" debut={hero.titre} suite={hero.titreSuite} className="mt-5" />
        <p className="mt-6 max-w-[34rem] text-[17px]">{typo(hero.texte)}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Bouton href="/evenements">Voir nos événements</Bouton>
          <Bouton href="/equipe" variante="contour">
            Rencontrer l’équipe
          </Bouton>
        </div>
      </div>

      <div className="border-t border-filet p-4 md:border-t-0 md:border-l md:p-6 lg:p-8">
        <div className="relative aspect-square overflow-hidden sm:aspect-[4/3] rounded-bouton md:aspect-auto md:h-full md:min-h-[480px]">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />

          {/* Petite carte posée sur le visuel : le prochain rendez-vous. */}
          {prochain && (
            <div className="absolute inset-x-3 bottom-3 rounded-bouton border border-white/60 bg-white/90 p-4 backdrop-blur-md sm:inset-x-auto sm:left-4 sm:bottom-4 sm:w-72 md:p-5">
              <p className="surtitre">Prochain rendez-vous</p>
              <p className="mt-2 font-titre text-xl leading-tight font-medium tracking-[-0.02em] text-sapin">
                {prochain.titre}
              </p>
              <p className="mt-1 text-sm font-medium text-vif-texte">{dateLongue(prochain)}</p>
              <LienFleche href={`/evenements/${prochain.slug}`} className="mt-3 text-sm">
                Découvrir
              </LienFleche>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
