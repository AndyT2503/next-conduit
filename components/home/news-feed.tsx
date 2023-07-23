import { Article } from "@/lib/models";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import {
  changeOffset,
  homeSlice,
  toggleFavoriteArticleInHomePage,
} from "@/lib/store/home";
import { isBrowser } from "@/lib/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "../common/article-list/article-list";
import Pagination from "../common/pagination/pagination";
import FeedToggle from "./feed-toggle/feed-toggle";
import style from "./news-feed.module.scss";
import Tags from "./tags/tags";
export default function NewsFeed() {
  const { isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (s) => s.auth,
  );
  const { articleList, articleCount, currentOffset } = useSelector<
    RootState,
    RootState["home"]
  >((s) => s.home);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(homeSlice.actions.reset());
    };
  }, []);

  const handleOffsetChange = (offset: number) => {
    if (isBrowser()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    dispatch(changeOffset(offset));
  };

  const handleToggleFavoriteArticle = (article: Article) => {
    dispatch(toggleFavoriteArticleInHomePage(article));
  };

  const bannerElements = !isAuthenticated ? (
    <div className={style.banner}>
      <h1 className={style.title}>conduit</h1>
      <p className={style.description}>A place to share your knowledge</p>
    </div>
  ) : (
    <></>
  );

  return (
    <>
      {bannerElements}
      <div
        className="row"
        style={{ marginTop: !isAuthenticated ? "232px" : "0px" }}
      >
        <div className="col-9">
          <FeedToggle />
          <ArticleList
            articleList={articleList}
            onToggleFavoriteArticle={handleToggleFavoriteArticle}
          />
          <Pagination
            totalCount={articleCount}
            offset={currentOffset}
            onOffsetChange={handleOffsetChange}
          />
        </div>
        <div className="col-3">
          <Tags />
        </div>
      </div>
    </>
  );
}
