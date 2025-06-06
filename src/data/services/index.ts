import { hydrofacialService } from "./hydrofacial";
import { eyelashExtensionsService } from "./eyelash-extensions";
import { iplPhotofacial } from "./ipl-photofacial";
import { japaneseHeadSpaService } from "./japanese-head-spa";
import { laserHairRemovalService } from "./laser-hair-removal";
import { laserPigmentationRemovalService } from "./laser-pigmentation-removal";
import { laserSkinTighteningService } from "./laser-skin-tightening";
import { microneedlingService } from "./microneedling";
import { skinTagRemovalService } from "./skin-tag-removal";
import { vascularVeinRemovalService } from "./vascular-vein-removal";
import { Service } from "@/types/service";

export const services: Service[] = [
  hydrofacialService,
  eyelashExtensionsService,
  iplPhotofacial,
  japaneseHeadSpaService,
  laserHairRemovalService,
  laserPigmentationRemovalService,
  laserSkinTighteningService,
  microneedlingService,
  skinTagRemovalService,
  vascularVeinRemovalService,
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((service) => service.slug === slug);
};

export const getServicesByPopularity = (): Service[] => {
  return [...services].sort((a, b) => a.popularityRank - b.popularityRank);
};

export const getRelatedServices = (serviceId: string): Service[] => {
  const currentService = services.find((service) => service.id === serviceId);
  if (!currentService || !currentService.relatedServiceIds) {
    return [];
  }

  return services.filter((service) =>
    currentService.relatedServiceIds.includes(service.id),
  );
};

export {
  hydrofacialService,
  eyelashExtensionsService,
  iplPhotofacial,
  japaneseHeadSpaService,
  laserHairRemovalService,
  laserPigmentationRemovalService,
  laserSkinTighteningService,
  microneedlingService,
  skinTagRemovalService,
  vascularVeinRemovalService,
};
