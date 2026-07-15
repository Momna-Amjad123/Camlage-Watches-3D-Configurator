<script setup>
import { globalState } from '../store.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleLogout = () => {
  globalState.logout()
  router.push('/')
}
</script>

<template>
  <nav class="fixed w-full top-0 z-50 bg-[#030303]/90 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-6 md:px-10 py-5">
    <router-link to="/" class="text-2xl font-display font-bold tracking-widest text-white hover:text-[#c9a24b] transition">
      CAMLAGE<span class="text-[#c9a24b]">.</span>
    </router-link>
    
    <div class="hidden md:flex space-x-8 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
      <router-link to="/" active-class="text-white" class="hover:text-white transition">Home</router-link>
      <router-link to="/products" active-class="text-white" class="hover:text-white transition">Shop</router-link>
      <router-link to="/gallery" active-class="text-white" class="hover:text-white transition">Gallery</router-link>
      <router-link to="/cart" active-class="text-white" class="hover:text-white transition flex items-center gap-2">
        Cart <span class="bg-[#c9a24b] text-black px-2 py-0.5 rounded-full">{{ globalState.cart.length }}</span>
      </router-link>
      <router-link v-if="globalState.user" to="/orders" active-class="text-white" class="hover:text-white transition">Orders</router-link>
    </div>

    <div class="flex space-x-4 items-center">
      <template v-if="globalState.user">
        <span class="text-[10px] text-gray-400 uppercase tracking-widest">Hi, {{ globalState.user.name }}</span>
        <button @click="handleLogout" class="px-6 py-2.5 border border-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login" class="text-[10px] font-bold uppercase tracking-widest hover:text-[#c9a24b] text-gray-300">Login</router-link>
        <router-link to="/signup" class="px-6 py-2.5 border border-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition">Sign Up</router-link>
      </template>
    </div>
  </nav>
</template>