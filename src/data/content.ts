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
      id: 'fullstack-growth',
      title: 'Full Stack Growth',
      description: 'Continuously improving as a Junior Full Stack Developer while preparing to grow into a Senior Full Stack Developer.',
      color: 'blue',
    },
    {
      id: 'web3',
      title: 'Web3 & Distributed Systems',
      description: 'Exploring emerging technologies such as Web3 and modern distributed systems for scalable, future-ready applications.',
      color: 'green',
    },
    {
      id: 'scalable-apps',
      title: 'Scalable Applications',
      description: 'Building efficient, scalable, and maintainable applications using modern full stack architectures.',
      color: 'purple',
    },
  ] as Focus[],

  skills: [
    { id: 'django', name: 'Django', category: ['backend'], level: 'advanced' },
    { id: 'nest', name: 'NestJS', category: ['backend'], level: 'advanced' },
    { id: 'flask', name: 'Flask', category: ['backend'], level: 'advanced' },
    { id: 'next', name: 'Next.js', category: ['frontend'], level: 'advanced' },
    { id: 'flutter', name: 'Flutter', category: ['frontend'], level: 'advanced' },
    { id: 'logo-loop', name: 'LogoLoop Component', category: ['frontend'], level: 'advanced' },
    { id: 'ethers', name: 'ethers.js', category: ['web3'], level: 'intermediate' },
    // API Integration skills
    { id: 'rest-api', name: 'REST API', category: ['api'], level: 'advanced' },
    { id: 'coingecko', name: 'CoinGecko API', category: ['api'], level: 'advanced' },
    { id: 'spacex-api', name: 'SpaceX API', category: ['api'], level: 'advanced' },
    { id: 'weather-api', name: 'Weather API', category: ['api'], level: 'advanced' },
    { id: 'prisma', name: 'Prisma', category: ['api', 'backend'], level: 'advanced' },
    { id: 'next-auth', name: 'NextAuth', category: ['api'], level: 'intermediate' },
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
      id: 'f',
      title: 'SpaceX Intelligence Dashboard',
      description: '🚀 Real-time aerospace analytics platform with 3D Earth visualization, interactive charts, and live launch data powered by Next.js, Three.js & the SpaceX API.',
      year: 2026,
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion', 'next-themes', 'Lucide Icons', 'Three.js', 'CoinGecko API', 'Prisma'],
      category: ['Frontend', 'API Integration', 'Data Visualization', '3D Visualization'],
      repo: 'https://github.com/JabesNelma/SpaceX-Intelligence-Dashboard',
      demo: "https://space-x-intelligence-dashboard.vercel.app/",
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
    },

    {
      id: 'lat3-py',
      title: 'Aplikasi Cuaca Gratis (Free Weather App)',
      description: 'Aplikasaun deskritivu ba tempu real neebé uza Python no Tkinter. Husi API Open-Meteo (gratis, la presiza API key). Aprende integrasaun API ho projetu ida-nee.',
      year: 2023,
      tech: ['Python', 'Tkinter (built-in)'],
      category: ['Application', 'Desktop'],
      repo: 'https://github.com/JabesNelma/aprende-api-klima-python',
      //demo: 'https://jsonplaceholder-frontend.vercel.app/',
      image: '/projects/jsonplaceholder-frontend.png', // pastikan file ini ada di public/projects/
    },

    {
      id: 'lat1-py',
      title: 'Plate Rental System (Sistema Aluga Bikan)',
      description: 'Halo sistema ba Rental Bikan uza python.',
      year: 2022,
      tech: ['Python', 'Tkinter (built-in)', 'datetime module'],
      category: ['Application', 'Desktop'],
      repo: 'https://github.com/JabesNelma/Latihan-1-python-',
      //demo: 'https://jsonplaceholder-frontend.vercel.app/',
      image: '/projects/jsonplaceholder-frontend.png', // pastikan file ini ada di public/projects/
    },
    {
      id: 'lat1-html',
      title: 'Python from Scratch: Beginner Learning Project',
      description: 'A beginners Python learning project created in 2021, featuring practice exercises and notes covering fundamental to intermediate concepts. Based on tutorials from Petani Kode (https://www.petanikode.com/tutorial/python/). For educational purposes only.',
      year: 2021,
      tech: ['Python'],
      category: ['Learning', 'Education'],
      repo: 'https://github.com/JabesNelma/learning-python',
      //demo: 'https://jsonplaceholder-frontend.vercel.app/',
      image: '/projects/jsonplaceholder-frontend.png', // pastikan file ini ada di public/projects/
    },
    {
      id: 'lat1-html',
      title: 'project portfolio website laerning with Petani Code',
      description: 'this is my first proyek when I learning with Petani code.',
      year: 2021,
      tech: ['HTML', 'CSS', 'JavaScript'],
      category: ['Frontend', 'Web Design'],
      repo: 'https://github.com/JabesNelma/Latihan-1-Html-Css-Js-',
      //demo: 'https://jsonplaceholder-frontend.vercel.app/',
      image: '/projects/jsonplaceholder-frontend.png', // pastikan file ini ada di public/projects/
    },
    {
      id: 'learning js',
      title: 'JavaScript from Scratch: Beginner Learning Project',
      description: 'A beginners JavaScript learning project created in 2021, featuring practice exercises covering fundamental concepts. Based on tutorials from Petani Kode. For educational purposes only.',
      year: 2021,
      tech: ['HTML', 'CSS', 'JavaScript'],
      category: ['Frontend', 'Web Design'],
      repo: 'https://github.com/JabesNelma/aprende-javascript',
      //demo: 'https://jsonplaceholder-frontend.vercel.app/',
      image: '/projects/jsonplaceholder-frontend.png', // pastikan file ini ada di public/projects/
    },
    {
      id: 'learning css',
      title: 'CSS Learning Project: Web Design School Curriculum & Petani Kode Tutorials',
      description: 'A beginners CSS learning project created in 2021 during high school Web Design classes, featuring practice exercises from both school curriculum and Petani Kode tutorials. Covers fundamental CSS concepts for educational purposes only.',
      year: 2020,
      tech: ['HTML', 'CSS', 'learning'],
      category: ['Frontend', 'Web Design'],
      repo: 'https://github.com/JabesNelma/aprende-css',
      //demo: 'https://jsonplaceholder-frontend.vercel.app/',
      image: '/projects/jsonplaceholder-frontend.png', // pastikan file ini ada di public/projects/
    },
    {
      id: 'learning html',
      title: 'My First & Most Beloved HTML Project: High School Web Design & Petani Kode Learning (2020)',
      description: 'My first HTML learning project created in 2020 during high school (class 1), combining Web Design curriculum from school and Petani Kode tutorials. This was my most cherished learning experience at the time, featuring foundational HTML practices for educational purposes only. 🌟',
      year: 2020,
      tech: ['HTML', 'CSS'],
      category: ['Frontend', 'Web Design', 'Learning'],
      repo: 'https://github.com/JabesNelma/Aprende-Html',
      //demo: 'https://jsonplaceholder-frontend.vercel.app/',
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
