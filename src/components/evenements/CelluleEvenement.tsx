import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { LienFleche } from '@/components/ui/LienFleche';
import { EtiquetteFormat } from './EtiquetteFormat';
import type { Evenement } from '@/content/site';
import { dateCourte } from '@/lib/dates';

type Props = {
  evenement: Evenement;
  /** Événement passé : pas de lien d'inscription. */
  passe?: boolean;
};

/** Case d'une grille d'événements : grande date, titre, lieu, format, inscription. */
export function CelluleEvenement({ evenement, passe }: Props) {
  const { slug, type, titre, lieu, inscriptionsOuvertes } = evenement;
  const { principal, annee, fixee } = dateCourte(evenement);
  const page = `/evenements/${slug}`;

  return (
    <article className="group relative flex h-full flex-col p-6 transition-colors duration-200 hover:bg-voile md:p-8">
      <EtiquetteFormat type={type} className="self-start" />

      {/* Hauteur fixe : les cases restent alignées, date connue ou non. */}
      <p className="mt-7 flex h-10 items-end gap-2 font-titre">
        {fixee ? (
          <>
            <time dateTime={evenement.date} className="text-[40px] leading-none tracking-[-0.03em] text-vif-texte">
              {principal}
            </time>
            <span className="text-base leading-6 text-brume">{annee}</span>
          </>
        ) : (
          // Date pas encore fixée : en gris, plus discret.
          <span className="text-2xl leading-none tracking-[-0.02em] text-brume">{principal}</span>
        )}
      </p>

      <h3 className="mt-5 text-xl leading-snug">
        {/* Le lien du titre couvre toute la case (after:absolute). */}
        <Link href={page} className="after:absolute after:inset-0 hover:underline hover:underline-offset-4">
          {titre}
        </Link>
      </h3>

      <p className="mt-2 flex items-start gap-1.5 text-[15px]">
        <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-brume" />
        {lieu}
      </p>

      <div className="relative mt-auto pt-8 text-[15px]">
        {passe ? (
          <LienFleche href={page}>Revoir l’événement</LienFleche>
        ) : inscriptionsOuvertes ? (
          <LienFleche href={`${page}#inscription`}>S’inscrire</LienFleche>
        ) : (
          <span className="text-brume">Inscriptions bientôt ouvertes</span>
        )}
      </div>
    </article>
  );
}
