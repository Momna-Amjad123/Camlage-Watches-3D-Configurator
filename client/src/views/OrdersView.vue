<script setup>
import { onMounted } from 'vue'
import { globalState } from '../store.js'

onMounted(() => globalState.fetchOrders())
</script>

<template>
  <section class="pt-16 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
    <h2 class="text-4xl font-display mb-12">Your <span class="text-[#c9a24b]">orders</span></h2>

    <div v-if="!globalState.user" class="text-center py-32 border border-dashed border-white/20">
      <p class="text-gray-500 font-display tracking-widest uppercase mb-6">Sign in to view your orders.</p>
      <router-link to="/login" class="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#c9a24b] hover:text-white transition-colors">Sign in</router-link>
    </div>

    <div v-else-if="globalState.orders.length === 0" class="text-center py-32 border border-dashed border-white/20">
      <p class="text-gray-500 font-display tracking-widest uppercase mb-6">No orders yet.</p>
      <router-link to="/products" class="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#c9a24b] hover:text-white transition-colors">Shop watches</router-link>
    </div>

    <div v-else class="space-y-8">
      <div v-for="order in globalState.orders" :key="order._id" class="bg-[#0a0a0a] border border-white/10 p-6">
        <div class="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-widest">Order #{{ order._id.slice(-6) }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
          </div>
          <span class="text-[10px] uppercase tracking-widest bg-[#c9a24b]/20 text-[#c9a24b] px-3 py-1">{{ order.status }}</span>
        </div>

        <div v-for="item in order.items" :key="item._id" class="flex items-center gap-6 mb-4 last:mb-0">
          <div class="w-16 h-16 bg-[#050505] flex items-center justify-center p-2 border border-white/5 overflow-hidden">
            <img :src="item.product?.image" class="w-full h-full object-contain">
          </div>
          <div class="flex-1">
            <p class="font-bold">{{ item.product?.name }}</p>
            <p class="text-xs text-gray-500">{{ item.caseColor }} case, {{ item.strapColor }} strap · Qty {{ item.quantity }}</p>
          </div>
          <p class="text-[#c9a24b] font-display">${{ item.product?.price }}</p>
        </div>

        <div class="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
          <span class="text-gray-400 uppercase tracking-widest text-xs">Total</span>
          <span class="text-2xl font-display font-bold">${{ order.total }}.00</span>
        </div>
      </div>
    </div>
  </section>
</template>
