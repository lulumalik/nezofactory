<template>
  <section id="reviews" class="py-14 sm:py-20 bg-white border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-5 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span class="text-xs font-bold uppercase tracking-widest text-gray-500">Bukti Nyata Kualitas</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-display font-black text-gray-900 tracking-tight relative inline-block">
            {{ localeStore.t('reviewTitle') }}
            <span class="absolute -bottom-5 left-0 w-16 h-1 bg-nezo-lime rounded-full"></span>
          </h2>
          <p class="mt-3 text-xs sm:text-sm text-gray-500 max-w-2xl">
            {{ localeStore.t('reviewSubtitle') }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1 text-yellow-400 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
            <Star class="w-4 h-4 fill-yellow-400" v-for="i in 5" :key="i" />
            <span class="text-xs font-bold text-gray-800 ml-1">5.0 (100+ Tim Voli)</span>
          </div>
        </div>
      </div>

      <!-- Gallery Grid of Real Customer Photos -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        <div 
          v-for="item in catalogStore.customerReviews.slice(0, visibleReviews)"
          :key="item.id"
          class="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-nezo-lime/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
          @click="catalogStore.openImageZoom(item.image, `${item.teamName} - ${item.event}`)"
        >
          <!-- Photo Container -->
          <div class="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100">
            <img 
              :src="item.image" 
              :alt="item.teamName"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-bold text-gray-900 flex items-center gap-1 shadow">
                <Maximize2 class="w-3 h-3" />
                Lihat Foto
              </span>
            </div>
            <span class="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-black bg-nezo-black/80 text-white uppercase backdrop-blur-sm">
              Real Pict
            </span>
          </div>

          <!-- Description / Review -->
          <div class="p-2.5 sm:p-3 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-0.5 text-yellow-400 mb-1">
                <Star class="w-3 h-3 fill-yellow-400" v-for="s in item.rating" :key="s" />
              </div>
              <h4 class="font-bold text-xs text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                {{ item.teamName }}
              </h4>
              <p class="text-[10px] text-gray-400 line-clamp-1">
                {{ item.event }}
              </p>
            </div>
            <p class="text-[11px] text-gray-600 italic line-clamp-2 mt-2 bg-white p-1.5 rounded border border-gray-100">
              "{{ isEn ? item.commentEn : item.commentId }}"
            </p>
          </div>
        </div>
      </div>

      <!-- Load More Reviews Button -->
      <div v-if="visibleReviews < catalogStore.customerReviews.length" class="mt-8 text-center">
        <button 
          @click="visibleReviews = catalogStore.customerReviews.length"
          class="px-6 py-2.5 rounded-full border border-gray-300 hover:border-black text-gray-800 font-bold text-xs transition-colors"
        >
          Lihat Semua Galeri Tim ({{ catalogStore.customerReviews.length }} Foto)
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import { Star, Maximize2 } from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const visibleReviews = ref(10)
const isEn = computed(() => localeStore.currentLang === 'en')
</script>
