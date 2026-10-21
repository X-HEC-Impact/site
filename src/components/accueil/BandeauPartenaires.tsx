import Image from 'next/image';
import { accueil, partenaires } from '@/content/site';

/** Logos des partenaires qui défilent en boucle, d'un bord à l'autre de la colonne. */
export function BandeauPartenaires() {
  return (
    <section aria-labelledby="partenaires-titre" className="border-b border-filet py-16 md:py-20">
      <h2 id="partenaires-titre" className="surtitre px-5 text-center">
        {accueil.partenaires.surtitre}
      </h2>

      {/* Les logos défilent en boucle : la liste est affichée deux fois,
          et la piste recule de la moitié de sa largeur avant de recommencer. */}
      <div className="mt-10 overflow-hidden md:mt-12">
        <div className="defilement-piste flex w-max">
          {[0, 1].map((copie) => (
            <ul
              key={copie}
              aria-hidden={copie === 1 || undefined}
              className="defilement-liste flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
            >
              {partenaires.map((partenaire) => (
                <li key={partenaire.nom} className="flex h-16 shrink-0 items-center md:h-24">
                  {partenaire.logo ? (
                    <Image
                      src={partenaire.logo}
                      alt={partenaire.nom}
                      width={0}
                      height={0}
                      sizes="480px"
                      className="h-full w-auto object-contain"
                    />
                  ) : (
                    // Sans logo : le nom, en gris, en attendant le fichier.
                    <span className="font-titre text-lg font-medium tracking-[-0.02em] whitespace-nowrap text-brume md:text-xl">
                      {partenaire.nom}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
