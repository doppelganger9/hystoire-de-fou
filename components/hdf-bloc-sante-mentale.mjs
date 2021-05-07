//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";
import { infosMotDeDemence } from "../metier/fiche-personnage.mjs";

/**
 * TODO:
 * BOUTON pour pouvoir décrémenter le nb de tours/minutes de l'état de choc
 * ACTION : Quand le minuteur tombe à 0, déclencher l'"Hallucination" ou se mettre "en Alerte contre un(plusieurs = X) Futur Piège".
 */

export const BlocSanteMentaleComponent = {
    computed: {
        ...mapState(['mode', 'perso']),
        motDeDemence: {
            get () { return this.$store.state.perso.motDeDemence },
            set (valeur) { this.$store.commit('modifieChampsTextePerso', {champs: 'motDeDemence', valeur}) },
        },
        pointsDeCrise: {
            get () { return this.$store.state.perso.pointsDeCrise },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'pointsDeCrise', valeur}) },
        },
        chocsParano: {
            get () { return this.$store.state.perso.chocsParano },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'chocsParano', valeur}) },
        },
        chocsSchizo: {
            get () { return this.$store.state.perso.chocsSchizo },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'chocsSchizo', valeur}) },
        },
        chocsProfonds: {
            get () { return this.$store.state.perso.chocsProfonds },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'chocsProfonds', valeur}) },
        },
        totalAccomplissement: {
            get () { return this.$store.state.perso.totalAccomplissement },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'totalAccomplissement', valeur}) },
        },
    },
    methods: {
        afficheInfos: function() {
            this.$store.dispatch('afficheInfos', { titre: 'Mot de Démence', contenuHtml: infosMotDeDemence() });
        },
        clickedMotDeDemence: function() {
            if (this.mode === 'jeu') {
                this.$store.dispatch('affichePopupEffetsDementiels');
            }
        },
    },
    template: `
<hdf-bloc-fiche title="Santé Mentale" class="santementale">
    <div>
        <label for="perso.motDeDemence">Mot de Démence :</label>
        <button class="emoji" v-if="mode=='création'" @click="afficheInfos">ℹ️</button>
        <input name="perso.motDeDemence"
            class="w150px handwritten"
            :class="{jet: mode==='jeu'}"
            v-model="motDeDemence" 
            type="text" 
            placeholder="Mot de démence du personnage" 
            :readonly="mode==='jeu'" 
            @click="clickedMotDeDemence">
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.tendance">Tendance :</label>
        <div class="texte">{{ perso.tendance }}</div>
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.totalAccomplissement">Total Accomplissement :</label>
        <input name="perso.totalAccomplissement" v-model="totalAccomplissement" type="number" min="0" class="handwritten">
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.niveauAccomplissement">Niveau Accomplissement :</label>
        <div class="score">{{ perso.niveauAccomplissement }}</div>
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.pointsDeCrise">Points de Crise :</label>
        <input name="perso.pointsDeCrise" v-model="pointsDeCrise" type="number" min="0">
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.chocsParano">Chocs Parano :</label>
        <input name="perso.chocsParano" v-model="chocsParano" type="number" min="0">
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.chocsSchizo">Chocs Schizo :</label>
        <input name="perso.chocsSchizo" v-model="chocsSchizo" type="number" min="0">
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.chocsProfonds">Chocs Profonds :</label>
        <input name="perso.chocsProfonds" v-model="chocsProfonds" type="number" min="0">
    </div>
    <div v-if="mode==='jeu' && perso.etatDeChoc">
        <p>En Etat de Choc! pendant : {{ perso.dureeEtatDeChoc }} minute{{ perso.dureeEtatDeChoc > 1 ? 's' : '' }}</p>
    </div>
</hdf-bloc-fiche>
`,
};