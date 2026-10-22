import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/* ------------------------------------------------------------------
   Image d'aperçu affichée quand on partage un lien du site
   (LinkedIn, WhatsApp, Slack…). Format 1200 × 630.
   Même langage que le site : paysage teinté de vert sapin, Plus Jakarta Sans,
   logo, ondes qui partent du coin, titre en deux tons.
   ------------------------------------------------------------------ */

export const taillePartage = { width: 1200, height: 630 };

const couleurs = {
  sapin: '#062a21',
  vif: '#2ec27e',
};

/** Pastille du format (mêmes pastels que les cartes du site). */
export const pastillesFormat = {
  lex: '#e3f5ea',
  conference: '#e5eefb',
  hackathon: '#eef1d6',
} as const;

/**
 * Photos disponibles pour l'image (dans assets/partage/, 1200 px de large) :
 * le même paysage que l'en-tête de la page correspondante.
 */
const photos = {
  paysage: { hauteur: 800, position: '50% 42%' },
  cascade: { hauteur: 899, position: '50% 38%' },
  'lac-montagne': { hauteur: 675, position: '50% 40%' },
} as const;

type NomPhoto = keyof typeof photos;

/** « /images/contact/cascade.webp » → la photo « cascade ». Sans correspondance : le paysage de l'accueil. */
export function photoPartage(src?: string, position?: string) {
  const nom = (src?.split('/').pop()?.replace(/\.\w+$/, '') ?? 'paysage') as NomPhoto;
  const connue = nom in photos ? nom : 'paysage';
  return { nom: connue as NomPhoto, position: position ?? photos[connue].position };
}

async function polices() {
  const dossier = join(process.cwd(), 'assets/fonts');
  const [normal, moyen, gras] = await Promise.all([
    readFile(join(dossier, 'plus-jakarta-sans-latin-400-normal.woff')),
    readFile(join(dossier, 'plus-jakarta-sans-latin-500-normal.woff')),
    readFile(join(dossier, 'plus-jakarta-sans-latin-700-normal.woff')),
  ]);
  return [
    { name: 'Plus Jakarta Sans', data: normal, weight: 400 as const, style: 'normal' as const },
    { name: 'Plus Jakarta Sans', data: moyen, weight: 500 as const, style: 'normal' as const },
    { name: 'Plus Jakarta Sans', data: gras, weight: 700 as const, style: 'normal' as const },
  ];
}

async function dataPhoto(nom: NomPhoto) {
  const octets = await readFile(join(process.cwd(), 'assets/partage', `${nom}.jpg`));
  return `data:image/jpeg;base64,${octets.toString('base64')}`;
}

type Props = {
  /** Étiquette du format au-dessus du titre (événements). */
  pastille?: { texte: string; fond: string };
  titre: string;
  titreSuite?: string;
  /** Mot du titre souligné d'un trait vert (comme sur l'accueil). */
  souligne?: string;
  /** Ligne sous le titre (accueil). */
  sousTitre?: string;
  /** Lignes en bas de l'image, par exemple la date et le lieu. */
  details?: string[];
  /** Photo de fond : voir photoPartage(). */
  photo?: { nom: NomPhoto; position: string };
};

/** Le titre en deux tons ; le mot « souligne » reçoit le trait vert tracé à la main. */
function Suite({ texte, souligne, taille }: { texte: string; souligne?: string; taille: number }) {
  const i = souligne ? texte.indexOf(souligne) : -1;
  if (!souligne || i === -1) return <span style={{ color: 'rgba(255,255,255,0.78)' }}>{texte}</span>;
  const avant = texte.slice(0, i);
  const apres = texte.slice(i + souligne.length);
  return (
    <div style={{ display: 'flex', color: 'rgba(255,255,255,0.78)' }}>
      {avant && <span>{avant}</span>}
      <div style={{ display: 'flex', position: 'relative', color: 'white' }}>
        <span>{souligne}</span>
        <svg
          width="100"
          height="22"
          viewBox="0 0 300 24"
          preserveAspectRatio="none"
          style={{ position: 'absolute', left: -6, bottom: -Math.round(taille * 0.02), width: '106%', height: Math.round(taille * 0.16) }}
        >
          <path d="M3 15 C 60 6, 130 4, 190 9 S 270 16, 297 8" fill="none" stroke={couleurs.vif} strokeWidth="9" strokeLinecap="round" />
        </svg>
      </div>
      {apres && <span>{apres}</span>}
    </div>
  );
}

export async function imagePartage({
  pastille,
  titre,
  titreSuite,
  souligne,
  sousTitre,
  details = [],
  photo = photoPartage(),
}: Props) {
  const caracteres = titre.length + (titreSuite?.length ?? 0);
  // Titre d'accueil (deux lignes courtes) : grand ; titre d'événement (plus long) : plus petit.
  const taille = souligne ? 112 : caracteres > 40 ? 62 : caracteres > 24 ? 74 : 88;
  const [fonts, image] = await Promise.all([polices(), dataPhoto(photo.nom)]);
  const hauteurPhoto = photos[photo.nom].hauteur;
  const decalage = Math.round((hauteurPhoto - taillePartage.height) * (parseFloat(photo.position.split(' ')[1]) / 100));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: couleurs.sapin,
          fontFamily: 'Plus Jakarta Sans',
          color: 'white',
        }}
      >
        {/* Photo, voile vert sapin (plus dense à gauche, là où est le texte) */}
        {/* eslint-disable-next-line @next/next/no-img-element -- rendu par next/og, pas par le navigateur */}
        <img
          src={image}
          width={1200}
          height={hauteurPhoto}
          alt=""
          style={{ position: 'absolute', left: 0, top: -decalage, width: 1200, height: hauteurPhoto }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            backgroundImage: 'linear-gradient(to right, rgba(6,42,33,0.9) 0%, rgba(6,42,33,0.7) 50%, rgba(6,42,33,0.58) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            backgroundImage: 'linear-gradient(to top, rgba(6,42,33,0.8) 0%, rgba(6,42,33,0) 55%)',
          }}
        />

        {/* Les ondes du logo, qui partent du coin en bas à droite */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', left: 0, top: 0 }}>
          {[90, 170, 250, 330, 410, 490, 570, 650].map((r, i) => (
            <circle key={r} cx="1128" cy="576" r={r} fill="none" stroke="white" strokeWidth="1.5" strokeOpacity={0.2 - i * 0.015} />
          ))}
          <circle cx="1128" cy="576" r="14" fill={couleurs.vif} />
        </svg>

        {/* Contenu */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 76px 64px',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <svg width="64" height="64" viewBox="-60 -80 140 140">
              <circle r="14.5" fill="#7fd28a" />
              <path d="M-24.75 -24.75A35 35 0 0 1 24.75 24.75" fill="none" stroke="#7fd28a" strokeWidth="10" strokeLinecap="round" />
              <path d="M-38.89 -38.89A55 55 0 0 1 38.89 38.89" fill="none" stroke="#5aa469" strokeWidth="10" strokeLinecap="round" />
              <path d="M-52.33 -52.33A74 74 0 0 1 52.33 52.33" fill="none" stroke="#3e7750" strokeWidth="10" strokeLinecap="round" />
            </svg>
            <div style={{ display: 'flex', fontSize: 38, letterSpacing: -0.8 }}>
              <span style={{ fontWeight: 700 }}>X-HEC</span>
              <span style={{ color: couleurs.vif, marginLeft: 10 }}>impact</span>
            </div>
          </div>

          {/* Titre */}
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
            {pastille && (
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'flex-start',
                  padding: '9px 20px',
                  borderRadius: 999,
                  backgroundColor: pastille.fond,
                  color: couleurs.sapin,
                  fontSize: 24,
                  fontWeight: 500,
                }}
              >
                {pastille.texte}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: souligne ? 'column' : 'row',
                flexWrap: 'wrap',
                marginTop: pastille ? 24 : 0,
                fontSize: taille,
                fontWeight: 500,
                lineHeight: souligne ? 1.04 : 1.1,
                letterSpacing: -taille * 0.035,
              }}
            >
              <span style={{ marginRight: souligne ? 0 : 20 }}>{titre}</span>
              {titreSuite && <Suite texte={titreSuite} souligne={souligne} taille={taille} />}
            </div>
            {sousTitre && (
              <div style={{ display: 'flex', marginTop: 30, fontSize: 28, fontWeight: 500, color: 'rgba(255,255,255,0.88)' }}>
                {sousTitre}
              </div>
            )}
            {details.length > 0 && (
              <div style={{ display: 'flex', marginTop: 28, gap: 14, fontSize: 28, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                {details.flatMap((detail, i) =>
                  i === 0
                    ? [<span key={detail}>{detail}</span>]
                    : [
                        <span key={`${detail}-sep`} style={{ color: couleurs.vif }}>
                          ·
                        </span>,
                        <span key={detail}>{detail}</span>,
                      ],
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...taillePartage, fonts: fonts },
  );
}
