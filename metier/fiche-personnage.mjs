// @ts-check
// ---------------------------------------------------------
// Fiche de Personnage
// ---------------------------------------------------------

export class ContextePersonnage {
    nom = "Toto";
    description = "Personnage de test";
    profession = "Artiste";
    age = 20;
    tailleCm = 165;
    motDeDemence = "Bazinga!"
    poids = 60;

    // Caractéristiques (entre 6 et 15)
    get pointsCaracteristiqueRestant() {
        return 80 -this.volonte -this.intellect -this.sensitif -this.charisme -this.constitution -this.perception -this.agilite;
    }
    volonte = 11;
    intellect = 11;
    sensitif = 11;
    charisme = 11;
    constitution = 11;
    perception = 11;
    agilite = 11;

    // Compétences révélées (entre 0 et 20)
    competences = []; // Compentence[]
    get pointsDeGeneration() {
        return 12 - this.competences.reduce((total, competence) => (+total) + (+competence.pointsDeGeneration), 0);
    }

    // Compétences démentielles (entre 0 et 20)
    competencesDementielles = []; // Compentence[]

    // Santé Physique (sans limite)
    douleurs = []; // Douleur[]

    // Santé Mentale (sans limite)
    pointsDeCrise = 0;
    chocsParano = 0;
    chocsSchizo = 0;
    chocsProfonds = 0;
    etatDeChoc = false;
    totalAccomplissement = 0;

    // Equipement
    equipements = []; // String[]

    // caractéristiques dérivées
    get niveauAccomplissement() {
        return calculerNiveauAccomplissement(this.totalAccomplissement);
    }
    get entendement() {
        return +Math.floor(((+this.intellect) + (+this.sensitif))/2);
    }
    get tailleScore() {
        return +calculerScoreTaille(this.tailleCm);
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
    croixExperience = false;
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
            const pallier = (+this.base) + (+this.pointsDeGeneration);
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

export function initNouvelleCompetence() {
    const nouvelleCompetence = new Competence();
    nouvelleCompetence.professionnelle = false;
    nouvelleCompetence.revelee = false;
    nouvelleCompetence.dementielle = false;
    nouvelleCompetence.intitule = "";
    nouvelleCompetence.valeurCaracteristiqueDirectrice = 0;
    nouvelleCompetence.nomCaracteristiqueDirectrice = ""
    nouvelleCompetence.pointsDeGeneration = 0;
    return nouvelleCompetence;
}

function calculerScoreTaille(tailleCm) {
    tailleCm = +tailleCm; //pour être sûr que c'est un nombre.
    if (tailleCm <= 154) {
        return 6;
    } else if (tailleCm > 154 && tailleCm <= 159) {
        return 7;
    } else if (tailleCm > 159 && tailleCm <= 164) {
        return 8;
    } else if (tailleCm > 164 && tailleCm <= 169) {
        return 9;
    } else if (tailleCm > 169 && tailleCm <= 174) {
        return 10;
    } else if (tailleCm > 174 && tailleCm <= 179) {
        return 11;
    } else if (tailleCm > 179 && tailleCm <= 184) {
        return 12;
    } else if (tailleCm > 184 && tailleCm <= 189) {
        return 13;
    } else if (tailleCm > 189 && tailleCm <= 194) {
        return 14;
    } else if (tailleCm > 194) {
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

function calculerNiveauAccomplissement(totalAccomplissement) {
    totalAccomplissement = +totalAccomplissement;

    if (totalAccomplissement < 15) {
        return 0;
    } else if (totalAccomplissement < 30) {
        return 1;
    } else if (totalAccomplissement < 50) {
        return 2;
    } else if (totalAccomplissement < 80) {
        return 3;
    } else if (totalAccomplissement < 130) {
        return 4;
    } else if (totalAccomplissement < 200) {
        return 5;
    } else if (totalAccomplissement < 300) {
        return 6;
    } else if (totalAccomplissement < 450) {
        return 7;
    } else if (totalAccomplissement < 650) {
        return 8;
    } else if (totalAccomplissement < 1000) {
        return 9;
    } else if (totalAccomplissement >= 1000) {
        return 10;
    }
    // au delà c'est +1 niveau tous les 500 points au dessus de 1000...

    return 0;
}

export const infosCaracteristiques = {
    "volonté": `<p>C'est la force de caractère du personnage, ce qui lui permet de rester maître de lui-même, de craquer le plus tard possible.
En cours de crise, la VOLONTE sert essentiellement à résister aux chocs mentaux.</p>
<p class="exemple">Caroline Chevalier (8 en VOLONTE, soit 2 points de moins que la moyenne) succombe assez vite à l'hystérie lors de l'agression dans la décharge.</p>`,
    "intellect": `<p>C'est la capacité intellectuelle du personnage, sa faculté de raisonner, de calculer, d'analyser, de penser logiquement ou de façon abstraite.
En cours de crise, l'INTELLECT sert à exercer l'effet démentiel d'Incrédulité.</p>
<p class="exemple">Antoine Amelin, écrivain traducteur, est un intellectuel, il a 14 en INTELLECT.</p>`,
    "sensitif": `<p>C'est la capacité émotionnelle du personnage, sa faculté de ressentir les choses, son intuition, son imagination.
En cours de crise, le SENSITIF sert également à exercer l'effet démentiel d'Incrédulité.</p>
<p class="exemple">Antoine a une bonne imagination en tant qu'écrivain, Caroline également en tant qu'artiste.
Tous les deux ont 14 en SENSITIF.</p>`,
    "entendement": `<p>Cette caractéristique est obtenue en faisant la moyenne d'INTELLECT + SENSITIF.
C'est la façon dont fonctionne globalement le mental du personnage, son intelligence en quelque sorte.
Face à son environnement, un personnage ne saurait en effet être purement intellectuel, raisonnant et calculant, ni non plus strictement sensitif, ressentant et imaginant.
La façon dont il appréhende et résout ses problèmes est en vérité un mélange des deux.
Selon la situation et le caractère du personnage, l'intellect l'emporte parfois sur le sensitif, et vice-versa, mais aucun des deux ne reste totalement muet.</p>
<p class="exemple">Bertrand Barbillon est plus intellectuel (9) que sensitif (7), mais finalement son Entendement de 8 en fait quelqu'un de pas très malin.</p>
<p>C'est surtout lors des crises que les deux caractéristiques jouent un rôle séparé, en cas de choc mental. Un INTELLECT supérieur au SENSITIF donne une tendance <em>paranoïaque</em>, tandis qu'un SENSITIF supérieur à INTELLECT donne une tendance <em>schizophrène</em></p>`,
    "charisme": `<p>En terme de règles, cette caractéristique est ambivalente.
Elle indique d'une part le charisme du personnage au sens usuel du terme, l'attraction qu'il exerce sur les autres, son charme, son pouvoir de séduction, et d'autre part sa <em>chance</em>.
Il peut arriver en effet que le meneur de jeu demande un jet de chance, pour savoir par exemple si un pot de fleur est sur le point de tomber du balcon sous lequel passe le personnage.
On utilise pour cela la caractéristique CHARISME.
Les personnages malchanceux, en effet, ne sauraient être charismatiques. 
Voyez James Bond, Zorro, Indiana Jones : ces personnages charismatiques n'ont-ils pas en même temps une veine insolente ?
Inversement, il y a indéniablement du charme dans un personnage qui a toujours de la chance.
Il est béni des dieux.</p>
<p class="exemple">Caroline a 15 en CHARISME, très utile pour sa future carrière d'actrice.
Antoine n'a que 9: sa patronne prétend qu'il est la réincarnation d'une espèce de cancrelat.</p>
<p>En combat, CHARISME sert à résoudre les tirs.
Ce n'est pas en effet le tireur qui joue un jet de compétence pour savoir s'il touche, mais la victime qui joue un jet de chance pour savoir si elle est touchée.</p>`,
    "constitution": `<p>C'est la vigueur du personnage, sa robustesse, sa résistance, et en même temps sa force physique, sa musculature.
Les muscles, en effet, ne se développent pas par hasard.
Il faut les aider, faire des efforts physiques.
Un personnage de faible constitution, tout le temps malade, cible privilégiée du premier virus qui passe, est vite dépassé par les évènements, les efforts lui coûtent davantage et ses muscles en pâtissent.
La caractéristique CONSTITUTION sert à résoudre les actions de force (enfoncer une porte, soulever un poids), elle intervient dans le calcul des dommages que peut causer un personnage en frappant, et sert également à évaluer les dommages qu'il reçoit.
Plus on est costaud, mieux on encaisse.</p>
<p class="exemple">Bertrand Barbillon a 15 en CONSTITUTION ; malgré ses blessures, il est encore debout à la fin du combat contre les trois "monstres".</p>`,
    "perception": `<p>Regroupé en une seule caractéristique, c'est tout l'appareil sensoriel du personnage : vue, ouïe, goût, toucher.
Acuité des perceptions tout autant qu'interprétation correcte de ce qui est perçu.
Plus encore, cette caractéristique englobe le rapport complexe entre la <em>main</em> et l'<em>oeil</em>, autrement dit la dextérité manuelle.
Utiliser un scalpel avec précision, faire mouche au pistolet, piloter une voiture ou jouer d'un instrument de musique sont du ressort de PERCEPTION.</p>
<p class="exemple">Bertrand Barbillon a 14 en PERCEPTION, il a le coup d'oeil et c'est un "manuel".</p>`,
    "agilité": `<p>C'est la souplesse physique en général, l'équilibre, la notion que l'on a de son propre corps dans l'espace.
Cette caractéristique est indépendante de la musculature : un efant peut être très agile.
AGILITE est rarement utilisée telle quelle en cours de jeu, mais sert à déterminer toutes sortes de compétences : escalade, combat, discrétion, etc.<p/>
<p class="exemple">Avec 13 en AGILITE, Caroline a une bonne prédisposition pour esquiver les attaques des aveugles ou sauter dans l'arène sans tomber.</p>`,
};

const motsInsolites = [
    "Poulet Vanille", // exemple lu quelque part
    "Constantinople", // tiré d'un film de Woody Hallen, mot déclenchant un effet post-hypnose
    "Palsambleu",
    "Branquignol",
    "Foutriquet", // individu maigrichon
    "Embrouillamini",
    "Bacchanale",
    "Cacostomie", // puer de la gueule
    "Compos Mentis", // être maître de son esprit/rationnel
    "Obvie", // Obvious mais français
    "Parpaing",
    "Gynécomaste", // homme qui a des mamelles comme une femme
    "Chionosphéréphile", // qui aime collectionner les objet boules de neiges
    "Anatidaephobie", // peur d'être observé par un canard quelque part dans le monde
    "Sacqueboute", // ancêtre du saxophone
    "écouvillon", // brosse pour nettoyer des bouteilles
    "vinculum", // barre de fraction dans la division
    "Triskaïdekaphobie", // peur du vendredi 13
    "Cucurbitaciste", // collectionneur d'étiquette de melons
    "Croque-lardon", // parasite
    "Fébricule", // 37.8, petite fièvre
    "Zinzolin", // violet tirant sur le rouge -- couleur que prend un ciel dégagé lorsque le soleil se couche
    "Quantième", // "combientième" en bon français
    "Adelphie", // une fratrie avec aussi des soeurs, pas que des garçons.
    "Mâche-dru", // gros-mangeur
    "Crépine", // grille à saleté de la douche
    "Remugle", // odeur de fauve/renfermé
    "Abave", // arrière-arrière-grand-père ou arrière-arrière-grand-mère
    "Cacochyme", // constitution faible, santé déficiente
    // n'importe quel mot de http://golfes-dombre.nuxit.net/mots-rares/a.html
];

export function infosMotDeDemence() {
    return `
    <h3>Mot de Démence</h3>
    <p>Choisissez librement votre mot de démence.</p>
    <p>En termes de rôle, ce mot vous servira à déclencher vos effets démentiels.</p>
    <p>Vous aurez à le proférer souvent.</p>
    <p>Peu importe la signification intrinsèque du mot, c'est uniquement votre symbole, votre marque personnelle.</p>
    <p>Les effets sont les mêmes pour tous.</p>
    <p>Vous pouvez choisir un mot banal ou savant, voire un nom propre.</p>
    <p>Une courte locution est également possible, mais pas une phrase.</p>
    <p>Quelques exemples de mots de démence couramment employés dans la réalité :</p>
    <ul>
    <li>Au secours !</li>
    <li>Maman !</li>
    <li>Help !</li>
    <li>Ciel !</li>
    <li>O my god !</li>
    <li>Police !</li>
    <li>Sapristi !</li>
    <li>Syntax Error !</li>
    <li>Ma biche !</li>
    <li>Zut !</li>
    </ul>
    <p>Efforcez-vous toutefois de trouver quelque chose de plus personnel.
    <p>Voici quelques exemples tirés d'une curation de certains mots peu usités de notre langue française:</p>
    <ul>${motsInsolites.map(mot => "<li>" + mot + "</li>").join('')}</ul>
`;
}