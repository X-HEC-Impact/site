'use client';

import { useActionState, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react';
import { envoyerMessage } from '@/app/contact/actions';
import { fondFormat } from '@/components/evenements/EtiquetteFormat';
import { classesBouton } from '@/components/ui/Bouton';
import { Pictogramme } from '@/components/ui/Pictogramme';
import { pages, sujetsContact } from '@/content/site';
import {
  erreursContact,
  lireContact,
  schemaContact,
  type ChampContact,
  type ErreursContact,
  type EtatContact,
} from '@/lib/contact';
import { cx } from '@/lib/utils';

const etatInitial: EtatContact = { statut: 'initial' };
const { formulaire } = pages.contact;

const classeChamp =
  'block w-full rounded-bouton border bg-white px-3.5 py-2.5 text-[15px] text-sapin placeholder:text-brume/70 transition-colors focus:border-sapin focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1';

type PropsChamp = {
  nom: Exclude<ChampContact, 'sujet' | 'consentement'>;
  libelle: string;
  erreur?: string;
  facultatif?: boolean;
  children: (attributs: {
    id: string;
    name: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
    className: string;
  }) => ReactNode;
};

/** Un champ avec son libellé et son message d'erreur, reliés pour les lecteurs d'écran. */
function Champ({ nom, libelle, erreur, facultatif, children }: PropsChamp) {
  const id = `contact-${nom}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-sapin">
        {libelle} {facultatif && <span className="font-normal text-ardoise">(facultatif)</span>}
      </label>
      {children({
        id,
        name: nom,
        'aria-invalid': erreur ? true : undefined,
        'aria-describedby': erreur ? `${id}-erreur` : undefined,
        className: cx(classeChamp, erreur ? 'border-red-700' : 'border-filet'),
      })}
      {erreur && (
        <p id={`${id}-erreur`} className="mt-1.5 text-sm text-red-700">
          {erreur}
        </p>
      )}
    </div>
  );
}

/**
 * Formulaire de contact : le visiteur choisit un sujet, puis écrit son message.
 * `sujetInitial` présélectionne un sujet (lien « ?sujet=table-ronde »).
 */
export function FormulaireContact({ sujetInitial }: { sujetInitial?: string }) {
  const [etat, envoyer, enCours] = useActionState(envoyerMessage, etatInitial);
  const [erreursNavigateur, setErreursNavigateur] = useState<ErreursContact | null>(null);
  const formulaire_ = useRef<HTMLFormElement>(null);

  // Après une erreur du serveur, on remet ce que le visiteur avait écrit.
  const valeurs = etat.statut === 'erreur' ? (etat.valeurs ?? {}) : {};
  const sujetCoche = valeurs.sujet ?? sujetInitial;

  // Les erreurs du navigateur (immédiates) priment ; sinon celles renvoyées par le serveur.
  const erreurs: ErreursContact = erreursNavigateur ?? (etat.statut === 'erreur' ? (etat.erreurs ?? {}) : {});

  function verifier(evenement: FormEvent<HTMLFormElement>) {
    const resultat = schemaContact.safeParse(lireContact(new FormData(evenement.currentTarget)));
    if (resultat.success) {
      setErreursNavigateur(null);
      return;
    }
    evenement.preventDefault();
    const trouvees = erreursContact(resultat.error);
    setErreursNavigateur(trouvees);
    // Place le curseur sur le premier champ à corriger.
    const premier = Object.keys(trouvees)[0];
    formulaire_.current?.querySelector<HTMLElement>(`[name="${premier}"]`)?.focus();
  }

  if (etat.statut === 'succes') {
    return (
      <div role="status" className="rounded-bouton bg-menthe p-6 md:p-8">
        <CircleCheck aria-hidden className="size-7 text-vif-texte" />
        <p className="mt-4 font-titre text-2xl font-medium tracking-[-0.02em] text-sapin">{formulaire.succes.titre}</p>
        <p className="mt-2 text-[17px]">{formulaire.succes.texte}</p>
      </div>
    );
  }

  return (
    <form
      ref={formulaire_}
      action={envoyer}
      onSubmit={verifier}
      noValidate
      className="space-y-6 rounded-bouton border border-filet bg-white p-5 shadow-[0_1px_2px_rgb(6_42_33/0.05),0_28px_56px_-28px_rgb(0_0_0/0.6)] sm:p-6 md:p-8"
    >
      {/* Champ piège pour les robots, invisible pour les visiteurs. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-site-web">Ne pas remplir</label>
        <input id="contact-site-web" name="site_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset aria-describedby={erreurs.sujet ? 'contact-sujet-erreur' : undefined}>
        <legend className="mb-2 text-sm font-medium text-sapin">Sujet</legend>
        <div className="grid grid-cols-2 gap-2">
          {sujetsContact.map(({ valeur, libelle, format }) => (
            <label key={valeur} className="block cursor-pointer">
              <input
                type="radio"
                name="sujet"
                value={valeur}
                defaultChecked={sujetCoche === valeur}
                className="peer sr-only"
              />
              {/* Chaque sujet reprend la couleur et le pictogramme de son format (LEX, conférence, hackathon). */}
              <span
                className={cx(
                  'flex min-h-11 w-full items-center gap-1.5 rounded-bouton px-2.5 py-1.5 text-[13px] leading-tight sm:gap-2 sm:px-3.5 sm:text-sm font-medium text-sapin transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 peer-checked:bg-sapin peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sapin',
                  format ? fondFormat[format] : 'bg-voile',
                )}
              >
                {format && <Pictogramme type={format} className="size-[18px] shrink-0 sm:size-5" />}
                {libelle}
              </span>
            </label>
          ))}
        </div>
        {erreurs.sujet && (
          <p id="contact-sujet-erreur" className="mt-1.5 text-sm text-red-700">
            {erreurs.sujet}
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Champ nom="nom" libelle="Nom" erreur={erreurs.nom}>
          {(attributs) => <input {...attributs} type="text" autoComplete="name" defaultValue={valeurs.nom} />}
        </Champ>
        <Champ nom="email" libelle="E-mail" erreur={erreurs.email}>
          {(attributs) => (
            <input {...attributs} type="email" autoComplete="email" inputMode="email" defaultValue={valeurs.email} />
          )}
        </Champ>
      </div>

      <Champ nom="organisation" libelle="Entreprise / organisation" erreur={erreurs.organisation} facultatif>
        {(attributs) => (
          <input {...attributs} type="text" autoComplete="organization" defaultValue={valeurs.organisation} />
        )}
      </Champ>

      <Champ nom="message" libelle="Message" erreur={erreurs.message}>
        {(attributs) => (
          <textarea {...attributs} rows={6} defaultValue={valeurs.message} className={cx(attributs.className, 'resize-y')} />
        )}
      </Champ>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="contact-consentement"
            name="consentement"
            type="checkbox"
            defaultChecked={valeurs.consentement === 'on'}
            aria-invalid={erreurs.consentement ? true : undefined}
            aria-describedby={erreurs.consentement ? 'contact-consentement-erreur' : undefined}
            className="mt-0.5 size-[18px] shrink-0 accent-sapin"
          />
          <label htmlFor="contact-consentement" className="text-sm leading-snug">
            {formulaire.consentement}
          </label>
        </div>
        {erreurs.consentement && (
          <p id="contact-consentement-erreur" className="mt-1.5 text-sm text-red-700">
            {erreurs.consentement}
          </p>
        )}
      </div>

      {etat.statut === 'erreur' && !erreursNavigateur && (
        <p role="alert" className="flex items-start gap-2 rounded-bouton bg-red-50 p-3 text-sm text-red-800">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {etat.message}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours}
        className={cx(classesBouton('principal'), 'w-full disabled:opacity-70 sm:w-auto')}
      >
        {enCours ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Envoi…
          </>
        ) : (
          formulaire.envoi
        )}
      </button>
    </form>
  );
}
