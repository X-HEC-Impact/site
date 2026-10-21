import type { MetadataRoute } from 'next';
import { evenements } from '@/content/site';
import { urlSite } from '@/lib/url';

/** Liste des pages pour les moteurs de recherche (mise à jour automatiquement). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/evenements', '/equipe', '/contact'];
  return [
    ...pages.map((chemin) => ({ url: `${urlSite}${chemin}` })),
    ...evenements.map((e) => ({ url: `${urlSite}/evenements/${e.slug}` })),
  ];
}
