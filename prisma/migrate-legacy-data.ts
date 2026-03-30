import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const prisma = new PrismaClient()

// Type definitions matching content.ts
interface Skill {
  id: string
  name: string
  category?: string[]
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  years?: number
  icon?: string
  order?: number
}

interface Project {
  id: string
  title: string
  subtitle?: string
  description?: string
  year?: number
  date?: string
  tags?: string[]
  tech?: string[]
  category?: string[]
  client?: string
  role?: string
  repo?: string
  demo?: string
  image?: string
  featured?: boolean
  status?: 'wip' | 'done' | 'archived'
}

interface Social {
  name: string
  url: string
  icon?: string
}

interface Info {
  name: string
  role?: string
  location?: string
  email?: string
  bio?: string
  avatar?: string
  socials?: Social[]
}

interface Content {
  info: Info
  skills: Skill[]
  projects: Project[]
  contactLinks?: Array<{ id: string; name: string; url: string; description: string; iconType: string }>
}

// Manual extraction of data from content.ts - simpler and safer
async function parseContentFile(filePath: string): Promise<Content> {
  const fileContent = readFileSync(filePath, 'utf-8')
  
  // Use simple regex extraction to get sections
  // This avoids TypeScript evaluation issues
  
  // Extract info section
  const infoMatch = fileContent.match(/info:\s*\{[\s\S]*?\n  \} as Info/)
  const skillsMatch = fileContent.match(/skills:\s*\[[\s\S]*?\n  \] as Skill\[\]/)
  const projectsMatch = fileContent.match(/projects:\s*\[[\s\S]*?\n  \] as Project\[\]/)
  
  // Since regex is complex, let's use a simpler approach: dynamically import
  // We'll use import() which can handle TypeScript context
  const { content } = await import('../migration-source/content')
  return content as Content
}

async function migrateData() {
  try {
    const legacyContentPath = resolve(__dirname, '../migration-source/content.ts')
    
    const content = await parseContentFile(legacyContentPath)

    console.log('📚 Starting legacy data migration...\n')

    // 1. Migrate personal info to SiteConfig and SocialLinks
    console.log('👤 Migrating personal info...')
    const personalConfig = [
      { key: 'site_name', value: content.info.name },
      { key: 'owner_name', value: content.info.name },
      { key: 'owner_title', value: content.info.role || 'Developer' },
      { key: 'owner_bio', value: content.info.bio || '' },
      { key: 'owner_location', value: content.info.location || '' },
      { key: 'contact_email', value: content.info.email || '' },
    ]

    for (const config of personalConfig) {
      await prisma.siteConfig.upsert({
        where: { key: config.key },
        update: { value: config.value },
        create: config,
      })
    }
    console.log('✓ Personal info migrated\n')

    // 2. Migrate social links
    console.log('🔗 Migrating social links...')
    if (content.info.socials && content.info.socials.length > 0) {
      for (const [index, social] of content.info.socials.entries()) {
        const normalizedPlatform = social.name.trim().toLowerCase()
        const existing = await prisma.socialLink.findFirst({
          where: { platform: normalizedPlatform },
        })

        if (!existing) {
          await prisma.socialLink.create({
            data: {
              platform: normalizedPlatform,
              url: social.url,
              order: index,
              isActive: true,
            },
          })
        }
      }
    }
    console.log(`✓ Social links migrated (${content.info.socials?.length || 0} links)\n`)

    // 3. Migrate skills
    console.log('🎯 Migrating skills...')
    let skillCount = 0
    for (const skill of content.skills) {
      const existing = await prisma.skill.findFirst({
        where: { name: skill.name },
      })

      if (!existing) {
        const category = skill.category ? skill.category[0] : 'Other'
        const proficiency =
          skill.level === 'expert' ? 100 : skill.level === 'advanced' ? 85 : skill.level === 'intermediate' ? 60 : 30

        await prisma.skill.create({
          data: {
            name: skill.name,
            category: category,
            proficiency: proficiency,
            order: skill.order || skillCount,
          },
        })
        skillCount++
      } else {
        skillCount++
      }
    }
    console.log(`✓ Skills migrated/verified (${skillCount} total)\n`)

    // 4. Migrate projects
    console.log('📁 Migrating projects...')
    let projectCount = 0
    for (const project of content.projects) {
      const existing = await prisma.project.findFirst({
        where: { title: project.title },
      })

      if (!existing) {
        const techStack = project.tech || []
        const categories = project.category || ['Other']
        const images = [project.image].filter((image): image is string => Boolean(image))
        const coverImage = images[0] || 'https://via.placeholder.com/1200x675?text=Project+Cover'

        await (prisma.project as any).create({
          data: {
            title: project.title,
            description: project.description || project.subtitle || '',
            content: project.description || '',
            coverImage,
            images: JSON.stringify(images),
            techStack: JSON.stringify(techStack),
            githubUrl: project.repo,
            liveUrl: project.demo,
            featured: project.featured || false,
            status: project.status === 'done' || project.status === 'archived' ? 'published' : project.status === 'wip' ? 'draft' : 'published',
            order: projectCount,
          },
        })
        projectCount++
      } else {
        projectCount++
      }
    }
    console.log(`✓ Projects migrated (${projectCount} total)\n`)

    console.log('✅ Legacy data migration completed successfully!')
    console.log(`   - Skills: ${skillCount}`)
    console.log(`   - Projects: ${projectCount}`)
    console.log(`   - Personal info & Social links: updated`)
  } catch (error) {
    console.error('❌ Migration error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

migrateData()
