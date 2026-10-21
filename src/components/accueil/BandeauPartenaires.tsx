import Image from 'next/image';
import { accueil, partenaires } from '@/content/site';

/**
 * Logos des partenaires qui défilent en boucle, d'un bord à l'autre de la colonne.
 * Chaque logo occupe une case de taille fixe : la largeur du bandeau est connue
 * dès l'affichage, ce qui évite les sauts pendant le chargement des images.
 */
export function BandeauPartenaires() {
  return (
    <section aria-labelledby="partenaires-titre" className="border-b border-filet py-16 md:py-20">
      <h2 id="partenaires-titre" className="surtitre px-5 text-center">
        {accueil.partenaires.surtitre}
      </h2>

      {/* La liste est affichée deux fois ; la piste recule de la moitié de sa
          largeur (= une liste) puis recommence, sans coupure visible. */}
      <div className="mt-10 overflow-hidden md:mt-12">
        <div className="defilement-piste flex w-max">
          {[0, 1].map((copie) => (
            <ul
              key={copie}
              aria-hidden={copie === 1 || undefined}
              className="defilement-liste flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20"
            >
              {partenaires.map((partenaire) => (
                <li key={partenaire.nom} className="relative h-14 w-40 shrink-0 md:h-20 md:w-56">
                  {partenaire.logo ? (
                    <Image
                      src={partenaire.logo}
                      alt={partenaire.nom}
                      fill
                      sizes="(min-width: 768px) 224px, 160px"
                      loading="eager"
                      className="object-contain"
                    />
                  ) : (
                    // Sans logo : le nom, en gris, en attendant le fichier.
                    <span className="flex h-full items-center justify-center text-center font-titre text-lg font-medium tracking-[-0.02em] text-brume md:text-xl">
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
