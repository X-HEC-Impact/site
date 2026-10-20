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
                <Image
                  src={partenaire.logo}
                  alt={partenaire.nom}
                  width={160}
                  height={56}
                  className="h-10 w-auto max-w-[70%] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-12"
                />
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
