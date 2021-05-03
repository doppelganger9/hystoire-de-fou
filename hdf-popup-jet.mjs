//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";
import { tirerUnDe20 } from "./trousse-des.mjs";

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
    computed: {
        ...mapState([ 'mode', 'perso', 'hiddenPopupJet', 'etatJet' ]),
        valorisationATester: function() {
            if (this.etatJet.type.toLowerCase() === 'caractéristique') {
                return +this.perso[this.etatJet.nom];
            } else if (this.etatJet.type.toLowerCase() === 'compétence') {
                const comp = this.perso.competences.reduce((found, c) => !found && c.intitule === this.etatJet.nom ? c : found, null);
                return +comp.valeur;
            } else if (this.etatJet.type.toLowerCase() === 'compétence démentielle') {
                const comp = this.perso.competencesDementielles.reduce((found, c) => !found && c.intitule === this.etatJet.nom ? c : found, null);
                return +comp.valeur;
            } else {
                console.error("jet pour "+this.etatJet.type+" pas encore implémenté");
                return undefined;
            }
        },
        seuilReussite: function() {
            this.ajustement = +this.ajustement;
            return +this.valorisationATester + this.ajustement;
        },
        consequence: function() {
            this.premierJet= +this.premierJet;
            this.deuxiemeJet= +this.deuxiemeJet;
            this.critique = false;
            this.demandeConfirmationCritique = false;
            if (this.nbJet1 === 0) {
                return "succès ou échec... ?";
            } else if (this.nbJet1 === 1) {
                if (this.premierJet <= this.seuilReussite) {
                    if (this.nbJet2 === 0) {
                        if (this.premierJet <= 4) {
                            this.demandeConfirmationCritique = true;
                            return 'succès ... critique ou pas ?';
                        } else {
                            this.critique = false;
                            return 'succès !';
                        }
                    } else if (this.nbJet2 === 1) {
                        if (this.premierJet <= 4 && this.deuxiemeJet <= this.seuilReussite) {
                            this.demandeConfirmationCritique = true;
                            this.critique = true;
                            return 'succès critique !';
                        } else {
                            this.demandeConfirmationCritique = true;
                            this.critique = false;
                            return 'succès !';
                        }
                    } else {
                        return "triche !";
                    }
                } else {
                    if (this.nbJet2 === 0) {
                        if (this.premierJet >= 17) {
                            this.demandeConfirmationCritique = true;
                            return 'échec ... critique ou pas ?';
                        } else {
                            this.critique = false;
                            return 'échec !';
                        }
                    } else if (this.nbJet2 === 1) {
                        if (this.premierJet >= 17 && this.deuxiemeJet > this.seuilReussite) {
                            this.demandeConfirmationCritique = true;
                            this.critique = true;
                            return 'échec critique !';
                        } else {
                            this.demandeConfirmationCritique = true;
                            this.critique = false;
                            return 'échec !';
                        }
                    } else {
                        return "triche !";
                    }
                }    
            } else {
                return "triche ?!";
            }            
        },
    },
    data: function() {
        return {
            ajustement: 0,
            critique: false,
            premierJet: 10,
            deuxiemeJet: 10,
            typeAjustement: 'ajustement',
            nbJet1: 0, // pour compter le nb de d20 simulés (cheater !)
            nbJet2: 0, // pour compter le nb de d20 simulés (cheater !)
            demandeConfirmationCritique: false,
        };
    },
    methods: {
        masqueTout: function() {
            this.ajustement = 0;
            this.critique = false;
            this.premierJet = 10;
            this.deuxiemeJet = 10;
            this.typeAjustement = 'ajustement';
            this.nbJet1 = 0;
            this.nbJet2 = 0;
            this.demandeConfirmationCritique = false;

            this.$store.dispatch("masqueTout");
        },
        saisitUnD20: function(numero) {
            this["nbJet"+numero] = this["nbJet"+numero] + 1;
        },
        simuleUnD20: function(numero) {
            const res = tirerUnDe20();
            if (numero == 1) {
                this.premierJet = res;
                this.nbJet1 = this.nbJet1 + 1;
            } else if(numero == 2) {
                this.deuxiemeJet = res;
                this.nbJet2 = this.nbJet2 + 1;
            } else {
                return res;
            }
        },
        valide: function() {
            // journaliser
            const ligneJournal = `Jet de ${this.etatJet.type} sur ${this.etatJet.nom} avec ${this.typeAjustement}=${this.ajustement} : (${this.premierJet}) ${this.demandeConfirmationCritique ? '('+this.deuxiemeJet+')' : ''} ${this.consequence}.`;
            this.$store.commit("ajouteLigneJournal", ligneJournal);
            // modifier this.perso éventuellement
            if (this.etatJet.type === 'compétence' 
                    && this.seuilReussite <= 10 
                    && this.consequence.indexOf("succès")==0) {
                this.$store.commit("marqueCroixExperience", this.etatJet.nom);
            } 

            this.masqueTout();
        },
    },
    template: `
<div :class="'popup '+(hiddenPopupJet ? 'hidden' : '')">
    <button class="abs-top-right-10" @click="masqueTout">X</button>
    <div class="contents">
        <h3>Faire un Jet de {{ etatJet.type }}</h3>
        {{ etatJet.nom }} : {{ valorisationATester }}
        <br/>
        <label for="typeAjustement:ajustement">avec Ajustement</label><input id="typeAjustement:ajustement" name="typeAjustement" value="ajustement" type="radio" v-model="typeAjustement">
        <br/>
        <label for="typeAjustement:opposition">en Opposition</label><input id="typeAjustement:opposition" name="typeAjustement" value="opposition" type="radio" v-model="typeAjustement">
        <br/>
        <label v-if="typeAjustement === 'opposition'" for="selectAjustement"> contre compétence/caractéristique opposée: </label>
        <select id="selectAjustement" v-model="ajustement" v-if="typeAjustement === 'opposition'">
            <option value="-10">0</option>
            <option value="-9">1</option>
            <option value="-8">2</option>
            <option value="-7">3</option>
            <option value="-6">4</option>
            <option value="-5">5</option>
            <option value="-4">6</option>
            <option value="-3">7</option>
            <option value="-2">8</option>
            <option value="-1">9</option>
            <option value="0">10</option>
            <option value="1">11</option>
            <option value="2">12</option>
            <option value="3">13</option>
            <option value="4">14</option>
            <option value="5">15</option>
            <option value="6">16</option>
            <option value="7">17</option>
            <option value="8">18</option>
            <option value="9">19</option>
            <option value="10">20</option>
        </select>
        <label v-if="typeAjustement === 'ajustement'" for="selectCaracteristiqueOpposee"> ajustement à appliquer: </label>
        <select name="selectCaracteristiqueOpposee" v-model="ajustement" v-if="typeAjustement === 'ajustement'">
            <option value="-10">-10</option>
            <option value="-9">-9</option>
            <option value="-8">-8</option>
            <option value="-7">-7</option>
            <option value="-6">-6</option>
            <option value="-5">-5</option>
            <option value="-4">-4</option>
            <option value="-3">-3</option>
            <option value="-2">-2</option>
            <option value="-1">-1</option>
            <option value="0">0</option>
            <option value="1">+1</option>
            <option value="2">+2</option>
            <option value="3">+3</option>
            <option value="4">+4</option>
            <option value="5">+5</option>
            <option value="6">+6</option>
            <option value="7">+7</option>
            <option value="8">+8</option>
            <option value="9">+9</option>
            <option value="10">+10</option>
        </select>
        <h4>Seuil de réussite : {{ seuilReussite }}</h4>
        
        <label for="premierJet">Premier jet:</label>
        <input id="premierJet" type="number" min="1" max="20" v-model="premierJet" :readonly="nbJet1>=1">
        <button @click="saisitUnD20(1)" :disabled="nbJet1>=1">OK</button>
        <button @click="simuleUnD20(1)" :disabled="nbJet1>=1">simuler D20</button><br/>
        
        <div v-if="demandeConfirmationCritique === true">
            <label for="deuxiemeJet">Second jet pour confirmer un critique:</label>
            <input id="deuxiemeJet" type="number" min="1" max="20" v-model="deuxiemeJet" :readonly="nbJet2>=1">
            <button @click="saisitUnD20(2)" :disabled="nbJet2>=1">OK</button>
            <button @click="simuleUnD20(2)" :disabled="nbJet2>=1">simuler D20</button>
        </div>
        <br/>
        <h4>{{ consequence }}</h4>
    </div>
    <button @click="valide">Valider</button>
    <button @click="masqueTout">Annuler</button>
</div>
`,
};