import { Article } from "@/lib/models";
import ArticleCard from "../article-card/article-card";

type ArticleListProps = {
  articleList: Article[];
  onToggleFavorite: (article: Article) => void;
};

export default function ArticleList({
  articleList,
  onToggleFavorite,
}: ArticleListProps) {
  if (articleList.length === 0) {
    return (
      <div id="no-article" className="py-4">
        No articles are here... yet.
      </div>
    );
  } else {
    const handleToggleFavoriteArticle = (article: Article) => {
      onToggleFavorite(article);
    };
    const articleElement = articleList.map((article) => (
      <ArticleCard
        key={article.slug}
        onToggleFavorite={handleToggleFavoriteArticle}
        article={article}
      />
    ));
    return <>{articleElement}</>;
  }
}
