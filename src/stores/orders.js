import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const DEFAULT_PRODUCTS = ['Atasan', 'Setelan', 'Jaket', 'Wangki', 'T.panjang', 'Sizebig']
export const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', 'Custom']
export const CHILD_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL']
export const ADULT_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']

export const formatMoney = (n) => 'Rp' + Number(n || 0).toLocaleString('id-ID')

export const getTodayDateString = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const compressImageToRatio = (file, width = 1080, height = 1350, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        const scale = Math.max(width / img.width, height / img.height)
        const sw = width / scale
        const sh = height / scale
        const sx = (img.width - sw) / 2
        const sy = (img.height - sh) / 2
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const useOrdersStore = defineStore('orders', () => {
  // Authentication
  const isLoggedIn = ref(sessionStorage.getItem('nezoLoggedIn') === '1')
  const isLoading = ref(false)
  const isCloudConnected = ref(false)
  const errorMessage = ref('')

  // Tenant State (resolved from window.location.hostname -> tenants.domain, with VITE_TENANT_ID fallback)
  const envTenantId = (import.meta.env.VITE_TENANT_ID || '').trim()
  const tenant = ref(null)
  const tenantId = ref(envTenantId)
  let tenantResolvePromise = null

  const validateTenantRecord = (record) => {
    if (!record) return false
    if (record.is_active === false) {
      errorMessage.value = `Tenant "${record.name || record.id}" sedang tidak aktif.`
      return false
    }
    if (record.expired_at && new Date(record.expired_at) < new Date()) {
      errorMessage.value = `Masa aktif tenant "${record.name || record.id}" telah berakhir.`
      return false
    }
    return true
  }

  const resolveTenant = async () => {
    if (!supabase) {
      return tenantId.value || 'local'
    }

    if (tenant.value?.id) {
      return tenant.value.id
    }

    if (tenantResolvePromise) {
      return tenantResolvePromise
    }

    tenantResolvePromise = (async () => {
      try {
        const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

        if (hostname) {
          const { data: domainTenant, error: domainError } = await supabase
            .from('tenants')
            .select('id, name, domain, is_active, expired_at')
            .eq('domain', hostname)
            .maybeSingle()

          if (!domainError && domainTenant) {
            if (!validateTenantRecord(domainTenant)) {
              tenant.value = null
              tenantId.value = ''
              return null
            }
            tenant.value = domainTenant
            tenantId.value = domainTenant.id
            return domainTenant.id
          }
        }

        if (envTenantId) {
          const { data: fallbackTenant, error: fallbackError } = await supabase
            .from('tenants')
            .select('id, name, domain, is_active, expired_at')
            .eq('id', envTenantId)
            .maybeSingle()

          if (!fallbackError && fallbackTenant) {
            if (!validateTenantRecord(fallbackTenant)) {
              tenant.value = null
              tenantId.value = ''
              return null
            }
            tenant.value = fallbackTenant
            tenantId.value = fallbackTenant.id
            return fallbackTenant.id
          }

          // Fallback to envTenantId directly if tenants table has restrictive RLS
          tenantId.value = envTenantId
          return envTenantId
        }

        errorMessage.value = `Tenant untuk domain "${hostname || '-'}" tidak ditemukan. Daftarkan domain di tabel "tenants" atau atur VITE_TENANT_ID di .env.`
        return null
      } catch (err) {
        console.error('Tenant resolution error:', err)
        if (envTenantId) {
          tenantId.value = envTenantId
          return envTenantId
        }
        errorMessage.value = err?.message || 'Gagal memuat data tenant'
        return null
      } finally {
        tenantResolvePromise = null
      }
    })()

    return tenantResolvePromise
  }

  const login = (username, password) => {
    if (username.trim().toLowerCase() === 'admin' && password === 'nezo123') {
      sessionStorage.setItem('nezoLoggedIn', '1')
      isLoggedIn.value = true
      return { success: true }
    }
    return { success: false, message: 'Username atau password salah' }
  }

  const logout = () => {
    sessionStorage.removeItem('nezoLoggedIn')
    isLoggedIn.value = false
  }

  // Pure Online State: Orders directly from Supabase
  const orders = ref([])

  // Transform row from Supabase (snake_case) to client model (camelCase)
  const mapFromSupabase = (row) => ({
    id: row.id,
    tenantId: row.tenant_id || '',
    date: row.date || getTodayDateString(),
    deadline: row.deadline || '',
    team: row.team || '',
    contact: row.contact || '',
    notes: row.notes || '',
    images: Array.isArray(row.images) ? row.images : ['', '', ''],
    items: Array.isArray(row.items) ? row.items : [],
    total: Number(row.total) || 0,
    createdAt: row.created_at || new Date().toISOString(),
    spkNo: row.spk_no || '',
    invoiceNo: row.invoice_no || '',
    fabric: row.fabric || 'MILANO',
    productType: row.product_type || 'ATASAN',
    collarModel: row.collar_model || 'V-NECK',
    sleeveModel: row.sleeve_model || 'T.PENDEK',
    childSizes: row.child_sizes || { XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0 },
    adultSizes: row.adult_sizes || { S: 0, M: 0, L: 0, XL: 0, '2XL': 0, '3XL': 0, '4XL': 0, '5XL': 0 },
    roster: Array.isArray(row.roster) ? row.roster : [],
    dpAmount: Number(row.dp_amount) || 0,
    paymentNotes: row.payment_notes || '',
    recipientName: row.recipient_name || row.team || '',
    recipientPhone: row.recipient_phone || row.contact || '',
    shippingAddress: row.shipping_address || '',
    kelurahan: row.kelurahan || '',
    kecamatan: row.kecamatan || '',
    kota: row.kota || 'Kota Bandung',
    provinsi: row.provinsi || 'Jawa Barat',
    shippingNotes: row.shipping_notes || ''
  })

  // Transform client model (camelCase) to Supabase row (snake_case)
  const mapToSupabase = (order) => ({
    ...(order.id ? { id: order.id } : {}),
    tenant_id: order.tenantId || tenantId.value || null,
    date: order.date,
    deadline: order.deadline || null,
    team: order.team,
    contact: order.contact,
    notes: order.notes,
    images: order.images || ['', '', ''],
    items: order.items || [],
    total: order.total || 0,
    spk_no: order.spkNo || '',
    invoice_no: order.invoiceNo || '',
    fabric: order.fabric || 'MILANO',
    product_type: order.productType || 'ATASAN',
    collar_model: order.collarModel || 'V-NECK',
    sleeve_model: order.sleeveModel || 'T.PENDEK',
    child_sizes: order.childSizes || {},
    adult_sizes: order.adultSizes || {},
    roster: order.roster || [],
    dp_amount: order.dpAmount || 0,
    payment_notes: order.paymentNotes || '',
    recipient_name: order.recipientName || '',
    recipient_phone: order.recipientPhone || '',
    shipping_address: order.shippingAddress || '',
    kelurahan: order.kelurahan || '',
    kecamatan: order.kecamatan || '',
    kota: order.kota || '',
    provinsi: order.provinsi || '',
    shipping_notes: order.shippingNotes || '',
    updated_at: new Date().toISOString()
  })

  // Pure Online: Fetch orders strictly from Supabase
  const fetchOrdersFromSupabase = async () => {
    if (!supabase) {
      isCloudConnected.value = false
      errorMessage.value = 'Kredensial Supabase belum terisi di .env'
      return
    }

    try {
      isLoading.value = true
      errorMessage.value = ''

      const activeTenantId = await resolveTenant()
      if (!activeTenantId) {
        orders.value = []
        isCloudConnected.value = false
        return
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('tenant_id', activeTenantId)
        .order('created_at', { ascending: false })

      if (error) {
        isCloudConnected.value = false
        errorMessage.value = error.message.includes('schema cache')
          ? 'Tabel "orders" belum dibuat di Supabase. Silakan jalankan script supabase_schema.sql di SQL Editor.'
          : error.message
        console.error('Supabase fetch error:', error)
      } else {
        orders.value = (data || []).map(mapFromSupabase)
        isCloudConnected.value = true
      }
    } catch (err) {
      isCloudConnected.value = false
      errorMessage.value = err?.message || 'Gagal terhubung ke database online'
      console.error('Network exception connecting to Supabase:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Generate sequence IDs
  const getNextTrxId = () => {
    const maxNum = orders.value.reduce((m, o) => {
      const match = String(o.id || '').match(/(\d+)$/)
      return match ? Math.max(m, parseInt(match[1], 10)) : m
    }, 0)
    return 'TRX-NZ-' + String(maxNum + 1).padStart(5, '0')
  }

  const getNextSpkNo = () => {
    const year = new Date().getFullYear()
    const maxNum = orders.value.reduce((m, o) => {
      const spk = o.spkNo || ''
      const match = spk.match(/(\d+)$/)
      return match ? Math.max(m, parseInt(match[1], 10)) : m
    }, 0)
    return `SPK/NZ/${year}/${String(maxNum + 1).padStart(3, '0')}`
  }

  const getNextInvNo = () => {
    const year = new Date().getFullYear()
    const maxNum = orders.value.reduce((m, o) => {
      const inv = o.invoiceNo || ''
      const match = inv.match(/(\d+)$/)
      return match ? Math.max(m, parseInt(match[1], 10)) : m
    }, 0)
    return `INV/NZ/${year}/${String(maxNum + 1).padStart(3, '0')}`
  }

  // Dashboard Stats
  const totalOrdersCount = computed(() => orders.value.length)
  const totalRevenue = computed(() => orders.value.reduce((s, o) => s + (Number(o.total) || 0), 0))
  const uniqueTeamsCount = computed(() => {
    const teams = orders.value.map(o => (o.team || '').trim().toLowerCase()).filter(Boolean)
    return new Set(teams).size
  })
  const totalItemsQty = computed(() => {
    return orders.value.reduce((s, o) => {
      const itemsQty = (o.items || []).reduce((a, i) => a + (Number(i.qty) || 0), 0)
      return s + itemsQty
    }, 0)
  })

  // Pure Online CRUD: Directly into Supabase
  const addOrder = async (orderData) => {
    const activeTenantId = await resolveTenant()
    if (supabase && !activeTenantId) {
      throw new Error(errorMessage.value || 'Tenant tidak ditemukan.')
    }

    // Let the database sequence assign IDs so stale forms and concurrent inserts
    // cannot generate the same primary key.
    const id = supabase ? null : (orderData.id || getNextTrxId())
    const newOrder = {
      id,
      tenantId: orderData.tenantId || activeTenantId || '',
      date: orderData.date || getTodayDateString(),
      deadline: orderData.deadline || '',
      team: (orderData.team || '').trim(),
      contact: (orderData.contact || '').trim(),
      notes: (orderData.notes || '').trim(),
      images: Array.isArray(orderData.images) ? orderData.images : ['', '', ''],
      items: Array.isArray(orderData.items) ? orderData.items : [],
      total: Number(orderData.total) || 0,
      createdAt: orderData.createdAt || new Date().toISOString(),
      spkNo: orderData.spkNo || getNextSpkNo(),
      invoiceNo: orderData.invoiceNo || getNextInvNo(),
      fabric: orderData.fabric || 'MILANO',
      productType: orderData.productType || 'ATASAN',
      collarModel: orderData.collarModel || 'V-NECK',
      sleeveModel: orderData.sleeveModel || 'T.PENDEK',
      childSizes: orderData.childSizes || { XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0 },
      adultSizes: orderData.adultSizes || { S: 0, M: 0, L: 0, XL: 0, '2XL': 0, '3XL': 0, '4XL': 0, '5XL': 0 },
      roster: Array.isArray(orderData.roster) ? orderData.roster : [],
      dpAmount: Number(orderData.dpAmount) || 0,
      paymentNotes: orderData.paymentNotes || 'Rek BCA 1234567890 a.n NEZO FACTORY\nHarap konfirmasi setelah melakukan transfer.',
      recipientName: orderData.recipientName || orderData.team || '',
      recipientPhone: orderData.recipientPhone || orderData.contact || '',
      shippingAddress: orderData.shippingAddress || '',
      kelurahan: orderData.kelurahan || '',
      kecamatan: orderData.kecamatan || '',
      kota: orderData.kota || 'Kota Bandung',
      provinsi: orderData.provinsi || 'Jawa Barat',
      shippingNotes: orderData.shippingNotes || 'Fragile / Pakaian Olahraga Custom'
    }

    if (supabase) {
      try {
        const payload = mapToSupabase(newOrder)
        const { data, error } = await supabase
          .from('orders')
          .insert([payload])
          .select()
          .single()
        if (error) {
          console.error('Supabase insert error:', error)
          throw error
        }
        const savedOrder = mapFromSupabase(data)
        orders.value.unshift(savedOrder)
        return savedOrder
      } catch (e) {
        console.error('Supabase insert exception:', e)
        throw e
      }
    }

    orders.value.unshift(newOrder)
    return newOrder
  }

  const updateOrder = async (id, updatedFields) => {
    const idx = orders.value.findIndex(o => o.id === id)
    if (idx !== -1) {
      const activeTenantId = await resolveTenant()
      if (supabase && !activeTenantId) {
        console.error('Supabase update aborted: tenant_id tidak ditemukan')
        return null
      }

      const merged = {
        ...orders.value[idx],
        ...updatedFields,
        tenantId: updatedFields.tenantId || orders.value[idx].tenantId || activeTenantId || '',
        updatedAt: new Date().toISOString()
      }
      orders.value[idx] = merged

      if (supabase) {
        try {
          const payload = mapToSupabase(merged)
          const { error } = await supabase
            .from('orders')
            .update(payload)
            .eq('id', id)
            .eq('tenant_id', merged.tenantId)
          if (error) {
            errorMessage.value = error.message
            console.error('Supabase update error:', error)
          }
        } catch (e) {
          errorMessage.value = e?.message || 'Gagal mengupdate pesanan'
          console.error('Supabase update exception:', e)
        }
      }

      return orders.value[idx]
    }
    return null
  }

  const deleteOrder = async (id) => {
    const targetOrder = orders.value.find(o => o.id === id)
    orders.value = orders.value.filter(o => o.id !== id)

    if (supabase) {
      try {
        const activeTenantId = targetOrder?.tenantId || (await resolveTenant())
        let query = supabase.from('orders').delete().eq('id', id)
        if (activeTenantId) {
          query = query.eq('tenant_id', activeTenantId)
        }
        const { error } = await query
        if (error) {
          errorMessage.value = error.message
          console.error('Supabase delete error:', error)
        }
      } catch (e) {
        errorMessage.value = e?.message || 'Gagal menghapus pesanan'
        console.error('Supabase delete exception:', e)
      }
    }
  }

  // Pre-fill from Customer Order (from WhatsApp / OrderDetailPage)
  const prepareOrderFromCustomerInquiry = (inquiry) => {
    const items = []
    if (inquiry.product) {
      items.push({
        product: inquiry.product.nameId || inquiry.product.code || 'Atasan',
        size: inquiry.size?.split(' ')[1] || 'L',
        price: 135000,
        qty: parseInt(inquiry.qty, 10) || 12
      })
    }

    let detectedFabric = 'MILANO'
    const fabLower = (inquiry.fabric || '').toLowerCase()
    if (fabLower.includes('brazil')) detectedFabric = 'BRAZIL'
    else if (fabLower.includes('serena')) detectedFabric = 'SERENA'
    else if (fabLower.includes('embos')) detectedFabric = 'EMBOS'

    const images = inquiry.product?.image ? [inquiry.product.image, '', ''] : ['', '', '']

    return {
      team: inquiry.teamName || '',
      contact: inquiry.contact || '',
      notes: inquiry.notes || `Produk: ${inquiry.product?.code || ''} - ${inquiry.cut || ''}`,
      fabric: detectedFabric,
      items,
      images,
      total: items.reduce((s, i) => s + (i.price * i.qty), 0)
    }
  }

  // Active Draft for Form Input
  const activeDraft = ref(null)

  // Print modal states
  const activeSpkOrder = ref(null)
  const isSpkModalOpen = ref(false)

  const activeInvoiceOrder = ref(null)
  const isInvoiceModalOpen = ref(false)

  const activeLabelOrder = ref(null)
  const isLabelModalOpen = ref(false)

  const openSpkModal = (order) => {
    activeSpkOrder.value = JSON.parse(JSON.stringify(order))
    isSpkModalOpen.value = true
  }

  const openInvoiceModal = (order) => {
    activeInvoiceOrder.value = JSON.parse(JSON.stringify(order))
    isInvoiceModalOpen.value = true
  }

  const openLabelModal = (order) => {
    activeLabelOrder.value = JSON.parse(JSON.stringify(order))
    isLabelModalOpen.value = true
  }

  // Export to CSV
  const exportToCSV = () => {
    if (!orders.value.length) return false

    const rows = [
      ['Nomor Transaksi', 'No. SPK', 'No. Invoice', 'Tanggal', 'Deadline', 'Nama Tim', 'Kontak', 'Catatan', 'Produk', 'Ukuran', 'Harga', 'Qty', 'Subtotal', 'Total Pesanan', 'Bahan', 'DP', 'Sisa Tagihan']
    ]

    orders.value.forEach(o => {
      const items = o.items && o.items.length ? o.items : [{ product: '-', size: '-', price: 0, qty: 0 }]
      items.forEach(i => {
        const subtotal = (Number(i.price) || 0) * (Number(i.qty) || 0)
        const sisa = Math.max(0, (Number(o.total) || 0) - (Number(o.dpAmount) || 0))
        rows.push([
          o.id,
          o.spkNo || '',
          o.invoiceNo || '',
          o.date,
          o.deadline || '',
          o.team,
          o.contact || '',
          o.notes || '',
          i.product || '',
          i.size || '',
          i.price || 0,
          i.qty || 0,
          subtotal,
          o.total || 0,
          o.fabric || '',
          o.dpAmount || 0,
          sisa
        ])
      })
    })

    const csvContent = rows
      .map(r => r.map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(','))
      .join('\r\n')

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `data-pesanan-nezo-factory-${getTodayDateString()}.csv`
    a.click()
    URL.revokeObjectURL(url)
    return true
  }

  return {
    isLoggedIn,
    isLoading,
    isCloudConnected,
    errorMessage,
    tenant,
    tenantId,
    resolveTenant,
    login,
    logout,
    orders,
    activeDraft,
    fetchOrdersFromSupabase,
    getNextTrxId,
    getNextSpkNo,
    getNextInvNo,
    totalOrdersCount,
    totalRevenue,
    uniqueTeamsCount,
    totalItemsQty,
    addOrder,
    updateOrder,
    deleteOrder,
    prepareOrderFromCustomerInquiry,
    activeSpkOrder,
    isSpkModalOpen,
    openSpkModal,
    activeInvoiceOrder,
    isInvoiceModalOpen,
    openInvoiceModal,
    activeLabelOrder,
    isLabelModalOpen,
    openLabelModal,
    exportToCSV
  }
})
