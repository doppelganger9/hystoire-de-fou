//@ts-check
import { HdfStore } from "../store/root.mjs";
import Vue from "vue";
import Vuex from "vuex";
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
    }
};
