export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  content: string;
  service?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah K.",
    avatar: "/images/testimonials/sarah-k.jpg",
    location: "Calgary, AB",
    rating: 5,
    content:
      "Absolutely amazing experience at Vivi Aesthetics! The staff was professional and the results exceeded my expectations. My skin has never looked better!",
    service: "HydraFacial",
    featured: true,
  },
  {
    id: "2",
    name: "Jennifer L.",
    avatar: "/images/testimonials/jennifer-l.jpg",
    location: "Calgary, AB",
    rating: 5,
    content:
      "I've been coming to Vivi for laser hair removal and I'm so impressed with the results. The team is knowledgeable and makes you feel comfortable throughout the process.",
    service: "Laser Hair Removal",
    featured: true,
  },
  {
    id: "3",
    name: "Priya K.",
    avatar: "/images/testimonials/priya-k.jpg",
    location: "Calgary, AB",
    rating: 5,
    content:
      "The Japanese Head Spa treatment was pure relaxation! I left feeling refreshed and my scalp felt amazing. Definitely booking another session soon.",
    service: "Japanese Head Spa",
    featured: true,
  },
  {
    id: "4",
    name: "Linda S.",
    avatar: "/images/testimonials/linda-s.jpg",
    location: "Calgary, AB",
    rating: 5,
    content:
      "Vivi Aesthetics has the best eyelash extension service in Calgary! My lashes look natural and beautiful. The attention to detail is incredible.",
    service: "Eyelash Extensions",
    featured: false,
  },
  {
    id: "5",
    name: "Aisha M.",
    avatar: "/images/testimonials/aisha-m.jpg",
    location: "Calgary, AB",
    rating: 5,
    content:
      "The microneedling treatment gave me the glowing skin I've always wanted. The staff explained everything thoroughly and made sure I was comfortable.",
    service: "Microneedling",
    featured: false,
  },
];

// featuredTestimonials has been removed as this logic is now in home.ts
export const getTestimonialById = (id: string): Testimonial | undefined => {
  return testimonials.find((t) => t.id === id);
};

export const getTestimonialsByService = (service: string): Testimonial[] => {
  return testimonials.filter((t) => t.service === service);
};

export default testimonials;
