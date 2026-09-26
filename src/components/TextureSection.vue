<template>
  <section id="fabrics" class="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#ccff00_1px,transparent_1px)] [background-size:20px_20px]"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nezo-lime/10 border border-nezo-lime/30 text-nezo-lime text-xs font-bold uppercase tracking-wider mb-2.5">
          <Sparkles class="w-3.5 h-3.5" />
          <span>{{ localeStore.t('badgeMaterial') }}</span>
        </div>
        
        <h2 class="text-2xl sm:text-4xl font-display font-black tracking-tight text-white">
          {{ localeStore.t('fabricTitle') }}
        </h2>
        <p class="mt-2 text-xs sm:text-sm text-gray-300">
          {{ localeStore.t('fabricSubtitle') }}
        </p>
      </div>

      <!-- Active Fabric Detail Card -->
      <div v-if="currentFabric" class="bg-slate-950/80 border border-slate-800 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT: 4 Separated Texture Crops Showcase -->
          <div class="lg:col-span-7 space-y-4">
            <!-- Main Texture Feature -->
            <div class="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 group aspect-video sm:aspect-[16/10]">
              <img 
                :src="activeCropImage" 
                :alt="currentFabric.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <div class="flex items-center justify-between w-full">
                  <div>
                    <span class="text-xs uppercase tracking-wider font-extrabold text-nezo-lime">{{ activeCropLabel }}</span>
                    <h4 class="text-lg font-black text-white">{{ currentFabric.name }}</h4>
                  </div>
                  <button 
                    @click="catalogStore.openImageZoom(activeCropImage, `${currentFabric.name} - ${activeCropLabel}`)"
                    class="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Maximize2 class="w-3.5 h-3.5" />
                    <span>Zoom HD</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 4 Separated Crops Selector Buttons -->
            <div class="grid grid-cols-4 gap-2 sm:gap-3">
              <!-- Crop 1: Fabric Swatch -->
              <button 
                @click="activeCropIndex = 0"
                :class="[
                  'p-1.5 rounded-xl border transition-all text-left group overflow-hidden bg-slate-900',
                  activeCropIndex === 0 ? 'border-nezo-lime ring-2 ring-nezo-lime/40' : 'border-slate-800 hover:border-slate-700'
                ]"
              >
                <img :src="currentFabric.images.swatch" alt="Kain Asli" class="w-full h-14 sm:h-20 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                <span class="block text-[10px] sm:text-xs font-bold text-gray-300 mt-1 truncate">Kain Asli</span>
              </button>

              <!-- Crop 2: Texture Detail -->
              <button 
                @click="activeCropIndex = 1"
                :class="[
                  'p-1.5 rounded-xl border transition-all text-left group overflow-hidden bg-slate-900',
                  activeCropIndex === 1 ? 'border-nezo-lime ring-2 ring-nezo-lime/40' : 'border-slate-800 hover:border-slate-700'
                ]"
              >
                <img :src="currentFabric.images.macro" alt="Tekstur Serat" class="w-full h-14 sm:h-20 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                <span class="block text-[10px] sm:text-xs font-bold text-gray-300 mt-1 truncate">Tekstur Serat</span>
              </button>

              <!-- Crop 3: Color Pattern -->
              <button 
                @click="activeCropIndex = 2"
                :class="[
                  'p-1.5 rounded-xl border transition-all text-left group overflow-hidden bg-slate-900',
                  activeCropIndex === 2 ? 'border-nezo-lime ring-2 ring-nezo-lime/40' : 'border-slate-800 hover:border-slate-700'
                ]"
              >
                <img :src="currentFabric.images.sublim" alt="Warna Motif" class="w-full h-14 sm:h-20 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                <span class="block text-[10px] sm:text-xs font-bold text-gray-300 mt-1 truncate">Warna Motif</span>
              </button>

              <!-- Crop 4: Jersey Mockup -->
              <button 
                @click="activeCropIndex = 3"
                :class="[
                  'p-1.5 rounded-xl border transition-all text-left group overflow-hidden bg-slate-900',
                  activeCropIndex === 3 ? 'border-nezo-lime ring-2 ring-nezo-lime/40' : 'border-slate-800 hover:border-slate-700'
                ]"
              >
                <img :src="currentFabric.images.mockup" alt="Jersey Jadi" class="w-full h-14 sm:h-20 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                <span class="block text-[10px] sm:text-xs font-bold text-gray-300 mt-1 truncate">Jersey Jadi</span>
              </button>
            </div>

            <!-- View Full Original Infographic button -->
            <div class="pt-2 text-center">
              <button 
                @click="catalogStore.openImageZoom(currentFabric.images.full, `Brosur Resmi ${currentFabric.name}`)"
                class="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-nezo-lime underline transition-colors"
              >
                <FileImage class="w-4 h-4" />
                <span>Lihat Foto Brosur Lengkap</span>
              </button>
            </div>
          </div>

          <!-- RIGHT: Specifications, Benefits, & Order Actions -->
          <div class="lg:col-span-5 space-y-6">
            <!-- Fabric Selection Switcher Tabs (Directly above fabric details) -->
            <div class="space-y-2 pb-3 border-b border-slate-800">
              <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                {{ isEn ? 'Switch Fabric Choice:' : 'Pilih / Ganti Jenis Bahan:' }}
              </span>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="fabric in catalogStore.fabrics"
                  :key="fabric.id"
                  @click="activeFabricId = fabric.id"
                  :class="[
                    'px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 border',
                    activeFabricId === fabric.id
                      ? 'bg-nezo-lime text-black border-nezo-lime shadow-glow-lime scale-105'
                      : 'bg-slate-900 hover:bg-slate-800 text-gray-300 border-slate-700'
                  ]"
                >
                  <span class="w-2 h-2 rounded-full" :class="activeFabricId === fabric.id ? 'bg-black' : 'bg-gray-500'"></span>
                  <span>{{ fabric.name }}</span>
                </button>
              </div>
            </div>

            <div>
              <div class="flex items-center gap-2 text-nezo-lime text-xs font-extrabold tracking-widest uppercase">
                <CheckCircle2 class="w-4 h-4" />
                <span>{{ currentFabric.tagline }}</span>
              </div>
              <h3 class="text-2xl sm:text-3xl font-display font-black text-white mt-1">
                {{ currentFabric.name }}
              </h3>
              <p class="text-xs text-gray-400 font-semibold mt-0.5">
                {{ currentFabric.subtitle }}
              </p>
              <p class="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
                {{ isEn ? currentFabric.descEn : currentFabric.descId }}
              </p>
            </div>

            <!-- Characteristics Grid -->
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Tekstur Kain</span>
                <p class="text-xs font-medium text-gray-200 mt-1">
                  {{ isEn ? currentFabric.macroDetailEn : currentFabric.macroDetailId }}
                </p>
              </div>

              <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span class="text-[10px] text-gray-400 uppercase font-bold block">Ketahanan Warna</span>
                <p class="text-xs font-medium text-gray-200 mt-1">
                  {{ isEn ? currentFabric.sublimResultEn : currentFabric.sublimResultId }}
                </p>
              </div>
            </div>

            <!-- Benefits List -->
            <div class="space-y-2">
              <h5 class="text-xs font-black uppercase tracking-wider text-gray-300">
                {{ localeStore.t('keyBenefits') }}:
              </h5>
              <ul class="space-y-1.5 text-xs text-gray-300">
                <li 
                  v-for="(ben, bIdx) in (isEn ? currentFabric.benefitsEn : currentFabric.benefitsId)" 
                  :key="bIdx"
                  class="flex items-start gap-2"
                >
                  <Check class="w-4 h-4 text-nezo-lime shrink-0 mt-0.5" />
                  <span>{{ ben }}</span>
                </li>
              </ul>
            </div>

            <!-- Order via WhatsApp with pre-selected fabric -->
            <div class="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button 
                @click="orderWithFabric(currentFabric)"
                class="flex-1 py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <MessageCircle class="w-4 h-4" />
                <span>{{ localeStore.t('orderWithFabric') }}</span>
              </button>

              <a 
                href="#size-chart"
                class="py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <Ruler class="w-4 h-4" />
                <span>Cek Ukuran</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import { 
  Sparkles, CheckCircle2, Check, MessageCircle, 
  Maximize2, FileImage, Ruler 
} from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const activeFabricId = ref('milano')
const activeCropIndex = ref(1) // 0: swatch, 1: macro, 2: sublim, 3: mockup

const isEn = computed(() => localeStore.currentLang === 'en')

const currentFabric = computed(() => {
  return catalogStore.fabrics.find(f => f.id === activeFabricId.value) || catalogStore.fabrics[0]
})

const activeCropImage = computed(() => {
  if (!currentFabric.value) return ''
  const imgs = currentFabric.value.images
  switch (activeCropIndex.value) {
    case 0: return imgs.swatch
    case 1: return imgs.macro
    case 2: return imgs.sublim
    case 3: return imgs.mockup
    default: return imgs.macro
  }
})

const activeCropLabel = computed(() => {
  switch (activeCropIndex.value) {
    case 0: return 'Tampilan Kain Asli'
    case 1: return 'Detail Tekstur Serat Kain'
    case 2: return 'Hasil Warna Motif Tajam & Anti Luntur'
    case 3: return 'Visual Saat Jadi Jersey'
    default: return 'Tekstur Kain'
  }
})

const orderWithFabric = (fabric) => {
  catalogStore.openInquiryModal({
    id: 'custom-fabric',
    code: 'CUSTOM-FABRIC',
    nameId: `Kustom Jersey Bahan ${fabric.name}`,
    nameEn: `Custom Jersey with ${fabric.name}`,
    category: 'reguler',
    tags: ['reguler'],
    image: fabric.images.mockup,
    colors: ['#000000', '#ccff00']
  })
}
</script>
