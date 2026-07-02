<script setup>
import { globalState } from '../store.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleSubmit = () => {
  globalState.showToast('Account created. Welcome!')
  router.push('/')
}
</script>

<template>
  <section class="h-[calc(100vh-80px)] flex items-center justify-center px-6">
    <div class="w-full max-w-md bg-[#0a0a0a] p-10 border border-[#c9a24b]/50 shadow-[0_0_30px_rgba(139,0,0,0.1)]">
      <h2 class="text-3xl font-display mb-8">Create <span class="text-[#c9a24b]">account</span></h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Username</label>
          <input type="text" required class="w-full bg-[#050505] border border-white/20 text-white p-3 focus:outline-none focus:border-[#c9a24b] transition-colors">
        </div>
        <div>
          <label class="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Email</label>
          <input type="email" required class="w-full bg-[#050505] border border-white/20 text-white p-3 focus:outline-none focus:border-[#c9a24b] transition-colors">
        </div>
        <div>
          <label class="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Password</label>
          <input type="password" required class="w-full bg-[#050505] border border-white/20 text-white p-3 focus:outline-none focus:border-[#c9a24b] transition-colors">
        </div>
        <button type="submit" class="w-full bg-[#c9a24b] text-white font-bold uppercase tracking-widest py-4 hover:bg-amber-600 transition-colors mt-4">
          Create account
        </button>
      </form>
      <p class="text-xs text-gray-500 mt-6 text-center">
        Already have an account? <router-link to="/login" class="text-[#c9a24b] hover:underline">Sign in</router-link>
      </p>
    </div>
  </section>
</template>
