// @ts-check
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { Competence, initNouvelleCompetence } from "../metier/competences.mjs";
import { allStyles } from "../styles/all.mjs";

export const BlocCompetencesComponent = {
    setup() {
        const store = useStore();

        const mode = computed(() => store.state['mode']);
        const perso = computed(() => store.state['perso']);

        const nouvelleCompetence = ref(new Competence());

        const choisitCompetenceProfessionnelle = () => {
            nouvelleCompetence.value = initNouvelleCompetence();
            nouvelleCompetence.value.professionnelle = true;
            nouvelleCompetence.value.revelee = true;

            store.dispatch("affichePopupCompetence", nouvelleCompetence.value);
        };

        const reveleCompetence = () => {
            nouvelleCompetence.value = initNouvelleCompetence();
            nouvelleCompetence.value.revelee = true;

            store.dispatch("affichePopupCompetence", nouvelleCompetence.value);
        };

        const supprimeLigneCompetence = (indexCompetence) => {
            store.commit('supprimeLigneCompetence', indexCompetence);
        };

        const clickCompetence = (competence) => {
            if (mode.value === 'jeu') {
                store.dispatch("affichePopupJet", { 
                    nom: competence.intitule, 
                    type: 'compétence'
                });
            }
        };
        
        return {
            // computed state
            perso,
            mode,
            // methods
            choisitCompetenceProfessionnelle,
            reveleCompetence,
            supprimeLigneCompetence,
            clickCompetence,
            // data
            nouvelleCompetence,
        };
    },
    template: `
<hdf-bloc-fiche title="Compétences" class="competences">
    <p class="tutoriel" v-if="mode === 'création'">Pour créer un personnage, il vous faut à présent choisir une compétence professionnelle.<br/>
    Mais pour le moment, seule la compétence professionnelle importe.<br/>
    Un dernier mot, si la compétence professionnelle est basée sur Entendement, alors vous obtiendrez gratuitement la compétence "Culture Générale" à 100% d'Entendement.<br/>
    Les compétences vont de 0 à 20 inclus.</p>
    
    <ul class="competences" v-if="perso.competences.length">
        <li class="handwritten jet" v-for="(competence, indexCompetence) of perso.competences">
            <div @click="clickCompetence(competence)">
                {{ competence.croixExperience ? '[XP!] ' : ''}}
                {{competence.intitule}}
                (
                    {{ competence.nomCaracteristiqueDirectrice }}
                    {{ competence.professionnelle ? "(Profession)" : "base " + competence.base + " +GEN " + competence.pointsDeGeneration }}
                )
                 = {{ competence.valeur }}
            </div>
            <button v-if="mode==='création'" 
                    class="emoji"
                    @click="supprimeLigneCompetence(indexCompetence)">
                🗑
            </button>
        </li>    
    </ul>
    <span v-else>Aucune</span><br/>
    <button v-if="mode==='création' && !perso.competences.some(_ => _.professionnelle)" @click="choisitCompetenceProfessionnelle">Choisir sa Compétence Professionnelle</button>
    <p class="tutoriel" v-if="mode === 'création'">Une fois le jeu démarré,
    et quand vous aurez besoin de faire un jet d'une compétence inconnue, le meneur/la meneuse vous demandera alors de "révéler une compétence".<br/>
    C'est à ce moment là que vous utiliserez vos "Points de Génération" pour que votre compétence à révéler atteigne 0% / 50% / 75% ou 100% de sa Caractéristique directrice.<br/>
    De base les compétences sont à 50% ou à 0%, vous aurez alors le choix de dépenser 0, 1, 2 ou 3 points de Génération quand votre personnage se souviendra de ce qu'il sait faire.<br/>
    Quand vous n'aurez plus de points de Génération, toute nouvelle compétence révélée prendra sa valeur à 0 ou 50%.<br/>
    </p>
    <label for="perso.pointsDeGeneration">Points de Génération :</label>
    <input v-model="perso.pointsDeGeneration" type="number" readonly="readonly">
    <br/>
    <button v-if="mode==='jeu'" @click="reveleCompetence">Révéler une Compétence</button>
</hdf-bloc-fiche>
`,
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],

};