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
    <div>
        <label for="perso.nom">Nom :</label>
        <input name="perso.nom" v-model="nom" type="text" placeholder="Nom du personnage" :readonly="mode==='jeu'" class="handwritten">
        <br/>
    </div>
    <div>
        <label for="perso.profession">Profession :</label>
        <input name="perso.profession" v-model="profession" type="text" placeholder="Profession du personnage" :readonly="mode==='jeu'" class="handwritten">
        <br/>
    </div>
    <div>
        <label for="perso.age">Âge :</label>
        <input name="perso.age" v-model="age" type="number" min="8" max="100" placeholder="Âge du personnage" :readonly="mode==='jeu'" class="handwritten">ans
        <br/>
    </div>
    <div>
        <label for="perso.poids">Poids (kg) :</label>
        <input name="perso.poids" v-model="poids" type="number" min="40" max="150" placeholder="Poids du personnage" :readonly="mode==='jeu'" class="handwritten">kg
        <br/>
    </div>
    <div>
        <label for="perso.tailleCm">Taille (cm) :</label>
        <input name="perso.tailleCm" v-model="tailleCm" type="number" min="120" max="210" placeholder="Taille du personnage" :readonly="mode==='jeu'" class="handwritten">cm ({{ perso.tailleScore }})
        <br/>
    </div>
    <div>
        <label for="perso.bonusAuxDommages">+dom :</label>
        <input name="perso.bonusAuxDommages" readonly="readonly" :value="perso.bonusAuxDommages">
        <br/>
    </div>
    <div>
        <label for="perso.description">Description :</label>
        <textarea name="perso.description" v-model="description" placeholder="Description du personnage" :readonly="mode==='jeu'" class="handwritten"></textarea>
        <br/>
    </div>
</hdf-bloc-fiche>
`,
};