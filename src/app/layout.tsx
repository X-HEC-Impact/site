import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import { BarreAnnonce } from '@/components/layout/BarreAnnonce';
import { EnTete } from '@/components/layout/EnTete';
import { PiedDePage } from '@/components/layout/PiedDePage';
import { association } from '@/content/site';
import './globals.css';

// Les polices sont téléchargées au build et servies par le site (aucun appel à Google côté visiteur).
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: `${association.nom} · Entreprendre pour l'impact`,
    template: `%s · ${association.nom}`,
  },
  description: association.description,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: association.nom,
  },
};

export const viewport: Viewport = {
  themeColor: '#062a21',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr" className={`${inter.variable} ${interTight.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only z-50 rounded-bouton bg-sapin px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>

        <BarreAnnonce />

        {/* La colonne « cadrée » : 1200 px max, bordée de deux filets verticaux (dès 768 px). */}
        <div className="md:px-6">
          <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col border-filet md:border-x">
            <EnTete />
            <main id="contenu" className="flex-1">
              {children}
            </main>
            <PiedDePage />
          </div>
        </div>
      </body>
    </html>
  );
}
