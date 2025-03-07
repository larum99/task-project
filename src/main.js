import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap
import 'bootstrap'; // JS de Bootstrap

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

