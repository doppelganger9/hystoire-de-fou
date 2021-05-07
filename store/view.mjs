//@ts-check
import { Competence } from "../metier/competences.mjs";

/**
 * Module Store pour gérer l'état de la vue de l'app : quelle popup est affichée, etc.
 */
export const moduleView = {
  state: function() { 
    return {
      infos: '',
      hiddenInfos: true,
      mode: 'menu',
      hiddenVoile: true,
      hiddenPopupCompetence: true,
      nouvelleCompetence: new Competence(),
      hiddenPopupJet: true,
      etatJet: {nom:'volonte', type:'caractéristique'},
      journal: [],
      hiddenPopupEffetsDementiels: true,
    };
  },
  getters: {},
  mutations: {
    preparePopupEffetsDementiels: function(state, event) {
      // nécessaire ??
    },
    affichePopupEffetsDementiels: function(state) {
      state.hiddenPopupEffetsDementiels = false;
    },
    masquePopupEffetsDementiels: function(state) {
      state.hiddenPopupEffetsDementiels = true;
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
      state.nouvelleCompetence = event;
    },
    masquePopupCompetence: function(state) {
      state.hiddenPopupCompetence = true;
    },
    affichePopupCompetence: function(state) {
      state.hiddenPopupCompetence = false;
    },
    modifieChampsNouvelleCompetence: function(state, {champs, valeur}) {
      state.nouvelleCompetence[champs] = valeur;
    },
  },
  actions: {
    masqueTout: function(context) {
      context.commit('masqueInfos');
      context.commit('masquePopupCompetence');
      context.commit('masquePopupEffetsDementiels');
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
    affichePopupEffetsDementiels: function(context, event) {
      context.commit('preparePopupEffetsDementiels', event);
      context.commit('affichePopupEffetsDementiels');
      context.commit('afficheVoile');
    },
  },
};