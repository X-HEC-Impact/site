import type { Metadata } from 'next';
import { association } from '@/content/site';

/**
 * Titre, description et aperçu de partage d'une page.
 * imageGenerale: false pour une page qui a sa propre image (opengraph-image.tsx).
 */
export function metaPage(titre: string, description: string, imageGenerale = true): Metadata {
  return {
    title: titre,
    description,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName: association.nom,
      title: `${titre} · ${association.nom}`,
      description,
      // Image générale du site ; les pages d'événements ont la leur (opengraph-image.tsx).
      ...(imageGenerale ? { images: [{ url: '/opengraph-image', width: 1200, height: 630 }] } : {}),
    },
  };
}
