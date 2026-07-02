<script setup>
import { globalState } from '../store.js'
</script>

<template>
  <transition name="fade">
    <div v-if="globalState.toastMessage" class="fixed bottom-10 right-10 bg-[#c9a24b] text-white px-8 py-4 font-display font-bold tracking-widest text-xs z-[100] shadow-[0_0_30px_rgba(139,0,0,0.6)] uppercase">
      {{ globalState.toastMessage }}
    </div>
  </transition>
</template>
