//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

/**
 * Affiché quand on clic sur mot de démence.
 * 
 * Liste les effets.
 * Avec des boutons pour les déclencher et gérer les impacts sur la santé mentale du perso.
 */
export const PopupEffetsDementielsComponent = {
    computed: {
        ...mapState([ 'mode', 'perso', 'hiddenPopupEffetsDementiels' ]),
    },
    data: function() {
        return {

        };
    },
    methods: {
        masqueTout: function() {
            this.$store.dispatch("masqueTout");
        },
        valide: function() {
            // journaliser
            //const ligneJournal = `Jet de ${this.etatJet.type} sur ${this.etatJet.nom} avec ${this.typeAjustement}=${this.ajustement} : (${this.premierJet}) ${this.demandeConfirmationCritique ? '('+this.deuxiemeJet+')' : ''} ${this.consequence}.`;
            //this.$store.commit("ajouteLigneJournal", ligneJournal);
            // modifier this.perso éventuellement

            this.masqueTout();
        },
    },
    template: `
<div :class="'popup '+(hiddenPopupEffetsDementiels ? 'hidden' : '')">
    <button class="abs-top-right-10" @click="masqueTout">X</button>
    <div class="contents">
        <h3>Effets Démentiels</h3>
    </div>
    <button @click="valide">Valider</button>
    <button @click="masqueTout">Annuler</button>
</div>
`,
};