import '@/assets/css/global.scss'
import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import i18n from "@/i18n/index.js";


createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
