// @ts-check
import { Competence, initNouvelleCompetence } from "./fiche-personnage.mjs";

export const BlocCompetencesComponent = {
    props: [ 'mode', 'perso' ],
    data: function() {
        return {
            nouvelleCompetence: new Competence(),
        };
    },
    methods: {
        choisitCompetenceProfessionnelle: function() {
            this.nouvelleCompetence = initNouvelleCompetence();
            this.nouvelleCompetence.professionnelle = true;
            this.nouvelleCompetence.revelee = true;

            this.$emit("nouvelle-competence", this.nouvelleCompetence);
        },
        reveleCompetence: function() {
            this.nouvelleCompetence = initNouvelleCompetence();
            this.nouvelleCompetence.revelee = true;

            this.$emit("nouvelle-competence", this.nouvelleCompetence);
        },
        supprimeLigneCompetence: function(indexCompetence) {
            this.perso.competences = this.perso.competences.filter((_, index) => index !== indexCompetence);
        },
    },
    template: `
<hdf-bloc-fiche title="Compétences">
    <label for="perso.pointsDeGeneration">Points de Génération :</label>
    <input v-model="perso.pointsDeGeneration" type="number" readonly="readonly">
    <br/>
    <ul v-if="perso.competences.length">
        <li v-for="(competence, indexCompetence) of perso.competences">
            {{competence.intitule}} ({{ competence.nomCaracteristiqueDirectrice }} {{ competence.professionnelle ? "(Profession)" : "base " + competence.base }}) = {{ competence.valeur }}
            <button v-if="competence.professionnelle && mode==='création'" @click="supprimeLigneCompetence(indexCompetence)">Supprimer</button>
        </li>    
    </ul>
    <span v-else>Aucune</span><br/>
    <button v-if="mode==='jeu'" @click="reveleCompetence">Révéler une Compétence</button>
    <button v-if="mode==='création' && !perso.competences.some(_ => _.professionnelle)" @click="choisitCompetenceProfessionnelle">Choisir sa Compétence Professionnelle</button>
</hdf-bloc-fiche>
`,
};