//@ts-check

export const BlocSanteMentaleComponent = {
    props: [ 'mode', 'perso' ],
    data: function() {
        return {

        };
    },
    methods: {
        
    },
    template: `
<hdf-bloc-fiche title="Santé Mentale">
    <div>
        <label for="perso.motDeDemence">Mot de Démence :</label>
        <input name="perso.motDeDemence" v-model="perso.motDeDemence" type="text" placeholder="Mot de démence du personnage" :readonly="mode==='jeu'">
        <br/>
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.tendance">Tendance :</label>
        <input name="perso.tendance" readonly="readonly" :value="perso.tendance">
        <br/>
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.totalAccomplissement">Total Accomplissement :</label>
        <input name="perso.totalAccomplissement" v-model="perso.totalAccomplissement" type="number" min="0" class="handwritten">
        <br/>
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.niveauAccomplissement">Niveau Accomplissement :</label>
        <input name="perso.niveauAccomplissement" readonly="readonly" :value="perso.niveauAccomplissement" type="number">
        <br/>
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.pointsDeCrise">Points de Crise :</label>
        <input name="perso.pointsDeCrise" v-model="perso.pointsDeCrise" type="number" min="0">
        <br/>
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.chocsParano">Chocs Parano :</label>
        <input name="perso.chocsParano" v-model="perso.chocsParano" type="number" min="0">
        <br/>
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.chocsSchizo">Chocs Schizo :</label>
        <input name="perso.chocsSchizo" v-model="perso.chocsSchizo" type="number" min="0">
        <br/>
    </div>
    <div v-if="mode==='jeu'">
        <label for="perso.chocsProfonds">Chocs Profonds :</label>
        <input name="perso.chocsProfonds" v-model="perso.chocsProfonds" type="number" min="0">
        <br/>
    </div>
</hdf-bloc-fiche>
`,
};