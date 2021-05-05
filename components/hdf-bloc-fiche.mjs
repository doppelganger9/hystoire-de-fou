// @ts-check
export const BlocFicheComponent = {
    props: ['title', 'cssClass'],
    template: `
    <div class="bloc" :class="[cssClass]">
        <h2>{{ title }}</h2>
        <slot></slot>
    </div>
    `,
};