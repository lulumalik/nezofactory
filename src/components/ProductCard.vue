<template>
  <div class="group bg-white rounded-xl border border-gray-200 hover:border-nezo-lime/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
    <!-- Top Image Container -->
    <div class="relative bg-gray-50 aspect-square overflow-hidden cursor-pointer" @click="catalogStore.openProductDetail(product)">
      <img 
        :src="product.image" 
        :alt="isEn ? product.nameEn : product.nameId"
        loading="lazy"
        class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />

      <!-- Badges (Top Left) -->
      <div class="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
        <span 
          v-if="product.category === 'lengan_pendek'"
          class="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide uppercase bg-purple-600 text-white shadow-sm"
        >
          Wanita / Short
        </span>
        <span 
          v-else-if="product.badge"
          :class="[
            'px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide uppercase shadow-sm',
            product.badge === 'Best Seller' ? 'bg-nezo-red text-white' : 
            product.badge === 'Terbaru' ? 'bg-nezo-black text-nezo-lime border border-nezo-lime/40' :
            'bg-blue-600 text-white'
          ]"
        >
          {{ product.badge }}
        </span>
      </div>

      <!-- Favorite Button (Top Right) -->
      <button 
        @click.stop="catalogStore.toggleFavorite(product.id)"
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-nezo-red shadow flex items-center justify-center transition-colors z-10"
        :title="catalogStore.isFavorite(product.id) ? localeStore.t('removedFromFav') : localeStore.t('savedToFav')"
      >
        <Heart 
          class="w-4 h-4 transition-transform active:scale-125" 
          :class="catalogStore.isFavorite(product.id) ? 'fill-nezo-red text-nezo-red' : ''" 
        />
      </button>

      <!-- Quick View Hover Overlay -->
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
        <span class="px-3 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-bold shadow-md flex items-center gap-1">
          <Eye class="w-3.5 h-3.5" />
          {{ localeStore.t('viewDetail') }}
        </span>
      </div>
    </div>

    <!-- Product Info (Matahari style) -->
    <div class="p-3 sm:p-4 flex-1 flex flex-col justify-between">
      <div>
        <!-- Brand & Product Code -->
        <div class="flex items-center justify-between text-[11px] font-semibold mb-1.5">
          <button 
            @click.stop="catalogStore.navigateTo('catalog', { code: product.code })"
            class="tracking-wider font-mono font-black text-xs text-slate-900 bg-nezo-lime/30 hover:bg-nezo-lime px-2 py-0.5 rounded border border-nezo-lime/70 transition-colors flex items-center gap-1 shadow-2xs"
            title="Lihat di Katalog & Salin Kode"
          >
            <span>KODE: {{ product.code }}</span>
          </button>
          <span class="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-600 uppercase font-mono">
            {{ product.category === 'lengan_pendek' ? 'Lengan Pendek' : 'Reguler' }}
          </span>
        </div>

        <!-- Title -->
        <h3 
          @click="catalogStore.openProductDetail(product)"
          class="font-bold text-xs sm:text-sm text-gray-900 hover:text-emerald-700 line-clamp-1 cursor-pointer transition-colors"
        >
          {{ isEn ? product.nameEn : product.nameId }}
        </h3>

        <!-- Feature note / Tagline -->
        <p class="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
          {{ localeStore.t('freeCustomLabel') }} • Standar PBVSI
        </p>

        <!-- Color Swatch Dots (Matahari mockup style!) -->
        <div class="mt-2.5 flex items-center gap-1.5">
          <div 
            v-for="(hex, cIdx) in product.colors" 
            :key="cIdx"
            class="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-inner shrink-0"
            :style="{ backgroundColor: hex }"
            :title="`Warna palet: ${hex}`"
          ></div>
          <span class="text-[10px] text-gray-400 ml-1">Bebas ubah warna</span>
        </div>
      </div>

      <!-- Action Area (WhatsApp direct inquiry) -->
      <div class="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center gap-2">
        <button 
          @click="catalogStore.openInquiryModal(product)"
          class="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
        >
          <MessageCircle class="w-3.5 h-3.5" />
          <span>{{ localeStore.t('inquireWA') }}</span>
        </button>

        <button 
          @click="catalogStore.openProductDetail(product)"
          class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          :title="localeStore.t('viewDetail')"
        >
          <Eye class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import { Heart, MessageCircle, Eye } from 'lucide-vue-next'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const isEn = computed(() => localeStore.currentLang === 'en')
</script>
