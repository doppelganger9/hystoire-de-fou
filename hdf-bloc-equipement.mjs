// @ts-check
import { habillerALaSaintFrusquin } from "./saint-frusquin.mjs";

export const BlocEquipementComponent = {
    props: [ 'mode', 'perso' ],
    data: function() {
        return {
            nouvelEquipement: '',
        };
    },
    methods: {
        genereEquipementSaintFrusquin: function() {
            this.perso.equipements = habillerALaSaintFrusquin();
        },
        supprimeLigneEquipement: function(indexEquipement) {
            this.perso.equipements = this.perso.equipements.filter((_, index) => index !== indexEquipement);
        },
        ajouteLigneEquipement: function() {
            this.perso.equipements.push(''+this.nouvelEquipement);
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