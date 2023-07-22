import { AppDispatch, RootState } from "@/lib/store/app.store";
import {
  articleDetailSlice,
  getArticleDetail,
} from "@/lib/store/article-detail";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./article-detail.module.scss";
import ArticleMetaData from "./article-meta-data/article-meta-data";
import CommentForm from "./comment-form/comment-form";
import CommentList from "./comment-list/comment-list";
import Link from "next/link";
export default function ArticleDetail() {
  const { article, isArticleExist } = useSelector<
    RootState,
    RootState["articleDetail"]
  >((s) => s.articleDetail);
  const { isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (s) => s.auth,
  );
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (router.query.slug) {
      dispatch(getArticleDetail(router.query.slug as string));
    }
  }, [router.query.slug]);

  useEffect(() => {
    if (!isArticleExist) {
      router.push("/");
    }
  }, [isArticleExist]);

  useEffect(() => {
    return () => {
      dispatch(articleDetailSlice.actions.reset());
    };
  }, []);

  if (!article) {
    return <></>;
  }

  const commentForm = isAuthenticated ? (
    <CommentForm></CommentForm>
  ) : (
    <p>
      <Link className={style.link} href="/login">
        Sign in
      </Link>{" "}
      or
      <Link className={style.link} href="/register">
        sign up
      </Link>{" "}
      to add comments on this article.
    </p>
  );
  const tagListElement = article.tagList.map((tag) => (
    <span key={tag} className={style["tag-default"]}>
      {tag}
    </span>
  ));
  return (
    <>
      <div className={style.banner}>
        <div className={style.container}>
          <h1 className={style.title}>{article.title}</h1>
          <ArticleMetaData type="header" />
        </div>
      </div>
      <div className={style.content}>
        <div className={style["article-content"]}>
          <div dangerouslySetInnerHTML={{ __html: article.description }}></div>
        </div>
        <div className={style.tags}>{tagListElement}</div>
      </div>
      <hr className="mt-5" />
      <div className="mt-4 mb-5 d-flex justify-content-center">
        <ArticleMetaData type="body" />
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          {commentForm}
          <CommentList />
        </div>
      </div>
    </>
  );
}
