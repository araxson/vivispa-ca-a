import { useMemo } from "react";
import { allLocations } from "@/data/pricing";
import type { ServiceCategory } from "@/types/pricing";

export const useLocationServices = (selectedLocation: string) => {
  const servicesByCategory = useMemo(() => {
    const locationData = allLocations.find(
      (loc) => loc.location === selectedLocation,
    );
    return locationData ? locationData.categories : [];
  }, [selectedLocation]);

  const allServicesForLocation = useMemo(() => {
    return servicesByCategory.flatMap((category) => category.services);
  }, [servicesByCategory]);

  return {
    servicesByCategory,
    allServicesForLocation,
  };
}; 