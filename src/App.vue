<template>
  <div :class="{ 'dark': $store.state.darkMode }">
    <nav class="bg-white dark:bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <span class="text-xl font-bold text-gray-800 dark:text-white">Joker Restaurant</span>
            </router-link>
            <div class="hidden md:flex items-center space-x-4 ml-10">
              <router-link to="/menu" class="nav-link">{{ $t('nav.menu') }}</router-link>
              <router-link to="/offers" class="nav-link">{{ $t('nav.offers') }}</router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="toggleLanguage" class="nav-button">
              {{ currentLanguage === 'en' ? 'عربي' : 'English' }}
            </button>
            <button @click="toggleDarkMode" class="nav-button">
              {{ $t('nav.darkMode') }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <router-view></router-view>
    </main>

    <footer class="bg-white dark:bg-gray-800 py-6">
      <div class="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        © 2023 Joker Restaurant
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentLanguage: 'en'
    }
  },
  methods: {
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en'
      this.$i18n.locale = this.currentLanguage
      document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr'
    },
    toggleDarkMode() {
      this.$store.commit('toggleDarkMode')
    }
  }
}
</script>

<style>
.nav-link {
  @apply px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white;
}

.nav-button {
  @apply px-4 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600;
}

[dir="rtl"] .space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}
</style>