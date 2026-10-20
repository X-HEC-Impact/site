import Image from 'next/image';
import { Quote, UserRound } from 'lucide-react';
import { Grille } from '@/components/ui/Grille';
import { LienFleche } from '@/components/ui/LienFleche';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil, equipe } from '@/content/site';
import { cx, typo } from '@/lib/utils';

/** Bloc « Mot de l'équipe » : un texte commun à gauche, les portraits de l'équipe à droite. */
export function MotEquipe() {
  const { motEquipe } = accueil;

  return (
    <section aria-labelledby="equipe-titre" className="grid border-b border-filet md:grid-cols-2">
      <div className={cx(marges, 'apparition flex flex-col py-16 md:py-24')}>
        <Surtitre>{motEquipe.surtitre}</Surtitre>
        <Titre id="equipe-titre" debut={motEquipe.titre} suite={motEquipe.titreSuite} className="mt-4" />

        <figure className="mt-10 max-w-lg">
          <Quote aria-hidden className="size-6 text-vif-texte" strokeWidth={1.75} />
          <blockquote className="mt-4 font-titre text-2xl leading-snug tracking-[-0.01em] text-sapin">
            <p>{typo(`« ${motEquipe.citation} »`)}</p>
          </blockquote>
          <figcaption className="mt-4 text-[15px] text-brume">{typo(motEquipe.signature)}</figcaption>
        </figure>

        <LienFleche href="/equipe" className="mt-10 self-start">
          Rencontrer l’équipe
        </LienFleche>
      </div>

      <div className="border-t border-filet bg-voile md:border-t-0 md:border-l">
        <Grille colonnes="grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3" ariaLabel="L’équipe">
          {equipe.map((membre, index) => {
            const nomComplet = `${membre.prenom} ${membre.nom}`;
            return (
              <li key={index} className="group p-4 lg:p-5">
                <div className="relative aspect-square overflow-hidden rounded-bouton border border-filet bg-white">
                  {membre.photo ? (
                    <Image
                      src={membre.photo}
                      alt={`Portrait de ${nomComplet}`}
                      fill
                      sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 45vw"
                      className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-filet">
                      <UserRound aria-hidden className="size-12" strokeWidth={1} />
                    </div>
                  )}
                </div>
                <p className="mt-3 text-[15px] leading-snug font-medium text-sapin">{nomComplet}</p>
                <p className="text-[13px] leading-snug text-brume">{membre.role}</p>
              </li>
            );
          })}
        </Grille>
      </div>
    </section>
  );
}
