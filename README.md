# Kencana Property

Multi-city property listing website (real estate marketplace) focused on Yogyakarta, Indonesia.

## Project Structure

```
kencana-property/
├── frontend/          # Next.js 16 application
├── backend/           # Supabase configuration & migrations
├── docs/              # Project documentation
└── README.md          # This file
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Supabase (Auth, PostgreSQL, Storage) |
| Deployment | Vercel (frontend) + Supabase (backend) |

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local  # Configure your env variables
npm run dev
```

### Backend Setup

See [backend/README.md](backend/README.md) for Supabase setup instructions.

## Documentation

- [Project Documentation](docs/DOCUMENTATION.md) - Overall project overview
- [Phase 1 Backend Plan](docs/PHASE-1-BACKEND-PLAN.md) - Backend implementation plan

## Development Phases

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Done | Homepage |
| Phase 2 | ✅ Done | Property Listing Page |
| Phase 3 | ✅ Done | Property Detail Page |
| Phase 4 | 🚧 In Progress | Backend Foundation (Supabase) |
| Phase 5 | ⏳ Pending | Admin Authentication |
| Phase 6 | ⏳ Pending | Admin Dashboard |
| Phase 7 | ⏳ Pending | Property Management |

## License

Private - All rights reserved
