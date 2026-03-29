import { Metadata } from "next"
import { ContactForm } from "@/components/public/contact-form"
import { ContactInfo } from "@/components/public/contact-info"
import { PublicSection } from "@/components/public/system/public-section"
import { SectionHeader } from "@/components/public/system/section-header"

export const metadata: Metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch with me",
}

export default function ContactPage() {
  return (
    <PublicSection>
        {/* Page Header */}
        <div className="mb-12">
          <SectionHeader
            as="h1"
            title="Get In Touch"
            subtitle="Have a project in mind or just want to say hello? I&apos;d love to hear from you."
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 ds-gap-md lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
    </PublicSection>
  )
}
