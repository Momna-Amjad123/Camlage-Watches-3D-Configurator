<template>
  <section class="pt-16 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
    <h2 class="text-4xl font-display mb-2">Customer <span class="text-[#c9a24b]">gallery</span></h2>
    <p class="text-gray-500 mb-12 tracking-wide">Watches customized by our customers.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="relative group overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-[#c9a24b] transition-colors duration-500 cursor-pointer">
        <img :src="'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=600&sig=' + i" class="w-full h-64 object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal">
        <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#030303] to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p class="text-xs font-bold text-[#c9a24b] tracking-[0.2em] uppercase">By customer_{{ i }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
