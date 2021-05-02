//@ts-check
import { HdfStore } from "./hdf-store.mjs";
import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js";
import Vuex from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";
const { Store, mapState, mapGetters } = Vuex;

// utilisation d'un store
Vue.use(Vuex);

const store = new Store(HdfStore);

export const FicheAppComponent = {
    el: '#app',
    store,
    computed: {
        ...mapState([
            'perso',
            'infos',
            'hiddenInfos',
            'mode',
            'hiddenVoile',
            'hiddenPopupCompetence',
            'nouvelleCompetence',
            'hiddenPopupJet',
            'etatJet',
        ]),
        ...mapGetters([
            'creationFinie',
        ]),
    },
    methods: {
        passerEnMode: function (mode) {
            this.$store.commit('passerEnMode', mode);
        },
        sauvegardePerso: function() {
            this.$store.commit('sauvegardePerso');
        },
        chargePerso: function() {
            this.$store.dispatch('chargePersonnage');
        }
    }
};
