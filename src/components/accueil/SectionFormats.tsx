import Image from 'next/image';
import { ArrowRight, Compass, Lightbulb, MessagesSquare, type LucideIcon } from 'lucide-react';
import { fondFormat } from '@/components/evenements/EtiquetteFormat';
import { Lien } from '@/components/ui/Lien';
import { marges } from '@/components/ui/Section';
import { Surtitre, Titre } from '@/components/ui/Titre';
import { accueil, formats, type FormatEvenement } from '@/content/site';
import { getEvenements } from '@/lib/evenements';
import { cx, typo } from '@/lib/utils';

const icones: Record<FormatEvenement, LucideIcon> = {
  lex: Compass,
  conference: MessagesSquare,
  hackathon: Lightbulb,
};

/** Section sombre « Ce qu’on fait » : une carte pastel par format. */
export async function SectionFormats() {
  const { aVenir } = await getEvenements();

  // Chaque carte pointe vers le prochain événement du format, sinon vers l'agenda filtré.
  // Pour un événement interne (ex. la LEX), « S'inscrire » devient « Découvrir ».
  const puces = (type: FormatEvenement) => {
    const prochain = aVenir.find((e) => e.type === type);
    if (!prochain) {
      const agenda = `/evenements?format=${type}`;
      return [
        { libelle: 'Programme', href: agenda },
        { libelle: 'S’inscrire', href: agenda },
      ];
    }
    const page = `/evenements/${prochain.slug}`;
    return [
      { libelle: 'Programme', href: `${page}#programme` },
      prochain.reserveA
        ? { libelle: 'Découvrir', href: page }
        : { libelle: 'S’inscrire', href: `${page}#inscription` },
    ];
  };

  return (
    <section
      aria-labelledby="formats-titre"
      className={cx('section-sombre border-b border-filet bg-sapin py-16 text-white/80 md:py-24', marges)}
    >
      <div className="apparition">
        <Surtitre>{accueil.formats.surtitre}</Surtitre>
        <Titre
          id="formats-titre"
          sombre
          debut={accueil.formats.titre}
          suite={accueil.formats.titreSuite}
          className="mt-4"
        />
        {accueil.formats.intro && (
          <p className="mt-4 max-w-xl text-[17px] text-white/75">{typo(accueil.formats.intro)}</p>
        )}
      </div>

      {/* grid-rows-subgrid : titres, textes, puces et visuels restent alignés d'une carte à l'autre. */}
      <ul className="apparition mt-12 grid gap-px overflow-hidden rounded-bouton md:mt-14 md:grid-cols-3">
        {(Object.keys(formats) as FormatEvenement[]).map((type) => {
          const format = formats[type];
          const Icone = icones[type];

          return (
            <li
              key={type}
              className={cx(
                'group row-span-5 grid grid-rows-subgrid gap-0 p-6 text-ardoise lg:p-8',
                fondFormat[type],
              )}
            >
              <span className="flex size-11 items-center justify-center rounded-bouton bg-white text-sapin">
                <Icone aria-hidden className="size-5" strokeWidth={1.75} />
              </span>

              <h3 className="mt-7 text-2xl">{format.nom}</h3>
              <p className="mt-2">{typo(format.texte)}</p>

              <ul className="mt-6 self-start border-t border-sapin/15">
                {puces(type).map((puce) => (
                  <li key={puce.libelle} className="border-b border-sapin/15">
                    <Lien
                      href={puce.href}
                      className="group/puce flex items-center justify-between py-3 font-medium text-sapin"
                    >
                      {puce.libelle}
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 group-hover/puce:translate-x-1"
                      />
                    </Lien>
                  </li>
                ))}
              </ul>

              <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-bouton">
                <Image
                  src={format.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
