import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowIcon } from "@/components/icons";
import { MagazineCard } from "@/components/magazine-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { env } from "@/lib/env";
import {
  formatArticleDate,
  getMagazineArticle,
  magazineArticles,
} from "@/lib/magazine";

type MagazineArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return magazineArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: MagazineArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getMagazineArticle(slug);

  if (!article) return {};

  const canonical = `/magazine/${article.slug}/`;

  return {
    title: article.seoTitle,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "it_IT",
      url: canonical,
      siteName: "Macchina Milano",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: article.category,
    },
  };
}

export default async function MagazineArticlePage({
  params,
}: MagazineArticlePageProps) {
  const { slug } = await params;
  const article = getMagazineArticle(slug);

  if (!article) notFound();

  const canonical = `${env.APP_URL}/magazine/${article.slug}/`;
  const relatedArticles = magazineArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "it-IT",
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "Redazione Macchina Milano",
      url: env.APP_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Macchina Milano",
      url: env.APP_URL,
      logo: {
        "@type": "ImageObject",
        url: `${env.APP_URL}/brand/logo-horizontal.png`,
      },
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: env.APP_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Magazine",
        item: `${env.APP_URL}/magazine/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main>
        <div className="breadcrumbs container">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/magazine/">Magazine</Link>
          <span>/</span>
          <span>{article.shortTitle}</span>
        </div>

        <article className="article-page">
          <header className={`article-hero article-hero--${article.tone}`}>
            <div className="article-hero__inner container">
              <p className="eyebrow">{article.category}</p>
              <h1>{article.title}</h1>
              <p className="article-hero__intro">{article.introduction}</p>
              <div className="article-meta">
                <span>Redazione Macchina Milano</span>
                <time dateTime={article.updatedAt}>
                  Aggiornato il {formatArticleDate(article.updatedAt)}
                </time>
                <span>{article.readingTime} di lettura</span>
              </div>
            </div>
          </header>

          <div className="article-layout container">
            <aside className="article-summary" aria-label="In breve">
              <p className="eyebrow">In breve</p>
              <ul>
                {article.keyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <nav aria-label="Indice dell’articolo">
                <p>In questa guida</p>
                {article.sections.map((section) => (
                  <a href={`#${section.id}`} key={section.id}>
                    {section.title}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="article-content">
              {article.sections.map((section) => (
                <section id={section.id} key={section.id}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {section.callout && (
                    <aside className="article-callout">
                      <strong>{section.callout.title}</strong>
                      <p>{section.callout.text}</p>
                    </aside>
                  )}
                </section>
              ))}

              <section className="article-sources" id="fonti">
                <h2>Fonti ufficiali e approfondimenti</h2>
                <p>
                  Informazioni verificate alla data di aggiornamento indicata.
                  Prima di prendere una decisione, controlla sempre le regole
                  applicabili al tuo caso sui portali ufficiali.
                </p>
                <ol>
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} rel="noreferrer" target="_blank">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>

              <aside className="article-related-cta">
                <p className="eyebrow">{article.related.label}</p>
                <h2>{article.related.title}</h2>
                <Link
                  className="button button--red"
                  href={article.related.href}
                >
                  Esplora i veicoli <ArrowIcon />
                </Link>
              </aside>
            </div>
          </div>
        </article>

        <section className="section article-more">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Continua a leggere</p>
                <h2>Dal Magazine</h2>
              </div>
              <Link className="text-link" href="/magazine/">
                Tutti gli articoli <ArrowIcon />
              </Link>
            </div>
            <div className="magazine-grid magazine-grid--related">
              {relatedArticles.map((related) => (
                <MagazineCard article={related} key={related.slug} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </>
  );
}
