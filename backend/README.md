# Kencana Property - Backend

This folder contains the Supabase configuration, database migrations, and backend-related code for Kencana Property.

## Structure

```
backend/
├── supabase/
│   ├── migrations/     # SQL migration files
│   ├── seed/           # Seed data for development
│   └── functions/      # Supabase Edge Functions (if needed)
├── config.toml         # Supabase local config
└── README.md           # This file
```

## Setup

### Prerequisites

1. [Supabase CLI](https://supabase.com/docs/guides/cli) installed
2. Supabase project created at https://supabase.com

### Local Development

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref <your-project-ref>

# Run migrations
supabase db push

# Generate TypeScript types
supabase gen types typescript --local > ../frontend/src/lib/supabase/types.ts
```

### Environment Variables

Create `.env.local` in the `frontend/` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database Schema

See `supabase/migrations/` for the complete schema:

- `profiles` - User profiles (extends auth.users)
- `properties` - Property listings
- `property_images` - Images linked to properties
- `inquiries` - Contact form and property inquiries

## Supabase Services Used

| Service | Purpose |
|---------|---------|
| **Auth** | User authentication, admin roles |
| **Database** | PostgreSQL for all data |
| **Storage** | Property image uploads |
| **Realtime** | (Future) Live updates |
