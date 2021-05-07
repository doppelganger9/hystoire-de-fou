//@ts-check
/**
 * Si je met en module tel que prévu, mapState(['journal']) ne renvoie plus directement journal, 
 * mais un Observer contenant journal... donc je n'utilise pas les modules mais j'injecte en destructurant 
 * via ...moduleJournal.actions, ...moduleJournal.state
 */
export const moduleJournal = {
  state: function() { 
    return {
      journal: [],
    };
  },
  getters: {
  },
  mutations: {
    ajouteLigneJournal: function(state, ligne) {
      state.journal.push(ligne);
    },
  },
  actions: {
  },
};