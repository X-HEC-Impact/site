# Site de X-HEC Impact

Le site de l'association X-HEC Impact (Master Entrepreneurs X-HEC) : accueil, agenda des événements, page de chaque événement, équipe et contact.

- **En ligne** : https://xhec-impact.vercel.app
- **Code** : https://github.com/X-HEC-Impact/site

Ce guide s'adresse à l'équipe qui reprend le site, même sans expérience du code. Pour la plupart des mises à jour, **un seul fichier suffit : `src/content/site.ts`**.

---

## Sommaire

1. [Modifier un texte](#1-modifier-un-texte)
2. [Ajouter ou modifier un événement](#2-ajouter-ou-modifier-un-événement)
3. [Ajouter ou modifier un membre de l'équipe](#3-ajouter-ou-modifier-un-membre-de-léquipe)
4. [Ajouter un partenaire ou un logo](#4-ajouter-un-partenaire-ou-un-logo)
5. [Images : où les mettre, quel format](#5-images--où-les-mettre-quel-format)
6. [Mettre le site en ligne](#6-mettre-le-site-en-ligne)
7. [Lancer le site sur son ordinateur](#7-lancer-le-site-sur-son-ordinateur)
8. [Inscriptions et Supabase](#8-inscriptions-et-supabase)
9. [Variables d'environnement](#9-variables-denvironnement)
10. [Comment le site est construit](#10-comment-le-site-est-construit)
11. [Règles à respecter](#11-règles-à-respecter)

---

## 1. Modifier un texte

Tous les textes sont dans **`src/content/site.ts`**, rangés par page :

| Ce que vous voulez changer | Où, dans `site.ts` |
|---|---|
| E-mail, LinkedIn, Instagram de l'asso | `association` |
| Barre verte tout en haut (« Prochain événement… ») | `annonce` (mettre `afficher: false` pour la cacher) |
| Textes de l'accueil (titre, présentation, sections) | `accueil` |
| Les trois formats (LEX, conférences, hackathon) | `formats` |
| Titres et textes des pages Événements, Équipe, Contact | `pages` |

**Depuis GitHub, sans rien installer** : ouvrez le fichier sur github.com, cliquez sur le crayon ✏️, modifiez, puis « Commit changes ». Le site se met à jour tout seul en 1 à 2 minutes (voir [§ 6](#6-mettre-le-site-en-ligne)).

> ⚠️ Gardez bien les guillemets `'…'` et les virgules en fin de ligne. Pour écrire une apostrophe dans un texte, utilisez l'apostrophe typographique `’` (ou entourez le texte de guillemets doubles `"…"`).

**Placeholders** : une information pas encore connue s'écrit entre crochets, par exemple `'[EMAIL]'`. Elle s'affiche telle quelle sur le site, pour qu'on la repère facilement. Les liens vers une adresse entre crochets ne sont pas cliquables.

---

## 2. Ajouter ou modifier un événement

Les événements sont dans la liste `evenements` de `src/content/site.ts`. Pour en ajouter un, copiez un bloc `{ … },` existant et modifiez-le. Le plus simple :

```ts
{
  slug: 'conference-climat-2027',        // adresse : /evenements/conference-climat-2027 (sans espace ni accent)
  type: 'conference',                    // 'lex', 'conference' ou 'hackathon'
  titre: 'Conférence, financer le climat',  // une virgule = titre en deux couleurs
  date: '2027-02-12',                    // AAAA-MM-JJ, ou AAAA-MM si seul le mois est connu, ou '[DATE]'
  lieu: 'HEC Paris, Jouy-en-Josas',
  description: `Premier paragraphe.

Deuxième paragraphe (séparé par une ligne vide).`,
  inscriptionsOuvertes: true,            // true = formulaire d'inscription sur la page
},
```

**Ce qui se fait tout seul :**
- l'événement apparaît dans l'agenda, sur l'accueil (« Prochains événements ») et dans le plan du site ;
- il passe dans « Événements passés » le lendemain de sa date (ou à la fin du mois pour une date `AAAA-MM`) ;
- une image de partage est créée pour LinkedIn / WhatsApp ;
- si `inscriptionsOuvertes: true`, le bouton noir **« S'inscrire »** apparaît dans le menu et mène au formulaire. Quand aucun événement n'est ouvert, le bouton disparaît.

**Champs facultatifs** (voir les événements existants pour des exemples) :

| Champ | Effet |
|---|---|
| `dateFin` | événement sur plusieurs jours |
| `accroche` | phrase sous le titre |
| `image`, `imageAlt` | bannière en haut de la page (sinon : le visuel dessiné du format) |
| `photos` | galerie « En images » en bas de la page |
| `chiffres` | rangée de chiffres clés (4 idéalement) |
| `thematiques` | cartes de thématiques |
| `programme` | programme heure par heure (`quand` / `quoi`) |
| `etapes` | itinéraire numéroté (utilisé pour la LEX) |
| `rencontres`, `secteurs` | types de rencontres (LEX) |
| `intervenants`, `intervenantsNote` | intervenants et jury |
| `partenaires` | logos des partenaires de l'événement |
| `soutien` | bloc « Soutenir le projet » : budget, niveaux, contact (LEX) |
| `reserveA` | événement interne, sans inscription publique : le texte remplace le formulaire |

Pour **retirer** un événement, supprimez son bloc. Pour le **cacher temporairement**, le plus simple est de le mettre en commentaire (ajoutez `//` devant chaque ligne).

---

## 3. Ajouter ou modifier un membre de l'équipe

Liste `equipe` dans `src/content/site.ts` :

```ts
{
  prenom: 'Camille',
  nom: 'Martin',
  role: 'Responsable partenariats',
  photo: '/images/team/camille-martin.webp',
  linkedin: 'https://www.linkedin.com/in/camille-martin/',
},
```

1. Déposez la photo dans `public/images/team/` (photo **carrée**, fond gris uni de préférence, pour que l'équipe reste homogène).
2. Ajoutez le bloc ci-dessus. L'ordre de la liste est l'ordre d'affichage.
3. Sans `linkedin`, l'icône ne s'affiche pas.

**Passation annuelle** : remplacez les membres, et ajoutez l'équipe sortante dans `pages.equipe.editions` (bloc « Les éditions précédentes »).

---

## 4. Ajouter un partenaire ou un logo

- **Bandeau défilant de l'accueil** : liste `partenaires` dans `site.ts`.
- **Partenaires d'un événement** : champ `partenaires` de l'événement.

Déposez le logo dans `public/images/partners/` puis indiquez son chemin :
```ts
{ nom: 'Climate House', logo: '/images/partners/climate-house.png' },
```
Format conseillé : **PNG à fond transparent** (ou SVG), recadré au plus près du logo. Sans `logo`, le nom s'affiche à la place.

---

## 5. Images : où les mettre, quel format

| Dossier | Contenu | Conseils |
|---|---|---|
| `public/images/team/` | portraits | carré, ~640 px, JPG ou WebP |
| `public/images/partners/` | logos | PNG transparent ou SVG |
| `public/images/events/<slug>/` | bannières et photos d'événements | ~1600 px de large, JPG |
| `public/images/textures/` | grain des visuels dessinés (`src/components/ui/Motif.tsx`) | ne pas toucher |

Les images sont optimisées automatiquement à l'affichage, mais évitez les fichiers de plusieurs Mo : redimensionnez-les avant. Retirez aussi les métadonnées (localisation GPS) des photos.

Les noms de fichiers : minuscules, sans espace ni accent (`camille-martin.webp`).

---

## 6. Mettre le site en ligne

Le site est hébergé sur **Vercel** (projet `xhec-impact`), relié au dépôt GitHub `X-HEC-Impact/site`.

- **Chaque modification poussée sur la branche `main` est mise en ligne automatiquement** en 1 à 2 minutes.
- Si la mise en ligne échoue (erreur dans le code), l'ancienne version reste en ligne : rien ne casse. L'erreur est visible dans Vercel → Deployments.
- Pour tester une modification sans la publier : créez une branche et une pull request sur GitHub. Vercel crée une adresse d'aperçu.

**Accès** : le compte Vercel est celui de [à compléter : qui]. Pensez à transmettre l'accès (et celui de l'organisation GitHub) à l'équipe suivante.

**Nom de domaine** : pour passer de `xhec-impact.vercel.app` à un domaine propre (ex. `xhec-impact.fr`), ajoutez-le dans Vercel → Settings → Domains, puis changez `NEXT_PUBLIC_SITE_URL` (voir [§ 9](#9-variables-denvironnement)).

---

## 7. Lancer le site sur son ordinateur

Utile pour tester une grosse modification avant de la publier.

Prérequis : [Node.js](https://nodejs.org) 20 ou plus récent, et Git.

```bash
git clone https://github.com/X-HEC-Impact/site.git
cd site
npm install
cp .env.example .env.local     # puis remplir les valeurs si besoin (§ 9)
npm run dev
```

Ouvrez http://localhost:3000. Les modifications s'affichent dès que vous enregistrez un fichier.

Avant de pousser du code :
```bash
npm run lint      # vérifie le code
npm run build     # vérifie que le site se construit sans erreur
```

---

## 8. Inscriptions et Supabase

Le formulaire d'inscription enregistre les inscriptions dans une base **Supabase** (table `inscriptions`). Tant que Supabase n'est pas configuré, le formulaire affiche « Les inscriptions en ligne ne sont pas encore activées ».

**Mise en place (une seule fois)** :
1. Créez un projet sur [supabase.com](https://supabase.com) (région **West EU (Paris)**).
2. Dans **SQL Editor**, collez le contenu de `supabase/schema.sql` et cliquez sur **Run**.
3. Récupérez l'URL du projet et la clé secrète (`service_role`) dans **Project Settings**.
4. Ajoutez-les dans Vercel (voir [§ 9](#9-variables-denvironnement)), puis redéployez.

**Consulter les inscriptions** : Supabase → Table Editor → `inscriptions` (export CSV possible). Une requête d'exemple est en bas de `supabase/schema.sql`.

**Sécurité** :
- la table est protégée (RLS activé, aucune règle publique) : seul le serveur du site peut écrire ;
- une même adresse ne peut s'inscrire qu'une fois par événement ;
- **ne partagez jamais la clé `service_role`** (ni dans le code, ni sur Slack, ni par e-mail) : elle donne tous les droits sur la base.

---

## 9. Variables d'environnement

À renseigner dans **Vercel → Settings → Environment Variables** (et dans `.env.local` pour travailler en local). Modèle : `.env.example`.

| Variable | Rôle | Obligatoire ? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | adresse publique du site (images de partage, plan du site) | non (par défaut `https://xhec-impact.vercel.app`) |
| `SUPABASE_URL` | URL du projet Supabase | pour les inscriptions |
| `SUPABASE_SERVICE_ROLE_KEY` | clé secrète Supabase, côté serveur uniquement | pour les inscriptions |

Après avoir modifié une variable dans Vercel, **redéployez** (Deployments → ⋯ → Redeploy) pour qu'elle soit prise en compte.

---

## 10. Comment le site est construit

- [Next.js](https://nextjs.org) 16 (App Router), TypeScript, [Tailwind CSS](https://tailwindcss.com) 4
- Icônes : [lucide-react](https://lucide.dev)
- Formulaire : validation avec [zod](https://zod.dev), enregistrement via une *Server Action* dans Supabase

```
src/
├── content/site.ts        ← TOUT le contenu du site
├── app/                   ← les pages (une page = un dossier)
│   ├── page.tsx           ← accueil
│   ├── evenements/        ← agenda + page de chaque événement
│   ├── equipe/  contact/
│   ├── opengraph-image.tsx← image de partage générale
│   ├── sitemap.ts  robots.ts
│   └── globals.css        ← couleurs, typographie, animations
├── components/            ← les blocs réutilisables (rangés par page)
└── lib/                   ← dates, inscriptions, Supabase, images de partage
public/images/             ← photos, logos, textures
supabase/schema.sql        ← création de la table des inscriptions
assets/fonts/              ← polices utilisées pour les images de partage
```

**Direction artistique** : une colonne de 1200 px bordée de fins filets, sections séparées par un filet, titres en deux tons (le texte après la virgule passe en gris-vert), un vert sapin pour les textes forts, un vert vif pour les boutons et chiffres clés. Les couleurs sont définies en haut de `src/app/globals.css` ; les espacements de toutes les sections dans `src/components/ui/Section.tsx`.

Le fichier `AGENTS.md` est généré automatiquement par Next.js : ne pas y toucher.

---

## 11. Règles à respecter

- **N'inventez aucun chiffre, nom ou citation** : en cas de doute, laissez un placeholder `'[…]'`.
- **Aucun secret dans le code** : les clés vont dans Vercel, jamais dans un fichier poussé sur GitHub (`.env.local` est ignoré par Git).
- **Accessibilité** : décrivez chaque photo (`alt`), gardez des contrastes suffisants (ne mettez pas de texte vert vif sur fond blanc).
- **Avant un gros changement** : testez en local ou via une pull request, et vérifiez le rendu sur téléphone.
