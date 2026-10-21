import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Lien } from "@/components/ui/Lien";
import { IconeInstagram, IconeLinkedin } from "@/components/ui/IconesReseaux";
import { marges } from "@/components/ui/Section";
import {
  association,
  formats,
  navigation,
  type FormatEvenement,
} from "@/content/site";
import { cx, estPlaceholder } from "@/lib/utils";

function Colonne({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-base font-semibold text-white">{titre}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

const classeLien =
  "inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white";

/** Lien vers un réseau social, ou placeholder visible tant que l'URL manque. */
function LienReseau({
  href,
  libelle,
  icone,
}: {
  href: string;
  libelle: string;
  icone: ReactNode;
}) {
  if (estPlaceholder(href)) {
    return (
      <span className="flex flex-wrap items-center gap-x-2 text-white/75">
        {icone}
        {libelle}
        <span className="text-xs whitespace-nowrap text-lichen">
          [lien à venir]
        </span>
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
  // Un réseau laissé vide ('') dans site.ts n'apparaît pas.
  const reseaux = [
    {
      href: association.linkedin,
      libelle: "LinkedIn",
      icone: <IconeLinkedin className="size-4" />,
    },
    {
      href: association.instagram,
      libelle: "Instagram",
      icone: <IconeInstagram className="size-4" />,
    },
  ].filter((reseau) => reseau.href !== "");

  return (
    <footer className="section-sombre bg-sapin text-[15px] text-white/75">
      <div className={cx(marges, "grid gap-12 py-16 md:grid-cols-12 md:py-20")}>
        <div className="md:col-span-5">
          <Logo sombre />
          <p className="mt-4 max-w-sm">{association.accroche}</p>
          <p className="mt-6">
            {estPlaceholder(association.email) ? (
              <span className={classeLien}>
                <Mail className="size-4" aria-hidden />
                {association.email}
              </span>
            ) : (
              <Lien
                href={`mailto:${association.email}`}
                className={cx(classeLien, "font-medium text-white")}
              >
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

          {reseaux.length > 0 && (
            <Colonne titre="Réseaux">
              {reseaux.map((reseau) => (
                <li key={reseau.libelle}>
                  <LienReseau {...reseau} />
                </li>
              ))}
            </Colonne>
          )}
        </nav>
      </div>

      <div
        className={cx(
          marges,
          "flex flex-col gap-1 border-t border-white/10 py-6 text-[13px] text-lichen sm:flex-row sm:justify-between",
        )}
      >
        <p>© {association.nom}</p>
        <p>Association du Master Entrepreneurs X-HEC</p>
      </div>
    </footer>
  );
}
