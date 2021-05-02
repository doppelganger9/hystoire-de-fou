//@ts-check
import { ContextePersonnage, Competence, Douleur } from "./fiche-personnage.mjs";

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

export const HdfStore = {
  state: {
    count: 0,
    perso: new ContextePersonnage(),
    infos: '',
    hiddenInfos: true,
    mode: 'création',
    hiddenVoile: true,
    hiddenPopupCompetence: true,
    nouvelleCompetence: new Competence(),
    hiddenPopupJet: true,
    etatJet: '',
  },
  getters: {
    creationFinie: function(state) {
      const repartitionCaracFinie = state.perso.pointsCaracteristiqueRestant === 0;
      const persoAUneCompetenceProfessionnelle = state.perso.competences.some(_ => _.professionnelle);
      const etatCivilRempli = state.perso.nom 
        && state.perso.age 
        && state.perso.tailleCm 
        && state.perso.description 
        && state.perso.poids 
        && state.perso.motDeDemence 
        && state.perso.profession;

      return repartitionCaracFinie 
          && persoAUneCompetenceProfessionnelle 
          && etatCivilRempli;
    },
  },
  mutations: {
    increment (state) {
      state.count++
    },
    // ---
    prepareInfos: function(state, event) {
      state.infos = event;
    },
    afficheInfos: function(state) {
      state.hiddenInfos = false;   
    },
    masqueInfos: function(state) {
      //state.infos = '';
      state.hiddenInfos = true;
    },
    // ---
    passerEnMode: function (state, mode) {
      state.mode = mode;
    },
    // ---
    afficheVoile: function(state) {
      state.hiddenVoile = false;
    },
    masqueVoile: function(state) {
      state.hiddenVoile = true;
    },
    // ---
    masquePopupJet: function(state) {
      state.hiddenPopupJet = true;
    },
    affichePopupJet: function(state) {
      state.hiddenPopupJet = false;
    },
    preparePopupJet: function(state, event) {
      state.etatJet = {...event};
    },
    // ---
    preparePopupCompetence: function(state, event) {
      state.nouvelleCompetence = event; // vérifier que ça passe sans {...event} ?
    },
    masquePopupCompetence: function(state) {
      state.hiddenPopupCompetence = true;
    },
    affichePopupCompetence: function(state) {
      state.hiddenPopupCompetence = false;
    },
    // ---
    sauvegardePerso: function(state) {
        document.location.hash = btoa(JSON.stringify(state.perso));
    },
    chargePerso: function(state) {
        const test = (document.location.hash) ?
            document.location.hash.substring(1)
            :
            `eyJub20iOiJUcmlzdGFuIiwiZGVzY3JpcHRpb24iOiJCcnVuLCB5ZXV4IG1hcnJvbnMsIHJlZ2FyZCB2aWYiLCJwcm9mZXNzaW9uIjoiSGlzdG9yaWVuIiwiYWdlIjoiMjMiLCJ0YWlsbGVDbSI6IjE4MCIsIm1vdERlRGVtZW5jZSI6IkVjb3V2aWxsb24hIiwicG9pZHMiOiI3NSIsInZvbG9udGUiOiIxMCIsImludGVsbGVjdCI6IjEzIiwic2Vuc2l0aWYiOiIxMCIsImNoYXJpc21lIjoiMTMiLCJjb25zdGl0dXRpb24iOiIxMyIsInBlcmNlcHRpb24iOiIxMiIsImFnaWxpdGUiOiI5IiwiY29tcGV0ZW5jZXMiOlt7ImludGl0dWxlIjoiQ3VsdHVyZSBH6W7pcmFsZSIsImJhc2UiOjMsInJldmVsZWUiOnRydWUsImRlbWVudGllbGxlIjpmYWxzZSwicHJvZmVzc2lvbm5lbGxlIjpmYWxzZSwidmFsZXVyQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6MTEsIm5vbUNhcmFjdGVyaXN0aXF1ZURpcmVjdHJpY2UiOiJlbnRlbmRlbWVudCIsInBvaW50c0RlR2VuZXJhdGlvbiI6MH0seyJpbnRpdHVsZSI6Ikhpc3J0b2lyZSIsImJhc2UiOjAsInJldmVsZWUiOnRydWUsImRlbWVudGllbGxlIjpmYWxzZSwicHJvZmVzc2lvbm5lbGxlIjp0cnVlLCJ2YWxldXJDYXJhY3RlcmlzdGlxdWVEaXJlY3RyaWNlIjoxMSwibm9tQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6ImVudGVuZGVtZW50IiwicG9pbnRzRGVHZW5lcmF0aW9uIjowfV0sImNvbXBldGVuY2VzRGVtZW50aWVsbGVzIjpbXSwiZG91bGV1cnMiOltdLCJwb2ludHNEZUNyaXNlIjowLCJjaG9jc1BhcmFubyI6MCwiY2hvY3NTY2hpem8iOjAsImNob2NzUHJvZm9uZHMiOjAsImV0YXREZUNob2MiOmZhbHNlLCJ0b3RhbEFjY29tcGxpc3NlbWVudCI6MCwiZXF1aXBlbWVudHMiOltdfQ==`;
        const persoACopier = Object.appendChain(JSON.parse(atob(test)), new ContextePersonnage());
        // on retransforme les objets "simple" issus du JSON en modifiant leur chaîne de prototypage avec les type d'objets attendus
        persoACopier.competences.map(item => Object.appendChain(item, new Competence()));
        persoACopier.competencesDementielles.map(item => Object.appendChain(item, new Competence()));
        persoACopier.douleurs.map(item => Object.appendChain(item, new Douleur()));

        state.perso = persoACopier;
    }
  },
  actions: {
    masqueTout: function(context) {
      context.commit('masqueInfos');
      context.commit('masquePopupCompetence');
      context.commit('masqueVoile');
      context.commit('masquePopupJet');
    },
    afficheInfos: function(context, event) {
      context.commit('prepareInfos', event);
      context.commit('afficheInfos');
      context.commit('afficheVoile');
    },
    affichePopupJet: function(context, event) {
      context.commit('preparePopupJet', event);
      context.commit('affichePopupJet');
      context.commit('afficheVoile');
    },
    affichePopupCompetence: function(context, event) {
      context.commit('preparePopupCompetence', event);
      context.commit('affichePopupCompetence');
      context.commit('afficheVoile');
    },
    chargePersonnage: function(context) {
      context.commit('chargePerso');
      context.commit('passerEnMode', 'jeu');
    }
  },
};
