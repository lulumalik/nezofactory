<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-slate-900 font-sans pb-16 lg:pb-0">
    <!-- Header with Top Banner and Category Nav -->
    <AppHeader />

    <!-- Main Content Dynamic View -->
    <main class="flex-1">
      <!-- VIEW 1: HOME PAGE (Matahari Landing Experience) -->
      <div v-if="catalogStore.currentView === 'home'">
        <!-- 1. Matahari-style Big Hero Promotion -->
        <HeroPromotion />

        <!-- 2. Product Grid / Volley Portfolio -->
        <ProductGrid />

        <!-- 3. Fabric & Texture Technology Section (Separated High-res Texture Crops) -->
        <TextureSection />

        <!-- 4. Parsed Size Chart Section (Dewasa, Anak, Jaket) -->
        <SizeChartSection />

        <!-- 5. Real Customer & Team Review Gallery -->
        <ReviewGallery />
      </div>

      <!-- VIEW 2: DEDICATED CATALOG & PRODUCT CODES PAGE -->
      <div v-else-if="catalogStore.currentView === 'catalog'">
        <CatalogPage />
      </div>

      <!-- VIEW 3: ORDER DETAIL & VERIFICATION PAGE (FROM WHATSAPP LINK) -->
      <div v-else-if="catalogStore.currentView === 'order'">
        <OrderDetailPage />
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Fixed Mobile Bottom Navigation Bar (App Experience) -->
    <AppBottomNav />

    <!-- Interactive Modals -->
    <ProductDetailModal />
    <WhatsAppModal />
    <ImageZoomModal />

    <!-- Floating Action WhatsApp Button (Desktop only) -->
    <FloatingWhatsApp />

    <!-- Global Toast Notification -->
    <transition name="toast-fade">
      <div 
        v-if="catalogStore.toastMessage"
        class="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur text-nezo-lime px-5 py-2.5 rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 border border-nezo-lime/40 animate-bounce"
      >
        <CheckCircle2 class="w-4 h-4 text-nezo-lime shrink-0" />
        <span>{{ catalogStore.toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCatalogStore } from './stores/catalog'
import AppHeader from './components/AppHeader.vue'
import AppBottomNav from './components/AppBottomNav.vue'
import HeroPromotion from './components/HeroPromotion.vue'
import ProductGrid from './components/ProductGrid.vue'
import TextureSection from './components/TextureSection.vue'
import SizeChartSection from './components/SizeChartSection.vue'
import ReviewGallery from './components/ReviewGallery.vue'
import CatalogPage from './components/CatalogPage.vue'
import OrderDetailPage from './components/OrderDetailPage.vue'
import AppFooter from './components/AppFooter.vue'
import ProductDetailModal from './components/ProductDetailModal.vue'
import WhatsAppModal from './components/WhatsAppModal.vue'
import ImageZoomModal from './components/ImageZoomModal.vue'
import FloatingWhatsApp from './components/FloatingWhatsApp.vue'
import { CheckCircle2 } from 'lucide-vue-next'

const catalogStore = useCatalogStore()

onMounted(() => {
  catalogStore.initRouting()
})
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 15px);
}
</style>
