import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js"
import { ContextePersonnage } from "./fiche-personnage.mjs"


export const app = new Vue({
    el: '#app',
    data: {
        perso: new ContextePersonnage(),
    }
});

