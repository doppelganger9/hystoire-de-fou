// @ts-check
import { infosCaracteristiques } from "./fiche-personnage.mjs";

export const BlocCaracteristiquesComponent = {
    props: [ 'mode', 'perso' ],
    data: function() {
        return {

        };
    },
    computed: {
        title() {
            return `Caractéristiques (mode ${this.mode})`;
        },
    },
    methods: {
        afficheInfos: function(typeInfos) {
            this.infos = infosCaracteristiques[typeInfos];
            this.$emit("affiche-infos", this.infos);
        },
        clickedCaracteristique: function(nomCaracteristique) {
            this.$emit("click-caracteristique", { nom:nomCaracteristique, type:'caracteristique'});
        },
    },
    template: `
<hdf-bloc-fiche :title="title">
    <p v-if="mode === 'création'">Points restant à répartir : {{ perso.pointsCaracteristiqueRestant }}</p>
    
    <div>
        <label for="perso.volonte" @click="clickedCaracteristique('volonte')">VOLONTE :</label>
        <button @click="afficheInfos('volonté')">Infos</button>
        <input name="perso.volonte" v-model="perso.volonte" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.intellect" @click="clickedCaracteristique('intellect')">INTELLECT :</label>
        <button @click="afficheInfos('intellect')">Infos</button>
        <input name="perso.intellect" v-model="perso.intellect" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.sensitif" @click="clickedCaracteristique('sensitif')">SENSITIF :</label>
        <button @click="afficheInfos('sensitif')">Infos</button>
        <input name="perso.sensitif" v-model="perso.sensitif" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.entendement" @click="clickedCaracteristique('entendement')">Entendement :</label>
        <button @click="afficheInfos('entendement')">Infos</button>
        <input name="perso.entendement" readonly="readonly" :value="perso.entendement">
        <br/>
    </div>
    <div>
        <label for="perso.charisme" @click="clickedCaracteristique('charisme')">CHARISME :</label>
        <button @click="afficheInfos('charisme')">Infos</button>
        <input name="perso.charisme" v-model="perso.charisme" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.constitution" @click="clickedCaracteristique('constitution')">CONSTITUTION :</label>
        <button @click="afficheInfos('constitution')">Infos</button>
        <input name="perso.constitution" v-model="perso.constitution" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.perception" @click="clickedCaracteristique('perception')">PERCEPTION :</label>
        <button @click="afficheInfos('perception')">Infos</button>
        <input name="perso.perception" v-model="perso.perception" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.agilite" @click="clickedCaracteristique('agilite')">AGILITE :</label>
        <button @click="afficheInfos('agilité')">Infos</button>
        <input name="perso.agilite" v-model="perso.agilite" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
</hdf-bloc-fiche>
    `,
};