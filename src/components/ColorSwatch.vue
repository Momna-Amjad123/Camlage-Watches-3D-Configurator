<script setup>
const props = defineProps(['color', 'isActive'])
const emit = defineEmits(['select-color'])
</script>

<template>
  <button 
    @click="$emit('select-color', color)"
    class="w-14 h-14 flex items-center justify-center relative overflow-hidden transition-all duration-300"
    :class="isActive ? 'border-2 border-[#c9a24b] scale-110' : 'border border-white/20 hover:border-white'"
    :style="{ backgroundColor: color.hex }"
    :title="color.name">
  </button>
</template>
