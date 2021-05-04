// @ts-check
import { tirerUnDe20 } from "./trousse-des.mjs";

const tablePieds = [
    "mocassin",
    "tennis",
    "bottes en caoutchouc",
    "espadrilles",
    "chaussures de montagne",
    "charentaises",
    "cuissardes",
    "mules",
    "tongues",
    "talons aiguilles",
    "sabots",
    "grosses chaussettes",
    "socquettes",
    "chaussons de bébé",
    "palmes",
    "patins à glace",
    // 16+ : rien
];

const tableHauts = [
    "chemise",
    "tee-shirt",
    "corsage",
    "pull-over",
    "veste",
    "haut de pyjamas",
    "maillot de corps",
    "gilet",
    "châle",
    "tablier de bonne",
    "corset",
    "soutien-gorge",
    "camisole de force",
    "cotte de mailles",
    "gilet de sauvetage",
    "sac poubelle",
    // 16+ : rien
];

const tableCouleurs = [
    "rouge foncé",
    "rouge clair",
    "bleu foncé",
    "bleu clair",
    "jaune foncé",
    "jaune clair",
    "violet",
    "mauve",
    "pourpre",
    "vert foncé",
    "vert clair",
    "orange",
    "rose",
    "blanc",
    "gris",
    "noir",
    "brun",
    "beige",
    "kaki",
    "doré",
];

const tableMatieres = [
    "coton",
    "toile de jean",
    "drap de laine",
    "velours lisse",
    "velours côtelé",
    "satin",
    "soie",
    "laine tricotée",
    "tissu éponge",
    "dentelle",
    "jute",
    "chanvre",
    "fourrure",
    "cuir",
    "toile cirée",
    "nylon",
    "latex",
    "vinyle",
    "paille tressée",
    "papier kraft",
];

const tableBas = [
    "pantalon",
    "bermudas",
    "imperméable (*)",
    "culotes de cheval",
    "robe (*)",
    "bas de pyjamas",
    "caleçon moulant (cycliste)",
    "peignoir (*)",
    "mini-jupe",
    "peau d'ours (*)",
    "maillot de bain une pièce (*)",
    "paréo",
    "slip",
    "porte-jarretelles & bas",
    "tutu",
    "couche-culotte",
    // 16+ : rien
];

const tableAccessoires = [
    "bavoir",
    "pansement",
    "canotier",
    "foulard",
    "mouffles",
    "béret",
    "bonnet",
    "loup",
    "chapeau à voilette",
    "noeud papillon",
    "cravate",
    "lunettes de soleil",
    "monocle",
    "boa de plumes",
    "couronne des rois",
    "bouée",
    "fausse moustache",
    "perruque",
    "ongles vernis",
    "tatouage",
];

export function habillerALaSaintFrusquin() {
    
    const equipement = [];

    const jetPieds = tirerUnDe20();
    const resultatPieds = jetPieds < 16 ? tablePieds[jetPieds-1]:undefined;
    if (resultatPieds) {
        equipement.push(`${resultatPieds} en ${tableMatieres[tirerUnDe20()-1]} de couleur ${tableCouleurs[tirerUnDe20()-1]}`);
    }

    let pasDeHauts = false;
    const jetBas = tirerUnDe20();
    const resultatBas = jetBas < 16 ? tableBas[jetBas-1]:undefined;
    if (resultatBas) {
        equipement.push(`${resultatBas} en ${tableMatieres[tirerUnDe20()-1]} de couleur ${tableCouleurs[tirerUnDe20()-1]}`);

        if (resultatBas.indexOf("(*)")>=0) {
            pasDeHauts = true;
            // le bas est aussi un haut.
        }
    }

    if (!pasDeHauts) {
        const jetHauts = tirerUnDe20();
        const resultatHauts = jetHauts < 16 ? tableHauts[jetHauts-1]:undefined;
        if (resultatHauts) {
            equipement.push(`${resultatHauts} en ${tableMatieres[tirerUnDe20()]} de couleur ${tableCouleurs[tirerUnDe20()]}`);
        }    
    }
    
    const jetAccessoires = tirerUnDe20();
    const resultatAccessoires = jetAccessoires < 16 ? tableAccessoires[jetAccessoires-1]:undefined;
    if (resultatAccessoires) {
        equipement.push(`${resultatAccessoires} en ${tableMatieres[tirerUnDe20()]} de couleur ${tableCouleurs[tirerUnDe20()]}`);
    }

    return equipement;
}