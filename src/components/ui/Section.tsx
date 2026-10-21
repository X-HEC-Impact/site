import type { ReactNode } from 'react';
import { LienFleche } from '@/components/ui/LienFleche';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { cx, typo } from '@/lib/utils';

/* ------------------------------------------------------------------
   Rythme du site : trois réglages utilisés partout.
   Pour aérer ou resserrer tout le site, c'est ici qu'il faut agir.
   ------------------------------------------------------------------ */

/** Marges gauche/droite du contenu dans la colonne cadrée. */
export const marges = 'marges';

/** Espace vertical d'une section (haut et bas). */
export const rythme = 'py-20 md:py-28';

/** Espace entre l'en-tête d'une section et son contenu. */
export const ecart = 'mt-12 md:mt-16';

type PropsSection = {
  children: ReactNode;
  id?: string;
  /** id du titre de la section, pour l'accessibilité. */
  titreId?: string;
  className?: string;
};

/**
 * Une bande de la page : marges, rythme vertical, et un seul filet en bas
 * qui touche les deux filets verticaux de la colonne.
 */
export function Section({ children, id, titreId, className }: PropsSection) {
  return (
    <section id={id} aria-labelledby={titreId} className={cx('border-b border-filet', marges, rythme, className)}>
      {children}
    </section>
  );
}

type PropsEnTete = {
  /** Petit texte en capitales au-dessus du titre (facultatif). */
  surtitre?: string;
  titre: string;
  titreSuite?: string;
  /** id posé sur le titre (relié à la section par aria-labelledby). */
  id: string;
  intro?: string;
  /** Lien à droite du titre, par exemple « Tous les événements ». */
  lien?: { href: string; libelle: string };
  sombre?: boolean;
};

/** En-tête de section : surtitre, titre en deux tons, intro facultative, lien facultatif. */
export function EnTeteSection({ surtitre, titre, titreSuite, id, intro, lien, sombre }: PropsEnTete) {
  return (
    <div data-reveal="monte" className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {surtitre && <Surtitre className="mb-5">{surtitre}</Surtitre>}
        <Titre id={id} debut={titre} suite={titreSuite} sombre={sombre} />
        {intro && (
          <p className={cx('mt-5 max-w-xl text-[17px]', sombre && 'text-white/75')}>{typo(intro)}</p>
        )}
      </div>
      {lien && (
        <LienFleche href={lien.href} className={cx('shrink-0', sombre && 'text-white')}>
          {lien.libelle}
        </LienFleche>
      )}
    </div>
  );
}
