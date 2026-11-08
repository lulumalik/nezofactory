<template>
  <div 
    v-if="ordersStore.isInvoiceModalOpen && order" 
    class="invoice-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
  >
    <div class="invoice-modal-dialog bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-[220mm] max-h-[96vh] flex flex-col shadow-2xl relative my-auto">
      
      <!-- Action Bar Header (No-Print) -->
      <div class="no-print p-3 sm:p-4 bg-slate-950 border-b border-slate-800 text-white flex flex-wrap items-center justify-between gap-3 rounded-t-2xl">
        <div class="flex items-center gap-2">
          <span class="text-base font-black italic tracking-wider text-amber-400">NEZO FACTORY</span>
          <span class="bg-slate-800 text-amber-400 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
            Invoice A4 (1 Halaman Pas)
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <button 
            type="button"
            @click="triggerPrint" 
            class="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-lg shadow-lg transition flex items-center gap-1.5"
          >
            <Printer class="w-4 h-4" />
            <span>Cetak PDF / Print (1 Halaman)</span>
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

      <!-- Quick Edit Bar (No-Print) -->
      <div class="no-print bg-slate-800 p-2.5 sm:px-4 border-b border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Uang Muka / DP (Rp):</label>
          <input 
            type="number" 
            v-model.number="order.dpAmount" 
            class="w-full bg-slate-900 border border-slate-600 rounded p-1 text-xs font-bold text-amber-400 focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">No. Invoice:</label>
          <input 
            type="text" 
            v-model="order.invoiceNo" 
            class="w-full bg-slate-900 border border-slate-600 rounded p-1 text-xs font-bold text-white focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Alamat Tagihan/Kirim:</label>
          <input 
            type="text" 
            v-model="order.shippingAddress" 
            placeholder="Alamat lengkap penerima..."
            class="w-full bg-slate-900 border border-slate-600 rounded p-1 text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      <!-- Scrollable Preview Area -->
      <div class="invoice-scroll-area p-2 sm:p-5 overflow-y-auto flex justify-center bg-slate-950/60">
        
        <!-- Physical Invoice Paper (Strict 1 Page A4 Portrait - 210mm x 297mm) -->
        <div class="invoice-paper border-2 border-black bg-white text-black flex flex-col justify-between">
          
          <!-- TOP CONTENT -->
          <div>
            <!-- Header Bar -->
            <div class="flex justify-between items-start border-b-2 border-black pb-2 mb-2.5">
              <div>
                <div class="logo-text text-2xl uppercase tracking-tighter text-black leading-none">
                  NEZO FACTORY
                </div>
                <div class="text-[8.5px] font-black tracking-widest uppercase text-black mt-0.5">
                  YOUR TEAM. YOUR STYLE • VOLLEYBALL APPAREL
                </div>
                <div class="text-[9.5px] font-bold text-gray-800 mt-1 leading-tight">
                  Jl. Cikuda No.13 RT 04/11, Cibiru, Kota Bandung 40615<br>
                  WhatsApp: {{ catalogStore.formattedWhatsappNumber || '08998116726' }}
                </div>
              </div>
              
              <div class="text-right">
                <h1 class="text-xl font-black uppercase tracking-tight text-black leading-none">INVOICE</h1>
                <div class="text-xs font-mono font-black text-black mt-0.5">{{ order.invoiceNo || 'INV/NZ/2026/001' }}</div>
                <div class="text-[10px] font-bold text-gray-700 mt-0.5">Tanggal: {{ order.date }}</div>
              </div>
            </div>

            <!-- Client Info Box -->
            <div class="grid grid-cols-2 gap-3 border-2 border-black p-2 mb-3 bg-gray-50 rounded">
              <div>
                <span class="text-[8.5px] font-black uppercase text-gray-500 tracking-wider block">DITAGIHKAN KEPADA:</span>
                <div class="text-xs font-black text-black uppercase">{{ order.team || '[Nama Client / Tim]' }}</div>
                <div class="text-[10px] font-bold text-gray-800">Kontak: {{ order.contact || '-' }}</div>
              </div>
              <div>
                <span class="text-[8.5px] font-black uppercase text-gray-500 tracking-wider block">ALAMAT PENGIRIMAN / TAGIHAN:</span>
                <div class="text-[9.5px] font-bold text-gray-800 leading-tight">
                  {{ order.shippingAddress || (order.kota ? `${order.kota}, ${order.provinsi}` : 'Alamat sesuai instruksi pesanan') }}
                </div>
              </div>
            </div>

            <!-- Items Table -->
            <table class="w-full text-left border-collapse border-2 border-black mb-3">
              <thead>
                <tr class="bg-black text-white text-[9.5px] uppercase font-mono">
                  <th class="p-1 border border-black text-center w-7">NO</th>
                  <th class="p-1 border border-black">DESKRIPSI BARANG</th>
                  <th class="p-1 border border-black text-center w-20">UKURAN</th>
                  <th class="p-1 border border-black text-center w-12">QTY</th>
                  <th class="p-1 border border-black text-right w-24">HARGA</th>
                  <th class="p-1 border border-black text-right w-28">TOTAL</th>
                </tr>
              </thead>
              <tbody class="text-[10px] font-bold text-black divide-y divide-black">
                <tr 
                  v-for="(item, idx) in activeItems" 
                  :key="idx"
                >
                  <td class="p-1 border-r border-black text-center">{{ idx + 1 }}</td>
                  <td class="p-1 border-r border-black">
                    Jersey Custom - {{ item.product }}
                    <span v-if="order.fabric" class="block text-[8.5px] text-gray-600 font-normal">
                      Bahan: {{ order.fabric }} {{ order.collarModel ? `• Kerah: ${order.collarModel}` : '' }}
                    </span>
                  </td>
                  <td class="p-1 border-r border-black text-center">{{ item.size }}</td>
                  <td class="p-1 border-r border-black text-center">{{ item.qty }} pcs</td>
                  <td class="p-1 border-r border-black text-right">{{ formatMoney(item.price) }}</td>
                  <td class="p-1 text-right">{{ formatMoney((item.price || 0) * (item.qty || 0)) }}</td>
                </tr>
                <tr v-if="!activeItems.length">
                  <td colspan="6" class="p-4 text-center text-gray-500 italic">Belum ada rincian item produk.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- BOTTOM CONTENT: Calculations, Notes, Signatures -->
          <div>
            <div class="grid grid-cols-12 gap-3 mb-3">
              <!-- Notes & Bank Info -->
              <div class="col-span-7 border-2 border-black p-2 flex flex-col justify-between rounded bg-white">
                <div>
                  <span class="text-[8.5px] font-black uppercase text-gray-600 block mb-0.5">CATATAN & INSTRUKSI PEMBAYARAN:</span>
                  <div class="text-[9.5px] font-semibold text-gray-900 whitespace-pre-line leading-relaxed">
                    {{ order.paymentNotes || 'Rek BCA 1234567890 a.n NEZO FACTORY\nHarap konfirmasi bukti transfer via WhatsApp Admin.' }}
                  </div>
                </div>
                <div class="text-[8px] text-gray-500 italic mt-1 pt-1 border-t border-gray-200">
                  * Pesanan custom diproduksi sesuai spesifikasi SPK yang telah disetujui.
                </div>
              </div>

              <!-- Calculation Table -->
              <div class="col-span-5 border-2 border-black p-2 text-[10.5px] font-bold space-y-0.5 bg-gray-50 rounded">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal:</span>
                  <span class="font-black text-black font-mono">{{ formatMoney(computedTotal) }}</span>
                </div>
                <div class="flex justify-between text-emerald-800">
                  <span>Uang Muka / DP:</span>
                  <span class="font-black font-mono">- {{ formatMoney(order.dpAmount || 0) }}</span>
                </div>
                <div class="flex justify-between border-t-2 border-black pt-1 mt-1 text-xs">
                  <span class="font-black text-black">SISA PELUNASAN:</span>
                  <span class="font-black text-rose-700 text-sm font-mono">{{ formatMoney(computedRemaining) }}</span>
                </div>
              </div>
            </div>

            <!-- Signatures Section -->
            <div class="grid grid-cols-2 gap-6 pt-1 text-center border-t border-black">
              <div>
                <span class="text-[9px] font-bold text-gray-600 block">Diterima & Disetujui Oleh,</span>
                <div class="h-10 flex items-end justify-center">
                  <span class="text-[10px] font-black uppercase underline">{{ order.team || '( Pelanggan )' }}</span>
                </div>
              </div>
              <div>
                <span class="text-[9px] font-bold text-gray-600 block">Hormat Kami,</span>
                <div class="h-10 flex items-end justify-center">
                  <span class="text-[10px] font-black uppercase underline">NEZO FACTORY</span>
                </div>
              </div>
            </div>

            <!-- Bottom Brand Tag -->
            <div class="text-center text-[8px] font-bold text-gray-400 mt-2 tracking-widest uppercase">
              NEZO FACTORY • EVERYDAY ACTIVEWEAR • BANDUNG
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrdersStore, formatMoney } from '../../stores/orders'
import { useCatalogStore } from '../../stores/catalog'
import { Printer, X } from 'lucide-vue-next'

const ordersStore = useOrdersStore()
const catalogStore = useCatalogStore()

const order = computed(() => ordersStore.activeInvoiceOrder)

const activeItems = computed(() => {
  if (!order.value || !order.value.items) return []
  return order.value.items.filter(i => (Number(i.qty) || 0) > 0)
})

const computedTotal = computed(() => {
  return activeItems.value.reduce((s, i) => s + ((Number(i.price) || 0) * (Number(i.qty) || 0)), 0)
})

const computedRemaining = computed(() => {
  const dp = Number(order.value?.dpAmount) || 0
  return Math.max(0, computedTotal.value - dp)
})

const triggerPrint = () => {
  if (order.value && order.value.id) {
    ordersStore.updateOrder(order.value.id, {
      invoiceNo: order.value.invoiceNo,
      dpAmount: order.value.dpAmount,
      shippingAddress: order.value.shippingAddress,
      paymentNotes: order.value.paymentNotes
    })
  }
  window.print()
}

const closeModal = () => {
  ordersStore.isInvoiceModalOpen = false
}
</script>

<style scoped>
/* STRICT A4 PORTRAIT DIMENSIONS: 210mm x 297mm */
.invoice-paper {
  width: 210mm;
  height: 297mm;
  max-height: 297mm;
  box-sizing: border-box;
  padding: 6mm 8mm;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background-color: #ffffff;
}

.logo-text {
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.85;
}

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }
  
  .invoice-modal-backdrop {
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
    height: auto !important;
    min-height: 0 !important;
  }

  .invoice-modal-dialog {
    position: static !important;
    display: block !important;
    max-width: none !important;
    max-height: none !important;
    width: 210mm !important;
    min-width: 210mm !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    overflow: visible !important;
  }

  .invoice-scroll-area {
    position: static !important;
    display: block !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
    overflow: visible !important;
    width: 210mm !important;
    min-width: 210mm !important;
    height: auto !important;
  }

  .invoice-paper {
    position: static !important;
    width: 210mm !important;
    height: 297mm !important;
    max-height: 297mm !important;
    margin: 0 !important;
    padding: 6mm 8mm !important;
    box-shadow: none !important;
    border: 2px solid black !important;
    background: #ffffff !important;
    page-break-after: avoid !important;
    page-break-inside: avoid !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .no-print {
    display: none !important;
  }
}
</style>
