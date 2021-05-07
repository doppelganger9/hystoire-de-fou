// @ts-check
import { Douleur } from "../metier/fiche-personnage.mjs";
import { mapState, mapGetters } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

/**
 * TODO:
 * rajouter un bouton et un état indiquant si on a déjà utilisé Antalgie Démentielle sur une Douleur,
 * et si non, un bouton permet de faire le jet (Recommencer et Energie Démentilles pas possibles, 
 * mais Niveau d'Accomplissement en bonus).
 */
export const BlocSanteComponent = {
    data: function() {
        return {
            nouvelleDouleur: new Douleur(),
            afficheLigneAjoutDouleur: false,
        };
    },
    computed: {
        ...mapState(['perso']),
        ...mapGetters(['totalDouleurs']),
    },
    methods: {
        supprimeLigneDouleur: function(indexDouleur) {
            this.$store.commit('supprimeLigneDouleur', indexDouleur);
        },
        ajouteLigneDouleur: function() {
            this.$store.commit('ajouteLigneDouleur', this.nouvelleDouleur);
            this.afficheLigneAjoutDouleur = false;
        },
        afficheNouvelleDouleur: function() {
            this.nouvelleDouleur = new Douleur();
            this.afficheLigneAjoutDouleur = true;
        },
        fermeLigneDouleur() {
            this.afficheLigneAjoutDouleur = false;
        },
    },
    template: `
<hdf-bloc-fiche title="Santé" class="sante">
    <h3 v-if="perso.douleurs.length">Total des malus : {{ totalDouleurs }}</h3>
    <h3>Douleurs :</h3>
    <ul v-if="perso.douleurs.length">
        <li v-for="(douleur, index) of perso.douleurs" class="handwritten">
            {{douleur.valeur}} ({{ douleur.provenance }}) <button @click="supprimeLigneDouleur(index)" class="emoji">🗑</button>
        </li>
    </ul>
    <span v-else>En parfaite santé, tout va bien !</span>
    <br/>
    <br/>
    <button v-if="!afficheLigneAjoutDouleur" @click="afficheNouvelleDouleur">Nouvelle Douleur</button>
    <div v-if="afficheLigneAjoutDouleur" class="ajoutdouleur">
        <label for="nouvelleDouleur.valeur">Valeur :</label>
        <input name="nouvelleDouleur.valeur" v-model="nouvelleDouleur.valeur" type="number" min="1" max="4" class="handwritten">
        <br/>
        <label for="nouvelleDouleur.provenance">Provenance :</label>
        <input name="nouvelleDouleur.provenance" v-model="nouvelleDouleur.provenance" type="text" class="handwritten">
        <br/>
        <button @click="ajouteLigneDouleur">Ajouter Douleur</button><button @click="fermeLigneDouleur">Annuler</button>
    </div>
</hdf-bloc-fiche>
`,
};