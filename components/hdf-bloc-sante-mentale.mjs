//@ts-check
import { useStore } from "vuex";
import { computed } from "vue";
import { infosMotDeDemence } from "../metier/fiche-personnage.mjs";
import { allStyles } from "../styles/all.mjs";

/**
 * TODO:
 * BOUTON pour pouvoir décrémenter le nb de tours/minutes de l'état de choc
 * ACTION : Quand le minuteur tombe à 0, déclencher l'"Hallucination" ou se mettre "en Alerte contre un(plusieurs = X) Futur Piège".
 */

export const BlocSanteMentaleComponent = {
    setup() {
        const store = useStore();

        const mode = computed(() => store.state['mode']);
        const perso = computed(() => store.state['perso']);

        const motDeDemence = computed({
            get: () => { return store.state.perso.motDeDemence },
            set: (valeur) => { store.commit('modifieChampsTextePerso', {champs: 'motDeDemence', valeur}) },
        });
        const pointsDeCrise = computed({
            get: () => { return store.state.perso.pointsDeCrise },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'pointsDeCrise', valeur}) },
        });
        const chocsParano = computed({
            get: () => { return store.state.perso.chocsParano },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'chocsParano', valeur}) },
        });
        const chocsSchizo = computed({
            get: () => { return store.state.perso.chocsSchizo },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'chocsSchizo', valeur}) },
        });
        const chocsProfonds = computed({
            get: () => { return store.state.perso.chocsProfonds },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'chocsProfonds', valeur}) },
        });
        const totalAccomplissement = computed({
            get: () => { return store.state.perso.totalAccomplissement },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'totalAccomplissement', valeur}) },
        });

        const afficheInfos = () => {
            store.dispatch('afficheInfos', { titre: 'Mot de Démence', contenuHtml: infosMotDeDemence() });
        };
        const clickedMotDeDemence = () => {
            if (mode.value === 'jeu') {
                store.dispatch('affichePopupEffetsDementiels');
            }
        };

        return {
            // computed
            motDeDemence,
            pointsDeCrise,
            chocsParano,
            chocsSchizo,
            chocsProfonds,
            totalAccomplissement,
            // computed state
            mode,
            perso,
            // methods
            afficheInfos,
            clickedMotDeDemence,
            // date
        };
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
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],

};