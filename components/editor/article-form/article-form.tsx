import FormErrors from "@/components/common/form-errors/form-errors";
import { UpsertArticleBodyRequest } from "@/lib/api";
import { FormStatus } from "@/lib/constants";
import { Article, ErrorResponse } from "@/lib/models";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import TagListSelect from "./tag-list-select/tag-list-select";

export default function ArticleForm({
  errorResponse,
  handleSubmit,
  article,
  formStatus,
}: {
  errorResponse: ErrorResponse | null;
  handleSubmit: (value: UpsertArticleBodyRequest) => void;
  article?: Article;
  formStatus: FormStatus;
}) {
  const { register, getValues, setValue, control } =
    useForm<UpsertArticleBodyRequest>({
      defaultValues: {
        tagList: [],
      },
    });
  useEffect(() => {
    if (article) {
      setValue("body", article.body);
      setValue("description", article.description);
      setValue("tagList", article.tagList);
      setValue("title", article.title);
    }
  }, []);

  const onSubmit = () => {
    handleSubmit(getValues());
  };
  return (
    <div className="form-container">
      <form>
        <FormErrors errorResponse={errorResponse}></FormErrors>
        <input
          type="text"
          {...register("title")}
          className="form-control form-control-lg"
          placeholder="Article Title"
        />
        <input
          type="text"
          {...register("description")}
          className="form-control form-control-lg"
          placeholder="What's this article about"
        />
        <textarea
          {...register("body")}
          rows={6}
          className="form-control form-control-lg"
          placeholder="Write your article (in markdown)"
        ></textarea>
        <div className="form-group">
          <Controller
            control={control}
            name="tagList"
            render={({ field: { onChange, value } }) => (
              <TagListSelect tagList={value} onTagSelectedChange={onChange} />
            )}
          />
        </div>
      </form>
      <button
        disabled={formStatus === FormStatus.Pending}
        onClick={onSubmit}
        className="btn submit-btn btn-lg"
      >
        Publish Article
      </button>
    </div>
  );
}
