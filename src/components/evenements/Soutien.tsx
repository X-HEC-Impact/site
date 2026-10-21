import { Check, Mail, Phone } from 'lucide-react';
import { Bouton } from '@/components/ui/Bouton';
import { EnTeteSection, Section, ecart } from '@/components/ui/Section';
import type { Soutien as DonneesSoutien } from '@/content/site';
import { cx, typo } from '@/lib/utils';

/** Bloc « Soutenir le projet » : budget, avantages, niveaux de partenariat et contact. */
export function Soutien({ soutien }: { soutien: DonneesSoutien }) {
  const { budget, total, avantages, niveaux, note, contact } = soutien;
  const objet = encodeURIComponent('Partenariat LEX Europe');

  return (
    <Section id="soutenir" titreId="soutenir-titre">
      <EnTeteSection
        id="soutenir-titre"
        surtitre="Soutenir le projet"
        titre={soutien.titre}
        titreSuite={soutien.titreSuite}
        intro={soutien.intro}
      />

      {/* Budget prévisionnel */}
      <div className={cx('overflow-x-auto rounded-bouton border border-filet', ecart)}>
        <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
          <caption className="sr-only">Budget prévisionnel</caption>
          <thead className="bg-voile text-sapin">
            <tr className="border-b border-filet">
              <th scope="col" className="px-5 py-3.5 font-medium md:px-6">Poste</th>
              <th scope="col" className="px-5 py-3.5 font-medium md:px-6">Ce que ça couvre</th>
              <th scope="col" className="px-5 py-3.5 text-right font-medium md:px-6">Montant</th>
              <th scope="col" className="px-5 py-3.5 text-right font-medium md:px-6">Part</th>
            </tr>
          </thead>
          <tbody>
            {budget.map((ligne) => (
              <tr key={ligne.poste} className="border-b border-filet">
                <th scope="row" className="px-5 py-4 font-medium text-sapin md:px-6">{ligne.poste}</th>
                <td className="px-5 py-4 md:px-6">{ligne.couvre}</td>
                <td className="px-5 py-4 text-right whitespace-nowrap text-sapin tabular-nums md:px-6">{ligne.montant}</td>
                <td className="px-5 py-4 text-right tabular-nums md:px-6">{ligne.part}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="section-sombre bg-sapin text-white">
            <tr>
              <th scope="row" colSpan={2} className="px-5 py-4 font-medium md:px-6">Total</th>
              <td className="px-5 py-4 text-right font-medium whitespace-nowrap text-vif tabular-nums md:px-6">
                {total.montant}
              </td>
              <td className="px-5 py-4 text-right tabular-nums md:px-6">{total.part}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Ce que le partenariat apporte */}
      <h3 className="mt-16 text-2xl md:mt-20">Ce que vous apporte ce partenariat</h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {avantages.map((avantage) => (
          <li key={avantage.titre} className="rounded-bouton border border-filet p-5 md:p-6">
            <p className="font-medium text-sapin">{avantage.titre}</p>
            <p className="mt-2 text-[15px]">{typo(avantage.texte)}</p>
          </li>
        ))}
      </ul>

      {/* Niveaux de partenariat */}
      <h3 className="mt-16 text-2xl md:mt-20">Quatre niveaux de partenariat</h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {niveaux.map((niveau, i) => {
          const principal = i === niveaux.length - 1;
          return (
            <li
              key={niveau.nom}
              className={cx(
                'flex flex-col rounded-bouton p-6',
                principal ? 'section-sombre bg-sapin text-white/80' : 'border border-filet bg-white',
              )}
            >
              <p className={cx('font-medium', principal ? 'text-white' : 'text-sapin')}>{niveau.nom}</p>
              <p
                className={cx(
                  'mt-3 font-titre text-[36px] leading-none font-medium tracking-[-0.03em] tabular-nums',
                  principal ? 'text-vif' : 'text-vif-texte',
                )}
              >
                {niveau.montant}
              </p>
              <ul className={cx('mt-6 space-y-3 border-t pt-5 text-[15px]', principal ? 'border-white/15' : 'border-filet')}>
                {niveau.avantages.map((avantage) => (
                  <li key={avantage} className="flex items-start gap-2.5">
                    <Check aria-hidden className={cx('mt-1 size-4 shrink-0', principal ? 'text-vif' : 'text-vif-texte')} />
                    {typo(avantage)}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      {note && <p className="mt-5 max-w-3xl text-[15px] text-brume">{typo(note)}</p>}

      {/* Contact */}
      <div className="mt-16 flex flex-col gap-8 rounded-bouton bg-menthe p-6 md:mt-20 md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <p className="font-titre text-2xl font-medium tracking-[-0.02em] text-sapin">Parlons de votre engagement</p>
          <p className="mt-2">
            <span className="font-medium text-sapin">{contact.nom}</span>, {contact.role}
          </p>
          <ul className="mt-4 space-y-1.5 text-[15px]">
            <li>
              <a href={`mailto:${contact.email}?subject=${objet}`} className="inline-flex items-center gap-2 text-sapin hover:underline hover:underline-offset-4">
                <Mail aria-hidden className="size-4" />
                {contact.email}
              </a>
            </li>
            {contact.telephone && (
              <li>
                <a href={`tel:${contact.telephone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-sapin hover:underline hover:underline-offset-4">
                  <Phone aria-hidden className="size-4" />
                  {contact.telephone}
                </a>
              </li>
            )}
          </ul>
        </div>
        <Bouton href={`mailto:${contact.email}?subject=${objet}`} className="self-start md:self-center">
          Devenir partenaire
        </Bouton>
      </div>
    </Section>
  );
}
