<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    @click.self="close"
  >
    <div class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative text-white">
      
      <!-- Close Button -->
      <button 
        @click="close" 
        class="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-xl bg-nezo-lime/20 border border-nezo-lime/40 flex items-center justify-center mx-auto mb-3 text-nezo-lime">
          <Lock class="w-6 h-6" />
        </div>
        <h2 class="text-xl sm:text-2xl font-black uppercase tracking-tight">Portal Admin Pabrik</h2>
        <p class="text-xs text-slate-400 mt-1">Masuk untuk mengelola Data Pesanan, SPK, & Invoice</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Username</label>
          <input 
            type="text" 
            v-model="username" 
            placeholder="username"
            required
            class="w-full bg-slate-950 border border-slate-700 focus:border-nezo-lime rounded-xl p-3 text-sm text-white outline-none"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 uppercase mb-1">Password</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="password"
            required
            class="w-full bg-slate-950 border border-slate-700 focus:border-nezo-lime rounded-xl p-3 text-sm text-white outline-none"
          />
        </div>

        <div v-if="errorMessage" class="p-3 rounded-lg bg-rose-950/60 border border-rose-600/40 text-rose-300 text-xs font-semibold">
          {{ errorMessage }}
        </div>

        <button 
          type="submit" 
          class="w-full py-3 bg-nezo-lime hover:bg-lime-400 text-slate-950 font-black rounded-xl text-sm transition shadow-lg shadow-nezo-lime/10 uppercase tracking-wider"
        >
          Masuk ke Dashboard
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOrdersStore } from '../../stores/orders'
import { useCatalogStore } from '../../stores/catalog'
import { Lock, X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])

const ordersStore = useOrdersStore()
const catalogStore = useCatalogStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  errorMessage.value = ''
  const res = ordersStore.login(username.value, password.value)
  if (res.success) {
    emit('success')
    emit('close')
    catalogStore.navigateTo('admin')
  } else {
    errorMessage.value = res.message
  }
}

const close = () => {
  errorMessage.value = ''
  emit('close')
}
</script>
