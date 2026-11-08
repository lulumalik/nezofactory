<template>
  <div 
    v-if="ordersStore.isSpkModalOpen && order" 
    class="spk-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
  >
    <!-- Modal Dialog Outer Container -->
    <div class="spk-modal-dialog bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-[218mm] max-h-[96vh] flex flex-col shadow-2xl relative my-auto">
      
      <!-- Action Bar Header (No-Print) -->
      <div class="no-print p-3 sm:p-4 bg-slate-950 border-b border-slate-800 text-white flex flex-wrap items-center justify-between gap-3 rounded-t-2xl">
        <div class="flex items-center gap-2">
          <span class="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded">NEZO FACTORY</span>
          <span class="text-slate-200 text-xs font-bold">Surat Perintah Kerja (SPK)</span>
          <span class="bg-slate-800 text-amber-400 border border-amber-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
            Format Pas 1 Halaman A4
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <button 
            type="button"
            @click="triggerPrint" 
            class="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-lg shadow-lg transition flex items-center gap-2"
          >
            <Printer class="w-4 h-4" />
            <span>Simpan PDF (1 Halaman)</span>
          </button>
          
          <button 
            type="button"
            @click="closeModal" 
            class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg border border-slate-700 transition flex items-center gap-1"
          >
            <X class="w-4 h-4" />
            <span>Tutup</span>
          </button>
        </div>
      </div>

      <!-- Scrollable Document View Container (Print target) -->
      <div class="spk-scroll-area p-2 sm:p-4 overflow-auto flex justify-start sm:justify-center bg-slate-950/60">
        
        <!-- Main Paper Document (Image 2 Replica) -->
        <div class="spk-paper text-slate-900 border border-slate-200 rounded-lg bg-white flex flex-col justify-between">
          <div>
            <!-- Banner Document Header -->
            <div class="bg-slate-950 text-white p-3 rounded-lg flex justify-between items-center border-b-4 border-amber-500 mb-3 shadow-sm">
              <div class="flex items-center gap-2.5">
                <div class="bg-amber-500 text-slate-950 font-black px-3 py-1 rounded text-xl font-mono">NEZO</div>
                <div>
                  <h1 class="text-base font-black tracking-wide leading-tight uppercase">SURAT PERINTAH KERJA (SPK)</h1>
                  <p class="text-[9px] text-slate-400 tracking-widest uppercase font-mono">PRODUCTION ORDER SHEET - NEZO FACTORY</p>
                </div>
              </div>
              <div class="text-right text-[10px] space-y-0.5 bg-slate-900 p-2 rounded border border-slate-800">
                <div class="flex gap-2 justify-end items-center">
                  <span class="text-slate-400 font-semibold">NO. SPK:</span>
                  <input 
                    type="text" 
                    v-model="order.spkNo" 
                    class="bg-transparent font-bold text-amber-400 text-right w-36 focus:outline-none"
                  />
                </div>
                <div class="flex gap-2 justify-end items-center">
                  <span class="text-slate-400 font-semibold">TGL ORDER:</span>
                  <input 
                    type="date" 
                    v-model="order.date" 
                    class="bg-transparent font-bold text-white text-right focus:outline-none"
                  />
                </div>
                <div class="flex gap-2 justify-end items-center">
                  <span class="text-slate-400 font-semibold">DEADLINE:</span>
                  <input 
                    type="date" 
                    v-model="order.deadline" 
                    class="bg-transparent font-bold text-amber-400 text-right focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- ITEM 1: 3 Image Upload Boxes (1080 x 1350 Aspect Ratio - Lega) -->
            <div class="mb-3">
              <div class="flex justify-between items-center mb-1">
                <h2 class="text-[11px] font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <span class="text-amber-500">📷</span> 1. MOCKUP DESAIN / SAMPLE (1080 x 1350 PX)
                </h2>
                <span class="text-[9px] text-slate-500 italic no-print">Klik atau seret file gambar ke dalam 3 kotak</span>
              </div>

              <div class="grid grid-cols-3 gap-2.5">
                <!-- Box 1: Desain Depan -->
                <div 
                  class="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg mockup-box-ratio flex flex-col items-center justify-center overflow-hidden hover:border-amber-500 transition group cursor-pointer"
                  @click="triggerImageUpload(0)"
                >
                  <input 
                    :ref="el => fileInputs[0] = el"
                    type="file" 
                    accept="image/*" 
                    class="hidden" 
                    @change="e => onImageChanged(e, 0)" 
                  />
                  <div v-if="!order.images || !order.images[0]" class="text-center p-2">
                    <UploadCloud class="w-6 h-6 text-slate-400 group-hover:text-amber-500 mx-auto mb-1 transition" />
                    <p class="text-[10px] font-bold text-slate-700">DESAIN DEPAN</p>
                    <p class="text-[8px] text-slate-400">1080 x 1350 px</p>
                  </div>
                  <img 
                    v-else 
                    :src="order.images[0]" 
                    alt="Mockup Depan" 
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <button 
                    v-if="order.images && order.images[0]"
                    type="button" 
                    @click.stop="order.images[0] = ''" 
                    class="no-print absolute top-1.5 right-1.5 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-rose-700 transition"
                    title="Hapus Gambar"
                  >
                    ✕
                  </button>
                </div>

                <!-- Box 2: Desain Belakang -->
                <div 
                  class="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg mockup-box-ratio flex flex-col items-center justify-center overflow-hidden hover:border-amber-500 transition group cursor-pointer"
                  @click="triggerImageUpload(1)"
                >
                  <input 
                    :ref="el => fileInputs[1] = el"
                    type="file" 
                    accept="image/*" 
                    class="hidden" 
                    @change="e => onImageChanged(e, 1)" 
                  />
                  <div v-if="!order.images || !order.images[1]" class="text-center p-2">
                    <UploadCloud class="w-6 h-6 text-slate-400 group-hover:text-amber-500 mx-auto mb-1 transition" />
                    <p class="text-[10px] font-bold text-slate-700">DESAIN BELAKANG</p>
                    <p class="text-[8px] text-slate-400">1080 x 1350 px</p>
                  </div>
                  <img 
                    v-else 
                    :src="order.images[1]" 
                    alt="Mockup Belakang" 
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <button 
                    v-if="order.images && order.images[1]"
                    type="button" 
                    @click.stop="order.images[1] = ''" 
                    class="no-print absolute top-1.5 right-1.5 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-rose-700 transition"
                    title="Hapus Gambar"
                  >
                    ✕
                  </button>
                </div>

                <!-- Box 3: Detail Logo / Kerah -->
                <div 
                  class="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg mockup-box-ratio flex flex-col items-center justify-center overflow-hidden hover:border-amber-500 transition group cursor-pointer"
                  @click="triggerImageUpload(2)"
                >
                  <input 
                    :ref="el => fileInputs[2] = el"
                    type="file" 
                    accept="image/*" 
                    class="hidden" 
                    @change="e => onImageChanged(e, 2)" 
                  />
                  <div v-if="!order.images || !order.images[2]" class="text-center p-2">
                    <UploadCloud class="w-6 h-6 text-slate-400 group-hover:text-amber-500 mx-auto mb-1 transition" />
                    <p class="text-[10px] font-bold text-slate-700">DETAIL LOGO / KERAH</p>
                    <p class="text-[8px] text-slate-400">1080 x 1350 px</p>
                  </div>
                  <img 
                    v-else 
                    :src="order.images[2]" 
                    alt="Detail Logo" 
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <button 
                    v-if="order.images && order.images[2]"
                    type="button" 
                    @click.stop="order.images[2] = ''" 
                    class="no-print absolute top-1.5 right-1.5 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-rose-700 transition"
                    title="Hapus Gambar"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <!-- 2-COLUMN LAYOUT: SPK Options & Excel Roster (Image 2 Replica) -->
            <div class="grid grid-cols-12 gap-3 items-start">
              
              <!-- LEFT COLUMN (ITEMS 2 - 9) -->
              <div class="col-span-5 space-y-2">
                
                <!-- 2. Nama Team -->
                <div class="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <label class="block text-[10px] font-extrabold text-slate-800 uppercase mb-1">
                    2. NAMA TEAM / CUSTOMER
                  </label>
                  <input 
                    type="text" 
                    v-model="order.team" 
                    placeholder="Nama Tim / Pelanggan" 
                    class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
                  />
                </div>

                <!-- 3. Bahan -->
                <div class="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <label class="block text-[10px] font-extrabold text-slate-800 uppercase mb-1">
                    3. BAHAN
                  </label>
                  <div class="grid grid-cols-2 gap-1 text-xs font-bold text-slate-700">
                    <label 
                      v-for="b in ['MILANO', 'BRAZIL', 'SERENA', 'EMBOS']" 
                      :key="b"
                      class="flex items-center space-x-1.5 p-1 bg-white border border-slate-200 rounded cursor-pointer"
                    >
                      <input type="radio" v-model="order.fabric" :value="b" class="accent-amber-500" />
                      <span>{{ b }}</span>
                    </label>
                  </div>
                </div>

                <!-- 4. Produk -->
                <div class="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <label class="block text-[10px] font-extrabold text-slate-800 uppercase mb-1">
                    4. PRODUK
                  </label>
                  <div class="grid grid-cols-2 gap-1 text-xs font-bold text-slate-700">
                    <label 
                      v-for="p in ['ATASAN', 'SETELAN', 'JAKET', 'TRAINNING']" 
                      :key="p"
                      class="flex items-center space-x-1.5 p-1 bg-white border border-slate-200 rounded cursor-pointer"
                    >
                      <input type="radio" v-model="order.productType" :value="p" class="accent-amber-500" />
                      <span>{{ p }}</span>
                    </label>
                  </div>
                </div>

                <!-- 5 & 6. Kerah & Lengan -->
                <div class="grid grid-cols-2 gap-1.5">
                  <div class="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                    <label class="block text-[9px] font-extrabold text-slate-800 uppercase mb-0.5">5. MODEL KERAH</label>
                    <select v-model="order.collarModel" class="w-full bg-white border border-slate-300 rounded p-1 text-[10px] font-bold text-slate-800 focus:outline-none">
                      <option value="V-NECK">V-NECK</option>
                      <option value="O-NECK">O-NECK</option>
                      <option value="WANGKI KANCING">WANGKI KANCING</option>
                      <option value="V-WANGI PALANG">V-WANGI PALANG</option>
                      <option value="V-ADIDAS">V-ADIDAS</option>
                      <option value="V-WANGKI TALI">V-WANGKI TALI</option>
                    </select>
                  </div>

                  <div class="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                    <label class="block text-[9px] font-extrabold text-slate-800 uppercase mb-0.5">6. MODEL LENGAN</label>
                    <select v-model="order.sleeveModel" class="w-full bg-white border border-slate-300 rounded p-1 text-[10px] font-bold text-slate-800 focus:outline-none">
                      <option value="T.PENDEK">T.PENDEK</option>
                      <option value="T.PANJANG">T.PANJANG</option>
                    </select>
                  </div>
                </div>

                <!-- 7. Ukuran Anak -->
                <div class="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div class="flex justify-between items-center mb-1">
                    <label class="text-[10px] font-extrabold text-slate-800 uppercase">7. UKURAN ANAK</label>
                    <span class="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono">
                      {{ subtotalChild }} Pcs
                    </span>
                  </div>
                  <div class="grid grid-cols-6 gap-1 text-center">
                    <div v-for="sz in childSizeList" :key="sz">
                      <span class="text-[9px] font-bold text-slate-500 block">{{ sz }}</span>
                      <input 
                        type="number" 
                        min="0" 
                        v-model.number="order.childSizes[sz]" 
                        class="w-full bg-white border border-slate-300 rounded text-center py-0.5 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                <!-- 8. Ukuran Dewasa -->
                <div class="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div class="flex justify-between items-center mb-1">
                    <label class="text-[10px] font-extrabold text-slate-800 uppercase">8. UKURAN DEWASA</label>
                    <span class="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono">
                      {{ subtotalAdult }} Pcs
                    </span>
                  </div>
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div v-for="sz in adultSizeList" :key="sz">
                      <span class="text-[9px] font-bold text-slate-500 block">{{ sz }}</span>
                      <input 
                        type="number" 
                        min="0" 
                        v-model.number="order.adultSizes[sz]" 
                        class="w-full bg-white border border-slate-300 rounded text-center py-0.5 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                <!-- 9. Total Otomatis -->
                <div class="bg-slate-950 text-white p-2.5 rounded-lg flex justify-between items-center border-b-2 border-amber-500">
                  <div>
                    <span class="text-[9px] font-bold text-slate-400 block uppercase">9. TOTAL KESELURUHAN</span>
                    <span class="text-[8px] text-amber-400 font-medium">Otomatis Terhitung (Anak + Dewasa)</span>
                  </div>
                  <div class="text-xl font-black text-amber-400 font-mono">
                    {{ grandTotalPcs }} PCS
                  </div>
                </div>

              </div>

              <!-- RIGHT COLUMN (ITEMS 10 - 11 ROSTER EXCEL) -->
              <div class="col-span-7 bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between h-full min-h-[460px]">
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <div>
                      <h3 class="text-[10px] font-black text-slate-900 uppercase">10 & 11. TABEL DETAIL ROSTER PEMAIN</h3>
                      <p class="text-[8px] text-slate-500">Format Kotak Excel (NO, NAMA, UKURAN, NOPUNG, KETERANGAN)</p>
                    </div>
                    <div class="flex gap-1 no-print">
                      <button 
                        type="button"
                        @click="addRosterRow" 
                        class="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-sm"
                      >
                        <Plus class="w-3 h-3 text-amber-400" />
                        <span>Baris</span>
                      </button>
                      <button 
                        type="button"
                        @click="clearRoster" 
                        class="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-bold rounded"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  <!-- Excel Editable Table -->
                  <div class="excel-table-wrapper border border-slate-300 rounded bg-white overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr class="bg-slate-900 text-white text-[9px] uppercase font-mono">
                          <th class="p-1 border-r border-slate-700 w-8 text-center">NO</th>
                          <th class="p-1 border-r border-slate-700 min-w-[110px]">NAMA</th>
                          <th class="p-1 border-r border-slate-700 w-24 text-center">UKURAN</th>
                          <th class="p-1 border-r border-slate-700 w-16 text-center">NOPUNG</th>
                          <th class="p-1 border-r border-slate-700 min-w-[90px]">KETERANGAN</th>
                          <th class="p-1 w-8 text-center no-print">AKSI</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-200">
                        <tr 
                          v-for="(row, rIdx) in order.roster" 
                          :key="rIdx"
                          class="hover:bg-slate-50 transition"
                        >
                          <td class="p-0.5 border-r border-slate-200 text-center font-bold text-slate-500 text-[10px]">
                            {{ rIdx + 1 }}
                          </td>
                          <td class="p-0.5 border-r border-slate-200">
                            <input 
                              type="text" 
                              v-model="row.name" 
                              placeholder="Nama Pemain" 
                              class="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 text-[10px] font-semibold focus:bg-white focus:outline-none uppercase"
                            />
                          </td>
                          <td class="p-0.5 border-r border-slate-200">
                            <select 
                              v-model="row.size" 
                              class="w-full bg-slate-50 border border-slate-200 rounded p-0.5 text-[10px] font-bold text-slate-800 focus:bg-white focus:outline-none text-center"
                            >
                              <optgroup label="Dewasa">
                                <option value="S Dewasa">S Dewasa</option>
                                <option value="M Dewasa">M Dewasa</option>
                                <option value="L Dewasa">L Dewasa</option>
                                <option value="XL Dewasa">XL Dewasa</option>
                                <option value="2XL Dewasa">2XL Dewasa</option>
                                <option value="3XL Dewasa">3XL Dewasa</option>
                                <option value="4XL Dewasa">4XL Dewasa</option>
                                <option value="5XL Dewasa">5XL Dewasa</option>
                              </optgroup>
                              <optgroup label="Anak">
                                <option value="XS Anak">XS Anak</option>
                                <option value="S Anak">S Anak</option>
                                <option value="M Anak">M Anak</option>
                                <option value="L Anak">L Anak</option>
                                <option value="XL Anak">XL Anak</option>
                                <option value="2XL Anak">2XL Anak</option>
                              </optgroup>
                            </select>
                          </td>
                          <td class="p-0.5 border-r border-slate-200">
                            <input 
                              type="text" 
                              v-model="row.nopung" 
                              placeholder="00" 
                              class="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 text-[10px] font-bold text-center focus:bg-white focus:outline-none"
                            />
                          </td>
                          <td class="p-0.5 border-r border-slate-200">
                            <input 
                              type="text" 
                              v-model="row.notes" 
                              placeholder="Keterangan..." 
                              class="w-full bg-slate-50 border border-slate-200 rounded px-1 py-0.5 text-[10px] focus:bg-white focus:outline-none"
                            />
                          </td>
                          <td class="p-0.5 text-center no-print">
                            <button 
                              type="button"
                              @click="removeRosterRow(rIdx)" 
                              class="text-rose-500 hover:text-rose-700 text-xs px-1 font-bold"
                              title="Hapus Baris"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                        <tr v-if="!order.roster.length">
                          <td colspan="6" class="p-4 text-center text-slate-400 text-[10px] italic">
                            Belum ada daftar pemain. Klik "+ Tambah Pemain Baru" untuk mengisi nama & nomor punggung.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="mt-2 text-[8px] text-slate-500 flex justify-between items-center no-print">
                  <button 
                    type="button"
                    @click="addRosterRow" 
                    class="text-amber-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>+ Tambah Pemain Baru</span>
                  </button>
                  <span>Format Disesuaikan Untuk Cetak 1 Halaman PDF</span>
                </div>
              </div>

            </div>
          </div>

          <!-- Document Footer Stamp (Exact as Image 2) -->
          <div class="pt-2 mt-2 border-t border-slate-200 flex justify-between items-center text-[8px] text-slate-500 shrink-0">
            <span class="font-bold text-slate-700">NEZO FACTORY GARMENT - SURAT PERINTAH KERJA (SPK)</span>
            <span>Halaman 1 Dari 1 (PDF Ready)</span>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrdersStore, CHILD_SIZES, ADULT_SIZES, compressImageToRatio } from '../../stores/orders'
import { Printer, X, UploadCloud, Plus } from 'lucide-vue-next'

const ordersStore = useOrdersStore()
const order = computed(() => ordersStore.activeSpkOrder)

const childSizeList = CHILD_SIZES
const adultSizeList = ADULT_SIZES

const fileInputs = ref([])

const subtotalChild = computed(() => {
  if (!order.value || !order.value.childSizes) return 0
  return Object.values(order.value.childSizes).reduce((s, n) => s + (Number(n) || 0), 0)
})

const subtotalAdult = computed(() => {
  if (!order.value || !order.value.adultSizes) return 0
  return Object.values(order.value.adultSizes).reduce((s, n) => s + (Number(n) || 0), 0)
})

const grandTotalPcs = computed(() => {
  return subtotalChild.value + subtotalAdult.value
})

const triggerImageUpload = (idx) => {
  if (fileInputs.value[idx]) {
    fileInputs.value[idx].click()
  }
}

const onImageChanged = async (event, idx) => {
  const file = event.target.files && event.target.files[0]
  if (!file) return
  try {
    const compressed = await compressImageToRatio(file, 1080, 1350, 0.82)
    if (!order.value.images) order.value.images = ['', '', '']
    order.value.images[idx] = compressed
  } catch (err) {
    alert('Gambar gagal diproses. Gunakan format JPG/PNG.')
  }
}

const addRosterRow = () => {
  if (!order.value.roster) order.value.roster = []
  order.value.roster.push({
    name: '',
    size: 'L Dewasa',
    nopung: '',
    notes: ''
  })
}

const removeRosterRow = (idx) => {
  order.value.roster.splice(idx, 1)
}

const clearRoster = () => {
  if (confirm('Kosongkan tabel roster pemain?')) {
    order.value.roster = []
  }
}

const triggerPrint = () => {
  if (order.value && order.value.id) {
    ordersStore.updateOrder(order.value.id, {
      spkNo: order.value.spkNo,
      date: order.value.date,
      deadline: order.value.deadline,
      fabric: order.value.fabric,
      productType: order.value.productType,
      collarModel: order.value.collarModel,
      sleeveModel: order.value.sleeveModel,
      childSizes: order.value.childSizes,
      adultSizes: order.value.adultSizes,
      roster: order.value.roster,
      images: order.value.images
    })
  }
  window.scrollTo(0, 0)
  const scrollArea = document.querySelector('.spk-scroll-area')
  if (scrollArea) {
    scrollArea.scrollTop = 0
    scrollArea.scrollLeft = 0
  }
  setTimeout(() => {
    window.print()
  }, 100)
}

const closeModal = () => {
  ordersStore.isSpkModalOpen = false
}
</script>

<style scoped>
/* Proportions matching Image 2 & DATA SPK.html */
.spk-paper {
  width: 210mm;
  min-width: 210mm;
  min-height: 280mm;
  background: #ffffff;
  margin: 0 auto;
  padding: 8mm 10mm;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Aspect ratio 1080 x 1350 px (4:5) for tall, spacious mockups */
.mockup-box-ratio {
  aspect-ratio: 1080 / 1350;
}

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }
  
  /* Reset modal containers so they don't offset or center anything */
  .spk-modal-backdrop {
    position: static !important;
    display: block !important;
    inset: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    overflow: visible !important;
    width: 210mm !important;
    min-width: 210mm !important;
    max-width: 210mm !important;
    height: auto !important;
    min-height: 0 !important;
    transform: none !important;
    z-index: auto !important;
  }

  .spk-modal-dialog {
    position: static !important;
    display: block !important;
    max-width: 210mm !important;
    min-width: 210mm !important;
    width: 210mm !important;
    max-height: none !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    overflow: visible !important;
    transform: none !important;
  }

  .spk-scroll-area {
    position: static !important;
    display: block !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
    overflow: visible !important;
    width: 210mm !important;
    min-width: 210mm !important;
    max-width: 210mm !important;
    height: auto !important;
    justify-content: normal !important;
    transform: none !important;
  }

  .no-print {
    display: none !important;
  }

  /* 
     Height is set to 272mm (with 25mm safety buffer from 297mm A4)
     to guarantee Mobile Chrome & Android PDF Spooler NEVER split the container onto 2 pages.
  */
  .spk-paper {
    position: static !important;
    width: 210mm !important;
    min-width: 210mm !important;
    max-width: 210mm !important;
    height: 272mm !important;
    max-height: 272mm !important;
    min-height: 0 !important;
    box-shadow: none !important;
    padding: 6mm 8mm !important;
    margin: 0 auto !important;
    border: none !important;
    border-radius: 0 !important;
    box-sizing: border-box !important;
    page-break-after: avoid !important;
    break-after: avoid !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .excel-table-wrapper {
    overflow: visible !important;
    max-height: none !important;
  }

  input, select {
    border-color: #cbd5e1 !important;
    background-color: transparent !important;
    -webkit-appearance: none !important;
    appearance: none !important;
  }
}
</style>
