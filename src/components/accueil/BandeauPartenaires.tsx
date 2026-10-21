import Image from 'next/image';
import { accueil, partenaires } from '@/content/site';

/**
 * Logos des partenaires qui défilent en boucle, d'un bord à l'autre de la colonne.
 * Chaque logo occupe une case de taille fixe : la largeur du bandeau est connue
 * dès l'affichage, ce qui évite les sauts pendant le chargement des images.
 */
export function BandeauPartenaires() {
  return (
    <section aria-labelledby="partenaires-titre" className="bg-pre py-14 md:py-16">
      <h2
        id="partenaires-titre"
        className="px-5 text-center text-base font-medium text-ardoise"
      >
        {accueil.partenaires.surtitre}
      </h2>

      {/* La liste est affichée deux fois ; la piste recule de la moitié de sa
          largeur (= une liste) puis recommence, sans coupure visible. */}
      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:mt-9">
        <div className="defilement-piste flex w-max">
          {[0, 1].map((copie) => (
            <ul
              key={copie}
              aria-hidden={copie === 1 || undefined}
              className="defilement-liste flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16"
            >
              {partenaires.map((partenaire) => (
                <li key={partenaire.nom} className="relative h-12 w-36 shrink-0 md:h-14 md:w-44">
                  {partenaire.logo ? (
                    <Image
                      src={partenaire.logo}
                      alt={partenaire.nom}
                      fill
                      sizes="(min-width: 768px) 176px, 144px"
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
