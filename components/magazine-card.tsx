import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { formatArticleDate, type MagazineArticle } from "@/lib/magazine";

type MagazineCardProps = {
  article: MagazineArticle;
  index?: number;
};

export function MagazineCard({ article, index }: MagazineCardProps) {
  return (
    <article className={`magazine-card magazine-card--${article.tone}`}>
      <div className="magazine-card__topline">
        <span>{article.category}</span>
        {index !== undefined && (
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <div className="magazine-card__body">
        <p>
          <time dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt)}
          </time>
          <span aria-hidden="true"> · </span>
          {article.readingTime} di lettura
        </p>
        <h3>
          <Link href={`/magazine/${article.slug}/`}>{article.shortTitle}</Link>
        </h3>
        <p>{article.description}</p>
        <Link
          aria-label={`Leggi ${article.shortTitle}`}
          className="magazine-card__link"
          href={`/magazine/${article.slug}/`}
        >
          Leggi l’articolo <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
