import { createApp } from 'vue'
import APP from './index.vue'
import sett from './setting.vue'
const set = createApp(sett)
import js from './js.vue'
const JS = createApp(js)
JS.mount('#st')
set.mount('#set')
