//@ts-check
import "./object-append-chain.mjs";

import { modulePersonnage } from "./hdf-store-module-perso.mjs";
import { moduleJournal } from "./hdf-store-module-journal.mjs";
import { moduleView } from "./hdf-store-module-view.mjs";

export const HdfStore = {
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
