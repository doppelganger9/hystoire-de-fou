import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js"
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
            //this.perso.equipements = this.perso.equipements.filter(ligne => ligne !== equipement);
            this.perso.equipements = this.perso.equipements.filter((_, index) => index !== indexEquipement);
        },
        ajouterLigneEquipement: function() {
            this.perso.equipements.push(''+this.nouvelEquipement);
            this.nouvelEquipement = '';
        } 
    }
});

