<template>
  <div class="hidden lg:flex fixed bottom-6 right-6 z-40 flex flex-col items-end">
    <!-- Chat Bubble Hint (dismissible or hover) -->
    <div 
      v-if="showHint" 
      class="mb-3 max-w-xs bg-white text-gray-800 p-3 rounded-2xl shadow-xl border border-gray-200 text-xs relative animate-bounce"
    >
      <button 
        @click="showHint = false"
        class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-[10px]"
      >
        ✕
      </button>
      <div class="flex items-center gap-2 mb-1">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <strong class="font-bold text-gray-900">Admin NEZO Online</strong>
      </div>
      <p class="text-gray-600 text-[11px] leading-tight">
        Mau tanya harga seragam voli tim Anda? Konsultasi desain & ukuran gratis sekarang!
      </p>
    </div>

    <!-- WhatsApp Button -->
    <button 
      @click="handleClick"
      class="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all duration-300 relative group"
      aria-label="Direct WhatsApp Contact"
    >
      <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-nezo-lime opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-nezo-lime border-2 border-emerald-600"></span>
      </span>
      <MessageCircle class="w-7 h-7" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { MessageCircle } from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const showHint = ref(true)

const handleClick = () => {
  catalogStore.directGeneralChat('halo NEZO FACTORY, saya ingin tanya tanya')
}
</script>
