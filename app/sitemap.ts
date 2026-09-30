import type { MetadataRoute } from "next";
import { SITE_URL, TRACKED_SYMBOLS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/prices", "/signals", "/analysis", "/favorites", "/about", "/contact", "/login"];
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/prices" || route === "/signals" || route === "/analysis" ? "hourly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));

  const priceEntries: MetadataRoute.Sitemap = TRACKED_SYMBOLS.map((symbol) => ({
    url: `${SITE_URL}/prices/${symbol.key}`,
    lastModified: now,
    changeFrequency: "hourly",
    priority: 0.5,
  }));

  return [...staticEntries, ...priceEntries];
}
