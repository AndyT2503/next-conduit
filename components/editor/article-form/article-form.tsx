import FormErrors from "@/components/common/form-errors/form-errors";
import { UpsertArticleBodyRequest } from "@/lib/api";
import { ErrorResponse } from "@/lib/models";
import { useForm } from "react-hook-form";
import TagListSelect from "./tag-list-select/tag-list-select";

export default function ArticleForm({
  errorResponse,
}: {
  errorResponse: ErrorResponse | null;
}) {
  const { register, getValues, setValue } = useForm<UpsertArticleBodyRequest>();
  const onSubmit = () => {
    console.log(getValues());
  };

  const onTagSelectedChange = (value: string[]) => {
    setValue("tagList", value);
  };

  return (
    <div
      onSubmit={(e) => {
        e?.preventDefault();
      }}
      className="form-container"
    >
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
          <TagListSelect
            tagList={getValues("tagList")}
            onTagSelectedChange={onTagSelectedChange}
          />
        </div>
      </form>
      <button onClick={onSubmit} className="btn submit-btn btn-lg">
        Publish Article
      </button>
    </div>
  );
}
