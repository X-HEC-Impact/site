'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Bouton } from '@/components/ui/Bouton';
import { navigation } from '@/content/site';
import { cx } from '@/lib/utils';

function estActif(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

type Props = {
  /** Bouton « S'inscrire », ou null s'il n'y a aucun événement ouvert aux inscriptions. */
  inscription: { href: string; libelle: string } | null;
};

export function EnTete({ inscription }: Props) {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  // Barre vert sapin sur toutes les pages, comme le pied de page.
  const sombre = true;

  // Ferme le menu mobile avec la touche Échap.
  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => e.key === 'Escape' && setOuvert(false);
    window.addEventListener('keydown', surTouche);
    return () => window.removeEventListener('keydown', surTouche);
  }, [ouvert]);

  const fermer = () => setOuvert(false);

  return (
    <header
      className={cx(
        'sticky top-0 z-40 border-b backdrop-blur-md',
        sombre ? 'section-sombre border-white/10 bg-sapin' : 'border-filet bg-white/90',
      )}
    >
      <div className="marges flex h-[68px] items-center justify-between gap-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Logo sombre={sombre} />

        {/* Menu bureau (768 px et plus) */}
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[15px]">
            {navigation.map((lien) => {
              const actif = estActif(pathname, lien.href);
              return (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    aria-current={actif ? 'page' : undefined}
                    className={cx(
                      'transition-colors',
                      sombre ? 'hover:text-white' : 'hover:text-sapin',
                      actif
                        ? cx(
                            'font-medium underline decoration-vif decoration-2 underline-offset-[10px]',
                            sombre ? 'text-white' : 'text-sapin',
                          )
                        : sombre
                          ? 'text-white/75'
                          : 'text-ardoise',
                    )}
                  >
                    {lien.libelle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2.5 justify-self-end md:flex">
          {inscription && (
            <Bouton href={inscription.href} variante={sombre ? 'principal' : 'noir'} taille="petit">
              {inscription.libelle}
            </Bouton>
          )}
        </div>

        {/* Bouton burger (moins de 768 px) */}
        <button
          type="button"
          className={cx(
            '-mr-2 inline-flex size-10 items-center justify-center rounded-bouton md:hidden',
            sombre ? 'text-white' : 'text-sapin',
          )}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOuvert((v) => !v)}
        >
          {ouvert ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!ouvert}
        className={cx(
          'absolute inset-x-0 top-full border-b md:hidden',
          sombre ? 'section-sombre border-white/10 bg-sapin' : 'border-filet bg-white',
        )}
      >
        <nav aria-label="Navigation mobile">
          <ul>
            {navigation.map((lien) => {
              const actif = estActif(pathname, lien.href);
              return (
                <li key={lien.href} className={cx('border-b', sombre ? 'border-white/10' : 'border-filet')}>
                  <Link
                    href={lien.href}
                    onClick={fermer}
                    aria-current={actif ? 'page' : undefined}
                    className={cx(
                      'flex items-center justify-between px-5 py-4 font-titre text-xl tracking-[-0.02em]',
                      actif ? (sombre ? 'text-white' : 'text-sapin') : sombre ? 'text-white/75' : 'text-ardoise',
                    )}
                  >
                    {lien.libelle}
                    {actif && <span className="size-2 rounded-full bg-vif" aria-hidden />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={cx('grid gap-2.5 p-5', inscription && 'grid-cols-2')}>
          <Bouton href="/contact" variante="contour" onClick={fermer}>
            Contact
          </Bouton>
          {inscription && (
            <Bouton href={inscription.href} variante={sombre ? 'principal' : 'noir'} onClick={fermer}>
              {inscription.libelle}
            </Bouton>
          )}
        </div>
      </div>
    </header>
  );
}
