import { AppelFinal } from '@/components/accueil/AppelFinal';
import { BandeauPartenaires } from '@/components/accueil/BandeauPartenaires';
import { Hero } from '@/components/accueil/Hero';
import { MotEquipe } from '@/components/accueil/MotEquipe';
import { ProchainsEvenements } from '@/components/accueil/ProchainsEvenements';
import { RetourEvenement } from '@/components/accueil/RetourEvenement';
import { SectionFormats } from '@/components/accueil/SectionFormats';

export default function Accueil() {
  return (
    <>
      <Hero />
      <BandeauPartenaires />
      <SectionFormats />
      <ProchainsEvenements />
      <RetourEvenement />
      <MotEquipe />
      <AppelFinal />
    </>
  );
}
