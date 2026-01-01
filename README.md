# FC Manager Monorepo

A production-ready monorepo for a football tournament manager built with Next.js (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL, and NextAuth (credentials provider).

## Project structure
- `package.json`: Workspace root with helper scripts.
- `apps/web`: Next.js application with App Router, Prisma schema, and authentication.
  - `app`: Route handlers and UI.
  - `components`: Shared UI components.
  - `src/lib`: Prisma client and NextAuth configuration.
  - `prisma`: Schema and seed script.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp apps/web/.env.example apps/web/.env
   ```
   - `DATABASE_URL` – PostgreSQL connection string
   - `NEXTAUTH_SECRET` – secret for session integrity
3. Generate the Prisma client and run migrations:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Seed the database (creates the initial admin user):
   ```bash
   npm run prisma:seed
   ```
   - Admin credentials: **admin@example.com / Admin123!**
5. Start the development server:
   ```bash
   npm run dev
   ```

## Available scripts
Executed from the repository root:
- `npm run dev` – start the Next.js dev server.
- `npm run build` – build for production.
- `npm run start` – start the production server.
- `npm run prisma:generate` – regenerate the Prisma client.
- `npm run prisma:migrate` – run Prisma migrations.
- `npm run prisma:seed` – seed the database.

## Authentication
- Credentials-based auth (email/password) using NextAuth and Prisma.
- Passwords are hashed with bcrypt.
- Roles: `user` (default) and `admin` (can approve matches).
- Protected routes are enforced via NextAuth middleware (e.g., `/dashboard`).

## Models
Prisma models: `User`, `Match`, `Tournament`, `TournamentParticipant`, plus NextAuth adapter models (`Account`, `Session`, `VerificationToken`). Matches can optionally belong to a tournament (`tournamentId`).
