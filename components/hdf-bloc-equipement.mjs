// @ts-check
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { allStyles } from "../styles/all.mjs";

export const BlocEquipementComponent = {
    setup() {
        const store = useStore();

        const perso = computed(() => store.state['perso']);

        const nouvelEquipement = ref('');

        const genereEquipementSaintFrusquin = () => {
            store.commit('genereEquipementSaintFrusquin');
        };
        const supprimeLigneEquipement = (indexEquipement) => {
            store.commit('supprimeLigneEquipement', indexEquipement);
        };
        const ajouteLigneEquipement = () => {
            store.commit('ajouteLigneEquipement', nouvelEquipement.value);
            nouvelEquipement.value = '';
        };

        return {
            // computed state
            perso,
            // methods
            genereEquipementSaintFrusquin,
            supprimeLigneEquipement,
            ajouteLigneEquipement,
            // data
            nouvelEquipement,
        };
    },
    template: `
<hdf-bloc-fiche title="Equipement" class="equipements">
    <button @click="genereEquipementSaintFrusquin">Saint-Frusquin</button>
    <ul class="competences" v-if="perso.equipements.length">
        <li v-for="(equipement, indexEquipement) of perso.equipements" class="handwritten">
            {{indexEquipement+1}} : {{ equipement }}
            <button class="emoji" @click="supprimeLigneEquipement(indexEquipement)">🗑</button>
        </li>
    </ul>
    <span v-else>Aucun</span><br/>
    <input v-model="nouvelEquipement" type="text"><button @click="ajouteLigneEquipement">Ajouter</button>
</hdf-bloc-fiche>
`,
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],

};