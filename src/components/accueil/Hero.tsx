import { Bouton } from '@/components/ui/Bouton';
import { Lien } from '@/components/ui/Lien';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil, type Evenement } from '@/content/site';
import { dateLongue } from '@/lib/dates';
import { getEvenements } from '@/lib/evenements';
import { cx, typo } from '@/lib/utils';

export async function Hero() {
  const { hero } = accueil;
  const { aVenir } = await getEvenements();
  const prochain = aVenir[0];

  return (
    <section aria-labelledby="hero-titre" className="grid border-b border-filet md:grid-cols-2">
      <div className={cx(marges, 'flex flex-col justify-center py-20 md:py-32')}>
        <Surtitre>{hero.surtitre}</Surtitre>
        <Titre
          id="hero-titre"
          niveau="h1"
          debut={hero.titre}
          suite={hero.titreSuite}
          surligne={hero.titreSurligne}
          className="mt-6"
        />
        <p className="mt-7 max-w-[32rem] text-[17px] leading-relaxed">{typo(hero.texte)}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Bouton href="/evenements">Voir nos événements</Bouton>
          <Bouton href="/equipe" variante="contour">
            Rencontrer l’équipe
          </Bouton>
        </div>
      </div>

      <div className="border-t border-filet p-5 sm:p-8 md:border-t-0 md:border-l lg:p-10">
        {prochain ? <CadreRendezVous evenement={prochain} /> : null}
      </div>
    </section>
  );
}

/**
 * Le prochain rendez-vous dans un cadre à double filet, façon billet :
 * titre, date, puis l'itinéraire ville par ville (ou le lieu), et l'action.
 */
function CadreRendezVous({ evenement }: { evenement: Evenement }) {
  const page = `/evenements/${evenement.slug}`;
  const date = dateLongue(evenement);
  const villes = evenement.etapes?.length ? ['Paris', ...evenement.etapes.map((e) => e.ville), 'Paris'] : null;
  const action = evenement.soutien
    ? { libelle: 'Soutenir le projet', href: `${page}#soutenir` }
    : evenement.inscriptionsOuvertes && !evenement.reserveA
      ? { libelle: 'S’inscrire', href: `${page}#inscription` }
      : { libelle: 'Découvrir', href: page };

  return (
    <div className="h-full rounded-bouton border border-filet bg-white p-2.5 sm:p-3.5">
      <div className="flex h-full flex-col rounded-[3px] border border-sapin px-6 pt-7 pb-6 sm:px-9 sm:pt-9 sm:pb-8">
        <p className="text-[13px] text-ardoise">Prochain rendez-vous</p>
        <h2 className="mt-2.5 text-[38px] leading-none font-semibold tracking-[-0.03em] sm:text-[44px]">
          <Lien href={page} className="hover:underline hover:decoration-2 hover:underline-offset-[6px]">
            {evenement.titre}
          </Lien>
        </h2>
        <p className="mt-3 text-[17px] font-medium text-vif-texte">
          {date.charAt(0).toUpperCase() + date.slice(1)}
          {evenement.resume && ` · ${evenement.resume}`}
        </p>

        {villes ? (
          <ol aria-label="Itinéraire" className="mt-7 mb-8">
            {villes.map((ville, i) => {
              const extremite = i === 0 || i === villes.length - 1;
              return (
                <li key={`${ville}-${i}`} className="flex items-center gap-3.5 border-t border-filet py-2.5 first:border-t-0">
                  <span
                    aria-hidden
                    className={cx('size-2.5 shrink-0 rounded-full border-[1.5px] border-sapin', extremite ? 'bg-vif' : 'bg-white')}
                  />
                  <span className="text-[15px] text-sapin">{ville}</span>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="mt-6 mb-8 text-[15px]">{evenement.lieu}</p>
        )}

        <Bouton href={action.href} className="mt-auto self-start">
          {action.libelle}
        </Bouton>
      </div>
    </div>
  );
}

