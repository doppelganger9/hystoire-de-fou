// @ts-check
// ---------------------------------------------------------
// Fiche de Personnage
// ---------------------------------------------------------

export class ContextePersonnage {
    nom = "Toto";
    description = "Personnage de test";
    profession = "Artiste";
    age = 20;
    tailleMetrique = 1.65;
    motDeDemence = "Bazinga!"

    // Caractéristiques
    volonte = 11;
    intellect = 11;
    sensitif = 11;
    charisme = 11;
    constitution = 11;
    perception = 11;
    agilite = 11;

    // Compétences révélées
    competences = []; // Compentence[]
    pointsDeGeneration = 12;

    // Compétences démentielles
    competencesDementielles = []; // Compentence[]

    // Santé Physique
    douleurs = []; // Douleur[]

    // Santé Mentale
    pointsDeCrise = 0;
    chocsParano = 0;
    chocsSchizo = 0;
    chocsProfonds = 0;
    etatDeChoc = false;
    totalAccomplissement = 0;
    niveauAccomplissement = 0;

    // Equipement
    equipements = [
        "une clef bleue"
    ]; // String[]

    // caractéristiques dérivées
    get entendement() {
        return +Math.floor(((+this.intellect) + (+this.sensitif))/2);
    }
    get tailleScore() {
        return +calculerScoreTaille(this.tailleMetrique);
    }
    get bonusAuxDommages() {
        return +calculerBonusAuxDommages(this.constitution, this.tailleScore);
    }
    get tendance() {
        return calculerLaTendance(this.intellect, this.sensitif);
    }
}

export class Douleur {
    provenance = "";
    valeur = 1;
}

export class Competence {
    intitule = "?";
    base = 0; // 0 = 0%, 1 = 50%
    revelee = false;
    dementielle = false;
    professionnelle = false;
    get valeur() {
        if (this.dementielle) {
            // 100% + 1
            return (+this.valeurCaracteristiqueDirectrice) + 1;
        } else if (this.professionnelle) {
            // 100%, pas de révélation
            return (+this.valeurCaracteristiqueDirectrice);
        } else {
            // si pas encore révélée.. investir des points de génération ou pas.
            // palliers 0: 0% / 1: 50% / 2: 75% / 3: 100%
            const pallier = this.base + this.pointsDeGeneration;
            if (pallier == 0) {
                return 0;
            } else if (pallier == 1) {
                return Math.floor((+this.valeurCaracteristiqueDirectrice) * .5);
            } else if (pallier == 2) {
                return Math.floor((+this.valeurCaracteristiqueDirectrice) * .75);
            } else if (pallier == 3) {
                return (+this.valeurCaracteristiqueDirectrice);
            } else {
                console.error("pallier inconnu !", pallier);
            }
        }
    }
    valeurCaracteristiqueDirectrice = 0;
    nomCaracteristiqueDirectrice = undefined;
    pointsDeGeneration = 0;
}

function calculerScoreTaille(tailleMetrique) {
    tailleMetrique = +tailleMetrique; //pour être sûr que c'est un nombre.
    if (tailleMetrique <= 1.54) {
        return 6;
    } else if (tailleMetrique > 1.54 && tailleMetrique <= 1.59) {
        return 7;
    } else if (tailleMetrique > 1.59 && tailleMetrique <= 1.64) {
        return 8;
    } else if (tailleMetrique > 1.64 && tailleMetrique <= 1.69) {
        return 9;
    } else if (tailleMetrique > 1.69 && tailleMetrique <= 1.74) {
        return 10;
    } else if (tailleMetrique > 1.74 && tailleMetrique <= 1.79) {
        return 11;
    } else if (tailleMetrique > 1.79 && tailleMetrique <= 1.84) {
        return 12;
    } else if (tailleMetrique > 1.84 && tailleMetrique <= 1.89) {
        return 13;
    } else if (tailleMetrique > 1.89 && tailleMetrique <= 1.94) {
        return 14;
    } else if (tailleMetrique > 1.94) {
        return 15;
    }
}

function calculerBonusAuxDommages(constitution, tailleScore) {
    constitution = +constitution; //pour être sûr que c'est un nombre.
    tailleScore = +tailleScore; //pour être sûr que c'est un nombre.
    const total = constitution + tailleScore;

    if (total <= 15) {
        return -2;
    } else if (total > 15 && total <= 19) {
        return -1;
    } else if (total > 19 && total <= 23) {
        return 0;
    } else if (total > 23 && total <= 27) {
        return +1;
    } else if (total > 27) {
        return +2;
    }
}

function calculerLaTendance(intellect, sensitif) {
    intellect = +intellect;
    sensitif = +sensitif;

    if (intellect > sensitif) {
        return "Parano";
    } else if (sensitif > intellect) {
        return "Schizo";
    }
    return "Parano/Schizo";
}