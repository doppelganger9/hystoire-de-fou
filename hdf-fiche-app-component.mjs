//@ts-check
import { Competence } from "./fiche-personnage.mjs";
import { ContextePersonnage } from "./fiche-personnage.mjs";

export const FicheAppComponent = {
    el: '#app',
    data: function() {
        return {
            perso: new ContextePersonnage(),
            infos: '',
            hiddenInfos: true,
            mode: 'création',
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
        onNouvelleCompetence: function(event) {
            this.nouvelleCompetence = event;
            this.hiddenVoile = false;
            this.hiddenPopupCompetence = false;
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
};