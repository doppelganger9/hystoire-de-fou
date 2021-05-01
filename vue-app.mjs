import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js"
import { Douleur } from "./fiche-personnage.mjs";
import { ContextePersonnage, infosCaracteristiques } from "./fiche-personnage.mjs"
import { habillerALaSaintFrusquin } from "./saint-frusquin.mjs";

Vue.component('hdf-bloc-fiche', {
    props: ['title'],
    template: `
    <div class="bloc">
        <h2>{{ title }}</h2>
        <slot></slot>
    </div>
    `,
});

export const app = new Vue({
    el: '#app',
    data: {
        perso: new ContextePersonnage(),
        infos: '',
        hiddenInfos: true,
        mode: 'création',
        nouvelEquipement: '',
        nouvelleDouleur: new Douleur(),
        hiddenVoile: true,
    },
    computed: {
        totalDouleurs: function() {
            return this.perso.douleurs.reduce((total, douleur) => (+total)+(+douleur.valeur), 0);
        }
    },
    methods: {
        genereEquipementSaintFrusquin: function() {
            this.perso.equipements = habillerALaSaintFrusquin();
        },
        afficheInfos: function(typeInfos) {
            this.infos = infosCaracteristiques[typeInfos];
            this.hiddenInfos = false;   
            this.afficheVoile(); 
        },
        masqueInfos: function() {
            this.infos = '';
            this.hiddenInfos = true;    
            this.masqueVoile();
        },
        termineRepartitionCaracteristiques: function () {
            this.mode = 'jeu';
        },
        supprimeLigneEquipement: function(indexEquipement) {
            this.perso.equipements = this.perso.equipements.filter((_, index) => index !== indexEquipement);
        },
        ajouteLigneEquipement: function() {
            this.perso.equipements.push(''+this.nouvelEquipement);
            this.nouvelEquipement = '';
        },
        supprimeLigneDouleur: function(indexDouleur) {
            this.perso.douleurs = this.perso.douleurs.filter((_, index) => index !== indexDouleur);
        },
        ajouteLigneDouleur: function() {
            this.perso.douleurs.push(this.nouvelleDouleur);
            this.nouvelleDouleur = new Douleur();
        },
        choisitCompetenceProfessionnelle: function() {
            // TODO
        },
        reveleCompetence: function() {
            // TODO
        },
        acquiertCompetenceDementielle: function() {
            // TODO
        },
        afficheVoile: function() {
            this.hiddenVoile = false;
        },
        masqueVoile: function() {
            this.hiddenVoile = true;
        }
    }
});

