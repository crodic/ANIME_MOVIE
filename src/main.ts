import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import router from './router'
import { useSessionStore } from './stores/session'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(head)
app.use(VueQueryPlugin)
app.use(pinia)
app.use(router)

pinia.use(piniaPluginPersistedstate)

const sessionStore = useSessionStore()

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    next({ name: 'login' })
  } else if ((to.path === '/dang-nhap' || to.path === '/dang-ky') && sessionStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

app.mount('#app')
