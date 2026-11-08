<template>
  <div 
    v-if="ordersStore.isLabelModalOpen && order" 
    class="label-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
  >
    <div class="label-modal-dialog bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[96vh] flex flex-col shadow-2xl relative my-auto">
      
      <!-- Action Bar Header (No-Print) -->
      <div class="no-print p-4 bg-slate-950 border-b border-slate-800 text-white flex flex-wrap items-center justify-between gap-3 rounded-t-2xl">
        <div class="flex items-center gap-2">
          <span class="text-base font-black italic tracking-wider text-amber-400">NEZO FACTORY</span>
          <span class="bg-slate-800 text-amber-400 border border-amber-400/30 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-widest font-mono">
            Stiker A6 Thermal (105 × 148 mm)
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <button 
            type="button"
            @click="triggerPrint" 
            class="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg shadow-lg transition flex items-center gap-1.5"
          >
            <Printer class="w-4 h-4" />
            <span>Cetak Resi A6 (Thermal)</span>
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

      <!-- Main Layout: Form (Left) & A6 Preview (Right) -->
      <div class="label-scroll-area p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-slate-950/60">
        
        <!-- Left Panel: Interactive Form Control (No-Print) -->
        <div class="no-print lg:col-span-6 bg-slate-800 border border-slate-700 rounded-xl p-4 sm:p-5 space-y-3 text-xs text-white">
          <h2 class="text-sm font-black uppercase text-amber-400 pb-2 border-b border-slate-700 flex items-center gap-2">
            <Package class="w-4 h-4" />
            <span>Data Pengiriman Paket</span>
          </h2>

          <div>
            <label class="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Kode Transaksi (TRX)</label>
            <input 
              type="text" 
              v-model="order.id" 
              class="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs font-mono font-bold text-amber-400 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Nama Penerima</label>
              <input 
                type="text" 
                v-model="order.recipientName" 
                placeholder="Nama penerima..."
                class="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs font-semibold text-white focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">WhatsApp / HP</label>
              <input 
                type="text" 
                v-model="order.recipientPhone" 
                placeholder="0812..."
                class="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs font-semibold text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Alamat Lengkap</label>
            <input 
              type="text" 
              v-model="order.shippingAddress" 
              placeholder="Jl. Raya No..."
              class="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs font-semibold text-white focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Kelurahan</label>
              <input 
                type="text" 
                v-model="order.kelurahan" 
                placeholder="Kelurahan..."
                class="w-full bg-slate-900 border border-slate-600 rounded p-1.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Kecamatan</label>
              <input 
                type="text" 
                v-model="order.kecamatan" 
                placeholder="Kecamatan..."
                class="w-full bg-slate-900 border border-slate-600 rounded p-1.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Kota / Kab</label>
              <input 
                type="text" 
                v-model="order.kota" 
                placeholder="Kota Bandung..."
                class="w-full bg-slate-900 border border-slate-600 rounded p-1.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Provinsi</label>
              <input 
                type="text" 
                v-model="order.provinsi" 
                placeholder="Jawa Barat..."
                class="w-full bg-slate-900 border border-slate-600 rounded p-1.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Catatan Tambahan Paket</label>
            <textarea 
              v-model="order.shippingNotes" 
              rows="2" 
              placeholder="Contoh: Fragile / Pakaian Custom..."
              class="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs text-white focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Right Panel: Physical A6 Thermal Preview -->
        <div class="lg:col-span-6 flex flex-col items-center justify-center">
          <div class="no-print mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Ukuran Presisi Cetak A6 (105 × 148 mm)</span>
          </div>

          <!-- Stiker Box -->
          <div class="shipping-label-a6 bg-white text-black border-[3px] border-black">
            
            <!-- Brand & Barcode Top Bar -->
            <div class="flex justify-between items-start border-b-2 border-black pb-1.5">
              <div>
                <div class="logo-text text-lg uppercase tracking-tight font-black leading-none text-black">
                  NEZO FACTORY
                </div>
                <div class="text-[7.5px] font-black tracking-widest uppercase text-black mt-0.5">
                  EVERYDAY ACTIVEWEAR
                </div>
              </div>
              <div class="text-right">
                <div class="bg-black text-white px-2 py-0.5 rounded text-[10px] font-mono font-black tracking-wider inline-block">
                  {{ order.id }}
                </div>
                <!-- Simulated Clean Barcode -->
                <div class="font-mono text-[7px] tracking-widest text-gray-800 mt-0.5">
                  ||| | ||||| || |||| |||
                </div>
              </div>
            </div>

            <!-- Recipient Box -->
            <div class="border-2 border-black p-2 bg-gray-50 flex-1 flex flex-col justify-between">
              <div>
                <span class="text-[8px] font-black uppercase text-gray-500 tracking-wider block mb-0.5">
                  PENERIMA:
                </span>
                <div class="text-xs font-black uppercase text-black leading-snug">
                  {{ order.recipientName || order.team || 'Nama Penerima' }}
                </div>
                <div class="text-[10px] font-bold text-gray-900 mt-0.5">
                  Telp / WA: {{ order.recipientPhone || order.contact || '-' }}
                </div>
                <div class="text-[9.5px] font-semibold text-gray-800 mt-1 leading-tight">
                  {{ order.shippingAddress || 'Alamat Belum Diisi' }}
                </div>
              </div>

              <div class="pt-1.5 border-t border-gray-300 mt-1 text-[8.5px] font-bold text-gray-700 flex flex-wrap gap-x-2">
                <span v-if="order.kelurahan">Kel: {{ order.kelurahan }}</span>
                <span v-if="order.kecamatan">Kec: {{ order.kecamatan }}</span>
                <span v-if="order.kota">{{ order.kota }}</span>
                <span v-if="order.provinsi">{{ order.provinsi }}</span>
              </div>
            </div>

            <!-- Package Notes -->
            <div class="border border-black p-1.5 bg-white text-[8px] leading-tight">
              <span class="font-bold uppercase text-gray-600 block mb-0.5">Instruksi / Catatan:</span>
              <span class="font-semibold text-black">
                {{ order.shippingNotes || 'Pakaian Olahraga / Jersey Custom' }}
              </span>
            </div>

            <!-- Sender Info Bottom Bar -->
            <div class="border-t-2 border-black pt-1 flex justify-between items-end text-[7.5px] text-gray-800 leading-tight">
              <div>
                <span class="font-black text-black uppercase block">PENGIRIM: NEZO FACTORY</span>
                <span>Jl. Cikuda No.13 RT 04/11, Cibiru, Kota Bandung</span>
              </div>
              <div class="text-right font-bold text-black shrink-0">
                WA: {{ catalogStore.formattedWhatsappNumber || '08998116726' }}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrdersStore } from '../../stores/orders'
import { useCatalogStore } from '../../stores/catalog'
import { Printer, X, Package } from 'lucide-vue-next'

const ordersStore = useOrdersStore()
const catalogStore = useCatalogStore()

const order = computed(() => ordersStore.activeLabelOrder)

const triggerPrint = () => {
  if (order.value && order.value.id) {
    ordersStore.updateOrder(order.value.id, {
      recipientName: order.value.recipientName,
      recipientPhone: order.value.recipientPhone,
      shippingAddress: order.value.shippingAddress,
      kelurahan: order.value.kelurahan,
      kecamatan: order.value.kecamatan,
      kota: order.value.kota,
      provinsi: order.value.provinsi,
      shippingNotes: order.value.shippingNotes
    })
  }
  window.print()
}

const closeModal = () => {
  ordersStore.isLabelModalOpen = false
}
</script>

<style scoped>
.shipping-label-a6 {
  width: 105mm;
  height: 148mm;
  max-width: 105mm;
  max-height: 148mm;
  box-sizing: border-box;
  padding: 6mm;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
}

.logo-text {
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.85;
}

@media print {
  @page {
    size: 105mm 148mm;
    margin: 0;
  }

  .label-modal-backdrop {
    position: static !important;
    display: block !important;
    inset: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    overflow: visible !important;
    width: 105mm !important;
    min-width: 105mm !important;
    height: auto !important;
    min-height: 0 !important;
  }

  .label-modal-dialog {
    position: static !important;
    display: block !important;
    max-width: none !important;
    max-height: none !important;
    width: 105mm !important;
    min-width: 105mm !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    overflow: visible !important;
  }

  .label-scroll-area {
    position: static !important;
    display: block !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
    overflow: visible !important;
    width: 105mm !important;
    min-width: 105mm !important;
    height: auto !important;
  }

  .shipping-label-a6 {
    position: static !important;
    width: 105mm !important;
    height: 148mm !important;
    max-height: 148mm !important;
    margin: 0 !important;
    padding: 6mm !important;
    box-shadow: none !important;
    border: 3px solid black !important;
    background: #ffffff !important;
    box-sizing: border-box !important;
    page-break-after: avoid !important;
    page-break-inside: avoid !important;
    overflow: hidden !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .no-print {
    display: none !important;
  }
}
</style>
