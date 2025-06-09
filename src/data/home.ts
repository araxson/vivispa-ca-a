import type { LucideIcon } from "lucide-react";
import { FAQ } from "../data/faqs";
import { Testimonial, testimonials as allTestimonials } from "../data/testimonials";

// export interface TestimonialData {
//   id: string;
//   name: string;
//   rating: number;
//   content: string;
// }

export interface ServiceHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface StatData {
  id: string;
  value: string;
  label: string;
  description?: string;
}

export interface BenefitData {
  id: string;
  title: string;
  description: string;
  icon: string; // We'll use Lucide icon names
}

export interface HeroData {
  headline: string;
  subheadline: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  heroType?: "image" | "video" | "none";
  backgroundImage?: {
    src: string;
    alt: string;
  };
  backgroundVideo?: {
    src: string;
    poster?: string;
  };
}

export interface HomePageData {
  hero: HeroData;
  stats: StatData[];
  featuredServices: ServiceHighlight[];
  benefits: BenefitData[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  ctaSection: {
    headline: string;
    description: string;
    primaryCTA: {
      text: string;
      href: string;
    };
    secondaryCTA?: {
      text: string;
      href: string;
    };
  };
}

const homePageFAQs: FAQ[] = [
  {
    question: "What should I expect during my first visit?",
    answer:
      "Your first visit includes a comprehensive consultation where we discuss your goals, assess your skin, and create a personalized treatment plan. We'll explain the recommended procedures, expected results, and aftercare instructions to ensure you're comfortable and informed.",
    category: "General",
    featured: true,
  },
  {
    question: "How far in advance should I book my appointment?",
    answer:
      "We recommend booking 1-2 weeks in advance, especially for popular treatments like HydroFacial and laser services. For special events, book 2-4 weeks ahead to allow for optimal results and any necessary follow-up treatments.",
    category: "Booking",
    featured: true,
  },
  {
    question: "Are your treatments safe for all skin types?",
    answer:
      "Yes, our treatments are suitable for all skin types. We use advanced technology and customize each treatment based on your unique skin needs. Our trained professionals will assess your skin during consultation to ensure the safest and most effective approach.",
    category: "Safety",
    featured: true,
  },
  {
    question: "What is your cancellation and rescheduling policy?",
    answer:
      "We require 24 hours notice for cancellations or rescheduling. Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee. We understand emergencies happen and will work with you on a case-by-case basis.",
    category: "Policies",
    featured: true,
  },
  {
    question: "Do you offer package deals or payment plans?",
    answer:
      "Yes, we offer various package deals for multiple treatments and series packages for optimal results. We also provide flexible payment options and financing plans to make your aesthetic goals more affordable. Ask about our current promotions during your consultation.",
    category: "Pricing",
    featured: true,
  },
  {
    question: "How do I prepare for my treatment?",
    answer:
      "Preparation varies by treatment type. Generally, arrive with clean skin free of makeup, avoid sun exposure and retinoids before laser treatments, and stay hydrated. We'll provide specific pre-treatment instructions when you book your appointment.",
    category: "Preparation",
    featured: true,
  },
];

const homePageFeaturedTestimonials: Testimonial[] = allTestimonials.filter(
  (t) => t.featured
);

export const homePageData: HomePageData = {
  hero: {
    headline: "Transform Your Beauty Journey",
    subheadline: "Premier Aesthetic Treatments in Calgary",
    description:
      "Experience personalized beauty and wellness treatments designed to help you look and feel your absolute best. Our expert team combines cutting-edge technology with proven techniques.",
    primaryCTA: {
      text: "Book Appointment",
      href: "/pricing",
    },
    secondaryCTA: {
      text: "View Services",
      href: "/services",
    },
    heroType: "video",
    backgroundImage: {
      src: "/images/services/hydrofacial/hydrofacial-in-calgary-002.webp",
      alt: "Vivi Aesthetics Spa Hero Image",
    },
    backgroundVideo: {
      src: "/videos/Vivi_Aesthetics_Spa_hero_video",
      poster: "/images/services/hydrofacial/hydrofacial-in-calgary-002.webp",
    },
  },

  stats: [
    {
      id: "clients",
      value: "5,000+",
      label: "Happy Clients",
      description: "Satisfied customers across Calgary",
    },
    {
      id: "top-rated",
      value: "4.9★",
      label: "Google Reviews",
      description: "Consistently rated as a top Calgary spa",
    },
    {
      id: "treatments",
      value: "25+",
      label: "Treatment Options",
      description: "Comprehensive aesthetic services",
    },
    {
      id: "satisfaction",
      value: "98%",
      label: "Satisfaction Rate",
      description: "Client satisfaction guarantee",
    },
  ],

  featuredServices: [
    {
      id: "hydrofacial",
      title: "HydraFacial",
      description:
        "Deep cleansing, exfoliation, and hydration in one revolutionary treatment.",
      image: "/images/services/hydrofacial/hydrofacial-in-calgary-002.webp",
      href: "/services/hydrofacial",
    },
    {
      id: "laser-hair-removal",
      title: "Laser Hair Removal",
      description:
        "Permanent hair reduction with our advanced laser technology.",
      image:
        "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp",
      href: "/services/laser-hair-removal",
    },
    {
      id: "microneedling",
      title: "Microneedling",
      description:
        "Stimulate collagen production for smoother, younger-looking skin.",
      image: "/images/services/microneedling/microneedling-in-calgary-001.webp",
      href: "/services/microneedling",
    },
    {
      id: "ipl-photofacial",
      title: "IPL PhotoFacial",
      description:
        "Target sun damage, age spots, and improve overall skin tone.",
      image:
        "/images/services/ipl-photofacial/ipl-photofacial-in-calgary-001.webp",
      href: "/services/ipl-photofacial",
    },
    {
      id: "eyelash-extensions",
      title: "Eyelash Extensions",
      description:
        "Enhance your natural lashes with beautiful, custom extensions.",
      image:
        "/images/services/eyelash-extensions/eyelash-extensions-in-calgary-001.webp",
      href: "/services/eyelash-extensions",
    },
    {
      id: "japanese-head-spa",
      title: "Japanese Head Spa",
      description:
        "Relaxing scalp therapy to promote hair health and reduce stress.",
      image:
        "/images/services/japanese-head-spa/japanese-head-spa-in-calgary-001.webp",
      href: "/services/japanese-head-spa",
    },
    {
      id: "laser-pigmentation-removal",
      title: "Laser Pigmentation Removal",
      description:
        "Advanced treatment to remove unwanted pigmentation and dark spots.",
      image:
        "/images/services/laser-pigmentation-removal/laser-pigmentation-removal-in-calgary-001.webp",
      href: "/services/laser-pigmentation-removal",
    },
    {
      id: "laser-skin-tightening",
      title: "Laser Skin Tightening",
      description:
        "Non-surgical solution to improve skin elasticity and reduce sagging.",
      image:
        "/images/services/laser-skin-tightening/laser-skin-tightening-in-calgary-001.webp",
      href: "/services/laser-skin-tightening",
    },
    {
      id: "skin-tag-removal",
      title: "Skin Tag Removal",
      description: "Quick and effective removal of unwanted skin tags.",
      image:
        "/images/services/skin-tag-removal/skin-tag-removal-in-calgary-001.webp",
      href: "/services/skin-tag-removal",
    },
    {
      id: "vascular-vein-removal",
      title: "Vascular Vein Removal",
      description: "Treatment for spider veins and vascular lesions.",
      image:
        "/images/services/vascular-vein-removal/vascular-vein-removal-in-calgary-001.webp",
      href: "/services/vascular-vein-removal",
    },
  ],

  benefits: [
    {
      id: "expert-team",
      title: "Expert Team",
      description:
        "Licensed aestheticians with specialized training in advanced treatments",
      icon: "Users",
    },
    {
      id: "personalized",
      title: "Personalized Care",
      description: "Customized treatment plans tailored to your unique needs",
      icon: "Heart",
    },
    {
      id: "results",
      title: "Proven Results",
      description:
        "Track record of successful outcomes and client satisfaction",
      icon: "Target",
    },
    {
      id: "comfort",
      title: "Comfortable Environment",
      description:
        "Relaxing spa atmosphere designed for your comfort and privacy",
      icon: "Home",
    },
    {
      id: "aftercare",
      title: "Comprehensive Aftercare",
      description: "Ongoing support and guidance for optimal treatment results",
      icon: "Shield",
    },
  ],

  testimonials: homePageFeaturedTestimonials,
  faqs: homePageFAQs,

  ctaSection: {
    headline: "Ready to Begin Your Transformation?",
    description:
      "Book your complimentary consultation today and discover how our personalized treatments can help you achieve your aesthetic goals.",
    primaryCTA: {
      text: "Book Free Consultation",
      href: "/contact",
    },
    secondaryCTA: {
      text: "Call (403) 708-7654",
      href: "tel:+14037087654",
    },
  },
};
