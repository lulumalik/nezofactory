<template>
  <footer class="bg-nezo-black text-gray-400 border-t border-nezo-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
        
        <!-- Brand Column (2 cols wide on LG) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-black overflow-hidden flex items-center justify-center border-2 border-nezo-lime shadow-glow-lime shrink-0">
              <img :src="logoUrl" alt="NEZO FACTORY" class="w-full h-full object-cover" />
            </div>
            <div>
              <span class="font-display font-black text-2xl tracking-tight text-white">NEZO</span>
              <span class="font-display font-extrabold text-xs tracking-wider uppercase px-1.5 py-0.5 bg-nezo-lime text-black rounded font-mono ml-1.5">FACTORY</span>
              <p class="text-[10px] tracking-widest text-nezo-lime font-bold uppercase">YOUR TEAM. YOUR STYLE.</p>
            </div>
          </div>

          <p class="text-xs text-gray-400 leading-relaxed max-w-sm">
            {{ localeStore.t('footerDesc') }}
          </p>

          <div class="space-y-2 text-xs text-gray-300 pt-2">
            <div class="flex items-center gap-2">
              <PhoneCall class="w-4 h-4 text-nezo-lime shrink-0" />
              <span>WhatsApp Admin: {{ catalogStore.formattedWhatsappNumber }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Clock class="w-4 h-4 text-nezo-lime shrink-0" />
              <span>Jam Layanan: 08.00 - 21.00 WIB (Senin - Minggu)</span>
            </div>
            <div class="flex items-center gap-2">
              <MapPin class="w-4 h-4 text-nezo-lime shrink-0" />
              <span>{{ localeStore.t('footerAddress') }}</span>
            </div>
          </div>
        </div>

        <!-- Column 2: Layanan & Informasi -->
        <div class="space-y-3">
          <h4 class="text-xs font-black uppercase tracking-wider text-white border-l-2 border-nezo-lime pl-2">
            {{ localeStore.t('footerServices') }}
          </h4>
          <ul class="space-y-2 text-xs">
            <li>
              <a href="#portfolio" class="hover:text-white transition-colors">Kustom Full Sublimasi</a>
            </li>
            <li>
              <a href="#fabrics" class="hover:text-white transition-colors">Pilihan Bahan Dryfit</a>
            </li>
            <li>
              <a href="#size-chart" class="hover:text-white transition-colors">Panduan Ukuran (Size Chart)</a>
            </li>
            <li>
              <a href="#reviews" class="hover:text-white transition-colors">Galeri Foto Tim Real</a>
            </li>
            <li>
              <button @click="catalogStore.openInquiryModal()" class="hover:text-white transition-colors text-left">
                Konsultasi Mockup Gratis
              </button>
            </li>
          </ul>
        </div>

        <!-- Column 3: Kategori Jersey -->
        <div class="space-y-3">
          <h4 class="text-xs font-black uppercase tracking-wider text-white border-l-2 border-nezo-lime pl-2">
            {{ localeStore.t('footerCategories') }}
          </h4>
          <ul class="space-y-2 text-xs">
            <li>
              <button @click="filterCategory('reguler')" class="hover:text-white transition-colors text-left">
                Jersey Reguler (Pria/Unisex)
              </button>
            </li>
            <li>
              <button @click="filterCategory('lengan_pendek')" class="hover:text-white transition-colors text-left">
                Jersey Lengan Pendek (Wanita)
              </button>
            </li>
            <li>
              <a href="#size-chart" class="hover:text-white transition-colors">
                Jersey Voli Anak-Anak
              </a>
            </li>
            <li>
              <a href="#size-chart" class="hover:text-white transition-colors">
                Jaket & Outerwear Tim
              </a>
            </li>
            <li>
              <button @click="filterCategory('best_seller')" class="hover:text-white transition-colors text-left">
                Koleksi Best Seller
              </button>
            </li>
          </ul>
        </div>

        <!-- Column 4: WhatsApp Direct & Social -->
        <div class="space-y-3">
          <h4 class="text-xs font-black uppercase tracking-wider text-white border-l-2 border-nezo-lime pl-2">
            {{ localeStore.t('footerContact') }}
          </h4>
          <p class="text-xs text-gray-400">
            Punya ide desain sendiri atau mau request warna lain? Chat kami langsung:
          </p>

          <div>
            <button 
              @click="catalogStore.openInquiryModal()"
              class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <MessageCircle class="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </button>
          </div>

          <div class="pt-2">
            <span class="text-[11px] font-bold uppercase text-gray-400 block mb-2">{{ localeStore.t('footerSocial') }}:</span>
            <div class="flex items-center gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-lg bg-nezo-surface hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram class="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-lg bg-nezo-surface hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook class="w-4 h-4" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-lg bg-nezo-surface hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors">
                <Share2 class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-6 border-t border-nezo-border flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
        <p>{{ localeStore.t('footerCopyright') }}</p>
        <div class="flex items-center gap-4 text-xs">
          <span class="text-gray-400">Kustom Volley Portofolio Web App</span>
          <span>•</span>
          <span class="text-nezo-lime font-mono">NEZO FACTORY</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useCatalogStore } from '../stores/catalog'
import { useLocaleStore } from '../stores/locale'
import logoUrl from '@/assets/logo.jpeg'
import { 
  PhoneCall, Clock, MapPin, MessageCircle, 
  Instagram, Facebook, Share2 
} from 'lucide-vue-next'

const catalogStore = useCatalogStore()
const localeStore = useLocaleStore()

const filterCategory = (cat) => {
  catalogStore.selectedCategory = cat
  const el = document.getElementById('portfolio')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>
