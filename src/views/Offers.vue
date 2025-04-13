<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-12 dark:text-white">{{ $t('offers.title') }}</h1>

      <!-- Featured Offers -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div 
          v-for="offer in featuredOffers" 
          :key="offer.id"
          class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-xl overflow-hidden text-white"
        >
          <div class="p-6">
            <div class="flex justify-between items-start">
              <h2 class="text-2xl font-bold mb-4">{{ offer.title }}</h2>
              <span class="text-3xl font-bold">${{ offer.price.toFixed(2) }}</span>
            </div>
            <p class="text-lg mb-4">{{ offer.description }}</p>
            <ul class="mb-6">
              <li v-for="item in offer.includes" :key="item" class="flex items-center mb-2">
                <span class="mr-2">✓</span>
                {{ item }}
              </li>
            </ul>
            <button class="w-full bg-white text-primary-500 font-bold py-3 rounded-full hover:bg-opacity-90 transition duration-300">
              {{ $t('offers.claimOffer') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Regular Offers -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="offer in regularOffers" 
          :key="offer.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-primary-500 transition-transform hover:scale-105"
        >
          <div class="p-4">
            <h3 class="text-xl font-bold mb-2 text-primary-500">{{ offer.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ offer.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-primary-500">${{ offer.price.toFixed(2) }}</span>
              <button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full transition duration-300">
                {{ $t('offers.orderNow') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Limited Time Offers -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-center mb-8 dark:text-white">{{ $t('offers.limitedTime') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="offer in limitedTimeOffers" 
            :key="offer.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-red-500"
          >
            <div class="bg-red-500 text-white py-2 px-4 text-center">
              {{ $t('offers.endsIn') }}: {{ offer.timeLeft }}
            </div>
            <div class="p-4">
              <h3 class="text-xl font-bold mb-2 text-red-500">{{ offer.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ offer.description }}</p>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-lg line-through text-gray-500">${{ offer.originalPrice.toFixed(2) }}</span>
                  <span class="text-2xl font-bold text-red-500 ml-2">${{ offer.price.toFixed(2) }}</span>
                </div>
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300">
                  {{ $t('offers.grabNow') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Offers',
  data() {
    return {
      featuredOffers: [
        {
          id: 1,
          title: 'Family Feast',
          description: 'Perfect for family gatherings',
          price: 49.99,
          includes: [
            '2 Large Pizzas',
            '4 Soft Drinks',
            '2 Side Dishes',
            'Large Dessert'
          ]
        },
        {
          id: 2,
          title: 'Party Package',
          description: 'Ideal for celebrations',
          price: 89.99,
          includes: [
            '3 Large Pizzas',
            '6 Soft Drinks',
            '3 Side Dishes',
            '2 Desserts'
          ]
        }
      ],
      regularOffers: [
        {
          id: 1,
          title: 'Lunch Special',
          description: 'Main course + Drink + Dessert',
          price: 24.99
        },
        {
          id: 2,
          title: 'Student Meal',
          description: 'Show student ID and save',
          price: 19.99
        },
        {
          id: 3,
          title: 'Couple Deal',
          description: '2 Main courses + 2 Drinks',
          price: 39.99
        }
      ],
      limitedTimeOffers: [
        {
          id: 1,
          title: 'Weekend Special',
          description: 'Premium burger + Fries + Drink',
          originalPrice: 29.99,
          price: 19.99,
          timeLeft: '2 days'
        },
        {
          id: 2,
          title: 'Happy Hour',
          description: 'All beverages 50% off',
          originalPrice: 14.99,
          price: 7.49,
          timeLeft: '5 hours'
        }
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

.from-primary-500 {
  --tw-gradient-from: var(--primary-color);
}

.to-secondary-500 {
  --tw-gradient-to: var(--secondary-color);
}
</style>