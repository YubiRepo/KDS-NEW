import '@mdi/font/css/materialdesignicons.css';
import 'bootstrap';
import { createApp } from 'vue';
import 'vuetify/styles';
import App from './App.vue';
import './index.css';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
