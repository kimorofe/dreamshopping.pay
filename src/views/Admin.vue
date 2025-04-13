<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8 dark:text-white">{{ $t('admin.title') }}</h1>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-6 py-2 rounded-full font-semibold transition duration-300',
            activeTab === tab 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ $t(`admin.tabs.${tab}`) }}
        </button>
      </div>

      <!-- Menu Items Management -->
      <div v-if="activeTab === 'menu'" class="space-y-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold dark:text-white">{{ $t('admin.menuItems') }}</h2>
          <button 
            @click="showAddItemForm = true"
            class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            {{ $t('admin.addItem') }}
          </button>
        </div>

        <!-- Menu Items Table -->
        <div class="overflow-x-auto">
          <table class="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="px-6 py-3 text-left">{{ $t('admin.name') }}</th>
                <th class="px-6 py-3 text-left">{{ $t('admin.category') }}</th>
                <th class="px-6 py-3 text-left">{{ $t('admin.price') }}</th>
                <th class="px-6 py-3 text-left">{{ $t('admin.actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in menuItems" :key="item.id" class="border-t dark:border-gray-700">
                <td class="px-6 py-4 dark:text-white">{{ item.name }}</td>
                <td class="px-6 py-4 dark:text-white">{{ item.category }}</td>
                <td class="px-6 py-4 dark:text-white">${{ item.price }}</td>
                <td class="px-6 py-4">
                  <button 
                    @click="editItem(item)"
                    class="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    {{ $t('admin.edit') }}
                  </button>
                  <button 
                    @click="deleteItem(item.id)"
                    class="text-red-500 hover:text-red-700"
                  >
                    {{ $t('admin.delete') }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Offers Management -->
      <div v-if="activeTab === 'offers'" class="space-y-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold dark:text-white">{{ $t('admin.offers') }}</h2>
          <button 
            @click="showAddOfferForm = true"
            class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            {{ $t('admin.addOffer') }}
          </button>
        </div>

        <!-- Offers Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="offer in offers" 
            :key="offer.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold dark:text-white">{{ offer.title }}</h3>
              <div class="space-x-2">
                <button 
                  @click="editOffer(offer)"
                  class="text-blue-500 hover:text-blue-700"
                >
                  {{ $t('admin.edit') }}
                </button>
                <button 
                  @click="deleteOffer(offer.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  {{ $t('admin.delete') }}
                </button>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-2">{{ offer.description }}</p>
            <p class="text-primary-500 font-bold">${{ offer.price }}</p>
          </div>
        </div>
      </div>

      <!-- Language Management -->
      <div v-if="activeTab === 'languages'" class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-6 dark:text-white">{{ $t('admin.translations') }}</h2>
          
          <!-- Language Selector -->
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-300 mb-2">{{ $t('admin.selectLanguage') }}</label>
            <select 
              v-model="selectedLanguage"
              class="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <!-- Translation Editor -->
          <div class="space-y-4">
            <div v-for="(value, key) in translations[selectedLanguage]" :key="key" class="space-y-2">
              <label class="block text-gray-700 dark:text-gray-300">{{ key }}</label>
              <input 
                type="text"
                v-model="translations[selectedLanguage][key]"
                class="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
            </div>
          </div>

          <!-- Save Changes Button -->
          <button 
            @click="saveTranslations"
            class="mt-6 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full transition duration-300"
          >
            {{ $t('admin.saveChanges') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      tabs: ['menu', 'offers', 'languages'],
      activeTab: 'menu',
      showAddItemForm: false,
      showAddOfferForm: false,
      selectedLanguage: 'en',
      menuItems: [
        {
          id: 1,
          name: 'Classic Burger',
          category: 'food',
          price: 12.99
        },
        {
          id: 2,
          name: 'Fresh Lemonade',
          category: 'beverages',
          price: 4.99
        }
      ],
      offers: [
        {
          id: 1,
          title: 'Family Feast',
          description: '2 Large Pizzas + 4 Drinks + 2 Sides',
          price: 49.99
        },
        {
          id: 2,
          title: 'Lunch Special',
          description: 'Any Main Course + Drink + Dessert',
          price: 24.99
        }
      ],
      translations: {
        en: {
          'home.welcome': 'Welcome to Joker Restaurant',
          'home.tagline': 'Experience the finest dining',
          'menu.categories.all': 'All Items',
          'menu.categories.food': 'Food',
          'menu.categories.beverages': 'Beverages'
        },
        ar: {
          'home.welcome': 'مرحباً بكم في مطعم جوكر',
          'home.tagline': 'استمتع بأفضل تجربة طعام',
          'menu.categories.all': 'جميع العناصر',
          'menu.categories.food': 'الطعام',
          'menu.categories.beverages': 'المشروبات'
        }
      }
    }
  },
  methods: {
    editItem(item) {
      // Implement edit functionality
      console.log('Edit item:', item)
    },
    deleteItem(id) {
      // Implement delete functionality
      console.log('Delete item:', id)
    },
    editOffer(offer) {
      // Implement edit functionality
      console.log('Edit offer:', offer)
    },
    deleteOffer(id) {
      // Implement delete functionality
      console.log('Delete offer:', id)
    },
    saveTranslations() {
      // Implement save translations functionality
      console.log('Save translations:', this.translations)
    }
  }
}
</script>

<style scoped>
.bg-primary-500 {
  background-color: var(--primary-color);
}

.text-primary-500 {
  color: var(--primary-color);
}

.hover\:bg-primary-600:hover {
  background-color: var(--primary-color-dark);
}
</style>