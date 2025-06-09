import { Service, OpenGraphData, TwitterData } from "../types/service";
import { siteConfig } from "../data/constant";

export function generateOpenGraphData(service: Service): OpenGraphData {
  const title =
    (service.openGraph?.title && service.openGraph.title.trim() !== ""
      ? service.openGraph.title
      : service.metaTitle || service.title
    )?.replace(new RegExp(` \\| ${siteConfig.name}$`), "") + ` | ${siteConfig.name}`;

  const description =
    service.openGraph?.description ||
    service.metaDescription ||
    service.previewDescription ||
    "";

  let image = service.openGraph?.image || service.image;
  if (image && !image.startsWith("http://") && !image.startsWith("https://")) {
    image = `${siteConfig.url}${image.startsWith("/") ? "" : "/"}${image}`;
  }

  const url =
    service.openGraph?.url ||
    service.canonicalUrl ||
    `${siteConfig.url}/services/${service.slug}`;

  return {
    title,
    description,
    type: service.openGraph?.type || "article",
    url,
    images: image ? [{ url: image }] : undefined, // Ensure images is an array of objects
    siteName: siteConfig.name,
    locale: "en_CA",
  };
}

export function generateTwitterData(service: Service): TwitterData {
  const title =
    (service.twitter?.title && service.twitter.title.trim() !== ""
      ? service.twitter.title
      : service.metaTitle || service.title
    )?.replace(new RegExp(` \\| ${siteConfig.name}$`), "") + ` | ${siteConfig.name}`;

  const description =
    service.twitter?.description ||
    service.metaDescription ||
    service.previewDescription ||
    "";

  let image = service.twitter?.image || service.image;
  if (image && !image.startsWith("http://") && !image.startsWith("https://")) {
    image = `${siteConfig.url}${image.startsWith("/") ? "" : "/"}${image}`;
  }

  return {
    card: service.twitter?.card || "summary_large_image",
    title,
    description,
    images: image ? [image] : undefined, // Ensure images is an array of strings
    site: siteConfig.twitterUsername || "@vivispa_ca", // Use siteConfig if available
    creator: service.twitter?.creator || siteConfig.twitterUsername || "@vivispa_ca", // Use siteConfig if available
  };
}
