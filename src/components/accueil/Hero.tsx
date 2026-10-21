import { Bouton } from '@/components/ui/Bouton';
import { Lien } from '@/components/ui/Lien';
import { Pictogramme } from '@/components/ui/Pictogramme';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil, formats, type FormatEvenement } from '@/content/site';
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
        {/* Le panneau : les trois formats et le prochain rendez-vous, dans la grille 2 × 2 du logo. */}
        <div className="grid h-full grid-cols-2 auto-rows-[minmax(168px,auto)] overflow-hidden rounded-bouton border border-filet bg-filet gap-px md:min-h-[520px] md:grid-rows-2">
          <CaseFormat type="lex" />

          <div className="flex flex-col justify-between bg-vif p-4 text-sapin sm:p-6 lg:p-7">
            {prochain ? (
              <>
                <div>
                  <p className="text-[13px] font-semibold text-sapin">Prochain rendez-vous</p>
                  <Lien
                    href={`/evenements/${prochain.slug}`}
                    className="mt-2 block font-titre text-xl leading-tight font-semibold tracking-[-0.02em] hover:underline hover:underline-offset-4 sm:text-2xl"
                  >
                    {prochain.titre}
                  </Lien>
                  <p className="mt-1 text-[15px] first-letter:uppercase">{dateLongue(prochain)}</p>
                </div>
                {prochain.soutien && (
                  <Bouton href={`/evenements/${prochain.slug}#soutenir`} variante="noir" taille="petit" className="mt-4 self-start">
                    Soutenir le projet
                  </Bouton>
                )}
              </>
            ) : (
              <Lien href="/evenements" className="font-titre text-xl font-semibold">
                Voir l’agenda
              </Lien>
            )}
          </div>

          <CaseFormat type="conference" />
          <CaseFormat type="hackathon" />
        </div>
      </div>
    </section>
  );
}

/** Une case du panneau : le pictogramme du format et son nom, qui mène à l'agenda filtré. */
function CaseFormat({ type }: { type: FormatEvenement }) {
  return (
    <Lien
      href={`/evenements?format=${type}`}
      className="group flex flex-col justify-between bg-white p-4 transition-colors duration-200 hover:bg-voile sm:p-6 lg:p-7"
    >
      <Pictogramme type={type} className="size-9 text-sapin sm:size-10" />
      <span className="mt-6 font-titre text-[17px] leading-snug font-semibold tracking-[-0.01em] text-sapin sm:text-xl">
        {formats[type].nom}
      </span>
    </Lien>
  );
}
