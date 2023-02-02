// @ts-check
import { infosCaracteristiques } from "../metier/fiche-personnage.mjs";
import { useStore } from "vuex";
import { computed } from "vue";
import { allStyles } from "../styles/all.mjs";

export const BlocCaracteristiquesComponent = {
    setup() {
        const store = useStore();

        const mode = computed(() => store.state['mode']);
        const perso = computed(() => store.state['perso']);

        const title = computed(() => {
            return `Caractéristiques ${mode.value === 'création' ? 'à répartir': ''}`;
        });

        const volonte = computed({
            get: () => { return store.state.perso.volonte },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'volonte', valeur}) },
        });

        const intellect = computed({
            get: () => { return store.state.perso.intellect },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'intellect', valeur}) },
        });
        
        const sensitif = computed({
            get: () => { return store.state.perso.sensitif },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'sensitif', valeur}) },
        });
        
        const charisme = computed({
            get: () => { return store.state.perso.charisme },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'charisme', valeur}) },
        });

        const constitution = computed({
            get: () => { return store.state.perso.constitution },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'constitution', valeur}) },
        });

        const perception = computed({
            get: () => { return store.state.perso.perception },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'perception', valeur}) },
        });

        const agilite = computed({
            get: () => { return store.state.perso.agilite },
            set: (valeur) => { store.commit('modifieChampsNombrePerso', {champs: 'agilite', valeur}) },
        });
        
        const afficheInfos = (typeInfos) => {
            store.dispatch('afficheInfos', { titre: typeInfos, contenuHtml: infosCaracteristiques[typeInfos] });
        };

        const clickedCaracteristique = (nomCaracteristique) => {
            if (mode.value === 'jeu') {
                store.dispatch('affichePopupJet', { nom:nomCaracteristique, type:'caractéristique'});
            }
        };

        return {
            // computed
            title,
            volonte,
            intellect,
            sensitif,
            charisme,
            constitution,
            perception,
            agilite,
            // computed state
            mode,
            perso,
            // methods
            afficheInfos,
            clickedCaracteristique,
            // data
        };
    },
    template: `
<hdf-bloc-fiche :title="title" class="caracteristiques">
    <p class="tutoriel" v-if="mode === 'création'">Pour créer un personnage, vous démarrez avec un capital de 60 points à répartir.<br/>
    Nous avons déjà mis 11 partout, et il reste donc 3 points à assigner.<br/>
    Libre à vous de baisser certaines caractéristiques pour pouvoir en augmenter une autre.<br/>
    Les caractéristiques vont de 6 à 15 inclus.</p>
    <p class="tutoriel" v-if="mode === 'création'">Points restant à répartir : {{ perso.pointsCaracteristiqueRestant }}</p>

    <div class="">
        <div class="carac">
            <label :class="{jet: mode==='jeu'}" for="perso.volonte" @click="clickedCaracteristique('volonte')">VOLONTE :</label>
            <button class="emoji" @click="afficheInfos('volonté')">ℹ️</button>
            <input class="w50px" name="perso.volonte" v-model="volonte" type="number" v-if="mode==='création'" min="6" max="15">
            <div class="score" v-if="mode==='jeu'">{{ volonte }}</div>
        </div>
        <div class="carac">
            <label :class="{jet: mode==='jeu'}" for="perso.intellect" @click="clickedCaracteristique('intellect')">INTELLECT :</label>
            <button class="emoji" @click="afficheInfos('intellect')">ℹ️</button>
            <input class="w50px" name="perso.intellect" v-model="intellect" type="number" v-if="mode==='création'" min="6" max="15">
            <div class="score" v-if="mode==='jeu'">{{ intellect }}</div>
        </div>
        <div class="carac">
            <label :class="{jet: mode==='jeu'}" for="perso.sensitif" @click="clickedCaracteristique('sensitif')">SENSITIF :</label>
            <button class="emoji" @click="afficheInfos('sensitif')">ℹ️</button>
            <input class="w50px" name="perso.sensitif" v-model="sensitif" type="number" v-if="mode==='création'" min="6" max="15">
            <div class="score" v-if="mode==='jeu'">{{ sensitif }}</div>
        </div>
        <div class="carac">
            <label :class="{jet: mode==='jeu'}" for="perso.entendement" @click="clickedCaracteristique('entendement')">Entendement :</label>
            <button class="emoji" @click="afficheInfos('entendement')">ℹ️</button>
            <div class="score">{{ perso.entendement }}</div>
        </div>
        <div class="carac">
            <label :class="{jet: mode==='jeu'}" for="perso.charisme" @click="clickedCaracteristique('charisme')">CHARISME :</label>
            <button class="emoji" @click="afficheInfos('charisme')">ℹ️</button>
            <input class="w50px" name="perso.charisme" v-model="charisme" type="number" v-if="mode==='création'" min="6" max="15">
            <div class="score" v-if="mode==='jeu'">{{ charisme }}</div>
        </div>
        <div class="carac">
            <label :class="{jet: mode==='jeu'}" for="perso.constitution" @click="clickedCaracteristique('constitution')">CONSTITUTION :</label>
            <button class="emoji" @click="afficheInfos('constitution')">ℹ️</button>
            <input class="w50px" name="perso.constitution" v-model="constitution" type="number" v-if="mode==='création'" min="6" max="15">
            <div class="score" v-if="mode==='jeu'">{{ constitution }}</div>
        </div>
        <div class="carac">
            <label :class="{jet: mode==='jeu'}" for="perso.perception" @click="clickedCaracteristique('perception')">PERCEPTION :</label>
            <button class="emoji" @click="afficheInfos('perception')">ℹ️</button>
            <input class="w50px" name="perso.perception" v-model="perception" type="number" v-if="mode==='création'" min="6" max="15">
            <div class="score" v-if="mode==='jeu'">{{ perception }}</div>
        </div>
        <div class="carac">
            <label :class="{jet: mode==='jeu'}" for="perso.agilite" @click="clickedCaracteristique('agilite')">AGILITE :</label>
            <button class="emoji" @click="afficheInfos('agilité')">ℹ️</button>
            <input class="w50px" name="perso.agilite" v-model="agilite" type="number" v-if="mode==='création'" min="6" max="15">
            <div class="score" v-if="mode==='jeu'">{{ agilite }}</div>
        </div>
    </div>
</hdf-bloc-fiche>
    `,
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],
};