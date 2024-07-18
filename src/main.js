import "@mdi/font/css/materialdesignicons.css";
import "bootstrap";
import { createApp } from "vue";
import "vuetify/styles";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Vue3Toasity, {
    theme: "auto",
    type: "default",
    autoClose: 1000,
    // hideProgressBar: true,
    transition: "slide",
    dangerouslyHTMLString: true,
  })
  .mount("#app");
