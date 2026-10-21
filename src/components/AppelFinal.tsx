import { Bouton } from "@/components/ui/Bouton";
import { PhotoFond } from "@/components/ui/PhotoFond";
import { marges } from "@/components/ui/Section";
import { Titre } from "@/components/ui/Titre";
import { accueil } from "@/content/site";
import { cx, typo } from "@/lib/utils";

export function AppelFinal() {
  const { cta } = accueil;

  return (
    <section
      aria-labelledby="cta-titre"
      className="section-sombre relative isolate overflow-hidden border-b border-filet"
    >
      <PhotoFond position="50% 100%" voile="fort" />

      <div className={cx(marges, "relative py-24 md:py-32")}>
        <Titre
          id="cta-titre"
          sombre
          debut={cta.titre}
          suite={cta.titreSuite}
          className="max-w-xl"
        />
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/90">
          {typo(cta.texte)}
        </p>
        <Bouton href="/contact" className="mt-10">
          {cta.bouton}
        </Bouton>
      </div>
    </section>
  );
}
