// @ts-check
import { Competence, initNouvelleCompetence } from "../metier/competences.mjs";
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const BlocCompetencesDementiellesComponent = {
    data: function() {
        return {
            nouvelleCompetence: new Competence(),
        };
    },
    computed: mapState([ 'perso' ]),
    methods: {
        acquiertCompetenceDementielle: function() {
            this.nouvelleCompetence = initNouvelleCompetence();
            this.nouvelleCompetence.dementielle = true;
            
            this.$store.dispatch('affichePopupCompetence', this.nouvelleCompetence);
        },
        clickCompetenceDementielle: function(competenceDementielle) {
            this.$store.dispatch("affichePopupJet", { 
                nom: competenceDementielle.intitule, 
                type: 'compétence démentielle'
            });
        },
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
};