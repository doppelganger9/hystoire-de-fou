//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const PopupInfosComponent = {
    methods: {
        masqueInfos: function() {
            this.$store.dispatch("masqueTout");
        }
    },
    computed: {
        ...mapState([ 'hiddenInfos', 'infos' ]),
        popupDivClass: function() {
            return 'popup '+(this.hiddenInfos ? 'hidden' : '');
        }
    },
    template: `
<div :class="popupDivClass">
    <button class="abs-top-right-10" @click="masqueInfos">X</button>
    <div class="contents" v-html="infos"></div>
    <button @click="masqueInfos">Fermer</button>
</div>
`,
};