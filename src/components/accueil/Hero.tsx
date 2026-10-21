import Image from 'next/image';
import { Bouton } from '@/components/ui/Bouton';
import { LienFleche } from '@/components/ui/LienFleche';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil } from '@/content/site';
import { dateLongue } from '@/lib/dates';
import { getEvenements } from '@/lib/evenements';
import { cx, typo } from '@/lib/utils';

export async function Hero() {
  const { hero } = accueil;
  const { aVenir } = await getEvenements();
  const prochain = aVenir[0];

  return (
    <section aria-labelledby="hero-titre" className="grid border-b border-filet md:grid-cols-2">
      <div className={cx(marges, 'flex flex-col justify-center py-20 md:py-32')}>
        <Surtitre>{hero.surtitre}</Surtitre>
        <Titre
          id="hero-titre"
          niveau="h1"
          debut={hero.titre}
          suite={hero.titreSuite}
          surligne={hero.titreSurligne}
          className="mt-6"
        />
        <p className="mt-7 max-w-[32rem] text-[17px] leading-relaxed">{typo(hero.texte)}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Bouton href="/evenements">Voir nos événements</Bouton>
          <Bouton href="/equipe" variante="contour">
            Rencontrer l’équipe
          </Bouton>
        </div>
      </div>

      <div className="border-t border-filet p-5 sm:p-8 md:border-t-0 md:border-l lg:p-10">
        <div className="relative aspect-square overflow-hidden sm:aspect-[4/3] rounded-bouton md:aspect-auto md:h-full md:min-h-[520px]">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />

          {/* Petite carte discrète posée sur le visuel : le prochain rendez-vous. */}
          {prochain && (
            <div className="absolute bottom-3 left-3 w-fit max-w-[calc(100%-1.5rem)] rounded-bouton border border-white/60 bg-white/85 px-3.5 py-3 backdrop-blur-md sm:bottom-4 sm:left-4">
              <p className="text-[11px] leading-4 font-medium tracking-[0.06em] text-brume uppercase">
                Prochain rendez-vous
              </p>
              <LienFleche href={`/evenements/${prochain.slug}`} className="mt-1 text-[15px]">
                {prochain.titre}
              </LienFleche>
              <p className="text-[13px] text-ardoise">{dateLongue(prochain)}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
