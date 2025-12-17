-- Migration: Create property_images table
-- Multiple images per property

CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  storage_path TEXT, -- Path in Supabase Storage
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for property lookups
CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_property_images_sort_order ON property_images(property_id, sort_order);

-- Enable RLS
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view images of published properties
CREATE POLICY "Public can view images of published properties" ON property_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE id = property_images.property_id 
      AND status = 'published'
    )
  );

-- Admins can view all images
CREATE POLICY "Admins can view all images" ON property_images
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can insert images
CREATE POLICY "Admins can insert images" ON property_images
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update images
CREATE POLICY "Admins can update images" ON property_images
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can delete images
CREATE POLICY "Admins can delete images" ON property_images
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
