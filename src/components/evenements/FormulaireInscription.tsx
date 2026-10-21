'use client';

import { useActionState, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CircleCheck, CircleAlert, LoaderCircle } from 'lucide-react';
import { inscrire } from '@/app/evenements/[slug]/actions';
import { classesBouton } from '@/components/ui/Bouton';
import {
  erreursParChamp,
  lireFormulaire,
  schemaInscription,
  type Champ,
  type Erreurs,
  type EtatInscription,
} from '@/lib/inscription';
import { cx } from '@/lib/utils';

const etatInitial: EtatInscription = { statut: 'initial' };

const classeChamp =
  'block w-full rounded-bouton border bg-white px-3.5 py-2.5 text-[15px] text-sapin placeholder:text-brume/70 transition-colors focus:border-sapin focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1';

type PropsChamp = {
  nom: Champ;
  libelle: string;
  erreur?: string;
  facultatif?: boolean;
  children: (attributs: { id: string; name: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string; className: string }) => ReactNode;
};

/** Un champ avec son libellé et son message d'erreur, reliés pour les lecteurs d'écran. */
function Champ({ nom, libelle, erreur, facultatif, children }: PropsChamp) {
  const id = `inscription-${nom}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-sapin">
        {libelle} {facultatif && <span className="font-normal text-brume">(facultatif)</span>}
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

export function FormulaireInscription({ slug, titre }: { slug: string; titre: string }) {
  const [etat, envoyer, enCours] = useActionState(inscrire, etatInitial);
  const [erreursNavigateur, setErreursNavigateur] = useState<Erreurs | null>(null);
  const formulaire = useRef<HTMLFormElement>(null);

  // Les erreurs du navigateur (immédiates) priment ; sinon celles renvoyées par le serveur.
  const erreurs: Erreurs = erreursNavigateur ?? (etat.statut === 'erreur' ? (etat.erreurs ?? {}) : {});

  function verifier(evenement: FormEvent<HTMLFormElement>) {
    const resultat = schemaInscription.safeParse(lireFormulaire(new FormData(evenement.currentTarget)));
    if (resultat.success) {
      setErreursNavigateur(null);
      return;
    }
    evenement.preventDefault();
    const trouvees = erreursParChamp(resultat.error);
    setErreursNavigateur(trouvees);
    // Place le curseur sur le premier champ à corriger.
    const premier = Object.keys(trouvees)[0];
    formulaire.current?.querySelector<HTMLElement>(`[name="${premier}"]`)?.focus();
  }

  if (etat.statut === 'succes') {
    return (
      <div role="status" className="rounded-bouton bg-menthe p-5">
        <CircleCheck aria-hidden className="size-6 text-vif-texte" />
        <p className="mt-3 font-titre text-xl font-medium tracking-[-0.02em] text-sapin">
          C’est noté{etat.prenom ? `, ${etat.prenom}` : ''} !
        </p>
        <p className="mt-1 text-[15px]">Votre inscription à « {titre} » est bien enregistrée.</p>
      </div>
    );
  }

  return (
    <form ref={formulaire} action={envoyer} onSubmit={verifier} noValidate className="space-y-4">
      <input type="hidden" name="event_slug" value={slug} />

      {/* Champ piège pour les robots, invisible pour les visiteurs. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="inscription-site-web">Ne pas remplir</label>
        <input id="inscription-site-web" name="site_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Champ nom="prenom" libelle="Prénom" erreur={erreurs.prenom}>
          {(attributs) => <input {...attributs} type="text" autoComplete="given-name" />}
        </Champ>
        <Champ nom="nom" libelle="Nom" erreur={erreurs.nom}>
          {(attributs) => <input {...attributs} type="text" autoComplete="family-name" />}
        </Champ>
      </div>

      <Champ nom="email" libelle="E-mail" erreur={erreurs.email}>
        {(attributs) => <input {...attributs} type="email" autoComplete="email" inputMode="email" />}
      </Champ>

      <Champ nom="ecole" libelle="École / organisation" erreur={erreurs.ecole}>
        {(attributs) => <input {...attributs} type="text" autoComplete="organization" />}
      </Champ>

      <Champ nom="motivation" libelle="Motivation" erreur={erreurs.motivation} facultatif>
        {(attributs) => <textarea {...attributs} rows={3} className={cx(attributs.className, 'resize-y')} />}
      </Champ>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="inscription-consentement"
            name="consentement"
            type="checkbox"
            aria-invalid={erreurs.consentement ? true : undefined}
            aria-describedby={erreurs.consentement ? 'inscription-consentement-erreur' : undefined}
            className="mt-0.5 size-[18px] shrink-0 accent-sapin"
          />
          <label htmlFor="inscription-consentement" className="text-sm leading-snug">
            J’accepte que X-HEC Impact utilise ces informations pour gérer mon inscription à cet événement.
          </label>
        </div>
        {erreurs.consentement && (
          <p id="inscription-consentement-erreur" className="mt-1.5 text-sm text-red-700">
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

      <button type="submit" disabled={enCours} className={cx(classesBouton('principal'), 'w-full disabled:opacity-70')}>
        {enCours ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Envoi…
          </>
        ) : (
          <>
            S’inscrire
          </>
        )}
      </button>
    </form>
  );
}
