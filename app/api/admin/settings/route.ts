
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const where = category ? { category } : {}

    const settings = await prisma.settings.findMany({
      where,
      orderBy: { key: "asc" }
    })

    // Group settings by category
    const groupedSettings: Record<string, Record<string, any>> = {}
    settings.forEach(setting => {
      if (!groupedSettings[setting.category]) {
        groupedSettings[setting.category] = {}
      }
      try {
        groupedSettings[setting.category][setting.key] = JSON.parse(setting.value)
      } catch {
        groupedSettings[setting.category][setting.key] = setting.value
      }
    })

    return NextResponse.json(groupedSettings)
  } catch (error) {
    console.error("Get settings error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { category, settings } = await request.json()

    if (!category || !settings) {
      return NextResponse.json(
        { error: "Category and settings are required" },
        { status: 400 }
      )
    }

    // Update or create settings
    const promises = Object.entries(settings).map(([key, value]) =>
      prisma.settings.upsert({
        where: { key: `${category}.${key}` },
        update: {
          value: JSON.stringify(value),
          category
        },
        create: {
          key: `${category}.${key}`,
          value: JSON.stringify(value),
          category
        }
      })
    )

    await Promise.all(promises)

    return NextResponse.json({ message: "Settings updated successfully" })
  } catch (error) {
    console.error("Update settings error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
