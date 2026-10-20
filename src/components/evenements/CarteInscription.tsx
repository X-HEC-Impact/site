import type { ReactNode } from 'react';
import { CalendarDays, Clock, MapPin, Tag } from 'lucide-react';
import { FormulaireInscription } from '@/components/evenements/FormulaireInscription';
import { formats, type Evenement } from '@/content/site';
import { dateLongue } from '@/lib/dates';

function Info({ icone, libelle, children }: { icone: ReactNode; libelle: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-b border-filet py-3.5 first:pt-0">
      <span className="mt-0.5 text-brume">{icone}</span>
      <div>
        <dt className="surtitre">{libelle}</dt>
        <dd className="mt-0.5 text-[15px] text-sapin first-letter:uppercase">{children}</dd>
      </div>
    </div>
  );
}

/** Carte collante de la page événement : infos pratiques + inscription. */
export function CarteInscription({ evenement, passe }: { evenement: Evenement; passe: boolean }) {
  return (
    <div className="rounded-bouton border border-filet bg-white p-5 md:p-6">
      <dl>
        <Info icone={<CalendarDays className="size-4" aria-hidden />} libelle="Date">
          {dateLongue(evenement)}
        </Info>
        <Info icone={<MapPin className="size-4" aria-hidden />} libelle="Lieu">
          {evenement.lieu}
        </Info>
        <Info icone={<Tag className="size-4" aria-hidden />} libelle="Format">
          {formats[evenement.type].nom}
        </Info>
      </dl>

      <div id="inscription" className="pt-6">
        <h2 className="font-titre text-xl font-medium tracking-[-0.02em] text-sapin">Inscription</h2>

        {passe ? (
          <p className="mt-3 flex items-center gap-2 rounded-bouton bg-voile p-4 text-[15px]">
            <Clock aria-hidden className="size-4 shrink-0 text-brume" />
            Cet événement est terminé.
          </p>
        ) : evenement.inscriptionsOuvertes ? (
          <div className="mt-4">
            <FormulaireInscription slug={evenement.slug} titre={evenement.titre} />
          </div>
        ) : (
          <p className="mt-3 flex items-center gap-2 rounded-bouton bg-voile p-4 text-[15px]">
            <Clock aria-hidden className="size-4 shrink-0 text-brume" />
            Inscriptions bientôt ouvertes
          </p>
        )}
      </div>
    </div>
  );
}
