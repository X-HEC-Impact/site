'use client';

import { useSearchParams } from 'next/navigation';
import { sujetValide } from '@/lib/contact';
import { FormulaireContact } from './FormulaireContact';

/** Lit le sujet dans l'adresse (?sujet=table-ronde) et le présélectionne dans le formulaire. */
export function FormulaireContactUrl() {
  const sujet = sujetValide(useSearchParams().get('sujet'));
  return <FormulaireContact sujetInitial={sujet} />;
}
