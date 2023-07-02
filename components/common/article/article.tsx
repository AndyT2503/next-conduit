import { Article } from "@/lib/models";
import style from "./article.module.scss";
import Link from "next/link";
import Image from "next/image";
export default function Article({
  article,
  toggleFavorite,
}: {
  article: Article;
  toggleFavorite: (article: Article) => void;
}) {
  const onFavoriteArticle = () => {
    toggleFavorite(article);
  };

  const tagElements = article.tagList.map((tag) => (
    <span key={tag} className="tag-default">
      {tag}
    </span>
  ));

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
          <div className="info">
            <Link
              href={"/@" + article.author.username}
              className={style.author}
            >
              {article.author.username}
            </Link>
            <p className={style.date}>{article.createdAt}</p>
          </div>
          <button
            className={`btn btn-sm ms-auto ${
              article.favorited ? "unfavorite-btn" : "favorite-btn"
            }`}
            onClick={onFavoriteArticle}
          >
            <i className="fa-solid fa-heart"></i> {article.favoritesCount}
          </button>
        </div>
        <Link
          href={`article/${article.slug}`}
          className={style["preview-link"]}
        >
          <h1 className={style.title}>{article.title}</h1>
          <p className={style.description}>{article.description}</p>
          <div className={style.footer}>
            <span className={style["read-more"]}>Read more...</span>
            <div className={style.tags}>{tagElements}</div>
          </div>
        </Link>
      </div>
    </>
  );
}