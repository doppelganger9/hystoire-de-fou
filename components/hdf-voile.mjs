//@ts-check
import { mapState } from "vuex";

export const VoileComponent = {
    computed: {
        ...mapState([ 'hiddenVoile' ]),
        voileClass() {
            return this.hiddenVoile ? 'voile hidden' : 'voile';
        },
    },
    methods: {
        masqueTout() {
            this.$store.dispatch('masqueTout');
        }
    },
    template: `
<div 
    :class="voileClass" 
    @click.prevent.stop="masqueTout">
</div>
`,
};