<template>
  <section id="portfolio" class="py-10 sm:py-14 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Section Header (Matahari Style with red/lime underline) -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-3 h-3 rounded-full bg-nezo-lime border-2 border-black"></span>
            <span class="text-xs font-black uppercase tracking-widest text-gray-500">Nezo Volley Series</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-display font-black text-gray-900 tracking-tight relative inline-block">
            {{ localeStore.t('portfolioTitle') }}
            <!-- Matahari-style Red Accent Bar -->
            <span class="absolute -bottom-5 left-0 w-16 h-1 bg-nezo-red rounded-full"></span>
          </h2>
        </div>

        <!-- Direct WA Hotline Button -->
        <button 
          @click="catalogStore.openInquiryModal()"
          class="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
        >
          <MessageCircle class="w-4 h-4" />
          <span>{{ localeStore.t('consultDesign') }}</span>
        </button>
      </div>

      <!-- Filter Tabs Bar (Matahari Pill Buttons) -->
      <div class="mt-6 flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
        <div class="flex items-center gap-2">
          <button 
            @click="catalogStore.selectedCategory = 'all'"
            :class="[
              'px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap',
              catalogStore.selectedCategory === 'all' 
                ? 'bg-nezo-black text-white shadow' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
          >
            {{ localeStore.t('filterAll') }} ({{ catalogStore.products.length }})
          </button>

          <button 
            @click="catalogStore.selectedCategory = 'reguler'"
            :class="[
              'px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap',
              catalogStore.selectedCategory === 'reguler' 
                ? 'bg-nezo-black text-white shadow' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
          >
            {{ localeStore.t('filterReguler') }} (17)
          </button>

          <button 
            @click="catalogStore.selectedCategory = 'lengan_pendek'"
            :class="[
              'px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5',
              catalogStore.selectedCategory === 'lengan_pendek' 
                ? 'bg-purple-700 text-white shadow' 
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            ]"
          >
            <span>{{ localeStore.t('filterShort') }}</span>
            <span class="text-[10px] bg-nezo-lime text-black font-extrabold px-1.5 rounded-full">5</span>
          </button>

          <button 
            @click="catalogStore.selectedCategory = 'best_seller'"
            :class="[
              'px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap',
              catalogStore.selectedCategory === 'best_seller' 
                ? 'bg-nezo-red text-white shadow' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
          >
            🔥 Best Seller
          </button>

          <button 
            @click="catalogStore.selectedCategory = 'terbaru'"
            :class="[
              'px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap',
              catalogStore.selectedCategory === 'terbaru' 
                ? 'bg-nezo-black text-nezo-lime shadow border border-nezo-lime' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
          >
            ✨ {{ localeStore.t('filterNew') }}
          </button>
        </div>

        <!-- Search Status / Favorites Filter -->
        <div class="flex items-center gap-2 shrink-0">
          <button 
            v-if="catalogStore.favorites.length > 0"
            @click="filterOnlyFavorites"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors border',
              isShowingOnlyFavs 
                ? 'bg-nezo-red text-white border-nezo-red' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            ]"
          >
            <Heart class="w-3.5 h-3.5 fill-current" />
            <span>Favorit ({{ catalogStore.favorites.length }})</span>
          </button>
        </div>
      </div>

      <!-- Active Search indicator -->
      <div v-if="catalogStore.searchQuery" class="mt-4 flex items-center justify-between bg-lime-50 border border-lime-200 px-4 py-2 rounded-lg text-xs text-lime-900">
        <div class="flex items-center gap-2">
          <Search class="w-4 h-4 text-emerald-600" />
          <span>Mencari: <strong>"{{ catalogStore.searchQuery }}"</strong> • {{ localeStore.t('searchResult', { count: displayedProducts.length }) }}</span>
        </div>
        <button @click="catalogStore.searchQuery = ''" class="text-xs font-bold text-emerald-700 hover:underline">
          Hapus Pencarian
        </button>
      </div>

      <!-- Product Grid (Matahari 5-column layout on large screens) -->
      <div v-if="displayedProducts.length > 0" class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        <ProductCard 
          v-for="item in paginatedProducts" 
          :key="item.id" 
          :product="item" 
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300 mt-6">
        <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto text-gray-400 mb-3">
          <FilterX class="w-8 h-8" />
        </div>
        <h4 class="font-bold text-gray-800 text-base">{{ localeStore.t('noResults') }}</h4>
        <p class="text-xs text-gray-500 mt-1 max-w-sm mx-auto">Coba gunakan kata kunci lain seperti NZ-V01, lengan pendek, atau nama warna.</p>
        <button 
          @click="resetAllFilters"
          class="mt-4 px-5 py-2 rounded-full bg-nezo-black text-white text-xs font-bold hover:bg-gray-800 transition-colors"
        >
          {{ localeStore.t('resetFilter') }}
        </button>
      </div>

      <!-- Load More / Pagination Button (Matahari style) -->
      <div v-if="hasMore" class="mt-10 text-center">
        <button 
          @click="itemsToShow += 10"
          class="px-8 py-3 rounded-full bg-nezo-black hover:bg-gray-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
        >
          <span>Lihat Koleksi Lainnya ({{ displayedProducts.length - itemsToShow }} Lagi)</span>
          <ChevronDown class="w-4 h-4 text-nezo-lime" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import ProductCard from './ProductCard.vue'
import { MessageCircle, Heart, Search, FilterX, ChevronDown } from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const itemsToShow = ref(10)
const isShowingOnlyFavs = ref(false)

const filterOnlyFavorites = () => {
  isShowingOnlyFavs.value = !isShowingOnlyFavs.value
}

const displayedProducts = computed(() => {
  let list = catalogStore.filteredProducts
  if (isShowingOnlyFavs.value) {
    list = list.filter(p => catalogStore.favorites.includes(p.id))
  }
  return list
})

const paginatedProducts = computed(() => {
  return displayedProducts.value.slice(0, itemsToShow.value)
})

const hasMore = computed(() => {
  return itemsToShow.value < displayedProducts.value.length
})

const resetAllFilters = () => {
  catalogStore.searchQuery = ''
  catalogStore.selectedCategory = 'all'
  isShowingOnlyFavs.value = false
  itemsToShow.value = 10
}
</script>
