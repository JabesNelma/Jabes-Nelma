import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const configs = await db.siteConfig.findMany({
      select: {
        key: true,
        value: true,
      },
    })

    // Convert array to object for easier access
    const configMap = configs.reduce(
      (acc, config) => {
        acc[config.key] = config.value
        return acc
      },
      {} as Record<string, string>
    )

    return NextResponse.json({
      success: true,
      data: configMap,
    })
  } catch (error) {
    console.error('Error fetching site config:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site config' },
      { status: 500 }
    )
  }
}
