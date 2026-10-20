'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { classesBouton } from '@/components/ui/Bouton';

/** Bouton « Copier l'adresse » : pratique quand on n'a pas de logiciel de messagerie configuré. */
export function CopierEmail({ email }: { email: string }) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    try {
      await navigator.clipboard.writeText(email);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      // Presse-papiers indisponible : on ne fait rien, l'adresse reste lisible à l'écran.
    }
  }

  return (
    <button type="button" onClick={copier} className={classesBouton('contour')}>
      {copie ? <Check aria-hidden className="size-4 text-vif-texte" /> : <Copy aria-hidden className="size-4" />}
      <span aria-live="polite">{copie ? 'Adresse copiée' : 'Copier l’adresse'}</span>
    </button>
  );
}
