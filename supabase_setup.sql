-- ===================================================================
-- ATYAB PERFUMES — SUPABASE DATABASE SETUP & SCHEMA SCRIPT
-- Paste this script into your Supabase project's SQL Editor and click RUN
-- ===================================================================

-- 1. Create Profiles Table (Stores user information)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  address TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Orders Table (Stores customer orders with full details and tracking)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY, -- e.g. 'ATY-KSA-994821'
  user_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_city TEXT,
  customer_address TEXT,
  payment_method TEXT DEFAULT 'mada',
  payment_status TEXT DEFAULT 'pending',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  financials JSONB NOT NULL DEFAULT '{}'::jsonb,
  tracking_number TEXT,
  carrier TEXT DEFAULT 'SMSA Express',
  timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Cart Items Table (Stores user-scoped persistent carts)
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_sar NUMERIC NOT NULL,
  name TEXT,
  name_en TEXT,
  image TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_email, product_id, size)
);

-- ===================================================================
-- 4. Enable Row Level Security (RLS) & Policies
-- ===================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Allow access policies
DROP POLICY IF EXISTS "Public access to profiles" ON public.profiles;
CREATE POLICY "Public access to profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to orders" ON public.orders;
CREATE POLICY "Public access to orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to cart_items" ON public.cart_items;
CREATE POLICY "Public access to cart_items" ON public.cart_items FOR ALL USING (true) WITH CHECK (true);

-- ===================================================================
-- 5. Realtime Replication Enablement
-- Allows customer storefront & admin dashboard to receive instant updates
-- ===================================================================
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.cart_items;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;

-- ===================================================================
-- 6. Indexes for High Performance Queries
-- ===================================================================
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON public.orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_email ON public.cart_items(user_email);
