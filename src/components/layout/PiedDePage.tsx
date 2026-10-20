import type { ReactNode } from 'react';
import { Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Lien } from '@/components/ui/Lien';
import { IconeInstagram, IconeLinkedin } from '@/components/ui/IconesReseaux';
import { marges } from '@/components/ui/Section';
import { association, formats, navigation, type FormatEvenement } from '@/content/site';
import { cx, estPlaceholder } from '@/lib/utils';

function Colonne({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <div>
      <p className="surtitre">{titre}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

const classeLien = 'inline-flex items-center gap-2 text-ardoise transition-colors hover:text-sapin';

/** Lien vers un réseau social, ou placeholder visible tant que l'URL manque. */
function LienReseau({ href, libelle, icone }: { href: string; libelle: string; icone: ReactNode }) {
  if (estPlaceholder(href)) {
    return (
      <span className="flex flex-wrap items-center gap-x-2 text-ardoise">
        {icone}
        {libelle}
        <span className="text-xs whitespace-nowrap text-brume">[lien à venir]</span>
      </span>
    );
  }
  return (
    <Lien href={href} className={classeLien}>
      {icone}
      {libelle}
    </Lien>
  );
}

export function PiedDePage() {
  return (
    <footer className="text-[15px]">
      <div className={cx(marges, 'grid gap-12 py-14 md:grid-cols-12 md:py-16')}>
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm">{association.accroche}</p>
          <p className="mt-6">
            {estPlaceholder(association.email) ? (
              <span className={classeLien}>
                <Mail className="size-4" aria-hidden />
                {association.email}
              </span>
            ) : (
              <Lien href={`mailto:${association.email}`} className={cx(classeLien, 'font-medium text-sapin')}>
                <Mail className="size-4" aria-hidden />
                {association.email}
              </Lien>
            )}
          </p>
        </div>

        <nav
          aria-label="Plan du site"
          className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:col-span-7"
        >
          <Colonne titre="Site">
            {navigation.map((lien) => (
              <li key={lien.href}>
                <Lien href={lien.href} className={classeLien}>
                  {lien.libelle}
                </Lien>
              </li>
            ))}
          </Colonne>

          <Colonne titre="Événements">
            {(Object.keys(formats) as FormatEvenement[]).map((cle) => (
              <li key={cle}>
                <Lien href={`/evenements?format=${cle}`} className={classeLien}>
                  {formats[cle].nom}
                </Lien>
              </li>
            ))}
          </Colonne>

          <Colonne titre="Réseaux">
            <li>
              <LienReseau
                href={association.linkedin}
                libelle="LinkedIn"
                icone={<IconeLinkedin className="size-4" />}
              />
            </li>
            <li>
              <LienReseau
                href={association.instagram}
                libelle="Instagram"
                icone={<IconeInstagram className="size-4" />}
              />
            </li>
          </Colonne>
        </nav>
      </div>

      <div
        className={cx(
          marges,
          'flex flex-col gap-1 border-t border-filet py-5 text-[13px] text-brume sm:flex-row sm:justify-between',
        )}
      >
        <p>© {association.nom}</p>
        <p>Association du Master Entrepreneurs X-HEC</p>
      </div>
    </footer>
  );
}
