// @ts-check
import { tirerUnDe20 } from "./trousse-des.mjs";

// ---------------------------------------------------------
// Santé Mentale (conséquence des effets démentiels)
// ---------------------------------------------------------

export function ajouterPointDeCrise(contextePersonnage, caracteristiqueDirectrice, logFn) /* :totalCrise */ {
    contextePersonnage.pointsDeCrise = contextePersonnage.pointsDeCrise + 1;
    logFn && logFn(`+1 point de crise`);
    return faireUnJetDeCrise(contextePersonnage, caracteristiqueDirectrice, logFn);
}

export function faireUnJetDeCrise(contextePersonnage, caracteristiqueDirectrice, logFn) {
    const d20 = tirerUnDe20();
    if (d20 <= contextePersonnage.pointsDeCrise) {
        // POSITIF
        logFn && logFn(`jet de crise: positif`);
        return ajouterPointDeChoc(contextePersonnage, caracteristiqueDirectrice, logFn);
    } else {
        // NEGATIF
        // aucune conséquence.
        logFn && logFn(`jet de crise: négatif`);
        return contextePersonnage;
    }
}

export function ajouterPointDeChoc(contextePersonnage, caracteristiqueDirectrice, logFn) {
    // tendance si pas de caracteristiqueDirectrice
    if (!caracteristiqueDirectrice) {
        caracteristiqueDirectrice = faireUnJetDeTendance(contextePersonnage);
    }
    // gain de choc parano ou schizo
    if (caracteristiqueDirectrice === 'intellect') {
        logFn && logFn(`+1 point de choc parano`);
        contextePersonnage.chocsParano = contextePersonnage.chocsParano + 1;
    } else {
        logFn && logFn(`+1 point de choc schizo`);
        contextePersonnage.chocsSchizo = contextePersonnage.chocsSchizo + 1;        
    }
    // jet de choc
    return faireUnJetDeChoc(contextePersonnage, caracteristiqueDirectrice);
}

export function faireUnJetDeTendance(contextePersonnage, logFn) {
    const tendanceParano = contextePersonnage.intellect - (contextePersonnage.sensitif - 10);
    if (tirerUnDe20() <= tendanceParano) {
        // oui, tendance Parano / intellect
        logFn && logFn(`tendance parano`);
        return 'intellect';
    } else {
        // tendance Schizo / sensitif
        logFn && logFn(`tendance schizo`);
        return 'sensitif';
    }
}

export function faireUnJetDeChoc(contextePersonnage, caracteristiqueDirectrice, logFn) {
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
        logFn && logFn(`jet de choc : résisté`);
    } else {
        // état de choc !
        if (contextePersonnage.etatDeChoc) {
            logFn && logFn(`jet de choc : raté; mais état de choc pré-existant = +1 choc profond !`);
            contextePersonnage.chocsProfonds = contextePersonnage.chocsProfonds + 1;
        } else {
            logFn && logFn(`jet de choc : raté; entre en état de choc !`);
            contextePersonnage.etatDeChoc = true;
            // TODO : délire de persecutition/hallucination
        }
    }
    return contextePersonnage;
}
