<template>
  <div 
    v-if="catalogStore.isOrderModalOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity"
    @click.self="catalogStore.isOrderModalOpen = false"
  >
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 bg-gradient-to-r from-nezo-black to-slate-900 text-white rounded-t-2xl flex items-center justify-between border-b border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <MessageCircle class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-display font-black text-lg sm:text-xl text-white">
              {{ localeStore.t('modalTitle') }}
            </h3>
            <p class="text-xs text-gray-300">
              Direct WhatsApp Admin • Fast Response
            </p>
          </div>
        </div>

        <button 
          @click="catalogStore.isOrderModalOpen = false"
          class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="submitToWhatsApp" class="p-5 sm:p-6 space-y-4">
        
        <!-- Product Selection -->
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            {{ localeStore.t('formProduct') }}
          </label>
          <div class="flex items-center gap-3 p-2 rounded-xl border border-gray-200 bg-gray-50">
            <img 
              :src="currentProductImage" 
              alt="Selected Product" 
              class="w-12 h-12 object-cover rounded-lg border border-gray-200 shrink-0" 
            />
            <select 
              v-model="selectedProductCode" 
              class="flex-1 bg-transparent text-xs sm:text-sm font-bold text-gray-900 focus:outline-none cursor-pointer"
            >
              <option 
                v-for="p in catalogStore.products" 
                :key="p.id" 
                :value="p.code"
              >
                {{ p.code }} - {{ isEn ? p.nameEn : p.nameId }} ({{ p.category === 'lengan_pendek' ? 'Wanita/Short' : 'Reguler' }})
              </option>
            </select>
          </div>
        </div>

        <!-- Cut & Category Selector -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              {{ localeStore.t('formCut') }}
            </label>
            <select 
              v-model="formData.cut" 
              class="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white font-semibold text-gray-800 focus:ring-2 focus:ring-nezo-lime focus:border-nezo-lime outline-none"
            >
              <option value="Dewasa (Unisex / Pria)">{{ localeStore.t('cutAdult') }}</option>
              <option value="Lengan Pendek (Wanita / Cap Sleeves)">{{ localeStore.t('cutWomen') }}</option>
              <option value="Anak-Anak (Kids 1-12 Th)">{{ localeStore.t('cutKids') }}</option>
              <option value="Campuran Roster Tim (Dewasa + Anak)">Campuran / Custom Roster</option>
            </select>
          </div>

          <!-- Fabric Choice -->
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              {{ localeStore.t('formFabric') }}
            </label>
            <select 
              v-model="formData.fabric" 
              class="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white font-semibold text-gray-800 focus:ring-2 focus:ring-nezo-lime focus:border-nezo-lime outline-none"
            >
              <option value="Dryfit Milano (Chevron Weave - Rekomendasi)">Dryfit Milano (Rekomendasi Utama)</option>
              <option value="Dryfit Brazil (Micro-dot Adem)">Dryfit Brazil (Micro-dot Adem)</option>
              <option value="Embos Topo (3D Contour Mewah)">Embos Topo (3D Contour Mewah)</option>
              <option value="Belum Tahu, Minta Saran Admin">Belum Tahu (Minta Saran Admin)</option>
            </select>
          </div>
        </div>

        <!-- Size & Estimated Quantity -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Size Selector -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                {{ localeStore.t('formSize') }}
              </label>
              <span class="text-[11px] text-emerald-700 font-semibold cursor-pointer hover:underline" @click="openSizeChartModal">
                Lihat Tabel Size
              </span>
            </div>
            <select 
              v-model="formData.size" 
              class="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white font-semibold text-gray-800 focus:ring-2 focus:ring-nezo-lime focus:border-nezo-lime outline-none"
            >
              <optgroup label="Ukuran Dewasa">
                <option value="Dewasa S (Lebar 48 cm)">Dewasa S (Lebar 48 cm)</option>
                <option value="Dewasa M (Lebar 50 cm)">Dewasa M (Lebar 50 cm)</option>
                <option value="Dewasa L (Lebar 52 cm)">Dewasa L (Lebar 52 cm)</option>
                <option value="Dewasa XL (Lebar 54 cm)">Dewasa XL (Lebar 54 cm)</option>
                <option value="Dewasa 2XL (Lebar 56 cm)">Dewasa 2XL (Lebar 56 cm)</option>
                <option value="Dewasa 3XL (Lebar 58 cm)">Dewasa 3XL (Lebar 58 cm)</option>
                <option value="Dewasa 4XL - 5XL">Dewasa 4XL - 5XL (Big Size)</option>
              </optgroup>
              <optgroup label="Ukuran Anak-Anak">
                <option value="Anak XS (1-2 Th, Lebar 30 cm)">Anak XS (1-2 Th, Lebar 30 cm)</option>
                <option value="Anak S (3-4 Th, Lebar 32 cm)">Anak S (3-4 Th, Lebar 32 cm)</option>
                <option value="Anak M (5-6 Th, Lebar 35 cm)">Anak M (5-6 Th, Lebar 35 cm)</option>
                <option value="Anak L (7-8 Th, Lebar 38 cm)">Anak L (7-8 Th, Lebar 38 cm)</option>
                <option value="Anak XL (9-10 Th, Lebar 42 cm)">Anak XL (9-10 Th, Lebar 42 cm)</option>
                <option value="Anak XXL (11-12 Th, Lebar 45 cm)">Anak XXL (11-12 Th, Lebar 45 cm)</option>
              </optgroup>
              <optgroup label="Format Tim">
                <option value="Kirim List Ukuran Roster via WhatsApp">Kirim List Ukuran Roster Lengkap via WA</option>
              </optgroup>
            </select>
          </div>

          <!-- Quantity -->
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              {{ localeStore.t('formQty') }}
            </label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="formData.qty" 
                type="number" 
                min="1" 
                class="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white font-semibold text-gray-800 focus:ring-2 focus:ring-nezo-lime focus:border-nezo-lime outline-none"
              />
              <div class="flex gap-1">
                <button type="button" @click="formData.qty = 6" class="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">6</button>
                <button type="button" @click="formData.qty = 12" class="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">12</button>
                <button type="button" @click="formData.qty = 24" class="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">24</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Name (Optional) -->
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            {{ localeStore.t('formTeamName') }}
          </label>
          <input 
            v-model="formData.teamName" 
            type="text" 
            placeholder="Contoh: Volley Club Garuda, Tim Putri Pertiwi..."
            class="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white text-gray-800 focus:ring-2 focus:ring-nezo-lime focus:border-nezo-lime outline-none"
          />
        </div>

        <!-- Custom Request Notes -->
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            {{ localeStore.t('formNotes') }}
          </label>
          <textarea 
            v-model="formData.notes" 
            rows="2" 
            :placeholder="localeStore.t('formNotesPlaceholder')"
            class="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs text-gray-800 focus:ring-2 focus:ring-nezo-lime focus:border-nezo-lime outline-none resize-none"
          ></textarea>
        </div>

        <!-- Realtime WhatsApp Message Preview -->
        <div class="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-emerald-950 space-y-1.5">
          <div class="flex items-center justify-between text-[11px] font-bold text-emerald-800">
            <span class="flex items-center gap-1">
              <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600" />
              Format Pesan WhatsApp (+ Link Web):
            </span>
            <span class="text-[10px] text-gray-500">Tujuan: {{ catalogStore.formattedWhatsappNumber }}</span>
          </div>
          <p class="text-[11px] font-mono whitespace-pre-line text-emerald-950 max-h-24 overflow-y-auto bg-white/80 p-2.5 rounded-lg border border-emerald-100 leading-relaxed select-all">
            {{ rawMessageText }}
          </p>
          <div class="flex justify-end pt-1">
            <button
              type="button"
              @click="previewOrderPage"
              class="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold underline flex items-center gap-1"
            >
              <ExternalLink class="w-3 h-3" />
              <span>Preview Tampilan Halaman Order Ini</span>
            </button>
          </div>
        </div>

        <!-- Submit & Actions -->
        <div class="pt-2 flex flex-col sm:flex-row gap-3">
          <button 
            type="submit" 
            class="flex-1 py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle class="w-5 h-5" />
            <span>{{ localeStore.t('sendToWA') }}</span>
          </button>

          <button 
            type="button" 
            @click="catalogStore.isOrderModalOpen = false"
            class="py-3 px-5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm transition-colors"
          >
            {{ localeStore.t('cancel') }}
          </button>
        </div>

        <!-- Store Owner: Change WhatsApp Number -->
        <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <button 
            type="button" 
            @click="isEditingWaNumber = !isEditingWaNumber"
            class="text-gray-500 hover:text-black flex items-center gap-1 font-semibold"
          >
            <Settings class="w-3 h-3" />
            <span>{{ localeStore.t('changeWaNumber') }} (Saat ini: {{ catalogStore.formattedWhatsappNumber }})</span>
          </button>
        </div>

        <!-- WhatsApp Number Editor Field -->
        <div v-if="isEditingWaNumber" class="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2">
          <input 
            v-model="customWaInput" 
            type="text" 
            placeholder="897-6005-626 atau 628976005626" 
            class="flex-1 py-1.5 px-3 text-xs border rounded-lg focus:outline-none"
          />
          <button 
            type="button" 
            @click="saveCustomWaNumber" 
            class="px-3 py-1.5 bg-nezo-black text-white text-xs font-bold rounded-lg hover:bg-gray-800"
          >
            Simpan
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import { MessageCircle, X, CheckCircle2, Settings, ExternalLink } from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const isEn = computed(() => localeStore.currentLang === 'en')

const selectedProductCode = ref('NZ-V02')
const isEditingWaNumber = ref(false)
const customWaInput = ref(catalogStore.whatsappNumber)

const formData = ref({
  cut: 'Dewasa (Unisex / Pria)',
  fabric: 'Dryfit Milano (Chevron Weave - Rekomendasi)',
  size: 'Dewasa L (Lebar 52 cm)',
  qty: 12,
  teamName: '',
  notes: ''
})

// Sync when modal opens with target product
watch(() => catalogStore.orderTargetProduct, (target) => {
  if (target) {
    selectedProductCode.value = target.code
    if (target.category === 'lengan_pendek') {
      formData.value.cut = 'Lengan Pendek (Wanita / Cap Sleeves)'
    }
  }
}, { immediate: true })

const currentProduct = computed(() => {
  return catalogStore.products.find(p => p.code === selectedProductCode.value) || catalogStore.products[0]
})

const currentProductImage = computed(() => {
  return currentProduct.value?.image || '/assets/portfolio_volley/01.jpeg'
})

const rawMessageText = computed(() => {
  const isEn = localeStore.currentLang === 'en'
  let msg = `Halo Admin NEZO FACTORY, saya ingin konsultasi / pesan jersey voli custom:\n\n`
  if (currentProduct.value) {
    msg += `📌 Produk: ${currentProduct.value.code} - ${isEn ? currentProduct.value.nameEn : currentProduct.value.nameId}\n`
  }
  msg += `✂️ Potongan: ${formData.value.cut}\n`
  msg += `📏 Ukuran: ${formData.value.size}\n`
  msg += `🧵 Bahan: ${formData.value.fabric}\n`
  msg += `🔢 Jumlah: ${formData.value.qty} Pcs\n`
  if (formData.value.teamName) msg += `🏐 Tim: ${formData.value.teamName}\n`
  if (formData.value.notes) msg += `📝 Catatan: ${formData.value.notes}\n`
  
  const orderUrl = catalogStore.buildOrderUrl({
    product: currentProduct.value,
    cut: formData.value.cut,
    size: formData.value.size,
    fabric: formData.value.fabric,
    qty: formData.value.qty,
    teamName: formData.value.teamName,
    notes: formData.value.notes
  })
  msg += `\n🖼️ Lihat Gambar & Detail di Web:\n${orderUrl}\n`
  msg += `\nMohon info estimasi harga dan waktu pengerjaan. Terima kasih!`
  return msg
})

const previewOrderPage = () => {
  catalogStore.isOrderModalOpen = false
  catalogStore.navigateTo('order', {
    code: currentProduct.value?.code,
    cut: formData.value.cut,
    size: formData.value.size,
    fabric: formData.value.fabric,
    qty: formData.value.qty,
    team: formData.value.teamName,
    notes: formData.value.notes
  })
}

const generatedMessagePreview = computed(() => rawMessageText.value)

const submitToWhatsApp = () => {
  catalogStore.directToWhatsApp({
    product: currentProduct.value,
    cut: formData.value.cut,
    size: formData.value.size,
    fabric: formData.value.fabric,
    qty: formData.value.qty,
    teamName: formData.value.teamName,
    notes: formData.value.notes
  })
  catalogStore.isOrderModalOpen = false
}

const openSizeChartModal = () => {
  catalogStore.isOrderModalOpen = false
  const el = document.getElementById('size-chart')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const saveCustomWaNumber = () => {
  if (customWaInput.value) {
    catalogStore.setWhatsappNumber(customWaInput.value)
    isEditingWaNumber.value = false
  }
}
</script>
