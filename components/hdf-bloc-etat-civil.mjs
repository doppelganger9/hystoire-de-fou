//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const BlocEtatCivilComponent = {
    computed: {
        ...mapState([
            'mode',
            'perso',
        ]),
        nom: {
            get () { return this.$store.state.perso.nom },
            set (valeur) { this.$store.commit('modifieChampsTextePerso', {champs: 'nom', valeur}) },
        },
        profession: {
            get () { return this.$store.state.perso.profession },
            set (valeur) { this.$store.commit('modifieChampsTextePerso', {champs: 'profession', valeur}) },
        },
        age: {
            get () { return this.$store.state.perso.age },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'age', valeur}) },
        },
        poids: {
            get () { return this.$store.state.perso.poids },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'poids', valeur}) },
        },
        tailleCm: {
            get () { return this.$store.state.perso.tailleCm },
            set (valeur) { this.$store.commit('modifieChampsNombrePerso', {champs: 'tailleCm', valeur}) },
        },
        description: {
            get () { return this.$store.state.perso.description },
            set (valeur) { this.$store.commit('modifieChampsTextePerso', {champs: 'description', valeur}) },
        },
    },
    template: `
<hdf-bloc-fiche title="Etat Civil">
    <p class="tutoriel" v-if="mode === 'création'">Pour créer un personnage, remplissez son état civil.</p>

    <div>
        <div>
            <label for="perso.nom">Nom :</label>
            <input class="w150px handwritten" name="perso.nom" v-model="nom" type="text" placeholder="Nom du personnage" :readonly="mode==='jeu'">
            <br/>
        </div>
        <p class="tutoriel" v-if="mode === 'création'">
            La profession de votre personnage devra être cohérente avec sa compétence professionelle (plus bas).
        </p>
        <div>
            <label for="perso.profession">Profession :</label>
            <input class="w150px handwritten" name="perso.profession" v-model="profession" type="text" placeholder="Profession du personnage" :readonly="mode==='jeu'">
            <br/>
        </div>
        <div>
            <label for="perso.age">Âge :</label>
            <input class="w50px handwritten" name="perso.age" v-model="age" type="number" min="8" max="100" placeholder="Âge du personnage" :readonly="mode==='jeu'">ans
            <br/>
        </div>
        <div>
            <label for="perso.poids">Poids :</label>
            <input class="w50px handwritten" name="perso.poids" v-model="poids" type="number" min="40" max="150" placeholder="Poids du personnage" :readonly="mode==='jeu'">kg
            <br/>
        </div>
        <div>
            <label for="perso.tailleCm">Taille :</label>
            <input class="w50px handwritten" name="perso.tailleCm" v-model="tailleCm" type="number" min="120" max="210" placeholder="Taille du personnage" :readonly="mode==='jeu'">cm (score: {{ perso.tailleScore }})
            <br/>
        </div>
        <p class="tutoriel" v-if="mode === 'création'">
            Comme vous le voyez, La taille est transformée en score de caractéristique. <br/>
            En effet, en combinant TAILLE et CONSTITUTION (voir plus bas), on détermine le bonus aux domages utilisé lors des combats avec des armes de mêlée ou au corps à corps "+dom".<br/>
            Celui-ci va de -2 à +2 et affectera un jet de D6 lors de la détermination des dommages/douleurs.
        </p>
        <div>
            <label for="perso.bonusAuxDommages">+dom :</label>
            <input class="w50px" name="perso.bonusAuxDommages" readonly="readonly" :value="perso.bonusAuxDommages">
            <br/>
        </div>
        <p class="tutoriel" v-if="mode === 'création'">
            décrivez succintement votre personnage: allure, regard, chevelure, peau, style vestimentaire, etc. Assez pour qu'on se fasse une idée de son apparence générale.
        </p>
        <div>
            <label for="perso.description">Description :</label>
            <textarea class="handwritten" name="perso.description" v-model="description" placeholder="Description du personnage" :readonly="mode==='jeu'"></textarea>
            <br/>
        </div>
    </div>
</hdf-bloc-fiche>
`,
};