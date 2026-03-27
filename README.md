# JN Developer Platform

Modern personal site + admin CMS built with Next.js, Prisma, and TypeScript.

This project gives you two apps in one codebase:
- Public website for portfolio content
- Private admin panel to manage all content without editing code

## Repository

- GitHub (SSH): git@github.com:JabesNelma/Jabes-Nelma.git
- GitHub (HTTPS): https://github.com/JabesNelma/Jabes-Nelma

## Why This Project

- Dynamic content from database (not hardcoded)
- Secure admin area with authentication
- Clean component structure (public, admin, ui)
- Ready to extend for personal brand, agency profile, or portfolio CMS

## Main Features

### Public Site
- Home page with hero, featured projects, skills preview, and quick about
- Projects listing and project detail page
- Skills page and experience timeline
- Blog listing and blog detail page
- Contact form submission

### Admin CMS
- Admin login at /internal-portal-xyz/login
- Dashboard with statistics
- CRUD for projects, skills, experience, blog posts, messages
- Publish/unpublish controls for content

### Backend/API
- Public API routes for website content
- Protected admin API routes for CMS operations
- JWT session cookie auth

## Tech Stack

### Core
- Next.js 16 (App Router)
- React 19
- TypeScript

### UI and Styling
- Tailwind CSS 4
- shadcn/ui + Radix UI
- Framer Motion
- Lucide React icons

### Data and Validation
- Prisma ORM
- MySQL datasource (schema currently uses provider = mysql)
- React Hook Form + Zod
- TanStack Table / React Query

### Auth and Security
- JWT (jsonwebtoken)
- bcrypt password hashing
- Route protection via middleware

## Project Structure

    src/
      app/
        (public)/               # Public pages
        internal-portal-xyz/    # Admin pages
        api/                    # Route handlers
      components/
        public/
        admin/
        ui/
      lib/
      hooks/
      types/
    prisma/
      schema.prisma
      seed.ts

## Quick Start (Local)

### 1. Clone

    git clone https://github.com/JabesNelma/Jabes-Nelma.git
    cd Jabes-Nelma

Or use SSH:

    git clone git@github.com:JabesNelma/Jabes-Nelma.git
    cd Jabes-Nelma

### 2. Install dependencies

    npm install

### 3. Configure environment

Create .env in project root (or update existing one):

    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB_NAME"
    ADMIN_EMAIL="admin@portfolio.com"
    ADMIN_PASSWORD="Admin123!"
    ADMIN_NAME="Admin"
    JWT_SECRET="replace-with-long-random-secret"

Notes:
- DATABASE_URL is required
- JWT_SECRET is strongly recommended (especially production)

### 4. Generate Prisma Client + sync schema

    npm run db:generate
    npm run db:push

### 5. Seed initial admin

    npm run db:seed

### 6. Run app

    npm run dev

Open:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/internal-portal-xyz/login

Default admin (from seed/env):
- Email: admin@portfolio.com
- Password: Admin123!

Important: change admin credentials immediately after first login/use.

## Available Scripts

- npm run dev: start development server
- npm run build: production build
- npm run start: run production server
- npm run lint: run ESLint
- npm run db:generate: generate Prisma client
- npm run db:push: sync schema directly to database
- npm run db:migrate: create/apply migrations in dev
- npm run db:reset: reset database (dangerous for production)
- npm run db:seed: run seed script
- npm run db:migrate:legacy: migrate legacy content source

## API Overview

### Public Endpoints
- GET /api/public/projects
- GET /api/public/projects/[id]
- GET /api/public/featured-projects
- GET /api/public/skills
- GET /api/public/skills-preview
- GET /api/public/experience
- GET /api/public/blog
- GET /api/public/blog/[slug]
- GET /api/public/site-config
- GET /api/public/social-links
- POST /api/public/contact

### Auth Endpoints
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Admin Endpoints (Protected)
- /api/admin/projects
- /api/admin/skills
- /api/admin/experience
- /api/admin/blog
- /api/admin/messages
- /api/admin/stats

## Database Models

Current Prisma models:
- User
- SiteConfig
- Project
- Skill
- Experience
- Message
- BlogPost
- SocialLink

See full schema in prisma/schema.prisma.

## Deployment Notes

For production:
- Set NODE_ENV=production
- Set a strong JWT_SECRET
- Use production-grade MySQL-compatible database
- Ensure database network access and SSL settings are correct
- Run build before start

Example:

    npm run build
    npm run start

You can also deploy to platforms such as Vercel, as long as environment variables and database access are configured.

## Troubleshooting

### Admin login succeeds but still redirected
- Ensure auth cookie name is consistent as auth_token
- Check browser cookies and middleware behavior

### Prisma connection error
- Verify DATABASE_URL format
- Verify DB host/port/user/password
- Verify DB firewall/allowlist

### Schema changed but app still stale
- Run:

    npm run db:generate
    npm run db:push

### UI changes not appearing
- Restart dev server
- Clear .next cache if needed

## Customization Guide

You can customize quickly via admin panel:
- Site title and description
- About text and profile data
- Projects, skills, experience, blog content
- Contact/social links

Branding points in code:
- Public navbar branding in src/components/public/public-nav.tsx
- Metadata title/description in src/app/layout.tsx

## Who Can Use This

- Developers wanting a personal site + CMS starter
- Freelancers/agencies needing editable portfolio pages
- Teams learning modern Next.js + Prisma architecture

## Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Open pull request

## License

Add your preferred license (MIT recommended) if you want open-source reuse clarity.

---

Built to be practical, extensible, and production-friendly.
