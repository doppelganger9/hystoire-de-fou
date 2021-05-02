// @ts-check
import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js";
import { Competence } from "./fiche-personnage.mjs";
import { ContextePersonnage } from "./fiche-personnage.mjs";
import { habillerALaSaintFrusquin } from "./saint-frusquin.mjs";
import { BlocFicheComponent } from "./hdf-bloc-fiche.mjs";
import { BlocSanteComponent } from "./hdf-bloc-sante.mjs";
import { BlocCaracteristiquesComponent } from "./hdf-bloc-caracteristiques.mjs";

Vue.component('hdf-bloc-fiche', BlocFicheComponent);
Vue.component('hdf-bloc-caracteristiques', BlocCaracteristiquesComponent);
Vue.component('hdf-bloc-sante', BlocSanteComponent);

export const app = new Vue({
    el: '#app',
    data: function() {
        return {
            perso: new ContextePersonnage(),
            infos: '',
            hiddenInfos: true,
            mode: 'création',
            nouvelEquipement: '',
            hiddenVoile: true,
            hiddenPopupCompetence: true,
            nouvelleCompetence: new Competence(),
        };
    },
    computed: {
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
        afficheInfos: function(event) {
            this.infos = event;
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
