<script setup>
const showcase = [
  { img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600', category: 'Dress', customer: 'customer_1' },
  { img: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600', category: 'Sport', customer: 'customer_2' },
  { img: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=600', category: 'Sport', customer: 'customer_3' },
  { img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600', category: 'Dress', customer: 'customer_4' },
  { img: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=600', category: 'Dress', customer: 'customer_5' },
  { img: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=600', category: 'Sport', customer: 'customer_6' }
]
</script>

<template>
  <section class="pt-16 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
    <h2 class="text-4xl font-display mb-2">Customer <span class="text-[#c9a24b]">gallery</span></h2>
    <p class="text-gray-500 mb-12 tracking-wide">Watches customized by our customers.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="item in showcase" :key="item.customer" class="relative group overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-[#c9a24b] transition-colors duration-500 cursor-pointer">
        <div class="w-full h-64 flex items-center justify-center bg-neutral-900 overflow-hidden">
          <img :src="item.img" class="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal">
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#030303] to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p class="text-[10px] text-gray-400 tracking-widest uppercase mb-1">{{ item.category }}</p>
          <p class="text-xs font-bold text-[#c9a24b] tracking-[0.2em] uppercase">By {{ item.customer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>