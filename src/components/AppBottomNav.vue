<template>
  <!-- Fixed Mobile Bottom Navigation Bar (App-style) -->
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
    <div class="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
      
      <!-- 1. Home / Beranda -->
      <button 
        @click="handleNavHome"
        :class="[
          'flex flex-col items-center justify-center flex-1 py-1 transition-all relative',
          catalogStore.currentView === 'home' ? 'text-black font-extrabold' : 'text-gray-500 hover:text-gray-800'
        ]"
      >
        <div class="relative">
          <Home class="w-5 h-5" :class="catalogStore.currentView === 'home' ? 'text-black stroke-[2.5]' : 'text-gray-500'" />
          <span 
            v-if="catalogStore.currentView === 'home'" 
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-nezo-lime border border-black/40"
          ></span>
        </div>
        <span class="text-[10px] mt-1 tracking-tight">{{ isEn ? 'Home' : 'Beranda' }}</span>
      </button>

      <!-- 2. Katalog (22 Kode) -->
      <button 
        @click="handleNavCatalog"
        :class="[
          'flex flex-col items-center justify-center flex-1 py-1 transition-all relative',
          catalogStore.currentView === 'catalog' ? 'text-black font-extrabold' : 'text-gray-500 hover:text-gray-800'
        ]"
      >
        <div class="relative">
          <Tag class="w-5 h-5" :class="catalogStore.currentView === 'catalog' ? 'text-black stroke-[2.5]' : 'text-gray-500'" />
          <span class="absolute -top-1.5 -right-3 bg-black text-nezo-lime text-[9px] font-mono font-bold px-1 rounded-full border border-nezo-lime/40">
            22
          </span>
        </div>
        <span class="text-[10px] mt-1 tracking-tight">{{ isEn ? 'Catalog' : 'Katalog' }}</span>
      </button>

      <!-- 3. Pilihan Bahan -->
      <button 
        @click="goToSection('fabrics')"
        class="flex flex-col items-center justify-center flex-1 py-1 transition-all text-gray-500 hover:text-gray-800"
      >
        <Layers class="w-5 h-5 text-gray-500" />
        <span class="text-[10px] mt-1 tracking-tight">{{ isEn ? 'Fabrics' : 'Bahan' }}</span>
      </button>

      <!-- 4. Favorit / Wishlist -->
      <button 
        @click="goToFavorites"
        class="flex flex-col items-center justify-center flex-1 py-1 transition-all relative text-gray-500 hover:text-gray-800"
      >
        <div class="relative">
          <Heart 
            class="w-5 h-5" 
            :class="catalogStore.favorites.length > 0 ? 'fill-nezo-red text-nezo-red' : 'text-gray-500'" 
          />
          <span 
            v-if="catalogStore.favorites.length > 0"
            class="absolute -top-1.5 -right-2.5 bg-nezo-red text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce"
          >
            {{ catalogStore.favorites.length }}
          </span>
        </div>
        <span class="text-[10px] mt-1 tracking-tight">{{ isEn ? 'Saved' : 'Favorit' }}</span>
      </button>

      <!-- 5. WhatsApp Direct Chat -->
      <button 
        @click="catalogStore.directGeneralChat('halo NEZO FACTORY, saya ingin tanya tanya')"
        class="flex flex-col items-center justify-center flex-1 py-1 transition-transform active:scale-95 group"
      >
        <div class="w-9 h-9 rounded-full bg-emerald-600 group-hover:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 relative">
          <span class="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-nezo-lime opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-nezo-lime"></span>
          </span>
          <MessageCircle class="w-5 h-5" />
        </div>
        <span class="text-[10px] mt-0.5 text-emerald-700 font-bold tracking-tight">Chat WA</span>
      </button>

    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import { Home, Tag, Layers, Heart, MessageCircle } from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const isEn = computed(() => localeStore.currentLang === 'en')

const handleNavHome = () => {
  catalogStore.navigateTo('home')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavCatalog = () => {
  catalogStore.navigateTo('catalog')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goToSection = (sectionId) => {
  if (catalogStore.currentView !== 'home') {
    catalogStore.navigateTo('home')
    setTimeout(() => {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 120)
  } else {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

const goToFavorites = () => {
  if (catalogStore.currentView !== 'home') {
    catalogStore.navigateTo('home')
    setTimeout(() => {
      const el = document.getElementById('portfolio')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 120)
  } else {
    const el = document.getElementById('portfolio')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
