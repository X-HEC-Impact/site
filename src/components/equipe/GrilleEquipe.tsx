import Image from "next/image";
import { UserRound } from "lucide-react";
import { IconeLinkedin } from "@/components/ui/IconesReseaux";
import { Section } from "@/components/ui/Section";
import { equipe, pages, type Membre } from "@/content/site";
import { estPlaceholder } from "@/lib/utils";

function FicheMembre({ membre }: { membre: Membre }) {
  const nomComplet = `${membre.prenom} ${membre.nom}`;
  const alt = estPlaceholder(membre.prenom)
    ? "Portrait d’un membre de l’équipe"
    : `Portrait de ${nomComplet}`;
  const aLinkedin = membre.linkedin && !estPlaceholder(membre.linkedin);

  return (
    <article className="flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-bouton bg-voile">
        {membre.photo ? (
          <Image
            src={membre.photo}
            alt={alt}
            fill
            sizes="(min-width: 1200px) 260px, (min-width: 768px) 30vw, 48vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-filet">
            <UserRound aria-hidden className="size-16" strokeWidth={1} />
          </div>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
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
      <p className="mt-1 text-sm leading-snug text-brume sm:text-[15px]">
        {membre.role}
      </p>
    </article>
  );
}

/** Grille des membres : portraits espacés, sans filets entre eux. */
export function GrilleEquipe() {
  return (
    <Section titreId="membres-titre">
      <h2
        id="membres-titre"
        className="text-[28px] leading-tight md:text-[32px]"
      >
        {pages.equipe.grille}
      </h2>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:mt-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
        {equipe.map((membre, index) => (
          <li key={index} className="group">
            <FicheMembre membre={membre} />
          </li>
        ))}
        {/* Dernière case de la rangée (grand écran) : les ondes du logo, sans texte */}
        {equipe.length % 4 !== 0 && (
          <li
            aria-hidden
            className="relative hidden aspect-square overflow-hidden rounded-bouton bg-voile lg:block"
          >
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 size-full [&_*]:[vector-effect:non-scaling-stroke]"
            >
              <g transform="translate(165 165)" fill="none">
                {[50, 80, 110, 140, 170, 200, 230].map((r) => (
                  <circle
                    key={r}
                    r={r}
                    stroke="#062a21"
                    strokeOpacity="0.12"
                    strokeWidth="1.5"
                  />
                ))}
                <circle r="16" fill="#2ec27e" />
              </g>
            </svg>
          </li>
        )}
      </ul>
    </Section>
  );
}
