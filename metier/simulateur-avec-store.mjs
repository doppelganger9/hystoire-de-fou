import { Competence } from "./competences.mjs";
import { HdfStore } from "../store/root.mjs";

// ---------------------------------------------------------
// Simulation avec les actions et mutations et une implém
// simple du Store. 100 à 1000 fois plus lent que le 
// simulateur (sans doute à cause des multiples await ! ou
// bien de la détection de changement dans Vue ?)
// ---------------------------------------------------------

class SimpleStore {    
    constructor(storeDefinition) {
        this.actions = { ...storeDefinition.actions };
        this.getters = { ...storeDefinition.getters };
        this.mutations = { ...storeDefinition.mutations };
        this.state = { ...storeDefinition.state() };
    }

    async dispatch(actionName, eventData) {
        // créer un contexte, OK, ici on ne protège pas contre les mutations.
        // appeler l'action
        if (actionName in this.actions) {
            return await this.actions[actionName](this, eventData);
        } else {
            throw new Error(`Pas d'action nommée '${actionName}' dans le Store`);
        }
    }
    commit(mutationName, ...eventData) {
        if (mutationName in this.mutations) {
            this.mutations[mutationName](this.state, eventData);
        } else {
            throw new Error(`Pas de mutation nommée '${mutationName}' dans le Store`);
        }
    }
}

export async function simuler() {
    let resultatsPointsChocs = [];
    let resultatsPointsChocsProfonds = [];
    let resultatsEtatChoc = [];

    const VOLONTE = 8;
    const INTELLECT = 10;
    const SENSITIF = 10;

    const iterations = 10000;
    let ptCrise = 0;
    for (let i=0; i<iterations; i++) {
        const store = new SimpleStore(HdfStore);
        store.commit('modifieChampsNombrePerso', 'volonte', VOLONTE);
        store.commit('modifieChampsNombrePerso', 'sensitif', SENSITIF);
        store.commit('modifieChampsNombrePerso', 'intellect', INTELLECT);

        await store.dispatch('appelDementiel'); // 1pc = 5% d'avoir 1 choc
        await store.dispatch('appelDementiel'); // 2pc = 15% d'avoir 1 choc (5 + 10)
        await store.dispatch('appelDementiel'); // 3pc = 30% d'avoir 1 choc (5 + 10 + 15)
        await store.dispatch('appelDementiel'); // 4pc = 50% d'avoir 1 choc (5 + 10 + 15 + 20)
        await store.dispatch('appelDementiel'); // 5pc = 75% d'avoir 1 choc (5 + 10 + 15 + 20 + 25)
        await store.dispatch('appelDementiel'); // 6pc = en moyenne 1.05 choc (5 + 10 + 15 + 20 + 25 + 30)
        //store.dispatch('faireUnJetDeCrise'); // 1.35
        //store.dispatch('faireUnJetDeCrise'); // 1.65
        //store.dispatch('faireUnJetDeCrise'); // 1.95 = meme proba que 6pc (30%)
        await store.dispatch('appelDementiel'); // 7pc = en moyenne 1.4 choc
        await store.dispatch('appelDementiel'); // 8pc = en moyenne 1.8 choc //-3:.53 /-2:.47/-1:.41 => premier état de choc VOL 8
        //store.dispatch('faireUnJetDeCrise');
        //store.dispatch('faireUnJetDeCrise');
        //store.dispatch('faireUnJetDeCrise');
        //store.dispatch('faireUnJetDeCrise');
        //store.dispatch('faireUnJetDeCrise');
        //store.dispatch('faireUnJetDeCrise');
        await store.dispatch('appelDementiel'); // 9pc = en moyenne 2.25 choc  //-2:.71/-1:.62/+0:.55 choc profond (donc 1 état de choc) /+1:.46/+2:.389/+3:.32 => premier état choc VOL 9-11
        await store.dispatch('appelDementiel'); // 10pc = en moyenne 2.75 choc //+0:.77/+1:.66/+2:.56/+3:.46 => premier état choc VOL 12
        //store.dispatch('appelDementiel'); // 11pc = en moyenne 3.30 choc // 1 choc profond (donc 2 états de choc)/+3:.65/+4:.53/+5:.43 => premier état choc VOL 13-14
        //store.dispatch('appelDementiel'); // 12pc = en moyenne 3.90 choc // 1.39 /+4:.73/+5:.58/+6:.45 => premier état choc VOL 15
        //store.dispatch('appelDementiel'); // 13pc = en moyenne 4.55 choc // 1.78 / +5:.78 / +6:.61 / +7:.45
        //store.dispatch('appelDementiel'); // 14pc = en moyenne 5.25 choc // 2.22 / +7:.61
        //store.dispatch('appelDementiel'); // 15pc = en moyenne 6 choc // 2.725
        //store.dispatch('appelDementiel'); // 16pc = en moyenne 6.80 choc // 3.28
        //store.dispatch('appelDementiel'); // 17pc = en moyenne 7.65 choc // 3.88
        //store.dispatch('appelDementiel'); // 18pc = en moyenne 8.55 choc
        //store.dispatch('appelDementiel'); // 19pc = en moyenne 9.5 choc
        //store.dispatch('appelDementiel'); // 20pc = en moyenne 10.5 choc

        resultatsPointsChocs.push(+store.state.perso.chocsParano + (+store.state.perso.chocsSchizo));
        resultatsPointsChocsProfonds.push(+store.state.perso.chocsProfonds);
        resultatsEtatChoc.push(store.state.perso.etatDeChoc ? 1:0);
        ptCrise = +store.state.perso.pointsDeCrise;
    }
    const moyennePointsChocs = resultatsPointsChocs.reduce((prev, curr, idx, arr) => prev + (curr/arr.length), 0);
    const moyennePointsChocsProfonds = resultatsPointsChocsProfonds.reduce((prev, curr, idx, arr) => prev + (curr/arr.length), 0);
    const moyenneEtatDeChocs = resultatsEtatChoc.reduce((prev, curr, idx, arr) => prev + (curr/arr.length), 0);

    return {
        iterations,
        VOLONTE,
        INTELLECT,
        SENSITIF,
        ptCrise,
        moyennePointsChocs,
        moyennePointsChocsProfonds,
        moyenneEtatDeChocs,
    };
    // let comp = new Competence(); comp.intitule = "Combat Hallebarde"; comp.nomCaracteristiqueDirectrice = "agilite";
    // store.commit('ajouteCompetenceDementielle', comp);
    // store.dispatch('apresAjoutCompetenceDementielle')
    // store.dispatch('incredire', {"sensitif", -1, 1});
    // store.dispatch('incredire', {"sensitif", -2, 1});
    // store.dispatch('incredire', {"intellect", -2, 2});
    // store.dispatch('incredire', {"intellect", -1, 2});

    // TODO : jet de compétence, avec en option : energie démentielle avant de tenter l'action et recommencer action en cas d'échec.
    // TODO : duel avec perso actif; energie démentielle avant de tenter l'action et recommencer action en cas d'échec ?
    // TODO : énergie démentielle 
    // TODO : recommencer action
    // TODO : énergie démentielle + recommencer action
    // TODO : antalgie démentielle = jet de constitution pour atténuer une douleur (nécessite d'avoir implémenté les Douleurs)
    // TODO : empathie démentielle = jet de charisme pour atténuer un état de choc sur un autre personnage (nécessite d'avoir implémenté les effets de l'état de choc)
    // TODO : prendre les vapes = automatique. remet à zero douleurs, chocs (sauf si chocs profonds), expérience, équipement, points de crise
    // TODO : mourir = point de choc profond et sortie de crise/RAZ (comme Vapes)
    // TODO : se réveiller en s'étant couché pendant une Crise = jet de crise
    // TODO : accomplir = points de crise deviennent points d'accomplissement, passer un niveau d'accomplissement?, croix d'expérience sur compétences non démentielles utilisées, et RAZ Douleurs, Equipement, Compétences Démentielles, points de Crises, Chocs (sauf ancré par Choc Profond)
    // TODO : saint-frusquin : tirage d'équipement aléatoire

    //console.log(perso);
}
