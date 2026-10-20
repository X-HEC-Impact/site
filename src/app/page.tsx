import { AppelFinal } from '@/components/AppelFinal';
import { BandeauPartenaires } from '@/components/accueil/BandeauPartenaires';
import { Hero } from '@/components/accueil/Hero';
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
      <AppelFinal />
    </>
  );
}
