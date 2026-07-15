<script setup>
import { ref } from 'vue'
import { globalState } from '../store.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  try {
    await globalState.signup(name.value, email.value, password.value)
    globalState.showToast('Account created. Welcome!')
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.error || 'Signup failed'
  }
}
</script>

<template>
  <section class="h-[calc(100vh-80px)] flex items-center justify-center px-6">
    <div class="w-full max-w-md bg-[#0a0a0a] p-10 border border-[#c9a24b]/50 shadow-[0_0_30px_rgba(139,0,0,0.1)]">
      <h2 class="text-3xl font-display mb-8">Create <span class="text-[#c9a24b]">account</span></h2>
      <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Username</label>
          <input v-model="name" type="text" required class="w-full bg-[#050505] border border-white/20 text-white p-3 focus:outline-none focus:border-[#c9a24b] transition-colors">
        </div>
        <div>
          <label class="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Email</label>
          <input v-model="email" type="email" required class="w-full bg-[#050505] border border-white/20 text-white p-3 focus:outline-none focus:border-[#c9a24b] transition-colors">
        </div>
        <div>
          <label class="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Password</label>
          <input v-model="password" type="password" required class="w-full bg-[#050505] border border-white/20 text-white p-3 focus:outline-none focus:border-[#c9a24b] transition-colors">
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