//@ts-check
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { allStyles } from "../styles/all.mjs";

export const MenuLancementComponent = {
  setup() {
    const store = useStore();

    const mode = computed(() => store.state['mode']);

    const sauvegardePerso = () => {
      store.commit('sauvegardePerso');
    };
    const chargePerso = () => {
      store.dispatch('chargePersonnage');
    };
    const creeNouveauPerso = () => {
      store.commit('passerEnMode', 'création');
    };
    onMounted(() => {
      console.log('MenuLancementComponent mounted');
    });

    return {
        // computed
        // computed state
        mode,
        // methods
        sauvegardePerso,
        chargePerso,
        creeNouveauPerso,
        // data
    };
  },
  template: `
<div class="menu">
  <button v-if="mode === 'jeu'" @click="sauvegardePerso">
    Sauvegarder le personnage actuel
  </button>
  <button v-if="mode==='menu'" @click="chargePerso">
    Charger un personnage et jouer
  </button>
  <button v-if="mode==='menu'" @click="creeNouveauPerso">
    Créer un nouveau personnage
  </button>
</div>
`,
  styles: [
    allStyles // TODO n'importer que les styles de ce composant ?
  ],
};