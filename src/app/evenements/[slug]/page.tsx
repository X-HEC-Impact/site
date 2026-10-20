import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AppelFinal } from '@/components/AppelFinal';
import { CarteInscription } from '@/components/evenements/CarteInscription';
import { EtiquetteFormat } from '@/components/evenements/EtiquetteFormat';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { evenements, formats } from '@/content/site';
import { evenementEstPasse, getEvenement } from '@/lib/evenements';
import { cx, decouperTitre, typo } from '@/lib/utils';

export function generateStaticParams() {
  return evenements.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<'/evenements/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const evenement = getEvenement(slug);
  if (!evenement) return {};
  return {
    title: evenement.titre,
    description: evenement.description.split('. ')[0].replace(/\.?$/, '.'),
  };
}

export default async function PageEvenement({ params }: PageProps<'/evenements/[slug]'>) {
  const { slug } = await params;
  const evenement = getEvenement(slug);
  if (!evenement) notFound();

  const passe = await evenementEstPasse(slug);
  const { debut, suite } = decouperTitre(evenement.titre);
  const paragraphes = evenement.description.split(/\n\s*\n/);

  return (
    <>
      {/* En-tête */}
      <header className={cx(marges, 'border-b border-filet pt-10 pb-14 md:pt-14 md:pb-20')}>
        <Link
          href="/evenements"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ardoise hover:text-sapin"
        >
          <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Tous les événements
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-14">
          <EtiquetteFormat type={evenement.type} />
          {passe && <span className="text-sm text-brume">Événement passé</span>}
        </div>
        <Titre niveau="h1" debut={debut} suite={suite} className="mt-5 max-w-3xl" />
      </header>

      {/* Visuel : la photo de l'événement, sinon la texture de son format */}
      <div className="border-b border-filet p-4 md:p-6 lg:p-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-bouton lg:aspect-[21/8]">
          <Image
            src={evenement.image ?? formats[evenement.type].image}
            alt={evenement.image ? evenement.titre : ''}
            fill
            priority
            sizes="(min-width: 1200px) 1136px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Deux colonnes : contenu à gauche, carte collante à droite */}
      <div className="grid border-b border-filet md:grid-cols-12">
        <div className={cx(marges, 'py-14 md:col-span-7 md:py-20')}>
          <section aria-labelledby="apropos-titre">
            <Surtitre>
              <span id="apropos-titre">À propos</span>
            </Surtitre>
            <div className="mt-5 space-y-4 text-[17px]">
              {paragraphes.map((paragraphe, i) => (
                <p key={i}>{typo(paragraphe)}</p>
              ))}
            </div>
          </section>

          {evenement.programme && evenement.programme.length > 0 && (
            <section id="programme" aria-labelledby="programme-titre" className="mt-14">
              <Surtitre>
                <span id="programme-titre">Programme</span>
              </Surtitre>
              <ol className="mt-5 overflow-hidden rounded-bouton border border-filet">
                {evenement.programme.map((etape, i) => (
                  <li
                    key={i}
                    className="grid gap-1 border-b border-filet px-5 py-4 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <span className="font-titre font-medium text-vif-texte">{etape.quand}</span>
                    <span className="text-sapin">{typo(etape.quoi)}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside
          aria-label="Infos pratiques et inscription"
          className="border-t border-filet bg-voile p-4 md:col-span-5 md:border-t-0 md:border-l md:p-6 lg:p-8"
        >
          <div className="md:sticky md:top-[92px]">
            <CarteInscription evenement={evenement} passe={passe} />
          </div>
        </aside>
      </div>

      <AppelFinal />
    </>
  );
}
