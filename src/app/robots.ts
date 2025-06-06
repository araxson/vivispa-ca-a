import type { MetadataRoute } from "next";

// Get the base URL from environment variables or use default
const siteUrl = process.env["NEXT_PUBLIC_SITE_URL"] || "https://vivispa.ca";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Disallow API routes
          "/admin/", // Disallow admin paths
          "/theme-demo/", // Exclude any demo paths
          "/private/", // Exclude private content
          "/*.json$", // Block JSON files
          "/*.xml$", // Block XML files except sitemap
          "/internal/", // Block internal pages
        ],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/services/", "/contact/"],
        disallow: [
          "/booking/", // Prevent scraping of booking data
          "/offers/", // Prevent scraping of special offers
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
