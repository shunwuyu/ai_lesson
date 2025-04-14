import { createI18n } from 'vue-i18n';
import en from './locales/en';
import zh from './locales/zh';
import ja from './locales/ja';

const i18n = createI18n({
  legacy: false, // 如果使用 Composition API，需要设置为 false
  locale: 'en', // 设置默认语言
  messages: {
    en,
    zh,
    ja
  }
});

export default i18n;