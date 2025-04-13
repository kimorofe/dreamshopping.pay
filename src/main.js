import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import translations
import en from './locales/en.json'
import ar from './locales/ar.json'

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, ar }
})

// Create Vuex store
const store = createStore({
  state() {
    return {
      darkMode: false
    }
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      document.documentElement.classList.toggle('dark')
    }
  }
})

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/menu', component: () => import('./views/Menu.vue') },
    { path: '/offers', component: () => import('./views/Offers.vue') },
    { path: '/admin', component: () => import('./views/Admin.vue') }
  ]
})

// Create and mount the app
const app = createApp(App)
app.use(i18n)
app.use(store)
app.use(router)
app.mount('#app')