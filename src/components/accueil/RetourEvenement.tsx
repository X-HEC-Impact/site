import Image from 'next/image';
import { CalendarDays, Camera, MapPin } from 'lucide-react';
import { EtiquetteFormat } from '@/components/evenements/EtiquetteFormat';
import { Grille } from '@/components/ui/Grille';
import { LienFleche } from '@/components/ui/LienFleche';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil } from '@/content/site';
import { dateLongue, getEvenement } from '@/lib/evenements';
import { cx, typo } from '@/lib/utils';

const NOMBRE_PHOTOS = 3;

/**
 * Bloc « Retour sur… » : un événement passé mis en avant, avec ses photos.
 * L'événement et les photos se règlent dans accueil.retour (src/content/site.ts).
 */
export function RetourEvenement() {
  const { retour } = accueil;
  const evenement = getEvenement(retour.evenement);
  if (!evenement) return null;

  // « Hackathon Impact, 1re édition » → titre en deux tons de part et d'autre de la virgule.
  const [debut, ...reste] = evenement.titre.split(', ');
  const suite = reste.join(', ');

  // Une grande case et deux petites. Sans photo, un emplacement « Photo à venir ».
  const cases = Array.from({ length: NOMBRE_PHOTOS }, (_, i) => retour.photos[i]);

  return (
    <section aria-labelledby="retour-titre" className="grid border-b border-filet md:grid-cols-12">
      <div className={cx(marges, 'apparition flex flex-col py-16 md:col-span-5 md:py-24')}>
        <Surtitre>{retour.surtitre}</Surtitre>
        <Titre id="retour-titre" debut={suite ? `${debut},` : debut} suite={suite} className="mt-4" />

        <ul className="mt-8 space-y-2 text-[15px]">
          <li className="flex items-center gap-2.5">
            <CalendarDays aria-hidden className="size-4 shrink-0 text-brume" />
            <time dateTime={evenement.date} className="first-letter:uppercase">
              {dateLongue(evenement)}
            </time>
          </li>
          <li className="flex items-center gap-2.5">
            <MapPin aria-hidden className="size-4 shrink-0 text-brume" />
            {evenement.lieu}
          </li>
        </ul>

        <EtiquetteFormat type={evenement.type} className="mt-5 self-start" />

        <p className="mt-6 max-w-md">{typo(evenement.description)}</p>

        <LienFleche href={`/evenements/${evenement.slug}`} className="mt-8 self-start">
          Revoir l’événement
        </LienFleche>
      </div>

      <div className="border-t border-filet md:col-span-7 md:border-t-0 md:border-l">
        <Grille
          colonnes="h-full grid-cols-2 auto-rows-[170px] sm:auto-rows-[220px] md:min-h-[440px] md:grid-rows-[1fr_1fr]"
          className="h-full"
        >
          {cases.map((photo, index) => (
            <li key={index} className={cx('relative', index === 0 && 'row-span-2')}>
              {photo ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 360px, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 bg-voile text-brume">
                  <Camera aria-hidden className="size-6" strokeWidth={1.5} />
                  <span className="text-[13px]">Photo à venir</span>
                </div>
              )}
            </li>
          ))}
        </Grille>
      </div>
    </section>
  );
}
