import { AppelFinal } from '@/components/AppelFinal';
import { BandeauPartenaires } from '@/components/accueil/BandeauPartenaires';
import { Hero } from '@/components/accueil/Hero';
import { ProchainsEvenements } from '@/components/accueil/ProchainsEvenements';
import { SectionFormats } from '@/components/accueil/SectionFormats';

export default function Accueil() {
  return (
    <>
      <Hero />
      <SectionFormats />
      <ProchainsEvenements />
      <AppelFinal />
      <BandeauPartenaires />
    </>
  );
}
