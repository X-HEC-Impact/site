import { Section } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';

export default function Accueil() {
  return (
    <Section>
      <Surtitre>Association du Master Entrepreneurs X-HEC</Surtitre>
      <Titre niveau="h1" debut="Entreprendre" suite="pour l'impact" className="mt-4" />
    </Section>
  );
}
