<template>
  <div 
    v-if="catalogStore.isImageZoomModalOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md transition-opacity"
    @click.self="catalogStore.isImageZoomModalOpen = false"
  >
    <!-- Modal Container -->
    <div class="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center">
      <!-- Top Bar -->
      <div class="w-full flex items-center justify-between pb-3 text-white">
        <h4 class="text-sm sm:text-base font-bold truncate pr-4 text-nezo-lime">
          {{ catalogStore.zoomImageTitle || 'Detail Gambar' }}
        </h4>
        <button 
          @click="catalogStore.isImageZoomModalOpen = false"
          class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Image display -->
      <div class="w-full overflow-auto max-h-[85vh] flex items-center justify-center bg-black/40 rounded-xl p-2">
        <img 
          :src="catalogStore.zoomImageSrc" 
          :alt="catalogStore.zoomImageTitle" 
          class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCatalogStore } from '../stores/catalog'
import { X } from 'lucide-vue-next'

const catalogStore = useCatalogStore()
</script>
