import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AppelFinal } from '@/components/AppelFinal';
import { Agenda } from '@/components/evenements/Agenda';
import { AgendaFiltre } from '@/components/evenements/AgendaFiltre';
import { EnTetePage } from '@/components/ui/EnTetePage';
import { pages } from '@/content/site';
import { metaPage } from '@/lib/meta';
import { getEvenements } from '@/lib/evenements';

export const metadata: Metadata = metaPage('Événements', pages.evenements.description);

export default async function PageEvenements() {
  const { surtitre, titre, titreSuite, description } = pages.evenements;
  const { aVenir, passes } = await getEvenements();

  return (
    <>
      <EnTetePage surtitre={surtitre} titre={titre} titreSuite={titreSuite} description={description} />

      {/* Pendant le chargement (et sans JavaScript), tous les événements s'affichent. */}
      <Suspense fallback={<Agenda aVenir={aVenir} passes={passes} filtre="tous" />}>
        <AgendaFiltre aVenir={aVenir} passes={passes} />
      </Suspense>

      <AppelFinal />
    </>
  );
}
