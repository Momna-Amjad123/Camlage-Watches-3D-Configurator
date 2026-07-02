<script setup>
import { computed } from 'vue'
import { globalState } from '../store.js'

const calculateTotal = computed(() => {
  return globalState.cart.reduce((sum, item) => sum + item.price, 0)
})
</script>

<template>
  <section class="pt-16 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
    <h2 class="text-4xl font-display mb-12">Your <span class="text-[#c9a24b]">cart</span></h2>

    <div v-if="globalState.cart.length === 0" class="text-center py-32 border border-dashed border-white/20">
      <p class="text-gray-500 font-display tracking-widest uppercase mb-6">Your cart is empty.</p>
      <router-link to="/products" class="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#c9a24b] hover:text-white transition-colors">Continue shopping</router-link>
    </div>

    <div v-else>
      <div v-for="(item, index) in globalState.cart" :key="index" class="flex items-center justify-between bg-[#0a0a0a] p-6 mb-6 border border-white/10">
        <div class="flex items-center gap-8">
          <div class="w-24 h-24 bg-[#050505] flex items-center justify-center p-2 border border-white/5">
            <img :src="item.image" class="max-h-full opacity-80 mix-blend-lighten">
          </div>
          <div>
            <h3 class="font-bold uppercase text-xl tracking-tight mb-1">{{ item.name }}</h3>
            <p class="text-xs text-[#c9a24b] font-bold tracking-widest uppercase">{{ item.customizedColor || 'Standard color' }}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-display font-bold text-2xl mb-2">${{ item.price }}.00</p>
          <button @click="globalState.cart.splice(index, 1)" class="text-xs text-gray-500 hover:text-[#c9a24b] uppercase tracking-widest transition-colors">Remove</button>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-white/20 flex justify-between items-center">
        <span class="text-gray-400 uppercase tracking-widest text-sm">Total</span>
        <span class="text-4xl font-display font-bold">${{ calculateTotal }}.00</span>
      </div>
      <div class="mt-10 text-right">
        <button @click="globalState.showToast('Order placed')" class="px-16 py-6 bg-[#c9a24b] text-black font-display font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  </section>
</template>
