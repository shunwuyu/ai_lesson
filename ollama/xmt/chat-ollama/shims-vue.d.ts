declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import { NuxtApp } from '@nuxt/types/app';

declare module '@nuxt/types' {
  interface Context {
    $config: NuxtApp['$config'];
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config: NuxtApp['$config'];
  }
}

declare module 'vue-router' {
  export * from '@nuxtjs/composition-api';
}

declare module '@nuxtjs/composition-api' {
  export * from 'vue';
  export * from 'vue-router';
}

import { I18n, VueMessageType } from 'vue-i18n';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $i18n: I18n<VueMessageType>;
  }
}