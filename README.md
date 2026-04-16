# Qards

Qards is a web app for creating and sharing a digital business card with a single QR code.
Each **Qard** is a link to your social profile, project, or website. You manage your list in a dashboard, and people can open your public profile page and scan or click your links.

## Core Functionality

- OAuth authentication with **GitHub** and **Google** (NextAuth)
- User profile setup/edit (username, name, company, role)
- CRUD for Qards (create, update, delete)
- Drag-and-drop reorder for Qards
- Public user page: `/{username}` with profile card and QR blocks
- Light/Dark/System theme switching
- Cookie consent banner

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **NextAuth v4** (`next-auth@^4.24.11`) + Prisma Adapter
- **Prisma** + **MongoDB**
- **Tailwind CSS v4**
- **Radix UI / shadcn-style UI components**
- **react-hook-form** for forms
- **@hello-pangea/dnd** for drag-and-drop sorting
- **next-qrcode** for QR generation

## API Surface (high level)

- `app/api/auth/[...nextauth]` — auth handlers
- `app/api/user` — profile update (authorized)
- `app/api/qard` — Qard CRUD + reorder (authorized)
- `app/api/user/[uid]` — public user fetch by id

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Configure environment

Copy `.env.example` to `.env` and set values:

- `DATABASE_URL`
- `JWT_SIGNING_PRIVATE_KEY`
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_SITE_URL`

### 3) Run in development

```bash
npm run dev
```

Open: `http://localhost:3000`

## Available Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint
- `npm run format` / `npm run format:check`
- `npm run test:run` — unit/integration tests (Vitest)
- `npm run test:coverage` — coverage report
- `npm run test:e2e` — Playwright E2E tests
- `npm run test:e2e:ui` — Playwright UI mode

## Testing

The project includes:

- **Vitest** tests for utilities, components, and API routes
- **Playwright** E2E tests for critical user flows (public landing, redirects, sign-in entry points)

## Project Status

Qards is actively evolving. Core flows are implemented and covered by automated tests, while UX and feature set continue to improve.
