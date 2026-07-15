<script setup>
import { ref } from 'vue'
import { globalState } from '../store.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  try {
    await globalState.login(email.value, password.value)
    globalState.showToast('Signed in')
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.error || 'Login failed'
  }
}
</script>

<template>
  <section class="h-[calc(100vh-80px)] flex items-center justify-center px-6">
    <div class="w-full max-w-md bg-[#0a0a0a] p-10 border border-white/10">
      <h2 class="text-3xl font-display mb-8">Sign <span class="text-[#c9a24b]">in</span></h2>
      <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Email</label>
          <input v-model="email" type="email" required class="w-full bg-[#050505] border border-white/20 text-white p-3 focus:outline-none focus:border-[#c9a24b] transition-colors">
        </div>
        <div>
          <label class="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Password</label>
          <input v-model="password" type="password" required class="w-full bg-[#050505] border border-white/20 text-white p-3 focus:outline-none focus:border-[#c9a24b] transition-colors">
        </div>
        <button type="submit" class="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-[#c9a24b] hover:text-white transition-colors mt-4">
          Sign in
        </button>
      </form>
      <p class="text-xs text-gray-500 mt-6 text-center">
        No account? <router-link to="/signup" class="text-[#c9a24b] hover:underline">Create one</router-link>
      </p>
    </div>
  </section>
</template>