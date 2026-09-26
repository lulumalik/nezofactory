<template>
  <section id="home" class="relative bg-nezo-black text-white overflow-hidden">
    <!-- Main Carousel -->
    <div 
      class="relative w-full h-[440px] sm:h-[460px] md:h-[520px] lg:h-[560px]"
      @touchstart.passive="handleTouchStart"
      @touchend.passive="handleTouchEnd"
    >
      <!-- Slides Container -->
      <div 
        class="flex w-full h-full transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <!-- SLIDE 1: Hero Main with image_promotion_2.jpeg -->
        <div class="w-full h-full shrink-0 relative flex items-center">
          <img 
            src="/assets/image_promotion_2.jpeg" 
            alt="Nezo Factory Volley Promotion" 
            class="absolute right-0 w-9/12 h-full object-cover object-right md:object-center filter brightness-[0.88]"
          />
          <!-- Gradient overlay for text contrast -->
          <div class="absolute inset-0 bg-gradient-to-r from-nezo-black via-nezo-black/75 to-transparent"></div>

          <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full pt-10 pb-16 sm:py-10">
            <div class="max-w-xl space-y-3 sm:space-y-6">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nezo-lime/10 border border-nezo-lime/40 backdrop-blur-md">
                <span class="w-2 h-2 rounded-full bg-nezo-lime animate-ping"></span>
                <span class="text-xs font-bold uppercase tracking-wider text-nezo-lime">Official Volley Apparel</span>
              </div>
              
              <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.08] text-white">
                YOUR TEAM. <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-nezo-lime via-yellow-300 to-lime-400">
                  YOUR STYLE.
                </span>
              </h1>

              <p class="text-xs sm:text-base text-gray-300 line-clamp-3 sm:line-clamp-none max-w-lg font-normal leading-relaxed">
                {{ localeStore.t('heroDesc1') }}
              </p>

              <!-- Buttons -->
              <div class="flex flex-wrap items-center gap-3 pt-2">
                <a 
                  href="#portfolio" 
                  class="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-nezo-lime hover:bg-lime-400 text-black font-extrabold text-xs sm:text-sm shadow-glow-lime transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
                >
                  <span>{{ localeStore.t('heroBtnExplore') }}</span>
                  <ArrowRight class="w-4 h-4" />
                </a>

                <button 
                  @click="catalogStore.openInquiryModal()"
                  class="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all inline-flex items-center gap-2"
                >
                  <MessageCircle class="w-4 h-4 text-emerald-400" />
                  <span>{{ localeStore.t('heroBtnInquire') }}</span>
                </button>
              </div>

              <!-- Quick Badges -->
              <div class="pt-3 sm:pt-4 flex items-center gap-4 text-xs text-gray-400">
                <div class="flex items-center gap-1.5">
                  <CheckCircle2 class="w-4 h-4 text-nezo-lime" />
                  <span>Bebas Nama & Nomor</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <CheckCircle2 class="w-4 h-4 text-nezo-lime" />
                  <span>Standar PBVSI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE 2: Fabric & Texture Technology -->
        <div class="w-full h-full shrink-0 relative flex items-center bg-gradient-to-r from-slate-950 via-slate-900 to-zinc-900">
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#ccff00_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full pt-10 pb-16 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="max-w-xl space-y-3 sm:space-y-4">
              <span class="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Teknologi Kain Olahraga
              </span>

              <h2 class="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-tight text-white">
                3 PILIHAN BAHAN <br />
                <span class="text-nezo-lime">PREMIUM DRYFIT</span>
              </h2>

              <p class="text-xs sm:text-base text-gray-300 leading-relaxed">
                {{ localeStore.t('heroDesc2') }}
              </p>

              <div class="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                <span class="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 text-white text-[11px] sm:text-xs font-semibold border border-white/20">
                  Dryfit Brazil (Micro-dot)
                </span>
                <span class="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 text-white text-[11px] sm:text-xs font-semibold border border-white/20">
                  Dryfit Milano (Chevron)
                </span>
                <span class="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 text-white text-[11px] sm:text-xs font-semibold border border-white/20">
                  Embos Topo (3D Contour)
                </span>
              </div>

              <div class="pt-2 sm:pt-3">
                <a 
                  href="#fabrics"
                  class="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-nezo-lime text-black font-extrabold text-xs sm:text-sm hover:bg-lime-400 shadow-glow-lime transition-all inline-flex items-center gap-2"
                >
                  <span>{{ localeStore.t('heroBtnFabric') }}</span>
                  <Layers class="w-4 h-4" />
                </a>
              </div>
            </div>

            <!-- Fabric Teaser Images -->
            <div class="hidden md:grid grid-cols-3 gap-3 max-w-md w-full">
              <div class="bg-nezo-surface p-2 rounded-xl border border-nezo-border shadow-lg text-center group cursor-pointer" @click="jumpToFabric('brazil')">
                <img src="/assets/texture/separated/brazil_swatch.jpg" alt="Dryfit Brazil" class="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                <span class="block mt-2 text-xs font-bold text-gray-200">Dryfit Brazil</span>
              </div>
              <div class="bg-nezo-surface p-2 rounded-xl border border-nezo-border shadow-lg text-center group cursor-pointer" @click="jumpToFabric('milano')">
                <img src="/assets/texture/separated/milano_swatch.jpg" alt="Dryfit Milano" class="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                <span class="block mt-2 text-xs font-bold text-gray-200">Dryfit Milano</span>
              </div>
              <div class="bg-nezo-surface p-2 rounded-xl border border-nezo-border shadow-lg text-center group cursor-pointer" @click="jumpToFabric('embos')">
                <img src="/assets/texture/separated/embos_swatch.jpg" alt="Embos Topo" class="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                <span class="block mt-2 text-xs font-bold text-gray-200">Embos Topo</span>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE 3: Customer Satisfaction / Teams in Action -->
        <div class="w-full h-full shrink-0 relative flex items-center bg-zinc-950">
          <img 
            src="/assets/customer_review/02.jpeg" 
            alt="Customer Team in Nezo Volley Uniforms" 
            class="absolute inset-0 w-full h-full object-cover filter brightness-[0.65]"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-nezo-black via-nezo-black/70 to-transparent"></div>

          <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full pt-10 pb-16 sm:py-10">
            <div class="max-w-xl space-y-3 sm:space-y-4">
              <span class="px-3 py-1 rounded-full bg-nezo-red/20 border border-nezo-red text-rose-300 text-xs font-bold uppercase tracking-wider">
                Real Customer Showcase
              </span>

              <h2 class="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
                DIPERCAYA TIM VOLI <br />
                <span class="text-yellow-400">DI SELURUH INDONESIA</span>
              </h2>

              <p class="text-xs sm:text-base text-gray-200 leading-relaxed">
                {{ localeStore.t('heroDesc3') }}
              </p>

              <div class="flex items-center gap-1 text-yellow-400 pt-1">
                <Star class="w-5 h-5 fill-yellow-400" v-for="i in 5" :key="i" />
                <span class="text-white text-xs font-bold ml-2">5.0 / 5.0 Rating Pelanggan</span>
              </div>

              <div class="pt-2 sm:pt-3">
                <a 
                  href="#reviews"
                  class="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-gray-100 shadow transition-all inline-flex items-center gap-2"
                >
                  <span>{{ localeStore.t('heroBtnReview') }}</span>
                  <Users class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Left Arrow Button (Hidden on Mobile, Visible on Tablet/Desktop) -->
      <button 
        @click="prevSlide" 
        class="hidden md:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>

      <!-- Right Arrow Button (Hidden on Mobile, Visible on Tablet/Desktop) -->
      <button 
        @click="nextSlide" 
        class="hidden md:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight class="w-6 h-6" />
      </button>

      <!-- Dots Indicators (Matahari style) -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        <button 
          v-for="(_, idx) in totalSlides" 
          :key="idx"
          @click="currentSlide = idx"
          :class="['h-2 rounded-full transition-all duration-300', currentSlide === idx ? 'w-8 bg-nezo-lime' : 'w-2 bg-white/50 hover:bg-white/80']"
          :aria-label="`Go to slide ${idx + 1}`"
        ></button>
      </div>
    </div>

    <!-- Trust Badges Bar (Below Hero) - Temporarily hidden -->
    <!--
    <div class="bg-nezo-surface border-t border-nezo-border py-4 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
        <div class="flex items-center justify-center sm:justify-start gap-3">
          <div class="w-9 h-9 rounded-lg bg-nezo-lime/10 border border-nezo-lime/30 flex items-center justify-center text-nezo-lime shrink-0">
            <Sparkles class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-white uppercase">Full Print Kustom</h4>
            <p class="text-[11px] text-gray-400">Warna tajam, anti luntur</p>
          </div>
        </div>

        <div class="flex items-center justify-center sm:justify-start gap-3">
          <div class="w-9 h-9 rounded-lg bg-nezo-lime/10 border border-nezo-lime/30 flex items-center justify-center text-nezo-lime shrink-0">
            <Layers class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-white uppercase">3 Bahan Premium</h4>
            <p class="text-[11px] text-gray-400">Brazil, Milano, Embos Topo</p>
          </div>
        </div>

        <div class="flex items-center justify-center sm:justify-start gap-3">
          <div class="w-9 h-9 rounded-lg bg-nezo-lime/10 border border-nezo-lime/30 flex items-center justify-center text-nezo-lime shrink-0">
            <Ruler class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-white uppercase">Dewasa & Anak</h4>
            <p class="text-[11px] text-gray-400">Size S - 5XL & Anak 1-12 th</p>
          </div>
        </div>

        <div class="flex items-center justify-center sm:justify-start gap-3">
          <div class="w-9 h-9 rounded-lg bg-nezo-lime/10 border border-nezo-lime/30 flex items-center justify-center text-nezo-lime shrink-0">
            <MessageCircle class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-white uppercase">WhatsApp Direct</h4>
            <p class="text-[11px] text-gray-400">Konsultasi desain instan</p>
          </div>
        </div>
      </div>
    </div>
    -->
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocaleStore } from '../stores/locale'
import { useCatalogStore } from '../stores/catalog'
import { 
  ChevronLeft, ChevronRight, ArrowRight, MessageCircle, 
  CheckCircle2, Layers, Star, Users, Sparkles, Ruler 
} from 'lucide-vue-next'

const localeStore = useLocaleStore()
const catalogStore = useCatalogStore()

const currentSlide = ref(0)
const totalSlides = 3
let timer = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
}

let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  if (e.changedTouches && e.changedTouches.length > 0) {
    touchStartX = e.changedTouches[0].screenX
  }
}

const handleTouchEnd = (e) => {
  if (e.changedTouches && e.changedTouches.length > 0) {
    touchEndX = e.changedTouches[0].screenX
    const diff = touchEndX - touchStartX
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }
}

const jumpToFabric = (fabricId) => {
  catalogStore.selectedTexture = fabricId
  const el = document.getElementById('fabrics')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  timer = setInterval(nextSlide, 6000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
