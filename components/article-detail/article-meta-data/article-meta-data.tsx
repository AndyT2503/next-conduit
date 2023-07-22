import { AppDispatch, RootState } from "@/lib/store/app.store";
import { useDispatch, useSelector } from "react-redux";
import style from "./article-meta-data.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/models";
import { ReactElement } from "react";
import { formatDateTime } from "@/lib/utils";
import { deleteArticle, toggleFavoriteArticleInArticleDetailPage } from "@/lib/store/article-detail";
type ArticleMetaDataProps = {
  type: "header" | "body";
};

export default function ArticleMetaData({ type }: ArticleMetaDataProps) {
  const { article } = useSelector<RootState, RootState["articleDetail"]>(
    (s) => s.articleDetail,
  );
  const { currentUser } = useSelector<RootState, RootState["auth"]>((s) => s.auth);

  const dispatch: AppDispatch = useDispatch();
  if (!article) {
    return <></>;
  }

  const handleToggleFavoriteArticle = (article: Article) => {
    dispatch(toggleFavoriteArticleInArticleDetailPage(article.slug));
  };

  const handleToggleFollowAuthor = (article: Article) => {
    //TODO: implement later
  };
  const handleDeleteArticle = (article: Article) => {
    dispatch(deleteArticle(article.slug));
  };

  let groupBtnElement: ReactElement;
  if (currentUser?.username !== article.author.username) {
    groupBtnElement = (
      <>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => handleToggleFollowAuthor(article)}
        >
          <i className="fa-solid fa-plus"></i>
          {article.author.following ? "Unfollow" : "Follow"}
          {article.author.username}
        </button>
        <button
          className={`btn btn-sm ${
            article.favorited ? "unfavorite-btn" : "favorite-btn"
          }`}
          onClick={() => handleToggleFavoriteArticle(article)}
        >
          <i className="fa-solid fa-heart"></i> { article.favorited ? 'Unfavorite Article' : 'Favorite Article'} (
          {article.favoritesCount})
        </button>
      </>
    );
  } else {
    groupBtnElement = (
      <>
        <Link
          className="btn btn-outline-secondary btn-sm"
          href={`/editor/${article.slug}`}
        >
          <i className="fa-solid fa-pen"></i> Edit Article
        </Link>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => handleDeleteArticle(article)}
        >
          <i className="fa-solid fa-trash-can"></i> Delete Article
        </button>
      </>
    );
  }
  return (
    <div className={style["article-meta"]}>
      <Image
        width={32}
        height={32}
        alt="avatar"
        className={style.avatar}
        src={article.author.image}
      />
      <div className={style.info}>
        <Link
          href={"/@" + article.author.username}
          className={`${style.author} ${style[type]}`}
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
      <div className={style["group-btn"]}>{groupBtnElement}</div>
    </div>
  );
}
