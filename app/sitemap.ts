import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { magazineArticles } from "@/lib/magazine";
import { vehicles } from "@/lib/vehicles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${env.APP_URL}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${env.APP_URL}/veicoli/`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${env.APP_URL}/magazine/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${env.APP_URL}/contatti/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
  const articlePages: MetadataRoute.Sitemap = magazineArticles.map(
    (article) => ({
      url: `${env.APP_URL}/magazine/${article.slug}/`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
    }),
  );
  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
    url: `${env.APP_URL}/veicoli/${vehicle.slug}/`,
    lastModified: vehicle.collectedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...vehiclePages];
}
