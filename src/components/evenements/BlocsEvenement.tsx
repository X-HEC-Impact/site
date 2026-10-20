import { Building2, HandCoins, Rocket, UserRound, type LucideIcon } from 'lucide-react';
import { Surtitre } from '@/components/ui/Titre';
import type { Evenement } from '@/content/site';
import { cx, typo } from '@/lib/utils';

/* ------------------------------------------------------------------
   Blocs facultatifs de la page événement (utilisés par la LEX) :
   chiffres clés, itinéraire, types de rencontres. Ils ne s'affichent
   que si les données correspondantes existent dans site.ts.
   ------------------------------------------------------------------ */

/** Rangée de chiffres clés en cases bordurées. La dernière case est mise en avant. */
export function ChiffresCles({ chiffres }: { chiffres: NonNullable<Evenement['chiffres']> }) {
  return (
    <section aria-label="Chiffres clés" className="overflow-hidden border-b border-filet">
      <ul className="-mr-px -mb-px grid grid-cols-2 *:border-r *:border-b *:border-filet md:grid-cols-4">
        {chiffres.map((chiffre, i) => {
          const enAvant = i === chiffres.length - 1;
          return (
            <li key={i} className={cx('px-5 py-8 md:px-8 md:py-10', enAvant && 'section-sombre bg-sapin')}>
              <p
                className={cx(
                  'font-titre text-[44px] leading-none font-medium tracking-[-0.03em] md:text-[52px]',
                  enAvant ? 'text-vif' : 'text-vif-texte',
                )}
              >
                {chiffre.valeur}
              </p>
              <p className={cx('mt-3 text-[15px] leading-snug', enAvant ? 'text-white/80' : 'text-ardoise')}>
                {chiffre.libelle}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Itinéraire : une ligne bordurée par étape, numérotée. */
export function Itineraire({ etapes }: { etapes: NonNullable<Evenement['etapes']> }) {
  return (
    <section id="itineraire" aria-labelledby="itineraire-titre" className="mt-14">
      <Surtitre>
        <span id="itineraire-titre">L’itinéraire</span>
      </Surtitre>
      <ol className="mt-5 overflow-hidden rounded-bouton border border-filet">
        {etapes.map((etape, i) => (
          <li key={etape.ville} className="flex gap-4 border-b border-filet px-5 py-4 last:border-b-0">
            <span
              aria-hidden
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sapin font-titre text-sm font-medium text-white"
            >
              {i + 1}
            </span>
            <div>
              <p className="font-titre text-lg leading-snug font-medium tracking-[-0.02em] text-sapin">{etape.ville}</p>
              <p className="mt-0.5 text-[15px]">{typo(etape.texte)}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-brume">Départ et retour à Paris, en train.</p>
    </section>
  );
}

const icones: LucideIcon[] = [Rocket, HandCoins, Building2, UserRound];

/** « Le programme » : types de rencontres en cartes, et secteurs visés. */
export function Rencontres({
  rencontres,
  secteurs,
  avecAncre,
}: {
  rencontres: NonNullable<Evenement['rencontres']>;
  secteurs?: string;
  avecAncre: boolean;
}) {
  return (
    <section id={avecAncre ? 'programme' : undefined} aria-labelledby="rencontres-titre" className="mt-14">
      <Surtitre>
        <span id="rencontres-titre">Le programme</span>
      </Surtitre>
      <p className="mt-3 font-titre text-2xl leading-snug font-medium tracking-[-0.02em] text-sapin">
        Des rencontres choisies par les étudiants.
      </p>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-bouton border border-filet bg-filet sm:grid-cols-2">
        {rencontres.map((rencontre, i) => {
          const Icone = icones[i % icones.length];
          return (
            <li key={rencontre.titre} className="bg-white p-5">
              <Icone aria-hidden className="size-5 text-vif-texte" strokeWidth={1.75} />
              <p className="mt-3 font-medium text-sapin">{rencontre.titre}</p>
              <p className="mt-1 text-[15px]">{typo(rencontre.texte)}</p>
            </li>
          );
        })}
      </ul>
      {secteurs && (
        <p className="mt-4 text-[15px]">
          <span className="font-medium text-sapin">Secteurs visés :</span> {secteurs}
        </p>
      )}
    </section>
  );
}
