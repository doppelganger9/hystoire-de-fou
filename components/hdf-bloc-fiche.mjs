import { allStyles } from "../styles/all.mjs";

// @ts-check
export const BlocFicheComponent = {
    props: ['title', 'cssClass'],
    template: `
    <div class="bloc" :class="[cssClass]">
        <h2>{{ title }}</h2>
        <slot></slot>
    </div>
    `,
    styles: [
        allStyles // TODO n'importer que les styles de ce composant ?
    ],

};