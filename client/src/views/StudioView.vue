<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ColorSwatch from '../components/ColorSwatch.vue'
import WatchModel3D from '../components/WatchModel3D.vue'
import { globalState } from '../store.js'

const route = useRoute()
const router = useRouter()

const currentProduct = computed(() => {
  return globalState.products.find(p => p._id === route.params.id) || globalState.products[0] || {}
})

const caseColors = [
  { name: 'Steel', hex: '#c9c9c9' },
  { name: 'Black', hex: '#1c1c1c' },
  { name: 'Gold', hex: '#c9a24b' }
]

const strapColors = [
  { name: 'Black leather', hex: '#1a1a1a' },
  { name: 'Brown leather', hex: '#5a3a22' },
  { name: 'Red', hex: '#c9a24b' }
]

const activeCase = ref(caseColors[0])
const activeStrap = ref(strapColors[0])

const setCase = (color) => { activeCase.value = color }
const setStrap = (color) => { activeStrap.value = color }

const addCustomToCart = async () => {
  if (!globalState.user) {
    router.push('/login')
    return
  }
  await globalState.addToCart(currentProduct.value._id, activeStrap.value.name, activeCase.value.name)
  router.push('/cart')
}
</script>

<template>
  <section class="min-h-screen pt-12 pb-12 px-6 max-w-[90rem] mx-auto flex flex-col md:flex-row gap-12 items-center">

    <div class="w-full md:w-3/5 h-[560px] relative bg-[#050505] border border-white/10 overflow-hidden">
      <WatchModel3D :case-color="activeCase.hex" :strap-color="activeStrap.hex" :product-name="currentProduct.name" />
      <div class="absolute top-6 left-6 text-xs tracking-widest text-gray-500">
        Drag to rotate
      </div>
    </div>

    <div class="w-full md:w-2/5 flex flex-col justify-center">
      <h2 class="text-4xl font-display mb-2">{{ currentProduct.name }}</h2>
      <p class="text-gray-500 text-sm mb-10 pb-6 border-b border-white/10">${{ currentProduct.price }}.00</p>

      <div class="space-y-10">
        <div>
          <div class="flex justify-between items-end mb-4">
            <h3 class="font-display text-xs tracking-[0.2em] uppercase text-white">Case color</h3>
            <span class="text-xs text-[#c9a24b] font-bold">{{ activeCase.name }}</span>
          </div>
          <div class="flex space-x-4">
            <ColorSwatch
              v-for="c in caseColors"
              :key="c.name"
              :color="c"
              :isActive="activeCase.name === c.name"
              @select-color="setCase"
            />
          </div>
        </div>

        <div>
          <div class="flex justify-between items-end mb-4">
            <h3 class="font-display text-xs tracking-[0.2em] uppercase text-white">Strap color</h3>
            <span class="text-xs text-[#c9a24b] font-bold">{{ activeStrap.name }}</span>
          </div>
          <div class="flex space-x-4">
            <ColorSwatch
              v-for="s in strapColors"
              :key="s.name"
              :color="s"
              :isActive="activeStrap.name === s.name"
              @select-color="setStrap"
            />
          </div>
        </div>
      </div>

      <div class="mt-16">
        <button @click="addCustomToCart" class="w-full bg-white text-black font-display font-bold uppercase tracking-[0.2em] py-5 hover:bg-[#c9a24b] hover:text-white transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  </section>
</template>