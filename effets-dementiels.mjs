// @ts-check
import { tirerUnDe20 } from "./trousse-des.mjs";
import { Competence } from "./fiche-personnage.mjs";
import { ajouterPointDeCrise, faireUnJetDeCrise } from "./sante-mentale.mjs";

const log = false;

// ---------------------------------------------------------
// Effets Démentiels
// ---------------------------------------------------------

export function appelDementiel(contextePersonnage) {
    contextePersonnage = ajouterPointDeCrise(contextePersonnage, undefined);
    return contextePersonnage;
}

export function acquerirCompetenceDementielle(contextePersonnage, nomCompetence, caracteristiqueDirectrice) {
    const competenceDementielle = new Competence();
    competenceDementielle.intitule = nomCompetence,
    competenceDementielle.dementielle = true;
    competenceDementielle.valeurCaracteristiqueDirectrice = contextePersonnage[caracteristiqueDirectrice];
    competenceDementielle.nomCaracteristiqueDirectrice = caracteristiqueDirectrice;

    contextePersonnage.competencesDementielles.push(competenceDementielle);
    log && console.debug(`personnage a acquis ${competenceDementielle.intitule} à ${competenceDementielle.valeur}`);
    return ajouterPointDeCrise(contextePersonnage, undefined);
}

// exemple ajustement -2, intensite 2
export function incredire(contextePersonnage, caracteristiqueDirectrice, ajustement, intensiteRequise) {
    const d20 = tirerUnDe20();
    const seuilReussite = contextePersonnage[caracteristiqueDirectrice] + ajustement;
    let critique = false;
    let intensite = 0;
    if (d20 <= seuilReussite) { // "roll under"
        if (d20 <= 4) {
            // réussite critique ?
            const d20Critique = tirerUnDe20();
            if (d20Critique <= seuilReussite) {
                critique = true;
            } else {
                // reussite normale
                critique = false;
            }
        } else {
            // réussite normale
            critique = false;
        }
        intensite = critique ? 2 : 1;
        if (intensite >= intensiteRequise) {
            log && console.debug(`incrédulité réussie !`);
            return contextePersonnage;
        } else {
            log && console.debug(`incrédulité pas assez intense !`);
            return faireUnJetDeCrise(contextePersonnage, caracteristiqueDirectrice);
        }
    } else {
        if (d20 >= 17) {
            // échec critique ?
            critique = true;
        } else {
            // échec normal
            critique = false;
        }
        log && console.debug(`incrédulité échouée !`);
        return ajouterPointDeCrise(contextePersonnage, caracteristiqueDirectrice);
    }
}
