import { Service } from "@/types/service";

export const hydrofacialService: Service = {
  id: "hydrofacial",
  slug: "hydrofacial",
  title: "HydroFacial Treatment",
  previewDescription:
    "Advanced multi-step facial treatment that cleanses, exfoliates, extracts, and hydrates skin simultaneously.",
  fullDescription:
    "HydroFacial is a patented, non-invasive facial treatment that combines cleansing, exfoliation, extraction, hydration, and antioxidant protection in a single session. This revolutionary treatment uses a unique spiral design handpiece and patented Vortex-Fusion delivery system to remove dead skin cells and impurities while simultaneously delivering moisturizing serums into the skin. The multi-step process addresses various skin concerns including fine lines, wrinkles, enlarged pores, oily or acne-prone skin, hyperpigmentation, and dehydration, making it suitable for all skin types and conditions.",

  metaTitle:
    "HydroFacial Calgary | Deep Cleansing & Hydration | Vivi Aesthetics & Spa",
  metaDescription:
    "Book your HydroFacial at Vivi Aesthetics & Spa Calgary for a non-invasive treatment that cleanses, exfoliates, and hydrates. Achieve radiant skin today!",
  keywords: [
    "hydrofacial calgary",
    "hydrofacial in calgary",
    "hydrofacial treatment calgary",
    "best hydrofacial in calgary",
    "facial treatment",
    "skin rejuvenation",
    "calgary spa",
    "hydradermabrasion",
  ],
  canonicalUrl: "https://vivispa.ca/services/hydrofacial",

  image: "/images/services/hydrofacial/hydrofacial-in-calgary-005.webp",

  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/images/services/hydrofacial/hydrofacial-in-calgary-001.webp",
    "/images/services/hydrofacial/hydrofacial-in-calgary-002.webp",
    "/images/services/hydrofacial/hydrofacial-in-calgary-003.webp",
    "/images/services/hydrofacial/hydrofacial-in-calgary-004.webp",
    "/images/services/hydrofacial/hydrofacial-in-calgary-005.webp",
    "/images/services/hydrofacial/hydrofacial-in-calgary-007.webp",
    "/images/services/hydrofacial/hydrofacial-in-calgary-011.webp",
  ],

  heroType: "none",

  // Available at both locations
  availableLocations: ["downtown", "edmonton-trail"],

  openGraph: {
    title: "HydroFacial Treatment Calgary | Vivi Aesthetics & Spa",
    description:
      "Experience the ultimate skin rejuvenation with our HydroFacial treatment. Cleanse, exfoliate, and hydrate your skin in one session.",
    // Use jpg for OpenGraph as it has better compatibility across platforms
    image: "/images/services/hydrofacial/hydrofacial-in-calgary-001.webp",
    url: "https://vivispa.ca/services/hydrofacial", // Added using service.canonicalUrl
    type: "website", // Added default type
  },

  twitter: {
    card: "summary_large_image", // Added back, as it's required by TwitterData
    title: "HydroFacial Calgary | Vivi Aesthetics & Spa",
    description:
      "Get smooth, hydrated, and youthful skin with our HydroFacial treatment. Book now!",
    image: "/images/services/hydrofacial/hydrofacial-in-calgary-002.webp",
  },

  scientificInfo:
    "HydroFacial technology utilizes a patented Vortex-Fusion delivery system that creates a vortex effect to simultaneously perform multiple skin treatment modalities. The system employs a spiral-tip handpiece design that generates controlled suction and fluid dynamics to dislodge and remove impurities from pores while delivering nourishing serums deep into the skin. The treatment combines the benefits of hydradermabrasion, chemical peels, automated extractions, and serum infusion in a single, non-irritating procedure. The multi-step process involves gentle acid peels using glycolic and salicylic acids, vacuum-powered extraction of blackheads and debris, and infusion of antioxidants, peptides, and hyaluronic acid through the patented delivery system.",

  overview:
    "HydroFacial represents a breakthrough in facial treatment technology, offering a comprehensive approach to skin health through its patented multi-step process. Unlike traditional facials that may cause irritation or require downtime, HydroFacial treatments are designed to be gentle yet effective, making them suitable for all skin types including sensitive skin. The treatment addresses multiple skin concerns simultaneously, providing immediate visible results with long-term benefits for skin health and appearance.",

  benefits: [
    "Immediate improvement in skin texture, tone, and overall radiance",
    "Deep cleansing and removal of impurities without irritation",
    "Enhanced hydration and moisture retention for healthier-looking skin",
    "Reduction in appearance of fine lines, wrinkles, and enlarged pores",
    "Improved skin elasticity and firmness through collagen stimulation",
    "Safe and effective treatment for all skin types and conditions",
    "No downtime required with immediate return to daily activities",
    "Customizable treatment options to address specific skin concerns",
  ],

  procedure:
    "The HydroFacial treatment follows a standardized multi-step protocol designed to maximize skin benefits while ensuring patient comfort. The process begins with gentle cleansing and preparation of the treatment area, followed by the application of mild chemical exfoliants to remove dead skin cells and prepare the skin for extraction. The patented Vortex-Fusion handpiece is then used to perform painless extractions while simultaneously infusing the skin with hydrating and nourishing serums. The treatment concludes with the application of protective antioxidants and moisturizers to seal in the benefits and protect the newly treated skin.",

  indications:
    "HydroFacial treatment is indicated for individuals seeking to improve overall skin health and appearance, particularly those with concerns about skin texture, hydration, pore size, or signs of aging. The treatment is beneficial for various skin conditions including dehydrated skin, sun damage, hyperpigmentation, acne-prone skin, enlarged pores, fine lines, and dull complexion. It serves as an excellent maintenance treatment for healthy skin and as a preparatory treatment before special events or other cosmetic procedures.",

  contraindications:
    "While HydroFacial is generally safe for most individuals, certain conditions may contraindicate treatment or require special precautions. These include active skin infections, open wounds or lesions in the treatment area, severe rosacea or dermatitis, recent use of certain topical medications, pregnancy for certain serum ingredients, and unrealistic expectations about treatment outcomes. A thorough consultation helps identify any potential contraindications and ensures safe treatment protocols.",

  preparationAndAftercare:
    "Minimal preparation is required for HydroFacial treatment, making it an ideal lunchtime procedure. Patients are advised to arrive with clean skin, free of makeup and skincare products. Post-treatment care involves gentle skincare practices, including the use of broad-spectrum sunscreen, avoiding harsh exfoliants for several days, and maintaining proper hydration. The immediate post-treatment period may involve slight redness that typically resolves within hours, allowing for immediate makeup application if desired.",

  expectedResults:
    "Most patients notice immediate improvements in skin texture, hydration, and radiance following their first HydroFacial treatment. The skin typically appears smoother, more luminous, and feels softer to the touch. Optimal results are achieved through a series of treatments, with many patients observing cumulative benefits including reduced pore size, improved skin tone, and diminished appearance of fine lines. Regular maintenance treatments help sustain these benefits and support long-term skin health.",

  safetyConsiderations:
    "HydroFacial treatments maintain excellent safety profiles due to their non-invasive nature and gentle approach to skin treatment. The procedure uses medical-grade equipment and sterile, single-use tips to prevent cross-contamination. Potential side effects are minimal and may include temporary redness, mild sensitivity, or rare allergic reactions to serum ingredients. These effects typically resolve quickly without intervention, making HydroFacial one of the safest facial treatments available.",

  historyAndDevelopment:
    "HydroFacial technology was developed in the 1990s by Edge Systems Corporation, founded by Dr. Abe Oron, who sought to create a gentler alternative to traditional microdermabrasion. The patented Vortex-Fusion delivery system was introduced in 1997, revolutionizing facial treatments by combining multiple modalities in a single procedure. The technology gained FDA clearance in 2001 and quickly became popular in medical spas and dermatology practices. Continuous innovations have included improved handpiece designs, enhanced serum formulations, and specialized attachments for different skin concerns. Today, HydroFacial represents one of the most popular and widely performed facial treatments globally, with over 11 million treatments performed annually across 87 countries.",

  faqs: [
    {
      question:
        "What exactly is a HydroFacial and how does it differ from regular facials?",
      answer:
        "HydroFacial is a patented treatment that uses advanced technology to cleanse, extract, and hydrate skin simultaneously. Unlike traditional facials, it uses a specialized vortex-fusion system that provides immediate results without irritation or downtime.",
    },
    {
      question: "Is there any downtime after a HydroFacial treatment?",
      answer:
        "No, there's no downtime required with HydroFacial. You can return to your normal activities immediately after treatment and even apply makeup right away. Some patients may experience mild redness that resolves within hours.",
    },
    {
      question:
        "How often should I receive HydroFacial treatments for optimal results?",
      answer:
        "For optimal results, treatments are typically recommended every four to six weeks to align with the skin's natural renewal cycle. However, frequency can be adjusted based on individual skin needs, concerns, and treatment goals.",
    },
    {
      question: "Is HydroFacial suitable for sensitive or problematic skin?",
      answer:
        "Yes, HydroFacial is specifically designed to be gentle and suitable for all skin types, including sensitive, acne-prone, or mature skin. The treatment can be customized with different serums to address specific skin concerns safely.",
    },
    {
      question: "What skin concerns does HydroFacial effectively address?",
      answer:
        "HydroFacial effectively treats multiple concerns including dehydration, fine lines, enlarged pores, uneven skin texture, hyperpigmentation, oily skin, and signs of environmental damage while providing overall skin rejuvenation.",
    },
    {
      question: "Can HydroFacial be combined with other skin treatments?",
      answer:
        "Yes, HydroFacial can be safely combined with many other treatments or used as a preparatory treatment before procedures. However, timing and combination protocols should be determined by a qualified skincare professional based on individual needs.",
    },
  ],

  testimonials: [
    {
      name: "Sarah M.",
      rating: 5,
      quote:
        "My skin has never looked better! The HydroFacial at Vivi Aesthetics gave me immediate results with no irritation. I'm glowing!",
      treatment: "HydroFacial",
    },
    {
      name: "Jennifer L.",
      rating: 5,
      quote:
        "I love that there's no downtime. I get my HydroFacial during lunch and go back to work with perfect skin. Highly recommend!",
      treatment: "HydroFacial",
    },
    {
      name: "Michelle K.",
      rating: 5,
      quote:
        "After struggling with enlarged pores for years, the HydroFacial has finally given me the smooth, refined skin I've always wanted.",
      treatment: "HydroFacial",
    },
    {
      name: "Amanda R.",
      rating: 5,
      quote:
        "The instant glow and hydration from HydroFacial is amazing. My skin feels so soft and looks radiant. It's become my monthly must-have treatment.",
      treatment: "HydroFacial",
    },
    {
      name: "Lisa P.",
      rating: 5,
      quote:
        "As someone with sensitive skin, I was nervous about trying new treatments. HydroFacial was gentle yet effective, giving me the best skin of my life.",
      treatment: "HydroFacial",
    },
    {
      name: "Rebecca T.",
      rating: 5,
      quote:
        "The customized serums and gentle extraction process make HydroFacial perfect for my combination skin. I see improvements after every session.",
      treatment: "HydroFacial",
    },
  ],

  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "HydroFacial Treatment Calgary",
    description:
      "A patented multi-step facial treatment providing cleansing, exfoliation, extraction, hydration, and antioxidant protection in a single session.",
    procedureType: "CosmeticProcedure",
    bodyLocation: "Face and Neck",
    image: "/images/services/hydrofacial/hydrofacial-in-calgary-001.webp",
    url: "https://vivispa.ca/services/hydrofacial",
    provider: {
      "@type": "LocalBusiness",
      name: "Vivi Aesthetics & Spa",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Calgary",
        addressRegion: "AB",
        addressCountry: "Canada",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Calgary",
    },
    preparation: "Arrive with clean skin, free of makeup and skincare products",
    howPerformed:
      "Non-invasive procedure using patented Vortex-Fusion technology for multi-step skin treatment",
    indication: {
      "@type": "MedicalIndication",
      name: "Dehydrated skin, Fine lines, Enlarged pores, Hyperpigmentation, Uneven skin texture, Acne-prone skin",
    },
  },

  relatedServiceIds: ["microneedling", "ipl-photofacial"],
  popularityRank: 1,
};
