import { Bouton } from '@/components/ui/Bouton';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { cx } from '@/lib/utils';

export default function PageIntrouvable() {
  return (
    <section className={cx(marges, 'border-b border-filet py-24 md:py-32')}>
      <Surtitre>Page introuvable</Surtitre>
      <Titre niveau="h1" debut="Cette page" suite="n’existe pas." className="mt-5" />
      <p className="mt-6 max-w-md text-[17px]">Elle a peut-être été déplacée, ou l’adresse contient une faute de frappe.</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Bouton href="/">Retour à l’accueil</Bouton>
        <Bouton href="/evenements" variante="contour">
          Voir les événements
        </Bouton>
      </div>
    </section>
  );
}
