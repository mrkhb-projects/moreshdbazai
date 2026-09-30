import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/prices", "/signals", "/about", "/contact", "/login"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/prices" || route === "/signals" ? "hourly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
