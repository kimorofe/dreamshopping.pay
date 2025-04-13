<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Menu Navigation -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="activeCategory = category"
          :class="[
            'px-6 py-2 rounded-full font-semibold transition duration-300',
            activeCategory === category 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ $t(`menu.categories.${category}`) }}
        </button>
      </div>

      <!-- Search and Filter -->
      <div class="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="$t('menu.searchPlaceholder')"
          class="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
        <select
          v-model="sortBy"
          class="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="name">{{ $t('menu.sort.name') }}</option>
          <option value="price">{{ $t('menu.sort.price') }}</option>
        </select>
      </div>

      <!-- Menu Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="item in filteredItems" 
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
        >
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover">
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-semibold dark:text-white">{{ item.name }}</h3>
              <span class="text-primary-500 font-bold">${{ item.price.toFixed(2) }}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ item.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.category }}</span>
              <button 
                class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full text-sm transition duration-300"
                @click="addToCart(item)"
              >
                {{ $t('menu.addToCart') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      categories: ['all', 'food', 'beverages', 'desserts'],
      activeCategory: 'all',
      searchQuery: '',
      sortBy: 'name',
      menuItems: [
        {
          id: 1,
          name: 'Classic Burger | برجر كلاسيك',
          description: 'Juicy beef patty with fresh vegetables and our special sauce | لحم بقري عصير مع خضروات طازجة وصلصتنا الخاصة',
          price: 12.99,
          category: 'food',
          image: '/src/assets/images/burger.jpg'
        },
        {
          id: 2,
          name: 'Margherita Pizza | بيتزا مارجريتا',
          description: 'Fresh tomatoes, mozzarella, and basil on our homemade crust | طماطم طازجة وجبنة موتزاريلا وريحان على عجينتنا المنزلية',
          price: 14.99,
          category: 'food',
          image: '/src/assets/images/pizza.jpg'
        },
        {
          id: 3,
          name: 'Grilled Chicken | دجاج مشوي',
          description: 'Marinated grilled chicken with herbs and special spices | دجاج مشوي متبل بالأعشاب والتوابل الخاصة',
          price: 16.99,
          category: 'food',
          image: '/src/assets/images/grilled-chicken.jpg'
        },
        {
          id: 4,
          name: 'Seafood Pasta | باستا مأكولات بحرية',
          description: 'Fresh seafood with creamy sauce and pasta | مأكولات بحرية طازجة مع صلصة كريمية وباستا',
          price: 18.99,
          category: 'food',
          image: '/src/assets/images/seafood-pasta.jpg'
        },
        {
          id: 5,
          name: 'Fresh Lemonade | ليموناضة طازجة',
          description: 'Homemade lemonade with fresh mint leaves | ليموناضة منزلية مع أوراق النعناع الطازجة',
          price: 4.99,
          category: 'beverages',
          image: '/src/assets/images/lemonade.jpg'
        },
        {
          id: 6,
          name: 'Mango Smoothie | سموذي المانجو',
          description: 'Fresh mango smoothie with cream | سموذي المانجو الطازج مع الكريمة',
          price: 5.99,
          category: 'beverages',
          image: '/src/assets/images/mango-smoothie.jpg'
        },
        {
          id: 7,
          name: 'Turkish Coffee | قهوة تركية',
          description: 'Traditional Turkish coffee | قهوة تركية تقليدية',
          price: 3.99,
          category: 'beverages',
          image: '/src/assets/images/turkish-coffee.jpg'
        },
        {
          id: 8,
          name: 'Chocolate Cake | كيك شوكولاتة',
          description: 'Rich chocolate cake with vanilla ice cream | كيك شوكولاتة غني مع آيس كريم فانيليا',
          price: 6.99,
          category: 'desserts',
          image: '/src/assets/images/cake.jpg'
        },
        {
          id: 9,
          name: 'Kunafa | كنافة',
          description: 'Traditional Middle Eastern dessert with cheese and syrup | حلوى شرقية تقليدية بالجبنة والقطر',
          price: 7.99,
          category: 'desserts',
          image: '/src/assets/images/kunafa.jpg'
        },
        {
          id: 10,
          name: 'Ice Cream Selection | تشكيلة آيس كريم',
          description: 'Various flavors of premium ice cream | نكهات متنوعة من الآيس كريم الفاخر',
          price: 5.99,
          category: 'desserts',
          image: '/src/assets/images/ice-cream.jpg'
        }
      ]
    }
  },
  computed: {
    filteredItems() {
      let items = this.menuItems

      // Filter by category
      if (this.activeCategory !== 'all') {
        items = items.filter(item => item.category === this.activeCategory)
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        items = items.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        )
      }

      // Sort items
      items.sort((a, b) => {
        if (this.sortBy === 'price') {
          return a.price - b.price
        }
        return a.name.localeCompare(b.name)
      })

      return items
    }
  },
  methods: {
    addToCart(item) {
      // Implement cart functionality
      console.log('Added to cart:', item.name)
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