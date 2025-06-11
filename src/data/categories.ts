import { useMemo } from "react";

export const ALL_SERVICE_CATEGORIES = [
  {
    id: "eyelash-extensions",
    name: "Eyelash Extensions",
    slug: "eyelash-extensions",
    mappedCategory: "beauty-treatments",
  },
  {
    id: "hydrofacial",
    name: "Hydrofacial Treatments",
    slug: "hydrofacial",
    mappedCategory: "facial-treatments",
  },
  {
    id: "ipl-photofacial",
    name: "IPL PhotoFacial",
    slug: "ipl-photofacial",
    mappedCategory: "laser-treatments",
  },
  {
    id: "japanese-head-spa",
    name: "Japanese Head Spa",
    slug: "japanese-head-spa",
    mappedCategory: "wellness-services",
  },
  {
    id: "laser-hair-removal",
    name: "Laser Hair Removal",
    slug: "laser-hair-removal",
    mappedCategory: "laser-treatments",
  },
  {
    id: "laser-pigmentation-removal",
    name: "Laser Pigmentation Removal",
    slug: "laser-pigmentation-removal",
    mappedCategory: "laser-treatments",
  },
  {
    id: "laser-skin-tightening",
    name: "Laser Skin Tightening",
    slug: "laser-skin-tightening",
    mappedCategory: "laser-treatments",
  },
  {
    id: "microneedling",
    name: "Microneedling",
    slug: "microneedling",
    mappedCategory: "advanced-treatments",
  },
  {
    id: "skin-tag-removal",
    name: "Skin Tag Removal",
    slug: "skin-tag-removal",
    mappedCategory: "advanced-treatments",
  },
  {
    id: "vascular-vein-removal",
    name: "Vascular Vein Removal",
    slug: "vascular-vein-removal",
    mappedCategory: "laser-treatments",
  },
];

export const useCategoryMapping = (offer: {
  category: string;
  slug: string;
  name: string;
}) => {
  const categoryName = useMemo(() => {
    const categoryConfig = ALL_SERVICE_CATEGORIES.find(
      (category) =>
        offer.category === category.mappedCategory ||
        offer.slug.includes(category.slug) ||
        offer.name.toLowerCase().includes(category.name.toLowerCase()) ||
        (category.id === "hydrofacial" &&
          offer.name.toLowerCase().includes("hydrafacial")) ||
        (category.id === "japanese-head-spa" &&
          (offer.slug.includes("head-spa") ||
            offer.slug.includes("scalp-therapy"))),
    );

    return categoryConfig?.name || offer.category;
  }, [offer]);

  return categoryName;
}; 