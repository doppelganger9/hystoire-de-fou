// @ts-check
import { Competence, initNouvelleCompetence } from "./fiche-personnage.mjs";

export const BlocCompetencesDementiellesComponent = {
    props: [ 'mode', 'perso' ],
    data: function() {
        return {
            nouvelleCompetence: new Competence(),
        };
    },
    methods: {
        acquiertCompetenceDementielle: function() {
            this.nouvelleCompetence = initNouvelleCompetence();
            this.nouvelleCompetence.dementielle = true;

            this.$emit("nouvelle-competence", this.nouvelleCompetence);
        },
    },
    template: `
<hdf-bloc-fiche title="Compétences Démentielles" v-if="mode==='jeu'">
    <ul v-if="perso.competencesDementielles.length">
        <li v-for="(competence, indexCompetence) of perso.competencesDementielles" class="handwritten">
            {{ competence.intitule }} = {{ competence.valeur }}
        </li>
    </ul>
    <span v-else>Aucune</span><br/>
    <button v-on:click="acquiertCompetenceDementielle">Acquérir une Compétence Démentielle (+1pt de Crise)</button>
</hdf-bloc-fiche>
`,
};