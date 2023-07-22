import Image from "next/image";
import style from "./comment-form.module.scss";
import { useState } from "react";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "@/lib/store/article-detail";
import { useRouter } from "next/router";

export default function CommentForm() {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { currentUser } = useSelector<RootState, RootState["auth"]>((s) => s.auth);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(createComment({ slug: router.query.slug as string, comment }));
    setComment('');
  };
  return (
    <div className={style["card-comment"]}>
      <div className="card-body">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className={style["card-footer"]}>
        <Image
          alt="avatar"
          height={30}
          width={30}
          src={currentUser!.image}
          className={style.avatar}
        />
        <button
          onClick={handleSubmit}
          className={"btn bt-sm " + style["btn-submit"]}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}
