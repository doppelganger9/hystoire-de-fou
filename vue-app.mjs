import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js"
import { Douleur } from "./fiche-personnage.mjs";
import { ContextePersonnage, infosCaracteristiques } from "./fiche-personnage.mjs"
import { habillerALaSaintFrusquin } from "./saint-frusquin.mjs";


export const app = new Vue({
    el: '#app',
    data: {
        perso: new ContextePersonnage(),
        infos: '',
        hiddenInfos: true,
        mode: 'création',
        nouvelEquipement: '',
        nouvelleDouleur: new Douleur(),
    },
    computed: {
        totalDouleurs: function() {
            return this.perso.douleurs.reduce((total, douleur) => (+total)+(+douleur.valeur), 0);
        }
    },
    methods: {
        genererEquipementSaintFrusquin: function() {
            this.perso.equipements = habillerALaSaintFrusquin();
        },
        afficherInfos: function(typeInfos) {
            console.debug("ici")
            this.infos = infosCaracteristiques[typeInfos];
            this.hiddenInfos = false;    
        },
        masquerInfos: function() {
            this.infos = '';
            this.hiddenInfos = true;    
        },
        terminerRepartitionCaracteristiques: function () {
            this.mode = 'jeu';
        },
        supprimerLigneEquipement: function(indexEquipement) {
            this.perso.equipements = this.perso.equipements.filter((_, index) => index !== indexEquipement);
        },
        ajouterLigneEquipement: function() {
            this.perso.equipements.push(''+this.nouvelEquipement);
            this.nouvelEquipement = '';
        },
        supprimerLigneDouleur: function(indexDouleur) {
            this.perso.douleurs = this.perso.douleurs.filter((_, index) => index !== indexDouleur);
        },
        ajouterLigneDouleur: function() {
            this.perso.douleurs.push(this.nouvelleDouleur);
            this.nouvelleDouleur = new Douleur();
        },
        choisirCompetenceProfessionnelle: function() {
            // TODO
        },
        revelerCompetence: function() {
            // TODO
        },
        acquerirCompetenceDementielle: function() {
            // TODO
        }
    }
});

