import type { LucideIcon } from 'lucide-react';

export interface TestimonialData {
  id: string;
  name: string;
  rating: number;
  content: string;
}

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
  heroImage?: string;
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
      text: "Book Appointment",
      href: "/contact"
    },
    secondaryCTA: {
      text: "View Services",
      href: "/services"
    },
    backgroundImage: {
      src: "/images/services/hydrofacial/hydrofacial-in-calgary-001.webp",
      alt: "Transform Your Beauty Journey"
    }
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
      href: "/services/hydrofacial"
    },
    {
      id: "laser-hair-removal",
      title: "Laser Hair Removal",
      description: "Permanent hair reduction with our advanced laser technology.",
      image: "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp",
      href: "/services/laser-hair-removal"
    },
    {
      id: "microneedling",
      title: "Microneedling",
      description: "Stimulate collagen production for smoother, younger-looking skin.",
      image: "/images/services/microneedling/microneedling-in-calgary-001.webp",
      href: "/services/microneedling"
    },
    {
      id: "ipl-photofacial",
      title: "IPL PhotoFacial",
      description: "Target sun damage, age spots, and improve overall skin tone.",
      image: "/images/services/ipl-photofacial/ipl-photofacial-in-calgary-001.webp",
      href: "/services/ipl-photofacial"
    },
    {
      id: "eyelash-extensions",
      title: "Eyelash Extensions",
      description: "Enhance your natural lashes with beautiful, custom extensions.",
      image: "/images/services/eyelash-extensions/eyelash-extensions-in-calgary-001.webp",
      href: "/services/eyelash-extensions"
    },
    {
      id: "japanese-head-spa",
      title: "Japanese Head Spa",
      description: "Relaxing scalp therapy to promote hair health and reduce stress.",
      image: "/images/services/japanese-head-spa/japanese-head-spa-in-calgary-001.webp",
      href: "/services/japanese-head-spa"
    },
    {
      id: "laser-pigmentation-removal",
      title: "Laser Pigmentation Removal",
      description: "Advanced treatment to remove unwanted pigmentation and dark spots.",
      image: "/images/services/laser-pigmentation-removal/laser-pigmentation-removal-in-calgary-001.webp",
      href: "/services/laser-pigmentation-removal"
    },
    {
      id: "laser-skin-tightening",
      title: "Laser Skin Tightening",
      description: "Non-surgical solution to improve skin elasticity and reduce sagging.",
      image: "/images/services/laser-skin-tightening/laser-skin-tightening-in-calgary-001.webp",
      href: "/services/laser-skin-tightening"
    },
    {
      id: "skin-tag-removal",
      title: "Skin Tag Removal",
      description: "Quick and effective removal of unwanted skin tags.",
      image: "/images/services/skin-tag-removal/skin-tag-removal-in-calgary-001.webp",
      href: "/services/skin-tag-removal"
    },
    {
      id: "vascular-vein-removal",
      title: "Vascular Vein Removal",
      description: "Treatment for spider veins and vascular lesions.",
      image: "/images/services/vascular-vein-removal/vascular-vein-removal-in-calgary-001.webp",
      href: "/services/vascular-vein-removal"
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
      rating: 5,
      content: "I've been coming to Vivi for over two years now, and the results speak for themselves. The HydraFacial has completely transformed my skin, and the staff always makes me feel comfortable and well-cared for."
    },
    {
      id: "jessica-l",
      name: "Jennifer L.",
      rating: 5,
      content: "The laser hair removal treatment exceeded my expectations. Professional, clean, and the results are amazing. I wish I had started this journey sooner!"
    },
    {
      id: "amanda-k",
      name: "Aisha M.",
      rating: 5,
      content: "Vivi Aesthetics has the most knowledgeable and caring team. They took the time to understand my skin concerns and created a treatment plan that really works."
    },
    {
      id: "michelle-r",
      name: "Priya K.",
      rating: 5,
      content: "The microneedling treatment has been a game-changer for my skin texture and fine lines. The team at Vivi is professional and the facility is top-notch."
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