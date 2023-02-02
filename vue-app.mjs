// @ts-check
import { defineCustomElement } from "vue";
import { defineCustomElementWrapper } from "./define-custom-elements.mjs";

import { store } from "./store/store.mjs";

import { BlocFicheComponent } from "./components/hdf-bloc-fiche.mjs";
import { BlocSanteComponent } from "./components/hdf-bloc-sante.mjs";
import { BlocCaracteristiquesComponent } from "./components/hdf-bloc-caracteristiques.mjs";
import { BlocCompetencesComponent } from "./components/hdf-bloc-competences.mjs";
import { BlocCompetencesDementiellesComponent } from "./components/hdf-bloc-competences-dementielles.mjs";
import { BlocEquipementComponent } from "./components/hdf-bloc-equipement.mjs";
import { BlocSanteMentaleComponent } from "./components/hdf-bloc-sante-mentale.mjs";
import { BlocEtatCivilComponent } from "./components/hdf-bloc-etat-civil.mjs";
import { PopupCreationCompetenceComponent } from "./components/hdf-popup-creation-competence.mjs";
import { PopupInfosComponent } from "./components/hdf-popup-infos.mjs";
import { PopupJetComponent } from "./components/hdf-popup-jet.mjs";
import { PopupEffetsDementielsComponent } from "./components/hdf-popup-effets-dementiels.mjs";
import { VoileComponent } from "./components/hdf-voile.mjs";
import { FicheAppComponent } from "./components/hdf-fiche-app.mjs";
import { BlocJournalComponent } from "./components/hdf-bloc-journal.mjs";
import { MenuLancementComponent } from "./components/hdf-menu-lancement.mjs";

// découpage en sous composants web (custom elements)
customElements.define('hdf-menu-lancement', defineCustomElement(MenuLancementComponent));
customElements.define('hdf-voile', defineCustomElement(VoileComponent));
customElements.define('hdf-popup-jet', defineCustomElement(PopupJetComponent));
customElements.define('hdf-popup-infos', defineCustomElement(PopupInfosComponent));
customElements.define('hdf-popup-creation-competence', defineCustomElement(PopupCreationCompetenceComponent));
customElements.define('hdf-bloc-etat-civil', defineCustomElement(BlocEtatCivilComponent));
customElements.define('hdf-bloc-fiche', defineCustomElement(BlocFicheComponent));
customElements.define('hdf-bloc-caracteristiques', defineCustomElement(BlocCaracteristiquesComponent));
customElements.define('hdf-bloc-sante', defineCustomElement(BlocSanteComponent));
customElements.define('hdf-bloc-sante-mentale', defineCustomElement(BlocSanteMentaleComponent));
customElements.define('hdf-bloc-competences', defineCustomElement(BlocCompetencesComponent));
customElements.define('hdf-bloc-competences-dementielles', defineCustomElement(BlocCompetencesDementiellesComponent));
customElements.define('hdf-bloc-equipement', defineCustomElement(BlocEquipementComponent));
customElements.define('hdf-bloc-journal', defineCustomElement(BlocJournalComponent));
customElements.define('hdf-popup-effets-dementiels', defineCustomElement(PopupEffetsDementielsComponent));
customElements.define('hdf-app-root', defineCustomElementWrapper(FicheAppComponent, { plugins: [store] }));

console.log('all custom elements created');
