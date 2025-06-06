export interface ServiceItem {
  name: string;
  url: string;
  category: string;
  price: string;
  subcategory?: string;
}

export interface ServiceCategory {
  name: string;
  services: ServiceItem[];
}

export interface LocationServices {
  location: string;
  categories: ServiceCategory[];
}
