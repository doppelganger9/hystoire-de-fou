// @ts-check
import { infosCaracteristiques } from "../metier/fiche-personnage.mjs";
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const BlocCaracteristiquesComponent = {
    computed: {
        ...mapState([ 'mode', 'perso' ]),
        title() {
            return `Caractéristiques ${this.mode === 'création' ? 'à répartir': ''}`;
        },
        volonte: {
            get () { return this.$store.state.perso.volonte },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'volonte', valeur}) },
        },
        intellect: {
            get () { return this.$store.state.perso.intellect },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'intellect', valeur}) },
        },
        sensitif: {
            get () { return this.$store.state.perso.sensitif },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'sensitif', valeur}) },
        },
        charisme: {
            get () { return this.$store.state.perso.charisme },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'charisme', valeur}) },
        },
        constitution: {
            get () { return this.$store.state.perso.constitution },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'constitution', valeur}) },
        },
        perception: {
            get () { return this.$store.state.perso.perception },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'perception', valeur}) },
        },
        agilite: {
            get () { return this.$store.state.perso.agilite },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'agilite', valeur}) },
        },
    },
    methods: {
        afficheInfos: function(typeInfos) {
            this.$store.dispatch('afficheInfos', infosCaracteristiques[typeInfos]);
        },
        clickedCaracteristique: function(nomCaracteristique) {
            if (this.mode === 'jeu') {
                this.$store.dispatch('affichePopupJet', { nom:nomCaracteristique, type:'caractéristique'});
            }
        },
    },
    template: `
<hdf-bloc-fiche :title="title">
    <p class="tutoriel" v-if="mode === 'création'">Pour créer un personnage, vous démarrez avec un capital de 60 points à répartir.<br/>
    Nous avons déjà mis 11 partout, et il reste donc 3 points à assigner.<br/>
    Libre à vous de baisser certaines caractéristiques pour pouvoir en augmenter une autre.<br/>
    Les caractéristiques vont de 6 à 15 inclus.</p>
    <p class="tutoriel" v-if="mode === 'création'">Points restant à répartir : {{ perso.pointsCaracteristiqueRestant }}</p>

    <div class="w200px">
        <div class="w200px carac">
            <label :class="{jet: mode==='jeu'}" for="perso.volonte" @click="clickedCaracteristique('volonte')">VOLONTE :</label>
            <button class="infos" @click="afficheInfos('volonté')">ℹ️</button>
            <input class="w50px" name="perso.volonte" v-model="volonte" type="number" :readonly="mode==='jeu'" min="6" max="15">
            <br/>
        </div>
        <div class="w200px carac">
            <label :class="{jet: mode==='jeu'}" for="perso.intellect" @click="clickedCaracteristique('intellect')">INTELLECT :</label>
            <button class="infos" @click="afficheInfos('intellect')">ℹ️</button>
            <input class="w50px" name="perso.intellect" v-model="intellect" type="number" :readonly="mode==='jeu'" min="6" max="15">
            <br/>
        </div>
        <div class="w200px carac">
            <label :class="{jet: mode==='jeu'}" for="perso.sensitif" @click="clickedCaracteristique('sensitif')">SENSITIF :</label>
            <button class="infos" @click="afficheInfos('sensitif')">ℹ️</button>
            <input class="w50px" name="perso.sensitif" v-model="sensitif" type="number" :readonly="mode==='jeu'" min="6" max="15">
            <br/>
        </div>
        <div class="w200px carac">
            <label :class="{jet: mode==='jeu'}" for="perso.entendement" @click="clickedCaracteristique('entendement')">Entendement :</label>
            <button class="infos" @click="afficheInfos('entendement')">ℹ️</button>
            <input class="w50px" name="perso.entendement" readonly="readonly" :value="perso.entendement">
            <br/>
        </div>
        <div class="w200px carac">
            <label :class="{jet: mode==='jeu'}" for="perso.charisme" @click="clickedCaracteristique('charisme')">CHARISME :</label>
            <button class="infos" @click="afficheInfos('charisme')">ℹ️</button>
            <input class="w50px" name="perso.charisme" v-model="charisme" type="number" :readonly="mode==='jeu'" min="6" max="15">
            <br/>
        </div>
        <div class="w200px carac">
            <label :class="{jet: mode==='jeu'}" for="perso.constitution" @click="clickedCaracteristique('constitution')">CONSTITUTION :</label>
            <button class="infos" @click="afficheInfos('constitution')">ℹ️</button>
            <input class="w50px" name="perso.constitution" v-model="constitution" type="number" :readonly="mode==='jeu'" min="6" max="15">
            <br/>
        </div>
        <div class="w200px carac">
            <label :class="{jet: mode==='jeu'}" for="perso.perception" @click="clickedCaracteristique('perception')">PERCEPTION :</label>
            <button class="infos" @click="afficheInfos('perception')">ℹ️</button>
            <input class="w50px" name="perso.perception" v-model="perception" type="number" :readonly="mode==='jeu'" min="6" max="15">
            <br/>
        </div>
        <div class="w200px carac">
            <label :class="{jet: mode==='jeu'}" for="perso.agilite" @click="clickedCaracteristique('agilite')">AGILITE :</label>
            <button class="infos" @click="afficheInfos('agilité')">ℹ️</button>
            <input class="w50px" name="perso.agilite" v-model="agilite" type="number" :readonly="mode==='jeu'" min="6" max="15">
            <br/>
        </div>
    </div>
</hdf-bloc-fiche>
    `,
};