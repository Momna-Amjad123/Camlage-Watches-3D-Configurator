<script setup>
const props = defineProps({
  product: { type: Object, required: true }
})
const emit = defineEmits(['add-to-cart'])
</script>

<template>
  <div class="group bg-[#0f0f0f] border border-white/10 hover:border-[#c9a24b]/60 transition-colors duration-300 flex flex-col">
    <div class="h-64 bg-neutral-900 relative overflow-hidden">
      <span class="absolute top-3 left-3 text-[10px] tracking-widest text-gray-500 uppercase">{{ product.category }}</span>
      <img :src="product.image" :alt="product.name" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700">
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-display text-white">{{ product.name }}</h3>
        <span class="text-[#c9a24b] font-display text-lg">${{ product.price }}</span>
      </div>
      <p class="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">{{ product.description }}</p>
      <div class="grid grid-cols-2 gap-3 mt-auto">
        <router-link :to="'/studio/' + product._id" class="text-center bg-white text-black tracking-wide py-2.5 text-xs hover:bg-gray-200 transition-colors">          Customize
        </router-link>
        <button @click="$emit('add-to-cart', product)" class="border border-white/40 text-white tracking-wide py-2.5 text-xs hover:bg-[#c9a24b] hover:border-[#c9a24b] hover:text-black transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>