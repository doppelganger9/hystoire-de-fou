//@ts-check
export const BlocEtatCivilComponent = {
    props: [ 'mode', 'perso' ],
    data: function() {
        return {

        };
    },
    methods: {
        
    },
    template: `
<hdf-bloc-fiche title="Etat Civil">
    <div>
        <label for="perso.nom">Nom :</label>
        <input name="perso.nom" v-model="perso.nom" type="text" placeholder="Nom du personnage" :readonly="mode==='jeu'" class="handwritten">
        <br/>
    </div>
    <div>
        <label for="perso.profession">Profession :</label>
        <input name="perso.profession" v-model="perso.profession" type="text" placeholder="Profession du personnage" :readonly="mode==='jeu'" class="handwritten">
        <br/>
    </div>
    <div>
        <label for="perso.age">Âge :</label>
        <input name="perso.age" v-model="perso.age" type="number" min="8" max="100" placeholder="Âge du personnage" :readonly="mode==='jeu'" class="handwritten">ans
        <br/>
    </div>
    <div>
        <label for="perso.poids">Poids (kg) :</label>
        <input name="perso.poids" v-model="perso.poids" type="number" min="40" max="150" placeholder="Poids du personnage" :readonly="mode==='jeu'" class="handwritten">kg
        <br/>
    </div>
    <div>
        <label for="perso.tailleCm">Taille (cm) :</label>
        <input name="perso.tailleCm" v-model="perso.tailleCm" type="number" min="120" max="210" placeholder="Taille du personnage" :readonly="mode==='jeu'" class="handwritten">cm ({{ perso.tailleScore }})
        <br/>
    </div>
    <div>
        <label for="perso.bonusAuxDommages">+dom :</label>
        <input name="perso.bonusAuxDommages" readonly="readonly" :value="perso.bonusAuxDommages">
        <br/>
    </div>
    <div>
        <label for="perso.description">Description :</label>
        <textarea name="perso.description" v-model="perso.description" placeholder="Description du personnage" :readonly="mode==='jeu'" class="handwritten"></textarea>
        <br/>
    </div>
</hdf-bloc-fiche>
`,
};