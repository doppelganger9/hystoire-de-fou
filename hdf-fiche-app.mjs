//@ts-check
import { ContextePersonnage, Competence, Douleur } from "./fiche-personnage.mjs";

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
            hiddenPopupJet: true,
            etatJet: '',
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
            this.hiddenPopupCompetence = false;
            this.afficheVoile();
        },
        afficheVoile: function() {
            this.hiddenVoile = false;
        },
        masqueVoile: function() {
            this.hiddenVoile = true;
        },
        affichePopupJet: function(event) {
            this.etatJet = event;
            this.hiddenPopupJet = false;
            this.afficheVoile();
        },
        masqueTout: function() {
            this.hiddenInfos = true;
            this.hiddenPopupCompetence = true;
            this.masqueVoile();
            this.hiddenPopupJet = true;
        },
        sauvegardePerso: function() {
            document.location.hash = btoa(JSON.stringify(this.perso));
        },
        chargePerso: function() {
            const test = (document.location.hash) ?
                document.location.hash.substring(1)
                :
                `eyJub20iOiJUcmlzdGFuIiwiZGVzY3JpcHRpb24iOiJCcnVuLCB5ZXV4IG1hcnJvbnMsIHJlZ2FyZCB2aWYiLCJwcm9mZXNzaW9uIjoiSGlzdG9yaWVuIiwiYWdlIjoiMjMiLCJ0YWlsbGVDbSI6IjE4MCIsIm1vdERlRGVtZW5jZSI6IkVjb3V2aWxsb24hIiwicG9pZHMiOiI3NSIsInZvbG9udGUiOiIxMCIsImludGVsbGVjdCI6IjEzIiwic2Vuc2l0aWYiOiIxMCIsImNoYXJpc21lIjoiMTMiLCJjb25zdGl0dXRpb24iOiIxMyIsInBlcmNlcHRpb24iOiIxMiIsImFnaWxpdGUiOiI5IiwiY29tcGV0ZW5jZXMiOlt7ImludGl0dWxlIjoiQ3VsdHVyZSBH6W7pcmFsZSIsImJhc2UiOjMsInJldmVsZWUiOnRydWUsImRlbWVudGllbGxlIjpmYWxzZSwicHJvZmVzc2lvbm5lbGxlIjpmYWxzZSwidmFsZXVyQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6MTEsIm5vbUNhcmFjdGVyaXN0aXF1ZURpcmVjdHJpY2UiOiJlbnRlbmRlbWVudCIsInBvaW50c0RlR2VuZXJhdGlvbiI6MH0seyJpbnRpdHVsZSI6Ikhpc3J0b2lyZSIsImJhc2UiOjAsInJldmVsZWUiOnRydWUsImRlbWVudGllbGxlIjpmYWxzZSwicHJvZmVzc2lvbm5lbGxlIjp0cnVlLCJ2YWxldXJDYXJhY3RlcmlzdGlxdWVEaXJlY3RyaWNlIjoxMSwibm9tQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6ImVudGVuZGVtZW50IiwicG9pbnRzRGVHZW5lcmF0aW9uIjowfV0sImNvbXBldGVuY2VzRGVtZW50aWVsbGVzIjpbXSwiZG91bGV1cnMiOltdLCJwb2ludHNEZUNyaXNlIjowLCJjaG9jc1BhcmFubyI6MCwiY2hvY3NTY2hpem8iOjAsImNob2NzUHJvZm9uZHMiOjAsImV0YXREZUNob2MiOmZhbHNlLCJ0b3RhbEFjY29tcGxpc3NlbWVudCI6MCwiZXF1aXBlbWVudHMiOltdfQ==`;
            const persoACopier = Object.appendChain(JSON.parse(atob(test)), new ContextePersonnage());
            // on retransforme les objets "simple" issus du JSON en modifiant leur chaîne de prototypage avec les type d'objets attendus
            persoACopier.competences.map(item => Object.appendChain(item, new Competence()));
            persoACopier.competencesDementielles.map(item => Object.appendChain(item, new Competence()));
            persoACopier.douleurs.map(item => Object.appendChain(item, new Douleur()));
            this.passerEnMode('jeu');
            this.perso = persoACopier;
        }
    }
};

// utilitaire issu de https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
Object.appendChain = function (oChain, oProto) {
    if (arguments.length < 2) {
      throw new TypeError("Object.appendChain - Pas suffisamment d'arguments");
    }
    if (typeof oProto !== 'object' && typeof oProto !== 'string') {
     throw new TypeError("le deuxième argument de Object.appendChain doit être un objet ou une chaîne");
    }
  
    let oNewProto, oReturn, o2nd, oLast;
    oNewProto = oProto;
    oReturn = o2nd = oLast = oChain instanceof this ? oChain : new oChain.constructor(oChain);
  
    for (let o1st = this.getPrototypeOf(o2nd); o1st !== Object.prototype && o1st !== Function.prototype; o1st = this.getPrototypeOf(o2nd)) {
      o2nd = o1st;
    }
  
    if (oProto.constructor === String) {
      oNewProto = Function.prototype;
      oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
      this.setPrototypeOf(oReturn, oLast);
    }
  
    this.setPrototypeOf(o2nd, oNewProto);
    return oReturn;
}