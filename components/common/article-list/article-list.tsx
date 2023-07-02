import { Article } from "@/lib/models";
import ArticleCard from "../article-card/article-card";

export default function ArticleList({
  articleList,
  onToggleFavorite,
}: {
  articleList: Article[];
  onToggleFavorite: (article: Article) => void;
}) {
  if (articleList.length === 0) {
    return (
      <div id="no-article" className="py-4">
        No articles are here... yet.
      </div>
    );
  } else {
    const handleToggleFavorite = (article: Article) => {
      onToggleFavorite(article);
    };
    const articleElement = articleList.map((article) => (
      <ArticleCard
        key={article.slug}
        onToggleFavorite={handleToggleFavorite}
        article={article}
      />
    ));
    return articleElement;
  }
}
