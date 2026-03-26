import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const projectPlaceholderImage = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop"

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10)

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      role: "admin",
    },
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Jabes Nelma",
      role: "admin",
    },
  })

  await prisma.legacyContactLink.deleteMany()
  await prisma.legacyFocusItem.deleteMany()
  await prisma.legacyPrinciple.deleteMany()
  await prisma.legacyAboutParagraph.deleteMany()
  await prisma.project.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.socialLink.deleteMany()
  await prisma.currentFocus.deleteMany()
  await prisma.about.deleteMany()
  await prisma.siteConfig.deleteMany()

  const aboutParagraphs = [
    "I am a Junior Full Stack Developer with strong programming fundamentals and an adaptive engineering mindset. My journey in technology began in high school at ETI (Eskola Teknika Informatica) - Baucau, where I was formally introduced to web development through subjects such as Web Design (Dezenhu Website), learning HTML, CSS, and PHP. From an early stage, I was exposed not only to building interfaces but also to understanding how systems are structured.",
    "My academic focus was on programming, where we studied fundamental concepts using Pascal - a strict and structured language that significantly strengthened my logical thinking and problem-solving abilities. Although Pascal is considered traditional, it gave me a deep understanding of core programming principles. This foundation made it easier for me to transition into modern languages, as I strongly believe that programming logic remains consistent - only syntax differs.",
    "Beyond formal education, I actively expanded my knowledge independently. I learned JavaScript and Python through self-study, particularly from resources like Petani Kode (https://www.petanikode.com/tutorial/), which helped me strengthen my understanding of modern programming practices. This self-driven learning approach shaped my adaptability and ability to quickly migrate between technologies.",
    "My experience with Object-Oriented Programming (OOP) started in high school through the POO subject. For my final professional examination (Prova Aptidaun Profesional), I worked on an information system project using Visual Basic integrated with Microsoft Access, where I deepened my understanding of database systems and backend logic. This experience solidified my full stack perspective - from user interface to database design and system architecture.",
    "When I entered university, I realized that I was not starting from zero. Instead, I was transitioning. With strong fundamentals in logic, OOP, and databases, adapting to modern stacks became a matter of syntax adjustment and architectural refinement.",
    "Currently, I focus on continuously improving as a Junior Full Stack Developer while preparing myself to grow into a Senior Full Stack Developer. I am particularly interested in exploring emerging technologies such as Web3 and modern distributed systems, aiming to build scalable, efficient, and future-ready applications.",
  ]

  const principles = [
    "Prioritize security and privacy in every solution",
    "Focus on accessibility and inclusive design",
    "Build for scalability and maintainability",
    "Contribute to open-source and community growth",
  ]

  const focusItems = [
    {
      title: "Full Stack Growth",
      description:
        "Continuously improving as a Junior Full Stack Developer while preparing to grow into a Senior Full Stack Developer.",
    },
    {
      title: "Web3 and Distributed Systems",
      description:
        "Exploring emerging technologies such as Web3 and modern distributed systems for scalable, future-ready applications.",
    },
    {
      title: "Scalable Applications",
      description:
        "Building efficient, scalable, and maintainable applications using modern full stack architectures.",
    },
  ]

  const contactLinks = [
    {
      platform: "X",
      url: "https://x.com/JabesNelma",
      description: "JabesNelma",
      icon: "Twitter",
    },
    {
      platform: "Gmail",
      url: "mailto:jabesnelma056@gmail.com",
      description: "jabesnelma056@gmail.com",
      icon: "Mail",
    },
    {
      platform: "GitHub",
      url: "https://github.com/JabesNelma",
      description: "github.com/JabesNelma",
      icon: "Github",
    },
    {
      platform: "WhatsApp",
      url: "https://wa.me/67074350912",
      description: "(+670) 74350912",
      icon: "MessageCircle",
    },
  ]

  const projects = [
    {
      id: "weather-insight-dashboard",
      title: "Weather Insight Dashboard",
      description:
        "A modern, responsive weather dashboard with beautiful visualizations and smooth animations.",
      projectUrl: "https://weather-insight-pi.vercel.app/",
      repoUrl: "https://github.com/JabesNelma/Weather-Insight",
      type: "client",
      featured: true,
      tags: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Shadcn/UI",
        "Framer Motion",
        "next-themes",
        "Lucide Icons",
        "Recharts",
      ],
    },
    {
      id: "crypto-sphere-market-explorer",
      title: "3D Crypto Sphere Market Explorer",
      description:
        "An interactive 3D web application built to visualize real-time cryptocurrency market data using Three.js and the CoinGecko Public API.",
      projectUrl: "https://3-d-crypto-sphare.vercel.app/",
      repoUrl: "https://github.com/JabesNelma/3D-Crypto-Sphare",
      type: "client",
      featured: true,
      tags: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Shadcn/UI",
        "Framer Motion",
        "next-themes",
        "Three.js",
        "CoinGecko API",
        "Prisma",
      ],
    },
    {
      id: "spacex-intelligence-dashboard",
      title: "SpaceX Intelligence Dashboard",
      description:
        "Real-time aerospace analytics platform with 3D Earth visualization, interactive charts, and live launch data powered by Next.js, Three.js and the SpaceX API.",
      projectUrl: "https://space-x-intelligence-dashboard.vercel.app/",
      repoUrl: "https://github.com/JabesNelma/SpaceX-Intelligence-Dashboard",
      type: "client",
      featured: true,
      tags: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Shadcn/UI",
        "Framer Motion",
        "Three.js",
        "SpaceX API",
        "Prisma",
      ],
    },
    {
      id: "data-hub-api",
      title: "Data Hub API",
      description: "A Generic Open Data Backend.",
      projectUrl: "https://data-hub-api.vercel.app/",
      repoUrl: "https://github.com/JabesNelma/data-hub-api",
      type: "client",
      featured: true,
      tags: [
        "Next.js",
        "TypeScript",
        "React",
        "Prisma",
        "SQLite",
        "bcrypt",
        "next-auth",
        "zustand",
        "react-query",
      ],
    },
    {
      id: "jn-modern-product-landing-page",
      title: "JN - Modern Product Landing Page",
      description:
        "A premium motion-driven product landing page built with Next.js, Framer Motion, and Tailwind CSS. Features immersive animations, interactive product showcase, and seamless checkout experience.",
      projectUrl: "https://landing-page-lvl-1.vercel.app/",
      repoUrl: "https://github.com/JabesNelma/landing_page_lvl-1",
      type: "client",
      featured: true,
      tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "school-information-system",
      title: "School Information System",
      description:
        "Full-stack School Information System with Flask API and Next.js App Router. Default admin login: admin / admin123 (change after first login).",
      projectUrl: "https://school-system-henna.vercel.app/",
      repoUrl: "https://github.com/JabesNelma/school-system",
      type: "client",
      featured: false,
      tags: [
        "Next.js",
        "TypeScript",
        "Flask",
        "SQLAlchemy",
        "flask-restful",
        "flask-jwt-extended",
      ],
    },
    {
      id: "xandeum-dashboard-pnode-analytics",
      title: "Xandeum Dashboard - pNode Analytics",
      description:
        "Real-time analytics dashboard for monitoring Xandeum Network pNode performance built with Next.js and TypeScript.",
      projectUrl: "https://xandeum-dashboard-indol.vercel.app/",
      repoUrl: "https://github.com/JabesNelma/xandeum-dashboard",
      type: "client",
      featured: false,
      tags: ["Next.js", "TypeScript", "Web3", "Analytics"],
    },
    {
      id: "jsonplaceholder-frontend-demo",
      title: "JSONPlaceholder Frontend Demo",
      description:
        "A cinematic frontend demo showcasing animated UI components, smooth scroll interactions, and WebGL background effects built with Next.js, TypeScript, and Tailwind CSS.",
      projectUrl: "https://jsonplaceholder-frontend.vercel.app/",
      repoUrl: "https://github.com/JabesNelma/jsonplaceholder-frontend",
      type: "client",
      featured: false,
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "WebGL"],
    },
    {
      id: "free-weather-app-python",
      title: "Aplikasi Cuaca Gratis (Free Weather App)",
      description:
        "A desktop weather app using Python and Tkinter with Open-Meteo API integration.",
      projectUrl: null,
      repoUrl: "https://github.com/JabesNelma/aprende-api-klima-python",
      type: "learning",
      featured: false,
      tags: ["Python", "Tkinter", "Open-Meteo API"],
    },
    {
      id: "plate-rental-system",
      title: "Plate Rental System (Sistema Aluga Bikan)",
      description: "A rental management desktop app built with Python.",
      projectUrl: null,
      repoUrl: "https://github.com/JabesNelma/Latihan-1-python-",
      type: "learning",
      featured: false,
      tags: ["Python", "Tkinter", "datetime"],
    },
    {
      id: "python-from-scratch-learning",
      title: "Python from Scratch: Beginner Learning Project",
      description:
        "A beginner Python learning project created in 2021 with exercises and notes based on Petani Kode tutorials.",
      projectUrl: null,
      repoUrl: "https://github.com/JabesNelma/learning-python",
      type: "learning",
      featured: false,
      tags: ["Python", "Education", "Petani Kode"],
    },
    {
      id: "first-portfolio-learning-project",
      title: "Project Portfolio Website Learning with Petani Kode",
      description: "This is my first project while learning with Petani Kode.",
      projectUrl: null,
      repoUrl: "https://github.com/JabesNelma/Latihan-1-Html-Css-Js-",
      type: "learning",
      featured: false,
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: "javascript-from-scratch-learning",
      title: "JavaScript from Scratch: Beginner Learning Project",
      description:
        "A beginner JavaScript learning project created in 2021 with practice exercises based on Petani Kode tutorials.",
      projectUrl: null,
      repoUrl: "https://github.com/JabesNelma/aprende-javascript",
      type: "learning",
      featured: false,
      tags: ["HTML", "CSS", "JavaScript", "Education"],
    },
    {
      id: "css-learning-project",
      title: "CSS Learning Project: Web Design School Curriculum and Petani Kode Tutorials",
      description:
        "A beginner CSS learning project created in 2021 during high school web design classes and Petani Kode tutorials.",
      projectUrl: null,
      repoUrl: "https://github.com/JabesNelma/aprende-css",
      type: "learning",
      featured: false,
      tags: ["HTML", "CSS", "Learning"],
    },
    {
      id: "first-html-project-2020",
      title: "My First HTML Project: High School Web Design and Petani Kode Learning (2020)",
      description:
        "My first HTML learning project created in 2020 during high school, combining school curriculum and Petani Kode tutorials.",
      projectUrl: null,
      repoUrl: "https://github.com/JabesNelma/Aprende-Html",
      type: "learning",
      featured: false,
      tags: ["HTML", "CSS", "Learning"],
    },
  ]

  const skills = [
    { id: "skill-nextjs", name: "Next.js", category: "Frontend", level: 5, icon: "Globe", order: 1 },
    { id: "skill-flutter", name: "Flutter", category: "Frontend", level: 4, icon: "Smartphone", order: 2 },
    { id: "skill-logoloop", name: "LogoLoop Component", category: "Frontend", level: 3, icon: "Component", order: 3 },
    { id: "skill-django", name: "Django", category: "Backend", level: 4, icon: "Server", order: 4 },
    { id: "skill-nestjs", name: "NestJS", category: "Backend", level: 4, icon: "Boxes", order: 5 },
    { id: "skill-flask", name: "Flask", category: "Backend", level: 4, icon: "FlaskConical", order: 6 },
    { id: "skill-prisma", name: "Prisma", category: "Backend", level: 4, icon: "Database", order: 7 },
    { id: "skill-ethers", name: "ethers.js", category: "Web3", level: 3, icon: "Link", order: 8 },
    { id: "skill-rest-api", name: "REST API", category: "API Integration", level: 5, icon: "Plug", order: 9 },
    { id: "skill-coingecko", name: "CoinGecko API", category: "API Integration", level: 4, icon: "Activity", order: 10 },
    { id: "skill-spacex-api", name: "SpaceX API", category: "API Integration", level: 4, icon: "Rocket", order: 11 },
    { id: "skill-weather-api", name: "Weather API", category: "API Integration", level: 4, icon: "Cloud", order: 12 },
    { id: "skill-nextauth", name: "NextAuth", category: "API Integration", level: 4, icon: "Shield", order: 13 },
  ]

  const combinedBio = [
    "Junior Full Stack Developer focused on learning, growing, and building secure, scalable solutions for emerging markets like Timor Leste.",
    ...aboutParagraphs,
  ].join("\n\n")

  await prisma.about.create({
    data: {
      id: "default-about",
      bio: combinedBio,
      avatarUrl: "/1.jpg",
      email: "jabesnelma056@gmail.com",
      phone: "+67074350912",
      location: "Timor Leste",
    },
  })

  await prisma.currentFocus.create({
    data: {
      id: "default-focus",
      title: focusItems[0].title,
      description: focusItems[0].description,
      icon: "Target",
    },
  })

  for (let i = 0; i < skills.length; i += 1) {
    await prisma.skill.create({
      data: skills[i],
    })
  }

  for (let i = 0; i < contactLinks.length; i += 1) {
    await prisma.socialLink.create({
      data: {
        platform: contactLinks[i].platform,
        url: contactLinks[i].url,
        icon: contactLinks[i].icon,
        order: i + 1,
      },
    })

    await prisma.legacyContactLink.create({
      data: {
        order: i + 1,
        platform: contactLinks[i].platform,
        url: contactLinks[i].url,
        description: contactLinks[i].description,
      },
    })
  }

  for (let i = 0; i < projects.length; i += 1) {
    await prisma.project.create({
      data: {
        id: projects[i].id,
        title: projects[i].title,
        description: projects[i].description,
        imageUrl: projectPlaceholderImage,
        projectUrl: projects[i].projectUrl,
        repoUrl: projects[i].repoUrl,
        type: projects[i].type,
        tags: JSON.stringify(projects[i].tags),
        featured: projects[i].featured,
      },
    })
  }

  for (let i = 0; i < aboutParagraphs.length; i += 1) {
    await prisma.legacyAboutParagraph.create({
      data: {
        order: i + 1,
        content: aboutParagraphs[i],
      },
    })
  }

  for (let i = 0; i < principles.length; i += 1) {
    await prisma.legacyPrinciple.create({
      data: {
        order: i + 1,
        title: principles[i],
      },
    })
  }

  for (let i = 0; i < focusItems.length; i += 1) {
    await prisma.legacyFocusItem.create({
      data: {
        order: i + 1,
        title: focusItems[i].title,
        description: focusItems[i].description,
      },
    })
  }

  const siteConfigs = [
    { key: "siteTitle", value: "Jabes Nelma | Junior Full Stack Developer" },
    {
      key: "siteDescription",
      value:
        "Building secure, scalable solutions for emerging markets. Portfolio of Jabes Nelma, Junior Full Stack Developer.",
    },
    {
      key: "siteKeywords",
      value:
        "Jabes Nelma, Full Stack Developer, Next.js, TypeScript, Prisma, Timor Leste, web development, portfolio",
    },
    { key: "brand", value: "JN" },
    { key: "heroHeadingLine1", value: "Hello, I'm" },
    { key: "heroHeadingLine2", value: "Jabes Nelma" },
    {
      key: "heroTypingText",
      value:
        "Junior Full Stack Developer focused on learning, growing, and building secure, scalable solutions for emerging markets like Timor Leste.",
    },
    { key: "statsProjectsCompleted", value: "15" },
    { key: "statsTechnologiesMastered", value: "32" },
    { key: "statsYearsExperience", value: "6" },
  ]

  for (let i = 0; i < siteConfigs.length; i += 1) {
    await prisma.siteConfig.create({
      data: siteConfigs[i],
    })
  }

  console.log("Legacy portfolio data import completed")
  console.log("Projects imported:", projects.length)
  console.log("Skills imported:", skills.length)
  console.log("Social links imported:", contactLinks.length)
  console.log("About paragraphs imported:", aboutParagraphs.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
