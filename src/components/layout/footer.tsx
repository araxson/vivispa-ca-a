import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { siteConfig, locations } from "@/data/constant";
import { Section } from "@/components/ui";

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

const footerLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const primaryLocation = locations[0]; // Safe access since we know we have locations

  return (
    <footer className="bg-gradient-to-r from-muted/50 to-muted/70 border-t border-border">
      <Section spacing="lg" maxWidth="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Contact Us
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <Link
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {siteConfig.contact.phone}
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {siteConfig.contact.email}
                </Link>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Our Locations
            </h3>
            <div className="space-y-4">
              {locations.map((location) => (
                <div key={location.id} className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">
                    {location.name}
                  </h4>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p>{location.address}</p>
                      <p>
                        {location.city}, {location.province}{" "}
                        {location.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Business Hours
            </h3>
            {primaryLocation && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Operating Hours
                  </span>
                </div>
                {primaryLocation.hours.map((schedule) => (
                  <div
                    key={schedule.day}
                    className="flex justify-between text-sm"
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

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
};
