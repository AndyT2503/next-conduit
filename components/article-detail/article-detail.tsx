import { RootState, AppDispatch } from "@/lib/store/app.store";
import {
  articleDetailSlice,
  getArticleDetail,
} from "@/lib/store/article-detail";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./article-detail.module.scss";
import ArticleMetaData from "./article-meta-data/article-meta-data";
import { Article } from "@/lib/models";
export default function ArticleDetail() {
  const { article, isArticleExist } = useSelector<
    RootState,
    RootState["articleDetail"]
  >((s) => s.articleDetail);
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
  }, [router]);

  useEffect(() => {
    return () => {
      dispatch(articleDetailSlice.actions.reset());
    };
  }, []);

  if (!article) {
    return <></>;
  }

  const tagListElement = article.tagList.map((tag) => (
    <span className={style["tag-default"]}>{tag}</span>
  ));
  return (
    <>
      <div className={style.banner}>
        <div className={style.container}>
          <h1 className={style.title}>{article.title}</h1>
          <ArticleMetaData
            type="header"
          />
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
        <ArticleMetaData
          type="body"
        />
      </div>
    </>
  );
}
