import { UpsertArticleBodyRequest } from "@/lib/api";
import { RootState, AppDispatch } from "@/lib/store/app.store";
import {
  editArticleSlice,
  getArticleToUpdate,
  updateArticle,
} from "@/lib/store/edit-article";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArticleForm from "../article-form/article-form";

export default function EditArticleForm() {
  const { article, errorResponse, formStatus, updatedArticle, isArticleExist } =
    useSelector<RootState, RootState["editArticle"]>((s) => s.editArticle);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (router.query.slug) {
      dispatch(getArticleToUpdate(router.query.slug as string));
    }
  }, [router.query.slug]);

  useEffect(() => {
    if (!isArticleExist) {
      router.push("/");
    }
  }, [isArticleExist]);

  useEffect(() => {
    return () => {
      dispatch(editArticleSlice.actions.reset());
    };
  }, []);

  useEffect(() => {
    if (updatedArticle) {
      router.push({
        pathname: "/article/[slug]",
        query: {
          slug: updatedArticle.slug,
        },
      });
    }
  }, [updatedArticle]);

  const handleSubmit = (value: UpsertArticleBodyRequest) => {
    dispatch(
      updateArticle({
        slug: article!.slug,
        article: value,
      }),
    );
  };

  return (
    <ArticleForm
      article={article}
      formStatus={formStatus}
      errorResponse={errorResponse}
      handleSubmit={handleSubmit}
    />
  );
}
