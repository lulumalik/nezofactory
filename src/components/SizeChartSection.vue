<template>
  <section id="size-chart" class="py-14 sm:py-20 bg-gray-50 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Ruler class="w-3.5 h-3.5 text-emerald-600" />
          <span>Standar Ukuran Standar Nezo Factory</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-display font-black tracking-tight text-gray-900">
          {{ localeStore.t('sizeTitle') }}
        </h2>
        <p class="mt-2 text-xs sm:text-sm text-gray-500">
          {{ localeStore.t('sizeSubtitle') }}
        </p>

        <!-- Category Tabs (Dewasa, Anak, Jaket) -->
        <div class="mt-6 flex flex-wrap justify-center gap-2">
          <button
            @click="activeTab = 'adult'"
            :class="[
              'px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 border',
              activeTab === 'adult'
                ? 'bg-nezo-black text-white border-nezo-black shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
            ]"
          >
            <span>👨‍🦱 {{ localeStore.t('tabAdult') }}</span>
          </button>

          <button
            @click="activeTab = 'kids'"
            :class="[
              'px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 border',
              activeTab === 'kids'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
            ]"
          >
            <span>👦 {{ localeStore.t('tabKids') }}</span>
          </button>

          <button
            @click="activeTab = 'jacket'"
            :class="[
              'px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 border',
              activeTab === 'jacket'
                ? 'bg-nezo-red text-white border-nezo-red shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
            ]"
          >
            <span>🧥 {{ localeStore.t('tabJacket') }}</span>
          </button>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Table Area -->
        <div class="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 class="text-base sm:text-lg font-black text-gray-900">
                {{ activeChartData.title }}
              </h3>
              <p class="text-xs text-gray-500 mt-0.5">
                {{ localeStore.t('toleranceNote') }}
              </p>
            </div>

            <!-- View Graphic Chart Button -->
            <button 
              @click="catalogStore.openImageZoom(activeChartData.image, activeChartData.title)"
              class="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <FileImage class="w-3.5 h-3.5 text-gray-500" />
              <span>{{ localeStore.t('viewFullSizeChartImg') }}</span>
            </button>
          </div>

          <!-- TABLE: ADULT -->
          <div v-if="activeTab === 'adult'" class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200 text-gray-700 text-xs uppercase font-extrabold tracking-wider">
                  <th class="py-3 px-4 sm:px-6">Ukuran (Size)</th>
                  <th class="py-3 px-4 sm:px-6">Lebar Dada</th>
                  <th class="py-3 px-4 sm:px-6">Panjang Kaos</th>
                  <th class="py-3 px-4 sm:px-6">Keterangan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-xs sm:text-sm font-medium text-gray-800">
                <tr 
                  v-for="(row, idx) in catalogStore.sizeCharts.adult.rows" 
                  :key="idx"
                  class="hover:bg-lime-50/50 transition-colors"
                >
                  <td class="py-3.5 px-4 sm:px-6 font-black text-emerald-800 bg-gray-50/50">{{ row.size }}</td>
                  <td class="py-3.5 px-4 sm:px-6 font-semibold">{{ row.width }}</td>
                  <td class="py-3.5 px-4 sm:px-6 font-semibold">{{ row.length }}</td>
                  <td class="py-3.5 px-4 sm:px-6 text-gray-500">
                    <span v-if="row.note" class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                      {{ row.note }}
                    </span>
                    <span v-else class="text-gray-400">Standar</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- TABLE: KIDS -->
          <div v-else-if="activeTab === 'kids'" class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200 text-gray-700 text-xs uppercase font-extrabold tracking-wider">
                  <th class="py-3 px-4 sm:px-6">Rentang Umur</th>
                  <th class="py-3 px-4 sm:px-6">Ukuran (Size)</th>
                  <th class="py-3 px-4 sm:px-6">Lebar Dada</th>
                  <th class="py-3 px-4 sm:px-6">Panjang Kaos</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-xs sm:text-sm font-medium text-gray-800">
                <tr 
                  v-for="(row, idx) in catalogStore.sizeCharts.kids.rows" 
                  :key="idx"
                  class="hover:bg-blue-50/50 transition-colors"
                >
                  <td class="py-3.5 px-4 sm:px-6 font-bold text-blue-800 bg-blue-50/30">{{ row.age }}</td>
                  <td class="py-3.5 px-4 sm:px-6 font-black text-emerald-800">{{ row.size }}</td>
                  <td class="py-3.5 px-4 sm:px-6 font-semibold">{{ row.width }}</td>
                  <td class="py-3.5 px-4 sm:px-6 font-semibold">{{ row.length }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- TABLE: JACKET -->
          <div v-else-if="activeTab === 'jacket'" class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200 text-gray-700 text-xs uppercase font-extrabold tracking-wider">
                  <th class="py-3 px-4 sm:px-6">Ukuran (Size)</th>
                  <th class="py-3 px-4 sm:px-6">Lebar Jaket</th>
                  <th class="py-3 px-4 sm:px-6">Tinggi Jaket</th>
                  <th class="py-3 px-4 sm:px-6">Keterangan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-xs sm:text-sm font-medium text-gray-800">
                <tr 
                  v-for="(row, idx) in catalogStore.sizeCharts.jacket.rows" 
                  :key="idx"
                  class="hover:bg-rose-50/50 transition-colors"
                >
                  <td class="py-3.5 px-4 sm:px-6 font-black text-rose-800 bg-rose-50/30">{{ row.size }}</td>
                  <td class="py-3.5 px-4 sm:px-6 font-semibold">{{ row.width }}</td>
                  <td class="py-3.5 px-4 sm:px-6 font-semibold">{{ row.height }}</td>
                  <td class="py-3.5 px-4 sm:px-6 text-gray-400">Standar Jaket Nezo</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer Note in Table -->
          <div class="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-2">
            <span class="flex items-center gap-1.5">
              <Info class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{{ localeStore.t('extraSizeNote') }}</span>
            </span>
            <button 
              @click="consultSizeWA"
              class="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Konsultasi Ukuran via WA</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- How to Measure Guide (Visual Card) -->
        <div class="lg:col-span-4 space-y-4">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-5">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-nezo-lime/20 flex items-center justify-center text-nezo-black font-bold">
                <HelpCircle class="w-5 h-5 text-emerald-700" />
              </div>
              <h4 class="font-black text-sm uppercase text-gray-900 tracking-wide">
                {{ localeStore.t('measuringGuideTitle') }}
              </h4>
            </div>

            <div class="space-y-4">
              <!-- Lebar dada -->
              <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                  ↔
                </div>
                <div>
                  <h5 class="text-xs font-bold text-gray-900 uppercase">Lebar Kaos / Dada</h5>
                  <p class="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    {{ localeStore.t('measureWidth') }}
                  </p>
                </div>
              </div>

              <!-- Panjang kaos -->
              <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                  ↕
                </div>
                <div>
                  <h5 class="text-xs font-bold text-gray-900 uppercase">Panjang Kaos</h5>
                  <p class="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    {{ localeStore.t('measureLength') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Features from Size Chart -->
            <div class="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-[11px] font-semibold text-gray-600">
              <div class="flex items-center gap-1.5">
                <Check class="w-3.5 h-3.5 text-emerald-600" />
                <span>Bahan Berkualitas</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Check class="w-3.5 h-3.5 text-emerald-600" />
                <span>Lembut di Kulit</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Check class="w-3.5 h-3.5 text-emerald-600" />
                <span>Nyaman Dipakai</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Check class="w-3.5 h-3.5 text-emerald-600" />
                <span>Tampil Keren</span>
              </div>
            </div>

            <!-- CTA Card -->
            <div class="pt-2">
              <button 
                @click="consultSizeWA"
                class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle class="w-4 h-4" />
                <span>Tanya Ukuran Tim via WhatsApp</span>
              </button>
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
import { Ruler, FileImage, Info, ArrowRight, HelpCircle, Check, MessageCircle } from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const activeTab = ref('adult')

const isEn = computed(() => localeStore.currentLang === 'en')

const activeChartData = computed(() => {
  const chart = catalogStore.sizeCharts[activeTab.value]
  return {
    title: isEn.value ? chart.titleEn : chart.titleId,
    image: chart.image
  }
})

const consultSizeWA = () => {
  catalogStore.directToWhatsApp({
    notes: `Halo Admin Nezo Factory, saya mau konsultasi ukuran (${activeTab.value.toUpperCase()}) untuk seragam tim kami.`
  })
}
</script>
