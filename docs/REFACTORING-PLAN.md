# Refactoring Plan: API Routes Architecture

**Created:** December 21, 2024  
**Status:** 📋 PLANNED  
**Priority:** High (should be done before implementing new features)

---

## Overview

This document outlines the refactoring from **Supabase-only** architecture to **Next.js API Routes as Backend** pattern. This creates a thin backend layer that centralizes business logic while maintaining single-deployment simplicity.

### Why Refactor?

| Current State | Problem |
|---------------|---------|
| Components call Supabase directly | Business logic scattered across components |
| RLS policies as only security layer | Hard to test, hard to add complex validation |
| No API layer | Future features (email, payments) have no home |

### Target Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         KENCANA PROPERTY                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                      NEXT.JS APPLICATION                      │  │
│  │                                                                │  │
│  │   ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐   │  │
│  │   │   PAGES     │    │   API       │    │    LIB          │   │  │
│  │   │  (Frontend) │───►│  ROUTES     │───►│  (Services)     │   │  │
│  │   │             │    │  (Backend)  │    │                 │   │  │
│  │   └─────────────┘    └─────────────┘    └────────┬────────┘   │  │
│  │                                                   │            │  │
│  └───────────────────────────────────────────────────┼────────────┘  │
│                                                      │               │
│                                                      ▼               │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                         SUPABASE                               │  │
│  │   ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐   │  │
│  │   │    Auth     │    │  PostgreSQL │    │     Storage     │   │  │
│  │   └─────────────┘    └─────────────┘    └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Refactoring Tasks

### Phase R1: Create Service Layer

Create a dedicated services layer that encapsulates all Supabase interactions.

#### R1.1 Create Directory Structure

```
frontend/src/lib/
├── services/                 # NEW: Business logic layer
│   ├── index.ts             # Export all services
│   ├── properties.service.ts # Property CRUD operations
│   ├── inquiries.service.ts  # Inquiry operations
│   ├── auth.service.ts       # Authentication operations
│   └── storage.service.ts    # Image upload operations
├── data/                     # KEEP: Read-only data fetching (for RSC)
│   ├── index.ts
│   └── properties.ts
├── supabase/                 # KEEP: Supabase clients
│   ├── client.ts
│   ├── server.ts
│   └── types.ts
└── validators/               # NEW: Input validation schemas
    ├── index.ts
    ├── property.validator.ts
    └── inquiry.validator.ts
```

#### R1.2 Create Property Service

**File:** `frontend/src/lib/services/properties.service.ts`

```typescript
// Handles all property business logic
// - Create property (with validation)
// - Update property
// - Delete property (soft delete → archived)
// - Publish/unpublish property
// - Image management
```

**Functions to implement:**
- `createProperty(data: PropertyInsert): Promise<ServiceResult<Property>>`
- `updateProperty(id: string, data: PropertyUpdate): Promise<ServiceResult<Property>>`
- `deleteProperty(id: string): Promise<ServiceResult<void>>`
- `publishProperty(id: string): Promise<ServiceResult<Property>>`
- `unpublishProperty(id: string): Promise<ServiceResult<Property>>`

#### R1.3 Create Inquiry Service

**File:** `frontend/src/lib/services/inquiries.service.ts`

```typescript
// Handles all inquiry business logic
// - Submit inquiry (from contact form)
// - Mark as read
// - Mark as replied
// - Close inquiry
// - List inquiries (admin)
```

**Functions to implement:**
- `submitInquiry(data: InquiryInsert): Promise<ServiceResult<Inquiry>>`
- `getInquiries(options?: QueryOptions): Promise<ServiceResult<Inquiry[]>>`
- `markAsRead(id: string): Promise<ServiceResult<Inquiry>>`
- `markAsReplied(id: string): Promise<ServiceResult<Inquiry>>`
- `closeInquiry(id: string): Promise<ServiceResult<Inquiry>>`

#### R1.4 Create Auth Service

**File:** `frontend/src/lib/services/auth.service.ts`

```typescript
// Handles authentication logic
// - Login
// - Logout
// - Get current user
// - Check if admin
// - Password reset
```

**Functions to implement:**
- `login(email: string, password: string): Promise<ServiceResult<User>>`
- `logout(): Promise<ServiceResult<void>>`
- `getCurrentUser(): Promise<User | null>`
- `isAdmin(): Promise<boolean>`
- `resetPassword(email: string): Promise<ServiceResult<void>>`

#### R1.5 Create Storage Service

**File:** `frontend/src/lib/services/storage.service.ts`

```typescript
// Handles file upload logic
// - Upload property image
// - Delete property image
// - Get public URL
```

**Functions to implement:**
- `uploadPropertyImage(propertyId: string, file: File): Promise<ServiceResult<string>>`
- `deletePropertyImage(path: string): Promise<ServiceResult<void>>`
- `getPublicUrl(path: string): string`

---

### Phase R2: Create Validators

Use Zod for runtime validation (already compatible with React 19 / Next.js 16).

#### R2.1 Install Zod

```bash
cd frontend
npm install zod
```

#### R2.2 Create Property Validator

**File:** `frontend/src/lib/validators/property.validator.ts`

```typescript
import { z } from 'zod';

export const createPropertySchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter'),
  description: z.string().optional(),
  transaction_type: z.enum(['dijual', 'disewa']),
  property_type: z.enum(['rumah', 'apartemen', 'tanah', 'villa', 'ruko', 'kos']),
  price: z.number().positive('Harga harus lebih dari 0'),
  price_label: z.string().optional(),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  district: z.enum(['Sleman', 'Bantul', 'Kota Yogyakarta', 'Gunung Kidul', 'Kulon Progo']),
  sub_district: z.string().optional(),
  land_size: z.number().positive().optional(),
  building_size: z.number().positive().optional(),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  // ... other fields
});

export const updatePropertySchema = createPropertySchema.partial();

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
```

#### R2.3 Create Inquiry Validator

**File:** `frontend/src/lib/validators/inquiry.validator.ts`

```typescript
import { z } from 'zod';

export const submitInquirySchema = z.object({
  type: z.enum(['contact', 'property']),
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
  property_id: z.string().uuid().optional(),
  subject: z.string().optional(),
});

export type SubmitInquiryInput = z.infer<typeof submitInquirySchema>;
```

---

### Phase R3: Create API Routes

Create RESTful API routes that use the service layer.

#### R3.1 Properties API

**File:** `frontend/src/app/api/properties/route.ts`

```typescript
// GET /api/properties - List properties (with filters)
// POST /api/properties - Create property (admin only)
```

**File:** `frontend/src/app/api/properties/[id]/route.ts`

```typescript
// GET /api/properties/[id] - Get single property
// PUT /api/properties/[id] - Update property (admin only)
// DELETE /api/properties/[id] - Delete property (admin only)
```

**File:** `frontend/src/app/api/properties/[id]/publish/route.ts`

```typescript
// POST /api/properties/[id]/publish - Publish property (admin only)
// DELETE /api/properties/[id]/publish - Unpublish property (admin only)
```

#### R3.2 Inquiries API

**File:** `frontend/src/app/api/inquiries/route.ts`

```typescript
// GET /api/inquiries - List inquiries (admin only)
// POST /api/inquiries - Submit inquiry (public)
```

**File:** `frontend/src/app/api/inquiries/[id]/route.ts`

```typescript
// GET /api/inquiries/[id] - Get single inquiry (admin only)
// PATCH /api/inquiries/[id] - Update status (admin only)
```

#### R3.3 Auth API

**File:** `frontend/src/app/api/auth/login/route.ts`

```typescript
// POST /api/auth/login - Login
```

**File:** `frontend/src/app/api/auth/logout/route.ts`

```typescript
// POST /api/auth/logout - Logout
```

**File:** `frontend/src/app/api/auth/me/route.ts`

```typescript
// GET /api/auth/me - Get current user
```

#### R3.4 Upload API

**File:** `frontend/src/app/api/upload/route.ts`

```typescript
// POST /api/upload - Upload image (admin only)
// DELETE /api/upload - Delete image (admin only)
```

---

### Phase R4: Create Shared Types & Utilities

#### R4.1 Service Result Type

**File:** `frontend/src/lib/types/service-result.ts`

```typescript
export type ServiceResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code?: string };

export function ok<T>(data: T): ServiceResult<T> {
  return { success: true, data };
}

export function err<T>(error: string, code?: string): ServiceResult<T> {
  return { success: false, error, code };
}
```

#### R4.2 API Response Helpers

**File:** `frontend/src/lib/utils/api-response.ts`

```typescript
import { NextResponse } from 'next/server';

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function apiUnauthorized() {
  return apiError('Unauthorized', 401);
}

export function apiNotFound(resource = 'Resource') {
  return apiError(`${resource} not found`, 404);
}
```

---

### Phase R5: Update Existing Code

#### R5.1 Keep Data Layer for Read Operations

The existing `lib/data/properties.ts` is good for **read-only** operations in React Server Components. Keep it as-is for:
- Homepage featured listings
- Property listing page
- Property detail page

#### R5.2 Update Contact Form

Current contact form (if exists) should call `/api/inquiries` instead of Supabase directly.

#### R5.3 Admin Dashboard (Future)

All admin operations should go through API routes:
- Create property → `POST /api/properties`
- Edit property → `PUT /api/properties/[id]`
- Delete property → `DELETE /api/properties/[id]`
- View inquiries → `GET /api/inquiries`

---

## File Changes Summary

### New Files to Create

```
frontend/src/
├── app/
│   └── api/
│       ├── properties/
│       │   ├── route.ts
│       │   └── [id]/
│       │       ├── route.ts
│       │       └── publish/
│       │           └── route.ts
│       ├── inquiries/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.ts
│       │   ├── logout/
│       │   │   └── route.ts
│       │   └── me/
│       │       └── route.ts
│       └── upload/
│           └── route.ts
├── lib/
│   ├── services/
│   │   ├── index.ts
│   │   ├── properties.service.ts
│   │   ├── inquiries.service.ts
│   │   ├── auth.service.ts
│   │   └── storage.service.ts
│   ├── validators/
│   │   ├── index.ts
│   │   ├── property.validator.ts
│   │   └── inquiry.validator.ts
│   ├── types/
│   │   └── service-result.ts
│   └── utils/
│       └── api-response.ts
```

### Files to Modify

| File | Change |
|------|--------|
| `lib/data/properties.ts` | No change (keep for RSC reads) |
| Contact form component | Call API route instead of Supabase |
| Future admin components | Call API routes |

### Files to Delete

| File | Reason |
|------|--------|
| `lib/mock-data.ts` | No longer needed (data from Supabase) |
| `lib/property-details.ts` | Consolidated into `lib/data/properties.ts` |

---

## Implementation Order

1. **R4** - Create shared types & utilities (foundation)
2. **R2** - Create validators (needed by services)
3. **R1** - Create service layer (business logic)
4. **R3** - Create API routes (expose services)
5. **R5** - Update existing code (integrate)

---

## Testing Strategy

After refactoring, we can properly test:

```
frontend/src/
└── __tests__/
    ├── services/
    │   ├── properties.service.test.ts
    │   └── inquiries.service.test.ts
    └── api/
        ├── properties.test.ts
        └── inquiries.test.ts
```

---

## Estimated Effort

| Phase | Effort | Priority |
|-------|--------|----------|
| R4: Types & Utils | 1 hour | First |
| R2: Validators | 1 hour | Second |
| R1: Services | 3-4 hours | Third |
| R3: API Routes | 2-3 hours | Fourth |
| R5: Integration | 1-2 hours | Fifth |

**Total: ~8-11 hours**

---

## Success Criteria

- [ ] All business logic in service layer
- [ ] All mutations go through API routes
- [ ] Validators catch invalid input before hitting database
- [ ] API routes return consistent response format
- [ ] Existing frontend pages still work
- [ ] No direct Supabase calls in components (except reads via data layer)

---

## Notes

- Keep `lib/data/` for read-only RSC data fetching (this is a good pattern)
- Services use `createAdminClient()` for operations that bypass RLS
- API routes check authentication before calling services
- Validators run before service layer (fail fast)

---

## Related Documents

- [PHASE-1-BACKEND-PLAN.md](PHASE-1-BACKEND-PLAN.md) - Original backend plan
- [PHASE-1-COMPLETION.md](PHASE-1-COMPLETION.md) - What was implemented
- [DOCUMENTATION.md](DOCUMENTATION.md) - Overall project docs
