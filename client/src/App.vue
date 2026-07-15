<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ToastNotifier from './components/ToastNotifier.vue'
import { globalState } from './store.js'

onMounted(() => globalState.fetchProducts())
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <ToastNotifier />
    <main class="flex-grow pt-20">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Remove default Vite styles if they exist */
#app { width: 100%; margin: 0; padding: 0; max-width: none; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
