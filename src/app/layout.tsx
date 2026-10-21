import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { BarreAnnonce } from '@/components/layout/BarreAnnonce';
import { EnTete } from '@/components/layout/EnTete';
import { PiedDePage } from '@/components/layout/PiedDePage';
import { association, boutonInscription } from '@/content/site';
import { getEvenements } from '@/lib/evenements';
import { SCRIPT_APPARITIONS, SCRIPT_ENTETE } from '@/lib/animations';
import { urlSite } from '@/lib/url';
import './globals.css';

// Les polices sont téléchargées au build et servies par le site (aucun appel à Google côté visiteur).
// Plus Jakarta Sans, pour les titres comme pour le texte.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
  title: {
    default: `${association.nom} · Entreprendre pour l'impact`,
    template: `%s · ${association.nom}`,
  },
  description: association.description,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: association.nom,
    title: `${association.nom} · Entreprendre pour l'impact`,
    description: association.description,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#062a21',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  // Prochain événement ouvert aux inscriptions (sinon, pas de bouton « S'inscrire »).
  const { aVenir } = await getEvenements();
  const ouvert = aVenir.find((e) => e.inscriptionsOuvertes && !e.reserveA);
  const inscription = ouvert
    ? { href: `/evenements/${ouvert.slug}#inscription`, libelle: boutonInscription.libelle }
    : null;

  return (
    // suppressHydrationWarning : le script d'animations ajoute la classe « js » à <html> avant l'hydratation.
    <html lang="fr" className={jakarta.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_ENTETE }} />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only z-50 rounded-bouton bg-sapin px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>

        <BarreAnnonce />

        {/* Pleine largeur : les fonds vont d'un bord à l'autre, le contenu reste centré (voir .marges). */}
        <div className="flex min-h-screen flex-col overflow-x-clip">
          <EnTete inscription={inscription} />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <PiedDePage />
        </div>

        <script dangerouslySetInnerHTML={{ __html: SCRIPT_APPARITIONS }} />
      </body>
    </html>
  );
}
