// @ts-check
import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js";

import { BlocFicheComponent } from "./hdf-bloc-fiche.mjs";
import { BlocSanteComponent } from "./hdf-bloc-sante.mjs";
import { BlocCaracteristiquesComponent } from "./hdf-bloc-caracteristiques.mjs";
import { BlocCompetencesComponent } from "./hdf-bloc-competences.mjs";
import { BlocCompetencesDementiellesComponent } from "./hdf-bloc-competences-dementielles.mjs";
import { BlocEquipementComponent } from "./hdf-bloc-equipement.mjs";
import { BlocSanteMentaleComponent } from "./hdf-bloc-sante-mentale.mjs";
import { BlocEtatCivilComponent } from "./hdf-bloc-etat-civil.mjs";
import { PopupCreationCompetenceComponent } from "./hdf-popup-creation-competence.mjs";
import { PopupInfosComponent } from "./hdf-popup-infos.mjs";
import { PopupJetComponent } from "./hdf-popup-jet.mjs";
import { PopupEffetsDementielsComponent } from "./hdf-popup-effets-dementiels.mjs";
import { VoileComponent } from "./hdf-voile.mjs";
import { FicheAppComponent } from "./hdf-fiche-app.mjs";
import { BlocJournalComponent } from "./hdf-bloc-journal.mjs";

// découpage en sous composants
Vue.component('hdf-voile', VoileComponent);
Vue.component('hdf-popup-jet', PopupJetComponent);
Vue.component('hdf-popup-infos', PopupInfosComponent);
Vue.component('hdf-popup-creation-competence', PopupCreationCompetenceComponent);
Vue.component('hdf-bloc-etat-civil', BlocEtatCivilComponent);
Vue.component('hdf-bloc-fiche', BlocFicheComponent);
Vue.component('hdf-bloc-caracteristiques', BlocCaracteristiquesComponent);
Vue.component('hdf-bloc-sante', BlocSanteComponent);
Vue.component('hdf-bloc-sante-mentale', BlocSanteMentaleComponent);
Vue.component('hdf-bloc-competences', BlocCompetencesComponent);
Vue.component('hdf-bloc-competences-dementielles', BlocCompetencesDementiellesComponent);
Vue.component('hdf-bloc-equipement', BlocEquipementComponent);
Vue.component('hdf-bloc-journal', BlocJournalComponent);
Vue.component('hdf-popup-effets-dementiels', PopupEffetsDementielsComponent);

// Application Vue
export const app = new Vue(FicheAppComponent);
