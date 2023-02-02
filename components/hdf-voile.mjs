//@ts-check
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

export const VoileComponent = {
    setup() {
        console.log('VoileComponent setup');
        const store = useStore();
        const voileClass = computed(() => {
            return hiddenVoile.value ? 'voile hidden' : 'voile';
        });
        onMounted(() => {
            console.log('mounted, VoileComponent');
        });
        const hiddenVoile = computed(() => store.state['hiddenVoile']);
        
        const masqueTout = () => {
            store.dispatch('masqueTout');
        }

        return {
            // computed
            voileClass,
            // computed state
            hiddenVoile,
            // methodes
            masqueTout,
        };
    },
    template: `
<div 
    :class="voileClass" 
    @click.prevent.stop="masqueTout">
</div>
`, styles: [`
.voile {
    height: 100%;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0;
    background-color: rgba(1,1,1,.6);
    z-index: 1;
}
.hidden {
    visibility: hidden;
}
.visible {
    visibility: visible;
}    
`],
};