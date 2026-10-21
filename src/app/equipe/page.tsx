import type { Metadata } from 'next';
import { AppelFinal } from '@/components/AppelFinal';
import { EditionsPrecedentes } from '@/components/equipe/EditionsPrecedentes';
import { GrilleEquipe } from '@/components/equipe/GrilleEquipe';
import { MotEquipe } from '@/components/equipe/MotEquipe';
import { EnTetePage } from '@/components/ui/EnTetePage';
import { pages } from '@/content/site';
import { metaPage } from '@/lib/meta';

export const metadata: Metadata = metaPage('Équipe', pages.equipe.description);

export default function PageEquipe() {
  const { surtitre, titre, titreSuite, description } = pages.equipe;

  return (
    <>
      <EnTetePage surtitre={surtitre} titre={titre} titreSuite={titreSuite} description={description} position="50% 78%" />
      <GrilleEquipe />
      <MotEquipe />
      <EditionsPrecedentes />
      <AppelFinal />
    </>
  );
}
