export const contactInfo = {
  // Business Information
  businessName: "Vivi Aesthetics Spa",

  // Phone Numbers
  phone: {
    main: "(403) 708-7654",
    whatsapp: "+1 (403) 708-7654",
    formatted: "+14037087654",
  },

  // Addresses (using Downtown location as main)
  addresses: {
    main: {
      street: "1411 1st Street SE",
      city: "Calgary",
      province: "AB",
      postalCode: "T2G 2J3",
      country: "Canada",
      full: "1411 1st Street SE, Calgary, AB T2G 2J3, Canada",
    },
  },

  // Email
  email: {
    main: "ViviAestheticsSpa@gmail.com",
    bookings: "ViviAestheticsSpa@gmail.com",
    support: "ViviAestheticsSpa@gmail.com",
  },

  // Hours (using standard hours across locations)
  hours: {
    monday: "10:00 AM - 7:00 PM",
    tuesday: "10:00 AM - 7:00 PM",
    wednesday: "10:00 AM - 7:00 PM",
    thursday: "10:00 AM - 7:00 PM",
    friday: "10:00 AM - 7:00 PM",
    saturday: "10:00 AM - 5:00 PM",
    sunday: "10:00 AM - 5:00 PM",
  },

  // Social Media
  social: {
    instagram: "https://instagram.com/vivispa.ca",
    facebook: "https://facebook.com/vivispa.ca",
    tiktok: "https://tiktok.com/@vivispa.ca",
  },

  // Map/Location (using Downtown location coordinates)
  maps: {
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=51.0448,-114.0756",
    coordinates: {
      lat: 51.0448,
      lng: -114.0756,
    },
  },
} as const;

export type ContactInfo = typeof contactInfo;

/**
 * Location interface defining the structure of a location
 */
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: { day: string; hours: string }[];
  mapUrl: string;
  bookingUrl: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  embedMapUrl: string;
}

/**
 * All locations of Vivi Aesthetics & Spa
 */
export const locations: Location[] = [
  {
    id: "downtown",
    name: "Downtown",
    address: "1411 1st Street SE",
    city: "Calgary",
    province: "AB",
    postalCode: "T2G 2J3",
    phone: "+1 (403) 708-7654",
    email: "ViviAestheticsSpa@gmail.com",
    hours: [
      { day: "Monday", hours: "10:00 AM - 7:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 7:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 7:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 7:00 PM" },
      { day: "Friday", hours: "10:00 AM - 7:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
      { day: "Sunday", hours: "10:00 AM - 5:00 PM" },
    ],
    mapUrl: "https://maps.app.goo.gl/t1RiWKVgCV2njuKP8",
    bookingUrl: "/pricing",
    imageUrl: "/images/locations/downtown.webp",
    coordinates: {
      lat: 51.0448,
      lng: -114.0756,
    },
    embedMapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.7772237005124!2d-114.06388738730355!3d51.03873517159251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53717134a5f9f91d%3A0xf8ac6b1b927d44e1!2sVivi%20Aesthetics%20%26%20Spa%20(Downtown)!5e0!3m2!1sen!2sca!4v1746485518485!5m2!1sen!2sca",
  },
  {
    id: "edmonton-trail",
    name: "Edmonton Trail",
    address: "3715 Edmonton Trail",
    city: "Calgary",
    province: "AB",
    postalCode: "T2E 3P4",
    phone: "+1 (403) 708-7654",
    email: "ViviAestheticsSpa@gmail.com",
    hours: [
      { day: "Monday", hours: "10:00 AM - 7:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 7:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 7:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 7:00 PM" },
      { day: "Friday", hours: "10:00 AM - 7:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
      { day: "Sunday", hours: "10:00 AM - 5:00 PM" },
    ],
    mapUrl: "https://maps.app.goo.gl/Dss3vhTanPnDGE6t7",
    bookingUrl: "/pricing",
    imageUrl: "/images/locations/edmonton-trail.webp",
    coordinates: {
      lat: 51.069,
      lng: -114.058,
    },
    embedMapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2506.2353164631136!2d-114.0527584!3d51.0856646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537165cf47e84a6f%3A0xda9b11ea145d4f23!2sVivi%20Aesthetics%20%26%20Spa%20(Edmonton%20Trail)!5e0!3m2!1sen!2sca!4v1746485385722!5m2!1sen!2sca",
  },
];
