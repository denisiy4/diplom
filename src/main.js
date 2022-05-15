import { createApp } from 'vue'

import {storage} from "./services/storage"

import App from './app.vue'
import { router } from './router/router';
import './main.css'

storage.init()

const app = createApp(App)

app.use(router)
app.mount('#app')
