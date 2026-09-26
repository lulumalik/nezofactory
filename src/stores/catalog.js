import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocaleStore } from './locale'

// Helper to normalize phone number to WhatsApp international digit format (e.g. 628976005626)
export const normalizeWhatsapp = (num) => {
  if (!num) return ''
  let cleaned = String(num).replace(/\D/g, '')
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1)
  } else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned
  }
  return cleaned
}

// Format WhatsApp number neatly for UI display (e.g. +62 897-6005-626)
export const formatWhatsapp = (num) => {
  const cleaned = normalizeWhatsapp(num)
  if (!cleaned) return ''
  if (cleaned.startsWith('62') && cleaned.length >= 10) {
    const prefix = cleaned.slice(0, 2)
    const part1 = cleaned.slice(2, 5)
    const part2 = cleaned.slice(5, 9)
    const part3 = cleaned.slice(9)
    return `+${prefix} ${part1}-${part2}-${part3}`
  }
  return `+${cleaned}`
}

export const useCatalogStore = defineStore('catalog', () => {
  const localeStore = useLocaleStore()

  // Default WhatsApp Admin Phone Number configured via .env (VITE_WHATSAPP_NUMBER)
  const envWaNumber = import.meta.env.VITE_WHATSAPP_NUMBER || import.meta.env.VITE_WA_NUMBER || '897-6005-626'

  // Initialize from .env or localStorage (if user explicitly customized it in UI)
  const getInitialWhatsapp = () => {
    try {
      const savedEnv = localStorage.getItem('nezo_env_wa')
      const savedCustom = localStorage.getItem('nezo_wa')
      if (savedCustom && savedEnv === envWaNumber) {
        return normalizeWhatsapp(savedCustom)
      }
      const normalized = normalizeWhatsapp(envWaNumber)
      localStorage.setItem('nezo_env_wa', envWaNumber)
      localStorage.setItem('nezo_wa', normalized)
      return normalized
    } catch {
      return normalizeWhatsapp(envWaNumber)
    }
  }

  const whatsappNumber = ref(getInitialWhatsapp())
  const formattedWhatsappNumber = computed(() => formatWhatsapp(whatsappNumber.value))

  const setWhatsappNumber = (num) => {
    const cleaned = normalizeWhatsapp(num)
    if (cleaned) {
      whatsappNumber.value = cleaned
      try {
        localStorage.setItem('nezo_wa', cleaned)
      } catch {}
    }
  }

  // Active filters and search
  const searchQuery = ref('')
  const selectedCategory = ref('all') // all, reguler, lengan_pendek, populer, terbaru
  const favorites = ref(JSON.parse(localStorage.getItem('nezo_favs') || '[]'))

  const toggleFavorite = (productId) => {
    if (favorites.value.includes(productId)) {
      favorites.value = favorites.value.filter(id => id !== productId)
    } else {
      favorites.value.push(productId)
    }
    localStorage.setItem('nezo_favs', JSON.stringify(favorites.value))
  }

  const isFavorite = (productId) => favorites.value.includes(productId)

  // Modals state
  const isDetailModalOpen = ref(false)
  const selectedProduct = ref(null)

  const isOrderModalOpen = ref(false)
  const orderTargetProduct = ref(null)

  const isSizeChartModalOpen = ref(false)
  const activeSizeChartTab = ref('adult') // adult, kids, jacket

  const isTextureModalOpen = ref(false)
  const selectedTexture = ref('milano') // brazil, milano, embos

  const isImageZoomModalOpen = ref(false)
  const zoomImageSrc = ref('')
  const zoomImageTitle = ref('')

  // View state: 'home' | 'catalog' | 'order'
  const currentView = ref('home')
  const catalogCodeFilter = ref('')
  const currentOrderDetail = ref(null)

  // Notification Toast
  const toastMessage = ref('')
  let toastTimer = null
  const showToast = (msg) => {
    toastMessage.value = msg
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastMessage.value = ''
    }, 2800)
  }

  // Copy to clipboard helper
  const copyToClipboard = async (text, successMsg = '') => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      showToast(successMsg || localeStore.t('codeCopied'))
      return true
    } catch {
      return false
    }
  }

  // 1. FABRIC & TEXTURE DATA (Bahasa Sederhana & Jelas)
  const fabrics = ref([
    {
      id: 'brazil',
      name: 'Dryfit Brazil',
      subtitle: 'Kain Berpori Bintik Halus (Micro-dot)',
      tagline: 'RINGAN • ADEM • CEPAT KERING',
      descId: 'Bahan jersey berpori bintik halus. Bahannya sangat ringan, sejuk di badan, dan keringat cepat kering sehingga nyaman dipakai bertanding dalam durasi lama.',
      descEn: 'Lightweight jersey fabric with fine micro-dot pores. Very breathable, keeps you cool, and dries sweat quickly for long match comfort.',
      macroDetailId: 'Permukaan bintik halus melancarkan sirkulasi udara sehingga terasa sejuk di kulit.',
      macroDetailEn: 'Fine micro-dot pores keep airflow smooth and cool against the skin.',
      sublimResultId: 'Warna motif tajam merata, menyatu ke kain, dan tidak luntur saat dicuci.',
      sublimResultEn: 'Vibrant colors absorb directly into the fabric and resist washing out.',
      images: {
        swatch: '/assets/texture/separated/brazil_swatch.jpg',
        macro: '/assets/texture/separated/brazil_macro.jpg',
        sublim: '/assets/texture/separated/brazil_sublim.jpg',
        mockup: '/assets/texture/separated/brazil_mockup.jpg',
        full: '/assets/texture/dry_fit_brazil.jpeg'
      },
      benefitsId: [
        'Sangat ringan di badan dan nyaman dipakai lama',
        'Pori-pori kain membuat sirkulasi udara lebih adem',
        'Cepat menyerap keringat dan tidak bikin lembap',
        'Kain lentur mengikuti gerakan smash dan diving',
        'Cocok untuk seragam tim, turnamen, dan latihan rutin'
      ],
      benefitsEn: [
        'Ultra-lightweight and comfortable for extended matches',
        'Micro-pore ventilation ensures superior cooling airflow',
        'Quick-dry performance prevents clingy moisture',
        'Flexible stretch for jumping, spiking, and diving',
        'Ideal for volleyball team uniforms and tournament play'
      ]
    },
    {
      id: 'milano',
      name: 'Dryfit Milano',
      subtitle: 'Bahan Paling Populer & Favorit Tim Voli',
      tagline: 'ADEM • KUAT • NYAMAN DIPAKAI',
      descId: 'Bahan jersey paling favorit untuk tim voli. Memiliki serat zigzag yang lembut, jatuh di badan, adem, tahan gesekan lantai lapangan, dan warna motifnya awet tidak pudar.',
      descEn: 'The most popular choice for volleyball teams. Features soft zigzag weave, cool drape, high durability against court friction, and long-lasting vivid colors.',
      macroDetailId: 'Serat zigzag lembut, kuat, tidak mudah kusut, dan tahan gesekan lapangan.',
      macroDetailEn: 'Soft zigzag weave, durable, wrinkle-resistant, and court-friction proof.',
      sublimResultId: 'Warna desain tajam dan pekat, tahan dicuci berkali-kali tanpa luntur.',
      sublimResultEn: 'Crisp, deep colors that hold up wash after wash without fading.',
      images: {
        swatch: '/assets/texture/separated/milano_swatch.jpg',
        macro: '/assets/texture/separated/milano_macro.jpg',
        sublim: '/assets/texture/separated/milano_sublim.jpg',
        mockup: '/assets/texture/separated/milano_mockup.jpg',
        full: '/assets/texture/dryfit_milano.jpeg'
      },
      benefitsId: [
        'Pilihan terfavorit dan paling banyak dipesan tim voli',
        'Bahan adem dan cepat menyerap keringat saat tanding',
        'Serat zigzag lembut memberi kesan jersey rapi dan kokoh',
        'Tahan gesekan lantai lapangan dan tidak mudah robek',
        'Jahitan kuat dan awet untuk pemakaian jangka panjang'
      ],
      benefitsEn: [
        'Top choice and best-selling fabric for volleyball squads',
        'Cool feel with rapid sweat absorption during high intensity',
        'Soft zigzag texture looks clean, structured, and premium',
        'High resistance against court floor friction and scuffs',
        'Reinforced durability for long-term season use'
      ]
    },
    {
      id: 'embos',
      name: 'Embos Topo',
      subtitle: 'Bahan Eksklusif dengan Tekstur Timbul',
      tagline: 'MEWAH • ELEGAN • FLEKSIBEL',
      descId: 'Bahan jersey eksklusif dengan motif garis timbul (embos) yang elegan saat diraba. Membuat seragam tim Anda tampil mewah, beda dari yang lain, dan tetap nyaman bergerak.',
      descEn: 'Exclusive jersey fabric featuring a tactile embossed contour texture. Gives your team uniform an elite, distinct look with full athletic flexibility.',
      macroDetailId: 'Motif garis timbul halus yang elegan, memberi kesan mewah saat dilihat dan diraba.',
      macroDetailEn: 'Subtle embossed contour pattern delivering tactile luxury and visual depth.',
      sublimResultId: 'Perpaduan warna dan motif timbul menghasilkan visual jersey yang sangat keren.',
      sublimResultEn: 'Harmonious fusion of vibrant color and embossed texture for a standout look.',
      images: {
        swatch: '/assets/texture/separated/embos_swatch.jpg',
        macro: '/assets/texture/separated/embos_macro.jpg',
        sublim: '/assets/texture/separated/embos_sublim.jpg',
        mockup: '/assets/texture/separated/embos_mockup.jpg',
        full: '/assets/texture/embos_topo.jpeg'
      },
      benefitsId: [
        'Motif timbul eksklusif, seragam tim tampil beda dan mewah',
        'Bahan tetap ringan dan tidak kaku saat dipakai berolahraga',
        'Fleksibel untuk bebas bergerak di lapangan voli',
        'Pilihan tepat untuk jersey juara, kapten, libero, atau turnamen spesial',
        'Warna awet dan motif timbul tidak mudah hilang'
      ],
      benefitsEn: [
        'Exclusive embossed texture sets your squad apart with luxury style',
        'Lightweight feel without any rigidness or extra weight',
        'Full mobility and stretch for on-court performance',
        'Great pick for captain, libero, or tournament special editions',
        'Durable colors and long-lasting embossed pattern'
      ]
    }
  ])

  // 2. PARSED SIZE CHART DATA
  const sizeCharts = ref({
    adult: {
      titleId: 'Size Chart Dewasa (T-Shirt / Jersey)',
      titleEn: 'Adult Size Chart (T-Shirt / Jersey)',
      image: '/assets/size/size_chart_adults.jpeg',
      rows: [
        { size: 'S', width: '48 cm', length: '69 cm', note: '' },
        { size: 'M', width: '50 cm', length: '72 cm', note: '' },
        { size: 'L', width: '52 cm', length: '73 cm', note: '' },
        { size: 'XL', width: '54 cm', length: '75 cm', note: '' },
        { size: '2XL', width: '56 cm', length: '77 cm', note: '' },
        { size: '3XL', width: '58 cm', length: '78 cm', note: '+Rp 5.000' },
        { size: '4XL', width: '60 cm', length: '79 cm', note: '+Rp 5.000' },
        { size: '5XL', width: '62 cm', length: '79 cm', note: '+Rp 5.000' }
      ]
    },
    kids: {
      titleId: 'Size Chart Anak-Anak (Kids)',
      titleEn: 'Children Size Chart (Kids)',
      image: '/assets/size/size_chart_children.jpeg',
      rows: [
        { age: '1 - 2 Th', size: 'XS', width: '30 cm', length: '40 cm' },
        { age: '3 - 4 Th', size: 'S', width: '32 cm', length: '47 cm' },
        { age: '5 - 6 Th', size: 'M', width: '35 cm', length: '49 cm' },
        { age: '7 - 8 Th', size: 'L', width: '38 cm', length: '55 cm' },
        { age: '9 - 10 Th', size: 'XL', width: '42 cm', length: '61 cm' },
        { age: '11 - 12 Th', size: 'XXL', width: '45 cm', length: '66 cm' }
      ]
    },
    jacket: {
      titleId: 'Size Chart Jaket Team (Outerwear)',
      titleEn: 'Team Jacket Size Chart (Outerwear)',
      image: '/assets/size/size.jpeg',
      rows: [
        { size: 'XS', width: '48 cm', height: '65 cm' },
        { size: 'S', width: '50 cm', height: '67 cm' },
        { size: 'M', width: '52 cm', height: '69 cm' },
        { size: 'L', width: '54 cm', height: '71 cm' },
        { size: 'XL', width: '56 cm', height: '73 cm' },
        { size: 'XXL', width: '58 cm', height: '75 cm' },
        { size: 'XXXL', width: '60 cm', height: '77 cm' },
        { size: 'XXXXL', width: '62 cm', height: '79 cm' },
        { size: 'XXXXXL', width: '64 cm', height: '79 cm' }
      ]
    }
  })

  // 3. COMPLETE VOLLEYBALL PORTFOLIO PRODUCTS
  const products = ref([
    // REGULER / UNISEX VOLLEYBALL JERSEYS (17 items)
    {
      id: 'nz-v02',
      code: 'NZ-V02',
      nameId: 'Nezo Volley Graphic Wave NZ-V02',
      nameEn: 'Nezo Volley Graphic Wave NZ-V02',
      category: 'reguler',
      tags: ['reguler', 'terbaru', 'populer'],
      image: '/assets/portfolio_volley/01.jpeg',
      colors: ['#2e5069', '#ad8b91', '#ffffff', '#1e293b'],
      badge: 'Terbaru',
      descriptionId: 'Kombinasi warna teal deep dan dusty rose dengan corak splat modern. Dilengkapi nomor dada & punggung, logo PBVSI serta nickname pemain.',
      descriptionEn: 'Deep teal and dusty rose palette with modern splash patterns. Features chest & back numbers, PBVSI crest, and player nickname.'
    },
    {
      id: 'nz-v01',
      code: 'NZ-V01',
      nameId: 'Nezo Volley Dusty Flare NZ-V01',
      nameEn: 'Nezo Volley Dusty Flare NZ-V01',
      category: 'reguler',
      tags: ['reguler', 'best_seller', 'populer'],
      image: '/assets/portfolio_volley/02.jpeg',
      colors: ['#cd8c90', '#20293d', '#ffffff', '#e2e8f0'],
      badge: 'Best Seller',
      descriptionId: 'Desain elegan warna pink pastel dan navy tua dengan aksen garis vertikal dinamis untuk tim voli modern.',
      descriptionEn: 'Elegant pastel pink and navy accents with dynamic vertical motion lines for modern volleyball squads.'
    },
    {
      id: 'nz-v03',
      code: 'NZ-V03',
      nameId: 'Nezo Volley Arctic Surge NZ-V03',
      nameEn: 'Nezo Volley Arctic Surge NZ-V03',
      category: 'reguler',
      tags: ['reguler', 'populer'],
      image: '/assets/portfolio_volley/03.jpeg',
      colors: ['#92d0d2', '#72a5a5', '#ffffff', '#334155'],
      badge: 'Populer',
      descriptionId: 'Warna mint cyan sejuk dengan tekstur gradasi geometris yang memberikan kesan lincah dan cepat.',
      descriptionEn: 'Cool mint cyan with geometric gradient mesh providing an agile, high-speed visual impact.'
    },
    {
      id: 'nz-v04',
      code: 'NZ-V04',
      nameId: 'Nezo Volley Purple Nebula NZ-V04',
      nameEn: 'Nezo Volley Purple Nebula NZ-V04',
      category: 'reguler',
      tags: ['reguler'],
      image: '/assets/portfolio_volley/04.jpeg',
      colors: ['#9777a2', '#4c1d95', '#ffffff', '#cbd5e1'],
      badge: 'Full Print',
      descriptionId: 'Nuansa ungu lavender dengan kontras putih bersih, cocok untuk tim voli putra maupun putri.',
      descriptionEn: 'Lavender purple shades paired with crisp white contrasts, suitable for both men and women teams.'
    },
    {
      id: 'nz-v05',
      code: 'NZ-V05',
      nameId: 'Nezo Volley Midnight Striker NZ-V05',
      nameEn: 'Nezo Volley Midnight Striker NZ-V05',
      category: 'reguler',
      tags: ['reguler', 'best_seller'],
      image: '/assets/portfolio_volley/05.jpeg',
      colors: ['#1d2b52', '#3b82f6', '#ffffff', '#0f172a'],
      badge: 'Best Seller',
      descriptionId: 'Navy gelap berpadu biru elektrik yang tegas dan sporty. Favorit untuk seragam turnamen resmi.',
      descriptionEn: 'Bold midnight navy paired with electric blue. A strong favorite for competitive tournament uniforms.'
    },
    {
      id: 'nz-v06',
      code: 'NZ-V06',
      nameId: 'Nezo Volley Royal Velocity NZ-V06',
      nameEn: 'Nezo Volley Royal Velocity NZ-V06',
      category: 'reguler',
      tags: ['reguler', 'populer'],
      image: '/assets/portfolio_volley/06.jpeg',
      colors: ['#1b3a71', '#869fc0', '#ffffff', '#0284c7'],
      badge: 'Full Print',
      descriptionId: 'Gradasi royal blue dan sky blue dengan siluet aerodinamis modern.',
      descriptionEn: 'Royal blue to sky blue gradient with streamlined modern aerodynamic silhouettes.'
    },
    {
      id: 'nz-v07',
      code: 'NZ-V07',
      nameId: 'Nezo Volley Stealth Monochrome NZ-V07',
      nameEn: 'Nezo Volley Stealth Monochrome NZ-V07',
      category: 'reguler',
      tags: ['reguler', 'terbaru'],
      image: '/assets/portfolio_volley/07.jpeg',
      colors: ['#374151', '#6b7280', '#e5e7eb', '#111827'],
      badge: 'Terbaru',
      descriptionId: 'Nuansa monokrom abu-abu baja dan hitam arang yang gagah, bersih, dan berwibawa.',
      descriptionEn: 'Monochrome steel grey and charcoal black delivering a disciplined, commanding presence.'
    },
    {
      id: 'nz-v08',
      code: 'NZ-V08',
      nameId: 'Nezo Volley Emerald Predator NZ-V08',
      nameEn: 'Nezo Volley Emerald Predator NZ-V08',
      category: 'reguler',
      tags: ['reguler', 'populer'],
      image: '/assets/portfolio_volley/08.jpeg',
      colors: ['#005764', '#0f766e', '#111827', '#ffffff'],
      badge: 'Populer',
      descriptionId: 'Dominasi warna dark teal emerald dan hitam dengan aksen grafis modern berkarakter tangguh.',
      descriptionEn: 'Deep teal emerald and pitch black with aggressive graphics built for tough, resilient squads.'
    },
    {
      id: 'nz-v09',
      code: 'NZ-V09',
      nameId: 'Nezo Volley Sunset Cyan NZ-V09',
      nameEn: 'Nezo Volley Sunset Cyan NZ-V09',
      category: 'reguler',
      tags: ['reguler', 'terbaru'],
      image: '/assets/portfolio_volley/09.jpeg',
      colors: ['#1eb8de', '#ba7b28', '#ffffff', '#0369a1'],
      badge: 'Desain Baru',
      descriptionId: 'Kombinasi berani antara biru cerah dan aksen emas tembaga yang eye-catching di lapangan.',
      descriptionEn: 'A bold, eye-catching combination of vibrant cyan and warm copper gold accents.'
    },
    {
      id: 'nz-v10',
      code: 'NZ-V10',
      nameId: 'Nezo Volley Ultra Violet NZ-V10',
      nameEn: 'Nezo Volley Ultra Violet NZ-V10',
      category: 'reguler',
      tags: ['reguler', 'best_seller'],
      image: '/assets/portfolio_volley/10.jpeg',
      colors: ['#101385', '#8282b9', '#ffffff', '#1e1b4b'],
      badge: 'Best Seller',
      descriptionId: 'Biru indigo pekat dengan sentuhan violet gradasi tajam. Sangat disukai untuk tim voli divisi utama.',
      descriptionEn: 'Deep indigo and sharp violet gradient. Highly praised by premier league volleyball teams.'
    },
    {
      id: 'nz-v11',
      code: 'NZ-V11',
      nameId: 'Nezo Volley Oceanic Vortex NZ-V11',
      nameEn: 'Nezo Volley Oceanic Vortex NZ-V11',
      category: 'reguler',
      tags: ['reguler'],
      image: '/assets/portfolio_volley/11.jpeg',
      colors: ['#119cc8', '#057ba9', '#ffffff', '#082f49'],
      badge: 'Full Print',
      descriptionId: 'Desain gelombang ombak biru laut dengan gradasi warna segar dan energik.',
      descriptionEn: 'Oceanic wave motif with refreshing, energetic blue hues.'
    },
    {
      id: 'nz-v12',
      code: 'NZ-V12',
      nameId: 'Nezo Volley Crimson Blossom NZ-V12',
      nameEn: 'Nezo Volley Crimson Blossom NZ-V12',
      category: 'reguler',
      tags: ['reguler', 'populer'],
      image: '/assets/portfolio_volley/12.jpeg',
      colors: ['#bd729d', '#88476c', '#ffffff', '#4a044e'],
      badge: 'Populer',
      descriptionId: 'Kombinasi magenta, rose berry, dan putih yang elegan serta fashionable untuk tim voli.',
      descriptionEn: 'Magenta, rose berry, and crisp white blending high performance with sporty chic fashion.'
    },
    {
      id: 'nz-v13',
      code: 'NZ-V13',
      nameId: 'Nezo Volley Shadow Phantom NZ-V13',
      nameEn: 'Nezo Volley Shadow Phantom NZ-V13',
      category: 'reguler',
      tags: ['reguler'],
      image: '/assets/portfolio_volley/13.jpeg',
      colors: ['#6f7d7e', '#a2a2a2', '#ffffff', '#1e293b'],
      badge: 'Full Print',
      descriptionId: 'Warna abu-abu semen futuristik dengan corak geometris modern.',
      descriptionEn: 'Futuristic slate-grey styling with clean geometric panels.'
    },
    {
      id: 'nz-v14',
      code: 'NZ-V14',
      nameId: 'Nezo Volley Deep Abyss NZ-V14',
      nameEn: 'Nezo Volley Deep Abyss NZ-V14',
      category: 'reguler',
      tags: ['reguler', 'terbaru'],
      image: '/assets/portfolio_volley/14.jpeg',
      colors: ['#001645', '#444f6e', '#ffffff', '#0284c7'],
      badge: 'Terbaru',
      descriptionId: 'Navy pekat dengan aksen biru safir tajam, memberi kesan kokoh dan solid saat bertanding.',
      descriptionEn: 'Pitch navy with sharp sapphire accents, evoking solid defense and unyielding composure.'
    },
    {
      id: 'nz-v15',
      code: 'NZ-V15',
      nameId: 'Nezo Volley Ruby Inferno NZ-V15',
      nameEn: 'Nezo Volley Ruby Inferno NZ-V15',
      category: 'reguler',
      tags: ['reguler', 'best_seller'],
      image: '/assets/portfolio_volley/15.jpeg',
      colors: ['#8e0414', '#3e0206', '#ffffff', '#ef4444'],
      badge: 'Best Seller',
      descriptionId: 'Merah marun pekat dengan gradasi menyala membakar semangat bertarung di lapangan voli.',
      descriptionEn: 'Intense crimson maroon with burning gradient highlights to ignite fighting spirit.'
    },
    {
      id: 'nz-v16',
      code: 'NZ-V16',
      nameId: 'Nezo Volley Nightfall Eclipse NZ-V16',
      nameEn: 'Nezo Volley Nightfall Eclipse NZ-V16',
      category: 'reguler',
      tags: ['reguler'],
      image: '/assets/portfolio_volley/16.jpeg',
      colors: ['#0b143f', '#9497a8', '#ffffff', '#0f172a'],
      badge: 'Full Print',
      descriptionId: 'Kombinasi warna gelap bernuansa malam dengan striping presisi tinggi.',
      descriptionEn: 'Dark twilight blues accented with high-precision technical athletic striping.'
    },
    {
      id: 'nz-v17',
      code: 'NZ-V17-R',
      nameId: 'Nezo Volley Golden Horizon NZ-V17',
      nameEn: 'Nezo Volley Golden Horizon NZ-V17',
      category: 'reguler',
      tags: ['reguler', 'terbaru'],
      image: '/assets/portfolio_volley/17.jpeg',
      colors: ['#131313', '#372e20', '#b48d38', '#ffffff'],
      badge: 'Terbaru',
      descriptionId: 'Hitam pekat dengan aksen emas tembaga mewah, cocok untuk tim dengan mental juara.',
      descriptionEn: 'Deep black with majestic gold and bronze accents made for championship squads.'
    },

    // LENGAN PENDEK / WANITA / SLEEVELESS SETS (5 items)
    {
      id: 'nz-lp01',
      code: 'NZ-LP01',
      nameId: 'Nezo Volley Women Teal Gold NZ-LP01',
      nameEn: 'Nezo Volley Women Teal Gold NZ-LP01',
      category: 'lengan_pendek',
      tags: ['lengan_pendek', 'best_seller', 'populer'],
      image: '/assets/portfolio_volley/lengan_pendek/01.jpeg',
      colors: ['#2d4954', '#b48d38', '#847745', '#ffffff'],
      badge: 'Lengan Pendek',
      descriptionId: 'Setelan jersey voli wanita potongan lengan pendek (cap sleeves) + celana voli matching warna teal dan gold.',
      descriptionEn: 'Complete women volleyball jersey + matching athletic shorts in teal and gold with ergonomic cap sleeves.'
    },
    {
      id: 'nz-lp02',
      code: 'NZ-LP02',
      nameId: 'Nezo Volley Pro Sleeveless NZ-LP02',
      nameEn: 'Nezo Volley Pro Sleeveless NZ-LP02',
      category: 'lengan_pendek',
      tags: ['lengan_pendek', 'populer'],
      image: '/assets/portfolio_volley/lengan_pendek/02.jpeg',
      colors: ['#000000', '#595959', '#b6b6b6', '#ffffff'],
      badge: 'Lengan Pendek',
      descriptionId: 'Desain monokrom athletic hitam-putih dengan cutting ergonomis yang nyaman untuk manuver smash cepat.',
      descriptionEn: 'Monochrome athletic black & white design with ergonomic cut tailored for swift spiking maneuvers.'
    },
    {
      id: 'nz-lp03',
      code: 'NZ-LP03',
      nameId: 'Nezo Volley Dynamic Flow NZ-LP03',
      nameEn: 'Nezo Volley Dynamic Flow NZ-LP03',
      category: 'lengan_pendek',
      tags: ['lengan_pendek', 'terbaru'],
      image: '/assets/portfolio_volley/lengan_pendek/03.jpeg',
      colors: ['#000000', '#7c7c7c', '#ffffff', '#e2e8f0'],
      badge: 'Lengan Pendek',
      descriptionId: 'Setelan jersey volley wanita potongan ramping dengan striping aerodinamis.',
      descriptionEn: 'Slim-fit women volleyball jersey set featuring dynamic streamline side striping.'
    },
    {
      id: 'nz-lp04',
      code: 'NZ-LP04',
      nameId: 'Nezo Volley Shadow Striker NZ-LP04',
      nameEn: 'Nezo Volley Shadow Striker NZ-LP04',
      category: 'lengan_pendek',
      tags: ['lengan_pendek'],
      image: '/assets/portfolio_volley/lengan_pendek/04.jpeg',
      colors: ['#000000', '#555555', '#1c1c1c', '#ffffff'],
      badge: 'Lengan Pendek',
      descriptionId: 'Kombinasi hitam karbon dengan motif cetak modern, sangat adem dan fleksibel di lapangan.',
      descriptionEn: 'Carbon black with modern printed patterns, featherlight and ultra-flexible.'
    },
    {
      id: 'nz-lp05',
      code: 'NZ-LP05',
      nameId: 'Nezo Volley Apex Elite NZ-LP05',
      nameEn: 'Nezo Volley Apex Elite NZ-LP05',
      category: 'lengan_pendek',
      tags: ['lengan_pendek', 'best_seller'],
      image: '/assets/portfolio_volley/lengan_pendek/05.jpeg',
      colors: ['#000000', '#1c1c1c', '#5b5b5b', '#ffffff'],
      badge: 'Best Seller',
      descriptionId: 'Setelan voli wanita kelas turnamen dengan detail jahitan obras kuat dan celana berpinggang elastis nyaman.',
      descriptionEn: 'Tournament-grade women volleyball set with heavy-duty flatlock stitching and comfortable waistband.'
    }
  ])

  // 4. CUSTOMER REVIEWS & GALLERY DATA (15 actual team photos)
  const customerReviews = ref([
    {
      id: 1,
      image: '/assets/customer_review/01.jpeg',
      teamName: 'SSB Gemar Bungbulang U-10 & U-12',
      event: 'Festival Sepakbola & Voli Usia Dini',
      rating: 5,
      commentId: 'Jerseynya adem banget dipakai anak-anak turnamen seharian di cuaca panas. Warnanya cerah dan tidak luntur!',
      commentEn: 'The jerseys stayed super cool during whole-day youth tournament under the sun. Vibrant and sharp colors!'
    },
    {
      id: 2,
      image: '/assets/customer_review/02.jpeg',
      teamName: 'Elpida International Schools Volleyball Team',
      event: 'Turnamen Antar Sekolah',
      rating: 5,
      commentId: 'Kualitas jahitan rapi, ukuran pas sesuai size chart dewasa. Desain sesuai ekspektasi tim!',
      commentEn: 'Clean stitching, sizes fit accurately according to the size chart. Design exceeded expectations!'
    },
    {
      id: 3,
      image: '/assets/customer_review/03.jpeg',
      teamName: 'Klub Voli Putra Juara',
      event: 'Piala Bergilir Daerah',
      rating: 5,
      commentId: 'Pesen 1 lusin lebih, proses pengerjaan cepat dan admin WhatsApp komunikatif banget.',
      commentEn: 'Ordered over a dozen sets, fast turnaround and very communicative WhatsApp admin.'
    },
    {
      id: 4,
      image: '/assets/customer_review/04.jpeg',
      teamName: 'Komunitas Voli Rajawali',
      event: 'Liga Voli Amatir',
      rating: 5,
      commentId: 'Bahan Dryfit Milano nyaman banget buat smash dan diving, tidak berat saat basah keringat.',
      commentEn: 'Dryfit Milano feels incredible for spiking and diving, does not feel heavy when soaked in sweat.'
    },
    {
      id: 5,
      image: '/assets/customer_review/05.jpeg',
      teamName: 'Tim Voli Putri Wijaya',
      event: 'Kejuaraan Kota',
      rating: 5,
      commentId: 'Setelan lengan pendek potongannya pas di badan, celananya nyaman tidak sesak.',
      commentEn: 'Short sleeve set fits wonderfully, shorts are very comfortable without restricting movement.'
    },
    {
      id: 6,
      image: '/assets/customer_review/06.jpeg',
      teamName: 'Tim Pelajar Merah Putih',
      event: 'Pekan Olahraga Pelajar',
      rating: 5,
      commentId: 'Sablon nomor dan nama pemain tajam menyatu ke kain, dicuci berkali-kali tidak rusak.',
      commentEn: 'Player names and numbers are permanently crisp in the fabric, withstands repeated washes.'
    },
    {
      id: 7,
      image: '/assets/customer_review/07.jpeg',
      teamName: 'Voli Bintang Samudra',
      event: 'Open Tournament',
      rating: 5,
      commentId: 'Rekomendasi terbaik buat tim voli yang mau bikin seragam berkualitas harga bersahabat.',
      commentEn: 'Best recommendation for volleyball squads looking for top quality at friendly prices.'
    },
    {
      id: 8,
      image: '/assets/customer_review/08.jpeg',
      teamName: 'Klub Voli Angkasa',
      event: 'Turnamen Antar Desa',
      rating: 5,
      commentId: 'Bahan Dryfit Brazil-nya juara! Halus, pori-pori microdot bikin badan tetap adem.',
      commentEn: 'Dryfit Brazil is unmatched! Silky smooth, microdot pores keep the body cool.'
    },
    {
      id: 9,
      image: '/assets/customer_review/09.jpeg',
      teamName: 'Squad Voli Garuda Muda',
      event: 'Eksebisi Sahabat',
      rating: 5,
      commentId: 'Sangat puas, teman-teman satu tim semuanya suka dengan hasilnya. Bakal order lagi nanti!',
      commentEn: 'Extremely satisfied, everyone on the team loves the outcome. Will definitely order again!'
    },
    {
      id: 10,
      image: '/assets/customer_review/10.jpeg',
      teamName: 'Tim Putra Mandiri',
      event: 'Turnamen Kemerdekaan',
      rating: 5,
      commentId: 'Warna hijaunya keluar persis seperti mockup 3D yang dikirim admin. Mantap Nezo!',
      commentEn: 'The colors matched the exact 3D mockup sent by the admin. Outstanding Nezo!'
    },
    {
      id: 11,
      image: '/assets/customer_review/11.jpeg',
      teamName: 'Klub Remaja Harapan',
      event: 'Pembinaan Usia Muda',
      rating: 5,
      commentId: 'Size chart anak sangat akurat, pas untuk anak SD sampai SMP.',
      commentEn: 'Kids size chart is very accurate, fits elementary to junior high schoolers perfectly.'
    },
    {
      id: 12,
      image: '/assets/customer_review/12.jpeg',
      teamName: 'Komunitas Voli Pantai & Lapangan',
      event: 'Friendly Match',
      rating: 5,
      commentId: 'Bahan Embos Topo teksturnya berkelas banget, beda dari jersey tim lawan.',
      commentEn: 'Embos Topo texture feels so premium, truly stands out compared to rival team jerseys.'
    },
    {
      id: 13,
      image: '/assets/customer_review/13.jpeg',
      teamName: 'Tim Voli Putri Srikandi',
      event: 'Turnamen Kartini Cup',
      rating: 5,
      commentId: 'Pelayanan ramah dan responsif. Pengiriman aman sampai tujuan.',
      commentEn: 'Friendly and responsive customer service. Fast and secure delivery.'
    },
    {
      id: 14,
      image: '/assets/customer_review/14.jpeg',
      teamName: 'Klub Voli Perkasa',
      event: 'Liga Daerah Divisi 1',
      rating: 5,
      commentId: 'Jersey nyaman, jahitan leher dan lengan kokoh tidak gampang melar.',
      commentEn: 'Comfortable jersey, neckline and sleeve stitches are reinforced and durable.'
    },
    {
      id: 15,
      image: '/assets/customer_review/15.jpeg',
      teamName: 'Alumni Sport Club',
      event: 'Fun Volley Gathering',
      rating: 5,
      commentId: 'Sangat recommended untuk vendor seragam olahraga custom!',
      commentEn: 'Highly recommended vendor for custom sports uniforms!'
    }
  ])

  // Filtered Products computation
  const filteredProducts = computed(() => {
    let list = products.value

    // category filter
    if (selectedCategory.value === 'reguler') {
      list = list.filter(p => p.category === 'reguler')
    } else if (selectedCategory.value === 'lengan_pendek') {
      list = list.filter(p => p.category === 'lengan_pendek')
    } else if (selectedCategory.value === 'populer') {
      list = list.filter(p => p.tags.includes('populer'))
    } else if (selectedCategory.value === 'terbaru') {
      list = list.filter(p => p.tags.includes('terbaru'))
    } else if (selectedCategory.value === 'best_seller') {
      list = list.filter(p => p.tags.includes('best_seller'))
    }

    // search query filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      list = list.filter(p => {
        return p.code.toLowerCase().includes(q) ||
          p.nameId.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.descriptionId.toLowerCase().includes(q) ||
          p.descriptionEn.toLowerCase().includes(q)
      })
    }

    return list
  })

  // Direct WhatsApp Link Generator
  const generateWhatsAppLink = (params = {}) => {
    const isEn = localeStore.currentLang === 'en'
    
    let msg = isEn ? localeStore.t('waHello') : localeStore.t('waHello')
    msg += '\n\n'

    if (params.product) {
      msg += `📌 *${localeStore.t('waProduct')}:* ${params.product.code} - ${isEn ? params.product.nameEn : params.product.nameId}\n`
    }
    if (params.cut) {
      msg += `✂️ *${localeStore.t('waCut')}:* ${params.cut}\n`
    }
    if (params.size) {
      msg += `📏 *${localeStore.t('waSize')}:* ${params.size}\n`
    }
    if (params.fabric) {
      msg += `🧵 *${localeStore.t('waFabric')}:* ${params.fabric}\n`
    }
    if (params.qty) {
      msg += `🔢 *${localeStore.t('waQty')}:* ${params.qty} Pcs\n`
    }
    if (params.teamName) {
      msg += `🏐 *${localeStore.t('waTeam')}:* ${params.teamName}\n`
    }
    if (params.notes) {
      msg += `📝 *${localeStore.t('waNotes')}:* ${params.notes}\n`
    }

    // Direct Web Link to order detail & jersey image
    if (typeof window !== 'undefined' && (params.product || params.code)) {
      const orderUrl = buildOrderUrl(params)
      msg += `\n🖼️ *Lihat Gambar & Detail Order:*\n${orderUrl}\n`
    }

    msg += '\n' + localeStore.t('waPrompt')

    const encoded = encodeURIComponent(msg)
    return `https://wa.me/${whatsappNumber.value}?text=${encoded}`
  }

  // Construct URL for Order Detail page to be shared in WhatsApp
  const buildOrderUrl = (params = {}) => {
    if (typeof window === 'undefined') return ''
    const origin = window.location.origin
    const pathname = window.location.pathname
    const searchParams = new URLSearchParams()
    searchParams.set('view', 'order')
    const code = params.product?.code || params.code || ''
    if (code) searchParams.set('code', code)
    if (params.cut) searchParams.set('cut', params.cut)
    if (params.fabric) searchParams.set('fabric', params.fabric)
    if (params.size) searchParams.set('size', params.size)
    if (params.qty) searchParams.set('qty', params.qty)
    if (params.teamName) searchParams.set('team', params.teamName)
    if (params.notes) searchParams.set('notes', params.notes)
    searchParams.set('ref', Date.now().toString(36).toUpperCase())

    return `${origin}${pathname}?${searchParams.toString()}`
  }

  const setOrderDetailFromParams = (searchParams) => {
    const code = searchParams.get('code') || ''
    const prod = products.value.find(p => p.code.toLowerCase() === code.toLowerCase()) || null
    currentOrderDetail.value = {
      code: code || prod?.code || 'NZ-V01',
      product: prod,
      cut: searchParams.get('cut') || 'Dewasa (Unisex / Pria)',
      fabric: searchParams.get('fabric') || 'Dryfit Milano (Chevron Weave - Rekomendasi)',
      size: searchParams.get('size') || 'Dewasa L (Lebar 52 cm)',
      qty: searchParams.get('qty') || '12',
      teamName: searchParams.get('team') || searchParams.get('teamName') || '',
      notes: searchParams.get('notes') || '',
      ref: searchParams.get('ref') || 'NZ-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      createdAt: new Date().toLocaleDateString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    }
  }

  const navigateTo = (view, extra = {}) => {
    currentView.value = view
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (view === 'home') {
        url.searchParams.delete('view')
        url.searchParams.delete('code')
        url.searchParams.delete('cut')
        url.searchParams.delete('fabric')
        url.searchParams.delete('size')
        url.searchParams.delete('qty')
        url.searchParams.delete('team')
        url.searchParams.delete('notes')
        url.searchParams.delete('ref')
        currentOrderDetail.value = null
        catalogCodeFilter.value = ''
      } else if (view === 'catalog') {
        url.searchParams.set('view', 'catalog')
        if (extra.code) {
          catalogCodeFilter.value = extra.code
          url.searchParams.set('code', extra.code)
        } else {
          url.searchParams.delete('code')
        }
      } else if (view === 'order') {
        url.searchParams.set('view', 'order')
        for (const [k, v] of Object.entries(extra)) {
          if (v) url.searchParams.set(k, v)
        }
        setOrderDetailFromParams(url.searchParams)
      }
      window.history.pushState({}, '', url.toString())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const initRouting = () => {
    if (typeof window === 'undefined') return
    const handleUrl = () => {
      const searchParams = new URLSearchParams(window.location.search)
      const hash = window.location.hash
      const view = searchParams.get('view')

      if (view === 'order' || hash.startsWith('#order')) {
        currentView.value = 'order'
        setOrderDetailFromParams(searchParams)
      } else if (view === 'catalog' || hash.startsWith('#catalog') || hash.startsWith('#katalog')) {
        currentView.value = 'catalog'
        const code = searchParams.get('code')
        if (code) {
          catalogCodeFilter.value = code
        }
      } else {
        currentView.value = 'home'
      }
    }

    handleUrl()
    window.addEventListener('popstate', handleUrl)
  }

  const directToWhatsApp = (params = {}) => {
    const url = generateWhatsAppLink(params)
    window.open(url, '_blank')
  }

  // Direct chat to WhatsApp without selecting products
  const directGeneralChat = (customMsg = '') => {
    const defaultMsg = localeStore.currentLang === 'en' 
      ? 'Hello NEZO FACTORY, I would like to make an inquiry' 
      : 'halo NEZO FACTORY, saya ingin tanya tanya'
    const msg = customMsg || defaultMsg
    const url = `https://wa.me/${whatsappNumber.value}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  // Open Inquiry modal for a specific product
  const openInquiryModal = (product = null) => {
    orderTargetProduct.value = product || products.value[0]
    isOrderModalOpen.value = true
  }

  // Quick view product detail modal
  const openProductDetail = (product) => {
    selectedProduct.value = product
    isDetailModalOpen.value = true
  }

  // Image zoom modal
  const openImageZoom = (src, title = '') => {
    zoomImageSrc.value = src
    zoomImageTitle.value = title
    isImageZoomModalOpen.value = true
  }

  return {
    whatsappNumber,
    formattedWhatsappNumber,
    setWhatsappNumber,
    directToWhatsApp,
    directGeneralChat,
    searchQuery,
    selectedCategory,
    favorites,
    toggleFavorite,
    isFavorite,
    isDetailModalOpen,
    selectedProduct,
    isOrderModalOpen,
    orderTargetProduct,
    isSizeChartModalOpen,
    activeSizeChartTab,
    isTextureModalOpen,
    selectedTexture,
    isImageZoomModalOpen,
    zoomImageSrc,
    zoomImageTitle,
    currentView,
    catalogCodeFilter,
    currentOrderDetail,
    toastMessage,
    showToast,
    copyToClipboard,
    buildOrderUrl,
    setOrderDetailFromParams,
    navigateTo,
    initRouting,
    fabrics,
    sizeCharts,
    products,
    customerReviews,
    filteredProducts,
    generateWhatsAppLink,
    directToWhatsApp,
    openInquiryModal,
    openProductDetail,
    openImageZoom
  }
})
