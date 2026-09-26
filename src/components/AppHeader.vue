<template>
  <header class="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
    <!-- Top Announcement Bar (Matahari style) - Temporarily hidden per user request -->
    <!--
    <div class="bg-nezo-black text-white text-xs py-2 px-4 border-b border-nezo-border">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4">
        <div class="flex items-center gap-2 font-medium text-center sm:text-left">
          <span class="inline-block w-2 h-2 rounded-full bg-nezo-lime animate-pulse"></span>
          <span>{{ localeStore.t('announcement') }}</span>
        </div>
        <div class="flex items-center gap-4 text-xs text-gray-400">
          <span class="hidden md:inline">{{ localeStore.t('fastResponse') }}</span>
          <div class="flex items-center gap-2 pl-2 border-l border-gray-700">
            <Globe class="w-3.5 h-3.5 text-nezo-lime" />
            <button 
              @click="localeStore.setLanguage('id')" 
              :class="['px-1.5 py-0.5 rounded text-xs font-bold transition-colors', localeStore.currentLang === 'id' ? 'bg-nezo-lime text-black' : 'text-gray-400 hover:text-white']"
            >
              ID
            </button>
            <span class="text-gray-600">|</span>
            <button 
              @click="localeStore.setLanguage('en')" 
              :class="['px-1.5 py-0.5 rounded text-xs font-bold transition-colors', localeStore.currentLang === 'en' ? 'bg-nezo-lime text-black' : 'text-gray-400 hover:text-white']"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
    -->

    <!-- Main Navigation Header -->
    <div class="max-w-7xl mx-auto px-4 py-2.5 sm:py-4">
      <div class="flex items-center justify-between gap-3 sm:gap-6">
        <!-- Logo -->
        <a href="#home" @click.prevent="catalogStore.navigateTo('home')" class="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-black overflow-hidden flex items-center justify-center border-2 border-nezo-lime shadow-glow-lime transition-all duration-300 group-hover:scale-105 shrink-0">
            <img :src="logoUrl" alt="NEZO FACTORY" class="w-full h-full object-cover" />
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1 sm:gap-1.5">
              <span class="font-display font-black text-xl sm:text-2xl tracking-tight text-nezo-black">NEZO</span>
              <span class="font-display font-extrabold text-[10px] sm:text-xs tracking-wider uppercase px-1.5 py-0.5 bg-nezo-lime text-black rounded font-mono">FACTORY</span>
            </div>
            <span class="hidden sm:inline text-[10px] tracking-widest text-gray-500 font-bold uppercase -mt-0.5">YOUR TEAM. YOUR STYLE.</span>
          </div>
        </a>

        <!-- Search Bar (Matahari layout) -->
        <div class="hidden md:flex flex-1 max-w-xl mx-4">
          <div class="relative w-full">
            <input 
              v-model="catalogStore.searchQuery"
              type="text" 
              :placeholder="localeStore.t('searchPlaceholder')"
              class="w-full pl-11 pr-10 py-2.5 text-sm bg-gray-100 hover:bg-gray-50 focus:bg-white rounded-full border border-transparent focus:border-nezo-lime focus:ring-2 focus:ring-nezo-lime/30 transition-all outline-none"
            />
            <Search class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <button 
              v-if="catalogStore.searchQuery"
              @click="catalogStore.searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <!-- Language Switcher (Compact in Header) -->
          <div class="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
            <Globe class="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <button 
              @click="localeStore.setLanguage('id')" 
              :class="['px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors', localeStore.currentLang === 'id' ? 'bg-black text-nezo-lime' : 'text-gray-500 hover:text-black']"
            >
              ID
            </button>
            <span class="text-gray-400 text-[10px]">|</span>
            <button 
              @click="localeStore.setLanguage('en')" 
              :class="['px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors', localeStore.currentLang === 'en' ? 'bg-black text-nezo-lime' : 'text-gray-500 hover:text-black']"
            >
              EN
            </button>
          </div>

          <!-- Favorites / Wishlist (Desktop only; on mobile it is in the bottom nav!) -->
          <button 
            @click="filterFavorites"
            class="hidden lg:block relative p-2 text-gray-700 hover:text-nezo-red transition-colors rounded-full hover:bg-gray-100"
            :title="localeStore.t('wishlist')"
          >
            <Heart class="w-5 h-5 sm:w-6 sm:h-6" :class="{'fill-nezo-red text-nezo-red': catalogStore.favorites.length > 0}" />
            <span 
              v-if="catalogStore.favorites.length > 0"
              class="absolute -top-1 -right-1 bg-nezo-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce"
            >
              {{ catalogStore.favorites.length }}
            </span>
          </button>

          <!-- Direct WhatsApp Button (Desktop only; on mobile it is in bottom nav!) -->
          <button 
            @click="catalogStore.openInquiryModal()"
            class="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle class="w-4 h-4" />
            <span>WhatsApp Order</span>
          </button>
        </div>
      </div>

      <!-- Mobile Search (visible on small screens) -->
      <div class="mt-2.5 md:hidden">
        <div class="relative w-full">
          <input 
            v-model="catalogStore.searchQuery"
            type="text" 
            :placeholder="localeStore.t('searchPlaceholder')"
            class="w-full pl-10 pr-9 py-2 text-xs bg-gray-100 rounded-full border border-transparent focus:border-nezo-lime focus:bg-white outline-none"
          />
          <Search class="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <button 
            v-if="catalogStore.searchQuery"
            @click="catalogStore.searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-0.5"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Category Nav Bar (Matahari style horizontal category bar) -->
    <nav class="hidden lg:block bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <ul class="flex items-center gap-1 py-1 text-xs font-semibold text-gray-700 tracking-wide uppercase">
          <li>
            <button 
              @click="catalogStore.navigateTo('home')" 
              :class="[
                'px-3 py-2 rounded transition-colors inline-block',
                catalogStore.currentView === 'home' ? 'text-black font-extrabold bg-gray-200/50' : 'hover:text-black hover:bg-gray-200/60'
              ]"
            >
              {{ localeStore.t('navHome') }}
            </button>
          </li>
          <li>
            <button 
              @click="catalogStore.navigateTo('catalog')" 
              :class="[
                'px-3.5 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 font-black text-xs',
                catalogStore.currentView === 'catalog'
                  ? 'bg-black text-nezo-lime shadow-sm'
                  : 'bg-emerald-100/70 hover:bg-emerald-200/70 text-emerald-900 border border-emerald-300/60'
              ]"
            >
              <Tag class="w-3.5 h-3.5" />
              <span>{{ localeStore.t('navCatalog') }}</span>
            </button>
          </li>
          <li>
            <button 
              @click="goToSection('portfolio')" 
              class="px-3 py-2 rounded hover:text-black hover:bg-gray-200/60 transition-colors inline-block text-slate-800"
            >
              {{ localeStore.t('navPortfolio') }}
            </button>
          </li>
          <li>
            <button @click="filterCategory('lengan_pendek')" class="px-3 py-2 rounded hover:text-black hover:bg-gray-200/60 transition-colors inline-flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-nezo-lime"></span>
              {{ localeStore.t('navLenganPendek') }}
            </button>
          </li>
          <li>
            <button @click="goToSection('fabrics')" class="px-3 py-2 rounded hover:text-black hover:bg-gray-200/60 transition-colors inline-block">
              {{ localeStore.t('navFabrics') }}
            </button>
          </li>
          <li>
            <button @click="goToSection('size-chart')" class="px-3 py-2 rounded hover:text-black hover:bg-gray-200/60 transition-colors inline-block">
              {{ localeStore.t('navSizeChart') }}
            </button>
          </li>
          <li>
            <button @click="goToSection('reviews')" class="px-3 py-2 rounded hover:text-black hover:bg-gray-200/60 transition-colors inline-block">
              {{ localeStore.t('navReviews') }}
            </button>
          </li>
        </ul>

        <div class="flex items-center gap-3">
          <button 
            @click="catalogStore.openInquiryModal()"
            class="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 py-1"
          >
            <PhoneCall class="w-3.5 h-3.5" />
            <span>WA: {{ catalogStore.formattedWhatsappNumber }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Drawer Menu -->
    <div v-if="isMobileMenuOpen" class="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
      <div class="flex flex-col space-y-2 text-sm font-semibold text-gray-800">
        <button 
          @click="catalogStore.navigateTo('home'); isMobileMenuOpen = false" 
          class="py-2 px-3 rounded hover:bg-gray-100 flex items-center justify-between text-left"
        >
          <span>{{ localeStore.t('navHome') }}</span>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </button>

        <button 
          @click="catalogStore.navigateTo('catalog'); isMobileMenuOpen = false" 
          class="py-2 px-3 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold flex items-center justify-between text-left"
        >
          <div class="flex items-center gap-2">
            <Tag class="w-4 h-4 text-emerald-700" />
            <span>{{ localeStore.t('navCatalog') }}</span>
          </div>
          <span class="text-[10px] bg-black text-nezo-lime font-mono px-1.5 py-0.5 rounded">22 KODE</span>
        </button>

        <button 
          @click="goToSection('portfolio'); isMobileMenuOpen = false" 
          class="py-2 px-3 rounded hover:bg-gray-100 flex items-center justify-between text-left"
        >
          <span>{{ localeStore.t('navPortfolio') }}</span>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </button>

        <button @click="filterCategory('lengan_pendek'); isMobileMenuOpen = false" class="py-2 px-3 rounded hover:bg-gray-100 flex items-center justify-between text-left">
          <span>{{ localeStore.t('navLenganPendek') }}</span>
          <span class="text-[10px] bg-nezo-lime text-black font-bold px-1.5 py-0.5 rounded">NEW</span>
        </button>

        <button 
          @click="goToSection('fabrics'); isMobileMenuOpen = false" 
          class="py-2 px-3 rounded hover:bg-gray-100 flex items-center justify-between text-left"
        >
          <span>{{ localeStore.t('navFabrics') }}</span>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </button>

        <button 
          @click="goToSection('size-chart'); isMobileMenuOpen = false" 
          class="py-2 px-3 rounded hover:bg-gray-100 flex items-center justify-between text-left"
        >
          <span>{{ localeStore.t('navSizeChart') }}</span>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </button>

        <button 
          @click="goToSection('reviews'); isMobileMenuOpen = false" 
          class="py-2 px-3 rounded hover:bg-gray-100 flex items-center justify-between text-left"
        >
          <span>{{ localeStore.t('navReviews') }}</span>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div class="pt-3 border-t border-gray-100 flex flex-col gap-2">
        <button 
          @click="catalogStore.openInquiryModal(); isMobileMenuOpen = false"
          class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow"
        >
          <MessageCircle class="w-4 h-4" />
          <span>Chat Admin WhatsApp</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import logoUrl from '@/assets/logo.jpeg'
import { 
  Search, Heart, MessageCircle, Globe, Menu, X, ChevronRight, PhoneCall, Tag 
} from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const isMobileMenuOpen = ref(false)

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

const filterCategory = (cat) => {
  catalogStore.selectedCategory = cat
  goToSection('portfolio')
}

const filterFavorites = () => {
  goToSection('portfolio')
}
</script>
