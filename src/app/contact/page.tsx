import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ArrowUpRight, Handshake, Mail } from 'lucide-react';
import { CopierEmail } from '@/components/contact/CopierEmail';
import { Bouton } from '@/components/ui/Bouton';
import { IconeInstagram, IconeLinkedin } from '@/components/ui/IconesReseaux';
import { Lien } from '@/components/ui/Lien';
import { marges } from '@/components/ui/Section';
import { EnTetePage } from '@/components/ui/EnTetePage';
import { Surtitre } from '@/components/ui/Titre';
import { association, pages } from '@/content/site';
import { metaPage } from '@/lib/meta';
import { cx, estPlaceholder, typo } from '@/lib/utils';

export const metadata: Metadata = metaPage('Contact', pages.contact.description);

/** Une case de la colonne de droite : icône, titre, texte et lien. */
function Cellule({
  icone,
  titre,
  texte,
  href,
  libelleLien,
  className,
}: {
  icone: ReactNode;
  titre: string;
  texte: string;
  href?: string;
  libelleLien?: string;
  className?: string;
}) {
  const contenu = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-bouton bg-white text-sapin ring-1 ring-filet">
          {icone}
        </span>
        {href && (
          <ArrowUpRight
            aria-hidden
            className="size-5 text-sapin transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </div>
      <h2 className="mt-8 text-2xl">{titre}</h2>
      <p className="mt-2">{typo(texte)}</p>
      {href && libelleLien && (
        <p className="mt-5 font-medium text-sapin group-hover:underline group-hover:underline-offset-4">
          {libelleLien}
        </p>
      )}
    </>
  );

  return (
    <li className={cx('border-b border-filet last:border-b-0', className)}>
      {href ? (
        <Lien href={href} className="group block p-6 transition-colors hover:bg-black/[0.02] md:p-10">
          {contenu}
        </Lien>
      ) : (
        <div className="p-6 md:p-10">{contenu}</div>
      )}
    </li>
  );
}

export default function PageContact() {
  const { surtitre, titre, titreSuite, description } = pages.contact;
  const { email, linkedin, instagram } = association;
  const emailPret = !estPlaceholder(email);
  const { partenariats } = pages.contact;

  return (
    <>
      <EnTetePage surtitre={surtitre} titre={titre} titreSuite={titreSuite} description={description} />

      <div className="grid border-b border-filet md:grid-cols-12">
        {/* À gauche : l'e-mail */}
        <section aria-labelledby="email-titre" className={cx(marges, 'py-16 md:col-span-7 md:py-24')}>
          <Surtitre>
            <span id="email-titre">{pages.contact.email.surtitre}</span>
          </Surtitre>
          <p className="mt-4 text-[17px]">{typo(pages.contact.email.texte)}</p>

          <p className="mt-10 flex items-center gap-3 font-titre text-[28px] leading-tight font-medium tracking-[-0.02em] break-all text-sapin sm:text-[36px]">
            <Mail aria-hidden className="size-7 shrink-0 text-vif-texte" strokeWidth={1.75} />
            {emailPret ? (
              <a href={`mailto:${email}`} className="underline-offset-[6px] hover:underline">
                {email}
              </a>
            ) : (
              <span>{email}</span>
            )}
          </p>

          {emailPret && (
            <div className="mt-10 flex flex-wrap gap-3">
              <Bouton href={`mailto:${email}`}>Nous écrire</Bouton>
              <CopierEmail email={email} />
            </div>
          )}
        </section>

        {/* À droite : réseaux et partenariats */}
        <ul className="border-t border-filet md:col-span-5 md:border-t-0 md:border-l">
          {linkedin && (
            <Cellule
              icone={<IconeLinkedin className="size-5" />}
              titre="LinkedIn"
              texte={pages.contact.linkedin}
              href={estPlaceholder(linkedin) ? undefined : linkedin}
              libelleLien="Voir la page X-HEC Impact"
            />
          )}
          {instagram && (
            <Cellule
              icone={<IconeInstagram className="size-5" />}
              titre="Instagram"
              texte={pages.contact.instagram}
              href={estPlaceholder(instagram) ? undefined : instagram}
              libelleLien="Voir le compte"
            />
          )}
          <Cellule
            icone={<Handshake className="size-5" strokeWidth={1.75} />}
            titre={partenariats.titre}
            texte={partenariats.texte}
            href={partenariats.lien.href}
            libelleLien={partenariats.lien.libelle}
            className="bg-menthe"
          />
        </ul>
      </div>
    </>
  );
}
