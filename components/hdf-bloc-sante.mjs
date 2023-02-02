// @ts-check
import { Douleur } from "../metier/douleurs.mjs";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { allStyles } from "../styles/all.mjs";

/**
 * TODO Antalgie Démentielle:
 * rajouter un bouton et un état indiquant si on a déjà utilisé Antalgie Démentielle sur une Douleur,
 * et si non, un bouton permet de faire le jet (Recommencer et Energie Démentilles pas possibles, 
 * mais Niveau d'Accomplissement en bonus).
 */
export const BlocSanteComponent = {
    setup() {
        const store = useStore();

        const totalDouleurs = computed(() => store.getters['totalDouleurs']);
        const perso = computed(() => store.state['perso']);

        const nouvelleDouleur = ref(new Douleur());
        const afficheLigneAjoutDouleur = ref(false);

        const supprimeLigneDouleur = (indexDouleur) => {
            store.commit('supprimeLigneDouleur', indexDouleur);
        };
        const ajouteLigneDouleur = () => {
            store.commit('ajouteLigneDouleur', nouvelleDouleur.value);
            afficheLigneAjoutDouleur.value = false;
        };
        const afficheNouvelleDouleur = () => {
            nouvelleDouleur.value = new Douleur();
            afficheLigneAjoutDouleur.value = true;
        };
        const fermeLigneDouleur = () => {
            afficheLigneAjoutDouleur.value = false;
        };

        return {
            // computed
            // computed state
            totalDouleurs,
            perso,
            // methods
            supprimeLigneDouleur,
            ajouteLigneDouleur,
            afficheNouvelleDouleur,
            fermeLigneDouleur,
            // data
            nouvelleDouleur,
            afficheLigneAjoutDouleur,
        };
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
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],

};