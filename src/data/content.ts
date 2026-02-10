export type Social = {
  name: string;
  url: string;
  icon?: string;
};

export type Info = {
  name: string;
  role?: string;
  location?: string;
  email?: string;
  bio?: string;
  avatar?: string; // e.g. "/images/me.jpg"
  socials?: Social[];
};

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  year?: number;
  date?: string;
  tags?: string[];
  tech?: string[];
  category?: string[]; // e.g. ['backend','frontend','web3']
  client?: string;
  role?: string;
  repo?: string; // github url
  demo?: string; // live url
  image?: string; // path under /public
  featured?: boolean;
  status?: 'wip' | 'done' | 'archived';
};

export type Skill = {
  id: string;
  name: string;
  category?: string[]; // use same categories
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years?: number;
  icon?: string;
  order?: number;
};

export type ContactLink = {
  id: string;
  name: string;
  url: string;
  description: string;
  iconType: 'email' | 'github' | 'x' | 'whatsapp' | 'linkedin';
};

export type Focus = {
  id: string;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'red';
};

export const content = {
  info: {
    name: 'Jabes Nelma',
    role: 'Fullstack Developer',
    location: 'Dili, East-Timor',
    email: 'jabesnelma056@gmail.com',
    bio: 'Django / NestJS / Flask · Next.js · Flutter · Web3',
    avatar: '/images/me.jpg',
    socials: [
      { name: 'GitHub', url: 'https://github.com/JabesNelma', icon: '/icons/github.svg' },
    ],
  } as Info,

  contactLinks: [
    {
      id: 'x',
      name: 'X (Twitter)',
      url: 'https://x.com/JabesNelma',
      description: 'JabesNelma',
      iconType: 'x',
    },
    {
      id: 'gmail',
      name: 'Gmail',
      url: 'mailto:jabesnelma056@gmail.com',
      description: 'jabesnelma056@gmail.com',
      iconType: 'email',
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/JabesNelma',
      description: 'github.com/JabesNelma',
      iconType: 'github',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: 'https://wa.me/67074350912',
      description: '(+670) 74350912',
      iconType: 'whatsapp',
    },
  ] as ContactLink[],

  currentFocus: [
    {
      id: 'okly',
      title: 'OKLY Platform',
      description: 'Developing Timor Leste\'s first comprehensive ojek online platform with real-time tracking and secure payments.',
      color: 'blue',
    },
    {
      id: 'web3',
      title: 'Web3 Development',
      description: 'Exploring blockchain solutions and decentralized applications for emerging market use cases.',
      color: 'green',
    },
  ] as Focus[],

  skills: [
    { id: 'django', name: 'Django', category: ['backend'], level: 'advanced' },
    { id: 'nest', name: 'NestJS', category: ['backend'], level: 'advanced' },
    { id: 'flask', name: 'Flask', category: ['backend'], level: 'advanced' },
    { id: 'next', name: 'Next.js', category: ['frontend'], level: 'advanced' },
    { id: 'flutter', name: 'Flutter', category: ['frontend'], level: 'advanced' },
    // Custom marquee/logo loop component capability
    { id: 'logo-loop', name: 'LogoLoop Component', category: ['frontend'], level: 'advanced' },
    { id: 'ethers', name: 'ethers.js', category: ['web3'], level: 'intermediate' },
  ] as Skill[],

  projects: [
    {
      id: '1',
      title: 'Weather Insight Dashboard',
      description: 'A modern, responsive weather dashboard with beautiful visualizations and smooth animations.',
      year: 2026,
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion', 'next-themes', 'Lucide Icons', 'Recharts'],
      category: ['Frontend', 'API Integration', 'Data Visualization'],
      repo: 'https://github.com/JabesNelma/Weather-Insight',
      demo: "https://weather-insight-pi.vercel.app/",
      image: '/projects/ecommerce-api.png',
    },

    {
      id: '2',
      title: '3D Crypto Sphere Market Explorer',
      description: 'An interactive 3D web application built to visualize real-time cryptocurrency market data using Three.js and the CoinGecko Public API.',
      year: 2026,
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion', 'next-themes', 'Lucide Icons', 'Three.js', 'CoinGecko API', 'Prisma'],
      category: ['Frontend', 'API Integration', 'Data Visualization', '3D Visualization'],
      repo: 'https://github.com/JabesNelma/3D-Crypto-Sphare',
      demo: "https://3-d-crypto-sphare.vercel.app/",
      image: '/projects/ecommerce-api.png',
    },    

    {
      id: '3',
      title: 'Data Hub API',
      description: 'A Generic Open Data Backend.',
      year: 2026,
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion', 'next-themes', 'Lucide Icons', 'Three.js', 'CoinGecko API', 'Prisma', 'sqlite', 'bcrypt', 'next-auth', 'zustand', 'react-query'],
      category: ['Frontend', 'API Integration', 'Data Visualization'],
      repo: 'https://github.com/JabesNelma/data-hub-api',
      demo: "https://data-hub-api.vercel.app/",
      image: '/projects/ecommerce-api.png',
    },  
    
    {
      id: '4',
      title: 'JN - Modern Product Landing Page',
      description: 'A premium, motion-driven product landing page built with Next.js 16, Framer Motion, and Tailwind CSS. Features immersive animations, interactive product showcase, and seamless checkout experience.',
      year: 2026,
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion', 'next-themes', 'Lucide Icons', 'Three.js', 'CoinGecko API', 'Prisma', 'sqlite', 'bcrypt', 'next-auth', 'zustand', 'react-query'],
      category: ['Frontend', 'Data Visualization', '3D Visualization'],
      repo: 'https://github.com/JabesNelma/landing_page_lvl-1',
      demo: "https://landing-page-lvl-1.vercel.app/",
      image: '/projects/ecommerce-api.png',
    },  

    {
      id: '5',
      title: 'School Information System',
      description: 'Full‑stack School Information System with Flask API and Next.js App Router | adminn login (default): admin / admin123 — change after first login.',
      year: 2026,
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion', 'next-themes', 'Lucide Icons', 'Three.js', 'CoinGecko API', 'Prisma', 'sqlite', 'bcrypt', 'next-auth', 'zustand', 'react-query', 'flask', 'sqlalchemy', 'flask-restful', 'flask-jwt-extended'],
      category: ['Frontend', 'Data Visualization', '3D Visualization'],
      repo: 'https://github.com/JabesNelma/school-system',
      demo: "https://school-system-henna.vercel.app/",
      image: '/projects/ecommerce-api.png',
    },  

    {
      id: 'web3-frontend',
      title: 'Xandeum Dashboard - pNode Analytics',
      description: 'Real-time analytics dashboard for monitoring Xandeum Network pNode performance built with Next.js and TypeScript.',
      year: 2025,
      tech: ['Next.js', 'backend'],
      category: ['Frontend', 'web3'],
      repo: 'https://github.com/JabesNelma/xandeum-dashboard',
      demo: "https://xandeum-dashboard-indol.vercel.app/",
      image: '/projects/ecommerce-api.png',
    },
    {
      id: 'frontend-web2',
      title: 'JSONPlaceholder Frontend Demo',
      description: 'A cinematic frontend demo showcasing animated UI components, smooth scroll interactions, and WebGL background effects — built with Next.js 14, TypeScript, and Tailwind CSS for educational purposes.',
      year: 2026,
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis', 'WebGL (OGL)'],
      category: ['Frontend', 'UI/UX', 'Animation'],
      repo: 'https://github.com/JabesNelma/jsonplaceholder-frontend',
      demo: 'https://jsonplaceholder-frontend.vercel.app/',
      image: '/projects/jsonplaceholder-frontend.png', // pastikan file ini ada di public/projects/
    }
  ] as Project[],
};

/*
Template tambah project (copy-paste):
{
  id: "p-slug",
  title: "Judul Project",
  description: "Ringkasan singkat",
  year: 2025,
  tech: ["Next.js","ethers.js"],
  category: ["frontend","web3"],
  repo: "https://github.com/...",
  demo: "https://...",
  image: "/projects/your-image.png"
}
*/

export default content;
