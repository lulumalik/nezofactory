<template>
  <div 
    v-if="catalogStore.isDetailModalOpen && product" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity"
    @click.self="catalogStore.isDetailModalOpen = false"
  >
    <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200">
      <!-- Close Button -->
      <button 
        @click="catalogStore.isDetailModalOpen = false"
        class="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors z-20"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
        <!-- LEFT: Large Image Preview -->
        <div class="space-y-3">
          <div class="relative bg-gray-50 rounded-xl overflow-hidden aspect-square border border-gray-100 group">
            <img 
              :src="product.image" 
              :alt="product.code"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <button 
              @click="catalogStore.openImageZoom(product.image, `${product.code} - ${isEn ? product.nameEn : product.nameId}`)"
              class="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Maximize2 class="w-3.5 h-3.5" />
              <span>Perbesar Foto</span>
            </button>
          </div>

          <!-- Color Swatches -->
          <div class="bg-gray-50 p-3 rounded-xl border border-gray-200">
            <span class="text-xs font-bold text-gray-700 block mb-1.5">Palet Warna Desain:</span>
            <div class="flex items-center gap-2">
              <div 
                v-for="(hex, idx) in product.colors" 
                :key="idx"
                class="w-6 h-6 rounded-full border border-gray-300 shadow-sm flex items-center justify-center text-[9px] font-mono"
                :style="{ backgroundColor: hex }"
              ></div>
              <span class="text-xs text-gray-500 ml-2">Warna dapat disesuaikan tim</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: Product Info & Order Selector -->
        <div class="flex flex-col justify-between space-y-5">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 uppercase tracking-wider font-mono">
                {{ product.code }}
              </span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700 uppercase">
                {{ product.category === 'lengan_pendek' ? 'Lengan Pendek / Wanita' : 'Volley Regular' }}
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-display font-black text-gray-900 mt-2">
              {{ isEn ? product.nameEn : product.nameId }}
            </h3>

            <p class="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              {{ isEn ? product.descriptionEn : product.descriptionId }}
            </p>

            <!-- Custom Options Included -->
            <div class="mt-4 p-3 bg-lime-50/70 border border-lime-200 rounded-xl space-y-1 text-xs text-lime-900">
              <div class="font-bold flex items-center gap-1.5">
                <Sparkles class="w-4 h-4 text-emerald-700" />
                <span>Fitur Bebas Kustom (Sudah Termasuk):</span>
              </div>
              <ul class="grid grid-cols-2 gap-1 text-[11px] pt-1">
                <li>✓ Gratis Pasang Nama Pemain</li>
                <li>✓ Gratis Pasang Nomor Punggung & Dada</li>
                <li>✓ Gratis Pasang Logo Tim & Sponsor</li>
                <li>✓ Gratis Konsultasi Desain & Revisi</li>
              </ul>
            </div>

            <!-- Quick Fabric Preference -->
            <div class="mt-4">
              <label class="block text-xs font-bold text-gray-700 mb-1.5">Pilihan Bahan Rekomendasi:</label>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  v-for="fab in catalogStore.fabrics" 
                  :key="fab.id"
                  @click="selectedFabricId = fab.id"
                  :class="[
                    'py-2 px-2 rounded-lg text-xs font-bold border transition-all text-center',
                    selectedFabricId === fab.id 
                      ? 'bg-nezo-black text-white border-nezo-black shadow-sm' 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  ]"
                >
                  {{ fab.name }}
                </button>
              </div>
            </div>

            <!-- Size Selector -->
            <div class="mt-4">
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-gray-700">Pilihan Ukuran:</label>
                <a href="#size-chart" @click="catalogStore.isDetailModalOpen = false" class="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1">
                  <Ruler class="w-3.5 h-3.5" />
                  <span>Lihat Size Chart</span>
                </a>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <button 
                  v-for="s in ['S', 'M', 'L', 'XL', '2XL', '3XL', 'Anak XS-XXL']" 
                  :key="s"
                  @click="selectedSize = s"
                  :class="[
                    'px-2.5 py-1 rounded text-xs font-bold border transition-colors',
                    selectedSize === s ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  ]"
                >
                  {{ s }}
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <button 
              @click="proceedToWhatsAppOrder"
              class="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <MessageCircle class="w-5 h-5" />
              <span>Tanya / Pesan Model Ini di WhatsApp</span>
            </button>

            <button 
              @click="openCustomOrderBuilder"
              class="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Atur Rincian Tim Lengkap (Form Pesanan)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import { X, MessageCircle, Maximize2, Sparkles, Ruler } from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const product = computed(() => catalogStore.selectedProduct)
const isEn = computed(() => localeStore.currentLang === 'en')

const selectedFabricId = ref('milano')
const selectedSize = ref('L')

const proceedToWhatsAppOrder = () => {
  const fabricObj = catalogStore.fabrics.find(f => f.id === selectedFabricId.value)
  catalogStore.directToWhatsApp({
    product: product.value,
    cut: product.value.category === 'lengan_pendek' ? 'Lengan Pendek / Wanita' : 'Dewasa (Unisex / Pria)',
    size: selectedSize.value,
    fabric: fabricObj ? fabricObj.name : 'Dryfit Milano',
    notes: 'Mohon info harga dan estimasi lama pengerjaan.'
  })
}

const openCustomOrderBuilder = () => {
  catalogStore.isDetailModalOpen = false
  catalogStore.openInquiryModal(product.value)
}
</script>
