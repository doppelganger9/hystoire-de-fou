// @ts-check
import { tirerUnDe20 } from "./trousse-des.mjs";
import { Competence } from "./competences.mjs";
import { ajouterPointDeCrise, faireUnJetDeCrise } from "./sante-mentale.mjs";

// ---------------------------------------------------------
// Effets Démentiels
// ---------------------------------------------------------

export function appelDementiel(contextePersonnage, logFn) {
    contextePersonnage = ajouterPointDeCrise(contextePersonnage, undefined, logFn);
    return contextePersonnage;
}

export function acquerirCompetenceDementielle(contextePersonnage, nomCompetence, caracteristiqueDirectrice, logFn) {
    const competenceDementielle = new Competence();
    competenceDementielle.intitule = nomCompetence,
    competenceDementielle.dementielle = true;
    competenceDementielle.valeurCaracteristiqueDirectrice = contextePersonnage[caracteristiqueDirectrice];
    competenceDementielle.nomCaracteristiqueDirectrice = caracteristiqueDirectrice;

    contextePersonnage.competencesDementielles.push(competenceDementielle);
    logFn && logFn(`personnage a acquis ${competenceDementielle.intitule} à ${competenceDementielle.valeur}`);
    return ajouterPointDeCrise(contextePersonnage, undefined, logFn);
}

// exemple ajustement -2, intensite 2
export function incredire(contextePersonnage, caracteristiqueDirectrice, ajustement, intensiteRequise, logFn) {
    const d20 = tirerUnDe20(logFn);
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
            logFn && logFn(`incrédulité réussie !`);
            return contextePersonnage;
        } else {
            logFn && logFn(`incrédulité pas assez intense !`);
            return faireUnJetDeCrise(contextePersonnage, caracteristiqueDirectrice, logFn);
        }
    } else {
        if (d20 >= 17) {
            // échec critique ?
            critique = true;
        } else {
            // échec normal
            critique = false;
        }
        logFn && logFn(`incrédulité échouée !`);
        return ajouterPointDeCrise(contextePersonnage, caracteristiqueDirectrice, logFn);
    }
}
