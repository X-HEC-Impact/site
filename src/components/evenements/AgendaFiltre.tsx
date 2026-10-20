'use client';

import { useSearchParams } from 'next/navigation';
import { formats, type Evenement, type FormatEvenement } from '@/content/site';
import { Agenda, type Filtre } from './Agenda';

/** Lit le filtre dans l'adresse (?format=lex) et affiche l'agenda filtré. */
export function AgendaFiltre({ aVenir, passes }: { aVenir: Evenement[]; passes: Evenement[] }) {
  const format = useSearchParams().get('format');
  const filtre: Filtre = format && Object.hasOwn(formats, format) ? (format as FormatEvenement) : 'tous';

  return <Agenda aVenir={aVenir} passes={passes} filtre={filtre} />;
}
