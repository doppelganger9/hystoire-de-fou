// @ts-check
import { Douleur } from "./fiche-personnage.mjs";

export const BlocSanteComponent = {
    props: ['mode', 'perso'],
    data: function() {
        return {
            nouvelleDouleur: new Douleur(),
            infos: '',
        };
    },
    computed: {
        totalDouleurs: function() {
            return this.perso.douleurs.reduce((total, douleur) => (+total)+(+douleur.valeur), 0);
        },
    },
    methods: {
        supprimeLigneDouleur: function(indexDouleur) {
            this.perso.douleurs = this.perso.douleurs.filter((_, index) => index !== indexDouleur);
        },
        ajouteLigneDouleur: function() {
            this.perso.douleurs.push(this.nouvelleDouleur);
            this.nouvelleDouleur = new Douleur();
        },
    },
    template: `
<hdf-bloc-fiche title="Santé" v-if="mode==='jeu'">
<h3 v-if="perso.douleurs.length">Total des malus : {{ totalDouleurs }}</h3>
<h3>Douleurs :</h3>
<ul v-if="perso.douleurs.length">
    <li v-for="(douleur, index) of perso.douleurs" class="handwritten">
        {{douleur.valeur}} ({{ douleur.provenance }}) <button v-on:click="supprimeLigneDouleur(index)">Supprimer</button>
    </li>    
</ul>
<span v-else>Aucune</span><br/>

<label for="nouvelleDouleur.valeur">Valeur :</label>
<input name="nouvelleDouleur.valeur" v-model="nouvelleDouleur.valeur" type="number" min="1" max="4" class="handwritten">

<label for="nouvelleDouleur.provenance">Provenance :</label>
<input name="nouvelleDouleur.provenance" v-model="nouvelleDouleur.provenance" type="text" class="handwritten">

<button v-on:click="ajouteLigneDouleur">Ajouter Douleur</button>
</hdf-bloc-fiche>
`,
};