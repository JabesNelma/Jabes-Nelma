import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function parseImages(value: string | null): string[] {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    }
  } catch {
    // Ignore malformed JSON and return empty list.
  }

  return []
}

async function main() {
  const projects = await (prisma.project as any).findMany({
    select: {
      id: true,
      coverImage: true,
      images: true,
    },
  }) as Array<{ id: string; coverImage: string | null; images: string | null }>

  let updatedCount = 0
  let skippedCount = 0

  for (const project of projects) {
    const images = parseImages(project.images)
    const fallbackCover = images[0]

    if (project.coverImage && project.coverImage.trim().length > 0) {
      if (fallbackCover && !images.includes(project.coverImage)) {
        await (prisma.project as any).update({
          where: { id: project.id },
          data: {
            images: JSON.stringify([project.coverImage, ...images]),
          },
        })
        updatedCount += 1
      }
      continue
    }

    if (!fallbackCover) {
      skippedCount += 1
      continue
    }

    await (prisma.project as any).update({
      where: { id: project.id },
      data: {
        coverImage: fallbackCover,
      },
    })

    updatedCount += 1
  }

  console.log(`Backfill complete. Updated ${updatedCount} projects, skipped ${skippedCount} without images.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
