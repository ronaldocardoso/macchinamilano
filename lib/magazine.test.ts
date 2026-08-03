import { describe, expect, it } from "vitest";

import { magazineArticles } from "./magazine";

describe("magazineArticles", () => {
  it("publishes three articles with unique slugs", () => {
    const slugs = magazineArticles.map((article) => article.slug);

    expect(magazineArticles).toHaveLength(3);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("provides useful editorial and SEO fields", () => {
    for (const article of magazineArticles) {
      expect(article.description.length).toBeGreaterThan(80);
      expect(article.description.length).toBeLessThanOrEqual(170);
      expect(article.seoTitle.length).toBeLessThanOrEqual(60);
      expect(article.sections.length).toBeGreaterThanOrEqual(5);
      expect(article.keyPoints).toHaveLength(3);
      expect(article.sources.length).toBeGreaterThanOrEqual(3);
      expect(
        article.sources.every((source) => source.url.startsWith("https://")),
      ).toBe(true);
    }
  });
});
