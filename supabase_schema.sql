-- ==============================================================================
-- NEZO FACTORY - DATABASE SCHEMA & SEED DATA UNTUK SUPABASE (PURE ONLINE MODE)
-- ==============================================================================
-- Buka Supabase Dashboard -> Pilih Project Anda -> Klik menu "SQL Editor" -> 
-- Salin (copy) dan jalankan (RUN) query di bawah ini:

-- 1. Buat Tabel Orders (Menampung Data Pesanan, SPK, Invoice & Resi Pengiriman)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    deadline DATE,
    team TEXT NOT NULL,
    contact TEXT,
    notes TEXT,
    images JSONB DEFAULT '["", "", ""]'::jsonb,
    items JSONB DEFAULT '[]'::jsonb,
    total NUMERIC DEFAULT 0,
    spk_no TEXT,
    invoice_no TEXT,
    fabric TEXT DEFAULT 'MILANO',
    product_type TEXT DEFAULT 'ATASAN',
    collar_model TEXT DEFAULT 'V-NECK',
    sleeve_model TEXT DEFAULT 'T.PENDEK',
    child_sizes JSONB DEFAULT '{"XS":0,"S":0,"M":0,"L":0,"XL":0,"2XL":0}'::jsonb,
    adult_sizes JSONB DEFAULT '{"S":0,"M":0,"L":0,"XL":0,"2XL":0,"3XL":0,"4XL":0,"5XL":0}'::jsonb,
    roster JSONB DEFAULT '[]'::jsonb,
    dp_amount NUMERIC DEFAULT 0,
    payment_notes TEXT,
    recipient_name TEXT,
    recipient_phone TEXT,
    shipping_address TEXT,
    kelurahan TEXT,
    kecamatan TEXT,
    kota TEXT DEFAULT 'Kota Bandung',
    provinsi TEXT DEFAULT 'Jawa Barat',
    shipping_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generate transaction IDs in the database to avoid collisions between clients.
CREATE SEQUENCE IF NOT EXISTS public.orders_id_seq;

DO $$
DECLARE
    current_max BIGINT;
BEGIN
    SELECT COALESCE(MAX((substring(id from '[0-9]+$'))::BIGINT), 0)
    INTO current_max
    FROM public.orders
    WHERE id ~ '[0-9]+$';

    PERFORM setval('public.orders_id_seq', GREATEST(current_max + 1, 1), false);
END $$;

CREATE OR REPLACE FUNCTION public.assign_order_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.id IS NULL OR btrim(NEW.id) = '' THEN
        NEW.id := 'TRX-NZ-' || lpad(nextval('public.orders_id_seq')::TEXT, 5, '0');
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS assign_order_id_trigger ON public.orders;
CREATE TRIGGER assign_order_id_trigger
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.assign_order_id();

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan Akses (Memungkinkan front-end web app mengelola data secara online)
DROP POLICY IF EXISTS "Allow public read access" ON public.orders;
DROP POLICY IF EXISTS "Allow public insert access" ON public.orders;
DROP POLICY IF EXISTS "Allow public update access" ON public.orders;
DROP POLICY IF EXISTS "Allow public delete access" ON public.orders;

CREATE POLICY "Allow public read access" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.orders FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete access" ON public.orders FOR DELETE USING (true);

-- 4. SEED DATA AWAL (Contoh Data Transaksi Realistis Tim Voli Nezo Factory)
INSERT INTO public.orders (
    id, date, deadline, team, contact, notes, images, items, total,
    spk_no, invoice_no, fabric, product_type, collar_model, sleeve_model,
    child_sizes, adult_sizes, roster, dp_amount, payment_notes,
    recipient_name, recipient_phone, shipping_address, kelurahan, kecamatan, kota, provinsi, shipping_notes, created_at
) VALUES 
(
    'TRX-NZ-00001',
    '2026-11-01',
    '2026-11-15',
    'GARUDA VOLLEY CLUB',
    '081234567890 (Coach Budi)',
    'Jersey tanding kejurda, sablon polyflex emas, bahan Milano adem',
    '["/assets/portfolio_volley/01.jpeg", "/assets/portfolio_volley/02.jpeg", "/assets/texture/separated/milano_macro.jpg"]'::jsonb,
    '[
        {"product": "Setelan Voli Pria", "size": "L", "price": 165000, "qty": 8},
        {"product": "Setelan Voli Pria", "size": "XL", "price": 165000, "qty": 4},
        {"product": "Setelan Libero Khusus", "size": "M", "price": 175000, "qty": 2}
    ]'::jsonb,
    2330000,
    'SPK/NZ/2026/001',
    'INV/NZ/2026/001',
    'MILANO',
    'SETELAN',
    'V-NECK',
    'T.PENDEK',
    '{"XS": 0, "S": 0, "M": 0, "L": 0, "XL": 0, "2XL": 0}'::jsonb,
    '{"S": 0, "M": 2, "L": 8, "XL": 4, "2XL": 0, "3XL": 0, "4XL": 0, "5XL": 0}'::jsonb,
    '[
        {"name": "FARHAN", "size": "L", "nopung": "10", "notes": "Outside Hitter"},
        {"name": "RENDY", "size": "L", "nopung": "07", "notes": "Kapten Tim"},
        {"name": "DONI", "size": "XL", "nopung": "09", "notes": "Opposite"},
        {"name": "NIZAR", "size": "L", "nopung": "04", "notes": "Setter"},
        {"name": "YUDHA", "size": "XL", "nopung": "13", "notes": "Middle Blocker"},
        {"name": "RAKHA", "size": "M", "nopung": "19", "notes": "Libero 1 (Beda Warna)"}
    ]'::jsonb,
    1000000,
    'BCA 1234567890 a.n NEZO FACTORY. Sisa pembayaran saat pesanan selesai sebelum pengiriman.',
    'Budi Santoso (Garuda VC)',
    '081234567890',
    'GOR Pajajaran, Jl. Pemuda No. 12',
    'Pasirkaliki',
    'Cicendo',
    'Kota Bandung',
    'Jawa Barat',
    'Fragile / Kostum Tim Voli Garuda Kejurda',
    NOW() - INTERVAL '7 days'
),
(
    'TRX-NZ-00002',
    '2026-11-04',
    '2026-11-18',
    'BANDUNG JUARA VC (PUTRI)',
    '089876543210 (Bu Rina)',
    'Jersey voli putri lengan pendek cap-sleeves, bahan Dryfit Brazil ringan & sejuk',
    '["/assets/portfolio_volley/04.jpeg", "/assets/portfolio_volley/06.jpeg", "/assets/texture/separated/brazil_macro.jpg"]'::jsonb,
    '[
        {"product": "Atasan Lengan Pendek Putri", "size": "M", "price": 135000, "qty": 8},
        {"product": "Atasan Lengan Pendek Putri", "size": "S", "price": 135000, "qty": 4}
    ]'::jsonb,
    1620000,
    'SPK/NZ/2026/002',
    'INV/NZ/2026/002',
    'BRAZIL',
    'ATASAN',
    'O-NECK',
    'T.PENDEK',
    '{"XS": 0, "S": 0, "M": 0, "L": 0, "XL": 0, "2XL": 0}'::jsonb,
    '{"S": 4, "M": 8, "L": 0, "XL": 0, "2XL": 0, "3XL": 0, "4XL": 0, "5XL": 0}'::jsonb,
    '[
        {"name": "MEGAWATI", "size": "M", "nopung": "03", "notes": "Opposite Spiker"},
        {"name": "WILDA", "size": "M", "nopung": "17", "notes": "Captain"},
        {"name": "TIARA", "size": "S", "nopung": "08", "notes": "Setter"},
        {"name": "YULIA", "size": "S", "nopung": "01", "notes": "Libero"}
    ]'::jsonb,
    1000000,
    'BCA 1234567890 a.n NEZO FACTORY.',
    'Rina Marlina (Bandung Juara VC)',
    '089876543210',
    'Komplek Antapani Mas Blok C4 No. 15',
    'Antapani Tengah',
    'Antapani',
    'Kota Bandung',
    'Jawa Barat',
    'Pakaian Olahraga Tim Putri',
    NOW() - INTERVAL '4 days'
),
(
    'TRX-NZ-00003',
    '2026-11-06',
    '2026-11-20',
    'SURABAYA SPARTAN VC',
    '085611223344 (Manager Anton)',
    'Edisi Spesial: Bahan Embos Topo timbul mewah + Jaket Official Tim',
    '["/assets/portfolio_volley/10.jpeg", "/assets/portfolio_volley/12.jpeg", "/assets/texture/separated/embos_macro.jpg"]'::jsonb,
    '[
        {"product": "Setelan Embos Topo Premium", "size": "L", "price": 185000, "qty": 10},
        {"product": "Jaket Parasut Official Tim", "size": "XL", "price": 220000, "qty": 2}
    ]'::jsonb,
    2290000,
    'SPK/NZ/2026/003',
    'INV/NZ/2026/003',
    'EMBOS',
    'SETELAN',
    'WANGKI KANCING',
    'T.PENDEK',
    '{"XS": 0, "S": 0, "M": 0, "L": 0, "XL": 0, "2XL": 0}'::jsonb,
    '{"S": 0, "M": 0, "L": 10, "XL": 2, "2XL": 0, "3XL": 0, "4XL": 0, "5XL": 0}'::jsonb,
    '[
        {"name": "AGIL", "size": "L", "nopung": "11", "notes": "Captain"},
        {"name": "HENDRA", "size": "L", "nopung": "05", "notes": "Middle Blocker"}
    ]'::jsonb,
    1500000,
    'BCA 1234567890 a.n NEZO FACTORY. DP 1.5jt lunas di awal.',
    'Anton Wijaya',
    '085611223344',
    'Jl. Dharmahusada Indah Timur No. 88',
    'Mulyorejo',
    'Mulyorejo',
    'Kota Surabaya',
    'Jawa Timur',
    'Paket Seragam & Jaket Tim Surabaya Spartan',
    NOW() - INTERVAL '1 day'
)
ON CONFLICT (id) DO NOTHING;
