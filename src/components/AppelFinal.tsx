import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Bouton } from '@/components/ui/Bouton';
import { marges } from '@/components/ui/Section';
import { Titre } from '@/components/ui/Titre';
import { accueil } from '@/content/site';
import { cx, typo } from '@/lib/utils';

export function AppelFinal() {
  const { cta } = accueil;

  return (
    <section aria-labelledby="cta-titre" className="relative overflow-hidden border-b border-filet">
      {/* Texture floue en fond, à droite, qui s'estompe vers le texte. */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-1/2 [mask-image:linear-gradient(to_left,black_20%,transparent)] md:block"
      >
        <Image src={cta.image} alt="" fill sizes="600px" className="object-cover" />
      </div>

      <div className={cx(marges, 'apparition relative py-24 md:py-32')}>
        <Titre id="cta-titre" debut={cta.titre} suite={cta.titreSuite} className="max-w-xl" />
        <p className="mt-6 max-w-md text-[17px] leading-relaxed">{typo(cta.texte)}</p>
        <Bouton href="/contact" className="mt-10">
          {cta.bouton}
          <ArrowRight aria-hidden className="size-4" />
        </Bouton>
      </div>
    </section>
  );
}
