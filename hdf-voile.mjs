//@ts-check
export const VoileComponent = {
    props: [ 'hidden' ],
    computed: {
        voileClass() {
            return this.hidden ? 'voile hidden' : 'voile';
        }
    },
    methods: {
        masqueTout() {
            this.$emit('masque-tout');
        }
    },
    template: `
<div 
    :class="voileClass" 
    @click.prevent.stop="masqueTout">
</div>
`,
};