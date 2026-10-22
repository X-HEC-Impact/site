/*
  Deux petits scripts, injectés dans app/layout.tsx, qui pilotent l'apparition
  des éléments au défilement (attribut data-reveal, voir globals.css).

  - SCRIPT_ENTETE (dans <head>) : pose la classe « js » sur <html> avant le premier
    affichage, pour que les éléments à faire apparaître soient déjà cachés. Il ne fait rien
    si le visiteur a demandé de limiter les animations. Si le second script n'a pas pris
    le relais au bout de 4 s, la classe est retirée et tout s'affiche normalement.
  - SCRIPT_BARRE (dans <head>) : pose l'attribut data-defile sur <html> dès que la page
    n'est plus tout en haut, pour que la barre de navigation devienne vitrée (voir .barre
    dans globals.css). Pas de React : aucune mise à jour d'affichage à chaque défilement.
  - SCRIPT_APPARITIONS (fin de <body>) : observe les éléments data-reveal et pose
    data-vu quand ils entrent à l'écran, y compris ceux ajoutés plus tard (navigation,
    contenu qui arrive en différé).
*/

export const SCRIPT_ENTETE = `(function(){try{var h=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;h.classList.add('js');setTimeout(function(){if(!window.__apparitions)h.classList.remove('js')},4000)}catch(e){}})();`;

export const SCRIPT_BARRE = `(function(){try{var h=document.documentElement,t=0;function m(){t=0;if(window.scrollY>8)h.setAttribute('data-defile','');else h.removeAttribute('data-defile')}function s(){if(!t)t=requestAnimationFrame(m)}m();addEventListener('scroll',s,{passive:true});addEventListener('pageshow',m)}catch(e){}})();`;

export const SCRIPT_APPARITIONS = `(function(){try{
if(!document.documentElement.classList.contains('js'))return;
var d=document,attente=false;
var io=new IntersectionObserver(function(es){
for(var i=0;i<es.length;i++){if(!es[i].isIntersecting)continue;io.unobserve(es[i].target);es[i].target.setAttribute('data-vu','')}
},{rootMargin:'0px 0px -8% 0px'});
function scanner(){var l=d.querySelectorAll('[data-reveal]:not([data-obs])');for(var i=0;i<l.length;i++){l[i].setAttribute('data-obs','');io.observe(l[i])}}
scanner();
new MutationObserver(function(){if(attente)return;attente=true;requestAnimationFrame(function(){attente=false;scanner()})}).observe(d.body,{childList:true,subtree:true});
window.__apparitions=1;
}catch(e){}})();`;
