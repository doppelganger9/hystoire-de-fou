import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js"
import { ContextePersonnage } from "./fiche-personnage.mjs"
import { habillerALaSaintFrusquin } from "./saint-frusquin.mjs";


export const app = new Vue({
    el: '#app',
    data: {
        perso: new ContextePersonnage(),
    },
    methods: {
        genererEquipementSaintFrusquin: function() {
            this.perso.equipements = habillerALaSaintFrusquin();
        },
    }
});

