import { UpsertArticleBodyRequest } from "@/lib/api";
import { addArticleSlice, createNewArticle } from "@/lib/store/add-article";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleForm from "../article-form/article-form";

export default function AddArticleForm() {
  const { article, errorResponse, formStatus } = useSelector<
    RootState,
    RootState["addArticle"]
  >((s) => s.addArticle);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = (value: UpsertArticleBodyRequest) => {
    dispatch(createNewArticle(value));
  };

  useEffect(() => {
    if (article) {
      router.push({
        pathname: "/article/[slug]",
        query: {
          slug: article.slug,
        },
      });
    }
  }, [article]);

  useEffect(() => {
    return () => {
      dispatch(addArticleSlice.actions.reset());
    };
  }, []);

  return (
    <ArticleForm
      formStatus={formStatus}
      errorResponse={errorResponse}
      handleSubmit={handleSubmit}
    />
  );
}
