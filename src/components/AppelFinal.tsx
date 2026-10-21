import { Bouton } from '@/components/ui/Bouton';
import { Motif } from '@/components/ui/Motif';
import { marges } from '@/components/ui/Section';
import { Titre } from '@/components/ui/Titre';
import { accueil } from '@/content/site';
import { cx, typo } from '@/lib/utils';

export function AppelFinal() {
  const { cta } = accueil;

  return (
    <section aria-labelledby="cta-titre" className="relative overflow-hidden border-b border-filet bg-menthe">
      {/* Le dessin de la ligne de train, discret, qui s'estompe vers le texte. */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[45%] opacity-60 [mask-image:linear-gradient(to_left,black_10%,transparent_85%)] md:block"
      >
        <Motif type="lex" />
      </div>

      <div className={cx(marges, 'relative py-24 md:py-32')}>
        <Titre id="cta-titre" debut={cta.titre} suite={cta.titreSuite} className="max-w-xl" />
        <p className="mt-6 max-w-md text-[17px] leading-relaxed">{typo(cta.texte)}</p>
        <Bouton href="/contact" className="mt-10">
          {cta.bouton}
        </Bouton>
      </div>
    </section>
  );
}
