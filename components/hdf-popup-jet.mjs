//@ts-check
import { computed, ref } from 'vue';
import { useStore } from "vuex";
import { tirerUnDe6, tirerUnDe20 } from "../metier/trousse-des.mjs";
import { allStyles } from '../styles/all.mjs';

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
    setup() {
        const store = useStore();

        const ajustement = ref(0);
        const critique = ref(false);
        const premierJet = ref(10);
        const deuxiemeJet = ref(10);
        const typeAjustement = ref('ajustement');
        const nbJet1 = ref(0); // pour compter le nb de d20 simulés (cheater !)
        const nbJet2 = ref(0); // pour compter le nb de d20 simulés (cheater !)
        const demandeConfirmationCritique = ref(false);
        const actionDejaRecommencee = ref(false); // pour tracer l'utilisation de recommencer action
        const energieDementielle = ref(undefined); // undefined, ou 1 à 6

        // TODO computed() + ...mapState([ 'mode', 'perso', 'hiddenPopupJet', 'etatJet' ]),
        const mode = computed(() => store.state['mode']);
        const perso = computed(() => store.state['perso']);
        const hiddenPopupJet = computed(() => store.state['hiddenPopupJet']);
        const etatJet = computed(() => store.state['etatJet']);

        const valorisationATester = computed(() => {
            if (etatJet.value.type.toLowerCase() === 'caractéristique') {
                return +perso.value[etatJet.value.nom];
            } else if (etatJet.value.type.toLowerCase() === 'compétence') {
                const comp = perso.value.competences.reduce((found, c) => !found && c.intitule === etatJet.value.nom ? c : found, null);
                return +comp.valeur;
            } else if (etatJet.value.type.toLowerCase() === 'compétence démentielle') {
                const comp = perso.value.competencesDementielles.reduce((found, c) => !found && c.intitule === etatJet.value.nom ? c : found, null);
                return +comp.valeur;
            } else {
                console.error("jet pour "+etatJet.value.type+" pas encore implémenté");
                return undefined;
            }
        });

        const seuilReussite = computed(() => {
            ajustement.value = +ajustement.value;
            if (energieDementielle.value) {
                energieDementielle.value = +energieDementielle.value;
                // Seuil Energie Démentielle : au maximum on peut atteindre un seuil de réussite de 16
                return Math.min(Math.max(16, valorisationATester.value + ajustement.value), +valorisationATester.value + ajustement.value + energieDementielle.value);
            } else {
                return +valorisationATester.value + ajustement.value;
            }
        });

        const recommencerActionPossible = computed(() => {
            // est-ce que le personnage a au moins 1 pt de crise ?
            if (perso.value.pointsDeCrise === 0) return false;
            // est-ce que l'action s'est terminée sur un échec ou échec critique ?
            const csq = consequence.value;
            if (csq !== ECHEC && csq !== ECHEC_CRITIQUE) return false;
            // est-ce que l'on n'a pas déjà recommencé l'action ?
            if (actionDejaRecommencee.value) return false;

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
        });

        const consequence = computed(() => {
            premierJet.value= +premierJet.value;
            deuxiemeJet.value= +deuxiemeJet.value;
            critique.value = false;
            demandeConfirmationCritique.value = false;
            if (nbJet1.value === 0) {
                return "succès ou échec... ?";
            } else if (nbJet1.value === 1) {
                if (premierJet.value <= seuilReussite.value) {
                    if (nbJet2.value === 0) {
                        if (premierJet.value <= 4) {
                            demandeConfirmationCritique.value = true;
                            return SUCCES_CRITIQUE_POSSIBLE;
                        } else {
                            critique.value = false;
                            return SUCCES;
                        }
                    } else if (nbJet2.value === 1) {
                        if (premierJet.value <= 4 && deuxiemeJet.value <= seuilReussite.value) {
                            demandeConfirmationCritique.value = true;
                            critique.value = true;
                            return SUCCES_CRITIQUE;
                        } else {
                            demandeConfirmationCritique.value = true;
                            critique.value = false;
                            return SUCCES;
                        }
                    } else {
                        return TRICHE;
                    }
                } else {
                    if (nbJet2.value === 0) {
                        if (premierJet.value >= 17) {
                            demandeConfirmationCritique.value = true;
                            return ECHEC_CRITIQUE_POSSIBLE;
                        } else {
                            critique.value = false;
                            return ECHEC;
                        }
                    } else if (nbJet2.value === 1) {
                        if (premierJet.value >= 17 && deuxiemeJet.value > seuilReussite.value) {
                            demandeConfirmationCritique.value = true;
                            critique.value = true;
                            return ECHEC_CRITIQUE;
                        } else {
                            demandeConfirmationCritique.value = true;
                            critique.value = false;
                            return ECHEC;
                        }
                    } else {
                        return TRICHE;
                    }
                }    
            } else {
                return TRICHE;
            }            
        });

        // methods
        const masqueTout = () => {
            ajustement.value = 0;
            critique.value = false;
            premierJet.value = 10;
            deuxiemeJet.value = 10;
            typeAjustement.value = 'ajustement';
            nbJet1.value = 0;
            nbJet2.value = 0;
            demandeConfirmationCritique.value = false;
            energieDementielle.value = undefined;
            actionDejaRecommencee.value = false;

            store.dispatch("masqueTout");
        };
        const saisitUnD20 = (numero) => {
            if (numero === 1) {
                nbJet1.value = +nbJet1.value + 1;
            } else {
                nbJet2.value = +nbJet2.value + 1;
            }
        };
        const simuleUnD20 = (numero) => {
            const res = tirerUnDe20();
            if (numero == 1) {
                premierJet.value = res;
                nbJet1.value = nbJet1.value + 1;
            } else if(numero == 2) {
                deuxiemeJet.value = res;
                nbJet2.value = nbJet2.value + 1;
            } else {
                return res;
            }
        };
        const valide = () => {
            // journaliser
            const ligneJournal = `Jet de ${etatJet.value.type} sur ${etatJet.value.nom} avec ${typeAjustement.value}=${ajustement.value} : (${premierJet.value}) ${demandeConfirmationCritique.value ? '('+deuxiemeJet.value+')' : ''} ${consequence.value}.`;
            store.commit("ajouteLigneJournal", ligneJournal);
            const csq = consequence.value;
            // modifier perso.value éventuellement
            if (etatJet.value.type === 'compétence' 
                    && seuilReussite.value <= 10 
                    && (csq === SUCCES || csq === SUCCES_CRITIQUE)) {
                store.commit("marqueCroixExperience", etatJet.value.nom);
            }

            // il faut payer les conséquence si on avait utilisé 1 ou 2 effets démentiels sur un jet échoué.
            if (csq === ECHEC || csq === ECHEC_CRITIQUE) {
                if (energieDementielle.value && !actionDejaRecommencee.value) {
                    // si on a utilisé uniquement 1 effet démentiel et pas les 2
                    store.dispatch('apresEchecJetAvecEnergieDementielle');
                } else if (!energieDementielle.value && actionDejaRecommencee.value) {
                    // si on a utilisé uniquement 1 effet démentiel et pas les 2
                    store.dispatch('apresEchecJetAvecRecommencerAction');
                } else if (energieDementielle.value && actionDejaRecommencee.value) {
                    // DOUBLE conséquence Effets Démentiels
                    store.dispatch('apresEchecJetAvecEnergieDementiellePuisRecommencerAction');
                }
            } 

            masqueTout();
        };
        const ajouteEnergieDementiellePlus3 = () => {
            energieDementielle.value = +3;
        };
        const ajouteEnergieDementiellePlus1D6 = () => {
            energieDementielle.value = +tirerUnDe6();
        };
        const recommenceAction = () => {
            actionDejaRecommencee.value = true;
            nbJet1.value = 0;
            nbJet2.value = 0;
        };

        return {
            // computed
            valorisationATester,
            seuilReussite,
            recommencerActionPossible,
            consequence,
            // computed store state
            mode,
            perso,
            etatJet,
            hiddenPopupJet,
            // methods
            masqueTout,
            simuleUnD20,
            saisitUnD20,
            valide,
            ajouteEnergieDementiellePlus3,
            ajouteEnergieDementiellePlus1D6,
            recommenceAction,
            // data
            ajustement,
            critique,
            premierJet,
            deuxiemeJet,
            typeAjustement,
            nbJet1,
            nbJet2,
            demandeConfirmationCritique,
            actionDejaRecommencee,
            energieDementielle,
        };
    },
    template: `
<div :class="'popup popup-jet '+(hiddenPopupJet ? 'hidden' : '')">
    <h3>Faire un Jet de {{ etatJet.type }}</h3>
    <button class="abs-top-right-10" @click="masqueTout">X</button>
    <div class="contents">
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
    <button class="valide" @click="valide">Valider</button>
    <button class="annule" @click="masqueTout">Annuler</button>
</div>
`,
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],
};