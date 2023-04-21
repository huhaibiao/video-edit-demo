/*
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-21 22:11:20
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
