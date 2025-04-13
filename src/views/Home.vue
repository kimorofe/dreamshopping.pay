<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative h-96 bg-cover bg-center" style="background-image: url('/src/assets/images/hero-bg.jpg')">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative h-full flex items-center justify-center text-center">
        <div class="text-white">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ $t('home.welcome') }}</h1>
          <p class="text-xl mb-8">{{ $t('home.tagline') }}</p>
          <router-link to="/menu" class="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300">
            {{ $t('home.viewMenu') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Food Section -->
    <section class="py-16 px-4">
      <h2 class="text-3xl font-bold text-center mb-12 dark:text-white">{{ $t('home.foodSection') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div v-for="item in foodItems" :key="item.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ item.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ item.description }}</p>
            <p class="text-primary-500 font-bold mt-2">${{ item.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Beverages Section -->
    <section class="py-16 px-4 bg-gray-100 dark:bg-gray-800">
      <h2 class="text-3xl font-bold text-center mb-12 dark:text-white">{{ $t('home.beverageSection') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div v-for="item in beverageItems" :key="item.id" class="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ item.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ item.description }}</p>
            <p class="text-primary-500 font-bold mt-2">${{ item.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Offers Section -->
    <section class="py-16 px-4">
      <h2 class="text-3xl font-bold text-center mb-12 dark:text-white">{{ $t('home.specialOffers') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div v-for="offer in specialOffers" :key="offer.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-primary-500">
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-4 text-primary-500">{{ offer.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ offer.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-primary-500">${{ offer.price }}</span>
              <button class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full transition duration-300">
                {{ $t('home.orderNow') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      foodItems: [
        { id: 1, name: 'Classic Burger', description: 'Juicy beef patty with fresh vegetables', price: 12.99, image: '/src/assets/images/burger.jpg' },
        { id: 2, name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, and basil', price: 14.99, image: '/src/assets/images/pizza.jpg' },
        { id: 3, name: 'Caesar Salad', description: 'Crispy romaine lettuce with parmesan', price: 9.99, image: '/src/assets/images/salad.jpg' }
      ],
      beverageItems: [
        { id: 1, name: 'Fresh Lemonade', description: 'Homemade with real lemons', price: 4.99, image: '/src/assets/images/lemonade.jpg' },
        { id: 2, name: 'Iced Coffee', description: 'Premium coffee blend over ice', price: 5.99, image: '/src/assets/images/coffee.jpg' },
        { id: 3, name: 'Fruit Smoothie', description: 'Blend of seasonal fruits', price: 6.99, image: '/src/assets/images/smoothie.jpg' }
      ],
      specialOffers: [
        { id: 1, title: 'Family Feast', description: '2 Large Pizzas + 4 Drinks + 2 Sides', price: 49.99 },
        { id: 2, title: 'Lunch Special', description: 'Any Main Course + Drink + Dessert', price: 24.99 }
      ]
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

.border-primary-500 {
  border-color: var(--primary-color);
}
</style>