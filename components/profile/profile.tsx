import { Article } from "@/lib/models";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import {
  ARTICLE_TYPE,
  LIMIT_ARTICLES_IN_PROFILE_PAGE,
  getArticlesInProfilePage,
  getProfile,
  profileSlice,
  toggleFavoriteArticleInProfilePage,
  toggleFollowProfileInProfilePage,
} from "@/lib/store/profile";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "../common/article-list/article-list";
import Pagination from "../common/pagination/pagination";
import ArticlesToggle from "./articles-toggle/articles-toggle";
import style from "./profile.module.scss";
import { isBrowser } from "@/lib/utils";

export default function Profile() {
  const { profile, currentOffset, articleCount, articleList, articleType } =
    useSelector<RootState, RootState["profile"]>((s) => s.profile);
  const { currentUser, isAuthenticated } = useSelector<
    RootState,
    RootState["auth"]
  >((s) => s.auth);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (router.query.username) {
      const username = (router.query.username as string).replace("@", "");
      dispatch(getProfile(username));
    }
  }, [router.query.username]);

  useEffect(() => {
    if (profile && currentUser) {
      setIsCurrentUser(currentUser.username === profile.username);
    }
  }, [profile, currentUser]);

  useEffect(() => {
    if (profile && router.asPath) {
      if (router.asPath === `/@${profile.username}/favorites`) {
        dispatch(
          getArticlesInProfilePage({
            articleType: ARTICLE_TYPE.FavoritedArticle,
            offset: 0,
          }),
        );
      } else {
        dispatch(
          getArticlesInProfilePage({
            articleType: ARTICLE_TYPE.MyArticle,
            offset: 0,
          }),
        );
      }
    }
  }, [profile, router.asPath]);

  useEffect(() => {
    return () => {
      console.log('reset');
      dispatch(profileSlice.actions.reset());
    };
  }, []);

  if (!profile) {
    return <></>;
  }

  const handleToggleFollow = () => {
    if (!isAuthenticated) {
      router.push("/register");
      return;
    }
    if (profile) {
      dispatch(toggleFollowProfileInProfilePage(profile));
    }
  };

  const handleToggleFavoriteArticle = (article: Article) => {
    if (!isAuthenticated) {
      router.push("/register");
      return;
    }
    dispatch(toggleFavoriteArticleInProfilePage(article));
  };

  const handleOffsetChange = (offset: number) => {
    if (isBrowser()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    dispatch(
      getArticlesInProfilePage({
        articleType,
        offset,
      }),
    );
  };

  const navigateToSetting = () => {
    router.push("/settings");
  };

  const profileBtnElement = !isCurrentUser ? (
    <button
      onClick={handleToggleFollow}
      className="btn btn-outline-secondary btn-sm ms-auto d-flex align-items-center"
    >
      <i className="fa-solid fa-plus me-1"></i>{" "}
      {profile.following ? "Unfollow" : "Follow"} {profile.username}
    </button>
  ) : (
    <button
      className="btn btn-outline-secondary btn-sm ms-auto d-flex align-items-center"
      onClick={navigateToSetting}
    >
      <i className="fa-solid fa-gear me-1"></i> Edit Profile Settings
    </button>
  );

  return (
    <>
      <div className={style.banner}>
        <div className={style.container}>
          <div className={style["user-info"]}>
            <Image
              alt="avatar"
              width={100}
              height={100}
              className={style.avatar}
              src={profile.image}
            />
            <h4 className={style.username}>{profile.username}</h4>
          </div>
          {profileBtnElement}
        </div>
      </div>
      <div className={style.content}>
        <div className="offset-md-1">
          <ArticlesToggle />
          <ArticleList
            articleList={articleList}
            onToggleFavoriteArticle={handleToggleFavoriteArticle}
          />
          <Pagination
            totalCount={articleCount}
            offset={currentOffset}
            onOffsetChange={handleOffsetChange}
            limit={LIMIT_ARTICLES_IN_PROFILE_PAGE}
          />
        </div>
      </div>
    </>
  );
}
