<template>
  <div class="bg-gray-50 min-h-screen py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      
      <!-- Top Breadcrumbs & Back Navigation -->
      <div class="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
        <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <button 
            @click="catalogStore.navigateTo('home')" 
            class="hover:text-black font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft class="w-4 h-4 text-slate-800" />
            <span>{{ localeStore.t('navHome') }}</span>
          </button>
          <span>/</span>
          <span class="text-slate-900 font-bold">{{ localeStore.t('navCatalog') }}</span>
        </div>

        <div class="flex items-center gap-2">
          <button 
            @click="catalogStore.navigateTo('home')"
            class="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors"
          >
            {{ localeStore.t('btnBackToHome') }}
          </button>
        </div>
      </div>

      <!-- Hero Header Section -->
      <div class="bg-nezo-black text-white rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-2xl border border-nezo-border">
        <!-- Background Accent Glow -->
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-nezo-lime/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nezo-surface border border-nezo-lime/40 text-nezo-lime text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Tag class="w-3.5 h-3.5" />
            <span>{{ localeStore.t('catalogBadge') }}</span>
          </div>
          
          <h1 class="text-2xl sm:text-4xl font-display font-black tracking-tight text-white mb-3">
            {{ localeStore.t('catalogTitle') }}
          </h1>
          
          <p class="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mb-6">
            {{ localeStore.t('catalogSubtitle') }}
          </p>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div class="bg-white/5 border border-white/10 rounded-xl p-3">
              <span class="text-gray-400 block text-[11px]">Total Desain</span>
              <strong class="text-white text-base sm:text-lg font-black font-mono">22 Model</strong>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-xl p-3">
              <span class="text-gray-400 block text-[11px]">Lengan Reguler</span>
              <strong class="text-nezo-lime text-base sm:text-lg font-black font-mono">17 Kode</strong>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-xl p-3">
              <span class="text-gray-400 block text-[11px]">Lengan Pendek</span>
              <strong class="text-emerald-400 text-base sm:text-lg font-black font-mono">5 Kode</strong>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-xl p-3">
              <span class="text-gray-400 block text-[11px]">Format Pesanan</span>
              <strong class="text-white text-base sm:text-lg font-black font-mono">Direct WA</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Code Filter Ribbon -->
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-8">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <Layers class="w-3.5 h-3.5 text-slate-800" />
            <span>Pilih Cepat Berdasarkan Kode:</span>
          </span>
          <button 
            v-if="activeCodeFilter" 
            @click="activeCodeFilter = ''" 
            class="text-[11px] text-rose-600 hover:underline font-semibold"
          >
            Tampilkan Semua Kode
          </button>
        </div>

        <div class="flex flex-wrap gap-1.5">
          <button
            @click="activeCodeFilter = ''"
            :class="[
              'px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all',
              !activeCodeFilter 
                ? 'bg-black text-nezo-lime shadow-sm' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            SEMUA (22)
          </button>

          <!-- Reguler Codes -->
          <button
            v-for="p in catalogStore.products"
            :key="p.code"
            @click="activeCodeFilter = p.code"
            :class="[
              'px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1',
              activeCodeFilter === p.code 
                ? 'bg-black text-nezo-lime ring-2 ring-nezo-lime shadow-md scale-105' 
                : p.category === 'lengan_pendek'
                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            ]"
          >
            <span>{{ p.code }}</span>
          </button>
        </div>
      </div>

      <!-- Search & Category Filters Bar -->
      <div class="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <!-- Category Tabs -->
          <div class="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              v-for="cat in categoryOptions"
              :key="cat.value"
              @click="selectedCategory = cat.value"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold transition-all',
                selectedCategory === cat.value
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full md:w-80">
            <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchInput"
              type="text"
              :placeholder="localeStore.t('catalogSearchPlaceholder')"
              class="w-full pl-10 pr-9 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all font-sans"
            />
            <button
              v-if="searchInput"
              @click="searchInput = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      <!-- Active Filter Notice -->
      <div v-if="activeCodeFilter || searchInput || selectedCategory !== 'all'" class="flex items-center justify-between bg-blue-50 border border-blue-200 text-blue-900 px-4 py-3 rounded-xl mb-6 text-xs">
        <div class="flex items-center gap-2">
          <Info class="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Menampilkan hasil untuk: 
            <strong v-if="activeCodeFilter" class="font-mono bg-blue-100 px-1.5 py-0.5 rounded mr-1">Kode: {{ activeCodeFilter }}</strong>
            <strong v-if="searchInput" class="font-mono bg-blue-100 px-1.5 py-0.5 rounded mr-1">Pencarian: "{{ searchInput }}"</strong>
            <span class="text-blue-700">({{ displayedProducts.length }} model ditemukan)</span>
          </span>
        </div>
        <button 
          @click="resetAllFilters"
          class="font-bold underline hover:text-blue-800"
        >
          Reset Filter
        </button>
      </div>

      <!-- Product Cards Grid -->
      <div v-if="displayedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in displayedProducts"
          :key="product.id"
          class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
        >
          <!-- Product Image Container -->
          <div class="relative bg-gray-100 aspect-square overflow-hidden cursor-pointer" @click="catalogStore.openProductDetail(product)">
            <img
              :src="product.image"
              :alt="product.nameId"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            <!-- Top Floating Code Badge -->
            <div class="absolute top-3 left-3 flex flex-col gap-1 z-10">
              <div class="bg-black text-nezo-lime border border-nezo-lime/40 shadow-lg px-2.5 py-1 rounded-lg font-mono font-black text-xs tracking-wider flex items-center gap-1.5">
                <Tag class="w-3 h-3 text-nezo-lime" />
                <span>KODE: {{ product.code }}</span>
              </div>
              <span 
                v-if="product.category === 'lengan_pendek'"
                class="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow"
              >
                Lengan Pendek Wanita
              </span>
              <span 
                v-else
                class="bg-slate-800 text-gray-200 text-[10px] font-bold px-2 py-0.5 rounded shadow"
              >
                Reguler / Pria
              </span>
            </div>

            <!-- Quick Zoom Button -->
            <button
              @click.stop="catalogStore.openImageZoom(product.image, `${product.code} - ${product.nameId}`)"
              class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-transform hover:scale-110"
              title="Perbesar Foto"
            >
              <Maximize2 class="w-4 h-4" />
            </button>
          </div>

          <!-- Card Body -->
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <!-- Product Code & Copy Button -->
              <div class="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-gray-100">
                <span class="text-xs text-gray-400 font-mono">Kode Pesanan:</span>
                <div class="flex items-center gap-1">
                  <span class="font-mono font-extrabold text-sm text-slate-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                    {{ product.code }}
                  </span>
                  <button
                    @click="catalogStore.copyToClipboard(product.code, `Kode ${product.code} disalin!`)"
                    class="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
                    title="Salin Kode Produk"
                  >
                    <Copy class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <!-- Product Name -->
              <h3 
                @click="catalogStore.openProductDetail(product)"
                class="font-display font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer mb-1.5"
              >
                {{ localeStore.currentLang === 'en' ? product.nameEn : product.nameId }}
              </h3>

              <!-- Description -->
              <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                {{ localeStore.currentLang === 'en' ? product.descriptionEn : product.descriptionId }}
              </p>

              <!-- Color Swatches -->
              <div class="flex items-center gap-1.5 mb-4">
                <span class="text-[10px] text-gray-400 font-semibold mr-1">Warna:</span>
                <span
                  v-for="(hex, idx) in product.colors"
                  :key="idx"
                  class="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-xs"
                  :style="{ backgroundColor: hex }"
                ></span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2 pt-2 border-t border-gray-100">
              <!-- WhatsApp Order / Inquiry Button -->
              <button
                @click="handleOrderProduct(product)"
                class="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle class="w-4 h-4" />
                <span>Konsultasi via WA (Kode: {{ product.code }})</span>
              </button>

              <div class="grid grid-cols-2 gap-2">
                <!-- View Detail Modal -->
                <button
                  @click="catalogStore.openProductDetail(product)"
                  class="py-1.5 px-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-[11px] flex items-center justify-center gap-1"
                >
                  <Eye class="w-3.5 h-3.5" />
                  <span>Detail</span>
                </button>

                <!-- Direct Order Verification Page Preview -->
                <button
                  @click="catalogStore.navigateTo('order', { code: product.code, cut: product.category === 'lengan_pendek' ? 'Lengan Pendek (Wanita)' : 'Dewasa (Unisex / Pria)' })"
                  class="py-1.5 px-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-800 font-semibold text-[11px] flex items-center justify-center gap-1"
                  title="Lihat Format Order Halaman"
                >
                  <ExternalLink class="w-3.5 h-3.5" />
                  <span>Format Order</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8">
        <div class="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Model atau Kode Tidak Ditemukan</h3>
        <p class="text-xs text-gray-500 max-w-md mx-auto mb-6">
          Tidak ada jersey yang cocok dengan filter atau kata kunci "{{ searchInput || activeCodeFilter }}".
        </p>
        <button
          @click="resetAllFilters"
          class="px-5 py-2.5 rounded-xl bg-black text-nezo-lime font-bold text-xs"
        >
          Reset Semua Pencarian
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import { 
  ArrowLeft, Search, X, Tag, Copy, MessageCircle, 
  Eye, Maximize2, ExternalLink, Layers, Info 
} from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const searchInput = ref('')
const activeCodeFilter = ref('')
const selectedCategory = ref('all')

const categoryOptions = [
  { value: 'all', label: 'Semua Desain (22)' },
  { value: 'reguler', label: 'Reguler Pria (17)' },
  { value: 'lengan_pendek', label: 'Lengan Pendek Wanita (5)' },
  { value: 'populer', label: 'Paling Populer' },
  { value: 'best_seller', label: 'Best Seller' }
]

// Initialize filter from store if navigated with specific code
onMounted(() => {
  if (catalogStore.catalogCodeFilter) {
    activeCodeFilter.value = catalogStore.catalogCodeFilter
  }
})

watch(() => catalogStore.catalogCodeFilter, (newCode) => {
  if (newCode) {
    activeCodeFilter.value = newCode
  }
})

const resetAllFilters = () => {
  searchInput.value = ''
  activeCodeFilter.value = ''
  selectedCategory.value = 'all'
  catalogStore.catalogCodeFilter = ''
}

const displayedProducts = computed(() => {
  let list = catalogStore.products

  // Filter by category
  if (selectedCategory.value === 'reguler') {
    list = list.filter(p => p.category === 'reguler')
  } else if (selectedCategory.value === 'lengan_pendek') {
    list = list.filter(p => p.category === 'lengan_pendek')
  } else if (selectedCategory.value === 'populer') {
    list = list.filter(p => p.tags.includes('populer'))
  } else if (selectedCategory.value === 'best_seller') {
    list = list.filter(p => p.tags.includes('best_seller'))
  }

  // Filter by active quick code
  if (activeCodeFilter.value) {
    list = list.filter(p => p.code.toLowerCase() === activeCodeFilter.value.toLowerCase())
  }

  // Filter by search text
  if (searchInput.value.trim()) {
    const q = searchInput.value.toLowerCase().trim()
    list = list.filter(p => {
      return p.code.toLowerCase().includes(q) ||
        p.nameId.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.descriptionId.toLowerCase().includes(q) ||
        p.descriptionEn.toLowerCase().includes(q)
    })
  }

  return list
})

const handleOrderProduct = (product) => {
  catalogStore.openInquiryModal(product)
}
</script>
