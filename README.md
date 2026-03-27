# Developer Portfolio Platform - Production Ready CMS

A modern, full-stack developer portfolio system built with **Next.js, Prisma, and TypeScript**. Features a powerful admin CMS dashboard for managing portfolio content dynamically without any hardcoded data.

## 🎯 Features

### 🌐 Public Portfolio (Dynamic)
- **Homepage**: Showcase featured projects, skills, and personal info
- **Projects Page**: Display all portfolio projects with filtering
- **Skills Section**: Categorized technical skills with proficiency levels
- **Experience Timeline**: Work history and professional experience
- **Blog System**: Write and publish articles with markdown support
- **Contact Form**: Receive and manage contact messages
- **Social Links**: Display and manage social media profiles

### 🔐 Admin Dashboard (`/internal-portal-xyz`)
- **Protected Authentication**: JWT-based admin login with secure sessions
- **Project Management**: Create, edit, publish, and organize projects
- **Skills Manager**: Add/edit technical skills with categories and proficiency
- **Experience Editor**: Manage work history and roles
- **Blog CMS**: Rich text editor for blog posts with SEO support
- **Message Inbox**: Receive and manage contact form submissions
- **Messages**: Real-time message handling
- **Statistics Dashboard**: View portfolio stats and analytics

### 💾 Database Models
- **User**: Admin authentication and profiles
- **SiteConfig**: Site-wide configuration (name, bio, contact info)
- **Project**: Portfolio projects with images, tech stack, links
- **Skill**: Technical skills with categories and proficiency
- **Experience**: Work history with dates and technologies
- **BlogPost**: Blog articles with markdown content and publishing
- **Message**: Contact form messages
- **SocialLink**: Social media profiles and links

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm or yarn
- **SQLite** (automatic, included) for development
- **PostgreSQL** (for production deployment)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Jabes-Nelma

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local

# Initialize database
npm run db:generate
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` for the portfolio and `/internal-portal-xyz/login` for admin.

**Default Admin Credentials:**
- Email: `admin@portfolio.com`
- Password: `Admin123!`

> ⚠️ Change these immediately after first login!

## 🗄️ Database Setup

### Development (Local SQLite)
```bash
npm run db:push       # Create/sync database
npm run db:seed       # Seed initial admin user
npm run db:migrate:legacy  # Import legacy portfolio data (if available)
```

### Production (PostgreSQL)

1. **Edit schema provider** (requires code change for production):
```prisma
datasource db {
  provider = "postgresql"  # Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

2. **Set environment variables:**
```bash
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-32-character-secret-key
```

3. **Run migrations:**
```bash
npm run db:migrate
npm run db:seed
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production setup instructions.

## 🔄 Data Migration

If you have existing portfolio data in a `content.ts` file:

1. Place file at `migration-source/content.ts`
2. Run migration script:
```bash
npm run db:migrate:legacy
```

This imports all projects, skills, and personal info to the database automatically.

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public portfolio pages
│   │   ├── page.tsx       # Homepage (fetches from API)
│   │   ├── projects/      # Projects page
│   │   ├── skills/        # Skills page
│   │   └── experience/    # Experience page
│   ├── internal-portal-xyz/  # Admin dashboard (protected)
│   │   ├── login/         # Admin login
│   │   ├── projects/      # Project management
│   │   ├── skills/        # Skills management
│   │   ├── experience/    # Experience management
│   │   ├── blog/          # Blog management
│   │   └── messages/      # Message inbox
│   ├── api/
│   │   ├── public/        # Public API endpoints
│   │   │   ├── projects/  # GET projects
│   │   │   ├── skills/    # GET skills
│   │   │   ├── experience/ # GET experience
│   │   │   └── site-config/ # GET site settings
│   │   ├── auth/          # Authentication
│   │   │   └── login/     # POST login
│   │   └── admin/         # Admin API (protected)
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles
├── lib/
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Prisma client singleton
│   └── utils.ts          # Helper functions
├── components/
│   ├── public/           # Public page sections
│   ├── admin/            # Admin dashboard components
│   └── ui/               # Reusable UI components (shadcn/ui)
└── types/
    └── auth.ts           # TypeScript types
```

## 🔌 API Endpoints

### Public API (No Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/projects` | All published projects |
| GET | `/api/public/featured-projects` | Featured projects only |
| GET | `/api/public/projects/:id` | Single project |
| GET | `/api/public/skills` | All skills by category |
| GET | `/api/public/skills-preview` | Top skills preview |
| GET | `/api/public/experience` | Work experience |
| GET | `/api/public/blog` | All published blog posts |
| GET | `/api/public/blog/:slug` | Single blog post |
| GET | `/api/public/site-config` | Site configuration |
| GET | `/api/public/social-links` | Social media links |
| POST | `/api/public/contact` | Submit contact form |

### Admin API (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |
| GET | `/api/auth/me` | Current user info |
| POST/PUT | `/api/admin/projects` | Manage projects |
| POST/PUT | `/api/admin/skills` | Manage skills |
| POST/PUT | `/api/admin/experience` | Manage experience |
| GET | `/api/admin/messages` | Inbox |
| POST/PUT | `/api/admin/blog` | Manage blog posts |

## 🔐 Security

- **JWT Authentication**: Secure token-based admin sessions
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Middleware prevents unauthorized access to admin pages
- **Environment Variables**: Sensitive data in environment, not in code
- **HTTPS Only**: Secure cookies in production
- **CORS**: Configured for same-origin requests

## 🎨 Customization

### Change Admin URL
Edit `src/middleware.ts`:
```typescript
const ADMIN_ROUTE = '/your-custom-admin-path'
```

### Update Admin Credentials on Start
Set environment variables:
```bash
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_NAME="Your Name"
```

### Customize Site Settings
Use admin dashboard or directly update `SiteConfig` table:
- Site name and description
- Owner bio, location, experience
- Hero section introduction
- Contact information

## 📊 Performance

- **Next.js 16 with Turbopack**: Ultra-fast builds and HMR
- **API Route Optimization**: Efficient database queries
- **Image Optimization**: Automatic image resizing and CDN support
- **Caching**: Server-side caching for better performance
- **Database Indexes**: Optimized queries on common fields

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel settings:
   ```
   DATABASE_URL=your-postgresql-url
   JWT_SECRET=your-secret
   ```
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Other Platforms

Works with any Node.js hosting that supports:
- Next.js applications
- PostgreSQL databases
- Environment variables

## 🛠️ Development

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Database commands
npm run db:migrate      # Create new migrations
npm run db:push         # Sync schema without migrations
npm run db:seed         # Run seed script
npm run db:reset        # Reset database (dev only)
```

## 📚 Technologies

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Database**: Prisma ORM with SQLite/PostgreSQL
- **Authentication**: JWT with bcrypt
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod validation
- **Data**: TanStack Query, Zustand

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

## 🐛 Troubleshooting

### "Database connection failed"
- Verify `DATABASE_URL` is correct
- Ensure database server is running and accessible
- Check firewall rules allow connections

### "Admin login not working"
- Run `npm run db:seed` to create/reset admin
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars
- Check JWT_SECRET is set

### "API returns 401 Unauthorized"
- Ensure you're logged in to admin panel
- Check auth token in cookies
- Verify JWT_SECRET matches between login and API

### Build errors
- Delete `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Regenerate Prisma client: `npm run db:generate`

## 📝 License

This project is part of a professional portfolio system. Please respect copyright and licensing agreements.

## 🤝 Support

For issues, questions, or contributions, please open an issue or contact the maintainer.

---

**Made with ❤️ for professional developers**
