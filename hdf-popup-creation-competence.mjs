//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const PopupCreationCompetenceComponent = {
    computed: {
        ...mapState([ 'mode', 'nouvelleCompetence', 'perso', 'hiddenPopupCompetence' ]),
    },
    methods: {
        masqueTout: function() {
            this.$store.dispatch("masqueTout");
        },
        nouvelleCompetenceNomCaracteristiqueDirectriceChanged: function() {
            this.nouvelleCompetence.valeurCaracteristiqueDirectrice = this.perso[this.nouvelleCompetence.nomCaracteristiqueDirectrice];
        },
        valideAjoutCompetence: function(competence) {
            this.$store.dispatch('ajouteCompetence', competence);
            this.$store.dispatch("masqueTout");
        },
    },
    template: `
<div :class="'popup '+(hiddenPopupCompetence ? 'hidden' : '')">
    <button class="abs-top-right-10" @click="masqueTout">X</button>
    <div class="contents">
        <h3>Nouvelle Compétence {{ nouvelleCompetence.dementielle ? "Démentielle" : ""}}{{ nouvelleCompetence.professionnelle ? "Professionnelle" : ""}}</h3>
        <div>
            <label for="nouvelleCompetence.intitule">Intitulé :</label>
            <input name="nouvelleCompetence.intitule" v-model="nouvelleCompetence.intitule" type="text" class="handwritten">
            <br/>
        </div>
        <div>
            <label for="nouvelleCompetence.nomCaracteristiqueDirectrice">Caractéristique directrice :</label>
            <select v-model="nouvelleCompetence.nomCaracteristiqueDirectrice"
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
            <input name="nouvelleCompetence.base" v-model="nouvelleCompetence.base" type="number" class="handwritten" min="0" max="1">
            <br/>
        </div>
        <div v-if="!nouvelleCompetence.dementielle && !nouvelleCompetence.professionnelle && perso.pointsDeGeneration>0">
            <label for="nouvelleCompetence.pointsDeGeneration">Points de Génération :</label>
            <input name="nouvelleCompetence.pointsDeGeneration" v-model="nouvelleCompetence.pointsDeGeneration" type="number" min="0" max="4" class="handwritten">
            <br/>
        </div>
        <div>
            <label for="nouvelleCompetence.valeur">Valeur :</label>
            <input name="nouvelleCompetence.valeur" :value="nouvelleCompetence.valeur" type="number" class="handwritten" readonly="readonly">
            <br/>
        </div>
    </div>
    <button @click="valideAjoutCompetence(nouvelleCompetence)">Valider</button>
    <button @click="masqueTout">Annuler</button>
</div>
`,
};