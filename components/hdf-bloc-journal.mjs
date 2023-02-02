//@ts-check
import { mapState } from "vuex";

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