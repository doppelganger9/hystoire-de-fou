// @ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const BlocEquipementComponent = {
    data: function() {
        return {
            nouvelEquipement: '',
        };
    },
    computed: {
        ...mapState([
            'mode',
            'perso',
        ]),
    },
    methods: {
        genereEquipementSaintFrusquin: function() {
            this.$store.commit('genereEquipementSaintFrusquin');
        },
        supprimeLigneEquipement: function(indexEquipement) {
            this.$store.commit('supprimeLigneEquipement', indexEquipement);
        },
        ajouteLigneEquipement: function() {
            this.$store.commit('ajouteLigneEquipement', this.nouvelEquipement);
            this.nouvelEquipement = '';
        },
    },
    template: `
<hdf-bloc-fiche title="Equipement" v-if="mode==='jeu'">
    <button @click="genereEquipementSaintFrusquin">Saint-Frusquin</button>
    <ul v-if="perso.equipements.length">
        <li v-for="(equipement, indexEquipement) of perso.equipements" class="handwritten">
            {{indexEquipement+1}} : {{ equipement }} <button @click="supprimeLigneEquipement(indexEquipement)">Supprimer</button>
        </li>
    </ul>
    <span v-else>Aucun</span><br/>
    <input v-model="nouvelEquipement" type="text"><button @click="ajouteLigneEquipement">Ajouter</button>
</hdf-bloc-fiche>
`,
};