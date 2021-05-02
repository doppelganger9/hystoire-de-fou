//@ts-check
import { Competence } from "./fiche-personnage.mjs";

/**
 * Composant affichant une popup avec un dialog pour effectuer un jet:
 * - choisir une caractéristique 
 * ou 
 * - choisir une compétence (? en profiter pour révéler ?)
 * ensuite
 * - choisir un ajustement (table des oppositions ou arbitraire)
 * Résoudre par un jet de dé virtuel ou entrer le résultat d'un D20.
 * Indique si c'est une réussite critique (demande un autre jet pour confirmer le critique),
 * réussite simple, échec ou échec critique (demande un autre jet pour confirmer le critique).
 * 
 * TODO: gérer une pile des popup : on est sur cette popup 
 * et on affiche par dessus celle pour révéler une compétence.
 * Ce jet déclenche une conséquence nécessitant un autre jet
 * etc.
 * Pour le moment on contourne et c'est le joueur qui pilote et lit le journal pour
 * savoir quoi faire.
 */
export const PopupJetComponent = {
    props: [ 'mode', 'perso', 'hidden', 'type', 'nom' ],
    data: function() {
        return {

        };
    },
    methods: {
        masqueTout: function() {
            this.$emit("masque-tout");
        },
        valide: function() {
            // journaliser

            // modifier this.perso éventuellement

            this.masqueTout();
        },
    },
    template: `
<div :class="'popup '+(hidden ? 'hidden' : '')">
    <button class="abs-top-right-10" @click="masqueTout">X</button>
    <div class="contents">
        <h3>Faire un Jet</h3>
        {{ type }} / {{ nom }}
    </div>
    <button @click="valide">Valider</button>
    <button @click="masqueTout">Annuler</button>
</div>
`,
};