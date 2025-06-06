import { contactInfo, locations, type Location } from "./contact";

/**
 * Site configuration data for Vivi Aesthetics & Spa website
 */
export const siteConfig = {
  name: contactInfo.businessName,
  title: "Vivi Aesthetics & Spa | Premium Beauty & Wellness Treatments",
  description:
    "Vivi Aesthetics & Spa offers premium beauty and wellness treatments to help you look and feel your best.",
  url: "https://vivispa.ca",
  ogImage: "/images/og-image.jpg",
  links: {
    instagram: contactInfo.social.instagram,
    facebook: contactInfo.social.facebook,
    twitter: "https://twitter.com/vivispa.ca",
    youtube: "https://youtube.com/c/vivispa.ca",
  },
  contact: {
    email: contactInfo.email.main,
    phone: contactInfo.phone.main,
  },
};

// Re-export locations and Location type for backward compatibility
export { locations, type Location };
