import { createApp } from 'vue'
import APP from './index.vue'
import axios from 'axios'
import js from './js.vue'
import eventBus from 'vue3-eventbus'
const app = createApp(APP)
const JS = createApp(js)
app.use(eventBus)
app.config.globalProperties.$axios = axios

JS.mount('#st')
app.mount('#app')
