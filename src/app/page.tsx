import { AppelFinal } from '@/components/accueil/AppelFinal';
import { BandeauPartenaires } from '@/components/accueil/BandeauPartenaires';
import { Hero } from '@/components/accueil/Hero';
import { MotDuPresident } from '@/components/accueil/MotDuPresident';
import { ProchainsEvenements } from '@/components/accueil/ProchainsEvenements';
import { SectionFormats } from '@/components/accueil/SectionFormats';

export default function Accueil() {
  return (
    <>
      <Hero />
      <BandeauPartenaires />
      <SectionFormats />
      <ProchainsEvenements />
      <MotDuPresident />
      <AppelFinal />
    </>
  );
}
