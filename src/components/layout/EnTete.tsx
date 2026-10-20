'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Bouton } from '@/components/ui/Bouton';
import { boutonInscription, navigation } from '@/content/site';
import { cx } from '@/lib/utils';

function estActif(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function EnTete() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  // Ferme le menu mobile avec la touche Échap.
  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => e.key === 'Escape' && setOuvert(false);
    window.addEventListener('keydown', surTouche);
    return () => window.removeEventListener('keydown', surTouche);
  }, [ouvert]);

  const fermer = () => setOuvert(false);

  return (
    <header className="sticky top-0 z-40 border-b border-filet bg-white/90 backdrop-blur-md">
      <div className="flex h-[68px] items-center justify-between gap-6 px-5 md:px-8">
        <Logo />

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
                      'transition-colors hover:text-sapin',
                      actif
                        ? 'font-medium text-sapin underline decoration-vif decoration-2 underline-offset-[10px]'
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

        <div className="hidden items-center gap-2.5 md:flex">
          {/* Entre 768 et 1024 px, on garde la place pour le menu : « Contact » y est déjà. */}
          <span className="hidden lg:block">
            <Bouton href="/contact" variante="contour" taille="petit">
              Contact
            </Bouton>
          </span>
          <Bouton href={boutonInscription.href} variante="noir" taille="petit">
            {boutonInscription.libelle}
          </Bouton>
        </div>

        {/* Bouton burger (moins de 768 px) */}
        <button
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-bouton text-sapin md:hidden"
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
        className="absolute inset-x-0 top-full border-b border-filet bg-white md:hidden"
      >
        <nav aria-label="Navigation mobile">
          <ul>
            {navigation.map((lien) => {
              const actif = estActif(pathname, lien.href);
              return (
                <li key={lien.href} className="border-b border-filet">
                  <Link
                    href={lien.href}
                    onClick={fermer}
                    aria-current={actif ? 'page' : undefined}
                    className={cx(
                      'flex items-center justify-between px-5 py-4 font-titre text-xl tracking-[-0.02em]',
                      actif ? 'text-sapin' : 'text-ardoise',
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
        <div className="grid grid-cols-2 gap-2.5 p-5">
          <Bouton href="/contact" variante="contour" onClick={fermer}>
            Contact
          </Bouton>
          <Bouton href={boutonInscription.href} variante="noir" onClick={fermer}>
            {boutonInscription.libelle}
          </Bouton>
        </div>
      </div>
    </header>
  );
}
