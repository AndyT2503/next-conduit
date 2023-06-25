import { UpsertArticleBodyRequest } from "@/lib/api";
import ArticleForm from "../article-form/article-form";

export default function NewArticle() {
  const handleSubmit = (value: UpsertArticleBodyRequest) => {
    console.log(value);
  };

  return (
    <ArticleForm
      errorResponse={null}
      handleSubmit={handleSubmit}
    />
  );
}
