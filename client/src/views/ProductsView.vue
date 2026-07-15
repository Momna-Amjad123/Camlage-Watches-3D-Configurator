<script setup>
import { computed, ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { globalState } from '../store.js'

const activeFilter = ref('All')
const filters = ['All', 'Dress', 'Sport']

const filtered = computed(() => {
  if (activeFilter.value === 'All') return globalState.products
  return globalState.products.filter(p => p.category === activeFilter.value)
})

const handleAddToCart = (product) => globalState.addToCart(product._id, null, null)
</script>

<template>
  <section class="pt-16 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
    <div class="mb-10 border-l-4 border-[#c9a24b] pl-6">
      <h2 class="text-4xl font-display text-white">Our watches</h2>
      <p class="text-gray-500 mt-2 font-light tracking-wide">Pick a watch below and make it yours.</p>
    </div>

    <div class="flex gap-3 mb-10">
      <button
        v-for="f in filters"
        :key="f"
        @click="activeFilter = f"
        class="px-5 py-2 text-xs tracking-wide border transition-colors"
        :class="activeFilter === f ? 'bg-[#c9a24b] text-black border-[#c9a24b]' : 'border-white/20 text-gray-400 hover:border-white/50'"
      >{{ f }}</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProductCard
        v-for="item in filtered"
        :key="item._id"
        :product="item"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </section>
</template>