import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


// Define expected payload type
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
export async function POST(request: NextRequest) {
  try {
     const data = await request.json()
    const { name, email, subject, message } = data as ContactFormData
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
        status: "NEW" // Default status
      }
    })

    console.log("Contact form submission saved:", contact)

    return NextResponse.json(
      { message: "Thank you for your message. We'll get back to you soon!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}