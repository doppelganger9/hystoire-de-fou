//@ts-check
import "./object-append-chain.mjs";
import { ContextePersonnage, Competence, Douleur } from "./fiche-personnage.mjs";
import { habillerALaSaintFrusquin } from "./saint-frusquin.mjs";

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
    etatJet: {nom:'volonte', type:'caracteristique'},
    journal: [],
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
    totalDouleurs: function(state) {
      return state.perso.douleurs.reduce((total, douleur) => (+total)+(+douleur.valeur), 0);
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
    ajouteLigneJournal: function(state, ligne) {
      state.journal.push(ligne);
    },
    // ---
    supprimeLigneCompetence: function(state, indexCompetence) {
      state.perso.competences = state.perso.competences.filter((_, index) => index !== indexCompetence);
    },
    ajouteCompetence: function(state, competence) {
      state.perso.competences.push(competence);
    },
    ajouteCompetenceDementielle: function(state, competence) {
      state.perso.competencesDementielles.push(competence);
    },
    supprimeLigneDouleur: function(state, indexDouleur) {
      state.perso.douleurs = state.perso.douleurs.filter((_, index) => index !== indexDouleur);
    },
    ajouteLigneDouleur: function(state, nouvelleDouleur) {
      state.perso.douleurs.push(nouvelleDouleur);
    },
    genereEquipementSaintFrusquin: function(state) {
      // on n'est pas censé appeler ça en cours de partie, juste en début de Crise.
      // donc ça efface tout l'équipement.
      state.perso.equipements = habillerALaSaintFrusquin();
    },
    supprimeLigneEquipement: function(state, indexEquipement) {
      state.perso.equipements = state.perso.equipements.filter((_, index) => index !== indexEquipement);
    },
    ajouteLigneEquipement: function(state, nouvelEquipement) {
      state.perso.equipements.push(''+nouvelEquipement);
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
    },
    ajouteCompetence: function(context, competence) {
      if (competence.dementielle) {
        context.commit('ajouteCompetenceDementielle', competence);
      } else {
        // TODO : bug si on ajoute une comp pro entendement, on ne peut pas supprimer Culture Gé
        // TODO : ne pas ajouter une comp si elle existe déjà.
        if (competence.professionnelle && competence.nomCaracteristiqueDirectrice === 'entendement') {
          // si compétence professionnelle est sous Entendement, alors Culture Générale à 100% en bonus
          const cultureGeneraleEnBonus = new Competence();
          cultureGeneraleEnBonus.professionnelle = false;
          cultureGeneraleEnBonus.revelee = true;
          cultureGeneraleEnBonus.dementielle = false;
          cultureGeneraleEnBonus.intitule = "Culture Générale";
          cultureGeneraleEnBonus.valeurCaracteristiqueDirectrice = context.state.perso.entendement;
          cultureGeneraleEnBonus.nomCaracteristiqueDirectrice = "entendement"
          cultureGeneraleEnBonus.pointsDeGeneration = 0;
          cultureGeneraleEnBonus.base = 3; // 100%
          context.commit('ajouteCompetence', cultureGeneraleEnBonus);
        }
        context.commit('ajouteCompetence', competence);          
      }
    },

  },
};
