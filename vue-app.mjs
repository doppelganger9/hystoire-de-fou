import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js"
import { Competence } from "./fiche-personnage.mjs";
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
        hiddenPopupCompetence: true,
        nouvelleCompetence: new Competence(),
    },
    computed: {
        totalDouleurs: function() {
            return this.perso.douleurs.reduce((total, douleur) => (+total)+(+douleur.valeur), 0);
        },
        creationFinie: function() {
            const repartitionCaracFinie = this.perso.pointsCaracteristiqueRestant === 0;
            const persoAUneCompetenceProfessionnelle = this.perso.competences.some(_ => _.professionnelle);
            const etatCivilRempli = this.perso.nom && this.perso.age && this.perso.tailleCm && this.perso.description && this.perso.poids && this.perso.motDeDemence && this.perso.profession;

            return repartitionCaracFinie && persoAUneCompetenceProfessionnelle && etatCivilRempli;
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
            this.masqueTout();
        },
        passerEnMode: function (mode) {
            this.mode = mode;
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
        initNouvelleCompetence() {
            this.nouvelleCompetence = new Competence();
            this.nouvelleCompetence.professionnelle = false;
            this.nouvelleCompetence.revelee = false;
            this.nouvelleCompetence.dementielle = false;
            this.nouvelleCompetence.intitule = "";
            this.nouvelleCompetence.valeurCaracteristiqueDirectrice = 0;
            this.nouvelleCompetence.nomCaracteristiqueDirectrice = ""
            this.nouvelleCompetence.pointsDeGeneration = 0;
        },
        choisitCompetenceProfessionnelle: function() {
            this.initNouvelleCompetence();
            this.nouvelleCompetence.professionnelle = true;
            this.nouvelleCompetence.revelee = true;

            this.hiddenPopupCompetence = false;
        },
        reveleCompetence: function() {
            this.initNouvelleCompetence();
            this.nouvelleCompetence.revelee = true;

            this.hiddenPopupCompetence = false;
        },
        acquiertCompetenceDementielle: function() {
            this.initNouvelleCompetence();
            this.nouvelleCompetence.dementielle = true;

            this.hiddenPopupCompetence = false;
        },
        supprimeLigneCompetence: function(indexCompetence) {
            this.perso.competences = this.perso.competences.filter((_, index) => index !== indexCompetence);
        },
        nouvelleCompetenceNomCaracteristiqueDirectriceChanged: function() {
            this.nouvelleCompetence.valeurCaracteristiqueDirectrice = this.perso[this.nouvelleCompetence.nomCaracteristiqueDirectrice];
        },
        valideAjoutCompetence: function(competence) {
            if (competence.dementielle) {
                this.perso.competencesDementielles.push(competence);
                // TODO déclencher l'effet démentiel ?
            } else {
                if (competence.professionnelle && competence.nomCaracteristiqueDirectrice === 'entendement') {
                    // si compétence professionnelle est sous Entendement, alors Culture Générale à 100% en bonus
                    const cultureGeneraleEnBonus = new Competence();
                    cultureGeneraleEnBonus.professionnelle = false;
                    cultureGeneraleEnBonus.revelee = true;
                    cultureGeneraleEnBonus.dementielle = false;
                    cultureGeneraleEnBonus.intitule = "Culture Générale";
                    cultureGeneraleEnBonus.valeurCaracteristiqueDirectrice = this.perso.entendement;
                    cultureGeneraleEnBonus.nomCaracteristiqueDirectrice = "entendement"
                    cultureGeneraleEnBonus.pointsDeGeneration = 0;
                    cultureGeneraleEnBonus.base = 3; // 100%
                    this.perso.competences.push(cultureGeneraleEnBonus);
                }
                this.perso.competences.push(competence);
            }
            this.nouvelleCompetence = new Competence();

            this.masqueTout();
        },
        afficheVoile: function() {
            this.hiddenVoile = false;
        },
        masqueVoile: function() {
            this.hiddenVoile = true;
        },
        masqueTout: function() {
            this.hiddenInfos = true;
            this.hiddenPopupCompetence = true;
            this.hiddenVoile = true;
        }
    }
});
