//@ts-check
import "../utils/object-append-chain.mjs";

import { modulePersonnage } from "./perso.mjs";
import { moduleJournal } from "./journal.mjs";
import { moduleView } from "./view.mjs";

export const HdfStore = {
  // décommenter en DEV, pour détecter les mutations sauvages
  // strict: true,

  state: {
    ...moduleJournal.state,
    ...moduleView.state,
    ...modulePersonnage.state,
  },
  getters: {
    ...moduleJournal.getters,
    ...moduleView.getters,
    ...modulePersonnage.getters,
  },
  mutations: {
    ...moduleJournal.mutations,
    ...moduleView.mutations,
    ...modulePersonnage.mutations,
  },
  actions: {
    ...moduleJournal.actions,
    ...moduleView.actions,
    ...modulePersonnage.actions,
  },
};
