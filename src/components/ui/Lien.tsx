import Link from 'next/link';
import type { ComponentProps } from 'react';
import { estLienExterne } from '@/lib/utils';

type Props = Omit<ComponentProps<'a'>, 'href'> & { href: string };

/**
 * Lien unique pour tout le site :
 * - lien interne (/evenements) → next/link, navigation instantanée ;
 * - lien externe (https://, mailto:) → <a> classique, nouvel onglet pour le web.
 */
export function Lien({ href, children, ...props }: Props) {
  if (estLienExterne(href)) {
    const nouvelOnglet = href.startsWith('http');
    return (
      <a
        href={href}
        {...(nouvelOnglet ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
