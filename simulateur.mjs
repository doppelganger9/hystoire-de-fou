import { ContextePersonnage } from "./fiche-personnage.mjs";
import { appelDementiel, acquerirCompetenceDementielle, incredire } from "./effets-dementiels.mjs";
import { faireUnJetDeCrise } from "./sante-mentale.mjs";

// ---------------------------------------------------------
// Simulation
// ---------------------------------------------------------

function simuler() {
    let resultatsPointsChocs = [];
    let resultatsPointsChocsProfonds = [];
    let resultatsEtatChoc = [];

    const VOLONTE = 8;
    const INTELLECT = 10;
    const SENSITIF = 10;

    function personnageMoyen() {
        let p = new ContextePersonnage();
        p.volonte = VOLONTE;
        p.sensitif = SENSITIF;
        p.intellect = INTELLECT;
        p.niveauAccomplissement = 0;
        //p.chocsProfonds = 1;
        //p.chocsParano = 1;
        return p;
    }
    function resoudreEtatDeChoc(contextePersonnage) {
        contextePersonnage.etatDeChoc = false;
        // TODO ...plus tard...
        return contextePersonnage;
    }
    const iterations = 1000000;
    let ptCrise = 0;
    for (let i=0; i<iterations; i++) {
        let perso = personnageMoyen();
        perso = appelDementiel(perso); // 1pc = 5% d'avoir 1 choc
        perso = appelDementiel(perso); // 2pc = 15% d'avoir 1 choc (5 + 10)
        perso = appelDementiel(perso); // 3pc = 30% d'avoir 1 choc (5 + 10 + 15)
        perso = appelDementiel(perso); // 4pc = 50% d'avoir 1 choc (5 + 10 + 15 + 20)
        perso = appelDementiel(perso); // 5pc = 75% d'avoir 1 choc (5 + 10 + 15 + 20 + 25)
        perso = appelDementiel(perso); // 6pc = en moyenne 1.05 choc (5 + 10 + 15 + 20 + 25 + 30)
        //perso = faireUnJetDeCrise(perso); // 1.35
        //perso = faireUnJetDeCrise(perso); // 1.65
        //perso = faireUnJetDeCrise(perso); // 1.95 = meme proba que 6pc (30%)
        perso = appelDementiel(perso); // 7pc = en moyenne 1.4 choc
        perso = appelDementiel(perso); // 8pc = en moyenne 1.8 choc //-3:.53 /-2:.47/-1:.41 => premier état de choc VOL 8
        //perso = faireUnJetDeCrise(perso);
        //perso = faireUnJetDeCrise(perso);
        //perso = faireUnJetDeCrise(perso);
        //perso = faireUnJetDeCrise(perso);
        //perso = faireUnJetDeCrise(perso);
        //perso = faireUnJetDeCrise(perso);
        perso = appelDementiel(perso); // 9pc = en moyenne 2.25 choc  //-2:.71/-1:.62/+0:.55 choc profond (donc 1 état de choc) /+1:.46/+2:.389/+3:.32 => premier état choc VOL 9-11
        perso = appelDementiel(perso); // 10pc = en moyenne 2.75 choc //+0:.77/+1:.66/+2:.56/+3:.46 => premier état choc VOL 12
        //perso = appelDementiel(perso); // 11pc = en moyenne 3.30 choc // 1 choc profond (donc 2 états de choc)/+3:.65/+4:.53/+5:.43 => premier état choc VOL 13-14
        //perso = appelDementiel(perso); // 12pc = en moyenne 3.90 choc // 1.39 /+4:.73/+5:.58/+6:.45 => premier état choc VOL 15
        //perso = appelDementiel(perso); // 13pc = en moyenne 4.55 choc // 1.78 / +5:.78 / +6:.61 / +7:.45
        //perso = appelDementiel(perso); // 14pc = en moyenne 5.25 choc // 2.22 / +7:.61
        //perso = appelDementiel(perso); // 15pc = en moyenne 6 choc // 2.725
        //perso = appelDementiel(perso); // 16pc = en moyenne 6.80 choc // 3.28
        //perso = appelDementiel(perso); // 17pc = en moyenne 7.65 choc // 3.88
        //perso = appelDementiel(perso); // 18pc = en moyenne 8.55 choc
        //perso = appelDementiel(perso); // 19pc = en moyenne 9.5 choc
        //perso = appelDementiel(perso); // 20pc = en moyenne 10.5 choc

        resultatsPointsChocs.push(perso.chocsParano + perso.chocsSchizo);
        resultatsPointsChocsProfonds.push(perso.chocsProfonds);
        resultatsEtatChoc.push(perso.etatDeChoc ? 1:0);
        ptCrise = perso.pointsDeCrise;
    }
    const moyennePointsChocs = resultatsPointsChocs.reduce((prev, curr, idx, arr) => prev + (curr/arr.length), 0);
    const moyennePointsChocsProfonds = resultatsPointsChocsProfonds.reduce((prev, curr, idx, arr) => prev + (curr/arr.length), 0);
    const moyenneEtatDeChocs = resultatsEtatChoc.reduce((prev, curr, idx, arr) => prev + (curr/arr.length), 0);

    return {
        iterations,
        VOLONTE,
        INTELLECT,
        SENSITIF,
        ptCrise,
        moyennePointsChocs,
        moyennePointsChocsProfonds,
        moyenneEtatDeChocs,
    };
    // perso = acquerirCompetenceDementielle(perso, "Combat Hallebarde", "agilite");
    // perso = acquerirCompetenceDementielle(perso, "Esquive", "agilite");
    // perso = acquerirCompetenceDementielle(perso, "Pistage de dinosaure", "agilite");
    // perso = incredire(perso, "sensitif", -1, 1);
    // perso = incredire(perso, "sensitif", -2, 1);
    // perso = incredire(perso, "intellect", -2, 2);
    // perso = incredire(perso, "intellect", -1, 2);

    // TODO : jet de compétence, avec en option : energie démentielle avant de tenter l'action et recommencer action en cas d'échec.
    // TODO : duel avec perso actif; energie démentielle avant de tenter l'action et recommencer action en cas d'échec ?
    // TODO : énergie démentielle 
    // TODO : recommencer action
    // TODO : énergie démentielle + recommencer action
    // TODO : antalgie démentielle = jet de constitution pour atténuer une douleur (nécessite d'avoir implémenté les Douleurs)
    // TODO : empathie démentielle = jet de charisme pour atténuer un état de choc sur un autre personnage (nécessite d'avoir implémenté les effets de l'état de choc)
    // TODO : prendre les vapes = automatique. remet à zero douleurs, chocs (sauf si chocs profonds), expérience, équipement, points de crise
    // TODO : mourir = point de choc profond et sortie de crise/RAZ (comme Vapes)
    // TODO : se réveiller en s'étant couché pendant une Crise = jet de crise
    // TODO : accomplir = points de crise deviennent points d'accomplissement, passer un niveau d'accomplissement?, croix d'expérience sur compétences non démentielles utilisées, et RAZ Douleurs, Equipement, Compétences Démentielles, points de Crises, Chocs (sauf ancré par Choc Profond)
    // TODO : saint-frusquin : tirage d'équipement aléatoire

    //console.log(perso);
}

console.log("simulation", simuler());