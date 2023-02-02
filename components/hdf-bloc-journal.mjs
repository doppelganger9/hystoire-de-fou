//@ts-check
import { useStore } from "vuex";
import { computed } from "vue";
import { allStyles } from "../styles/all.mjs";

export const BlocJournalComponent = {
    setup() {
        const store = useStore();

        const journal = computed(() => store.state['journal']);

        return {
            // computed state
            journal,
        };
    },
    template: `
<hdf-bloc-fiche title="Journal">
    <ul v-if="journal.length" class="journal">
        <li v-for="ligne of journal">{{ ligne }}</li>
    </ul>
    <p v-else>Vide</p>
</hdf-bloc-fiche>
`,
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],

};