import { Lien } from '@/components/ui/Lien';
import { annonce } from '@/content/site';

/** Fine barre vert sapin tout en haut du site, pour le prochain événement. */
export function BarreAnnonce() {
  if (!annonce.afficher) return null;

  return (
    <aside aria-label="Annonce" className="section-sombre bg-sapin px-4 py-2.5 text-center text-[13px] leading-5 text-white">
      <span>{annonce.texte}</span>{' '}
      <Lien
        href={annonce.lien}
        className="font-medium text-vif underline decoration-vif/40 underline-offset-4 transition-colors hover:decoration-vif"
      >
        {annonce.libelleLien}
      </Lien>
    </aside>
  );
}
