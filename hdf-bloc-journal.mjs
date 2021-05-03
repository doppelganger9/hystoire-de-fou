//@ts-check
import { mapState } from "https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.esm.browser.js";

export const BlocJournalComponent = {
    computed: {
        ...mapState([ 'journal' ]),
    },
    template: `
<hdf-bloc-fiche titre="Journal">
    <ul class="journal">
        <li v-for="item of journal">{{ item }}</li>
    </ul>
</hdf-bloc-fiche>
`,
};