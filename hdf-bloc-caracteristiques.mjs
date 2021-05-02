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
    },
    template: `
<hdf-bloc-fiche :title="title">
    <p v-if="mode === 'création'">Points restant à répartir : {{ perso.pointsCaracteristiqueRestant }}</p>
    
    <div>
        <label for="perso.volonte">VOLONTE :</label>
        <button v-on:click="afficheInfos('volonté')">Infos</button>
        <input name="perso.volonte" v-model="perso.volonte" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.intellect">INTELLECT :</label>
        <button v-on:click="afficheInfos('intellect')">Infos</button>
        <input name="perso.intellect" v-model="perso.intellect" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.sensitif">SENSITIF :</label>
        <button v-on:click="afficheInfos('sensitif')">Infos</button>
        <input name="perso.sensitif" v-model="perso.sensitif" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.entendement">Entendement :</label>
        <button v-on:click="afficheInfos('entendement')">Infos</button>
        <input name="perso.entendement" readonly="readonly" :value="perso.entendement">
        <br/>
    </div>
    <div>
        <label for="perso.charisme">CHARISME :</label>
        <button v-on:click="afficheInfos('charisme')">Infos</button>
        <input name="perso.charisme" v-model="perso.charisme" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.constitution">CONSTITUTION :</label>
        <button v-on:click="afficheInfos('constitution')">Infos</button>
        <input name="perso.constitution" v-model="perso.constitution" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.perception">PERCEPTION :</label>
        <button v-on:click="afficheInfos('perception')">Infos</button>
        <input name="perso.perception" v-model="perso.perception" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
    <div>
        <label for="perso.agilite">AGILITE :</label>
        <button v-on:click="afficheInfos('agilité')">Infos</button>
        <input name="perso.agilite" v-model="perso.agilite" type="number" :readonly="mode==='jeu'" min="6" max="15">
        <br/>
    </div>
</hdf-bloc-fiche>
    `,
};