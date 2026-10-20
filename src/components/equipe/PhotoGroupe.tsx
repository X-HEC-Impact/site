import Image from 'next/image';
import { Camera } from 'lucide-react';
import { pages } from '@/content/site';

/** Grande photo de l'équipe sous l'en-tête, dans un cadre aux coins de 6 px. */
export function PhotoGroupe() {
  const { src, alt } = pages.equipe.photoGroupe;

  return (
    <div className="border-b border-filet p-4 md:p-6 lg:p-8">
      <div className="relative aspect-[4/3] overflow-hidden rounded-bouton bg-voile sm:aspect-[16/9] lg:aspect-[21/9]">
        {src ? (
          <Image src={src} alt={alt} fill priority sizes="(min-width: 1200px) 1136px, 100vw" className="object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-brume">
            <Camera aria-hidden className="size-7" strokeWidth={1.5} />
            <span className="text-sm">Photo de groupe à venir</span>
          </div>
        )}
      </div>
    </div>
  );
}
