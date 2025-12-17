# Code Review & Audit Report

**Date:** December 17, 2024  
**Reviewer:** Automated Code Review

---

## 🔴 Critical Issues Fixed

### 1. RLS Infinite Recursion (FIXED)
**Problem:** Admin policies checking `profiles.role` caused infinite recursion since `profiles` table also has RLS enabled.

**Solution:** Created `is_admin()` SECURITY DEFINER function that bypasses RLS:
```sql
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
```

**File:** `backend/supabase/migrations/006_fix_rls_recursion.sql`

---

### 2. Test File with Credentials (FIXED)
**Problem:** `test-supabase.mjs` contained hardcoded API keys.

**Solution:** Deleted test file and added pattern to `.gitignore`:
```gitignore
# test files
*.test.mjs
test-*.mjs
```

---

### 3. .gitignore Not Covering Monorepo (FIXED)
**Problem:** Original `.gitignore` didn't account for new folder structure.

**Solution:** Updated to include:
```gitignore
frontend/node_modules
frontend/.next/
frontend/.env.local
backend/.env.local
```

---

## 🟡 Warnings & Recommendations

### 1. Next.js Middleware Deprecation Warning
```
⚠ The "middleware" file convention is deprecated. 
Please use "proxy" instead.
```

**Status:** Non-blocking for now. Next.js 16 still supports middleware.

**Recommendation:** Monitor Next.js 17 for migration path to new proxy convention.

---

### 2. Admin Client Doesn't Need Cookies
**File:** `frontend/src/lib/supabase/server.ts`

**Issue:** `createAdminClient()` includes cookie handling but service role key bypasses auth anyway.

**Impact:** Low - works correctly, just unnecessary code.

**Recommendation:** Simplify in future refactor:
```typescript
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
```

---

### 3. Type Safety for Supabase Client
**Current:** Types are manually defined in `types.ts`.

**Recommendation:** Auto-generate types using Supabase CLI:
```bash
supabase gen types typescript --project-id opmoybnfgntlyijgsgzu > src/lib/supabase/types.ts
```

This ensures types stay in sync with database schema.

---

### 4. Missing Price Label Logic
**Issue:** `price_label` (e.g., "/bulan" for rent) exists in schema but seed data for rental properties doesn't include it.

**Impact:** Medium - rental prices will display without "/bulan" suffix.

**Fix Required:** Update seed data:
```sql
-- For Kos Eksklusif
price_label = '/bulan'

-- For Ruko (rental)
price_label = '/bulan'
```

---

### 5. Original Migration File Has Outdated Policies
**File:** `backend/supabase/migrations/000_complete_setup.sql`

**Issue:** Still contains the old RLS policies that cause recursion (lines 23-40). These were overwritten by `006_fix_rls_recursion.sql` but file should be updated for clarity.

**Recommendation:** Keep as-is for history, but add comment noting the fix file.

---

## 🟢 Good Practices Observed

| Practice | Status |
|----------|--------|
| Environment variables for secrets | ✅ |
| .env.local in .gitignore | ✅ |
| TypeScript strict mode | ✅ |
| RLS enabled on all tables | ✅ |
| Indexes on frequently queried columns | ✅ |
| Foreign key constraints | ✅ |
| Cascading deletes where appropriate | ✅ |
| Auto-generated slugs | ✅ |
| Auto-updated timestamps | ✅ |
| Separate client/server Supabase instances | ✅ |

---

## 🔒 Security Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Service role key server-side only | ✅ | Only in `SUPABASE_SERVICE_ROLE_KEY` |
| Anon key is public-safe | ✅ | RLS protects data |
| RLS enabled on all tables | ✅ | |
| Public can only read published | ✅ | |
| Inquiries insert-only for public | ✅ | No read/update/delete |
| Admin check uses SECURITY DEFINER | ✅ | Prevents recursion |
| .env.local not committed | ✅ | In .gitignore |
| Storage bucket has policies | ✅ | Admin-only upload |

---

## 📊 Database Schema Review

### Indexes Analysis
All frequently queried columns are indexed:
- ✅ `status` - for filtering published
- ✅ `transaction_type` - for buy/rent filter
- ✅ `property_type` - for type filter
- ✅ `district` - for location filter
- ✅ `price` - for sorting
- ✅ `slug` - for URL lookups
- ✅ `created_at` - for sorting by newest

### Missing Considerations
1. **Full-text search:** Not implemented. Consider adding `tsvector` column for search.
2. **Soft delete:** Using `status = 'archived'` instead of actual delete. Good practice.
3. **Audit trail:** No `updated_by` tracking. Consider for admin dashboard.

---

## Action Items

| Priority | Item | Status |
|----------|------|--------|
| 🔴 High | Fix RLS recursion | ✅ Done |
| 🔴 High | Remove test file with credentials | ✅ Done |
| 🔴 High | Update .gitignore | ✅ Done |
| 🟡 Medium | Add price_label to rental seed data | Pending |
| 🟢 Low | Simplify admin client | Future |
| 🟢 Low | Auto-generate types with CLI | Future |
