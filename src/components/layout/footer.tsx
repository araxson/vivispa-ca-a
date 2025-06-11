import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import { siteConfig, locations } from "@/data/constant";
import { CtaCard } from "@/components/blocks/cta-card";
import { Container, Section } from "@/components/ui";
import { cn, gridVariants } from "@/lib/utils";

const socialLinks = [
  {
    name: "Instagram",
    href: siteConfig.links.instagram,
    icon: Instagram,
    label: "Follow us on Instagram",
  },
  {
    name: "Facebook",
    href: siteConfig.links.facebook,
    icon: Facebook,
    label: "Follow us on Facebook",
  },
  {
    name: "Twitter",
    href: siteConfig.links.twitter,
    icon: Twitter,
    label: "Follow us on Twitter",
  },
  {
    name: "Youtube",
    href: siteConfig.links.youtube,
    icon: Youtube,
    label: "Subscribe to our YouTube channel",
  },
];

const footerNav = [
  {
    title: "Company",
    items: [
      { title: "About Us", href: "/about" },
      { title: "Services", href: "/services" },
      { title: "Pricing", href: "/pricing" },
      { title: "Special Offers", href: "/offers" },
    ],
  },
  {
    title: "Help",
    items: [
      { title: "Contact Us", href: "/contact" },
      { title: "FAQs", href: "/faq" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const primaryLocation = locations[0];

  return (
    <footer className="border-t border-border">
      <Section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className={cn(gridVariants({ cols: 12, gap: "lg" }))}>
            {/* Company Info */}
            <div className="md:col-span-2 lg:col-span-4">
              <Link href="/" className="inline-block mb-4">
                <h3 className="text-xl font-bold text-foreground">
                  {siteConfig.name}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                {siteConfig.description}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            {footerNav.map((section) => (
              <div key={section.title} className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Location & Contact */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Visit Us
              </h3>
              <div className="space-y-4">
                {primaryLocation && (
                  <div className="flex items-start space-x-3">
                    <MapPin
                      className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-muted-foreground">
                      {primaryLocation.address}, {primaryLocation.city},
                      <br />
                      {primaryLocation.province} {primaryLocation.postalCode}
                    </p>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Phone
                    className="h-5 w-5 flex-shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Link
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail
                    className="h-5 w-5 flex-shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Link
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {siteConfig.contact.email}
                  </Link>
                </div>
              </div>
            </div>
            {/* Business Hours */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Opening Hours
              </h3>
              {primaryLocation && (
                <div className="space-y-2 text-sm">
                  {primaryLocation.hours.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between items-center"
                    >
                      <span className="text-muted-foreground">
                        {schedule.day}
                      </span>
                      <span className="text-foreground font-medium">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <CtaCard
            title="Ready to Transform Your Look?"
            description="Book your appointment today and experience our premium services."
            buttonText="Book Now"
            buttonLink="/contact"
            className="mt-12"
          />
        </Container>
      </Section>

      <div className="bg-muted/40 py-6">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>
              &copy; {currentYear} {siteConfig.name}. All Rights Reserved.
            </p>
            <p className="text-center sm:text-right">
              Website built by{" "}
              <Link
                href="https://zss.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                ZSS.ca
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
