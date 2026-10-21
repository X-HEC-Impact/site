import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AppelFinal } from '@/components/AppelFinal';
import { ChiffresCles, Galerie, Itineraire, Rencontres } from '@/components/evenements/BlocsEvenement';
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
      <header className={cx(marges, 'border-b border-filet pt-12 pb-16 md:pt-16 md:pb-24')}>
        <Link
          href="/evenements"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ardoise hover:text-sapin"
        >
          <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Tous les événements
        </Link>
        <div className="mt-12 flex flex-wrap items-center gap-3 md:mt-16">
          <EtiquetteFormat type={evenement.type} />
          {passe && <span className="text-sm text-brume">Événement passé</span>}
        </div>
        <Titre niveau="h1" debut={debut} suite={suite} className="mt-6 max-w-3xl" />
        {evenement.accroche && <p className="mt-6 max-w-2xl text-[17px] leading-relaxed md:text-lg">{typo(evenement.accroche)}</p>}
      </header>

      {/* Visuel : la photo de l'événement, sinon la texture de son format */}
      <div className="border-b border-filet p-5 sm:p-8 lg:p-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-bouton lg:aspect-[21/8]">
          <Image
            src={evenement.image ?? formats[evenement.type].image}
            alt={evenement.image ? (evenement.imageAlt ?? evenement.titre) : ''}
            fill
            priority
            sizes="(min-width: 1200px) 1136px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {evenement.chiffres && evenement.chiffres.length > 0 && <ChiffresCles chiffres={evenement.chiffres} />}

      {/* Deux colonnes : contenu à gauche, carte collante à droite */}
      <div className="grid border-b border-filet md:grid-cols-12">
        <div className={cx(marges, 'py-16 md:col-span-7 md:py-24')}>
          <section aria-labelledby="apropos-titre">
            <Surtitre>
              <span id="apropos-titre">À propos</span>
            </Surtitre>
            <div className="mt-6 max-w-[38rem] space-y-5 text-[17px] leading-relaxed">
              {paragraphes.map((paragraphe, i) => (
                <p key={i}>{typo(paragraphe)}</p>
              ))}
            </div>
          </section>

          {evenement.etapes && evenement.etapes.length > 0 && <Itineraire etapes={evenement.etapes} />}

          {evenement.rencontres && evenement.rencontres.length > 0 && (
            <Rencontres
              rencontres={evenement.rencontres}
              secteurs={evenement.secteurs}
              avecAncre={!evenement.programme?.length}
            />
          )}

          {evenement.programme && evenement.programme.length > 0 && (
            <section id="programme" aria-labelledby="programme-titre" className="mt-16 md:mt-20">
              <Surtitre>
                <span id="programme-titre">Programme</span>
              </Surtitre>
              <ol className="mt-6 overflow-hidden rounded-bouton border border-filet">
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
          className="border-t border-filet bg-voile p-5 sm:p-8 md:col-span-5 md:border-t-0 md:border-l lg:p-10"
        >
          <div className="md:sticky md:top-[92px]">
            <CarteInscription evenement={evenement} passe={passe} />
          </div>
        </aside>
      </div>

      {evenement.photos && evenement.photos.length > 0 && <Galerie photos={evenement.photos} />}

      <AppelFinal />
    </>
  );
}
