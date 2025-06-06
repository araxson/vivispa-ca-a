interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  featured?: boolean;
}

export const generalFAQs: FAQ[] = [
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

export const getFeaturedFAQs = (): FAQ[] => {
  return generalFAQs.filter((faq) => faq.featured);
};

export const getFAQsByCategory = (category: string): FAQ[] => {
  return generalFAQs.filter((faq) => faq.category === category);
};

export default generalFAQs;
