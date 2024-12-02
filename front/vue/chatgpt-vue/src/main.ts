import { createApp } from "vue";
import "./assets/tailwind.css";
import App from "./App.vue";
import router from "./router";
import "@icon-park/vue-next/styles/index.css";
import "highlight.js/styles/dark.css";

const app = createApp(App);

app
    .use(router)
    .mount("#app");