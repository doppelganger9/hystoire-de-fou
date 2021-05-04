//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const BlocJournalComponent = {
    computed: {
        ...mapState([ 'journal' ]),
    },
    template: `
<hdf-bloc-fiche title="Journal">
    <ul v-if="journal.length" class="journal">
        <li v-for="ligne of journal">{{ ligne }}</li>
    </ul>
    <p v-else>Vide</p>
</hdf-bloc-fiche>
`,
};