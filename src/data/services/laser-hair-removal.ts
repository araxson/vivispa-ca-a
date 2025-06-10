import { Service } from "@/types/service";

export const laserHairRemovalService: Service = {
  id: "laser-hair-removal",
  slug: "laser-hair-removal",
  title: "Laser Hair Removal Treatment",
  previewDescription:
    "Advanced laser technology for permanent hair reduction on all skin types.",
  fullDescription:
    "Laser hair removal is a medical procedure that uses concentrated light energy to permanently reduce unwanted hair growth. The treatment works by targeting the melanin in hair follicles with specific wavelengths of light, causing controlled thermal damage that prevents future hair growth. This non-invasive procedure can be performed on virtually any area of the body and is suitable for all skin types when appropriate laser systems are used. Laser hair removal offers a long-term solution to unwanted hair, eliminating the need for regular shaving, waxing, or other temporary hair removal methods.",

  metaTitle:
    "Laser Hair Removal Calgary | Permanent Hair Reduction | Vivi Aesthetics & Spa",
  metaDescription:
    "Book safe and effective laser hair removal at Vivi Aesthetics & Spa Calgary. Advanced technology for permanent hair reduction on all skin types. Get smooth skin today!",
  keywords: [
    "laser hair removal calgary",
    "permanent hair reduction calgary",
    "hair removal calgary",
    "calgary laser spa",
    "smooth skin treatment",
    "diode laser hair removal",
    "ipl hair removal calgary",
    "laser hair removal downtown",
  ],
  canonicalUrl: "https://vivispa.ca/services/laser-hair-removal",

  // Available only at Downtown location
  availableLocations: ["downtown"],

  image:
    "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp",

  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp",
    "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-003.webp",
    "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-004.webp",
    "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-005.webp",
    "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-006.webp",
    "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-007.webp",
  ],

  // Add these properties after the galleryImages array
  heroType: "video",
  heroVideo: {
    src: "/videos/laser-hair-removal.mp4",
    poster:
      "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp",
  },

  openGraph: {
    title: "Laser Hair Removal Services in Calgary | Vivi Aesthetics & Spa",
    description:
      "Advanced laser hair removal treatments at Vivi Aesthetics & Spa in Calgary. Safe, effective, and long-lasting results for all skin types.",
    image: "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp", // Added using service.image
    url: "https://vivispa.ca/services/laser-hair-removal", // Added using service.canonicalUrl
    type: "website", // Added default type
  },

  twitter: {
    card: "summary_large_image", // Added back, as it's required by TwitterData
    title: "Laser Hair Removal Calgary | Vivi Aesthetics & Spa",
    description:
      "Say goodbye to unwanted hair with our advanced laser hair removal. Permanent results with minimal discomfort.",
    image:
      "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-003.webp",
  },

  scientificInfo:
    "Laser hair removal operates on the principle of selective photothermolysis, utilizing specific wavelengths of coherent light to target melanin within hair follicles while preserving surrounding tissues. The primary chromophore is eumelanin, the dark pigment found in hair shafts and follicles. Common laser systems include alexandrite lasers, diode lasers, and Nd:YAG lasers, each optimized for different skin phototypes. The laser energy is absorbed by melanin and converted to thermal energy, causing controlled thermal injury to follicular structures including the dermal papilla and bulge region containing stem cells.",

  overview:
    "Laser hair removal has revolutionized the approach to unwanted hair management, offering a permanent solution that surpasses traditional methods in both effectiveness and convenience. The technology has evolved significantly since its introduction, with modern systems providing safe and effective treatment for all skin types and hair colors. The procedure represents a significant advancement in cosmetic dermatology, combining medical-grade technology with proven scientific principles to deliver lasting results.",

  benefits: [
    "Permanent reduction of unwanted hair growth with excellent long-term results",
    "Significant reduction in painful ingrown hairs and folliculitis",
    "Long-term cost savings compared to lifetime expenses of temporary methods",
    "Improved skin texture and smoothness without irritation",
    "Precision targeting allowing treatment of specific areas",
    "Minimal discomfort compared to traditional hair removal methods",
    "Prevention of shaving-related skin conditions and complications",
    "Time-saving convenience eliminating daily grooming routines",
  ],

  procedure:
    "The laser hair removal process begins with a comprehensive consultation to assess skin type, hair characteristics, and treatment expectations. The treatment area is thoroughly prepared and cleansed, with protective eyewear provided for safety. A cooling system is utilized to enhance comfort and protect the skin during treatment. The laser handpiece is systematically moved across the treatment area, delivering controlled energy pulses to target hair follicles. Multiple sessions are required to address all hair growth phases and achieve optimal permanent hair reduction.",

  indications:
    "Laser hair removal is indicated for individuals seeking permanent reduction of unwanted hair on various body areas including the face, legs, arms, underarms, bikini area, back, and chest. The treatment is particularly beneficial for those experiencing ingrown hairs, razor burn, or sensitivity to traditional hair removal methods. It is suitable for men and women seeking long-term hair reduction solutions and those wanting to eliminate the time and expense associated with regular hair removal routines.",

  contraindications:
    "Certain conditions may contraindicate laser hair removal or require special precautions. These include pregnancy and breastfeeding, active skin infections or lesions in the treatment area, recent sun exposure or tanning, use of photosensitizing medications, history of keloid scarring, and unrealistic expectations about treatment outcomes. Patients with certain medical conditions or taking specific medications may require medical clearance before treatment.",

  preparationAndAftercare:
    "Pre-treatment preparation includes avoiding sun exposure, discontinuing plucking or waxing for several weeks, and shaving the treatment area before the appointment. Post-treatment care involves protecting the treated area from sun exposure, using gentle skincare products, avoiding heat exposure, and following specific aftercare instructions. Proper preparation and aftercare protocols are essential for optimal results and minimizing potential side effects.",

  expectedResults:
    "Patients typically notice a reduction in hair growth after the first treatment, with progressive improvement following each session. Optimal results require multiple treatments to address all hair growth cycles, with most patients achieving significant permanent hair reduction after completing their treatment series. The results are long-lasting, with many patients experiencing permanent hair reduction in treated areas.",

  safetyConsiderations:
    "Laser hair removal maintains excellent safety standards when performed by qualified practitioners using appropriate equipment and protocols. Potential side effects may include temporary redness, swelling, or skin sensitivity, all of which typically resolve quickly. Serious complications are rare when proper techniques and safety measures are employed. Patient selection, appropriate laser settings, and comprehensive aftercare protocols ensure optimal safety and results.",

  historyAndDevelopment:
    "The development of laser hair removal began in the 1960s with early ruby laser experiments, though these systems caused significant skin damage due to limited understanding of selective photothermolysis. The breakthrough came in 1983 when Anderson and Parrish established the principles of selective photothermolysis at Massachusetts General Hospital. The first clinically successful hair removal laser, the ruby laser, received FDA approval in 1995, followed by alexandrite lasers in the late 1990s. Diode lasers emerged in the early 2000s, offering deeper penetration and better comfort. The introduction of Nd:YAG lasers expanded treatment possibilities for darker skin types. Modern innovations include combination systems, advanced cooling technologies, and AI-assisted parameter optimization, making laser hair removal safer and more effective across all skin types and hair colors.",

  faqs: [
    {
      question: "How does laser hair removal work and is it really permanent?",
      answer:
        "Laser hair removal uses concentrated light energy to target melanin in hair follicles, causing thermal damage that prevents future hair growth. While individual results vary, most patients achieve significant permanent hair reduction after completing their treatment series.",
    },
    {
      question: "How many sessions are typically needed for optimal results?",
      answer:
        "Most patients require multiple sessions spaced several weeks apart for optimal permanent hair reduction. The exact number depends on hair color, thickness, skin type, hormonal factors, and the treatment area being addressed.",
    },
    {
      question: "Does laser hair removal hurt and what does it feel like?",
      answer:
        "Most patients describe the sensation as a rubber band snapping against the skin or warm pinpricks. Advanced cooling systems significantly minimize discomfort, making treatment much more comfortable than traditional methods like waxing.",
    },
    {
      question:
        "What body areas can be safely treated with laser hair removal?",
      answer:
        "Laser hair removal can treat virtually any area of the body including face, legs, arms, underarms, bikini area, back, chest, and abdomen. Each area requires specific treatment parameters optimized for hair characteristics and skin sensitivity.",
    },
    {
      question: "Is laser hair removal safe for all skin types?",
      answer:
        "Yes, modern laser systems are safe and effective for all skin types when appropriate technology and settings are used. Different laser wavelengths are selected based on skin tone and hair color to ensure optimal safety and efficacy.",
    },
    {
      question:
        "What should I expect during recovery and are there side effects?",
      answer:
        "Most patients experience only mild redness and slight swelling that resolves within hours to days. Serious side effects are rare when proper techniques and aftercare instructions are followed. Sun protection is essential during the treatment period.",
    },
  ],

  testimonials: [
    {
      name: "Amanda R.",
      rating: 5,
      quote:
        "After years of painful waxing and constant razor burn, laser hair removal at Vivi Aesthetics was absolutely life-changing. My legs are finally smooth and I save so much time and money!",
      treatment: "Laser Hair Removal - Full Legs",
    },
    {
      name: "Jessica T.",
      rating: 5,
      quote:
        "The staff made me feel completely comfortable throughout the entire process. The results exceeded my expectations - no more painful ingrown hairs and virtually hairless after the series!",
      treatment: "Laser Hair Removal - Brazilian",
    },
    {
      name: "Rachel P.",
      rating: 5,
      quote:
        "I was initially skeptical about the permanent results, but after completing my treatment series I have excellent hair reduction. The investment was absolutely worth it for the convenience and confidence.",
      treatment: "Laser Hair Removal - Underarms",
    },
    {
      name: "Sarah M.",
      rating: 5,
      quote:
        "As someone with sensitive skin who couldn't tolerate waxing, laser hair removal was perfect. The cooling system made it so comfortable, and my skin has never looked better.",
      treatment: "Laser Hair Removal - Face",
    },
    {
      name: "Michelle K.",
      rating: 5,
      quote:
        "The professional consultation helped set realistic expectations, and the results were exactly as promised. I love not having to think about shaving anymore - total freedom!",
      treatment: "Laser Hair Removal - Arms",
    },
    {
      name: "Jennifer L.",
      rating: 5,
      quote:
        "The technology is amazing - fast, effective, and much less painful than I expected. My results have been incredible. I can't believe I waited so long to try this!",
      treatment: "Laser Hair Removal - Bikini Area",
    },
  ],

  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Laser Hair Removal Calgary",
    description:
      "Advanced laser hair removal treatments using selective photothermolysis for permanent hair reduction on all skin types.",
    procedureType: "Non-invasive laser treatment",
    bodyLocation:
      "Various body areas including face, legs, arms, underarms, bikini area, back, and chest",
    image:
      "/images/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp",
    url: "https://vivispa.ca/services/laser-hair-removal",
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
    preparation:
      "Avoid sun exposure, discontinue plucking/waxing prior to treatment, shave treatment area before appointment",
    howPerformed:
      "Targeted laser energy absorption by hair follicle melanin causing controlled thermal damage",
    indication: {
      "@type": "MedicalIndication",
      name: "Unwanted hair growth, Hirsutism, Pseudofolliculitis barbae, Ingrown hairs",
    },
  },

  relatedServiceIds: ["hydrofacial", "ipl-photofacial"],

  popularityRank: 2,
};
