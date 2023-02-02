// @ts-check
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { Competence, initNouvelleCompetence } from "../metier/competences.mjs";
import { allStyles } from "../styles/all.mjs";

export const BlocCompetencesDementiellesComponent = {
    setup() {
        const store = useStore();
        
        const perso = computed(() => store.state['perso']);
        
        const nouvelleCompetence = ref(new Competence());
        
        const acquiertCompetenceDementielle = () => {
            nouvelleCompetence.value = initNouvelleCompetence();
            nouvelleCompetence.value.dementielle = true;
            
            store.dispatch('affichePopupCompetence', nouvelleCompetence.value);
        };

        const clickCompetenceDementielle = (competenceDementielle) => {
            store.dispatch("affichePopupJet", { 
                nom: competenceDementielle.intitule, 
                type: 'compétence démentielle'
            });
        };

        return {
            // computed state
            perso,
            // methods
            acquiertCompetenceDementielle,
            clickCompetenceDementielle,
            // data
            nouvelleCompetence,
        };
    },
    template: `
<hdf-bloc-fiche title="Compétences Démentielles" class="competencesdementielles">
    <ul class="competences" v-if="perso.competencesDementielles.length">
        <li v-for="(competence, indexCompetence) of perso.competencesDementielles" 
            class="handwritten jet" 
            @click="clickCompetenceDementielle(competence)">
            
            {{ competence.intitule }} = {{ competence.valeur }}
        </li>
    </ul>
    <span v-else>Aucune</span><br/>
    <button @click="acquiertCompetenceDementielle">Acquérir une Compétence Démentielle (+1pt de Crise)</button>
</hdf-bloc-fiche>
`,
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],

};