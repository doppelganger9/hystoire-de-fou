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
        afficheInfos: function(event) {
            this.$store.dispatch('afficheInfos', event);
        },
        passerEnMode: function (mode) {
            this.$store.commit('passerEnMode', mode);
        },
        onNouvelleCompetence: function(event) {
            this.$store.dispatch('affichePopupCompetence', event);
        },
        affichePopupJet: function(event) {
            this.$store.dispatch('affichePopupJet', event);
        },
        masqueTout: function() {
            this.$store.dispatch('masqueTout');
        },
        sauvegardePerso: function() {
            this.$store.commit('sauvegardePerso');
        },
        chargePerso: function() {
            this.$store.dispatch('chargePersonnage');
        }
    }
};
