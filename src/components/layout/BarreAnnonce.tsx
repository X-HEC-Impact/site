import { ArrowRight } from 'lucide-react';
import { Lien } from '@/components/ui/Lien';
import { annonce } from '@/content/site';

/** Fine barre vert sapin tout en haut du site, pour le prochain événement. */
export function BarreAnnonce() {
  if (!annonce.afficher) return null;

  return (
    <div className="section-sombre bg-sapin px-4 py-2.5 text-center text-[13px] leading-5 text-white">
      <span>{annonce.texte}</span>{' '}
      <Lien
        href={annonce.lien}
        className="group inline-flex items-center gap-1 font-medium text-vif underline-offset-4 hover:underline"
      >
        {annonce.libelleLien}
        <ArrowRight
          aria-hidden
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Lien>
    </div>
  );
}
