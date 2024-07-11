import '@mdi/font/css/materialdesignicons.css';
import 'bootstrap';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import App from './App.vue';
import './index.css';
import router from './router';
import store from './store';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
                primary: '#1976D2',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
            }  
          },
        },
      },
  } , 
)
  
createApp(App).use(vuetify).use(store).use(router).mount('#app');