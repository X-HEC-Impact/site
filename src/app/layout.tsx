import type { Metadata, Viewport } from 'next';
import { Funnel_Display, Funnel_Sans } from 'next/font/google';
import { BarreAnnonce } from '@/components/layout/BarreAnnonce';
import { EnTete } from '@/components/layout/EnTete';
import { PiedDePage } from '@/components/layout/PiedDePage';
import { association, boutonInscription } from '@/content/site';
import { getEvenements } from '@/lib/evenements';
import { urlSite } from '@/lib/url';
import './globals.css';

// Les polices sont téléchargées au build et servies par le site (aucun appel à Google côté visiteur).
// Funnel Display pour les titres, Funnel Sans pour le texte : une même famille, plus de caractère qu'Inter.
const funnelSans = Funnel_Sans({ subsets: ['latin'], variable: '--font-funnel-sans', display: 'swap' });
const funnelDisplay = Funnel_Display({ subsets: ['latin'], variable: '--font-funnel-display', display: 'swap' });

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
    <html lang="fr" className={`${funnelSans.variable} ${funnelDisplay.variable}`}>
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
            <EnTete inscription={inscription} />
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
