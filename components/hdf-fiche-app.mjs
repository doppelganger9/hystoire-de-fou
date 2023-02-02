//@ts-check
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { allStyles } from '../styles/all.mjs';

export const FicheAppComponent = {
    setup() {
        const store = useStore();

        const perso = computed(() => store.state['perso']);
        const infos = computed(() => store.state['infos']);
        const hiddenInfos = computed(() => store.state['hiddenInfos']);
        const mode = computed(() => store.state['mode']);
        const hiddenVoile = computed(() => store.state['hiddenVoile']);
        const hiddenPopupCompetence = computed(() => store.state['hiddenPopupCompetence']);
        const nouvelleCompetence = computed(() => store.state['nouvelleCompetence']);
        const hiddenPopupJet = computed(() => store.state['hiddenPopupJet']);
        const etatJet = computed(() => store.state['etatJet']);
        const creationFinie = computed(() => store.getters['creationFinie']);

        const passerEnMode = (mode) => {
            store.commit('passerEnMode', mode);
        };

        onMounted(() => {
            console.log('mounted FicheAppComponent');
        });

        return {
            // methods
            passerEnMode,
            // computed state
            perso,
            infos,
            hiddenInfos,
            mode,
            hiddenVoile,
            hiddenPopupCompetence,
            nouvelleCompetence,
            hiddenPopupJet,
            etatJet,
            // computed getters
            creationFinie,
        };
    },
    template: `
    <h1>Hystoire de Fou</h1>
    <h2>Fiche de Personnage intéractive</h2>
    <div id="app" :class="'visible'" class="hidden">
        <!-- affiché avant que l'app soit prête -->
        <h3 v-if="false" class="visible menu">En cours de chargement...</h3>
        <hdf-voile></hdf-voile>
        <hdf-menu-lancement></hdf-menu-lancement>
        <div v-if="mode !=='menu'" class="fiche">
            <hdf-popup-infos></hdf-popup-infos>
            <p class="tutoriel" v-if="mode === 'création'">Vous allez maintenant créer votre personnage.
                La seule contrainte est que les personnages d'un groupe de jeu partagent tous un point commun de départ.
                Votre meneur/meneuse devrait déjà vous l'avoir indiqué, sinon posez la question.
                A part cela, gardez à l'esprit que les personnages joueurs d'Hystoire de Fou sont des gens ordinaires, contemporains, vivant une vie normale.
                Ils ne sont pas fous. Pas encore 😇 ! Ce ne sont pas non plus des aventuriers.
            </p>
            <p class="tutoriel" v-if="mode === 'création'">
                Suivez les indications dans les blocs d'aide comme celui-ci, 
                et aussi en cliquant sur les boutons d'informations ℹ️. <br/>
                Vous devrez d'abord saisir les informations d'état civil de votre personnage,<br/>
                Puis répartir ses caractéristiques,<br/>
                et enfin lui choisir une compétence professionnelle.<br/>
                Cela devrait être rapide, comptez maximum 10 minutes.<br/>
                <br/>
                Une fois terminé le bouton ci-dessous deviendra clicable pour terminer la création et la valider.
                <button v-if="mode==='création'" :disabled="!creationFinie" @click="passerEnMode('jeu')">
                    Création de personnage terminée
                </button>
            </p>
            <hdf-popup-jet v-if="mode==='jeu'"></hdf-popup-jet>
            <hdf-popup-creation-competence></hdf-popup-creation-competence>
            <hdf-popup-effets-dementiels v-if="mode==='jeu'"></hdf-popup-effets-dementiels>

            <hdf-bloc-etat-civil v-if="mode==='création'"></hdf-bloc-etat-civil>
            <hdf-bloc-caracteristiques v-if="mode==='création'"></hdf-bloc-caracteristiques>
            <hdf-bloc-competences v-if="mode==='création'"></hdf-bloc-competences>
            <hdf-bloc-sante-mentale v-if="mode==='création'"></hdf-bloc-sante-mentale>
            
            <hdf-bloc-caracteristiques v-if="mode==='jeu'"></hdf-bloc-caracteristiques>
            <hdf-bloc-etat-civil v-if="mode==='jeu'"></hdf-bloc-etat-civil>
            <hdf-bloc-sante-mentale v-if="mode==='jeu'"></hdf-bloc-sante-mentale>
            <hdf-bloc-sante v-if="mode==='jeu'"></hdf-bloc-sante>
            <hdf-bloc-competences v-if="mode==='jeu'"></hdf-bloc-competences>

            <hdf-bloc-competences-dementielles v-if="mode==='jeu'"></hdf-bloc-competences-dementielles>
            <hdf-bloc-equipement v-if="mode==='jeu'"></hdf-bloc-equipement>
            <hdf-bloc-journal v-if="mode==='jeu'"></hdf-bloc-journal>
            <p class="tutoriel" v-if="mode === 'création'">
                Si vous avez tout rempli comme demandé, le bouton ci-dessous devrait être clicable pour terminer la création et la valider.<br/>
                Sinon remontez et vérifiez que vous avez bien tout saisi.
                <button v-if="mode==='création'" :disabled="!creationFinie" @click="passerEnMode('jeu')">
                    Création de personnage terminée
                </button>
            </p>

        </div>
    </div>    
    `,
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],
};
