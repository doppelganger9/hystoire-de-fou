//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const PopupCreationCompetenceComponent = {
    computed: {
        ...mapState([ 'mode', 'nouvelleCompetence', 'perso', 'hiddenPopupCompetence' ]),
        intitule: {
            get() { return this.$store.state.nouvelleCompetence.intitule },
            set(valeur) { this.$store.commit('modifieChampsNouvelleCompetence', {champs:'intitule', valeur}) },
        },
        nomCaracteristiqueDirectrice: {
            get() { return this.$store.state.nouvelleCompetence.nomCaracteristiqueDirectrice },
            set(valeur) { this.$store.commit('modifieChampsNouvelleCompetence', {champs:'nomCaracteristiqueDirectrice', valeur}) },
        },
        base: {
            get() { return this.$store.state.nouvelleCompetence.base },
            set(valeur) { this.$store.commit('modifieChampsNouvelleCompetence', {champs:'base', valeur}) },
        },
        pointsDeGeneration: {
            get() { return this.$store.state.nouvelleCompetence.pointsDeGeneration },
            set(valeur) { this.$store.commit('modifieChampsNouvelleCompetence', {champs:'pointsDeGeneration', valeur}) },
        },
    },
    methods: {
        masqueTout: function() {
            this.$store.dispatch("masqueTout");
        },
        nouvelleCompetenceNomCaracteristiqueDirectriceChanged: function() {
            this.$store.commit('modifieChampsNouvelleCompetence', {champs:'valeurCaracteristiqueDirectrice', valeur:+this.perso[this.nouvelleCompetence.nomCaracteristiqueDirectrice]});
        },
        valideAjoutCompetence: function(competence) {
            this.$store.dispatch('ajouteCompetence', competence);
            this.$store.dispatch("masqueTout");
            if (competence.dementielle) {
                this.$store.dispatch('apresAjoutCompetenceDementielle');
            }
        },
    },
    template: `
<div :class="'popup popup-creationcompetence '+(hiddenPopupCompetence ? 'hidden' : '')">
    <h3>Nouvelle Compétence {{ nouvelleCompetence.dementielle ? "Démentielle" : ""}}{{ nouvelleCompetence.professionnelle ? "Professionnelle" : ""}}</h3>
    <button class="abs-top-right-10" @click="masqueTout">X</button>
    <div class="contents">
        <div>
            <label for="nouvelleCompetence.intitule">Intitulé :</label>
            <input name="nouvelleCompetence.intitule" v-model="intitule" type="text" class="handwritten">
            <br/>
        </div>
        <div>
            <label for="nouvelleCompetence.nomCaracteristiqueDirectrice">Caractéristique directrice :</label>
            <select v-model="nomCaracteristiqueDirectrice"
                    name="nouvelleCompetence.nomCaracteristiqueDirectrice"
                    @change="nouvelleCompetenceNomCaracteristiqueDirectriceChanged">
                <option disabled value="">Please select one</option>
                <option value="charisme">CHARISME</option>
                <option value="perception">PERCEPTION</option>
                <option value="constitution">CONSTITUTION</option>
                <option value="agilite">AGILITE</option>
                <option value="entendement">Entendement</option>
            </select>
            <br/>
        </div>
        <div>
            <label for="nouvelleCompetence.valeurCaracteristiqueDirectrice">Valeur caractéristique directrice :</label>
            <input name="nouvelleCompetence.valeurCaracteristiqueDirectrice" :value="nouvelleCompetence.valeurCaracteristiqueDirectrice" type="number" min="6" max="15" class="handwritten" readonly="readonly">
            <br/>
        </div>

        <div v-if="!nouvelleCompetence.dementielle&&!nouvelleCompetence.professionnelle">
            <label for="nouvelleCompetence.base">Base :</label>
            <input name="nouvelleCompetence.base" v-model="base" type="number" class="handwritten" min="0" max="1">
            <br/>
        </div>
        <div v-if="!nouvelleCompetence.dementielle && !nouvelleCompetence.professionnelle && perso.pointsDeGeneration>0">
            <label for="nouvelleCompetence.pointsDeGeneration">Points de Génération :</label>
            <input name="nouvelleCompetence.pointsDeGeneration" v-model="pointsDeGeneration" type="number" min="0" max="4" class="handwritten">
            <br/>
        </div>
        <div>
            <label for="nouvelleCompetence.valeur">Valeur :</label>
            <input name="nouvelleCompetence.valeur" :value="nouvelleCompetence.valeur" type="number" class="handwritten" readonly="readonly">
            <br/>
        </div>
    </div>
    <button class="valide" @click="valideAjoutCompetence(nouvelleCompetence)">Valider</button>
    <button class="annule" @click="masqueTout">Annuler</button>
</div>
`,
};