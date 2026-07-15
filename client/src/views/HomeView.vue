<script setup>
import { computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { globalState } from '../store.js'

const featured = computed(() => globalState.products.slice(0, 4))
const addToCart = (p) => globalState.addToCart(p._id, null, null)
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover opacity-25">
        <div class="absolute inset-0 bg-gradient-to-r from-camlage-black via-camlage-black/70 to-transparent"></div>
      </div>
      <div class="relative z-10 px-6 md:px-16 max-w-2xl text-center flex flex-col items-center">
        <p class="text-[#c9a24b] font-display italic text-lg mb-4">Camlage Watches</p>
        <h1 class="text-5xl md:text-7xl font-display font-semibold leading-tight mb-6">
          Build a watch<br>that's yours
        </h1>
        <p class="text-gray-400 text-lg mb-10 font-light max-w-md">
          Choose a model, pick the case and strap color, and see it in 3D before you order.
        </p>
        <div class="flex gap-4">
          <router-link to="/products" class="bg-[#c9a24b] text-black font-medium tracking-wide px-9 py-4 hover:bg-[#e0bd6c] transition-colors">
            Shop watches
          </router-link>
          <router-link to="/products" class="border border-white/30 text-white px-9 py-4 hover:border-white transition-colors">
            Design your own
          </router-link>
        </div>
      </div>
    </section>

    <!-- Trust badges -->
    <section class="border-y border-white/10 py-8 px-6">
      <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-gray-400">
        <div>Free shipping over $150</div>
        <div>2-year warranty</div>
        <div>30-day returns</div>
        <div>Build it in 3D</div>
      </div>
    </section>

    <!-- Featured products -->
    <section class="py-24 px-6 max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-12">
        <h2 class="text-3xl md:text-4xl font-display">Featured watches</h2>
        <router-link to="/products" class="text-sm text-gray-400 hover:text-white">View all &rarr;</router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard v-for="p in featured" :key="p._id" :product="p" @add-to-cart="addToCart" />
      </div>
    </section>

    <!-- Categories -->
    <section class="pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <router-link to="/products" class="relative h-72 overflow-hidden group block">
        <img src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1200" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
          <p class="text-2xl font-display">Dress watches</p>
        </div>
      </router-link>
      <router-link to="/products" class="relative h-72 overflow-hidden group block">
        <img src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=1200" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
          <p class="text-2xl font-display">Sport watches</p>
        </div>
      </router-link>
    </section>

    <!-- Newsletter -->
    <section class="py-20 px-6 border-t border-white/10">
      <div class="max-w-xl mx-auto text-center">
        <h3 class="text-2xl font-display mb-3">Get 10% off your first watch</h3>
        <p class="text-gray-500 mb-8 text-sm">Sign up for our newsletter and get a code by email.</p>
        <form @submit.prevent="globalState.showToast('You are subscribed')" class="flex gap-3">
          <input type="email" required placeholder="Your email" class="flex-1 bg-[#111111] border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-[#c9a24b]">
          <button class="bg-[#c9a24b] text-black px-6 py-3 text-sm font-medium hover:bg-[#e0bd6c] transition-colors">Sign up</button>
        </form>
      </div>
    </section>
  </div>
</template>