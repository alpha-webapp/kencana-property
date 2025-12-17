-- Migration: Create properties table
-- Main property listings table

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Transaction
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('dijual', 'disewa')),
  property_type TEXT NOT NULL CHECK (property_type IN ('rumah', 'apartemen', 'tanah', 'villa', 'ruko', 'kos')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold', 'rented', 'archived')),
  
  -- Pricing
  price BIGINT NOT NULL,
  price_label TEXT, -- e.g., "/bulan" for rent
  
  -- Location
  address TEXT NOT NULL,
  sub_district TEXT, -- Kecamatan (e.g., Ngaglik)
  district TEXT NOT NULL CHECK (district IN ('Sleman', 'Bantul', 'Kota Yogyakarta', 'Gunung Kidul', 'Kulon Progo')),
  province TEXT DEFAULT 'DI Yogyakarta',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Specifications
  land_size INTEGER, -- m²
  building_size INTEGER, -- m²
  bedrooms INTEGER,
  bathrooms INTEGER,
  floors INTEGER,
  certificate TEXT CHECK (certificate IN ('shm', 'shgb', 'shp', 'girik', 'ppjb', 'lainnya')),
  electricity INTEGER, -- wattage
  furnished TEXT CHECK (furnished IN ('furnished', 'semi-furnished', 'unfurnished')),
  facing TEXT, -- direction (Utara, Selatan, Timur, Barat)
  year_built INTEGER,
  
  -- Media
  featured_image TEXT, -- Primary image URL
  
  -- Features (stored as JSON array)
  features JSONB DEFAULT '[]'::jsonb,
  
  -- Relations
  agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Indexes for common queries
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_transaction_type ON properties(transaction_type);
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_district ON properties(district);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_properties_agent_id ON properties(agent_id);
CREATE INDEX idx_properties_created_at ON properties(created_at DESC);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view published properties
CREATE POLICY "Public can view published properties" ON properties
  FOR SELECT USING (status = 'published');

-- Admins can view all properties
CREATE POLICY "Admins can view all properties" ON properties
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can insert properties
CREATE POLICY "Admins can insert properties" ON properties
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update properties
CREATE POLICY "Admins can update properties" ON properties
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can delete properties
CREATE POLICY "Admins can delete properties" ON properties
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Trigger to auto-update updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_property_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Generate base slug from title
  base_slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;
  
  -- Check for duplicates and append counter if needed
  WHILE EXISTS (SELECT 1 FROM properties WHERE slug = final_slug AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug
CREATE TRIGGER generate_property_slug_trigger
  BEFORE INSERT OR UPDATE OF title ON properties
  FOR EACH ROW
  WHEN (NEW.slug IS NULL OR NEW.slug = '' OR NEW.title IS DISTINCT FROM OLD.title)
  EXECUTE FUNCTION generate_property_slug();
