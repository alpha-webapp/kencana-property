# Phase 1: Backend Foundation Plan

## Overview

This phase establishes the backend infrastructure using **Supabase** as the Backend-as-a-Service (BaaS) solution integrated with the existing Next.js frontend.

**Timeline:** 1-2 weeks  
**Priority:** Critical (blocks all other backend phases)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        KENCANA PROPERTY                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐ │
│  │  FRONTEND   │    │   BACKEND   │    │       DOCS          │ │
│  │  (Next.js)  │◄──►│  (Supabase) │    │   (Documentation)   │ │
│  └─────────────┘    └─────────────┘    └─────────────────────┘ │
│        │                   │                                    │
│        │                   │                                    │
│        ▼                   ▼                                    │
│  ┌─────────────┐    ┌─────────────────────────────────────────┐│
│  │ API Routes  │    │              SUPABASE                    ││
│  │ Server      │◄──►│  ┌─────────┐ ┌─────────┐ ┌───────────┐  ││
│  │ Actions     │    │  │  Auth   │ │Postgres │ │  Storage  │  ││
│  └─────────────┘    │  └─────────┘ └─────────┘ └───────────┘  ││
│                     └─────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1 Tasks

### 1.1 Supabase Project Setup
- [ ] Create Supabase project at supabase.com
- [ ] Configure project settings (region: Singapore for Indonesia)
- [ ] Get API keys (anon key, service role key)
- [ ] Set up environment variables

### 1.2 Database Schema Design
- [ ] Create `profiles` table (extends auth.users)
- [ ] Create `properties` table
- [ ] Create `property_images` table
- [ ] Create `inquiries` table
- [ ] Set up foreign key relationships
- [ ] Create indexes for common queries

### 1.3 Row Level Security (RLS)
- [ ] Enable RLS on all tables
- [ ] Public read access for published properties
- [ ] Admin-only write access for properties
- [ ] User can only read own profile
- [ ] Admin can manage all data

### 1.4 Supabase Integration in Next.js
- [ ] Install `@supabase/supabase-js` and `@supabase/ssr`
- [ ] Create Supabase client utilities (browser + server)
- [ ] Set up middleware for auth session handling
- [ ] Create TypeScript types from database schema

### 1.5 Storage Buckets
- [ ] Create `property-images` bucket
- [ ] Configure public access for images
- [ ] Set up upload policies (admin only)
- [ ] Configure image transformations (resize on-the-fly)

---

## Database Schema

### Table: `profiles`
Extends Supabase auth.users with additional fields.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'agent')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `properties`
Main property listings table.

```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Transaction
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('dijual', 'disewa')),
  property_type TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold', 'rented', 'archived')),
  
  -- Pricing
  price BIGINT NOT NULL,
  price_label TEXT, -- e.g., "/bulan" for rent
  
  -- Location
  address TEXT NOT NULL,
  sub_district TEXT, -- Kecamatan (e.g., Ngaglik)
  district TEXT NOT NULL, -- Kabupaten/Kota (e.g., Sleman)
  province TEXT DEFAULT 'DI Yogyakarta',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Specifications
  land_size INTEGER, -- m²
  building_size INTEGER, -- m²
  bedrooms INTEGER,
  bathrooms INTEGER,
  floors INTEGER,
  certificate TEXT,
  electricity INTEGER, -- wattage
  furnished TEXT CHECK (furnished IN ('furnished', 'semi-furnished', 'unfurnished')),
  facing TEXT, -- direction
  year_built INTEGER,
  
  -- Media
  featured_image TEXT, -- Primary image URL
  
  -- Features (stored as JSON array)
  features JSONB DEFAULT '[]'::jsonb,
  
  -- Relations
  agent_id UUID REFERENCES profiles(id),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_transaction_type ON properties(transaction_type);
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_district ON properties(district);
CREATE INDEX idx_properties_price ON properties(price);
```

### Table: `property_images`
Multiple images per property.

```sql
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_images_property_id ON property_images(property_id);
```

### Table: `inquiries`
Contact form and property inquiries.

```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Inquiry Type
  type TEXT NOT NULL CHECK (type IN ('contact', 'property')),
  subject TEXT,
  
  -- Contact Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  
  -- Property Reference (optional)
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ
);

CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_property_id ON inquiries(property_id);
```

---

## Environment Variables

### Frontend `.env.local`
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# For server-side operations (API routes)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## File Structure After Phase 1

```
kencana-property/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── properties/
│   │   │   │   │   └── route.ts
│   │   │   │   └── inquiries/
│   │   │   │       └── route.ts
│   │   │   └── ...existing pages
│   │   ├── lib/
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts      # Browser client
│   │   │   │   ├── server.ts      # Server client
│   │   │   │   ├── middleware.ts  # Auth middleware helper
│   │   │   │   └── types.ts       # Generated DB types
│   │   │   └── ...existing lib
│   │   └── middleware.ts          # Next.js middleware for auth
│   ├── .env.local
│   └── package.json
│
├── backend/
│   ├── supabase/
│   │   ├── migrations/
│   │   │   ├── 001_create_profiles.sql
│   │   │   ├── 002_create_properties.sql
│   │   │   ├── 003_create_property_images.sql
│   │   │   ├── 004_create_inquiries.sql
│   │   │   └── 005_create_rls_policies.sql
│   │   ├── seed/
│   │   │   └── seed_data.sql
│   │   └── functions/
│   │       └── (edge functions if needed)
│   ├── config.toml
│   └── README.md
│
├── docs/
│   ├── DOCUMENTATION.md
│   ├── PHASE-1-BACKEND-PLAN.md    # This file
│   ├── PHASE-2-AUTH-PLAN.md       # Next phase
│   └── API.md                      # API documentation
│
├── .gitignore
└── README.md
```

---

## Row Level Security Policies

```sql
-- PROFILES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- PROPERTIES
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Anyone can view published properties
CREATE POLICY "Public can view published properties" ON properties
  FOR SELECT USING (status = 'published');

-- Admins can do everything
CREATE POLICY "Admins have full access to properties" ON properties
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- PROPERTY_IMAGES
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Anyone can view images of published properties
CREATE POLICY "Public can view images of published properties" ON property_images
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM properties WHERE id = property_id AND status = 'published')
  );

-- Admins can manage all images
CREATE POLICY "Admins have full access to property_images" ON property_images
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- INQUIRIES
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can create inquiries (contact form)
CREATE POLICY "Anyone can create inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Only admins can view/manage inquiries
CREATE POLICY "Admins can manage inquiries" ON inquiries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

## Success Criteria

- [ ] Supabase project created and configured
- [ ] All 4 tables created with proper relationships
- [ ] RLS policies active and tested
- [ ] Supabase client integrated in Next.js
- [ ] Can create/read properties via Supabase
- [ ] Can upload images to Supabase Storage
- [ ] Environment variables documented and secured
- [ ] Migration files versioned in backend/supabase/migrations/

---

## Next Phase Preview

**Phase 2: Authentication System**
- Admin login page
- Registration (admin-only invite system)
- Protected routes middleware
- Session management
- Password reset flow

---

## Notes

- Using UUID for all primary keys (Supabase default)
- Prices stored as BIGINT (Indonesian Rupiah, no decimals needed)
- Features stored as JSONB for flexibility
- Slug field for SEO-friendly URLs
- Status workflow: draft → published → sold/rented → archived
