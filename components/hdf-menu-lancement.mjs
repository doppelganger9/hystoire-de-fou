//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const MenuLancementComponent = {
  computed: {
    ...mapState(['mode']),
  },
  methods: {
    sauvegardePerso: function() {
      this.$store.commit('sauvegardePerso');
    },
    chargePerso: function() {
      this.$store.dispatch('chargePersonnage');
    },
    creeNouveauPerso() {
      this.$store.commit('passerEnMode', 'création');
    },
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
`
};