import Image from 'next/image';
import { Grille } from '@/components/ui/Grille';
import { accueil, partenaires } from '@/content/site';

export function BandeauPartenaires() {
  return (
    <section aria-labelledby="partenaires-titre" className="border-b border-filet">
      <h2 id="partenaires-titre" className="surtitre px-5 py-8 text-center md:py-10">
        {accueil.partenaires.surtitre}
      </h2>

      <div className="border-t border-filet">
        <Grille colonnes="grid-cols-2 md:grid-cols-4">
          {partenaires.map((partenaire) => (
            <li
              key={partenaire.nom}
              className="group flex h-24 items-center justify-center px-4 text-center md:h-32"
            >
              {partenaire.logo ? (
                // Logo en couleur, qui grossit légèrement au survol.
                <div className="relative h-11 w-[72%] md:h-14 md:w-[64%]">
                  <Image
                    src={partenaire.logo}
                    alt={partenaire.nom}
                    fill
                    sizes="200px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                // Sans logo : le nom, en gris, en attendant le fichier.
                <span className="font-titre text-lg font-medium tracking-[-0.02em] text-brume transition-colors duration-300 group-hover:text-sapin md:text-xl">
                  {partenaire.nom}
                </span>
              )}
            </li>
          ))}
        </Grille>
      </div>
    </section>
  );
}
