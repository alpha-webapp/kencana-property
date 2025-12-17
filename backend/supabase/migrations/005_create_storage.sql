-- Migration: Create storage buckets and policies
-- Note: This needs to be run via Supabase Dashboard or API, not SQL directly

-- Storage bucket creation (run via Supabase Dashboard):
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create bucket named "property-images"
-- 3. Set to public bucket (for image serving)

-- Storage policies (can be set via SQL in newer Supabase versions):

-- Allow public read access to property images
-- INSERT INTO storage.policies (name, bucket_id, definition)
-- VALUES (
--   'Public read access',
--   'property-images',
--   '{"statement": [{"effect": "allow", "action": ["select"], "principal": "*"}]}'
-- );

-- The actual storage policies should be configured in Supabase Dashboard:

/*
Policy 1: Public Read Access
- Name: "Public can view property images"
- Allowed operation: SELECT
- Target roles: public (anonymous)
- Policy definition: true

Policy 2: Admin Upload Access  
- Name: "Admins can upload images"
- Allowed operation: INSERT
- Target roles: authenticated
- Policy definition: 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')

Policy 3: Admin Update Access
- Name: "Admins can update images"
- Allowed operation: UPDATE  
- Target roles: authenticated
- Policy definition:
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')

Policy 4: Admin Delete Access
- Name: "Admins can delete images"
- Allowed operation: DELETE
- Target roles: authenticated
- Policy definition:
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
*/

-- Placeholder comment to document storage setup requirements
COMMENT ON TABLE properties IS 'Storage bucket "property-images" must be created in Supabase Dashboard with public read access';
