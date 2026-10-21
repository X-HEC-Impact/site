import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, Handshake, Mail } from "lucide-react";
import { CopierEmail } from "@/components/contact/CopierEmail";
import { Bouton } from "@/components/ui/Bouton";
import { IconeInstagram, IconeLinkedin } from "@/components/ui/IconesReseaux";
import { Lien } from "@/components/ui/Lien";
import { marges } from "@/components/ui/Section";
import { EnTetePage } from "@/components/ui/EnTetePage";
import { association, pages } from "@/content/site";
import { metaPage } from "@/lib/meta";
import { cx, estPlaceholder, typo } from "@/lib/utils";

export const metadata: Metadata = metaPage(
  "Contact",
  pages.contact.description,
);

/** Un réseau : pastille, titre, texte, avec une flèche quand le lien existe. */
function Reseau({
  icone,
  titre,
  texte,
  href,
  libelleLien,
}: {
  icone: ReactNode;
  titre: string;
  texte: string;
  href?: string;
  libelleLien?: string;
}) {
  const contenu = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-bouton bg-white text-sapin ring-1 ring-filet">
        {icone}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-titre text-xl font-medium text-sapin">
          {titre}
        </span>
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
  const classes =
    "flex items-start gap-5 rounded-bouton border border-filet bg-voile p-5 md:p-6";
  return (
    <li>
      {href ? (
        <Lien
          href={href}
          className={cx(classes, "group transition-colors hover:bg-white")}
        >
          {contenu}
        </Lien>
      ) : (
        <div className={classes}>{contenu}</div>
      )}
    </li>
  );
}

export default function PageContact() {
  const { surtitre, titre, titreSuite, description } = pages.contact;
  const { email, linkedin, instagram } = association;
  const emailPret = !estPlaceholder(email);
  const { partenariats } = pages.contact;

  const reseaux = [
    linkedin && {
      icone: <IconeLinkedin className="size-5" />,
      titre: "LinkedIn",
      texte: pages.contact.linkedin,
      href: estPlaceholder(linkedin) ? undefined : linkedin,
      libelleLien: "Voir la page X-HEC Impact",
    },
    instagram && {
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
      />

      {/* L'e-mail, en grand, et les réseaux à côté */}
      <div className="border-b border-filet">
        <div
          className={cx(
            marges,
            "grid gap-12 py-14 md:grid-cols-12 md:gap-16 md:py-20",
          )}
        >
          <section aria-labelledby="email-titre" className="md:col-span-7">
            <h2 id="email-titre" className="surtitre">
              {pages.contact.email.surtitre}
            </h2>
            <p className="mt-3 max-w-xl text-[17px]">
              {typo(pages.contact.email.texte)}
            </p>
            <p className="mt-8 flex items-center gap-3 font-titre text-[28px] leading-tight font-medium tracking-[-0.02em] break-all text-sapin sm:text-[40px]">
              <Mail
                aria-hidden
                className="size-7 shrink-0 text-vif-texte sm:size-9"
                strokeWidth={1.75}
              />
              {emailPret ? (
                <a
                  href={`mailto:${email}`}
                  className="underline-offset-[6px] hover:underline"
                >
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
          </section>

          {reseaux.length > 0 && (
            <ul aria-label="Réseaux" className="space-y-4 md:col-span-5">
              {reseaux.map((r) => (
                <Reseau key={r.titre} {...r} />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Partenariats : bandeau pleine largeur */}
      <section
        aria-labelledby="partenariats-titre"
        className={cx(marges, "border-b border-filet bg-menthe py-14 md:py-16")}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-bouton bg-white text-sapin ring-1 ring-filet">
              <Handshake aria-hidden className="size-5" strokeWidth={1.75} />
            </span>
            <div>
              <h2 id="partenariats-titre" className="text-2xl">
                {partenariats.titre}
              </h2>
              <p className="mt-2 max-w-xl">{typo(partenariats.texte)}</p>
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
