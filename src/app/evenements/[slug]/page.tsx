import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AppelFinal } from "@/components/AppelFinal";
import {
  ChiffresCles,
  Galerie,
  Intervenants,
  Itineraire,
  PartenairesEvenement,
  Rencontres,
  Thematiques,
} from "@/components/evenements/BlocsEvenement";
import { CarteInscription } from "@/components/evenements/CarteInscription";
import { ParcoursLex } from "@/components/evenements/ParcoursLex";
import { Soutien } from "@/components/evenements/Soutien";
import { Motif } from "@/components/ui/Motif";
import { EnTeteEvenement } from "@/components/evenements/EnTeteEvenement";
import { marges } from "@/components/ui/Section";
import { Surtitre } from "@/components/ui/Titre";
import { evenements } from "@/content/site";
import { evenementEstPasse, getEvenement } from "@/lib/evenements";
import { metaPage } from "@/lib/meta";
import { cx, typo } from "@/lib/utils";

export function generateStaticParams() {
  return evenements.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/evenements/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const evenement = getEvenement(slug);
  if (!evenement) return {};
  return metaPage(
    evenement.titre,
    evenement.description.split(". ")[0].replace(/\.?$/, "."),
    false,
  );
}

export default async function PageEvenement({
  params,
}: PageProps<"/evenements/[slug]">) {
  const { slug } = await params;
  const evenement = getEvenement(slug);
  if (!evenement) notFound();

  const passe = await evenementEstPasse(slug);
  const paragraphes = evenement.description.split(/\n\s*\n/);

  return (
    <>
      <EnTeteEvenement evenement={evenement} passe={passe} />

      {/* Bande sombre dans le prolongement de l'en-tête : le visuel de l'événement (sa photo, sinon la texture de son format, avec son logo ou son itinéraire), puis les chiffres clés */}
      <div className="section-sombre bg-sapin">
        <div className={cx(marges, "pb-8 md:pb-10")}>
          <div data-reveal="zoom" className="relative aspect-[16/9] overflow-hidden rounded-bouton lg:aspect-[21/8]">
            {evenement.image ? (
              <Image
                src={evenement.image}
                alt={evenement.imageAlt ?? evenement.titre}
                fill
                priority
                sizes="(min-width: 1200px) 1136px, 100vw"
                className="object-cover"
              />
            ) : evenement.type === "lex" &&
              evenement.etapes &&
              evenement.etapes.length > 0 ? (
              <ParcoursLex etapes={evenement.etapes} />
            ) : (
              <Motif type={evenement.type} />
            )}
            {evenement.logo && !evenement.image && (
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="w-[min(80%,30rem)] rounded-bouton bg-white px-6 py-7 shadow-[0_1px_2px_rgb(6_42_33/0.06),0_12px_32px_-12px_rgb(6_42_33/0.25)] sm:px-10 sm:py-10">
                  <Image
                    src={evenement.logo.src}
                    alt={evenement.logo.alt}
                    width={965}
                    height={296}
                    priority
                    sizes="(min-width: 640px) 400px, 70vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {evenement.chiffres && evenement.chiffres.length > 0 ? (
          <div className={cx(marges, "pb-16 md:pb-24")}>
            <ChiffresCles chiffres={evenement.chiffres} />
          </div>
        ) : (
          <div className="pb-8 md:pb-12" />
        )}
      </div>

      {/* Deux colonnes : contenu à gauche, carte collante à droite */}
      <div className="border-b border-filet">
        <div className="mx-auto grid max-w-[1200px] md:grid-cols-12">
          <div className={cx(marges, "py-16 md:col-span-7 md:py-24")}>
            <section aria-labelledby="apropos-titre" data-reveal="monte">
              <Surtitre>
                <span id="apropos-titre">À propos</span>
              </Surtitre>
              <div className="mt-6 max-w-[38rem] space-y-5 text-[17px] leading-relaxed">
                {paragraphes.map((paragraphe, i) => (
                  <p key={i}>{typo(paragraphe)}</p>
                ))}
              </div>
            </section>

            {evenement.etapes && evenement.etapes.length > 0 && (
              <Itineraire etapes={evenement.etapes} />
            )}

            {evenement.thematiques && evenement.thematiques.length > 0 && (
              <Thematiques thematiques={evenement.thematiques} />
            )}

            {evenement.rencontres && evenement.rencontres.length > 0 && (
              <Rencontres
                rencontres={evenement.rencontres}
                secteurs={evenement.secteurs}
                avecAncre={!evenement.programme?.length}
              />
            )}

            {evenement.programme && evenement.programme.length > 0 && (
              <section
                id="programme"
                aria-labelledby="programme-titre"
                className="mt-16 md:mt-20"
              >
                <Surtitre>
                  <span id="programme-titre">Programme</span>
                </Surtitre>
                <ol data-reveal="liste" className="mt-6 overflow-hidden rounded-bouton border border-filet">
                  {evenement.programme.map((etape, i) => (
                    <li
                      key={i}
                      className="grid gap-1 border-b border-filet px-5 py-4 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
                    >
                      <span className="font-titre font-medium text-vif-texte">
                        {etape.quand}
                      </span>
                      <span className="text-sapin">{typo(etape.quoi)}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside
            aria-label="Infos pratiques et inscription"
            className="relative border-t border-filet bg-voile p-5 sm:p-8 md:col-span-5 md:border-t-0 md:border-l md:after:absolute md:after:inset-y-0 md:after:left-full md:after:w-[50vw] md:after:bg-voile lg:p-10"
          >
            <div className="md:sticky md:top-[92px]">
              <CarteInscription evenement={evenement} passe={passe} />
            </div>
          </aside>
        </div>
      </div>

      {evenement.intervenants && evenement.intervenants.length > 0 && (
        <Intervenants
          intervenants={evenement.intervenants}
          note={evenement.intervenantsNote}
        />
      )}

      {evenement.partenaires && evenement.partenaires.length > 0 && (
        <PartenairesEvenement partenaires={evenement.partenaires} />
      )}

      {evenement.soutien && <Soutien soutien={evenement.soutien} />}

      {evenement.photos && evenement.photos.length > 0 && (
        <Galerie photos={evenement.photos} />
      )}

      <AppelFinal
        photo
        fonduHaut={Boolean(evenement.photos?.length)}
        photoSrc={evenement.entete?.src}
        photoPosition="50% 85%"
      />
    </>
  );
}
