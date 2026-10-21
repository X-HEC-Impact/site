import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/* ------------------------------------------------------------------
   Image d'aperçu affichée quand on partage un lien du site
   (LinkedIn, WhatsApp, Slack…). Format 1200 × 630.
   ------------------------------------------------------------------ */

export const taillePartage = { width: 1200, height: 630 };

const couleurs = {
  sapin: '#062a21',
  vif: '#2ec27e',
  lichen: '#93aba3',
  citron: '#e4fa9b',
};

async function polices() {
  const dossier = join(process.cwd(), 'assets/fonts');
  const [titre, texte, texteMoyen] = await Promise.all([
    readFile(join(dossier, 'inter-tight-latin-500-normal.woff')),
    readFile(join(dossier, 'inter-latin-400-normal.woff')),
    readFile(join(dossier, 'inter-latin-500-normal.woff')),
  ]);
  return [
    { name: 'Inter Tight', data: titre, weight: 500 as const, style: 'normal' as const },
    { name: 'Inter', data: texte, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: texteMoyen, weight: 500 as const, style: 'normal' as const },
  ];
}

type Props = {
  surtitre: string;
  titre: string;
  titreSuite?: string;
  /** Lignes en bas de l'image, par exemple la date et le lieu. */
  details?: string[];
};

export async function imagePartage({ surtitre, titre, titreSuite, details = [] }: Props) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: couleurs.sapin,
          // Halo vert-jaune flou, rappel des textures du site.
          backgroundImage: `radial-gradient(circle at 92% 108%, ${couleurs.citron} 0%, ${couleurs.vif} 22%, rgba(6,42,33,0) 52%)`,
          fontFamily: 'Inter',
          color: 'white',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="56" height="56" viewBox="-60 -80 140 140">
            <circle r="14.5" fill="#7fd28a" />
            <path d="M-24.75 -24.75A35 35 0 0 1 24.75 24.75" fill="none" stroke="#7fd28a" strokeWidth="10" strokeLinecap="round" />
            <path d="M-38.89 -38.89A55 55 0 0 1 38.89 38.89" fill="none" stroke="#5aa469" strokeWidth="10" strokeLinecap="round" />
            <path d="M-52.33 -52.33A74 74 0 0 1 52.33 52.33" fill="none" stroke="#3e7750" strokeWidth="10" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', fontFamily: 'Inter Tight', fontSize: 30, letterSpacing: -0.6 }}>
            <span>X-HEC</span>
            <span style={{ color: '#7fd28a', marginLeft: 8 }}>impact</span>
          </div>
        </div>

        {/* Titre */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 960 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: couleurs.lichen,
            }}
          >
            {surtitre}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginTop: 20,
              fontFamily: 'Inter Tight',
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: -2,
            }}
          >
            <span style={{ marginRight: 20 }}>{titre}</span>
            {titreSuite && <span style={{ color: couleurs.lichen }}>{titreSuite}</span>}
          </div>
        </div>

        {/* Détails */}
        <div style={{ display: 'flex', gap: 28, fontSize: 26, color: 'rgba(255,255,255,0.85)', minHeight: 32 }}>
          {details.map((detail) => (
            <span key={detail}>{detail}</span>
          ))}
        </div>
      </div>
    ),
    { ...taillePartage, fonts: await polices() },
  );
}
