import { AppelFinal } from '@/components/AppelFinal';
import { BandeauPartenaires } from '@/components/accueil/BandeauPartenaires';
import { Hero } from '@/components/accueil/Hero';
import { SectionFormats } from '@/components/accueil/SectionFormats';

export default function Accueil() {
  return (
    <>
      <Hero />
      <SectionFormats />
      <AppelFinal photo />
      <BandeauPartenaires />
    </>
  );
}
