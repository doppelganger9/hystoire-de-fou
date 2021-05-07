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
        persoEstEnCrise: function() {
            return this.perso.pointsDeCrise > 0;
        }
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
            this.masqueTout();
        },
        appelDementiel: function() {
            this.$store.dispatch('appelDementiel');
        },
        incredire: function() {
            // TODO : suivre une popup de jet ?
        },
        antalgieDementielle: function() {
            // TODO : ajouter un bouton à côté des douleurs
        },
        empathieDementielle: function() {
            // TODO : faire un jet de charisme...
        },
        acquiertCompetenceDementielle: function() {
            // TODO : dire de voir directement sur la fiche
        },
        prendsLesVapes: function() {
            this.$store.dispatch('prendsLesVapes');
        },
        recommencerAction: function() {
            // TODO : dire de voir dans la popup Jet
        },
        energieDementielle: function() {
            // TODO : dire de voir dans la popup Jet
        },
        mourir: function() {
            this.$store.dispatch('apresLaMort');
        },
        accomplir: function() {
            this.$store.dispatch('accomplissement');
        },
    },
    template: `
<div :class="'popup popup-effetsdementiels '+(hiddenPopupEffetsDementiels ? 'hidden' : '')">
    <h3>Effets Démentiels</h3>
    <button class="abs-top-right-10" @click="masqueTout">X</button>
    <div class="contents">
        <div v-if="!persoEstEnCrise">
            <p>Pour le moment rien ne vous a fait douter que la réalité n'est plus ce qu'elle devrait être.</p>
            <p>Si jamais vous en doutiez, faites votre <button @click="appelDementiel">Appel Démentiel</button> en prononçant votre Mot de Démence pour la première fois !</p>
        </div>
        <div v-if="persoEstEnCrise">
            <p>Vous êtes maintenant sûr que la réalité n'est pas ce qu'elle prétends être. Que désirez-vous NIER:</p>
            <ul>
                <li>nier une chose : <button @click="incredire">Incrédire</button></li>
                <li>nier sa douleur : <button @click="antalgieDementielle">Antalgie Démentielle</button></li>
                <li>nier l'état de choc d'un compagnon : <button @click="empathieDementielle">Empathie Démentielle</button></li>
                <li>nier son incompétence étant donné la situation : <button @click="acquiertCompetenceDementielle">Acquérir une Compétence Démentielle</button></li>
                <li>nier ce qui vient juste de se passer (on rembobine) : <button @click="recommencerAction">Recommencer Action</button></li>
                <li>y aller de toutes ses forces : <button @click="energieDementielle">Energie Démentielle</button></li>
            </ul>
            Pour sortir de la Crise:
            <ul>
                <li>Quand on n'en peut plus, on nie tout en bloc... <button @click="prendsLesVapes">Prendre les Vapes</button></li>
                <li>Quand on n'est plus... <button @click="mourir">Mourir</button></li>
                <li>avec succès : <button @click="accomplir">Accomplir !</button></li>
            </ul>            
        </div>

    </div>
    <button class="valide" @click="valide">Valider</button>
    <button class="annule" @click="masqueTout">Annuler</button>
</div>
`,
};