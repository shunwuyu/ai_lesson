# Next.js + Prisma + MySQL + JWT Auth Starter

## Quick Start
```bash
pnpm i # or npm i / yarn
cp .env.example .env
# edit DATABASE_URL and JWT_SECRET
pnpm migrate     # prisma migrate dev
pnpm dev         # start dev server
```

Routes:
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/me
- POST /api/auth/logout

Protected page: `/dashboard` (middleware redirect if not authed)