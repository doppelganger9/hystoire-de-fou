// @ts-check
import { Douleur } from "./fiche-personnage.mjs";
import { mapState, mapGetters } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const BlocSanteComponent = {
    data: function() {
        return {
            nouvelleDouleur: new Douleur(),
        };
    },
    computed: {
        ...mapState(['mode', 'perso']),
        ...mapGetters(['totalDouleurs']),
    },
    methods: {
        supprimeLigneDouleur: function(indexDouleur) {
            this.$store.commit('supprimeLigneDouleur', indexDouleur);
        },
        ajouteLigneDouleur: function() {
            this.$store.commit('ajouteLigneDouleur', this.nouvelleDouleur);
            this.nouvelleDouleur = new Douleur();
        },
    },
    template: `
<hdf-bloc-fiche title="Santé" v-if="mode==='jeu'">
<h3 v-if="perso.douleurs.length">Total des malus : {{ totalDouleurs }}</h3>
<h3>Douleurs :</h3>
<ul v-if="perso.douleurs.length">
    <li v-for="(douleur, index) of perso.douleurs" class="handwritten">
        {{douleur.valeur}} ({{ douleur.provenance }}) <button @click="supprimeLigneDouleur(index)">Supprimer</button>
    </li>    
</ul>
<span v-else>Aucune</span><br/>

<label for="nouvelleDouleur.valeur">Valeur :</label>
<input name="nouvelleDouleur.valeur" v-model="nouvelleDouleur.valeur" type="number" min="1" max="4" class="handwritten">

<label for="nouvelleDouleur.provenance">Provenance :</label>
<input name="nouvelleDouleur.provenance" v-model="nouvelleDouleur.provenance" type="text" class="handwritten">

<button @click="ajouteLigneDouleur">Ajouter Douleur</button>
</hdf-bloc-fiche>
`,
};