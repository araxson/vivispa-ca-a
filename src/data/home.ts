import type { LucideIcon } from 'lucide-react';

export interface TestimonialData {
  id: string;
  name: string;
  role?: string;
  image: string;
  rating: number;
  content: string;
  date?: string;
}

export interface ServiceHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  price?: string;
  duration?: string;
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
  heroImage: string;
  backgroundImage?: string;
}

export interface HomePageData {
  hero: HeroData;
  stats: StatData[];
  featuredServices: ServiceHighlight[];
  benefits: BenefitData[];
  testimonials: TestimonialData[];
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

export const homePageData: HomePageData = {
  hero: {
    headline: "Transform Your Beauty Journey",
    subheadline: "Premier Aesthetic Treatments in Calgary",
    description: "Experience personalized beauty and wellness treatments designed to help you look and feel your absolute best. Our expert team combines cutting-edge technology with proven techniques.",
    primaryCTA: {
      text: "Book Consultation",
      href: "/contact"
    },
    secondaryCTA: {
      text: "View Services",
      href: "/services"
    },
    heroImage: "/images/services/hydrofacial/hydrofacial-in-calgary-001.webp",
    backgroundImage: "/images/services/eyelash-extensions/eyelash-extensions-in-calgary-001.webp"
  },
  
  stats: [
    {
      id: "clients",
      value: "5,000+",
      label: "Happy Clients",
      description: "Satisfied customers across Calgary"
    },
    {
      id: "experience",
      value: "9+",
      label: "Years Experience",
      description: "Leading the industry since 2015"
    },
    {
      id: "treatments",
      value: "25+",
      label: "Treatment Options",
      description: "Comprehensive aesthetic services"
    },
    {
      id: "satisfaction",
      value: "98%",
      label: "Satisfaction Rate",
      description: "Client satisfaction guarantee"
    }
  ],

  featuredServices: [
    {
      id: "hydrofacial",
      title: "HydraFacial",
      description: "Deep cleansing, exfoliation, and hydration in one revolutionary treatment.",
      image: "/images/services/hydrofacial/hydrofacial-in-calgary-002.webp",
      href: "/services/hydrofacial",
      price: "From $149",
      duration: "45 min"
    },
    {
      id: "laser-hair-removal",
      title: "Laser Hair Removal",
      description: "Permanent hair reduction with our advanced laser technology.",
      image: "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp",
      href: "/services/laser-hair-removal",
      price: "From $99",
      duration: "30-60 min"
    },
    {
      id: "microneedling",
      title: "Microneedling",
      description: "Stimulate collagen production for smoother, younger-looking skin.",
      image: "/images/services/microneedling/microneedling-in-calgary-001.webp",
      href: "/services/microneedling",
      price: "From $199",
      duration: "60 min"
    },
    {
      id: "ipl-photofacial",
      title: "IPL PhotoFacial",
      description: "Target sun damage, age spots, and improve overall skin tone.",
      image: "/images/services/ipl-photofacial/ipl-photofacial-in-calgary-001.webp",
      href: "/services/ipl-photofacial",
      price: "From $179",
      duration: "45 min"
    }
  ],

  benefits: [
    {
      id: "expert-team",
      title: "Expert Team",
      description: "Licensed aestheticians with specialized training in advanced treatments",
      icon: "Users"
    },
    {
      id: "cutting-edge",
      title: "Latest Technology",
      description: "State-of-the-art equipment and proven treatment methods",
      icon: "Zap"
    },
    {
      id: "personalized",
      title: "Personalized Care",
      description: "Customized treatment plans tailored to your unique needs",
      icon: "Heart"
    },
    {
      id: "results",
      title: "Proven Results",
      description: "Track record of successful outcomes and client satisfaction",
      icon: "Target"
    },
    {
      id: "comfort",
      title: "Comfortable Environment",
      description: "Relaxing spa atmosphere designed for your comfort and privacy",
      icon: "Home"
    },
    {
      id: "aftercare",
      title: "Comprehensive Aftercare",
      description: "Ongoing support and guidance for optimal treatment results",
      icon: "Shield"
    }
  ],

  testimonials: [
    {
      id: "sarah-m",
      name: "Sarah K.",
      role: "Marketing Executive",
      image: "/images/testimonials/sarah-k.jpg",
      rating: 5,
      content: "I've been coming to Vivi for over two years now, and the results speak for themselves. The HydraFacial has completely transformed my skin, and the staff always makes me feel comfortable and well-cared for.",
      date: "2024-01-15"
    },
    {
      id: "jessica-l",
      name: "Jennifer L.",
      role: "Teacher",
      image: "/images/testimonials/jennifer-l.jpg",
      rating: 5,
      content: "The laser hair removal treatment exceeded my expectations. Professional, clean, and the results are amazing. I wish I had started this journey sooner!",
      date: "2024-01-10"
    },
    {
      id: "amanda-k",
      name: "Aisha M.",
      role: "Nurse",
      image: "/images/testimonials/aisha-m.jpg",
      rating: 5,
      content: "Vivi Aesthetics has the most knowledgeable and caring team. They took the time to understand my skin concerns and created a treatment plan that really works.",
      date: "2024-01-08"
    },
    {
      id: "michelle-r",
      name: "Priya K.",
      role: "Business Owner",
      image: "/images/testimonials/priya-k.jpg",
      rating: 5,
      content: "The microneedling treatment has been a game-changer for my skin texture and fine lines. The team at Vivi is professional and the facility is top-notch.",
      date: "2024-01-05"
    }
  ],

  ctaSection: {
    headline: "Ready to Begin Your Transformation?",
    description: "Book your complimentary consultation today and discover how our personalized treatments can help you achieve your aesthetic goals.",
    primaryCTA: {
      text: "Book Free Consultation",
      href: "/contact"
    },
    secondaryCTA: {
      text: "Call (403) 708-7654",
      href: "tel:+14037087654"
    }
  }
}; 