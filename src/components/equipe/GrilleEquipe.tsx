import Image from 'next/image';
import { UserRound } from 'lucide-react';
import { Grille } from '@/components/ui/Grille';
import { equipe, pages } from '@/content/site';
import { estPlaceholder } from '@/lib/utils';

/** Grille des membres : une case bordurée par personne, photo en couleur, nom et rôle. */
export function GrilleEquipe() {
  return (
    <section aria-labelledby="membres-titre" className="border-b border-filet">
      <h2 id="membres-titre" className="surtitre px-5 py-8 text-center md:py-10">
        {pages.equipe.grille}
      </h2>

      <div className="border-t border-filet">
        <Grille colonnes="grid-cols-2 lg:grid-cols-3">
          {equipe.map((membre, index) => {
            const nomComplet = `${membre.prenom} ${membre.nom}`;
            const alt = estPlaceholder(membre.prenom)
              ? 'Portrait d’un membre de l’équipe'
              : `Portrait de ${nomComplet}`;

            return (
              <li key={index} className="group">
                <article className="flex h-full flex-col p-3 transition-colors duration-200 hover:bg-voile sm:p-5 lg:p-6">
                  <div className="relative aspect-square overflow-hidden rounded-bouton bg-voile">
                    {membre.photo ? (
                      <Image
                        src={membre.photo}
                        alt={alt}
                        fill
                        sizes="(min-width: 1200px) 350px, (min-width: 1024px) 30vw, 48vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-filet">
                        <UserRound aria-hidden className="size-16" strokeWidth={1} />
                      </div>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg leading-snug sm:mt-5 sm:text-[22px]">{nomComplet}</h3>
                  <p className="mt-1 text-sm leading-snug text-brume sm:text-[15px]">{membre.role}</p>
                </article>
              </li>
            );
          })}
        </Grille>
      </div>
    </section>
  );
}
