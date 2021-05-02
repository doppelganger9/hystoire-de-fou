//@ts-check

export const PopupInfosComponent = {
    props: [ 'hidden', 'infos' ],
    methods: {
        masqueInfos: function() {
            this.$emit("masque-infos");
        }
    },
    computed: {
        popupDivClass: function() {
            return 'popup '+(this.hidden ? 'hidden' : '');
        }
    },
    template: `
<div :class="popupDivClass">
    <button class="abs-top-right-10" @click="masqueInfos">X</button>
    <div class="contents" v-html="infos"></div>
    <button @click="masqueInfos">Fermer</button>
</div>
`,
};