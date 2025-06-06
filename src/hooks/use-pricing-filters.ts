import { useMemo, useState } from "react";
import { allServices, allLocations } from "@/data/pricing/index";
import type { ServiceItem } from "@/types/pricing";
import type { FilterItem } from "@/components/ui/filter-badges";

const usePricingFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");

  // Clear specific filter
  const handleClearFilter = (filterType: string) => {
    switch (filterType) {
      case "search":
        setSearchTerm("");
        break;
      case "location":
        setSelectedLocation("all");
        break;
      case "category":
        setSelectedCategory("all");
        break;
      case "priceRange":
        setSelectedPriceRange("all");
        break;
    }
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSelectedLocation("all");
    setSelectedCategory("all");
    setSelectedPriceRange("all");
  };

  // Get unique locations and categories
  const locations = useMemo(() => {
    return [
      ...new Set(allLocations.map((location) => location.location)),
    ].sort();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(allServices.map((service) => service.category))].sort();
  }, []);

  // Get active filters for badges
  const activeFilters: FilterItem[] = useMemo(() => {
    const filters: FilterItem[] = [];
    if (searchTerm) {
      filters.push({
        type: "search",
        label: `"${searchTerm}"`,
        value: searchTerm,
        icon: "search",
      });
    }
    if (selectedLocation !== "all") {
      filters.push({
        type: "location",
        label: selectedLocation,
        value: selectedLocation,
        icon: "location",
      });
    }
    if (selectedCategory !== "all") {
      filters.push({
        type: "category",
        label: selectedCategory,
        value: selectedCategory,
        icon: "category",
      });
    }
    if (selectedPriceRange !== "all") {
      const priceLabel =
        selectedPriceRange === "under-100"
          ? "Under $100"
          : selectedPriceRange === "100-200"
            ? "$100 - $200"
            : selectedPriceRange === "200-500"
              ? "$200 - $500"
              : selectedPriceRange === "over-500"
                ? "Over $500"
                : selectedPriceRange;
      filters.push({
        type: "priceRange",
        label: priceLabel,
        value: selectedPriceRange,
        icon: "tag",
      });
    }
    return filters;
  }, [searchTerm, selectedLocation, selectedCategory, selectedPriceRange]);

  // Filter services based on search and filters
  const filteredServices = useMemo(() => {
    let services: ServiceItem[] = [];

    // Filter by location first
    if (selectedLocation === "all") {
      services = [...allServices];
    } else {
      const locationData = allLocations.find(
        (loc) => loc.location === selectedLocation,
      );
      if (locationData) {
        services = locationData.categories.flatMap(
          (category) => category.services,
        );
      }
    }

    // Filter by search term
    if (searchTerm) {
      services = services.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (service.subcategory &&
            service.subcategory
              .toLowerCase()
              .includes(searchTerm.toLowerCase())),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      services = services.filter(
        (service) => service.category === selectedCategory,
      );
    }

    // Filter by price range
    if (selectedPriceRange !== "all") {
      services = services.filter((service) => {
        const price = parseFloat(service.price.replace(/[$,]/g, ""));
        switch (selectedPriceRange) {
          case "under-100":
            return price < 100;
          case "100-200":
            return price >= 100 && price <= 200;
          case "200-500":
            return price >= 200 && price <= 500;
          case "over-500":
            return price > 500;
          default:
            return true;
        }
      });
    }

    return services;
  }, [searchTerm, selectedCategory, selectedLocation, selectedPriceRange]);

  // Group services by category and subcategory
  const servicesByCategory = useMemo(() => {
    const grouped = filteredServices.reduce(
      (acc, service) => {
        if (!acc[service.category]) {
          acc[service.category] = {};
        }

        // For Laser Hair Removal, group by subcategory, others group directly
        if (service.category === "Laser Hair Removal" && service.subcategory) {
          if (!acc[service.category]![service.subcategory]) {
            acc[service.category]![service.subcategory] = [];
          }
          acc[service.category]![service.subcategory]!.push(service);
        } else {
          // For other categories without subcategories, use 'main' as key
          if (!acc[service.category]!["main"]) {
            acc[service.category]!["main"] = [];
          }
          acc[service.category]!["main"]!.push(service);
        }

        return acc;
      },
      {} as Record<string, Record<string, ServiceItem[]>>,
    );

    // Sort categories and subcategories
    const sortedGrouped = Object.entries(grouped)
      .sort(([, a], [, b]) => {
        const totalA = Object.values(a).flat().length;
        const totalB = Object.values(b).flat().length;
        return totalB - totalA;
      })
      .reduce(
        (acc, [category, subcategories]) => {
          acc[category] = Object.entries(subcategories).reduce(
            (subAcc, [subcategory, services]) => {
              subAcc[subcategory] = services.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[$,]/g, ""));
                const priceB = parseFloat(b.price.replace(/[$,]/g, ""));
                return priceA - priceB;
              });
              return subAcc;
            },
            {} as Record<string, ServiceItem[]>,
          );
          return acc;
        },
        {} as Record<string, Record<string, ServiceItem[]>>,
      );

    return sortedGrouped;
  }, [filteredServices]);

  return {
    // State
    searchTerm,
    selectedLocation,
    selectedCategory,
    selectedPriceRange,

    // Data
    locations,
    categories,
    activeFilters,
    filteredServices,
    servicesByCategory,

    // Actions
    setSearchTerm,
    setSelectedLocation,
    setSelectedCategory,
    setSelectedPriceRange,
    handleClearFilter,
    handleClearAllFilters,
  };
};

export { usePricingFilters };
