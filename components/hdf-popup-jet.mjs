//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";
import { tirerUnDe6, tirerUnDe20 } from "../metier/trousse-des.mjs";

const SUCCES = 'succès !';
const SUCCES_CRITIQUE_POSSIBLE = 'succès ... critique ou pas ?';
const SUCCES_CRITIQUE = 'succès critique !';
const ECHEC = 'échec !';
const ECHEC_CRITIQUE_POSSIBLE = 'échec ... critique ou pas ?';
const ECHEC_CRITIQUE = 'échec critique !';
const TRICHE = 'triche !';

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
            if (this.energieDementielle) {
                this.energieDementielle = +this.energieDementielle;
                // Seuil Energie Démentielle : au maximum on peut atteindre un seuil de réussite de 16
                return Math.min(Math.max(16, this.valorisationATester + this.ajustement), +this.valorisationATester + this.ajustement + this.energieDementielle);
            } else {
                return +this.valorisationATester + this.ajustement;
            }
        },
        recommencerActionPossible: function() {
            // est-ce que le personnage a au moins 1 pt de crise ?
            if (this.perso.pointsDeCrise === 0) return false;
            // est-ce que l'action s'est terminée sur un échec ou échec critique ?
            const csq = this.consequence;
            if (csq !== ECHEC && csq !== ECHEC_CRITIQUE) return false;
            // est-ce que l'on n'a pas déjà recommencé l'action ?
            if (this.actionDejaRecommencee) return false;

            // TODO : pas possible sur jet de Chance (CHARISME)
            // TODO : pas possible sur jet de CONSTITUTION
            // TODO : pas possible sur jet d'Incrédulité
            // TODO : pas possible sur jet d'Antalgie Démentielle
            // TODO : pas possible sur jet d'Empathie Démentielle
            // TODO : pas possible sur jet de crise ou de chocs
            // TODO : pas possible sur jet de perception inconsciente
            // TODO : pas possible sur jet de Culture Générale et autre compétence Entendement
            // TODO : en fait uniquement si jet découlant d'une action véritable et voulue

            // sinon
            return true;
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
                            return SUCCES_CRITIQUE_POSSIBLE;
                        } else {
                            this.critique = false;
                            return SUCCES;
                        }
                    } else if (this.nbJet2 === 1) {
                        if (this.premierJet <= 4 && this.deuxiemeJet <= this.seuilReussite) {
                            this.demandeConfirmationCritique = true;
                            this.critique = true;
                            return SUCCES_CRITIQUE;
                        } else {
                            this.demandeConfirmationCritique = true;
                            this.critique = false;
                            return SUCCES;
                        }
                    } else {
                        return TRICHE;
                    }
                } else {
                    if (this.nbJet2 === 0) {
                        if (this.premierJet >= 17) {
                            this.demandeConfirmationCritique = true;
                            return ECHEC_CRITIQUE_POSSIBLE;
                        } else {
                            this.critique = false;
                            return ECHEC;
                        }
                    } else if (this.nbJet2 === 1) {
                        if (this.premierJet >= 17 && this.deuxiemeJet > this.seuilReussite) {
                            this.demandeConfirmationCritique = true;
                            this.critique = true;
                            return ECHEC_CRITIQUE;
                        } else {
                            this.demandeConfirmationCritique = true;
                            this.critique = false;
                            return ECHEC;
                        }
                    } else {
                        return TRICHE;
                    }
                }    
            } else {
                return TRICHE;
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
            actionDejaRecommencee: false, // pour tracer l'utilisation de recommencer action
            energieDementielle: undefined, // undefined, ou 1 à 6
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
            this.energieDementielle = undefined;
            this.actionDejaRecommencee = false;

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
            const csq = this.consequence;
            // modifier this.perso éventuellement
            if (this.etatJet.type === 'compétence' 
                    && this.seuilReussite <= 10 
                    && (csq === SUCCES || csq === SUCCES_CRITIQUE)) {
                this.$store.commit("marqueCroixExperience", this.etatJet.nom);
            }

            // il faut payer les conséquence si on avait utilisé 1 ou 2 effets démentiels sur un jet échoué.
            if (csq === ECHEC || csq === ECHEC_CRITIQUE) {
                if (this.energieDementielle && !this.actionDejaRecommencee) {
                    // si on a utilisé uniquement 1 effet démentiel et pas les 2
                    this.$store.dispatch('apresEchecJetAvecEnergieDementielle');
                } else if (!this.energieDementielle && this.actionDejaRecommencee) {
                    // si on a utilisé uniquement 1 effet démentiel et pas les 2
                    this.$store.dispatch('apresEchecJetAvecRecommencerAction');
                } else if (this.energieDementielle && this.actionDejaRecommencee) {
                    // DOUBLE conséquence Effets Démentiels
                    this.$store.dispatch('apresEchecJetAvecEnergieDementiellePuisRecommencerAction');
                }
            } 

            this.masqueTout();
        },
        ajouteEnergieDementiellePlus3: function() {
            this.energieDementielle = +3;
        },
        ajouteEnergieDementiellePlus1D6: function() {
            this.energieDementielle = +tirerUnDe6();
        },
        recommenceAction: function() {
            this.actionDejaRecommencee = true;
            this.nbJet1 = 0;
            this.nbJet2 = 0;
        }
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

        <div v-if="perso.pointsDeCrise > 0 && (valorisationATester + ajustement < 16)" class="energiedementielle">
            <label v-if="energieDementielle === undefined && nbJet1 === 0 && !actionDejaRecommencee" for="bouton-nrj">
                Utiliser <em>Energie Démentielle</em> : "{{perso.motDeDemence}}"
            </label>
            <button v-if="energieDementielle === undefined && nbJet1 === 0 && !actionDejaRecommencee" name="bouton-nrj"
                    @click="ajouteEnergieDementiellePlus3">
                    Pour un Bonus de +3
            </button>
            <button v-if="energieDementielle === undefined && nbJet1 === 0 && !actionDejaRecommencee" name="bouton-nrj"
                    @click="ajouteEnergieDementiellePlus1D6">
                    Pour un Bonus de +1D6
            </button>
            <span v-if="energieDementielle !== undefined">Energie Démentielle : +{{ energieDementielle }}</span>
        </div>

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

        <div v-if="recommencerActionPossible">
            <label for="retry-btn">Utiliser <em>Recommencer Action</em> : "{{perso.motDeDemence}}"</label>
            <button name="retry-btn" @click="recommenceAction">
                recommencer l'action !
            </button>
            <p>(NOTE: On ne peut pas "recommencer action" une deuxième fois.
            On ne peut pas utiliser Energie Démentielle s'il n'a pas déjà été utilisé avant Recommencer Action)</p>
        </div>
        <p v-if="actionDejaRecommencee">Recommencer Action utilisé.</p>

    </div>
    <button @click="valide">Valider</button>
    <button @click="masqueTout">Annuler</button>
</div>
`,
};