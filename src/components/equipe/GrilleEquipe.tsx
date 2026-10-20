import Image from 'next/image';
import { UserRound } from 'lucide-react';
import { Grille } from '@/components/ui/Grille';
import { IconeLinkedin } from '@/components/ui/IconesReseaux';
import { equipe, pages, type Membre } from '@/content/site';
import { estPlaceholder } from '@/lib/utils';

function FicheMembre({ membre }: { membre: Membre }) {
  const nomComplet = `${membre.prenom} ${membre.nom}`;
  const alt = estPlaceholder(membre.prenom) ? 'Portrait d’un membre de l’équipe' : `Portrait de ${nomComplet}`;
  const aLinkedin = membre.linkedin && !estPlaceholder(membre.linkedin);

  return (
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

      <div className="mt-4 flex items-start justify-between gap-3 sm:mt-5">
        <h3 className="text-lg leading-snug sm:text-[22px]">{nomComplet}</h3>
        {aLinkedin && (
          <a
            href={membre.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="-m-1.5 shrink-0 rounded-bouton p-1.5 text-brume transition-colors hover:text-sapin"
            aria-label={`Profil LinkedIn de ${nomComplet}`}
          >
            <IconeLinkedin className="size-[18px]" />
          </a>
        )}
      </div>
      <p className="mt-1 text-sm leading-snug text-brume sm:text-[15px]">{membre.role}</p>

    </article>
  );
}

/** Grille des membres : une case bordurée par personne. */
export function GrilleEquipe() {
  return (
    <section aria-labelledby="membres-titre" className="border-b border-filet">
      <h2 id="membres-titre" className="surtitre px-5 py-8 text-center md:py-10">
        {pages.equipe.grille}
      </h2>

      <div className="border-t border-filet">
        <Grille colonnes="grid-cols-2 lg:grid-cols-3">
          {equipe.map((membre, index) => (
            <li key={index} className="group">
              <FicheMembre membre={membre} />
            </li>
          ))}
        </Grille>
      </div>
    </section>
  );
}
