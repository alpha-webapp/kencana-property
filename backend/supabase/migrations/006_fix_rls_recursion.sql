DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can view all properties" ON properties;
DROP POLICY IF EXISTS "Admins can insert properties" ON properties;
DROP POLICY IF EXISTS "Admins can update properties" ON properties;
DROP POLICY IF EXISTS "Admins can delete properties" ON properties;
DROP POLICY IF EXISTS "Admins can view all images" ON property_images;
DROP POLICY IF EXISTS "Admins can insert images" ON property_images;
DROP POLICY IF EXISTS "Admins can update images" ON property_images;
DROP POLICY IF EXISTS "Admins can delete images" ON property_images;
DROP POLICY IF EXISTS "Admins can view inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admins can delete inquiries" ON inquiries;

-- Create a security definer function to check admin role (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES: Recreate admin policies using the function
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (public.is_admin());

-- PROPERTIES: Recreate admin policies
CREATE POLICY "Admins can view all properties" ON properties
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert properties" ON properties
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update properties" ON properties
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete properties" ON properties
  FOR DELETE USING (public.is_admin());

-- PROPERTY_IMAGES: Recreate admin policies
CREATE POLICY "Admins can view all images" ON property_images
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert images" ON property_images
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update images" ON property_images
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete images" ON property_images
  FOR DELETE USING (public.is_admin());

-- INQUIRIES: Recreate admin policies
CREATE POLICY "Admins can view inquiries" ON inquiries
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update inquiries" ON inquiries
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete inquiries" ON inquiries
  FOR DELETE USING (public.is_admin());
