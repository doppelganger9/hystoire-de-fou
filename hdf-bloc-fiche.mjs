// @ts-check
export const BlocFicheComponent = {
    props: ['title'],
    template: `
    <div class="bloc">
        <h2>{{ title }}</h2>
        <slot></slot>
    </div>
    `,
};