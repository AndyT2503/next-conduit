import { Article } from "@/lib/models";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import style from "./article-card.module.scss";
import { useRouter } from "next/router";

type ArticleCardProps = {
  article: Article;
  onToggleFavorite: (article: Article) => void;
};

export default function ArticleCard({
  article,
  onToggleFavorite,
}: ArticleCardProps) {
  const handleFavoriteArticle = () => {
    onToggleFavorite(article);
  };
  const router = useRouter();

  const tagElements = article.tagList.map((tag) => (
    <span key={tag} className={style["tag-default"]}>
      {tag}
    </span>
  ));

  const navigateToDetail = () => {
    router.push(`/article/${article.slug}`);
  };

  return (
    <>
      <div className={style["article-preview"]}>
        <div className={style["article-meta"]}>
          <Image
            alt="avatar"
            className={style.avatar}
            src={article.author.image}
            width="32"
            height="32"
          />
          <div className={style.info}>
            <Link
              href={"/@" + article.author.username}
              className={style.author}
            >
              {article.author.username}
            </Link>
            <p className={style.date}>
              {formatDateTime(
                article.createdAt,
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
                "en-US",
              )}
            </p>
          </div>
          <button
            className={`btn btn-sm ms-auto ${
              article.favorited ? "unfavorite-btn" : "favorite-btn"
            }`}
            onClick={handleFavoriteArticle}
          >
            <i className="fa-solid fa-heart"></i> {article.favoritesCount}
          </button>
        </div>
        <div onClick={navigateToDetail} className={style["preview-link"]}>
          <h1 className={style.title}>{article.title}</h1>
          <p className={style.description}>{article.description}</p>
          <div className={style.footer}>
            <span className={style["read-more"]}>Read more...</span>
            <div className={style.tags}>{tagElements}</div>
          </div>
        </div>
      </div>
    </>
  );
}
