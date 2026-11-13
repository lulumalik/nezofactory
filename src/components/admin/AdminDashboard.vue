<template>
  <div class="bg-slate-950 min-h-screen text-slate-100 font-sans pb-24">
    
    <!-- Top Bar Navigation -->
    <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        
        <!-- Left: Logo & Nav -->
        <div class="flex items-center gap-3">
          <button 
            @click="catalogStore.navigateTo('home')" 
            class="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 transition"
          >
            <ArrowLeft class="w-3.5 h-3.5 text-slate-300" />
            <span>Ke Web Utama</span>
          </button>
          
          <div class="h-4 w-px bg-slate-700 hidden sm:block"></div>
          
          <div class="flex items-center gap-2">
            <span class="font-display font-black text-lg text-white tracking-tight">NEZO</span>
            <span class="bg-nezo-lime text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded font-mono">ADMIN</span>
          </div>
        </div>

        <!-- Center / Status Badge -->
        <div class="flex items-center gap-2">
          <div 
            v-if="ordersStore.isCloudConnected" 
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Supabase Cloud Online</span>
          </div>
          <div 
            v-else-if="ordersStore.isLoading" 
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/90 border border-sky-500/40 text-sky-400 text-xs font-mono font-bold"
          >
            <span class="w-2 h-2 rounded-full bg-sky-400 animate-spin"></span>
            <span>Menghubungkan ke Supabase...</span>
          </div>
          <div 
            v-else 
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/90 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold"
          >
            <span class="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>Database Belum Aktif</span>
          </div>
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center gap-2">
          <button 
            @click="ordersStore.exportToCSV()"
            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition flex items-center gap-1.5"
            title="Ekspor Seluruh Data ke Excel / CSV"
          >
            <Download class="w-3.5 h-3.5 text-nezo-lime" />
            <span class="hidden sm:inline">Ekspor</span> CSV
          </button>

          <button 
            @click="handleLogout"
            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/70 border border-rose-800/40 text-rose-300 transition flex items-center gap-1"
          >
            <LogOut class="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>

      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      
      <!-- Top Title & Navigation Tabs -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            {{ activeTab === 'dashboard' ? 'Ringkasan Bisnis' : activeTab === 'newOrder' ? 'Input Pesanan Baru' : 'Data Pesanan & SPK' }}
          </h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-0.5">
            {{ activeTab === 'dashboard' ? 'Pantau pesanan, total revenue, dan statistik produksi.' : activeTab === 'newOrder' ? 'Formulir pencatatan transaksi terpadu lengkap dengan kalkulasi & mockup.' : 'Kelola transaksi, cetak SPK konveksi, Invoice A4, dan Resi Thermal A6.' }}
          </p>
        </div>

        <!-- Tab Switcher -->
        <div class="flex bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button 
            @click="activeTab = 'dashboard'" 
            :class="['px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5', activeTab === 'dashboard' ? 'bg-nezo-lime text-slate-950' : 'text-slate-400 hover:text-white']"
          >
            <LayoutDashboard class="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          
          <button 
            @click="activeTab = 'newOrder'" 
            :class="['px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5', activeTab === 'newOrder' ? 'bg-nezo-lime text-slate-950' : 'text-slate-400 hover:text-white']"
          >
            <PlusCircle class="w-3.5 h-3.5" />
            <span>Input Pesanan</span>
          </button>

          <button 
            @click="activeTab = 'orders'" 
            :class="['px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5', activeTab === 'orders' ? 'bg-nezo-lime text-slate-950' : 'text-slate-400 hover:text-white']"
          >
            <Receipt class="w-3.5 h-3.5" />
            <span>Data Pesanan ({{ ordersStore.totalOrdersCount }})</span>
          </button>
        </div>
      </div>

      <!-- Error / Setup Banner for Supabase (if table not created yet) -->
      <div 
        v-if="!ordersStore.isCloudConnected && ordersStore.errorMessage"
        class="mb-6 p-4 rounded-2xl bg-amber-950/70 border border-amber-500/50 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg"
      >
        <div class="flex items-center gap-2.5">
          <AlertCircle class="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong class="text-white block text-sm mb-0.5">Database Supabase Belum Siap</strong>
            <p>{{ ordersStore.errorMessage }}</p>
          </div>
        </div>
        <button 
          @click="ordersStore.fetchOrdersFromSupabase()"
          class="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shrink-0 transition"
        >
          🔄 Coba Sambungkan Ulang
        </button>
      </div>

      <!-- Stats Overview Cards (Always Visible) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl relative overflow-hidden">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Pesanan</span>
          <div class="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">
            {{ ordersStore.totalOrdersCount }}
          </div>
          <span class="text-[10px] text-slate-500 mt-1 block">Transaksi tersimpan</span>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl relative overflow-hidden">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Omset</span>
          <div class="text-xl sm:text-2xl font-black text-nezo-lime mt-1 font-mono">
            {{ formatMoney(ordersStore.totalRevenue) }}
          </div>
          <span class="text-[10px] text-slate-500 mt-1 block">Nilai kotor seluruh order</span>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl relative overflow-hidden">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tim / Pelanggan</span>
          <div class="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">
            {{ ordersStore.uniqueTeamsCount }}
          </div>
          <span class="text-[10px] text-slate-500 mt-1 block">Klub / Tim berbeda</span>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl relative overflow-hidden">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Kuantiti</span>
          <div class="text-2xl sm:text-3xl font-black text-amber-400 mt-1 font-mono">
            {{ ordersStore.totalItemsQty }} Pcs
          </div>
          <span class="text-[10px] text-slate-500 mt-1 block">Jumlah jersey diproduksi</span>
        </div>
      </div>

      <!-- TAB 1: DASHBOARD VIEW -->
      <section v-if="activeTab === 'dashboard'" class="space-y-6">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h2 class="text-base font-black text-white uppercase">Pesanan Terbaru</h2>
              <p class="text-xs text-slate-400">5 transaksi terakhir yang masuk ke sistem</p>
            </div>
            <button 
              @click="activeTab = 'newOrder'"
              class="px-3 py-1.5 bg-nezo-lime text-slate-950 font-black text-xs rounded-lg hover:bg-lime-400 transition"
            >
              + Buat Order Baru
            </button>
          </div>

          <div v-if="recentOrders.length" class="divide-y divide-slate-800">
            <div 
              v-for="order in recentOrders" 
              :key="order.id"
              class="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 p-2 rounded-xl transition"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-nezo-lime font-mono font-black text-sm shrink-0">
                  NZ
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-white text-sm uppercase">{{ order.team }}</span>
                    <span class="font-mono text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                      {{ order.id }}
                    </span>
                  </div>
                  <div class="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                    <span>{{ order.date }}</span>
                    <span>•</span>
                    <span>{{ order.contact || 'No WA: -' }}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                <div class="text-left sm:text-right">
                  <div class="text-sm font-black text-nezo-lime font-mono">{{ formatMoney(order.total) }}</div>
                  <div class="text-[10px] text-slate-400">{{ orderTotalQty(order) }} pcs</div>
                </div>

                <!-- 1-Click Document Actions -->
                <div class="flex items-center gap-1.5">
                  <button 
                    @click="ordersStore.openSpkModal(order)"
                    class="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-slate-700 transition"
                    title="Cetak SPK Produksi"
                  >
                    📄 SPK
                  </button>
                  <button 
                    @click="ordersStore.openInvoiceModal(order)"
                    class="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-slate-700 transition"
                    title="Cetak Invoice"
                  >
                    🧾 Invoice
                  </button>
                  <button 
                    @click="ordersStore.openLabelModal(order)"
                    class="px-2.5 py-1 rounded bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-slate-700 transition"
                    title="Cetak Stiker Label A6"
                  >
                    🏷️ A6
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12 text-slate-500 text-xs">
            Belum ada pesanan yang tersimpan. Klik "Input Pesanan" untuk membuat pesanan pertama!
          </div>
        </div>
      </section>

      <!-- TAB 2: INPUT PESANAN BARU -->
      <section v-if="activeTab === 'newOrder'" class="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7">
        <form @submit.prevent="saveNewOrder" class="space-y-6">
          
          <!-- Top Row: Transaksi Info -->
          <div>
            <h3 class="text-sm font-black text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Tag class="w-4 h-4" />
              <span>1. Identitas Pesanan</span>
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-bold text-slate-400 uppercase mb-1">No. Transaksi (otomatis)</label>
                <input 
                  type="text" 
                  :value="formOrder.id || 'Dibuat saat disimpan'"
                  readonly 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold text-nezo-lime outline-none"
                />
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-400 uppercase mb-1">Tanggal Pesanan *</label>
                <input 
                  type="date" 
                  v-model="formOrder.date" 
                  required
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-nezo-lime"
                />
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama Tim / Pelanggan *</label>
                <input 
                  type="text" 
                  v-model="formOrder.team" 
                  placeholder="Contoh: GARUDA VC" 
                  required
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white uppercase font-bold outline-none focus:border-nezo-lime"
                />
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-400 uppercase mb-1">Kontak WhatsApp / HP</label>
                <input 
                  type="text" 
                  v-model="formOrder.contact" 
                  placeholder="081234567890" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-nezo-lime"
                />
              </div>
            </div>

            <div class="mt-3">
              <label class="block text-[11px] font-bold text-slate-400 uppercase mb-1">Catatan Tambahan</label>
              <input 
                type="text" 
                v-model="formOrder.notes" 
                placeholder="Contoh: Jersey tanding turnamen, deadline tgl 20, sablon emas" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-nezo-lime"
              />
            </div>
          </div>

          <!-- Section 2: 3 Image Mockup Upload (1080x1350 px) -->
          <div class="border-t border-slate-800 pt-5">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Image class="w-4 h-4" />
                <span>2. Upload 3 Foto Mockup Desain (1080 × 1350 px)</span>
              </h3>
              <span class="text-[11px] text-slate-400 italic">Otomatis dikompresi agar ringan di database</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div 
                v-for="(slot, idx) in 3" 
                :key="idx"
                class="relative bg-slate-950 border-2 border-dashed border-slate-700 hover:border-nezo-lime rounded-xl aspect-[1080/1350] max-h-72 flex flex-col items-center justify-center overflow-hidden cursor-pointer group transition"
                @click="triggerUploadNewOrder(idx)"
              >
                <input 
                  :ref="el => newOrderFileInputs[idx] = el"
                  type="file" 
                  accept="image/*" 
                  class="hidden" 
                  @change="e => onNewOrderImageChanged(e, idx)"
                />

                <img 
                  v-if="formOrder.images[idx]" 
                  :src="formOrder.images[idx]" 
                  :alt="`Mockup ${idx + 1}`" 
                  class="w-full h-full object-cover"
                />

                <div v-else class="text-center p-3">
                  <UploadCloud class="w-7 h-7 text-slate-500 group-hover:text-nezo-lime mx-auto mb-1 transition" />
                  <p class="text-xs font-bold text-slate-300">
                    {{ idx === 0 ? 'Desain Depan' : idx === 1 ? 'Desain Belakang' : 'Detail Logo / Kerah' }}
                  </p>
                  <p class="text-[10px] text-slate-500 font-mono mt-0.5">1080 × 1350 px</p>
                </div>

                <button 
                  v-if="formOrder.images[idx]"
                  type="button" 
                  @click.stop="formOrder.images[idx] = ''" 
                  class="absolute top-2 right-2 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-rose-700 shadow"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <!-- Section 3: Rincian Item Produk & Ukuran -->
          <div class="border-t border-slate-800 pt-5">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h3 class="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Package class="w-4 h-4" />
                  <span>3. Rincian Item Produk</span>
                </h3>
                <p class="text-xs text-slate-400">Pilih jenis produk, ukuran, harga satuan, dan kuantiti pesanan</p>
              </div>
              <button 
                type="button" 
                @click="addCustomProductLine"
                class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
              >
                + Tambah Baris
              </button>
            </div>

            <div class="space-y-2">
              <div class="hidden sm:grid grid-cols-12 gap-2 text-[10px] font-bold uppercase text-slate-400 px-3">
                <span class="col-span-4">Jenis Produk</span>
                <span class="col-span-2">Ukuran</span>
                <span class="col-span-2">Harga (Rp)</span>
                <span class="col-span-2">Qty (Pcs)</span>
                <span class="col-span-2 text-right">Subtotal</span>
              </div>

              <div 
                v-for="(item, idx) in formOrder.items" 
                :key="idx"
                class="bg-slate-950 p-2.5 sm:px-3 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs"
              >
                <div class="sm:col-span-4">
                  <input 
                    type="text" 
                    v-model="item.product" 
                    placeholder="Nama produk..."
                    class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-bold text-white outline-none focus:border-nezo-lime"
                  />
                </div>

                <div class="sm:col-span-2">
                  <select 
                    v-model="item.size" 
                    class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none font-bold"
                  >
                    <option v-for="s in sizeOptions" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>

                <div class="sm:col-span-2">
                  <input 
                    type="number" 
                    min="0" 
                    step="1000"
                    v-model.number="item.price" 
                    placeholder="Harga" 
                    class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none focus:border-nezo-lime"
                  />
                </div>

                <div class="sm:col-span-2 flex items-center gap-1.5">
                  <input 
                    type="number" 
                    min="0" 
                    v-model.number="item.qty" 
                    placeholder="Qty" 
                    class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-bold text-center text-white outline-none focus:border-nezo-lime"
                  />
                </div>

                <div class="sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
                  <span class="font-mono font-bold text-nezo-lime">
                    {{ formatMoney((item.price || 0) * (item.qty || 0)) }}
                  </span>
                  <button 
                    type="button" 
                    @click="removeProductLine(idx)" 
                    class="text-rose-400 hover:text-rose-200 text-base px-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <!-- Grand Total Calculation Box -->
            <div class="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-500/40 flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Pesanan</span>
                <span class="text-sm font-bold text-amber-400">{{ formOrderTotalQty }} Pcs</span>
              </div>
              <div class="text-right">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Grand Total</span>
                <span class="text-2xl font-black text-nezo-lime font-mono">{{ formatMoney(formOrderTotalAmount) }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 pt-4 border-t border-slate-800">
            <button 
              type="submit" 
              class="px-6 py-3 bg-nezo-lime hover:bg-lime-400 text-slate-950 font-black rounded-xl text-sm transition uppercase tracking-wider shadow-lg shadow-nezo-lime/10"
            >
              ✓ Simpan Pesanan
            </button>
            <button 
              type="button" 
              @click="resetOrderForm" 
              class="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-sm transition"
            >
              Reset Form
            </button>
          </div>

        </form>
      </section>

      <!-- TAB 3: DATA PESANAN TABLE -->
      <section v-if="activeTab === 'orders'" class="space-y-4">
        
        <!-- Search & Filter Bar -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
          <div class="relative w-full sm:max-w-md">
            <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Cari no. transaksi, nama tim, kontak, atau tanggal..." 
              class="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-nezo-lime"
            />
          </div>

          <div class="flex items-center gap-2 self-end sm:self-auto">
            <button 
              @click="activeTab = 'newOrder'"
              class="px-3 py-2 bg-nezo-lime text-slate-950 font-bold text-xs rounded-xl hover:bg-lime-400 transition"
            >
              + Tambah Pesanan
            </button>
          </div>
        </div>

        <!-- Orders Table -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-950 text-slate-400 text-[10px] uppercase font-mono border-b border-slate-800">
                  <th class="p-3.5">No. Transaksi</th>
                  <th class="p-3.5">Tanggal</th>
                  <th class="p-3.5">Nama Tim & Kontak</th>
                  <th class="p-3.5">Item & Qty</th>
                  <th class="p-3.5">Total</th>
                  <th class="p-3.5 text-center">Aksi Dokumen</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800 text-slate-200">
                <tr 
                  v-for="order in filteredOrders" 
                  :key="order.id" 
                  class="hover:bg-slate-800/40 transition"
                >
                  <td class="p-3.5 font-mono">
                    <span class="bg-slate-800 text-nezo-lime px-2 py-0.5 rounded font-bold border border-slate-700">
                      {{ order.id }}
                    </span>
                  </td>
                  <td class="p-3.5 whitespace-nowrap text-slate-400">{{ order.date }}</td>
                  <td class="p-3.5">
                    <div class="font-bold text-white uppercase">{{ order.team }}</div>
                    <div class="text-[11px] text-slate-400">{{ order.contact || '-' }}</div>
                  </td>
                  <td class="p-3.5">
                    <div v-for="(it, i) in (order.items || []).filter(x => (x.qty || 0) > 0).slice(0, 3)" :key="i" class="text-[11px]">
                      {{ it.product }} ({{ it.size }}) × {{ it.qty }}
                    </div>
                    <div v-if="(order.items || []).length > 3" class="text-[10px] text-slate-500 italic">
                      +{{ order.items.length - 3 }} item lainnya
                    </div>
                  </td>
                  <td class="p-3.5 font-mono font-bold text-nezo-lime">
                    {{ formatMoney(order.total) }}
                  </td>
                  <td class="p-3.5">
                    <div class="flex items-center justify-center gap-1.5 flex-wrap">
                      <button 
                        @click="ordersStore.openSpkModal(order)"
                        class="px-2 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold rounded border border-amber-500/40 transition text-[11px]"
                        title="Surat Perintah Kerja (A4)"
                      >
                        📄 SPK
                      </button>
                      
                      <button 
                        @click="ordersStore.openInvoiceModal(order)"
                        class="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold rounded border border-emerald-500/40 transition text-[11px]"
                        title="Invoice Resmi (A4)"
                      >
                        🧾 Invoice
                      </button>

                      <button 
                        @click="ordersStore.openLabelModal(order)"
                        class="px-2 py-1 bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-bold rounded border border-sky-500/40 transition text-[11px]"
                        title="Stiker Resi Thermal (A6)"
                      >
                        🏷️ Label A6
                      </button>

                      <button 
                        @click="editDate(order)"
                        class="p-1 text-slate-400 hover:text-white transition"
                        title="Ubah Tanggal"
                      >
                        <Calendar class="w-3.5 h-3.5" />
                      </button>

                      <button 
                        @click="deleteOrder(order)"
                        class="p-1 text-rose-400 hover:text-rose-200 transition"
                        title="Hapus Pesanan"
                      >
                        <Trash2 class="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!filteredOrders.length">
                  <td colspan="6" class="p-8 text-center text-slate-500 text-xs">
                    Tidak ada pesanan yang sesuai dengan pencarian "{{ searchQuery }}".
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrdersStore, DEFAULT_PRODUCTS, DEFAULT_SIZES, formatMoney, getTodayDateString, compressImageToRatio } from '../../stores/orders'
import { useCatalogStore } from '../../stores/catalog'
import { 
  ArrowLeft, Download, LogOut, LayoutDashboard, PlusCircle, Receipt, 
  Tag, Image, Package, UploadCloud, Search, Calendar, Trash2, AlertCircle 
} from 'lucide-vue-next'

const ordersStore = useOrdersStore()
const catalogStore = useCatalogStore()

const activeTab = ref('dashboard')
const searchQuery = ref('')
const sizeOptions = DEFAULT_SIZES
const newOrderFileInputs = ref([])

// Form State
const getEmptyOrderForm = () => {
  return {
    id: ordersStore.getNextTrxId(),
    date: getTodayDateString(),
    team: '',
    contact: '',
    notes: '',
    images: ['', '', ''],
    items: DEFAULT_PRODUCTS.map(p => ({
      product: p,
      size: 'M',
      price: 135000,
      qty: 0
    }))
  }
}

const formOrder = ref(getEmptyOrderForm())

onMounted(() => {
  ordersStore.fetchOrdersFromSupabase()
  
  // If navigated from WhatsApp with activeDraft
  if (ordersStore.activeDraft) {
    formOrder.value = {
      ...getEmptyOrderForm(),
      ...ordersStore.activeDraft,
      id: ordersStore.getNextTrxId()
    }
    activeTab.value = 'newOrder'
    ordersStore.activeDraft = null
  }
})

const recentOrders = computed(() => {
  return [...ordersStore.orders].slice(0, 5)
})

const filteredOrders = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return ordersStore.orders
  return ordersStore.orders.filter(o => {
    return [o.id, o.team, o.date, o.contact, o.notes].some(v => String(v || '').toLowerCase().includes(q))
  })
})

const orderTotalQty = (order) => {
  return (order.items || []).reduce((s, i) => s + (Number(i.qty) || 0), 0)
}

const formOrderTotalQty = computed(() => {
  return formOrder.value.items.reduce((s, i) => s + (Number(i.qty) || 0), 0)
})

const formOrderTotalAmount = computed(() => {
  return formOrder.value.items.reduce((s, i) => s + ((Number(i.price) || 0) * (Number(i.qty) || 0)), 0)
})

const triggerUploadNewOrder = (idx) => {
  if (newOrderFileInputs.value[idx]) {
    newOrderFileInputs.value[idx].click()
  }
}

const onNewOrderImageChanged = async (event, idx) => {
  const file = event.target.files && event.target.files[0]
  if (!file) return
  try {
    const compressed = await compressImageToRatio(file, 1080, 1350, 0.82)
    formOrder.value.images[idx] = compressed
  } catch (err) {
    alert('Gambar gagal diproses. Gunakan format JPG/PNG.')
  }
}

const addCustomProductLine = () => {
  formOrder.value.items.push({
    product: 'Custom Item',
    size: 'L',
    price: 135000,
    qty: 0
  })
}

const removeProductLine = (idx) => {
  formOrder.value.items.splice(idx, 1)
}

const resetOrderForm = () => {
  formOrder.value = getEmptyOrderForm()
}

const saveNewOrder = async () => {
  const activeItems = formOrder.value.items.filter(i => (Number(i.qty) || 0) > 0)
  if (!activeItems.length) {
    alert('Minimal satu jenis produk harus memiliki Qty lebih dari 0.')
    return
  }

  try {
    const newOrder = await ordersStore.addOrder({
      date: formOrder.value.date,
      team: formOrder.value.team,
      contact: formOrder.value.contact,
      notes: formOrder.value.notes,
      images: [...formOrder.value.images],
      items: activeItems,
      total: formOrderTotalAmount.value
    })

    catalogStore.showToast(`Pesanan ${newOrder.id} berhasil disimpan!`)
    resetOrderForm()
    activeTab.value = 'orders'
  } catch (err) {
    alert(err?.message || 'Gagal menyimpan pesanan. Periksa koneksi atau konfigurasi tenant.')
  }
}

const editDate = (order) => {
  const nextDate = prompt(`Ubah tanggal pesanan ${order.id} (${order.team}):\nFormat: YYYY-MM-DD`, order.date)
  if (nextDate && /^\d{4}-\d{2}-\d{2}$/.test(nextDate.trim())) {
    ordersStore.updateOrder(order.id, { date: nextDate.trim() })
  }
}

const deleteOrder = (order) => {
  if (confirm(`Yakin ingin menghapus pesanan ${order.id} - ${order.team}?`)) {
    ordersStore.deleteOrder(order.id)
    catalogStore.showToast(`Pesanan ${order.id} berhasil dihapus.`)
  }
}

const handleLogout = () => {
  ordersStore.logout()
  catalogStore.navigateTo('home')
}
</script>
