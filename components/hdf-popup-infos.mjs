//@ts-check
import { computed } from "vue";
import { useStore } from "vuex";
import { allStyles } from "../styles/all.mjs";

export const PopupInfosComponent = {
    setup() {
        const store = useStore();

        const masqueInfos = () => {
            store.dispatch("masqueTout");
        };

        const hiddenInfos = computed(() => store.state['hiddenInfos']);
        const infos = computed(() => store.state['infos']);

        const popupDivClass = computed(() => {
            return 'popup popup-infos '+(hiddenInfos.value ? 'hidden' : '');
        });

        return {
            // computed
            popupDivClass,
            // computed state
            hiddenInfos,
            infos,
            // methods
            masqueInfos,
        };
    },
    template: `
<div :class="popupDivClass">
    <h3>{{ infos.titre }}</h3>
    <button class="abs-top-right-10" @click="masqueInfos">X</button>
    <div class="contents" v-html="infos.contenuHtml"></div>
    <button class="ferme" @click="masqueInfos">Fermer</button>
</div>
`,
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],
};