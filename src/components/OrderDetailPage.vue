<template>
  <div class="bg-gray-100/70 min-h-screen py-8 sm:py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      
      <!-- Top Navigation & Breadcrumbs -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-200 mb-6">
        <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <button 
            @click="catalogStore.navigateTo('home')" 
            class="hover:text-black font-semibold flex items-center gap-1 transition-colors"
          >
            <ArrowLeft class="w-4 h-4 text-slate-800" />
            <span>{{ localeStore.t('navHome') }}</span>
          </button>
          <span>/</span>
          <button 
            @click="catalogStore.navigateTo('catalog')" 
            class="hover:text-black font-semibold transition-colors"
          >
            {{ localeStore.t('navCatalog') }}
          </button>
          <span>/</span>
          <span class="text-slate-900 font-bold">Detail Order ({{ orderProductCode }})</span>
        </div>

        <div class="flex items-center gap-2">
          <button 
            @click="catalogStore.navigateTo('catalog')"
            class="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-1.5"
          >
            <Layers class="w-3.5 h-3.5 text-gray-600" />
            <span>{{ localeStore.t('btnBackToCatalog') }}</span>
          </button>
        </div>
      </div>

      <!-- Admin & Customer Verification Banner -->
      <div class="bg-gradient-to-r from-slate-900 via-zinc-900 to-black text-white rounded-3xl p-6 sm:p-8 mb-8 border border-slate-700 shadow-xl relative overflow-hidden">
        <!-- Glow highlights -->
        <div class="absolute -right-16 -top-16 w-64 h-64 bg-nezo-lime/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-wider mb-2">
              <CheckCircle2 class="w-3.5 h-3.5" />
              <span>VERIFIKASI LINK PESANAN DARI WHATSAPP</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              {{ localeStore.t('orderDetailTitle') }}
            </h1>
            <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
              {{ localeStore.t('adminNoticeDesc') }}
            </p>
          </div>

          <!-- Order Ref Box -->
          <div class="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-3 sm:p-4 text-xs shrink-0 font-mono">
            <span class="text-gray-400 block text-[10px] uppercase tracking-wider">Ref ID Pesanan:</span>
            <strong class="text-nezo-lime text-base font-black">{{ orderRef }}</strong>
            <span class="text-[11px] text-gray-300 block mt-0.5">Waktu: {{ orderDate }}</span>
          </div>
        </div>
      </div>

      <!-- Main Order Verification Card (Side-by-Side Grid) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        <!-- LEFT: Jersey Image & Product Showcase (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          <div class="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200 shadow-sm relative overflow-hidden">
            
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Tag class="w-3.5 h-3.5 text-slate-800" />
                <span>{{ localeStore.t('orderProductImage') }}</span>
              </span>
              <span class="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border">
                {{ targetProduct?.category === 'lengan_pendek' ? 'Lengan Pendek Wanita' : 'Reguler / Pria' }}
              </span>
            </div>

            <!-- Big High-Res Product Image Container -->
            <div class="relative bg-slate-50 rounded-2xl overflow-hidden aspect-square border border-gray-100 group">
              <img
                :src="productImage"
                :alt="productName"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                @click="openZoom"
              />

              <!-- Floating Prominent Product Code Badge -->
              <div class="absolute top-3 left-3 bg-black text-nezo-lime border-2 border-nezo-lime/70 shadow-2xl px-3 py-1.5 rounded-xl font-mono font-black text-sm tracking-wider flex items-center gap-2">
                <Tag class="w-4 h-4 text-nezo-lime" />
                <span>KODE: {{ orderProductCode }}</span>
              </div>

              <!-- Zoom Button Overlay -->
              <button
                @click="openZoom"
                class="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-900 font-bold text-xs py-2 px-3 rounded-xl shadow-lg flex items-center gap-1.5 transition-all transform hover:scale-105"
              >
                <Maximize2 class="w-3.5 h-3.5 text-emerald-600" />
                <span>Perbesar HD</span>
              </button>
            </div>

            <!-- Product Identity Details -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="flex items-center justify-between gap-2 mb-1">
                <h3 class="font-display font-extrabold text-base text-slate-900">
                  {{ productName }}
                </h3>
                <span class="text-xs font-mono font-black bg-black text-nezo-lime px-2 py-0.5 rounded">
                  {{ orderProductCode }}
                </span>
              </div>

              <p class="text-xs text-gray-500 leading-relaxed mb-3">
                {{ productDesc }}
              </p>

              <!-- Color Palette -->
              <div v-if="targetProduct?.colors?.length" class="flex items-center gap-2 pt-1">
                <span class="text-xs text-gray-400 font-semibold">Palet Warna Desain:</span>
                <div class="flex items-center gap-1.5">
                  <span
                    v-for="(hex, idx) in targetProduct.colors"
                    :key="idx"
                    class="w-4 h-4 rounded-full border border-gray-300 shadow-xs"
                    :style="{ backgroundColor: hex }"
                    :title="hex"
                  ></span>
                </div>
              </div>
            </div>

            <!-- Action: Download / Open Full Image -->
            <div class="mt-4 pt-3 border-t border-gray-100 flex gap-2">
              <a
                :href="productImage"
                target="_blank"
                download
                class="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download class="w-3.5 h-3.5 text-slate-700" />
                <span>{{ localeStore.t('btnDownloadImage') }}</span>
              </a>

              <button
                @click="catalogStore.copyToClipboard(orderProductCode, `Kode ${orderProductCode} berhasil disalin!`)"
                class="py-2 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center gap-1.5"
                title="Salin Kode Produk"
              >
                <Copy class="w-3.5 h-3.5" />
                <span>Salin Kode</span>
              </button>
            </div>

          </div>
        </div>

        <!-- RIGHT: Order Specifications & Admin Actions (7 cols) -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Order Specs Table Card -->
          <div class="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm">
            <div class="flex items-center justify-between pb-4 border-b border-gray-200 mb-5">
              <div class="flex items-center gap-2">
                <ClipboardCheck class="w-5 h-5 text-emerald-600" />
                <h2 class="font-display font-extrabold text-lg text-slate-900">
                  {{ localeStore.t('orderSpecs') }}
                </h2>
              </div>
              <span class="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Status: Menunggu Konfirmasi
              </span>
            </div>

            <!-- Specs Grid -->
            <div class="space-y-3.5 text-xs sm:text-sm">
              
              <!-- 1. Kode Jersey -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-1">
                <span class="text-gray-500 font-semibold flex items-center gap-1.5">
                  <Tag class="w-4 h-4 text-slate-700" />
                  <span>{{ localeStore.t('orderProductCode') }}</span>
                </span>
                <span class="font-mono font-extrabold text-sm text-slate-900 bg-white px-2.5 py-1 rounded border border-gray-200 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {{ orderProductCode }} ({{ productName }})
                </span>
              </div>

              <!-- 2. Jenis Potongan -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-1">
                <span class="text-gray-500 font-semibold flex items-center gap-1.5">
                  <Scissors class="w-4 h-4 text-slate-700" />
                  <span>{{ localeStore.t('orderCut') }}</span>
                </span>
                <span class="font-bold text-slate-900">
                  {{ orderCut }}
                </span>
              </div>

              <!-- 3. Pilihan Bahan Kain -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-2">
                <span class="text-gray-500 font-semibold flex items-center gap-1.5">
                  <Sparkles class="w-4 h-4 text-slate-700" />
                  <span>{{ localeStore.t('orderFabric') }}</span>
                </span>
                <div class="flex items-center gap-2">
                  <img 
                    :src="fabricThumbnail" 
                    :alt="orderFabric" 
                    class="w-6 h-6 rounded-md object-cover border border-gray-300 shadow-xs" 
                  />
                  <span class="font-bold text-slate-900">
                    {{ orderFabric }}
                  </span>
                </div>
              </div>

              <!-- 4. Pilihan Ukuran -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-1">
                <span class="text-gray-500 font-semibold flex items-center gap-1.5">
                  <Ruler class="w-4 h-4 text-slate-700" />
                  <span>{{ localeStore.t('orderSize') }}</span>
                </span>
                <span class="font-bold text-slate-900 font-mono">
                  {{ orderSize }}
                </span>
              </div>

              <!-- 5. Jumlah Pemesanan -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-1">
                <span class="text-gray-500 font-semibold flex items-center gap-1.5">
                  <Boxes class="w-4 h-4 text-slate-700" />
                  <span>{{ localeStore.t('orderQty') }}</span>
                </span>
                <span class="font-black text-slate-900 text-sm font-mono bg-nezo-lime/30 px-2 py-0.5 rounded">
                  {{ orderQty }} Pcs
                </span>
              </div>

              <!-- 6. Nama Tim -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-1">
                <span class="text-gray-500 font-semibold flex items-center gap-1.5">
                  <Shield class="w-4 h-4 text-slate-700" />
                  <span>{{ localeStore.t('orderTeam') }}</span>
                </span>
                <span class="font-extrabold text-slate-900 uppercase tracking-wide">
                  {{ orderTeam || '— (Belum diisi)' }}
                </span>
              </div>

              <!-- 7. Catatan Kustom -->
              <div class="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span class="text-emerald-900 font-bold block mb-1 flex items-center gap-1.5 text-xs">
                  <FileText class="w-4 h-4 text-emerald-700" />
                  <span>{{ localeStore.t('orderNotes') }}:</span>
                </span>
                <p class="text-emerald-950 font-mono text-xs whitespace-pre-line bg-white/80 p-2.5 rounded-lg border border-emerald-200/60 leading-relaxed">
                  {{ orderNotes || 'Tidak ada catatan tambahan (desain standar sesuai portofolio).' }}
                </p>
              </div>

            </div>

            <!-- Admin Actions Bar -->
            <div class="mt-6 pt-5 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <!-- Copy Order Spec for production slip -->
              <button
                @click="copyFullOrderSlip"
                class="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Copy class="w-4 h-4 text-nezo-lime" />
                <span>{{ localeStore.t('btnCopyOrderSummary') }}</span>
              </button>

              <!-- Open WhatsApp to Reply -->
              <button
                @click="openReplyWhatsApp"
                class="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle class="w-4 h-4" />
                <span>{{ localeStore.t('btnReplyWhatsApp') }}</span>
              </button>
            </div>

          </div>

          <!-- Quick Auxiliary Modals & Reference -->
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="openSizeChart"
              class="p-4 rounded-2xl bg-white border border-gray-200 hover:border-black/30 shadow-xs text-left transition-all group"
            >
              <div class="flex items-center justify-between mb-1">
                <Ruler class="w-5 h-5 text-slate-800 group-hover:scale-110 transition-transform" />
                <ArrowRight class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <strong class="text-xs font-bold text-slate-900 block">Panduan Ukuran</strong>
              <span class="text-[11px] text-gray-500">Cek tabel size chart dewasa & anak</span>
            </button>

            <button
              @click="openTextureGuide"
              class="p-4 rounded-2xl bg-white border border-gray-200 hover:border-black/30 shadow-xs text-left transition-all group"
            >
              <div class="flex items-center justify-between mb-1">
                <Sparkles class="w-5 h-5 text-slate-800 group-hover:scale-110 transition-transform" />
                <ArrowRight class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <strong class="text-xs font-bold text-slate-900 block">Tekstur Kain</strong>
              <span class="text-[11px] text-gray-500">Pelajari serat Milano, Brazil & Embos</span>
            </button>
          </div>

        </div>

      </div>

      <!-- Bottom Recommendations / Explore More -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 class="font-display font-extrabold text-base sm:text-lg text-slate-900">
              Desain Jersey Volley Lainnya di Katalog
            </h3>
            <p class="text-xs text-gray-500">
              Jelajahi model lainnya jika ingin kombinasi warna atau variasi alternatif.
            </p>
          </div>
          <button 
            @click="catalogStore.navigateTo('catalog')"
            class="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Semua 22 Model</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          <div
            v-for="p in relatedProducts"
            :key="p.code"
            @click="catalogStore.navigateTo('order', { code: p.code })"
            class="group cursor-pointer bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-black transition-all p-2 text-center"
          >
            <div class="aspect-square rounded-lg overflow-hidden mb-2 bg-white">
              <img :src="p.image" :alt="p.nameId" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <span class="font-mono font-bold text-xs text-slate-900 block group-hover:text-emerald-700">{{ p.code }}</span>
            <span class="text-[10px] text-gray-500 line-clamp-1">{{ p.nameId }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import { 
  ArrowLeft, Tag, Layers, CheckCircle2, Maximize2, Download, Copy,
  ClipboardCheck, Scissors, Sparkles, Ruler, Boxes, Shield, FileText,
  MessageCircle, ArrowRight 
} from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

// Read order details from store
const order = computed(() => catalogStore.currentOrderDetail || {})

const orderProductCode = computed(() => {
  return order.value.code || 'NZ-V02'
})

const targetProduct = computed(() => {
  return order.value.product || catalogStore.products.find(p => p.code.toLowerCase() === orderProductCode.value.toLowerCase()) || catalogStore.products[0]
})

const productName = computed(() => {
  if (!targetProduct.value) return 'Volley Jersey Custom'
  return localeStore.currentLang === 'en' ? targetProduct.value.nameEn : targetProduct.value.nameId
})

const productDesc = computed(() => {
  if (!targetProduct.value) return ''
  return localeStore.currentLang === 'en' ? targetProduct.value.descriptionEn : targetProduct.value.descriptionId
})

const productImage = computed(() => {
  return targetProduct.value?.image || '/assets/portfolio_volley/01.jpeg'
})

const orderCut = computed(() => {
  return order.value.cut || (targetProduct.value?.category === 'lengan_pendek' ? 'Lengan Pendek (Wanita)' : 'Dewasa (Unisex / Pria)')
})

const orderFabric = computed(() => {
  return order.value.fabric || 'Dryfit Milano (Chevron Weave - Rekomendasi)'
})

const fabricThumbnail = computed(() => {
  const f = orderFabric.value.toLowerCase()
  if (f.includes('brazil')) return '/assets/texture/separated/brazil_swatch.jpg'
  if (f.includes('embos')) return '/assets/texture/separated/embos_swatch.jpg'
  return '/assets/texture/separated/milano_swatch.jpg'
})

const orderSize = computed(() => {
  return order.value.size || 'Dewasa L (Lebar 52 cm)'
})

const orderQty = computed(() => {
  return order.value.qty || '12'
})

const orderTeam = computed(() => {
  return order.value.teamName || ''
})

const orderNotes = computed(() => {
  return order.value.notes || ''
})

const orderRef = computed(() => {
  return order.value.ref || 'NZ-ORDER'
})

const orderDate = computed(() => {
  return order.value.createdAt || new Date().toLocaleDateString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
})

const relatedProducts = computed(() => {
  return catalogStore.products.filter(p => p.code !== orderProductCode.value).slice(0, 6)
})

const openZoom = () => {
  catalogStore.openImageZoom(productImage.value, `${orderProductCode.value} - ${productName.value}`)
}

const openSizeChart = () => {
  catalogStore.isSizeChartModalOpen = true
}

const openTextureGuide = () => {
  catalogStore.isTextureModalOpen = true
}

const copyFullOrderSlip = () => {
  const slipText = `==============================
RINGKASAN ORDER VOLLEY - NEZO FACTORY
Ref ID: ${orderRef.value}
Tanggal: ${orderDate.value}
------------------------------
Kode Produk: ${orderProductCode.value}
Nama Desain: ${productName.value}
Jenis Potongan: ${orderCut.value}
Bahan Kain: ${orderFabric.value}
Perkiraan Ukuran: ${orderSize.value}
Jumlah: ${orderQty.value} Pcs
Nama Tim: ${orderTeam.value || '-'}
Catatan Kustom: ${orderNotes.value || '-'}
------------------------------
Link Gambar & Detail:
${typeof window !== 'undefined' ? window.location.href : ''}
==============================`

  catalogStore.copyToClipboard(slipText, localeStore.t('orderSummaryCopied'))
}

const openReplyWhatsApp = () => {
  const link = catalogStore.generateWhatsAppLink({
    product: targetProduct.value,
    cut: orderCut.value,
    fabric: orderFabric.value,
    size: orderSize.value,
    qty: orderQty.value,
    teamName: orderTeam.value,
    notes: orderNotes.value
  })
  window.open(link, '_blank')
}
</script>
