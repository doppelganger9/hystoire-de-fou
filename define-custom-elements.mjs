import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue';

// see https://stackoverflow.com/a/69820280
// https://stackblitz.com/edit/vue3-custom-elements-with-plugins

export const defineCustomElementWrapper = (component, { plugins = [] } = {}) =>
  VueDefineCustomElement({
    render: () => h(component),
    setup() {
      const app = createApp();

      // install plugins
      plugins.forEach(app.use);

      app.mixin({
        mounted() {
          const insertStyles = (styles) => {
            if (styles?.length) {
              this.__style = document.createElement('style');
              this.__style.innerText = styles.join().replace(/\n/g, '');
              this.$el.parentNode.prepend(this.__style);
            }
          }

          // load own styles
          insertStyles(this.$?.type.styles);

          // load styles of child components
          if (this.$options.components) {
            for (const comp of Object.values(this.$options.components)) {
              insertStyles(comp.styles);
            }
          }
        },
        unmounted() {
          this.__style?.remove();
        },
      });

      const inst = getCurrentInstance();
      Object.assign(inst.appContext, app._context);
      Object.assign(inst.provides, app._context.provides);
    },
  });