import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { ArrowUpRight, Handshake, Mail } from "lucide-react";
import { CopierEmail } from "@/components/contact/CopierEmail";
import { FormulaireContact } from "@/components/contact/FormulaireContact";
import { FormulaireContactUrl } from "@/components/contact/FormulaireContactUrl";
import { Bouton } from "@/components/ui/Bouton";
import { IconeInstagram, IconeLinkedin } from "@/components/ui/IconesReseaux";
import { Lien } from "@/components/ui/Lien";
import { PhotoFond } from "@/components/ui/PhotoFond";
import { marges } from "@/components/ui/Section";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { association, pages } from "@/content/site";
import { metaPage } from "@/lib/meta";
import { supabaseConfigure } from "@/lib/supabase";
import { cx, estPlaceholder, typo } from "@/lib/utils";

export const metadata: Metadata = metaPage(
  "Contact",
  pages.contact.description,
);

/** Carte pastel : pastille blanche à gauche, texte à droite (même langage que les cartes de l'accueil). */
const carte = "flex items-start gap-5 rounded-bouton p-5 text-ardoise md:p-6";
const tuile = "flex size-11 shrink-0 items-center justify-center rounded-bouton bg-white text-sapin";
const titreCarte = "block font-titre text-xl font-medium text-sapin";

/** Un réseau : pastille, titre, texte, avec une flèche quand le lien existe. */
function Reseau({
  icone,
  titre,
  texte,
  href,
  libelleLien,
  fond,
}: {
  icone: ReactNode;
  titre: string;
  texte: string;
  href?: string;
  libelleLien?: string;
  /** Couleur pastel de la carte. */
  fond: string;
}) {
  const contenu = (
    <>
      <span className={tuile}>{icone}</span>
      <span className="min-w-0 flex-1">
        <span className={titreCarte}>{titre}</span>
        <span className="mt-1 block text-[15px]">{typo(texte)}</span>
        {href && libelleLien && (
          <span className="mt-3 block font-medium text-sapin group-hover:underline group-hover:underline-offset-4">
            {libelleLien}
          </span>
        )}
      </span>
      {href && (
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-sapin transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
  const classes = cx(carte, "transition-transform duration-300 hover:-translate-y-0.5");
  return (
    <li>
      {href ? (
        <Lien
          href={href}
          className={cx(classes, fond, "group transition-[filter] hover:brightness-[0.97]")}
        >
          {contenu}
        </Lien>
      ) : (
        <div className={cx(classes, fond)}>{contenu}</div>
      )}
    </li>
  );
}

export default function PageContact() {
  const { surtitre, titre, titreSuite, description } = pages.contact;
  const { email, linkedin, instagram } = association;
  const emailPret = !estPlaceholder(email);
  const { partenariats, formulaire } = pages.contact;
  // Le formulaire apparaît dès que Supabase est configuré (voir README §8) ;
  // sinon la page garde l'adresse e-mail en grand, comme avant.
  const formulaireActif = supabaseConfigure();

  const reseaux = [
    linkedin && {
      fond: "bg-menthe",
      icone: <IconeLinkedin className="size-5" />,
      titre: "LinkedIn",
      texte: pages.contact.linkedin,
      href: estPlaceholder(linkedin) ? undefined : linkedin,
      libelleLien: "Voir la page X-HEC Impact",
    },
    instagram && {
      fond: "bg-prairie",
      icone: <IconeInstagram className="size-5" />,
      titre: "Instagram",
      texte: pages.contact.instagram,
      href: estPlaceholder(instagram) ? undefined : instagram,
      libelleLien: "Voir le compte",
    },
  ].filter((r) => !!r);

  return (
    <>
      <EnTetePage
        surtitre={surtitre}
        titre={titre}
        titreSuite={titreSuite}
        description={description}
        photo="50% 24%"
        photoSrc="/images/contact/cascade.webp"
      />

      {/* Bande sombre dans la continuité de l'en-tête photo : le formulaire en carte claire
          (ou l'e-mail en grand tant que Supabase n'est pas configuré), et les cartes pastel à côté. */}
      <section
        aria-label="Nous contacter"
        // Le haut de la bande est court : l'en-tête photo se fond déjà dans le vert sapin juste au-dessus.
        className={cx("section-sombre relative isolate overflow-clip bg-sapin pt-4 pb-20 md:pt-6 md:pb-28", marges)}
      >
        {/* L'ancre #formulaire (bouton « Nous écrire » de l'en-tête) mène ici, titre compris. */}
        <div id={formulaireActif ? "formulaire" : undefined}>
          {formulaireActif && (
            <div data-reveal="monte">
              <h2 className="surtitre">{formulaire.surtitre}</h2>
              <p className="mt-3 max-w-xl text-[17px] text-white/80">{typo(formulaire.texte)}</p>
            </div>
          )}

          <div className={cx("grid gap-12 md:grid-cols-12 md:gap-14 lg:gap-16", formulaireActif && "mt-8")}>
            {formulaireActif ? (
              <div data-reveal="monte" className="md:col-span-7">
                {/* L'adresse peut présélectionner un sujet (?sujet=table-ronde) ; en attendant, le formulaire s'affiche sans. */}
                <Suspense fallback={<FormulaireContact />}>
                  <FormulaireContactUrl />
                </Suspense>
              </div>
            ) : (
              <div data-reveal="monte" className="md:col-span-7">
                <h2 className="surtitre">{pages.contact.email.surtitre}</h2>
                <p className="mt-3 max-w-xl text-[17px] text-white/80">{typo(pages.contact.email.texte)}</p>
                <p className="mt-8 flex items-center gap-3 font-titre text-[clamp(20px,6vw,28px)] leading-tight font-medium tracking-[-0.02em] [overflow-wrap:anywhere] text-white sm:text-[34px] md:text-[clamp(22px,2.9vw,40px)]">
                  <Mail aria-hidden className="size-7 shrink-0 text-vif sm:size-9" strokeWidth={1.75} />
                  {emailPret ? (
                    <a href={`mailto:${email}`} className="underline-offset-[6px] hover:underline">
                      {email}
                    </a>
                  ) : (
                    <span>{email}</span>
                  )}
                </p>
                {emailPret && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Bouton href={`mailto:${email}`}>Nous écrire</Bouton>
                    <CopierEmail email={email} />
                  </div>
                )}
              </div>
            )}

            {/* Cartes pastel, comme les formats de l'accueil. Avec le formulaire, l'e-mail passe ici
                (et reste caché tant que l'adresse n'existe pas). */}
            <ul aria-label="Autres moyens de nous joindre" data-reveal="liste" className="space-y-4 self-start md:col-span-5">
              {formulaireActif && emailPret && (
                <li className={cx(carte, "bg-ciel")}>
                  <span className={tuile}>
                    <Mail aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={titreCarte}>{pages.contact.email.surtitre}</span>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 block text-[15px] font-medium break-all text-sapin underline-offset-4 hover:underline"
                    >
                      {email}
                    </a>
                    <span className="mt-4 block">
                      <CopierEmail email={email} />
                    </span>
                  </span>
                </li>
              )}
              {reseaux.map((r) => (
                <Reseau key={r.titre} {...r} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Partenariats : bandeau photo pleine largeur, comme la bannière finale des autres pages */}
      <section
        aria-labelledby="partenariats-titre"
        className={cx(marges, "section-sombre relative isolate overflow-clip py-20 md:py-28")}
      >
        <PhotoFond
          src="/images/contact/cascade.webp"
          position="45% 96%"
          voile="fort"
        />
        {/* Fondu depuis la bande sombre du dessus et vers le pied de page, sans arête */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-sapin to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-sapin to-transparent"
        />
        <div data-reveal="monte" className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-bouton bg-white text-sapin">
              <Handshake aria-hidden className="size-5" strokeWidth={1.75} />
            </span>
            <div>
              <h2 id="partenariats-titre" className="text-3xl text-white md:text-4xl">
                {partenariats.titre}
              </h2>
              <p className="mt-3 max-w-xl text-[17px] text-white/90">
                {typo(partenariats.texte)}
              </p>
            </div>
          </div>
          <Bouton
            href={partenariats.lien.href}
            className="self-start md:self-auto"
          >
            {partenariats.lien.libelle}
          </Bouton>
        </div>
      </section>
    </>
  );
}
