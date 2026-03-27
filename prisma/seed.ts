import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!'
  const adminName = process.env.ADMIN_NAME || 'Admin'

  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      password: hashedPassword,
      role: 'admin',
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      role: 'admin',
    },
  })

  const defaultConfig = [
    { key: 'site_name', value: 'Developer Portfolio', description: 'Site name displayed in title and header' },
    { key: 'site_description', value: 'Professional developer portfolio and CMS.', description: 'SEO description' },
  ]

  for (const item of defaultConfig) {
    await prisma.siteConfig.upsert({
      where: { key: item.key },
      update: { value: item.value, description: item.description },
      create: item,
    })
  }

  console.log('Seed completed')
  console.log(`Admin email: ${adminEmail}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
