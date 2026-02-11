# 🚀 Jabes Nelma — Portfolio

A modern, animated developer portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features scroll-triggered animations, interactive skill tooltips, 3D background effects, and a fully data-driven architecture.

🔗 **Live:** [jabesnelma-portfolio.vercel.app](https://jabesnelma-portfolio.vercel.app)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Scroll Animations** | Framer Motion `whileInView` — fade-up, slide, scale-in, stagger effects on every section |
| **Interactive Skills** | Hover any skill badge to see which projects use that technology |
| **Expandable Tech Tags** | "+N more" button on project cards expands to show all technologies |
| **3D Background** | WebGL particle background using Three.js |
| **Logo Marquee** | Auto-scrolling tech logo loop with pause-on-hover |
| **Typing Effect** | Auto-typing hero subtitle with cursor blink |
| **Profile Card** | 3D tilt card with avatar and contact CTA |
| **Stat Counters** | Animated number counters for projects, technologies, and experience |
| **Smooth Scroll** | CSS `scroll-behavior: smooth` + section glow dividers |
| **Responsive** | Fully responsive design — mobile, tablet, and desktop |
| **Data-Driven** | All content managed from a single `content.ts` file |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 3 |
| **Animations** | Framer Motion 11, GSAP |
| **3D / WebGL** | Three.js |
| **Icons** | React Icons (FontAwesome, Simple Icons) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, smooth scroll, section dividers
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page — assembles all sections
├── components/
│   ├── background/
│   │   └── ReactBitsBackground.tsx   # WebGL particle background
│   ├── layout/
│   │   └── Navbar.tsx                # Fixed navbar with GooeyNav
│   ├── sections/
│   │   ├── Hero.tsx          # Hero section with typing effect
│   │   ├── About.tsx         # About + profile card + stat counters
│   │   ├── Projects.tsx      # Project grid with expandable tech tags
│   │   ├── Skills.tsx        # Skill categories with hover tooltips
│   │   └── Contact.tsx       # Contact links + current focus
│   └── ui/
│       ├── GooeyNav.tsx      # Liquid gooey navigation component
│       ├── LogoLoop.tsx      # Auto-scrolling logo marquee
│       ├── ProfileCard.tsx   # 3D tilt profile card
│       ├── SectionWrapper.tsx
│       ├── StatCard.tsx      # Animated number counter
│       └── TextType.tsx      # Typing animation component
├── data/
│   ├── content.ts            # ⭐ Single source of truth for all content
│   ├── contact.ts            # Contact data adapter
│   └── projects.ts           # Projects data adapter
└── lib/
    └── scroll.ts             # Scroll utilities
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/JabesNelma/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📝 Content Management

All displayed content is managed from a **single file**: `src/data/content.ts`

### Add a Project

Add an object to the `projects` array in `src/data/content.ts`:

```ts
{
  id: "my-project",
  title: "My New Project",
  description: "A brief description of the project.",
  year: 2026,
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
  category: ["Frontend", "API Integration"],
  repo: "https://github.com/JabesNelma/my-project",
  demo: "https://my-project.vercel.app/",
  image: "/projects/my-project.png"
}
```

### Add a Skill

Add an object to the `skills` array:

```ts
{ id: "docker", name: "Docker", category: ["backend"], level: "intermediate" }
```

Available categories: `frontend`, `backend`, `web3`, `api`

### Update Contact / Profile

Edit the `info`, `contactLinks`, or `currentFocus` objects in the same file.

---

## 🎬 Animation Details

| Section | Animation Type |
|---|---|
| **Hero** | Fade-up with staggered delays on title, subtitle, and CTA buttons |
| **About** | Profile slides from left, content from right, stat cards scale-in with stagger |
| **Projects** | Cards fade-up + scale with stagger, tech badges animate on expand/collapse |
| **Skills** | Cards fade-up with stagger, icons spin-in, skill badges scale-in sequentially |
| **Contact** | Left column slides from left, right from right, social links slide-in with hover shift |

All animations use `whileInView` with `viewport={{ once: true }}` — they trigger once when scrolling into view.

---

## 🌐 Deployment

This project is configured for **Vercel** deployment:

1. Push to GitHub
2. Connect the repository on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js and deploys

Every push to `main` triggers an automatic rebuild and deployment.

---

## 📄 License

This project is open source and available for personal use and learning.

---

**Built with ❤️ by [Jabes Nelma](https://github.com/JabesNelma)**
