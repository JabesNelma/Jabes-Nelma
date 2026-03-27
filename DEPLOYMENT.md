# Deployment Guide

## Overview

This portfolio system is configured for SQLite development and PostgreSQL production. The system is designed to run on Vercel with a serverless database.

---

## 🚀 Production Deployment Steps

### 1. Prepare PostgreSQL Database

Before deploying to production, set up a PostgreSQL database. Options:

**Option A: Vercel PostgreSQL (Recommended)**
- Automatically available in Vercel projects
- Set `DATABASE_URL` environment variable in Vercel settings

**Option B: Neon.tech (Free tier available)**
- Sign up at https://neon.tech
- Create a database and copy the connection string
- Set `DATABASE_URL` to your Neon connection string

**Option C: Supabase (Free tier available)**
- Sign up at https://supabase.com
- Create a project and database
- Copy the PostgreSQL connection string
- Set `DATABASE_URL` in environment variables

**Option D: Any PostgreSQL provider**
- AWS RDS, Google Cloud SQL, DigitalOcean, etc.
- Format: `postgresql://user:password@host:port/database`

### 2. Update Schema for Production

For production deployments, edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Change `"sqlite"` to `"postgresql"`.

### 3. Set Environment Variables

In your hosting platform (e.g., Vercel):

```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secure-32-character-secret-key-here
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_NAME=Portfolio Admin
NODE_ENV=production
```

### 4. Deploy to Vercel

```bash
git push
# Vercel automatically detects changes and builds the project
```

### 5. Run Database Migrations

After deployment, run migrations in Vercel:

```bash
# From local machine, with correct DATABASE_URL set to production database:
npm run db:migrate

# Or in Vercel's command line interface
vercel env pull  # Pull production env vars
npm run db:migrate
```

### 6. Seed Initial Data

```bash
npm run db:seed
```

This creates the default admin user with credentials set in environment variables.

### 7. Access Admin Dashboard

- URL: `https://yourdomain.com/internal-portal-xyz/login`
- Email: Value from `ADMIN_EMAIL` env var
- Password: Value from `ADMIN_PASSWORD` env var

---

## 🔄 Migrating Legacy Data

If you have data from the old static portfolio, use the migration script:

```bash
# Place the old content.ts in migration-source/content.ts first
npm run db:migrate:legacy
```

This will import all projects, skills, and personal info to the database.

---

## 🔐 Security Recommendations

1. **JWT_SECRET**: Use a strong, random 32+ character secret
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Admin Password**: Change immediately after first login

3. **Database Backups**: Enable automatic backups in your database provider

4. **HTTPS**: Ensure your deployment has SSL/TLS enabled (Vercel provides this by default)

5. **Rate Limiting**: Consider adding rate limiting middleware for API endpoints

---

## 📊 Database Schema

The system includes the following models:

- **User**: Admin authentication
- **SiteConfig**: Site-wide settings (name, bio, contact info)
- **Project**: Portfolio projects
- **Skill**: Technical skills
- **Experience**: Work history
- **BlogPost**: Blog articles
- **Message**: Contact form submissions
- **SocialLink**: Social media links

---

## ⚠️ Important Notes

### SQLite Development
- SQLite is used for local development (`file:./db/portfolio.db`)
- Perfect for testing and development
- Data persists between sessions
- Not suitable for production or serverless environments

### PostgreSQL Production
- Required for serverless deployments (Vercel, etc.)
- Supports concurrent connections
- Better performance and scalability
- Required for horizontal scaling

### Schema Consistency
- Keep your local schema in sync with production
- Always run migrations before deployment
- Test migrations in a staging environment first

---

## 🔧 Troubleshooting

**"Database connection failed"**
- Verify DATABASE_URL is correct
- Check database provider is accessible
- Ensure firewall allows connections

**"PrismaClientInitializationError"**
- Run `npm run db:generate`
- Verify schema.prisma provider matches your database

**"Admin login not working"**
- Run `npm run db:seed` to create default admin
- Check ADMIN_EMAIL and ADMIN_PASSWORD env vars

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Vercel PostgreSQL](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

