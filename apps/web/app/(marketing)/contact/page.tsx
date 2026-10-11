import type { Metadata } from "next"
import Link from "next/link"

import { Separator } from "@kibo/ui/components/separator"

import { Container } from "@/components/atoms/container"
import { CheckList } from "@/components/molecules/check-list"
import { SectionHeading } from "@/components/molecules/section-heading"
import { ContactForm } from "@/components/organisms/marketing/contact-form"

export const metadata: Metadata = {
  title: "Contact sales",
  description:
    "Volume pricing, onboarding help and a direct line to the Kibo team.",
}

export default function ContactPage() {
  return (
    <section className="pt-20 pb-24">
      <Container className="flex flex-wrap items-start gap-16">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-8">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Talk to our team"
            lede="For agencies, networks and big channels: volume pricing, onboarding help and a direct line to us."
          />
          <CheckList
            items={[
              "A walkthrough tailored to your roster",
              "Help importing knowledge for each creator",
              "Custom terms and invoicing",
            ]}
          />
          <Separator />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Need help with your account?</p>
              <p className="text-muted-foreground">
                The help center answers most questions.{" "}
                <Link href="/help" className="text-link">
                  Visit the help center
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Press and partnerships</p>
              <p>
                <a href="mailto:press@kibo.gg" className="text-link">
                  press@kibo.gg
                </a>
              </p>
            </div>
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  )
}
