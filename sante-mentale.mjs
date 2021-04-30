// @ts-check
import { tirerUnDe20 } from "./trousse-des.mjs";

const log = false;

// ---------------------------------------------------------
// Santé Mentale (conséquence des effets démentiels)
// ---------------------------------------------------------

export function ajouterPointDeCrise(contextePersonnage, caracteristiqueDirectrice) /* :totalCrise */ {
    contextePersonnage.pointsDeCrise = contextePersonnage.pointsDeCrise + 1;
    log && console.debug(`+1 point de crise`);
    return faireUnJetDeCrise(contextePersonnage, caracteristiqueDirectrice);
}

export function faireUnJetDeCrise(contextePersonnage, caracteristiqueDirectrice) {
    const d20 = tirerUnDe20();
    if (d20 <= contextePersonnage.pointsDeCrise) {
        // POSITIF
        log && console.debug(`jet de crise: positif`);
        return ajouterPointDeChoc(contextePersonnage, caracteristiqueDirectrice);
    } else {
        // NEGATIF
        // aucune conséquence.
        log && console.debug(`jet de crise: négatif`);
        return contextePersonnage;
    }
}

export function ajouterPointDeChoc(contextePersonnage, caracteristiqueDirectrice) {
    // tendance si pas de caracteristiqueDirectrice
    if (!caracteristiqueDirectrice) {
        caracteristiqueDirectrice = faireUnJetDeTendance(contextePersonnage);
    }
    // gain de choc parano ou schizo
    if (caracteristiqueDirectrice === 'intellect') {
        log && console.debug(`+1 point de choc parano`);
        contextePersonnage.chocsParano = contextePersonnage.chocsParano + 1;
    } else {
        log && console.debug(`+1 point de choc schizo`);
        contextePersonnage.chocsSchizo = contextePersonnage.chocsSchizo + 1;        
    }
    // jet de choc
    return faireUnJetDeChoc(contextePersonnage, caracteristiqueDirectrice);
}

export function faireUnJetDeTendance(contextePersonnage) {
    const tendanceParano = contextePersonnage.intellect - (contextePersonnage.sensitif - 10);
    if (tirerUnDe20() <= tendanceParano) {
        // oui, tendance Parano / intellect
        log && console.debug(`tendance parano`);
        return 'intellect';
    } else {
        // tendance Schizo / sensitif
        log && console.debug(`tendance schizo`);
        return 'sensitif';
    }
}

export function faireUnJetDeChoc(contextePersonnage, caracteristiqueDirectrice) {
    // tendance si pas de caracteristiqueDirectrice
    if (!caracteristiqueDirectrice) {
        caracteristiqueDirectrice = faireUnJetDeTendance(contextePersonnage);
    }
    const d20 = tirerUnDe20();
    const chocsEnMalus = (caracteristiqueDirectrice === 'intellect')
        ? contextePersonnage.chocsParano
        : contextePersonnage.chocsSchizo;

    if (d20 <= (contextePersonnage.volonte - chocsEnMalus + contextePersonnage.niveauAccomplissement)) {
        // tout va bien
        log && console.debug(`jet de choc : résisté`);
    } else {
        // état de choc !
        if (contextePersonnage.etatDeChoc) {
            log && console.debug(`jet de choc : raté; mais état de choc pré-existant = +1 choc profond !`);
            contextePersonnage.chocsProfonds = contextePersonnage.chocsProfonds + 1;
        } else {
            log && console.debug(`jet de choc : raté; entre en état de choc !`);
            contextePersonnage.etatDeChoc = true;
            // TODO : délire de persecutition/hallucination
        }
    }
    return contextePersonnage;
}
