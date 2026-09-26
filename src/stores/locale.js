import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocaleStore = defineStore('locale', () => {
  const currentLang = ref(localStorage.getItem('nezo_lang') || 'id')

  const setLanguage = (lang) => {
    currentLang.value = lang
    localStorage.setItem('nezo_lang', lang)
  }

  const translations = {
    id: {
      // Top announcement
      announcement: '🔥 Kustom Jersey Voli Full Print • Konsultasi Desain & Mockup GRATIS via WhatsApp!',
      fastResponse: 'Fast Response: 08.00 - 21.00 WIB',
      
      // Header & Navigation
      searchPlaceholder: 'Cari model jersey volley, kode produk (cth: NZ-V01)...',
      navHome: 'Beranda',
      navPortfolio: 'Portofolio Volley',
      navLenganPendek: 'Lengan Pendek / Wanita',
      navFabrics: 'Pilihan Bahan & Tekstur',
      navSizeChart: 'Panduan Ukuran (Size)',
      navReviews: 'Galeri Tim (Real Pict)',
      navContact: 'Kontak WhatsApp',
      wishlist: 'Favorit',
      consultDesign: 'Konsultasi Desain',
      
      // Hero Promo
      heroTitle1: 'NEZO FACTORY',
      heroSubtitle1: 'YOUR TEAM. YOUR STYLE.',
      heroDesc1: 'Spesialis pembuatan jersey voli kustom full print dengan kualitas bahan premium, jahitan rapi, dan warna tajam anti luntur.',
      heroBtnExplore: 'Lihat Semua Portofolio',
      heroBtnInquire: 'Chat WhatsApp Sekarang',

      heroTitle2: '3 PILIHAN BAHAN PREMIUM',
      heroSubtitle2: 'DRYFIT BRAZIL • DRYFIT MILANO • EMBOS TOPO',
      heroDesc2: 'Teknologi sirkulasi udara cepat kering (Quick Dry) dengan pori-pori mikro yang nyaman dipakai saat intensitas pertandingan tinggi.',
      heroBtnFabric: 'Pelajari Tekstur Bahan',

      heroTitle3: 'DIPERCAYA BERBAGAI TIM & KOMUNITAS',
      heroSubtitle3: 'REAL PICT & TESTIMONI ASLI',
      heroDesc3: 'Dari tim sekolah, klub daerah, turnamen antar-desa hingga kompetisi profesional. Bebas request nomor, nama & sponsor.',
      heroBtnReview: 'Lihat Galeri Foto Tim',

      // Badges
      badgeCustom: 'Bebas Kustom Desain & Motif',
      badgeMaterial: 'Bahan Dryfit Import & Standar PBVSI',
      badgeSpeed: 'Pengerjaan Rapi & Tepat Waktu',

      // Portfolio Section
      portfolioTitle: 'Koleksi Portofolio Volley',
      portfolioSubtitle: 'Belum ada harga tetap karena sistem kustom (jumlah pemesanan & pilihan bahan). Klik "Tanya via WhatsApp" untuk cek penawaran terbaik!',
      filterAll: 'Semua Jersey',
      filterReguler: 'Lengan Reguler (Pria/Unisex)',
      filterShort: 'Lengan Pendek (Wanita)',
      filterPopular: 'Pilihan Populer',
      filterNew: 'Desain Terbaru',
      searchResult: 'Ditemukan {count} model jersey',
      noResults: 'Tidak ada model jersey yang cocok dengan pencarian Anda.',
      resetFilter: 'Reset Filter',
      
      // Product Card
      freeCustomLabel: 'Free Nama & Nomor',
      colorVariants: 'Warna Desain:',
      viewDetail: 'Lihat Detail',
      inquireWA: 'Tanya via WhatsApp',
      savedToFav: 'Ditambahkan ke Favorit',
      removedFromFav: 'Dihapus dari Favorit',

      // Fabric & Texture Section
      fabricTitle: 'Pilihan Bahan & Tekstur Kain',
      fabricSubtitle: '3 pilihan bahan kain jersey: adem, ringan di badan, cepat menyerap keringat, dan warna motif awet tidak luntur.',
      macroTexture: 'Tekstur Kain',
      sublimResult: 'Ketahanan Warna',
      mockupPreview: 'Contoh Jersey Jadi',
      keyBenefits: 'Keunggulan Bahan',
      advantages: 'Kelebihan Utama',
      orderWithFabric: 'Pesan Jersey dengan Bahan Ini',

      // Size Chart Section
      sizeTitle: 'Panduan Ukuran Resmi (Size Chart)',
      sizeSubtitle: 'Gunakan tabel panduan ukuran akurat berikut untuk menentukan ukuran kaos tim dewasa maupun anak-anak.',
      tabAdult: 'Dewasa (T-Shirt / Jersey)',
      tabKids: 'Anak-Anak (Kids)',
      tabJacket: 'Jaket Tim (Outerwear)',
      colSize: 'Ukuran (Size)',
      colAge: 'Rentang Umur',
      colWidth: 'Lebar Dada (cm)',
      colLength: 'Panjang Kaos (cm)',
      colHeight: 'Tinggi Jaket (cm)',
      toleranceNote: 'Toleransi jahitan ± 1-2 cm',
      extraSizeNote: 'Catatan: Ukuran 3XL ke atas dikenakan penyesuaian bahan (+Rp 5.000 / pcs)',
      measuringGuideTitle: 'Cara Mengukur Badan yang Tepat:',
      measureWidth: 'Lebar: Diukur melintang dari bawah ketiak kiri ke ketiak kanan (±1-2 cm toleransi).',
      measureLength: 'Panjang: Diukur lurus dari bahu bagian atas leher hingga ujung keliman bawah kaos.',
      viewFullSizeChartImg: 'Buka Gambar Asli Size Chart',

      // Customer Reviews
      reviewTitle: 'Galeri Foto Tim & Testimoni',
      reviewSubtitle: 'Kepuasan pelanggan adalah bukti kualitas kami. Berikut foto asli seragam voli yang telah kami produksi.',

      // Order Modal / WhatsApp Generator
      modalTitle: 'Tanya Produk / Konsultasi Custom',
      modalSubtitle: 'Lengkapi rincian pesanan tim Anda di bawah ini untuk langsung terhubung dengan admin NEZO Factory via WhatsApp.',
      formProduct: 'Model Jersey Pilihan:',
      formCut: 'Kategori / Potongan:',
      cutAdult: 'Dewasa (Unisex / Pria)',
      cutWomen: 'Lengan Pendek (Wanita)',
      cutKids: 'Anak-Anak (Kids)',
      formSize: 'Perkiraan Ukuran:',
      formFabric: 'Pilihan Bahan Kain:',
      fabricBrazil: 'Dryfit Brazil (Micro-dot lembut, adem)',
      fabricMilano: 'Dryfit Milano (Serat chevron zigzag, elastis)',
      fabricEmbos: 'Embos Topo (Motif kontur timbul eksklusif)',
      formQty: 'Jumlah Pemesanan (Pcs):',
      formTeamName: 'Nama Tim / Klub (Opsional):',
      formNotes: 'Catatan Kustom (Nama/Nomor/Logo/Request Desain):',
      formNotesPlaceholder: 'Contoh: Mau ganti warna jadi merah-hitam, tambah logo tim di dada kiri, sablon nama pemain di punggung...',
      sendToWA: 'Buka Obrolan WhatsApp Sekarang',
      cancel: 'Tutup',
      
      // WhatsApp message template components
      waHello: 'Halo Admin NEZO FACTORY, saya tertarik untuk kustom jersey volley:',
      waProduct: 'Model',
      waCut: 'Potongan',
      waSize: 'Ukuran',
      waFabric: 'Bahan Kain',
      waQty: 'Estimasi Jumlah',
      waTeam: 'Nama Tim',
      waNotes: 'Catatan Kustom',
      waPrompt: 'Mohon info ketersediaan slot produksi dan penawaran harganya. Terima kasih!',

      // Footer
      footerTagline: 'YOUR TEAM. YOUR STYLE.',
      footerDesc: 'Produsen jersey kustom berkualitas tinggi khusus voli, futsal, running, dan berbagai cabang olahraga tim dengan standar bahan premium dan cetak warna tajam anti luntur.',
      footerContact: 'Hubungi Kami',
      footerServices: 'Layanan Kami',
      footerCategories: 'Kategori Portofolio',
      footerSocial: 'Ikuti Media Sosial',
      footerCopyright: '© 2026 NEZO FACTORY. Seluruh hak cipta dilindungi undang-undang.',
      footerAddress: 'Indonesia • Melayani pengiriman ke seluruh wilayah Nusantara dan Mancanegara',
      changeWaNumber: 'Ubah Nomor WA Admin',

      // Catalog Page & Codes
      navCatalog: 'Katalog & Kode Jersey',
      catalogBadge: 'Kode Resmi NZ',
      catalogTitle: 'Katalog Lengkap Jersey & Kode Produk',
      catalogSubtitle: 'Setiap model jersey memiliki kode unik (NZ-V01 s/d NZ-V17 & NZ-LP01 s/d NZ-LP05). Kode ini otomatis disertakan saat pemesanan melalui WhatsApp agar pesanan diproses akurat.',
      catalogSearchPlaceholder: 'Cari kode produk (cth: NZ-V02) atau nama model...',
      filterAllCodes: 'Semua Kode Jersey (22)',
      filterRegulerCodes: 'Lengan Reguler (NZ-V01 - NZ-V17)',
      filterShortCodes: 'Lengan Pendek Wanita (NZ-LP01 - NZ-LP05)',
      copyCode: 'Salin Kode',
      codeCopied: 'Kode berhasil disalin ke clipboard!',
      productCodeLabel: 'Kode Produk',
      orderThisProduct: 'Konsultasi / Pesan Model Ini',
      
      // Order Detail & Admin Verification Page
      orderDetailTitle: 'Detail Orderan & Verifikasi Desain',
      orderDetailSubtitle: 'Halaman rincian pesanan dari chat WhatsApp untuk verifikasi gambar produk & spesifikasi oleh Admin NEZO.',
      adminNotice: 'Informasi Pesanan Masuk (Admin NEZO)',
      adminNoticeDesc: 'Berikut adalah gambar model jersey dan spesifikasi yang diajukan oleh pemesan dari WhatsApp.',
      orderProductImage: 'Gambar Jersey yang Dimaksud',
      orderProductCode: 'Kode Produk Resmi',
      orderSpecs: 'Rincian Spesifikasi Order',
      orderCut: 'Jenis Potongan',
      orderFabric: 'Bahan Kain',
      orderSize: 'Pilihan Ukuran',
      orderQty: 'Jumlah Pemesanan',
      orderTeam: 'Nama Tim / Klub',
      orderNotes: 'Catatan Kustom',
      orderDate: 'Waktu Pengajuan',
      btnDownloadImage: 'Unduh Foto Jersey',
      btnCopyOrderSummary: 'Salin Ringkasan Order',
      orderSummaryCopied: 'Rincian order berhasil disalin!',
      btnReplyWhatsApp: 'Hubungi Pemesan di WhatsApp',
      btnBackToCatalog: 'Buka Katalog Lengkap',
      btnBackToHome: 'Kembali ke Beranda',
      orderNotFound: 'Data pesanan atau kode produk tidak ditemukan.',
    },
    en: {
      // Top announcement
      announcement: '🔥 Custom Full-Print Volleyball Jerseys • FREE Design & Mockup Consultation via WhatsApp!',
      fastResponse: 'Fast Response: 08:00 AM - 09:00 PM GMT+7',

      // Header & Navigation
      searchPlaceholder: 'Search volleyball jersey models, product code (e.g., NZ-V01)...',
      navHome: 'Home',
      navPortfolio: 'Volley Portfolio',
      navLenganPendek: 'Short Sleeves / Women',
      navFabrics: 'Fabrics & Textures',
      navSizeChart: 'Size Chart Guide',
      navReviews: 'Team Gallery (Real Photos)',
      navContact: 'WhatsApp Contact',
      wishlist: 'Favorites',
      consultDesign: 'Design Consultation',

      // Hero Promo
      heroTitle1: 'NEZO FACTORY',
      heroSubtitle1: 'YOUR TEAM. YOUR STYLE.',
      heroDesc1: 'Specialist in custom full-print volleyball jerseys with premium materials, precision tailoring, and vibrant fade-proof colors.',
      heroBtnExplore: 'Explore All Portfolios',
      heroBtnInquire: 'Chat on WhatsApp Now',

      heroTitle2: '3 PREMIUM FABRIC CHOICES',
      heroSubtitle2: 'DRYFIT BRAZIL • DRYFIT MILANO • EMBOS TOPO',
      heroDesc2: 'Advanced quick-dry micro-pore technology ensuring maximum breathability and comfort during intense court action.',
      heroBtnFabric: 'Explore Fabric Textures',

      heroTitle3: 'TRUSTED BY NUMEROUS TEAMS & CLUBS',
      heroSubtitle3: 'AUTHENTIC REAL PHOTOS & TESTIMONIALS',
      heroDesc3: 'From school squads and local clubs to professional championship tournaments. Free custom names, numbers & sponsors.',
      heroBtnReview: 'View Team Gallery',

      // Badges
      badgeCustom: 'Full Custom Design & Patterns',
      badgeMaterial: 'Premium Import Dryfit & PBVSI Standard',
      badgeSpeed: 'Accurate & On-Time Production',

      // Portfolio Section
      portfolioTitle: 'Volleyball Portfolio Collection',
      portfolioSubtitle: 'No fixed prices as every order is custom-made (based on quantity & fabric). Click "Inquire on WhatsApp" for the best quote!',
      filterAll: 'All Jerseys',
      filterReguler: 'Regular Sleeve (Men/Unisex)',
      filterShort: 'Short Sleeve (Women)',
      filterPopular: 'Popular Picks',
      filterNew: 'Latest Designs',
      searchResult: 'Found {count} jersey models',
      noResults: 'No jersey models matched your search.',
      resetFilter: 'Reset Filter',

      // Product Card
      freeCustomLabel: 'Free Name & Number',
      colorVariants: 'Design Colors:',
      viewDetail: 'View Details',
      inquireWA: 'Inquire on WhatsApp',
      savedToFav: 'Added to Favorites',
      removedFromFav: 'Removed from Favorites',

      // Fabric & Texture Section
      fabricTitle: 'Jersey Fabric & Texture Guide',
      fabricSubtitle: '3 premium jersey fabrics: breathable, lightweight, moisture-wicking, and permanent fade-resistant colors.',
      macroTexture: 'Fabric Texture',
      sublimResult: 'Color Durability',
      mockupPreview: 'Finished Jersey Look',
      keyBenefits: 'Key Fabric Benefits',
      advantages: 'Key Advantages',
      orderWithFabric: 'Order Jersey with this Fabric',

      // Size Chart Section
      sizeTitle: 'Official Size Chart Guide',
      sizeSubtitle: 'Use our precise measurement charts below to determine the ideal sizing for your team (adults & children).',
      tabAdult: 'Adult (T-Shirt / Jersey)',
      tabKids: 'Kids / Children',
      tabJacket: 'Team Jacket (Outerwear)',
      colSize: 'Size',
      colAge: 'Age Range',
      colWidth: 'Chest Width (cm)',
      colLength: 'Shirt Length (cm)',
      colHeight: 'Jacket Length (cm)',
      toleranceNote: 'Sewing tolerance ± 1-2 cm',
      extraSizeNote: 'Note: Sizes 3XL and larger are subject to slight fabric adjustments (+IDR 5,000 / pcs)',
      measuringGuideTitle: 'How to Measure Properly:',
      measureWidth: 'Width: Measured across from one armpit seam to the other (±1-2 cm tolerance).',
      measureLength: 'Length: Measured straight from the top shoulder seam down to the bottom hem.',
      viewFullSizeChartImg: 'Open Original Size Chart Graphic',

      // Customer Reviews
      reviewTitle: 'Team Gallery & Real Photos',
      reviewSubtitle: 'Customer satisfaction is our badge of honor. Real volleyball teams wearing Nezo Factory custom jerseys.',

      // Order Modal / WhatsApp Generator
      modalTitle: 'Product Inquiry & Custom Order',
      modalSubtitle: 'Fill in your team order details below to instantly connect with NEZO Factory representatives on WhatsApp.',
      formProduct: 'Selected Jersey Model:',
      formCut: 'Fit / Cut:',
      cutAdult: 'Adult (Unisex / Men)',
      cutWomen: 'Short Sleeve (Women)',
      cutKids: 'Kids / Children',
      formSize: 'Estimated Size:',
      formFabric: 'Fabric Material:',
      fabricBrazil: 'Dryfit Brazil (Soft micro-dot, cool breeze)',
      fabricMilano: 'Dryfit Milano (Chevron zigzag, durable flex)',
      fabricEmbos: 'Embos Topo (Exclusive 3D contour motif)',
      formQty: 'Estimated Quantity (Pcs):',
      formTeamName: 'Team / Club Name (Optional):',
      formNotes: 'Custom Notes (Names/Numbers/Logo/Color changes):',
      formNotesPlaceholder: 'Example: Want red-black palette, team crest on chest, player names on upper back...',
      sendToWA: 'Open WhatsApp Chat Now',
      cancel: 'Close',

      // WhatsApp message template components
      waHello: 'Hello NEZO FACTORY Admin, I am interested in ordering custom volleyball jerseys:',
      waProduct: 'Model',
      waCut: 'Cut',
      waSize: 'Size',
      waFabric: 'Fabric',
      waQty: 'Estimated Quantity',
      waTeam: 'Team Name',
      waNotes: 'Custom Notes',
      waPrompt: 'Please inform me about production schedule and price quote. Thank you!',

      // Footer
      footerTagline: 'YOUR TEAM. YOUR STYLE.',
      footerDesc: 'High-performance custom jersey manufacturer specialized in volleyball, football, running, and athletic teamwear with premium fabric standards and vibrant fade-proof colors.',
      footerContact: 'Contact Us',
      footerServices: 'Our Services',
      footerCategories: 'Portfolio Categories',
      footerSocial: 'Follow Social Media',
      footerCopyright: '© 2026 NEZO FACTORY. All rights reserved.',
      footerAddress: 'Indonesia • Nationwide and International express shipping available',
      changeWaNumber: 'Change Admin WA Number',

      // Catalog Page & Codes
      navCatalog: 'Catalog & Product Codes',
      catalogBadge: 'Official NZ Codes',
      catalogTitle: 'Complete Jersey Catalog & Product Codes',
      catalogSubtitle: 'Every jersey model features a unique code (NZ-V01 to NZ-V17 & NZ-LP01 to NZ-LP05). These codes are automatically included in WhatsApp inquiries to ensure precise production.',
      catalogSearchPlaceholder: 'Search product code (e.g. NZ-V02) or design name...',
      filterAllCodes: 'All Jersey Codes (22)',
      filterRegulerCodes: 'Regular Sleeves (NZ-V01 - NZ-V17)',
      filterShortCodes: 'Short Sleeves Women (NZ-LP01 - NZ-LP05)',
      copyCode: 'Copy Code',
      codeCopied: 'Code copied to clipboard!',
      productCodeLabel: 'Product Code',
      orderThisProduct: 'Consult / Order This Model',
      
      // Order Detail & Admin Verification Page
      orderDetailTitle: 'Order Details & Design Verification',
      orderDetailSubtitle: 'Order verification page originating from WhatsApp chat for NEZO Admin & customer specification inspection.',
      adminNotice: 'Incoming Order Details (NEZO Admin)',
      adminNoticeDesc: 'Below is the exact jersey model design and specifications submitted by the client via WhatsApp.',
      orderProductImage: 'Selected Jersey Design Image',
      orderProductCode: 'Official Product Code',
      orderSpecs: 'Order Specifications',
      orderCut: 'Fit / Cut Style',
      orderFabric: 'Fabric Material',
      orderSize: 'Selected Size',
      orderQty: 'Order Quantity',
      orderTeam: 'Team / Club Name',
      orderNotes: 'Custom Notes',
      orderDate: 'Submission Time',
      btnDownloadImage: 'Download Jersey Image',
      btnCopyOrderSummary: 'Copy Order Summary',
      orderSummaryCopied: 'Order summary copied to clipboard!',
      btnReplyWhatsApp: 'Contact on WhatsApp',
      btnBackToCatalog: 'View Full Catalog',
      btnBackToHome: 'Back to Home',
      orderNotFound: 'Order details or product code not found.',
    }
  }

  const t = (key, params = {}) => {
    let text = translations[currentLang.value]?.[key] || translations['id']?.[key] || key
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, v)
      }
    }
    return text
  }

  return {
    currentLang,
    setLanguage,
    t,
    translations
  }
})
