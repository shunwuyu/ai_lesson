import { createApp } from 'vue';
import App from './App.vue';
import zhMessages from './locales/zh';
import enMessages from './locales/en';
import jaMessages from './locales/ja';

const messages = {
  zh: zhMessages,
  en: enMessages,
  ja: jaMessages,
};

const app = createApp(App);

app.config.globalProperties.$languages = ['zh', 'en', 'ja'];
app.config.globalProperties.$locale = 'en'; // 默认语言
app.config.globalProperties.$t = (key) => {
  const keys = key.split('.');
  let message = messages[app.config.globalProperties.$locale];
  for (let k of keys) {
    if (message[k] === undefined) return key;
    message = message[k];
  }
  return message;
};
app.config.globalProperties.switchLanguage = (lang) => {
  if (app.config.globalProperties.$languages.includes(lang)) {
    app.config.globalProperties.$locale = lang;
  }
};

app.mount('#app');