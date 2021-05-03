// @ts-check
import { Competence, initNouvelleCompetence } from "./fiche-personnage.mjs";
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const BlocCompetencesDementiellesComponent = {
    data: function() {
        return {
            nouvelleCompetence: new Competence(),
        };
    },
    computed: {
        ...mapState([ 'mode', 'perso' ]),
    },
    methods: {
        acquiertCompetenceDementielle: function() {
            this.nouvelleCompetence = initNouvelleCompetence();
            this.nouvelleCompetence.dementielle = true;
            
            this.$store.dispatch('affichePopupCompetence', this.nouvelleCompetence);
        },
        clickCompetenceDementielle: function(competenceDementielle) {
            if (this.mode === 'jeu') {
                this.$store.dispatch("affichePopupJet", { 
                    nom: competenceDementielle.intitule, 
                    type: 'compétence démentielle'
                });
            }
        },
    },
    template: `
<hdf-bloc-fiche title="Compétences Démentielles" v-if="mode==='jeu'">
    <ul v-if="perso.competencesDementielles.length">
        <li v-for="(competence, indexCompetence) of perso.competencesDementielles" 
            class="handwritten" 
            @click="clickCompetenceDementielle(competence)">
            
            {{ competence.intitule }} = {{ competence.valeur }}
        </li>
    </ul>
    <span v-else>Aucune</span><br/>
    <button @click="acquiertCompetenceDementielle">Acquérir une Compétence Démentielle (+1pt de Crise)</button>
</hdf-bloc-fiche>
`,
};