import { RootState, AppDispatch } from "@/lib/store/app.store";
import {
  articleDetailSlice,
  getArticleDetail,
} from "@/lib/store/article-detail";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ArticleDetail() {
  const { article, comments, isArticleExist } = useSelector<
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

  return <></>
}
